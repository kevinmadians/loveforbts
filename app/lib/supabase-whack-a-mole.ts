import { supabase } from './supabase'

export interface WhackAMoleScore {
  id?: number
  player_name: string
  score: number
  level: number
  accuracy: number
  hits: number
  misses: number
  best_streak: number
  fast_hits: number
  perfect_hits: number
  game_duration: number
  created_at?: string
  rank?: number
}

/**
 * Save a new score to the leaderboard
 */
export async function saveWhackAMoleScore(scoreData: Omit<WhackAMoleScore, 'id' | 'created_at' | 'rank'>) {
  try {
    const { data, error } = await supabase
      .from('whack_a_mole_scores')
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
export async function getTopScores(limit = 10): Promise<WhackAMoleScore[]> {
  try {
    const { data, error } = await supabase
      .from('top_whack_a_mole_scores')
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
 * Get a player's best score
 */
export async function getPlayerBestScore(playerName: string): Promise<WhackAMoleScore | null> {
  try {
    const { data, error } = await supabase
      .from('whack_a_mole_scores')
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
      .from('whack_a_mole_scores')
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

/**
 * Get recent scores (last 24 hours)
 */
export async function getRecentScores(limit = 5): Promise<WhackAMoleScore[]> {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('whack_a_mole_scores')
      .select('*')
      .gte('created_at', oneDayAgo)
      .order('score', { ascending: false })
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching recent scores:', error)
      }
      throw new Error('Failed to fetch recent scores. Database tables may not exist. Please run the SQL schema first.')
    }

    return data || []
  } catch (err) {
    console.error('Fetch recent scores error:', err)
    throw err
  }
} 