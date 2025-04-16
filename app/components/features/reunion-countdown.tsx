"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { getDaysLeft } from "../../lib/date-utils"
import { updateHeartClicks, getHeartClicks } from "../../lib/supabase-service"
import { toast } from "sonner"
import Image from "next/image"
import { getCurrentDateInKST, formatKSTDate } from "../../lib/timezone-utils"
import { Calendar } from "lucide-react"

type CountdownUnit = {
  value: number
  label: string
  max: number
  progress: number
}

export function ReunionCountdown() {
  // BTS reunion date - June 21, 2025 (with timezone information)
  const reunionDate = useMemo(() => new Date("2025-06-21T00:00:00+09:00"), [])
  // Use client-side only state (with KST)
  const [currentDate, setCurrentDate] = useState(() => getCurrentDateInKST())
  const [isClient, setIsClient] = useState(false)
  
  // Heart button clicks state
  const [heartClicks, setHeartClicks] = useState({ today: 0, total: 0 })
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const [isUpdatingClicks, setIsUpdatingClicks] = useState(false)
  
  // Only run animations and updates on the client
  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true)
    
    // Update the current date every second for a smooth countdown (using KST)
    const timer = setInterval(() => {
      setCurrentDate(getCurrentDateInKST())
    }, 1000)
    
    // Load heart clicks from Supabase
    const loadHeartClicks = async () => {
      try {
        const clickData = await getHeartClicks()
        setHeartClicks(clickData)
      } catch (error) {
        console.error('Error loading heart clicks from Supabase:', error)
      }
    }
    
    if (typeof window !== 'undefined') {
      loadHeartClicks()
      
      // Refresh heart clicks every minute
      const refreshInterval = setInterval(() => {
        loadHeartClicks()
      }, 60000)
      
      return () => {
        clearInterval(timer)
        clearInterval(refreshInterval)
      }
    }
    
    return () => clearInterval(timer)
  }, [])
  
  // Handle heart button click
  const handleHeartClick = useCallback(async () => {
    if (isUpdatingClicks) return
    
    setShowHeartAnimation(true)
    setIsUpdatingClicks(true)
    
    try {
      // Update clicks in Supabase
      const updatedClicks = await updateHeartClicks()
      
      // Update local state
      setHeartClicks(updatedClicks)
      
      // Random encouraging messages that appear occasionally
      const messages = [
        "Your purple heart means so much! 💜",
        "BTS loves ARMY! 💜",
        "Borahae! 보라해! 💜",
        "You're part of BTS history! 💜",
        "Let's make this reunion special! 💜"
      ]
      
      // Show toast message randomly (20% chance)
      if (Math.random() < 0.2) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        toast.success(randomMessage, {
          duration: 3000,
          position: "bottom-center"
        })
      }
    } catch (error) {
      console.error('Error updating heart clicks:', error)
      // Increment locally as fallback
      setHeartClicks(prev => ({
        today: prev.today + 1,
        total: prev.total + 1
      }))
    } finally {
      setIsUpdatingClicks(false)
      
      // Remove animation after a short delay
      setTimeout(() => {
        setShowHeartAnimation(false)
      }, 700)
    }
  }, [isUpdatingClicks])
  
  // Calculate time remaining
  const timeUnits = useMemo(() => {
    try {
      // If we're on the server or haven't hydrated yet, return static values
      if (!isClient) {
        return [
          { value: 0, label: "Days", max: 365, progress: 0 },
          { value: 0, label: "Hours", max: 24, progress: 0 },
          { value: 0, label: "Minutes", max: 60, progress: 0 },
          { value: 0, label: "Seconds", max: 60, progress: 0 }
        ]
      }
      
      const totalSeconds = Math.max(0, Math.floor((reunionDate.getTime() - currentDate.getTime()) / 1000))
      
      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = Math.floor(totalSeconds % 60)
      
      // Calculate progress percentages for each unit
      // For days, we're using the total days from now to reunion
      const maxDays = 548 // Approximately 18 months total service time
      const daysProgress = 100 - ((days / maxDays) * 100)
      
      // For other units, we use their natural cycles
      const hoursProgress = 100 - ((hours / 24) * 100)
      const minutesProgress = 100 - ((minutes / 60) * 100)
      const secondsProgress = 100 - ((seconds / 60) * 100)
      
      return [
        { value: days, label: "Days", max: maxDays, progress: daysProgress },
        { value: hours, label: "Hours", max: 24, progress: hoursProgress },
        { value: minutes, label: "Minutes", max: 60, progress: minutesProgress },
        { value: seconds, label: "Seconds", max: 60, progress: secondsProgress }
      ]
    } catch (error) {
      console.error("Error calculating countdown:", error)
      return [
        { value: 0, label: "Days", max: 365, progress: 0 },
        { value: 0, label: "Hours", max: 24, progress: 0 },
        { value: 0, label: "Minutes", max: 60, progress: 0 },
        { value: 0, label: "Seconds", max: 60, progress: 0 }
      ]
    }
  }, [currentDate, reunionDate, isClient])

  // Check if countdown is complete (client-side only)
  const isComplete = isClient && timeUnits[0].value === 0 && 
                    timeUnits[1].value === 0 && 
                    timeUnits[2].value === 0 && 
                    timeUnits[3].value === 0

  // Calculate days left for progress bar (client-side only)
  const daysLeft = isClient ? getDaysLeft(reunionDate, currentDate) : 0
  const totalDays = 548 // Approximately 18 months of service
  const progressPercentage = isClient ? Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100)) : 0
  
  // Format the reunion date in KST
  const formattedReunionDate = useMemo(() => {
    return "June 21, 2025";
  }, []);
  
  // Create a descriptive text for screen readers
  const screenReaderText = isComplete
    ? "BTS reunion has happened! All members have completed their military service and are back together."
    : `Countdown to BTS reunion on ${formattedReunionDate}. ${timeUnits[0].value} days, ${timeUnits[1].value} hours, ${timeUnits[2].value} minutes, and ${timeUnits[3].value} seconds remaining. ${progressPercentage.toFixed(0)}% of the waiting time has passed.`

  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Get countdown gradient color based on progress
  const getProgressGradient = (progress: number) => {
    return `linear-gradient(to right, #9F7AEA, #3182CE ${progress}%, rgba(0, 0, 0, 0.1) ${progress}%)`
  }

  return (
    <div 
      className="bg-white p-4 sm:p-6 rounded-3xl mb-10 relative overflow-hidden" 
      role="region" 
      aria-labelledby="reunion-countdown-title"
    >
      {/* Screen reader description */}
      <div className="sr-only" aria-live="polite">
        {screenReaderText}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-16 h-16 rotate-12 opacity-20" aria-hidden="true">
        <div className="w-full h-full bg-purple-600 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-20 h-20 -rotate-12 opacity-20" aria-hidden="true">
        <div className="w-full h-full bg-purple-600 rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="border-2 border-black rounded-2xl bg-white p-4 sm:p-6 shadow-lg relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-center black-han-sans relative"
            id="reunion-countdown-title"
          >
            <span className="text-purple-600">BTS</span>{" "}
            <span className="relative inline-block">
              REUNION
              <span className="absolute -top-1 -right-1 text-xs bg-purple-600 text-white px-1 rounded-full animate-bounce" aria-hidden="true">
                2025
              </span>
            </span>
          </h2>
        </div>
        
        <h3 className="text-sm sm:text-base md:text-lg mb-6 text-center font-medium">
          All members together after military service on{" "}
          <span className="font-bold text-purple-600">{formattedReunionDate}</span>
        </h3>
        
        {/* Main progress bar - client-side only rendering for the actual progress */}
        <div
          className="h-4 bg-black/10 rounded-full mb-6 overflow-hidden border border-black/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercentage}
          aria-label={`${progressPercentage.toFixed(0)}% of time passed until BTS reunion`}
        >
          {isClient ? (
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 animate-shimmer-bg relative"
              style={{ width: `${progressPercentage}%` }}
            />
          ) : (
            <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 w-0 transition-all duration-500" />
          )}
        </div>
        
        {isComplete ? (
          <div 
            className="text-center py-10 relative"
            aria-live="polite" 
            aria-atomic="true"
          >
            {/* Confetti animation would go here in production */}
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 black-han-sans mb-2 animate-bounce">
              BTS IS BACK! 💜
            </h3>
            <p className="text-lg">The wait is over! All members have completed their military service!</p>
            
            <div className="flex justify-center mt-6" aria-hidden="true">
              <div className="flex space-x-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-purple-600 animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Countdown to BTS reunion: ${timeUnits[0].value} days, ${timeUnits[1].value} hours, ${timeUnits[2].value} minutes, and ${timeUnits[3].value} seconds remaining`}
          >
            {timeUnits.map((unit, index) => (
              <div 
                key={unit.label} 
                className="flex flex-col items-center justify-center rounded-xl p-3 sm:p-4 shadow-md relative overflow-hidden group"
                style={{
                  backgroundColor: "#1D1D1D",
                  borderBottom: "4px solid #9E4EF9"
                }}
                aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
              >
                {/* Flip animation on seconds change */}
                <div className={`transform transition-all duration-500 ${isClient && index === 3 && unit.value % 2 === 0 ? 'scale-105' : 'scale-100'}`}>
                  <span className="text-3xl sm:text-4xl md:text-6xl font-bold black-han-sans text-[#FFDE00]">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs sm:text-sm mt-1 font-medium text-white">
                  {unit.label}
                </span>
                
                {/* Unit-specific progress bar */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FFDE00] to-purple-500 transition-all duration-500"
                  style={{ 
                    width: `${unit.progress}%`,
                    opacity: 0.7
                  }}
                ></div>
                
                {/* Hover effect */}
                <div 
                  className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  aria-hidden="true"
                ></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Interactive heart button and stats */}
        <div className="mt-8 text-center">
          {/* Add to Calendar Button */}
          <button
            onClick={() => {
              // Create calendar event data
              const eventTitle = "BTS Full Group Reunion"
              const eventDescription = "All BTS members have completed their military service and are reunited as a full group."
              const eventLocation = "South Korea"
              const eventStartDate = "2025-06-21T00:00:00+09:00"
              const eventEndDate = "2025-06-22T00:00:00+09:00"
              
              // Generate .ics file content
              const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
DTSTART:${new Date(eventStartDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
DTEND:${new Date(eventEndDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
              
              // Create the download
              const element = document.createElement('a');
              element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent));
              element.setAttribute('download', 'bts-reunion.ics');
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
              
              toast.success("BTS Reunion date added to your calendar!", {
                duration: 3000,
                position: "bottom-center"
              });
            }}
            className="inline-flex items-center justify-center gap-2 bg-black text-[#FFDE00] py-2 px-4 rounded-lg mb-4 hover:bg-purple-900 transition-colors black-han-sans border-2 border-[#FFDE00]"
            aria-label="Add BTS reunion to your calendar"
          >
            <Calendar size={18} />
            <span>Add to Calendar</span>
          </button>
          
          <p className="text-base sm:text-lg font-medium mb-4">Show your support for BTS!</p>
          
          <div>
            {/* Heart button */}
            <button
              onClick={handleHeartClick}
              className="heart-button relative transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full"
              aria-label="Show support for BTS by clicking the heart"
            >
              <span className="text-5xl sm:text-6xl">💜</span>
              
              {/* Heart click effect animation */}
              {showHeartAnimation && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="heart-click-effect" aria-hidden="true">
                    <span className="text-5xl sm:text-6xl">💜</span>
                  </div>
                </div>
              )}
            </button>
            
            {/* Counter stats */}
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider text-gray-500">Today</span>
                <div className="text-lg font-bold text-purple-600">{formatNumber(heartClicks.today)}</div>
              </div>
              <div className="h-4 border-r border-gray-300 hidden sm:block"></div>
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider text-gray-500">All Time</span>
                <div className="text-lg font-bold text-purple-600">{formatNumber(heartClicks.total)}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional motivation message */}
        <p className="text-center mt-4 text-sm sm:text-base font-medium">
          We're counting down to the moment when{" "}
          <span className="font-bold text-purple-600">all 7 members</span> reunite as one!
        </p>
      </div>
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes heartClickEffect {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-shimmer-bg {
          animation: shimmer 3s linear infinite;
          background-size: 200% 100%;
        }
        
        .heartbeat-animation {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .member-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .member-wave-0 { animation-delay: 0s; }
        .member-wave-1 { animation-delay: 0.2s; }
        .member-wave-2 { animation-delay: 0.4s; }
        .member-wave-3 { animation-delay: 0.6s; }
        .member-wave-4 { animation-delay: 0.8s; }
        .member-wave-5 { animation-delay: 1.0s; }
        .member-wave-6 { animation-delay: 1.2s; }
        
        .bg-pattern {
          background-image: radial-gradient(circle, #9E4EF9 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .heart-button {
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }
        
        .heart-button:hover {
          transform: scale(1.1);
        }
        
        .heart-button:active {
          transform: scale(0.95);
        }
        
        .heart-click-effect {
          animation: heartClickEffect 0.7s ease-out forwards;
          position: absolute;
          opacity: 0;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}