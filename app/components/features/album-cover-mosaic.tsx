"use client"

import React from 'react'
import { Music, Play } from 'lucide-react'
import { BTSSong } from '@/app/data/bts-songs'

// Function to generate a color palette based on song titles
const generateCoverColors = (songs: BTSSong[]): string[] => {
  const colorPalettes = [
    ['#FF6B9D', '#A855F7', '#3B82F6'], // Pink to Purple to Blue
    ['#F59E0B', '#EF4444', '#EC4899'], // Yellow to Red to Pink
    ['#10B981', '#3B82F6', '#8B5CF6'], // Green to Blue to Purple
    ['#F97316', '#DC2626', '#9333EA'], // Orange to Red to Purple
    ['#06B6D4', '#3B82F6', '#6366F1'], // Cyan to Blue to Indigo
    ['#84CC16', '#22C55E', '#059669'], // Lime to Green to Emerald
    ['#EF4444', '#F97316', '#FBBF24'], // Red to Orange to Yellow
    ['#8B5CF6', '#A855F7', '#EC4899'], // Purple to Violet to Pink
  ]
  
  if (songs.length === 0) return colorPalettes[0]
  
  // Use first song title to determine color palette
  const firstSongCode = songs[0].title.charCodeAt(0)
  const paletteIndex = firstSongCode % colorPalettes.length
  return colorPalettes[paletteIndex]
}

interface AlbumCoverMosaicProps {
  songs: BTSSong[]
  size?: 'small' | 'medium' | 'large'
}

// Component for the album cover mosaic
export const AlbumCoverMosaic = ({ songs, size = 'medium' }: AlbumCoverMosaicProps) => {
  const colors = generateCoverColors(songs)
  const displaySongs = songs.slice(0, 4) // Show up to 4 songs in the mosaic
  
  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-40 h-40'
  }
  
  return (
    <div className={`relative ${sizeClasses[size]} rounded-xl overflow-hidden shadow-lg flex-shrink-0`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10"></div>
      <div className="grid grid-cols-2 h-full">
        {displaySongs.map((song, index) => {
          const colorIndex = index % colors.length
          return (
            <div
              key={index}
              className="relative flex items-center justify-center text-white font-bold text-xs p-2"
              style={{
                background: `linear-gradient(135deg, ${colors[colorIndex]} 0%, ${colors[(colorIndex + 1) % colors.length]} 100%)`
              }}
            >
              <div className="text-center">
                <div className="text-xs opacity-80 mb-1">#{index + 1}</div>
                <div className="line-clamp-2 leading-tight">
                  {song.title.length > 20 ? song.title.substring(0, 20) + '...' : song.title}
                </div>
              </div>
            </div>
          )
        })}
        {/* Fill empty spaces if less than 4 songs */}
        {displaySongs.length < 4 && Array.from({ length: 4 - displaySongs.length }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
          >
            <Music size={16} className="text-gray-500" />
          </div>
        ))}
      </div>
      
      {/* Play button overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-white/90 rounded-full p-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
          <Play size={16} className="text-black ml-0.5" />
        </div>
      </div>
    </div>
  )
} 