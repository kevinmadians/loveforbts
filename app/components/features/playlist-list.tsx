"use client"

import React from 'react'
import Link from 'next/link'
import { Music, User, Clock, Play, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { BTSSong } from '@/app/data/bts-songs'

interface PlaylistListProps {
  playlists: any[]
  onLike: (playlistId: string) => void
  onUnlike: (playlistId: string) => void
}

export function PlaylistList({ playlists, onLike, onUnlike }: PlaylistListProps) {
  if (playlists.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-black rounded-2xl p-6">
        <Music size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2 black-han-sans">No Playlists Found</h3>
        <p className="text-gray-600 mb-6">
          No playlists match your criteria. Try creating a new one!
        </p>
        <Link
          href="/bts-playlist/create"
          className="inline-flex items-center gap-2 bg-black text-bts-accent py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          <Music size={18} />
          Create Playlist
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist: any) => {
        const songs: BTSSong[] = typeof playlist.songs === 'string' ? JSON.parse(playlist.songs) : playlist.songs
        return (
          <div
            key={playlist.id}
            className="group bg-white border-2 border-black rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-500 relative"
          >
            {/* Content */}
            <div className="space-y-4">
              {/* Header Section */}
              <div>
                <Link href={`/bts-playlist/${playlist.id}`}>
                  <h3 className="text-xl font-bold mb-2 black-han-sans hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                    {playlist.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span className="font-medium">{playlist.creator_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Music size={14} />
                  <span>{songs.length} songs</span>
                </div>
              </div>

              {/* Description */}
              {playlist.description && (
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 bg-gray-50 p-2 rounded-lg">
                  {playlist.description}
                </p>
              )}

              {/* Featured Songs Preview - More compact */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1 black-han-sans">
                  <Play size={14} />
                  Top Songs
                </h4>
                <div className="space-y-1">
                  {songs.slice(0, 3).map((song, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <div className="w-5 h-5 bg-black text-bts-accent rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="truncate flex-1 font-medium">{song.title}</span>
                    </div>
                  ))}
                  {songs.length > 3 && (
                    <div className="text-center">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                        +{songs.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-gray-200">
                <Link
                  href={`/bts-playlist/${playlist.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-black text-bts-accent px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm group/btn"
                >
                  <span>View Playlist</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 