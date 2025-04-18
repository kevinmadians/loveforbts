'use client';

import React from 'react';
import { Music } from 'lucide-react';

interface StaticTracksListProps {
  count: number;
  maxTracks?: number;
}

// Sample BTS song names to use when we can't fetch real data
const BTSSongs = [
  "Dynamite",
  "Butter",
  "Permission to Dance",
  "Boy With Luv",
  "DNA",
  "Life Goes On",
  "Spring Day",
  "Fake Love",
  "Black Swan",
  "ON",
  "Blood Sweat & Tears",
  "IDOL",
  "MIC Drop",
  "Fire",
  "Save ME",
  "I Need U",
  "Run",
  "Not Today",
  "Dope",
  "Magic Shop"
];

export default function StaticTracksList({ 
  count, 
  maxTracks = 3 
}: StaticTracksListProps) {
  // Use a deterministic "random" selection based on the count
  const getSong = (index: number) => {
    const position = (index * 7) % BTSSongs.length; // Simple hash function
    return BTSSongs[position];
  };

  // Limit displayed tracks
  const displayCount = Math.min(count, maxTracks);
  
  return (
    <div className="mt-2 space-y-1">
      {Array.from({ length: displayCount }).map((_, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 text-sm"
        >
          <div className="w-4 h-4 flex items-center justify-center text-xs text-gray-500">
            {index + 1}
          </div>
          <div className="overflow-hidden flex-grow">
            <div className="truncate text-gray-700">{getSong(index)}</div>
          </div>
        </div>
      ))}
      
      {count > maxTracks && (
        <div className="text-xs text-gray-500 pt-1 pl-6">
          +{count - maxTracks} more songs
        </div>
      )}
    </div>
  );
} 