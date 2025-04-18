'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Disc, User, Calendar, Music } from 'lucide-react';
import { SupabasePlaylist } from '@/app/lib/supabase';
import { format } from 'date-fns';
import CompactTracksList from './CompactTracksList';

interface UserPlaylistGridProps {
  playlists: SupabasePlaylist[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function UserPlaylistGrid({ 
  playlists, 
  loading = false, 
  emptyMessage = "No playlists found" 
}: UserPlaylistGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
        <Disc className="h-16 w-16 mx-auto text-[#FFDE00] mb-4" />
        <p className="text-gray-600 mb-6">{emptyMessage}</p>
        <Link 
          href="/playlists/create" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFDE00] hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors border-2 border-black"
        >
          <Play size={18} className="ml-1" />
          <span className="black-han-sans">CREATE A PLAYLIST</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <Link 
          key={playlist.playlist_id} 
          href={`/playlists/${playlist.playlist_id}`}
          className="group"
        >
          <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
            {/* Playlist Title */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-xl font-bold black-han-sans">{playlist.title}</h3>
            </div>
            
            {/* Tracks Section */}
            <div className="p-4 flex-1">
              <div className="text-sm text-gray-700 flex items-center mb-2">
                <Music size={14} className="mr-1.5" />
                <span>Songs</span>
              </div>
              
              {/* Use CompactTracksList instead to fetch real data from Spotify */}
              <CompactTracksList 
                trackIds={playlist.songs && playlist.songs.length > 0 ? playlist.songs : []} 
                maxTracks={3} 
              />
            </div>
            
            {/* Footer with creator and song count */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-600">
                <User size={14} className="mr-1" />
                <span>By {playlist.creator_name}</span>
              </div>
              <div className="text-sm text-purple-700">
                {playlist.songs ? playlist.songs.length : 0} songs
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 