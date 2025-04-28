
import { Pool } from 'pg';

// PostgreSQL connection configuration
const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com',
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  database: import.meta.env.VITE_DB_NAME || 'neuralnextgen',
  user: import.meta.env.VITE_DB_USER || 'neuralnextgen',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  ssl: import.meta.env.VITE_DB_USE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
};

// Create a connection pool to efficiently manage database connections
const pool = new Pool(dbConfig);

// Test the connection and initialize the table if needed
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    try {
      // Check if the newsletter_subscribers table exists, if not create it
      await client.query(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize the database on module load
initializeDatabase().catch(console.error);

// Function to add a new subscriber
export async function addSubscriber(email: string) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *',
        [email]
      );
      return { success: true, data: result.rows[0] };
    } catch (error: any) {
      // Handle duplicate email error (PostgreSQL error code 23505)
      if (error.code === '23505') {
        return { 
          success: false, 
          error: { 
            code: '23505', 
            message: 'This email is already subscribed to our newsletter.' 
          } 
        };
      }
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return { 
      success: false, 
      error: { 
        message: 'Something went wrong. Please try again.' 
      } 
    };
  }
}

// Function to get all subscribers (for admin purposes)
export async function getAllSubscribers() {
  try {
    const result = await pool.query(
      'SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC'
    );
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return { success: false, error };
  }
}

// Function to remove a subscriber (for unsubscribe functionality)
export async function removeSubscriber(email: string) {
  try {
    const result = await pool.query(
      'DELETE FROM newsletter_subscribers WHERE email = $1 RETURNING *',
      [email]
    );
    
    if (result.rowCount === 0) {
      return { success: false, error: { message: 'Email not found.' } };
    }
    
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return { success: false, error };
  }
}
