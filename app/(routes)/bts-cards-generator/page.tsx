"use client"

import React from "react"
import Link from "next/link"
import { QuoteCardsGenerator } from "@/app/components/features/quote-cards-generator"
import { HeartHandshake, Book, MessageCircle, Users, Gamepad2 } from "lucide-react"
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"

export default function BTSCardsGeneratorPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          BTS Quote Cards Generator
        </h1>
        
        <div className="text-lg mb-4 md:mb-8 text-center max-w-4xl mx-auto">
          <p className="mb-3">
            Create beautiful, inspirational quote cards perfect for social media! 
            Choose from inspiring messages, customize with stunning designs, and share your positivity with the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-purple-100 px-3 py-1 rounded-full">📱 Instagram Stories</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full">🐦 Twitter Posts</span>
            <span className="bg-pink-100 px-3 py-1 rounded-full">🎵 TikTok Content</span>
          </div>
        </div>
      </div>
      
      {/* Quote Cards Generator Section */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
        <QuoteCardsGenerator />
      </div>
      
      {/* Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center black-han-sans">
          ✨ Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border-2 border-black">
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-bold text-sm mb-1">100+ Quotes</h3>
            <p className="text-xs text-gray-600">Inspirational messages</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-black">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-bold text-sm mb-1">10 Designs</h3>
            <p className="text-xs text-gray-600">Beautiful card themes</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-black">
            <div className="text-2xl mb-2">🌈</div>
            <h3 className="font-bold text-sm mb-1">Custom Colors</h3>
            <p className="text-xs text-gray-600">Gradients & backgrounds</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-black">
            <div className="text-2xl mb-2">📥</div>
            <h3 className="font-bold text-sm mb-1">HD Download</h3>
            <p className="text-xs text-gray-600">PNG/JPG formats</p>
          </div>
        </div>
      </div>
      
      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More ARMY Features" className="mt-12 border-t-2 border-gray-100 pt-12 mb-12">
        <PageCTA
          title="ARMY Card Maker"
          description="Create your personalized BTS ARMY membership card with custom details and designs."
          href="/army-card"
          icon={Users}
          color="purple"
        />
        
        <PageCTA
          title="BTS Mini Games"
          description="Play fun BTS-themed games including Whack-a-Mole and Purple Hearts Collector."
          href="/games"
          icon={Gamepad2}
          color="blue"
        />
        
        <PageCTA
          title="Share Your Story"
          description="Tell your journey with BTS and connect with fellow ARMY through heartfelt stories."
          href="/army-story"
          icon={Book}
          color="green"
        />
      </CTAContainer>
      
      {/* Support CTA */}
      <div className="my-12 bg-gradient-to-r from-purple-100 to-[#fff9cc] rounded-xl border-2 border-black p-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="bg-white p-3 rounded-full border-2 border-black">
            <HeartHandshake size={36} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 black-han-sans">
              Love Creating Quote Cards? Support Our Community!
            </h3>
            <p className="mb-4">
              This Quote Cards Generator is part of our mission to bring ARMY together through creativity. 
              Your support helps us develop more amazing features for our BTS fan community! 💜
            </p>
          </div>
          <Link 
            href="/support" 
            className="bg-bts-accent text-black py-2 px-6 rounded-md inline-flex items-center justify-center hover:bg-navbar-hover transition-colors border-2 border-black black-han-sans whitespace-nowrap"
          >
            Support Us 💜
          </Link>
        </div>
      </div>
    </div>
  )
} 