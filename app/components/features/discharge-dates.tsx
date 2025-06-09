"use client"

import React, { useMemo, useCallback, useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { addToGoogleCalendar } from "../../lib/utils"
import { CalendarPlus } from "lucide-react"
import { 
  getCurrentDate,
  getLocalDaysLeft, 
  getLocalProgress, 
  formatLocalCalendarDate, 
  formatDateInLocalFormat 
} from "../../lib/user-timezone-utils"

// Define discharge dates without timezone to use user's local timezone
const DISCHARGE_DATES = {
  Jin: "2024-06-12",
  JHope: "2024-10-17",
  RM: "2025-06-10",
  Suga: "2025-06-21",
  Jimin: "2025-06-11",
  V: "2025-06-10",
  Jungkook: "2025-06-11"
}

// Consistent static date formatting for non-client rendering
const FORMATTED_DATES = {
  Jin: "Jun 12, 2024",
  JHope: "Oct 17, 2024",
  RM: "Jun 10, 2025",
  Suga: "Jun 21, 2025",
  Jimin: "Jun 11, 2025",
  V: "Jun 10, 2025",
  Jungkook: "Jun 11, 2025"
}

type MemberInfo = {
  name: string
  role: string
  dischargeDateString: string
  dischargeDate: Date
  status: "discharged" | "active"
  initial: string
  image: string 
}

// BTS Members information with discharge dates
const btsMembers: MemberInfo[] = [
  {
    name: "Jin",
    role: "Vocalist",
    dischargeDateString: DISCHARGE_DATES.Jin,
    dischargeDate: new Date(DISCHARGE_DATES.Jin),
    status: "discharged",
    initial: "J",
    image: "/images/members/jin.jpg"
  },
  {
    name: "J-Hope",
    role: "Rapper, Dance Leader",
    dischargeDateString: DISCHARGE_DATES.JHope,
    dischargeDate: new Date(DISCHARGE_DATES.JHope),
    status: "discharged",
    initial: "JH",
    image: "/images/members/jhope.jpg"
  },
  {
    name: "RM",
    role: "Leader, Rapper",
    dischargeDateString: DISCHARGE_DATES.RM, 
    dischargeDate: new Date(DISCHARGE_DATES.RM),
    status: "active",
    initial: "RM",
    image: "/images/members/rm.jpg"
  },
  {
    name: "Suga",
    role: "Rapper",
    dischargeDateString: DISCHARGE_DATES.Suga,
    dischargeDate: new Date(DISCHARGE_DATES.Suga),
    status: "active",
    initial: "S",
    image: "/images/members/suga.jpg"
  },
  {
    name: "Jimin",
    role: "Vocalist, Lead Dancer",
    dischargeDateString: DISCHARGE_DATES.Jimin,
    dischargeDate: new Date(DISCHARGE_DATES.Jimin),
    status: "active",
    initial: "JM",
    image: "/images/members/jimin.jpg"
  },
  {
    name: "V",
    role: "Vocalist",
    dischargeDateString: DISCHARGE_DATES.V,
    dischargeDate: new Date(DISCHARGE_DATES.V),
    status: "active",
    initial: "V",
    image: "/images/members/v.jpg"
  },
  {
    name: "Jungkook",
    role: "Main Vocalist",
    dischargeDateString: DISCHARGE_DATES.Jungkook,
    dischargeDate: new Date(DISCHARGE_DATES.Jungkook),
    status: "active",
    initial: "JK",
    image: "/images/members/jungkook.jpg"
  }
]

export function DischargeDates() {
  // State to track image loading errors and for refreshing countdown
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [currentDate, setCurrentDate] = useState(getCurrentDate())
  const [isClient, setIsClient] = useState(false)
  
  // Update the current date every minute to ensure countdown is accurate
  useEffect(() => {
    setIsClient(true)
    
    const timer = setInterval(() => {
      setCurrentDate(getCurrentDate());
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

  // Helper function to get static formatted date for SSR
  const getFormattedDate = (member: MemberInfo): string => {
    if (member.name === "Jin") return FORMATTED_DATES.Jin;
    if (member.name === "J-Hope") return FORMATTED_DATES.JHope;
    if (member.name === "RM") return FORMATTED_DATES.RM;
    if (member.name === "Suga") return FORMATTED_DATES.Suga;
    if (member.name === "Jimin") return FORMATTED_DATES.Jimin;
    if (member.name === "V") return FORMATTED_DATES.V;
    if (member.name === "Jungkook") return FORMATTED_DATES.Jungkook;
    return "Unknown date";
  }
  
  // Memoize member data with calculations to avoid recalculating on every render
  const membersWithData = useMemo(() => {
    try {
      return btsMembers.map(member => {
        const daysLeft = getLocalDaysLeft(member.dischargeDate)
        const progress = getLocalProgress(member.dischargeDate)
        
        // Use consistent formatting for dates - with static dates for SSR
        const formattedDate = isClient
          ? formatDateInLocalFormat(member.dischargeDateString)
          : getFormattedDate(member)
        
        return {
          ...member,
          daysLeft,
          progress,
          formattedDate
        }
      })
    } catch (error) {
      console.error("Error processing member data:", error);
      return btsMembers.map(member => ({
        ...member,
        daysLeft: 0,
        progress: 0,
        formattedDate: getFormattedDate(member) // Always use static date on error
      }));
    }
  }, [currentDate, isClient]) // Re-calculate when currentDate or isClient changes
  
  // Memoize the add to calendar handler
  const handleAddToCalendar = useCallback((member: MemberInfo) => {
    try {
      const eventDetails = {
        text: `${member.name}'s Military Discharge`,
        dates: {
          // Just pass the date string for Google Calendar - the formatLocalCalendarDate will be called in utils
          start: member.dischargeDateString,
          end: member.dischargeDateString
        },
        details: `${member.name} (${member.role}) completes military service`,
        location: "South Korea"
      }
      
      addToGoogleCalendar(eventDetails, () => {
        toast.success("Event added to calendar!", {
          description: `${member.name}'s discharge date (${getFormattedDate(member)}) has been added to your calendar.`,
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
                        className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-xs bg-black text-bts-accent hover:bg-black/90 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 ease-out font-medium"
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
