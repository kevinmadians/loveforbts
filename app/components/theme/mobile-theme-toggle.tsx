"use client"

import React, { useState } from 'react'
import { useTheme } from '@/app/lib/themes/theme-context'
import { ThemeModal } from './theme-modal'

export const MobileThemeToggle: React.FC = () => {
  const { currentTheme, isLoading } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return null
  }

  // Determine if we should use the white logo based on navbar background darkness
  const isDarkNavbar = (navbarBg: string): boolean => {
    // Convert hex to RGB and calculate brightness
    const hex = navbarBg.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16) 
    const b = parseInt(hex.substr(4, 2), 16)
    // Calculate relative luminance
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness < 128 // Use white logo if brightness is less than 128 (dark background)
  }

  const shouldUseWhiteLogo = isDarkNavbar(currentTheme.colors.navbarBg)
  const logoSrc = shouldUseWhiteLogo ? "/images/bts-logo-white.svg" : "/images/bts-logo.svg"

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-md border border-black hover:border-purple-900 transition-colors md:hidden"
        style={{ 
          color: 'var(--navbar-text)',
          backgroundColor: 'transparent'
        }}
        aria-label="Select theme"
      >
        <div className="relative">
          <img 
            src={logoSrc}
            alt="BTS" 
            className="w-5 h-5"
            style={{ 
              filter: shouldUseWhiteLogo ? 'none' : 'brightness(0)'
            }}
          />
        </div>
      </button>
      
      <ThemeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
} 