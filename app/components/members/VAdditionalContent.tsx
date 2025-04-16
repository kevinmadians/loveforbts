"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Music, Camera, Bookmark, Paintbrush, Shirt, Heart, Dog } from "lucide-react"

// V's additional content component that matches the site's styling
export function VAdditionalContent() {
  // State for toggling additional info sections
  const [activeSoloWorks, setActiveSoloWorks] = useState("layover")

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Solo Work Section - Tabbed Interface */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Solo Work Highlights</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          <button 
            onClick={() => setActiveSoloWorks("layover")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "layover" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Layover (2023)
          </button>
          <button 
            onClick={() => setActiveSoloWorks("winter-bear")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "winter-bear" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Winter Bear & Singles
          </button>
          <button 
            onClick={() => setActiveSoloWorks("ost")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSoloWorks === "ost" 
              ? "bg-purple-600 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            OSTs & BTS Solos
          </button>
        </div>
        
        {/* Layover Album Content */}
        {activeSoloWorks === "layover" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/v-layover.jpg" 
                  alt="V - Layover Album" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Layover (2023)</h3>
              <p className="mb-4">
                "Layover" is V's debut solo album, showcasing his unique vocal color through a collection of 
                soulful R&B tracks. Produced with Min Hee-jin (known for NewJeans), the album presents a mature, 
                sophisticated sound that highlights V's deep, velvety voice and artistic sensibilities.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Key Tracks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Slow Dancing</strong> - A dreamy, romantic track with a vintage jazz influence</li>
                  <li><strong>Rainy Days</strong> - A melancholic ballad with emotional depth</li>
                  <li><strong>Love Me Again</strong> - A soulful R&B track showcasing V's lower register</li>
                  <li><strong>Blue</strong> - A contemplative song with delicate vocals and minimal instrumentation</li>
                  <li><strong>For Us</strong> - An uplifting track that showcases his vocal versatility</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/album/7ixOAT89NSsgUITYc5ByB5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen on Spotify</span>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=eI0iTRS0Ha8&pp=ygUKbGF5b292ZXIgdg%3D%3D" 
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
        
        {/* Winter Bear & Singles Content */}
        {activeSoloWorks === "winter-bear" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/v-winter-bear.jpg" 
                  alt="V - Winter Bear" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Self-Released Singles</h3>
              <p className="mb-4">
                Before his official solo album, V released several self-composed singles that showcased his 
                unique musical style and artistic vision. These songs, often accompanied by self-directed music 
                videos, gave fans a glimpse into V's personal musical tastes and creative process.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Notable Singles:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Winter Bear (2019)</strong> - A gentle, comforting song written and composed by V in English</li>
                  <li><strong>Scenery (2019)</strong> - A self-composed ballad showcasing his deep emotional range</li>
                  <li><strong>Sweet Night (2020)</strong> - Written for the K-drama "Itaewon Class" soundtrack</li>
                  <li><strong>Snow Flower (feat. Peakboy) (2020)</strong> - A special Christmas release for fans</li>
                  <li><strong>Christmas Tree (2021)</strong> - An OST for the K-drama "Our Beloved Summer"</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://www.youtube.com/watch?v=pk7ESz6vtyA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Winter Bear MV</span>
                </a>
                <a 
                  href="https://open.spotify.com/track/3Wno87vVBVbSVS2vUUFuKC"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Listen Sweet Night</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* OSTs & BTS Solos Content */}
        {activeSoloWorks === "ost" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
                <Image 
                  src="/images/albums/v-ost.jpg" 
                  alt="V - OSTs and Solo Tracks" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">OSTs & BTS Album Solos</h3>
              <p className="mb-4">
                V has contributed his distinctive voice to several K-drama soundtracks and released powerful 
                solo tracks on BTS albums. His emotional delivery and unique vocal tone have made these songs 
                particularly memorable and showcased his ability to convey complex emotions through music.
              </p>
              <div className="mb-4">
                <h4 className="font-bold mb-1">Notable Works:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Stigma (2016)</strong> - A powerful neo-soul track from BTS's Wings album</li>
                  <li><strong>Singularity (2018)</strong> - A haunting neo-soul song exploring the concept of masks we wear</li>
                  <li><strong>Inner Child (2020)</strong> - An uplifting message to his younger self from Map of the Soul: 7</li>
                  <li><strong>It's Definitely You (with Jin) (2016)</strong> - OST for "Hwarang" drama where V also acted</li>
                  <li><strong>Christmas Tree (2021)</strong> - Became the first Korean OST to enter the Billboard Hot 100</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://open.spotify.com/track/4CW75mEldEGBIm2JXzqAPf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-black text-[#FFDE00] rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>It's Definitely You</span>
                </a>
                <a 
                  href="https://open.spotify.com/track/186NCtNk1tUYS7c2DxgJ7O" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Music className="mr-2 h-4 w-4" />
                  <span>Christmas Tree on Spotify</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Artistic Vision Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Artistic Vision & Creative Expression</h2>
        
        <p className="mb-6">
          Known for his unique perspective and creative sensibilities, V approaches art in all its forms with a 
          distinctive vision. His artistic expression extends beyond music to photography, visual arts, and fashion, 
          creating a multifaceted creative identity that has captured the imagination of fans and critics alike.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Paintbrush className="text-yellow-600 mr-2" size={20} />
              <h3 className="font-bold">Visual Art Appreciation</h3>
            </div>
            <p className="mb-3">
              V's deep appreciation for visual arts has influenced his creative work with BTS and as a soloist. 
              His love for classical and contemporary paintings has been documented through numerous gallery and 
              museum visits worldwide.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Regular visitor to art museums globally</li>
              <li>• Particularly drawn to Van Gogh and impressionist art</li>
              <li>• Has incorporated art references in BTS concepts</li>
              <li>• Often sketches and paints in his free time</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Camera className="text-blue-600 mr-2" size={20} />
              <h3 className="font-bold">Photography Skills</h3>
            </div>
            <p className="mb-3">
              V is an accomplished photographer whose work has been published in "Vante" photobooks and shared through 
              BTS's social media. His photographic style emphasizes unique angles, vibrant colors, and capturing candid, 
              authentic moments.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Uses the pseudonym "Vante" for his photography</li>
              <li>• Inspired by photographer Ante Badzim</li>
              <li>• Often photographs landscapes and BTS members</li>
              <li>• Released limited edition photobooks of his work</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Shirt className="text-purple-600 mr-2" size={20} />
              <h3 className="font-bold">Fashion Icon Status</h3>
            </div>
            <p className="mb-3">
              V has been recognized as a global fashion icon, known for his unique style that blends vintage elements with 
              contemporary designs. His fashion sensibilities have earned him recognition from major brands and fashion publications.
            </p>
            <ul className="pl-4 space-y-1 text-sm">
              <li>• Global ambassador for Celine</li>
              <li>• Featured on the cover of fashion magazines</li>
              <li>• Known for popularizing oversized silhouettes</li>
              <li>• Frequently mixes luxury pieces with vintage items</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-bold mb-2">Creative Philosophy</h3>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="mb-3">
              V approaches creativity with an emphasis on authenticity and emotional connection. For him, art in all 
              forms should evoke genuine feelings and create meaningful connections with the audience. This philosophy 
              is evident in his music, which often prioritizes emotional resonance over commercial trends.
            </p>
            <p>
              His creative process typically involves drawing from personal experiences, observations of nature, and 
              emotional introspection. Whether composing music, taking photographs, or curating his fashion style, 
              V consistently seeks to express his unique worldview and create art that reflects his distinctive 
              perspective—something he has described as seeing the world in "Taehyung-colored glasses."
            </p>
          </div>
        </div>
      </div>
      
      {/* Two-Column Section: Personality & Acting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Unique Personality */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">The Unique World of V</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Bookmark className="text-pink-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Invented Language</h3>
                <p>
                  V is known for creating his own vocabulary and expressions, affectionately called "Taetae language" by fans.
                  His unique way of communicating includes made-up words, unexpected phrases, and distinctive expressions
                  that reflect his imaginative and unconventional thinking.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-pink-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">4D Personality</h3>
                <p>
                  Often described as having a "4D personality" (Korean expression for someone unique and unpredictable),
                  V approaches life with spontaneity and refreshing authenticity. His ability to shift from deeply serious
                  to playfully silly in moments showcases his multifaceted nature.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Bookmark className="text-pink-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold">Imagination & Creativity</h3>
                <p>
                  With an imagination that knows no bounds, V brings creative energy to everything he does.
                  From creating unique dance moves to coming up with unexpected scenarios during interviews,
                  his creativity manifests in everyday moments and has become one of his most beloved traits.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Acting Career */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 black-han-sans">Acting Journey</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Hwarang: The Poet Warrior Youth (2016)</h3>
                  <p className="mb-1">
                    V made his acting debut in this historical drama as Hansung, a bright and innocent young warrior.
                    His performance showcased his natural acting ability and earned praise for his emotional scenes.
                  </p>
                  <p className="text-sm text-gray-600">• Starred alongside Park Seo-joon, who became his close friend</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Music Video Narratives</h3>
                  <p className="mb-1">
                    Within BTS's cinematic music videos, V has portrayed complex characters with emotional depth.
                    His expressive acting in videos like "Blood Sweat & Tears," "Singularity," and the HYYH series
                    has contributed significantly to BTS's visual storytelling.
                  </p>
                  <p className="text-sm text-gray-600">• Particularly praised for his performance in "Singularity"</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <h3 className="font-bold mb-1">Future Aspirations</h3>
                  <p className="mb-1">
                    V has expressed interest in further pursuing acting, with preferences for unique, complex characters
                    that challenge conventional roles. His distinctive presence and emotional range would make him
                    well-suited for both contemporary and period dramas.
                  </p>
                  <p className="text-sm text-gray-600">• Has mentioned interest in both film and television</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Yeontan (Tannie) Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Yeontan (Tannie): V's Beloved Pomeranian</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-black">
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <Dog className="h-24 w-24 text-gray-400" />
              </div>
              /* Image placeholder - will be replaced with actual image later */
              /* <Image 
                src="/images/pets/v-yeontan.jpg" 
                alt="V's dog Yeontan (Tannie)" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              /> */
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3">The Internet's Favorite Fluffy Friend</h3>
            <p className="mb-4">
              Yeontan (연탄), affectionately nicknamed "Tannie" by fans, is V's adorable black-and-tan Pomeranian who has 
              become a global celebrity in his own right. Adopted by V in 2017, Yeontan's name means "coal briquette" in 
              Korean, a playful reference to his distinctive black coloring. This tiny ball of fur has captured the hearts 
              of millions of fans worldwide, becoming arguably the most famous pet in K-pop.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-pink-50 p-4 rounded-xl">
                <h4 className="font-bold mb-1 flex items-center">
                  <Heart className="text-red-500 mr-2" size={18} />
                  Tannie's Personality
                </h4>
                <ul className="pl-4 space-y-1 text-sm">
                  <li>• Energetic, playful, and sometimes dramatic like his owner</li>
                  <li>• Known for his expressive face and distinctive "eyebrows"</li>
                  <li>• Has overcome health challenges with a resilient spirit</li>
                  <li>• Shows a strong attachment to V and other BTS members</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h4 className="font-bold mb-1 flex items-center">
                  <Heart className="text-red-500 mr-2" size={18} />
                  Famous Appearances
                </h4>
                <ul className="pl-4 space-y-1 text-sm">
                  <li>• Starred in multiple episodes of "Run BTS!" and "BTS In the SOOP"</li>
                  <li>• Made appearances in BTS's social media posts and VLives</li>
                  <li>• Featured in a cameo on "The Tonight Show Starring Jimmy Fallon"</li>
                  <li>• Has inspired fan art, merchandise, and countless social media accounts</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">The Special Connection</h4>
              <p>
                V's relationship with Yeontan showcases his nurturing and caring nature. Despite his busy schedule, 
                V has always prioritized Tannie's well-being, even bringing him to work when possible. When Yeontan faced 
                health challenges with a tracheal condition, V's dedication to his care touched fans deeply. Their bond 
                reflects V's deeply loyal and affectionate personality.
              </p>
              <p className="mt-2 text-sm italic">
                "When Tannie looks at me with those eyes, all my stress melts away. He's like my little soulmate." 
                — V on his relationship with Yeontan
              </p>
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
              <h4 className="font-bold mb-2">Yeontan's ARMY Impact</h4>
              <p>
                As a testament to his popularity, Yeontan has inspired countless fan creations, from plush toys to 
                digital art. His appearances in BTS content invariably spark joy among fans, with "Tannie" trending on 
                social media whenever he makes an appearance. This tiny Pomeranian has become a beloved mascot for ARMY, 
                bringing together fans through their shared adoration for V's fluffy companion.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Memorable Quotes Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Memorable Quotes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"I'd rather die than live without passion."</p>
                  <p className="text-sm text-gray-600">— On living authentically</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"In a world of wrong, I want to be the right."</p>
                  <p className="text-sm text-gray-600">— From "Stigma" lyrics</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Let's not push off the things we need to do today for tomorrow."</p>
                  <p className="text-sm text-gray-600">— On his life philosophy</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Even if you're not perfect, you're limited edition."</p>
                  <p className="text-sm text-gray-600">— On embracing uniqueness</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Happiness is not something that comes from somewhere far away. It's something you make yourself."</p>
                  <p className="text-sm text-gray-600">— On finding joy within</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start">
                <div>
                  <p className="italic mb-1">"Normality is a paved road. It's comfortable to walk on, but no flowers grow on it."</p>
                  <p className="text-sm text-gray-600">— On embracing uniqueness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold mb-2 text-center">Perspective on Life</h3>
            <p>
              V's quotes often reflect his philosophical nature and unique perspective on life. His words emphasize 
              authenticity, passion, and embracing one's uniqueness. Throughout his public life, he has consistently 
              encouraged fans to find beauty in themselves and the world around them, to pursue their passions 
              fearlessly, and to approach life with both deep emotion and childlike wonder.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 