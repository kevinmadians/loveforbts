"use client"

import Image from "next/image"
import Link from "next/link"
import { MemberData } from "@/app/lib/members-data"
import { Instagram, TwitterIcon, ExternalLink } from "lucide-react"

interface MemberDetailLayoutProps {
  member: MemberData
  customHeading?: string
  customDescription?: string
}

export function MemberDetailLayout({ member, customHeading, customDescription }: MemberDetailLayoutProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Custom Heading and Description */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 black-han-sans">
          {customHeading || member.name}
        </h1>
        {customDescription && (
          <p className="text-lg max-w-3xl mx-auto">{customDescription}</p>
        )}
      </div>
      
      {/* Hero Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Member Image */}
          <div className="md:w-1/3 h-[300px] md:h-auto relative">
            <Image
              src={member.image}
              alt={`BTS ${member.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          
          {/* Member Info */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 black-han-sans">
              {member.name}
            </h2>
            <p className="text-lg text-gray-600 mb-3">{member.stageName}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
              <div>
                <span className="text-sm font-semibold">Full Name:</span>
                <p>{member.fullName}</p>
              </div>
              <div>
                <span className="text-sm font-semibold">Position:</span>
                <p>{member.role}</p>
              </div>
              <div>
                <span className="text-sm font-semibold">Birthday:</span>
                <p>{member.birthDate}</p>
              </div>
              <div>
                <span className="text-sm font-semibold">Birthplace:</span>
                <p>{member.birthPlace}</p>
              </div>
              <div>
                <span className="text-sm font-semibold">Height:</span>
                <p>{member.height}</p>
              </div>
              <div>
                <span className="text-sm font-semibold">Blood Type:</span>
                <p>{member.bloodType}</p>
              </div>
            </div>
            
            {/* Social Media */}
            {member.socialMedia && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Official Accounts:</h3>
                <div className="flex flex-wrap gap-3">
                  {member.socialMedia.instagram && (
                    <a 
                      href={member.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors flex items-center"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <Instagram size={20} />
                      <span className="ml-1 text-sm">Instagram</span>
                    </a>
                  )}
                  {member.socialMedia.twitter && (
                    <a 
                      href={member.socialMedia.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors flex items-center"
                      aria-label={`${member.name}'s X (Twitter)`}
                    >
                      <TwitterIcon size={20} />
                      <span className="ml-1 text-sm">X</span>
                    </a>
                  )}
                  {member.socialMedia.tiktok && (
                    <a 
                      href={member.socialMedia.tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center"
                      aria-label={`${member.name}'s TikTok`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      <span className="ml-1 text-sm">TikTok</span>
                    </a>
                  )}
                  {member.socialMedia.weverse && (
                    <a 
                      href={member.socialMedia.weverse} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors flex items-center"
                      aria-label={`${member.name}'s Weverse`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm2.259 13.532l-1.512-1.512a.844.844 0 0 0-1.193 0l-1.512 1.512a.844.844 0 0 1-1.193-1.193l3.107-3.107a.844.844 0 0 1 1.193 0l3.107 3.107a.844.844 0 0 1-1.193 1.193h.001zm.597-5.683H9.144a.844.844 0 0 1 0-1.688h5.712a.844.844 0 0 1 0 1.688z" />
                      </svg>
                      <span className="ml-1 text-sm">Weverse</span>
                    </a>
                  )}
                  {member.socialMedia.other && (
                    <a 
                      href={member.socialMedia.other} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                      aria-label={`${member.name}'s Website`}
                    >
                      <ExternalLink size={20} />
                      <span className="ml-1 text-sm">Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Biography Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Biography</h2>
        <div className="prose max-w-none">
          {member.biography.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* Two Column Section - Fun Facts and Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Fun Facts */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Fun Facts</h2>
          <ul className="space-y-2">
            {member.funFacts.map((fact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Achievements */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Achievements</h2>
          <ul className="space-y-2">
            {member.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-500 font-bold mr-2">★</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 