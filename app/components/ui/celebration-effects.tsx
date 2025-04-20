"use client"

// Update import to properly use the installed types
import confetti from "canvas-confetti"
import type { Shape } from "canvas-confetti"

// Types for confetti options
export type ConfettiOptions = {
  particleCount?: number
  spread?: number
  origin?: {
    x?: number
    y?: number
  }
  colors?: string[]
  startVelocity?: number
  ticks?: number
  shapes?: Shape[]
  gravity?: number
  scalar?: number
  drift?: number
  angle?: number
  zIndex?: number
}

// BTS themed colors
export const BTS_COLORS = ['#FFDE00', '#5C20AD', '#FFFFFF'] // Yellow, Purple, White

/**
 * Trigger a basic confetti burst
 */
export function triggerConfetti(options?: ConfettiOptions) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...options
  })
}

/**
 * Trigger a BTS themed confetti burst with custom colors
 */
export function triggerBTSConfetti(options?: ConfettiOptions) {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: BTS_COLORS,
    ...options
  })
}

/**
 * Trigger side cannons (from both sides)
 */
export function triggerSideCannons(options?: ConfettiOptions) {
  // Left side cannon
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    ...options
  })

  // Right side cannon
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    ...(options || {})
  })
}

/**
 * Trigger a fireworks effect
 * @param duration Duration in milliseconds
 */
export function triggerFireworks(duration = 5000, options?: ConfettiOptions) {
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    
    // Colors can be overridden in options
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: options?.colors || ['#FFDE00', '#5C20AD', '#FF69B4', '#00BFFF', '#FF6347'],
      ...options
    })
  }, 250)
}

/**
 * Trigger a shower of hearts (great for positive interactions)
 */
export function triggerHeartShower(duration = 3000, options?: ConfettiOptions) {
  const end = Date.now() + duration

  // Create a heart shower interval
  const heartInterval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(heartInterval)
    }

    confetti({
      particleCount: 4,
      startVelocity: 0,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: 0
      },
      colors: options?.colors || ['#ff6b81', '#5C20AD', '#FF69B4'],
      shapes: ['circle'] as Shape[],
      gravity: 0.8,
      scalar: 2,
      drift: 0,
      ...options
    })
  }, 50)
}

/**
 * Trigger confetti based on streak count
 * @param streakCount The current streak count
 */
export function triggerStreakConfetti(streakCount: number) {
  if (streakCount >= 5) {
    // For impressive streaks, use fireworks
    triggerFireworks(3000, { colors: BTS_COLORS })
  } else if (streakCount >= 3) {
    // For good streaks, use more intense confetti
    triggerBTSConfetti({
      particleCount: 200,
      spread: 120
    })
  } else {
    // For starter streaks, use basic confetti
    triggerConfetti({
      colors: BTS_COLORS
    })
  }
}

/**
 * Trigger a confetti celebration based on score percentage
 * @param score Current score
 * @param total Total possible score
 */
export function triggerScoreConfetti(score: number, total: number) {
  const percentage = (score / total) * 100
  
  if (percentage === 100) {
    // Perfect score gets fireworks and side cannons
    triggerFireworks(4000, { colors: BTS_COLORS })
    setTimeout(() => triggerSideCannons({ colors: BTS_COLORS }), 300)
  } else if (percentage >= 80) {
    // Great score gets BTS themed confetti and side cannons
    triggerBTSConfetti()
    setTimeout(() => triggerSideCannons(), 200)
  } else if (percentage >= 60) {
    // Good score gets BTS themed confetti
    triggerBTSConfetti()
  } else if (percentage >= 40) {
    // Decent score gets basic confetti
    triggerConfetti()
  }
  // Lower scores don't get confetti
} 