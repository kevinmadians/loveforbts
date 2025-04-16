"use client";

import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import Image from "next/image";

// Custom toast configuration to make notifications appear centered
const showCenteredToast = (message: string, description: string) => {
  toast.success(message, {
    description,
    duration: 5000,
    position: "top-center",
    className: "fan-chant-toast",
    style: {
      padding: "16px",
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
      borderRadius: "16px",
      width: "400px",
      maxWidth: "90vw",
      fontSize: "16px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 999999
    }
  });
};

export function ClientFanChantButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              // Use the custom centered toast instead
              showCenteredToast(
                "BTS Fan Chant Playing! 💜", 
                "Kim Namjoon! Kim Seokjin! Min Yoongi! Jung Hoseok! Park Jimin! Kim Taehyung! Jeon Jungkook! BTS!"
              );
            })
            .catch(error => {
              console.error("Error playing audio:", error);
              toast.error("Failed to play fan chant. Please try again.");
            });
        }
      }
    } catch (error) {
      console.error("Error handling audio:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }, [isPlaying]);

  return (
    <button
      onClick={handlePlayFanChant}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg 
        bg-[#FFDE00] hover:bg-[#E5C700] text-black transition-all duration-300
        border-2 border-black
        transform hover:scale-110 active:scale-95"
      aria-label={isPlaying ? "Pause BTS fan chant" : "Play BTS fan chant"}
      title={isPlaying ? "Pause fan chant" : "Play BTS fan chant"}
    >
      {/* Use your custom SVG icon */}
      <div className="relative flex items-center justify-center">
        {/* Option 1: Image component with external SVG file */}
        {/* First, place your SVG file at public/icons/bts-icon.svg */}
        <div className={`w-10 h-10 ${isPlaying ? "animate-pulse" : ""}`}>
          <Image 
            src="/icons/bts-icon.svg" 
            alt="BTS Fan Chant" 
            width={36} 
            height={36} 
            className="w-full h-full"
          />
        </div>
        
        {/* Option 2: Paste your custom SVG code directly here
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="36" 
          height="36" 
          className={`w-10 h-10 ${isPlaying ? "animate-pulse" : ""}`}
        >
          <!-- Paste your SVG paths and elements here -->
          <!-- Example: -->
          <!-- <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="black" /> -->
        </svg>
        */}
      </div>
      
      {/* Ripple Animation when playing */}
      {isPlaying && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full rounded-full bg-[#FFDE00] opacity-50 animate-ping"></div>
        </div>
      )}
    </button>
  );
} 