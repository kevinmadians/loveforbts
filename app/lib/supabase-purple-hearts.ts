import { supabase } from './supabase'

export interface PurpleHeartsScore {
  id?: number
  player_name: string
  score: number
  level: number
  accuracy: number
  hearts_collected: number
  misses: number
  best_streak: number
  fast_catches: number
  perfect_catches: number
  members_caught: Record<string, number>
  game_duration: number
  created_at?: string
  rank?: number
}

/**
 * Save a new score to the leaderboard
 */
export async function savePurpleHeartsScore(scoreData: Omit<PurpleHeartsScore, 'id' | 'created_at' | 'rank'>) {
  try {
    const { data, error } = await supabase
      .from('purple_hearts_scores')
      .insert([scoreData])
      .select()
      .single()

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving score:', error)
      }
      throw new Error('Failed to save score. Database tables may not exist. Please run the SQL schema first.')
    }

    return data
  } catch (err) {
    console.error('Save score error:', err)
    throw err
  }
}

/**
 * Get top scores from the leaderboard
 */
export async function getTopPurpleHeartsScores(limit = 10): Promise<PurpleHeartsScore[]> {
  try {
    const { data, error } = await supabase
      .from('top_purple_hearts_scores')
      .select('*')
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching top scores:', error)
      }
      throw new Error('Failed to fetch leaderboard. Database tables may not exist. Please run the SQL schema first.')
    }

    return data || []
  } catch (err) {
    console.error('Fetch scores error:', err)
    throw err
  }
}

/**
 * Get recent scores from the last 24 hours
 */
export async function getRecentPurpleHeartsScores(limit = 10): Promise<PurpleHeartsScore[]> {
  try {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const { data, error } = await supabase
      .from('purple_hearts_scores')
      .select('*')
      .gte('created_at', yesterday.toISOString())
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching recent scores:', error)
      }
      throw new Error('Failed to fetch recent scores. Database tables may not exist. Please run the SQL schema first.')
    }

    // Add rank manually for recent scores
    const rankedData = (data || []).map((score, index) => ({
      ...score,
      rank: index + 1
    }))

    return rankedData
  } catch (err) {
    console.error('Fetch recent scores error:', err)
    throw err
  }
}

/**
 * Get a player's best score
 */
export async function getPlayerBestPurpleHeartsScore(playerName: string): Promise<PurpleHeartsScore | null> {
  try {
    const { data, error } = await supabase
      .from('purple_hearts_scores')
      .select('*')
      .eq('player_name', playerName)
      .order('score', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching player best score:', error)
      }
      throw new Error('Failed to fetch player score. Database tables may not exist. Please run the SQL schema first.')
    }

    return data || null
  } catch (err) {
    console.error('Fetch player score error:', err)
    return null
  }
}

/**
 * Get player's rank based on their score
 */
export async function getPlayerRank(score: number): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('purple_hearts_scores')
      .select('*', { count: 'exact', head: true })
      .gt('score', score)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error getting player rank:', error)
      }
      return 0
    }

    return (count || 0) + 1
  } catch (err) {
    console.error('Get rank error:', err)
    return 0
  }
} 