"use client"

import React, { useState, useRef, useEffect } from "react"
import { z } from "zod"
import Image from "next/image"
import { Download, Share2 } from "lucide-react"
import { membersData } from "@/app/lib/members-data"
import { toast } from "sonner"
import { CountrySelect } from "@/app/components/ui/country-select"
import { getCountryCode } from "@/app/lib/country-codes"

// Define form schema using Zod
const armyCardSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  country: z.string().min(1, { message: "Please select a country" }),
  bias: z.string().min(1, { message: "Please select your bias" }),
  armySince: z.string().min(1, { message: "Please select when you became ARMY" }),
})

type ArmyCardFormData = z.infer<typeof armyCardSchema>

export function ArmyCardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const memberImageRef = useRef<HTMLImageElement | null>(null)
  const flagImageRef = useRef<HTMLImageElement | null>(null)
  
  const [formData, setFormData] = useState<ArmyCardFormData>({
    name: "",
    country: "",
    bias: "",
    armySince: "",
  })

  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
    bias?: string;
    armySince?: string;
  }>({})

  const [selectedMember, setSelectedMember] = useState<typeof membersData[0] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [cardGenerated, setCardGenerated] = useState(false)
  const [memberImageLoaded, setMemberImageLoaded] = useState(false)
  const [flagImageLoaded, setFlagImageLoaded] = useState(false)

  // Update selected member when bias changes
  useEffect(() => {
    if (formData.bias) {
      const member = membersData.find(m => m.slug === formData.bias)
      setSelectedMember(member || null)
    } else {
      setSelectedMember(null)
    }
  }, [formData.bias])

  const validateField = (name: keyof ArmyCardFormData, value: string) => {
    try {
      const fieldSchema = armyCardSchema.shape[name]
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
    const { name, value } = e.target as { name: keyof ArmyCardFormData; value: string }
    
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

  // Preload the member image for canvas rendering
  useEffect(() => {
    if (selectedMember && cardGenerated) {
      // Create an image element for the member photo
      const img = document.createElement('img');
      img.crossOrigin = "anonymous";
      img.onload = () => {
        memberImageRef.current = img;
        setMemberImageLoaded(true);
      };
      img.src = selectedMember.image;
      
      // If country is selected, also preload the flag
      if (formData.country) {
        const countryCode = getCountryCode(formData.country).toLowerCase();
        const flagImg = document.createElement('img');
        flagImg.crossOrigin = "anonymous";
        flagImg.onload = () => {
          flagImageRef.current = flagImg;
          setFlagImageLoaded(true);
        };
        flagImg.src = `https://flagcdn.com/w80/${countryCode}.png`;
      }
    }
  }, [selectedMember, cardGenerated, formData.country]);

  const generateCard = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    let formErrors = {}
    let isValid = true
    
    for (const [key, value] of Object.entries(formData)) {
      const fieldName = key as keyof ArmyCardFormData
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
    
    setIsGenerating(true)
    
    // Small delay to show loading state
    setTimeout(() => {
      setCardGenerated(true)
      setIsGenerating(false)
    }, 1000)
  }

  const downloadCard = async () => {
    if (!cardRef.current || !canvasRef.current) return
    
    // Wait for member image to load first
    if (!memberImageLoaded && selectedMember) {
      toast.info("Preparing image...", {
        description: "Please wait while we prepare your card for download",
      })
      // Create an image element for the member photo
      const img = document.createElement('img');
      img.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = selectedMember.image;
        memberImageRef.current = img;
      });
    }
    
    // Wait for flag image to load if country is selected
    if (!flagImageLoaded && formData.country) {
      const countryCode = getCountryCode(formData.country).toLowerCase();
      const flagImg = document.createElement('img');
      flagImg.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        flagImg.onload = resolve;
        flagImg.src = `https://flagcdn.com/w80/${countryCode}.png`;
        flagImageRef.current = flagImg;
      });
    }
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions for 9:16 ratio (mobile)
    canvas.width = 1080 // Standard width
    canvas.height = 1920 // 9:16 ratio
    
    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw border
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 20
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)
    
    // Draw BTS branding elements
    ctx.fillStyle = "#FFDE00" // BTS yellow
    ctx.fillRect(20, 20, canvas.width - 40, 200)
    
    // Title text
    ctx.fillStyle = "#000000"
    ctx.font = "bold 120px 'Black Han Sans', sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("ARMY CARD", canvas.width / 2, 160)
    
    // Draw member image if available
    if (memberImageRef.current) {
      // Draw member image
      const imgWidth = canvas.width - 80
      const imgHeight = imgWidth
      ctx.drawImage(memberImageRef.current, 40, 240, imgWidth, imgHeight)
      
      // Add a border to the image
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 10
      ctx.strokeRect(40, 240, imgWidth, imgHeight)
    } else {
      // Fallback if image is not available
      ctx.fillStyle = "#f2f2f2"
      ctx.fillRect(40, 240, canvas.width - 80, canvas.width - 80) // Square area for member
      
      // Add text to indicate missing image
      ctx.fillStyle = "#000000"
      ctx.font = "bold 60px Arial, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(selectedMember?.name || "Your Bias", canvas.width / 2, 240 + (canvas.width - 80) / 2)
    }
    
    // User info section background
    ctx.fillStyle = "#f8f8f8"
    ctx.fillRect(40, 240 + (canvas.width - 80) + 20, canvas.width - 80, canvas.height - (240 + (canvas.width - 80) + 60))
    
    // User info text
    const infoStartY = 240 + (canvas.width - 80) + 100
    const lineHeight = 140 // Increased line height for better spacing
    
    // Define text styling functions for more engaging design
    const drawLabelWithValue = (label: string, value: string, y: number) => {
      // Draw yellow bullet point
      ctx.fillStyle = "#FFDE00"
      ctx.beginPath()
      ctx.arc(80, y - 20, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw bold label in black
      ctx.fillStyle = "#000000"
      ctx.font = "bold 80px 'Black Han Sans', sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(`${label}:`, 110, y)
      
      // Calculate width of label for positioning the value
      const labelWidth = ctx.measureText(`${label}:`).width
      
      // Draw value with different styling
      ctx.font = "500 70px Arial, sans-serif"
      ctx.fillText(value, 130 + labelWidth, y)
      
      return y + lineHeight
    }
    
    // Draw each info line with enhanced styling
    let currentY = infoStartY
    currentY = drawLabelWithValue("Name", formData.name, currentY)
    
    // Country with flag
    if (formData.country) {
      // Draw yellow bullet point
      ctx.fillStyle = "#FFDE00"
      ctx.beginPath()
      ctx.arc(80, currentY - 20, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw country label
      ctx.fillStyle = "#000000"
      ctx.font = "bold 80px 'Black Han Sans', sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("Country:", 110, currentY)
      
      // Calculate width of label for positioning the value and flag
      const labelWidth = ctx.measureText("Country:").width
      
      // Position for flag (before the country name)
      const flagX = 130 + labelWidth
      const flagY = currentY - 45 // Adjust to align with text
      
      // Draw flag if available
      if (flagImageRef.current) {
        const flagWidth = 60
        const flagHeight = 40
        ctx.drawImage(flagImageRef.current, flagX, flagY, flagWidth, flagHeight)
      }
      
      // Draw country value (after the flag)
      ctx.font = "500 70px Arial, sans-serif"
      ctx.fillText(formData.country, flagX + 70, currentY)
      
      currentY += lineHeight
    }
    
    // Bias
    currentY = drawLabelWithValue("Bias", selectedMember?.name || formData.bias, currentY)
    
    // ARMY Since
    if (formData.armySince) {
      currentY = drawLabelWithValue("ARMY Since", formData.armySince, currentY)
    }
    
    // Brand URL at the bottom - more subtle with uppercase
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)" // More subtle with transparency
    ctx.font = "bold 36px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("LOVEFORBTS.COM", canvas.width / 2, canvas.height - 50)
    
    // Generate download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `${formData.name}-ARMY-Card.png`
    link.href = dataUrl
    link.click()
    
    toast.success("ARMY Card downloaded successfully!", {
      description: "Share your card with other ARMYs!",
      duration: 4000,
    })
  }

  const shareCard = async () => {
    if (!cardRef.current || !canvasRef.current) return
    
    // Make sure we have the images loaded for sharing
    if ((!memberImageLoaded && selectedMember) || (!flagImageLoaded && formData.country)) {
      await downloadCard() // This will prepare the images
    }
    
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL("image/png")
    
    try {
      // Convert dataURL to Blob
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      
      // Try to use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'My ARMY Card',
          text: 'Check out my ARMY Card!',
          files: [new File([blob], `${formData.name}-ARMY-Card.png`, { type: 'image/png' })]
        })
        toast.success("ARMY Card shared successfully!")
      } else {
        // Fallback if Web Share API is not available
        toast.info("Sharing not supported on this device", {
          description: "Try downloading the image and sharing it manually",
        })
      }
    } catch (error) {
      console.error("Error sharing card:", error)
      toast.error("Failed to share ARMY Card", {
        description: "Please try downloading instead",
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2">
        <form onSubmit={generateCard} className="space-y-4 comment-form">
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
              <option value="">Select your bias</option>
              {membersData.map((member) => (
                <option key={member.slug} value={member.slug}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.bias && <p className="mt-1 text-sm text-red-500">{errors.bias}</p>}
          </div>

          <div>
            <label htmlFor="armySince" className="block text-sm font-medium mb-1 black-han-sans">
              ARMY Since
            </label>
            <select
              id="armySince"
              name="armySince"
              value={formData.armySince}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.armySince ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="">Select year</option>
              {Array.from({ length: 2025 - 2013 + 1 }, (_, i) => 2013 + i).map(year => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            {errors.armySince && <p className="mt-1 text-sm text-red-500">{errors.armySince}</p>}
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full bg-black text-[#FFDE00] py-3 px-4 rounded-md transition-colors black-han-sans
              ${isGenerating ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-900"}`}
          >
            {isGenerating ? "Generating..." : "Generate ARMY Card 💜"}
          </button>
        </form>
      </div>

      {/* Right side - Preview */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start">
        <div 
          ref={cardRef} 
          className={`w-full max-w-xs aspect-[9/16] border-2 border-black rounded-lg overflow-hidden shadow-lg relative bg-white ${
            !cardGenerated && 'flex items-center justify-center'
          }`}
        >
          {!cardGenerated && !isGenerating && (
            <div className="text-center p-6">
              <div className="bg-[#FFDE00] py-4 mx-4 mb-4 rounded-lg">
                <p className="black-han-sans text-xl">ARMY CARD</p>
              </div>
              <p className="text-gray-500">Fill out the form to generate your ARMY Card</p>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="animate-pulse text-center">
                <p className="black-han-sans text-xl mb-2">Creating your card...</p>
                <div className="w-12 h-12 border-4 border-[#FFDE00] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}

          {cardGenerated && (
            <div className="w-full h-full flex flex-col">
              {/* Card Header */}
              <div className="bg-[#FFDE00] p-3 border-b-2 border-black">
                <h3 className="text-center black-han-sans text-xl">ARMY CARD</h3>
              </div>
              
              {/* Member Image */}
              <div className="w-full aspect-square relative border-b-2 border-black">
                {selectedMember && (
                  <Image
                    src={selectedMember.image}
                    alt={`Photo of ${selectedMember.name}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {/* Card Info */}
              <div className="p-4 flex-grow flex flex-col justify-between bg-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFDE00]"></span>
                    <p className="font-bold black-han-sans text-lg">Name: <span className="font-normal">{formData.name}</span></p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFDE00]"></span>
                    <p className="font-bold black-han-sans text-lg mr-1">Country: </p>
                    <span className="flex items-center gap-1">
                      {formData.country && (
                        <Image
                          src={`https://flagcdn.com/w20/${getCountryCode(formData.country).toLowerCase()}.png`}
                          alt={`Flag of ${formData.country}`}
                          width={16}
                          height={12}
                          className="inline-block"
                        />
                      )}
                      <span className="font-normal">{formData.country}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFDE00]"></span>
                    <p className="font-bold black-han-sans text-lg">Bias: <span className="font-normal">{selectedMember?.name}</span></p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFDE00]"></span>
                    <p className="font-bold black-han-sans text-lg">ARMY Since: <span className="font-normal">{formData.armySince}</span></p>
                  </div>
                </div>
                
                <div className="mt-auto pt-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  LOVEFORBTS.COM
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Canvas for downloading - hidden */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Actions */}
        {cardGenerated && (
          <div className="mt-6 flex gap-3 w-full max-w-xs">
            <button
              onClick={downloadCard}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-[#FFDE00] py-2 px-4 rounded-md hover:bg-gray-800 transition-colors black-han-sans"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button
              onClick={shareCard}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-[#FFDE00] py-2 px-4 rounded-md hover:bg-gray-800 transition-colors black-han-sans"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 