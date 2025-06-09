"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Bookmark, Trophy, Utensils, Gamepad2 } from "lucide-react"

// Jin's additional content component that matches the site's styling
export function JinAdditionalContent() {
  // State for toggling additional info sections
  const [activeSoloWorks, setActiveSoloWorks] = useState("super-tuna")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("super-tuna")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "super-tuna" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Super Tuna (2021)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("the-astronaut")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "the-astronaut" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            The Astronaut (2022)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("awake")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "awake" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Awake & Moon (2016-2020)
          </button>
        </div>
        
        {/* Super Tuna Content */}
        {activeSoloWorks === "super-tuna" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jin-super-tuna.jpg" 
                  alt="Jin - Super Tuna" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Super Tuna (2021)</h3>
              <p className="mb-4">
                "Super Tuna" was released as a surprise gift for fans on Jin's birthday. What started as a fun, 
                lighthearted trot song about fishing (one of Jin's favorite hobbies) unexpectedly went viral and 
                created a global dance challenge. Despite Jin asking fans not to make it popular, the catchy song and 
                choreography took on a life of their own.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Fun Facts:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The dance was improvised during the music video filming</li>
                  <li>The song went viral on TikTok with millions of videos using the track</li>
                  <li>Jin playfully "threatened" to delete the song when it became too popular</li>
                  <li>The lyrics reflect Jin's genuine passion for fishing</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://www.youtube.com/watch?v=ArHGiOxYwHM&pp=ygUKc3VwZXJ0IHVuYQ%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* The Astronaut Content */}
        {activeSoloWorks === "the-astronaut" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jin-astronaut.jpg" 
                  alt="Jin - The Astronaut" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">The Astronaut (2022)</h3>
              <p className="mb-4">
                "The Astronaut" is a collaboration with Coldplay, released as Jin's farewell single before his military enlistment. 
                The heartfelt alternative rock song uses space as a metaphor for Jin's journey with ARMY. The song expresses 
                Jin's gratitude towards fans and promises he'll return to them after his service.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Details:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Co-written with Coldplay's Chris Martin specifically for Jin</li>
                  <li>Debuted live at Coldplay's concert in Buenos Aires, Argentina</li>
                  <li>Music video tells the story of an alien (Jin) finding a home on Earth</li>
                  <li>Reached #1 on iTunes in over 100 countries</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/6nT2VfGN07ar1vdZyJY6ox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=c6ASQOwKkhk&pp=ygURdGhlIGFzdHJvbmF1dCBqaW4%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Awake & Moon Content */}
        {activeSoloWorks === "awake" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jin-awake.jpg" 
                  alt="Jin - Awake" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Awake & Moon (2016-2020)</h3>
              <p className="mb-4">
                Before his solo singles, Jin contributed beautiful solo tracks to BTS albums. "Awake" from the Wings album (2016) 
                and "Moon" from Map of the Soul: 7 (2020) showcase Jin's emotional vocal style and his special connection with fans.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Notable Solo Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Awake</strong> - An emotional ballad about feeling inadequate but persevering</li>
                  <li><strong>Moon</strong> - A pop-rock track where Jin compares himself to the moon orbiting Earth (the fans)</li>
                  <li><strong>Epiphany</strong> - A powerful song about self-love and acceptance</li>
                  <li><strong>Tonight</strong> - A tribute to his pets, showcasing his songwriting</li>
                  <li><strong>Abyss</strong> - A deeply personal song about depression and anxiety</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/track/6L88EH68XwlaXwvChlTS41" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen to Epiphany</span>
                </a>
                <a 
                  href="https://open.spotify.com/track/6KhAXXgDtEEahVzATvFNcn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen to Moon</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Two-Column Section: Memorable Quotes and Talents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Memorable Quotes */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Jin-isms</h2>
          <div className="space-y-4">
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Worldwide Handsome, you know?"</p>
                  <p className="text-sm text-gray-600">— Jin's iconic self-introduction</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I'm Jin, the one who shines even in the darkness."</p>
                  <p className="text-sm text-gray-600">— At BTS's debut showcase</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"When something is delicious, eat it. That's living in the moment."</p>
                  <p className="text-sm text-gray-600">— Jin's life philosophy</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"You worked hard today, you're the best!"</p>
                  <p className="text-sm text-gray-600">— His encouraging message to fans</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"In my next life, I want to be born as myself again."</p>
                  <p className="text-sm text-gray-600">— Showing his self-love philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Talents & Hobbies */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Talents & Hobbies</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Utensils className="text-pink-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Master Chef</h3>
                <p>
                  Jin is known as "Eat Jin" for his love of food and cooking. He has his own eating show and regularly
                  impresses members with homemade meals. He studied cooking formally and can prepare various Korean and
                  international dishes, often sharing recipes with fans.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Gamepad2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Gaming Enthusiast</h3>
                <p>
                  An avid gamer, Jin plays various games including MapleStory, Overwatch, and PlayerUnknown's Battlegrounds.
                  He's skilled enough that some fans didn't believe it was really him when they encountered him in games.
                  His gaming handle "Worldwide Handsome" has become legendary in some gaming communities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Trophy className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Snowboarding</h3>
                <p>
                  Jin is a talented snowboarder and enjoys winter sports. He has impressed fans with his skills on slopes,
                  showcasing his athletic abilities. Despite his busy schedule, he makes time for snowboarding trips whenever possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dad Jokes & Entertainment Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">The Master of Dad Jokes</h2>
        
        <p className="mb-6">
          Known for his "windshield wiper" laugh and endless supply of dad jokes, Jin has earned the title of BTS's 
          mood-maker. His ability to lighten any situation with humor has been crucial to the group's chemistry and 
          has endeared him to fans worldwide.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Classic Jin Jokes</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span>"Do you know what kind of fruit doesn't cry? Pineapple! (In Korean, 'pine' sounds like 'don't cry')"</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span>"Why did the strawberry cry? Because his mom was in a jam!"</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span>"What's the difference between a guitar and a fish? You can tune a guitar but you can't tuna fish!"</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-2">•</span>
                <span>"What did the ocean say to BTS? Nothing, it just waved!"</span>
              </li>
            </ul>
          </div>
          <div className="bg-pink-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Entertainment Appearances</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-2">•</span>
                <span><strong>Law of the Jungle (2017)</strong>: Showcased his survival skills and playful personality in Kota Manado</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-2">•</span>
                <span><strong>Eat Jin</strong>: His popular V LIVE series where he eats and chats with fans</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-2">•</span>
                <span><strong>Run BTS MC</strong>: Often takes the lead in games and challenges with his quick wit</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 font-bold mr-2">•</span>
                <span><strong>Year-End Award Shows</strong>: Famous for his comedic antics and interactions with other idols</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-bold mb-2">Variety Show Talents</h3>
          <p className="mb-4">
            Jin has natural variety show skills that make him a standout entertainment figure. His willingness to be silly, 
            his quick reactions, and his endearing confidence create memorable moments. Whether playing games, doing challenges, 
            or interviewing guests, Jin's entertainment value is undeniable.
          </p>
          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Did You Know?</h4>
            <p>
              Jin often prepares jokes in advance for interviews and shows, carrying a "joke book" to ensure he 
              can make both members and fans laugh. His commitment to spreading joy is so strong that he's been known 
              to practice jokes in English to connect with international fans.
            </p>
          </div>
        </div>
      </div>
      
      {/* Acting Background Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Acting Background & Visual Recognition</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <Bookmark className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Theater Arts Foundation</h3>
              <p>
                Before joining BigHit Entertainment (now HYBE), Jin studied acting at Konkuk University, one of Korea's 
                prestigious schools for performing arts. His academic background in Film and Theater has contributed to 
                his natural camera presence and expressive performances.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Visual Recognition</h3>
              <p>
                Jin has been recognized for his outstanding visuals by Korean media, international publications, and the 
                TC Candler "100 Most Handsome Faces" list multiple times. The nickname "Car Door Guy" was born when photos 
                of him exiting a car at a red carpet event went viral for his striking appearance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Music Video Narratives</h3>
              <p>
                Jin's acting skills shine in BTS music videos with complex narratives. In "Blood Sweat & Tears," "Fake Love," 
                and the "HYYH" series, his emotional scenes and character portrayal add depth to the storytelling. His solo scenes 
                in "Epiphany" showcase his ability to convey profound emotions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Future Aspirations</h3>
              <p>
                Jin has expressed interest in acting opportunities after completing his military service. Fans anticipate seeing 
                him in K-dramas or films that would showcase his visual presence and acting training. His natural charisma and 
                emotional range would make him well-suited for various roles.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-bold mb-2 text-center">Visual Recognition Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">TC Candler's 100 Most Handsome Faces</p>
              <p className="text-sm text-gray-600">Multiple Years</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">King of Visual Poll</p>
              <p className="text-sm text-gray-600">Korean Entertainment</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">Handsomeness Recognition</p>
              <p className="text-sm text-gray-600">Korean Plastic Surgeons Association</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
