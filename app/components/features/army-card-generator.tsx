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
import { getArmyCardPhoto, getRandomVariedPhoto } from "@/app/lib/member-photos"

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
  photoOption: z.string().min(1, { message: "Please select a photo option" }),
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
  const userImageRef = useRef<HTMLImageElement | null>(null)
  const flagImageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState<ArmyCardFormData>({
    name: "",
    country: "",
    bias: "",
    armySince: "",
    theme: "classic",
    favoriteSong: "",
    cardStyle: "classic",
    badge: "💜",
    photoOption: "member",
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
    photoOption?: string;
  }>({})

  const [selectedMember, setSelectedMember] = useState<typeof membersData[0] | null>(null)
  const [memberPhoto, setMemberPhoto] = useState<string>("")
  const [userPhoto, setUserPhoto] = useState<string>("")
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [cardGenerated, setCardGenerated] = useState(false)
  const [memberImageLoaded, setMemberImageLoaded] = useState(false)
  const [userImageLoaded, setUserImageLoaded] = useState(false)
  const [flagImageLoaded, setFlagImageLoaded] = useState(false)

  // Replace Favorite BTS Song input with Spotify search autocomplete
  const [songQuery, setSongQuery] = useState(formData.favoriteSong || "");
  const [songSuggestions, setSongSuggestions] = useState<BTSSong[]>([]);
  const [showSongSuggestions, setShowSongSuggestions] = useState(false);
  const [isSelectingSong, setIsSelectingSong] = useState(false);

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
    setIsSelectingSong(true);
    
    // Set both the display value and form data immediately
    setSongQuery(song.title);
    setFormData(prev => ({ ...prev, favoriteSong: song.title }));
    setShowSongSuggestions(false);
    
    // Reset the selection flag after a brief moment
    setTimeout(() => {
      setIsSelectingSong(false);
    }, 100);
  };

  const handleSongInputChange = (value: string) => {
    setSongQuery(value);
    
    // Don't process changes if we're in the middle of selecting
    if (isSelectingSong) {
      return;
    }
    
    // Search for songs to show suggestions
    handleSongSearch(value);
    
    // Only set formData if there's an exact match or if clearing
    const results = searchBTSSongs(value);
    const exactMatch = results.find(song => song.title.toLowerCase() === value.toLowerCase());
    
    if (exactMatch) {
      setFormData(prev => ({ ...prev, favoriteSong: exactMatch.title }));
    } else if (value === '') {
      setFormData(prev => ({ ...prev, favoriteSong: '' }));
    }
  };

  const handleSongInputBlur = () => {
    // Don't process blur if we're selecting a song
    if (isSelectingSong) {
      return;
    }
    
    // Hide suggestions after a delay to allow clicks
    setTimeout(() => {
      setShowSongSuggestions(false);
      
      // Only clear invalid input if we're not selecting and no exact match
      if (!isSelectingSong) {
        const results = searchBTSSongs(songQuery);
        const exactMatch = results.find(song => song.title.toLowerCase() === songQuery.toLowerCase());
        if (!exactMatch && songQuery !== '' && songQuery !== formData.favoriteSong) {
          setSongQuery(formData.favoriteSong || '');
        }
      }
    }, 200);
  };

  const handleRefreshPhoto = () => {
    if (selectedMember) {
      const newPhoto = getRandomVariedPhoto(selectedMember.slug);
      setMemberPhoto(newPhoto);
      // Reset member image loaded state so it can reload the new image
      setMemberImageLoaded(false);
      
      // Auto-scroll to card preview on mobile devices
      const isMobile = window.innerWidth < 768 // md breakpoint
      if (isMobile && cardRef.current) {
        setTimeout(() => {
          cardRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }, 300)
      }
      
      toast.success("Photo refreshed!", {
        description: "Showing a new photo for your bias",
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUserPhotoFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUserPhoto(result);
      setUserImageLoaded(false); // Reset for canvas preparation
      
      toast.success("Photo uploaded!", {
        description: "Your photo is ready to use on the card",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setUserPhoto("");
    setUserPhotoFile(null);
    setUserImageLoaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    toast.success("Photo removed", {
      description: "User photo has been cleared",
    });
  };

  // Update selected member when bias changes
  useEffect(() => {
    if (formData.bias) {
      const member = membersData.find(m => m.slug === formData.bias)
      setSelectedMember(member || null)
      
      // Set dynamic member photo
      if (member) {
        const dynamicPhoto = getArmyCardPhoto(member.slug)
        setMemberPhoto(dynamicPhoto)
      }
    } else {
      setSelectedMember(null)
      setMemberPhoto("")
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

  // Preload images for canvas rendering
  useEffect(() => {
    if (cardGenerated) {
      // Load member image if needed
      if (selectedMember && memberPhoto && (formData.photoOption === "member" || formData.photoOption === "both")) {
        const img = document.createElement('img');
        img.crossOrigin = "anonymous";
        img.onload = () => {
          memberImageRef.current = img;
          setMemberImageLoaded(true);
        };
        img.src = memberPhoto;
      }

      // Load user image if needed
      if (userPhoto && (formData.photoOption === "user" || formData.photoOption === "both")) {
        const img = document.createElement('img');
        img.onload = () => {
          userImageRef.current = img;
          setUserImageLoaded(true);
        };
        img.src = userPhoto;
      }
      
      // Load flag image if country is selected
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
  }, [selectedMember, memberPhoto, userPhoto, cardGenerated, formData.country, formData.photoOption]);

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
    
    // Auto-scroll to card preview on mobile devices
    const isMobile = window.innerWidth < 768 // md breakpoint
    if (isMobile && cardRef.current) {
      // Small delay to allow loading state to show, then scroll
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 200)
    }
    
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
    
    // Wait for member image to load first if needed
    if (!memberImageLoaded && selectedMember && memberPhoto && (formData.photoOption === "member" || formData.photoOption === "both")) {
      toast.info("Preparing member image...", {
        description: "Please wait while we prepare your card for download",
      })
      const img = document.createElement('img');
      img.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = memberPhoto;
        memberImageRef.current = img;
      });
    }

    // Wait for user image to load if needed
    if (!userImageLoaded && userPhoto && (formData.photoOption === "user" || formData.photoOption === "both")) {
      toast.info("Preparing your photo...", {
        description: "Processing your uploaded image",
      })
      const img = document.createElement('img');
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = userPhoto;
        userImageRef.current = img;
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
    ctx.font = "bold 90px 'Black Han Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ARMY CARD", canvas.width / 2, 140);
    
    // Draw badge/icon
    if (formData.badge) {
      ctx.font = "60px 'Black Han Sans', sans-serif";
      ctx.fillText(formData.badge, canvas.width - 100, 140);
    }
    
    // Draw photos based on photoOption
    const photoArea = {
      x: 40,
      y: 240,
      width: canvas.width - 80,
      height: canvas.width - 80
    };

    if (formData.photoOption === "member" && memberImageRef.current) {
      // Draw member image only with proper aspect ratio and centering
      const memberImg = memberImageRef.current;
      const memberAspectRatio = memberImg.naturalWidth / memberImg.naturalHeight;
      const targetAspectRatio = photoArea.width / photoArea.height;
      
      let drawWidth = photoArea.width;
      let drawHeight = photoArea.height;
      let drawX = photoArea.x;
      let drawY = photoArea.y;
      
      // Adjust dimensions to maintain aspect ratio while filling the space
      if (memberAspectRatio > targetAspectRatio) {
        // Image is wider, fit by height and center horizontally
        drawHeight = photoArea.height;
        drawWidth = drawHeight * memberAspectRatio;
        drawX = photoArea.x + (photoArea.width - drawWidth) / 2;
      } else {
        // Image is taller, fit by width and center vertically
        drawWidth = photoArea.width;
        drawHeight = drawWidth / memberAspectRatio;
        drawY = photoArea.y + (photoArea.height - drawHeight) / 2;
      }
      
      // Use clipping to ensure image doesn't overflow the designated area
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
      ctx.clip();
      ctx.drawImage(memberImg, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
      
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.strokeRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
    } else if (formData.photoOption === "user" && userImageRef.current) {
      // Draw user image only with proper aspect ratio and centering (no cropping)
      const userImg = userImageRef.current;
      const userAspectRatio = userImg.naturalWidth / userImg.naturalHeight;
      const targetAspectRatio = photoArea.width / photoArea.height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      // Fit image within bounds without cropping (object-contain behavior)
      if (userAspectRatio > targetAspectRatio) {
        // Image is wider, fit by width and center vertically
        drawWidth = photoArea.width;
        drawHeight = drawWidth / userAspectRatio;
        drawX = photoArea.x;
        drawY = photoArea.y + (photoArea.height - drawHeight) / 2;
      } else {
        // Image is taller, fit by height and center horizontally
        drawHeight = photoArea.height;
        drawWidth = drawHeight * userAspectRatio;
        drawX = photoArea.x + (photoArea.width - drawWidth) / 2;
        drawY = photoArea.y;
      }
      
      // Fill background with light gray
      ctx.fillStyle = "#f9f9f9";
      ctx.fillRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
      
      // Draw image without clipping (entire image visible)
      ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
      
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.strokeRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
    } else if (formData.photoOption === "both") {
      // Draw both images side by side with improved sizing and centering
      const halfWidth = photoArea.width / 2;
      
      if (memberImageRef.current) {
        // Calculate image dimensions for proper centering and aspect ratio
        const memberImg = memberImageRef.current;
        const memberAspectRatio = memberImg.naturalWidth / memberImg.naturalHeight;
        const targetAspectRatio = halfWidth / photoArea.height;
        
        let drawWidth = halfWidth;
        let drawHeight = photoArea.height;
        let drawX = photoArea.x;
        let drawY = photoArea.y;
        
        // Adjust dimensions to maintain aspect ratio while filling the space
        if (memberAspectRatio > targetAspectRatio) {
          // Image is wider, fit by height and center horizontally
          drawHeight = photoArea.height;
          drawWidth = drawHeight * memberAspectRatio;
          drawX = photoArea.x + (halfWidth - drawWidth) / 2;
        } else {
          // Image is taller, fit by width and center vertically
          drawWidth = halfWidth;
          drawHeight = drawWidth / memberAspectRatio;
          drawY = photoArea.y + (photoArea.height - drawHeight) / 2;
        }
        
        // Use clipping to ensure image doesn't overflow the designated area
        ctx.save();
        ctx.beginPath();
        ctx.rect(photoArea.x, photoArea.y, halfWidth, photoArea.height);
        ctx.clip();
        ctx.drawImage(memberImg, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      }
      
      if (userImageRef.current) {
        // Calculate image dimensions for proper centering and aspect ratio (no cropping)
        const userImg = userImageRef.current;
        const userAspectRatio = userImg.naturalWidth / userImg.naturalHeight;
        const targetAspectRatio = halfWidth / photoArea.height;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        // Fit image within bounds without cropping (object-contain behavior)
        if (userAspectRatio > targetAspectRatio) {
          // Image is wider, fit by width and center vertically
          drawWidth = halfWidth;
          drawHeight = drawWidth / userAspectRatio;
          drawX = photoArea.x + halfWidth;
          drawY = photoArea.y + (photoArea.height - drawHeight) / 2;
        } else {
          // Image is taller, fit by height and center horizontally
          drawHeight = photoArea.height;
          drawWidth = drawHeight * userAspectRatio;
          drawX = photoArea.x + halfWidth + (halfWidth - drawWidth) / 2;
          drawY = photoArea.y;
        }
        
        // Fill user photo background with light gray
        ctx.fillStyle = "#f9f9f9";
        ctx.fillRect(photoArea.x + halfWidth, photoArea.y, halfWidth, photoArea.height);
        
        // Draw user image without clipping (entire image visible)
        ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
      }
      
      // Add border around the entire photo area
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.strokeRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
      
      // Add divider line between photos
      if (memberImageRef.current && userImageRef.current) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(photoArea.x + halfWidth, photoArea.y);
        ctx.lineTo(photoArea.x + halfWidth, photoArea.y + photoArea.height);
        ctx.stroke();
      }
    } else {
      // Fallback if no images are available
      ctx.fillStyle = "#f2f2f2";
      ctx.fillRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
      
      // Add placeholder text
      ctx.fillStyle = "#666666";
      ctx.font = "bold 60px 'Black Han Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("No Photo", canvas.width / 2, photoArea.y + photoArea.height / 2);
      
      // Add border
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 10;
      ctx.strokeRect(photoArea.x, photoArea.y, photoArea.width, photoArea.height);
    }
    
    // User info section background - ensure it covers the remaining space
    const infoSectionY = 240 + (canvas.width - 80) + 20;
    const infoSectionHeight = canvas.height - infoSectionY - 80; // Leave space for bottom margin
    ctx.fillStyle = theme.bodyBg;
    ctx.fillRect(40, infoSectionY, canvas.width - 80, infoSectionHeight);
    
    // Info lines - start with better positioning
    let currentY = infoSectionY + 60;
    const lineHeight = 85;
    const maxWidth = canvas.width - 160; // Maximum width for text
    
    // Helper function to measure text width
    const measureText = (text: string, font: string): number => {
      ctx.font = font;
      return ctx.measureText(text).width;
    };
    
    // Helper function to auto-scale font size to fit text
    const getOptimalFontSize = (text: string, maxWidth: number, baseFontSize: number, fontFamily: string, fontWeight: string = '500'): number => {
      let fontSize = baseFontSize;
      let font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      
      while (measureText(text, font) > maxWidth && fontSize > 28) {
        fontSize -= 1;
        font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      }
      
      return fontSize;
    };
    
    // Helper function to wrap text if needed
    const wrapText = (text: string, maxWidth: number, font: string): string[] => {
      ctx.font = font;
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            // Single word is too long, add it anyway
            lines.push(word);
            currentLine = '';
          }
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines.length > 0 ? lines : [text];
    };
    
    // Update drawLabelWithValue signature with improved text handling
    type DrawLabelWithValue = (label: string, value: string, y: number, isBold?: boolean) => number;
    const drawLabelWithValue: DrawLabelWithValue = (label, value, y, isBold = false) => {
      // Draw bullet point
      ctx.fillStyle = theme.bullet;
      ctx.beginPath();
      ctx.arc(80, y - 15, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = theme.text;
      const labelFontSize = getOptimalFontSize(`${label}:`, 200, 56, "'Black Han Sans', sans-serif", isBold ? 'bold' : '500');
      ctx.font = `${isBold ? 'bold' : '500'} ${labelFontSize}px 'Black Han Sans', sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(`${label}:`, 110, y);
      const labelWidth = ctx.measureText(`${label}:`).width;
      
      // Calculate available width for value
      const availableWidth = maxWidth - labelWidth - 50; // 50px buffer
      
      // Auto-scale value font size
      const valueFontSize = getOptimalFontSize(value, availableWidth, 52, "'Black Han Sans', sans-serif", '500');
      const valueFont = `500 ${valueFontSize}px 'Black Han Sans', sans-serif`;
      
      // Check if text needs wrapping
      const valueLines = wrapText(value, availableWidth, valueFont);
      
      // Draw value text (single line or wrapped)
      ctx.font = valueFont;
      let valueY = y;
      
      for (let i = 0; i < valueLines.length; i++) {
        if (i === 0) {
          // First line goes next to the label
          ctx.fillText(valueLines[i], 130 + labelWidth, valueY);
        } else {
          // Subsequent lines are indented to align with the first line of value
          valueY += Math.max(45, valueFontSize * 0.8);
          ctx.fillText(valueLines[i], 130 + labelWidth, valueY);
        }
      }
      
      // Return next Y position with proper spacing
      const totalLinesUsed = Math.max(1, valueLines.length);
      return y + (lineHeight * (totalLinesUsed > 1 ? totalLinesUsed * 0.8 : 1));
    };
    currentY = drawLabelWithValue("Name", formData.name, currentY, true);
    
    // Country with flag
    if (formData.country) {
      ctx.fillStyle = theme.bullet;
      ctx.beginPath();
      ctx.arc(80, currentY - 15, 12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = theme.text;
      const labelFontSize = getOptimalFontSize("Country:", 200, 56, "'Black Han Sans', sans-serif", 'bold');
      ctx.font = `bold ${labelFontSize}px 'Black Han Sans', sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText("Country:", 110, currentY);
      const labelWidth = ctx.measureText("Country:").width;
      
      const flagX = 130 + labelWidth;
      const flagY = currentY - 30;
      
      // Draw flag if available
      if (flagImageRef.current) {
        ctx.drawImage(flagImageRef.current, flagX, flagY, 40, 27);
      }
      
      // Calculate available width for country name
      const availableWidthForCountry = maxWidth - labelWidth - 65; // 65px for flag + spacing
      const countryFontSize = getOptimalFontSize(formData.country, availableWidthForCountry, 52, "'Black Han Sans', sans-serif", '500');
      ctx.font = `500 ${countryFontSize}px 'Black Han Sans', sans-serif`;
      ctx.fillText(formData.country, flagX + 55, currentY);
      
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
    ctx.font = "bold 28px 'Black Han Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("LOVEFORBTS.COM", canvas.width / 2, canvas.height - 40);
    
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
            
            {/* Photo Refresh Button - Only show after card is generated */}
            {selectedMember && cardGenerated && (
              <button
                type="button"
                onClick={handleRefreshPhoto}
                className="mt-2 w-full text-black py-2 px-4 rounded-md border-2 border-black transition-colors black-han-sans flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--bts-accent)' }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Change {selectedMember.name === "BTS (OT7)" ? "Group" : selectedMember.name} Photo
              </button>
            )}
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

          {/* Photo Option Selection */}
          <div>
            <label htmlFor="photoOption" className="block text-sm font-medium mb-1 black-han-sans">
              Card Photo
            </label>
            <select
              id="photoOption"
              name="photoOption"
              value={formData.photoOption}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.photoOption ? "border-red-500" : "border-black"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
            >
              <option value="member">Member Photo Only</option>
              <option value="user">My Photo Only</option>
              <option value="both">Member + My Photo</option>
            </select>
            {errors.photoOption && <p className="mt-1 text-sm text-red-500">{errors.photoOption}</p>}
          </div>

          {/* User Photo Upload */}
          {(formData.photoOption === "user" || formData.photoOption === "both") && (
            <div>
              <label className="block text-sm font-medium mb-1 black-han-sans">
                Upload Your Photo
              </label>
              <div className="space-y-3">
                {/* File Input */}
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex-1 cursor-pointer bg-white border-2 border-black rounded-md px-4 py-2 text-center hover:bg-gray-50 transition-colors black-han-sans"
                  >
                    {userPhoto ? "Change Photo" : "Choose Photo"}
                  </label>
                  {userPhoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors black-han-sans"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Photo Preview */}
                {userPhoto && (
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={userPhoto}
                      alt="User photo preview"
                      className="w-full h-full object-contain rounded-md border-2 border-black bg-gray-50"
                    />
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      ✓
                    </div>
                  </div>
                )}

                {/* Upload Guidelines */}
                <p className="text-xs text-gray-600">
                  • Maximum file size: 5MB
                  • Supported formats: JPG, PNG, GIF
                  • Square photos work best
                </p>
              </div>
            </div>
          )}

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
                onChange={e => handleSongInputChange(e.target.value)}
                onBlur={handleSongInputBlur}
                onFocus={() => {
                  if (songQuery) {
                    handleSongSearch(songQuery);
                  }
                }}
                className={`w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  songQuery !== '' && formData.favoriteSong === '' && songQuery !== formData.favoriteSong 
                    ? 'border-red-500 ring-red-500' 
                    : 'border-black ring-black'
                }`}
                placeholder="Search and select a BTS song..."
                autoComplete="off"
              />
              {showSongSuggestions && songSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {songSuggestions.map((song) => (
                    <div
                      key={song.title}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => {
                        // Prevent default to stop blur event
                        e.preventDefault();
                      }}
                      onClick={() => {
                        handleSongSelect(song);
                      }}
                    >
                      <div className="font-medium">{song.title}</div>
                      {(song.album || song.year) && (
                        <div className="text-sm text-gray-600">
                          {song.album && song.year ? `${song.album} (${song.year})` : 
                           song.album ? song.album : 
                           song.year ? `(${song.year})` : ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {songQuery !== '' && formData.favoriteSong === '' && songQuery !== formData.favoriteSong && (
                <p className="mt-1 text-sm text-red-500">
                  Please select a song from the suggestions or clear the field
                </p>
              )}
              {formData.favoriteSong && formData.favoriteSong === songQuery && (
                <p className="mt-1 text-sm text-green-600">
                  ✓ Selected: {formData.favoriteSong}
                </p>
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
            className={`w-full bg-black py-3 px-4 rounded-md transition-colors black-han-sans
              ${isGenerating ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-900"}`}
            style={{ color: 'var(--bts-accent)' }}
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
              <div className="py-4 mx-4 mb-4 rounded-lg" style={{ backgroundColor: 'var(--bts-accent)' }}>
                <p className="black-han-sans text-xl">ARMY CARD</p>
              </div>
              <p className="text-gray-500">Fill out the form to generate your ARMY Card</p>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="animate-pulse text-center">
                <p className="black-han-sans text-xl mb-2">Creating your card...</p>
                <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--bts-accent)', borderTopColor: 'transparent' }}></div>
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
              {/* Card Photos */}
              <div className="w-full flex-shrink-0 relative border-b-2" style={{ 
                borderColor: themeMap[formData.theme as keyof typeof themeMap].border,
                height: 'calc(60% - 60px)' // 60% of card height minus header height
              }}>
                {formData.photoOption === "member" && selectedMember && memberPhoto && (
                  <Image
                    src={memberPhoto}
                    alt={`Photo of ${selectedMember.name}`}
                    fill
                    className="object-cover"
                  />
                )}
                
                {formData.photoOption === "user" && userPhoto && (
                  <img
                    src={userPhoto}
                    alt="User photo"
                    className="w-full h-full object-contain bg-gray-50"
                  />
                )}
                
                {formData.photoOption === "both" && (selectedMember && memberPhoto || userPhoto) && (
                  <div className="w-full h-full flex">
                    {selectedMember && memberPhoto && (
                      <div className="w-1/2 h-full relative">
                        <Image
                          src={memberPhoto}
                          alt={`Photo of ${selectedMember.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {userPhoto && (
                      <div className="w-1/2 h-full relative bg-gray-50">
                        <img
                          src={userPhoto}
                          alt="User photo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Placeholder when no photos are available */}
                {!((formData.photoOption === "member" && selectedMember && memberPhoto) || 
                    (formData.photoOption === "user" && userPhoto) || 
                    (formData.photoOption === "both" && (selectedMember && memberPhoto || userPhoto))) && (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs">Photo will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Card Info */}
              <div className="p-3 flex-1 flex flex-col justify-between overflow-hidden" style={{ 
                background: themeMap[formData.theme as keyof typeof themeMap].bodyBg,
                minHeight: '40%' // Ensure minimum height for info section
              }}>
                                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                      <p className="font-bold black-han-sans text-sm leading-tight" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                        Name: <span className="font-normal">{formData.name}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                      <p className="font-bold black-han-sans text-sm leading-tight mr-1" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>Country: </p>
                      <span className="flex items-center gap-1">
                        {formData.country && (
                          <Image
                            src={`https://flagcdn.com/w20/${getCountryCode(formData.country).toLowerCase()}.png`}
                            alt={`Flag of ${formData.country}`}
                            width={12}
                            height={9}
                            className="inline-block"
                          />
                        )}
                        <span className="font-normal text-sm" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>{formData.country}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                      <p className="font-bold black-han-sans text-sm leading-tight" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                        Bias: <span className="font-normal">{selectedMember?.name}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                      <p className="font-bold black-han-sans text-sm leading-tight" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                        ARMY Since: <span className="font-normal">{formData.armySince}</span>
                      </p>
                    </div>
                    {formData.favoriteSong && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeMap[formData.theme as keyof typeof themeMap].bullet }}></span>
                        <p className="font-bold black-han-sans text-sm leading-tight" style={{ color: themeMap[formData.theme as keyof typeof themeMap].text }}>
                          Fav. Song: <span className="font-normal">{formData.favoriteSong}</span>
                        </p>
                      </div>
                    )}
                  </div>
                <div className="mt-auto pt-1 text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: 'Inter, sans-serif' }}>
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
              className="flex-1 flex items-center justify-center gap-2 bg-black text-bts-accent py-2 px-4 rounded-md hover:bg-gray-800 transition-colors black-han-sans"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button
              onClick={shareCard}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-bts-accent py-2 px-4 rounded-md hover:bg-gray-800 transition-colors black-han-sans"
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
