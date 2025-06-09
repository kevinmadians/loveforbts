"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hammer, Play, Pause, RotateCcw, Trophy, Star, Timer, Target, Zap, Sparkles, Heart, User, Share2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import confetti from "canvas-confetti"
import { cn } from "@/app/lib/utils"
import { saveWhackAMoleScore, getPlayerRank, WhackAMoleScore } from "@/app/lib/supabase-whack-a-mole"
import { WhackAMoleLeaderboard } from "./WhackAMoleLeaderboard"
import { SocialShare } from "./SocialShare"

interface MolePosition {
  id: string
  row: number
  col: number
  member: BTSMember
  isVisible: boolean
  timeLeft: number
  isClicked: boolean
  isPowerUp?: boolean
}

interface BTSMember {
  name: string
  emoji: string
  image: string
  color: string
  points: number
  rarity: 'common' | 'rare' | 'legendary'
  ability?: string
}

interface GameStats {
  score: number
  hits: number
  misses: number
  accuracy: number
  streak: number
  bestStreak: number
  level: number
  membersWhacked: Record<string, number>
  perfectHits: number
  fastHits: number
}

interface HitEffect {
  id: string
  x: number
  y: number
  points: number
  color: string
  isBonus?: boolean
}

const BTS_MEMBERS: BTSMember[] = [
  { 
    name: "RM", 
    emoji: "🧠", 
    image: "/images/members/rm.png",
    color: "text-blue-600", 
    points: 10, 
    rarity: 'common',
    ability: "Brain Power: +2 bonus points"
  },
  { 
    name: "Jin", 
    emoji: "🌹", 
    image: "/images/members/jin.png",
    color: "text-pink-600", 
    points: 10, 
    rarity: 'common',
    ability: "Visual King: Longer show time"
  },
  { 
    name: "Suga", 
    emoji: "🎹", 
    image: "/images/members/suga.png",
    color: "text-purple-600", 
    points: 15, 
    rarity: 'rare',
    ability: "Agust D: Double points when hit fast"
  },
  { 
    name: "J-Hope", 
    emoji: "☀️", 
    image: "/images/members/jhope.png",
    color: "text-yellow-500", 
    points: 15, 
    rarity: 'rare',
    ability: "Hope World: Spreads joy (+3 to next hit)"
  },
  { 
    name: "Jimin", 
    emoji: "🦋", 
    image: "/images/members/jimin.png",
    color: "text-orange-500", 
    points: 15, 
    rarity: 'rare',
    ability: "Filter: Graceful bonus multiplier"
  },
  { 
    name: "V", 
    emoji: "🐯", 
    image: "/images/members/v.png",
    color: "text-green-600", 
    points: 15, 
    rarity: 'rare',
    ability: "Taehyung: Wild card bonus points"
  },
  { 
    name: "Jungkook", 
    emoji: "🐰", 
    image: "/images/members/jk.png",
    color: "text-red-600", 
    points: 20, 
    rarity: 'legendary',
    ability: "Golden Maknae: All bonuses activated!"
  }
]

export function BTSWhackAMole() {
  const [gameState, setGameState] = useState<'name-input' | 'menu' | 'playing' | 'paused' | 'gameOver' | 'leaderboard'>('name-input')
  const [playerName, setPlayerName] = useState('')
  const [moles, setMoles] = useState<MolePosition[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    hits: 0,
    misses: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0,
    level: 1,
    membersWhacked: {},
    perfectHits: 0,
    fastHits: 0
  })
  const [gameTime, setGameTime] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [showMiss, setShowMiss] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpInfo, setLevelUpInfo] = useState({ newLevel: 1, bonus: 0 })
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([])
  const [hopeBonus, setHopeBonus] = useState(0)
  const [powerUpActive, setPowerUpActive] = useState(false)
  const [currentPlayerScore, setCurrentPlayerScore] = useState<WhackAMoleScore | null>(null)
  const [playerRank, setPlayerRank] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  
  const gameTimerRef = useRef<number>()
  const moleTimerRef = useRef<number>()
  const gridSize = 3 // 3x3 grid

  // Game configuration
  const GAME_DURATION = 60 // seconds
  const MOLE_SHOW_TIME = 2000 // milliseconds mole stays visible
  const MOLE_SPAWN_INTERVAL = 800 // milliseconds between spawns
  const COMBO_THRESHOLD = 5
  const FAST_HIT_THRESHOLD = 800 // milliseconds for fast hit bonus

  // Handle player name submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      setGameState('menu')
    }
  }

  // Initialize game
  const startGame = useCallback(() => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
    
    setGameState('playing')
    setMoles([])
    setStats({
      score: 0,
      hits: 0,
      misses: 0,
      accuracy: 0,
      streak: 0,
      bestStreak: 0,
      level: 1,
      membersWhacked: {},
      perfectHits: 0,
      fastHits: 0
    })
    setGameTime(GAME_DURATION)
    setHitEffects([])
    setHopeBonus(0)
    setPowerUpActive(false)
    setCurrentPlayerScore(null)
    setPlayerRank(null)
    
    // Auto-scroll to game area after starting
    setTimeout(() => {
      const gameElement = document.querySelector('[data-game-container]')
      if (gameElement) {
        gameElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }
    }, 100)
    
    // Start game timer
    gameTimerRef.current = window.setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  // Spawn a mole at random position
  const spawnMole = useCallback(() => {
    if (gameState !== 'playing') return

    setMoles(currentMoles => {
      const occupiedPositions = new Set(currentMoles.map(mole => `${mole.row}-${mole.col}`))
      const availablePositions: {row: number, col: number}[] = []
      
      // Find available positions
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (!occupiedPositions.has(`${row}-${col}`)) {
            availablePositions.push({ row, col })
          }
        }
      }
      
      // If no available positions, schedule retry but don't stop the game
      if (availablePositions.length === 0) {
        return currentMoles
      }

      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)]
      
      // Select member based on rarity with level bonuses
      const rand = Math.random()
      let selectedMember: BTSMember
      
      // Higher levels have better chances for rare members
      const legendaryChance = Math.min(0.15, 0.08 + (stats.level * 0.01))
      const rareChance = Math.min(0.5, 0.35 + (stats.level * 0.02))
      
      if (rand < legendaryChance) { // Legendary chance increases with level
        selectedMember = BTS_MEMBERS.find(m => m.rarity === 'legendary')!
      } else if (rand < rareChance) { // Rare chance increases with level
        const rareMembers = BTS_MEMBERS.filter(m => m.rarity === 'rare')
        selectedMember = rareMembers[Math.floor(Math.random() * rareMembers.length)]
      } else { // Common
        const commonMembers = BTS_MEMBERS.filter(m => m.rarity === 'common')
        selectedMember = commonMembers[Math.floor(Math.random() * commonMembers.length)]
      }

      // Get current level for dynamic mole time
      let moleShowTime = MOLE_SHOW_TIME
      setStats(currentStats => {
        // Decrease show time as level increases (more challenging)
        moleShowTime = Math.max(1200, MOLE_SHOW_TIME - (currentStats.level * 100))
        
        // Jin gets longer show time (his ability)
        if (selectedMember.name === "Jin") {
          moleShowTime += 500
        }
        
        return currentStats
      })

      // 5% chance for power-up mole at higher levels
      const isPowerUp = stats.level >= 3 && Math.random() < 0.05

      const newMole: MolePosition = {
        id: Date.now().toString() + Math.random(),
        row: randomPosition.row,
        col: randomPosition.col,
        member: selectedMember,
        isVisible: true,
        timeLeft: moleShowTime,
        isClicked: false,
        isPowerUp
      }

      return [...currentMoles, newMole]
    })
  }, [gameState, stats.level])

  // Add hit effect
  const addHitEffect = (x: number, y: number, points: number, color: string, isBonus = false) => {
    const effect: HitEffect = {
      id: Date.now().toString() + Math.random(),
      x,
      y,
      points,
      color,
      isBonus
    }
    
    setHitEffects(prev => [...prev, effect])
    
    // Remove effect after animation
    setTimeout(() => {
      setHitEffects(prev => prev.filter(e => e.id !== effect.id))
    }, 1000)
  }

  // Continuous spawning effect
  useEffect(() => {
    if (gameState !== 'playing') return

    const spawnInterval = setInterval(() => {
      setStats(currentStats => {
        // Calculate spawn delay based on level - faster spawning at higher levels
        const baseDelay = Math.max(300, MOLE_SPAWN_INTERVAL - (currentStats.level * 100))
        
        // Schedule next spawn
        setTimeout(() => {
          spawnMole()
        }, Math.random() * baseDelay + 200) // Add some randomness
        
        return currentStats
      })
    }, 600) // Check every 600ms for new spawns

    return () => clearInterval(spawnInterval)
  }, [gameState, spawnMole])

  // Whack a mole
  const whackMole = useCallback((moleId: string, event?: React.MouseEvent) => {
    setMoles(currentMoles => {
      const mole = currentMoles.find(m => m.id === moleId)
      if (!mole || mole.isClicked) return currentMoles

      // Get click coordinates with null check and fallback
      let x = 50, y = 50 // Default center position
      try {
        if (event?.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect()
          x = event.clientX - rect.left
          y = event.clientY - rect.top
        }
      } catch (error) {
        // Use default coordinates if getBoundingClientRect fails
        console.warn('Failed to get click coordinates, using defaults')
      }

      // Mark mole as clicked
      const updatedMoles = currentMoles.map(m => 
        m.id === moleId ? { ...m, isClicked: true } : m
      )

      // Calculate if it was a fast hit
      const timeOnScreen = MOLE_SHOW_TIME - mole.timeLeft
      const isFastHit = timeOnScreen <= FAST_HIT_THRESHOLD

      // Update stats
      setStats(currentStats => {
        let points = mole.member.points + (currentStats.level * 2)
        let bonusText = ""
        let totalBonus = 0

        // Apply member abilities
        if (mole.member.name === "RM") {
          points += 2
          bonusText += " +Brain Power!"
          totalBonus += 2
        } else if (mole.member.name === "Suga" && isFastHit) {
          points *= 2
          bonusText += " +Agust D Speed!"
          totalBonus += points / 2
        } else if (mole.member.name === "Jungkook") {
          points += 5
          if (isFastHit) points += 3
          bonusText += " +Golden Maknae!"
          totalBonus += 8
        }

        // Apply J-Hope bonus from previous hit
        if (hopeBonus > 0) {
          points += hopeBonus
          bonusText += ` +Hope Bonus ${hopeBonus}!`
          totalBonus += hopeBonus
          setHopeBonus(0)
        }

        // Set J-Hope bonus for next hit
        if (mole.member.name === "J-Hope") {
          setHopeBonus(3)
        }

        // Fast hit bonus
        if (isFastHit) {
          points += 3
          bonusText += " +Fast Hit!"
          totalBonus += 3
        }

        // Power-up bonus
        if (mole.isPowerUp) {
          points += 10
          bonusText += " +Power-Up!"
          totalBonus += 10
          setPowerUpActive(true)
          setTimeout(() => setPowerUpActive(false), 3000)
        }

        // Perfect accuracy bonus (every 10 hits with 100% accuracy)
        const newHits = currentStats.hits + 1
        if (newHits % 10 === 0 && currentStats.accuracy === 100) {
          points += 25
          bonusText += " +Perfect Streak!"
          totalBonus += 25
        }

        const newStreak = currentStats.streak + 1
        const newScore = currentStats.score + points

        // Add hit effect
        addHitEffect(x, y, points, mole.member.color, totalBonus > 0)

        // Check for combo bonus
        if (newStreak >= COMBO_THRESHOLD && newStreak % COMBO_THRESHOLD === 0) {
          setShowCombo(true)
          setTimeout(() => setShowCombo(false), 1500)
        }

        // Level up check - made it harder to level up (500 points per level instead of 200)
        const newLevel = Math.floor(newScore / 500) + 1
        const leveledUp = newLevel > currentStats.level

        if (leveledUp) {
          // Show level up popup in header area
          const levelBonus = newLevel * 50
          setLevelUpInfo({ newLevel, bonus: levelBonus })
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 4000)

          // Big confetti celebration for level up achievement!
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
          })
          
          // Second burst for extra celebration
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.4 },
              colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
            })
          }, 300)
        }

        return {
          ...currentStats,
          score: newScore,
          hits: newHits,
          streak: newStreak,
          bestStreak: Math.max(currentStats.bestStreak, newStreak),
          accuracy: Math.round((newHits / (newHits + currentStats.misses)) * 100),
          level: newLevel,
          perfectHits: currentStats.accuracy === 100 ? currentStats.perfectHits + 1 : currentStats.perfectHits,
          fastHits: isFastHit ? currentStats.fastHits + 1 : currentStats.fastHits,
          membersWhacked: {
            ...currentStats.membersWhacked,
            [mole.member.name]: (currentStats.membersWhacked[mole.member.name] || 0) + 1
          }
        }
      })

      return updatedMoles
    })

    // Remove mole after animation
    setTimeout(() => {
      setMoles(prev => prev.filter(m => m.id !== moleId))
    }, 300)
  }, [hopeBonus])

  // Handle mole timeout
  useEffect(() => {
    const interval = setInterval(() => {
      setMoles(prev => {
        const updatedMoles = prev.map(mole => ({
          ...mole,
          timeLeft: mole.timeLeft - 100
        }))

        // Remove expired moles and count misses
        const expiredMoles = updatedMoles.filter(mole => mole.timeLeft <= 0 && !mole.isClicked)
        
        if (expiredMoles.length > 0) {
          setStats(prevStats => {
            const newMisses = prevStats.misses + expiredMoles.length
            const newAccuracy = prevStats.hits > 0 ? Math.round((prevStats.hits / (prevStats.hits + newMisses)) * 100) : 0
            
            return {
              ...prevStats,
              misses: newMisses,
              accuracy: newAccuracy,
              streak: 0 // Reset streak on miss
            }
          })

          if (expiredMoles.length > 0) {
            setShowMiss(true)
            setTimeout(() => setShowMiss(false), 1000)
            // Reset hope bonus on miss
            setHopeBonus(0)
          }
        }

        return updatedMoles.filter(mole => mole.timeLeft > 0 || mole.isClicked)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Save score to leaderboard
  const saveScore = async (gameStats: GameStats) => {
    if (!playerName.trim()) return

    setSaving(true)
    try {
      const scoreData: Omit<WhackAMoleScore, 'id' | 'created_at' | 'rank'> = {
        player_name: playerName.trim(),
        score: gameStats.score,
        level: gameStats.level,
        accuracy: gameStats.accuracy,
        hits: gameStats.hits,
        misses: gameStats.misses,
        best_streak: gameStats.bestStreak,
        fast_hits: gameStats.fastHits,
        perfect_hits: gameStats.perfectHits,
        game_duration: GAME_DURATION
      }

      const savedScore = await saveWhackAMoleScore(scoreData)
      const rank = await getPlayerRank(gameStats.score)
      
      setCurrentPlayerScore({ ...savedScore, rank })
      setPlayerRank(rank)
    } catch (error) {
      console.error('Failed to save score:', error)
      // Still set the score for local display even if save fails
      setCurrentPlayerScore({
        player_name: playerName.trim(),
        score: gameStats.score,
        level: gameStats.level,
        accuracy: gameStats.accuracy,
        hits: gameStats.hits,
        misses: gameStats.misses,
        best_streak: gameStats.bestStreak,
        fast_hits: gameStats.fastHits,
        perfect_hits: gameStats.perfectHits,
        game_duration: GAME_DURATION
      })
    } finally {
      setSaving(false)
    }
  }

  // Game timer effect
  useEffect(() => {
    if (gameTime === 0 && gameState === 'playing') {
      setGameState('gameOver')
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
      
      // Save the score
      saveScore(stats)
      
      // Celebrate game completion achievement!
      setTimeout(() => {
        // First burst
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
        })
        
        // Second burst for extra celebration
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.4 },
            colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
          })
        }, 300)
      }, 500)
    }
  }, [gameTime, gameState, stats, playerName])

  // Start first mole when game begins
  useEffect(() => {
    if (gameState === 'playing') {
      // Start first mole spawn immediately
      const timer = setTimeout(() => {
        spawnMole()
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [gameState, spawnMole])

  // Cleanup
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
    }
  }, [])

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const resetGame = () => {
    setGameState('menu')
    setMoles([])
    setGameTime(GAME_DURATION)
    setCurrentPlayerScore(null)
    setPlayerRank(null)
  }

  const goToLeaderboard = () => {
    setGameState('leaderboard')
  }

  const backToMenu = () => {
    setGameState('menu')
  }

  const changePlayerName = () => {
    setGameState('name-input')
    setPlayerName('')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Render name input screen
  if (gameState === 'name-input') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-yellow-100 to-purple-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <div className="mb-8">
            
            <p className="text-base md:text-lg text-gray-600">
              Enter your name to join the global leaderboard and compete with ARMYs!
            </p>
          </div>
          
          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div className="bg-white rounded-lg border-2 border-black p-6">
              <label htmlFor="playerName" className="block text-left font-bold text-lg mb-3">
                Your Name:
              </label>
              <Input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name (e.g., ARMY_Purple_Heart)"
                className="w-full text-lg p-4 border-2 border-black rounded-lg"
                maxLength={50}
                required
                autoFocus
              />
              <p className="text-sm text-gray-500 mt-2 text-left">
                Input yourname - it will appear on the public leaderboard!
              </p>
            </div>
            
            <Button 
              type="submit"
              disabled={!playerName.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold text-lg px-8 py-6 rounded-xl border-2 border-black w-full"
            >
              Start Playing
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>✨ Your scores will be saved to compete with ARMY worldwide</p>
            <p>🏆 Climb the leaderboard and share your achievements</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render leaderboard
  if (gameState === 'leaderboard') {
    return (
      <WhackAMoleLeaderboard 
        onBackToGame={backToMenu}
        currentPlayerScore={currentPlayerScore || undefined}
        showBackButton={true}
      />
    )
  }

  // Render game menu
  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-yellow-100 to-purple-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold black-han-sans mb-4">BTS Whack-a-Mole</h1>
            <p className="text-base md:text-lg text-gray-600 mb-3">
              Whack your favorite BTS members as they pop up! Each member has special abilities!
            </p>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-4">
              <p className="text-lg font-bold text-purple-600">
                💜 Welcome, {playerName}!
              </p>
              <button 
                onClick={changePlayerName}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Change name
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-black p-4 mb-6">
            <h3 className="font-bold mb-3">Members & Abilities:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {BTS_MEMBERS.map(member => (
                <div key={member.name} className="flex items-center justify-between text-left">
                  <span className="flex items-center gap-2">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-6 h-6 object-contain rounded"
                      onError={(e) => {
                        console.warn(`Failed to load member image: ${member.image}`)
                      }}
                    />
                    <div>
                      <div className={cn("font-bold", member.color)}>{member.name} ({member.points}pts)</div>
                      <div className="text-xs text-gray-500">{member.ability}</div>
                    </div>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <div>💎 Higher levels = better rare member chances!</div>
              <div>⚡ Fast hits = bonus points!</div>
              <div>🔥 Build streaks for combo bonuses!</div>
              <div>✨ Power-up moles give special bonuses!</div>
              <div>🎯 500 points per level - work hard!</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-xl border-2 border-black"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Whacking!
            </Button>
            
            <Button 
              onClick={goToLeaderboard}
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold text-lg px-8 py-6 rounded-xl"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render game over screen
  if (gameState === 'gameOver') {
    const topMember = Object.entries(stats.membersWhacked).reduce((a, b) => 
      (stats.membersWhacked[a[0]] || 0) > (stats.membersWhacked[b[0]] || 0) ? a : b
    , ['', 0])

    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-yellow-100 to-purple-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <h2 className="text-3xl md:text-4xl font-bold black-han-sans mb-4">Game Over!</h2>
          
          <div className="bg-white rounded-lg border-2 border-black p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.score}</div>
                <div>Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.accuracy}%</div>
                <div>Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{stats.bestStreak}</div>
                <div>Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.level}</div>
                <div>Level Reached</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4 border-t pt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-pink-600">{stats.fastHits}</div>
                <div>Fast Hits</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.perfectHits}</div>
                <div>Perfect Hits</div>
              </div>
            </div>
            
            {topMember[0] && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Most Whacked Member:</h4>
                <div className="flex items-center justify-center gap-2">
                  <img 
                    src={BTS_MEMBERS.find(m => m.name === topMember[0])?.image} 
                    alt={topMember[0]}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-lg font-bold">
                    {topMember[0]} 
                    <span className="ml-2 text-sm text-gray-600">({topMember[1]} times)</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Social Sharing */}
          {currentPlayerScore && (
            <div className="mb-6">
              <SocialShare 
                score={currentPlayerScore}
                playerRank={playerRank || undefined}
                onShare={() => {
                  // Optional: track sharing analytics
                }}
              />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button 
                onClick={startGame}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg border-2 border-black flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={goToLeaderboard}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg border-2 border-black flex-1"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
            
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-2 border-black font-bold px-6 py-3 rounded-lg w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
          
          {/* Saving Status */}
          {saving && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Saving your score to leaderboard...
              </div>
            </div>
          )}
          
          {currentPlayerScore && playerRank && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium">
                🎉 Score saved! You're ranked #{playerRank} globally!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    )
  }

  // Render game
  return (
    <div className="relative w-full max-w-2xl mx-auto" data-game-container>
      {/* Game UI Header */}
      <div className="bg-white rounded-t-xl border-2 border-black border-b-0 p-2 md:p-3 relative overflow-hidden">
        {/* Level-up notification in header */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              key="levelup-header"
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 text-white flex items-center justify-center z-10 rounded-t-lg"
            >
              <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
                <Zap className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
                <span className="font-bold">LEVEL {levelUpInfo.newLevel}!</span>
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
                <span className="text-xs md:text-sm">+{levelUpInfo.bonus} bonus!</span>
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-200 animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center relative z-5 gap-2">
          <div className="flex items-center gap-1 md:gap-3 flex-wrap text-xs md:text-sm">
            <div className="font-bold text-yellow-600">
              Score: <span className="text-black">{stats.score}</span>
            </div>
            <div className="font-bold text-green-600">
              Acc: <span className="text-black">{stats.accuracy}%</span>
            </div>
            <div className="font-bold text-purple-600">
              Streak: <span className="text-black">{stats.streak}</span>
            </div>
            {hopeBonus > 0 && (
              <div className="bg-yellow-100 px-1 py-0.5 rounded border text-xs">
                Hope: +{hopeBonus}
              </div>
            )}
            {powerUpActive && (
              <div className="bg-purple-100 px-1 py-0.5 rounded border text-xs animate-pulse">
                Power-Up!
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <div className="text-blue-600 font-bold">Lv.{stats.level}</div>
            <div className="text-red-600 font-bold">{formatTime(gameTime)}</div>
            <Button
              onClick={pauseGame}
              size="sm"
              variant="outline"
              className="border border-black p-1 ml-1"
            >
              {gameState === 'paused' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="relative bg-gradient-to-b from-green-100 to-yellow-50 border-2 border-black border-t-0 rounded-b-xl overflow-hidden"
        style={{ height: '500px' }}
      >
        {/* Hit effects */}
        <AnimatePresence>
          {hitEffects.map(effect => (
            <motion.div
              key={effect.id}
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, y: -50 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute pointer-events-none font-bold text-lg z-20",
                effect.isBonus ? "text-yellow-400" : effect.color
              )}
              style={{ left: effect.x, top: effect.y }}
            >
              +{effect.points}
              {effect.isBonus && <Sparkles className="w-4 h-4 inline ml-1" />}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating notifications */}
        <AnimatePresence>
          {showCombo && (
            <motion.div
              key="combo-notification"
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.5 }}
              className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold text-sm z-10 shadow-lg"
            >
              COMBO x{Math.floor(stats.streak / COMBO_THRESHOLD)} 🔥
            </motion.div>
          )}
          
          {showMiss && (
            <motion.div
              key="miss-notification"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm z-10"
            >
              Miss! 😅
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pause overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="bg-white rounded-xl border-2 border-black p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Game Paused</h3>
              <Button onClick={pauseGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        )}

        {/* Whack-a-Mole Grid */}
        <div className="absolute inset-4 grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }, (_, index) => {
            const row = Math.floor(index / gridSize)
            const col = index % gridSize
            const mole = moles.find(m => m.row === row && m.col === col && m.isVisible)
            
            return (
              <div 
                key={index} 
                className="bg-amber-900 rounded-full border-4 border-amber-800 relative overflow-hidden cursor-pointer hover:bg-amber-800 transition-colors"
                style={{ aspectRatio: '1' }}
              >
                {/* Hole */}
                <div className="absolute inset-2 bg-black rounded-full" />
                
                {/* Mole */}
                <AnimatePresence>
                  {mole && (
                    <motion.div
                      key={mole.id}
                      initial={{ y: '100%', scale: 0.8 }}
                      animate={{ 
                        y: mole.isClicked ? '100%' : '20%', 
                        scale: mole.isClicked ? 0.5 : 1.2 
                      }}
                      exit={{ y: '100%', scale: 0.5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        whackMole(mole.id, e)
                      }}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="relative">
                        {/* Power-up glow effect */}
                        {mole.isPowerUp && (
                          <div className="absolute -inset-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
                        )}
                        
                        <div className="relative w-16 h-16 mx-auto mb-1">
                          <img 
                            src={mole.member.image}
                            alt={mole.member.name}
                            className={cn(
                              "w-full h-full object-contain transition-all",
                              mole.isPowerUp && "animate-pulse"
                            )}
                            onError={(e) => {
                              // Keep image visible even if load fails - shows broken image icon
                              console.warn(`Failed to load image for ${mole.member.name}: ${mole.member.image}`)
                            }}
                          />
                        </div>
                        <div className={cn("text-xs font-bold text-center bg-white/90 rounded px-1 py-0.5 flex items-center gap-1", mole.member.color)}>
                          <span>{mole.member.name}</span>
                          {mole.isPowerUp && <Sparkles className="w-3 h-3 text-yellow-500" />}
                        </div>
                      </div>
                      
                      {/* Timer ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-transparent">
                        <div 
                          className={cn(
                            "absolute inset-0 rounded-full border-4 transition-all",
                            mole.isPowerUp ? "border-yellow-400" : "border-red-400"
                          )}
                          style={{
                            clipPath: `inset(0 ${100 - (mole.timeLeft / MOLE_SHOW_TIME) * 100}% 0 0)`
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
