"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { z } from "zod"
import Image from "next/image"
import { Download, Share2 } from "lucide-react"
import { membersData } from "@/app/lib/members-data"
import { toast } from "sonner"
import { CountrySelect } from "@/app/components/ui/country-select"
import { getCountryCode } from "@/app/lib/country-codes"
import { searchBTSSongs, type BTSSong } from "@/app/data/bts-songs"

// Define form schema using Zod
const armyCardSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  country: z.string().min(1, { message: "Please select a country" }),
  bias: z.string().min(1, { message: "Please select your bias" }),
  armySince: z.string().min(1, { message: "Please select when you became ARMY" }),
  theme: z.string().min(1, { message: "Please select a card theme" }),
  favoriteSong: z.string().optional(),
  motto: z.string().max(40, { message: "Motto/quote must be 40 characters or less" }).optional(),
  cardStyle: z.string().min(1, { message: "Please select a card style" }),
  badge: z.string().optional(),
})

type ArmyCardFormData = Omit<z.infer<typeof armyCardSchema>, 'motto'>;

// Theme color map
const themeMap = {
  classic: {
    headerBg: '#FFDE00',
    headerText: '#000000',
    bodyBg: '#ffffff',
    border: '#000000',
    bullet: '#FFDE00',
    text: '#000000',
    accent: '#FFDE00',
  },
  purple: {
    headerBg: '#9e4ef9',
    headerText: '#ffffff',
    bodyBg: '#f8f4ff',
    border: '#9e4ef9',
    bullet: '#9e4ef9',
    text: '#2d0066',
    accent: '#9e4ef9',
  },
  black: {
    headerBg: '#111111',
    headerText: '#FFDE00',
    bodyBg: '#fffbe6',
    border: '#111111',
    bullet: '#FFDE00',
    text: '#111111',
    accent: '#FFDE00',
  },
  pastel: {
    headerBg: '#ffe3f6',
    headerText: '#9e4ef9',
    bodyBg: '#f8f8f8',
    border: '#9e4ef9',
    bullet: '#ffb6e6',
    text: '#9e4ef9',
    accent: '#ffb6e6',
  },
}

// Only use membersData for biasOptions, since OT7 is now included in membersData
const biasOptions = membersData.map((member) => ({ slug: member.slug, name: member.name }));

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
    theme: "classic",
    favoriteSong: "",
    cardStyle: "classic",
    badge: "💜",
  })

  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
    bias?: string;
    armySince?: string;
    theme?: string;
    favoriteSong?: string;
    cardStyle?: string;
    badge?: string;
  }>({})

  const [selectedMember, setSelectedMember] = useState<typeof membersData[0] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [cardGenerated, setCardGenerated] = useState(false)
  const [memberImageLoaded, setMemberImageLoaded] = useState(false)
  const [flagImageLoaded, setFlagImageLoaded] = useState(false)

  // Replace Favorite BTS Song input with Spotify search autocomplete
  const [songQuery, setSongQuery] = useState("");
  const [songSuggestions, setSongSuggestions] = useState<BTSSong[]>([]);
  const [showSongSuggestions, setShowSongSuggestions] = useState(false);

  const songInputRef = useRef<HTMLInputElement>(null);

  const handleSongSearch = useCallback((value: string) => {
    if (!value.trim()) {
      setSongSuggestions([]);
      setShowSongSuggestions(false);
      return;
    }

    const results = searchBTSSongs(value);
    setSongSuggestions(results);
    setShowSongSuggestions(true);
  }, []);

  const handleSongSelect = (song: BTSSong) => {
    setFormData(prev => ({ ...prev, favoriteSong: song.title }));
    setSongQuery(song.title);
    setShowSongSuggestions(false);
  };

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

  // In the downloadCard function, before drawing, load the font
  const loadFont = async () => {
    if (document.fonts && 'FontFace' in window) {
      try {
        const font = new FontFace('Black Han Sans', "url('/fonts/BlackHanSans-Regular.woff2') format('woff2')");
        await font.load();
        document.fonts.add(font);
      } catch (e) {}
    }
  }

  const downloadCard = async () => {
    await loadFont();
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
    
    // Use theme with proper typing
    const theme = themeMap[formData.theme as keyof typeof themeMap] || themeMap.classic;
    
    // Draw background
    ctx.fillStyle = theme.bodyBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Draw header
    ctx.fillStyle = theme.headerBg;
    ctx.fillRect(20, 20, canvas.width - 40, 200);
    
    // Title text
    ctx.fillStyle = theme.headerText;
    ctx.font = "bold 120px 'Black Han Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ARMY CARD", canvas.width / 2, 160);
    
    // Draw badge/icon
    if (formData.badge) {
      ctx.font = "80px 'Black Han Sans', sans-serif";
      ctx.fillText(formData.badge, canvas.width - 120, 160);
    }
    
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
    ctx.fillStyle = theme.bodyBg;
    ctx.fillRect(40, 240 + (canvas.width - 80) + 20, canvas.width - 80, canvas.height - (240 + (canvas.width - 80) + 60));
    
    // Info lines
    let currentY = 240 + (canvas.width - 80) + 100;
    const lineHeight = 120;
    // Update drawLabelWithValue signature
    type DrawLabelWithValue = (label: string, value: string, y: number, isBold?: boolean) => number;
    const drawLabelWithValue: DrawLabelWithValue = (label, value, y, isBold = false) => {
      ctx.fillStyle = theme.bullet;
      ctx.beginPath();
      ctx.arc(80, y - 20, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = theme.text;
      ctx.font = `${isBold ? 'bold' : '500'} 80px 'Black Han Sans', sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(`${label}:`, 110, y);
      const labelWidth = ctx.measureText(`${label}:`).width;
      ctx.font = "500 70px 'Black Han Sans', sans-serif";
      ctx.fillText(value, 130 + labelWidth, y);
      return y + lineHeight;
    };
    currentY = drawLabelWithValue("Name", formData.name, currentY, true);
    
    // Country with flag
    if (formData.country) {
      ctx.fillStyle = theme.bullet;
      ctx.beginPath();
      ctx.arc(80, currentY - 20, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = theme.text;
      ctx.font = "bold 80px 'Black Han Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Country:", 110, currentY);
      const labelWidth = ctx.measureText("Country:").width;
      const flagX = 130 + labelWidth;
      const flagY = currentY - 45;
      if (flagImageRef.current) {
        ctx.drawImage(flagImageRef.current, flagX, flagY, 60, 40);
      }
      ctx.font = "500 70px 'Black Han Sans', sans-serif";
      ctx.fillText(formData.country, flagX + 70, currentY);
      currentY += lineHeight;
    }
    
    currentY = drawLabelWithValue("Bias", selectedMember?.name || formData.bias, currentY);
    currentY = drawLabelWithValue("ARMY Since", formData.armySince, currentY);
    
    // Favorite Song
    if (formData.favoriteSong) {
      currentY = drawLabelWithValue("Fav. Song", formData.favoriteSong, currentY);
    }
    
    // Brand URL at the bottom
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.font = "bold 36px 'Black Han Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("LOVEFORBTS.COM", canvas.width / 2, canvas.height - 50);
    
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
              {biasOptions.map((member) => (
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

          <div>
            <label htmlFor="theme" className="block text-sm font-medium mb-1 black-han-sans">
              Card Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.theme ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="classic">Classic Yellow</option>
              <option value="purple">BTS Purple</option>
              <option value="black">Black & Gold</option>
              <option value="pastel">Pastel Dream</option>
            </select>
            {errors.theme && <p className="mt-1 text-sm text-red-500">{errors.theme}</p>}
          </div>

          <div>
            <label htmlFor="favoriteSong" className="block text-sm font-medium mb-1 black-han-sans">
              Favorite BTS Song <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <input
                ref={songInputRef}
                type="text"
                id="favoriteSong"
                name="favoriteSong"
                value={songQuery}
                onChange={e => {
                  setSongQuery(e.target.value);
                  setFormData(prev => ({ ...prev, favoriteSong: e.target.value }));
                  handleSongSearch(e.target.value);
                }}
                className={`w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                placeholder="Search for your favorite BTS song..."
                autoComplete="off"
                maxLength={40}
              />
              {showSongSuggestions && songSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {songSuggestions.map((song) => (
                    <div
                      key={song.title}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSongSelect(song)}
                    >
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-gray-600">{song.album} ({song.year})</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="cardStyle" className="block text-sm font-medium mb-1 black-han-sans">
              Card Style
            </label>
            <select
              id="cardStyle"
              name="cardStyle"
              value={formData.cardStyle}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.cardStyle ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="fun">Fun</option>
            </select>
            {errors.cardStyle && <p className="mt-1 text-sm text-red-500">{errors.cardStyle}</p>}
          </div>

          <div>
            <label htmlFor="badge" className="block text-sm font-medium mb-1 black-han-sans">
              Badge/Icon <span className="text-gray-400">(optional)</span>
            </label>
            <select
              id="badge"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="💜">💜 Purple Heart</option>
              <option value="🎤">🎤 Mic</option>
              <option value="🐨">🐨 RM</option>
              <option value="🐹">🐹 Jin</option>
              <option value="🐱">🐱 Suga</option>
              <option value="🐿️">🐿️ J-Hope</option>
              <option value="🐥">🐥 Jimin</option>
              <option value="🐻">🐻 V</option>
              <option value="🐰">🐰 Jungkook</option>
              <option value="⭐">⭐ Star</option>
              <option value="">None</option>
            </select>
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
            <div
              className={`w-full h-full flex flex-col ${
                formData.cardStyle === 'fun' ? 'rounded-3xl shadow-2xl' : formData.cardStyle === 'minimal' ? 'rounded-md border border-gray-300 shadow-none' : 'rounded-lg shadow-lg'
              }`}
              style={{
                borderColor: themeMap[formData.theme as keyof typeof themeMap].border,
                background: themeMap[formData.theme as keyof typeof themeMap].bodyBg,
                borderWidth: 2,
                overflow: 'hidden',
              }}
            >
              {/* Card Header */}
              <div
                className="p-3 border-b-2 flex items-center justify-between"
                style={{
                  background: themeMap[formData.theme as keyof typeof themeMap].headerBg,
                  borderColor: themeMap[formData.theme as keyof typeof themeMap].border,
                }}
              >
                <h3
                  className="text-center flex-1 black-han-sans text-xl"
                  style={{ color: themeMap[formData.theme as keyof typeof themeMap].headerText }}
                >
                  ARMY CARD
                </h3>
                {formData.badge && (
                  <span className="ml-2 text-2xl" style={{ fontFamily: 'Black Han Sans, sans-serif' }}>{formData.badge}</span>
                )}
              </div>
              {/* Member Image */}
              <div className="w-full aspect-square relative border-b-2" style={{ borderColor: themeMap[formData.theme as keyof typeof themeMap].border }}>
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
              <div className="p-4 flex-grow flex flex-col justify-between" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bodyBg }}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                    <p className="font-bold black-han-sans text-lg" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                      Name: <span className="font-normal">{formData.name}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                    <p className="font-bold black-han-sans text-lg mr-1" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>Country: </p>
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
                      <span className="font-normal" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>{formData.country}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                    <p className="font-bold black-han-sans text-lg" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                      Bias: <span className="font-normal">{selectedMember?.name}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                    <p className="font-bold black-han-sans text-lg" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                      ARMY Since: <span className="font-normal">{formData.armySince}</span>
                    </p>
                  </div>
                  {formData.favoriteSong && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                      <p className="font-bold black-han-sans text-lg" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                        Fav. Song: <span className="font-normal">{formData.favoriteSong}</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-2 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: 'Inter, sans-serif' }}>
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