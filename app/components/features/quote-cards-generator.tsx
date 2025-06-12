"use client"

import React, { useState, useRef } from "react"
import { Download, Palette, Quote, RefreshCw, Heart, Instagram, Twitter, Copy, Type, Image as ImageIcon, Sparkles } from "lucide-react"

// BTS Member Quotes with attributions
const BTS_MEMBER_QUOTES = [
  // RM
  { text: "Love yourself, love myself, peace", member: "RM", category: "Self-Love", memberColor: "#9C27B0" },
  { text: "I believe in your galaxy", member: "RM", category: "Inspiration", memberColor: "#9C27B0" },
  { text: "Live life with no worries", member: "RM", category: "Life", memberColor: "#9C27B0" },
  { text: "Don't be trapped in someone else's dream", member: "RM", category: "Independence", memberColor: "#9C27B0" },
  { text: "I have my persona, but I also have many things I want to share", member: "RM", category: "Authenticity", memberColor: "#9C27B0" },
  
  // Jin
  { text: "I'm worldwide handsome", member: "Jin", category: "Confidence", memberColor: "#E91E63" },
  { text: "Even when this rain stops, when clouds go away, I stand here, just the same", member: "Jin", category: "Resilience", memberColor: "#E91E63" },
  { text: "I think I'm being sincere, not trying to be cool", member: "Jin", category: "Honesty", memberColor: "#E91E63" },
  { text: "Effort makes you. You will regret someday if you don't do your best now", member: "Jin", category: "Motivation", memberColor: "#E91E63" },
  { text: "I'm good at everything", member: "Jin", category: "Confidence", memberColor: "#E91E63" },
  
  // SUGA
  { text: "Dream, hope, forward, forward", member: "SUGA", category: "Dreams", memberColor: "#000000" },
  { text: "I want to give people strength through music", member: "SUGA", category: "Music", memberColor: "#000000" },
  { text: "Pain, passion, my only escape", member: "SUGA", category: "Growth", memberColor: "#000000" },
  { text: "I'd rather die than live without passion", member: "SUGA", category: "Passion", memberColor: "#000000" },
  { text: "Music saved my life", member: "SUGA", category: "Music", memberColor: "#000000" },
  
  // J-Hope
  { text: "I'm your hope, you're my hope, I'm J-Hope", member: "J-Hope", category: "Hope", memberColor: "#FF9800" },
  { text: "If you don't work hard, there won't be good results", member: "J-Hope", category: "Hard Work", memberColor: "#FF9800" },
  { text: "I always think positive", member: "J-Hope", category: "Positivity", memberColor: "#FF9800" },
  { text: "Let's walk on a path of flowers only", member: "J-Hope", category: "Optimism", memberColor: "#FF9800" },
  { text: "Hope, hope, let's go!", member: "J-Hope", category: "Encouragement", memberColor: "#FF9800" },
  
  // Jimin
  { text: "Let's love ourselves", member: "Jimin", category: "Self-Love", memberColor: "#FFD700" },
  { text: "I have many flaws and make many mistakes, but I think I'm a good person", member: "Jimin", category: "Self-Acceptance", memberColor: "#FFD700" },
  { text: "Go on your path, even if you live for a day", member: "Jimin", category: "Perseverance", memberColor: "#FFD700" },
  { text: "Effort makes you. You will regret someday if you don't do your best now", member: "Jimin", category: "Effort", memberColor: "#FFD700" },
  { text: "You are perfect as you are", member: "Jimin", category: "Self-Worth", memberColor: "#FFD700" },
  
  // V
  { text: "I want to be a singer vocalist that can touch the hearts of people who listen to my music", member: "V", category: "Dreams", memberColor: "#4CAF50" },
  { text: "Don't be trapped in someone else's dream", member: "V", category: "Individuality", memberColor: "#4CAF50" },
  { text: "I want to show people that we are all beautiful", member: "V", category: "Beauty", memberColor: "#4CAF50" },
  { text: "Live life with no worries", member: "V", category: "Peace", memberColor: "#4CAF50" },
  { text: "Purple is the last color of the rainbow. Purple means I will trust and love you for a long time", member: "V", category: "Love", memberColor: "#4CAF50" },
  
  // Jungkook
  { text: "Effort makes you. You will regret someday if you don't do your best now", member: "Jungkook", category: "Motivation", memberColor: "#2196F3" },
  { text: "The best thing in life is finding someone who knows all your mistakes and weaknesses and still thinks you're completely amazing", member: "Jungkook", category: "Love", memberColor: "#2196F3" },
  { text: "Don't give up on your dreams", member: "Jungkook", category: "Dreams", memberColor: "#2196F3" },
  { text: "I'd like to say that although you may not be able to see it with your eyes, you can feel it with your heart", member: "Jungkook", category: "Heart", memberColor: "#2196F3" },
  { text: "Living without passion is like being dead", member: "Jungkook", category: "Passion", memberColor: "#2196F3" },
  
  // General Inspirational
  { text: "Teamwork makes the dream work", category: "Unity", memberColor: "#7B1FA2" },
  { text: "Music transcends all barriers", category: "Music", memberColor: "#7B1FA2" },
  { text: "You are worthy of love and respect", category: "Self-Worth", memberColor: "#7B1FA2" },
  { text: "Every day is a new beginning", category: "Hope", memberColor: "#7B1FA2" },
  { text: "Be the light in someone's darkness", category: "Kindness", memberColor: "#7B1FA2" },
  { text: "Your voice matters", category: "Empowerment", memberColor: "#7B1FA2" },
  { text: "Chase your dreams with passion", category: "Dreams", memberColor: "#7B1FA2" },
  { text: "Small acts of kindness can change the world", category: "Kindness", memberColor: "#7B1FA2" },
  { text: "Growth happens outside your comfort zone", category: "Growth", memberColor: "#7B1FA2" },
  { text: "Together we are stronger", category: "Unity", memberColor: "#7B1FA2" }
]

// Custom fonts for BTS styling
const CUSTOM_FONTS = [
  { id: "arial", name: "Arial", fontFamily: "Arial, sans-serif", description: "Clean & Simple" },
  { id: "georgia", name: "Georgia", fontFamily: "Georgia, serif", description: "Classic Serif" },
  { id: "impact", name: "Impact", fontFamily: "Impact, sans-serif", description: "Bold & Strong" },
  { id: "times", name: "Times New Roman", fontFamily: "Times New Roman, serif", description: "Traditional" },
  { id: "courier", name: "Courier New", fontFamily: "Courier New, monospace", description: "Typewriter Style" },
  { id: "trebuchet", name: "Trebuchet MS", fontFamily: "Trebuchet MS, sans-serif", description: "Modern Sans" },
  { id: "palatino", name: "Palatino", fontFamily: "Palatino, serif", description: "Elegant Serif" },
  { id: "helvetica", name: "Helvetica", fontFamily: "Helvetica, Arial, sans-serif", description: "Swiss Style" },
  { id: "comic", name: "Comic Sans", fontFamily: "Comic Sans MS, cursive", description: "Playful & Fun" },
  { id: "black-han", name: "Black Han Sans", fontFamily: "Black Han Sans, sans-serif", description: "BTS Style" }
]

// Card design themes
const CARD_THEMES = [
  {
    id: "gradient-purple",
    name: "Purple Dreams",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "gradient-sunset",
    name: "Sunset Vibes",
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "bts-gold",
    name: "BTS Gold",
    background: "linear-gradient(135deg, #ffd700 0%, #ffb347 100%)",
    textColor: "#000000",
    accentColor: "#333333"
  },
  {
    id: "elegant-black",
    name: "Elegant Black",
    background: "linear-gradient(135deg, #000000 0%, #434343 100%)",
    textColor: "#ffffff",
    accentColor: "#ffd700"
  },
  {
    id: "pastel-dream",
    name: "Pastel Dream",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    textColor: "#333333",
    accentColor: "#666666"
  },
  {
    id: "cosmic-purple",
    name: "Cosmic Purple",
    background: "linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    background: "linear-gradient(135deg, #e8b4cb 0%, #e8b4cb 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "forest-calm",
    name: "Forest Calm",
    background: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    background: "#ffffff",
    textColor: "#000000",
    accentColor: "#666666"
  }
]

// Social media formats
const SOCIAL_FORMATS = [
  { id: "instagram-story", name: "Instagram Story", width: 1080, height: 1920 },
  { id: "instagram-post", name: "Instagram Post", width: 1080, height: 1080 },
  { id: "twitter-post", name: "Twitter Post", width: 1024, height: 512 },
  { id: "custom", name: "Custom", width: 800, height: 600 }
]

export function QuoteCardsGenerator() {
  const [selectedQuote, setSelectedQuote] = useState(BTS_MEMBER_QUOTES[0])
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0])
  const [selectedFormat, setSelectedFormat] = useState(SOCIAL_FORMATS[0])
  const [selectedFont, setSelectedFont] = useState(CUSTOM_FONTS[0])
  const [customText, setCustomText] = useState("")
  const [useCustomText, setUseCustomText] = useState(false)
  const [includeAuthor, setIncludeAuthor] = useState(true)
  const [authorText, setAuthorText] = useState("Love for BTS")
  const [textSize, setTextSize] = useState(100)
  const [textPosition, setTextPosition] = useState("center")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  
  const cardRef = useRef<HTMLDivElement>(null)

  const handleRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * BTS_MEMBER_QUOTES.length)
    setSelectedQuote(BTS_MEMBER_QUOTES[randomIndex])
  }

  const handleDownload = async (format: 'png' | 'jpg' = 'png') => {
    if (!cardRef.current) return
    
    setIsGenerating(true)
    
    try {
      // Create a canvas for high-quality rendering
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return
      
      canvas.width = selectedFormat.width
      canvas.height = selectedFormat.height
      
      // Create gradient background - exact match to preview
      if (selectedTheme.background.includes('gradient')) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        
        // Enhanced gradient parsing to match preview exactly
        const gradientMap: { [key: string]: [string, string] } = {
          'gradient-purple': ['#667eea', '#764ba2'],
          'gradient-sunset': ['#fa709a', '#fee140'],
          'bts-gold': ['#ffd700', '#ffb347'],
          'elegant-black': ['#000000', '#434343'],
          'pastel-dream': ['#ffecd2', '#fcb69f'],
          'cosmic-purple': ['#8360c3', '#2ebf91'],
          'rose-gold': ['#e8b4cb', '#e8b4cb'],
          'ocean-breeze': ['#74b9ff', '#0984e3'],
          'forest-calm': ['#56ab2f', '#a8e6cf']
        }
        
        const colors = gradientMap[selectedTheme.id] || ['#667eea', '#764ba2']
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = selectedTheme.background
      }
      
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Calculate exact preview sizing - match the preview container sizing
      const currentText = useCustomText ? customText : selectedQuote.text
      const previewWidthRatio = selectedFormat.width > selectedFormat.height ? 0.3 : 0.25
      const previewWidth = selectedFormat.width > selectedFormat.height 
        ? Math.min(400, selectedFormat.width * previewWidthRatio)
        : Math.min(300, selectedFormat.width * previewWidthRatio)
      
      // Calculate font size to match preview exactly
      const scaleFactor = canvas.width / previewWidth
      const baseFontSize = Math.max(12, 18 * (textSize / 100)) * scaleFactor
      const padding = canvas.width * 0.1
      const maxWidth = canvas.width - (padding * 2)
      
      // Set font with exact family matching preview
      const fontFamily = selectedFont.fontFamily.includes('Black Han Sans') 
        ? 'Black Han Sans, sans-serif' 
        : selectedFont.fontFamily.split(',')[0].trim()
      
      ctx.font = `${Math.floor(baseFontSize)}px ${fontFamily}`
      ctx.fillStyle = selectedTheme.textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Wrap text exactly like preview
      const words = currentText.split(' ')
      const lines: string[] = []
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)
      
      // Calculate vertical positioning exactly like preview
      const lineHeight = baseFontSize * 1.4
      const totalTextHeight = lines.length * lineHeight
      const quoteIconSize = Math.max(20, 32 * (textSize / 100)) * scaleFactor
      const heartIconSize = Math.max(16, 20 * (textSize / 100)) * scaleFactor
      
      let contentStartY: number
      const iconSpacing = quoteIconSize + (16 * scaleFactor) // mb-4 equivalent
      const textToHeartSpacing = 24 * scaleFactor // mt-4 equivalent
      
      if (textPosition === 'top') {
        contentStartY = padding + iconSpacing
      } else if (textPosition === 'bottom') {
        const totalContentHeight = iconSpacing + totalTextHeight + textToHeartSpacing + heartIconSize
        contentStartY = canvas.height - padding - totalContentHeight + iconSpacing
      } else {
        const totalContentHeight = iconSpacing + totalTextHeight + textToHeartSpacing + heartIconSize
        contentStartY = (canvas.height - totalContentHeight) / 2 + iconSpacing
      }
      
      // Draw quote icon (simplified as text since canvas can't render Lucide icons)
      ctx.font = `${Math.floor(quoteIconSize)}px serif`
      ctx.fillStyle = selectedTheme.accentColor
      ctx.globalAlpha = 0.2
      ctx.fillText('\u201C', canvas.width / 2, contentStartY - iconSpacing + quoteIconSize/2)
      ctx.globalAlpha = 1.0
      
      // Draw main text with exact font
      ctx.font = `${Math.floor(baseFontSize)}px ${fontFamily}`
      ctx.fillStyle = selectedTheme.textColor
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, contentStartY + (index * lineHeight))
      })
      
      let currentY = contentStartY + totalTextHeight
      
      // Add member attribution for BTS quotes (exact match to preview)
      if (!useCustomText && selectedQuote.member) {
        const memberBadgeY = currentY + 16 * scaleFactor
        
        // Draw member badge background (rounded rectangle simulation)
        const memberText = `- ${selectedQuote.member}`
        const memberFontSize = Math.floor(12 * scaleFactor)
        ctx.font = `bold ${memberFontSize}px ${fontFamily}`
        const memberTextWidth = ctx.measureText(memberText).width
        const badgeWidth = memberTextWidth + 24 * scaleFactor
        const badgeHeight = 24 * scaleFactor
        
        ctx.fillStyle = selectedQuote.memberColor || selectedTheme.accentColor
        ctx.fillRect(canvas.width / 2 - badgeWidth / 2, memberBadgeY - badgeHeight / 2, badgeWidth, badgeHeight)
        
        // Draw member text
        ctx.fillStyle = '#ffffff'
        ctx.fillText(memberText, canvas.width / 2, memberBadgeY)
        
        currentY = memberBadgeY + badgeHeight / 2 + 8 * scaleFactor
      }
      
      // Add custom author if enabled
      if (includeAuthor && authorText) {
        const authorFontSize = Math.max(10, 14 * (textSize / 100)) * scaleFactor
        ctx.font = `${Math.floor(authorFontSize)}px ${fontFamily}`
        ctx.fillStyle = selectedTheme.accentColor
        ctx.globalAlpha = 0.8
        currentY += 16 * scaleFactor
        ctx.fillText(`- ${authorText}`, canvas.width / 2, currentY)
        ctx.globalAlpha = 1.0
        currentY += authorFontSize + 8 * scaleFactor
      }
      
      // Draw heart icon (simplified as text)
      ctx.font = `${Math.floor(heartIconSize)}px serif`
      ctx.fillStyle = selectedTheme.accentColor
      ctx.globalAlpha = 0.3
      ctx.fillText('\u2665', canvas.width / 2, currentY + textToHeartSpacing)
      ctx.globalAlpha = 1.0
      
      // Download
      const link = document.createElement('a')
      link.download = `bts-quote-card-${Date.now()}.${format}`
      link.href = canvas.toDataURL(`image/${format}`, 0.9)
      link.click()
      
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyText = () => {
    const textToCopy = useCustomText ? customText : selectedQuote.text
    navigator.clipboard.writeText(textToCopy)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const currentText = useCustomText ? customText : selectedQuote.text

  return (
    <div className="space-y-6">
      {/* Quote Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold black-han-sans">Choose Your Message</h2>
          <button
            onClick={handleRandomQuote}
            className="flex items-center gap-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg border border-gray-300 transition-colors"
          >
            <RefreshCw size={16} />
            Random Quote
          </button>
        </div>

        {/* Toggle between preset quotes and custom text */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setUseCustomText(false)}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              !useCustomText 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            Preset Quotes
          </button>
          <button
            onClick={() => setUseCustomText(true)}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              useCustomText 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
          >
            Custom Text
          </button>
        </div>

        {useCustomText ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Your Custom Message</label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Write your own inspirational message..."
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
              rows={3}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {BTS_MEMBER_QUOTES.map((quote, index) => (
              <button
                key={index}
                onClick={() => setSelectedQuote(quote)}
                className={`p-3 text-left rounded-lg border-2 transition-colors ${
                  selectedQuote.text === quote.text
                    ? 'bg-purple-100 border-purple-300'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="text-sm font-medium line-clamp-2">{quote.text}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">{quote.category}</div>
                  {quote.member && (
                    <div 
                      className="text-xs font-bold px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: quote.memberColor }}
                    >
                      {quote.member}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold black-han-sans flex items-center gap-2">
          <Type size={20} />
          Choose Font Style
        </h2>
        <div className="space-y-3">
          <select
            value={selectedFont.id}
            onChange={(e) => setSelectedFont(CUSTOM_FONTS.find(f => f.id === e.target.value) || CUSTOM_FONTS[0])}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-base"
          >
            {CUSTOM_FONTS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name} - {font.description}
              </option>
            ))}
          </select>
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Font Preview:</div>
            <div 
              className="text-xl font-medium"
              style={{ fontFamily: selectedFont.fontFamily }}
            >
              {selectedFont.name} - The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>

      {/* Design Theme Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold black-han-sans flex items-center gap-2">
          <Palette size={20} />
          Choose Design Theme
        </h2>
        <div className="space-y-3">
          <select
            value={selectedTheme.id}
            onChange={(e) => setSelectedTheme(CARD_THEMES.find(t => t.id === e.target.value) || CARD_THEMES[0])}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-base"
          >
            {CARD_THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <div 
            className="h-20 rounded-lg border-2 border-gray-200 flex items-center justify-center"
            style={{ background: selectedTheme.background }}
          >
            <div className="text-sm font-medium" style={{ color: selectedTheme.textColor }}>
              {selectedTheme.name} Preview
            </div>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold black-han-sans">Social Media Format</h2>
        <select
          value={selectedFormat.id}
          onChange={(e) => setSelectedFormat(SOCIAL_FORMATS.find(f => f.id === e.target.value) || SOCIAL_FORMATS[0])}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-base"
        >
          {SOCIAL_FORMATS.map((format) => (
            <option key={format.id} value={format.id}>
              {format.name} ({format.width} × {format.height})
            </option>
          ))}
        </select>
      </div>

      {/* Text Customization */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold black-han-sans flex items-center gap-2">
          <Sparkles size={20} />
          Text Customization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text Size: {textSize}%</label>
            <input
              type="range"
              min="50"
              max="150"
              value={textSize}
              onChange={(e) => setTextSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Text Position */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text Position</label>
            <select
              value={textPosition}
              onChange={(e) => setTextPosition(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </div>
        
        {/* Attribution Options */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="include-author"
              checked={includeAuthor}
              onChange={(e) => setIncludeAuthor(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="include-author" className="text-sm font-medium">
              Include attribution
            </label>
          </div>
          
          {includeAuthor && (
            <div className="ml-7">
              <input
                type="text"
                value={authorText}
                onChange={(e) => setAuthorText(e.target.value)}
                placeholder="Attribution text"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preview Card */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold black-han-sans flex items-center gap-2">
          <ImageIcon size={20} />
          Live Preview
        </h2>
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-2xl p-4 border-2 border-gray-300">
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-xl shadow-xl mx-auto"
              style={{
                width: selectedFormat.width > selectedFormat.height 
                  ? Math.min(400, selectedFormat.width * 0.3)
                  : Math.min(300, selectedFormat.width * 0.25),
                height: selectedFormat.width > selectedFormat.height 
                  ? Math.min(300, selectedFormat.height * 0.3)
                  : Math.min(500, selectedFormat.height * 0.25),
                background: selectedTheme.background,
                aspectRatio: `${selectedFormat.width}/${selectedFormat.height}`
              }}
            >
              <div 
                className={`absolute inset-0 flex flex-col items-center text-center px-6 ${
                  textPosition === 'top' ? 'justify-start pt-8' :
                  textPosition === 'bottom' ? 'justify-end pb-8' :
                  'justify-center'
                }`}
              >
                <Quote 
                  size={Math.max(20, 32 * (textSize / 100))} 
                  className="mb-4 opacity-20" 
                  style={{ color: selectedTheme.accentColor }} 
                />
                
                <div 
                  className="font-medium leading-relaxed mb-6"
                  style={{ 
                    color: selectedTheme.textColor,
                    fontFamily: selectedFont.fontFamily,
                    fontSize: `${Math.max(12, 18 * (textSize / 100))}px`,
                    lineHeight: '1.4'
                  }}
                >
                  "{currentText}"
                </div>
                
                {/* Show member attribution for BTS quotes */}
                {!useCustomText && selectedQuote.member && (
                  <div 
                    className="text-xs font-bold px-3 py-1 rounded-full text-white mb-2"
                    style={{ backgroundColor: selectedQuote.memberColor }}
                  >
                    - {selectedQuote.member}
                  </div>
                )}
                
                {includeAuthor && (
                  <div 
                    className="text-sm opacity-80"
                    style={{ 
                      color: selectedTheme.accentColor,
                      fontFamily: selectedFont.fontFamily,
                      fontSize: `${Math.max(10, 14 * (textSize / 100))}px`
                    }}
                  >
                    - {authorText}
                  </div>
                )}
                
                <Heart 
                  size={Math.max(16, 20 * (textSize / 100))} 
                  className="mt-4 opacity-30" 
                  style={{ color: selectedTheme.accentColor }}
                />
              </div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {selectedFormat.name} ({selectedFormat.width} × {selectedFormat.height})
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleDownload('png')}
          disabled={isGenerating || (!useCustomText && !selectedQuote.text) || (useCustomText && !customText.trim())}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download size={18} />
          {isGenerating ? 'Generating...' : 'Download PNG'}
        </button>
        
        <button
          onClick={() => handleDownload('jpg')}
          disabled={isGenerating || (!useCustomText && !selectedQuote.text) || (useCustomText && !customText.trim())}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download size={18} />
          {isGenerating ? 'Generating...' : 'Download JPG'}
        </button>
        
        <button
          onClick={handleCopyText}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Copy size={18} />
          {showCopied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>

      {/* Social Media Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-3 black-han-sans">📱 Social Media Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <Instagram size={16} className="text-pink-500 mt-0.5" />
            <div>
              <div className="font-medium">Instagram Stories</div>
              <div className="text-gray-600">Use 1080×1920 format for best quality</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Twitter size={16} className="text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium">Twitter Posts</div>
              <div className="text-gray-600">1024×512 works great for tweets</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Heart size={16} className="text-red-500 mt-0.5" />
            <div>
              <div className="font-medium">TikTok</div>
              <div className="text-gray-600">Use Instagram Story format</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 