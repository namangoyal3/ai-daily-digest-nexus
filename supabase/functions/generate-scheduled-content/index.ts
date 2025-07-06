import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
const huggingfaceApiKey = Deno.env.get('HUGGINGFACE_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting scheduled content generation...');

    // Check if at least one API key is available
    if (!perplexityApiKey && !huggingfaceApiKey) {
      console.error('No API keys found');
      return new Response(JSON.stringify({ error: 'No content generation API keys configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get active schedules
    const { data: schedules, error: scheduleError } = await supabase
      .from('content_schedules')
      .select('*')
      .eq('is_active', true);

    if (scheduleError) {
      console.error('Error fetching schedules:', scheduleError);
      throw scheduleError;
    }

    if (!schedules || schedules.length === 0) {
      console.log('No active schedules found');
      return new Response(JSON.stringify({ message: 'No active schedules' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const generatedBlogs = [];

    for (const schedule of schedules) {
      console.log('Processing schedule:', schedule.name);
      
      // Log generation attempt
      const { data: logEntry } = await supabase
        .from('content_generation_logs')
        .insert({
          status: 'pending',
          generation_type: 'scheduled',
          categories: schedule.categories
        })
        .select()
        .single();

      try {
        // Generate content for each category in the schedule
        for (const category of schedule.categories) {
          const blog = await generateBlogForCategory(category);
          
          if (blog) {
            generatedBlogs.push(blog);
            
            // Update log with success
            if (logEntry) {
              await supabase
                .from('content_generation_logs')
                .update({
                  blog_id: blog.id,
                  status: 'success'
                })
                .eq('id', logEntry.id);
            }
          }
        }
      } catch (error) {
        console.error('Error generating content for schedule:', schedule.name, error);
        
        // Update log with error
        if (logEntry) {
          await supabase
            .from('content_generation_logs')
            .update({
              status: 'error',
              error_message: error.message
            })
            .eq('id', logEntry.id);
        }
      }
    }

    console.log(`Generated ${generatedBlogs.length} blog posts`);

    return new Response(JSON.stringify({ 
      success: true, 
      generated: generatedBlogs.length,
      blogs: generatedBlogs.map(b => ({ id: b.id, title: b.title, category: b.category }))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Scheduled content generation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateBlogForCategory(category: string) {
  console.log(`Generating blog for category: ${category}`);
  
  // Determine which provider to use
  const usePerplexity = perplexityApiKey && Math.random() > 0.5; // 50/50 split when both available
  const provider = usePerplexity ? 'perplexity' : 'huggingface';
  const apiKey = usePerplexity ? perplexityApiKey : huggingfaceApiKey;
  
  if (!apiKey) {
    throw new Error(`No API key available for ${provider}`);
  }
  
  console.log(`Using ${provider} for content generation`);

  const topics = {
    'AI Trends': 'latest AI trends and developments in artificial intelligence',
    'Deep Learning': 'deep learning techniques, neural networks, and machine learning advances',
    'AI Ethics': 'AI ethics, responsible AI development, and societal implications',
    'Machine Learning': 'machine learning algorithms, data science, and predictive analytics',
    'AI Applications': 'practical AI applications in business, healthcare, and technology'
  };

  const topicDescription = topics[category] || 'artificial intelligence and technology';

  const prompt = `Write a comprehensive blog post about ${topicDescription}. Use this structure:

**Title:** Create an engaging, SEO-friendly headline

**Meta Description:** Write a compelling 150-160 character description

**Keywords:** List 5-7 relevant SEO keywords

**Introduction:**
Start with a recent trend or compelling statistic. Outline what readers will learn.

**Main Content (3-4 sections):**

### Section 1: [Key Insight/Trend]
- Share a surprising fact or recent development
- Include specific examples or data
- Explain why this matters now

### Section 2: [Practical Application/Strategy]  
- Provide actionable tips or strategies
- Mention useful tools or resources
- Include implementation suggestions

### Section 3: [Deep Dive/Analysis]
- Explore a specific case study or example
- Share lessons learned or best practices
- Offer forward-looking predictions

**Conclusion:**
Summarize key takeaways and provide a clear call-to-action.

Focus on current, trending topics in ${category}. Make it practical and valuable for readers interested in AI and technology. Use a professional but approachable tone.`;

  try {
    let response, data, content;
    
    if (provider === 'perplexity') {
      response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert AI content writer. Create high-quality, SEO-optimized blog posts about artificial intelligence and technology. Always stay current with the latest developments and trends.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 4000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'week',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      data = await response.json();
      content = data.choices[0]?.message?.content;
    } else {
      // Hugging Face
      response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      data = await response.json();
      content = Array.isArray(data) && data[0]?.generated_text ? data[0].generated_text : data.generated_text;
    }

    if (!content) {
      throw new Error(`No content generated from ${provider} API`);
    }

    // Parse the generated content
    const title = extractBetween(content, '**Title:**', '\n') || `Latest Insights in ${category}`;
    const metaDescription = extractBetween(content, '**Meta Description:**', '\n') || '';
    const keywordsText = extractBetween(content, '**Keywords:**', '\n') || '';
    const keywords = keywordsText.split(',').map(k => k.trim()).filter(k => k);

    // Generate a slug from the title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);

    // Generate excerpt from first paragraph of content
    const mainContent = content.split('**Introduction:**')[1] || content;
    const excerpt = mainContent.split('\n').find(line => line.trim().length > 50)?.trim().substring(0, 200) + '...' || '';

    // Calculate read time (average 200 words per minute)
    const wordCount = content.split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Generate image using a placeholder for now (you can integrate with image generation later)
    const imageUrl = `https://picsum.photos/800/400?random=${Date.now()}`;

    const now = new Date();
    const blog = {
      title,
      excerpt,
      content,
      date: now.toISOString().split('T')[0],
      read_time: `${readTime} min read`,
      category,
      image_url: imageUrl,
      slug,
      meta_description: metaDescription,
      keywords,
      canonical_url: `https://neuralnextgen.com/ai-blogs/${slug}`,
      author_name: 'NeuralNextGen',
      author_bio: 'AI Research Team',
      tags: keywords.slice(0, 5),
      published_at: now.toISOString()
    };

    // Save to database
    const { data: savedBlog, error: saveError } = await supabase
      .from('blogs')
      .insert(blog)
      .select()
      .single();

    if (saveError) {
      console.error('Error saving blog:', saveError);
      throw saveError;
    }

    console.log(`Successfully generated and saved blog: ${title}`);
    return savedBlog;

  } catch (error) {
    console.error('Error generating blog:', error);
    throw error;
  }
}

function extractBetween(text: string, start: string, end: string): string {
  const startIndex = text.indexOf(start);
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + start.length;
  const endIndex = text.indexOf(end, contentStart);
  
  if (endIndex === -1) {
    return text.substring(contentStart).trim();
  }
  
  return text.substring(contentStart, endIndex).trim();
}