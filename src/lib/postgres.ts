
// This file provides functions for client-side interaction with the PostgreSQL database via API

// Type definitions to match responses
interface DBResponse {
  success: boolean;
  data?: any;
  error?: {
    code?: string;
    message: string;
  };
}

// Get the base URL for API requests based on environment
const getBaseUrl = () => {
  // For development or when running locally, use relative paths
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '';
  }
  // For production environment
  return window.location.origin;
};

// Function to subscribe to newsletter (client-side implementation)
export async function addSubscriber(email: string, source: string = 'website'): Promise<DBResponse> {
  try {
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 
        success: false, 
        error: { message: 'Invalid email format.' } 
      };
    }
    
    console.log('Adding subscriber with email:', email);

    // Send request to our serverless API endpoint
    const response = await fetch(`${getBaseUrl()}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source })
    });
    
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    return { 
      success: false, 
      error: { message: 'Something went wrong. Please try again.' } 
    };
  }
}

// Function to test the API connection - for client-side use
export async function testDatabaseConnection(): Promise<DBResponse> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/health-check`, { method: 'GET' });
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('API connection test failed:', error);
    return { 
      success: false, 
      error: { message: 'API connection failed.' }
    };
  }
}

// Keep the mock implementations for compatibility
export function initializePool() {
  console.log('PostgreSQL pool initialized via API');
  return null;
}

export async function getAllSubscribers(): Promise<DBResponse> {
  console.warn('getAllSubscribers() is not implemented in the client-side version');
  return {
    success: false,
    error: { message: 'This function is only available server-side' }
  };
}

export async function removeSubscriber(email: string): Promise<DBResponse> {
  console.warn('removeSubscriber() is not implemented in the client-side version');
  return {
    success: false,
    error: { message: 'This function is only available server-side' }
  };
}

export async function createSubscribersTable(): Promise<DBResponse> {
  console.warn('createSubscribersTable() is not implemented in the client-side version');
  return {
    success: false,
    error: { message: 'This function is only available server-side' }
  };
}

export async function initializeDatabase(): Promise<DBResponse> {
  // Test the database connection
  return testDatabaseConnection();
}

