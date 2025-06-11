import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BTS Whack-a-Mole Game | Free Online BTS Member Game for ARMY",
  description: "Play the ultimate BTS Whack-a-Mole game! Tap BTS members for points - Jungkook (20pts), Suga, Jimin, V, J-Hope (15pts), RM, Jin (10pts). Free browser game with leaderboards for ARMY.",
  keywords: [
    "BTS Whack-a-Mole", "BTS member game", "free BTS games", "BTS arcade game",
    "Jungkook game", "Suga game", "Jimin game", "V game", "J-Hope game", "RM game", "Jin game",
    "BTS clicking game", "ARMY games", "BTS reaction game", "K-pop whack a mole",
    "BTS browser game", "mobile BTS game", "BTS leaderboard game", "free online BTS game",
    "Bangtan Whack-a-Mole", "BTS arcade style game", "Korean pop games"
  ],
  openGraph: {
    title: "BTS Whack-a-Mole | Play with All 7 Members",
    description: "Classic whack-a-mole with BTS twist! Each member has different points - can you catch legendary Jungkook? Compete on ARMY leaderboards.",
    type: "website",
    url: "https://loveforbts.com/games/bts-whack-a-mole",
    siteName: "Love for BTS",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTS Whack-a-Mole Game | All 7 Members",
    description: "Play BTS Whack-a-Mole! Tap RM, Jin, Suga, J-Hope, Jimin, V, Jungkook for points. Free game with ARMY leaderboards.",
  },
  alternates: {
    canonical: "https://loveforbts.com/games/bts-whack-a-mole",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} 