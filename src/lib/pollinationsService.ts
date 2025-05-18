
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
    
    // Clean and format the query with optimized parameters for professional blog header
    const formattedQuery = encodeURIComponent(
      `${enhancedPrompt}, 16:9 aspect ratio, professional blog header image, high quality photograph, cinematic lighting, balanced composition, clean modern aesthetic, detailed, photorealistic, no text overlay, vivid colors, sharp focus`
    );
    
    // Generate a random seed for variation
    const seed = Math.floor(Math.random() * 1000000);
    
    // Construct the full URL with parameters for better quality
    // Using larger dimensions for better quality blog headers
    const imageUrl = `${baseUrl}${formattedQuery}?seed=${seed}&width=1200&height=675&nologo=true&style=photographic`;
    
    console.log("Generated image URL:", imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    // Return a placeholder image URL if something goes wrong
    return "https://images.unsplash.com/photo-1518770660439-4636190af475";
  }
}

/**
 * Creates an enhanced, more descriptive prompt for blog header image generation
 */
function createEnhancedPrompt(query: string): string {
  // Remove any special characters that might interfere with the API
  const cleanQuery = query.replace(/[^\w\s]/gi, ' ');
  
  // Extract key subject matter
  const keywords = extractKeywords(cleanQuery);
  
  // Create a more visually descriptive prompt based on content theme
  let enhancedPrompt;
  
  if (cleanQuery.toLowerCase().includes('ai') || 
      cleanQuery.toLowerCase().includes('artificial intelligence') ||
      cleanQuery.toLowerCase().includes('machine learning')) {
    
    enhancedPrompt = `Visual representation of ${keywords}, futuristic technology concept`;
    
    if (cleanQuery.toLowerCase().includes('ethics')) {
      enhancedPrompt = `Ethical AI concept visualization, balance between technology and human values`;
    } else if (cleanQuery.toLowerCase().includes('trends')) {
      enhancedPrompt = `Future AI technology trends visualization, innovation concept`;
    } else if (cleanQuery.toLowerCase().includes('deep learning')) {
      enhancedPrompt = `Neural network visualization, abstract deep learning concept`;
    } else if (cleanQuery.toLowerCase().includes('language') || cleanQuery.toLowerCase().includes('nlp')) {
      enhancedPrompt = `AI language processing concept, communication between human and machine`;
    } else if (cleanQuery.toLowerCase().includes('robot') || cleanQuery.toLowerCase().includes('automation')) {
      enhancedPrompt = `Advanced robotics and automation visualization, futuristic concept`;
    }
  } else if (cleanQuery.toLowerCase().includes('business') || 
             cleanQuery.toLowerCase().includes('industry') || 
             cleanQuery.toLowerCase().includes('enterprise')) {
    enhancedPrompt = `Business innovation through technology, professional modern workplace`;
  } else if (cleanQuery.toLowerCase().includes('education') || 
             cleanQuery.toLowerCase().includes('learning') || 
             cleanQuery.toLowerCase().includes('teaching')) {
    enhancedPrompt = `Modern educational technology concept, knowledge sharing visualization`;
  } else if (cleanQuery.toLowerCase().includes('healthcare') || 
             cleanQuery.toLowerCase().includes('medical')) {
    enhancedPrompt = `Healthcare technology advancement, modern medical innovation concept`;
  } else {
    enhancedPrompt = `Visual concept representing ${keywords}, modern professional visualization`;
  }
  
  return enhancedPrompt;
}

/**
 * Extract the most important keywords from the query for image generation
 */
function extractKeywords(query: string): string {
  // Remove common words that don't add visual value
  const commonWords = ['the', 'and', 'or', 'in', 'on', 'at', 'to', 'a', 'an', 'of', 'for', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had'];
  
  const words = query.toLowerCase().split(' ')
    .filter(word => word.length > 3)  // Filter out very short words
    .filter(word => !commonWords.includes(word));  // Filter out common words
    
  // Look for important concept pairs (multi-word terms)
  const importantPhrases = [
    'artificial intelligence',
    'machine learning',
    'deep learning',
    'neural network',
    'computer vision',
    'natural language processing'
  ];
  
  let keyTerms = [];
  
  // Check for important phrases in the query
  importantPhrases.forEach(phrase => {
    if (query.toLowerCase().includes(phrase)) {
      keyTerms.push(phrase);
    }
  });
  
  // Add individual important words if we don't have enough terms
  if (keyTerms.length < 2) {
    // Prioritize longer, more specific words as they tend to be more descriptive
    words.sort((a, b) => b.length - a.length);
    
    // Add top words until we have enough descriptive terms
    words.slice(0, 3).forEach(word => {
      if (!keyTerms.some(term => term.includes(word))) {
        keyTerms.push(word);
      }
    });
  }
  
  const keywordString = keyTerms.join(', ');
  
  return keywordString || query; // Fallback to original query if no keywords found
}
