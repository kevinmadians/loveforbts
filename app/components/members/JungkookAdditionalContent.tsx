"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Medal, Bookmark, MusicIcon, Paintbrush, Camera, Heart, Dog } from "lucide-react"

// Jungkook's additional content component that matches the site's styling
export function JungkookAdditionalContent() {
  // State for toggling additional info sections
  const [activeSoloWorks, setActiveSoloWorks] = useState("golden")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("golden")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "golden" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            GOLDEN (2023)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("seven")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "seven" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Seven (2023)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("still-with-you")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "still-with-you" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Still With You & Others
          </button>
        </div>
        
        {/* GOLDEN Album Content */}
        {activeSoloWorks === "golden" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jungkook-golden.jpg" 
                  alt="Jungkook - GOLDEN Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">GOLDEN (2023)</h3>
              <p className="mb-4">
                "GOLDEN" is Jungkook's debut solo album, showcasing his versatility as a singer across multiple genres.
                The album features collaborations with high-profile artists like Latto, Jack Harlow, and DJ Snake,
                delivering a polished pop sound that highlights Jungkook's powerful vocals and artistry.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Seven (feat. Latto)</strong> - A catchy UK garage-influenced track that dominated global charts</li>
                  <li><strong>3D (feat. Jack Harlow)</strong> - A smooth R&B track with a retro feel</li>
                  <li><strong>Standing Next to You</strong> - A disco-inspired dance track showcasing Jungkook's vocal range</li>
                  <li><strong>Too Sad to Dance</strong> - An emotional ballad highlighting his vocal vulnerability</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/5pSk3c3wVwnb2arb6ohCPU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=mHNCM-YALSA&pp=ygULM2QganVuZ2tvb2s%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch 3D MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Seven Content */}
        {activeSoloWorks === "seven" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jungkook-seven.jpg" 
                  alt="Jungkook - Seven" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Seven (feat. Latto) (2023)</h3>
              <p className="mb-4">
                "Seven" marked Jungkook's official solo debut single, released in July 2023. The track blends UK garage
                with pop elements, creating an infectiously catchy summer hit. With its daring lyrics and dynamic 
                production, "Seven" took the global music scene by storm, showcasing Jungkook's growth as a solo artist.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Global Impact:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Debuted at #1 on Billboard Hot 100, becoming the highest-charting solo song by a K-pop soloist</li>
                  <li>Broke Spotify records for the fastest song to reach 100 million streams</li>
                  <li>The music video reached 100 million views in just 8 days</li>
                  <li>Won numerous music show awards and topped charts in over 100 countries</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/track/7x9aauaA9cu6tyfpHnqDLo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=QU9c0053UAU&pp=ygUOc2V2ZW4ganVuZ2tvb2s%3D" 
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
        
        {/* Still With You & Others Content */}
        {activeSoloWorks === "still-with-you" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jungkook-still-with-you.jpg" 
                  alt="Jungkook - Still With You" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Solo Releases (2016-2022)</h3>
              <p className="mb-4">
                Before his official solo debut, Jungkook released several solo tracks through BTS albums and SoundCloud. 
                These songs showcase his growth as an artist and personal musical preferences, ranging from emotional 
                ballads to R&B-influenced tracks.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Notable Solo Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Still With You</strong> (2020) - A jazzy, sentimental song released for BTS FESTA</li>
                  <li><strong>My Time</strong> (2020) - An R&B track reflecting on growing up in the spotlight</li>
                  <li><strong>Euphoria</strong> (2018) - A soaring pop track exploring feelings of pure happiness</li>
                  <li><strong>Begin</strong> (2016) - His first solo song about his journey with BTS members</li>
                  <li><strong>Stay Alive</strong> (2022) - OST for the BTS webtoon "7Fates: CHAKHO"</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://soundcloud.com/bangtan/thankyouarmy2020" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Still With You on SoundCloud</span>
                </a>
                <a 
                  href="https://open.spotify.com/track/5YMXGBD6vcYP7IolemyLtK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Euphoria on Spotify</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* The Golden Maknae's Talents Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">The Golden Maknae: Extraordinary Talents</h2>
        
        <p className="mb-6">
          Nicknamed "The Golden Maknae" for his exceptional ability to excel at virtually anything he tries,
          Jungkook's diverse talents have impressed both fans and industry professionals. From vocals and dance
          to athletics and visual arts, his natural aptitude is matched only by his dedication to improvement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <MusicIcon className="text-yellow-600 mr-2" size={20} />
              <h3 className="font-bold">Vocal Prowess</h3>
            </div>
            <p className="mb-3">
              Jungkook's versatile vocals can adapt to multiple genres from pop to R&B, ballads to hip-hop. His range 
              spans from deep, rich lower tones to powerful high notes, complemented by precise control and emotional delivery.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Main vocalist of BTS since debut at age 15</li>
              <li>• Known for stable live performances while dancing</li>
              <li>• Influenced by artists like Justin Bieber and Justin Timberlake</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Medal className="text-blue-600 mr-2" size={20} />
              <h3 className="font-bold">Dance Excellence</h3>
            </div>
            <p className="mb-3">
              With exceptional body control, rhythm, and precision, Jungkook is recognized for his dance abilities. 
              His style combines powerful movements with fluid transitions, making complex choreographies look effortless.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Lead dancer with extensive training in various styles</li>
              <li>• Praised by professional choreographers</li>
              <li>• Known for creating dance challenges that go viral</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Medal className="text-purple-600 mr-2" size={20} />
              <h3 className="font-bold">Athletic Abilities</h3>
            </div>
            <p className="mb-3">
              Jungkook's physical prowess extends beyond dance to various sports and athletic activities. His 
              natural coordination and competitive spirit make him excel in physical challenges.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Won multiple gold medals in ISAC competitions</li>
              <li>• Skilled in boxing, taekwondo, and swimming</li>
              <li>• Known for exceptional physical stamina and strength</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Paintbrush className="text-green-600 mr-2" size={20} />
              <h3 className="font-bold">Visual Artistry</h3>
            </div>
            <p className="mb-3">
              Beyond performing, Jungkook has shown remarkable talent in visual arts. His drawings and paintings 
              display a keen eye for detail and composition, often shared with fans through social media.
            </p>
            <ul className="pl-4 space-y-1">
              <li>• Created artwork for BTS merchandise and album concepts</li>
              <li>• Designed tattoos including his own hand tattoos</li>
              <li>• Explored various art styles from realism to abstract</li>
            </ul>
          </div>
          
          <div className="bg-pink-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Camera className="text-pink-600 mr-2" size={20} />
              <h3 className="font-bold">Filmmaking & Photography</h3>
            </div>
            <p className="mb-3">
              Jungkook has demonstrated a talent for videography and photography, often capturing behind-the-scenes 
              moments of BTS's journey. His self-directed "Golden Closet Films" (GCF) series shows his eye for visual storytelling.
            </p>
            <ul className="pl-4 space-y-1">
              <li>• Created travel films in cities like Tokyo, Europe, and Chicago</li>
              <li>• Shot and edited the "G.C.F in Helsinki" video with 17M+ views</li>
              <li>• Developed a distinct visual style with cinematic quality</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Two-Column Section: Growth & Memorable Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Growth Journey */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Growth Journey</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">From Busan Boy to Global Star</h3>
                <p>
                  Debuting at just 15 years old as BTS's youngest member, Jungkook has grown up in the public eye.
                  His journey from a shy teenager from Busan to a confident global superstar showcases remarkable 
                  personal development and artistic growth.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Vocal Evolution</h3>
                <p>
                  Jungkook's vocal technique has evolved significantly since debut. His early performances showed
                  raw talent, while his recent work demonstrates sophisticated control, emotional depth, and stylistic 
                  versatility that have established him as one of K-pop's premier vocalists.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-purple-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Artistic Development</h3>
                <p>
                  From covering his idols to finding his unique sound, Jungkook's artistic journey shows his growth
                  from emulating his influences to developing his distinctive style. His solo work increasingly 
                  reflects his personal musical preferences and artistic vision.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Memorable Quotes */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Quotes</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I'd rather die than live without passion."</p>
                  <p className="text-sm text-gray-600">— On his dedication to his craft</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Even if I'm not perfect, I'm still the best version of myself."</p>
                  <p className="text-sm text-gray-600">— On self-acceptance</p>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Without ARMY, we are nothing but seven boys with a dream."</p>
                  <p className="text-sm text-gray-600">— On the importance of fans</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"If you want to love others, I think you should love yourself first."</p>
                  <p className="text-sm text-gray-600">— Reflecting BTS's message</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Don't try so hard to get noticed. Do your work silently, and the world will notice."</p>
                  <p className="text-sm text-gray-600">— His work philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bam: Jungkook's Beloved Doberman Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Bam: Jungkook's Beloved Doberman</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <Dog className="h-24 w-24 text-gray-400" />
              </div>
              /* Image placeholder - will be replaced with actual image later */
              /* <Image 
                src="/images/pets/jungkook-bam.jpg" 
                alt="Jungkook's dog Bam" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              /> */
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3">The Special Bond</h3>
            <p className="mb-4">
              In 2021, Jungkook introduced the world to Bam (뱀), his energetic Doberman Pinscher. Named after the 
              character Bambam from the movie "The Incredibles" (which means "night" in Korean), Bam quickly became 
              a beloved member of the BTS extended family and has captured the hearts of ARMY worldwide.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold mb-1 flex items-center">
                  <Heart className="text-red-500 mr-2" size={18} />
                  Bam's Personality
                </h4>
                <ul className="pl-4 space-y-1 text-sm">
                  <li>• Playful and energetic with an impressive training discipline</li>
                  <li>• Known for his intelligence and quick learning abilities</li>
                  <li>• Has a special handshake routine with Jungkook</li>
                  <li>• Loves playing fetch and running around open spaces</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h4 className="font-bold mb-1 flex items-center">
                  <Heart className="text-red-500 mr-2" size={18} />
                  Memorable Moments
                </h4>
                <ul className="pl-4 space-y-1 text-sm">
                  <li>• First introduced to ARMY during "In the SOOP 2" in 2021</li>
                  <li>• Featured in Jungkook's Instagram stories and selfies</li>
                  <li>• Appeared in the "7 Fates: CHAKHO" concept photoshoot</li>
                  <li>• Bam's training and bond was highlighted in BTS documentaries</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">A Source of Comfort</h4>
              <p>
                For Jungkook, Bam represents more than just a pet—he's a constant companion and source of emotional support. 
                During busy promotional periods and high-stress situations, Jungkook has shared how spending time with Bam 
                helps him relax and find balance. Their relationship highlights Jungkook's nurturing nature and his ability 
                to form deep bonds, whether with his BTS members, ARMY, or his four-legged friend.
              </p>
              <p className="mt-2 text-sm italic">
                "Bam is like family to me. When I come home tired, he's always there waiting, and it makes everything better." 
                — Jungkook on his relationship with Bam
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tattoo Artistry & Symbolism Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Tattoo Artistry & Personal Symbolism</h2>
        
        <p className="mb-6">
          Jungkook's tattoos are a visual representation of his personal journey, values, and artistic expression. 
          Starting with small hand tattoos that expanded into a full sleeve, his body art tells a story of his 
          identity, beliefs, and connection to BTS and ARMY.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Hand Tattoos & Their Meanings</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>ARMY</strong>: Written across his knuckles, representing his dedication to BTS's fandom</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>J</strong>: His initial, which also serves as his signature logo</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>The eye</strong>: Representing his perspective and vision as an artist</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>Heart</strong>: A symbol of love and emotional connection</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>"Rather die than live without passion"</strong>: A quote reflecting his life philosophy</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Arm Sleeve Tattoos</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>Tiger lily</strong>: A reference to his birth month and courage</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>Skeleton hand making "I love you" sign</strong>: A creative take on expressing love</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>Microphone</strong>: Symbolizing his identity as a performer</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>BTS debut date (June 13, 2013)</strong>: Marking the beginning of his journey</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">•</span>
                <span><strong>"Make hay while the sun shines"</strong>: A reminder to seize opportunities</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-bold mb-2">Tattoo Journey & Artistry</h3>
          <p className="mb-4">
            Jungkook's tattoos have evolved over time, starting with small, hidden designs and gradually becoming more 
            visible as his confidence grew. The artistic style of his tattoos reflects his personal aesthetic: minimalist, 
            meaningful designs with a mix of text, symbols, and imagery that create a cohesive visual story.
          </p>
          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Cultural Impact</h4>
            <p>
              Jungkook's tattoos have had significant influence among fans, with many ARMYs getting similar or matching designs 
              as a tribute. His openness about his body art has also helped shift perceptions about tattoos in Korean culture, 
              where they have traditionally been stigmatized. Each new tattoo reveal generates excitement among fans who eagerly 
              interpret the meanings and connections to his artistic journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
