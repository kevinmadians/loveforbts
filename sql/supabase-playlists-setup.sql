-- Create the user_playlists table for storing BTS playlists
CREATE TABLE IF NOT EXISTS user_playlists (
    id BIGSERIAL PRIMARY KEY,
    playlist_id TEXT NOT NULL UNIQUE,
    creator_name TEXT NOT NULL,
    title TEXT NOT NULL,
    songs TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on playlist_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_playlists_playlist_id ON user_playlists(playlist_id);

-- Create index on created_at for sorting in descending order (newest first)
CREATE INDEX IF NOT EXISTS idx_playlists_created_at ON user_playlists(created_at DESC);

-- Create indexes for search functionality (creator name and title)
CREATE INDEX IF NOT EXISTS idx_playlists_creator_name ON user_playlists USING gin(creator_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_playlists_title ON user_playlists USING gin(title gin_trgm_ops);

-- Enable Row Level Security
ALTER TABLE user_playlists ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to select (read) playlists
CREATE POLICY "Allow public read access" ON user_playlists
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert playlists
CREATE POLICY "Allow authenticated users to insert" ON user_playlists
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Create policy to allow anyone to insert playlists (for public sites)
-- Note: Remove this policy and uncomment the one above if you want to restrict to authenticated users only
CREATE POLICY "Allow anyone to insert" ON user_playlists
    FOR INSERT WITH CHECK (true);

-- Add realtime capabilities for the table
ALTER PUBLICATION supabase_realtime ADD TABLE user_playlists;

-- Sample data for testing (optional - can be commented out for production)
INSERT INTO user_playlists (playlist_id, creator_name, title, songs, created_at, updated_at)
VALUES 
    ('sample123', 'ARMY Fan', 'My First BTS Playlist', 
     ARRAY['0WCiI0ddGb6qZhDTV4MYtH', '3zHRYAiQKlh3Wn1QPVPEmb', '3XYZnU9DrScDXdJP1hn5fL'], 
     NOW(), NOW()),
    ('sample456', 'BTS Lover', 'Best BTS Ballads', 
     ARRAY['5QFmZ0t0Bj5pEbCWwQJoGw', '2L7K5Bf0QqKRgRoNYm5cfa', '2HfTImQTnOJOQVN00XcOZj', '0K9Rc4ahO7Q1Rjk4quSMIx'], 
     NOW(), NOW()),
    ('sample789', 'Purple Heart', 'BTS Dance Tracks', 
     ARRAY['5v4uRu24ReBuBT5DQ4YpQm', '0t1kP63rueHleOhQkYRUuo', '5KawlOMHjWeUjQtnuRs22c', '5KAwJC3H1OhS0SWuGU2k7E', '7qrcE1uHuVbYyv8Ic5oVyu'], 
     NOW(), NOW()); 