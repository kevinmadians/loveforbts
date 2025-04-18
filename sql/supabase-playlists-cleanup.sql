-- Disable realtime capabilities for the table
-- First check if the table exists in the publication
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'user_playlists'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE user_playlists;
  END IF;
END
$$;

-- Drop all policies
DROP POLICY IF EXISTS "Allow public read access" ON user_playlists;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON user_playlists;
DROP POLICY IF EXISTS "Allow anyone to insert" ON user_playlists;

-- Drop all indexes
DROP INDEX IF EXISTS idx_playlists_playlist_id;
DROP INDEX IF EXISTS idx_playlists_created_at;
DROP INDEX IF EXISTS idx_playlists_creator_name;
DROP INDEX IF EXISTS idx_playlists_title;

-- Drop the table itself
DROP TABLE IF EXISTS user_playlists;

-- Note: This script completely removes the user_playlists table and all its related objects.
-- To execute this in Supabase:
-- 1. Go to the SQL Editor in the Supabase dashboard
-- 2. Paste this script
-- 3. Execute the script
-- 4. Refresh the database schema to verify the table has been removed 