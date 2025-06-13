import React from 'react';
import Link from 'next/link';
import { Music, Heart, Star, Sparkles } from 'lucide-react';

export default function PlaylistCTA() {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-black text-center md:text-left mb-4">
            Create Your BTS Playlist
          </h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Share your favorite BTS songs with the ARMY community. Create a playlist of up to 10 songs and let others discover your musical taste!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Choose from 100+ songs</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Get likes from ARMY</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Featured playlists</span>
            </div>
          </div>
          <Link 
            href="/bts-playlist/create"
            className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-black text-[#FFDE00] rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Playlist
          </Link>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Music className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium">Popular Playlists</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm">✨ BTS Ballads Collection</li>
              <li className="text-sm">💜 Hype Songs for Concerts</li>
              <li className="text-sm">🌟 Hidden Gems & B-Sides</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 