'use client'

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Heart, Target, Trophy, Zap } from "lucide-react"

export function GamesCTA() {
  return (
    <section className="mx-4">
      <div className="bg-white rounded-2xl border-2 border-black p-8">
        <div className="text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-black rounded-full p-3">
              <Zap className="w-8 h-8 text-bts-accent" />
            </div>
            <h2 className="text-3xl font-bold black-han-sans">
              ARMY Mini Games
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Challenge yourself with our BTS-themed mini games! Compete with ARMY worldwide and climb the leaderboards.
          </p>

          {/* Game previews - clean cards */}
          <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-white rounded-xl p-4 border-2 border-black">
              <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Hearts Collector</p>
              <p className="text-xs text-gray-600">Catch & collect</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-black">
              <Target className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Whack-a-Mole</p>
              <p className="text-xs text-gray-600">BTS members</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/games">
            <Button className="bg-black text-bts-accent hover:bg-gray-800 font-bold px-8 py-3 rounded-xl border-2 border-black text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Heart className="w-5 h-5 mr-2" />
              Play Games Now
            </Button>
          </Link>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span>Leaderboards</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-purple-600" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-gray-600" />
              <span>Free to Play</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 