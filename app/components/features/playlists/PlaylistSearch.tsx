'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Music, X, Loader2 } from 'lucide-react';
import { searchBTSTrack, SpotifyTrack, formatDuration } from '@/app/services/spotify-service';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from '@/app/hooks/use-debounce';

export default function PlaylistSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search when debounced query changes
  useEffect(() => {
    const doSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setError('');
      
      try {
        const searchResults = await searchBTSTrack(debouncedQuery);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (err) {
        setError('Failed to search songs. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    };

    doSearch();
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="flex items-center border-2 border-black rounded-lg overflow-hidden bg-white">
          <div className="pl-3 pr-2 text-gray-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for BTS songs..."
            value={query}
            onChange={handleChange}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            className="w-full p-3 pl-2 outline-none text-lg"
          />
          {query && (
            <button 
              onClick={clearSearch}
              className="px-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border-2 border-black rounded-lg bg-white shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            {isSearching ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 size={24} className="animate-spin mr-2" />
                <span>Searching...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {error || "No BTS songs found. Try another search term."}
              </div>
            ) : (
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider px-2 pb-1">
                  BTS Songs
                </div>
                <ul>
                  {results.map((track) => (
                    <li key={track.id}>
                      <Link 
                        href={`/playlists/song/${track.id}`}
                        className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-12 h-12 relative flex-shrink-0">
                          {track.album.images.length > 0 ? (
                            <Image
                              src={track.album.images[0].url}
                              alt={track.album.name}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                              <Music size={20} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="font-medium text-gray-900">{track.name}</div>
                          <div className="text-sm text-gray-500">
                            {track.album.name} • {formatDuration(track.duration_ms)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 