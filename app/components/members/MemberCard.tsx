"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useEffect, useState } from "react"
import { getRandomMemberPhoto } from "@/app/lib/member-photos"
import { usePathname } from "next/navigation"

export interface MemberCardProps {
  name: string
  role: string
  image: string
  slug: string
  shortBio: string
}

export function MemberCard({ name, role, image, slug, shortBio }: MemberCardProps) {
  // Convert member name to path-friendly format
  const memberPath = useMemo(() => `/members/${slug}`, [slug])
  const pathname = usePathname()
  
  // State to track initial render and store the image
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [memberImage, setMemberImage] = useState(image)
  
  // This useEffect will run only on client-side with a small delay
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === "/members") {
      const timer = setTimeout(() => {
        // First mark that we're past initial render
        setIsInitialRender(false)
        
        // Then update the image
        setMemberImage(getRandomMemberPhoto(slug))
      }, 100); // Small delay to ensure we're past hydration
      
      return () => clearTimeout(timer);
    }
  }, [slug, pathname]);

  // Handle potential image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder-member.jpg" // Fallback image
  }

  // Only use varied photo after initial render is complete
  const imageSrc = !isInitialRender && pathname === "/members" 
    ? memberImage 
    : image;

  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <Link href={memberPath} className="block h-full">
        <div className="relative h-60 w-full">
          <Image
            src={imageSrc}
            alt={`BTS member ${name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
            priority={true}
            onError={handleImageError}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold black-han-sans mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{role}</p>
          <p className="text-sm line-clamp-3">{shortBio}</p>
        </div>
      </Link>
    </div>
  )
} 
