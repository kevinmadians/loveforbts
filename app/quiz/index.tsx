"use client"

import { 
  QuizQuestion,
  MultipleChoiceQuestion,
  FillBlankQuestion,
  LineCompletionQuestion,
  VisualRecognitionQuestion,
  ChronologyQuestion,
  MemberConnectionQuestion,
  PersonalityQuestion,
  GuessSongQuestion
} from "../data/quiz-data"

// Define types for different quiz variants
export type QuizType = "lyrics" | "member" | "knowledge" | "personality" | "army"
export type QuizVariant = "mixed" | "creative" | "guess-song" | "knowledge" | "personality"

// Interface for quiz configuration
export interface QuizConfig {
  type: QuizType;
  variant: QuizVariant;
  title: string;
  description: string;
  icon: string;
  route: string;
  questionCount: number;
  timerDuration: number | null;
  showProgress: boolean;
  showTimer: boolean;
}

// Quiz configurations
export const QUIZ_CONFIGS: Record<string, QuizConfig> = {
  lyricsQuiz: {
    type: "lyrics",
    variant: "mixed",
    title: "BTS Lyrics Quiz",
    description: "Test your knowledge of BTS song lyrics with multiple choice questions and challenges.",
    icon: "music",
    route: "/quiz/lyrics-quiz",
    questionCount: 10,
    timerDuration: 30,
    showProgress: true,
    showTimer: true
  },
  memberQuiz: {
    type: "member",
    variant: "knowledge",
    title: "BTS Member Quiz",
    description: "How well do you know the BTS members? Test your knowledge about their profiles, preferences, and trivia.",
    icon: "users",
    route: "/quiz/member-quiz",
    questionCount: 10,
    timerDuration: 30,
    showProgress: true,
    showTimer: true
  },
  personalityQuiz: {
    type: "member",
    variant: "personality",
    title: "Which BTS Member Matches Your Personality?",
    description: "Answer these questions to find out which BTS member has the most similar personality to you!",
    icon: "user",
    route: "/quiz/member-quiz",
    questionCount: 7,
    timerDuration: null,
    showProgress: true,
    showTimer: false
  },
  armyQuiz: {
    type: "army",
    variant: "knowledge",
    title: "ARMY Knowledge Quiz",
    description: "Test your ARMY knowledge with questions about BTS fandom history, inside jokes, and milestones.",
    icon: "heart",
    route: "/quiz/army-quiz",
    questionCount: 10,
    timerDuration: 30,
    showProgress: true,
    showTimer: true
  }
}

// Get the configuration for a specific quiz type
export function getQuizConfig(type: string): QuizConfig | undefined {
  return QUIZ_CONFIGS[type]
}

// Helper function to get a quiz score message
export function getQuizScoreMessage(score: number, total: number): string {
  const percentage = (score / total) * 100
  if (percentage === 100) return "You're a true ARMY! Perfect score! 💜"
  if (percentage >= 80) return "Amazing! You really know BTS well! 🌟"
  if (percentage >= 60) return "Great job! Your BTS knowledge is solid! ✨"
  if (percentage >= 40) return "Not bad! Keep learning more about BTS! 🎵"
  return "Keep practicing! Every ARMY starts somewhere! 💜"
}

// Helper function to get streak message
export function getStreakMessage(streakCount: number): string {
  if (streakCount >= 5) return "INCREDIBLE STREAK! 🔥🔥🔥"
  if (streakCount >= 3) return "Great streak! 🔥🔥"
  if (streakCount >= 1) return "Streak: " + streakCount + " 🔥"
  return ""
}

// Helper function for sharing quiz results
export function shareQuizResult(quizType: string, score: number, total: number, topMatch?: string): void {
  const isPersonality = quizType === "personality"
  
  const shareText = isPersonality
    ? `My BTS member match is ${topMatch}! Who's yours? Take the quiz at Love for BTS! #BTSArmy #LoveForBTS` 
    : `I scored ${score}/${total} on the BTS ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz at Love for BTS! Test your knowledge too! #BTSArmy #LoveForBTS`
  
  if (navigator.share) {
    navigator.share({
      title: isPersonality ? 'My BTS Member Match' : `My BTS ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz Result`,
      text: shareText,
      url: window.location.href,
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(shareText + ' ' + window.location.href)
    alert('Result copied to clipboard! Share it with your friends.')
  }
} 
