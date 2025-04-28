
-- This SQL file contains the setup instructions for creating the necessary tables
-- Run these commands in your PostgreSQL database

-- Create newsletter subscribers table (keep this table for backward compatibility)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Create new leads table for NeuralNextGen newsletter
CREATE TABLE IF NOT EXISTS neural_next_gen_newsletter_leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_neural_next_gen_newsletter_leads_email ON neural_next_gen_newsletter_leads(email);
