
-- Run the migration to create the necessary tables
DO $$ 
BEGIN
  -- Run the migration if tables don't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'newsletter_subscribers' AND schemaname = 'public') THEN
    RAISE NOTICE 'Creating newsletter_subscribers table';
  END IF;
  
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'blogs' AND schemaname = 'public') THEN
    RAISE NOTICE 'Creating blogs table';
  END IF;
END $$;

-- Test with some sample data
INSERT INTO public.blogs (title, content, excerpt, category, date, read_time, featured)
VALUES 
('Test Blog Post', 'This is a test blog post content.', 'Test excerpt', 'AI Trends', '2025-05-18', '2 min', true)
ON CONFLICT DO NOTHING;
