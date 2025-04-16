import Image from "next/image"
import Link from "next/link"

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
      
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Image
              src="/butter-album.png"
              alt="BTS ARMY Community"
              width={400}
              height={400}
              className="rounded-md border-2 border-black"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 black-han-sans">Love for BTS Community</h2>
            <p className="mb-4">
              Welcome to our fan community dedicated to BTS! This website was created by ARMY for ARMY, bringing together fans from around the world to celebrate our love for the seven incredible artists who have touched so many lives.
            </p>
            <p>
              Our community aims to provide an inclusive, supportive space where fans can connect, share messages, stay updated on important dates, and countdown to exciting BTS events together.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-purple-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-2xl mr-2">📆</span> Interactive Calendar
            </h3>
            <p>Track important BTS dates including birthdays, comeback dates, and the much-anticipated reunion after military service.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-2xl mr-2">💜</span> Reunion Countdown
            </h3>
            <p>A real-time countdown to when all BTS members will be together again after completing their military service.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-2xl mr-2">💬</span> Global Message Wall
            </h3>
            <p>Share your love and support for BTS with fellow ARMY from countries all around the world.</p>
          </div>
          
          <div className="border-2 border-purple-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-2xl mr-2">🪖</span> Military Service Tracker
            </h3>
            <p>Follow the progress of each member's military service with visual countdown timers.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-black p-6">
        <h2 className="text-2xl font-bold mb-4 black-han-sans">Connect With Us</h2>
        <p className="mb-4">
          This website is maintained by dedicated ARMY volunteers. We're constantly working to improve the site and add new features to better serve our community.
        </p>
        <p className="mb-4">
          Have suggestions or want to contribute? Add your message to our community wall, and we'll do our best to incorporate your feedback!
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link 
            href="/members" 
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Meet BTS Members
          </Link>
          <Link 
            href="/messages" 
            className="inline-flex items-center bg-black hover:bg-gray-800 text-[#FFDE00] font-medium py-2 px-4 rounded-md transition-colors"
          >
            See Community Messages
          </Link>
        </div>
      </div>
    </div>
  )
} 