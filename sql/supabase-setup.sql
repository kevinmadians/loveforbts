-- Create table for user messages (with optional expiration)
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NULL -- Now nullable
);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at);

-- Create table for ARMY stories
CREATE TABLE IF NOT EXISTS army_stories (
  id BIGSERIAL PRIMARY KEY,
  story_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  bias TEXT NOT NULL,
  content TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'My ARMY Story', -- Add title with default for existing records
  army_since INTEGER NOT NULL DEFAULT 2013, -- Add army_since year with default for existing records
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS army_stories_created_at_idx ON army_stories(created_at);
-- Create index on story_id for efficient lookup
CREATE INDEX IF NOT EXISTS army_stories_story_id_idx ON army_stories(story_id);

-- Create table for heart clicks counter
CREATE TABLE IF NOT EXISTS heart_clicks (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL UNIQUE,
  today_clicks INTEGER NOT NULL DEFAULT 0,
  total_clicks INTEGER NOT NULL DEFAULT 0
);

-- Create index on date for efficient lookup
CREATE INDEX IF NOT EXISTS heart_clicks_date_idx ON heart_clicks(date);

-- Create RLS policies for public read but restricted write access

-- Allow anonymous read access to messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY messages_select_policy ON messages 
  FOR SELECT USING (true);

-- Allow authenticated insert access to messages (or anonymous if using public API key)
CREATE POLICY messages_insert_policy ON messages 
  FOR INSERT WITH CHECK (true);

-- Allow anonymous read access to heart_clicks
ALTER TABLE heart_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY heart_clicks_select_policy ON heart_clicks 
  FOR SELECT USING (true);

-- Allow authenticated update access to heart_clicks (or anonymous if using public API key)
CREATE POLICY heart_clicks_insert_policy ON heart_clicks 
  FOR INSERT WITH CHECK (true);
CREATE POLICY heart_clicks_update_policy ON heart_clicks 
  FOR UPDATE USING (true);

-- Allow anonymous read access to army_stories
ALTER TABLE army_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY army_stories_select_policy ON army_stories 
  FOR SELECT USING (true);

-- Allow authenticated insert access to army_stories (or anonymous if using public API key)
CREATE POLICY army_stories_insert_policy ON army_stories 
  FOR INSERT WITH CHECK (true);

-- Add message_id column for unique string IDs
ALTER TABLE messages ADD COLUMN IF NOT EXISTS message_id TEXT UNIQUE;

-- For existing rows, you may want to backfill message_id with random values using an update script in Supabase SQL editor. 