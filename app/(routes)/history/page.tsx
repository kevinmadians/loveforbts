"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronDown, ChevronRight, ChevronUp, ExternalLink, Filter, Share2 } from "lucide-react"
import { format } from "date-fns"
import { HistoricalEvent, EventCategory, getAllEvents, getEventsByCategory, getEventsByYear, getEventsCount } from "@/app/lib/history-data"
import { TodayInBTSHistory } from "@/app/components/features/TodayInBTSHistory"
import { toast } from "sonner"

// Same category data from TodayInBTSHistory component
const CATEGORY_COLORS: Record<EventCategory, string> = {
  'debut': '#9747FF', // Purple
  'release': '#0082FF', // Blue
  'award': '#FFDE00', // Yellow
  'performance': '#FF7A00', // Orange
  'milestone': '#00B884', // Teal
  'vlive': '#FF3B30', // Red
  'other': '#747474' // Gray
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  'debut': 'Debut',
  'release': 'Music Release',
  'award': 'Award',
  'performance': 'Performance',
  'milestone': 'Milestone',
  'vlive': 'V LIVE',
  'other': 'Other'
}

export default function HistoryPage() {
  const [events, setEvents] = useState<HistoricalEvent[]>([])
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [expandedYear, setExpandedYear] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all')
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({})
  const [loading, setLoading] = useState(true)
  
  // Get all events and group by year
  useEffect(() => {
    let filteredEvents: HistoricalEvent[]
    
    if (selectedCategory === 'all') {
      filteredEvents = getAllEvents()
    } else {
      filteredEvents = getEventsByCategory(selectedCategory as EventCategory)
    }
    
    setEvents(filteredEvents)
    setLoading(false)
    
    // Auto-expand current year
    const currentYear = new Date().getFullYear()
    const hasCurrentYearEvents = filteredEvents.some(event => event.year === currentYear)
    
    if (hasCurrentYearEvents) {
      setExpandedYears(prev => ({ ...prev, [currentYear]: true }))
    } else {
      // Find the most recent year with events
      const years = [...new Set(filteredEvents.map(event => event.year))].sort((a, b) => b - a)
      if (years.length > 0) {
        setExpandedYears(prev => ({ ...prev, [years[0]]: true }))
      }
    }
  }, [selectedCategory])
  
  // Format date to display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMMM d, yyyy")
  }
  
  const handleExpandEvent = (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(eventId)
    }
  }
  
  const handleYearToggle = (year: number) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }))
  }
  
  const handleCategoryChange = (category: EventCategory | 'all') => {
    setSelectedCategory(category)
    // Reset expanded events
    setExpandedEventId(null)
  }
  
  const handleShareEvent = (event: HistoricalEvent) => {
    const text = `BTS history (${formatEventDate(event.date)}): ${event.title} #BTS #방탄소년단 #BTSHistory`
    
    if (navigator.share) {
      navigator.share({
        title: 'BTS History',
        text: text,
        url: window.location.href
      }).catch(() => {
        copyToClipboard(text)
      })
    } else {
      copyToClipboard(text)
    }
  }
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "You can now share this moment in BTS history."
      })
    }).catch(() => {
      toast.error("Failed to copy", {
        description: "Please try again."
      })
    })
  }
  
  // Group events by year
  const eventsByYear = events.reduce<Record<number, HistoricalEvent[]>>((acc, event) => {
    const year = event.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(event)
    return acc
  }, {})
  
  // Get sorted years (descending - newest first)
  const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a)
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <div className="animate-pulse flex flex-col items-center">
          <Calendar className="w-12 h-12 mb-3 text-purple-500" />
          <p className="text-lg">Loading BTS history...</p>
        </div>
      </div>
    )
  }
  
  return (
    <main className="flex flex-col w-full max-w-5xl px-4 py-8 mx-auto">
      <section className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 black-han-sans">
          BTS <span className="text-purple-600">History</span>
        </h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-4">
          Explore the journey of BTS from debut to global superstardom through this interactive timeline.
        </p>
        
        <div className="flex items-center justify-center mb-6">
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
          <Calendar size={24} className="mx-3 text-purple-500" />
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
        </div>
      </section>
      
      {/* Today in BTS History component */}
      <section className="mb-12">
        <TodayInBTSHistory />
      </section>
      
      {/* Filter section */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-full border-2 transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-black border-gray-300 hover:border-black'
          }`}
        >
          All Events ({getEventsCount()})
        </button>
        
        {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category as EventCategory)}
            className={`px-4 py-2 rounded-full border-2 flex items-center transition-colors ${
              selectedCategory === category 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: CATEGORY_COLORS[category as EventCategory] }}
            ></div>
            {label}
          </button>
        ))}
      </div>
      
      {/* Timeline section */}
      <section className="mb-12">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 black-han-sans">BTS Timeline</h2>
          
          {years.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No events found for the selected filter.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 transition-colors"
              >
                View All Events
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Main timeline line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-1 bg-purple-100"></div>
              
              {/* Years timeline */}
              <div className="space-y-4">
                {years.map(year => {
                  const isYearExpanded = expandedYears[year] || false
                  
                  return (
                    <div key={year} className="relative">
                      {/* Year marker */}
                      <button
                        onClick={() => handleYearToggle(year)}
                        className={`
                          flex items-center pl-10 py-2 w-full text-left relative z-10 transition-colors
                          ${isYearExpanded ? 'text-purple-700 font-bold' : 'text-gray-700 hover:text-purple-700'}
                        `}
                      >
                        <div className={`
                          absolute left-0 top-2 w-11 h-11 flex items-center justify-center rounded-full border-4 border-white
                          ${isYearExpanded ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}
                        `}>
                          <ChevronDown
                            size={18}
                            className={`transform transition-transform ${isYearExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                        <span className="text-xl font-semibold ml-2">
                          {year}
                          <span className="ml-2 text-sm font-normal">
                            ({eventsByYear[year].length} event{eventsByYear[year].length !== 1 ? 's' : ''})
                          </span>
                        </span>
                      </button>
                      
                      {/* Year events */}
                      {isYearExpanded && (
                        <div className="mt-4 ml-11 pl-10 border-l-2 border-dashed border-purple-200">
                          <div className="space-y-4 pb-4">
                            {eventsByYear[year].map((event, index) => {
                              const eventId = `${event.date}-${index}`
                              const isExpanded = expandedEventId === eventId
                              
                              return (
                                <div key={eventId} className="relative">
                                  {/* Event dot */}
                                  <div 
                                    className="absolute -left-[21px] top-4 w-5 h-5 rounded-full border-2 border-white"
                                    style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                                  ></div>
                                  
                                  {/* Event card */}
                                  <div className={`
                                    border-2 rounded-xl overflow-hidden transition-all duration-300
                                    ${isExpanded ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-400'}
                                  `}>
                                    <div 
                                      className="p-4 cursor-pointer"
                                      onClick={() => handleExpandEvent(eventId)}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex flex-col">
                                          <span className="text-sm text-gray-500 mb-1">
                                            {formatEventDate(event.date)}
                                          </span>
                                          <h3 className="text-lg font-bold">{event.title}</h3>
                                          <span 
                                            className="text-xs font-medium rounded-full px-2 py-0.5 mt-2 inline-flex items-center w-fit"
                                            style={{ 
                                              backgroundColor: CATEGORY_COLORS[event.category],
                                              color: ['award', 'performance'].includes(event.category) ? 'black' : 'white'
                                            }}
                                          >
                                            {CATEGORY_LABELS[event.category]}
                                          </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                                          {isExpanded ? <ChevronUp size={20} /> : <ChevronRight size={20} />}
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {/* Expanded content */}
                                    {isExpanded && (
                                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                                        {event.media && event.media.length > 0 && (
                                          <div className="mb-4 relative h-64 md:h-[300px] rounded-md overflow-hidden">
                                            <Image
                                              src={event.media[0].url}
                                              alt={event.media[0].alt || event.title}
                                              fill
                                              className="object-cover"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/bts-logo.png';
                                              }}
                                            />
                                          </div>
                                        )}
                                        
                                        <p className="mb-4 text-gray-700">{event.description}</p>
                                        
                                        <div className="flex justify-end space-x-2">
                                          <button
                                            onClick={() => handleShareEvent(event)}
                                            className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors"
                                            aria-label="Share this event"
                                          >
                                            <Share2 size={18} />
                                          </button>
                                          
                                          {event.link && (
                                            <Link
                                              href={event.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors"
                                              aria-label="View external content"
                                            >
                                              <ExternalLink size={18} />
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Trivia section */}
      <section className="mb-8">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">BTS History Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <h3 className="font-bold mb-2">Did You Know?</h3>
              <p>BTS was originally supposed to be a hip-hop group similar to YG Entertainment's 1TYM. Their concept evolved over time to include various music genres.</p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <h3 className="font-bold mb-2">BTS Firsts</h3>
              <p>BTS was the first K-pop group to perform at the American Music Awards, present at the Grammy Awards, and speak at the United Nations General Assembly.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h3 className="font-bold mb-2">Name Origin</h3>
              <p>The name BTS stands for "Bangtan Sonyeondan" (방탄소년단) in Korean, which translates to "Bulletproof Boy Scouts." In 2017, they also introduced "Beyond The Scene" as an English meaning.</p>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="font-bold mb-2">Record Breaking</h3>
              <p>BTS holds multiple Guinness World Records, including "Most Twitter engagements" and "Most viewed YouTube video in 24 hours" with their hit song "Butter."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 