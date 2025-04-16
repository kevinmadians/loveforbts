import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Heart, Coffee } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 pt-4 md:pt-8">
        <h1 className="text-4xl md:text-5xl black-han-sans mb-4">Support Our ARMY Community</h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/images/your-logo.png"
            alt="Love for BTS Logo"
            width={100}
            height={100}
            
          />
        </div>
        <p className="text-lg max-w-3xl mx-auto">
          Love for BTS is a fan-driven community built with 💜 by ARMY for ARMY.
          Your support helps us maintain and improve this space where we can all celebrate our love for BTS.
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-black p-6 md:p-8 mb-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <HeartHandshake size={32} className="text-purple-600" />
          <h2 className="text-2xl black-han-sans">Why We Need Your Support</h2>
        </div>

        <p className="mb-4">
          Running an active fan community comes with costs for hosting, development, and content creation. 
          Every contribution, no matter how small, helps us:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Keep the site ad-free and focused on our BTS community</li>
          <li>Add new interactive features to celebrate our love for BTS</li>
          <li>Improve site performance and user experience</li>
          <li>Host special ARMY events and digital gatherings</li>
          <li>Create more content to help connect ARMYs worldwide</li>
        </ul>

        <div className="border-t-2 border-b-2 border-gray-200 py-6 my-6">
          <div className="flex items-center gap-3 mb-4">
            <Coffee size={24} className="text-purple-600" />
            <h3 className="text-xl black-han-sans">Buy Us a Cup of Coffee</h3>
          </div>
          
          <p className="mb-6">
            If Love for BTS has brightened your day or helped you connect with fellow ARMYs, 
            consider buying our team a cup of coffee as a thank you!
          </p>

          <div className="flex justify-center">
            <a 
              href="https://ko-fi.com/lovefor_bts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                <line x1="6" y1="2" x2="6" y2="4"></line>
                <line x1="10" y1="2" x2="10" y2="4"></line>
                <line x1="14" y1="2" x2="14" y2="4"></line>
              </svg>
              Support on Ko-fi
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Heart size={24} className="text-purple-600" />
          <h3 className="text-xl black-han-sans">Other Ways to Support</h3>
        </div>

        <p className="mb-4">
          Not able to donate? No worries! You can still support our community in these ways:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Share your BTS stories and experiences on our <Link href="/army-story" className="text-purple-600 hover:underline">ARMY Story</Link> page</li>
          <li>Spread positivity by leaving messages for fellow ARMY on our <Link href="/messages" className="text-purple-600 hover:underline">Messages</Link> board</li>
          <li>Share this site with other BTS fans in your network</li>
          <li>Suggest new features or contribute ideas for the community</li>
          <li>Report bugs or issues through our <Link href="/contact" className="text-purple-600 hover:underline">Contact</Link> page</li>
        </ul>
      </div>

      <div className="text-center my-10">
        <h2 className="text-2xl black-han-sans mb-4">Thank You For Your Support!</h2>
        <p className="max-w-2xl mx-auto">
          Every contribution helps strengthen our ARMY community. 
          Together, we can create a loving space that celebrates BTS and connects fans worldwide.
        </p>
        <p className="text-xl mt-4 font-bold text-purple-600">💜 Borahae 💜</p>
      </div>
    </div>
  );
} 