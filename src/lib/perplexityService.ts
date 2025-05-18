
interface BlogGenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

/**
 * Generates a formatted newsletter prompt based on content parameters
 */
function generateNewsletterPrompt(params: {
  title?: string;
  description?: string;
  contentStyle?: string;
  contentType?: string;
  contentTone?: string;
  contentFormat?: string;
  includeRealLifeReferences?: boolean;
  readability?: string;
  technicalDepth?: string;
  approach?: string;
}): string {
  const {
    title = "",
    description = "",
    contentStyle = "engaging",
    contentType = "general_interest",
    contentTone = "conversational",
    contentFormat = "modern",
    includeRealLifeReferences = true,
    readability = "moderate",
    technicalDepth = "moderate",
    approach = "practical"
  } = params;

  return `
Write a ${contentStyle} and ${contentTone} newsletter article titled "${title || description || "Latest AI Developments"}".

## Objective:
The content should reflect a ${contentType.replace("_", " ")} focus and aim to keep the reader ${contentStyle === "engaging" ? "curious and emotionally invested" : contentStyle === "informative" ? "well-informed with clarity" : "persuaded with strong reasoning"}.

## Style & Formatting:
Use a ${contentFormat === "emoji-rich" ? "Modern" : "Superhuman"} layout.
${contentFormat === "emoji-rich"
    ? "- Use short paragraphs, bullet points, and emojis in headers (🚀, 📊, 💡)."
    : "- Use bold highlights, one-sentence paragraphs, and strategic underlines."}

## Requirements:
•⁠  ⁠Write in a ${readability} readability style.
•⁠  ⁠Use ${technicalDepth} technical depth.
•⁠  ⁠Maintain a ${contentTone} tone throughout.
•⁠  ⁠The approach should be ${approach}.
${includeRealLifeReferences ? "- Include references to real companies, tools, or events where relevant." : ""}
•⁠  ⁠Ensure SEO relevance with natural inclusion of keywords like "AI", "technology", "innovation", "development".

## Output Format:
•⁠  ⁠Return the output in *clean, semantic HTML*.
•⁠  ⁠Include the following structure:
  - A clear and catchy title wrapped in an <h1>
  - An engaging intro paragraph in a styled <div>
  - Body sections using <section> with <h2> subheadings
  - Use <ul> or <div> with class names for bullets, highlights, or callouts
  - A closing section with a strong takeaway or CTA

## Styling Instructions (CSS Embedded or Inline Preferred):
•⁠  ⁠Use *modern, easy-to-read fonts* like Inter, Open Sans, or Lato
•⁠  ⁠Line height: 1.6–1.8 for readability
•⁠  ⁠Max width for content: 650px
•⁠  ⁠Add generous padding (24px+) and margins between sections
•⁠  ⁠Use *pastel backgrounds* or soft light-gray containers to separate sections
•⁠  ⁠Headers: Large, bold, and optionally emoji-enhanced
•⁠  ⁠Links should be styled with clear color and hover effects
•⁠  ⁠Highlight important stats or quotes using <blockquote> or styled <div>
•⁠  ⁠Make it visually appealing, clean, and suitable for *email clients* and web readers

## Important:
•⁠  ⁠DO NOT include markdown or explanation.
•⁠  ⁠ONLY return the final HTML string.
`.trim();
}

export async function generateBlogContent(category?: string): Promise<BlogGenerationResponse> {
  const apiKey = localStorage.getItem('perplexity_api_key');
  
  if (!apiKey) {
    throw new Error("Perplexity API key not found. Please add your API key in settings.");
  }
  
  // Generate content based on category
  const title = category 
    ? `Latest Developments in ${category}`
    : "Latest AI Developments";
    
  // Create an optimized prompt using the newsletter generator
  const prompt = generateNewsletterPrompt({
    title: title,
    contentStyle: "engaging",
    contentType: category || "general_interest",
    contentTone: "conversational",
    contentFormat: "modern",
    includeRealLifeReferences: true,
    readability: "moderate",
    technicalDepth: "moderate",
    approach: "practical"
  });
  
  try {
    console.log("Calling Perplexity API...");
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI and technology writer specializing in clear, well-structured content. Create articles with a logical hierarchy, short paragraphs, proper section spacing, and NO repetition of ideas or phrases. Format in HTML with proper semantic tags. Include section headings: Introduction, topical sections, and Conclusion.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
        presence_penalty: 0.6
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response error:", response.status, errorText);
      
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid API key. Please check your Perplexity API key and try again.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later or check your subscription tier.");
      } else if (response.status >= 500) {
        throw new Error("Perplexity API server error. Please try again later.");
      } else {
        throw new Error(`Perplexity API error: ${response.status} ${errorText}`);
      }
    }
    
    const data = await response.json();
    console.log("API response received");
    
    // Process the HTML content from Perplexity
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      const htmlContent = data.choices[0].message.content;
      
      // Extract title from h1 tag
      const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const extractedTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : title;
      
      // Extract excerpt from first paragraph or div
      const excerptMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i) || htmlContent.match(/<div[^>]*>(.*?)<\/div>/i);
      const excerpt = excerptMatch 
        ? excerptMatch[1].replace(/<[^>]*>/g, '').substring(0, 160) + '...'
        : "Explore the latest developments in artificial intelligence and technology.";
      
      return {
        title: extractedTitle,
        content: htmlContent,
        excerpt: excerpt,
        category: category || "AI Trends"
      };
    } else {
      throw new Error("Failed to extract content from the API response");
    }
  } catch (error) {
    console.error("Error calling Perplexity API:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to generate blog content. Please check your API key and try again.");
    }
  }
}

/**
 * Generate blog posts for multiple categories at once
 */
export async function generateBlogsForCategories(categories: string[]): Promise<BlogGenerationResponse[]> {
  // Generate blog posts one by one for each category
  const results: BlogGenerationResponse[] = [];
  
  for (const category of categories) {
    try {
      console.log(`Generating blog for category: ${category}`);
      const blogData = await generateBlogContent(category);
      results.push(blogData);
      
      // Add a small delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate blog for category ${category}:`, error);
      // Continue with the next category even if one fails
    }
  }
  
  return results;
}

// Note: previous helper functions removed as they're no longer needed
// with the new newsletter prompt approach that delivers properly
// formatted HTML directly
