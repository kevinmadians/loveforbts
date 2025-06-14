"use client"

import React, { useState, useMemo } from "react"
import { DayPicker } from "react-day-picker"
import { CalendarEvent, calendarEvents, eventCategories, EventCategory } from "../../lib/calendar-data"
import { safeFormat } from "../../lib/date-utils"
import { Calendar as UICalendar } from "../ui/calendar"
import { EventCard } from "../shared/EventCard"

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // Memoize selected date events
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    
    return calendarEvents.filter((event: CalendarEvent) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      )
    })
  }, [selectedDate])
  
  // Memoize upcoming events (closest 3)
  const upcomingEvents = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return calendarEvents
      .filter((event: CalendarEvent) => new Date(event.start) >= today)
      .sort((a: CalendarEvent, b: CalendarEvent) => 
        new Date(a.start).getTime() - new Date(b.start).getTime()
      )
      .slice(0, 3)
  }, [])

  // Check if today has any discharge events
  const todaysDischargeEvents = useMemo(() => {
    const today = new Date();
    return calendarEvents.filter((event: CalendarEvent) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString() && 
             event.category === 'military';
    });
  }, []);

  // Get the appropriate title for the upcoming events section
  const upcomingEventsTitle = useMemo(() => {
    if (todaysDischargeEvents.length > 0) {
      if (todaysDischargeEvents.length === 1) {
        // Extract member name from title
        const event = todaysDischargeEvents[0];
        const memberName = event.title.includes("RM") ? "RM" : 
                          event.title.includes("V's") ? "V" :
                          event.title.includes("Jin") ? "Jin" :
                          event.title.includes("J-Hope") ? "J-Hope" :
                          event.title.includes("Suga") ? "Suga" :
                          event.title.includes("Jimin") ? "Jimin" :
                          event.title.includes("Jungkook") ? "Jungkook" : "Member";
        return `🎉 Welcome Home ${memberName}! 💜`;
      } else {
        return "🎉 Discharge Celebration Day! 💜";
      }
    }
    return "Upcoming Events";
  }, [todaysDischargeEvents]);
  
  // Memoize event modifiers
  const eventModifiers = useMemo(() => {
    const modifiers: Record<string, Date[]> = {}
    
    // Create modifiers for each event category
    calendarEvents.forEach((event: CalendarEvent) => {
      const eventDate = new Date(event.start)
      
      if (!modifiers[event.category]) {
        modifiers[event.category] = []
      }
      
      modifiers[event.category].push(eventDate)
    })
    
    return modifiers
  }, [])
  
  // Memoize modifier styles
  const modifierStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {}
    
    Object.keys(eventCategories).forEach((category) => {
      const eventCategory = category as EventCategory
      styles[category] = { 
        color: "white", 
        backgroundColor: eventCategories[eventCategory].color 
      }
    })
    
    return styles
  }, [])
  
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center black-han-sans">
        BTS Calendar
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Calendar */}
        <div className="border-2 border-black rounded-xl py-2 px-1 sm:px-2">
          <UICalendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={eventModifiers}
            modifiersStyles={modifierStyles}
            className="w-full"
            showOutsideDays={true}
          />
          
          {/* Event Categories Legend */}
          <div className="my-2 sm:my-3 px-1 sm:px-2 flex flex-wrap justify-center gap-2 sm:gap-3">
            {Object.entries(eventCategories).map(([key, { label, color }]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Date Events - Only shown if events exist */}
        {selectedDateEvents.length > 0 && (
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h3 className="font-bold text-base sm:text-lg mb-3">
              {selectedDate ? safeFormat(selectedDate, "MMMM d, yyyy") : "Selected Date"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedDateEvents.map((event: CalendarEvent) => (
                <EventCard 
                  key={`${event.title}-${event.start}`} 
                  event={event}
                  showAddToCalendarButton
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Upcoming Events with dynamic title */}
        <div className="pt-1">
          <h3 className={`font-bold text-base sm:text-lg mb-3 ${
            todaysDischargeEvents.length > 0 ? "text-green-600" : ""
          }`}>
            {upcomingEventsTitle}
          </h3>
          
          {/* Special celebration banner for discharge day */}
          {todaysDischargeEvents.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-green-100 to-purple-100 border-2 border-green-500 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-green-700 black-han-sans">
                  {todaysDischargeEvents.length === 2 ? "Double Celebration!" : "Special Day!"}
                </p>
                <p className="text-sm text-green-600">
                  {todaysDischargeEvents.length === 2 
                    ? "Both RM and V are coming home today! 🎊" 
                    : "A BTS member is returning from military service today! 🎊"}
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingEvents.map((event: CalendarEvent, index: number) => (
              <EventCard 
                key={`${event.title}-${event.start}`}
                event={event}
                isHighlighted={index === 0 && todaysDischargeEvents.length === 0}
                showAddToCalendarButton
                className={index === 0 ? "sm:col-span-1 lg:col-span-1" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Named export for backward compatibility
export const Calendar = CalendarView
