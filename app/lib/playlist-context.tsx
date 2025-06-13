"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/app/lib/supabase'
import { BTSSong } from '@/app/data/bts-songs'

export interface Playlist {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string | null
  creator_name: string
  songs: BTSSong[]
  like_count: number
  is_featured: boolean
}

interface PlaylistContextType {
  playlists: Playlist[]
  totalPlaylists: number
  isLoading: boolean
  createPlaylist: (name: string, description: string, creatorName: string, songs: BTSSong[]) => Promise<boolean>
  refreshPlaylists: (page?: number, pageSize?: number) => Promise<void>
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)

export function usePlaylist() {
  const context = useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [totalPlaylists, setTotalPlaylists] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshTime, setLastRefreshTime] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalPlaylists / pageSize))

  // Fetch all playlists with pagination
  const refreshPlaylists = async (page: number = currentPage, size: number = pageSize) => {
    // Prevent multiple concurrent refreshes
    if (isRefreshing) {
      return
    }

    // Prevent refreshing too frequently (at least 5 seconds between refreshes)
    const now = Date.now()
    if (now - lastRefreshTime < 5000 && playlists.length > 0) {
      return
    }

    setIsRefreshing(true)
    setLastRefreshTime(now)
    
    if (playlists.length === 0) {
      setIsLoading(true)
    }

    try {
      // Calculate offset for pagination
      const from = (page - 1) * size
      const to = from + size - 1

      // Get total count first
      const { count, error: countError } = await supabase
        .from('playlists')
        .select('*', { count: 'exact', head: true })

      if (countError) {
        throw countError
      }

      // Get paginated data
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        throw error
      }

      setPlaylists(data || [])
      setTotalPlaylists(count || 0)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching playlists:', error)
      if (typeof error === 'object' && error !== null && Object.keys(error).length === 0) {
        toast.error('Database tables may not exist. Please run the SQL schema first.')
      } else {
        toast.error('Failed to load playlists')
      }
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Create a new playlist
  const createPlaylist = async (name: string, description: string, creatorName: string, songs: BTSSong[]): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('playlists')
        .insert([
          {
            name,
            description: description || null,
            creator_name: creatorName,
            songs: JSON.stringify(songs),
            like_count: 0,
            is_featured: false
          }
        ])

      if (error) {
        throw error
      }

      toast.success('Playlist created successfully!')
      await refreshPlaylists() // Refresh to show the new playlist
      return true
    } catch (error) {
      console.error('Error creating playlist:', error)
      if (typeof error === 'object' && error !== null && Object.keys(error).length === 0) {
        toast.error('Database tables may not exist. Please run the SQL schema first.')
      } else {
        toast.error('Failed to create playlist')
      }
      return false
    }
  }



  // Load playlists on mount
  useEffect(() => {
    refreshPlaylists()
  }, [])

  const value: PlaylistContextType = {
    playlists,
    totalPlaylists,
    isLoading,
    createPlaylist,
    refreshPlaylists,
    currentPage,
    setCurrentPage: (page: number) => {
      setCurrentPage(page)
      refreshPlaylists(page)
    },
    totalPages,
    pageSize
  }

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

 