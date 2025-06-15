"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Heart, RefreshCw, Share2, Trophy, Star, Sparkles, TrendingUp, X, MessageCircle, Instagram, Facebook, Twitter, Copy, Check } from "lucide-react"
import confetti from "canvas-confetti"
import { memberCompatibilityProfiles, biasCompatibilityQuestions, findCompatibilityMatch } from "../lib/compatibility-data"
import { membersData } from "../lib/members-data"
import { PageHeader } from "../components/ui/page-header"

// Define types for our state
type TestState = "intro" | "questions" | "results"
type UserAnswers = Record<string, string[]>

interface EnhancedResults {
  primaryMatch: typeof memberCompatibilityProfiles[0]
  secondaryMatch: typeof memberCompatibilityProfiles[0]
  tertiaryMatch: typeof memberCompatibilityProfiles[0]
  traitSummary: string
  compatibilityScore: number
  traitBreakdown: Record<string, number>
  allScores: Array<{member: typeof memberCompatibilityProfiles[0], score: number, percentage: number}>
}

interface SharePreviewProps {
  results: EnhancedResults
  primaryBias: string
  onClose: () => void
  primaryMember: any
}

function SharePreview({ results, primaryBias, onClose, primaryMember }: SharePreviewProps) {
  const [copied, setCopied] = useState(false)
  
  const shareText = `🎉 I took the BTS Bias Compatibility Test!

My bias: ${primaryMember?.name} 💜
Best match: ${results.primaryMatch.name} (${results.compatibilityScore}% compatible!)

${results.traitSummary}

Take the test: https://loveforbts.com/bias-test`

  const shareUrl = "https://loveforbts.com/bias-test"
  
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    let shareLink = ""
    
    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
        break
      case "instagram":
        // Instagram doesn't have direct URL sharing, so we'll copy to clipboard
        handleCopyToClipboard()
        return
      default:
        return
    }
    
    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl border-2 border-black p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold black-han-sans">Share Your Results</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Preview Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 mb-6 border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black">
              <Image
                src={results.primaryMatch.image}
                alt={results.primaryMatch.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-bold">{results.compatibilityScore}% Match with {results.primaryMatch.name}</p>
              <p className="text-sm text-gray-600">BTS Bias Compatibility Test</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">My bias: {primaryMember?.name} 💜</p>
          <p className="text-xs text-gray-600 line-clamp-2">{results.traitSummary}</p>
        </div>
        
        {/* Share Options */}
        <div className="space-y-3">
          <button
            onClick={() => handleShare("whatsapp")}
            className="w-full flex items-center gap-3 p-3 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">Share on WhatsApp</span>
          </button>
          
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center gap-3 p-3 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Twitter className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Share on Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center gap-3 p-3 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Facebook className="w-5 h-5 text-blue-700" />
            <span className="font-medium">Share on Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare("instagram")}
            className="w-full flex items-center gap-3 p-3 border-2 border-pink-500 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <Instagram className="w-5 h-5 text-pink-600" />
            <span className="font-medium">Copy for Instagram</span>
          </button>
          
          <button
            onClick={handleCopyToClipboard}
            className="w-full flex items-center gap-3 p-3 border-2 border-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BiasTestPage() {
  // State for the test
  const [state, setState] = useState<TestState>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [primaryBias, setPrimaryBias] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [results, setResults] = useState<EnhancedResults | null>(null)
  const [userTraits, setUserTraits] = useState<string[]>([])
  const [showSharePreview, setShowSharePreview] = useState(false)
  const [showDetailedScores, setShowDetailedScores] = useState(false)

  // Ref for scrolling to test container
  const testContainerRef = useRef<HTMLDivElement>(null)

  // Questions for the quiz
  const questions = biasCompatibilityQuestions

  // Filter out OT7 from members data
  const filteredMembers = membersData.filter(member => member.slug !== 'ot7')

  // Trigger confetti animation
  const triggerConfetti = () => {
    // Multiple confetti bursts for extra celebration
    const colors = ['#FFDE00', '#FF6B9D', '#9C27B0', '#2196F3', '#4CAF50']
    
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    })
    
    // Second burst after slight delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.4 },
        colors: colors
      })
    }, 300)
    
    // Final smaller burst
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: colors
      })
    }, 600)
  }

  // Auto-scroll to test container
  const scrollToTest = () => {
    if (testContainerRef.current) {
      testContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }

  // Handle bias selection
  const handleBiasSelect = (bias: string) => {
    setPrimaryBias(bias)
    setState("questions")
  }

  // Handle option selection with animation
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
    
    // Trigger confetti after a short delay to let the results render
    setTimeout(() => {
      triggerConfetti()
    }, 500)
  }

  // Restart the quiz
  const handleRestart = () => {
    setPrimaryBias(null)
    setUserAnswers({})
    setCurrentQuestion(0)
    setResults(null)
    setUserTraits([])
    setShowDetailedScores(false)
    setShowSharePreview(false)
    setState("intro")
    
    // Scroll to test container on mobile/tablet
    setTimeout(() => {
      scrollToTest()
    }, 100)
  }

  // Show share preview
  const handleShare = () => {
    setShowSharePreview(true)
  }

  // Get member color theme for dynamic styling
  const getMemberTheme = (memberSlug: string) => {
    const themes: Record<string, {bg: string, text: string, accent: string}> = {
      'rm': { bg: 'from-purple-100 to-blue-100', text: 'text-purple-800', accent: 'bg-purple-500' },
      'jin': { bg: 'from-pink-100 to-red-100', text: 'text-pink-800', accent: 'bg-pink-500' },
      'suga': { bg: 'from-gray-100 to-slate-100', text: 'text-gray-800', accent: 'bg-gray-600' },
      'j-hope': { bg: 'from-orange-100 to-yellow-100', text: 'text-orange-800', accent: 'bg-orange-500' },
      'jimin': { bg: 'from-yellow-100 to-amber-100', text: 'text-yellow-800', accent: 'bg-yellow-500' },
      'v': { bg: 'from-green-100 to-emerald-100', text: 'text-green-800', accent: 'bg-green-500' },
      'jungkook': { bg: 'from-violet-100 to-purple-100', text: 'text-violet-800', accent: 'bg-violet-500' }
    }
    return themes[memberSlug] || themes['rm']
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-4 sm:py-8">
      <PageHeader 
        title="BTS Bias Compatibility Test" 
        description="Discover which BTS member matches your personality! Take our enhanced test with detailed scoring and find your perfect compatibility match."
      />

      <div ref={testContainerRef} className="mt-6 sm:mt-8 bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-md">
        <AnimatePresence mode="wait">
          {state === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <p className="text-lg sm:text-xl font-semibold">Enhanced Compatibility Test</p>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-base sm:text-lg mb-4 max-w-2xl mx-auto">
                  Who's your current BTS bias? Select a member to begin our comprehensive 12-question test 
                  and discover your compatibility with other members through detailed personality analysis!
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
                  <span className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    12 Questions
                  </span>
                  <span className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Realistic Scoring
                  </span>
                  <span className="bg-pink-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Multiple Matches
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                {filteredMembers.map((member) => (
                  <motion.button
                    key={member.slug}
                    onClick={() => handleBiasSelect(member.slug)}
                    className="flex flex-col items-center p-3 sm:p-4 border-2 border-black rounded-xl hover:bg-bts-accent transition-all duration-200 group hover:scale-105 hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-black mb-2 relative group-hover:border-yellow-500 transition-colors">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                      />
                    </div>
                    <span className="font-semibold text-sm sm:text-base group-hover:text-black transition-colors">
                      {member.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {state === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center"
            >
              {/* Enhanced Progress Bar */}
              <div className="w-full mb-6 sm:mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="font-medium text-green-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <motion.h2 
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center black-han-sans"
              >
                {questions[currentQuestion].text}
              </motion.h2>
              
              <div className="w-full space-y-3 sm:space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionSelect(questions[currentQuestion].id, option.traits)}
                    className="w-full p-4 sm:p-5 border-2 border-black rounded-lg hover:bg-bts-accent transition-all duration-200 text-left flex justify-between items-center group hover:shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm sm:text-base pr-4">{option.text}</span>
                    <ArrowRight className="h-5 w-5 text-black group-hover:text-yellow-600 transition-colors flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {state === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* Main Results Card */}
              <div className={`bg-gradient-to-br ${getMemberTheme(results.primaryMatch.slug).bg} p-4 sm:p-6 rounded-xl border-2 border-black w-full mb-6 sm:mb-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-bold">{results.compatibilityScore}% Match</span>
                  </div>
                </div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-bold mb-6 text-center black-han-sans"
                >
                  🎉 Your Perfect Match! 🎉
                </motion.h2>
                
                <div className="text-center mb-6">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg mb-4"
                  >
                    Based on your personality, you're most compatible with:
                  </motion.p>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4"
                  >
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={results.primaryMatch.image}
                        alt={results.primaryMatch.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 144px"
                      />
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="text-3xl sm:text-4xl font-bold black-han-sans text-black mb-2">
                        {results.primaryMatch.name}
                      </span>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <span className="font-bold text-lg">Perfect Match!</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`${getMemberTheme(results.primaryMatch.slug).accent} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {results.compatibilityScore}% Compatible
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Personality Analysis */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border-2 border-black/10 mb-4"
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Personality Analysis
                  </h3>
                  <p className="mb-3 text-sm sm:text-base">{results.traitSummary}</p>
                  <p className="text-sm sm:text-base">{results.primaryMatch.personalityDescription}</p>
                </motion.div>
                
                {/* Why You Match */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border-2 border-black/10 mb-6"
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Why You Match
                  </h3>
                  <p className="text-sm sm:text-base">
                    {results.primaryMatch.compatibleWith.find(c => 
                      c.slug === primaryBias
                    )?.reason || `Your personality traits complement ${results.primaryMatch.name}'s unique characteristics, creating a harmonious connection based on your ${results.compatibilityScore}% compatibility score.`}
                  </p>
                </motion.div>
              </div>

              {/* Secondary & Tertiary Matches */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="w-full mb-6"
              >
                <h3 className="font-bold mb-4 text-center black-han-sans text-xl">Other Great Matches</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Secondary Match */}
                  <div className="bg-white border-2 border-black rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black">
                        <Image
                          src={results.secondaryMatch.image}
                          alt={results.secondaryMatch.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{results.secondaryMatch.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">
                            {results.allScores.find(s => s.member.slug === results.secondaryMatch.slug)?.percentage || 0}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {results.secondaryMatch.personalityDescription.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Tertiary Match */}
                  <div className="bg-white border-2 border-black rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black">
                        <Image
                          src={results.tertiaryMatch.image}
                          alt={results.tertiaryMatch.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{results.tertiaryMatch.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">
                            {results.allScores.find(s => s.member.slug === results.tertiaryMatch.slug)?.percentage || 0}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {results.tertiaryMatch.personalityDescription.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Detailed Scores Toggle */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="w-full mb-6"
              >
                <button
                  onClick={() => setShowDetailedScores(!showDetailedScores)}
                  className="w-full bg-gray-100 border-2 border-black rounded-lg p-3 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <TrendingUp className="w-5 h-5" />
                  {showDetailedScores ? 'Hide' : 'Show'} Detailed Compatibility Scores
                </button>
                
                <AnimatePresence>
                  {showDetailedScores && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 bg-white border-2 border-black rounded-lg p-4 overflow-hidden"
                    >
                      <h4 className="font-bold mb-3">All Compatibility Scores</h4>
                      <div className="space-y-3">
                        {results.allScores.map((score, index) => (
                          <div key={score.member.slug} className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black">
                                <Image
                                  src={score.member.image}
                                  alt={score.member.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <span className="font-medium min-w-0 flex-1">{score.member.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 rounded-full h-2 w-20 overflow-hidden">
                                <div 
                                  className={`h-full ${getMemberTheme(score.member.slug).accent} transition-all duration-1000`}
                                  style={{ width: `${score.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold min-w-12 text-right">{score.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 w-full"
              >
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 px-6 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 px-6 bg-bts-accent text-black border-2 border-black rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Results</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Preview Modal */}
      <AnimatePresence>
        {showSharePreview && results && (
          <SharePreview
            results={results}
            primaryBias={primaryBias || ""}
            onClose={() => setShowSharePreview(false)}
            primaryMember={filteredMembers.find(m => m.slug === primaryBias)}
          />
        )}
      </AnimatePresence>
    </div>
  )
} 
