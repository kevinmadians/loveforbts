"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useMessages } from "@/app/lib/message-context"
import { Search } from "lucide-react"
import { type Message } from "@/app/lib/message-context"

interface EnhancedMessageSearchProps {
  onSearch: (results: { data: Message[], total: number } | null) => void
  className?: string
}

export function EnhancedMessageSearch({ onSearch, className = "" }: EnhancedMessageSearchProps) {
  const { searchMessages } = useMessages()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState("")
  
  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300) // 300ms delay for debounce
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  // Handle live search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.trim().length < 2) {
        // Clear results if query is empty or too short
        if (!debouncedQuery.trim()) {
          onSearch(null)
        }
        return
      }
      
      setIsSearching(true)
      
      try {
        const results = await searchMessages(debouncedQuery, 1)
        onSearch(results)
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsSearching(false)
      }
    }
    
    performSearch()
  }, [debouncedQuery, onSearch, searchMessages])
  
  // Handle traditional form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // Live search already handles it, this just prevents default form submission
  }, [])
  
  // Update search query on input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])
  
  // Handle clear button click
  const handleClear = useCallback(() => {
    setSearchQuery("")
    onSearch(null)
  }, [onSearch])
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="search"
          id="search"
          value={searchQuery}
          onChange={handleChange}
          className="block w-full py-3 pl-10 pr-16 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Search messages..."
          disabled={isSearching}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-16 flex items-center px-2 text-gray-500 hover:text-black"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
        <button
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className="absolute inset-y-0 right-0 flex items-center px-4 bg-black text-[#FFDE00] rounded-r-lg border-2 border-black black-han-sans disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
      
      {isSearching && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 -translate-x-12">
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        </div>
      )}
    </form>
  )
} 