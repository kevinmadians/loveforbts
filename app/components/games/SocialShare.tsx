"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Twitter, Facebook, Copy, Check, MessageCircle, Instagram, ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import { WhackAMoleScore } from "@/app/lib/supabase-whack-a-mole"
import confetti from "canvas-confetti"

interface SocialShareProps {
  score: WhackAMoleScore
  playerRank?: number
  onShare?: () => void
}

export function SocialShare({ score, playerRank, onShare }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const gameUrl = "https://loveforbts.com/games/bts-whack-a-mole"
  
  const shareText = `🎮 I just scored ${score.score} points in BTS Whack-a-Mole! 
🎯 Accuracy: ${score.accuracy}%
🔥 Best Streak: ${score.best_streak}
⭐ Level: ${score.level}
${playerRank ? `🏆 Rank: #${playerRank}` : ''}

Can you beat my score? Play now! 💜 #BTS #WhackAMole #ARMY`

  const shareTextShort = `🎮 Just scored ${score.score} points in BTS Whack-a-Mole! Can you beat me? 💜 #BTS #ARMY`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${gameUrl}`)
      setCopied(true)
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFDE00', '#9333EA', '#EC4899']
      })
      setTimeout(() => setCopied(false), 2000)
      onShare?.()
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(gameUrl)}`
    window.open(url, '_blank', 'width=550,height=420')
    onShare?.()
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=580,height=296')
    onShare?.()
  }

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTextShort}\n\n${gameUrl}`)}`
    window.open(url, '_blank')
    onShare?.()
  }

  const handleRedditShare = () => {
    const title = `Just got ${score.score} points in BTS Whack-a-Mole!`
    const url = `https://reddit.com/submit?title=${encodeURIComponent(title)}&text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(gameUrl)}`
    window.open(url, '_blank')
    onShare?.()
  }

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(gameUrl)}&text=${encodeURIComponent(shareTextShort)}`
    window.open(url, '_blank')
    onShare?.()
  }

  return (
    <div className="space-y-4">
      {/* Main Share Button */}
      <Button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg border-2 border-black shadow-lg transition-all"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share Your Score! 💜
      </Button>

      {/* Share Options */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showShareOptions ? 1 : 0, 
          height: showShareOptions ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {showShareOptions && (
          <div className="bg-white rounded-lg border-2 border-black p-4 space-y-3">
            <h4 className="font-bold text-lg text-center mb-4">
              Share with ARMY! 🌟
            </h4>
            
            {/* Score Summary */}
            <div className="bg-gradient-to-r from-yellow-50 to-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-bold text-purple-600 text-xl">{score.score}</div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600 text-xl">{score.accuracy}%</div>
                  <div className="text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Share Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Twitter */}
              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="flex items-center gap-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>

              {/* Facebook */}
              <Button
                onClick={handleFacebookShare}
                variant="outline"
                className="flex items-center gap-2 border-2 border-blue-600 text-blue-700 hover:bg-blue-50"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>

              {/* WhatsApp */}
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                className="flex items-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>

              {/* Reddit */}
              <Button
                onClick={handleRedditShare}
                variant="outline"
                className="flex items-center gap-2 border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <ExternalLink className="w-4 h-4" />
                Reddit
              </Button>

              {/* Telegram */}
              <Button
                onClick={handleTelegramShare}
                variant="outline"
                className="flex items-center gap-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram
              </Button>

              {/* Copy Link */}
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex items-center gap-2 border-2 border-gray-400 text-gray-600 hover:bg-gray-50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>

            {/* Custom Message Preview */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Preview:</h5>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {shareText}
              </p>
              <p className="text-sm text-blue-600 mt-2 font-medium">
                {gameUrl}
              </p>
            </div>

            {/* Tips */}
            <div className="text-xs text-gray-500 text-center mt-3 space-y-1">
              <p>💡 <strong>Tip:</strong> Tag your ARMY friends to challenge them!</p>
              <p>🏆 Use #BTSWhackAMole to join the community leaderboard discussion</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 
