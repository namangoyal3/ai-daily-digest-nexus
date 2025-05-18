
export async function fetchRandomImage(query: string): Promise<string> {
  console.log("Generating image for query:", query);
  
  try {
    if (!query || query.trim() === '') {
      throw new Error("Empty image query");
    }
    
    // Create a more descriptive visual prompt from the blog title/subject
    const enhancedPrompt = createEnhancedPrompt(query);
    
    // Pollinations API endpoint for AI-generated images
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    
    // Enhanced parameters for high-quality blog header images
    const formattedQuery = encodeURIComponent(
      `${enhancedPrompt}, 16:9 aspect ratio, professional blog header image, high resolution photograph, cinematic lighting, balanced composition, clean modern aesthetic, no text overlay, vibrant colors, sharp focus, subtle gradient background`
    );
    
    // Generate a random seed for variation
    const seed = Math.floor(Math.random() * 1000000);
    
    // Construct the full URL with optimized parameters for better quality
    const imageUrl = `${baseUrl}${formattedQuery}?seed=${seed}&width=1400&height=800&nologo=true&style=photographic`;
    
    console.log("Generated image URL:", imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    // Return a high-quality placeholder image if something goes wrong
    return "https://images.unsplash.com/photo-1518770660439-4636190af475";
  }
}

/**
 * Creates an enhanced, visually-focused prompt for blog header image generation
 */
function createEnhancedPrompt(query: string): string {
  // Remove any special characters that might interfere with the API
  const cleanQuery = query.replace(/[^\w\s]/gi, ' ');
  
  // Extract key concepts and themes
  const keywords = extractKeywords(cleanQuery);
  const toneAndMood = determineToneAndMood(cleanQuery);
  
  // Create a visually rich prompt based on content theme
  let enhancedPrompt;
  
  if (cleanQuery.toLowerCase().includes('ai') || 
      cleanQuery.toLowerCase().includes('artificial intelligence') ||
      cleanQuery.toLowerCase().includes('machine learning')) {
    
    if (cleanQuery.toLowerCase().includes('ethics')) {
      enhancedPrompt = `Abstract visualization of ${keywords}, representing ethical AI concepts, balance between technology and human values, ${toneAndMood}`;
    } else if (cleanQuery.toLowerCase().includes('future') || cleanQuery.toLowerCase().includes('trend')) {
      enhancedPrompt = `Futuristic AI technology concept, innovation visualization with ${keywords}, ${toneAndMood}`;
    } else if (cleanQuery.toLowerCase().includes('deep learning') || cleanQuery.toLowerCase().includes('neural')) {
      enhancedPrompt = `Abstract neural network visualization with ${keywords}, beautiful interconnected nodes representing AI intelligence, ${toneAndMood}`;
    } else if (cleanQuery.toLowerCase().includes('language') || cleanQuery.toLowerCase().includes('nlp')) {
      enhancedPrompt = `Artistic representation of language and communication, flowing data patterns with ${keywords}, ${toneAndMood}`;
    } else if (cleanQuery.toLowerCase().includes('robot') || cleanQuery.toLowerCase().includes('automation')) {
      enhancedPrompt = `Modern robotic concept with ${keywords}, advanced automation visualization, ${toneAndMood}`;
    } else {
      enhancedPrompt = `Contemporary AI technology concept with ${keywords}, innovation visualization, ${toneAndMood}`;
    }
  } else if (cleanQuery.toLowerCase().includes('business') || 
             cleanQuery.toLowerCase().includes('industry') || 
             cleanQuery.toLowerCase().includes('enterprise')) {
    enhancedPrompt = `Professional business innovation concept with ${keywords}, modern technological workplace, ${toneAndMood}`;
  } else if (cleanQuery.toLowerCase().includes('education') || 
             cleanQuery.toLowerCase().includes('learning') || 
             cleanQuery.toLowerCase().includes('teaching')) {
    enhancedPrompt = `Educational technology concept with ${keywords}, knowledge sharing visualization, ${toneAndMood}`;
  } else if (cleanQuery.toLowerCase().includes('healthcare') || 
             cleanQuery.toLowerCase().includes('medical')) {
    enhancedPrompt = `Advanced healthcare technology concept with ${keywords}, medical innovation visualization, ${toneAndMood}`;
  } else if (cleanQuery.toLowerCase().includes('environment') || 
             cleanQuery.toLowerCase().includes('sustainability')) {
    enhancedPrompt = `Environmental technology concept with ${keywords}, sustainability visualization, ${toneAndMood}`;
  } else {
    enhancedPrompt = `Abstract digital concept representing ${keywords}, modern professional visualization, ${toneAndMood}`;
  }
  
  return enhancedPrompt;
}

/**
 * Extract meaningful keywords from the query for image generation
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
    'natural language processing',
    'ethical ai',
    'ai ethics',
    'sustainable technology',
    'future technology',
    'digital transformation'
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

/**
 * Determine the appropriate visual tone and mood based on the query content
 */
function determineToneAndMood(query: string): string {
  // Default visual style
  let tone = "professional, elegant";
  
  // Determine appropriate visual tone based on content
  if (query.toLowerCase().includes('future') || 
      query.toLowerCase().includes('innovation') || 
      query.toLowerCase().includes('advancement')) {
    tone = "futuristic, bold, forward-thinking, innovative";
  } else if (query.toLowerCase().includes('ethics') || 
             query.toLowerCase().includes('responsible') || 
             query.toLowerCase().includes('governance')) {
    tone = "thoughtful, balanced, contemplative, ethical";
  } else if (query.toLowerCase().includes('security') || 
             query.toLowerCase().includes('privacy') || 
             query.toLowerCase().includes('protection')) {
    tone = "secure, trustworthy, protective, reliable";
  } else if (query.toLowerCase().includes('creative') || 
             query.toLowerCase().includes('design') || 
             query.toLowerCase().includes('art')) {
    tone = "creative, artistic, expressive, imaginative";
  } else if (query.toLowerCase().includes('analysis') || 
             query.toLowerCase().includes('research') || 
             query.toLowerCase().includes('study')) {
    tone = "analytical, detailed, precise, informative";
  } else if (query.toLowerCase().includes('healthcare') || 
             query.toLowerCase().includes('medical') || 
             query.toLowerCase().includes('wellness')) {
    tone = "caring, clinical, health-focused, compassionate";
  }
  
  return tone;
}
