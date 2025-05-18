
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Main handler function
serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Parse request data
    const { key_name } = await req.json();
    
    if (!key_name) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing parameter: key_name",
          configured: false
        }),
        { 
          headers: { "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Check if this key exists
    // Note: This is a simple check - we don't return the actual value
    // We just check if it's defined
    const keyValue = Deno.env.get(key_name);
    const isConfigured = !!keyValue;
    
    return new Response(
      JSON.stringify({
        success: true,
        message: isConfigured ? "API key is configured" : "API key is not configured",
        configured: isConfigured
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error checking API key status:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
        configured: false
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
