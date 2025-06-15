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
        <div className="mb-6">
          <Link href="/bts-playlist" className="inline-flex items-center text-purple-700 hover:text-purple-900 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Playlists
          </Link>
        </div>

        {/* Playlist Header */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Playlist Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 black-han-sans">
                {playlist.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium">{playlist.creator_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={16} />
                  <span>{songs.length} songs</span>
                </div>
              </div>

              {playlist.description && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {playlist.description}
                </p>
              )}
            </div>

            {/* Album Covers Preview */}
            <div className="lg:w-80">
              <h3 className="text-lg font-bold mb-4 black-han-sans">Featured Albums</h3>
              <div className="grid grid-cols-4 gap-2">
                {songs.slice(0, 8).map((song, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={getAlbumCover(song.title)}
                      alt={`${song.title} album cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 60px, 80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 black-han-sans">
              <Play size={28} className="text-purple-600" />
              Playlist Songs
            </h2>
            <div className="text-sm text-gray-500">
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            </div>
          </div>
          
          <div className="grid gap-4">
            {songs.map((song, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200"
              >
                {/* Track Number */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-700">{index + 1}</span>
                </div>

                {/* Album Cover */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src={getAlbumCover(song.title)}
                    alt={`${song.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 56px, 64px"
                  />
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                    {song.title}
                  </h3>
                  {song.album && (
                    <p className="text-gray-600 text-sm md:text-base truncate">
                      {song.album} {song.year && `• ${song.year}`}
                    </p>
                  )}
                </div>

                {/* Play Icon */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Play size={16} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlist Stats */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-700">{songs.length}</div>
              <div className="text-sm text-purple-600">Songs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">
                {new Set(songs.map(s => s.album).filter(Boolean)).size}
              </div>
              <div className="text-sm text-purple-600">Albums</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">
                {Math.round(songs.length * 3.5)}min
              </div>
              <div className="text-sm text-purple-600">Est. Duration</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

 