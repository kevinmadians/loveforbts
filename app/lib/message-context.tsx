"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { saveMessage, getPaginatedMessages, searchMessages } from './supabase-service'
import type { SupabaseMessage } from './supabase'

// Message type definition
export type Message = {
  id: number
  message_id: string
  name: string
  country: string
  message: string
  date: string
  like_count: number
  is_featured: boolean
}

interface MessageContextType {
  messages: Message[]
  isLoading: boolean
  totalMessages: number
  addMessage: (name: string, country: string, message: string) => Promise<boolean>
  searchMessages: (query: string, page?: number, pageSize?: number) => Promise<{ data: Message[], total: number }>
  refreshMessages: (page?: number, pageSize?: number) => Promise<void>
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshTime, setLastRefreshTime] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalMessages, setTotalMessages] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalMessages / pageSize))

  // Convert Supabase message to our Message format
  const convertMessage = (dbMessage: SupabaseMessage): Message => {
    return {
      id: dbMessage.id,
      message_id: dbMessage.message_id,
      name: dbMessage.name,
      country: dbMessage.country,
      message: dbMessage.message,
      date: new Date(dbMessage.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
      like_count: dbMessage.like_count || 0,
      is_featured: dbMessage.is_featured || false
    }
  }

  // Refresh messages with pagination
  const refreshMessages = async (page: number = currentPage, size: number = pageSize) => {
    // Prevent multiple concurrent refreshes
    if (isRefreshing) {
      return;
    }

    // Prevent refreshing too frequently (at least 5 seconds between refreshes)
    const now = Date.now();
    if (now - lastRefreshTime < 5000 && messages.length > 0) {
      return;
    }

    setIsRefreshing(true);
    setLastRefreshTime(now);
    
    if (messages.length === 0) {
      setIsLoading(true);
    }

    try {
      const result = await getPaginatedMessages(page, size)
      // Only update messages if we got a valid array
      if (Array.isArray(result.data)) {
        setMessages(result.data.map(convertMessage))
        setTotalMessages(result.total)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      // Always set loading to false when done, even if there was an error
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Add a new message to Supabase
  const addMessage = useCallback(async (name: string, country: string, messageText: string): Promise<boolean> => {
    try {
      const savedMessage = await saveMessage(name, country, messageText)
      
      if (savedMessage) {
        // Refresh messages to show the newly added one
        await refreshMessages(1) // Go to the first page to see the new message
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to add message to Supabase:", error)
      return false
    }
  }, [])

  // Search messages with pagination
  const searchMessagesFn = async (query: string, page: number = 1, size: number = pageSize): Promise<{ data: Message[], total: number }> => {
    try {
      const result = await searchMessages(query, page, size)
      return {
        data: result.data.map(convertMessage),
        total: result.total
      }
    } catch (error) {
      console.error('Error searching messages:', error)
      return { data: [], total: 0 }
    }
  }

  // Effect to refresh messages when page changes
  useEffect(() => {
    refreshMessages(currentPage)
  }, [currentPage])

  // Load messages on component mount
  useEffect(() => {
    refreshMessages(1)
    
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Set up a periodic refresh every 5 minutes (reduced frequency)
    const intervalId = setInterval(() => {
      refreshMessages(currentPage)
    }, 5 * 60 * 1000)
    
    intervalRef.current = intervalId
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentPage]) // Add currentPage as dependency to prevent stale closure

  return (
    <MessageContext.Provider value={{ 
      messages, 
      isLoading, 
      totalMessages,
      addMessage, 
      searchMessages: searchMessagesFn,
      refreshMessages,
      currentPage,
      setCurrentPage,
      totalPages,
      pageSize
    }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider')
  }
  return context
} 
