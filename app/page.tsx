import { CalendarView } from "@/app/components/features/calendar"
import { DischargeDates } from "@/app/components/features/discharge-dates"
import { CommentForm } from "@/app/components/features/comment-form"
import { ReunionCountdown } from "@/app/components/features/reunion-countdown"
import { HomepageCTA } from "@/app/components/features/HomepageCTA"
import { BTSEras } from "@/app/components/features/BTSEras"
import { ARMYLove } from "@/app/components/features/ARMYLove"
import { MembersCTA } from "@/app/components/features/MembersCTA"
import { DischargeCelebrationCTA } from "@/app/components/features/DischargeCelebrationCTA"
import { MultipleTwitterEmbed } from "@/app/components/features/TwitterEmbed"
import { GamesCTA } from "@/app/components/features/GamesCTA"
import { ARMYCardMakerCTA } from "@/app/components/features/ARMYCardMakerCTA"

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-5xl px-2 py-4 md:px-4 gap-8">
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
      
      {/* Main Countdown - positioned right after discharge CTA */}
      <div id="countdown">
        <ReunionCountdown />
      </div>
      
      {/* 1. BTS Calendar */}
      <CalendarView />
      
      {/* 2. BTS Military Discharge Countdown */}
      <DischargeDates />
      
      {/* 3. Meet the members */}
      <MembersCTA />
      
      {/* 4. BTS Musical Journey */}
      <BTSEras />
      
      {/* 5. Latest from BTS */}
      <MultipleTwitterEmbed tweetIds={["1932577830501507417", "1932573960581067248","1932290930444476674", "1932259383456694754"]} />
      
      {/* 6. BTS Mini Games CTA */}
      <GamesCTA />
      
      {/* 7. Leave a message for BTS form */}
      <CommentForm />
      
      {/* 8. BTS ARMY Card Maker Generator CTA */}
      <ARMYCardMakerCTA />
      
      {/* 9. Explore ARMY Community */}
      <ARMYLove />
      
      {/* 10. Support CTA */}
      <HomepageCTA />
    </main>
  )
} 
