import { CalendarView } from "@/app/components/features/calendar"
import { DischargeDates } from "@/app/components/features/discharge-dates"
import { CommentForm } from "@/app/components/features/comment-form"
import { ReunionCountdown } from "@/app/components/features/reunion-countdown"
import { HomepageCTA } from "@/app/components/features/HomepageCTA"
import { BTSEras } from "@/app/components/features/BTSEras"
import { ARMYLove } from "@/app/components/features/ARMYLove"
import { MembersCTA } from "@/app/components/features/MembersCTA"
import { GamesCTA } from '@/app/components/features/GamesCTA'
import PlaylistCTA from '@/app/components/features/playlist-cta'
import { LeaveMessageForm } from '@/app/components/features/message-form'

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <main className="flex flex-col w-full max-w-5xl mx-auto px-4 py-4 md:px-6 gap-8">
        {/* ARMY Love particle effects and button */}
        <ARMYLove />
        
        {/* Welcome and Hero Section */}
        <section className="mb-2 md:mb-4 pt-0 mt-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 text-center black-han-sans">
            Welcome to
            <span className="hidden md:inline"> </span>
            <br className="md:hidden" />
            <span className="text-purple-600">Love for BTS</span>
          </h1>
          <p className="text-lg text-center mb-4 md:mb-8 max-w-3xl mx-auto">
            A fan community celebrating our seven favorite stars and connecting ARMY from around the world as we await their return.
          </p>
        </section>
        
        {/* Countdown section with ID for direct navigation */}
        <div id="countdown">
          <ReunionCountdown />
        </div>
        
        {/* Members CTA Section */}
        <MembersCTA />
        
        {/* BTS Eras Section */}
        <BTSEras />
        
        {/* Calendar and Trackers */}
        <CalendarView />
        <DischargeDates />
        
        {/* Comment Form */}
        <CommentForm />
        
        {/* CTA Section moved to bottom */}
        <HomepageCTA />
        
        <GamesCTA />
        <PlaylistCTA />
        <LeaveMessageForm />
      </main>
    </div>
  )
} 
