"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { formatDate } from "@/app/lib/utils"
import { type SupabaseMessageComment } from "@/app/lib/supabase"
import { getCountryCode } from "@/app/lib/country-codes"
import { getMessageComments, saveMessageComment } from "@/app/lib/supabase-service"
import { toast } from "sonner"
import { Send, MessageCircle } from "lucide-react"
import { CountrySelect } from "@/app/components/ui/country-select"
import { z } from "zod"
import { containsBadWords } from "@/app/lib/bad-words"

interface MessageCommentsProps {
  messageId: number
}

// Define form schema using Zod
const commentSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .refine((val: string) => !containsBadWords(val), {
      message: "Name contains inappropriate words"
    }),
  country: z.string().min(1, { message: "Please select a country" }),
  message: z.string()
    .min(5, { message: "Message must be at least 5 characters long" })
    .max(500, { message: "Message must be at most 500 characters long" })
    .refine((val: string) => !val.includes('http://') && !val.includes('https://') && !val.includes('www.'), {
      message: "URLs are not allowed in messages"
    })
    .refine((val: string) => !containsBadWords(val), {
      message: "Message contains inappropriate words"
    }),
})

export function MessageComments({ messageId }: MessageCommentsProps) {
  const [comments, setComments] = useState<SupabaseMessageComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [message, setMessage] = useState("")
  
  useEffect(() => {
    async function loadComments() {
      setIsLoading(true)
      try {
        const messageComments = await getMessageComments(messageId)
        setComments(messageComments)
      } catch (error) {
        console.error("Error loading comments:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadComments()
  }, [messageId])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate message length and URLs
    if (message.length > 500) {
      toast.error("Comment must be at most 500 characters long")
      return
    }
    
    if (message.includes('http://') || message.includes('https://') || message.includes('www.')) {
      toast.error("URLs are not allowed in comments")
      return
    }
    
    if (!name.trim() || !country.trim() || !message.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    // Validate against bad words
    try {
      const validatedData = commentSchema.parse({ name, country, message })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]
        toast.error(firstError.message)
        return
      }
      toast.error("Invalid input. Please check your comment.")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const newComment = await saveMessageComment(messageId, name, country, message)
      
      if (newComment) {
        setComments([...comments, newComment])
        toast.success("Your comment has been added!")
        
        // Reset form
        setMessage("")
      } else {
        toast.error("Failed to save your comment. Please try again.")
      }
    } catch (error) {
      console.error("Error saving comment:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="mt-10">
      <div className="border-t-2 border-b-2 border-gray-200 py-6 mb-6">
        <h2 className="text-2xl black-han-sans flex items-center gap-2 mb-4">
          <MessageCircle size={24} />
          <span>Comments</span>
          {comments.length > 0 && (
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {comments.length}
            </span>
          )}
        </h2>
        
        {/* Comments List */}
        {isLoading ? (
          <div className="text-center py-4">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-600">Be the first to comment on this message!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* User info */}
                  <span className="font-semibold">{comment.name}</span>
                  
                  {/* Country with flag */}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>from {comment.country}</span>
                    {getCountryCode(comment.country) && (
                      <Image
                        src={`https://flagcdn.com/w40/${getCountryCode(comment.country)?.toLowerCase()}.png`}
                        width={16}
                        height={12}
                        alt={comment.country}
                      />
                    )}
                  </div>
                  
                  {/* Date */}
                  <span className="text-xs text-gray-500 ml-auto">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                
                {/* Comment message */}
                <p className="text-gray-800">{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Comment Form */}
      <div className="bg-white rounded-lg border-2 border-black p-6">
        <h3 className="text-xl black-han-sans mb-4">Leave a Comment</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Your name"
                required
              />
            </div>
            
            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block font-medium mb-1">
                Country
              </label>
              <CountrySelect 
                id="country"
                name="country"
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                className="w-full"
              />
            </div>
          </div>
          
          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-1">
              Comment
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
              placeholder="Share your thoughts on this message..."
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-bts-accent py-3 px-6 rounded-lg hover:bg-purple-900 transition-colors black-han-sans flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                Posting...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Post Comment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 
