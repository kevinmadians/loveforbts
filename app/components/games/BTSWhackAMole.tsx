"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hammer, Play, Pause, RotateCcw, Trophy, Star, Timer, Target } from "lucide-react"
import { Button } from "../ui/button"
import confetti from "canvas-confetti"
import { cn } from "@/app/lib/utils"

interface MolePosition {
  id: string
  row: number
  col: number
  member: BTSMember
  isVisible: boolean
  timeLeft: number
  isClicked: boolean
}

interface BTSMember {
  name: string
  emoji: string
  image: string
  color: string
  points: number
  rarity: 'common' | 'rare' | 'legendary'
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
}

const BTS_MEMBERS: BTSMember[] = [
  { 
    name: "RM", 
    emoji: "🧠", 
    image: "/images/members/rm.png",
    color: "text-blue-600", 
    points: 10, 
    rarity: 'common' 
  },
  { 
    name: "Jin", 
    emoji: "🌹", 
    image: "/images/members/jin.png",
    color: "text-pink-600", 
    points: 10, 
    rarity: 'common' 
  },
  { 
    name: "Suga", 
    emoji: "🎹", 
    image: "/images/members/suga.png",
    color: "text-purple-600", 
    points: 15, 
    rarity: 'rare' 
  },
  { 
    name: "J-Hope", 
    emoji: "☀️", 
    image: "/images/members/jhope.png",
    color: "text-yellow-500", 
    points: 15, 
    rarity: 'rare' 
  },
  { 
    name: "Jimin", 
    emoji: "🦋", 
    image: "/images/members/jimin.png",
    color: "text-orange-500", 
    points: 15, 
    rarity: 'rare' 
  },
  { 
    name: "V", 
    emoji: "🐯", 
    image: "/images/members/v.png",
    color: "text-green-600", 
    points: 15, 
    rarity: 'rare' 
  },
  { 
    name: "Jungkook", 
    emoji: "🐰", 
    image: "/images/members/jk.png",
    color: "text-red-600", 
    points: 20, 
    rarity: 'legendary' 
  }
]

export function BTSWhackAMole() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [moles, setMoles] = useState<MolePosition[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    hits: 0,
    misses: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0,
    level: 1,
    membersWhacked: {}
  })
  const [gameTime, setGameTime] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [showMiss, setShowMiss] = useState(false)
  
  const gameTimerRef = useRef<number>()
  const moleTimerRef = useRef<number>()
  const gridSize = 3 // 3x3 grid

  // Game configuration
  const GAME_DURATION = 60 // seconds
  const MOLE_SHOW_TIME = 2000 // milliseconds mole stays visible
  const MOLE_SPAWN_INTERVAL = 800 // milliseconds between spawns
  const COMBO_THRESHOLD = 5

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
      membersWhacked: {}
    })
    setGameTime(GAME_DURATION)
    
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
      
      // Select member based on rarity
      const rand = Math.random()
      let selectedMember: BTSMember
      
      if (rand < 0.1) { // 10% chance legendary
        selectedMember = BTS_MEMBERS.find(m => m.rarity === 'legendary')!
      } else if (rand < 0.4) { // 30% chance rare
        const rareMembers = BTS_MEMBERS.filter(m => m.rarity === 'rare')
        selectedMember = rareMembers[Math.floor(Math.random() * rareMembers.length)]
      } else { // 60% chance common
        const commonMembers = BTS_MEMBERS.filter(m => m.rarity === 'common')
        selectedMember = commonMembers[Math.floor(Math.random() * commonMembers.length)]
      }

      // Get current level for dynamic mole time
      let moleShowTime = MOLE_SHOW_TIME
      setStats(currentStats => {
        // Decrease show time as level increases (more challenging)
        moleShowTime = Math.max(1200, MOLE_SHOW_TIME - (currentStats.level * 100))
        return currentStats
      })

      const newMole: MolePosition = {
        id: Date.now().toString() + Math.random(),
        row: randomPosition.row,
        col: randomPosition.col,
        member: selectedMember,
        isVisible: true,
        timeLeft: moleShowTime,
        isClicked: false
      }

      return [...currentMoles, newMole]
    })
  }, [gameState])

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
  const whackMole = useCallback((moleId: string) => {
    setMoles(currentMoles => {
      const mole = currentMoles.find(m => m.id === moleId)
      if (!mole || mole.isClicked) return currentMoles

      // Mark mole as clicked
      const updatedMoles = currentMoles.map(m => 
        m.id === moleId ? { ...m, isClicked: true } : m
      )

      // Update stats
      setStats(currentStats => {
        const points = mole.member.points + (currentStats.level * 2)
        const newStreak = currentStats.streak + 1
        const newHits = currentStats.hits + 1
        const newScore = currentStats.score + points

        // Check for combo bonus
        if (newStreak >= COMBO_THRESHOLD && newStreak % COMBO_THRESHOLD === 0) {
          setShowCombo(true)
          setTimeout(() => setShowCombo(false), 1500)
        }

        // Level up check
        const newLevel = Math.floor(newScore / 200) + 1
        const leveledUp = newLevel > currentStats.level

        if (leveledUp) {
          // Big confetti celebration for level up achievement!
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
          })
        }

        return {
          ...currentStats,
          score: newScore,
          hits: newHits,
          streak: newStreak,
          bestStreak: Math.max(currentStats.bestStreak, newStreak),
          accuracy: Math.round((newHits / (newHits + currentStats.misses)) * 100),
          level: newLevel,
          membersWhacked: {
            ...currentStats.membersWhacked,
            [mole.member.name]: (currentStats.membersWhacked[mole.member.name] || 0) + 1
          }
        }
      })

      // Small particle effect for visual feedback (no confetti)
      // Just visual feedback, no confetti spam

      return updatedMoles
    })

    // Remove mole after animation
    setTimeout(() => {
      setMoles(prev => prev.filter(m => m.id !== moleId))
    }, 300)
  }, [])

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
          }
        }

        return updatedMoles.filter(mole => mole.timeLeft > 0 || mole.isClicked)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Game timer effect
  useEffect(() => {
    if (gameTime === 0 && gameState === 'playing') {
      setGameState('gameOver')
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
      
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
  }, [gameTime, gameState])

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
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
            <Hammer className="w-20 h-20 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold black-han-sans mb-2">BTS Whack-a-Mole</h1>
            <p className="text-lg text-gray-600">
              Whack your favorite BTS members as they pop up! Each member has different point values!
            </p>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-black p-4 mb-6">
            <h3 className="font-bold mb-3">Members & Points:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {BTS_MEMBERS.map(member => (
                <div key={member.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="text-lg">{member.emoji}</span>
                    <span>{member.name}</span>
                  </span>
                  <span className={cn("font-bold", member.color)}>{member.points}pts</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <div>🐰 Jungkook: Most rare, highest points!</div>
              <div>⭐ Higher levels = bonus points!</div>
              <div>🔥 Build streaks for combo bonuses!</div>
            </div>
          </div>
          
          <Button 
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-xl border-2 border-black"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Whacking!
          </Button>
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
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold black-han-sans mb-4">Game Over!</h2>
          
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
            
            {topMember[0] && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Most Whacked Member:</h4>
                <div className="text-lg">
                  {BTS_MEMBERS.find(m => m.name === topMember[0])?.emoji} {topMember[0]} 
                  <span className="ml-2 text-sm text-gray-600">({topMember[1]} times)</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg border-2 border-black"
            >
              <Play className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-2 border-black font-bold px-6 py-3 rounded-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Menu
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Render game
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Game UI */}
      <div className="bg-white rounded-t-xl border-2 border-black border-b-0 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{stats.score}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-green-600" />
              <span>{stats.accuracy}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Hammer className="w-4 h-4 text-purple-600" />
              <span>{stats.streak}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-blue-600">Lv.{stats.level}</div>
            <div className="flex items-center gap-1 text-red-600">
              <Timer className="w-4 h-4" />
              <span>{formatTime(gameTime)}</span>
            </div>
            <Button
              onClick={pauseGame}
              size="sm"
              variant="outline"
              className="border-2 border-black"
            >
              {gameState === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        className="relative bg-gradient-to-b from-green-100 to-yellow-50 border-2 border-black border-t-0 rounded-b-xl overflow-hidden"
        style={{ height: '500px' }}
      >
        {/* Floating notifications */}
        <AnimatePresence>
          {showCombo && (
            <motion.div
              key="combo-notification"
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-lg z-10 shadow-lg"
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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold z-10"
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
                      onClick={() => whackMole(mole.id)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="bg-white rounded-full p-2 border-2 border-black shadow-lg">
                        <div className="relative w-16 h-16 mx-auto mb-1">
                          <img 
                            src={mole.member.image}
                            alt={mole.member.name}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              // Fallback to emoji if image fails to load
                              e.currentTarget.style.display = 'none'
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement
                              if (fallback) fallback.style.display = 'block'
                            }}
                          />
                          <div className="text-3xl absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                            {mole.member.emoji}
                          </div>
                        </div>
                        <div className={cn("text-xs font-bold text-center", mole.member.color)}>
                          {mole.member.name}
                        </div>
                      </div>
                      
                      {/* Timer ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-transparent">
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-red-400 transition-all"
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