
// Serverless API endpoint to check database health
import { Pool } from 'pg';

// Database connection configuration
const dbConfig = {
  host: process.env.VITE_DB_HOST || 'neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com',
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  database: process.env.VITE_DB_NAME || 'neuralnextgen',
  user: process.env.VITE_DB_USER || 'neuralnextgen',
  password: process.env.VITE_DB_PASSWORD || 'neuralnextgen1997',
  ssl: process.env.VITE_DB_USE_SSL !== 'false' ? 
    { rejectUnauthorized: process.env.VITE_DB_REJECT_UNAUTHORIZED !== 'false' } : 
    false,
};

export default async function handler(request, response) {
  console.log('Health check API called');
  
  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  response.setHeader('Content-Type', 'application/json');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    console.log('Handling preflight request');
    return response.status(200).end();
  }
  
  // Only allow GET requests
  if (request.method !== 'GET') {
    console.log('Method not allowed:', request.method);
    return response.status(405).json({ success: false, error: { message: 'Method not allowed' } });
  }

  console.log('Database config (sanitized):', {
    ...dbConfig,
    password: '********'
  });

  let pool = null;
  try {
    // Create a new pool for this request
    pool = new Pool(dbConfig);
    console.log('Pool created, testing connection...');
    
    // Test the database connection with a simple query
    const result = await pool.query('SELECT NOW() as time');
    console.log('Database query successful');
    
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
        details: error.message,
        code: error.code
      }
    });
  } finally {
    // Always close the pool if it was created
    if (pool) {
      try {
        await pool.end();
        console.log('Pool closed');
      } catch (closeError) {
        console.error('Error closing pool:', closeError);
      }
    }
  }
}
