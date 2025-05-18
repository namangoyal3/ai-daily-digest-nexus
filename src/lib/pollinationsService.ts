
export async function fetchRandomImage(query: string): Promise<string> {
  console.log("Generating image for query:", query);
  
  try {
    if (!query || query.trim() === '') {
      throw new Error("Empty image query");
    }
    
    // Create a more descriptive prompt from the blog title/subject
    // Extract key concepts and create a more visual prompt
    const enhancedPrompt = createEnhancedPrompt(query);
    
    // Pollinations API endpoint for AI-generated images
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    
    // Clean and format the query with optimized parameters
    const formattedQuery = encodeURIComponent(
      `${enhancedPrompt}, professional photo, high detail, 4k, realistic, clean lighting, vivid colors, sharp focus`
    );
    
    // Generate a random seed for variation
    const seed = Math.floor(Math.random() * 1000000);
    
    // Construct the full URL with parameters for faster loading
    // Using smaller dimensions for quicker loading
    const imageUrl = `${baseUrl}${formattedQuery}?seed=${seed}&width=800&height=600&nologo=true&style=photographic`;
    
    console.log("Generated image URL:", imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    // Return a placeholder image URL if something goes wrong
    return "https://images.unsplash.com/photo-1518770660439-4636190af475";
  }
}

/**
 * Creates an enhanced, more descriptive prompt for image generation based on the blog content
 */
function createEnhancedPrompt(query: string): string {
  // Remove any special characters that might interfere with the API
  const cleanQuery = query.replace(/[^\w\s]/gi, ' ');
  
  // Extract key subject matter
  const keywords = extractKeywords(cleanQuery);
  
  // Create a more visually descriptive prompt
  let enhancedPrompt;
  
  if (cleanQuery.toLowerCase().includes('ai') || 
      cleanQuery.toLowerCase().includes('artificial intelligence') ||
      cleanQuery.toLowerCase().includes('machine learning')) {
    
    enhancedPrompt = `Futuristic visualization of ${keywords}, showing advanced technology, digital landscape`;
    
    if (cleanQuery.toLowerCase().includes('ethics')) {
      enhancedPrompt += ', human and AI interaction, ethical considerations';
    } else if (cleanQuery.toLowerCase().includes('trends')) {
      enhancedPrompt += ', innovation, future technology concept';
    } else if (cleanQuery.toLowerCase().includes('deep learning')) {
      enhancedPrompt += ', neural network visualization, abstract data patterns';
    }
  } else {
    enhancedPrompt = `Modern visualization of ${keywords}, professional, conceptual`;
  }
  
  return enhancedPrompt;
}

/**
 * Extract the most important keywords from the query
 */
function extractKeywords(query: string): string {
  // Remove common words that don't add visual value
  const commonWords = ['the', 'and', 'or', 'in', 'on', 'at', 'to', 'a', 'an', 'of', 'for', 'with', 'by'];
  
  const words = query.toLowerCase().split(' ')
    .filter(word => word.length > 2)  // Filter out very short words
    .filter(word => !commonWords.includes(word));  // Filter out common words
    
  // Prioritize longer, more specific words as they tend to be more descriptive
  words.sort((a, b) => b.length - a.length);
  
  // Take the top 3-5 most descriptive words
  const keywordString = words.slice(0, 4).join(', ');
  
  return keywordString || query; // Fallback to original query if no keywords found
}
