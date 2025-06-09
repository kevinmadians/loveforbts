"use client"

import React, { useState } from "react"
import { Send } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }
    
    // Validate name
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      valid = false
    } else {
      newErrors.name = ""
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      valid = false
    } else {
      newErrors.email = ""
    }
    
    // Validate subject
    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters"
      valid = false
    } else {
      newErrors.subject = ""
    }
    
    // Validate message
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      valid = false
    } else {
      newErrors.message = ""
    }
    
    setErrors(newErrors)
    return valid
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      })
    }, 1500)
  }
  
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black text-center black-han-sans">
        Contact Us
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6">
          <h2 className="text-2xl font-bold mb-6 black-han-sans">Get In Touch</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">About Us</h3>
              <p className="text-gray-700">
                Love for BTS is a fan-made community platform dedicated to BTS and ARMY around the world. We're here to connect fans and share our appreciation for the seven members who have touched our lives.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-start">
                  <span className="mr-2 text-xl">📧</span>
                  <span>Email: contact@loveforbts.com</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2 text-xl">🌐</span>
                  <span>Website: loveforbts.com</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-bts-accent p-2 rounded-full hover:bg-purple-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-bts-accent p-2 rounded-full hover:bg-purple-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-bts-accent p-2 rounded-full hover:bg-purple-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6">
          <h2 className="text-2xl font-bold mb-6 black-han-sans">Send a Message</h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 black-han-sans">
                  Your Name
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
                  placeholder="Enter your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 black-han-sans">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border-2 ${
                    errors.email ? "border-red-500" : "border-black"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 black-han-sans">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border-2 ${
                    errors.subject ? "border-red-500" : "border-black"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter subject"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 black-han-sans">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 border-2 ${
                    errors.message ? "border-red-500" : "border-black"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                  placeholder="Enter your message"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 bg-black text-bts-accent py-3 px-4 rounded-md transition-colors black-han-sans
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-900"}`}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">Your message has been sent successfully. We'll get back to you soon!</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-black text-bts-accent py-2 px-4 rounded-md hover:bg-purple-900 transition-colors black-han-sans"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
