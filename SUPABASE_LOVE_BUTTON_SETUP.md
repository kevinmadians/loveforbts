# Love Button Feature Setup Instructions

## 🚨 **IMPORTANT: You need to run the SQL schema before the love button feature will work!**

The errors you're seeing (`Error checking story like status: {}`) happen because the database tables for the love functionality don't exist yet.

## Step 1: Access Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar

## Step 2: Run the SQL Schema

Copy and paste the **ENTIRE** contents of `love-button-schema.sql` into the SQL Editor and click **Run**.

The SQL will create:
- ✅ `message_likes` table for tracking message likes
- ✅ `story_likes` table for tracking story likes  
- ✅ `like_count` and `is_featured` columns in existing tables
- ✅ Database triggers for automatic like counting
- ✅ Indexes for performance
- ✅ Row Level Security policies

## Step 3: Verify Setup

After running the SQL, check that these tables exist in **Database** → **Tables**:
- `message_likes`
- `story_likes`

And check that these columns were added to existing tables:
- `messages`: `like_count`, `is_featured`
- `army_stories`: `like_count`, `is_featured`

## Step 4: Test the Feature

1. Visit any individual message page (e.g., `/messages/abc123`)
2. Visit any individual story page (e.g., `/army-story/xyz789`)
3. You should see the purple heart love button
4. Click it to test liking/unliking
5. Check that like counts display correctly on listing pages

## Features After Setup:

### 📋 **Listing Pages** (Messages & Stories):
- Show read-only like count with purple heart icon (only when > 0 likes)
- No interactive buttons to keep pages fast

### 💜 **Individual Detail Pages**:
- Interactive love button with purple heart
- Real-time like count updates
- Encouraging toast messages
- User session tracking (IP + browser session)

### ⭐ **Featured Content**:
- Messages/stories with 10+ likes automatically become "featured"
- Ready for homepage integration

## Troubleshooting:

**Error: `relation "message_likes" does not exist`**
→ The SQL schema hasn't been run yet. Follow Step 2 above.

**Error: `Error checking story like status: {}`**
→ Same issue - run the SQL schema.

**Love buttons not appearing**
→ Make sure you're on individual message/story pages, not the listing pages.

**Permissions error**
→ Check that Row Level Security policies were created correctly. 