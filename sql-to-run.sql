-- If you haven't already added the title column, add it as nullable
ALTER TABLE army_stories 
ADD COLUMN IF NOT EXISTS title TEXT;

-- If title column already exists but is NOT NULL, modify it to be nullable
-- This will NOT lose any data
ALTER TABLE army_stories 
ALTER COLUMN title DROP NOT NULL;

-- Set default value for title to null (allows it to be generated on the backend)
ALTER TABLE army_stories 
ALTER COLUMN title DROP DEFAULT;

-- If you haven't already added the army_since column, add it with default
ALTER TABLE army_stories 
ADD COLUMN IF NOT EXISTS army_since INTEGER NOT NULL DEFAULT 2013;

-- Ensure your table has the right indexes
CREATE INDEX IF NOT EXISTS army_stories_created_at_idx ON army_stories(created_at);
CREATE INDEX IF NOT EXISTS army_stories_story_id_idx ON army_stories(story_id);

-- Create table for story comments
CREATE TABLE IF NOT EXISTS story_comments (
  id BIGSERIAL PRIMARY KEY,
  story_id TEXT NOT NULL REFERENCES army_stories(story_id),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS story_comments_created_at_idx ON story_comments(created_at);

-- Create index on story_id for efficient lookup
CREATE INDEX IF NOT EXISTS story_comments_story_id_idx ON story_comments(story_id);

-- Allow anonymous read access to story_comments
ALTER TABLE story_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY story_comments_select_policy ON story_comments 
  FOR SELECT USING (true);

-- Allow authenticated insert access to story_comments (or anonymous if using public API key)
CREATE POLICY story_comments_insert_policy ON story_comments 
  FOR INSERT WITH CHECK (true); 