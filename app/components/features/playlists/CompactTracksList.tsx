'use client';

import React, { useEffect, useState } from 'react';
import { Music, List } from 'lucide-react';
import { getTracksById, SpotifyTrack } from '@/app/services/spotify-service';

interface CompactTracksListProps {
  trackIds: string[];
  maxTracks?: number;
}

export default function CompactTracksList({ 
  trackIds, 
  maxTracks = 5 
}: CompactTracksListProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  // Get only the first maxTracks tracks
  const limitedTrackIds = trackIds.slice(0, maxTracks);
  
  useEffect(() => {
    const fetchTracks = async () => {
      if (limitedTrackIds.length === 0) {
        setLoading(false);
        setDebugInfo("No track IDs provided");
        return;
      }
      
      setLoading(true);
      setError(false);
      
      try {
        // Try direct Spotify API first
        const tracksData = await getTracksById(limitedTrackIds);
        setTracks(tracksData);
        setDebugInfo(null);
      } catch (error) {
        setError(true);
        setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
        // As a fallback, try the API route
        try {
          const response = await fetch(`/api/spotify/tracks?ids=${limitedTrackIds.join(',')}`);
          if (response.ok) {
            const data = await response.json();
            if (data.tracks && Array.isArray(data.tracks)) {
              setTracks(data.tracks);
              setError(false);
              setDebugInfo("Retrieved via API route");
            }
          }
        } catch (fallbackError) {
          setDebugInfo(`Both direct and API fallback failed`);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchTracks();
  }, [limitedTrackIds]);
  
  if (loading) {
    return (
      <div className="mt-3 space-y-2">
        {[...Array(Math.min(maxTracks, trackIds.length))].map((_, index) => (
          <div key={index} className="animate-pulse flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded flex-grow"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error || tracks.length === 0) {
    return (
      <div className="mt-3 text-gray-500 text-sm text-center py-2">
        <p>{trackIds.length} songs</p>
        {debugInfo && (
          <p className="text-xs mt-1 text-red-500">{debugInfo}</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="mt-2 space-y-1">
      {debugInfo && (
        <p className="text-xs text-blue-500 mb-1">{debugInfo}</p>
      )}
      
      {tracks.map((track, index) => (
        <div 
          key={track.id} 
          className="flex items-center gap-2 text-sm"
        >
          <div className="w-4 h-4 flex items-center justify-center text-xs text-gray-500">
            {index + 1}
          </div>
          <div className="overflow-hidden flex-grow">
            <div className="truncate text-gray-700">{track.name}</div>
          </div>
        </div>
      ))}
      
      {trackIds.length > maxTracks && (
        <div className="text-xs text-gray-500 pt-1 pl-6">
          +{trackIds.length - maxTracks} more songs
        </div>
      )}
    </div>
  );
} 