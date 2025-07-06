interface BlogGenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

export async function generateBlogContent(category?: string): Promise<BlogGenerationResponse> {
  const apiKey = localStorage.getItem('huggingface_api_key');
  
  if (!apiKey) {
    throw new Error("Hugging Face API key not found. Please add your API key in settings.");
  }
  
  const categoryPrompt = category 
    ? `Create a blog post specifically about ${category}.`
    : `Choose a specific category for the blog from: AI Trends, Deep Learning, AI Ethics, Machine Learning, AI Applications`;
  
  const prompt = `Generate a high-quality, informative blog post about a trending topic in artificial intelligence or technology.
    ${categoryPrompt}
    
    Please structure the response as a JSON object with these fields:
    - title: A clear, engaging headline
    - excerpt: A 2-3 sentence summary
    - content: Fully formatted HTML content with proper h2, h3, p, ul/ol, li tags
    - category: One of: AI Trends, Deep Learning, AI Ethics, Machine Learning, AI Applications
    
    Make the content engaging, informative, and follow best practices for web writing.
    Include practical insights, examples, and actionable takeaways.
    Format as valid JSON only.`;
  
  try {
    console.log("Calling Hugging Face API...");
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
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
      const errorText = await response.text();
      console.error("API response error:", response.status, errorText);
      
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid API key. Please check your Hugging Face API key and try again.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (response.status >= 500) {
        throw new Error("Hugging Face API server error. Please try again later.");
      } else {
        throw new Error(`Hugging Face API error: ${response.status} ${errorText}`);
      }
    }
    
    const data = await response.json();
    console.log("API response received");
    
    // Handle Hugging Face response format
    let contentText = "";
    if (Array.isArray(data) && data[0]?.generated_text) {
      contentText = data[0].generated_text;
    } else if (data.generated_text) {
      contentText = data.generated_text;
    } else {
      throw new Error("Unexpected response format from Hugging Face API");
    }
    
    // Try to parse as JSON first, otherwise create structured content
    let contentJson;
    try {
      // Look for JSON in the response
      const jsonMatch = contentText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        contentJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found");
      }
    } catch (parseError) {
      console.log("Creating structured content from text response");
      
      // Create structured content from the response
      const lines = contentText.split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/^#+\s*/, '') || `Latest Insights in ${category || 'AI'}`;
      
      // Create excerpt from first meaningful line
      const excerpt = lines.find(line => line.length > 50)?.substring(0, 200) + '...' || 
        "An exploration of recent advancements in artificial intelligence and their implications.";
      
      // Format content as HTML
      let htmlContent = contentText
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^(#{1,3})\s*(.+)$/gm, (match, hashes, text) => {
          const level = hashes.length + 1; // h2, h3, h4
          return `<h${level}>${text}</h${level}>`;
        });
      
      htmlContent = `<p>${htmlContent}</p>`;
      
      // Add structured sections
      htmlContent += `
        <h2>Key Insights</h2>
        <p>Here are some important considerations about this topic:</p>
        <ul>
          <li>Understanding the fundamentals is crucial for success</li>
          <li>Staying updated with the latest research provides competitive advantages</li>
          <li>Practical application is the best way to master these concepts</li>
        </ul>
        <h2>Implementation Strategies</h2>
        <p>Consider the following approaches:</p>
        <ul>
          <li>Start with small experiments to validate ideas</li>
          <li>Leverage existing frameworks to accelerate development</li>
          <li>Measure results carefully and iterate based on data</li>
        </ul>
        <h3>Conclusion</h3>
        <p>Thanks for reading! Share your thoughts and experiences with this technology.</p>
      `;
      
      contentJson = {
        title: title,
        content: htmlContent,
        excerpt: excerpt,
        category: category || "AI Trends"
      };
    }
    
    // Validate and normalize the response
    if (!contentJson.title) {
      contentJson.title = `Latest Insights in ${category || 'AI'}`;
    }
    
    if (!contentJson.excerpt) {
      contentJson.excerpt = "An exploration of recent advancements in artificial intelligence and their implications.";
    }
    
    if (!contentJson.category) {
      contentJson.category = category || "AI Trends";
    } else {
      // Normalize category
      const validCategories = ["AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];
      if (!validCategories.includes(contentJson.category)) {
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
    
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to generate blog content. Please check your API key and try again.");
    }
  }
}