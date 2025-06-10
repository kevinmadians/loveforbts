import { CalendarView } from "@/app/components/features/calendar"
import { DischargeDates } from "@/app/components/features/discharge-dates"
import { CommentForm } from "@/app/components/features/comment-form"
import { ReunionCountdown } from "@/app/components/features/reunion-countdown"
import { HomepageCTA } from "@/app/components/features/HomepageCTA"
import { BTSEras } from "@/app/components/features/BTSEras"
import { ARMYLove } from "@/app/components/features/ARMYLove"
import { MembersCTA } from "@/app/components/features/MembersCTA"
import { DischargeCelebrationCTA } from "@/app/components/features/DischargeCelebrationCTA"
import { TwitterEmbed } from "@/app/components/features/TwitterEmbed"

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-5xl px-2 py-4 md:px-4 gap-8">
      {/* ARMY Love particle effects and button */}
      <ARMYLove />
      
      {/* Welcome and Hero Section */}
      <section className="mb-2 md:mb-4 pt-0 mt-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 text-center black-han-sans">
          Welcome to <span className="text-purple-600">Love for BTS</span>
        </h1>
        <p className="text-lg text-center mb-4 md:mb-8 max-w-3xl mx-auto">
          A fan community celebrating our seven favorite stars and connecting ARMY from around the world as we await their return.
        </p>
      </section>
      
      {/* Discharge Celebration CTA - only shows when it's a discharge day */}
      <DischargeCelebrationCTA />
      
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
      
      {/* Latest BTS Tweet */}
      <TwitterEmbed tweetId="1932290930444476674" />
      
      <DischargeDates />
      
      {/* Comment Form */}
      <CommentForm />
      
      {/* CTA Section moved to bottom */}
      <HomepageCTA />
    </main>
  )
} 
