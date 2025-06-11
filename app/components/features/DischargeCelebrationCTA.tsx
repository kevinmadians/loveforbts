"use client"

import React, { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, Heart, Calendar, Sparkles } from "lucide-react"
import { calendarEvents } from "../../lib/calendar-data"

export function DischargeCelebrationCTA() {
  const [isClient, setIsClient] = useState(false);

  // Check if today has any discharge events
  const todaysDischargeEvents = useMemo(() => {
    const today = new Date();
    return calendarEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString() && 
             event.category === 'military';
    });
  }, []);

  // Get discharged member names
  const dischargedMembers = useMemo(() => {
    return todaysDischargeEvents.map(event => {
      if (event.title.includes("RM")) return "RM";
      if (event.title.includes("V's")) return "V";
      if (event.title.includes("Jin")) return "Jin";
      if (event.title.includes("J-Hope")) return "J-Hope";
      if (event.title.includes("Suga")) return "Suga";
      if (event.title.includes("Jimin")) return "Jimin";
      if (event.title.includes("Jungkook")) return "Jungkook";
      return "Member";
    });
  }, [todaysDischargeEvents]);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render if no discharge events today
  if (todaysDischargeEvents.length === 0) {
    return null;
  }

  const isMultipleMembers = dischargedMembers.length > 1;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden bg-gradient-to-r from-green-100 via-purple-50 to-green-100 border-2 border-green-500 rounded-2xl p-6 shadow-lg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-30 animate-bounce delay-500">
            <img 
              src="/images/bts-logo-purple.png" 
              alt="BTS Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 text-center">
          {/* Celebration Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-bounce">
            <img 
              src="/images/bts-logo-purple.png" 
              alt="BTS Logo" 
              className="w-15 h-15 object-contain"
            />
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl md:text-xl font-bold mb-2 black-han-sans text-green-700">
            {isMultipleMembers 
              ? `${dischargedMembers.join(" & ")} Are Home!`
              : `Welcome Home ${dischargedMembers[0]}!`}
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-l mb-4 text-green-600 font-medium">
            {isMultipleMembers 
              ? "Both members have successfully completed their military service!"
              : "They have successfully completed their military service!"}
          </p>

          {/* Description */}
          <p className="text-base md:text-l mb-6 text-gray-700 max-w-2xl mx-auto">
            This is a special day for ARMY! Join fellow fans around the world in celebrating 
            {isMultipleMembers ? " their " : ` ${dischargedMembers[0]}'s `}
            safe return. Send your congratulations and love messages!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - Send Message */}
            <Link
              href="/messages/create"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold text-lg transition-all duration-200 hover:bg-green-700 hover:scale-105 hover:shadow-lg black-han-sans group"
            >
              <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Send Celebration Message
            </Link>

            {/* Secondary CTA - View Messages */}
            <Link
              href="/messages"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg font-bold text-lg transition-all duration-200 hover:bg-green-50 hover:scale-105 black-han-sans"
            >
              <Heart className="w-5 h-5 mr-2" />
              View All Messages
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Discharge Date: Today!</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-600" />
              <span>Join thousands of ARMY celebrating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 