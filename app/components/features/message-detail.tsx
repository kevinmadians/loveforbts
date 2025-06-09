"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/app/lib/utils"
import { type Message } from "@/app/lib/message-context"
import { getCountryCode } from "@/app/lib/country-codes"
import { ArrowLeft, HeartHandshake, ArrowUp, ChevronUp } from "lucide-react"
import { MessageComments } from "./message-comments"
import { LoveButton } from "@/app/components/ui/love-button"
import { hasUserLikedMessage } from "@/app/lib/supabase-service"

interface MessageDetailProps {
  message: Message
}

export function MessageDetail({ message }: MessageDetailProps) {
  // State to track scroll position
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Like button state - let LoveButton manage its own state
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(message.like_count || 0)

  // Check if user has liked this message on mount
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const liked = await hasUserLikedMessage(message.message_id)
        setIsLiked(liked)
        console.log(`MessageDetail: Initial like status - Liked: ${liked}, Count: ${message.like_count || 0}`)
      } catch (error) {
        console.error('Error checking like status:', error)
      }
    }
    
    checkLikeStatus()
  }, [message.message_id])

  // Handle like button updates - update local state to keep in sync
  const handleLike = (newLikeCount: number, newIsLiked: boolean) => {
    console.log(`MessageDetail received update: Count: ${newLikeCount}, Liked: ${newIsLiked}`)
    // Update local state to keep components synchronized
    setLikeCount(newLikeCount)
    setIsLiked(newIsLiked)
  }

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show floating button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const countryCode = getCountryCode(message.country)
  const formattedDate = formatDate(message.date)
  
  return (
    <>
      {/* Header Section */}
      <div className="mb-8 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          ARMY Messages
        </h1>
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          This is a message shared by a fellow ARMY. These heartfelt notes reflect the love and support within our global BTS community. 💜
        </p>
        <Link
          href="/messages"
          className="inline-flex items-center px-6 py-2 rounded-full bg-purple-100 text-purple-800 font-bold black-han-sans text-lg mb-6 hover:bg-purple-200 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Messages
        </Link>
      </div>

      {/* Message Content */}
      <div className="bg-white rounded-2xl border-2 border-black p-4 md:p-6 shadow-md max-w-3xl mx-auto">
        {/* Message Sender */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl md:text-3xl font-bold black-han-sans">
            {message.name}
          </h2>
          
          {/* Love Button */}
          <LoveButton
            key={`love-button-${message.message_id}-${likeCount}-${isLiked}`}
            itemId={message.message_id}
            itemType="message"
            initialLikeCount={likeCount}
            initialIsLiked={isLiked}
            onLike={handleLike}
            size="lg"
            variant="default"
          />
        </div>
        
        {/* Message Content */}
        <div className="mb-6">
          <p className="text-gray-800 text-lg whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
        
        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
          {/* Country with flag */}
          <div className="flex items-center text-sm">
            <span className="mr-1">From: {message.country}</span>
            {countryCode && (
              <Image
                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                width={16}
                height={12}
                alt={message.country}
                className="inline-block"
              />
            )}
          </div>
          
          {/* Date */}
          <div className="text-sm text-gray-500">
            {formattedDate}
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <div className="flex justify-center my-8">
        <button
          onClick={scrollToTop}
                        className="inline-flex items-center gap-2 bg-black text-bts-accent px-5 py-3 rounded-lg hover:bg-purple-900 transition-colors black-han-sans border-2 border-bts-accent shadow-md transform hover:scale-105 active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={18} />
          <span>Back to Top</span>
        </button>
      </div>
      
      {/* Support CTA */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white p-3 rounded-full border-2 border-black">
            <HeartHandshake size={28} className="text-purple-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold mb-1 black-han-sans">
              Touched by this message?
            </h3>
            <p className="text-sm md:text-base">
              Your support helps us maintain this platform where ARMYs can share their love for BTS.
            </p>
          </div>
          <Link 
            href="/support" 
                          className="inline-flex items-center px-4 py-2 bg-bts-accent text-black border-2 border-black rounded-md hover:bg-navbar-hover transition-colors black-han-sans whitespace-nowrap"
          >
            Support Us 💜
          </Link>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="max-w-3xl mx-auto">
        <MessageComments messageId={message.id} />
      </div>

      {/* Floating Back to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full 
            bg-black hover:bg-purple-900 text-bts-accent shadow-lg transition-all duration-300
            border-2 border-bts-accent transform hover:scale-110 active:scale-95"
          aria-label="Scroll back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
} 
