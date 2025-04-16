"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { StoryDetail } from '@/app/components/features/story-detail'
import { useArmyStories } from '@/app/lib/army-story-context'
import { type SupabaseArmyStory } from '@/app/lib/supabase'

export default function StoryDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { getStoryById } = useArmyStories()
  const [story, setStory] = useState<SupabaseArmyStory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadStory() {
      setIsLoading(true)
      setError(null)
      
      try {
        if (typeof id !== 'string') {
          throw new Error('Invalid story ID')
        }
        
        const storyData = await getStoryById(id)
        
        if (!storyData) {
          throw new Error('Story not found')
        }
        
        setStory(storyData)
      } catch (err) {
        console.error('Error loading story:', err)
        setError('Failed to load the story. It may have been removed or doesn\'t exist.')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadStory()
  }, [id, getStoryById])
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2">Loading story...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error || !story) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4 black-han-sans">Story Not Found</h1>
          <p className="mb-6 text-gray-600">{error || 'This story could not be found.'}</p>
          <button
            onClick={() => router.push('/army-story')}
            className="inline-flex items-center px-5 py-3 bg-black text-[#FFDE00] rounded-lg transition-colors hover:bg-purple-900 black-han-sans"
          >
            Back to All Stories
          </button>
        </div>
      </div>
    )
  }
  
  // Render story detail
  return (
    <div className="container mx-auto px-4 py-6">
      <StoryDetail story={story} />
    </div>
  )
} 