-- Enable pg_cron and pg_net extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a table to store content generation schedules
CREATE TABLE public.content_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  schedule_time TIME NOT NULL DEFAULT '08:00',
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  categories TEXT[] NOT NULL DEFAULT '{"AI Trends", "Deep Learning"}',
  days_of_week INTEGER[] NULL, -- 0-6 for Sunday-Saturday
  day_of_month INTEGER NULL, -- 1-31 for monthly
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for content schedules (admin only)
CREATE POLICY "Only service role can manage schedules" 
ON public.content_schedules 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create a table to track automated content generation logs
CREATE TABLE public.content_generation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NULL REFERENCES public.blogs(id),
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'pending')),
  error_message TEXT NULL,
  generation_type TEXT NOT NULL DEFAULT 'scheduled',
  categories TEXT[] NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_generation_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for logs (admin read access)
CREATE POLICY "Service role can manage logs" 
ON public.content_generation_logs 
FOR ALL 
USING (auth.role() = 'service_role');

-- Add SEO fields to blogs table
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT[],
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'NeuralNextGen',
ADD COLUMN IF NOT EXISTS author_bio TEXT DEFAULT 'AI Research Team',
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category_published ON public.blogs(category, published_at DESC);

-- Update updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for content_schedules
CREATE TRIGGER update_content_schedules_updated_at
BEFORE UPDATE ON public.content_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default schedule
INSERT INTO public.content_schedules (name, is_active, schedule_time, frequency, categories)
VALUES ('Daily AI Content', true, '08:00', 'daily', '{"AI Trends", "Deep Learning", "AI Applications"}');

-- Set up the cron job for daily content generation
-- This will run every day at 8:00 AM UTC
SELECT cron.schedule(
  'daily-ai-content-generation',
  '0 8 * * *',
  $$
  SELECT net.http_post(
    url := 'https://vlvqevzienyrlwlproxpj.supabase.co/functions/v1/generate-scheduled-content',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdnFldnppZW55bHdscHJveHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU5MTYwOSwiZXhwIjoyMDYzMTY3NjA5fQ.r8lWGPUTK1QGtRjxLx1xX4Wps7BsVoLCtH2c4BgTSNo"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb
  );
  $$
);