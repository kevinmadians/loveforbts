"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { StoryCard } from '@/app/components/features/story-card'
import { StorySearch } from '@/app/components/features/story-search'
import { useArmyStories } from '@/app/lib/army-story-context'
import { PenSquare, MessageCircle, IdCard, HeartHandshake } from 'lucide-react'
import { type SupabaseArmyStory } from '@/app/lib/supabase'
import { Pagination } from '@/app/components/ui/pagination'
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"

export default function ArmyStoryPage() {
  const { 
    stories, 
    isLoading, 
    refreshStories, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    totalStories, 
    searchStories
  } = useArmyStories()
  
  const [searchResults, setSearchResults] = useState<{ 
    data: SupabaseArmyStory[], 
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
    
    // If stories is not empty, we don't need to show loading
    if (stories && stories.length > 0) {
      setLocalLoading(false)
      return
    }
    
    // Otherwise, fetch stories
    const loadData = async () => {
      await refreshStories(1)
      setLocalLoading(false)
    }
    
    loadData()
  }, [refreshStories, stories])
  
  // Handle search results
  const handleSearch = useCallback((results: { data: SupabaseArmyStory[], total: number } | null) => {
    setSearchResults(results)
    setSearchPage(1) // Reset to first page when new search is performed
  }, [])
  
  // Handle search pagination
  const handleSearchPageChange = useCallback(async (page: number) => {
    if (!searchResults) return;
    
    setLocalLoading(true);
    try {
      // Get the current search query from the input field
      const searchInput = document.getElementById('search') as HTMLInputElement;
      const query = searchInput?.value || '';
      
      if (query.trim()) {
        const results = await searchStories(query, page);
        setSearchResults(results);
        setSearchPage(page);
      }
    } catch (error) {
      console.error('Error changing search page:', error);
    } finally {
      setLocalLoading(false);
    }
  }, [searchResults, searchStories]);
  
  // Handle normal pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [setCurrentPage]);
  
  // Display stories - search results or all stories
  const displayStories = searchResults ? searchResults.data : stories
  const isSearchMode = searchResults !== null
  const showLoading = isLoading && localLoading
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          ARMY Stories
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Share your journey as an ARMY and read heartwarming stories from fellow fans around the world. 
          Every ARMY has a unique story - what's yours?
        </p>
      </div>
      
      {/* Submit Story Form */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <StorySearch onSearch={handleSearch} className="w-full md:max-w-md" />
        
        <Link 
          href="/army-story/create" 
                      className="flex items-center justify-center px-5 py-3 bg-bts-accent text-black border-2 border-black rounded-lg transition-colors hover:bg-navbar-hover black-han-sans mx-auto md:mx-0 min-w-[200px] shadow-md"
        >
          <PenSquare size={18} className="mr-2" />
          <span>Share Your Story</span>
        </Link>
      </div>
      
      {/* Search Results Indicator */}
      {isSearchMode && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              {searchResults.data.length === 0 
                ? "No stories found" 
                : `Found ${searchResults.total} stor${searchResults.total === 1 ? 'y' : 'ies'}`}
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
          <p className="mt-2">Loading stories...</p>
        </div>
      )}
      
      {/* Empty State */}
      {!showLoading && displayStories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-2 black-han-sans">
            {isSearchMode ? "No stories found" : "Be the first to share your story!"}
          </h2>
          <p className="mb-6 text-gray-600">
            {isSearchMode 
              ? "Try different search terms or browse all stories."
              : "Share your journey of becoming an ARMY and what BTS means to you."}
          </p>
          
          {!isSearchMode && (
            <Link 
              href="/army-story/create" 
              className="inline-flex items-center px-5 py-3 bg-black text-bts-accent rounded-lg transition-colors hover:bg-purple-900 black-han-sans"
            >
              <PenSquare size={18} className="mr-2" />
              <span>Share Your Story</span>
            </Link>
          )}
        </div>
      )}
      
      {/* Stories Grid */}
      {!showLoading && displayStories.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* If not in search mode and we have stories, highlight the first one */}
            {!isSearchMode && displayStories.length > 0 && currentPage === 1 && (
              <div key={`featured-${displayStories[0]?.id || 'story'}`} className="col-span-1 md:col-span-2">
                <StoryCard 
                  story={displayStories[0]} 
                  isHighlighted={true}
                />
              </div>
            )}
            
            {/* Rest of the stories */}
            {displayStories.slice(!isSearchMode && currentPage === 1 ? 1 : 0).map((story) => (
              <StoryCard 
                key={`story-${story.id}-${story.story_id}`} 
                story={story}
              />
            ))}
          </div>
          
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
            
            {/* Story Count */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Showing {displayStories.length} of {isSearchMode ? searchResults.total : totalStories} stories
            </p>
          </div>
        </>
      )}
      
      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More" className="mt-16 border-t-2 border-gray-100 pt-12">
        <PageCTA
          title="Create Your ARMY Card"
          description="Generate a personalized ARMY ID card to showcase your bias and fan credentials."
          href="/army-card"
          icon={IdCard}
          color="purple"
        />
        
        <PageCTA
          title="Message Board"
          description="Share your thoughts and read messages from ARMY around the world."
          href="/messages"
          icon={MessageCircle}
          color="green"
        />
        
        <PageCTA
          title="Support ARMY Community"
          description="Help us keep this space thriving with your support. Every contribution strengthens our BTS fan community."
          href="/support"
          icon={HeartHandshake}
          color="yellow"
        />
      </CTAContainer>
    </div>
  )
} 
