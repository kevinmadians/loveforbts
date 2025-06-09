-- Create leaderboard table for BTS Whack-a-Mole game
CREATE TABLE IF NOT EXISTS whack_a_mole_scores (
    id BIGSERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    accuracy DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    hits INTEGER NOT NULL DEFAULT 0,
    misses INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    fast_hits INTEGER NOT NULL DEFAULT 0,
    perfect_hits INTEGER NOT NULL DEFAULT 0,
    game_duration INTEGER NOT NULL DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_score ON whack_a_mole_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_created_at ON whack_a_mole_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whack_a_mole_scores_player_name ON whack_a_mole_scores(player_name);

-- Enable Row Level Security (RLS)
ALTER TABLE whack_a_mole_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can read and insert scores)
CREATE POLICY "Anyone can view leaderboard scores" ON whack_a_mole_scores
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert their own score" ON whack_a_mole_scores
    FOR INSERT WITH CHECK (true);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_whack_a_mole_scores_updated_at 
    BEFORE UPDATE ON whack_a_mole_scores 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for top scores (for easy querying)
CREATE OR REPLACE VIEW top_whack_a_mole_scores AS
SELECT 
    id,
    player_name,
    score,
    level,
    accuracy,
    hits,
    misses,
    best_streak,
    fast_hits,
    perfect_hits,
    created_at,
    ROW_NUMBER() OVER (ORDER BY score DESC, created_at ASC) as rank
FROM whack_a_mole_scores
ORDER BY score DESC, created_at ASC
LIMIT 100; 