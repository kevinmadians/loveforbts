"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Map of paths to their corresponding page titles
const pageTitles: Record<string, string> = {
  "/": "Love for BTS - BTS Fan Hub for ARMY",
  "/about": "About Us - Love for BTS",
  "/members": "BTS Members - Love for BTS",
  "/army-card": "ARMY Card - Love for BTS",
  "/army-story": "ARMY Stories - Love for BTS",
  "/messages": "Message Board - Love for BTS",
  "/contact": "Contact Us - Love for BTS",
  "/games": "BTS ARMY Games - Love for BTS",
  "/games/purple-hearts-collector": "Purple Hearts Collector - Love for BTS",
  "/games/bts-whack-a-mole": "BTS Whack-a-Mole - Love for BTS",
  "/leaderboard": "BTS ARMY Leaderboard - Love for BTS",
  "/leaderboard/purple-hearts-collector": "Purple Hearts Collector Leaderboard - Love for BTS",
  "/leaderboard/bts-whack-a-mole": "BTS Whack-a-Mole Leaderboard - Love for BTS",
  "/bts-cards-generator": "BTS Quote Cards Generator - Love for BTS",
  "/support": "Support Us - Love for BTS",
  "/quotes": "Daily BTS Quotes - Love for BTS",
  "/history": "BTS History Timeline - Love for BTS",
  "/vocabulary": "ARMY Vocabulary Guide - Love for BTS",
  "/quiz": "BTS Quiz Hub - Love for BTS",
  "/quiz/lyrics-quiz": "BTS Lyrics Quiz - Love for BTS",
  "/quiz/army-quiz": "ARMY Knowledge Quiz - Love for BTS",
  "/quiz/member-quiz": "BTS Member Quiz - Love for BTS",
  "/bias-test": "BTS Bias Compatibility Test - Love for BTS",
  "/discography": "BTS Discography - Love for BTS",
  "/privacy-policy": "Privacy Policy - Love for BTS",
  "/terms-of-use": "Terms of Use - Love for BTS",
  "/cookie-policy": "Cookie Policy - Love for BTS",
}

// Function to handle member pages specifically
const getMemberPageTitle = (path: string): string | undefined => {
  if (path.startsWith("/members/")) {
    const memberSlug = path.split("/").pop() || ""
    const memberNames: Record<string, string> = {
      "rm": "RM (Leader)",
      "jin": "Jin (Vocalist)",
      "suga": "Suga (Rapper)",
      "j-hope": "J-Hope (Dancer)",
      "jimin": "Jimin (Vocalist)",
      "v": "V (Vocalist)",
      "jungkook": "Jungkook (Main Vocalist)",
    }
    
    if (memberSlug in memberNames) {
      return `${memberNames[memberSlug]} - Love for BTS`
    }
  }
  
  // Handle album pages
  if (path.startsWith("/discography/")) {
    const albumSlug = path.split("/").pop() || ""
    if (albumSlug) {
      // Convert slug to title format (e.g., "love-yourself-answer" to "Love Yourself: Answer")
      const formattedAlbum = albumSlug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace("Yourself ", "Yourself: ")
        .replace("Map Of The Soul ", "Map of the Soul: ")
        .replace("Wings ", "Wings: ")
        .replace("Proof ", "Proof: ")
        
      return `${formattedAlbum} - BTS Album - Love for BTS`
    }
  }
  
  return undefined
}

export function CustomHead() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Get title from map or use default
    let pageTitle = pathname && pageTitles[pathname] || ""
    
    // Check if it's a member page or album page
    if (!pageTitle && pathname) {
      const specialPageTitle = getMemberPageTitle(pathname)
      if (specialPageTitle) {
        pageTitle = specialPageTitle
      }
    }
    
    // Fallback for any other pages
    if (!pageTitle) {
      pageTitle = "Love for BTS"
    }
    
    // Force-set the document title
    document.title = pageTitle
  }, [pathname])
  
  // No actual rendering, just side effect
  return null
} 
