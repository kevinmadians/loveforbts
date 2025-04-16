"use client"

import React from "react"
import { CommentForm } from "@/app/components/features/comment-form"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CreateMessagePage() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back link */}
      <div className="mb-6">
        <Link 
          href="/messages" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-black"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Messages
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center black-han-sans">
          Write a Message to BTS
        </h1>
        
        <p className="text-md mb-6 text-center max-w-2xl mx-auto">
          Share your love, appreciation, or encouragement for BTS. Your message will 
          be displayed on the message board for other ARMY to see.
        </p>
      </div>
      
      {/* Message Form */}
      <div className="mb-8">
        <CommentForm 
          onSubmit={(name, country, message) => {
            // After successful submission, we'll redirect to the messages page (handled in CommentForm)
          }} 
        />
      </div>
      
      {/* Message Guidelines */}
      <div className="bg-white p-5 border-2 border-black rounded-xl mb-8">
        <h2 className="text-lg font-medium mb-3 black-han-sans">Message Guidelines</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>Be respectful and kind to BTS and fellow ARMY.</li>
          <li>Avoid sharing personal information in your message.</li>
          <li>Keep your message appropriate for all audiences.</li>
          <li>Your message will be visible to all visitors, so think before you post!</li>
          <li>Messages are moderated; inappropriate content may be removed.</li>
        </ul>
      </div>
    </div>
  )
} 