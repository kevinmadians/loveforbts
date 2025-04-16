"use client";

import { useRef, useState, useCallback } from "react";
import { Headphones } from "lucide-react";
import { toast } from "sonner";

export default function FanChantButton() {
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
              toast.success("BTS fan chant playing! 💜", {
                description: "Kim Namjoon! Kim Seokjin! Min Yoongi! Jung Hoseok! Park Jimin! Kim Taehyung! Jeon Jungkook! BTS!",
                duration: 5000,
              });
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
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg 
        bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300
        border-2 border-black
        transform hover:scale-110 active:scale-95"
      aria-label={isPlaying ? "Pause BTS fan chant" : "Play BTS fan chant"}
      title={isPlaying ? "Pause fan chant" : "Play BTS fan chant"}
    >
      <Headphones className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
    </button>
  );
} 