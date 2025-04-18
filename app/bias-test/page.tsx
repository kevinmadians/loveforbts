"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Heart, RefreshCw, Share2 } from "lucide-react"
import { memberCompatibilityProfiles, biasCompatibilityQuestions, findCompatibilityMatch } from "../lib/compatibility-data"
import { membersData } from "../lib/members-data"
import { PageHeader } from "../components/ui/page-header"

// Define types for our state
type TestState = "intro" | "questions" | "results"
type UserAnswers = Record<string, string[]>

export default function BiasTestPage() {
  // State for the test
  const [state, setState] = useState<TestState>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [primaryBias, setPrimaryBias] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [results, setResults] = useState<{
    primaryMatch: typeof memberCompatibilityProfiles[0]
    secondaryMatch: typeof memberCompatibilityProfiles[0]
    traitSummary: string
  } | null>(null)
  const [userTraits, setUserTraits] = useState<string[]>([])
  const [isSharing, setIsSharing] = useState(false)

  // Questions for the quiz
  const questions = biasCompatibilityQuestions

  // Handle bias selection
  const handleBiasSelect = (bias: string) => {
    setPrimaryBias(bias)
    setState("questions")
  }

  // Handle option selection
  const handleOptionSelect = (questionId: string, traits: string[]) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: traits
    })

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  // Calculate personality traits and find compatibility match
  const calculateResults = () => {
    // Gather all selected traits
    const allTraits = Object.values(userAnswers).flat()
    setUserTraits(allTraits)

    // Find compatibility match
    if (primaryBias) {
      const matchResults = findCompatibilityMatch(primaryBias, allTraits)
      setResults(matchResults)
    }

    setState("results")
  }

  // Restart the quiz
  const handleRestart = () => {
    setPrimaryBias(null)
    setUserAnswers({})
    setCurrentQuestion(0)
    setResults(null)
    setState("intro")
  }

  // Share results
  const handleShare = async () => {
    if (!results) return

    setIsSharing(true)
    
    try {
      // Create share text
      const shareText = `I took the BTS Bias Compatibility Test on Love for BTS! My primary bias is ${membersData.find(m => m.slug === primaryBias)?.name}, and I'm compatible with ${results.primaryMatch.name}! Take the test yourself at https://loveforbts.com/bias-test`
      
      if (navigator.share) {
        await navigator.share({
          title: 'My BTS Bias Compatibility Results',
          text: shareText,
          url: 'https://loveforbts.com/bias-test',
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText)
        alert("Results copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing results:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <PageHeader 
        title="BTS Bias Compatibility Test" 
        description="Discover which other BTS member you might bias based on your personality and current bias"
      />

      <div className="mt-8 bg-white border-2 border-black rounded-2xl p-6 shadow-md">
        <AnimatePresence mode="wait">
          {state === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-8">
                <p className="text-lg mb-4">
                  Who's your current BTS bias? Select a member to begin the test and discover your compatibility with other members!
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {membersData.map((member) => (
                  <button
                    key={member.slug}
                    onClick={() => handleBiasSelect(member.slug)}
                    className="flex flex-col items-center p-3 border-2 border-black rounded-xl hover:bg-[#FFDE00] transition-colors group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black mb-2 relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <span className="font-semibold group-hover:text-black">{member.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-full mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#FFDE00] h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].text}</h2>
              
              <div className="w-full space-y-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(questions[currentQuestion].id, option.traits)}
                    className="w-full p-4 border-2 border-black rounded-lg hover:bg-[#FFDE00] transition-colors text-left flex justify-between items-center"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="h-5 w-5 text-black" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="bg-gradient-to-r from-purple-100 to-yellow-100 p-6 rounded-xl border-2 border-black w-full mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Your Results</h2>
                
                <div className="text-center mb-6">
                  <p className="text-lg mb-2">
                    Based on your answers, you're most compatible with:
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-black">
                      <Image
                        src={results.primaryMatch.image}
                        alt={results.primaryMatch.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <span className="text-3xl font-bold black-han-sans text-black">
                        {results.primaryMatch.name}
                      </span>
                      <div className="flex items-center mt-1">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 mr-2" />
                        <span className="font-medium">Perfect Match!</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-black mb-6">
                  <p className="mb-2 font-medium">{results.traitSummary}</p>
                  <p>{results.primaryMatch.personalityDescription}</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-black mb-6">
                  <h3 className="font-bold mb-2">Why You Match</h3>
                  <p>
                    {results.primaryMatch.compatibleWith.find(c => 
                      c.slug === primaryBias
                    )?.reason || `Your personality traits complement ${results.primaryMatch.name}'s unique characteristics, creating a harmonious connection.`}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold mb-2">You might also like:</h3>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border-2 border-black">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                      <Image
                        src={results.secondaryMatch.image}
                        alt={results.secondaryMatch.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{results.secondaryMatch.name}</p>
                      <p className="text-sm">{results.secondaryMatch.personalityDescription.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={handleRestart}
                    className="flex-1 py-3 px-6 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                    disabled={isSharing}
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    <span>Take Again</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 px-6 bg-[#FFDE00] border-2 border-black rounded-lg hover:bg-[#FFD000] transition-colors flex items-center justify-center"
                    disabled={isSharing}
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    <span>{isSharing ? 'Sharing...' : 'Share Results'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 