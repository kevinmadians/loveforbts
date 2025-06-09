"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Sparkles, Star, Dices, Quote } from "lucide-react"

export function JiminAdditionalContent() {
  // State for toggling solo works
  const [activeSoloWorks, setActiveSoloWorks] = useState("face")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("face")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "face" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            FACE (2023)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("singles")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "singles" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Solo Singles
          </button>
          <button 
            onClick={() => setActiveSoloWorks("collabs")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "collabs" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Collaborations
          </button>
        </div>
        
        {/* FACE Album Content */}
        {activeSoloWorks === "face" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/jimin-face.jpg" 
                  alt="Jimin - FACE Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">FACE (2023)</h3>
              <p className="mb-4">
                "FACE" is Jimin's debut solo album, released on March 24, 2023, exploring his journey of self-discovery and 
                personal growth. The album delves into Jimin's experiences of facing himself during challenging times and 
                his evolution as an artist. It showcases his versatile vocal range and dance-oriented music style.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Set Me Free Pt.2</strong> - An orchestral hip-hop track with dramatic choreography</li>
                  <li><strong>Like Crazy</strong> - A dance-pop song inspired by the film of the same name</li>
                  <li><strong>Face-off</strong> - An introspective track about confronting inner struggles</li>
                  <li><strong>Interlude: Dive</strong> - A melodic interlude showing Jimin's emotional depth</li>
                  <li><strong>Alone</strong> - A vulnerable ballad highlighting his falsetto</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/4xc3Lc9yASZgEJGH7acWMB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=nOI67IDlNMQ&pp=ygUKbGlrZSBjcmF6eQ%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Watch Like Crazy MV</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Solo Singles Content */}
        {activeSoloWorks === "singles" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                  <Image 
                    src="/images/albums/jimin-promise.jpg" 
                    alt="Jimin - Promise" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-2">Promise (약속) - 2018</h3>
                <p className="mb-4">
                  "Promise" was Jimin's first solo release outside of BTS albums, a self-composed song released as a surprise 
                  gift for fans on December 31, 2018. The gentle acoustic ballad, co-written with RM, expresses Jimin's promise 
                  to love himself more and offers comfort to listeners. The track broke SoundCloud records within 24 hours of release.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://soundcloud.com/user-179929042/sets/jimin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Music className="mr-2 h-4 w-4" />
                    <span>Listen on SoundCloud</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                  <Image 
                    src="/images/albums/jimin-christmas-love.jpg" 
                    alt="Jimin - Christmas Love" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-2">Christmas Love - 2020</h3>
                <p className="mb-4">
                  Released on December 24, 2020, "Christmas Love" is Jimin's festive solo song that captures his childhood 
                  memories and love for the holiday season. The cheerful track evokes the wonder and magic of Christmas 
                  through Jimin's playful vocals and heartwarming lyrics.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://soundcloud.com/bangtan/christmas-love-by-jimin-of-bts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Music className="mr-2 h-4 w-4" />
                    <span>Listen on SoundCloud</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Collaborations Content */}
        {activeSoloWorks === "collabs" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                  <Image 
                    src="/images/albums/jimin-vibe.jpg" 
                    alt="Jimin & Taeyang - Vibe" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-2">Vibe with Taeyang - 2023</h3>
                <p className="mb-4">
                  "Vibe" is a collaboration between Jimin and BIGBANG's Taeyang released on January 13, 2023. The R&B dance 
                  track showcases both artists' smooth vocals and dance skills. This collaboration was particularly meaningful as 
                  Jimin has often cited Taeyang as one of his role models and inspirations.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://open.spotify.com/track/14XLUySagFhP9KoqOTg5ka" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-black text-bts-accent rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Music className="mr-2 h-4 w-4" />
                    <span>Listen on Spotify</span>
                  </a>
                  <a 
                    href="https://www.youtube.com/watch?v=cXCBiF67jLM" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Watch Vibe MV</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                  <Image 
                    src="/images/albums/jimin-with-you.jpg" 
                    alt="Jimin & Ha Sung-woon - With You" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-2">With You with Ha Sung-woon - 2022</h3>
                <p className="mb-4">
                  "With You" is a collaboration between Jimin and his close friend Ha Sung-woon for the Korean drama 
                  "Our Blues." Released on April 24, 2022, this emotional duet showcases the pair's vocal chemistry
                  and became a chart success both in Korea and internationally.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://open.spotify.com/track/2gzhQaCTeNgxpeB2TPllyY" 
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
          </div>
        )}
      </div>
      
      {/* Dancing Expertise Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Dance Mastery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <Sparkles className="text-blue-500 mr-2" size={20} /> Contemporary & Modern Dance
            </h3>
            <p className="mb-4">
              Jimin's formal background in contemporary dance gives him a distinctive style within BTS. His training at 
              Busan Arts High School as a top student in modern dance built the foundation for his fluid movements, 
              expressive lines, and emotional range in performance.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Signature Elements:</h4>
              <ul className="space-y-1">
                <li>• Elegant extensions and seamless transitions</li>
                <li>• Precise control over isolations and body waves</li>
                <li>• Emotional expressiveness through movement</li>
                <li>• Integration of ballet techniques with modern dance</li>
                <li>• Graceful spins and delicate footwork</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <Star className="text-yellow-500 mr-2" size={20} /> Iconic Performances
            </h3>
            <p className="mb-4">
              Throughout his career, Jimin has delivered numerous standout dance performances that showcase his 
              technical prowess and artistic expression, becoming defining moments in BTS's choreography history.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Notable Performances:</h4>
              <ul className="space-y-1">
                <li>• "Lie" Solo Stage - Theatrical contemporary with a dramatic narrative</li>
                <li>• "Filter" - Showcasing versatility through multiple style changes</li>
                <li>• "Black Swan" - Ballet-inspired movements with flowing sleeves</li>
                <li>• "Serendipity" - Delicate, fluid choreography with cosmic imagery</li>
                <li>• MAMA 2016 Solo - Contemporary dance with water effects</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold mb-3">Dance Influence & Style</h3>
          <p className="mb-4">
            What makes Jimin's dancing particularly captivating is his ability to maintain technical precision while 
            infusing movements with raw emotion. His dance style perfectly embodies the Korean concept of "lines" 
            (선; seon) - the aesthetic beauty created through the body's contours during movement. Jimin's control 
            over these lines creates visual poetry in motion.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p>
              Jimin's influence extends beyond BTS to the broader K-pop industry, where his combination of contemporary 
              technique with hip-hop and K-pop choreography has inspired a generation of dancers. His perfectionism is 
              well-known, often practicing until early morning hours to refine every detail of a performance.
            </p>
          </div>
        </div>
      </div>
      
      {/* Personality & Duality Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Personality & Duality</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2 flex items-center">
                <Dices className="text-yellow-600 mr-2" size={20} /> The Mochi Persona
              </h3>
              <p>
                Fans affectionately call Jimin "Mochi" for his soft, squishy cheeks and sweet personality. On camera, 
                he often displays aegyo (cute behavior), playfulness, and a bright energy that lights up any room. His 
                infectious laugh and affectionate nature toward members have made him known as one of the most emotionally 
                expressive and openly loving members of BTS.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Caring Nature</h3>
              <p>
                Jimin is often described by fellow members as the most attentive and considerate person in the group. 
                He remembers small details about people, checks on others' wellbeing, and prioritizes harmony within 
                the team. This nurturing quality extends to his relationship with ARMY, where he consistently expresses 
                gratitude and concern for fans' health and happiness.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">The Perfectionist</h3>
              <p>
                Behind his warm exterior lies an intense perfectionist with extremely high standards for himself. 
                Jimin has been open about his struggles with self-criticism and the pressure he puts on himself to 
                deliver flawless performances. This drive for excellence sometimes led to exhaustion during the 
                group's earlier years, highlighting the contrast between his soft appearance and iron will.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Stage Transformation</h3>
              <p>
                Perhaps the most striking aspect of Jimin's duality is the transformation he undergoes on stage. 
                The sweet, giggly "mochi" becomes a powerful, charismatic performer with intense gaze and sensual 
                movements. This duality between his off-stage softness and on-stage charisma creates a fascinating 
                contrast that captivates audiences worldwide.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-center">Personal Growth Journey</h3>
            <p>
              Throughout BTS's career, Jimin has shown remarkable personal growth in building self-confidence and 
              finding balance. In early interviews, he often expressed insecurities about his abilities and appearance. 
              Over time, through the support of members and fans, he has developed greater self-acceptance while 
              maintaining the humility and work ethic that define him. This evolution of self-love while preserving his 
              core qualities demonstrates the emotional maturity that complements his artistic growth.
            </p>
          </div>
        </div>
      </div>
      
      {/* Memorable Quotes Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans flex items-center">
          <Quote className="mr-2 text-purple-600" size={24} /> Memorable Quotes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I believe in you, so I hope you believe in yourself, too."</p>
                  <p className="text-sm text-gray-600">— On self-confidence</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Even when this rain stops, when clouds go away, I stand here, you can find me."</p>
                  <p className="text-sm text-gray-600">— From "Serendipity"</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"We're very different people, but in a good way. We're seven different people with different tastes, but we share one thing: we love music. And we love what we do."</p>
                  <p className="text-sm text-gray-600">— On BTS's bond</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"You never know how strong you are until being strong is the only choice you have."</p>
                  <p className="text-sm text-gray-600">— On resilience</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"What's done is done. Nobody can change the past, so I'm trying hard to live in the present. Because I'm sure that this moment right now will become the past too someday."</p>
                  <p className="text-sm text-gray-600">— On living in the present</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I promise myself that I have to be a better person, a better man, a better idol."</p>
                  <p className="text-sm text-gray-600">— On constant improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
