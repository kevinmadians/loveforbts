"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { MessageCard } from "@/app/components/features/message-card"
import { EnhancedMessageSearch } from "@/app/components/features/enhanced-message-search"
import { useMessages } from "@/app/lib/message-context"
import { PenSquare, Book, IdCard, HeartHandshake } from "lucide-react"
import { Pagination } from "@/app/components/ui/pagination"
import { type Message } from "@/app/lib/message-context"
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"

export default function MessagesPage() {
  const { 
    messages, 
    isLoading, 
    refreshMessages, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    totalMessages,
    searchMessages 
  } = useMessages()
  
  const [searchResults, setSearchResults] = useState<{ 
    data: Message[], 
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
    
    // If messages is not empty, we don't need to show loading
    if (messages && messages.length > 0) {
      setLocalLoading(false)
      return
    }
    
    // Otherwise, fetch messages
    const loadData = async () => {
      await refreshMessages(1)
      setLocalLoading(false)
    }
    
    loadData()
  }, [refreshMessages, messages])
  
  // Handle search results
  const handleSearch = useCallback((results: { data: Message[], total: number } | null) => {
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
        const results = await searchMessages(query, page);
        setSearchResults(results);
        setSearchPage(page);
      }
    } catch (error) {
      console.error('Error changing search page:', error);
    } finally {
      setLocalLoading(false);
    }
  }, [searchResults, searchMessages]);
  
  // Handle normal pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [setCurrentPage]);
  
  // Display messages - search results or all messages
  const displayMessages = searchResults ? searchResults.data : messages
  const isSearchMode = searchResults !== null
  const showLoading = isLoading && localLoading
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          Messages from ARMY
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Connect with fellow ARMY from around the world through messages of love and support.
          Every message carries the passion of a fan's heart!
        </p>
      </div>
      
      {/* Message Form Link and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <EnhancedMessageSearch onSearch={handleSearch} className="w-full md:max-w-md" />
        
        <Link 
          href="/messages/create" 
          className="flex items-center justify-center px-5 py-3 bg-[#FFDE00] text-black border-2 border-black rounded-lg transition-colors hover:bg-[#E5C700] black-han-sans mx-auto md:mx-0 min-w-[200px] shadow-md"
        >
          <PenSquare size={18} className="mr-2" />
          <span>Write a Message</span>
        </Link>
      </div>
      
      {/* Search Results Indicator */}
      {isSearchMode && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              {searchResults.data.length === 0 
                ? "No messages found" 
                : `Found ${searchResults.total} message${searchResults.total === 1 ? '' : 's'}`}
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
          <p className="mt-2">Loading messages...</p>
        </div>
      )}
      
      {/* Empty State */}
      {!showLoading && displayMessages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-black p-6">
          <h2 className="text-xl font-bold mb-2 black-han-sans">
            {isSearchMode ? "No messages found" : "Be the first to leave a message!"}
          </h2>
          <p className="mb-6 text-gray-600">
            {isSearchMode 
              ? "Try different search terms or browse all messages."
              : "Share your love and thoughts with BTS and ARMY from around the world."}
          </p>
          
          {!isSearchMode && (
            <Link 
              href="/messages/create" 
              className="inline-flex items-center px-5 py-3 bg-black text-[#FFDE00] rounded-lg transition-colors hover:bg-purple-900 black-han-sans"
            >
              <PenSquare size={18} className="mr-2" />
              <span>Write a Message</span>
            </Link>
          )}
        </div>
      )}
      
      {/* Messages Grid */}
      {!showLoading && displayMessages.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* If not in search mode and we have messages, highlight the first one */}
            {!isSearchMode && displayMessages.length > 0 && currentPage === 1 && (
              <div key={`featured-${displayMessages[0]?.id || 'message'}`} className="col-span-1 md:col-span-2">
                <MessageCard 
                  message={displayMessages[0]} 
                  isHighlighted={true}
                />
              </div>
            )}
            
            {/* Rest of the messages */}
            {displayMessages.slice(!isSearchMode && currentPage === 1 ? 1 : 0).map((message) => (
              <MessageCard 
                key={`message-${message.id}`} 
                message={message}
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
            
            {/* Message Count */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Showing {displayMessages.length} of {isSearchMode ? searchResults.total : totalMessages} messages
            </p>
          </div>
        </>
      )}
      
      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More" className="mt-16 border-t-2 border-gray-100 pt-12">
        <PageCTA
          title="Share Your ARMY Story"
          description="Tell your journey with BTS and connect with fellow fans through heartfelt stories."
          href="/army-story"
          icon={Book}
          color="purple"
        />
        
        <PageCTA
          title="Create Your ARMY Card"
          description="Generate a personalized ARMY ID card to showcase your bias and fan credentials."
          href="/army-card"
          icon={IdCard}
          color="blue"
        />
        
        <PageCTA
          title="Support Our Community"
          description="Your contribution helps keep this fan space alive and growing. Join fellow ARMYs in supporting this community."
          href="/support"
          icon={HeartHandshake}
          color="yellow"
        />
      </CTAContainer>
    </div>
  )
} 