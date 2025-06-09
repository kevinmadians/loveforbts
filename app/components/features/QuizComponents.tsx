"use client"

import React from "react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import confetti from "canvas-confetti"
import { Clock } from "lucide-react"

// Quiz container with header, progress bar, and timer
export function QuizContainer({
  title,
  children,
  currentQuestion,
  totalQuestions,
  timer
}: {
  title: string
  children: React.ReactNode
  currentQuestion: number
  totalQuestions: number
  timer: number
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-black p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          <QuizTimer seconds={timer} />
          <div className="text-sm font-medium">
            Question {currentQuestion}/{totalQuestions}
          </div>
        </div>
      </div>
      
      <QuizProgressBar 
        currentQuestion={currentQuestion} 
        totalQuestions={totalQuestions} 
      />
      
      <div className="mt-6">
        {children}
      </div>
    </div>
  )
}

// Progress bar for quiz
export function QuizProgressBar({ 
  currentQuestion, 
  totalQuestions 
}: { 
  currentQuestion: number
  totalQuestions: number
}) {
  const progress = (currentQuestion / totalQuestions) * 100
  
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div 
        className="bg-purple-600 h-full transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Timer component
export function QuizTimer({ seconds }: { seconds: number }) {
  const isLow = seconds <= 10
  
  return (
    <div className={cn(
      "flex items-center gap-1 font-medium",
      isLow ? "text-red-500" : "text-gray-700"
    )}>
      <Clock className="h-4 w-4" />
      <span>{seconds}s</span>
    </div>
  )
}

// Multiple choice option
export function MultipleChoiceOption({
  option,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onClick
}: {
  option: string
  selectedAnswer: string | null
  correctAnswer: string
  isAnswered: boolean
  onClick: () => void
}) {
  const isSelected = selectedAnswer === option
  const isCorrect = option === correctAnswer
  
  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={cn(
        "w-full text-left p-4 rounded-lg border-2 font-medium transition-all",
        isAnswered && isCorrect ? "bg-green-50 border-green-500" : "",
        isAnswered && isSelected && !isCorrect ? "bg-red-50 border-red-300" : "",
        isAnswered && !isSelected ? "opacity-70" : "",
        !isAnswered && isSelected ? "border-purple-500 bg-purple-50" : "",
        !isAnswered && !isSelected ? "border-gray-200 hover:border-purple-300 hover:bg-purple-50" : ""
      )}
    >
      {option}
    </button>
  )
}

// Streak indicator component
export function StreakIndicator({ 
  message
}: { 
  message: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center"
    >
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  )
}

// Confetti functions
export function triggerAnswerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}

export function triggerCompletionConfetti() {
  const end = Date.now() + 1000
  
  const frame = () => {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })
    
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })
    
    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }
  
  frame()
} 
