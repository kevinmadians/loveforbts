"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, List, Music, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react"
import { AlbumData, discographyData } from "@/app/lib/discography-data"
import { useMemo } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Disc } from "lucide-react"

export interface AlbumWithNavigation extends AlbumData {
  previousAlbum: AlbumData | null;
  nextAlbum: AlbumData | null;
}

export interface AlbumDetailProps {
  albumWithNav: AlbumWithNavigation;
}

export function AlbumDetail({ albumWithNav }: AlbumDetailProps) {
  const { 
    title, 
    coverImage, 
    releaseDate, 
    type, 
    language, 
    tracks, 
    description, 
    spotifyLink, 
    highlights, 
    previousAlbum, 
    nextAlbum 
  } = albumWithNav;
  
  const formattedReleaseDate = useMemo(() => {
    try {
      return new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return releaseDate;
    }
  }, [releaseDate]);

  // Get album type badge color
  const typeBadgeColor = useMemo(() => {
    switch (type) {
      case "Studio":
        return "bg-purple-100 text-purple-800";
      case "Mini":
        return "bg-blue-100 text-blue-800";
      case "Compilation":
        return "bg-green-100 text-green-800";
      case "Single":
        return "bg-red-100 text-red-800";
      case "Repackage":
        return "bg-yellow-100 text-yellow-800";
      case "Special Edition":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, [type]);

  // Get language badge color
  const languageBadgeColor = useMemo(() => {
    switch (language) {
      case "Korean":
        return "bg-indigo-100 text-indigo-800";
      case "Japanese":
        return "bg-red-100 text-red-800";
      case "English":
        return "bg-blue-100 text-blue-800";
      case "Mixed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, [language]);

  // Handle image error fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/albums/placeholder-album.jpg";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back to discography link */}
      <div className="mb-6">
        <Link 
          href="/discography" 
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Discography</span>
        </Link>
      </div>
      
      {/* Album Hero Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Album Cover */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            <Image
              src={coverImage}
              alt={`Album cover for ${title}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onError={handleImageError}
            />
          </div>
          
          {/* Album Info */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 black-han-sans">
              {title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-4">Released on {formattedReleaseDate}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${typeBadgeColor}`}>
                {type}
              </span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${languageBadgeColor}`}>
                {language}
              </span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                {new Date(releaseDate).getFullYear()}
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">About This Album</h2>
              <p className="text-gray-700">{description}</p>
            </div>
            
            {spotifyLink && (
              <a 
                href={spotifyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1DB954] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors mb-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Listen on Spotify</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Tracklist Section */}
      {tracks && tracks.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center black-han-sans flex items-center justify-center gap-2">
            <List size={24} />
            <span>Tracklist</span>
          </h2>
          
          <div className="divide-y divide-gray-200">
            {tracks.map((track: string, index: number) => (
              <div 
                key={index} 
                className="py-3 px-2 flex items-center hover:bg-gray-50"
              >
                <div className="w-8 text-center text-gray-600 font-medium mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className="font-medium">{track}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Highlights Section */}
      {highlights && highlights.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center black-han-sans flex items-center justify-center gap-2">
            <Music size={24} />
            <span>Album Highlights</span>
          </h2>
          
          <ul className="space-y-3">
            {highlights.map((highlight: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-500 font-bold mr-2">★</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Album Navigation */}
      <div className="bg-purple-100 rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-center black-han-sans">
          Continue Exploring BTS Discography
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {previousAlbum && (
            <Link
              href={`/discography/${previousAlbum.slug}`}
              className="flex-1 bg-white border-2 border-black rounded-xl p-4 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <ChevronLeft size={20} />
              <div>
                <div className="text-sm text-gray-600">Previous Album</div>
                <div className="font-bold">{previousAlbum.title}</div>
              </div>
            </Link>
          )}
          
          {nextAlbum && (
            <Link
              href={`/discography/${nextAlbum.slug}`}
              className="flex-1 bg-white border-2 border-black rounded-xl p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3"
            >
              <div className="text-right">
                <div className="text-sm text-gray-600">Next Album</div>
                <div className="font-bold">{nextAlbum.title}</div>
              </div>
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
      </div>
      
      {/* Back to Top */}
      <div className="text-center mb-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Scroll back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          <span>Back to Top</span>
        </button>
      </div>
    </div>
  )
} 