"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate, truncateText } from "@/app/lib/utils"
import { type SupabaseArmyStory } from "@/app/lib/supabase"
import { getCountryCode } from "@/app/lib/country-codes"

interface StoryCardProps {
  story: SupabaseArmyStory
  isHighlighted?: boolean
  className?: string
}

// Simple function to convert markdown to plain text for preview
function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic
    .replace(/## (.*?)(\n|$)/g, '$1') // Remove headings
    .replace(/- (.*?)(\n|$)/g, '$1') // Remove list items
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Extract link text
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim();
}

export function StoryCard({ story, isHighlighted = false, className = "" }: StoryCardProps) {
  // Guard clause for invalid story data
  if (!story || typeof story !== 'object') {
    return null;
  }
  
  const countryCode = story.country ? getCountryCode(story.country) : null;
  
  // Extract text content for preview
  const textContent = typeof story.content === 'string' 
    ? markdownToPlainText(story.content)
    : '';
  
  // Format date with error handling
  const formattedDate = story.created_at ? formatDate(story.created_at) : 'Unknown date';
  
  // Get title with fallback
  const title = story.title || 'My ARMY Story';
  
  // Get ARMY since year with fallback
  const armySince = story.army_since || 2013;
  
  return (
    <Link 
      href={`/army-story/${story.story_id || ''}`}
      className={`
        block bg-white border-2 border-black rounded-xl overflow-hidden transition-all hover:shadow-lg
        ${isHighlighted 
          ? "transform-gpu md:scale-105 shadow-md md:-rotate-1"
          : "hover:-translate-y-1"
        }
        ${className}
      `}
    >
      <div className="p-4 md:p-5">
        {/* Story Title */}
        <h3 className="font-bold text-xl mb-2 black-han-sans">
          {title}
        </h3>
        
        {/* Content Preview */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm md:text-base">
            {textContent ? truncateText(textContent, isHighlighted ? 150 : 80) : 'No content available'}
          </p>
        </div>
        
        {/* Author Info */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="text-sm">
              By <span className="font-semibold">{story.name || 'Anonymous'}</span>
            </div>
          </div>
          
          {isHighlighted && (
            <div className="hidden md:block px-2 py-1 bg-gray-200 text-xs font-bold text-black rounded-full">
              Featured Story
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          {/* Country with flag - Updated format */}
          <div className="flex items-center">
            <span className="mr-1">ARMY From: {story.country || 'Unknown'}</span>
            {countryCode && (
              <Image
                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                width={16}
                height={12}
                alt={story.country || ''}
                className="inline-block"
              />
            )}
          </div>
          
          {/* Bias with purple heart */}
          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 rounded-full">
            <span className="text-purple-800">💜</span>
            <span className="font-medium text-purple-800">{story.bias || 'OT7'}</span>
          </div>
          
          {/* ARMY Since */}
          <div className="px-2 py-0.5 bg-yellow-100 rounded-full text-yellow-800">
            Since {armySince}
          </div>
          
          {/* Post Date */}
          <div className="text-gray-500">
            {formattedDate}
          </div>
        </div>
      </div>
    </Link>
  )
} 