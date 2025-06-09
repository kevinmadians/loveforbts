"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";

export function ClientFanChantButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Automatically hide notification after duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 9000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showNotification]);

  const handlePlayFanChant = useCallback(() => {
    try {
      // Create audio if it doesn't exist yet
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/bts-fan-chant.mp3');
        
        // Add event listeners
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        
        audioRef.current.addEventListener("error", () => {
          setIsPlaying(false);
          toast.error("Failed to play fan chant. Please try again.");
        });
      }
      
      // Toggle audio playback
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setShowNotification(false);
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              // Show custom notification
              setShowNotification(true);
            })
            .catch(error => {
              // Log error in development, just show user-friendly message in production
              if (process.env.NODE_ENV === 'development') {
                // Using a type assertion to avoid TS errors
                const err = error as Error;
                console.error(`Failed to play fan chant: ${err.message}`);
              }
              toast.error("Failed to play fan chant. Please try again.");
            });
        }
      }
    } catch (error) {
      // Log error in development, just show user-friendly message in production
      if (process.env.NODE_ENV === 'development') {
        // Using a type assertion to avoid TS errors
        const err = error as Error;
        console.error(`Something went wrong: ${err.message}`);
      }
      toast.error("Something went wrong. Please try again.");
    }
  }, [isPlaying]);

  return (
    <>
      {/* Custom notification that's always centered */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-[99999]" style={{ pointerEvents: 'none' }}>
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg max-w-md w-full mx-4" style={{ pointerEvents: 'auto' }}>
            <div className="flex items-center mb-2">
              <div className="rounded-full p-1 mr-2" style={{ backgroundColor: 'var(--bts-accent)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-black">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-bold text-lg black-han-sans">BTS Fan Chant Playing! 💜</h3>
            </div>
            <p className="text-center font-medium">Kim Namjoon! Kim Seokjin! Min Yoongi! Jung Hoseok! Park Jimin! Kim Taehyung! Jeon Jungkook! BTS!</p>
          </div>
        </div>
      )}
      
      {/* Fan chant button */}
      <button
        onClick={handlePlayFanChant}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
          transition-all duration-300 border-2 border-black transform hover:scale-110 active:scale-95"
        style={{ 
          backgroundColor: 'var(--bts-accent)', 
          color: 'var(--navbar-text)' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'brightness(0.9)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'brightness(1)'
        }}
        aria-label={isPlaying ? "Pause BTS fan chant" : "Play BTS fan chant"}
        title={isPlaying ? "Pause fan chant" : "Play BTS fan chant"}
      >
        {/* Use your custom SVG icon */}
        <div className="relative flex items-center justify-center">
          <div className={`w-10 h-10 ${isPlaying ? "animate-pulse" : ""}`}>
            <Image 
              src="/icons/bts-icon.svg" 
              alt="BTS Fan Chant" 
              width={36} 
              height={36} 
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Ripple Animation when playing */}
        {isPlaying && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="w-full h-full rounded-full opacity-50 animate-ping" style={{ backgroundColor: 'var(--bts-accent)' }}></div>
          </div>
        )}
      </button>
    </>
  );
} 
