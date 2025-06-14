"use client"

import React, { useState } from 'react'
import { useTheme } from '@/app/lib/themes/theme-context'
import { ThemeModal } from './theme-modal'

export const ThemeSelector: React.FC = () => {
  const { currentTheme, isLoading } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-[var(--navbar-text)] hover:bg-[var(--navbar-hover)]"
        aria-label="Select theme"
      >
        <div className="relative mr-1.5">
          <img 
            src="/images/bts-logo.svg" 
            alt="BTS" 
            className="w-4 h-4"
          />
        </div>
        <span className="black-han-sans mr-1 hidden md:inline">Theme</span>
        <div className="w-3 h-3 rounded-full border-2 border-current ml-1" 
             style={{ backgroundColor: currentTheme.colors.btsAccent }} />
      </button>
      
      <ThemeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
} 
