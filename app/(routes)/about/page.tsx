import Image from "next/image"
import Link from "next/link"
import { HeartHandshake, Users, MessageCircle, Heart, Music, Book, BadgeCheck, CircleUser, Calendar } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* About header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="relative w-48 h-48 mb-6">
          <Image
            src="/images/logo.png"
            alt="Love for BTS Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold black-han-sans mb-2">About Love for BTS</h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          A community created by ARMY, for ARMY - celebrating our love for BTS and connecting fans around the world.
        </p>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 black-han-sans">Our Community</h2>
        <p className="mb-4">
          Love for BTS was born from a passion to create a welcoming space where ARMY from all backgrounds and countries can come together to celebrate BTS. We believe in fostering connections through shared experiences, stories, and the special bond we all have with these seven remarkable artists.
        </p>
        <p className="mb-4">
          As fans ourselves, we understand the profound impact BTS has had on millions of lives worldwide - through their music, messages, and authentic connection with ARMY. This platform aims to capture that spirit and provide a positive environment where fans can express their appreciation, share their journeys, and connect with other like-minded individuals.
        </p>
        <p>
          Whether you became an ARMY yesterday or have been here since debut, this space is for you.
        </p>
      </div>

      {/* Community Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 black-han-sans text-center">Community Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-xl border-2 border-black p-5 text-center hover:shadow-md transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BadgeCheck className="w-8 h-8 text-purple-700" />
            </div>
            <h3 className="font-bold text-lg mb-2">Positivity</h3>
            <p className="text-sm text-gray-700">Maintaining a supportive and positive environment for all ARMY to share their love for BTS.</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl border-2 border-black p-5 text-center hover:shadow-md transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="font-bold text-lg mb-2">Inclusivity</h3>
            <p className="text-sm text-gray-700">Embracing ARMY from all cultures, backgrounds, and experiences in our global community.</p>
          </div>
          
          <div className="bg-[#fff9d9] rounded-xl border-2 border-black p-5 text-center hover:shadow-md transition">
            <div className="bg-[#FFDE00] w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-lg mb-2">Authenticity</h3>
            <p className="text-sm text-gray-700">Encouraging genuine expression and honoring the real connections between ARMY and BTS.</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 black-han-sans text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <CircleUser className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Member Profiles</h3>
              <p className="text-sm text-gray-700">Detailed profiles of all seven BTS members, featuring their journeys, talents, and notable achievements.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Discography</h3>
              <p className="text-sm text-gray-700">Explore BTS's extensive music catalog, from their debut to their latest releases, with album information and streaming options.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">BTS Timeline</h3>
              <p className="text-sm text-gray-700">An interactive history of BTS's journey, highlighting key moments, milestones, and achievements throughout their career.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">ARMY Stories</h3>
              <p className="text-sm text-gray-700">A platform for ARMY to share their personal stories about how BTS has impacted their lives and connected them with other fans.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">ARMY Message Board</h3>
              <p className="text-sm text-gray-700">Share your thoughts, messages, and support for BTS, connecting with other ARMY around the world.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-black p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-[#FFDE00] p-3 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Interactive Features</h3>
              <p className="text-sm text-gray-700">Fun and engaging content including personalized ARMY cards, quizzes, daily quotes, and more to celebrate your BTS journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-gradient-to-r from-purple-100 to-[#fff9d9] rounded-2xl border-2 border-black p-6 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-3 black-han-sans">Support Our Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Love for BTS is maintained by passionate ARMY volunteers. Your support helps us keep this space running and allows us to create more content and features for our community.
        </p>
        <Link href="/support" className="inline-flex items-center px-8 py-3 bg-black text-[#FFDE00] rounded-lg font-bold hover:bg-gray-800 transition">
          <HeartHandshake className="mr-2 h-5 w-5" />
          Support Us
        </Link>
      </div>

      {/* Connect section */}
      <div className="bg-white rounded-2xl border-2 border-black p-6">
        <h2 className="text-2xl font-bold mb-6 black-han-sans text-center">Connect With Us</h2>
        <p className="text-center mb-6">
          Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us through our contact form or connect with us on social media.
        </p>
        <div className="flex justify-center">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
} 