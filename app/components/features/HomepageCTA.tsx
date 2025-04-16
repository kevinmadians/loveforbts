"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Heart, MessageSquare, BadgeCheck } from "lucide-react"

type CtaCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  bgColor: string
  buttonText: string
  iconColor: string
}

const CtaCard = ({ title, description, icon, href, bgColor, buttonText, iconColor }: CtaCardProps) => {
  return (
    <div className={`${bgColor} rounded-2xl border-2 border-black p-6 h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1`}>
      <div className={`${iconColor} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 black-han-sans">{title}</h3>
      <p className="mb-5">{description}</p>
      <Link 
        href={href} 
        className="mt-auto bg-black text-[#FFDE00] py-2 px-4 rounded-md inline-flex items-center justify-center hover:bg-purple-900 transition-colors black-han-sans"
      >
        {buttonText}
      </Link>
    </div>
  )
}

export function HomepageCTA() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center black-han-sans">
        Explore Our ARMY Community
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Members CTA */}
        <CtaCard 
          title="Meet the Members"
          description="Discover details about all seven BTS members, their achievements, personalities, fun facts, and what makes each one special."
          icon={<Users size={24} className="text-white" />}
          href="/members"
          bgColor="bg-purple-100"
          iconColor="bg-purple-600"
          buttonText="Meet BTS"
        />
        
        {/* ARMY Story CTA */}
        <CtaCard 
          title="Share Your Story"
          description="Every ARMY has a unique story about how BTS changed their life. Share yours and connect with others who understand your love for Bangtan."
          icon={<Heart size={24} className="text-white" />}
          href="/army-story"
          bgColor="bg-pink-100"
          iconColor="bg-pink-600"
          buttonText="Tell Your Story"
        />
        
        {/* Messages CTA */}
        <CtaCard 
          title="Global ARMY Messages"
          description="Send messages of support, see what ARMYs from around the world are saying, and feel the global connection that BTS has created."
          icon={<MessageSquare size={24} className="text-white" />}
          href="/messages"
          bgColor="bg-blue-100"
          iconColor="bg-blue-600"
          buttonText="Join the Conversation"
        />
        
        {/* ARMY Card CTA */}
        <CtaCard 
          title="Create ARMY Card"
          description="Generate your personalized ARMY card featuring your bias! Choose your details, download your card, and share it with the community."
          icon={<BadgeCheck size={24} className="text-white" />}
          href="/army-card"
          bgColor="bg-[#fff9cc]"
          iconColor="bg-[#FFDE00]"
          buttonText="Create Your Card"
        />
      </div>
      
      {/* Featured / Spotlight Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-100 to-[#fff9cc] rounded-2xl border-2 border-black p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-4 black-han-sans">
            The Countdown Has Begun!
          </h3>
          <p className="text-lg mb-6">
            BTS will reunite after their military service is complete. Join our community to track important dates, celebrate milestones, and prepare for their return together.
          </p>
          <Link 
            href="/#countdown" 
            className="bg-black text-[#FFDE00] py-3 px-6 rounded-md inline-flex items-center justify-center hover:bg-purple-900 transition-colors black-han-sans"
          >
            See the Countdown
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>
    </div>
  )
} 