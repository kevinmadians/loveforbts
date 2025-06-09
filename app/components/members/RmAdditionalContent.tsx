"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Bookmark, PenLine, Music, Palette, Book } from "lucide-react"

// RM's additional content component that matches the site's styling
export function RmAdditionalContent() {
  // State for toggling additional info sections
  const [activeSoloWorks, setActiveSoloWorks] = useState("indigo")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("indigo")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "indigo" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Indigo (2022)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("mono")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "mono" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Mono (2018)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("rm")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "rm" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            RM (2015)
          </button>
        </div>
        
        {/* Indigo Album Content */}
        {activeSoloWorks === "indigo" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/rm-indigo.jpg" 
                  alt="RM - Indigo Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Indigo (2022)</h3>
              <p className="mb-4">
                RM's first official solo album "Indigo" explores themes of his youth, introspection, and personal growth. 
                Described by RM as "the last archive of my twenties," the album features an impressive roster of collaborations 
                with artists including Erykah Badu, Anderson .Paak, and Tablo.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Wild Flower (with youjeen)</strong> - A rock-influenced anthem about finding peace after burning passionately</li>
                  <li><strong>Still Life (with Anderson .Paak)</strong> - A jazzy, funk-influenced track about preserving memories</li>
                  <li><strong>Yun (with Erykah Badu)</strong> - Named after Korean painter Yun Hyong-keun, explores artistic influences</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/2wGinO7YWLHN2sULIr4a7v" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://ibighit.com/bts/eng/discography/rm/detail/indigo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Official Site</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Mono Mixtape Content */}
        {activeSoloWorks === "mono" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/rm-mono.jpg" 
                  alt="RM - mono. mixtape" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">mono. (2018)</h3>
              <p className="mb-4">
                Released as a "playlist" rather than an album, "mono." showcases RM's introspective, ambient musical style. 
                The project explores themes of loneliness, self-discovery, and healing, with a more subdued and contemplative 
                tone than his previous work.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>seoul (prod. HONNE)</strong> - A melancholic love letter to RM's home city</li>
                  <li><strong>forever rain</strong> - A poetic track about finding comfort in rainy days</li>
                  <li><strong>moonchild</strong> - An atmospheric piece dedicated to those who feel most alive at night</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/1vsTrL1h2bRHP1kUPvlIyb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* RM Mixtape Content */}
        {activeSoloWorks === "rm" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/rm-mixtape.jpg" 
                  alt="RM - Self-titled mixtape" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">RM (2015)</h3>
              <p className="mb-4">
                RM's debut solo mixtape established his identity as a rapper and artist distinct from BTS. 
                Released while still using the name "Rap Monster," this project showcases his raw rap skills, 
                clever wordplay, and honest exploration of his struggles with fame and identity.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Do You</strong> - A powerful track questioning societal expectations</li>
                  <li><strong>Awakening</strong> - A reflection on his journey in the music industry</li>
                  <li><strong>Monster</strong> - A fierce track showcasing his technical rap skills</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://soundcloud.com/bangtan/sets/rm-rap-monster" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>SoundCloud</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Two-Column Section: Quotes and Art Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Memorable Quotes */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Quotes</h2>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <PenLine className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="italic mb-1">"What's good enough? It's relative. I'm still trying to find the answer."</p>
                  <p className="text-sm text-gray-600">— On perfectionism and growth</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <PenLine className="text-yellow-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="italic mb-1">"Please use me, please use BTS, to love yourself."</p>
                  <p className="text-sm text-gray-600">— United Nations speech, 2018</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <PenLine className="text-blue-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="italic mb-1">"Even if you're not perfect, you're limited edition."</p>
                  <p className="text-sm text-gray-600">— From the song "Answer: Love Myself"</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <PenLine className="text-green-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="italic mb-1">"Life's too short to be anything less than what we can become."</p>
                  <p className="text-sm text-gray-600">— On personal growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Art & Books */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Art & Literary Influences</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Palette className="mr-2" size={18} />
              Favorite Artists
            </h3>
            <div className="pl-6 mb-4">
              <ul className="list-disc space-y-1">
                <li><strong>Yun Hyong-keun</strong> - Korean minimalist painter whose work inspired RM's Indigo album</li>
                <li><strong>Kim Whanki</strong> - Abstract painter known for his "dot paintings"</li>
                <li><strong>KAWS</strong> - Contemporary artist known for his figurative sculptures and designs</li>
                <li><strong>David Hockney</strong> - British painter known for bright, vibrant landscapes</li>
              </ul>
            </div>
            
            <h3 className="text-lg font-semibold flex items-center">
              <Book className="mr-2" size={18} />
              Recommended Books
            </h3>
            <div className="pl-6">
              <ul className="list-disc space-y-1">
                <li><strong>The Ones Who Walk Away from Omelas</strong> by Ursula K. Le Guin</li>
                <li><strong>Kafka on the Shore</strong> by Haruki Murakami</li>
                <li><strong>The Midnight Library</strong> by Matt Haig</li>
                <li><strong>Demian</strong> by Hermann Hesse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Leadership Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Leadership Journey</h2>
        <p className="mb-4">
          As the leader of BTS since their debut in 2013, RM has guided the group through their meteoric rise from a small company 
          to global superstars. His leadership style combines emotional intelligence, thoughtful communication, and a clear 
          vision for the group's artistic direction.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Leadership Philosophy</h3>
            <p>
              RM's leadership is characterized by his ability to listen and find consensus. Rather than commanding, 
              he facilitates group decisions and ensures each member's voice is heard. This democratic approach has 
              created a strong team dynamic where all members feel valued and invested in BTS's success.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Global Communication Bridge</h3>
            <p>
              As the English speaker of the group, RM has served as the primary voice of BTS in international interviews and appearances. 
              His eloquence and thoughtfulness have helped BTS communicate their message effectively to a global audience, 
              breaking language barriers and cultural differences.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-bold mb-2">Key Leadership Moments</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-2">•</span>
              <span><strong>United Nations Speech (2018)</strong>: Delivered a powerful speech on self-acceptance at the UN General Assembly, representing BTS and global youth</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-2">•</span>
              <span><strong>White House Visit (2022)</strong>: Led BTS in speaking out against anti-Asian hate at the White House with President Biden</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-2">•</span>
              <span><strong>Military Enlistment Decision (2022)</strong>: Helped navigate the group's decision regarding military service, prioritizing their responsibility as citizens</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-2">•</span>
              <span><strong>Grammy Stage (2022)</strong>: Led BTS through their first solo Grammy performance despite testing positive for COVID-19 shortly before</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Educational Background */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Educational Journey & Intellectual Pursuits</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Academic Excellence</h3>
              <p>
                RM's academic achievements include scoring in the top 1% nationally on the College Scholastic Ability Test (CSAT) 
                with exceptional results in Korean, English, Math, and Social Studies. He was consistently ranked among the top students 
                during his school years.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Language Proficiency</h3>
              <p>
                Beyond his fluency in Korean and English, RM has studied Japanese and Chinese. His English proficiency is self-taught, 
                primarily through watching American TV shows like "Friends" and actively studying vocabulary. His TOEIC (Test of English 
                for International Communication) score was reportedly over 900 out of 990.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Continuing Education</h3>
              <p>
                In 2020, RM enrolled in Hanyang Cyber University's MBA program focused on Advertising & Media, continuing his education 
                despite BTS's busy schedule. He has expressed interest in art history and philosophy, regularly visiting museums and 
                galleries worldwide to expand his knowledge.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold">Intellectual Impact</h3>
              <p>
                RM's intellectual curiosity has significantly influenced BTS's music, incorporating literary references, philosophical 
                concepts, and art into their work. His leadership in the "Map of the Soul" series drew from Carl Jung's psychological 
                theories, bringing complex ideas to a global audience.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-bold mb-2 text-center">Notable Museum Visits</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">Museum of Modern Art</p>
              <p className="text-sm text-gray-600">New York, USA</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">Louvre Museum</p>
              <p className="text-sm text-gray-600">Paris, France</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">National Museum of Korea</p>
              <p className="text-sm text-gray-600">Seoul, South Korea</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-semibold">Art Basel</p>
              <p className="text-sm text-gray-600">Basel, Switzerland</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
