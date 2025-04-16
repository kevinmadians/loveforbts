"use client"

import React, { useMemo, useCallback, useState, useEffect } from "react"
import Image from "next/image"
import { format, differenceInDays } from "date-fns"
import { toast } from "sonner"
import { addToGoogleCalendar } from "../../lib/utils"
import { safeFormat, getDaysLeft, getProgress, formatCalendarDate } from "../../lib/date-utils"
import { CalendarPlus } from "lucide-react"
import { getCurrentDateInKST, formatKSTDate } from "../../lib/timezone-utils"

type MemberInfo = {
  name: string
  role: string
  dischargeDate: Date
  status: "discharged" | "active"
  initial: string
  image: string // Path to the member's image
}

// BTS Members information with discharge dates
const btsMembers: MemberInfo[] = [
  {
    name: "Jin",
    role: "Vocalist",
    dischargeDate: new Date("2024-06-12T00:00:00+09:00"),
    status: "discharged",
    initial: "J",
    image: "/images/members/jin.jpg" // You'll need to add this image file
  },
  {
    name: "J-Hope",
    role: "Rapper, Dance Leader",
    dischargeDate: new Date("2024-10-17T00:00:00+09:00"),
    status: "discharged",
    initial: "JH",
    image: "/images/members/jhope.jpg" // You'll need to add this image file
  },
  {
    name: "RM",
    role: "Leader, Rapper",
    dischargeDate: new Date("2025-06-10T00:00:00+09:00"),
    status: "active",
    initial: "RM",
    image: "/images/members/rm.jpg" // You'll need to add this image file
  },
  {
    name: "Suga",
    role: "Rapper",
    dischargeDate: new Date("2025-06-21T00:00:00+09:00"),
    status: "active",
    initial: "S",
    image: "/images/members/suga.jpg" // You'll need to add this image file
  },
  {
    name: "Jimin",
    role: "Vocalist, Lead Dancer",
    dischargeDate: new Date("2025-06-11T00:00:00+09:00"),
    status: "active",
    initial: "JM",
    image: "/images/members/jimin.jpg" // You'll need to add this image file
  },
  {
    name: "V",
    role: "Vocalist",
    dischargeDate: new Date("2025-06-11T00:00:00+09:00"),
    status: "active",
    initial: "V",
    image: "/images/members/v.jpg" // You'll need to add this image file
  },
  {
    name: "Jungkook",
    role: "Main Vocalist",
    dischargeDate: new Date("2025-06-11T00:00:00+09:00"),
    status: "active",
    initial: "JK",
    image: "/images/members/jungkook.jpg" // You'll need to add this image file
  }
]

export function DischargeDates() {
  // State to track image loading errors and for refreshing countdown
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [currentDate, setCurrentDate] = useState(getCurrentDateInKST())
  const [isClient, setIsClient] = useState(false)
  
  // Update the current date every minute to ensure countdown is accurate (using KST)
  useEffect(() => {
    setIsClient(true)
    
    const timer = setInterval(() => {
      setCurrentDate(getCurrentDateInKST());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Handle image error
  const handleImageError = (memberName: string) => {
    setImageErrors(prev => ({
      ...prev,
      [memberName]: true
    }))
  }

  // Memoize member data with calculations to avoid recalculating on every render
  const membersWithData = useMemo(() => {
    try {
      return btsMembers.map(member => {
        const daysLeft = getDaysLeft(member.dischargeDate, currentDate)
        const progress = getProgress(member.dischargeDate, currentDate)
        
        return {
          ...member,
          daysLeft,
          progress,
          formattedDate: safeFormat(member.dischargeDate, "MMM d, yyyy", "Unknown date")
        }
      })
    } catch (error) {
      console.error("Error processing member data:", error);
      return btsMembers.map(member => ({
        ...member,
        daysLeft: 0,
        progress: 0,
        formattedDate: "Date unknown"
      }));
    }
  }, [currentDate]) // Re-calculate when currentDate changes
  
  // Memoize the add to calendar handler
  const handleAddToCalendar = useCallback((member: MemberInfo) => {
    try {
      const formattedDate = formatCalendarDate(member.dischargeDate);
      
      const eventDetails = {
        text: `${member.name}'s Military Discharge`,
        dates: {
          start: formattedDate,
          end: formattedDate
        },
        details: `${member.name} (${member.role}) completes military service`,
        location: "South Korea"
      }
      
      addToGoogleCalendar(eventDetails, () => {
        toast.success("Event added to calendar!", {
          description: `${member.name}'s discharge date has been added to your calendar.`,
          action: {
            label: "View Calendar",
            onClick: () => window.open("https://calendar.google.com", "_blank")
          }
        })
      })
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast.error("Failed to add to calendar", {
        description: "An error occurred while adding the event."
      });
    }
  }, [])

  return (
    <div className="bg-white p-2 sm:p-4 rounded-2xl">
      <div 
        className="border-2 border-black rounded-2xl bg-white p-2 sm:p-4"
        role="region" 
        aria-labelledby="discharge-dates-title"
      >
        <h2 
          id="discharge-dates-title" 
          className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center black-han-sans"
        >
          BTS Military Discharge Countdown
        </h2>
        
        <div className="grid gap-1.5 sm:gap-2" role="list">
          {membersWithData.map((member) => (
            <div 
              key={member.name} 
              className="bg-white hover:bg-black/5 rounded-xl p-1 sm:p-2 transition-all duration-200" 
              role="listitem"
              aria-label={`${member.name} ${member.status === "discharged" ? "has completed" : `has ${member.daysLeft} days left in`} military service`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Member Photo */}
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-lg font-bold border-2 transition-transform hover:scale-105 duration-200 shrink-0 shadow-sm overflow-hidden"
                  style={{ 
                    borderColor: member.status === "discharged" ? "#22c55e" : "#3b82f6",
                  }}
                >
                  {imageErrors[member.name] ? (
                    // Fallback to initial if image fails to load
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: member.status === "discharged" ? "#22c55e20" : "#3b82f620",
                        color: member.status === "discharged" ? "#22c55e" : "#3b82f6"
                      }}
                    >
                      {member.initial}
                    </div>
                  ) : (
                    // Display the member's photo with improved quality
                    <Image
                      src={member.image}
                      alt={`Photo of ${member.name}`}
                      width={120}
                      height={120}
                      quality={90}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(member.name)}
                      priority={true}
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-0.5 sm:mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <h3 className="font-bold text-sm sm:text-base text-black truncate">{member.name}</h3>
                      </div>
                      <p className="text-xs text-black/60 truncate">{member.role}</p>
                    </div>
                    <div className="text-right shrink-0 ml-1.5">
                      <div className="text-xs font-medium text-black whitespace-nowrap">
                        {member.status === "discharged" 
                          ? (<span className="text-green-500 font-medium">Discharged</span>) 
                          : `${member.daysLeft} days`}
                      </div>
                      <div className="text-[10px] sm:text-xs text-black/60 whitespace-nowrap">
                        {member.formattedDate}
                      </div>
                    </div>
                  </div>

                  {member.status === "active" && (
                    <div className="flex items-center gap-1 sm:gap-2 w-full">
                      <div 
                        className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden" 
                        role="progressbar" 
                        aria-valuemin={0} 
                        aria-valuemax={100} 
                        aria-valuenow={member.progress}
                        aria-label={`${member.progress.toFixed(0)}% of service completed`}
                      >
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      <button
                        onClick={() => handleAddToCalendar(member)}
                        className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-xs bg-black text-[#FFDE00] hover:bg-black/90 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 ease-out font-medium"
                        aria-label={`Add ${member.name}'s discharge date to calendar`}
                      >
                        <CalendarPlus size={14} className="mr-1" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 