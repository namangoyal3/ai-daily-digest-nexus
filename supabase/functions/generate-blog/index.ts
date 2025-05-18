
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface RequestData {
  category: string;
  title?: string;
}

interface BlogData {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  featured_image?: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  blog_id?: string;
  duplicate?: boolean;
  image_url?: string;
}

// Main handler function for the edge function
serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get API key from environment variables
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      return createErrorResponse("Perplexity API key not configured", 500);
    }

    // Parse request data
    const { category, title } = await req.json() as RequestData;
    
    if (!category) {
      return createErrorResponse("Category is required", 400);
    }

    // Check for duplicate blog
    const existingBlog = await checkForDuplicateBlog(supabaseClient, category, title);
    if (existingBlog.duplicate) {
      return new Response(
        JSON.stringify(existingBlog),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate blog content
    const blogContent = await generateBlogContent(PERPLEXITY_API_KEY, category);
    if (!blogContent.content) {
      return createErrorResponse("Failed to generate blog content", 500);
    }

    // Generate image
    const imageUrl = await generateBlogImage(category, blogContent.title);

    // Create blog object
    const blog: BlogData = {
      title: blogContent.title || title || `Latest Developments in ${category}`,
      content: blogContent.content,
      excerpt: blogContent.excerpt,
      category: category,
      featured_image: imageUrl
    };

    // Insert blog into database
    const insertResult = await insertBlogToDatabase(supabaseClient, blog);
    
    if (!insertResult.success) {
      return createErrorResponse(insertResult.message, 500);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Blog generated and inserted successfully.',
        blog_id: insertResult.blog_id,
        image_url: imageUrl
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-blog function:", error);
    return createErrorResponse(error instanceof Error ? error.message : "Unknown error occurred", 500);
  }
});

// Check if a blog with the same title and category already exists
async function checkForDuplicateBlog(
  supabaseClient: any,
  category: string, 
  title?: string
): Promise<{ duplicate: boolean; message?: string; blog_id?: string }> {
  if (!title) {
    return { duplicate: false };
  }

  try {
    const { data: existingBlogs, error } = await supabaseClient
      .from('blogs')
      .select('id, title')
      .eq('category', category)
      .eq('title', title)
      .limit(1);

    if (error) {
      console.error("Error checking for duplicate blog:", error);
      return { duplicate: false }; // Continue if check fails
    }

    if (existingBlogs && existingBlogs.length > 0) {
      return {
        duplicate: true,
        message: `A blog titled "${title}" already exists in category "${category}".`,
        blog_id: existingBlogs[0].id
      };
    }

    return { duplicate: false };
  } catch (error) {
    console.error("Error in duplicate check:", error);
    return { duplicate: false }; // Continue if check fails
  }
}

// Generate blog content using Perplexity AI
async function generateBlogContent(
  apiKey: string,
  category: string
): Promise<{ title: string; content: string; excerpt: string }> {
  const generationPrompt = `
You are an expert AI content generator tasked with writing high-quality, unique blog posts for a professional AI-focused website. Each time you generate a blog post, ensure that the content is entirely original — no repeated phrasing, titles, quotes, examples, or bullets from any previous output. The blog must be fully dedicated to the specific category provided and should not drift into general AI trends unless they relate directly to the category.

The blog post must follow this structured layout:

1. A catchy title with an emoji that aligns with the topic.
2. A 2–3 line introductory paragraph that sets the context for the topic in 2025.
3. A highlighted expert quote, formatted as a short, thought-provoking statement from a fictional or real credible person (include their name, designation, and company).
4. Three to four main sections each with:
   - A bold section heading
   - A concise, informative paragraph (2–4 sentences)
   - A short bullet list with 3 specific tools, companies, or examples relevant to that section
5. A dedicated section titled "Real-World Applications of ${category}", featuring how this AI category is being applied across industries such as Healthcare, Retail, Manufacturing, and Finance — with specific company or use-case examples.
6. A final, bold closing statement or motto like "Stay Curious, Stay Ahead 🚀" centered for visual impact.
7. A "Learn More" section with 2–3 suggested resources (real from the blogs), each with a name and source.

Write the entire content as clean, semantic HTML, with proper headings, paragraphs, lists, and other appropriate HTML elements. Use semantic HTML5 tags where appropriate. Each section must be modular and well-structured.

Now, generate the blog post for the category: ${category}
`;

  try {
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: 'You are a helpful content generation assistant.' },
          { role: 'user', content: generationPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      })
    });

    if (!perplexityResponse.ok) {
      const error = await perplexityResponse.text();
      console.error("Perplexity API error:", error);
      throw new Error(`Failed to generate content from Perplexity: ${error}`);
    }

    const perplexityData = await perplexityResponse.json();
    const htmlContent = perplexityData?.choices?.[0]?.message?.content;

    if (!htmlContent) {
      throw new Error('No content was generated by Perplexity.');
    }

    // Extract title from h1 tag
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const extractedTitle = titleMatch 
      ? titleMatch[1].replace(/<[^>]*>/g, '')
      : `Latest Developments in ${category}`;
      
    // Extract excerpt from first paragraph or div
    const excerptMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i) || htmlContent.match(/<div[^>]*>(.*?)<\/div>/i);
    const excerpt = excerptMatch 
      ? excerptMatch[1].replace(/<[^>]*>/g, '').substring(0, 160) + '...'
      : `Explore the latest developments in ${category}.`;

    return {
      title: extractedTitle,
      content: htmlContent,
      excerpt: excerpt
    };
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Generate an image for the blog using Pollinations AI
async function generateBlogImage(category: string, title?: string): Promise<string> {
  try {
    // Create an image prompt based on the category and title
    const imagePrompt = title 
      ? `Professional high-quality digital illustration related to: ${title}`
      : `Professional high-quality digital illustration related to ${category} in technology, futuristic, clean design, suitable for a blog header`;

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(imagePrompt);

    // Set image parameters
    const width = 1200;
    const height = 630;
    const model = 'flux-realism';
    const nologo = true;
    const enhance = true;
    const seed = Math.floor(Math.random() * 1000000); // Random seed for variation

    // Construct the Pollinations API URL
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=${nologo}&enhance=${enhance}&model=${model}&seed=${seed}`;
    
    // Optional: You can make a HEAD request to ensure the URL is valid
    try {
      const imageCheckResponse = await fetch(pollinationsUrl, { method: 'HEAD' });
      if (!imageCheckResponse.ok) {
        console.warn('Warning: Image generation URL may not be valid');
      }
    } catch (error) {
      console.warn('Warning: Could not validate image URL', error);
    }
    
    return pollinationsUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    // Return a placeholder image if generation fails
    return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485";
  }
}

// Insert the blog into the Supabase database
async function insertBlogToDatabase(
  supabaseClient: any, 
  blog: BlogData
): Promise<{ success: boolean; message: string; blog_id?: string }> {
  try {
    // Generate a date string
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    // Calculate estimated read time based on content
    const plainText = blog.content.replace(/<[^>]*>/g, '');
    const words = plainText.split(/\s+/).length;
    const readTime = `${Math.ceil(words / 200)} min read`;

    // Insert into Supabase
    const { data: insertedBlog, error: insertError } = await supabaseClient
      .from('blogs')
      .insert([
        {
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt,
          category: blog.category,
          date: formattedDate,
          read_time: readTime,
          image_url: blog.featured_image
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting blog:", insertError);
      return {
        success: false,
        message: `Failed to insert blog: ${insertError.message}`
      };
    }

    return {
      success: true,
      message: 'Blog inserted successfully.',
      blog_id: insertedBlog.id
    };
  } catch (error) {
    console.error("Error inserting blog:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Create a standardized error response
function createErrorResponse(message: string, status: number = 500): Response {
  return new Response(
    JSON.stringify({
      success: false,
      message: message,
    }),
    { headers: { "Content-Type": "application/json" }, status }
  );
}
