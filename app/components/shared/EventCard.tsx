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

  // Check if the event is today
  const isToday = useMemo(() => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return today.toDateString() === eventDate.toDateString();
  }, [event.start]);

  // Check if this is a discharge event
  const isDischargeEvent = useMemo(() => {
    return event.category === 'military';
  }, [event.category]);

  // Get celebration message for discharge events happening today
  const celebrationMessage = useMemo(() => {
    if (!isToday || !isDischargeEvent) return null;
    
    // Extract member name from title
    const memberName = event.title.includes("RM") ? "RM" : 
                      event.title.includes("V's") ? "V" :
                      event.title.includes("Jin") ? "Jin" :
                      event.title.includes("J-Hope") ? "J-Hope" :
                      event.title.includes("Suga") ? "Suga" :
                      event.title.includes("Jimin") ? "Jimin" :
                      event.title.includes("Jungkook") ? "Jungkook" : "Member";
    
    return `🎉 ${memberName} is officially back! Welcome home! 💜`;
  }, [isToday, isDischargeEvent, event.title]);

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
        border-2 border-black rounded-xl p-3 sm:p-4 transition-all duration-200
        ${isToday && isDischargeEvent ? "bg-green-100 ring-2 ring-green-500 animate-pulse" : 
          isDischargeEvent ? "bg-purple-50" :
          isHighlighted ? "bg-yellow-100" : "bg-white"}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Date Circle */}
        <div className={`min-w-[3rem] w-12 h-12 flex-shrink-0 text-white rounded-full flex flex-col items-center justify-center text-center ${
          isToday && isDischargeEvent ? "bg-green-600" :
          isDischargeEvent ? "bg-purple-600" : "bg-black"
        }`}>
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
            {isToday && isDischargeEvent && (
              <span className="text-xs font-normal bg-green-600 text-white px-1.5 py-0.5 rounded ml-2 animate-bounce">
                TODAY! 🎉
              </span>
            )}
            {isHighlighted && !isToday && (
              <span className="text-xs font-normal bg-red-500 text-white px-1.5 py-0.5 rounded ml-2">
                Closest Event
              </span>
            )}
          </h4>
          
          <div className="text-sm text-black/70">
            <div>{formattedDate}</div>
            {event.location && <div>{event.location}</div>}
          </div>

          {/* Celebration message for discharge events happening today */}
          {celebrationMessage && (
            <div className="mt-2 text-sm font-medium text-green-700 bg-green-50 p-2 rounded-lg border border-green-200">
              {celebrationMessage}
            </div>
          )}
          
          {/* Add to Calendar button - hidden if event is today */}
          {showAddToCalendarButton && !isToday && (
            <button 
              onClick={handleAddToCalendar}
              className="mt-2 px-3 py-1 bg-black text-bts-accent text-xs sm:text-sm rounded-lg hover:bg-purple-900 transition-colors"
              aria-label={`Add ${event.title} to Google Calendar`}
            >
              Add to Calendar
            </button>
          )}

          {/* Special message for today's events */}
          {isToday && (
            <div className="mt-2 text-xs text-green-600 font-medium">
              🌟 This event is happening today!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
