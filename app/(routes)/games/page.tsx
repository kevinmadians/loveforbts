import Link from "next/link"
import { Heart, Gamepad2, Star, Zap, Trophy } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export default function GamesPage() {
  const games = [
    {
      id: "purple-hearts-collector",
      title: "Purple Hearts Collector",
      description: "Catch falling purple hearts and build streaks for bonus points!",
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      difficulty: "Easy",
      duration: "1 min",
      features: ["Mobile Friendly", "Streak System", "Level Progression"],
      backgroundColor: "from-purple-100 to-pink-100",
      href: "/games/purple-hearts-collector"
    },
    {
      id: "bts-whack-a-mole",
      title: "BTS Whack-a-Mole",
      description: "Classic whack-a-mole with BTS member photos! Different members give different points!",
      icon: <Gamepad2 className="w-8 h-8 text-yellow-600" />,
      difficulty: "Medium",
      duration: "1 min",
      features: ["BTS Members", "Combo System", "Rarity System"],
      backgroundColor: "from-yellow-100 to-orange-100",
      href: "/games/bts-whack-a-mole"
    }
    // More games can be added here in the future
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gamepad2 className="h-10 w-10 text-purple-600" />
          <h1 className="text-4xl font-bold black-han-sans">ARMY Games</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fun mini-games designed for BTS fans! Test your reflexes, challenge your friends, and compete for high scores.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {games.map((game) => (
          <div
            key={game.id}
            className={`bg-gradient-to-br ${game.backgroundColor} rounded-xl border-2 border-black p-6 hover:scale-105 transition-transform duration-300`}
          >
            {/* Game Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              {game.icon}
              <h2 className="text-xl font-bold black-han-sans">{game.title}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{game.description}</p>

            {/* Game Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{game.difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>{game.duration}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {game.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white px-2 py-1 rounded-full border border-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Play Button */}
            <Link href={game.href}>
              <Button className="w-full bg-black text-[#FFDE00] hover:bg-gray-800 font-bold border-2 border-black">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Now
              </Button>
            </Link>
          </div>
        ))}

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-400 p-6 flex flex-col items-center justify-center text-center">
          <Trophy className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-600 mb-2">More Games Coming Soon!</h3>
          <p className="text-sm text-gray-500">
            We're working on more exciting mini-games for ARMY. Stay tuned!
          </p>
        </div>
      </div>

      {/* Game Features Section */}
      <div className="bg-white rounded-xl border-2 border-black p-8">
        <h2 className="text-2xl font-bold black-han-sans text-center mb-6">Why ARMY Love Our Games</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">BTS Themed</h3>
            <p className="text-sm text-gray-600">
              All games feature BTS colors, themes, and references that ARMY will love
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Mobile Optimized</h3>
            <p className="text-sm text-gray-600">
              Perfect touch controls and responsive design for gaming on any device
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold mb-2">Competitive Fun</h3>
            <p className="text-sm text-gray-600">
              High scores, streaks, and achievements to challenge yourself and friends
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-gray-500">
          Have ideas for new games? Let us know what you'd like to see next! 💜
        </p>
      </div>
    </div>
  )
} 