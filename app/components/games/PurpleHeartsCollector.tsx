"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Play, Pause, RotateCcw, Trophy, Star, Zap, Sparkles, Timer, Target, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import confetti from "canvas-confetti"
import { cn } from "@/app/lib/utils"
import { savePurpleHeartsScore, getPlayerRank, PurpleHeartsScore } from "@/app/lib/supabase-purple-hearts"
import { PurpleHeartsLeaderboard } from "./PurpleHeartsLeaderboard"
import { PurpleHeartsSocialShare } from "./PurpleHeartsSocialShare"

interface FallingItem {
  id: string
  x: number
  y: number
  speed: number
  size: number
  type: 'heart' | 'member'
  subType: 'purple' | 'gold' | 'silver' | string
  rotation: number
  rotationSpeed: number
  member?: BTSMember
  isPowerUp?: boolean
  timeOnScreen?: number
}

interface BTSMember {
  name: string
  emoji: string
  headImage: string
  color: string
  points: number
  rarity: 'common' | 'rare' | 'legendary'
  ability?: string
}

interface GameStats {
  score: number
  missed: number
  streak: number
  bestStreak: number
  heartsCollected: number
  membersCollected: number
  level: number
  multiplier: number
  accuracy: number
  fastCatches: number
  perfectCatches: number
  membersCaught: Record<string, number>
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
    headImage: "/images/members/head/rm.png",
    color: "text-blue-600", 
    points: 15, 
    rarity: 'common',
    ability: "Leader Power: +5 bonus points"
  },
  { 
    name: "Jin", 
    emoji: "🌹", 
    headImage: "/images/members/head/jin.png",
    color: "text-pink-600", 
    points: 15, 
    rarity: 'common',
    ability: "Worldwide Handsome: Longer fall time"
  },
  { 
    name: "Suga", 
    emoji: "🎹", 
    headImage: "/images/members/head/suga.png",
    color: "text-purple-600", 
    points: 20, 
    rarity: 'rare',
    ability: "Savage: Double points when caught fast"
  },
  { 
    name: "J-Hope", 
    emoji: "☀️", 
    headImage: "/images/members/head/jhope.png",
    color: "text-yellow-500", 
    points: 20, 
    rarity: 'rare',
    ability: "Hope Boost: +3 bonus to next catch"
  },
  { 
    name: "Jimin", 
    emoji: "🦋", 
    headImage: "/images/members/head/jimin.png",
    color: "text-orange-500", 
    points: 20, 
    rarity: 'rare',
    ability: "Filter: Graceful bonus multiplier x1.5"
  },
  { 
    name: "V", 
    emoji: "🐯", 
    headImage: "/images/members/head/v.png",
    color: "text-green-600", 
    points: 20, 
    rarity: 'rare',
    ability: "Taehyung: Wild card bonus points"
  },
  { 
    name: "Jungkook", 
    emoji: "🐰", 
    headImage: "/images/members/head/jk.png",
    color: "text-red-600", 
    points: 30, 
    rarity: 'legendary',
    ability: "Golden Maknae: All bonuses activated!"
  }
]

export function PurpleHeartsCollector() {
  const [gameState, setGameState] = useState<'name-input' | 'menu' | 'playing' | 'paused' | 'gameOver' | 'leaderboard'>('name-input')
  const [playerName, setPlayerName] = useState('')
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([])
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    missed: 0,
    streak: 0,
    bestStreak: 0,
    heartsCollected: 0,
    membersCollected: 0,
    level: 1,
    multiplier: 1,
    accuracy: 0,
    fastCatches: 0,
    perfectCatches: 0,
    membersCaught: {}
  })
  const [gameTime, setGameTime] = useState(0)
  const [showStreakBonus, setShowStreakBonus] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpInfo, setLevelUpInfo] = useState({ newLevel: 1, bonus: 0 })
  const [hopeBonus, setHopeBonus] = useState(0)
  const [currentPlayerScore, setCurrentPlayerScore] = useState<PurpleHeartsScore | null>(null)
  const [playerRank, setPlayerRank] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([])
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const spawnTimerRef = useRef<number>()
  const gameTimerRef = useRef<number>()

  // Game configuration
  const GAME_DURATION = 60 // seconds
  const ITEM_SPAWN_RATE = 2000 // milliseconds
  const FALL_SPEED_BASE = 0.8
  const STREAK_BONUS_THRESHOLD = 5
  const LEVEL_UP_THRESHOLD = 100
  const FAST_CATCH_THRESHOLD = 800

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
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    
    setGameState('playing')
    setFallingItems([])
    setStats({
      score: 0,
      missed: 0,
      streak: 0,
      bestStreak: 0,
      heartsCollected: 0,
      membersCollected: 0,
      level: 1,
      multiplier: 1,
      accuracy: 0,
      fastCatches: 0,
      perfectCatches: 0,
      membersCaught: {}
    })
    setGameTime(GAME_DURATION)
    setHitEffects([])
    setHopeBonus(0)
    setCurrentPlayerScore(null)
    setPlayerRank(null)
    
    // Auto-scroll to game area
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

  // Save score to leaderboard
  const saveScore = async (gameStats: GameStats) => {
    if (!playerName.trim()) return

    setSaving(true)
    try {
      const scoreData: Omit<PurpleHeartsScore, 'id' | 'created_at' | 'rank'> = {
        player_name: playerName.trim(),
        score: gameStats.score,
        level: gameStats.level,
        accuracy: gameStats.accuracy,
        hearts_collected: gameStats.heartsCollected,
        misses: gameStats.missed,
        best_streak: gameStats.bestStreak,
        fast_catches: gameStats.fastCatches,
        perfect_catches: gameStats.perfectCatches,
        members_caught: gameStats.membersCaught,
        game_duration: GAME_DURATION
      }

      const savedScore = await savePurpleHeartsScore(scoreData)
      const rank = await getPlayerRank(gameStats.score)
      
      setCurrentPlayerScore({ ...savedScore, rank })
      setPlayerRank(rank)
    } catch (error) {
      console.error('Failed to save score:', error)
      setCurrentPlayerScore({
        player_name: playerName.trim(),
        score: gameStats.score,
        level: gameStats.level,
        accuracy: gameStats.accuracy,
        hearts_collected: gameStats.heartsCollected,
        misses: gameStats.missed,
        best_streak: gameStats.bestStreak,
        fast_catches: gameStats.fastCatches,
        perfect_catches: gameStats.perfectCatches,
        members_caught: gameStats.membersCaught,
        game_duration: GAME_DURATION
      })
    } finally {
      setSaving(false)
    }
  }

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const resetGame = () => {
    setGameState('menu')
    setFallingItems([])
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

  // Game timer effect
  useEffect(() => {
    if (gameTime === 0 && gameState === 'playing') {
      setGameState('gameOver')
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      
      saveScore(stats)
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDE00', '#9333EA', '#EC4899', '#FF6B81']
        })
      }, 500)
    }
  }, [gameTime, gameState, stats, playerName])

  // Spawn falling item (heart or BTS member)
  const spawnItem = useCallback(() => {
    if (gameState !== 'playing' || !gameAreaRef.current) return

    const gameArea = gameAreaRef.current.getBoundingClientRect()
    const rand = Math.random()
    
    let newItem: FallingItem

    // 70% chance for hearts, 30% chance for BTS members
    if (rand < 0.7) {
      // Spawn heart
      const heartType = Math.random() < 0.7 ? 'purple' : Math.random() < 0.5 ? 'gold' : 'silver'
      newItem = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * (gameArea.width - 40),
        y: -40,
        speed: FALL_SPEED_BASE + (stats.level * 0.2) + Math.random() * 0.3,
        size: heartType === 'gold' ? 32 : heartType === 'silver' ? 28 : 24,
        type: 'heart',
        subType: heartType,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 4,
        timeOnScreen: 0
      }
    } else {
      // Spawn BTS member
      let selectedMember: BTSMember
      
      // 20% chance to ignore rarity and pick any member (ensures all members appear)
      const forceRandomMember = Math.random() < 0.2
      
      if (forceRandomMember) {
        // Pick completely randomly from all members
        selectedMember = BTS_MEMBERS[Math.floor(Math.random() * BTS_MEMBERS.length)]
      } else {
        // Use rarity system
        const memberRarityRand = Math.random()
        const legendaryChance = Math.min(0.25, 0.15 + (stats.level * 0.02)) // Increased Jungkook chances
        const rareChance = Math.min(0.75, 0.50 + (stats.level * 0.03)) // Increased rare member chances
        
        if (memberRarityRand < legendaryChance) {
          // Legendary: Jungkook
          selectedMember = BTS_MEMBERS.find(m => m.rarity === 'legendary')!
        } else if (memberRarityRand < rareChance) {
          // Rare: Suga, J-Hope, Jimin, V
          const rareMembers = BTS_MEMBERS.filter(m => m.rarity === 'rare')
          selectedMember = rareMembers[Math.floor(Math.random() * rareMembers.length)]
        } else {
          // Common: RM, Jin
          const commonMembers = BTS_MEMBERS.filter(m => m.rarity === 'common')
          selectedMember = commonMembers[Math.floor(Math.random() * commonMembers.length)]
        }
      }

      // Final fallback: if still no member selected, pick randomly from all members
      if (!selectedMember) {
        selectedMember = BTS_MEMBERS[Math.floor(Math.random() * BTS_MEMBERS.length)]
      }

      newItem = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * (gameArea.width - 50),
        y: -50,
        speed: FALL_SPEED_BASE + (stats.level * 0.15) + Math.random() * 0.2,
        size: 40,
        type: 'member',
        subType: selectedMember.name,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 2,
        member: selectedMember,
        isPowerUp: Math.random() < 0.1, // 10% chance for power-up
        timeOnScreen: 0
      }
    }

    setFallingItems(prev => [...prev, newItem])
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
    
    setTimeout(() => {
      setHitEffects(prev => prev.filter(e => e.id !== effect.id))
    }, 1000)
  }

  // Collect item
  const collectItem = useCallback((itemId: string, event?: React.MouseEvent) => {
    const item = fallingItems.find(i => i.id === itemId)
    if (!item) return

    // Get click coordinates
    let x = 50, y = 50
    try {
      if (event?.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect()
        x = event.clientX - rect.left
        y = event.clientY - rect.top
      }
    } catch (error) {
      console.warn('Failed to get click coordinates')
    }

    const timeOnScreen = item.timeOnScreen || 0
    const isFastCatch = timeOnScreen <= FAST_CATCH_THRESHOLD

    setStats(currentStats => {
      let points = 0
      let bonusText = ""
      let totalBonus = 0

      if (item.type === 'heart') {
        switch (item.subType) {
          case 'purple': points = 10; break
          case 'gold': points = 25; break
          case 'silver': points = 15; break
        }
      } else if (item.type === 'member' && item.member) {
        points = item.member.points

        // Apply member abilities
        if (item.member.name === "RM") {
          points += 5
          bonusText += " +Leader Power!"
          totalBonus += 5
        } else if (item.member.name === "Suga" && isFastCatch) {
          points *= 2
          bonusText += " +Savage Speed!"
          totalBonus += points / 2
        } else if (item.member.name === "Jimin") {
          points = Math.floor(points * 1.5)
          bonusText += " +Filter Bonus!"
          totalBonus += Math.floor(item.member.points * 0.5)
        } else if (item.member.name === "V") {
          const wildBonus = Math.floor(Math.random() * 10) + 5
          points += wildBonus
          bonusText += ` +Wild Card ${wildBonus}!`
          totalBonus += wildBonus
        } else if (item.member.name === "Jungkook") {
          points += 10
          if (isFastCatch) points += 5
          bonusText += " +Golden Maknae!"
          totalBonus += 15
        }
      }

      // Apply J-Hope bonus from previous catch
      if (hopeBonus > 0) {
        points += hopeBonus
        bonusText += ` +Hope Boost ${hopeBonus}!`
        totalBonus += hopeBonus
        setHopeBonus(0)
      }

      // Set J-Hope bonus for next catch
      if (item.member?.name === "J-Hope") {
        setHopeBonus(3)
      }

      // Fast catch bonus
      if (isFastCatch) {
        points += 3
        bonusText += " +Fast Catch!"
        totalBonus += 3
      }

      // Power-up bonus
      if (item.isPowerUp) {
        points += 15
        bonusText += " +Power-Up!"
        totalBonus += 15
      }

      const newStreak = currentStats.streak + 1
      const newScore = currentStats.score + points
      const newLevel = Math.floor(newScore / LEVEL_UP_THRESHOLD) + 1

      // Streak bonus
      if (newStreak >= STREAK_BONUS_THRESHOLD && newStreak % STREAK_BONUS_THRESHOLD === 0) {
        const streakBonus = newStreak * 2
        points += streakBonus
        setShowStreakBonus(true)
        setTimeout(() => setShowStreakBonus(false), 2000)
      }

      // Level up check
      const leveledUp = newLevel > currentStats.level
      if (leveledUp) {
        const levelBonus = newLevel * 20
        setLevelUpInfo({ newLevel, bonus: levelBonus })
        setShowLevelUp(true)
        setTimeout(() => setShowLevelUp(false), 3000)

        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.4 },
          colors: ['#FFDE00', '#9333EA', '#EC4899']
        })
      }

      // Add hit effect
      const effectColor = item.type === 'heart' 
        ? (item.subType === 'purple' ? 'text-purple-600' : item.subType === 'gold' ? 'text-yellow-500' : 'text-gray-400')
        : item.member?.color || 'text-purple-600'
      
      addHitEffect(x, y, points, effectColor, totalBonus > 0)

      const newHeartsCollected = item.type === 'heart' ? currentStats.heartsCollected + 1 : currentStats.heartsCollected
      const newMembersCollected = item.type === 'member' ? currentStats.membersCollected + 1 : currentStats.membersCollected
      const totalCollected = newHeartsCollected + newMembersCollected

      return {
        ...currentStats,
        score: newScore,
        streak: newStreak,
        bestStreak: Math.max(currentStats.bestStreak, newStreak),
        heartsCollected: newHeartsCollected,
        membersCollected: newMembersCollected,
        level: newLevel,
        accuracy: totalCollected > 0 ? Math.round((totalCollected / (totalCollected + currentStats.missed)) * 100) : 0,
        fastCatches: isFastCatch ? currentStats.fastCatches + 1 : currentStats.fastCatches,
        perfectCatches: currentStats.accuracy === 100 ? currentStats.perfectCatches + 1 : currentStats.perfectCatches,
        membersCaught: item.type === 'member' && item.member ? {
          ...currentStats.membersCaught,
          [item.member.name]: (currentStats.membersCaught[item.member.name] || 0) + 1
        } : currentStats.membersCaught
      }
    })

    // Remove collected item
    setFallingItems(prev => prev.filter(i => i.id !== itemId))

    // Particle effect
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      confetti({
        particleCount: 8,
        spread: 25,
        origin: { 
          x: (item.x + 25) / rect.width, 
          y: (item.y + 25) / rect.height 
        },
        colors: item.type === 'heart' 
          ? (item.subType === 'purple' ? ['#9333EA', '#A855F7'] : 
             item.subType === 'gold' ? ['#FFDE00', '#FCD34D'] : 
             ['#E5E7EB', '#D1D5DB'])
          : ['#FFDE00', '#9333EA', '#EC4899']
      })
    }
  }, [fallingItems, hopeBonus])

  // Start spawning when game begins
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setTimeout(() => {
        spawnItem()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [gameState, spawnItem])

  // Continuous spawning effect
  useEffect(() => {
    if (gameState !== 'playing') return

    const spawnInterval = setInterval(() => {
      const baseDelay = Math.max(800, ITEM_SPAWN_RATE - (stats.level * 150))
      setTimeout(() => {
        spawnItem()
      }, Math.random() * baseDelay + 200)
    }, 1000)

    return () => clearInterval(spawnInterval)
  }, [gameState, spawnItem, stats.level])

  // Game animation loop
  useEffect(() => {
    if (gameState === 'playing') {
      const animate = () => {
        setFallingItems(prev => prev.map(item => ({
          ...item,
          y: item.y + item.speed,
          rotation: item.rotation + item.rotationSpeed,
          timeOnScreen: (item.timeOnScreen || 0) + 16
        })).filter(item => {
          if (item.y > 550) {
            setStats(prevStats => ({
              ...prevStats,
              missed: prevStats.missed + 1,
              streak: 0,
              accuracy: prevStats.heartsCollected + prevStats.membersCollected > 0 
                ? Math.round(((prevStats.heartsCollected + prevStats.membersCollected) / (prevStats.heartsCollected + prevStats.membersCollected + prevStats.missed + 1)) * 100) 
                : 0
            }))
            setHopeBonus(0)
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

  // Render name input screen
  if (gameState === 'name-input') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold black-han-sans mb-4">Purple Hearts Collector</h1>
            <p className="text-base md:text-lg text-gray-600">
              Enter your name to join the global leaderboard and compete with ARMYs worldwide!
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
                Your name will appear on the public leaderboard!
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
        </motion.div>
      </div>
    )
  }

  // Render leaderboard
  if (gameState === 'leaderboard') {
    return (
      <PurpleHeartsLeaderboard 
        onBackToGame={backToMenu}
        currentPlayerScore={currentPlayerScore || undefined}
        showBackButton={true}
      />
    )
  }

  // Render game menu
  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold black-han-sans mb-4">Purple Hearts Collector</h1>
            <p className="text-base md:text-lg text-gray-600 mb-3">
              Catch falling purple hearts and BTS member heads! Each member has special abilities!
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
            <h3 className="font-bold mb-3">How to Play:</h3>
            <div className="text-sm text-left space-y-2 mb-4">
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
                <span>5+ streak = Bonus multiplier!</span>
              </div>
            </div>
            
            <h4 className="font-bold mb-2 text-purple-600">BTS Members & Abilities:</h4>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {BTS_MEMBERS.map(member => (
                <div key={member.name} className="flex items-center justify-between text-left">
                  <span className="flex items-center gap-1">
                    <span className={cn("font-bold", member.color)}>{member.name}</span>
                    <span className="text-gray-500">({member.points}pts)</span>
                  </span>
                  <span className={cn(
                    "px-1 py-0.5 rounded text-xs",
                    member.rarity === 'legendary' ? "bg-yellow-100 text-yellow-800" :
                    member.rarity === 'rare' ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  )}>
                    {member.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-6 rounded-xl border-2 border-black"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Collecting!
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
    const topMember = Object.entries(stats.membersCaught).reduce((a, b) => 
      (stats.membersCaught[a[0]] || 0) > (stats.membersCaught[b[0]] || 0) ? a : b
    , ['', 0])

    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-black p-8">
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
                <div className="text-lg font-bold text-pink-600">{stats.heartsCollected}</div>
                <div>Hearts Collected</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.membersCollected}</div>
                <div>Members Caught</div>
              </div>
            </div>
            
            {topMember[0] && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Most Caught Member:</h4>
                <div className="flex items-center justify-center gap-2">
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
              <PurpleHeartsSocialShare 
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

  // Render game area
  return (
    <div className="relative w-full max-w-2xl mx-auto" data-game-container>
      {/* Game UI Header */}
      <div className="bg-white rounded-t-xl border-2 border-black border-b-0 p-2 md:p-3 relative overflow-hidden">
        {/* Level-up notification */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white flex items-center justify-center z-10 rounded-t-lg"
            >
              <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
                <span className="font-bold">LEVEL {levelUpInfo.newLevel}!</span>
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-200 animate-bounce" />
                <span className="text-xs md:text-sm">+{levelUpInfo.bonus} bonus!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center relative z-5 gap-2">
          <div className="flex items-center gap-1 md:gap-3 flex-wrap text-xs md:text-sm">
            <div className="font-bold text-purple-600">
              Score: <span className="text-black">{stats.score}</span>
            </div>
            <div className="font-bold text-pink-600">
              Hearts: <span className="text-black">{stats.heartsCollected}</span>
            </div>
            <div className="font-bold text-yellow-600">
              Members: <span className="text-black">{stats.membersCollected}</span>
            </div>
            <div className="font-bold text-orange-500">
              Streak: <span className="text-black">{stats.streak}</span>
            </div>
            {hopeBonus > 0 && (
              <div className="bg-yellow-100 px-1 py-0.5 rounded border text-xs">
                Hope: +{hopeBonus}
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
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-purple-50 to-pink-50 border-2 border-black border-t-0 rounded-b-xl overflow-hidden"
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
          {showStreakBonus && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.5 }}
              className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm z-10 shadow-lg"
            >
              Streak Bonus! 🔥
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

        {/* Falling Items */}
        <AnimatePresence>
          {fallingItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: item.rotation
              }}
              exit={{ scale: 0 }}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 select-none"
              style={{
                left: item.x + item.size/2,
                top: item.y + item.size/2,
                width: item.size,
                height: item.size
              }}
              onClick={(e) => collectItem(item.id, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.type === 'heart' ? (
                <>
                  {/* Power-up glow effect */}
                  {item.isPowerUp && (
                    <div className="absolute -inset-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
                  )}
                  <Heart 
                    className={cn(
                      "w-full h-full drop-shadow-lg",
                      item.subType === 'purple' ? 'text-purple-600' :
                      item.subType === 'gold' ? 'text-yellow-500' :
                      'text-gray-400'
                    )}
                    fill="currentColor"
                  />
                </>
              ) : (
                <div className="relative">
                  {/* Power-up glow effect */}
                  {item.isPowerUp && (
                    <div className="absolute -inset-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
                  )}
                  
                  <div className="relative w-full h-full">
                    <img 
                      src={item.member?.headImage}
                      alt={item.member?.name}
                      className={cn(
                        "w-full h-full object-contain rounded-full border-2",
                        item.member?.color?.replace('text-', 'border-') || 'border-purple-600',
                        item.isPowerUp && "animate-pulse"
                      )}
                      onError={(e) => {
                        // Fallback to emoji if image fails
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl bg-white rounded-full border-2 ${item.member?.color?.replace('text-', 'border-') || 'border-purple-600'}">${item.member?.emoji}</div>`
                        }
                      }}
                    />
                  </div>
                  
                  <div className={cn(
                    "absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white/90 rounded px-1 py-0.5 flex items-center gap-1",
                    item.member?.color || 'text-purple-600'
                  )}>
                    <span>{item.member?.name}</span>
                    {item.isPowerUp && <Sparkles className="w-3 h-3 text-yellow-500" />}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center">
          Tap hearts and BTS members to collect them! 💜
        </div>
      </div>
    </div>
  )
} 