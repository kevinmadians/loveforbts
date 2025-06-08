"use client"

import React, { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { toast } from "sonner"

interface LoveButtonProps {
  itemId: string
  itemType: "message" | "story"
  initialLikeCount?: number
  initialIsLiked?: boolean
  onLike?: (likeCount: number, isLiked: boolean) => void
  className?: string
  showCount?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal"
}

export function LoveButton({
  itemId,
  itemType,
  initialLikeCount = 0,
  initialIsLiked = false,
  onLike,
  className = "",
  showCount = true,
  size = "md",
  variant = "default"
}: LoveButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Update state when props change - with more robust checking
  useEffect(() => {
    console.log(`LoveButton: Props changed - Count: ${initialLikeCount}, Liked: ${initialIsLiked}`)
    setLikeCount(initialLikeCount)
    setIsLiked(initialIsLiked)
  }, [initialLikeCount, initialIsLiked])

  // Force update function for immediate sync
  const updateState = (newCount: number, newIsLiked: boolean) => {
    console.log(`LoveButton: Forcing state update - Count: ${newCount}, Liked: ${newIsLiked}`)
    setLikeCount(newCount)
    setIsLiked(newIsLiked)
  }

  // Dynamic import for client-side only functions
  const handleLike = async () => {
    if (isLoading) return

    console.log(`LoveButton: Starting like operation for ${itemType} ${itemId}`)
    console.log(`LoveButton: Current state - Count: ${likeCount}, Liked: ${isLiked}`)

    setIsLoading(true)
    setIsAnimating(true)

    // NO optimistic updates - wait for API response first
    console.log(`LoveButton: Making API call without optimistic update`)

    try {
      // Dynamic import to ensure it's only used on client-side
      const { likeMessage, likeStory } = await import("@/app/lib/supabase-service")
      
      const result = itemType === "message" 
        ? await likeMessage(itemId)
        : await likeStory(itemId)

      console.log(`LoveButton: API result for ${itemType} ${itemId}:`, result)

      if (result.success) {
        const newLikeCount = result.likeCount
        const newIsLiked = result.isLiked
        
        console.log(`Love button API success: ${itemType} ${itemId} - Count: ${newLikeCount}, Liked: ${newIsLiked}`)
        
        // Update with server response (this might be different from optimistic)
        updateState(newLikeCount, newIsLiked)
        
        // Call callback to update parent
        if (onLike) {
          console.log(`Calling parent callback with Count: ${newLikeCount}, Liked: ${newIsLiked}`)
          onLike(newLikeCount, newIsLiked)
        }

        // Show encouraging message occasionally
        if (newIsLiked && Math.random() < 0.3) {
          const messages = [
            "💜 Thank you for the love!",
            "💜 Your support means everything!",
            "💜 Borahae! 보라해!",
            "💜 Spreading the love!",
            "💜 Purple hearts for BTS!"
          ]
          const randomMessage = messages[Math.floor(Math.random() * messages.length)]
          toast.success(randomMessage, {
            duration: 2000,
            position: "bottom-center"
          })
        }
      } else {
        console.log(`LoveButton: API failed for ${itemType} ${itemId}`, result)
        toast.error("Something went wrong. Please try again.", {
          duration: 2000
        })
      }
    } catch (error) {
      console.error("Error handling like:", error)
      toast.error("Something went wrong. Please try again.", {
        duration: 2000
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  // Size classes
  const sizeClasses = {
    sm: {
      button: "p-1.5",
      icon: "w-4 h-4",
      text: "text-xs"
    },
    md: {
      button: "p-2",
      icon: "w-5 h-5", 
      text: "text-sm"
    },
    lg: {
      button: "p-3",
      icon: "w-6 h-6",
      text: "text-base"
    }
  }

  const currentSize = sizeClasses[size]

  // Variant styles
  const variantClasses = {
    default: "bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50/80 shadow-sm hover:shadow-md",
    minimal: "bg-transparent hover:bg-purple-50/50"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 transform",
          "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          currentSize.button,
          isAnimating && "scale-110",
          isLiked && "bg-purple-100 border-purple-400"
        )}
        aria-label={isLiked ? `Unlike this ${itemType}` : `Like this ${itemType}`}
        title={isLiked ? `Remove your love` : `Show some love 💜`}
      >
        <Heart
          className={cn(
            "transition-all duration-300",
            currentSize.icon,
            isLiked ? "fill-purple-600 text-purple-600" : "text-purple-400 hover:text-purple-600",
            isAnimating && "animate-pulse"
          )}
        />
      </button>
      
      {showCount && (
        <span 
          className={cn(
            "font-medium text-purple-700 transition-colors duration-300",
            currentSize.text,
            likeCount > 0 ? "opacity-100" : "opacity-60"
          )}
          title={`${likeCount} ${likeCount === 1 ? 'person loves' : 'people love'} this ${itemType}`}
        >
          {likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
        </span>
      )}
    </div>
  )
} 