"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/app/lib/utils"
import { type SupabaseArmyStory } from "@/app/lib/supabase"
import { getCountryCode } from "@/app/lib/country-codes"
import { ArrowLeft, HeartHandshake, ArrowUp, ChevronUp } from "lucide-react"
import { StoryComments } from "./story-comments"

interface StoryDetailProps {
  story: SupabaseArmyStory
}

// Simple markdown parser for basic rendering
function renderMarkdown(markdown: string): string {
  // Replace double asterisks with <strong> tags
  let html = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace single asterisks with <em> tags
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace ## headings with <h2> tags
  html = html.replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold my-3">$1</h2>');
  
  // Handle lists - first convert each bullet point to li
  html = html.replace(/- (.*?)(\n|$)/g, '<li>$1</li>\n');
  
  // Then wrap consecutive li elements in ul tags
  html = html.replace(/(<li>.*?<\/li>\n)+/g, (match) => {
    return `<ul class="list-disc pl-5 my-2">${match}</ul>`;
  });
  
  // Replace links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Replace newlines with <br> tags
  html = html.replace(/\n/g, '<br />');
  
  return html;
}

export function StoryDetail({ story }: StoryDetailProps) {
  const countryCode = getCountryCode(story.country)
  const formattedDate = formatDate(story.created_at)
  
  // Get defaults for new fields
  const title = story.title || 'My ARMY Story';
  const armySince = story.army_since || 2013;
  
  // Format markdown to HTML
  const storyHtml = renderMarkdown(story.content)

  // State to track scroll position
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show floating button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      {/* Main Heading */}
      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          ARMY Stories
        </h1>
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          This is a story shared by a fellow ARMY. These personal experiences reflect the diverse global BTS community. 💜
        </p>
        
        {/* Back Button */}
        <Link 
          href="/army-story" 
          className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          <span className="black-han-sans">Back to Stories</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-black p-4 md:p-6 shadow-md">
        {/* Story Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3 black-han-sans">
          {title}
        </h1>
        
        {/* Author & Meta Info */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-200">
          {/* Author */}
          <div className="text-base mr-3">
            By <span className="font-semibold">{story.name}</span>
          </div>
          
          {/* Country with flag - Updated format */}
          <div className="flex items-center mr-3">
            <span className="mr-1">ARMY From: {story.country}</span>
            {countryCode && (
              <Image
                src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                width={20}
                height={15}
                alt={story.country}
                className="inline-block"
              />
            )}
          </div>
          
          {/* Bias with purple heart */}
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
            <span className="text-purple-800">💜</span>
            <span className="font-medium text-purple-800">{story.bias || 'OT7'}</span>
          </div>
          
          {/* ARMY Since */}
          <div className="px-2 py-1 bg-yellow-100 rounded-full text-yellow-800">
            Since {armySince}
          </div>
          
          {/* Post Date */}
          <div className="text-gray-500">
            {formattedDate}
          </div>
        </div>
        
        {/* Story Content */}
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: storyHtml }} />
        </div>
        
        {/* Sharing Options */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm md:text-base font-medium text-gray-700">
              Shared with 💜 by {story.name}
            </div>
            <Link 
              href="/army-story/create" 
              className="inline-flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-md hover:bg-purple-900 transition-colors black-han-sans"
            >
              Share Your Story 💜
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <div className="flex justify-center my-8">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 bg-black text-[#FFDE00] px-5 py-3 rounded-lg hover:bg-purple-900 transition-colors black-han-sans border-2 border-[#FFDE00] shadow-md transform hover:scale-105 active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={18} />
          <span>Back to Top</span>
        </button>
      </div>
      
      {/* Support CTA */}
      <div className="mt-8 p-5 bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl border-2 border-black">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white p-3 rounded-full border-2 border-black">
            <HeartHandshake size={28} className="text-purple-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold mb-1 black-han-sans">
              Touched by this ARMY story?
            </h3>
            <p className="text-sm md:text-base">
              Your support helps us maintain this platform where ARMYs can share their beautiful BTS journeys.
            </p>
          </div>
          <Link 
            href="/support" 
            className="inline-flex items-center px-4 py-2 bg-[#FFDE00] text-black border-2 border-black rounded-md hover:bg-yellow-300 transition-colors black-han-sans whitespace-nowrap"
          >
            Support Us 💜
          </Link>
        </div>
      </div>
      
      {/* Comments Section */}
      <StoryComments storyId={story.story_id} />

      {/* Floating Back to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full 
            bg-black hover:bg-purple-900 text-[#FFDE00] shadow-lg transition-all duration-300
            border-2 border-[#FFDE00] transform hover:scale-110 active:scale-95"
          aria-label="Scroll back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
} 