"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Play, Pause, RotateCcw, Trophy, Star, Zap } from "lucide-react"
import { Button } from "../ui/button"
import confetti from "canvas-confetti"
import { cn } from "@/app/lib/utils"

interface FallingHeart {
  id: string
  x: number
  y: number
  speed: number
  size: number
  type: 'purple' | 'gold' | 'silver'
  rotation: number
  rotationSpeed: number
}

interface GameStats {
  score: number
  missed: number
  streak: number
  bestStreak: number
  heartsCollected: number
  level: number
  multiplier: number
}

export function PurpleHeartsCollector() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    missed: 0,
    streak: 0,
    bestStreak: 0,
    heartsCollected: 0,
    level: 1,
    multiplier: 1
  })
  const [gameTime, setGameTime] = useState(0)
  const [showStreakBonus, setShowStreakBonus] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const spawnTimerRef = useRef<number>()
  const gameTimerRef = useRef<number>()

  // Game configuration
  const GAME_DURATION = 60 // seconds
  const HEART_SPAWN_RATE = 2500 // milliseconds (slower spawn at start)
  const FALL_SPEED_BASE = 0.8 // Much slower base speed
  const STREAK_BONUS_THRESHOLD = 5
  const LEVEL_UP_THRESHOLD = 50

  // Initialize game
  const startGame = useCallback(() => {
    // Clean up any existing timers
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
    if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    
    setGameState('playing')
    setHearts([])
    setStats({
      score: 0,
      missed: 0,
      streak: 0,
      bestStreak: 0,
      heartsCollected: 0,
      level: 1,
      multiplier: 1
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
    
    // Hearts will start spawning via useEffect when gameState changes to 'playing'
  }, [])

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const endGame = useCallback(() => {
    setGameState('gameOver')
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
    if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    
    // Celebrate if high score
    if (stats.score > 0) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 500)
    }
  }, [stats.score])

  const resetGame = () => {
    setGameState('menu')
    setHearts([])
    setGameTime(GAME_DURATION)
  }

    // Spawn hearts
  const spawnHeart = useCallback(() => {
    if (gameState === 'playing' && gameAreaRef.current) {
      const gameArea = gameAreaRef.current.getBoundingClientRect()
      const heartType = Math.random() < 0.7 ? 'purple' : Math.random() < 0.5 ? 'gold' : 'silver'
      
      const newHeart: FallingHeart = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * (gameArea.width - 40),
        y: -40,
        speed: FALL_SPEED_BASE + (stats.level * 0.3) + Math.random() * 0.5,
        size: heartType === 'gold' ? 32 : heartType === 'silver' ? 28 : 24,
        type: heartType,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 4
      }
      
      setHearts(prev => [...prev, newHeart])
      
      // Schedule next heart spawn only if game is still playing
      const spawnDelay = Math.max(500, HEART_SPAWN_RATE - (stats.level * 100))
      spawnTimerRef.current = window.setTimeout(() => {
        spawnHeart()
      }, spawnDelay)
    }
  }, [gameState, stats.level])



  // Collect heart
  const collectHeart = useCallback((heartId: string) => {
    const heart = hearts.find(h => h.id === heartId)
    if (!heart) return

    let points = 0
    let multiplier = stats.multiplier

    switch (heart.type) {
      case 'purple':
        points = 10
        break
      case 'gold':
        points = 25
        break
      case 'silver':
        points = 15
        break
    }

    const newStreak = stats.streak + 1
    
    // Streak bonus
    if (newStreak >= STREAK_BONUS_THRESHOLD && newStreak % STREAK_BONUS_THRESHOLD === 0) {
      multiplier += 0.5
      setShowStreakBonus(true)
      setTimeout(() => setShowStreakBonus(false), 2000)
    }

    const finalPoints = Math.floor(points * multiplier)
    const newScore = stats.score + finalPoints
    const newLevel = Math.floor(newScore / LEVEL_UP_THRESHOLD) + 1

    // Level up effect
    if (newLevel > stats.level) {
      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 2000)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 }
      })
    }

    setStats(prev => ({
      ...prev,
      score: newScore,
      streak: newStreak,
      bestStreak: Math.max(prev.bestStreak, newStreak),
      heartsCollected: prev.heartsCollected + 1,
      level: newLevel,
      multiplier: multiplier
    }))

    // Remove collected heart
    setHearts(prev => prev.filter(h => h.id !== heartId))

    // Particle effect
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      confetti({
        particleCount: 10,
        spread: 30,
        origin: { 
          x: (heart.x + 20) / rect.width, 
          y: (heart.y + 20) / rect.height 
        },
        colors: heart.type === 'purple' ? ['#9333EA', '#A855F7'] : 
               heart.type === 'gold' ? ['#FFDE00', '#FCD34D'] : 
               ['#E5E7EB', '#D1D5DB']
      })
    }
  }, [hearts, stats])

  // Game timer effect
  useEffect(() => {
    if (gameTime === 0 && gameState === 'playing') {
      endGame()
    }
  }, [gameTime, gameState, endGame])

  // Start spawning hearts when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      // Clear any existing spawn timer
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
      
      // Start spawning hearts after a short delay
      const initialSpawnTimer = setTimeout(() => {
        spawnHeart()
      }, 500)
      
      return () => {
        clearTimeout(initialSpawnTimer)
      }
    }
  }, [gameState, spawnHeart])

  // Game loop effects
  useEffect(() => {
    if (gameState === 'playing') {
      const animate = () => {
        setHearts(prev => prev.map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
          rotation: heart.rotation + heart.rotationSpeed
        })).filter(heart => {
          if (heart.y > 550) { // Game area height is 500px + some buffer
            // Heart missed
            setStats(prev => ({
              ...prev,
              missed: prev.missed + 1,
              streak: 0
            }))
            return false
          }
          return true
        }))
        
        if (gameState === 'playing') {
          animationRef.current = requestAnimationFrame(animate)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
      
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getHeartColor = (type: string) => {
    switch (type) {
      case 'purple': return 'text-purple-600'
      case 'gold': return 'text-yellow-500'
      case 'silver': return 'text-gray-400'
      default: return 'text-purple-600'
    }
  }

  // Render game menu
  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <Heart className="w-20 h-20 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold black-han-sans mb-2">Purple Hearts Collector</h1>
            <p className="text-lg text-gray-600 max-w-md">
              Catch falling purple hearts and avoid missing them! Gold hearts give bonus points!
            </p>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-black p-6 mb-6">
            <h3 className="font-bold mb-3">How to Play:</h3>
            <div className="text-sm text-left space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-600" />
                <span>Purple Hearts: 10 points</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-yellow-500" />
                <span>Gold Hearts: 25 points</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-400" />
                <span>Silver Hearts: 15 points</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>5+ streak = Multiplier bonus!</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-xl border-2 border-black"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </motion.div>
      </div>
    )
  }

  // Render game over screen
  if (gameState === 'gameOver') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold black-han-sans mb-4">Game Over!</h2>
          
          <div className="bg-white rounded-lg border-2 border-black p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.score}</div>
                <div>Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{stats.bestStreak}</div>
                <div>Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.heartsCollected}</div>
                <div>Hearts Collected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.level}</div>
                <div>Level Reached</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
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
        <div className="flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{stats.score}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-purple-600" />
              <span>{stats.heartsCollected}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>{stats.streak}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-blue-600">Level {stats.level}</div>
            <div className="text-red-600">{formatTime(gameTime)}</div>
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
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-pink-50 to-purple-50 border-2 border-black border-t-0 rounded-b-xl overflow-hidden"
        style={{ height: '500px' }}
      >
        {/* Floating notifications */}
        <AnimatePresence>
          {showStreakBonus && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold z-10"
            >
              Streak Bonus! 🔥
            </motion.div>
          )}
          
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xl z-10"
            >
              Level Up! 🎉
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

        {/* Falling Hearts */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: heart.rotation
              }}
              exit={{ scale: 0 }}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 select-none"
              style={{
                left: heart.x + heart.size/2,
                top: heart.y + heart.size/2,
                width: heart.size,
                height: heart.size
              }}
              onClick={() => collectHeart(heart.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart 
                className={cn(
                  "w-full h-full drop-shadow-lg",
                  getHeartColor(heart.type)
                )}
                fill="currentColor"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game instructions for mobile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center">
          Tap hearts to collect them! 💜
        </div>
      </div>
    </div>
  )
} 
