'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Music, Play, Pause, ExternalLink, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { searchBTSTrack, SpotifyTrack, formatDuration } from '@/app/services/spotify-service';
import { useDebounce } from '@/app/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; isRateLimit: boolean } | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const retryTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Clear any pending retries on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Search when query changes
  useEffect(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
      return;
    }
    
    const doSearch = async (retryCount = 0) => {
      setIsSearching(true);
      setError(null);
      
      try {
        // Use the API endpoint instead of direct service call for better error handling
        const response = await fetch(`/api/spotify/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        
        if (!response.ok) {
          // Check if it's a rate limit error
          if (response.status === 429 || data.error_type === 'rate_limit') {
            const retryAfter = data.retry_after || 5;
            
            if (retryCount < 3) {
              // Schedule a retry
              toast({
                title: 'Rate limit exceeded',
                description: `Retrying in ${retryAfter} seconds...`,
                variant: 'default',
              });
              
              // Clear previous timeout if it exists
              if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
              }
              
              // Set new timeout for retry
              retryTimeoutRef.current = setTimeout(() => {
                doSearch(retryCount + 1);
              }, retryAfter * 1000);
              
              setError({
                message: `Rate limit exceeded. Retrying in ${retryAfter} seconds...`,
                isRateLimit: true
              });
              return;
            } else {
              throw new Error('Spotify search rate limit exceeded. Please try again later.');
            }
          }
          
          throw new Error(data.message || 'Failed to search for songs');
        }
        
        setSearchResults(data.results || []);
        setError(null);
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Search error:', error);
        }
        
        const isRateLimit = error.message?.includes('rate limit');
        
        setError({
          message: error.message || 'Failed to search for songs. Please try again.',
          isRateLimit
        });
        
        toast({
          title: 'Search Error',
          description: error.message || 'Failed to search for songs. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSearching(false);
      }
    };
    
    doSearch();
    
    // Clean up function to cancel any pending searches on query change
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [debouncedQuery]);

  const togglePlayPreview = (track: SpotifyTrack) => {
    if (!track.preview_url) {
      toast({
        title: 'Preview not available',
        description: 'Sorry, no preview is available for this song.',
      });
      return;
    }

    if (currentlyPlaying === track.id) {
      // Pause currently playing track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentlyPlaying(null);
    } else {
      // Stop any currently playing track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Play the new track
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.play().catch(err => {
        toast({
          title: 'Playback Error',
          description: 'Failed to play the preview. Please try again.',
          variant: 'destructive',
        });
        if (process.env.NODE_ENV === 'development') {
          console.error('Audio playback error:', err);
        }
      });
      
      // Set up ended event handler
      audioRef.current.onended = () => {
        setCurrentlyPlaying(null);
      };
      
      setCurrentlyPlaying(track.id);
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="py-6">
      <Link 
        href="/playlists"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>Back to playlists</span>
      </Link>
      
      <h1 className="text-4xl font-bold mb-4 font-blackHanSans">Search BTS Songs</h1>
      <p className="text-lg mb-8">
        Find your favorite BTS songs, listen to previews, and create playlists!
      </p>
      
      {/* Search input */}
      <div className="mb-8">
        <div className="flex items-center border-2 border-black rounded-lg overflow-hidden bg-white max-w-2xl mx-auto">
          <div className="pl-4 pr-2 text-gray-500">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search for BTS songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 pl-2 outline-none text-lg"
            autoFocus
          />
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className={`mb-6 p-4 border rounded-lg ${error.isRateLimit ? 'border-yellow-400 bg-yellow-50' : 'border-red-400 bg-red-50'} max-w-5xl mx-auto`}>
          <div className="flex items-center">
            <AlertTriangle className={`mr-3 ${error.isRateLimit ? 'text-yellow-500' : 'text-red-500'}`} size={24} />
            <p className="text-gray-700">{error.message}</p>
          </div>
          {error.isRateLimit && (
            <p className="mt-2 text-sm text-gray-600">
              The Spotify API has rate limits to prevent excessive requests. Your search will automatically retry.
            </p>
          )}
        </div>
      )}
      
      {/* Results */}
      <div className="max-w-5xl mx-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin mr-3" />
            <span>Searching...</span>
          </div>
        ) : searchResults.length === 0 && !error ? (
          <div className="text-center py-16">
            {debouncedQuery ? (
              <div>
                <Music size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No BTS songs found. Try another search term.</p>
              </div>
            ) : (
              <div>
                <Music size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Start searching for your favorite BTS songs!</p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  {['dynamite', 'butter', 'spring day', 'fake love', 'black swan'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : searchResults.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search results for "{debouncedQuery}"</h2>
              <span className="text-gray-500 text-sm">{searchResults.length} songs found</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((track) => (
                <div 
                  key={track.id}
                  className="border-2 border-black rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex p-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 mr-4">
                      {track.album.images.length > 0 ? (
                        <Image
                          src={track.album.images[0].url}
                          alt={track.album.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                          <Music size={24} className="text-gray-500" />
                        </div>
                      )}
                      
                      {track.preview_url && (
                        <button
                          onClick={() => togglePlayPreview(track)}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity rounded"
                        >
                          {currentlyPlaying === track.id ? (
                            <Pause size={28} className="text-white" />
                          ) : (
                            <Play size={28} className="text-white ml-1" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <Link href={`/playlists/song/${track.id}`}>
                        <h3 className="font-bold text-lg hover:underline">{track.name}</h3>
                      </Link>
                      <p className="text-gray-500 mb-2">
                        {track.album.name} • {new Date(track.album.release_date).getFullYear()}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{formatDuration(track.duration_ms)}</span>
                        <a
                          href={track.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          <span>Spotify</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 