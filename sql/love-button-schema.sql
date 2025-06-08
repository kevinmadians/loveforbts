-- Love/Like functionality for messages and stories
-- This schema adds like functionality with user tracking based on IP and session

-- Create likes table to track individual likes
CREATE TABLE IF NOT EXISTS message_likes (
  id BIGSERIAL PRIMARY KEY,
  message_id TEXT NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
  user_ip TEXT NOT NULL,
  user_session TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(message_id, user_ip, user_session)
);

CREATE TABLE IF NOT EXISTS story_likes (
  id BIGSERIAL PRIMARY KEY,
  story_id TEXT NOT NULL REFERENCES army_stories(story_id) ON DELETE CASCADE,
  user_ip TEXT NOT NULL,
  user_session TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, user_ip, user_session)
);

-- Add like_count column to messages table
ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Add like_count column to army_stories table
ALTER TABLE army_stories 
ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_message_likes_message_id ON message_likes(message_id);
CREATE INDEX IF NOT EXISTS idx_story_likes_story_id ON story_likes(story_id);
CREATE INDEX IF NOT EXISTS idx_messages_like_count ON messages(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_army_stories_like_count ON army_stories(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_messages_featured ON messages(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_army_stories_featured ON army_stories(is_featured) WHERE is_featured = TRUE;

-- Function to update like count for messages
CREATE OR REPLACE FUNCTION update_message_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE messages 
    SET like_count = like_count + 1 
    WHERE message_id = NEW.message_id;
    
    -- Check if message should be featured (more than 10 likes)
    UPDATE messages 
    SET is_featured = TRUE 
    WHERE message_id = NEW.message_id AND like_count >= 10;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE messages 
    SET like_count = GREATEST(like_count - 1, 0) 
    WHERE message_id = OLD.message_id;
    
    -- Remove featured status if likes fall below threshold
    UPDATE messages 
    SET is_featured = FALSE 
    WHERE message_id = OLD.message_id AND like_count < 10;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update like count for stories
CREATE OR REPLACE FUNCTION update_story_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE army_stories 
    SET like_count = like_count + 1 
    WHERE story_id = NEW.story_id;
    
    -- Check if story should be featured (more than 10 likes)
    UPDATE army_stories 
    SET is_featured = TRUE 
    WHERE story_id = NEW.story_id AND like_count >= 10;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE army_stories 
    SET like_count = GREATEST(like_count - 1, 0) 
    WHERE story_id = OLD.story_id;
    
    -- Remove featured status if likes fall below threshold
    UPDATE army_stories 
    SET is_featured = FALSE 
    WHERE story_id = OLD.story_id AND like_count < 10;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update like counts
DROP TRIGGER IF EXISTS message_likes_count_trigger ON message_likes;
CREATE TRIGGER message_likes_count_trigger
  AFTER INSERT OR DELETE ON message_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_message_like_count();

DROP TRIGGER IF EXISTS story_likes_count_trigger ON story_likes;
CREATE TRIGGER story_likes_count_trigger
  AFTER INSERT OR DELETE ON story_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_story_like_count();

-- Enable Row Level Security
ALTER TABLE message_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (everyone can like and view likes)
CREATE POLICY "Public can view message likes" ON message_likes FOR SELECT USING (true);
CREATE POLICY "Public can insert message likes" ON message_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can delete own message likes" ON message_likes FOR DELETE USING (true);

CREATE POLICY "Public can view story likes" ON story_likes FOR SELECT USING (true);
CREATE POLICY "Public can insert story likes" ON story_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can delete own story likes" ON story_likes FOR DELETE USING (true); 