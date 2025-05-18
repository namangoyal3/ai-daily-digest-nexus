
export async function fetchRandomImage(query: string): Promise<string> {
  console.log("Generating image for query:", query);
  
  try {
    if (!query || query.trim() === '') {
      throw new Error("Empty image query");
    }
    
    // Pollinations API endpoint for AI-generated images
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    
    // Clean and format the query
    const formattedQuery = encodeURIComponent(
      `${query}, high quality, professional, detailed, vibrant, 4k, photorealistic`
    );
    
    // Generate a random seed for variation
    const seed = Math.floor(Math.random() * 1000000);
    
    // Construct the full URL with parameters
    const imageUrl = `${baseUrl}${formattedQuery}?seed=${seed}&width=1200&height=800&nologo=true`;
    
    console.log("Generated image URL:", imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    // Return a placeholder image URL if something goes wrong
    return "https://images.unsplash.com/photo-1518770660439-4636190af475";
  }
}
