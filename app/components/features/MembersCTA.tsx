"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { membersData } from '@/app/lib/members-data'
import { getRandomMemberPhoto } from '@/app/lib/member-photos'

export function MembersCTA() {
  // Use two separate arrays for images
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [memberImages, setMemberImages] = useState<{[key: string]: string}>({});
  
  // This useEffect will run only on client-side
  useEffect(() => {
    // Prevent change during SSR/first render to avoid hydration issues
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        // First mark that we're past the initial render/hydration phase
        setIsInitialRender(false)
        
        // Then prepare the images
        const images: {[key: string]: string} = {};
        membersData.forEach(member => {
          images[member.slug] = getRandomMemberPhoto(member.slug);
        });
        
        // Finally update the state with all images at once
        setMemberImages(images);
      }, 100); // Small delay to ensure we're past hydration
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">Meet the Members</h2>
      
      <div className="text-center mb-4">
        <p className="mb-4">Get to know all seven BTS members - their stories, talents, and what makes each one special.</p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 mb-4">
        {membersData.map((member) => {
          // Only use varied photos after initial render is complete
          const imageSrc = !isInitialRender && memberImages[member.slug] 
            ? memberImages[member.slug] 
            : member.image;
            
          return (
            <Link
              key={member.slug}
              href={`/members/${member.slug}`}
              className="relative aspect-square overflow-hidden border-2 border-black rounded-lg transition transform hover:scale-105 hover:shadow-md"
            >
              <Image
                src={imageSrc}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 14vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                <span className="text-white text-xs md:text-sm font-bold">{member.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-2">
        <Link 
          href="/members" 
          className="bg-black text-[#FFDE00] py-3 px-6 rounded-md inline-flex items-center justify-center hover:bg-purple-900 transition-colors black-han-sans"
        >
          Explore All Members
        </Link>
      </div>
    </div>
  )
} 