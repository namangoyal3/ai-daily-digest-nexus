
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
    - Well-organized sections with clear h2 headings (including Introduction, at least 3 main topic sections, and Conclusion)
    - Each section should have 2-3 paragraphs of 3-4 sentences maximum
    - Content should be non-repetitive, concise, and information-dense
    - Text formatted with proper HTML (p tags for paragraphs, h2/h3 for headings, ul/ol for lists where appropriate)
    - For any tools or technologies mentioned, include specific details about their strengths and use cases
    - A thoughtful conclusion that summarizes the key points
    
    IMPORTANT: The response must be a valid JSON object with these fields:
    - title: string (the blog post title)
    - excerpt: string (2-3 sentence summary, no HTML tags)
    - content: string (fully formatted HTML content with proper heading structure)
    - category: string (one of the categories mentioned above)
    
    DO NOT include duplicate paragraphs or repetitive information.
    DO NOT include code blocks unless specifically relevant to the topic.
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
            content: 'You are an expert AI and technology writer specializing in clear, well-structured content. Create articles with a logical hierarchy (H1 > H2 > H3), short paragraphs (3-4 sentences max), proper section spacing, and NO repetition of ideas or phrases. Format in HTML with proper semantic tags. Include section headings: Introduction, 2-3 topical sections, and Conclusion. All responses MUST be valid JSON objects.'
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
        
        // Validate and clean the content
        if (contentJson && typeof contentJson === 'object') {
          // Ensure all required fields exist
          if (!contentJson.title) {
            contentJson.title = "Latest AI Developments";
          }
          
          if (!contentJson.excerpt) {
            contentJson.excerpt = "An exploration of recent advancements in artificial intelligence and their implications.";
          }
          
          // Clean up the content HTML to remove duplicates and ensure proper structure
          if (contentJson.content) {
            // Process content to ensure it has proper HTML structure
            contentJson.content = ensureProperHtmlStructure(contentJson.content);
            
            // Remove duplicate paragraphs
            contentJson.content = removeDuplicateParagraphs(contentJson.content);
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
          const htmlContent = `<h1>${title}</h1><p>${content.replace(/\n\n/g, '</p><p>')}</p>`;
          
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

/**
 * Ensure proper HTML structure in content
 */
function ensureProperHtmlStructure(content: string): string {
  // Check if content seems to be markdown or plain text rather than HTML
  if (!content.includes('<h2>') && !content.includes('<p>')) {
    // Simple conversion of plain text or markdown to HTML
    content = content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
    content = `<p>${content}</p>`;
  }
  
  // Ensure there's at least an h1 title
  if (!content.includes('<h1>')) {
    // Try to extract the first paragraph or sentence as title
    const firstParagraph = content.match(/<p>(.*?)<\/p>/);
    if (firstParagraph && firstParagraph[1]) {
      const title = firstParagraph[1].split('.')[0];
      content = `<h1>${title}</h1>${content}`;
    } else {
      content = `<h1>AI Technology Insights</h1>${content}`;
    }
  }
  
  // Ensure there are proper section headings
  if (!content.includes('<h2>')) {
    const sections = ['Introduction', 'Key Developments', 'Applications', 'Conclusion'];
    const paragraphs = content.split('</p>');
    
    if (paragraphs.length > 4) {
      // Insert headings at logical points
      let structuredContent = '';
      let sectionIndex = 0;
      
      paragraphs.forEach((para, index) => {
        if (index === 0) {
          structuredContent += `<h2>${sections[sectionIndex++]}</h2>${para}</p>`;
        } else if (index === paragraphs.length - 1) {
          structuredContent += `<h2>${sections[sections.length - 1]}</h2>${para}</p>`;
        } else if (index % 2 === 0 && sectionIndex < sections.length - 1) {
          structuredContent += `<h2>${sections[sectionIndex++]}</h2>${para}</p>`;
        } else {
          structuredContent += `${para}</p>`;
        }
      });
      
      content = structuredContent;
    }
  }
  
  return content;
}

/**
 * Remove duplicate paragraphs and repetitive content
 */
function removeDuplicateParagraphs(content: string): string {
  // Extract paragraphs
  const paragraphRegex = /<p>(.*?)<\/p>/gs;
  const paragraphs = [];
  let match;
  
  while ((match = paragraphRegex.exec(content)) !== null) {
    paragraphs.push({
      full: match[0],
      text: match[1].toLowerCase()
    });
  }
  
  // Find and mark duplicates
  const uniqueParagraphs = [];
  const seen = new Set();
  
  paragraphs.forEach(p => {
    // Create a simplified version for comparison (lowercase, no HTML tags, trimmed)
    const simplified = p.text.replace(/<[^>]*>/g, '').trim();
    
    if (!seen.has(simplified) && simplified.length > 0) {
      uniqueParagraphs.push(p.full);
      seen.add(simplified);
    }
  });
  
  // Replace the content with unique paragraphs only
  let uniqueContent = content;
  paragraphRegex.lastIndex = 0; // Reset regex index
  
  // First, remove all paragraphs
  uniqueContent = uniqueContent.replace(paragraphRegex, '');
  
  // Then put back only the unique ones, preserving their original positions as much as possible
  let lastIndex = 0;
  const markers = [];
  
  // Find positions for headings, which we'll use as markers
  const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gs;
  while ((match = headingRegex.exec(content)) !== null) {
    markers.push({
      index: match.index,
      content: match[0]
    });
  }
  
  // Sort markers by their position in the original content
  markers.sort((a, b) => a.index - b.index);
  
  // Distribute paragraphs between headings
  let currentHeadingIndex = 0;
  let result = '';
  
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    
    // Add content before this heading
    result += uniqueContent.slice(lastIndex, marker.index);
    
    // Add the heading
    result += marker.content;
    lastIndex = marker.index + marker.content.length;
    
    // Calculate how many paragraphs to insert after this heading
    const nextMarkerIndex = i < markers.length - 1 ? markers[i + 1].index : uniqueContent.length;
    const sectionLength = nextMarkerIndex - lastIndex;
    const paragraphsToInsert = Math.min(
      Math.max(1, Math.floor(sectionLength / 200)), // Rough estimate of how many paragraphs would fit
      Math.ceil(uniqueParagraphs.length / markers.length) // Equal distribution
    );
    
    // Insert paragraphs
    for (let j = 0; j < paragraphsToInsert && currentHeadingIndex < uniqueParagraphs.length; j++) {
      result += uniqueParagraphs[currentHeadingIndex++];
    }
  }
  
  // Add any remaining content
  result += uniqueContent.slice(lastIndex);
  
  // Add any remaining paragraphs at the end
  while (currentHeadingIndex < uniqueParagraphs.length) {
    result += uniqueParagraphs[currentHeadingIndex++];
  }
  
  return result;
}
