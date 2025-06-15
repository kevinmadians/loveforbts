"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Music, User, Clock, Play } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { supabase } from '@/app/lib/supabase'
import { BTSSong } from '@/app/data/bts-songs'
import Image from 'next/image'

// Album cover mapping for songs
const albumCovers: { [key: string]: string } = {
  // Group Albums
  "No More Dream": "/images/albums/2-cool-4-skool.jpg",
  "N.O": "/images/albums/orul82.jpg",
  "Boy In Luv": "/images/albums/skool-luv-affair.jpg",
  "Just One Day": "/images/albums/skool-luv-affair.jpg",
  "Danger": "/images/albums/dark-and-wild.jpg",
  "War of Hormone": "/images/albums/dark-and-wild.jpg",
  "I Need U": "/images/albums/hyyh-pt1.jpg",
  "Dope": "/images/albums/hyyh-pt1.jpg",
  "Run": "/images/albums/hyyh-pt2.jpg",
  "Butterfly": "/images/albums/hyyh-pt2.jpg",
  "Fire": "/images/albums/young-forever.jpg",
  "HANGSANG": "/images/albums/hope-world.jpg",
  "Save Me": "/images/albums/young-forever.jpg",
  "Blood Sweat & Tears": "/images/albums/wings.jpg",
  "Attack on Bangtan": "/images/albums/orul82.jpg",
  "Paldogangsan": "/images/albums/orul82.jpg",
  "Spring Day": "/images/albums/you-never-walk-alone.jpg",
  "Not Today": "/images/albums/you-never-walk-alone.jpg",
  "DNA": "/images/albums/love-yourself-her.jpg",
  "MIC Drop": "/images/albums/love-yourself-her.jpg",
  "Go Go": "/images/albums/love-yourself-her.jpg",
  "Fake Love": "/images/albums/love-yourself-tear.jpg",
  "Airplane Pt.2": "/images/albums/love-yourself-tear.jpg",
  "The Truth Untold": "/images/albums/love-yourself-tear.jpg",
  "IDOL": "/images/albums/love-yourself-answer.jpg",
  "Boy With Luv": "/images/albums/map-of-the-soul-persona.jpg",
  "Make It Right": "/images/albums/map-of-the-soul-persona.jpg",
  "ON": "/images/albums/map-of-the-soul-7.jpg",
  "Black Swan": "/images/albums/map-of-the-soul-7.jpg",
  "My Time": "/images/albums/map-of-the-soul-7.jpg",
  "Filter": "/images/albums/map-of-the-soul-7.jpg",
  "Inner Child": "/images/albums/map-of-the-soul-7.jpg",
  "Moon": "/images/albums/map-of-the-soul-7.jpg",
  "UGH!": "/images/albums/map-of-the-soul-7.jpg",
  "00:00": "/images/albums/map-of-the-soul-7.jpg",
  "Friends": "/images/albums/map-of-the-soul-7.jpg",
  "Respect": "/images/albums/map-of-the-soul-7.jpg",
  "Dynamite": "/images/albums/dynamite.jpg",
  "Magic Shop": "/images/albums/love-yourself-tear.jpg",
  "Life Goes On": "/images/albums/be.jpg",
  "Blue & Grey": "/images/albums/be.jpg",
  "Telepathy": "/images/albums/be.jpg",
  "Dis-ease": "/images/albums/be.jpg",
  "Stay": "/images/albums/be.jpg",
  "Fly To My Room": "/images/albums/be.jpg",
  "Butter": "/images/albums/butter.jpg",
  "Permission to Dance": "/images/albums/butter.jpg",
  "Yet To Come": "/images/albums/proof.jpg",
  "For Youth": "/images/albums/proof.jpg",
  "Take Two": "/images/albums/take-two.jpg",
  
  // Solo Works
  "The Astronaut": "/images/albums/astronaut.jpg",
  "Super Tuna": "/images/albums/jin-super-tuna.jpg",
  "Awake": "/images/albums/wings.jpg",
  "Agust D": "/images/albums/suga-agust-d.jpg",
  "Daechwita": "/images/albums/suga-d-2.jpg",
  "That That": "/images/albums/suga-d-2.jpg",
  "D-Day": "/images/albums/suga-d-day.jpg",
  "Haegeum": "/images/albums/suga-d-day.jpg",
  "Amygdala": "/images/albums/suga-d-day.jpg",
  "Hope World": "/images/albums/jhope-hope-world.jpg",
  "Chicken Noodle Soup": "/images/albums/jhope-hope-world.jpg",
  "Arson": "/images/albums/jhope-jack-in-the-box.jpg",
  "MORE": "/images/albums/jhope-jack-in-the-box.jpg",
  "On the Street": "/images/albums/jhope-on-the-street.jpg",
  "Indigo": "/images/albums/rm-indigo.jpg",
  "Wild Flower": "/images/albums/rm-indigo.jpg",
  "Still Life": "/images/albums/rm-indigo.jpg",
  "mono.": "/images/albums/rm-mono.jpg",
  "Tokyo": "/images/albums/rm-mono.jpg",
  "Seoul": "/images/albums/rm-mono.jpg",
  "Moonchild": "/images/albums/rm-mono.jpg",
  "RM": "/images/albums/rm-mixtape.jpg",
  "Do You": "/images/albums/rm-mixtape.jpg",
  "Like Crazy": "/images/albums/facebyjimin.jpg",
  "Set Me Free Pt.2": "/images/albums/jimin-face.jpg",
  "Promise": "/images/albums/jimin-promise.jpg",
  "Christmas Love": "/images/albums/jimin-christmas-love.jpg",
  "With You": "/images/albums/jimin-with-you.jpg",
  "Winter Bear": "/images/albums/v-winter-bear.jpg",
  "Christmas Tree": "/images/albums/v-ost.jpg",
  "Love Me Again": "/images/albums/v-layover.jpg",
  "Slow Dancing": "/images/albums/v-layover.jpg",
  "Rainy Days": "/images/albums/v-layover.jpg",
  "Blue": "/images/albums/v-layover.jpg",
  "For Us": "/images/albums/v-layover.jpg",
  "Seven": "/images/albums/jungkook-seven.jpg",
  "3D": "/images/albums/jungkook-golden.jpg",
  "Standing Next To You": "/images/albums/jungkook-golden.jpg",
  "Hate You": "/images/albums/jungkook-golden.jpg",
  "Still With You": "/images/albums/jungkook-still-with-you.jpg",
}

interface Playlist {
  id: string
  created_at: string
  name: string
  description: string | null
  creator_name: string
  songs: BTSSong[]
  like_count: number
}

export default function PlaylistDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchPlaylist()
    }
  }, [params.id])

  const fetchPlaylist = async () => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        // Parse songs if they're stored as JSON string
        const songs = typeof data.songs === 'string' ? JSON.parse(data.songs) : data.songs
        setPlaylist({ ...data, songs })
      }
    } catch (error) {
      console.error('Error fetching playlist:', error)
      if (typeof error === 'object' && error !== null && Object.keys(error).length === 0) {
        toast.error('Database tables may not exist. Please run the SQL schema first.')
      } else {
        toast.error('Playlist not found')
      }
      router.push('/bts-playlist')
    } finally {
      setIsLoading(false)
    }
  }

  const getAlbumCover = (songTitle: string): string => {
    return albumCovers[songTitle] || '/images/albums/placeholder-album.jpg'
  }

  const getSpotifyLink = (songTitle: string): string => {
    // For now, use search fallback. Will be updated with direct links later
    return `https://open.spotify.com/search/${encodeURIComponent(songTitle + ' BTS')}`
  }

  // Add structured data for SEO
  const generateStructuredData = (playlist: Playlist) => {
    const songs = playlist.songs
    const topSongs = songs.slice(0, 5).map(song => song.title).join(', ')
    
    return {
      "@context": "https://schema.org",
      "@type": "MusicPlaylist",
      "name": playlist.name,
      "description": playlist.description || `A custom BTS playlist by ${playlist.creator_name} featuring ${songs.length} songs including ${topSongs}`,
      "creator": {
        "@type": "Person",
        "name": playlist.creator_name
      },
      "dateCreated": playlist.created_at,
      "numTracks": songs.length,
      "genre": ["K-pop", "Pop", "Hip-Hop"],
      "inLanguage": "ko",
      "url": `https://loveforbts.com/bts-playlist/${playlist.id}`,
      "about": {
        "@type": "MusicGroup",
        "name": "BTS",
        "alternateName": "Bangtan Sonyeondan",
        "genre": "K-pop"
      }
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading playlist...</p>
        </div>
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <Music size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Playlist Not Found</h3>
          <p className="text-gray-600 mb-6">
            The playlist you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/bts-playlist"
            className="inline-flex items-center gap-2 bg-black text-[#FFDE00] py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Playlists
          </Link>
        </div>
      </div>
    )
  }

  const songs: BTSSong[] = playlist.songs
  const topSongs = songs.slice(0, 3).map(song => song.title).join(', ')
  const playlistTitle = `${playlist.name} - BTS ARMY Playlist by ${playlist.creator_name}`
  const playlistDescription = playlist.description || 
    `Discover "${playlist.name}" - a custom BTS playlist by ${playlist.creator_name} featuring ${songs.length} amazing songs including ${topSongs}. Perfect for ARMY fans who love K-pop music.`

  return (
    <>
      {/* Dynamic SEO with structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(playlist))
        }}
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8 text-center">
          <Link 
            href="/bts-playlist" 
            className="inline-flex items-center gap-3 bg-white border-2 border-black text-black py-3 px-6 rounded-xl font-bold hover:bg-black hover:text-[#FFDE00] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="black-han-sans text-lg">Back to Playlists</span>
          </Link>
        </div>

        {/* Playlist Header */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Playlist Info */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 black-han-sans leading-tight">
                {playlist.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-gray-600 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium text-sm sm:text-base">{playlist.creator_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="text-sm sm:text-base">{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={16} />
                  <span className="text-sm sm:text-base">{songs.length} songs</span>
                </div>
              </div>

              {playlist.description && (
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  {playlist.description}
                </p>
              )}
            </div>

            {/* Album Covers Preview */}
            <div className="w-full lg:w-80">
              <h3 className="text-lg font-bold mb-4 black-han-sans">Featured Albums</h3>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto lg:max-w-none lg:mx-0">
                {songs.slice(0, 8).map((song, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={getAlbumCover(song.title)}
                      alt={`${song.title} album cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 70px, (max-width: 1024px) 60px, 80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3 black-han-sans">
              <Play size={24} className="text-purple-600 sm:text-[28px]" />
              Playlist Songs
            </h2>
            <div className="text-sm text-gray-500 sm:text-right">
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            </div>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            {songs.map((song, index) => (
              <div 
                key={index}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200"
              >
                {/* Track Number */}
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold text-purple-700">{index + 1}</span>
                </div>

                {/* Album Cover */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src={getAlbumCover(song.title)}
                    alt={`${song.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                  />
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <a 
                    href={getSpotifyLink(song.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group-hover:no-underline"
                  >
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 group-hover:text-purple-700 transition-colors hover:underline flex items-center gap-1 sm:gap-2 leading-tight">
                      <span className="line-clamp-2 sm:line-clamp-1">{song.title}</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 group-hover:opacity-100 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </h3>
                  </a>
                  {song.album && (
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base truncate mt-1">
                      {song.album} {song.year && `• ${song.year}`}
                    </p>
                  )}
                </div>

                {/* Play Icon */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Play size={14} className="text-white ml-0.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlist Stats */}
        <div className="mt-6 sm:mt-8 bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-center black-han-sans">Playlist Stats</h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border-2 border-purple-100">
              <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">{songs.length}</div>
              <div className="text-sm sm:text-base text-purple-600 font-medium">Total Songs</div>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border-2 border-blue-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1">
                {Math.round(songs.length * 3.5)}
              </div>
              <div className="text-sm sm:text-base text-blue-600 font-medium">Minutes</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Created by <span className="font-semibold text-black">{playlist.creator_name}</span> • 
              {' '}{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

 