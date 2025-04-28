
// Serverless API endpoint to handle newsletter subscriptions

export default async function handler(request, response) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, error: { message: 'Method not allowed' } });
  }

  try {
    const { email } = request.body;
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({
        success: false,
        error: { message: 'Invalid email format.' }
      });
    }

    // Here you would normally connect to your database
    // For now, let's simulate a successful subscription
    // In a real implementation, you would use a database client appropriate for your serverless environment
    
    console.log(`Subscription attempt for: ${email}`);
    
    // Simulate checking for duplicate emails (1 in 5 chance of duplicate to test error handling)
    const isDuplicate = Math.random() < 0.2;
    
    if (isDuplicate) {
      return response.status(409).json({
        success: false,
        error: {
          code: '23505',
          message: 'This email is already subscribed to our newsletter.'
        }
      });
    }
    
    // Simulate successful subscription
    return response.status(201).json({
      success: true,
      data: {
        email,
        subscribed_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    
    return response.status(500).json({
      success: false,
      error: { message: 'Something went wrong. Please try again.' }
    });
  }
}
