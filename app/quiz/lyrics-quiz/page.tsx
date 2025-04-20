"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Heart, Music, ChevronRight, CheckCircle2, XCircle, HelpCircle, ArrowLeft, Share2, Clock, Medal, User, GripVertical } from "lucide-react"
import { PageHeader } from "../../components/ui/page-header"
import { 
  mixedQuizQuestions, 
  lyricsQuizQuestions, 
  memberSoloQuizQuestions,
  creativeQuizQuestions,
  guessSongQuestions,
  QuizQuestion,
  MultipleChoiceQuestion,
  FillBlankQuestion,
  LineCompletionQuestion,
  VisualRecognitionQuestion,
  ChronologyQuestion,
  MemberConnectionQuestion,
  PersonalityQuestion,
  GuessSongQuestion
} from "../../data/quiz-data"
import confetti from "canvas-confetti"
import { triggerBTSConfetti, triggerStreakConfetti } from "../../components/ui/celebration-effects"

export default function LyricsQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userInput, setUserInput] = useState<string>("")
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [quizType, setQuizType] = useState<"creative" | "guess-song" | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])
  const [streakCount, setStreakCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [questionTimer, setQuestionTimer] = useState<NodeJS.Timeout | null>(null)
  const fillBlankInputRef = useRef<HTMLInputElement | null>(null)
  const [chronologyOrder, setChronologyOrder] = useState<number[]>([])

  // Add this helper function near the top of the component
  const getImagePath = (path: string | undefined): string => {
    return path || "/images/default-quiz.jpg";
  };

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
    if (quizType === "creative") {
      const shuffled = shuffleArray(creativeQuizQuestions).slice(0, 10) // Take 10 creative questions
      setShuffledQuestions(shuffled)
      setQuizQuestions(shuffled)
      setQuizStarted(true)
      setTimeLeft(30) // 30 seconds per question
    } else if (quizType === "guess-song") {
      const shuffled = shuffleArray(guessSongQuestions).slice(0, 10) // Take 10 guess song questions
      setShuffledQuestions(shuffled)
      setQuizQuestions(shuffled)
      setQuizStarted(true)
      setTimeLeft(30) // 30 seconds per question
    }
  }, [quizType])

  // Focus input field for fill-in-the-blank questions
  useEffect(() => {
    if (quizStarted && !isAnswered && currentQuestion?.questionType === 'fill-blank' && fillBlankInputRef.current) {
      fillBlankInputRef.current.focus()
    }
  }, [currentQuestionIndex, quizStarted, isAnswered])

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

  const handleSelectMultipleChoice = (answer: string) => {
    if (isAnswered) return
    
    // Clear the timer
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    const correct = answer === (currentQuestion as MultipleChoiceQuestion).correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
      setStreakCount(streakCount + 1)
      triggerStreakConfetti(streakCount + 1)
    } else {
      setStreakCount(0)
    }
  }

  const handleFillBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAnswered) return
    
    // Clear the timer
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
    
    setIsAnswered(true)
    
    // Check if answer is correct (case insensitive)
    const fillBlankQuestion = currentQuestion as FillBlankQuestion
    const userInputLower = userInput.toLowerCase().trim()
    const correctAnswerLower = fillBlankQuestion.correctAnswer.toLowerCase().trim()
    
    const correct = userInputLower === correctAnswerLower
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
      setStreakCount(streakCount + 1)
      triggerStreakConfetti(streakCount + 1)
    } else {
      setStreakCount(0)
    }
  }

  const handleLineCompletionSelect = (ending: string) => {
    if (isAnswered) return
    
    // Clear the timer
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
    
    setSelectedAnswer(ending)
    setIsAnswered(true)
    
    const lineCompletionQuestion = currentQuestion as LineCompletionQuestion
    const correct = ending === lineCompletionQuestion.correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
      setStreakCount(streakCount + 1)
      triggerStreakConfetti(streakCount + 1)
    } else {
      setStreakCount(0)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setUserInput("")
      setIsAnswered(false)
      setIsCorrect(null)
      setShowHint(false)
      setShowExplanation(false)
      setTimeLeft(30) // Reset timer for next question
    } else {
      setQuizFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setUserInput("")
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
    
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return "You're a true ARMY! Perfect score! 💜"
    if (percentage >= 80) return "Amazing! You really know your BTS lyrics! 🌟"
    if (percentage >= 60) return "Great job! Your BTS knowledge is solid! ✨"
    if (percentage >= 40) return "Not bad! Keep listening to more BTS songs! 🎵"
    return "Keep practicing! Every ARMY starts somewhere! 💜"
  }

  const getStreakMessage = () => {
    if (streakCount >= 5) return "INCREDIBLE STREAK! 🔥🔥🔥"
    if (streakCount >= 3) return "Great streak! 🔥🔥"
    if (streakCount >= 1) return "Streak: " + streakCount + " 🔥"
    return ""
  }

  const shareResult = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    const shareText = `I scored ${score}/${quizQuestions.length} (${percentage}%) on the BTS Lyrics Quiz at Love for BTS! Test your knowledge too! #BTSArmy #LoveForBTS`
    
    if (navigator.share) {
      navigator.share({
        title: 'My BTS Lyrics Quiz Result',
        text: shareText,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText + ' ' + window.location.href)
      alert('Result copied to clipboard! Share it with your friends.')
    }
  }

  // Render appropriate question UI based on question type
  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.questionType) {
      case 'visual-recognition':
        return renderVisualRecognitionQuestion(currentQuestion as VisualRecognitionQuestion)
      case 'chronology':
        return renderChronologyQuestion(currentQuestion as ChronologyQuestion)
      case 'member-connection':
        return renderMemberConnectionQuestion(currentQuestion as MemberConnectionQuestion)
      case 'guess-song':
        return renderGuessSongQuestion(currentQuestion as GuessSongQuestion)
      default:
        return null
    }
  }

  // Render multiple choice question
  const renderMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => {
    // Check if the question has an image
    const hasImage = question.image && question.image.trim() !== '';
    const imagePath = hasImage ? question.image : "/images/default-quiz.jpg";
    
    return (
      <div className="flex flex-col items-center w-full">
        <h3 className="text-xl font-bold mb-1 black-han-sans">{question.songName}</h3>
        
        {/* Display image if available */}
        {hasImage && (
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 w-full md:w-3/4 max-w-xl">
            <Image
              src={imagePath!} 
              alt={question.songName || "Quiz question image"}
              width={600} 
              height={400} 
              className="object-contain w-full h-auto"
            />
          </div>
        )}
        
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-2 w-full">
          <p className="text-lg italic">"{question.lyricsSnippet}"</p>
        </div>
        
        {/* Answer options */}
        <div className="space-y-3 mt-4 w-full">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectMultipleChoice(option)}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 scale-105'
                    : 'bg-red-100 border-red-500'
                  : 'border-gray-300 hover:border-black hover:bg-gray-50'
              } ${
                isAnswered && option === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : ''
              }`}
              disabled={isAnswered}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {isAnswered && (
                  option === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : selectedAnswer === option ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render fill-in-the-blank question
  const renderFillBlankQuestion = (question: FillBlankQuestion) => (
    <div>
      <h3 className="text-xl font-bold mb-1 black-han-sans">{question.songName}</h3>
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
        <p className="text-lg italic">
          {question.context && <span className="text-gray-500 block mb-2">{question.context}</span>}
          {question.lyricsWithBlank.replace(/_+/g, '______')}
        </p>
      </div>
      
      <form onSubmit={handleFillBlankSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="fill-blank-answer" className="block text-gray-700 mb-1 font-medium">
            Complete the lyric:
          </label>
          <input
            id="fill-blank-answer"
            ref={fillBlankInputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="Type your answer here..."
            disabled={isAnswered}
            autoComplete="off"
          />
        </div>
        
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          disabled={isAnswered || userInput.trim() === ''}
        >
          Submit Answer
        </button>
      </form>
      
      {isAnswered && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-medium">
            {isCorrect 
              ? "That's correct! 💜" 
              : <span>Oops! The correct answer is: <span className="font-bold">"{question.correctAnswer}"</span></span>
            }
          </p>
        </div>
      )}
    </div>
  )

  // Render line completion question
  const renderLineCompletionQuestion = (question: LineCompletionQuestion) => (
    <div>
      <h3 className="text-xl font-bold mb-1 black-han-sans">{question.songName}</h3>
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-2">
        <p className="text-lg italic">Complete the line:</p>
        <p className="text-lg font-medium mt-2">{question.lineStart}...</p>
      </div>
      
      {/* Answer options */}
      <div className="space-y-3 mt-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleLineCompletionSelect(option)}
            className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-100 border-green-500 scale-105'
                  : 'bg-red-100 border-red-500'
                : 'border-gray-300 hover:border-black hover:bg-gray-50'
            } ${
              isAnswered && option === question.correctAnswer
                ? 'bg-green-100 border-green-500'
                : ''
            }`}
            disabled={isAnswered}
          >
            <div className="flex justify-between items-center">
              <span>"{option}"</span>
              {isAnswered && (
                option === question.correctAnswer ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : selectedAnswer === option ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : null
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  // New rendering functions for the creative question types
  const renderVisualRecognitionQuestion = (question: VisualRecognitionQuestion) => {
    // Ensure we have an image path that's always a string
    const imagePath = question.image || "/images/default-quiz.jpg";
    
    return (
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 text-center w-full">
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>
          
          {/* Display the image to identify */}
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 w-full md:w-3/4 max-w-xl">
            {question.image ? (
              <Image 
                src={imagePath} 
                alt={question.songName || "Quiz question image"}
                width={600} 
                height={400} 
                className="object-contain w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <span className="text-gray-400">Image not available</span>
              </div>
            )}
          </div>
          
          {question.description && !isAnswered && !showHint && (
            <p className="text-sm text-gray-500 mb-4">{question.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 w-full max-w-md">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectMultipleChoice(option)}
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

  // Add this handler for chronology questions
  const handleChronologyDrag = (startIndex: number, endIndex: number) => {
    const newOrder = [...chronologyOrder]
    const [removed] = newOrder.splice(startIndex, 1)
    newOrder.splice(endIndex, 0, removed)
    setChronologyOrder(newOrder)
  }

  const handleChronologySubmit = () => {
    if (isAnswered) return
    
    // Clear the timer
    if (questionTimer) {
      clearTimeout(questionTimer)
      setQuestionTimer(null)
    }
    
    setIsAnswered(true)
    
    const chronologyQuestion = currentQuestion as ChronologyQuestion
    
    // Check if the order is correct
    const correct = chronologyOrder.every((eventIndex, orderIndex) => {
      return eventIndex === chronologyQuestion.correctOrder[orderIndex]
    })
    
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
      setStreakCount(streakCount + 1)
      triggerStreakConfetti(streakCount + 1)
    } else {
      setStreakCount(0)
    }
  }

  // Initialize chronology order when question changes
  useEffect(() => {
    if (currentQuestion?.questionType === 'chronology') {
      const chronologyQuestion = currentQuestion as ChronologyQuestion
      // Start with events in original order (indices 0 to n)
      setChronologyOrder(chronologyQuestion.events.map((_, index) => index))
    }
  }, [currentQuestionIndex, currentQuestion])

  const renderChronologyQuestion = (question: ChronologyQuestion) => {
    // Ensure we have an image path that's always a string
    const imagePath = question.image || "/images/default-quiz.jpg";
    
    const onDragStart = (e: React.DragEvent, index: number) => {
      e.dataTransfer.setData('text/plain', index.toString());
      e.currentTarget.classList.add('opacity-50');
    };
    
    const onDragEnd = (e: React.DragEvent) => {
      e.currentTarget.classList.remove('opacity-50');
    };
    
    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };
    
    const onDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
      if (dragIndex === dropIndex) return;
      
      // Call our handle function that updates the state
      handleChronologyDrag(dragIndex, dropIndex);
    };
    
    return (
      <div className="flex flex-col items-center w-full">
        <h3 className="text-xl font-bold mb-4 text-center">{question.question}</h3>
        
        {question.image && (
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 w-full md:w-3/4 max-w-xl">
            <Image 
              src={imagePath} 
              alt={question.songName || "Quiz question image"} 
              width={600} 
              height={400} 
              className="object-contain w-full h-auto"
            />
          </div>
        )}
        
        <div className="w-full max-w-md mb-6">
          <div className="flex flex-col gap-2">
            {chronologyOrder.map((eventIndex, orderIndex) => (
              <div 
                key={eventIndex}
                draggable={!isAnswered}
                onDragStart={(e) => onDragStart(e, orderIndex)}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, orderIndex)}
                className={`p-3 rounded-md bg-white border-2 ${
                  isAnswered 
                    ? eventIndex === question.correctOrder[orderIndex]
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                    : "border-gray-300 cursor-grab hover:border-purple-400 active:border-purple-600"
                } flex items-center`}
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-3">
                  {orderIndex + 1}
                </div>
                {!isAnswered && (
                  <GripVertical className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                )}
                <div className="flex-grow">
                  {question.events[eventIndex]}
                </div>
                {isAnswered && (
                  <div className="ml-2">
                    {eventIndex === question.correctOrder[orderIndex] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isAnswered && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Drag and drop to arrange in the correct order
            </div>
          )}
          
          {!isAnswered && (
            <button
              onClick={handleChronologySubmit}
              className="mt-4 w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Submit Order
            </button>
          )}
          
          {isAnswered && !isCorrect && (
            <div className="mt-4 p-3 bg-purple-100 border border-purple-300 rounded-md">
              <p className="font-medium">Correct order:</p>
              <ol className="list-decimal list-inside mt-1">
                {question.correctOrder.map((eventIndex, i) => (
                  <li key={i} className="ml-2">
                    {question.events[eventIndex]}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  };

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
          
          <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 w-full md:w-3/4 max-w-xl">
            <Image
              src={imagePath} 
              alt={question.songName || "Quiz question image"}
              width={600} 
              height={400} 
              className="object-contain w-full h-auto"
            />
          </div>
          
          {question.context && !isAnswered && !showHint && (
            <p className="text-sm text-gray-500 mb-4">{question.context}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 w-full max-w-md">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectMultipleChoice(option)}
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

  // Add the renderer for guess-song questions
  const renderGuessSongQuestion = (question: GuessSongQuestion) => {
    // Ensure we have an image path that's always a string
    const imagePath = question.image || "/images/default-quiz.jpg";
    
    return (
      <div className="flex flex-col items-center w-full">
        <div className="mb-4 text-center w-full">
          <h3 className="text-xl font-bold mb-4">Guess the song from these lyrics:</h3>
          
          {question.image && (
            <div className="mb-6 mx-auto rounded-lg overflow-hidden border-2 border-gray-300 w-full md:w-3/4 max-w-xl">
              <Image 
                src={imagePath} 
                alt="Song artwork" 
                width={600} 
                height={400} 
                className="object-contain w-full h-auto"
              />
            </div>
          )}
          
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
            <p className="text-lg italic">"{question.lyricsSnippet}"</p>
            {question.album && !isAnswered && !showHint && (
              <p className="text-sm text-gray-500 mt-2">Album: {question.album}</p>
            )}
            {question.releaseYear && !isAnswered && !showHint && (
              <p className="text-sm text-gray-500 mt-1">Released in {question.releaseYear}</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (isAnswered) return;
            
            if (questionTimer) {
              clearTimeout(questionTimer);
              setQuestionTimer(null);
            }
            
            setIsAnswered(true);
            
            // Check if answer is in possible answers (case insensitive)
            const userInputLower = userInput.toLowerCase().trim();
            const correct = question.possibleAnswers.some(answer => 
              userInputLower === answer.toLowerCase().trim()
            );
            
            setIsCorrect(correct);
            
            if (correct) {
              setScore(score + 1);
              setStreakCount(streakCount + 1);
              triggerStreakConfetti(streakCount + 1);
            } else {
              setStreakCount(0);
            }
          }} className="mb-4">
            <div className="mb-3">
              <label htmlFor="guess-song-answer" className="block text-gray-700 mb-1 font-medium">
                Enter the song name:
              </label>
              <input
                id="guess-song-answer"
                ref={fillBlankInputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Type the song name here..."
                disabled={isAnswered}
                autoComplete="off"
              />
            </div>
            
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              disabled={isAnswered || userInput.trim() === ''}
            >
              Submit Answer
            </button>
          </form>
          
          {isAnswered && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="font-medium">
                {isCorrect 
                  ? "That's correct! 💜" 
                  : <span>The song is <span className="font-bold">"{question.songName}"</span></span>
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <Link href="/quiz" className="flex items-center text-black hover:text-purple-700 mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Quizzes</span>
        </Link>
      </div>
      
      <PageHeader 
        title="BTS Lyrics Quiz" 
        description="Test your knowledge of BTS lyrics with these fun challenges!"
      />

      {!quizStarted && !quizFinished && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">How well do you know BTS lyrics?</h2>
          <p className="text-center mb-8 text-gray-600">Challenge yourself with questions about BTS songs and lyrics!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <button 
              onClick={() => setQuizType("guess-song")}
              className="flex flex-col items-center p-6 rounded-xl border-2 border-black hover:bg-[#FFDE00] transition-colors"
            >
              <Music className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2 black-han-sans">Guess the Song</h3>
              <p>Test how well you know BTS songs from just a snippet of lyrics</p>
              <span className="mt-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Lyrics • Song Recognition</span>
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-500">
            Want to test your broader BTS knowledge? Try our <Link href="/quiz/army-quiz" className="text-purple-600 hover:underline">ARMY Knowledge Quiz</Link>!
          </p>
        </div>
      )}

      {quizStarted && !quizFinished && currentQuestion && (
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md mt-8">
          {/* Progress and streak bar */}
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
                className="bg-[#FFDE00] h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Timer */}
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
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              {renderQuestion()}
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  Difficulty: {currentQuestion.difficulty === 'easy' ? '😊 Easy' : 
                              currentQuestion.difficulty === 'medium' ? '😐 Medium' : 
                              '😵 Hard'}
                </span>
                
                {currentQuestion.hint && !isAnswered && (
                  <button 
                    onClick={() => setShowHint(!showHint)} 
                    className="text-sm text-gray-500 flex items-center gap-1 hover:text-purple-700 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                )}
              </div>
              
              {showHint && currentQuestion.hint && (
                <div className="mt-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded-md border border-yellow-200 animate-fade-in">
                  <span className="font-bold">Hint:</span> {currentQuestion.hint}
                </div>
              )}
            </div>
          </div>
          
          {/* Only show explanation for multiple choice questions */}
          {isAnswered && currentQuestion.questionType === 'multiple-choice' && (
            <div className="flex justify-between items-center mt-4 mb-2">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-sm underline hover:no-underline"
              >
                {showExplanation ? 'Hide Song Info' : 'Show Song Info'}
              </button>
            </div>
          )}
          
          {showExplanation && isAnswered && currentQuestion.questionType === 'multiple-choice' && (
            <div className="mt-2 text-sm bg-white/50 p-3 rounded border border-gray-200 animate-fade-in">
              <p className="mb-2">
                <span className="font-bold">Song:</span> {currentQuestion.songName} is from 
                {currentQuestion.songName === 'Dynamite' ? ' BTS\'s first all-English digital single released in 2020.' : 
                 currentQuestion.songName === 'Butter' ? ' BTS\'s second English-language single released in May 2021.' :
                 currentQuestion.songName === 'Permission to Dance' ? ' BTS\'s third English single, co-written with Ed Sheeran.' :
                 currentQuestion.songName === 'Life Goes On' ? ' BTS\'s BE album, released during the COVID-19 pandemic.' :
                 ' one of BTS\'s most beloved songs.'}
              </p>
            </div>
          )}
          
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

      {quizFinished && (
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
                className="bg-[#FFDE00] text-black px-8 py-3 rounded-full font-bold border-2 border-black hover:bg-yellow-400 transition-colors"
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