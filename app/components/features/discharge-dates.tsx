"use client"

import React, { useMemo, useCallback, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { addToGoogleCalendar } from "../../lib/utils"
import { CalendarPlus, ExternalLink, Clock, Calendar } from "lucide-react"
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
  slug: string // Add slug for navigation
}

// Helper function to determine member status based on discharge date
const getMemberStatus = (dischargeDateString: string): "discharged" | "active" => {
  const dischargeDate = new Date(dischargeDateString);
  const today = new Date();
  
  // Set both dates to start of day for accurate comparison
  dischargeDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return today >= dischargeDate ? "discharged" : "active";
}

// BTS Members information with discharge dates
const btsMembers: MemberInfo[] = [
  {
    name: "Jin",
    role: "Vocalist",
    dischargeDateString: DISCHARGE_DATES.Jin,
    dischargeDate: new Date(DISCHARGE_DATES.Jin),
    status: getMemberStatus(DISCHARGE_DATES.Jin),
    initial: "J",
    image: "/images/members/jin.jpg",
    slug: "jin"
  },
  {
    name: "J-Hope",
    role: "Rapper, Dance Leader",
    dischargeDateString: DISCHARGE_DATES.JHope,
    dischargeDate: new Date(DISCHARGE_DATES.JHope),
    status: getMemberStatus(DISCHARGE_DATES.JHope),
    initial: "JH",
    image: "/images/members/jhope.jpg",
    slug: "j-hope"
  },
  {
    name: "RM",
    role: "Leader, Rapper",
    dischargeDateString: DISCHARGE_DATES.RM, 
    dischargeDate: new Date(DISCHARGE_DATES.RM),
    status: getMemberStatus(DISCHARGE_DATES.RM),
    initial: "RM",
    image: "/images/members/rm.jpg",
    slug: "rm"
  },
  {
    name: "Suga",
    role: "Rapper",
    dischargeDateString: DISCHARGE_DATES.Suga,
    dischargeDate: new Date(DISCHARGE_DATES.Suga),
    status: getMemberStatus(DISCHARGE_DATES.Suga),
    initial: "S",
    image: "/images/members/suga.jpg",
    slug: "suga"
  },
  {
    name: "Jimin",
    role: "Vocalist, Lead Dancer",
    dischargeDateString: DISCHARGE_DATES.Jimin,
    dischargeDate: new Date(DISCHARGE_DATES.Jimin),
    status: getMemberStatus(DISCHARGE_DATES.Jimin),
    initial: "JM",
    image: "/images/members/jimin.jpg",
    slug: "jimin"
  },
  {
    name: "V",
    role: "Vocalist",
    dischargeDateString: DISCHARGE_DATES.V,
    dischargeDate: new Date(DISCHARGE_DATES.V),
    status: getMemberStatus(DISCHARGE_DATES.V),
    initial: "V",
    image: "/images/members/v.jpg",
    slug: "v"
  },
  {
    name: "Jungkook",
    role: "Main Vocalist",
    dischargeDateString: DISCHARGE_DATES.Jungkook,
    dischargeDate: new Date(DISCHARGE_DATES.Jungkook),
    status: getMemberStatus(DISCHARGE_DATES.Jungkook),
    initial: "JK",
    image: "/images/members/jungkook.jpg",
    slug: "jungkook"
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

  // Helper function to check if it's discharge day
  const isDischargeDay = (member: MemberInfo): boolean => {
    if (!isClient) return false;
    const today = new Date();
    const dischargeDate = new Date(member.dischargeDateString);
    return today.toDateString() === dischargeDate.toDateString();
  }

  // Helper function to format remaining time in a more engaging way
  const formatRemainingTime = (daysLeft: number): string => {
    if (daysLeft === 0) return "Today is discharge date! 🎉";
    if (daysLeft === 1) return "1 day left! ⭐";
    if (daysLeft <= 7) return `${daysLeft} days left! 🔥`;
    if (daysLeft <= 30) return `${daysLeft} days left`;
    if (daysLeft <= 90) return `${daysLeft} days left`;
    return `${daysLeft} days left`;
  }
  
  // Memoize member data with calculations to avoid recalculating on every render
  const membersWithData = useMemo(() => {
    try {
      return btsMembers.map(member => {
        const daysLeft = getLocalDaysLeft(member.dischargeDate)
        const progress = getLocalProgress(member.dischargeDate)
        const isDischargingToday = isDischargeDay(member)
        
        // Recalculate status dynamically based on current date
        const currentStatus = getMemberStatus(member.dischargeDateString)
        
        // Use consistent formatting for dates - with static dates for SSR
        const formattedDate = isClient
          ? formatDateInLocalFormat(member.dischargeDateString)
          : getFormattedDate(member)
        
        return {
          ...member,
          status: currentStatus, // Use dynamically calculated status
          daysLeft,
          progress,
          formattedDate,
          isDischargingToday
        }
      })
    } catch (error) {
      console.error("Error processing member data:", error);
      return btsMembers.map(member => ({
        ...member,
        status: getMemberStatus(member.dischargeDateString), // Use dynamic status even on error
        daysLeft: 0,
        progress: 0,
        formattedDate: getFormattedDate(member), // Always use static date on error
        isDischargingToday: false
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
              className={`bg-white hover:bg-black/5 rounded-xl p-1 sm:p-2 transition-all duration-200 ${
                member.isDischargingToday ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              role="listitem"
              aria-label={`${member.name} ${member.status === "discharged" ? "has completed" : member.isDischargingToday ? "is discharging today" : `has ${member.daysLeft} days left in`} military service`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Member Photo - Clickable */}
                <Link 
                  href={`/members/${member.slug}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-lg font-bold border-2 transition-all hover:scale-105 hover:shadow-lg duration-200 shrink-0 shadow-sm overflow-hidden cursor-pointer"
                  style={{ 
                    borderColor: member.status === "discharged" || member.isDischargingToday ? "#22c55e" : "#3b82f6",
                  }}
                  aria-label={`View ${member.name}'s profile page`}
                >
                  {imageErrors[member.name] ? (
                    // Fallback to initial if image fails to load
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: member.status === "discharged" || member.isDischargingToday ? "#22c55e20" : "#3b82f620",
                        color: member.status === "discharged" || member.isDischargingToday ? "#22c55e" : "#3b82f6"
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
                </Link>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-0.5 sm:mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {/* Member Name - Clickable */}
                        <Link 
                          href={`/members/${member.slug}`}
                          className="font-bold text-sm sm:text-base text-black truncate hover:text-purple-600 transition-colors duration-200 cursor-pointer"
                          aria-label={`View ${member.name}'s profile page`}
                        >
                          {member.name}
                        </Link>
                        <ExternalLink size={12} className="text-black/40 shrink-0" />
                      </div>
                      <p className="text-xs text-black/60 truncate">{member.role}</p>
                    </div>
                    <div className="text-right shrink-0 ml-1.5">
                      <div className={`text-xs font-medium whitespace-nowrap ${
                        member.status === "discharged" 
                          ? "text-green-600 font-bold" 
                          : member.isDischargingToday 
                            ? "text-green-600 font-bold animate-pulse" 
                            : "text-black"
                      }`}>
                        {member.status === "discharged" 
                          ? "✅ Discharged" 
                          : member.isDischargingToday
                            ? "🎉 Discharge Day!"
                            : formatRemainingTime(member.daysLeft)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-black/60 whitespace-nowrap flex items-center gap-1">
                        <Calendar size={10} />
                        {member.formattedDate}
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  {member.status === "discharged" ? (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex-1 bg-green-100 border border-green-300 rounded-full px-2 py-1">
                        <span className="text-green-700 font-medium">
                          🎉 Successfully completed military service
                        </span>
                      </div>
                    </div>
                  ) : member.isDischargingToday ? (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex-1 bg-green-100 border border-green-300 rounded-full px-2 py-1 animate-pulse">
                        <span className="text-green-700 font-bold">
                          🌟 Today is the big day! Welcome back!
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 sm:gap-2 w-full">
                      {/* Progress Bar with enhanced styling */}
                      <div 
                        className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden border border-black/20" 
                        role="progressbar" 
                        aria-valuemin={0} 
                        aria-valuemax={100} 
                        aria-valuenow={member.progress}
                        aria-label={`${member.progress.toFixed(0)}% of service completed`}
                      >
                        <div 
                          className={`h-full transition-all duration-500 ${
                            member.progress > 90 
                              ? 'bg-gradient-to-r from-green-500 to-green-400' 
                              : member.progress > 70 
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                                : 'bg-gradient-to-r from-blue-500 to-purple-400'
                          }`}
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      
                      {/* Progress Percentage */}
                      <span className="text-xs font-medium text-black/70 min-w-[35px] text-right">
                        {member.progress.toFixed(0)}%
                      </span>
                      
                      {/* Add to Calendar Button */}
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

                  {/* Additional engaging info for active members */}
                  {member.status === "active" && !member.isDischargingToday && (
                    <div className="mt-1 text-[10px] text-black/50 flex items-center gap-1">
                      <Clock size={10} />
                      <span>
                        {member.daysLeft <= 30 
                          ? "Almost there!" 
                          : member.daysLeft <= 90 
                            ? "Getting closer! 💪" 
                            : "Serving with honor 🇰🇷"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fun fact at the bottom */}
        <div className="mt-4 text-center">
          <p className="text-xs text-black/60">
            💜 Click on any member's photo or name to visit their profile page
          </p>
        </div>
      </div>
    </div>
  )
} 
