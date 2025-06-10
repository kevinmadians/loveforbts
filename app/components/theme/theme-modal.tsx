"use client"

import React from 'react'
import { Check, X } from 'lucide-react'
import { useTheme } from '@/app/lib/themes/theme-context'
import { toast } from 'sonner'

interface ThemeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { currentTheme, availableThemes, setTheme } = useTheme()

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
      
      // Close modal after selection
      setTimeout(() => onClose(), 500)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
      style={{ minHeight: '100dvh' }}
    >
      <div 
        className="bg-white rounded-2xl border-4 border-black shadow-2xl w-full max-w-md my-8 mx-auto animate-in zoom-in-95 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxHeight: 'calc(100dvh - 2rem)' 
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black bg-gradient-to-r from-yellow-400 to-yellow-300">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/bts-logo.svg" 
              alt="BTS" 
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold black-han-sans text-black">
              Choose Your Theme
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Close theme selector"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80dvh - 8rem)' }}>
          <div className="grid gap-4">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                  ${currentTheme.id === theme.id 
                    ? 'border-black bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-md' 
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Theme Color Indicator */}
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-full border-3 border-gray-300 shadow-lg flex items-center justify-center" 
                        style={{ backgroundColor: theme.colors.btsAccent }}
                      >
                        <img 
                          src="/images/bts-logo-white.svg" 
                          alt="BTS" 
                          className="w-6 h-6 opacity-80"
                        />
                      </div>
                      {currentTheme.id === theme.id && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Theme Info */}
                    <div>
                      <div className="font-bold text-lg black-han-sans text-black">
                        {theme.displayName}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {theme.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Album: {theme.album}
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {currentTheme.id === theme.id && (
                    <div className="text-green-600 font-bold">
                      ✨ Active
                    </div>
                  )}
                </div>

                {/* Theme Preview Bar */}
                <div className="mt-3 h-2 rounded-full overflow-hidden bg-gray-200">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.btsAccent}, ${theme.colors.secondary})`
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-black bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Choose a theme that matches your ARMY spirit! 💜
          </p>
        </div>
      </div>
    </div>
  )
} 