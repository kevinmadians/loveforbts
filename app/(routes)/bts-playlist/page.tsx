"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Music } from 'lucide-react'
import { usePlaylist } from '@/app/lib/playlist-context'
import { CTAContainer } from '@/app/components/ui/cta-container'
import { PageCTA } from '@/app/components/ui/page-cta'
import { PlaylistList } from '@/app/components/features/playlist-list'
import { PlaylistSearch } from '@/app/components/features/playlist-search'
import { Pagination } from '@/app/components/ui/pagination'
import { Heart, MessageCircle, Book } from 'lucide-react'
import { type Playlist } from '@/app/lib/playlist-context'

export default function PlaylistPage() {
  const { 
    playlists, 
    isLoading, 
    refreshPlaylists,
    totalPlaylists, 
    currentPage, 
    setCurrentPage, 
    totalPages,
    searchPlaylists
  } = usePlaylist()

  const [searchResults, setSearchResults] = useState<{ 
    data: Playlist[], 
    total: number
  } | null>(null)
  
  const [searchPage, setSearchPage] = useState(1)
  const [localLoading, setLocalLoading] = useState(true)
  
  // Calculate search total pages
  const searchTotalPages = searchResults ? 
    Math.max(1, Math.ceil(searchResults.total / 10)) : 1;
  
  // Handle initial loading
  useEffect(() => {
    // On mount, show local loading state
    setLocalLoading(true)
    
    // If playlists is not empty, we don't need to show loading
    if (playlists && playlists.length > 0) {
      setLocalLoading(false)
      return
    }
    
    // Otherwise, fetch playlists
    const loadData = async () => {
      await refreshPlaylists(1)
      setLocalLoading(false)
    }
    
    loadData()
  }, [refreshPlaylists, playlists])
  
  // Handle search results
  const handleSearch = useCallback((results: { data: Playlist[], total: number } | null) => {
    setSearchResults(results)
    setSearchPage(1) // Reset to first page when new search is performed
  }, [])
  
  // Handle search pagination
  const handleSearchPageChange = useCallback(async (page: number) => {
    if (!searchResults) return;
    
    setLocalLoading(true);
    try {
      // Get the current search query from the input field
      const searchInput = document.getElementById('playlist-search') as HTMLInputElement;
      const query = searchInput?.value || '';
      
      if (query.trim()) {
        const results = await searchPlaylists(query, page);
        setSearchResults(results);
        setSearchPage(page);
      }
    } catch (error) {
      console.error('Error changing search page:', error);
    } finally {
      setLocalLoading(false);
    }
  }, [searchResults, searchPlaylists]);
  
  // Handle normal pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [setCurrentPage]);
  
  // Display playlists - search results or all playlists
  const displayPlaylists = searchResults ? searchResults.data : playlists
  const isSearchMode = searchResults !== null
  const showLoading = isLoading && localLoading

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section - Match army-story style */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          BTS ARMY Playlists
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Create and share your favorite BTS playlists with the ARMY community. 
          Discover new songs and connect with fellow fans through music!
        </p>
      </div>
      
      {/* Search and Create Section - Match army-story style */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <PlaylistSearch onSearch={handleSearch} className="w-full md:max-w-md" />
        
        <Link 
          href="/bts-playlist/create" 
          className="flex items-center justify-center px-5 py-3 bg-bts-accent text-black border-2 border-black rounded-lg transition-colors hover:bg-navbar-hover black-han-sans mx-auto md:mx-0 min-w-[200px] shadow-md"
        >
          <Music size={18} className="mr-2" />
          <span>Create Your Playlist</span>
        </Link>
      </div>
      
      {/* Search Results Indicator */}
      {isSearchMode && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              {searchResults.data.length === 0 
                ? "No playlists found" 
                : `Found ${searchResults.total} playlist${searchResults.total === 1 ? '' : 's'}`}
            </p>
            <button 
              onClick={() => setSearchResults(null)} 
              className="text-sm font-medium hover:text-purple-700"
            >
              Clear search
            </button>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {showLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2">Loading playlists...</p>
        </div>
      )}
      
      {/* Empty State */}
      {!showLoading && displayPlaylists.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-2 black-han-sans">
            {isSearchMode ? "No playlists found" : "Be the first to create a playlist!"}
          </h2>
          <p className="mb-6 text-gray-600">
            {isSearchMode 
              ? "Try different search terms or browse all playlists."
              : "Share your favorite BTS songs and create the perfect playlist for fellow ARMY."}
          </p>
          
          {!isSearchMode && (
            <Link 
              href="/bts-playlist/create" 
              className="inline-flex items-center px-5 py-3 bg-black text-bts-accent rounded-lg transition-colors hover:bg-purple-900 black-han-sans"
            >
              <Music size={18} className="mr-2" />
              <span>Create Your Playlist</span>
            </Link>
          )}
        </div>
      )}
      
      {/* Playlists Grid */}
      {!showLoading && displayPlaylists.length > 0 && (
        <>
          <PlaylistList
            playlists={displayPlaylists}
            onLike={() => {}} // Love button functionality removed as requested
            onUnlike={() => {}}
          />
          
          {/* Pagination */}
          <div className="mt-8">
            {isSearchMode ? (
              <Pagination
                currentPage={searchPage}
                totalPages={searchTotalPages}
                onPageChange={handleSearchPageChange}
              />
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            
            {/* Playlist Count */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Showing {displayPlaylists.length} of {isSearchMode ? searchResults.total : totalPlaylists} playlists
            </p>
          </div>
        </>
      )}

      {/* Cross-promotion CTAs - Match army-story style */}
      <CTAContainer title="Explore More" className="mt-16 border-t-2 border-gray-100 pt-12">
        <PageCTA
          title="ARMY Card Maker"
          description="Create beautiful BTS-themed cards with your favorite photos and messages."
          href="/army-card"
          icon={Heart}
          color="purple"
        />
        <PageCTA
          title="Share Your Story"
          description="Tell your unique BTS journey and connect with fellow ARMY worldwide."
          href="/army-story"
          icon={MessageCircle}
          color="blue"
        />
        <PageCTA
          title="Message Board"
          description="Leave messages for BTS and read heartfelt notes from ARMY around the globe."
          href="/messages"
          icon={Book}
          color="green"
        />
      </CTAContainer>
    </div>
  )
} 