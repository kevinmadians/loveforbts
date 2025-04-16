"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"

export function FanChantButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Initialize audio element on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/audio/bts-fanchant.mp3')
      
      // Add event listener for when audio ends
      const audio = audioRef.current
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
      })
      
      return () => {
        audio.pause()
        audio.removeEventListener('ended', () => {
          setIsPlaying(false)
        })
      }
    }
  }, [])
  
  // Handle button click
  const handleClick = useCallback(() => {
    if (!audioRef.current) return
    
    // If already playing, pause it
    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      return
    }
    
    // Start playing the fan chant
    audioRef.current.play()
    setIsPlaying(true)
    setShowAnimation(true)
    
    // Generate random messages for notifications
    const messages = [
      "You're an amazing ARMY! 💜",
      "BTS! BTS! Fighting! 💜",
      "Kim Namjoon! Kim Seokjin! Min Yoongi! Jung Hoseok! Park Jimin! Kim Taehyung! Jeon Jungkook! BTS! 💜",
      "I purple you! Borahae! 💜",
      "방탄소년단 화이팅! (BTS Fighting!) 💜"
    ]
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    // Show notification with improved styling
    toast.custom((id) => (
      <div className="bg-white rounded-lg border-2 border-black p-4 shadow-lg">
        <p className="black-han-sans text-xl mb-1">BTS ARMY CHANT!</p>
        <p className="mb-1 text-sm">{randomMessage}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Keep supporting BTS!</span>
          <span className="text-purple-600">💜</span>
        </div>
      </div>
    ), {
      duration: 4000,
      position: "bottom-center"
    })
    
    // Hide animation after a delay
    setTimeout(() => {
      setShowAnimation(false)
    }, 1000)
  }, [isPlaying])
  
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        className={`fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full border-2 border-black flex items-center justify-center transition-all duration-300 shadow-lg ${
          isPlaying 
            ? "bg-purple-600" 
            : "bg-white hover:bg-purple-100"
        }`}
        aria-label={isPlaying ? "Stop BTS fan chant" : "Play BTS fan chant"}
        title="BTS Fan Chant"
      >
        {/* Microphone SVG Icon - Custom SVG placeholder, to be replaced with your own */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isPlaying ? "white" : "black"}
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={showAnimation ? "animate-bounce" : ""}
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </button>
      
      {/* Ripple Animation when playing */}
      {isPlaying && (
        <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-purple-600 opacity-50 animate-ping"></div>
        </div>
      )}
    </>
  )
}