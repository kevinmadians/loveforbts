"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { saveMessage, getMessages, setupMessageCleanup } from './supabase-service'
import type { SupabaseMessage } from './supabase'

// Message type definition
export type Message = {
  id: number
  name: string
  country: string
  message: string
  date: string
}

interface MessageContextType {
  messages: Message[]
  isLoading: boolean
  addMessage: (name: string, country: string, message: string) => Promise<boolean>
  getLastAddedMessage: () => Message | null
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastAddedMessage, setLastAddedMessage] = useState<Message | null>(null)

  // Convert Supabase message to our Message format
  const convertMessage = (dbMessage: SupabaseMessage): Message => {
    return {
      id: dbMessage.id,
      name: dbMessage.name,
      country: dbMessage.country,
      message: dbMessage.message,
      date: new Date(dbMessage.created_at).toISOString().split('T')[0] // Format as YYYY-MM-DD
    }
  }

  // Load messages from Supabase on component mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true)
        const dbMessages = await getMessages()
        const formattedMessages = dbMessages.map(convertMessage)
        setMessages(formattedMessages)
      } catch (error) {
        console.error("Failed to load messages from Supabase:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
    
    // Set up message cleanup for expired messages
    if (typeof window !== 'undefined') {
      setupMessageCleanup()
    }
    
    // Set up periodic refresh of messages
    const refreshInterval = setInterval(() => {
      loadMessages()
    }, 60000) // Refresh every minute
    
    return () => clearInterval(refreshInterval)
  }, [])

  // Add a new message to Supabase
  const addMessage = useCallback(async (name: string, country: string, messageText: string): Promise<boolean> => {
    try {
      const savedMessage = await saveMessage(name, country, messageText)
      
      if (savedMessage) {
        const newMessage = convertMessage(savedMessage)
        setMessages(prevMessages => [newMessage, ...prevMessages])
        setLastAddedMessage(newMessage)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to add message to Supabase:", error)
      return false
    }
  }, [])

  // Get the last added message
  const getLastAddedMessage = useCallback(() => {
    return lastAddedMessage
  }, [lastAddedMessage])

  return (
    <MessageContext.Provider value={{ messages, isLoading, addMessage, getLastAddedMessage }}>
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