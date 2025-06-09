import { PurpleHeartsCollector } from "@/app/components/games/PurpleHeartsCollector"
import Link from "next/link"
import { ArrowLeft, Gamepad2 } from "lucide-react"

export default function PurpleHeartsCollectorPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/games" 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Games
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold black-han-sans">Purple Hearts Collector</h1>
        </div>
        <p className="text-gray-600">
          A fun mini-game for ARMY! Catch falling purple hearts and build your streak for bonus points.
        </p>
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
