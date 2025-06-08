"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { CountrySelect } from "../ui/country-select"
import { useArmyStories } from "@/app/lib/army-story-context"
import { type SupabaseArmyStory } from "@/app/lib/supabase"
import RichTextEditor from "../ui/rich-text-editor"
import { toast } from "sonner"
import { containsBadWords } from "@/app/lib/bad-words"

// Define form schema using Zod
const storySchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .refine((val: string) => !containsBadWords(val), {
      message: "Name contains inappropriate words"
    }),
  country: z.string().min(1, { message: "Please select a country" }),
  bias: z.string().min(1, { message: "Please select your bias" }),
  content: z.string()
    .min(50, { message: "Story must be at least 50 characters long" })
    .max(5000, { message: "Story must be at most 5000 characters long" })
    .refine((val: string) => !val.includes('http://') && !val.includes('https://') && !val.includes('www.'), {
      message: "URLs are not allowed in stories"
    })
    .refine((val: string) => !containsBadWords(val), {
      message: "Story contains inappropriate words"
    }),
  title: z.string()
    .max(100, { message: "Title must be at most 100 characters long" })
    .optional()
    .refine((val: string | undefined) => !val || !containsBadWords(val), {
      message: "Title contains inappropriate words"
    }),
  army_since: z.number().min(2013, { message: "ARMY Since must be 2013 or later" }),
})

type StoryFormData = z.infer<typeof storySchema>

interface StoryFormProps {
  onSubmit?: (story: SupabaseArmyStory | null) => void
}

// Array of BTS members for bias selection
const BTS_MEMBERS = [
  { value: "RM", label: "RM (Kim Namjoon)" },
  { value: "Jin", label: "Jin (Kim Seokjin)" },
  { value: "Suga", label: "Suga (Min Yoongi)" },
  { value: "J-Hope", label: "J-Hope (Jung Hoseok)" },
  { value: "Jimin", label: "Jimin (Park Jimin)" },
  { value: "V", label: "V (Kim Taehyung)" },
  { value: "Jungkook", label: "Jungkook (Jeon Jungkook)" },
  { value: "OT7", label: "OT7 (All Members)" }
]

// Generate array of years from 2013 (BTS debut) to current year
const currentYear = new Date().getFullYear();
const ARMY_YEARS = Array.from({ length: currentYear - 2013 + 1 }, (_, i) => ({
  value: 2013 + i,
  label: `${2013 + i}`
}));

export function StoryForm({ onSubmit }: StoryFormProps) {
  const { addStory } = useArmyStories()
  const router = useRouter()
  
  const [formData, setFormData] = useState<StoryFormData>({
    name: "",
    country: "",
    bias: "",
    content: "",
    title: "",
    army_since: 0 // Default to 0 to force selection
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof StoryFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when field is edited
    if (errors[name as keyof StoryFormData]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name as keyof StoryFormData]
        return updated
      })
    }
  }

  // Handle rich text editor content change
  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
    
    // Clear error when content is edited
    if (errors.content) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated.content
        return updated
      })
    }
  }

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form data
      storySchema.parse(formData)
      
      // Clear all errors
      setErrors({})
      
      // Set submitting state
      setIsSubmitting(true)
      
      // Submit the story
      const story = await addStory(
        formData.name, 
        formData.country, 
        formData.bias, 
        formData.content,
        formData.title || undefined,
        formData.army_since
      )
      
      // Call optional onSubmit handler
      if (onSubmit) {
        onSubmit(story)
      }
      
      if (story) {
        // Success - navigate to the story page
        toast.success("Your ARMY story has been shared! Thank you for contributing.",
          {
            action: {
              label: "View Story",
              onClick: () => router.push(`/army-story/${story.story_id}`)
            }
          }
        )
        
        // Navigate to the story page
        router.push(`/army-story/${story.story_id}`)
      }
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof StoryFormData, string>> = {}
        
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof StoryFormData
          fieldErrors[field] = err.message
        })
        
        setErrors(fieldErrors)
      } else {
        // Handle other errors
        toast.error("An error occurred. Please try again.")
        console.error("Story submission error:", error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md">
      
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 black-han-sans">
            Story Title <span className="text-gray-500 text-xs">(optional, {formData.title?.length || 0}/100 characters)</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 ${
              errors.title ? "border-red-500" : "border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Give your story a title (or leave blank for auto-generated title)..."
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 black-han-sans">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 ${
              errors.name ? "border-red-500" : "border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Enter your name or username..."
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        {/* Country Selection */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1 black-han-sans">
            Your Country
          </label>
          <CountrySelect
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            hasError={!!errors.country}
          />
          {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bias Selection */}
          <div>
            <label htmlFor="bias" className="block text-sm font-medium mb-1 black-han-sans">
              Your Bias
            </label>
            <select
              id="bias"
              name="bias"
              value={formData.bias}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.bias ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="">Select your bias...</option>
              {BTS_MEMBERS.map((member) => (
                <option key={member.value} value={member.value}>
                  {member.label}
                </option>
              ))}
            </select>
            {errors.bias && <p className="mt-1 text-sm text-red-500">{errors.bias}</p>}
          </div>
          
          {/* ARMY Since Selection */}
          <div>
            <label htmlFor="army_since" className="block text-sm font-medium mb-1 black-han-sans">
              ARMY Since
            </label>
            <select
              id="army_since"
              name="army_since"
              value={formData.army_since || ""}
              onChange={(e) => {
                setFormData((prev) => ({ 
                  ...prev, 
                  army_since: e.target.value ? parseInt(e.target.value) : 0 
                }))
                
                // Clear error when field is edited
                if (errors.army_since) {
                  setErrors((prev) => {
                    const updated = { ...prev }
                    delete updated.army_since
                    return updated
                  })
                }
              }}
              className={`w-full px-4 py-2 border-2 ${
                errors.army_since ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="">When did you become an ARMY?</option>
              {ARMY_YEARS.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            {errors.army_since && <p className="mt-1 text-sm text-red-500">{errors.army_since}</p>}
          </div>
        </div>
        
        {/* Story Content - Rich Text Editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1 black-han-sans">
            Your ARMY Story <span className="text-gray-500 text-xs">({formData.content.length}/5000 characters)</span>
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Share your journey of becoming an ARMY and what BTS means to you..."
            error={!!errors.content}
            height="300px"
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-[#FFDE00] py-3 px-4 rounded-md transition-colors black-han-sans
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-900"}`}
        >
          {isSubmitting ? "Submitting..." : "Share My ARMY Story 💜"}
        </button>
      </form>
    </div>
  )
} 