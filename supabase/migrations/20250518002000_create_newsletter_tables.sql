
-- Create newsletter subscribers table 
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  source VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy allowing administrators to see all subscribers
CREATE POLICY "Administrators can see all subscribers" 
  ON public.newsletter_subscribers 
  FOR SELECT 
  USING (auth.role() = 'authenticated');
  
-- Create policy allowing admins to insert subscribers
CREATE POLICY "Administrators can insert subscribers" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Make sure the blogs table exists (used in testDatabaseConnection)
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (read-only)
CREATE POLICY "Allow public read access" 
  ON public.blogs 
  FOR SELECT 
  USING (true);
