"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Bookmark, MusicIcon, FileCode, Disc, Headphones, Award, PenTool } from "lucide-react"

// Suga's additional content component that matches the site's styling
export function SugaAdditionalContent() {
  // State for toggling additional info sections
  const [activeSoloWorks, setActiveSoloWorks] = useState("d-day")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Agust D: Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("d-day")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "d-day" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            D-DAY (2023)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("d-2")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "d-2" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            D-2 (2020)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("agust-d")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "agust-d" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Agust D (2016)
          </button>
        </div>
        
        {/* D-DAY Album Content */}
        {activeSoloWorks === "d-day" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/suga-d-day.jpg" 
                  alt="Suga - D-DAY Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">D-DAY (2023)</h3>
              <p className="mb-4">
                "D-DAY" is the third and final installment in Suga's Agust D trilogy, representing the culmination of his 
                personal and artistic journey. The album showcases his growth as an artist and as a person, featuring a 
                diverse range of musical styles and collaborations with artists like IU, the late Ryuichi Sakamoto, and 
                BTS's j-hope.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Haegeum</strong> - A powerful track blending traditional Korean instruments with hip-hop</li>
                  <li><strong>Amygdala</strong> - An emotional exploration of trauma and healing</li>
                  <li><strong>People Pt.2 (feat. IU)</strong> - A reflective track with IU about fame and public perception</li>
                  <li><strong>Snooze (feat. Ryuichi Sakamoto & Woosung)</strong> - A collaboration with the legendary composer</li>
                  <li><strong>Life Goes On</strong> - A solo remake of BTS's hit with Suga's unique perspective</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/446ROKmKfpEwkbi2SjELVX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=iy9qZR_OGa0&pp=ygUMaGFlZ2V1bSBzdWdh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Haegeum MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* D-2 Content */}
        {activeSoloWorks === "d-2" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/suga-d-2.jpg" 
                  alt="Suga - D-2" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">D-2 (2020)</h3>
              <p className="mb-4">
                Released as a surprise mixtape in 2020, "D-2" showcased Suga's growth as a producer and rapper. 
                The project features a more refined and experimental sound compared to his first mixtape, with collaborations 
                with artists like MAX, NiiHWA, and fellow BTS member RM. The mixtape explores themes of fame, success, 
                and the pressures of the music industry.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Notable Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Daechwita</strong> - A groundbreaking track blending traditional Korean music with trap</li>
                  <li><strong>Strange (feat. RM)</strong> - A collaboration with BTS's leader exploring societal contradictions</li>
                  <li><strong>What Do You Think?</strong> - A fierce response to critics with powerful lyrics</li>
                  <li><strong>Burn It (feat. MAX)</strong> - An emotional track with American singer MAX</li>
                  <li><strong>People</strong> - A reflective song about society and personal growth</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/7lhFsAaVCFaYbkNvBMw5Zf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=qGjAWJ2zWWI&pp=ygUJZGFlY2h3aXRh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Daechwita MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Agust D Content */}
        {activeSoloWorks === "agust-d" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/suga-agust-d.jpg" 
                  alt="Suga - Agust D" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Agust D (2016)</h3>
              <p className="mb-4">
                Suga's debut mixtape as Agust D (his name spelled backward, with DT representing his hometown Daegu Town) 
                showcased a raw, unfiltered side of his artistry. Released in 2016, the project provided a powerful glimpse into his 
                personal struggles with depression, social anxiety, and the hardships he faced before and during his early 
                years with BTS.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Essential Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Agust D</strong> - A fierce introduction to his alter ego with aggressive delivery</li>
                  <li><strong>The Last</strong> - A raw confession about his mental health struggles and social phobia</li>
                  <li><strong>So Far Away (feat. Suran)</strong> - An emotional track about chasing dreams</li>
                  <li><strong>Tony Montana (feat. Yankie)</strong> - A reference to Scarface with powerful verses</li>
                  <li><strong>Give It To Me</strong> - A confident track showcasing his technical rap skills</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/1qHUxg0YIm6caZQrDJvDdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=3Y_Eiyg4bfk&pp=ygUHYWd1c3QgZA%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Agust D MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Production Genius Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Production Genius</h2>
        
        <p className="mb-6">
          Beyond his role as a rapper in BTS, Suga is widely recognized as a talented producer who has shaped 
          the group's sound and collaborated with various artists. His production style blends hip-hop, R&B, and 
          electronic elements with emotional melodies, creating distinctive tracks that showcase his musical versatility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <FileCode className="text-yellow-600 mr-2" size={20} />
              <h3 className="font-bold">BTS Contributions</h3>
            </div>
            <p className="mb-3">
              Suga has been instrumental in producing many of BTS's hits. His production credits include tracks from 
              throughout their discography, where he's helped craft the group's signature sound.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Co-produced "Telepathy" from BE</li>
              <li>• Produced "Seesaw" and "Trivia 轉: Seesaw"</li>
              <li>• Co-produced "Life Goes On"</li>
              <li>• Contributed to "Blood Sweat & Tears" production</li>
              <li>• Produced many of the group's hip-hop tracks</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <MusicIcon className="text-blue-600 mr-2" size={20} />
              <h3 className="font-bold">External Collaborations</h3>
            </div>
            <p className="mb-3">
              Suga has expanded his production portfolio by working with various artists outside of BTS, showcasing his 
              versatility and earning recognition as a producer in his own right.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• "Eight" with IU (2020)</li>
              <li>• "Song Request" with Lee Sora (2019)</li>
              <li>• "We Don't Talk Together" with Heize (2019)</li>
              <li>• "Blueberry Eyes" with MAX (2020)</li>
              <li>• "That That" with PSY (2022)</li>
              <li>• "Who" with Jimin ft. Loco (2023)</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Disc className="text-purple-600 mr-2" size={20} />
              <h3 className="font-bold">Production Style</h3>
            </div>
            <p className="mb-3">
              Suga's production is characterized by his attention to detail, emotional depth, and ability to blend 
              various genres while maintaining his distinctive sound signature.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Hip-hop foundations with melodic elements</li>
              <li>• Integration of traditional Korean instruments</li>
              <li>• Complex chord progressions and arrangements</li>
              <li>• Emotional storytelling through instrumentation</li>
              <li>• Strategic use of silence and dynamics</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-bold mb-2">Studio Approach</h3>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="mb-3">
              Suga approaches music production with meticulous attention to detail. He often describes spending countless 
              hours in his studio (nicknamed "Genius Lab") perfecting tracks, sometimes working through the night until 
              he achieves the exact sound he's seeking. His dedication to his craft extends to learning new production 
              techniques and continuously expanding his musical knowledge.
            </p>
            <p>
              Known for his ability to create music that resonates emotionally with listeners, Suga prioritizes authenticity 
              in his production. He believes that genuinely expressed emotions create the most powerful music, regardless 
              of technical complexity. This philosophy is evident across his work, from introspective BTS b-sides to 
              hard-hitting Agust D tracks.
            </p>
          </div>
        </div>
      </div>
      
      {/* Two-Column Section: Mental Health Journey & Lyricism */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Mental Health Journey */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Mental Health Journey</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Bookmark className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Open Discussions</h3>
                <p>
                  Suga has been remarkably candid about his struggles with depression, social anxiety, and 
                  mental health challenges. Through his music, particularly tracks like "The Last" from his first 
                  mixtape, he has addressed these topics directly, breaking stigmas and connecting with fans facing similar issues.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Physical & Mental Recovery</h3>
                <p>
                  His journey also includes recovery from physical injuries, including shoulder surgery in 2020.
                  Suga has been open about how physical pain impacted his mental health and how he approached 
                  recovery with determination and patience, documenting parts of this process in his music and vlogs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Advocacy & Impact</h3>
                <p>
                  By speaking openly about therapy, medication, and his personal mental health journey, Suga 
                  has helped normalize these conversations in K-pop and beyond. His willingness to address these 
                  topics has resonated deeply with fans worldwide and contributed to broader discussions about 
                  mental health in the entertainment industry.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lyrical Themes */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Lyrical Depth</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Social Commentary</h3>
                  <p className="mb-1">
                    Suga frequently addresses societal issues in his lyrics, questioning social norms, economic 
                    inequality, and the pressures faced by young people. Tracks like "Strange" with RM dive deep 
                    into societal contradictions and systemic problems.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Personal Narratives</h3>
                  <p className="mb-1">
                    His lyrics often draw from personal experiences, from his pre-debut struggles to his 
                    reflections on fame and success. This autobiographical approach creates authenticity 
                    and emotional resonance, allowing listeners to connect with his journey.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Wordplay & Technique</h3>
                  <p className="mb-1">
                    Known for his complex wordplay and technical skills, Suga's lyrics showcase his prowess as 
                    a rapper and writer. He employs various lyrical techniques, including double entendres, 
                    metaphors, and internal rhymes to create multi-layered verses that reward careful listening.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Healing & Hope</h3>
                  <p className="mb-1">
                    Despite addressing difficult topics, Suga's lyrics often contain messages of resilience 
                    and hope. Songs like "So Far Away" and "People" encourage listeners to persevere through 
                    hardships and find their own paths, reflecting his belief in the power of dreams and 
                    personal growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Memorable Quotes Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Quotes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Life is tough, and things don't always work out well, but we should be brave and go on with our lives."</p>
                  <p className="text-sm text-gray-600">— On perseverance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Effort makes you. You will regret someday if you don't do your best now."</p>
                  <p className="text-sm text-gray-600">— On working hard</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"If you want to love others, I think you should love yourself first."</p>
                  <p className="text-sm text-gray-600">— On self-love</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"The grammys remain my biggest dream."</p>
                  <p className="text-sm text-gray-600">— On his aspirations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Humans seem to be programmed to think of ambivalent feelings as problematic. But I think life is perpetually ambivalent."</p>
                  <p className="text-sm text-gray-600">— On accepting complexity</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I'm a little monster inside a big box looking for something to fight. Because right now, I can't even control myself."</p>
                  <p className="text-sm text-gray-600">— From "The Last"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2 text-center">Life Philosophy</h3>
            <p>
              Suga's quotes and lyrics reveal a philosophy that embraces life's complexities and contradictions. 
              He advocates for authenticity, hard work, and self-acceptance while acknowledging the struggles 
              that come with pursuing one's dreams. His perspective combines pragmatism with hope, encouraging 
              others to face reality while maintaining their ambitions and staying true to themselves.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 