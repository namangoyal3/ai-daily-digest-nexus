
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the values from the Supabase integration
const supabaseUrl = "https://vlvqevzienylwlproxpj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdnFldnppZW55bHdscHJveHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTE2MDksImV4cCI6MjA2MzE2NzYwOX0.Ye9W2uo49nwt1EUtqFAH3uwhFjJc2VcaAs_le9mMNXE";

// Create a single Supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: localStorage
    }
  }
);

// Function to test database connection
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing Supabase database connection...');
    const { data, error } = await supabase
      .from('blogs')
      .select('count')
      .single();
    
    if (error) {
      console.error('Database connection error:', error);
      return { 
        success: false, 
        error: { 
          message: error.message,
          details: error.details,
          hint: error.hint
        }
      };
    }

    return {
      success: true,
      data: {
        message: 'Successfully connected to database',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Unexpected error testing connection:', error);
    return { 
      success: false, 
      error: { message: error instanceof Error ? error.message : 'Unknown database error' }
    };
  }
}

// Function to add a new subscriber
export async function addSubscriber(email: string, source: string = 'website') {
  try {
    console.log(`Adding subscriber with email: ${email}, source: ${source}`);
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email,
          source, 
          subscribed_at: new Date().toISOString(),
          ip_address: null, // These would be set on the server side
          user_agent: null  // These would be set on the server side
        }
      ]);
      
    if (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
    
    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error('Error in addSubscriber function:', error);
    return { 
      success: false, 
      error: error instanceof Error ? { message: error.message } : { message: 'Unknown error' }
    };
  }
}
