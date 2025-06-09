"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ThemeConfig, getTheme, defaultTheme, getAllThemes } from './theme-config'

interface ThemeContextType {
  currentTheme: ThemeConfig
  setTheme: (themeId: string) => void
  availableThemes: ThemeConfig[]
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(getTheme(defaultTheme))
  const [isLoading, setIsLoading] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('bts-theme')
    if (savedTheme) {
      const theme = getTheme(savedTheme)
      setCurrentTheme(theme)
      applyThemeToCSS(theme)
    } else {
      // Apply default theme
      applyThemeToCSS(currentTheme)
    }
    setIsLoading(false)
  }, [])

  // Apply theme colors to CSS custom properties
  const applyThemeToCSS = (theme: ThemeConfig) => {
    const root = document.documentElement
    
    // Convert hex colors to HSL for CSS variables
    root.style.setProperty('--primary', hexToHsl(theme.colors.primary))
    root.style.setProperty('--primary-foreground', hexToHsl(theme.colors.primaryForeground))
    root.style.setProperty('--secondary', hexToHsl(theme.colors.secondary))
    root.style.setProperty('--secondary-foreground', hexToHsl(theme.colors.secondaryForeground))
    root.style.setProperty('--background', hexToHsl(theme.colors.background))
    root.style.setProperty('--foreground', hexToHsl(theme.colors.foreground))
    root.style.setProperty('--accent', hexToHsl(theme.colors.accent))
    root.style.setProperty('--accent-foreground', hexToHsl(theme.colors.accentForeground))
    root.style.setProperty('--border', hexToHsl(theme.colors.border))
    root.style.setProperty('--input', hexToHsl(theme.colors.input))
    root.style.setProperty('--ring', hexToHsl(theme.colors.ring))
    root.style.setProperty('--card', hexToHsl(theme.colors.card))
    root.style.setProperty('--card-foreground', hexToHsl(theme.colors.cardForeground))
    root.style.setProperty('--muted', hexToHsl(theme.colors.muted))
    root.style.setProperty('--muted-foreground', hexToHsl(theme.colors.mutedForeground))
    
    // BTS specific variables
    root.style.setProperty('--bts-accent', theme.colors.btsAccent)
    root.style.setProperty('--bts-secondary', theme.colors.btsSecondary)
    
    // Navbar specific variables
    root.style.setProperty('--navbar-bg', theme.colors.navbarBg)
    root.style.setProperty('--navbar-text', theme.colors.navbarText)
    root.style.setProperty('--navbar-hover', theme.colors.navbarHover)
    
    // Add theme class to body for additional styling
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${theme.id}`)
  }

  // Helper function to convert hex to HSL
  const hexToHsl = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '')
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number, s: number, l: number
    
    l = (max + min) / 2
    
    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }
    
    // Convert to percentages and return as HSL string
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)
    
    return `${h} ${s}% ${l}%`
  }

  const setTheme = (themeId: string) => {
    const newTheme = getTheme(themeId)
    setCurrentTheme(newTheme)
    applyThemeToCSS(newTheme)
    
    // Save to localStorage
    localStorage.setItem('bts-theme', themeId)
    
    // Trigger a custom event for other components that might need to know
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: newTheme } 
    }))
  }

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes: getAllThemes(),
    isLoading
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
} 
