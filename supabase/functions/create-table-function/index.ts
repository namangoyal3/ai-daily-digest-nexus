
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { tableName, columns } = await req.json();

    // Validate input
    if (!tableName || !columns || !Array.isArray(columns) || columns.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid input: tableName and columns array are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format columns for the query
    const columnDefinitions = columns
      .map(col => {
        const { name, type, constraints = [] } = col;
        if (!name || !type) {
          throw new Error("Each column must have a name and type");
        }
        return `${name} ${type} ${constraints.join(" ")}`.trim();
      })
      .join(", ");

    // Use the Postgres extension to execute the CREATE TABLE statement
    const { data, error } = await supabaseAdmin.rpc(
      "execute_sql",
      { 
        query: `
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            ${columnDefinitions},
            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
          );
          
          -- Add RLS policies
          ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;
          
          -- Create policy for authenticated users to select their own rows
          DO $$
          BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = '${tableName}' 
            AND policyname = 'Allow users to select their own rows'
          ) THEN
            EXECUTE 'CREATE POLICY "Allow users to select their own rows" ON ${tableName} FOR SELECT USING (auth.uid() = user_id)';
          END IF;
          END $$;
        `
      }
    );

    if (error) {
      console.error("Error creating table:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Table ${tableName} created successfully`,
        data,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
