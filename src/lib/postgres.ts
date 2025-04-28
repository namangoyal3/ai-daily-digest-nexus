
// This file provides the API for interacting with the PostgreSQL database
import { Pool } from 'pg';

// PostgreSQL connection configuration
const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com',
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  database: import.meta.env.VITE_DB_NAME || 'neuralnextgen',
  user: import.meta.env.VITE_DB_USER || 'neuralnextgen',
  password: import.meta.env.VITE_DB_PASSWORD || 'neuralnextgen1997',
  ssl: { rejectUnauthorized: false } // Required for AWS RDS connections
};

// Create a new pool instance with the configuration
let pool: Pool;

// Initialize the database connection pool
export function initializePool() {
  if (!pool) {
    try {
      pool = new Pool(dbConfig);
      console.log('PostgreSQL pool initialized');
    } catch (error) {
      console.error('Failed to initialize PostgreSQL pool:', error);
      throw error;
    }
  }
  return pool;
}

// Function to add a new subscriber
export async function addSubscriber(email: string) {
  try {
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 
        success: false, 
        error: { message: 'Invalid email format.' } 
      };
    }
    
    console.log('Adding subscriber with email:', email);
    
    // Initialize the connection pool if it's not already initialized
    if (!pool) {
      initializePool();
    }

    // Use parameterized query to prevent SQL injection
    const query = 'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *';
    const values = [email];
    
    const result = await pool.query(query, values);
    
    return { 
      success: true, 
      data: result.rows[0]
    };
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    
    // Handle duplicate email error (PostgreSQL error code 23505 is for unique_violation)
    if (error.code === '23505') {
      return { 
        success: false, 
        error: { 
          code: '23505', 
          message: 'This email is already subscribed to our newsletter.' 
        } 
      };
    }
    
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
    if (!pool) {
      initializePool();
    }
    
    console.log('Getting all subscribers');
    
    const result = await pool.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
    
    return { 
      success: true, 
      data: result.rows
    };
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return { 
      success: false, 
      error: { message: 'Failed to fetch subscribers.' }
    };
  }
}

// Function to remove a subscriber (for unsubscribe functionality)
export async function removeSubscriber(email: string) {
  try {
    if (!pool) {
      initializePool();
    }
    
    console.log('Removing subscriber with email:', email);
    
    const query = 'DELETE FROM newsletter_subscribers WHERE email = $1 RETURNING *';
    const values = [email];
    
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) {
      return {
        success: false,
        error: { message: 'Email not found in our subscribers list.' }
      };
    }
    
    return { 
      success: true, 
      data: result.rows[0]
    };
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return { 
      success: false, 
      error: { message: 'Failed to remove subscriber.' }
    };
  }
}

// Function to test the database connection
export async function testDatabaseConnection() {
  try {
    if (!pool) {
      initializePool();
    }
    
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0]);
    
    // Check if the newsletter_subscribers table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'newsletter_subscribers'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    console.log('newsletter_subscribers table exists:', tableExists);
    
    // If table doesn't exist, create it
    if (!tableExists) {
      await createSubscribersTable();
      console.log('Created newsletter_subscribers table');
    }
    
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { 
      success: false, 
      error: { message: 'Database connection failed.' }
    };
  }
}

// Function to create the newsletter_subscribers table if it doesn't exist
export async function createSubscribersTable() {
  try {
    if (!pool) {
      initializePool();
    }
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create an index on the email column for faster lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
    `);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to create newsletter_subscribers table:', error);
    return { 
      success: false, 
      error: { message: 'Failed to create database table.' }
    };
  }
}

// Initialize database connection for development purposes
export async function initializeDatabase() {
  console.log('Initializing database connection...');
  const connectionResult = await testDatabaseConnection();
  
  if (connectionResult.success) {
    console.log('Database initialization successful');
  } else {
    console.error('Database initialization failed:', connectionResult.error);
  }
  
  return connectionResult;
}

// Call initializeDatabase to ensure the table exists when the application starts
// This is safe to call in development. In production, you would want more control over when this runs.
if (import.meta.env.DEV) {
  initializeDatabase()
    .then(() => console.log('Database initialized for development'))
    .catch(err => console.error('Failed to initialize database:', err));
}
