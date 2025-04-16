"use client"

import { useMemo, useState } from "react"
import { AlbumCard } from "@/app/components/discography/AlbumCard"
import { discographyData } from "@/app/lib/discography-data"
import { Music } from "lucide-react"

export default function DiscographyPage() {
  const [filterYear, setFilterYear] = useState<number | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  
  // Get unique years for filter
  const years = useMemo(() => {
    const uniqueYears = [...new Set(discographyData.map(album => album.releaseYear))];
    return uniqueYears.sort((a, b) => b - a); // Sort descending
  }, []);
  
  // Get unique album types for filter
  const albumTypes = useMemo(() => {
    const types = [...new Set(discographyData.map(album => album.type))];
    return types.sort();
  }, []);
  
  // Filter albums based on selected criteria
  const filteredAlbums = useMemo(() => {
    return discographyData.filter(album => {
      const yearMatch = !filterYear || album.releaseYear === filterYear;
      const typeMatch = !filterType || album.type === filterType;
      return yearMatch && typeMatch;
    }).sort((a, b) => {
      // Sort by release year descending, then by release date descending
      if (a.releaseYear !== b.releaseYear) {
        return b.releaseYear - a.releaseYear;
      }
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });
  }, [filterYear, filterType]);

  // Get the most recent album - we won't feature any album to keep consistent sizing
  const featuredAlbum = useMemo(() => {
    return discographyData.sort((a, b) => {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    })[0];
  }, []);
  
  // Reset all filters
  const resetFilters = () => {
    setFilterYear(null);
    setFilterType(null);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-center black-han-sans">
          BTS Discography
        </h1>
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Explore BTS's musical journey from debut to present, including studio albums, mini-albums, singles, and compilations. 
          Discover their evolution across multiple languages and genres as they went from Korean newcomers to global superstars.
        </p>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white rounded-xl border-2 border-black p-4 mb-6">
        <h2 className="text-xl font-bold black-han-sans mb-3 text-center">
          Filter Albums
        </h2>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <select 
            className="bg-white border-2 border-black rounded-lg px-3 py-2 text-sm flex-1 min-w-[120px] max-w-[180px]"
            value={filterYear || ""}
            onChange={(e) => setFilterYear(e.target.value ? parseInt(e.target.value) : null)}
            aria-label="Filter by year"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select 
            className="bg-white border-2 border-black rounded-lg px-3 py-2 text-sm flex-1 min-w-[120px] max-w-[180px]"
            value={filterType || ""}
            onChange={(e) => setFilterType(e.target.value || null)}
            aria-label="Filter by album type"
          >
            <option value="">All Types</option>
            {albumTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <button 
            onClick={resetFilters}
            className="bg-black text-white rounded-lg px-4 py-2 text-sm"
            aria-label="Reset all filters"
          >
            Reset
          </button>
        </div>
        
        {/* Album count display */}
        <div className="mt-3 text-center">
          <p className="text-sm font-medium">
            <span className="font-bold">{filteredAlbums.length}</span> {filteredAlbums.length === 1 ? 'album' : 'albums'} found
          </p>
          
          {(filterYear || filterType) && (
            <p className="text-xs text-gray-600 mt-1">
              Showing: {filterYear ? `Year: ${filterYear}` : ''} 
              {filterYear && filterType ? ' | ' : ''}
              {filterType ? `Type: ${filterType}` : ''}
            </p>
          )}
        </div>
      </div>
      
      {/* Albums Grid Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center black-han-sans flex items-center justify-center gap-2">
          <Music size={24} />
          <span>Album Collection</span>
        </h2>
        
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <AlbumCard
                key={album.slug}
                album={album}
                featured={false} // Set all albums to non-featured for consistent sizing
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No albums match your filter criteria</p>
            <button 
              onClick={resetFilters}
              className="mt-4 bg-black text-white rounded-lg px-4 py-2 text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Timeline Section */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">
          BTS Discography Journey
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-1/2 transform sm:translate-x-[-50%] w-1 bg-black h-full"></div>
          
          {/* Timeline items */}
          <div className="space-y-8">
            {years.map((year, i) => {
              const yearAlbums = discographyData.filter(album => album.releaseYear === year);
              return (
                <div key={year} className={`relative ${i % 2 === 0 ? 'sm:pl-1/2' : 'sm:pr-1/2 sm:text-right'}`}>
                  {/* Year marker */}
                  <div 
                    className={`
                      sm:absolute sm:top-0 
                      ${i % 2 === 0 ? 'sm:left-[calc(50%-36px)]' : 'sm:right-[calc(50%-36px)]'}
                      w-16 h-16 rounded-full bg-black text-white flex items-center justify-center
                      text-xl font-bold z-10 mx-auto mb-4 sm:mx-0
                    `}
                  >
                    {year}
                  </div>
                  
                  {/* Albums list for this year */}
                  <div 
                    className={`
                      pl-8 sm:pl-0 
                      ${i % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'}
                      border-l sm:border-l-0
                      ${i % 2 === 0 ? 'sm:border-l' : 'sm:border-r'}
                      border-black pb-8
                    `}
                  >
                    <div className="space-y-3">
                      {yearAlbums.map(album => (
                        <div key={album.slug} className="bg-gray-100 p-3 rounded-lg">
                          <p className="font-bold">{album.title}</p>
                          <p className="text-sm text-gray-600">{album.releaseDate} • {album.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Fun Facts Section */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">
          BTS Album Fun Facts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Most Sold Album</h3>
            <p>Map of the Soul: 7 sold over 5 million copies worldwide, setting records for K-pop album sales.</p>
          </div>
          
          <div className="bg-blue-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Billboard Achievements</h3>
            <p>BTS has had 6 consecutive albums reach #1 on the Billboard 200 chart, doing so in the shortest time span since The Beatles.</p>
          </div>
          
          <div className="bg-green-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Album Series</h3>
            <p>BTS has created multiple album series that tell connected stories, including the School Trilogy, HYYH (The Most Beautiful Moment in Life), Love Yourself, and Map of the Soul.</p>
          </div>
          
          <div className="bg-yellow-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Historic Singles</h3>
            <p>"Dynamite" (2020) became BTS's first Billboard Hot 100 #1 and first Grammy-nominated song, while "Take Two" (2023) celebrated their 10th anniversary with all seven members.</p>
          </div>
          
          <div className="bg-red-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Grammy Recognition</h3>
            <p>BTS made history as the first K-pop act to be nominated for a Grammy Award with "Dynamite" and has since received multiple nominations.</p>
          </div>
          
          <div className="bg-indigo-100 rounded-xl p-4">
            <h3 className="font-bold mb-2">Decade of Music</h3>
            <p>From 2013 to 2023, BTS has released over 20 albums and singles across three languages, showing their evolution from hip-hop focused rookies to global music icons.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 