
-- This SQL file contains the setup instructions for creating the necessary tables
-- Run these commands in your PostgreSQL database

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Optional: Create a role for limited access (if needed)
-- CREATE ROLE newsletter_app WITH LOGIN PASSWORD 'your_secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON newsletter_subscribers TO newsletter_app;
-- GRANT USAGE, SELECT ON SEQUENCE newsletter_subscribers_id_seq TO newsletter_app;
