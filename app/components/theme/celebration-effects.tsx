"use client"

import React from 'react'
import { useTheme } from '@/app/lib/themes/theme-context'

export const CelebrationEffects: React.FC = () => {
  const { currentTheme } = useTheme()

  // Only return theme-specific background effects, no floating particles
  if (currentTheme.id !== 'permission-to-dance') {
    return null
  }

  return null // Completely remove all celebration effects
} 
