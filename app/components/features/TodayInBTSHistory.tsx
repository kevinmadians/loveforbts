"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronDown, ChevronUp, ExternalLink, Share2 } from "lucide-react"
import { format } from "date-fns"
import { HistoricalEvent, getEventsForToday, getAllEvents, EventCategory } from "@/app/lib/history-data"
import { toast } from "sonner"

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'debut': '#9747FF', // Purple
  'release': '#0082FF', // Blue
  'award': '#FFDE00', // Yellow
  'performance': '#FF7A00', // Orange
  'milestone': '#00B884', // Teal
  'vlive': '#FF3B30', // Red
  'other': '#747474', // Gray
  'military': '#2E6D25' // Army Green
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  'debut': 'Debut',
  'release': 'Music Release',
  'award': 'Award',
  'performance': 'Performance',
  'milestone': 'Milestone',
  'vlive': 'V LIVE',
  'other': 'Other',
  'military': 'Military Service'
}

export function TodayInBTSHistory() {
  const [todayEvents, setTodayEvents] = useState<HistoricalEvent[]>([])
  const [randomEvents, setRandomEvents] = useState<HistoricalEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [noEventsForToday, setNoEventsForToday] = useState(false)
  
  useEffect(() => {
    // Get today's events
    const eventsToday = getEventsForToday()
    setTodayEvents(eventsToday)
    
    // If no events today, get random events
    if (eventsToday.length === 0) {
      setNoEventsForToday(true)
      const allEvents = getAllEvents()
      const randomIndices = new Set<number>()
      while (randomIndices.size < Math.min(3, allEvents.length)) {
        randomIndices.add(Math.floor(Math.random() * allEvents.length))
      }
      const selectedEvents = Array.from(randomIndices).map(index => allEvents[index])
      setRandomEvents(selectedEvents)
    }
    
    setIsLoading(false)
  }, [])
  
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
  
  const handleShareEvent = (event: HistoricalEvent) => {
    const text = `On this day in BTS history (${formatEventDate(event.date)}): ${event.title} #BTS #방탄소년단 #ThisDayInBTSHistory`
    
    if (navigator.share) {
      navigator.share({
        title: 'This Day in BTS History',
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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-black rounded-2xl bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <Calendar className="w-8 h-8 mb-3 text-purple-500" />
          <p>Loading BTS history...</p>
        </div>
      </div>
    )
  }
  
  // Display events for today, or random events if none for today
  const eventsToDisplay = noEventsForToday ? randomEvents : todayEvents
  
  return (
    <div className="w-full bg-white border-2 border-black rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center black-han-sans">
          <Calendar className="w-6 h-6 mr-2 text-purple-500" />
          {noEventsForToday ? 'Exploring BTS History' : 'This Day in BTS History'}
        </h2>
        <span className="text-sm font-medium bg-purple-100 px-3 py-1 rounded-full">
          {format(new Date(), "MMMM d")}
        </span>
      </div>
      
      {noEventsForToday && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
          No major BTS events happened on this day in history. Here are some noteworthy moments instead!
        </div>
      )}
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-purple-200 z-0"></div>
        
        {/* Events */}
        <div className="space-y-6">
          {eventsToDisplay.map((event, index) => {
            const eventId = `${event.date}-${index}`
            const isExpanded = expandedEventId === eventId
            
            return (
              <div key={eventId} className="relative pl-10">
                {/* Timeline dot */}
                <div 
                  className="absolute left-3 top-1.5 w-5 h-5 rounded-full border-2 border-white z-10"
                  style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                ></div>
                
                {/* Event card */}
                <div className={`
                  border-2 border-black rounded-xl overflow-hidden transition-all duration-300
                  ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}
                `}>
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => handleExpandEvent(eventId)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-semibold rounded-full px-2 py-0.5 mr-2"
                            style={{ 
                              backgroundColor: CATEGORY_COLORS[event.category],
                              color: ['award', 'performance'].includes(event.category) ? 'black' : 'white'
                            }}
                          >
                            {CATEGORY_LABELS[event.category]}
                          </span>
                          <span className="text-sm text-gray-500">{event.year}</span>
                        </div>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      {event.media && event.media.length > 0 && (
                        <div className="mb-4 rounded-md overflow-hidden">
                          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                            <Image
                              src={event.media[0].url}
                              alt={event.media[0].alt || event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 600px"
                              className="object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/bts-logo.png';
                              }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <p className="mb-4 text-gray-700">{event.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{formatEventDate(event.date)}</span>
                        
                        <div className="flex space-x-2">
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
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Link to all history */}
      <div className="mt-6 text-center">
        <Link
          href="/history"
          className="inline-block px-6 py-2 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 transition-colors"
        >
          Explore Full BTS Timeline
        </Link>
      </div>
    </div>
  )
} 