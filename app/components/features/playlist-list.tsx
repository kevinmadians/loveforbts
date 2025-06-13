"use client"

import React from 'react'
import Link from 'next/link'
import { Music, Heart, User, Clock, Play, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
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

// Component for the album cover mosaic
const AlbumCoverMosaic = ({ songs }: { songs: BTSSong[] }) => {
  const colors = generateCoverColors(songs)
  const displaySongs = songs.slice(0, 4) // Show up to 4 songs in the mosaic
  
  return (
    <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
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

interface PlaylistListProps {
  playlists: any[]
  onLike: (playlistId: string) => void
  onUnlike: (playlistId: string) => void
}

export function PlaylistList({ playlists, onLike, onUnlike }: PlaylistListProps) {



  if (playlists.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-black rounded-2xl">
        <Music size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">No Playlists Found</h3>
        <p className="text-gray-600 mb-6">
          No playlists match your criteria. Try creating a new one!
        </p>
        <Link
          href="/bts-playlist/create"
          className="inline-flex items-center gap-2 bg-black text-[#FFDE00] py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          <Music size={20} />
          Create Playlist
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {playlists.map((playlist: any) => {
        const songs: BTSSong[] = typeof playlist.songs === 'string' ? JSON.parse(playlist.songs) : playlist.songs
        return (
          <div
            key={playlist.id}
            className="group bg-white border-2 border-black rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-600 relative overflow-hidden"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Album Cover Mosaic */}
                <AlbumCoverMosaic songs={songs} />
                
                {/* Playlist Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <Link href={`/bts-playlist/${playlist.id}`}>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 hover:text-purple-700 transition-colors cursor-pointer group-hover:text-purple-600">
                          {playlist.name}
                        </h3>
                      </Link>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span className="font-medium">{playlist.creator_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Music size={14} />
                          <span>{songs.length} songs</span>
                        </div>
                      </div>

                      {playlist.description && (
                        <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-2 bg-gray-50 p-3 rounded-lg">
                          {playlist.description}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/bts-playlist/${playlist.id}`}
                        className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                      >
                        <ArrowRight size={16} />
                        View Playlist
                      </Link>
                    </div>
                  </div>

                  {/* Song Preview List */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1">
                      <Play size={14} />
                      Featured Songs
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {songs.slice(0, 6).map((song, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                          <span className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="truncate flex-1 font-medium">{song.title}</span>
                        </div>
                      ))}
                      {songs.length > 6 && (
                        <div className="col-span-full text-center">
                          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                            +{songs.length - 6} more songs
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
} 