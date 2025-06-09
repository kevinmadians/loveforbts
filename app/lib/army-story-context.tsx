"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { 
  getArmyStories, 
  saveArmyStory, 
  getArmyStoryById,
  searchArmyStories
} from './supabase-service'
import { type SupabaseArmyStory } from './supabase'
import { toast } from 'sonner'

// Context type definition
interface ArmyStoryContextType {
  stories: SupabaseArmyStory[]
  totalStories: number
  isLoading: boolean
  addStory: (name: string, country: string, bias: string, content: string, title?: string, army_since?: number) => Promise<SupabaseArmyStory | null>
  getStoryById: (id: string) => Promise<SupabaseArmyStory | null>
  searchStories: (query: string, page?: number, pageSize?: number) => Promise<{ data: SupabaseArmyStory[], total: number }>
  refreshStories: (page?: number, pageSize?: number) => Promise<void>
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
}

// Create context with default values
const ArmyStoryContext = createContext<ArmyStoryContextType>({
  stories: [],
  totalStories: 0,
  isLoading: false,
  addStory: async () => null,
  getStoryById: async () => null,
  searchStories: async () => ({ data: [], total: 0 }),
  refreshStories: async () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  pageSize: 10,
})

// Hook for using the context
export const useArmyStories = () => useContext(ArmyStoryContext)

// Provider component
export function ArmyStoryProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<SupabaseArmyStory[]>([])
  const [totalStories, setTotalStories] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshTime, setLastRefreshTime] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalStories / pageSize))

  // Fetch all stories with pagination
  const refreshStories = async (page: number = currentPage, size: number = pageSize) => {
    // Prevent multiple concurrent refreshes
    if (isRefreshing) {
      return;
    }

    // Prevent refreshing too frequently (at least 5 seconds between refreshes)
    const now = Date.now();
    if (now - lastRefreshTime < 5000 && stories.length > 0) {
      return;
    }

    setIsRefreshing(true);
    setLastRefreshTime(now);
    
    if (stories.length === 0) {
      setIsLoading(true);
    }

    try {
      const result = await getArmyStories(page, size)
      // Only update stories if we got a valid array
      if (Array.isArray(result.data)) {
        // Ensure each story has like_count and is_featured fields
        const storiesWithDefaults = result.data.map(story => ({
          ...story,
          like_count: story.like_count || 0,
          is_featured: story.is_featured || false
        }))
        setStories(storiesWithDefaults)
        setTotalStories(result.total)
      }
    } catch (error) {
      console.error('Error fetching ARMY stories:', error)
      toast.error('Failed to load ARMY stories. Please try again later.')
    } finally {
      // Always set loading to false when done, even if there was an error
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Add a new story
  const addStory = async (name: string, country: string, bias: string, content: string, title?: string, army_since?: number) => {
    try {
      const story = await saveArmyStory(name, country, bias, content, title, army_since)
      if (story) {
        // Refresh stories after adding a new one to get correct pagination
        await refreshStories(1) // Go to first page to show new story
        toast.success('Your ARMY story has been shared successfully!')
        return story
      } else {
        toast.error('Failed to share your story. Please try again.')
        return null
      }
    } catch (error) {
      console.error('Error adding ARMY story:', error)
      toast.error('An error occurred while sharing your story.')
      return null
    }
  }

  // Get a story by ID
  const getStoryById = async (id: string) => {
    try {
      return await getArmyStoryById(id)
    } catch (error) {
      console.error('Error fetching ARMY story:', error)
      toast.error('Failed to load the story. Please try again later.')
      return null
    }
  }

  // Search stories with pagination
  const searchStories = async (query: string, page: number = 1, size: number = pageSize) => {
    try {
      return await searchArmyStories(query, page, size)
    } catch (error) {
      console.error('Error searching ARMY stories:', error)
      toast.error('Failed to search stories. Please try again.')
      return { data: [], total: 0 }
    }
  }

  // Effect to refresh stories when page changes
  useEffect(() => {
    refreshStories(currentPage)
  }, [currentPage])

  // Load stories on component mount
  useEffect(() => {
    refreshStories(1)
    
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Set up a periodic refresh every 5 minutes (reduced frequency)
    const intervalId = setInterval(() => {
      refreshStories(currentPage)
    }, 5 * 60 * 1000)
    
    intervalRef.current = intervalId
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentPage]) // Add currentPage as dependency to prevent stale closure

  return (
    <ArmyStoryContext.Provider 
      value={{ 
        stories, 
        totalStories,
        isLoading, 
        addStory, 
        getStoryById, 
        searchStories, 
        refreshStories,
        currentPage,
        setCurrentPage,
        totalPages,
        pageSize
      }}
    >
      {children}
    </ArmyStoryContext.Provider>
  )
} 
