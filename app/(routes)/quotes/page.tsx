import React from "react"
import { Quote } from "lucide-react"

import { DailyQuote } from "@/app/components/features/DailyQuote"

export default function QuotesPage() {
  return (
    <main className="flex flex-col items-center w-full max-w-5xl px-4 py-8 mx-auto">
      <section className="w-full mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 black-han-sans">
          Daily BTS <span className="text-purple-600">Quotes</span>
        </h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-4">
          Find your daily inspiration with meaningful words from BTS. 
          From heartfelt lyrics to powerful speeches, their words continue to impact ARMY worldwide.
        </p>
        
        <div className="flex items-center justify-center mb-6">
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
          <Quote size={24} className="mx-3 text-[#FFDE00]" />
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
        </div>
      </section>
      
      {/* Daily Quote Component */}
      <section className="w-full max-w-3xl mx-auto">
        <DailyQuote />
      </section>
      
      {/* Additional Information */}
      <section className="w-full max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-3 black-han-sans">About BTS Quotes</h2>
        <p className="text-base mb-4">
          BTS has touched the hearts of millions through their honest and heartfelt words. 
          Whether through their lyrics, interviews, or speeches at global events like the United Nations, 
          their message of self-love, perseverance, and unity continues to resonate with ARMY.
        </p>
        <p className="text-base mb-8">
          This page features a daily rotating quote from RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook 
          that you can share with friends or save for your own inspiration.
        </p>
        
        <div className="p-4 bg-gray-50 border-2 border-black rounded-xl">
          <h3 className="font-bold mb-2">Did You Know?</h3>
          <p>
            The phrase "I purple you" originated from V during a fan meeting, 
            where he explained that purple is the last color of the rainbow, 
            symbolizing a long-lasting trust and love between BTS and ARMY.
          </p>
        </div>
      </section>
    </main>
  )
} 