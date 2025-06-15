"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Music, Search, X, Plus, Heart, User, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { BTSSong, btsArraySongs, searchBTSSongs } from '@/app/data/bts-songs'
import { usePlaylist } from '@/app/lib/playlist-context'
import Image from 'next/image'

// Album cover mapping for songs
const albumCovers: { [key: string]: string } = {
  // Group Albums
  "No More Dream": "/images/albums/2-cool-4-skool.jpg",
  "N.O": "/images/albums/orul82.jpg",
  "Boy In Luv": "/images/albums/skool-luv-affair.jpg",
  "Just One Day": "/images/albums/skool-luv-affair.jpg",
  "Danger": "/images/albums/dark-and-wild.jpg",
  "War of Hormone": "/images/albums/dark-and-wild.jpg",
  "I Need U": "/images/albums/hyyh-pt1.jpg",
  "Dope": "/images/albums/hyyh-pt1.jpg",
  "Run": "/images/albums/hyyh-pt2.jpg",
  "Butterfly": "/images/albums/hyyh-pt2.jpg",
  "Fire": "/images/albums/young-forever.jpg",
  "Save Me": "/images/albums/young-forever.jpg",
  "Blood Sweat & Tears": "/images/albums/wings.jpg",
  "Spring Day": "/images/albums/you-never-walk-alone.jpg",
  "Not Today": "/images/albums/you-never-walk-alone.jpg",
  "DNA": "/images/albums/love-yourself-her.jpg",
  "MIC Drop": "/images/albums/love-yourself-her.jpg",
  "Go Go": "/images/albums/love-yourself-her.jpg",
  "Fake Love": "/images/albums/love-yourself-tear.jpg",
  "Airplane Pt.2": "/images/albums/love-yourself-tear.jpg",
  "The Truth Untold": "/images/albums/love-yourself-tear.jpg",
  "IDOL": "/images/albums/love-yourself-answer.jpg",
  "Boy With Luv": "/images/albums/map-of-the-soul-persona.jpg",
  "Make It Right": "/images/albums/map-of-the-soul-persona.jpg",
  "ON": "/images/albums/map-of-the-soul-7.jpg",
  "Black Swan": "/images/albums/map-of-the-soul-7.jpg",
  "My Time": "/images/albums/map-of-the-soul-7.jpg",
  "Filter": "/images/albums/map-of-the-soul-7.jpg",
  "Inner Child": "/images/albums/map-of-the-soul-7.jpg",
  "Moon": "/images/albums/map-of-the-soul-7.jpg",
  "UGH!": "/images/albums/map-of-the-soul-7.jpg",
  "00:00": "/images/albums/map-of-the-soul-7.jpg",
  "Friends": "/images/albums/map-of-the-soul-7.jpg",
  "Respect": "/images/albums/map-of-the-soul-7.jpg",
  "Dynamite": "/images/albums/dynamite.jpg",
  "Life Goes On": "/images/albums/be.jpg",
  "Blue & Grey": "/images/albums/be.jpg",
  "Telepathy": "/images/albums/be.jpg",
  "Dis-ease": "/images/albums/be.jpg",
  "Stay": "/images/albums/be.jpg",
  "Fly To My Room": "/images/albums/be.jpg",
  "Butter": "/images/albums/butter.jpg",
  "Permission to Dance": "/images/albums/butter.jpg",
  "Yet To Come": "/images/albums/proof.jpg",
  "For Youth": "/images/albums/proof.jpg",
  "Take Two": "/images/albums/take-two.jpg",
  
  // Solo Works
  "The Astronaut": "/images/albums/jin-astronaut.jpg",
  "Super Tuna": "/images/albums/jin-super-tuna.jpg",
  "Awake": "/images/albums/jin-awake.jpg",
  "Agust D": "/images/albums/suga-agust-d.jpg",
  "Daechwita": "/images/albums/suga-d-2.jpg",
  "That That": "/images/albums/suga-d-2.jpg",
  "D-Day": "/images/albums/suga-d-day.jpg",
  "Haegeum": "/images/albums/suga-d-day.jpg",
  "Amygdala": "/images/albums/suga-d-day.jpg",
  "Hope World": "/images/albums/jhope-hope-world.jpg",
  "Chicken Noodle Soup": "/images/albums/jhope-hope-world.jpg",
  "Arson": "/images/albums/jhope-jack-in-the-box.jpg",
  "MORE": "/images/albums/jhope-jack-in-the-box.jpg",
  "On the Street": "/images/albums/jhope-on-the-street.jpg",
  "Indigo": "/images/albums/rm-indigo.jpg",
  "Wild Flower": "/images/albums/rm-indigo.jpg",
  "Still Life": "/images/albums/rm-indigo.jpg",
  "mono.": "/images/albums/rm-mono.jpg",
  "Tokyo": "/images/albums/rm-mono.jpg",
  "Seoul": "/images/albums/rm-mono.jpg",
  "Moonchild": "/images/albums/rm-mono.jpg",
  "RM": "/images/albums/rm-mixtape.jpg",
  "Do You": "/images/albums/rm-mixtape.jpg",
  "Like Crazy": "/images/albums/jimin-face.jpg",
  "Set Me Free Pt.2": "/images/albums/jimin-face.jpg",
  "Promise": "/images/albums/jimin-promise.jpg",
  "Christmas Love": "/images/albums/jimin-christmas-love.jpg",
  "With You": "/images/albums/jimin-with-you.jpg",
  "Winter Bear": "/images/albums/v-winter-bear.jpg",
  "Christmas Tree": "/images/albums/v-ost.jpg",
  "Love Me Again": "/images/albums/v-layover.jpg",
  "Slow Dancing": "/images/albums/v-layover.jpg",
  "Rainy Days": "/images/albums/v-layover.jpg",
  "Blue": "/images/albums/v-layover.jpg",
  "For Us": "/images/albums/v-layover.jpg",
  "Seven": "/images/albums/jungkook-seven.jpg",
  "3D": "/images/albums/jungkook-golden.jpg",
  "Standing Next To You": "/images/albums/jungkook-golden.jpg",
  "Hate You": "/images/albums/jungkook-golden.jpg",
  "Still With You": "/images/albums/jungkook-still-with-you.jpg",
}

export function PlaylistCreator() {
  const router = useRouter()
  const { createPlaylist } = usePlaylist()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    creatorName: '',
    description: ''
  })
  const [selectedSongs, setSelectedSongs] = useState<BTSSong[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<BTSSong[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim().length >= 2) {
      setIsSearching(true)
      const results = searchBTSSongs(query).slice(0, 10) // Limit to 10 results
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const addSong = (song: BTSSong) => {
    if (selectedSongs.length >= 10) {
      toast.error('Maximum 10 songs allowed per playlist')
      return
    }
    if (selectedSongs.some(s => s.title === song.title)) {
      toast.error('This song is already in your playlist')
      return
    }
    setSelectedSongs(prev => [...prev, song])
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
    toast.success(`${song.title} added to playlist!`)
  }

  const removeSong = (index: number) => {
    const removedSong = selectedSongs[index]
    setSelectedSongs(prev => prev.filter((_, i) => i !== index))
    toast.success(`${removedSong.title} removed from playlist`)
  }

  const nextStep = () => {
    if (currentStep === 1 && !formData.name.trim()) {
      toast.error('Please enter a playlist name')
      return
    }
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.creatorName.trim() || selectedSongs.length === 0) {
      toast.error('Please complete all required fields and add at least one song')
      return
    }

    const success = await createPlaylist(
      formData.name,
      formData.description,
      formData.creatorName,
      selectedSongs
    )

    if (success) {
      // Reset form
      setFormData({ name: '', description: '', creatorName: '' })
      setSelectedSongs([])
      setSearchQuery('')
      setSearchResults([])
      setCurrentStep(1)
      
      // Redirect to playlists page
      router.push('/bts-playlist')
    }
  }

  const getAlbumCover = (songTitle: string): string => {
    return albumCovers[songTitle] || '/images/albums/placeholder-album.jpg'
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              ${currentStep >= step 
                ? 'bg-black text-[#FFDE00]' 
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {step}
            </div>
            {step < 3 && (
              <div className={`
                w-8 h-1 mx-2
                ${currentStep > step ? 'bg-black' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Music className="w-6 h-6 text-purple-600" />
          Playlist Details
        </h2>
        <p className="text-gray-600">Give your playlist a name and tell us about yourself</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-800">
            Playlist Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My Favorite BTS Songs"
            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="creatorName" className="block text-sm font-bold mb-2 text-gray-800">
            Your ARMY Name *
          </label>
          <input
            type="text"
            id="creatorName"
            name="creatorName"
            value={formData.creatorName}
            onChange={handleInputChange}
            placeholder="ARMY Name"
            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2 text-gray-800">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Why did you create this playlist? What's special about these songs?"
            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={4}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="w-full bg-black text-[#FFDE00] py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
      >
        <Music className="w-5 h-5" />
        Continue to Add Songs
      </button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Search className="w-6 h-6 text-purple-600" />
          Add Your Favorite Songs
        </h2>
        <p className="text-gray-600">Search and add up to 10 BTS songs ({selectedSongs.length}/10)</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search BTS songs..."
            className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>

        {/* Search Results */}
        {(isSearching && searchResults.length > 0) && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-black rounded-lg mt-2 max-h-80 overflow-y-auto z-10 shadow-lg">
            {searchResults.map((song, index) => (
              <button
                key={index}
                onClick={() => addSong(song)}
                className="w-full p-4 text-left hover:bg-purple-50 border-b border-gray-100 last:border-b-0 flex items-center gap-4 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={getAlbumCover(song.title)}
                    alt={`${song.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{song.title}</h4>
                  {song.album && (
                    <p className="text-sm text-gray-500 truncate">{song.album} {song.year && `(${song.year})`}</p>
                  )}
                </div>
                <Plus className="w-5 h-5 text-purple-600" />
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {(isSearching && searchQuery.length >= 2 && searchResults.length === 0) && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-lg mt-2 p-4 text-center text-gray-500 z-10">
            No songs found. Try a different search term.
          </div>
        )}
      </div>

      {/* Selected Songs */}
      {selectedSongs.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Your Selected Songs ({selectedSongs.length})
          </h3>
          <div className="grid gap-3">
            {selectedSongs.map((song, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                  {index + 1}
                </span>
                <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={getAlbumCover(song.title)}
                    alt={`${song.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{song.title}</h4>
                  {song.album && (
                    <p className="text-sm text-gray-500 truncate">{song.album} {song.year && `(${song.year})`}</p>
                  )}
                </div>
                <button
                  onClick={() => removeSong(index)}
                  className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 border-2 border-black text-black py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={selectedSongs.length === 0}
          className="flex-1 bg-black text-[#FFDE00] py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review & Create
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <FileText className="w-6 h-6 text-purple-600" />
          Review Your Playlist
        </h2>
        <p className="text-gray-600">Make sure everything looks good before creating</p>
      </div>

      {/* Playlist Summary */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-purple-900">{formData.name}</h3>
          <p className="text-purple-700">by {formData.creatorName}</p>
        </div>
        {formData.description && (
          <p className="text-purple-800">{formData.description}</p>
        )}
        <div className="flex items-center gap-2 text-purple-700">
          <Music className="w-4 h-4" />
          <span>{selectedSongs.length} songs</span>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-3">
        <h4 className="font-bold text-lg">Songs in this playlist:</h4>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {selectedSongs.map((song, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">
                {index + 1}
              </span>
              <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={getAlbumCover(song.title)}
                  alt={`${song.title} album cover`}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-sm truncate">{song.title}</h5>
                {song.album && (
                  <p className="text-xs text-gray-500 truncate">{song.album}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 border-2 border-black text-black py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
        >
          Back to Edit
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex-1 bg-black text-[#FFDE00] py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Create Playlist
        </button>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-2xl mx-auto">
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </form>
    </div>
  )
} 