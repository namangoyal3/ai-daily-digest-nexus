
interface BlogGenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

// Initialize API key if not already set
(function initializeApiKey() {
  if (!localStorage.getItem('perplexity_api_key')) {
    localStorage.setItem('perplexity_api_key', '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');
  }
})();

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
    
    The entire response should be in valid JSON format with these fields:
    - title: string (the blog post title)
    - excerpt: string (2-3 sentence summary, no HTML tags)
    - content: string (fully formatted HTML content)
    - category: string (one of the categories mentioned above)
    
    Don't include any preamble or explanation, just return the valid JSON object.
  `;
  
  try {
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
            content: 'You are an expert AI and technology writer. Create content in well-formatted HTML.'
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
      throw new Error(`Perplexity API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    const contentJson = JSON.parse(data.choices[0].message.content);
    
    return {
      title: contentJson.title,
      content: contentJson.content,
      excerpt: contentJson.excerpt,
      category: contentJson.category
    };
  } catch (error) {
    console.error("Error calling Perplexity API:", error);
    throw new Error("Failed to generate blog content");
  }
}
