"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Crown, Star, Calendar, TrendingUp, Target, Timer, Zap, Heart } from "lucide-react"
import { Button } from "../ui/button"
import { getTopPurpleHeartsScores, getRecentPurpleHeartsScores, PurpleHeartsScore } from "@/app/lib/supabase-purple-hearts"
import { cn } from "@/app/lib/utils"

interface PurpleHeartsLeaderboardProps {
  onBackToGame?: () => void
  currentPlayerScore?: PurpleHeartsScore
  showBackButton?: boolean
}

export function PurpleHeartsLeaderboard({ 
  onBackToGame, 
  currentPlayerScore, 
  showBackButton = true 
}: PurpleHeartsLeaderboardProps) {
  const [topScores, setTopScores] = useState<PurpleHeartsScore[]>([])
  const [recentScores, setRecentScores] = useState<PurpleHeartsScore[]>([])
  const [activeTab, setActiveTab] = useState<'all-time' | 'recent'>('all-time')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchScores()
  }, [])

  const fetchScores = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [topData, recentData] = await Promise.all([
        getTopPurpleHeartsScores(10),
        getRecentPurpleHeartsScores(10)
      ])
      
      setTopScores(topData)
      setRecentScores(recentData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Award className="w-5 h-5 text-purple-600" />
    }
  }

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400"
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400"
      case 3:
        return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-400"
      default:
        return "bg-white border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const currentScores = activeTab === 'all-time' ? topScores : recentScores

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-lg text-gray-600">Loading leaderboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Leaderboard Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {showBackButton && (
            <Button 
              onClick={onBackToGame}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Back to Game
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 md:px-0">
      <div className="bg-white rounded-xl border-2 border-black overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-xl md:text-3xl font-bold black-han-sans">
                Purple Hearts Collector Leaderboard
              </h1>
              <p className="text-purple-100 mt-1 text-sm md:text-base">Catch hearts and compete with ARMY worldwide!</p>
            </div>
            {showBackButton && (
              <Button 
                onClick={onBackToGame}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 text-sm px-3 py-2"
              >
                Back to Game
              </Button>
            )}
          </div>
        </div>

        {/* Current Player Score Highlight */}
        {currentPlayerScore && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-b-2 border-yellow-200 p-3 md:p-4"
          >
            <h3 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2 justify-center sm:justify-start">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              Your Latest Score
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-purple-600">{currentPlayerScore.score}</div>
                <div className="text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-green-600">{currentPlayerScore.accuracy}%</div>
                <div className="text-gray-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-blue-600">Lv.{currentPlayerScore.level}</div>
                <div className="text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-orange-500">{currentPlayerScore.best_streak}</div>
                <div className="text-gray-600">Streak</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('all-time')}
              className={cn(
                "flex-1 py-2 md:py-3 px-2 md:px-4 text-center font-semibold transition-colors text-sm md:text-base",
                activeTab === 'all-time'
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
              All-Time Best
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={cn(
                "flex-1 py-2 md:py-3 px-2 md:px-4 text-center font-semibold transition-colors text-sm md:text-base",
                activeTab === 'recent'
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Calendar className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
              Recent 24h
            </button>
          </nav>
        </div>

        {/* Leaderboard List */}
        <div className="p-3 md:p-6">
          {currentScores.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-2">No scores yet!</h3>
              <p className="text-gray-400 text-sm md:text-base">
                {activeTab === 'all-time' 
                  ? "Be the first to set a high score!" 
                  : "No scores in the last 24 hours."}
              </p>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {currentScores.map((score, index) => {
                const rank = activeTab === 'all-time' ? (score.rank || index + 1) : index + 1
                const isCurrentPlayer = currentPlayerScore && 
                  score.player_name === currentPlayerScore.player_name &&
                  score.score === currentPlayerScore.score
                
                return (
                  <motion.div
                    key={`${score.id || index}-${score.player_name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 md:p-4 rounded-lg border-2 transition-all",
                      getRankBgColor(rank),
                      isCurrentPlayer && "ring-2 ring-purple-400 shadow-lg"
                    )}
                  >
                    {/* Mobile Layout */}
                    <div className="flex items-center justify-between sm:hidden">
                      {/* Rank + Player Info */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8">
                          {rank <= 3 ? (
                            getRankIcon(rank)
                          ) : (
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-purple-600">#{rank}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-bold text-sm">{score.player_name}</h3>
                            {isCurrentPlayer && (
                              <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(score.created_at || '')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Mobile Stats */}
                      <div className="text-right">
                        <div className="font-bold text-lg text-purple-600">{score.score}</div>
                        <div className="text-xs text-gray-500">{score.accuracy}% acc</div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex sm:items-center sm:gap-4 sm:w-full">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                        {rank <= 3 ? (
                          getRankIcon(rank)
                        ) : (
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-xs md:text-sm font-bold text-purple-600">#{rank}</span>
                          </div>
                        )}
                      </div>

                      {/* Player Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm md:text-lg truncate">{score.player_name}</h3>
                          {isCurrentPlayer && (
                            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {formatDate(score.created_at || '')}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-center text-xs md:text-sm">
                        <div>
                          <div className="font-bold text-sm md:text-lg text-purple-600">{score.score}</div>
                          <div className="text-gray-500">Score</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600 flex items-center justify-center gap-1">
                            <Target className="w-3 h-3" />
                            {score.accuracy}%
                          </div>
                          <div className="text-gray-500">Acc</div>
                        </div>
                        <div className="hidden md:block">
                          <div className="font-bold text-orange-500 flex items-center justify-center gap-1">
                            <Zap className="w-3 h-3" />
                            {score.best_streak}
                          </div>
                          <div className="text-gray-500">Streak</div>
                        </div>
                        <div className="hidden md:block">
                          <div className="font-bold text-pink-500 flex items-center justify-center gap-1">
                            <Heart className="w-3 h-3" />
                            {score.hearts_collected}
                          </div>
                          <div className="text-gray-500">Hearts</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="border-t p-3 md:p-4 text-center">
          <Button 
            onClick={fetchScores}
            variant="outline"
            className="border-2 border-black text-sm"
          >
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Refresh Leaderboard
          </Button>
        </div>
      </div>
    </div>
  )
} 