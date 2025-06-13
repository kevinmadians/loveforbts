"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Music, Heart, MessageCircle, Book } from 'lucide-react'
import { PlaylistCreator } from '@/app/components/features/playlist-creator'
import { CTAContainer } from '@/app/components/ui/cta-container'
import { PageCTA } from '@/app/components/ui/page-cta'

export default function CreatePlaylistPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/bts-playlist" className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Playlists
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 black-han-sans">
          Create Your BTS Playlist
        </h1>
        
        <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-4xl mx-auto">
          Share your favorite BTS songs with the ARMY community. Create a personalized playlist 
          with up to 10 songs and tell the world why these tracks mean so much to you!
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-[#FFDE00] rounded-full flex items-center justify-center font-bold text-xs">1</div>
            <span>Add playlist details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-[#FFDE00] rounded-full flex items-center justify-center font-bold text-xs">2</div>
            <span>Search & add songs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-[#FFDE00] rounded-full flex items-center justify-center font-bold text-xs">3</div>
            <span>Review & publish</span>
          </div>
        </div>
      </div>

      {/* Playlist Creator Form */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 md:p-8 mb-12 shadow-lg">
        <PlaylistCreator />
      </div>

      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More ARMY Features">
        <PageCTA
          title="ARMY Card Maker"
          description="Create beautiful BTS-themed cards with your favorite photos and messages."
          href="/army-card"
          icon={Heart}
          color="purple"
        />
        <PageCTA
          title="Share Your Story"
          description="Tell your unique BTS journey and connect with fellow ARMY worldwide."
          href="/army-story"
          icon={MessageCircle}
          color="blue"
        />
        <PageCTA
          title="Message Board"
          description="Leave messages for BTS and read heartfelt notes from ARMY around the globe."
          href="/messages"
          icon={Book}
          color="green"
        />
      </CTAContainer>
    </div>
  )
} 