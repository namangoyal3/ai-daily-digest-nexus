
// Serverless API endpoint to handle newsletter subscriptions
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

  let pool = null;
  try {
    const { email } = request.body;
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({
        success: false,
        error: { message: 'Invalid email format.' }
      });
    }

    // Create a connection pool
    pool = new Pool(dbConfig);
    
    // Get source, IP address and user agent if available
    const source = request.body.source || 'website';
    const ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const userAgent = request.headers['user-agent'] || '';
    
    // Insert the email into the neural_next_gen_newsletter_leads table
    const insertQuery = `
      INSERT INTO neural_next_gen_newsletter_leads (email, source, ip_address, user_agent)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, subscribed_at
    `;
    
    const result = await pool.query(insertQuery, [email, source, ipAddress, userAgent]);
    
    // Also insert into the legacy table for backward compatibility
    try {
      await pool.query(
        'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', 
        [email]
      );
    } catch (legacyError) {
      // Log but don't fail if legacy insert fails
      console.warn('Legacy table insert failed:', legacyError.message);
    }
    
    return response.status(201).json({
      success: true,
      data: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        subscribed_at: result.rows[0].subscribed_at
      }
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    
    // Check for duplicate key violation
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
  } finally {
    // Always close the pool if it was created
    if (pool) {
      await pool.end();
    }
  }
}
