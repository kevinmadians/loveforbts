"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { MessageCard } from "@/app/components/features/message-card"
import { EnhancedMessageSearch } from "@/app/components/features/enhanced-message-search"
import { useMessages } from "@/app/lib/message-context"
import { PenSquare, Book, IdCard, HeartHandshake, Sparkles } from "lucide-react"
import { Pagination } from "@/app/components/ui/pagination"
import { type Message } from "@/app/lib/message-context"
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"
import { calendarEvents } from "@/app/lib/calendar-data"

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
  
  // Check if today has any discharge events
  const todaysDischargeEvents = useMemo(() => {
    const today = new Date();
    return calendarEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString() && 
             event.category === 'military';
    });
  }, []);

  // Get discharged member names
  const dischargedMembers = useMemo(() => {
    return todaysDischargeEvents.map(event => {
      if (event.title.includes("RM")) return "RM";
      if (event.title.includes("V's")) return "V";
      if (event.title.includes("Jin")) return "Jin";
      if (event.title.includes("J-Hope")) return "J-Hope";
      if (event.title.includes("Suga")) return "Suga";
      if (event.title.includes("Jimin")) return "Jimin";
      if (event.title.includes("Jungkook")) return "Jungkook";
      return "Member";
    });
  }, [todaysDischargeEvents]);
  
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
  
  const isDischargeDay = todaysDischargeEvents.length > 0;
  const isMultipleMembers = dischargedMembers.length > 1;
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Special Discharge Day Banner */}
      {isDischargeDay && (
        <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-green-100 via-purple-50 to-green-100 border-2 border-green-500 rounded-2xl p-6 shadow-lg">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-30 animate-bounce delay-500">
              <img 
                src="/images/bts-logo-purple.png" 
                alt="BTS Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="relative z-10 text-center">
            {/* Celebration Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-bounce">
              <img 
                src="/images/bts-logo-purple.png" 
                alt="BTS Logo" 
                className="w-15 h-15 object-contain"
              />
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 black-han-sans text-green-700">
              {isMultipleMembers 
                ? `${dischargedMembers.join(" & ")} Are Home!`
                : `Welcome Home ${dischargedMembers[0]}!`}
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-xl mb-4 text-green-600 font-medium">
              {isMultipleMembers 
                ? "Both members have successfully completed their military service!"
                : "They have successfully completed their military service!"}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg mb-6 text-gray-700 max-w-2xl mx-auto">
              This is a special day for ARMY! Join fellow fans around the world in celebrating 
              {isMultipleMembers ? " their " : ` ${dischargedMembers[0]}'s `}
              safe return. Send your congratulations and love messages!
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          {isDischargeDay ? "Celebration Messages from ARMY" : "Messages from ARMY"}
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          {isDischargeDay 
            ? `Today is extra special! Send your congratulations to ${isMultipleMembers ? dischargedMembers.join(" & ") : dischargedMembers[0]} and connect with fellow ARMY celebrating this milestone.`
            : "Connect with fellow ARMY from around the world through messages of love and support. Every message carries the passion of a fan's heart!"
          }
        </p>
      </div>
      
      {/* Message Form Link and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <EnhancedMessageSearch onSearch={handleSearch} className="w-full md:max-w-md" />
        
        <Link 
          href="/messages/create" 
          className={`flex items-center justify-center px-5 py-3 border-2 border-black rounded-lg transition-colors black-han-sans mx-auto md:mx-0 min-w-[200px] shadow-md ${
            isDischargeDay 
              ? "bg-green-600 text-white hover:bg-green-700" 
              : "bg-bts-accent text-black hover:bg-navbar-hover"
          }`}
        >
          <PenSquare size={18} className="mr-2" />
          <span>{isDischargeDay ? "Send Celebration Message" : "Write a Message"}</span>
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
            {isSearchMode ? "No messages found" : 
             isDischargeDay ? "Be the first to send congratulations!" : "Be the first to leave a message!"}
          </h2>
          <p className="mb-6 text-gray-600">
            {isSearchMode 
              ? "Try different search terms or browse all messages."
              : isDischargeDay 
                ? `Share your excitement and congratulations for ${isMultipleMembers ? dischargedMembers.join(" & ") : dischargedMembers[0]} with ARMY worldwide.`
                : "Share your love and thoughts with BTS and ARMY from around the world."}
          </p>
          
          {!isSearchMode && (
            <Link 
              href="/messages/create" 
              className={`inline-flex items-center px-5 py-3 rounded-lg transition-colors black-han-sans ${
                isDischargeDay 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-black text-bts-accent hover:bg-purple-900"
              }`}
            >
              <PenSquare size={18} className="mr-2" />
              <span>{isDischargeDay ? "Send Celebration Message" : "Write a Message"}</span>
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
          </div>
        </>
      )}

      {/* Statistics */}
      <div className="mt-12 text-center">
        <div className="bg-white rounded-2xl border-2 border-black p-6">
          <h3 className="text-xl font-bold mb-4 black-han-sans">
            {isDischargeDay ? "Celebration Statistics" : "Community Statistics"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-purple-600">{totalMessages}</div>
              <div className="text-sm text-gray-600">
                {isDischargeDay ? "Celebration Messages" : "Total Messages"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Love Shared</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">💜</div>
              <div className="text-sm text-gray-600">
                {isDischargeDay ? "Celebration Spirit" : "ARMY Unity"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <CTAContainer title={isDischargeDay ? "Keep the Celebration Going!" : "Explore More ARMY Content"}>
        <PageCTA
          title="Meet the Members"
          description="Learn more about all seven BTS members and their incredible journey."
          href="/members"
          icon={IdCard}
          color="purple"
        />
        
        <PageCTA
          title="Your ARMY Story"
          description="Share your own story about how BTS changed your life."
          href="/army-story"
          icon={Book}
          color="green"
        />
        
        <PageCTA
          title="Support Community"
          description="Help us maintain this loving space for all ARMY."
          href="/support"
          icon={HeartHandshake}
          color="yellow"
        />
      </CTAContainer>
    </div>
  )
} 
