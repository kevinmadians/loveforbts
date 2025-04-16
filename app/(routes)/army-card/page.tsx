"use client"

import React from "react"
import { ArmyCardGenerator } from "@/app/components/features/army-card-generator"

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
    </div>
  )
} 