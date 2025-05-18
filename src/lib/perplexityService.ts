
interface BlogGenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

export async function generateBlogContent(category?: string): Promise<BlogGenerationResponse> {
  const apiKey = localStorage.getItem('perplexity_api_key');
  
  if (!apiKey) {
    throw new Error("Perplexity API key not found. Please add your API key in settings.");
  }
  
  const categoryPrompt = category 
    ? `Create a blog post specifically about ${category}.`
    : `Choose a specific category for the blog from: AI Trends, Deep Learning, AI Ethics, Machine Learning, AI Applications`;
  
  const prompt = `
    Generate a high-quality, informative blog post about a trending topic in artificial intelligence or technology.
    ${categoryPrompt}
    
    The blog post should be well-structured with:
    - An engaging title
    - A brief introduction that serves as an excerpt (2-3 sentences)
    - Well-organized sections with h2 headings
    - Proper HTML formatting (p tags, h2, blockquote, ul/ol lists where appropriate)
    - A thoughtful conclusion
    
    IMPORTANT: The response must be a valid JSON object with these fields:
    - title: string (the blog post title)
    - excerpt: string (2-3 sentence summary, no HTML tags)
    - content: string (fully formatted HTML content)
    - category: string (one of the categories mentioned above)
    
    DO NOT include code blocks, markdown, or any formatting outside of the JSON structure.
    ONLY return the JSON object, nothing else.
  `;
  
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
            content: 'You are an expert AI and technology writer. Create content in well-formatted HTML. You MUST ONLY respond with a valid JSON object containing title, excerpt, content, and category fields. No other text or formatting.'
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
    
    // Enhanced JSON parsing logic
    try {
      // First check if the entire response is valid JSON already
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const rawContent = data.choices[0].message.content;
        console.log("Raw content length:", rawContent.length);
        
        let contentJson;
        
        // Try direct parsing first
        try {
          contentJson = JSON.parse(rawContent);
          console.log("Successfully parsed JSON directly");
        } catch (initialParseError) {
          console.log("Direct JSON parse failed, trying to clean the content");
          
          // Clean the content - remove any markdown code blocks or extra formatting
          let cleanedContent = rawContent
            .replace(/```json\s*/g, '')
            .replace(/```\s*$/g, '')
            .replace(/```/g, '')
            .trim();
            
          // Extract JSON if embedded in other text
          const jsonStartIndex = cleanedContent.indexOf('{');
          const jsonEndIndex = cleanedContent.lastIndexOf('}');
          
          if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
            cleanedContent = cleanedContent.substring(jsonStartIndex, jsonEndIndex + 1);
            console.log("Extracted JSON from text");
          }
          
          // Final attempt to parse JSON
          try {
            contentJson = JSON.parse(cleanedContent);
            console.log("Successfully parsed JSON after cleaning");
          } catch (finalParseError) {
            console.error("All JSON parsing attempts failed");
            throw new Error("Could not parse the API response as valid JSON");
          }
        }
        
        // Validate the content has the required fields
        if (contentJson && typeof contentJson === 'object') {
          // Ensure all required fields exist
          if (!contentJson.title) {
            contentJson.title = "Latest AI Developments";
          }
          
          if (!contentJson.excerpt) {
            contentJson.excerpt = "An exploration of recent advancements in artificial intelligence and their implications.";
          }
          
          // Make sure the content is proper HTML, not markdown or plain text
          if (contentJson.content) {
            // Check if content seems to be markdown or plain text rather than HTML
            if (!contentJson.content.includes('<h2>') && !contentJson.content.includes('<p>')) {
              // Simple conversion of plain text or markdown to HTML
              contentJson.content = contentJson.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
                
              contentJson.content = `<p>${contentJson.content}</p>`;
            }
          } else {
            throw new Error("Blog content missing in API response");
          }
          
          if (!contentJson.category) {
            contentJson.category = category || "AI Trends";
          } else {
            // Normalize category to one of the allowed values
            const validCategories = ["AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];
            if (!validCategories.includes(contentJson.category)) {
              // Find closest match or default to provided category
              const lowerCategory = contentJson.category.toLowerCase();
              if (lowerCategory.includes("trend")) contentJson.category = "AI Trends";
              else if (lowerCategory.includes("deep") || lowerCategory.includes("learn")) contentJson.category = "Deep Learning";
              else if (lowerCategory.includes("ethic")) contentJson.category = "AI Ethics";
              else if (lowerCategory.includes("machine")) contentJson.category = "Machine Learning";
              else if (lowerCategory.includes("app")) contentJson.category = "AI Applications";
              else contentJson.category = category || "AI Trends";
            }
          }
          
          return {
            title: contentJson.title,
            content: contentJson.content,
            excerpt: contentJson.excerpt,
            category: contentJson.category
          };
        } else {
          throw new Error("Invalid response format from API");
        }
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (parseError) {
      console.error("Error parsing JSON from Perplexity:", parseError);
      
      // Last resort: Create a fallback post if we can extract any usable content
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        
        // If it's just a plain text response without JSON, we can try to structure it
        if (content.length > 100) {
          console.log("Creating fallback post from text content");
          
          // Extract a title (first sentence or first 50 chars)
          let title = content.split('.')[0];
          if (title.length > 60) {
            title = title.substring(0, 60) + "...";
          }
          
          // First 2-3 sentences as excerpt
          const sentences = content.split('.');
          const excerpt = sentences.slice(0, 2).join('.') + '.';
          
          // Format the rest as HTML content
          const htmlContent = `<p>${content.replace(/\n\n/g, '</p><p>')}</p>`;
          
          return {
            title: title,
            content: htmlContent,
            excerpt: excerpt,
            category: category || "AI Trends"
          };
        }
      }
      
      throw new Error("Failed to parse blog content from API. Try again with a different prompt.");
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
