"use client"

import { WhackAMoleLeaderboard } from "@/app/components/games/WhackAMoleLeaderboard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export default function WhackAMoleLeaderboardPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Back to Game Button */}
      <div className="mb-6">
        <Link href="/games/bts-whack-a-mole">
          <Button 
            variant="outline" 
            className="border-2 border-black hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </Link>
      </div>

      {/* Leaderboard Component */}
      <WhackAMoleLeaderboard 
        showBackButton={false}
      />
      
      {/* Additional Game Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Want to improve your ranking? Practice makes perfect!
        </p>
        <Link href="/games/bts-whack-a-mole">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
          >
            Play BTS Whack-a-Mole
          </Button>
        </Link>
      </div>
    </div>
  )
} 