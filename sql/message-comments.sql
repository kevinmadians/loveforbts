-- Create table for message comments
CREATE TABLE IF NOT EXISTS message_comments (
  id BIGSERIAL PRIMARY KEY,
  message_id INTEGER NOT NULL REFERENCES messages(id),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS message_comments_created_at_idx ON message_comments(created_at);

-- Create index on message_id for efficient lookup
CREATE INDEX IF NOT EXISTS message_comments_message_id_idx ON message_comments(message_id);

-- Allow anonymous read access to message_comments
ALTER TABLE message_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY message_comments_select_policy ON message_comments 
  FOR SELECT USING (true);

-- Allow authenticated insert access to message_comments (or anonymous if using public API key)
CREATE POLICY message_comments_insert_policy ON message_comments 
  FOR INSERT WITH CHECK (true); 