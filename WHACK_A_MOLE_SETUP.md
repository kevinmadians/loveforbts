# BTS Whack-a-Mole Leaderboard Setup Guide

This guide helps you set up the leaderboard functionality for the BTS Whack-a-Mole game with Supabase database integration.

## Prerequisites

- Supabase project set up and configured
- Environment variables for Supabase connection already configured
- Basic understanding of SQL and Supabase

## Database Setup

### Step 1: Run the SQL Schema

1. Open your Supabase Dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `sql/whack-a-mole-leaderboard.sql`
4. Execute the SQL script

This will create:
- `whack_a_mole_scores` table for storing player scores
- Indexes for optimal query performance
- RLS (Row Level Security) policies for public access
- `top_whack_a_mole_scores` view for easy leaderboard queries
- Automatic timestamp triggers

### Step 2: Verify Database Setup

Run this query to verify everything is working:

```sql
-- Test query to check if tables and view are created
SELECT COUNT(*) FROM whack_a_mole_scores;
SELECT * FROM top_whack_a_mole_scores LIMIT 5;
```

If both queries run without errors, your database is ready!

## Features Overview

### 🎮 Enhanced Game Experience

**Player Identity System:**
- Name input screen before playing
- Player welcome interface
- Name change functionality

**Visual Improvements:**
- All BTS member images use PNG files exclusively
- No emoji fallbacks - clean, professional appearance
- Rounded image styling with proper error handling

### 🏆 Comprehensive Leaderboard

**Global Competition:**
- View top 10 players worldwide
- See recent scores from last 24 hours
- Real-time ranking calculation
- Personal rank display after each game

**Database Features:**
- Permanent score storage
- Optimized for fast queries
- Public read/insert access
- Automatic timestamp tracking

### 📱 Social Media Integration

**Multi-Platform Sharing:**
- Twitter with hashtags and mentions
- Facebook with rich descriptions
- WhatsApp for direct friend challenges
- Reddit for community discussions
- Telegram for group sharing
- Copy text functionality

**Smart Share Content:**
- Formatted score summaries
- Player ranking information
- Game URL for easy access
- BTS and ARMY hashtags

### 🎯 Game Over Enhancements

**Score Management:**
- Automatic score saving to database
- Global rank calculation and display
- Save status indicators
- Error handling with helpful messages

**Action Options:**
- Play again button
- View leaderboard button
- Social sharing interface
- Back to menu navigation

## File Structure

```
app/
├── components/games/
│   ├── BTSWhackAMole.tsx          # Main game component (updated)
│   ├── WhackAMoleLeaderboard.tsx  # Leaderboard display component
│   └── SocialShare.tsx            # Social media sharing component
├── lib/
│   └── supabase-whack-a-mole.ts   # Database helper functions
└── (routes)/games/bts-whack-a-mole/
    ├── page.tsx                   # Main game page (updated)
    └── leaderboard/
        ├── page.tsx               # Dedicated leaderboard page
        └── metadata.ts            # SEO metadata

sql/
└── whack-a-mole-leaderboard.sql   # Database schema
```

## Usage Instructions

### For Players

1. **Start Playing:**
   - Enter your ARMY name on the welcome screen
   - Click "Start Playing!" to begin

2. **Game Experience:**
   - All BTS members appear as PNG images
   - Each member has unique abilities and point values
   - Build streaks and achieve high scores

3. **After Game:**
   - Your score is automatically saved
   - See your global ranking
   - Share your achievement on social media
   - View the global leaderboard

### For Developers

**Database Functions Available:**
- `saveWhackAMoleScore()` - Save player score
- `getTopScores()` - Get leaderboard data
- `getPlayerBestScore()` - Get player's best score
- `getPlayerRank()` - Calculate player's rank
- `getRecentScores()` - Get recent 24h scores

**Components:**
- `<WhackAMoleLeaderboard />` - Display leaderboard
- `<SocialShare />` - Social media sharing interface

## Error Handling

The system includes comprehensive error handling:

- **Database Unavailable:** Shows helpful message about running SQL schema
- **Image Load Failures:** Graceful fallbacks with warning logs
- **Score Save Failures:** Local display continues, error logged
- **Network Issues:** User-friendly error messages

## SEO & Performance

**Optimizations:**
- Dedicated leaderboard page with proper metadata
- Optimized database queries with indexes
- Lazy loading for leaderboard components
- Responsive design for all screen sizes

**SEO Features:**
- Meta tags for game and leaderboard pages
- Open Graph images for social sharing
- Structured data for search engines
- Mobile-friendly responsive design

## Testing Checklist

- [ ] Database schema runs without errors
- [ ] Player can enter name and start game
- [ ] BTS member images display as PNG files
- [ ] Scores save to database after game
- [ ] Leaderboard displays correctly
- [ ] Social sharing works on different platforms
- [ ] Global ranking calculation is accurate
- [ ] Error states display helpful messages
- [ ] Responsive design works on mobile
- [ ] SEO metadata is properly configured

## Troubleshooting

**Common Issues:**

1. **"Database tables may not exist" error:**
   - Run the SQL schema in Supabase Dashboard
   - Verify table creation with test queries

2. **Images not loading:**
   - Check that PNG files exist in `/public/images/members/`
   - Verify file names match exactly: `rm.png`, `jin.png`, etc.

3. **Scores not saving:**
   - Check Supabase connection configuration
   - Verify RLS policies are correctly set
   - Check browser console for detailed error messages

4. **Social sharing not working:**
   - Verify popup blockers are disabled
   - Check that URLs are properly encoded
   - Test different browsers and devices

## Next Steps

The leaderboard system is now fully functional! Consider these future enhancements:

- **Tournament Mode:** Special events with time-limited competitions
- **Achievement System:** Badges for different accomplishments
- **Friend System:** Follow other players and compare scores
- **Global Statistics:** Overall game statistics and trends
- **Mobile App:** Native mobile version with push notifications

---

🎮 **Happy Gaming, ARMY!** 💜

The BTS Whack-a-Mole game now features a complete leaderboard and social sharing system. Players can compete globally, share their achievements, and enjoy a professional gaming experience with their favorite BTS members! 