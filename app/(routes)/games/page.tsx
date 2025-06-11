"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { Heart, Star, Zap, Trophy, Crown, Target, Timer, Award, Sparkles } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { getTopPurpleHeartsScores, PurpleHeartsScore } from "@/app/lib/supabase-purple-hearts"
import { getTopScores, WhackAMoleScore } from "@/app/lib/supabase-whack-a-mole"

export default function GamesPage() {
  const [purpleHeartsTopScores, setPurpleHeartsTopScores] = useState<PurpleHeartsScore[]>([])
  const [whackAMoleTopScores, setWhackAMoleTopScores] = useState<WhackAMoleScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const [purpleHeartsData, whackAMoleData] = await Promise.all([
          getTopPurpleHeartsScores(3), // Get top 3
          getTopScores(3) // Get top 3
        ])
        setPurpleHeartsTopScores(purpleHeartsData)
        setWhackAMoleTopScores(whackAMoleData)
      } catch (error) {
        // Handle database errors gracefully
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching leaderboard data:', error)
        }
        // Set empty arrays so the UI shows "No scores yet" message
        setPurpleHeartsTopScores([])
        setWhackAMoleTopScores([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])
  const games = [
    {
      id: "purple-hearts-collector",
      title: "Purple Hearts Collector",
      description: "Catch falling purple hearts and build streaks for bonus points! Perfect for ARMY who love collecting precious moments 💜",
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      difficulty: "Easy",
      duration: "60s",
      features: ["Mobile Friendly", "Streak System", "Level Progression"],
      backgroundColor: "from-purple-100 via-purple-50 to-pink-100",
      borderColor: "border-purple-300",
      href: "/games/purple-hearts-collector",
      leaderboardHref: "/games/purple-hearts-collector/leaderboard",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: "bts-whack-a-mole",
      title: "BTS Whack-a-Mole",
      description: "Classic whack-a-mole with BTS member photos! Different members give different points based on their rarity!",
      icon: <Target className="w-8 h-8 text-yellow-600" />,
      difficulty: "Medium",
      duration: "60s",
      features: ["BTS Members", "Combo System", "Rarity System"],
      backgroundColor: "from-yellow-100 via-yellow-50 to-orange-100",
      borderColor: "border-yellow-300",
      href: "/games/bts-whack-a-mole",
      leaderboardHref: "/games/bts-whack-a-mole/leaderboard",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500"
    }
    // More games can be added here in the future
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold black-han-sans mb-4">
          ARMY Games
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Challenge yourself with BTS-themed mini-games and compete with ARMY worldwide on the leaderboards!
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl border-2 border-black p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Game Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              {game.icon}
              <div>
                <h2 className="text-xl font-bold black-han-sans">{game.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{game.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    <span>{game.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{game.description}</p>

            {/* Features */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {game.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-1 rounded border font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href={game.href} className="flex-1">
                <Button className="w-full bg-black text-bts-accent hover:bg-gray-800 font-bold border-2 border-black">
                  <Zap className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </Link>
              <Link href={game.leaderboardHref}>
                <Button variant="outline" className="border-2 border-black bg-white hover:bg-gray-50 px-4">
                  <Trophy className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}

      </div>

      {/* Leaderboard Preview Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold black-han-sans mb-4">
            Top ARMY Players
          </h2>
          <p className="text-gray-600">See who's leading the rankings in our games!</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Purple Hearts Collector Leaderboard */}
          <div className="bg-white rounded-xl border-2 border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold">Purple Hearts Collector Leaderboard</h3>
            </div>
            
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading leaderboard...</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {purpleHeartsTopScores.length > 0 ? (
                  purpleHeartsTopScores.map((score, index) => (
                    <div key={score.id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Crown className="w-4 h-4 text-yellow-600" />}
                        {index === 1 && <Trophy className="w-4 h-4 text-gray-600" />}
                        {index === 2 && <Award className="w-4 h-4 text-orange-600" />}
                        <span className="font-semibold">{score.player_name}</span>
                      </div>
                      <span className="font-bold">{score.score}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No scores yet. Be the first to play!</p>
                )}
              </div>
            )}
            
            <Link href={games[0].leaderboardHref}>
              <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-50">
                View Full Leaderboard
                <Trophy className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* BTS Whack-a-Mole Leaderboard */}
          <div className="bg-white rounded-xl border-2 border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold">BTS Whack-a-Mole Leaderboard</h3>
            </div>
            
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading leaderboard...</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {whackAMoleTopScores.length > 0 ? (
                  whackAMoleTopScores.map((score, index) => (
                    <div key={score.id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Crown className="w-4 h-4 text-yellow-600" />}
                        {index === 1 && <Trophy className="w-4 h-4 text-gray-600" />}
                        {index === 2 && <Award className="w-4 h-4 text-orange-600" />}
                        <span className="font-semibold">{score.player_name}</span>
                      </div>
                      <span className="font-bold">{score.score}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No scores yet. Be the first to play!</p>
                )}
              </div>
            )}
            
            <Link href={games[1].leaderboardHref}>
              <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-50">
                View Full Leaderboard
                <Trophy className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white rounded-xl border-2 border-black p-8 text-center mb-8">
        <h3 className="text-2xl font-bold black-han-sans mb-4">More Games Coming Soon!</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're developing more exciting BTS-themed games! Suggest new game ideas in our community.
        </p>
        
        {/* Preview of upcoming games */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-semibold">Memory Match</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-semibold">Lyrics Quiz</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-semibold">Dance Steps</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-semibold">Trivia Battle</p>
          </div>
        </div>
      </div>

      {/* Game Features Section */}
      <div className="bg-white rounded-xl border-2 border-black p-8">
        <h2 className="text-2xl font-bold black-han-sans text-center mb-8">
          Why ARMY Love Our Games
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">BTS Themed</h3>
            <p className="text-sm text-gray-600">
              All games feature BTS colors, themes, and references that ARMY will love
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Mobile Optimized</h3>
            <p className="text-sm text-gray-600">
              Perfect touch controls and responsive design for gaming on any device
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold mb-2">Competitive Fun</h3>
            <p className="text-sm text-gray-600">
              High scores, streaks, and achievements to challenge yourself and friends
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-gray-500">
          Have ideas for new games? Let us know what you'd like to see next!
        </p>
      </div>
    </div>
  )
} 
