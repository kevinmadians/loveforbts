"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Heart, User, Users, ChevronRight, CheckCircle2, XCircle, HelpCircle, ArrowLeft, Share2, Clock, Medal } from "lucide-react"
import { PageHeader } from "../../components/ui/page-header"
import { 
  memberConnectionQuestions, 
  personalityQuestions,
  QuizQuestion,
  MemberConnectionQuestion,
  PersonalityQuestion,
} from "../../data/quiz-data"
import { triggerBTSConfetti, triggerStreakConfetti } from "../../components/ui/celebration-effects"

export default function MemberQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [quizType, setQuizType] = useState<"knowledge" | "personality" | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])
  const [streakCount, setStreakCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timeout | null>(null)
  const [memberMatches, setMemberMatches] = useState<Record<string, number>>({
    "RM": 0,
    "Jin": 0,
    "Suga": 0,
    "J-Hope": 0,
    "Jimin": 0,
    "V": 0,
    "Jungkook": 0
  })
  const [topMatch, setTopMatch] = useState<string | null>(null)

  // Function to shuffle array
  const shuffleArray = (array: QuizQuestion[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Initialize quiz when type is selected
  useEffect(() => {
    if (quizType === "knowledge") {
      const shuffled = shuffleArray(memberConnectionQuestions).slice(0, 10) // Take 10 questions
      setShuffledQuestions(shuffled)
      setQuizQuestions(shuffled)
      setQuizStarted(true)
      setTimeLeft(30) // 30 seconds per question
    } else if (quizType === "personality") {
      setShuffledQuestions(personalityQuestions)
      setQuizQuestions(personalityQuestions)
      setQuizStarted(true)
      setTimeLeft(null) // No timer for personality questions
    }
  }, [quizType])

  // Timer effect for questions
  useEffect(() => {
    if (quizStarted && !isAnswered && timeLeft !== null) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1)
        }, 1000)
        setQuestionTimer(timer)
        return () => clearTimeout(timer)
      } else {
        // Time's up, move to next question
        handleTimeUp()
      }
    }
  }, [quizStarted, isAnswered, timeLeft])

  const handleTimeUp = () => {
    setIsAnswered(true)
    setIsCorrect(false)
    setStreakCount(0)
    // Show correct answer for 2 seconds, then move to next question
    setTimeout(() => {
      handleNextQuestion()
    }, 2000)
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleSelectMemberConnection = (answer: string) => {
    if (isAnswered) return
    
    // Clear the timer
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    const correct = answer === (currentQuestion as MemberConnectionQuestion).correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
      setStreakCount(streakCount + 1)
      triggerStreakConfetti(streakCount + 1)
    } else {
      setStreakCount(0)
    }
  }

  const handleSelectPersonality = (option: { text: string; memberMatch: string }) => {
    if (isAnswered) return
    
    setSelectedAnswer(option.text)
    setIsAnswered(true)
    
    // Update member match count
    setMemberMatches(prev => ({
      ...prev,
      [option.memberMatch]: prev[option.memberMatch] + 1
    }))
    
    // No right or wrong for personality questions
    setIsCorrect(null)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(null)
      setShowHint(false)
      setShowExplanation(false)
      setTimeLeft(quizType === "knowledge" ? 30 : null) // Reset timer for next question if knowledge quiz
    } else {
      if (quizType === "personality") {
        // Find the member with the most matches
        const topMemberMatch = Object.entries(memberMatches).reduce((a, b) => 
          a[1] > b[1] ? a : b
        )[0]
        setTopMatch(topMemberMatch)
      }
      setQuizFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsCorrect(null)
    setScore(0)
    setQuizFinished(false)
    setQuizStarted(false)
    setShowHint(false)
    setShowExplanation(false)
    setStreakCount(0)
    setQuizType(null)
    setTimeLeft(null)
    setMemberMatches({
      "RM": 0,
      "Jin": 0,
      "Suga": 0,
      "J-Hope": 0,
      "Jimin": 0,
      "V": 0,
      "Jungkook": 0
    })
    setTopMatch(null)
    
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return "You're a true ARMY! Perfect score! 💜"
    if (percentage >= 80) return "Amazing! You really know BTS members well! 🌟"
    if (percentage >= 60) return "Great job! Your BTS member knowledge is solid! ✨"
    if (percentage >= 40) return "Not bad! Keep learning more about the members! 🎵"
    return "Keep practicing! Every ARMY starts somewhere! 💜"
  }

  const getStreakMessage = () => {
    if (streakCount >= 5) return "INCREDIBLE STREAK! 🔥🔥🔥"
    if (streakCount >= 3) return "Great streak! 🔥🔥"
    if (streakCount >= 1) return "Streak: " + streakCount + " 🔥"
    return ""
  }

  const shareResult = () => {
    const shareText = quizType === "knowledge" 
      ? `I scored ${score}/${quizQuestions.length} on the BTS Member Quiz at Love for BTS! Test your knowledge too! #BTSArmy #LoveForBTS` 
      : `My BTS member match is ${topMatch}! Who's yours? Take the quiz at Love for BTS! #BTSArmy #LoveForBTS`
    
    if (navigator.share) {
      navigator.share({
        title: quizType === "knowledge" ? 'My BTS Member Quiz Result' : 'My BTS Member Match',
        text: shareText,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText + ' ' + window.location.href)
      alert('Result copied to clipboard! Share it with your friends.')
    }
  }

  // Render member connection question
  const renderMemberConnectionQuestion = (question: MemberConnectionQuestion) => {
    // Ensure we have an image path that's always a string
    const imagePath = question.image || "/images/default-quiz.jpg";
    
    return (
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 text-center w-full">
          <div className="flex items-center justify-center mb-2">
            <User className="h-5 w-5 mr-2 text-purple-600" />
            <span className="font-bold text-purple-800">{question.memberName}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>
          
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 max-w-md">
            <Image
              src={imagePath} 
              alt={question.songName || "Quiz question image"}
              width={500} 
              height={300} 
              className="object-cover w-full h-full"
            />
          </div>
          
          {question.context && !isAnswered && !showHint && (
            <p className="text-sm text-gray-500 mb-4">{question.context}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 w-full max-w-md mx-auto">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectMemberConnection(option)}
              className={`p-3 rounded-md text-center transition-all ${
                isAnswered
                  ? option === question.correctAnswer
                    ? "bg-green-100 text-green-800 border-2 border-green-300 font-bold"
                    : selectedAnswer === option
                    ? "bg-red-100 text-red-800 border-2 border-red-300"
                    : "bg-white border border-gray-200 text-gray-700"
                  : "bg-white border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
              }`}
            >
              {option}
              {isAnswered && option === question.correctAnswer && (
                <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-green-600" />
              )}
              {isAnswered && option === selectedAnswer && option !== question.correctAnswer && (
                <XCircle className="inline-block ml-2 h-5 w-5 text-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render personality question
  const renderPersonalityQuestion = (question: PersonalityQuestion) => {
    const imagePath = question.image || "/images/default-quiz.jpg";
    
    return (
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 text-center w-full">          
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>
          
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 max-w-md">
            <Image
              src={imagePath} 
              alt="Question image"
              width={500} 
              height={300} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 w-full max-w-md mx-auto">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectPersonality(option)}
              className={`p-3 rounded-md text-center transition-all ${
                selectedAnswer === option.text
                  ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300 font-bold"
                  : "bg-white border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
              }`}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render question based on type
  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.questionType) {
      case 'member-connection':
        return renderMemberConnectionQuestion(currentQuestion as MemberConnectionQuestion)
      case 'personality':
        return renderPersonalityQuestion(currentQuestion as PersonalityQuestion)
      default:
        return null
    }
  }

  // Get member image path
  const getMemberImagePath = (memberName: string) => {
    switch (memberName) {
      case "RM":
        return "/images/members/rm.jpg"
      case "Jin":
        return "/images/members/jin.jpg"
      case "Suga":
        return "/images/members/suga.jpg"
      case "J-Hope":
        return "/images/members/jhope.jpg"
      case "Jimin":
        return "/images/members/jimin.jpg"
      case "V":
        return "/images/members/v.jpg"
      case "Jungkook":
        return "/images/members/jungkook.jpg"
      default:
        return "/images/default-quiz.jpg"
    }
  }

  // Get member description
  const getMemberDescription = (memberName: string) => {
    switch (memberName) {
      case "RM":
        return "Your thoughtful approach and intellectual nature align with RM. You likely enjoy deep conversations, art, and have leadership qualities."
      case "Jin":
        return "Your caring, supportive nature and good humor match with Jin. You're probably reliable and know how to lighten the mood."
      case "Suga":
        return "Your introspective, straightforward personality matches with Suga. You're likely creative and value authenticity above all."
      case "J-Hope":
        return "Your positive energy and hardworking attitude align with J-Hope. You're probably the one who lifts others' spirits when times get tough."
      case "Jimin":
        return "Your warm, affectionate personality and perfectionist tendencies match with Jimin. You likely put your heart into everything you do."
      case "V":
        return "Your unique perspective and artistic sensibility align with V. You probably march to the beat of your own drum and appreciate beauty in unexpected places."
      case "Jungkook":
        return "Your determined, multi-talented nature matches with Jungkook. You're likely curious about many things and strive to excel at whatever you try."
      default:
        return "You have qualities that align with multiple BTS members!"
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <Link href="/quiz" className="flex items-center text-black hover:text-purple-700 mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Quizzes</span>
        </Link>
      </div>
      
      <PageHeader 
        title="BTS Member Quiz" 
        description="Test your knowledge of the BTS members or find out which member matches your personality!"
      />

      {!quizStarted && !quizType && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">Choose Your Quiz Type</h2>
          <p className="text-center mb-8 text-gray-600">Which type of BTS member quiz would you like to try?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button 
              onClick={() => setQuizType("knowledge")}
              className="flex flex-col items-center p-6 rounded-xl border-2 border-black hover:bg-bts-accent transition-colors"
            >
              <Users className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2 black-han-sans">Member Knowledge</h3>
              <p>Test how well you know facts about BTS members, their pets, talents, and more!</p>
              <span className="mt-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Facts • Trivia • Details</span>
            </button>

            <button 
              onClick={() => setQuizType("personality")}
              className="flex flex-col items-center p-6 rounded-xl border-2 border-black hover:bg-bts-accent transition-colors"
            >
              <Sparkles className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2 black-han-sans">Member Match</h3>
              <p>Find out which BTS member your personality most closely aligns with!</p>
              <span className="mt-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Personality • Compatibility • Fun</span>
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
            <h4 className="font-bold mb-2">How to Play:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Member Knowledge Quiz:</strong> Answer questions about BTS members to test your knowledge</li>
              <li><strong>Member Match Quiz:</strong> Answer questions about yourself to find which member is most like you</li>
              <li>For the knowledge quiz, you have 30 seconds per question</li>
              <li>For the personality quiz, take your time - there are no right or wrong answers!</li>
              <li>Share your results with other ARMY when you're done</li>
            </ul>
          </div>
        </div>
      )}

      {quizStarted && !quizFinished && currentQuestion && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8">
          {/* Progress and streak bar for knowledge quiz */}
          {quizType === "knowledge" && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <div className="flex items-center">
                  <span className="mr-3">Score: {score}</span>
                  {streakCount > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      {getStreakMessage()}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-bts-accent h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Progress bar for personality quiz */}
          {quizType === "personality" && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-bts-accent h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Timer for knowledge quiz */}
          {timeLeft !== null && !isAnswered && (
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Time Remaining:</span>
                <span className={`font-medium ${timeLeft < 10 ? 'text-red-600' : ''}`}>{timeLeft}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-1000 ${
                    timeLeft < 10 ? 'bg-red-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Question */}
          <div className="mb-6 flex flex-col items-center justify-center w-full">
            {renderQuestion()}
          </div>
          
          {/* Next button wrapper */}
          {isAnswered && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNextQuestion}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-gray-800 transition-colors"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results for Knowledge Quiz */}
      {quizFinished && quizType === "knowledge" && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2 black-han-sans">Quiz Completed!</h2>
          <div className="py-8">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-purple-100 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-purple-500 fill-purple-500" />
                </div>
              </div>
            </div>
            
            <p className="text-4xl font-bold mb-2">
              {score} / {quizQuestions.length}
            </p>
            <p className="text-lg mb-4">{getScoreMessage()}</p>
            
            <div className="mb-8 p-4 rounded-xl bg-gray-50 inline-block">
              <p className="font-medium">You scored {Math.round((score / quizQuestions.length) * 100)}%</p>
              <div className="w-64 h-4 bg-gray-200 rounded-full mt-2 mx-auto">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-purple-600" 
                  style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-bts-accent text-black px-8 py-3 rounded-full font-bold border-2 border-black hover:bg-navbar-hover transition-colors"
              >
                Play Again
              </button>
              
              <button
                onClick={shareResult}
                className="bg-white text-black px-8 py-3 rounded-full font-bold border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Result
              </button>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <Link 
              href="/quiz" 
              className="text-purple-600 hover:text-purple-800 underline"
            >
              Try another quiz
            </Link>
          </div>
        </div>
      )}

      {/* Results for Personality Quiz */}
      {quizFinished && quizType === "personality" && topMatch && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2 black-han-sans">Your BTS Member Match!</h2>
          <div className="py-8">
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-bts-accent">
                <Image
                  src={getMemberImagePath(topMatch)}
                  alt={topMatch}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 black-han-sans text-purple-800">
              {topMatch}
            </h3>
            
            <p className="text-lg mb-8 max-w-md mx-auto">
              {getMemberDescription(topMatch)}
            </p>
            
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {Object.entries(memberMatches).sort((a, b) => b[1] - a[1]).map(([member, count]) => (
                <div 
                  key={member} 
                  className={`p-3 rounded-lg border-2 ${member === topMatch ? 'border-bts-accent bg-yellow-50' : 'border-gray-200'}`}
                >
                  <div className="font-bold">{member}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className={`h-2.5 rounded-full ${member === topMatch ? 'bg-bts-accent' : 'bg-purple-400'}`}
                      style={{ width: `${(count / personalityQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-bts-accent text-black px-8 py-3 rounded-full font-bold border-2 border-black hover:bg-navbar-hover transition-colors"
              >
                Play Again
              </button>
              
              <button
                onClick={shareResult}
                className="bg-white text-black px-8 py-3 rounded-full font-bold border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Result
              </button>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <Link 
              href="/quiz" 
              className="text-purple-600 hover:text-purple-800 underline"
            >
              Try another quiz
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 
