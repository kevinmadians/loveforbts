import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BTS Members",
  description: "Meet the seven incredible talents that make up BTS. Learn about RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook - their talents, personalities and achievements.",
  keywords: [
    "BTS", "ARMY", "K-pop", "Love for BTS", 
    "BTS fan community", "BTS ARMY",
    "Bangtan Sonyeondan", "방탄소년단", 
    "BTS fan site", "Loveforbts",
    "BTS members", "BTS profiles", "RM profile", 
    "Jin profile", "Suga profile", "J-Hope profile", 
    "Jimin profile", "V profile", "Jungkook profile",
    "Bangtan members", "BTS member facts", "BTS bios"
  ],
  alternates: {
    canonical: "https://loveforbts.com/members",
  },
  openGraph: {
    title: "BTS Members - Love for BTS",
    description: "Meet the seven incredible talents that make up BTS. Learn about RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook - their talents, personalities and achievements.",
    url: "https://loveforbts.com/members",
    images: [
      {
        url: "/images/your-logo.png",
        width: 200,
        height: 200,
        alt: "Love for BTS Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTS Members - Love for BTS",
    description: "Meet the seven incredible talents that make up BTS. Learn about RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook - their talents, personalities and achievements.",
    images: ["/images/your-logo.png"],
  }
} 