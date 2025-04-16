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