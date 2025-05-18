
-- Create a function to create the blogs table if it doesn't exist
CREATE OR REPLACE FUNCTION create_blogs_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'blogs'
  ) THEN
    -- Create the blogs table
    CREATE TABLE public.blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      read_time TEXT,
      image_url TEXT,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    
    -- Add row level security policies
    ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
    
    -- Create policy for public access (read-only)
    CREATE POLICY "Allow public read access" 
      ON public.blogs 
      FOR SELECT 
      USING (true);
      
    -- Create policy for authenticated users to insert
    CREATE POLICY "Allow authenticated users to insert" 
      ON public.blogs 
      FOR INSERT 
      TO authenticated 
      WITH CHECK (true);
      
    -- Create policy for authenticated users to update own blogs
    CREATE POLICY "Allow authenticated users to update own blogs" 
      ON public.blogs 
      FOR UPDATE 
      TO authenticated 
      USING (true);
      
    -- Create policy for authenticated users to delete own blogs
    CREATE POLICY "Allow authenticated users to delete own blogs" 
      ON public.blogs 
      FOR DELETE 
      TO authenticated 
      USING (true);
      
    -- Create updated_at trigger for the blogs table
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'moddatetime') THEN
      CREATE TRIGGER set_blogs_updated_at
      BEFORE UPDATE ON public.blogs
      FOR EACH ROW
      EXECUTE FUNCTION moddatetime(updated_at);
    ELSE
      -- Create the moddatetime function if it doesn't exist
      CREATE OR REPLACE FUNCTION moddatetime() 
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER set_blogs_updated_at
      BEFORE UPDATE ON public.blogs
      FOR EACH ROW
      EXECUTE FUNCTION moddatetime();
    END IF;
  END IF;
END;
$$;

COMMENT ON FUNCTION create_blogs_table IS 'Creates the blogs table if it does not exist';
