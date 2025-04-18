import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Playlist } from '@/app/data/playlist-data';

interface PlaylistGridProps {
  playlists: Playlist[];
}

export default function PlaylistGrid({ playlists }: PlaylistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <Link 
          key={playlist.id} 
          href={`/playlists/${playlist.id}`}
          className="group"
        >
          <div className={`bg-white border-2 border-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
            <div className="relative w-full pt-[75%]">
              {/* Placeholder image with gradient if no image is available */}
              <div className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient}`}>
                {playlist.coverImage && (
                  <Image 
                    src={playlist.coverImage} 
                    alt={playlist.title} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full" 
                  />
                )}
                
                {/* Overlay with play icon */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Play size={32} className="text-black ml-1" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1">{playlist.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{playlist.description}</p>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <span>{playlist.songs.length} songs</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 