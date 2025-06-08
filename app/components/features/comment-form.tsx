"use client"

import React, { useState } from "react"
import { z } from "zod"
import { CountrySelect } from "../ui/country-select"
import { useMessages } from "@/app/lib/message-context"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { containsBadWords, getFirstBadWord } from "@/app/lib/bad-words"

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

type CommentFormData = z.infer<typeof commentSchema>

interface CommentFormProps {
  onSubmit?: (name: string, country: string, message: string) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const { addMessage } = useMessages()
  const pathname = usePathname()
  const router = useRouter()
  const isMessagesPage = pathname === "/messages"
  const isCreateMessagePage = pathname === "/messages/create"
  
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    country: "",
    message: "",
  })

  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
    message?: string;
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateField = (name: keyof CommentFormData, value: string) => {
    try {
      const fieldSchema = commentSchema.shape[name]
      fieldSchema.parse(value)
      return { valid: true, error: undefined }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { valid: false, error: error.errors[0]?.message }
      }
      return { valid: false, error: "Invalid input" }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof CommentFormData; value: string }
    
    // Validate the field
    const { valid, error } = validateField(name, value)
    
    // Update errors
    setErrors(prev => ({
      ...prev,
      [name]: !valid ? error : undefined,
    }))
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    let formErrors = {}
    let isValid = true
    
    for (const [key, value] of Object.entries(formData)) {
      const fieldName = key as keyof CommentFormData
      const { valid, error } = validateField(fieldName, value)
      
      if (!valid) {
        formErrors = { ...formErrors, [fieldName]: error }
        isValid = false
      }
    }
    
    setErrors(formErrors)
    
    if (!isValid) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Save message to Supabase
      const success = await addMessage(formData.name, formData.country, formData.message)
      
      if (success) {
        // Call the onSubmit prop if provided
        if (onSubmit) {
          onSubmit(formData.name, formData.country, formData.message)
        }
        
        // Reset form
        setFormData({
          name: "",
          country: "",
          message: "",
        })
        
        setSubmitSuccess(true)
        
        // If we're on the create page, redirect to the messages page
        if (isCreateMessagePage) {
          toast.success("Message sent successfully!", {
            description: "Redirecting to messages page...",
            duration: 2000,
          })
          
          // Delay redirect slightly to allow toast to be seen
          setTimeout(() => {
            router.push("/messages")
          }, 1500)
        } else {
          // Otherwise just show the success state
          setTimeout(() => setSubmitSuccess(false), 5000)
          
          // Show success toast (updated message)
          toast.success("Message sent successfully!", {
            description: "Your message has been added to our community wall.",
            duration: 4000,
          })
        }
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later.",
        })
      }
    } catch (error) {
      console.error("Failed to submit form:", error)
      toast.error("Failed to send message", {
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-black comment-form">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center black-han-sans">
        {isCreateMessagePage ? "Share Your Message" : "Leave a Message for BTS"}
      </h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="mb-1">Thank you for your message! 💜</p>
          {!isMessagesPage && (
            <p className="text-sm">
              <Link href="/messages" className="underline font-medium hover:text-purple-700">
                View all messages from ARMY →
              </Link>
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 black-han-sans">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 ${
              errors.name ? "border-red-500" : "border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1 black-han-sans">
            Country
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

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 black-han-sans">
            Message <span className="text-gray-500 text-xs">({formData.message.length}/500 characters)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border-2 ${
              errors.message ? "border-red-500" : "border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            placeholder="Share your love for BTS..."
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-[#FFDE00] py-3 px-4 rounded-md transition-colors black-han-sans
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-900"}`}
        >
          {isSubmitting ? "Sending..." : "Send Message 💜"}
        </button>
      </form>
    </div>
  )
} 