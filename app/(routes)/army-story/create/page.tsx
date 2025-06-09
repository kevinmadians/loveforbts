"use client"

import React from 'react'
import { StoryForm } from '@/app/components/features/story-form'

export default function CreateStoryPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 black-han-sans">Share Your ARMY Story 💜</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Tell us how you became a BTS fan, what BTS means to you, and your favorite memories as an ARMY. Your story matters!
          </p>
        </div>
        
        <StoryForm />
      </div>
    </div>
  )
} 
