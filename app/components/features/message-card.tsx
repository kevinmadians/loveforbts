"use client"

import React from "react"
import Image from "next/image"
import { getCountryCode } from "@/app/lib/country-codes"
import { type Message } from "@/app/lib/message-context"
import { truncateText } from "@/app/lib/utils"

interface MessageCardProps {
  message: Message
  isHighlighted?: boolean
  className?: string
}

export function MessageCard({ message, isHighlighted = false, className = "" }: MessageCardProps) {
  // Guard clause for invalid message data
  if (!message || typeof message !== 'object') {
    return null;
  }
  
  const countryCode = message.country ? getCountryCode(message.country) : null;
  
  return (
    <div 
      className={`
        bg-white border-2 border-black rounded-xl overflow-hidden transition-all
        ${isHighlighted 
          ? "transform-gpu md:scale-105 shadow-md"
          : "hover:-translate-y-1 hover:shadow-lg"
        }
        ${className}
      `}
    >
      <div className="p-4 md:p-5">
        {/* Message Sender */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-xl black-han-sans">
            {message.name}
          </h3>
          
          {isHighlighted && (
            <div className="hidden md:block px-2 py-1 bg-yellow-200 text-xs font-bold text-black rounded-full">
              Featured Message
            </div>
          )}
        </div>
        
        {/* Message Content */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm md:text-base">
            {truncateText(message.message, isHighlighted ? 150 : 100)}
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-3 flex flex-wrap items-center justify-between pt-3 border-t border-gray-200">
          {/* Country with flag */}
          <div className="flex items-center text-sm">
            <span className="mr-1">From: {message.country}</span>
            {countryCode && (
              <Image
                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                width={16}
                height={12}
                alt={message.country || ''}
                className="inline-block"
              />
            )}
          </div>
          
          {/* Date */}
          <div className="text-xs text-gray-500">
            {message.date}
          </div>
        </div>
      </div>
    </div>
  )
} 