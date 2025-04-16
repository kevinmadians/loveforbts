"use client"

import { Instagram, ExternalLink } from "lucide-react"

export function OfficialAccounts() {
  const officialAccounts = [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/bts.bighitofficial/",
      icon: <Instagram size={24} />,
      color: "bg-purple-100 hover:bg-purple-200"
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@bts_official_bighit",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      color: "bg-black text-white hover:bg-gray-800"
    },
    {
      platform: "Weverse",
      url: "https://weverse.io/bts",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm2.259 13.532l-1.512-1.512a.844.844 0 0 0-1.193 0l-1.512 1.512a.844.844 0 0 1-1.193-1.193l3.107-3.107a.844.844 0 0 1 1.193 0l3.107 3.107a.844.844 0 0 1-1.193 1.193h.001zm.597-5.683H9.144a.844.844 0 0 1 0-1.688h5.712a.844.844 0 0 1 0 1.688z" />
        </svg>
      ),
      color: "bg-green-100 hover:bg-green-200"
    },
    {
      platform: "X",
      url: "https://x.com/BTS_twt",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-blue-100 hover:bg-blue-200"
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@BTS",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: "bg-red-100 hover:bg-red-200"
    }
  ]

  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">Official BTS Accounts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {officialAccounts.map((account) => (
          <a
            key={account.platform}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-4 rounded-xl border-2 border-black transition-transform hover:scale-[1.02] ${account.color}`}
          >
            <div className="mr-3">
              {account.icon}
            </div>
            <div>
              <h3 className="font-bold">{account.platform}</h3>
              <p className="text-xs text-gray-600 truncate">Official BTS Account</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
} 