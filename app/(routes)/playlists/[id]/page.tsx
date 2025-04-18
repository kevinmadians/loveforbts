'use client';

import React from 'react';
import { ChevronLeft, Disc, Share2, ExternalLink, Clock, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/app/components/ui/button';
import type { SupabasePlaylist } from '@/app/lib/supabase';
import { getPlaylistById } from '@/app/lib/supabase-service';
import { cn, formatDate } from '@/lib/utils';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PlaylistDetailPage({ params }: PageProps) {
  // Use React.use to unwrap the params promise
  const { id } = React.use(params);
  
  const [playlist, setPlaylist] = React.useState<SupabasePlaylist | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [tracks, setTracks] = React.useState<any[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = React.useState(false);
  const [trackFetchError, setTrackFetchError] = React.useState(false);

  React.useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const data = await getPlaylistById(id);
        if (!data) {
          notFound();
        }
        setPlaylist(data);
        
        // Now fetch track details from Spotify API
        if (data.songs && data.songs.length > 0) {
          await fetchTrackDetails(data.songs);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching playlist:', error);
        }
        toast({
          title: 'Error',
          description: 'Failed to load playlist. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const fetchTrackDetails = async (trackIds: string[]) => {
    if (isLoadingTracks) return;
    
    setIsLoadingTracks(true);
    setTrackFetchError(false);
    
    try {
      const response = await fetch(`/api/spotify/tracks?ids=${trackIds.join(',')}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (process.env.NODE_ENV === 'development') {
          console.error('Error response from API:', errorData);
        }
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.tracks || !Array.isArray(data.tracks)) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Invalid track data format:', data);
        }
        throw new Error('Invalid track data format received');
      }
      
      setTracks(data.tracks || []);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching track details:', error);
      }
      setTrackFetchError(true);
      toast({
        title: 'Track Details',
        description: 'Could not load all song details from Spotify. You can still view the playlist.',
        variant: 'default',
      });
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const handleRetryFetchTracks = async () => {
    if (playlist?.songs && playlist.songs.length > 0) {
      await fetchTrackDetails(playlist.songs);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      const shareData = {
        title: `${playlist?.title} - BTS Playlist by ${playlist?.creator_name}`,
        text: `Check out this BTS playlist "${playlist?.title}" created by ${playlist?.creator_name}`,
        url: window.location.href,
      };

      try {
        await navigator.share(shareData);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error sharing:', err);
        }
        toast({
          title: "Sharing failed",
          description: "Couldn't share this playlist. Try copying the link instead.",
        });
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Playlist link copied to clipboard',
      });
    }
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 w-full bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-16 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return notFound();
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      {/* Back button and share */}
      <div className="flex items-center justify-between mb-4">
        <Link 
          href="/playlists" 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="black-han-sans">Back to Playlists</span>
        </Link>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2 border-2 border-black rounded-lg"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* Playlist header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 black-han-sans">
          {playlist.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4 flex-wrap">
          <span className="font-medium">Created by {playlist.creator_name}</span>
          <span className="hidden md:inline">•</span>
          <span>{playlist.songs.length} songs</span>
          <span className="hidden md:inline">•</span>
          <span>{formatDate(playlist.created_at)}</span>
        </div>
      </div>

      {/* Tracks list */}
      {isLoadingTracks ? (
        <div className="text-center py-16 border-2 border-black rounded-xl mb-10 bg-gray-50">
          <div className="animate-pulse">
            <Disc className="h-12 w-12 mx-auto text-gray-300 mb-4 animate-spin" />
            <h3 className="text-xl font-bold mb-2 black-han-sans">LOADING SONG DETAILS...</h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              We're retrieving the song details for this playlist from Spotify.
            </p>
          </div>
        </div>
      ) : tracks.length > 0 ? (
        <div className="border-2 border-black rounded-xl overflow-hidden mb-10 shadow-md">
          <div className="bg-gray-50 py-3 px-4 border-b-2 border-gray-200 grid grid-cols-12 gap-4 items-center black-han-sans">
            <div className="col-span-1 font-semibold text-center">#</div>
            <div className="col-span-6 md:col-span-5 font-semibold">TITLE</div>
            <div className="col-span-4 hidden md:block font-semibold">ALBUM</div>
            <div className="col-span-5 md:col-span-2 font-semibold flex justify-end items-center gap-1">
              <Clock size={16} />
              <span className="hidden md:inline">DURATION</span>
            </div>
          </div>

          <div className="divide-y-2 divide-gray-200">
            {tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="py-3 px-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50"
              >
                <div className="col-span-1 text-center text-gray-500">{index + 1}</div>
                <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                    <Image 
                      src={track.album.images[0]?.url || '/images/default-album.jpg'} 
                      alt={track.album.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{track.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {track.artists.map((artist: any) => artist.name).join(', ')}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 hidden md:block truncate">
                  {track.album.name}
                </div>
                <div className="col-span-5 md:col-span-2 flex justify-end items-center gap-2">
                  <span className="text-gray-500">
                    {Math.floor(track.duration_ms / 60000)}:
                    {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                  </span>
                  <a 
                    href={track.external_urls.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl mb-10">
          <Disc className="h-12 w-12 mx-auto text-[#FFDE00] mb-4" />
          <h3 className="text-xl font-bold mb-2 black-han-sans">NO SONG DETAILS AVAILABLE</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            We couldn't load the song details for this playlist. The playlist contains {playlist.songs.length} songs.
          </p>
          
          {trackFetchError && (
            <button 
              onClick={handleRetryFetchTracks}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors border-2 border-gray-300"
            >
              <RefreshCw size={16} className={isLoadingTracks ? 'animate-spin' : ''} />
              <span>Retry Loading Songs</span>
            </button>
          )}
        </div>
      )}

      {/* Create your own CTA */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 text-center mb-6 max-w-4xl mx-auto shadow-md">
        <h3 className="text-xl font-bold mb-3 black-han-sans">CREATE YOUR OWN PLAYLIST</h3>
        <p className="mb-5 max-w-2xl mx-auto">
          Inspired by this playlist? Share your own collection of favorite BTS songs with the ARMY community.
        </p>
        <Link 
          href="/playlists/create" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFDE00] hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors border-2 border-black"
        >
          <Disc size={18} />
          <span className="black-han-sans">CREATE A PLAYLIST</span>
        </Link>
      </div>
    </div>
  );
} 