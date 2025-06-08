import { BTSWhackAMole } from "@/app/components/games/BTSWhackAMole"
import Link from "next/link"
import { ArrowLeft, Gamepad2 } from "lucide-react"

export default function BTSWhackAMolePage() {
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
          <Gamepad2 className="h-8 w-8 text-yellow-600" />
          <h1 className="text-3xl font-bold black-han-sans">BTS Whack-a-Mole</h1>
        </div>
        <p className="text-gray-600">
          Classic whack-a-mole fun with your favorite BTS members! Each member has different point values and rarity levels.
        </p>
      </div>

      {/* Game Component */}
      <div className="flex justify-center">
        <BTSWhackAMole />
      </div>

      {/* Game Tips */}
      <div className="mt-8 bg-white rounded-xl border-2 border-black p-6">
        <h2 className="text-xl font-bold mb-4 black-han-sans">Pro Tips for ARMY:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-600">Member Rarity System:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• 🐰 Jungkook: Legendary (20 pts) - Rare but high value!</li>
              <li>• 🎹🦋🐯☀️ Suga, Jimin, V, J-Hope: Rare (15 pts)</li>
              <li>• 🧠🌹 RM, Jin: Common (10 pts) - More frequent</li>
              <li>• Higher levels add bonus points to all members</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-600">Gameplay Strategy:</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Watch the timer ring around each member</li>
              <li>• Build 5+ hit streaks for combo bonuses</li>
              <li>• Missing resets your streak - be accurate!</li>
              <li>• Each level increases spawn speed and points</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Member Guide */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-xl border-2 border-black p-6">
        <h3 className="text-lg font-bold mb-4 black-han-sans">Meet the Members:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center text-xl">🧠</div>
            <div className="font-semibold">RM</div>
            <div className="text-blue-600">10 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center text-xl">🌹</div>
            <div className="font-semibold">Jin</div>
            <div className="text-pink-600">10 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center text-xl">🎹</div>
            <div className="font-semibold">Suga</div>
            <div className="text-purple-600">15 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center text-xl">☀️</div>
            <div className="font-semibold">J-Hope</div>
            <div className="text-yellow-500">15 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-100 flex items-center justify-center text-xl">🦋</div>
            <div className="font-semibold">Jimin</div>
            <div className="text-orange-500">15 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center text-xl">🐯</div>
            <div className="font-semibold">V</div>
            <div className="text-green-600">15 pts</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center text-xl">🐰</div>
            <div className="font-semibold">Jungkook</div>
            <div className="text-red-600">20 pts ⭐</div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Challenge your fellow ARMY to beat your high score! 🔨💜
        </p>
      </div>
    </div>
  )
} 