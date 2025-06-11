import Link from 'next/link'
import { CreditCard, Star, Sparkles } from 'lucide-react'

export function ARMYCardMakerCTA() {
  return (
    <section className="bg-white border-2 border-black rounded-2xl p-6 md:p-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CreditCard className="w-8 h-8 text-black" />
          <h2 className="text-2xl md:text-3xl font-bold black-han-sans">
            Create Your ARMY Card
          </h2>
          <Star className="w-6 h-6 text-yellow-500" />
        </div>
        
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Design your personalized ARMY identification card! Choose your bias, add your photo, 
          customize colors, and create a unique card to show your love for BTS.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold">Choose Your Bias</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold">Add Your Photo</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold">Customize Design</span>
          </div>
        </div>
        
        <Link 
          href="/army-card"
          className="inline-flex items-center gap-2 bg-black text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <CreditCard className="w-6 h-6" />
          Create My ARMY Card
          💜
        </Link>
      </div>
    </section>
  )
} 