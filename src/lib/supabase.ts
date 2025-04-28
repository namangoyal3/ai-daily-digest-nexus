
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
// with fallbacks for development to prevent crashes
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Function to add a new subscriber
export async function addSubscriber(email: string) {
  try {
    // Only proceed if we have real credentials
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
      return { success: false, error: { message: 'Configuration error. Please contact support.' } };
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }]);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return { success: false, error };
  }
}
