"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Copy, Share2, RefreshCw, Twitter, Facebook, Instagram, Heart } from "lucide-react"
import { BTSQuote, getQuoteOfTheDay, getRandomQuote } from "@/app/lib/quotes-data"
import { toast } from "sonner"

// Map of members to their representative colors
const memberColors: Record<string, string> = {
  "RM": "#7AD0D4", // Blue/Turquoise
  "Jin": "#F6909E", // Pink
  "Suga": "#B9D1AE", // Mint
  "J-Hope": "#F38D1B", // Orange
  "Jimin": "#FDCF49", // Yellow
  "V": "#7854A4", // Purple
  "Jungkook": "#FB0C01", // Red
  // Default color for group quotes
  "default": "#FFDE00" // BTS yellow
}

export function DailyQuote() {
  const [quote, setQuote] = useState<BTSQuote | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  
  // Get the quote of the day or from local storage
  useEffect(() => {
    // Check if we already stored today's quote
    const storedQuote = localStorage.getItem('dailyBTSQuote')
    const storedDate = localStorage.getItem('dailyBTSQuoteDate')
    const today = new Date().toDateString()
    
    // If we have a stored quote from today, use it
    if (storedQuote && storedDate === today) {
      setQuote(JSON.parse(storedQuote))
    } else {
      // Otherwise get a new quote for today
      const newQuote = getQuoteOfTheDay()
      setQuote(newQuote)
      
      // Store in localStorage
      localStorage.setItem('dailyBTSQuote', JSON.stringify(newQuote))
      localStorage.setItem('dailyBTSQuoteDate', today)
    }
  }, [])
  
  // Get a new random quote
  const handleRefreshQuote = () => {
    setIsAnimating(true)
    setShowHearts(true)
    
    // Remove hearts after animation completes
    setTimeout(() => {
      setShowHearts(false)
    }, 1000)
    
    setTimeout(() => {
      const newQuote = getRandomQuote()
      setQuote(newQuote)
      setIsAnimating(false)
    }, 400)
  }
  
  // Copy quote to clipboard
  const handleCopyQuote = () => {
    if (!quote) return
    
    const textToCopy = `"${quote.text}" ${quote.member ? `- ${quote.member}` : ''} (${quote.source}, ${quote.year || ''})
#BTS #방탄소년단 #LoveForBTS`
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Quote copied to clipboard!", {
        description: "You can now paste it anywhere.",
      })
    }).catch(err => {
      toast.error("Failed to copy quote", {
        description: "Please try again.",
      })
      console.error('Could not copy text: ', err)
    })
  }
  
  // Prepare share text
  const getShareText = () => {
    if (!quote) return ""
    return encodeURIComponent(`"${quote.text}" ${quote.member ? `- ${quote.member}` : ''} (${quote.source}, ${quote.year || ''})
#BTS #방탄소년단 #LoveForBTS`)
  }
  
  // Get background color based on member
  const getQuoteColor = () => {
    if (!quote || !quote.member) return memberColors.default
    return memberColors[quote.member] || memberColors.default
  }
  
  if (!quote) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-black rounded-2xl bg-white">
        <div className="animate-pulse">Loading your daily BTS inspiration...</div>
      </div>
    )
  }
  
  return (
    <div className="w-full overflow-hidden">
      {/* Main Quote Container */}
      <div 
        className="relative p-6 mb-2 border-2 border-black rounded-2xl overflow-hidden transition-all duration-300"
        style={{ 
          backgroundColor: 'white',
          boxShadow: `0 4px 0 0 ${getQuoteColor()}`
        }}
      >
        {/* Background design elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          {quote.member && (
            <Image 
              src={`/images/members/${quote.member.toLowerCase()}/profile.jpg`} 
              alt={quote.member} 
              width={128} 
              height={128}
              className="rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/bts-logo.png';
              }}
            />
          )}
        </div>
        
        {/* Category badge */}
        <div 
          className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full"
          style={{ 
            backgroundColor: getQuoteColor(),
            color: ['#FB0C01', '#F38D1B'].includes(getQuoteColor()) ? 'white' : 'black'
          }}
        >
          {quote.category === 'lyric' ? '🎵 Lyrics' : 
           quote.category === 'interview' ? '🎤 Interview' : '💬 Speech'}
        </div>
        
        {/* Floating heart animation */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <Heart
                key={i}
                size={i % 3 === 0 ? 24 : i % 3 === 1 ? 16 : 20}
                className="absolute text-purple-500 animate-float-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random() * 1}s`,
                  opacity: 0.7 + Math.random() * 0.3
                }}
                fill="#7854A4"
              />
            ))}
          </div>
        )}
        
        {/* Quote content */}
        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <blockquote className="mb-4 text-xl md:text-2xl font-medium">
            "{quote.text}"
          </blockquote>
          
          <div className="flex justify-between items-end">
            <div>
              <cite className="block font-bold not-italic">
                {quote.member ? `- ${quote.member}` : '- BTS'}
              </cite>
              <span className="text-sm text-gray-600">
                {quote.source} {quote.year ? `(${quote.year})` : ''}
              </span>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={handleCopyQuote}
                className="p-2 text-black bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Copy quote"
              >
                <Copy size={18} />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="p-2 text-black bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Share quote"
                  aria-expanded={shareMenuOpen}
                >
                  <Share2 size={18} />
                </button>
                
                {/* Share dropdown menu */}
                {shareMenuOpen && (
                  <div className="absolute right-0 bottom-12 bg-white border-2 border-black rounded-lg p-2 shadow-lg z-10">
                    <div className="flex flex-col space-y-2">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${getShareText()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Twitter size={18} />
                        <span>Twitter</span>
                      </a>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${getShareText()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                      <button
                        onClick={() => {
                          // For Instagram, we just copy the text since direct sharing isn't supported
                          navigator.clipboard.writeText(decodeURIComponent(getShareText()))
                          toast.success("Caption copied for Instagram!", {
                            description: "Paste this as your Instagram caption with a screenshot.",
                          })
                          setShareMenuOpen(false)
                        }}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Instagram size={18} />
                        <span>Copy for Instagram</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleRefreshQuote}
                className={`p-2 text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-all transform hover:scale-110 hover:shadow-md group ${isAnimating ? 'animate-spin' : ''}`}
                aria-label="Get a new quote"
                disabled={isAnimating}
              >
                <RefreshCw size={18} className="group-hover:hidden" />
                <Heart size={18} fill="#ffffff" className="hidden group-hover:block" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information text */}
      <p className="text-sm text-center text-gray-600">
        A new quote appears every day. Click the <span className="text-purple-500">purple button</span> to see a different quote.
      </p>
    </div>
  )
} 