
// Serverless API endpoint to handle newsletter subscriptions
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// PostgreSQL connection configuration
const dbConfig = {
  host: process.env.VITE_DB_HOST || 'neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com',
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  database: process.env.VITE_DB_NAME || 'neuralnextgen',
  user: process.env.VITE_DB_USER || 'neuralnextgen',
  password: process.env.VITE_DB_PASSWORD || 'neuralnextgen1997',
  ssl: { rejectUnauthorized: false } // Required for AWS RDS connections
};

// Create connection pool
const pool = new Pool(dbConfig);

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

    // Use parameterized query to prevent SQL injection
    const query = 'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *';
    const values = [email];
    
    const result = await pool.query(query, values);
    
    return response.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    
    // Handle duplicate email error (PostgreSQL error code 23505 is for unique_violation)
    if (error.code === '23505') {
      return response.status(409).json({
        success: false,
        error: {
          code: '23505',
          message: 'This email is already subscribed to our newsletter.'
        }
      });
    }
    
    return response.status(500).json({
      success: false,
      error: { message: 'Something went wrong. Please try again.' }
    });
  }
}
