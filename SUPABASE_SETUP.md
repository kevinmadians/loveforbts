# Supabase Database Setup for Love for BTS

This document provides instructions for setting up the Supabase database backend for the Love for BTS fan community website.

## Database Configuration

The website uses Supabase for two main features:
1. Storing user messages (messages persist permanently)
2. Tracking heart button click counts (daily and total)

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project with your preferred name
3. Note your project URL and anon public API key (available in the API settings)

### 2. Database Schema Setup

Run the SQL commands from the `supabase-setup.sql` file in the Supabase SQL Editor. This will:

- Create the `messages` table for storing user messages
- Create the `heart_clicks` table for tracking heart button counts
- Set up indexes for efficient querying
- Configure Row Level Security policies

### 3. Update Environment Variables

Update your environment variables or the `app/lib/supabase.ts` file with your Supabase credentials:

```typescript
const supabaseUrl = 'https://ybmwrczhjzqnrdavcvpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibXdyY3poanpxbnJkYXZjdnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTAzMzgsImV4cCI6MjA2MDIyNjMzOH0.d7QHRT6BPUSXmo32vhmIG__Zd3L3beuxu9jj2RRcd5k'
```

## Database Tables

### Messages Table

Stores user-submitted messages:

| Column      | Type      | Description                        |
|-------------|-----------|------------------------------------|
| id          | BIGSERIAL | Primary key                        |
| name        | TEXT      | User's name                        |
| country     | TEXT      | User's country                     |
| message     | TEXT      | The message content                |
| created_at  | TIMESTAMP | When the message was created       |
| expires_at  | TIMESTAMP | Nullable (not used)                |

### Heart Clicks Table

Tracks the number of heart button clicks by date:

| Column        | Type      | Description                      |
|---------------|-----------|----------------------------------|
| id            | BIGSERIAL | Primary key                      |
| date          | TEXT      | Date in YYYY-MM-DD format        |
| today_clicks  | INTEGER   | Number of clicks for this date   |
| total_clicks  | INTEGER   | Running total of all clicks      |

## Data Management

- Messages are stored permanently in the database
- Messages are displayed in chronological order (newest first)
- No automatic cleanup is performed

## Security Considerations

The current setup uses Row Level Security (RLS) to:
- Allow public read access to messages and heart click counts
- Allow public write access for adding messages and updating heart click counts

For a production environment, consider implementing additional authentication and more restrictive RLS policies. 