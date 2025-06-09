"use client"

import React, { useState } from 'react'
import { Palette, Check, Sparkles } from 'lucide-react'
import { useTheme } from '@/app/lib/themes/theme-context'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'

export const ThemeSelector: React.FC = () => {
  const { currentTheme, availableThemes, setTheme, isLoading } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (themeId: string) => {
    const selectedTheme = availableThemes.find(theme => theme.id === themeId)
    if (selectedTheme) {
      setTheme(themeId)
      
      // Show celebration toast for Permission to Dance
      if (themeId === 'permission-to-dance') {
        toast.success('🎉 Permission to Dance theme activated!', {
          description: 'Let\'s celebrate together! 💃🕺',
          duration: 3000,
        })
      } else {
        toast.success(`${selectedTheme.displayName} theme activated!`, {
          description: selectedTheme.description,
          duration: 2000,
        })
      }
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-[var(--navbar-text)] hover:bg-[var(--navbar-hover)]"
          aria-label="Select theme"
        >
          <Palette size={16} className="mr-1.5" />
          <span className="black-han-sans mr-1 hidden md:inline">Theme</span>
          <div className="w-3 h-3 rounded-full border-2 border-current ml-1" 
               style={{ backgroundColor: currentTheme.colors.btsAccent }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white border-2 border-black rounded-md shadow-lg p-1 min-w-[200px]"
        align="end"
      >
        {availableThemes.map((theme) => (
          <DropdownMenuItem 
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3" 
                style={{ backgroundColor: theme.colors.btsAccent }}
              />
              <div>
                <div className="font-medium black-han-sans flex items-center">
                  {theme.displayName}
                  {theme.id === 'permission-to-dance' && <Sparkles size={12} className="ml-1 text-orange-500" />}
                </div>
              </div>
            </div>
            {currentTheme.id === theme.id && (
              <Check size={16} className="text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
