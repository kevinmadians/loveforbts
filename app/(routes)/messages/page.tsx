"use client"

import React, { useState, useCallback } from "react"
import { CommentForm } from "@/app/components/features/comment-form"
import { MessageSearch } from "@/app/components/features/message-search"
import Image from "next/image"
import { getCountryCode } from "@/app/lib/country-codes"
import { useMessages } from "@/app/lib/message-context"

export default function MessagesPage() {
  const { messages, isLoading } = useMessages()
  const [filter, setFilter] = useState("")

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(filter.toLowerCase()) || 
    message.country.toLowerCase().includes(filter.toLowerCase()) ||
    message.message.toLowerCase().includes(filter.toLowerCase())
  )

  // Handle search query changes
  const handleSearch = useCallback((query: string) => {
    setFilter(query)
  }, [])

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black text-center black-han-sans">
        ARMY Messages
      </h1>
      
      <div className="flex flex-col gap-8 mb-12">
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-4">
            <div className="mb-4">
              <MessageSearch onSearch={handleSearch} />
            </div>
            
            <div 
              className="space-y-4 overflow-y-auto" 
              style={{ maxHeight: '400px', scrollbarWidth: 'thin' }}
            >
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="mt-2">Loading messages...</p>
                </div>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map(message => (
                  <div key={message.id} className="border-2 border-black p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold black-han-sans">{message.name}</span>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                    <div className="text-sm mb-2 italic flex items-center gap-1">
                      from
                      {message.country && (
                        <span className="inline-flex items-center">
                          <Image
                            src={`https://flagcdn.com/w40/${getCountryCode(message.country).toLowerCase()}.png`}
                            alt={`Flag of ${message.country}`}
                            width={20}
                            height={14}
                            className="mr-1"
                          />
                          {message.country}
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p>{filter ? "No messages found matching your search." : "No messages yet. Be the first to leave a message!"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <CommentForm />
        </div>
      </div>
    </div>
  )
} 