"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Search, X } from "lucide-react"

interface MessageSearchProps {
  onSearch: (query: string) => void
  className?: string
}

export function MessageSearch({ onSearch, className = "" }: MessageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  
  // Debounce search query to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300) // 300ms delay for debounce
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  // Handle live search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])
  
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
    onSearch("")
  }, [onSearch])
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="search"
          id="message-search"
          value={searchQuery}
          onChange={handleChange}
          className="block w-full py-3 pl-10 pr-10 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Search messages..."
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center px-2 text-gray-500 hover:text-black"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  )
} 
