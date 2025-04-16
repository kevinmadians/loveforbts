"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Zap, Heart, Quote, Instagram, Youtube, Play } from "lucide-react"

export function JHopeAdditionalContent() {
  const [activeSoloWorks, setActiveSoloWorks] = useState("hope-world")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("hope-world")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "hope-world" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Hope World (2018)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("jack-in-the-box")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "jack-in-the-box" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Jack In The Box (2022)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("on-the-street")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "on-the-street" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            On The Street (2023)
          </button>
        </div>
        
        {/* Hope World Content */}
        {activeSoloWorks === "hope-world" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jhope-hope-world.jpg" 
                  alt="J-Hope - Hope World Mixtape" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Hope World (2018)</h3>
              <p className="mb-4">
                J-Hope's debut mixtape showcases his sunny personality and musical versatility, featuring colorful, 
                upbeat tracks that established his solo artistry. Inspired by Jules Verne's "Twenty Thousand 
                Leagues Under the Sea," the mixtape invites listeners to explore J-Hope's artistic universe.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Daydream</strong> - A playful track exploring the contrast between fame and privacy</li>
                  <li><strong>Hope World</strong> - The title track that establishes the mixtape's vibrant worldview</li>
                  <li><strong>Airplane</strong> - A reflection on his journey to success and newfound lifestyle</li>
                  <li><strong>Base Line</strong> - A groovy hip-hop track showcasing J-Hope's rap skills</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://soundcloud.com/bangtan/sets/j-hope-hope-world" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on SoundCloud</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=OK3GJ0WIQ8s" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Daydream MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Jack In The Box Content */}
        {activeSoloWorks === "jack-in-the-box" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jhope-jack-in-the-box.jpg" 
                  alt="J-Hope - Jack In The Box Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Jack In The Box (2022)</h3>
              <p className="mb-4">
                J-Hope's first official solo album revealed a darker, more introspective side of his artistry, 
                exploring themes of ambition, doubt, and artistic growth. With this album, he showcased his 
                musical range and depth, breaking free from the box of expectations.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Arson</strong> - A fiery track about the burning passion that both creates and destroys</li>
                  <li><strong>MORE</strong> - A genre-blending lead single expressing his desire for artistic fulfillment</li>
                  <li><strong>Equal Sign</strong> - A message of equality and compassion with a mellow groove</li>
                  <li><strong>Safety Zone</strong> - An introspective track about finding security amid chaos</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/0FrC9lzgVhziJenigsrXdl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=QmpTkkaKYSU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Arson MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* On The Street Content */}
        {activeSoloWorks === "on-the-street" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jhope-on-the-street.jpg" 
                  alt="J-Hope - On The Street Single" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">On The Street (2023)</h3>
              <p className="mb-4">
                A special single released before J-Hope's military enlistment, featuring a collaboration with 
                J. Cole, one of his musical idols. The track is a heartfelt tribute to street dance culture 
                and J-Hope's roots as a dancer, while also serving as a temporary farewell message to fans.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Release Highlights:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Features American rapper J. Cole, whom J-Hope has cited as a major influence</li>
                  <li>The music video shows J-Hope walking through various city streets, symbolizing his journey</li>
                  <li>Released on March 3, 2023, just weeks before his military enlistment on April 18</li>
                  <li>Combines both Korean and English lyrics, showcasing J-Hope's bilingual abilities</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/track/5wxYxygyHpbgv0EXZuqb9V" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=r6WbbU_lLCA&pp=ygUTb24gdGhlIHN0cmVldCBqaG9wZQ%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dance Virtuosity Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Dance Virtuosity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-600" />
              Street Dance Foundation
            </h3>
            <p className="mb-4">
              Before joining Big Hit Entertainment, J-Hope was already an accomplished street dancer and a member 
              of the dance crew NEURON. His background in popping, locking, and hip-hop styles formed the foundation 
              of his versatile dance abilities that would later define BTS's performance quality.
            </p>
            
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-600" />
              BTS's Dance Leader
            </h3>
            <p>
              As BTS's dance leader, J-Hope is responsible for teaching choreography to other members and ensuring 
              performance quality. Members have often credited him with helping them improve their dancing skills 
              through patient instruction and detailed feedback, earning him the nickname "Dance Leader Hobi."
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-600" />
              Iconic Performances
            </h3>
            <p className="mb-4">
              His solo performances like "Airplane" at the 5th Muster, "Arson" at Lollapalooza 2022, and various 
              dance breaks in BTS concerts showcase his exceptional control, fluidity, and ability to command 
              the stage with his charismatic presence.
            </p>
            
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-600" />
              Dance Style & Technique
            </h3>
            <p>
              J-Hope's dance style is characterized by sharp, precise movements combined with fluid transitions. 
              His technical proficiency is matched by his expressiveness and musicality, allowing him to convey 
              emotion through movement. His ability to adapt to various dance styles—from hip-hop to contemporary—has 
              made him one of K-pop's most respected dancers.
            </p>
          </div>
        </div>
      </div>
      
      {/* Sunshine Personality Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Sunshine Personality</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              The Group's Mood Maker
            </h3>
            <p className="mb-4">
              Known as BTS's "sunshine," J-Hope is famous for his bright energy and ability to lift the group's spirits. 
              His catchphrase "I'm your hope, you're my hope, I'm J-Hope" embodies his positive influence and the 
              mutual support between him and ARMY.
            </p>
            
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Duality & Work Ethic
            </h3>
            <p>
              Despite his cheerful public persona, J-Hope is known among members as one of the most serious and 
              hardworking behind the scenes. His perfectionism in dance practice and music production reveals a 
              determined professional side that contrasts with his playful image.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Fun Facts
            </h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Known for his cleanliness and organization—often called the "mom" of the group</li>
              <li>Has an extensive collection of fashionable items, particularly shoes</li>
              <li>Extremely afraid of heights but has worked to overcome this fear</li>
              <li>His sister, Jiwoo, manages his official Instagram account</li>
              <li>His Mickey Mouse plushie is one of his most treasured possessions</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Philanthropic Efforts
            </h3>
            <p>
              J-Hope has made significant donations to various causes, including children's education and welfare. 
              In 2018, he donated 150 million won to ChildFund Korea, and in 2019, he donated 100 million won to 
              support low-income students. He continues to make regular donations, demonstrating his commitment to 
              giving back to society.
            </p>
          </div>
        </div>
      </div>
      
      {/* Memorable Quotes Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Quotes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"What's good is good, but what's real... is real."</span>
              </li>
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"I believe in the power of music. I believe I can overcome anything with music."</span>
              </li>
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"Even if it's a road of thorns, we still run toward our dreams."</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"When things get tough, look at the people who love you!"</span>
              </li>
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"Happiness is not something that comes from somewhere far away. Anyone can be happy as long as they can feel and experience it."</span>
              </li>
              <li className="flex items-start">
                <Quote className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600 mt-1" />
                <span>"I'm your hope, you're my hope, I'm J-Hope!"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 