"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { toast } from './use-toast';

// Generic quiz question interface
export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  type: 'multiple-choice' | 'chronology' | 'visual-recognition' | 'member-connection';
  answer?: string;
  correctAnswer?: string;
  image?: string;
  explanation?: string;
  items?: Array<{id: string | number; text: string; image?: string}>;
  correctOrder?: Array<string | number>;
  points?: number;
}

export interface QuizConfig {
  questions: QuizQuestion[];
  timePerQuestion: number;
  name: string;
  description: string;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
}

// Main quiz hook
export function useQuiz(config: QuizConfig) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.timePerQuestion);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize questions (with optional shuffling)
  useEffect(() => {
    let quizQuestions = [...config.questions];
    
    if (config.shuffleQuestions) {
      quizQuestions = shuffleArray(quizQuestions);
    }
    
    if (config.shuffleOptions) {
      quizQuestions = quizQuestions.map(q => {
        if (q.options) {
          return { ...q, options: shuffleArray(q.options) };
        }
        return q;
      });
    }
    
    setQuestions(quizQuestions);
  }, [config.questions, config.shuffleQuestions, config.shuffleOptions]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  const startTimer = useCallback(() => {
    setIsTimerActive(true);
    setTimeRemaining(config.timePerQuestion);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerActive(false);
          // Auto-check answer as wrong if time runs out
          if (selectedAnswer === null) {
            setIsCorrect(false);
            setStreakCount(0);
            setShowExplanation(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [config.timePerQuestion, selectedAnswer]);

  // Start the timer when the component mounts or when moving to the next question
  useEffect(() => {
    if (!isQuizComplete && questions.length > 0) {
      startTimer();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, isQuizComplete, questions.length, startTimer]);

  const triggerConfetti = useCallback(() => {
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  const checkAnswer = useCallback((answer: string | string[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerActive(false);
    setSelectedAnswer(answer);
    
    let correct = false;
    
    // Check if the question expects an array or a single answer
    if (Array.isArray(currentQuestion.answer)) {
      // For questions like chronology that require correct order
      if (Array.isArray(answer)) {
        correct = JSON.stringify(answer) === JSON.stringify(currentQuestion.answer);
      } else {
        // For multiple choice with multiple possible correct answers
        correct = currentQuestion.answer.includes(answer);
      }
    } else {
      // For single answer questions
      correct = answer === currentQuestion.answer;
    }
    
    setIsCorrect(correct);
    
    if (correct) {
      const pointsToAdd = currentQuestion.points || 1;
      setScore(prev => prev + pointsToAdd);
      setStreakCount(prev => prev + 1);
      setHighestStreak(prev => Math.max(prev, streakCount + 1));
      triggerConfetti();
      toast({
        title: "Correct!",
        description: currentQuestion.explanation || "Great job!",
        variant: "default"
      });
    } else {
      setStreakCount(0);
      toast({
        title: "Incorrect",
        description: currentQuestion.explanation || "Better luck next time!",
        variant: "destructive"
      });
    }
    
    setShowExplanation(true);
  }, [currentQuestion, streakCount, triggerConfetti]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      setIsQuizComplete(true);
      // Final confetti celebration
      if (score > (questions.length / 2)) {
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
          });
        }, 500);
      }
    }
  }, [currentQuestionIndex, questions.length, score]);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setStreakCount(0);
    setHighestStreak(0);
    setTimeRemaining(config.timePerQuestion);
    setIsQuizComplete(false);
    setShowExplanation(false);
    
    // Re-shuffle questions if needed
    if (config.shuffleQuestions) {
      setQuestions(shuffleArray([...config.questions]));
    }
  }, [config.questions, config.shuffleQuestions, config.timePerQuestion]);

  const shareResults = useCallback(async () => {
    const shareText = `I scored ${score}/${questions.length} on the ${config.name}! How well do you know BTS?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Quiz Results',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  }, [config.name, questions.length, score]);

  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends.",
        variant: "default"
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Helper function to shuffle arrays
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    isCorrect,
    score,
    streakCount,
    highestStreak,
    timeRemaining,
    isQuizComplete,
    showExplanation,
    progress,
    isTimerActive,
    checkAnswer,
    nextQuestion,
    restartQuiz,
    shareResults,
    confettiCanvasRef,
    questions
  };
} 