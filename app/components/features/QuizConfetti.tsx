"use client"

import { useEffect } from "react"
import { 
  triggerBTSConfetti, 
  triggerStreakConfetti, 
  triggerScoreConfetti,
  triggerFireworks
} from "../ui/celebration-effects"

type QuizConfettiProps = {
  type: "finished" | "streak" | "correct";
  score?: number;
  totalQuestions?: number;
  streakCount?: number;
  isPerfectScore?: boolean;
}

/**
 * Component that triggers appropriate confetti effects based on quiz state
 * Centralizes confetti logic for all quiz pages
 */
export default function QuizConfetti({ 
  type, 
  score = 0, 
  totalQuestions = 0,
  streakCount = 0,
  isPerfectScore = false
}: QuizConfettiProps) {
  useEffect(() => {
    if (type === "finished") {
      if (isPerfectScore) {
        triggerFireworks(3000)
      } else {
        triggerScoreConfetti(score, totalQuestions)
      }
    } else if (type === "streak" && streakCount > 0) {
      triggerStreakConfetti(streakCount)
    } else if (type === "correct") {
      triggerBTSConfetti()
    }
  }, [type, score, totalQuestions, streakCount, isPerfectScore])

  // This is a functional component with side effects only
  return null
}

/**
 * Helper component for streak-based confetti
 */
export function StreakConfetti({ streakCount }: { streakCount: number }) {
  return <QuizConfetti type="streak" streakCount={streakCount} />
}

/**
 * Helper component for quiz completion confetti
 */
export function QuizCompletionConfetti({ 
  score, 
  totalQuestions 
}: { 
  score: number;
  totalQuestions: number;
}) {
  const isPerfectScore = score === totalQuestions && totalQuestions > 0
  
  return (
    <QuizConfetti 
      type="finished" 
      score={score} 
      totalQuestions={totalQuestions} 
      isPerfectScore={isPerfectScore} 
    />
  )
}

/**
 * Helper component for correct answer confetti
 */
export function CorrectAnswerConfetti() {
  return <QuizConfetti type="correct" />
} 