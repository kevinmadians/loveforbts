import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://ybmwrczhjzqnrdavcvpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibXdyY3poanpxbnJkYXZjdnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTAzMzgsImV4cCI6MjA2MDIyNjMzOH0.d7QHRT6BPUSXmo32vhmIG__Zd3L3beuxu9jj2RRcd5k'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database tables
export type SupabaseMessage = {
  id: number
  name: string
  country: string
  message: string
  created_at: string
  expires_at: string
}

export type SupabaseHeartCount = {
  id: number
  total_clicks: number
  today_clicks: number
  date: string
}

export type SupabaseArmyStory = {
  id: number
  story_id: string
  name: string
  country: string
  bias: string
  content: string
  title?: string
  army_since: number
  created_at: string
  updated_at: string
} 