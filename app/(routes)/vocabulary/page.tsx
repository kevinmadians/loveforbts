import React from "react"
import Link from "next/link"
import { Book, MessageCircle, IdCard } from "lucide-react"
import { VocabularyGuide } from "@/app/components/features/VocabularyGuide"
import { CTAContainer } from "@/app/components/ui/cta-container"
import { PageCTA } from "@/app/components/ui/page-cta"

export default function VocabularyPage() {
  return (
    <main className="flex flex-col items-center w-full max-w-6xl px-4 py-8 mx-auto">
      <section className="w-full mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 black-han-sans">
          ARMY <span className="text-purple-600">Vocabulary Guide</span>
        </h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-4">
          Confused by ARMY slang or BTS inside jokes? This guide explains common terms, 
          memes, and phrases used by the BTS fandom with sources and origins to help new fans join the conversation.
        </p>
        
        <div className="flex items-center justify-center mb-6">
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
          <span className="mx-3 text-bts-accent text-2xl">💜</span>
          <div className="h-0.5 bg-gray-200 flex-grow max-w-xs"></div>
        </div>
      </section>
      
      {/* Main Vocabulary Component */}
      <section className="w-full bg-white border-2 border-black rounded-2xl p-4 md:p-6 mb-12">
        <VocabularyGuide />
      </section>
      
      {/* Information for New Fans */}
      <section className="w-full mb-12">
        <div className="bg-purple-50 border-2 border-black rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 black-han-sans text-center">For New ARMYs</h2>
          <p className="mb-4">
            Welcome to the BTS fandom! As you dive deeper into the BTS universe, you'll encounter various terms, 
            inside jokes, and references that might seem confusing at first. This vocabulary guide is designed to 
            help you understand the language of ARMY so you can fully enjoy being part of this amazing community.
          </p>
          <p className="mb-4">
            The BTS fandom has developed its own unique vocabulary over the years, with some terms 
            originating from the members themselves and others created by fans. From nicknames like 
            "Worldwide Handsome" to concepts like "I purple you," these expressions are part of what 
            makes the ARMY experience special.
          </p>
          <p>
            We've included the source or origin of each term where possible, so you can learn more about 
            the context and history behind ARMY vocabulary. Don't worry about memorizing everything at once! 
            Bookmark this page and refer back whenever you encounter an unfamiliar term.
          </p>
        </div>
      </section>
      
      {/* Cross-promotion CTAs */}
      <CTAContainer title="Explore More" className="mt-12 border-t-2 border-gray-100 pt-12 mb-12">
        <PageCTA
          title="Create Your ARMY Card"
          description="Generate a personalized ARMY membership card to show your love for BTS."
          href="/army-card"
          icon={IdCard}
          color="yellow"
        />
        
        <PageCTA
          title="Share Your ARMY Story"
          description="Tell your journey with BTS and connect with fellow fans through heartfelt stories."
          href="/army-story"
          icon={Book}
          color="purple"
        />
        
        <PageCTA
          title="Message Board"
          description="Share your thoughts and read messages from ARMY around the world."
          href="/messages"
          icon={MessageCircle}
          color="green"
        />
      </CTAContainer>
      
      {/* Did You Know Section */}
      <section className="w-full max-w-3xl mx-auto mb-12 text-center">
        <div className="p-6 bg-[#fff9cc] border-2 border-black rounded-xl">
          <h3 className="font-bold mb-2 text-xl black-han-sans">Did You Know?</h3>
          <p className="mb-2">
            The word "ARMY" stands for "Adorable Representative M.C. for Youth" and was chosen because an 
            army is always with a bulletproof vest (BTS), symbolizing the protective relationship between 
            the group and their fans.
          </p>
          <p>
            This name was officially announced on July 9, 2013, which is now celebrated as ARMY Day!
          </p>
        </div>
      </section>
    </main>
  )
} 
