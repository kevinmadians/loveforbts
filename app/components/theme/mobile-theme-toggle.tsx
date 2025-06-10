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
            src="/images/bts-logo.svg" 
            alt="BTS" 
            className="w-5 h-5"
            style={{ filter: 'brightness(0)' }}
          />
          <div 
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-current animate-pulse" 
            style={{ backgroundColor: currentTheme.colors.btsAccent }} 
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