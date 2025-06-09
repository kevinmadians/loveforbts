"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

// Message templates with variations for more engaging notifications
const storyNotificationTemplates = [
  "💜 {name} just shared their ARMY story!",
  "🎉 New ARMY story from {name}!",
  "✨ {name} wrote about their BTS journey!",
  "📝 {name} from {country} shared their story!",
  "💫 {name} just added to our ARMY stories collection!"
]

const messageNotificationTemplates = [
  "💌 {name} sent a message to BTS!",
  "✉️ New message from {name} in {country}!",
  "🌟 {name} shared their feelings with ARMY!",
  "💬 {name} just joined the conversation!",
  "🎤 {name} has something to say to BTS!"
]

// Helper function to get a random template
const getRandomTemplate = (templates: string[]) => {
  const randomIndex = Math.floor(Math.random() * templates.length)
  return templates[randomIndex]
}

// Helper function to format notification content
const formatNotification = (template: string, data: any) => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return data[key] || match
  })
}

// Create context
interface NotificationContextType {
  subscribeToNewContent: () => void
  unsubscribeFromNewContent: () => void
}

const NotificationContext = createContext<NotificationContextType>({
  subscribeToNewContent: () => {},
  unsubscribeFromNewContent: () => {}
})

// Hook for using the context
export const useNotifications = () => useContext(NotificationContext)

// Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [channels, setChannels] = useState<any[]>([])
  const pathname = usePathname()
  
  // Subscribe to new content notifications
  const subscribeToNewContent = () => {
    // Only set up subscriptions if they don't already exist
    if (channels.length > 0) return
    
    // Subscribe to new stories
    const storyChannel = supabase
      .channel('public:army_stories')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'army_stories' 
        }, 
        (payload) => {
          const { name, country, title } = payload.new
          
          // Don't show notification on the story creation page
          if (pathname === '/army-story/create') return
          
          const template = getRandomTemplate(storyNotificationTemplates)
          const message = formatNotification(template, { name, country })
          
          // Show toast notification
          toast.success(message, {
            duration: 4000,
            position: "bottom-right",
            action: {
              label: "View Story",
              onClick: () => {
                window.location.href = `/army-story/${payload.new.story_id}`
              }
            }
          })
        }
      )
      .subscribe()
    
    // Subscribe to new messages
    const messageChannel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages' 
        }, 
        (payload) => {
          const { name, country } = payload.new
          
          // Don't show notification on the messages page
          if (pathname === '/messages') return
          
          const template = getRandomTemplate(messageNotificationTemplates)
          const message = formatNotification(template, { name, country })
          
          // Show toast notification
          toast.success(message, {
            duration: 4000,
            position: "bottom-right",
            action: {
              label: "View Messages",
              onClick: () => {
                window.location.href = '/messages'
              }
            }
          })
        }
      )
      .subscribe()
      
    setChannels([storyChannel, messageChannel])
  }
  
  // Unsubscribe from all channels
  const unsubscribeFromNewContent = () => {
    channels.forEach(channel => {
      supabase.removeChannel(channel)
    })
    setChannels([])
  }
  
  // Auto-subscribe on mount and clean up on unmount
  useEffect(() => {
    subscribeToNewContent()
    
    return () => {
      unsubscribeFromNewContent()
    }
  }, [])
  
  // Monitor pathname changes to update notification behavior
  useEffect(() => {
    // Reconnect channels when pathname changes to ensure correct filtering
    if (channels.length > 0) {
      unsubscribeFromNewContent()
      subscribeToNewContent()
    }
  }, [pathname])
  
  return (
    <NotificationContext.Provider 
      value={{ 
        subscribeToNewContent,
        unsubscribeFromNewContent
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
} 
