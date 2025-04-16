"use client"

import React from "react"
import Link from "next/link"
import { ArmyCardGenerator } from "@/app/components/features/army-card-generator"
import { HeartHandshake } from "lucide-react"
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"

export default function ArmyCardPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          Create Your ARMY Card
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Generate a personalized ARMY membership card with your name, bias, and other details. 
          Download and share your card with fellow fans!
        </p>
      </div>
      
      {/* Card Generator Section */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
        <ArmyCardGenerator />
      </div>
      
      {/* Support CTA */}
      <div className="my-12 bg-gradient-to-r from-purple-100 to-[#fff9cc] rounded-xl border-2 border-black p-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="bg-white p-3 rounded-full border-2 border-black">
            <HeartHandshake size={36} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 black-han-sans">
              Loving This Feature? Support Our ARMY Community!
            </h3>
            <p className="mb-4">
              This ARMY Card generator is just one of many features we've created with 💜. 
              Your support helps us develop more tools for our BTS fan community.
            </p>
          </div>
          <Link 
            href="/support" 
            className="bg-[#FFDE00] text-black py-2 px-6 rounded-md inline-flex items-center justify-center hover:bg-yellow-400 transition-colors border-2 border-black black-han-sans whitespace-nowrap"
          >
            Support Us 💜
          </Link>
        </div>
      </div>
    </div>
  )
} 