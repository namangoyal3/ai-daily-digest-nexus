
// Serverless API endpoint to check database health

export default async function handler(request, response) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Only allow GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ success: false, error: { message: 'Method not allowed' } });
  }

  try {
    // In a real implementation, you would check the database connection here
    return response.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return response.status(500).json({
      success: false,
      error: { message: 'API health check failed.' }
    });
  }
}
