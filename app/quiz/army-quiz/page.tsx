"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "../../components/ui/button"
import { useQuiz, QuizQuestion } from "../../hooks/use-quiz"
import { ArrowLeft, Check, X, Clock, HelpCircle, Trophy, Calendar, Album, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { 
  QuizContainer, 
  QuizProgressBar, 
  MultipleChoiceOption, 
  StreakIndicator,
  QuizTimer,
  triggerAnswerConfetti,
  triggerCompletionConfetti
} from "../../components/features/QuizComponents"
import { cn } from "../../lib/utils"

// Knowledge questions covering BTS history, member facts, and important milestones
const armyKnowledgeQuestions: QuizQuestion[] = [
  {
    id: "k1",
    type: "visual-recognition",
    question: "Which BTS music video is this scene from?",
    options: ["Blood Sweat & Tears", "Fake Love", "Black Swan", "ON"],
    answer: "Blood Sweat & Tears",
    image: "/images/quiz/bst-scene.jpg",
    explanation: "This iconic scene is from Blood Sweat & Tears, which was released in 2016."
  },
  {
    id: "k2",
    type: "visual-recognition",
    question: "Which BTS era is this hairstyle from?",
    options: ["DNA era", "Boy With Luv era", "Dynamite era", "IDOL era"],
    answer: "DNA era",
    image: "/images/quiz/dna-jimin.jpg",
    explanation: "Jimin had this orange/pink hair during the DNA era in 2017."
  },
  {
    id: "k3",
    type: "member-connection",
    question: "Which member said: 'I'm your hope, you're my hope, I'm J-Hope'?",
    options: ["J-Hope", "Jungkook", "V", "RM"],
    answer: "J-Hope",
    explanation: "This is J-Hope's signature introduction phrase that he often uses."
  },
  {
    id: "k4",
    type: "multiple-choice",
    question: "Arrange these BTS albums in the order they were released, from earliest to latest:",
    options: ["Wings (2016) → LY: Tear (2018) → MOTS:7 (2020) → BE (2020)",
             "LY: Tear (2018) → Wings (2016) → BE (2020) → MOTS:7 (2020)",
             "MOTS:7 (2020) → Wings (2016) → LY: Tear (2018) → BE (2020)",
             "Wings (2016) → MOTS:7 (2020) → LY: Tear (2018) → BE (2020)"],
    answer: "Wings (2016) → LY: Tear (2018) → MOTS:7 (2020) → BE (2020)",
    explanation: "The correct order is: Wings (2016), Love Yourself: Tear (2018), Map of the Soul: 7 (Feb 2020), BE (Nov 2020)"
  },
  {
    id: "k5",
    type: "member-connection",
    question: "Which member is known as the 'Golden Maknae'?",
    options: ["Jimin", "V", "Jungkook", "Jin"],
    answer: "Jungkook",
    explanation: "Jungkook is called the 'Golden Maknae' because he's talented at many things despite being the youngest."
  },
  {
    id: "k6",
    type: "visual-recognition",
    question: "At which awards show was this performance?",
    options: ["MMA (Melon Music Awards)", "MAMA (Mnet Asian Music Awards)", "Billboard Music Awards", "GRAMMYs"],
    answer: "MMA (Melon Music Awards)",
    image: "/images/quiz/mma-2019.jpg",
    explanation: "This is from the 2019 Melon Music Awards (MMA) where each member had a solo stage representing different elements."
  },
  {
    id: "k7",
    type: "member-connection",
    question: "Which member composed the song 'Blue & Grey'?",
    options: ["Suga", "V", "RM", "J-Hope"],
    answer: "V",
    explanation: "V (Taehyung) composed 'Blue & Grey', which was originally meant for his mixtape but was included in the BE album."
  },
  {
    id: "k8",
    type: "multiple-choice",
    question: "Arrange these BTS achievements in chronological order:",
    options: ["Daesang (2016) → UN Speech (2018) → GRAMMYs (2020) → Billboard #1 (2020)",
              "UN Speech (2018) → Daesang (2016) → Billboard #1 (2020) → GRAMMYs (2020)",
              "GRAMMYs (2020) → Billboard #1 (2020) → UN Speech (2018) → Daesang (2016)",
              "Daesang (2016) → GRAMMYs (2020) → UN Speech (2018) → Billboard #1 (2020)"],
    answer: "Daesang (2016) → UN Speech (2018) → GRAMMYs (2020) → Billboard #1 (2020)",
    explanation: "Order: First Daesang (2016), UN Speech (2018), GRAMMYs performance (Jan 2020), Billboard #1 (Aug 2020)"
  },
  {
    id: "k9",
    type: "member-connection",
    question: "Which member owns a dog named Yeontan (Tannie)?",
    options: ["Jimin", "V", "Jin", "RM"],
    answer: "V",
    explanation: "V (Taehyung) is the owner of the Pomeranian named Yeontan, often called Tannie."
  },
  {
    id: "k10",
    type: "visual-recognition",
    question: "Which tour is this stage design from?",
    options: ["Love Yourself Tour", "Wings Tour", "Map of the Soul Tour", "Permission to Dance On Stage"],
    answer: "Permission to Dance On Stage",
    image: "/images/quiz/ptd-stage.jpg",
    explanation: "This is from the Permission to Dance On Stage tour which took place after the pandemic restrictions were lifted."
  },
  {
    id: "k11",
    type: "member-connection",
    question: "Which member directed the 'G.C.F' travel vlogs?",
    options: ["Jungkook", "Jin", "V", "J-Hope"],
    answer: "Jungkook",
    explanation: "Jungkook directs and edits the G.C.F (Golden Closet Film) travel vlogs, showcasing his filming skills."
  },
  {
    id: "k12",
    type: "multiple-choice",
    question: "Arrange these BTS music videos in order of release:",
    options: ["DNA → MIC Drop → Boy With Luv → Butter",
              "Boy With Luv → DNA → Butter → MIC Drop",
              "MIC Drop → DNA → Boy With Luv → Butter",
              "DNA → Boy With Luv → MIC Drop → Butter"],
    answer: "DNA → MIC Drop → Boy With Luv → Butter",
    explanation: "The correct order is: DNA (Sep 2017), MIC Drop Remix (Nov 2017), Boy With Luv (Apr 2019), Butter (May 2021)"
  },
  {
    id: "k13",
    type: "visual-recognition",
    question: "Which concept photo is this from?",
    options: ["Map of the Soul: Persona", "Map of the Soul: 7", "Love Yourself: Answer", "BE"],
    answer: "Map of the Soul: 7",
    image: "/images/quiz/mots7-concept.jpg",
    explanation: "This is from Map of the Soul: 7 concept photos, which had references to Black Swan."
  },
  {
    id: "k14",
    type: "member-connection",
    question: "Which member has the nickname 'God of Destruction'?",
    options: ["Suga", "Jimin", "RM", "V"],
    answer: "RM",
    explanation: "RM has the nickname 'God of Destruction' because he often accidentally breaks things."
  },
  {
    id: "k15",
    type: "multiple-choice",
    question: "Arrange these BTS-related events in order:",
    options: ["BTS debut → First mixtape → Billboard Award → Love Yourself Tour",
              "First mixtape → BTS debut → Billboard Award → Love Yourself Tour",
              "Billboard Award → BTS debut → First mixtape → Love Yourself Tour",
              "Love Yourself Tour → BTS debut → First mixtape → Billboard Award"],
    answer: "BTS debut → First mixtape → Billboard Award → Love Yourself Tour",
    explanation: "Order: BTS debut (2013), First mixtape (RM, 2015), First Billboard Award (2017), Love Yourself Tour (2018)"
  }
];

export default function ARMYKnowledgeQuiz() {
  // Quiz setup
  const {
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    score,
    isQuizComplete: quizFinished,
    isCorrect,
    showExplanation: isAnswered,
    timeRemaining: secondsLeft,
    streakCount,
    progress,
    checkAnswer: handleSelectAnswer,
    nextQuestion: handleNextQuestion,
    restartQuiz: resetQuiz,
    questions,
    totalQuestions
  } = useQuiz({
    questions: armyKnowledgeQuestions,
    timePerQuestion: 30,
    name: "ARMY Knowledge Quiz",
    description: "Test your knowledge about BTS history and facts!",
    shuffleQuestions: true,
    shuffleOptions: true
  });

  const [showConfetti, setShowConfetti] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const hasStreak = streakCount > 1
  const streakMessage = streakCount > 1 ? `${streakCount} correct answers in a row!` : ""
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  
  // Handle confetti effects
  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  // Start quiz function
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Get score message based on performance
  const getScoreMessage = () => {
    if (score === 10) return "Perfect score! You're a true ARMY expert! 💜";
    if (score >= 8) return "Amazing knowledge! You know BTS so well! 💜";
    if (score >= 6) return "Great job! You know your BTS facts! 💜";
    if (score >= 4) return "Not bad! Keep learning about BTS! 💜";
    return "Keep exploring BTS content to learn more! 💜";
  };

  // Share results
  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BTS ARMY Knowledge Quiz Result',
        text: `I scored ${score}/10 on the ARMY Knowledge Quiz at Love for BTS! ${getScoreMessage()}`,
        url: window.location.href,
      }).catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Error sharing:', err);
        }
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(
        `I scored ${score}/10 on the ARMY Knowledge Quiz at Love for BTS! ${getScoreMessage()} ${window.location.href}`
      );
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with your friends!",
      });
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen pt-10 pb-16">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/quiz" className="inline-flex items-center text-purple-700 hover:text-purple-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ARMY Knowledge Quiz</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Test your knowledge about BTS history, member facts, music videos, and important milestones. 
              Are you a true ARMY? Let's find out!
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border-2 border-black p-6 mb-8 text-center">
            <h2 className="text-xl font-bold mb-4">How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-center mb-2">
                  <HelpCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-1">Multiple Choice</h3>
                <p className="text-sm">Answer questions about BTS history, members, and achievements</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-1">Beat the Clock</h3>
                <p className="text-sm">Answer within 30 seconds for each question</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-center mb-2">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-1">Learn as You Go</h3>
                <p className="text-sm">Get explanations for each answer to improve your knowledge</p>
              </div>
            </div>
            
            <Button 
              onClick={startQuiz}
              className="bg-black text-white hover:bg-gray-800 font-bold text-lg px-8 py-6 rounded-lg transition-all transform hover:scale-105"
            >
              Start Quiz
            </Button>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>Quiz contains 10 random questions from our ARMY knowledge database</p>
          </div>
        </div>
      </div>
    )
  }

  if (quizFinished) {
    // Trigger confetti on completion
    useEffect(() => {
      triggerCompletionConfetti()
    }, [])

    return (
      <div className="min-h-screen pt-10 pb-16">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/quiz" className="inline-flex items-center text-purple-700 hover:text-purple-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border-2 border-black p-6 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <div className="text-6xl font-black my-6">{score}/10</div>
            <p className="text-xl mb-8">{getScoreMessage()}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button 
                onClick={resetQuiz}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Try Again
              </Button>
              <Button 
                onClick={shareResults}
                className="bg-black text-white hover:bg-gray-800"
              >
                Share Results
              </Button>
            </div>
            
            <Link href="/quiz">
              <Button variant="outline" className="w-full border-2 border-black">
                Back to All Quizzes
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-10 pb-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <Link href="/quiz" className="inline-flex items-center text-purple-700 hover:text-purple-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Link>
        </div>
        
        <QuizContainer
          title="ARMY Knowledge Quiz"
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={10}
          timer={secondsLeft}
        >
          {currentQuestion && (
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">{currentQuestion.question}</h2>

                {/* Show image for visual questions */}
                {currentQuestion.type === 'visual-recognition' && currentQuestion.image && (
                  <div className="mb-4 relative h-48 md:h-64 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={currentQuestion.image}
                      alt="Quiz image"
                      className="object-contain w-full h-full"
                      width={600}
                      height={400}
                    />
                  </div>
                )}
                
                {/* Multiple choice questions */}
                {currentQuestion.options && (
                  <div className="space-y-3 mt-4">
                    {currentQuestion.options.map((option: string) => (
                      <MultipleChoiceOption
                        key={option}
                        option={option}
                        selectedAnswer={selectedAnswer as string}
                        correctAnswer={currentQuestion.answer as string}
                        isAnswered={isAnswered}
                        onClick={() => handleSelectAnswer(option)}
                      />
                    ))}
                  </div>
                )}
                
                {/* Explanation after answering */}
                <AnimatePresence>
                  {isAnswered && currentQuestion.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "mt-4 p-4 rounded-lg",
                        isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                      )}
                    >
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          {isCorrect ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            {isCorrect ? "Correct!" : "Not quite right!"}
                          </p>
                          <p className="text-sm">{currentQuestion.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Next button or See Results button */}
              {isAnswered && (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {isLastQuestion ? "See Results" : "Next Question"}
                </Button>
              )}
              
              {/* Streak indicator */}
              <AnimatePresence>
                {hasStreak && (
                  <StreakIndicator message={streakMessage} />
                )}
              </AnimatePresence>
            </div>
          )}
        </QuizContainer>
      </div>
    </div>
  )
} 