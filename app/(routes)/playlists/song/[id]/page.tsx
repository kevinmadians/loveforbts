'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Share2, Play, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getTrackById, SpotifyTrack, formatDuration } from '@/app/services/spotify-service';
import { notFound } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export default function SongDetailPage({ params }: { params: { id: string } }) {
  // Get the ID directly to avoid React.use() issues
  const { id } = params;
  
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    async function fetchTrack() {
      try {
        const trackData = await getTrackById(id);
        setTrack(trackData);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch track:', error);
        }
        toast({
          title: 'Error',
          description: 'Failed to load track information',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchTrack();
  }, [id]);
  
  const handlePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleShare = async () => {
    if (!track) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${track.name} - BTS Song`,
          text: `Check out this BTS song: ${track.name} by ${track.artists.map(a => a.name).join(', ')}`,
          url: window.location.href,
        });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error sharing:', error);
        }
        // User likely cancelled the share
      }
    } else {
      // Fallback to copying link
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Song link copied to clipboard.',
      });
    }
  };
  
  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[40vh]">
        <Loader2 size={32} className="animate-spin mr-3" />
        <span>Loading song details...</span>
      </div>
    );
  }
  
  if (!track) {
    notFound();
  }
  
  return (
    <div className="py-6">
      <div className="mb-6">
        <Link 
          href="/playlists"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to playlists</span>
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-full md:w-64 h-64 relative rounded-xl overflow-hidden flex-shrink-0">
            {track.album.images.length > 0 ? (
              <Image
                src={track.album.images[0].url}
                alt={track.album.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Play size={40} className="text-gray-500" />
              </div>
            )}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <div className="text-gray-500 mb-1">Song</div>
            <h1 className="text-4xl font-bold mb-2 font-blackHanSans">{track.name}</h1>
            <p className="text-lg mb-4">
              BTS • {track.album.name} • {new Date(track.album.release_date).getFullYear()}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {track.preview_url && (
                <button 
                  onClick={handlePlay}
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
                >
                  <Play size={18} className={isPlaying ? "animate-pulse" : ""} />
                  {isPlaying ? 'Pause Preview' : 'Play Preview'}
                </button>
              )}
              
              <a 
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                <ExternalLink size={18} />
                Open in Spotify
              </a>
              
              <button 
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-white border-2 border-black hover:bg-gray-100 text-black py-2 px-4 rounded-lg"
              >
                <Share2 size={18} />
                Share Song
              </button>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-500 text-sm">
                Duration: {formatDuration(track.duration_ms)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {track.preview_url && (
        <audio
          ref={audioRef}
          className="hidden"
          src={track.preview_url}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      
      <div className="mt-12 border-t-2 border-gray-100 pt-8">
        <h2 className="text-2xl font-bold mb-6">Related Playlists</h2>
        <div className="bg-white border-2 border-black rounded-xl p-6 text-center">
          <p className="mb-4">Discover more BTS songs like this one in our curated playlists.</p>
          <Link
            href="/playlists"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition-all"
          >
            Browse Playlists
          </Link>
        </div>
      </div>
    </div>
  );
} 