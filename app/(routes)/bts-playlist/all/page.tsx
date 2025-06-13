"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Music } from 'lucide-react'
import { PlaylistList } from '@/app/components/features/playlist-list'
import { usePlaylist } from '@/app/lib/playlist-context'

export default function AllPlaylistsPage() {
  const { playlists, isLoading, likePlaylist, unlikePlaylist, currentPage, totalPages, setCurrentPage } = usePlaylist()

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/bts-playlist" className="inline-flex items-center text-purple-700 hover:text-purple-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Featured
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 black-han-sans">
          All BTS Playlists
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore all playlists created by the ARMY community. Discover new music and connect with fellow fans!
        </p>
      </div>

      {/* Playlists List */}
      <div className="mb-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading playlists...</p>
          </div>
        ) : (
          <PlaylistList
            playlists={playlists}
            onLike={likePlaylist}
            onUnlike={unlikePlaylist}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
} 