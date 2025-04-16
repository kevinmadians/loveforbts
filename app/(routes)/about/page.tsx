import Image from "next/image"
import Link from "next/link"
import { HeartHandshake, Users, MessageCircle, Heart, Music, Book, BadgeCheck, CircleUser, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the Love for BTS community - a fan site dedicated to BTS and connecting ARMY from around the world. Created with love by fans, for fans.",
  keywords: ["BTS fan community", "ARMY community", "BTS fan site", "BTS ARMY", "BTS fan hub", "Love for BTS community"],
  alternates: {
    canonical: 'https://loveforbts.com/about',
  },
  openGraph: {
    title: "About Us - Love for BTS",
    description: "Learn about the Love for BTS community - a fan site dedicated to BTS and connecting ARMY from around the world. Created with love by fans, for fans.",
    url: 'https://loveforbts.com/about',
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Love for BTS - BTS Fan Hub for ARMY",
      }
    ],
  }
}

export default function AboutPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          About Us
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Learn about our fan site dedicated to BTS and connecting ARMY from around the world.
          Created with love by fans, for fans.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/images/your-logo.png"
              alt="Love for BTS Logo"
              width={200}
              height={200}
              
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Love for BTS Community</h2>
            <p className="mb-4">
              Welcome to our fan community dedicated to BTS! This website was created by ARMY for ARMY, bringing together fans from around the world to celebrate our love for the seven incredible artists who have touched so many lives with their music, message, and genuine personalities.
            </p>
            <p className="mb-4">
              Our community aims to provide an inclusive, supportive space where fans can connect, share stories, exchange messages, stay updated on important dates, and countdown to exciting BTS events together. We believe in the power of community and the special bond that unites ARMYs worldwide.
            </p>
            <p>
              Whether you've been an ARMY since debut or just recently discovered BTS, our doors are always open. This is a place to celebrate your journey as a fan and connect with others who understand what it means to love BTS.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <Users className="mr-2 text-purple-600" size={20} /> Member Profiles
            </h3>
            <p>Comprehensive profiles for all BTS members with personality traits, achievements, fun facts, and career highlights for both new and longtime fans.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <Calendar className="mr-2 text-purple-600" size={20} /> Reunion Countdown
            </h3>
            <p>A real-time countdown to when all BTS members will be together again after completing their military service, helping us all look forward to their return.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <MessageCircle className="mr-2 text-purple-600" size={20} /> Global Message Wall
            </h3>
            <p>Share your love and support for BTS with fellow ARMY from countries all around the world, creating a global conversation of appreciation.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <Book className="mr-2 text-purple-600" size={20} /> ARMY Stories
            </h3>
            <p>Share your personal journey as an ARMY and read heartwarming stories from other fans about how BTS has impacted their lives.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <BadgeCheck className="mr-2 text-purple-600" size={20} /> ARMY Card Generator
            </h3>
            <p>Create your personalized ARMY membership card featuring your name, bias, and the year you became a fan. Download and share with pride!</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg hover:shadow-md transition-all">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <Music className="mr-2 text-purple-600" size={20} /> Discography
            </h3>
            <p>Explore BTS's extensive discography with information about albums, tracks, and links to stream their incredible music catalog.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Our Community Values</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Heart className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Respect & Positivity</h3>
              <p>We foster a welcoming environment where all ARMYs can express their love for BTS respectfully. Positivity is at the core of our community.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <CircleUser className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Inclusivity</h3>
              <p>We celebrate the diversity of the global ARMY community. Fans of all backgrounds, ages, and experiences are welcome here.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <MessageCircle className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Connection</h3>
              <p>We believe in the power of connection between fans. BTS has brought us together, and we aim to strengthen those bonds.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl border-2 border-black p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white p-4 rounded-full border-2 border-black shadow-md">
            <HeartHandshake size={48} className="text-purple-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 black-han-sans">Support Our Community</h2>
            <p className="mb-4">
              Love for BTS is run by dedicated ARMYs who volunteer their time and resources to maintain this space. Your support helps us keep this community thriving and develop new features for everyone to enjoy.
            </p>
            <Link 
              href="/support" 
              className="inline-flex items-center bg-[#FFDE00] text-black py-2 px-6 rounded-lg border-2 border-black hover:bg-yellow-400 transition-colors font-bold"
            >
              Support Us 💜
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Connect With Us</h2>
        <p className="mb-4">
          This website is maintained by dedicated ARMY volunteers who are passionate about creating a positive space for the fandom. We're constantly working to improve the site and add new features to better serve our community.
        </p>
        <p className="mb-6">
          Have suggestions or want to contribute? Add your message to our community wall or share your ARMY story. We value your input and are committed to making this space the best it can be for all fans!
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link 
            href="/members" 
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <Users size={18} className="mr-2" />
            Meet BTS Members
          </Link>
          <Link 
            href="/messages" 
            className="inline-flex items-center bg-black hover:bg-gray-800 text-[#FFDE00] font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <MessageCircle size={18} className="mr-2" />
            See Community Messages
          </Link>
          <Link 
            href="/army-story" 
            className="inline-flex items-center bg-[#FFDE00] hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-colors border-2 border-black"
          >
            <Book size={18} className="mr-2" />
            Read ARMY Stories
          </Link>
        </div>
      </div>
    </div>
  )
} 