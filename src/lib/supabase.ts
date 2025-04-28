
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Function to add a new subscriber
export async function addSubscriber(email: string) {
  try {
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
