'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Plus, X, Music, Check, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchBTSTrack, SpotifyTrack, formatDuration } from '@/app/services/spotify-service';
import { useDebounce } from '@/app/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { savePlaylist } from '@/app/lib/supabase-service';

export default function CreatePlaylistPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<SpotifyTrack[]>([]);
  const [playlistName, setPlaylistName] = useState('My BTS Playlist');
  const [creatorName, setCreatorName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    playlistName?: string;
    creatorName?: string;
    tracks?: string;
  }>({});
  
  // Maximum allowed tracks
  const MAX_TRACKS = 10;
  
  // Search tracks when query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    const doSearch = async () => {
      setIsSearching(true);
      
      try {
        const results = await searchBTSTrack(debouncedQuery);
        setSearchResults(results);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Search error:', error);
        }
        toast({
          title: 'Search error',
          description: 'Failed to search for songs. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSearching(false);
      }
    };
    
    doSearch();
  }, [debouncedQuery]);
  
  // Add or remove track from selected tracks
  const toggleTrack = (track: SpotifyTrack) => {
    const isSelected = selectedTracks.some(t => t.id === track.id);
    
    if (isSelected) {
      setSelectedTracks(selectedTracks.filter(t => t.id !== track.id));
    } else {
      // Check if adding would exceed the limit
      if (selectedTracks.length >= MAX_TRACKS) {
        toast({
          title: 'Track limit reached',
          description: `You can only add up to ${MAX_TRACKS} songs to your playlist.`,
          variant: 'destructive',
        });
        return;
      }
      setSelectedTracks([...selectedTracks, track]);
    }
    
    // Clear any tracks error when selection changes
    if (formErrors.tracks) {
      setFormErrors(prev => ({ ...prev, tracks: undefined }));
    }
  };
  
  const removeTrack = (trackId: string) => {
    setSelectedTracks(selectedTracks.filter(t => t.id !== trackId));
    
    // Clear any tracks error when selection changes
    if (formErrors.tracks) {
      setFormErrors(prev => ({ ...prev, tracks: undefined }));
    }
  };
  
  const isTrackSelected = (trackId: string) => {
    return selectedTracks.some(t => t.id === trackId);
  };
  
  const validateForm = (): boolean => {
    const errors: {
      playlistName?: string;
      creatorName?: string;
      tracks?: string;
    } = {};
    
    if (!playlistName.trim()) {
      errors.playlistName = 'Playlist name is required';
    }
    
    if (!creatorName.trim()) {
      errors.creatorName = 'Creator name is required';
    }
    
    if (selectedTracks.length === 0) {
      errors.tracks = 'Please add at least one track to your playlist';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const saveToSupabase = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Save to Supabase
      const trackIds = selectedTracks.map(track => track.id);
      const savedPlaylist = await savePlaylist(creatorName.trim(), playlistName.trim(), trackIds);
      
      if (!savedPlaylist) {
        throw new Error('Failed to save playlist');
      }
      
      toast({
        title: 'Playlist created!',
        description: 'Your playlist has been created and saved.',
      });
      
      // Redirect to the playlist detail page
      router.push(`/playlists/${savedPlaylist.playlist_id}`);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving playlist:', error);
      }
      toast({
        title: 'Error',
        description: 'Failed to create playlist. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };
  
  // Create a Spotify playlist from selected tracks (option for users with Spotify accounts)
  const createSpotifyPlaylist = () => {
    if (selectedTracks.length === 0) {
      setFormErrors(prev => ({ ...prev, tracks: 'Please add at least one track to your playlist' }));
      return;
    }
    
    try {
      // Create a URL to add tracks to a new Spotify playlist
      const trackUris = selectedTracks.map(track => `spotify:track:${track.id}`).join(',');
      const encodedPlaylistName = encodeURIComponent(playlistName);
      const spotifyUrl = `https://open.spotify.com/add/${trackUris}?title=${encodedPlaylistName}`;
      
      // Open in a new tab
      window.open(spotifyUrl, '_blank');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error opening Spotify:', error);
      }
      toast({
        title: 'Error',
        description: 'Failed to open Spotify. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <Link 
          href="/playlists"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          <span className="black-han-sans">Back to Playlists</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 black-han-sans text-center">
          CREATE YOUR BTS PLAYLIST
        </h1>
        
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Build your own custom BTS playlist to share with other ARMY members! You can add up to {MAX_TRACKS} songs and share your musical taste with the community. 💜
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Left side: Search and results */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="mb-6">
            <div className="flex items-center border-2 border-black rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="pl-3 pr-2 text-gray-500">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for BTS songs to add..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 pl-2 outline-none text-lg"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="px-3 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          
          {/* Search results */}
          <div className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-md">
            <div className="p-4 border-b-2 border-gray-200">
              <h2 className="font-bold black-han-sans">SEARCH RESULTS</h2>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 size={24} className="animate-spin mr-2" />
                  <span>Searching...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {query ? "No songs found. Try another search term." : "Search for BTS songs to add to your playlist."}
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {searchResults.map((track) => (
                    <li key={track.id} className="hover:bg-gray-50">
                      <div className="flex items-center p-4">
                        <div className="w-12 h-12 relative flex-shrink-0 mr-4">
                          {track.album.images.length > 0 ? (
                            <Image
                              src={track.album.images[0].url}
                              alt={track.album.name}
                              fill
                              className="object-cover rounded-lg border border-gray-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                              <Music size={20} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="font-medium">{track.name}</div>
                          <div className="text-sm text-gray-500">
                            {track.album.name} • {formatDuration(track.duration_ms)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleTrack(track)}
                          className={`ml-4 p-2 rounded-full ${
                            isTrackSelected(track.id)
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : selectedTracks.length >= MAX_TRACKS
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          disabled={!isTrackSelected(track.id) && selectedTracks.length >= MAX_TRACKS}
                        >
                          {isTrackSelected(track.id) ? (
                            <Check size={20} />
                          ) : (
                            <Plus size={20} />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Right side: Playlist editor */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="border-2 border-black rounded-xl overflow-hidden bg-white shadow-md h-full flex flex-col">
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              <div className="mb-4">
                <label htmlFor="playlist-name" className="block text-sm font-bold text-gray-700 mb-1">
                  Playlist Name*
                </label>
                <input
                  id="playlist-name"
                  type="text"
                  value={playlistName}
                  onChange={(e) => {
                    setPlaylistName(e.target.value);
                    if (formErrors.playlistName) {
                      setFormErrors(prev => ({ ...prev, playlistName: undefined }));
                    }
                  }}
                  className={`w-full outline-none border-2 ${formErrors.playlistName ? 'border-red-300' : 'border-black'} rounded-lg p-2.5`}
                  placeholder="My BTS Playlist"
                />
                {formErrors.playlistName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.playlistName}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="creator-name" className="block text-sm font-bold text-gray-700 mb-1">
                  Your Name*
                </label>
                <input
                  id="creator-name"
                  type="text"
                  value={creatorName}
                  onChange={(e) => {
                    setCreatorName(e.target.value);
                    if (formErrors.creatorName) {
                      setFormErrors(prev => ({ ...prev, creatorName: undefined }));
                    }
                  }}
                  className={`w-full outline-none border-2 ${formErrors.creatorName ? 'border-red-300' : 'border-black'} rounded-lg p-2.5`}
                  placeholder="Your ARMY name"
                />
                {formErrors.creatorName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.creatorName}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto max-h-[400px]">
              <div className="sticky top-0 bg-white p-3 border-b border-gray-200 z-10">
                <div className="font-bold text-sm flex justify-between items-center black-han-sans">
                  <span>SELECTED SONGS ({selectedTracks.length}/{MAX_TRACKS})</span>
                  {selectedTracks.length > 0 && (
                    <button
                      onClick={() => setSelectedTracks([])}
                      className="text-xs text-red-600 hover:text-red-800 font-normal"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              
              {selectedTracks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Music size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Your playlist is empty. Search and add songs!</p>
                  {formErrors.tracks && (
                    <p className="mt-3 text-sm text-red-600 flex items-center justify-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.tracks}
                    </p>
                  )}
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {selectedTracks.map((track, index) => (
                    <li key={track.id} className="hover:bg-gray-50">
                      <div className="flex items-center p-3">
                        <div className="w-8 text-center text-gray-500 mr-2">{index + 1}</div>
                        
                        <div className="w-10 h-10 relative flex-shrink-0 mr-3">
                          {track.album.images.length > 0 ? (
                            <Image
                              src={track.album.images[0].url}
                              alt={track.album.name}
                              fill
                              className="object-cover rounded border border-gray-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                              <Music size={16} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="font-medium text-sm">{track.name}</div>
                          <div className="text-xs text-gray-500">
                            {formatDuration(track.duration_ms)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeTrack(track.id)}
                          className="ml-2 p-1 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600 mb-3">
                {selectedTracks.length} song{selectedTracks.length !== 1 ? 's' : ''} selected • {selectedTracks.reduce((acc, track) => acc + track.duration_ms, 0) / 60000 | 0} min total
              </div>
              
              <button
                onClick={saveToSupabase}
                disabled={isCreating || selectedTracks.length === 0}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 border-2 ${
                  selectedTracks.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200'
                    : 'bg-[#FFDE00] hover:bg-yellow-300 text-black border-black'
                } mb-3`}
              >
                {isCreating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="black-han-sans">SAVING...</span>
                  </>
                ) : (
                  <>
                    <Music size={20} />
                    <span className="black-han-sans">SAVE PLAYLIST</span>
                  </>
                )}
              </button>
              
              <button
                onClick={createSpotifyPlaylist}
                disabled={selectedTracks.length === 0}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 border-2 ${
                  selectedTracks.length === 0
                    ? 'bg-white text-gray-400 cursor-not-allowed border-gray-200'
                    : 'bg-white text-black hover:bg-gray-50 border-black'
                }`}
              >
                <span>Open in Spotify</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 