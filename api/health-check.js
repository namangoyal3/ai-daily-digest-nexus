
// Serverless API endpoint to check database health
import { Pool } from 'pg';

// Database connection configuration
const dbConfig = {
  host: process.env.VITE_DB_HOST || 'neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com',
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  database: process.env.VITE_DB_NAME || 'neuralnextgen',
  user: process.env.VITE_DB_USER || 'neuralnextgen',
  password: process.env.VITE_DB_PASSWORD || 'neuralnextgen1997',
  ssl: process.env.VITE_DB_USE_SSL !== 'false',
};

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

  let pool = null;
  try {
    // Create a new pool for this request
    pool = new Pool(dbConfig);
    
    // Test the database connection with a simple query
    const result = await pool.query('SELECT NOW() as time');
    
    return response.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database_time: result.rows[0].time
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return response.status(500).json({
      success: false,
      error: { 
        message: 'API health check failed.',
        details: error.message 
      }
    });
  } finally {
    // Always close the pool if it was created
    if (pool) {
      await pool.end();
    }
  }
}
