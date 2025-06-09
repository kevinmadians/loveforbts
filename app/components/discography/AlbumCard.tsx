"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { AlbumData } from "@/app/lib/discography-data"

export interface AlbumCardProps {
  album: AlbumData;
  featured?: boolean;
}

export function AlbumCard({ album, featured = false }: AlbumCardProps) {
  const albumPath = useMemo(() => `/discography/${album.slug}`, [album.slug])

  // Handle potential image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/albums/placeholder-album.jpg" // Updated fallback image path
  }

  // Get album type badge color
  const typeBadgeColor = useMemo(() => {
    switch (album.type) {
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
  }, [album.type]);

  // Get language badge color
  const languageBadgeColor = useMemo(() => {
    switch (album.language) {
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
  }, [album.language]);

  return (
    <div className={`bg-white rounded-2xl border-2 border-black overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg ${featured ? 'col-span-2 row-span-2 md:flex' : ''}`}>
      <Link href={albumPath} className={`block h-full ${featured ? 'md:flex' : ''}`}>
        <div className={`relative ${featured ? 'h-60 md:h-auto md:min-h-[320px] md:w-1/2' : 'h-60 w-full'}`}>
          <Image
            src={album.coverImage}
            alt={`BTS album cover: ${album.title}`}
            fill
            sizes={featured 
              ? "(max-width: 640px) 100vw, (max-width: 768px) 70vw, 50vw" 
              : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"}
            className="object-contain"
            priority={featured}
            onError={handleImageError}
          />
        </div>
        <div className={`p-4 ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeBadgeColor}`}>
              {album.type}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${languageBadgeColor}`}>
              {album.language}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
              {album.releaseYear}
            </span>
          </div>
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold black-han-sans mb-1`}>{album.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{album.releaseDate}</p>
          <p className={`text-sm line-clamp-${featured ? '4' : '3'}`}>{album.description}</p>
          {featured && album.highlights && (
            <div className="mt-4">
              <h4 className="text-sm font-bold mb-2">Highlights:</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {album.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
} 
