"use client"

import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { QuizProgressBar, QuizTimer, StreakIndicator } from "./QuizComponents"
import { QuizCompletionConfetti } from "./QuizConfetti"

type QuizContainerProps = {
  children: ReactNode;
  title: string;
  description?: string;
  backLink?: string;
  backLinkText?: string;
  isQuizFinished?: boolean;
  isQuizStarted?: boolean;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  score?: number;
  streakCount?: number;
  timeLeft?: number | null;
  maxTime?: number;
  showProgress?: boolean;
  showTimer?: boolean;
}

/**
 * Standardized container for quiz UI
 */
export default function QuizContainer({
  children,
  title,
  description,
  backLink = "/quiz",
  backLinkText = "Back to Quizzes",
  isQuizFinished = false,
  isQuizStarted = false,
  currentQuestionIndex = 0,
  totalQuestions = 0,
  score = 0,
  streakCount = 0,
  timeLeft = null,
  maxTime = 30,
  showProgress = true,
  showTimer = true
}: QuizContainerProps) {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Quiz header */}
      <div className="mb-8">
        <Link 
          href={backLink} 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backLinkText}
        </Link>
        
        <h1 className="text-3xl font-bold black-han-sans">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      
      {/* Show confetti component when quiz is finished */}
      {isQuizFinished && (
        <QuizCompletionConfetti score={score} totalQuestions={totalQuestions} />
      )}
      
      {/* Quiz content */}
      <div className="mb-8">
        {/* Progress indicators for active quiz */}
        {isQuizStarted && !isQuizFinished && showProgress && totalQuestions > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <div className="flex items-center">
                <span className="mr-3">Score: {score}</span>
                <StreakIndicator streakCount={streakCount} />
              </div>
            </div>
            <QuizProgressBar 
              currentIndex={currentQuestionIndex} 
              total={totalQuestions} 
            />
          </div>
        )}
        
        {/* Timer */}
        {isQuizStarted && !isQuizFinished && showTimer && timeLeft !== null && (
          <QuizTimer timeLeft={timeLeft} maxTime={maxTime} />
        )}
        
        {/* Main quiz content */}
        {children}
      </div>
    </div>
  )
} 