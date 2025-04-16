"use client"

import React, { useMemo, useCallback } from "react"
import { CalendarEvent } from "../../lib/calendar-data"
import { safeFormat, formatCalendarDate } from "../../lib/date-utils"
import { addToGoogleCalendar } from "../../lib/calendar-utils"
import { toast } from "sonner"

interface EventCardProps {
  event: CalendarEvent
  isHighlighted?: boolean
  showAddToCalendarButton?: boolean
  className?: string
}

export function EventCard({ 
  event, 
  isHighlighted = false, 
  showAddToCalendarButton = false,
  className = ""
}: EventCardProps) {
  // Memoize formatted dates to prevent recalculation on each render
  const formattedDate = useMemo(() => {
    return safeFormat(new Date(event.start), "MMM d, yyyy")
  }, [event.start])

  const formattedTime = useMemo(() => {
    return event.start ? safeFormat(new Date(event.start), "h:mm a") : ""
  }, [event.start])

  // Memoize event handler
  const handleAddToCalendar = useCallback(() => {
    try {
      const startDate = formatCalendarDate(new Date(event.start));
      const endDate = event.end 
        ? formatCalendarDate(new Date(event.end)) 
        : startDate;
      
      const eventDetails = {
        text: event.title,
        dates: {
          start: startDate,
          end: endDate
        },
        details: `BTS Event: ${event.title}`,
        location: event.location || ""
      };
      
      // Add to calendar with success callback
      addToGoogleCalendar(eventDetails, () => {
        toast.success("Event added to calendar!", {
          description: `${event.title} on ${formattedDate} has been added to your calendar.`,
          action: {
            label: "View Calendar",
            onClick: () => window.open("https://calendar.google.com", "_blank")
          }
        });
      });
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast.error("Failed to add to calendar", {
        description: "An error occurred while adding the event."
      });
    }
  }, [event, formattedDate]);

  return (
    <div 
      className={`
        border-2 border-black rounded-xl p-3 sm:p-4 
        ${isHighlighted ? "bg-yellow-100" : "bg-white"}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Date Circle */}
        <div className="min-w-[3rem] w-12 h-12 flex-shrink-0 bg-black text-white rounded-full flex flex-col items-center justify-center text-center">
          <span className="text-xs">
            {safeFormat(new Date(event.start), "MMM")}
          </span>
          <span className="text-lg font-bold leading-tight">
            {safeFormat(new Date(event.start), "d")}
          </span>
        </div>
        
        {/* Event Details */}
        <div className="flex-grow">
          <h4 className="font-bold text-base sm:text-lg">
            {event.title}
            {isHighlighted && (
              <span className="text-xs font-normal bg-red-500 text-white px-1.5 py-0.5 rounded ml-2">
                Closest Event
              </span>
            )}
          </h4>
          
          <div className="text-sm text-black/70">
            <div>{formattedDate} {formattedTime ? `• ${formattedTime}` : ""}</div>
            {event.location && <div>{event.location}</div>}
          </div>
          
          {showAddToCalendarButton && (
            <button 
              onClick={handleAddToCalendar}
              className="mt-2 px-3 py-1 bg-black text-[#FFDE00] text-xs sm:text-sm rounded-lg"
              aria-label={`Add ${event.title} to Google Calendar`}
            >
              Add to Calendar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}