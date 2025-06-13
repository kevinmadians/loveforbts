"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Music, Heart, MessageCircle, Book, User, Clock, Play, ArrowRight } from 'lucide-react'
import { usePlaylist } from '@/app/lib/playlist-context'
import { CTAContainer } from '@/app/components/ui/cta-container'
import { PageCTA } from '@/app/components/ui/page-cta'
import { formatDistanceToNow } from 'date-fns'
import { BTSSong } from '@/app/data/bts-songs'
import { PlaylistList } from '@/app/components/features/playlist-list'

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

// Album Cover Mosaic Component
const AlbumCoverMosaic = ({ songs, size = 'medium' }: { songs: BTSSong[], size?: 'small' | 'medium' | 'large' }) => {
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

export default function PlaylistPage() {
  const { playlists, isLoading, totalPlaylists } = usePlaylist()
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([])

  useEffect(() => {
    // Get featured playlists (first 5)
    const featured = playlists.slice(0, 5)
    setFeaturedPlaylists(featured)
  }, [playlists])

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-center black-han-sans">
          BTS ARMY Playlists
        </h1>
        
        <p className="text-lg mb-6 md:mb-8 text-center max-w-3xl mx-auto">
          Create and share your favorite BTS playlists with the ARMY community. 
          Discover new songs and connect with fellow fans through music!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/bts-playlist/create"
            className="inline-flex items-center gap-2 bg-black text-[#FFDE00] py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <Music size={20} />
            Create Your Playlist
          </Link>
        </div>
      </div>

      {/* Featured Playlists Section */}
      {featuredPlaylists.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Playlists</h2>
            <Link
              href="/bts-playlist/all"
              className="text-purple-700 hover:text-purple-900 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaylists.map((playlist) => {
              const songs: BTSSong[] = typeof playlist.songs === 'string' ? JSON.parse(playlist.songs) : playlist.songs
              return (
                <Link
                  key={playlist.id}
                  href={`/bts-playlist/${playlist.id}`}
                  className="group bg-white border-2 border-black rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:border-purple-600 relative overflow-hidden"
                >
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Album Cover Mosaic */}
                    <AlbumCoverMosaic songs={songs} />
                    
                    {/* Playlist Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {playlist.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span className="font-medium">{playlist.creator_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Music size={14} />
                            <span>{songs.length} songs</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <Clock size={12} />
                        <span>{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {playlist.description && (
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2 bg-gray-50 p-3 rounded-lg">
                        {playlist.description}
                      </p>
                    )}

                    {/* Songs Preview List */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
                        <Play size={14} />
                        Top Songs
                      </h4>
                      <div className="space-y-2">
                        {songs.slice(0, 3).map((song, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <span className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {index + 1}
                            </span>
                            <span className="truncate flex-1 font-medium">{song.title}</span>
                          </div>
                        ))}
                        {songs.length > 3 && (
                          <div className="text-center">
                            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                              +{songs.length - 3} more songs
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Details */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Click to view full playlist</span>
                        <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* All Playlists Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">All Playlists</h2>
          <div className="text-sm text-gray-500">
            {totalPlaylists} {totalPlaylists === 1 ? 'playlist' : 'playlists'}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading playlists...</p>
          </div>
        ) : playlists.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-black rounded-2xl">
            <Music size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Playlists Found</h3>
            <p className="text-gray-600 mb-6">
              Be the first to create a BTS playlist and share your favorite songs!
            </p>
            <Link
              href="/bts-playlist/create"
              className="inline-flex items-center gap-2 bg-black text-[#FFDE00] py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              <Music size={20} />
              Create First Playlist
            </Link>
          </div>
        ) : (
          <PlaylistList
            playlists={playlists}
            onLike={() => {}} // Love button removed
            onUnlike={() => {}} // Love button removed
          />
        )}
      </div>

      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More ARMY Features">
        <PageCTA
          title="ARMY Card Maker"
          description="Create beautiful BTS-themed cards with your favorite photos and messages."
          href="/army-card"
          icon={Heart}
          color="purple"
        />
        <PageCTA
          title="Share Your Story"
          description="Tell your unique BTS journey and connect with fellow ARMY worldwide."
          href="/army-story"
          icon={MessageCircle}
          color="blue"
        />
        <PageCTA
          title="Message Board"
          description="Leave messages for BTS and read heartfelt notes from ARMY around the globe."
          href="/messages"
          icon={Book}
          color="green"
        />
      </CTAContainer>
    </div>
  )
} 