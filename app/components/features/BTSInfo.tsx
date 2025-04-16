"use client"

import Image from "next/image"

export function BTSInfo() {
  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">About BTS</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 relative aspect-square sm:aspect-auto h-auto min-h-[350px] md:h-auto">
          <Image 
            src="/images/bts-group.jpg" 
            alt="BTS Group" 
            className="rounded-xl object-contain sm:object-cover border-2 border-black"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        
        <div className="md:w-2/3">
          <p className="mb-4">
            BTS (방탄소년단), also known as the Bangtan Boys, is a South Korean boy band formed in 2010 and debuting in 2013 under Big Hit Entertainment. The septet—consisting of members Jin, Suga, J-Hope, RM, Jimin, V, and Jungkook—co-writes and co-produces much of their own material.
          </p>
          
          <p className="mb-4">
            Originally a hip hop group, their musical style has evolved to incorporate a wide range of genres. Their lyrics often focus on personal and social commentary, addressing themes like mental health, the journey towards self-love, individualism, and the troubles of school-age youth and coming-of-age.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-100 p-4 rounded-xl border-2 border-black">
              <h3 className="font-bold mb-2">Formation</h3>
              <p className="text-sm">Formed in 2010, debuted on June 13, 2013, with the single "No More Dream" from their first album "2 Cool 4 Skool"</p>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-xl border-2 border-black">
              <h3 className="font-bold mb-2">Fandom Name</h3>
              <p className="text-sm">ARMY (Adorable Representative M.C. for Youth) was established on July 9, 2013</p>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-xl border-2 border-black">
              <h3 className="font-bold mb-2">Global Impact</h3>
              <p className="text-sm">First Korean act to receive a Grammy nomination, top the US Billboard 200, and reach #1 on the Billboard Hot 100</p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-xl border-2 border-black">
              <h3 className="font-bold mb-2">Cultural Significance</h3>
              <p className="text-sm">Addressed the United Nations General Assembly, met with US President Biden to discuss anti-Asian hate crimes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 