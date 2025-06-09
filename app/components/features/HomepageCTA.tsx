"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Heart, MessageSquare, BadgeCheck, HeartHandshake } from "lucide-react"

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
        className="mt-auto bg-black py-2 px-4 rounded-md inline-flex items-center justify-center hover:bg-purple-900 transition-colors black-han-sans"
        style={{ color: 'var(--bts-accent)' }}
      >
        {buttonText}
      </Link>
    </div>
  )
}

export function HomepageCTA() {
  // Handle scroll to countdown
  const scrollToCountdown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Find the countdown element
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
      // Get the countdown's dimensions and position
      const rect = countdownElement.getBoundingClientRect();
      
      // Calculate position considering device viewport
      const isMobile = window.innerWidth < 768;
      const viewportHeight = window.innerHeight;
      
      // Adjust offset based on device size to match the screenshot exactly
      let scrollOffset = 0;
      
      if (isMobile) {
        // On mobile, we want to show the "BTS REUNION" text with
        // the date and progress bar as shown in the screenshot
        
        // Height of the navbar (approximate, could be made more precise)
        const navbarHeight = 56;
        
        // Additional space to position the header section in view
        // This ensures "BTS REUNION" is visible at the top of the viewport
        // after scrolling completes, similar to the screenshot
        const headerOffset = 20; 
        
        // For smaller screens, adjust differently to ensure a good view
        if (viewportHeight < 667) { // iPhone SE or similar
          scrollOffset = -(navbarHeight + 30);
        } else if (viewportHeight < 812) { // iPhone X or similar
          scrollOffset = -(navbarHeight + 50);
        } else { // Larger phones
          scrollOffset = -(navbarHeight + 70); 
        }
      }
      
      // Calculate final scroll position
      const scrollToY = window.scrollY + rect.top + scrollOffset;
      
      // Scroll with smooth behavior
      window.scrollTo({
        top: scrollToY,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center black-han-sans">
        Explore ARMY Community
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
                      iconColor="bg-bts-accent"
          buttonText="Create Your Card"
        />
      </div>
      
      {/* Featured / Spotlight Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-100 to-[#fff9cc] rounded-2xl border-2 border-black p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 md:w-1/3">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full bg-black rounded-2xl"></div>
              <div className="relative border-2 border-black bg-white p-4 rounded-2xl shadow-lg">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <Image 
                    src="/images/bts-group-reunion.jpg" 
                    alt="BTS Group Reunion" 
                    width={400} 
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4 black-han-sans">
              The Countdown Has Begun!
            </h3>
            <p className="text-lg mb-6">
              BTS will reunite after their military service is complete. Join our community to track important dates, celebrate milestones, and prepare for their return together.
            </p>
            <button 
              onClick={scrollToCountdown}
              className="bg-black py-3 px-6 rounded-md inline-flex items-center justify-center hover:bg-purple-900 transition-colors black-han-sans"
            style={{ color: 'var(--bts-accent)' }}
            >
              See the Countdown
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>
      
      {/* Support CTA Section */}
      <div className="mt-8 bg-gradient-to-r from-[#ffe6e6] to-[#fff0cc] rounded-2xl border-2 border-black p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-full border-2 border-black shadow-md">
            <HeartHandshake size={48} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 black-han-sans">Support Our ARMY Community</h3>
            <p className="mb-4">
              Help us maintain this space where we celebrate our love for BTS. Your contribution makes a difference in keeping our community vibrant!
            </p>
            <Link 
              href="/support" 
              className="text-black py-2 px-6 rounded-md inline-flex items-center justify-center transition-colors shadow-sm border-2 border-black black-han-sans"
              style={{ backgroundColor: 'var(--bts-accent)' }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
            >
              Support ARMY 💜
            </Link>
          </div>
        </div>
        
        {/* Decorative Hearts */}
        <div className="absolute right-2 bottom-2 opacity-10 pointer-events-none">
          <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
