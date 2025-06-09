# Supabase Database Setup Guide

This guide explains how to set up the Supabase database tables required for the Love for BTS website.

## Prerequisites

1. A Supabase account and project
2. Access to the Supabase SQL Editor

## Setting Up User Playlists Table

The playlists feature requires a `user_playlists` table to store user-generated playlists.

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the following SQL commands:

```sql
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

-- Enable Row Level Security
ALTER TABLE user_playlists ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to select (read) playlists
CREATE POLICY "Allow public read access" ON user_playlists
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert playlists (for public sites)
CREATE POLICY "Allow anyone to insert" ON user_playlists
    FOR INSERT WITH CHECK (true);

-- Add realtime capabilities for the table (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE user_playlists;
```

5. Click "Run" to execute the SQL commands

## Setting Up Purple Hearts Collector Game Tables

The Purple Hearts Collector game requires tables to store player scores and leaderboard data.

1. In the SQL Editor, create a new query and run these commands:

```sql
-- Create the purple_hearts_scores table for storing game scores
CREATE TABLE IF NOT EXISTS purple_hearts_scores (
    id BIGSERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    hearts_collected INTEGER NOT NULL DEFAULT 0,
    misses INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    fast_catches INTEGER NOT NULL DEFAULT 0,
    perfect_catches INTEGER NOT NULL DEFAULT 0,
    members_caught JSONB DEFAULT '{}',
    game_duration INTEGER NOT NULL DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_purple_hearts_scores_score ON purple_hearts_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_purple_hearts_scores_created_at ON purple_hearts_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purple_hearts_scores_player_name ON purple_hearts_scores(player_name);

-- Enable Row Level Security
ALTER TABLE purple_hearts_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON purple_hearts_scores
    FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert scores" ON purple_hearts_scores
    FOR INSERT WITH CHECK (true);

-- Create view for top scores with ranking
CREATE OR REPLACE VIEW top_purple_hearts_scores AS
SELECT 
    *,
    ROW_NUMBER() OVER (ORDER BY score DESC, created_at ASC) as rank
FROM purple_hearts_scores
ORDER BY score DESC, created_at ASC;

-- Add realtime capabilities for the table (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE purple_hearts_scores;
```

## Setting Up Whack-a-Mole Game Tables

The Whack-a-Mole game requires tables to store player scores and leaderboard data.

1. In the SQL Editor, create a new query and run these commands:

```sql
-- Create the whack_a_mole_scores table for storing game scores
CREATE TABLE IF NOT EXISTS whack_a_mole_scores (
    id BIGSERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    hits INTEGER NOT NULL DEFAULT 0,
    misses INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    fast_hits INTEGER NOT NULL DEFAULT 0,
    perfect_hits INTEGER NOT NULL DEFAULT 0,
    game_duration INTEGER NOT NULL DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_score ON whack_a_mole_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_created_at ON whack_a_mole_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_player_name ON whack_a_mole_scores(player_name);

-- Enable Row Level Security
ALTER TABLE whack_a_mole_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON whack_a_mole_scores
    FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert scores" ON whack_a_mole_scores
    FOR INSERT WITH CHECK (true);

-- Create view for top scores with ranking
CREATE OR REPLACE VIEW top_whack_a_mole_scores AS
SELECT 
    *,
    ROW_NUMBER() OVER (ORDER BY score DESC, created_at ASC) as rank
FROM whack_a_mole_scores
ORDER BY score DESC, created_at ASC;

-- Add realtime capabilities for the table (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE whack_a_mole_scores;
```

## Setting Up Text Search (Optional)

If you want to enable text search functionality for playlists (search by title or creator name), you'll need to add the `pg_trgm` extension. Run the following commands:

```sql
-- Enable the pg_trgm extension for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create indexes for search functionality (creator name and title)
CREATE INDEX IF NOT EXISTS idx_playlists_creator_name ON user_playlists USING gin(creator_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_playlists_title ON user_playlists USING gin(title gin_trgm_ops);
```

## Sample Data (Optional)

If you want to add some sample playlists for testing:

```sql
-- Sample data for testing
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
```

## Verifying Setup

After running the SQL commands, you can verify that the tables were created successfully:

1. Go to the "Table Editor" in your Supabase dashboard
2. You should see a `user_playlists` table
3. Click on the table to view its structure and any sample data you added

## Environment Variables

Make sure your Next.js application has the correct Supabase URL and anon key in the environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values can be found in your Supabase project settings under "API".

## Troubleshooting

If you encounter any errors:

1. Check that the SQL syntax is correct for your Postgres version
2. Ensure you have the necessary permissions to create tables and extensions
3. Verify that the `pg_trgm` extension is available in your Supabase project 