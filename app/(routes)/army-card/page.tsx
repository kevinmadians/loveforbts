"use client"

import React from "react"
import { ArmyCardGenerator } from "@/app/components/features/army-card-generator"

export default function ArmyCardPage() {
  return (
    <main className="flex flex-col w-full max-w-5xl px-2 py-4 md:px-4 gap-8">
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 black-han-sans">
          Create Your ARMY Card
        </h1>
        <p className="text-lg text-center mb-8">
          Create your personalized ARMY card, select your bias, and share your love for BTS with the world!
        </p>
        
        <ArmyCardGenerator />
      </div>
    </main>
  )
} 