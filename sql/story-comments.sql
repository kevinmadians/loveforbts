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