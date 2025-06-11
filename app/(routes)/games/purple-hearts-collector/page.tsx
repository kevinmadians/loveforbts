import { PurpleHeartsCollector } from "@/app/components/games/PurpleHeartsCollector"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

export default function PurpleHeartsCollectorPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-center gap-4 mb-4">
          <Link 
            href="/games" 
            className="inline-flex items-center bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium px-4 py-2 rounded-full transition-colors border-2 border-purple-300 hover:border-purple-400"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Link>
          <Link 
            href="/games/purple-hearts-collector/leaderboard" 
            className="inline-flex items-center bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium px-4 py-2 rounded-full transition-colors border-2 border-yellow-300 hover:border-yellow-400"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Link>
        </div>
        
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold black-han-sans mb-3">Purple Hearts Collector</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            A fun mini-game for ARMY! Catch falling purple hearts and build your streak for bonus points.
          </p>
        </div>
      </div>

      {/* Game Component */}
      <div className="flex justify-center">
        <PurpleHeartsCollector />
      </div>

      {/* Game Tips */}
      <div className="mt-8 bg-white rounded-xl border-2 border-black p-6">
        <h2 className="text-xl font-bold mb-4 black-han-sans">Pro Tips for ARMY:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-600">Scoring Strategy:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Focus on purple hearts for consistent points</li>
              <li>• Gold hearts give the highest bonus</li>
              <li>• Build streaks for multiplier bonuses</li>
              <li>• Higher levels = faster hearts = more points</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-600">Gameplay Tips:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Tap quickly but accurately</li>
              <li>• Watch for heart spawn patterns</li>
              <li>• Use pause feature to take breaks</li>
              <li>• Play multiple rounds to improve</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Share your high scores with fellow ARMY! 💜
        </p>
      </div>
    </div>
  )
} 
