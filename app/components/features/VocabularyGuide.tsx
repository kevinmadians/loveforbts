"use client"

import React, { useState, useEffect } from "react"
import { Search, Tag, User, X, Filter, Share2, Info } from "lucide-react"
import { VocabularyTerm, VocabularyCategory, getAllTerms, getTermsByCategory, getCategoriesWithCount } from "@/app/lib/vocabulary-data"
import { toast } from "sonner"

// Colors for different categories
const CATEGORY_COLORS: Record<VocabularyCategory, string> = {
  'fandom': '#9747FF', // Purple
  'meme': '#FF3B30', // Red
  'song': '#0082FF', // Blue
  'inside-joke': '#FF7A00', // Orange
  'nickname': '#00B884', // Teal
  'phrase': '#FFDE00', // Yellow (official BTS color)
}

export function VocabularyGuide() {
  const [terms, setTerms] = useState<VocabularyTerm[]>([])
  const [filteredTerms, setFilteredTerms] = useState<VocabularyTerm[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory | 'all'>('all')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)
  const [categories, setCategories] = useState<{category: VocabularyCategory; count: number; label: string}[]>([])

  // Get all terms on mount
  useEffect(() => {
    const allTerms = getAllTerms();
    setTerms(allTerms);
    setFilteredTerms(allTerms);
    setCategories(getCategoriesWithCount());
  }, [])

  // Filter terms when search query or category changes
  useEffect(() => {
    let results = [...terms];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(term => term.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(term => 
        term.term.toLowerCase().includes(query) || 
        term.definition.toLowerCase().includes(query) ||
        term.example?.toLowerCase().includes(query) ||
        term.relatedMembers?.some(member => member.toLowerCase().includes(query))
      );
    }
    
    setFilteredTerms(results);
  }, [searchQuery, selectedCategory, terms])
  
  const handleCategoryChange = (category: VocabularyCategory | 'all') => {
    setSelectedCategory(category);
    setExpandedTerm(null);
  }
  
  const toggleExpandTerm = (termName: string) => {
    if (expandedTerm === termName) {
      setExpandedTerm(null);
    } else {
      setExpandedTerm(termName);
    }
  }
  
  const handleShareTerm = (term: VocabularyTerm) => {
    const text = `${term.term}: ${term.definition} #BTS #ARMY #BTSVocabulary`;
    
    if (navigator.share) {
      navigator.share({
        title: 'BTS ARMY Vocabulary',
        text: text,
        url: window.location.href
      }).catch(() => {
        copyToClipboard(text);
      });
    } else {
      copyToClipboard(text);
    }
  }
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "You can now share this vocabulary term."
      });
    }).catch(() => {
      toast.error("Failed to copy", {
        description: "Please try again."
      });
    });
  }
  
  // Render empty state if no terms match the filter
  if (filteredTerms.length === 0) {
    return (
      <div className="w-full">
        <div className="search-container mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search vocabulary terms..."
              className="w-full pl-10 py-2 px-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        <div className="category-filters mb-8 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full border-2 transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            All Terms
          </button>
          
          {categories.map(({category, label, count}) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border-2 flex items-center transition-colors ${
                selectedCategory === category 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:border-black'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: CATEGORY_COLORS[category] }}
              ></div>
              {label} ({count})
            </button>
          ))}
        </div>
        
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-black">
          <p className="text-gray-600 mb-3">No terms found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory('all');
            }}
            className="px-6 py-2 bg-bts-accent text-black rounded-full font-medium hover:bg-navbar-hover transition-colors border-2 border-black"
          >
            View All Terms
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {/* Search and filter section */}
      <div className="search-container mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search vocabulary terms..."
            className="w-full pl-10 py-2 px-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Category filter section */}
      <div className="category-filters mb-8 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-full border-2 transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-black border-gray-300 hover:border-black'
          }`}
        >
          All Terms
        </button>
        
        {categories.map(({category, label, count}) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full border-2 flex items-center transition-colors ${
              selectedCategory === category 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
            ></div>
            {label} ({count})
          </button>
        ))}
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-center text-sm text-gray-500">
        Showing {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
        {selectedCategory !== 'all' && (
          <span> in {categories.find(c => c.category === selectedCategory)?.label}</span>
        )}
        {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
      </div>
      
      {/* Vocabulary terms list */}
      <div className="terms-container space-y-4">
        {filteredTerms.map((term) => (
          <div 
            key={term.term}
            className={`
              term-card bg-white border-2 border-black rounded-lg overflow-hidden transition-all duration-300
              ${expandedTerm === term.term ? 'shadow-lg' : 'hover:shadow-md'}
            `}
          >
            {/* Term header */}
            <div
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleExpandTerm(term.term)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-2">{term.emoji}</span>
                <h3 className="text-lg font-bold">{term.term}</h3>
                
                {/* Member and category badges */}
                <div className="flex ml-3 gap-1">
                  {term.relatedMembers && term.relatedMembers.length > 0 && (
                    <span 
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800"
                      title={`Related to ${term.relatedMembers.join(', ')}`}
                    >
                      <User size={12} className="mr-1" />
                      {term.relatedMembers.length === 1 
                        ? term.relatedMembers[0]
                        : `${term.relatedMembers.length} members`}
                    </span>
                  )}
                  
                  <span 
                    className="inline-flex items-center text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[term.category]}20`,
                      color: CATEGORY_COLORS[term.category]
                    }}
                  >
                    <Tag size={12} className="mr-1" />
                    {term.category}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Expanded content */}
            {expandedTerm === term.term && (
              <div className="px-4 pb-4 pt-0">
                <div className="border-t border-gray-200 pt-3">
                  <p className="mb-3">{term.definition}</p>
                  
                  {term.example && (
                    <div className="bg-gray-50 p-3 rounded-md mb-3 italic text-gray-600">
                      &ldquo;{term.example}&rdquo;
                    </div>
                  )}
                  
                  <div className="flex flex-wrap justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-500 flex flex-wrap items-center">
                      {term.year && (
                        <span className="mr-3 mb-1">Since {term.year}</span>
                      )}
                      
                      {term.source && (
                        <span className="flex items-center mr-3 mb-1">
                          <Info size={14} className="mr-1 text-gray-400" />
                          <span>Source: {term.source}</span>
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareTerm(term);
                      }}
                      className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Share2 size={16} className="mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 
