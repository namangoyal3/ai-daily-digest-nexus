
export async function fetchRandomImage(query: string): Promise<string> {
  console.log("Generating image for query:", query);
  
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
  
  // Note: Pollinations generates images on-the-fly when the URL is loaded,
  // so we don't need to make a fetch request here, just return the URL
}
