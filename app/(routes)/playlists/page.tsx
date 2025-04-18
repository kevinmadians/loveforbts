'use client';

import React, { useState, useEffect } from 'react';
import { Disc, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import type { SupabasePlaylist } from '@/app/lib/supabase';
import { getPlaylists } from '@/app/lib/supabase-service';
import UserPlaylistGrid from '@/app/components/features/playlists/UserPlaylistGrid';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<SupabasePlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const { data, total } = await getPlaylists(page, pageSize);
        setPlaylists(data);
        setTotalPages(Math.ceil(total / pageSize));
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching playlists:', error);
        }
        toast({
          title: 'Error',
          description: 'Failed to load playlists. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 black-han-sans">
          ARMY PLAYLISTS
        </h1>
        <p className="text-lg mb-4 md:mb-6 text-center max-w-3xl mx-auto">
          Discover and share your favorite BTS songs with the ARMY community. Create your own playlist to express your love for BTS music! 💜
        </p>
        
        <Link 
          href="/playlists/create" 
          className="inline-flex items-center px-5 py-2.5 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors black-han-sans"
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Create Your Playlist</span>
        </Link>
      </div>

      <div className="mb-10">
        <UserPlaylistGrid 
          playlists={playlists} 
          loading={loading}
          emptyMessage="No playlists have been created yet. Be the first to create a BTS playlist!" 
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-10">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg border-2 ${
              page === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-black text-black hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg border-2 ${
              page === totalPages
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-black text-black hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Help text box */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 text-center mb-6 max-w-4xl mx-auto">
        <Disc className="h-12 w-12 mx-auto text-[#FFDE00] mb-4" />
        <h3 className="text-xl font-bold mb-3 black-han-sans">CREATE YOUR OWN BTS PLAYLIST</h3>
        <p className="mb-5 max-w-2xl mx-auto">
          Share your favorite BTS songs with the ARMY community by creating your personalized playlist.
          You can select up to 10 songs and give your playlist a unique name that reflects your taste.
        </p>
        <Link 
          href="/playlists/create" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFDE00] hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors border-2 border-black"
        >
          <PlusCircle size={18} />
          <span className="black-han-sans">CREATE A PLAYLIST</span>
        </Link>
      </div>
    </div>
  );
} 