import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily BTS Quotes | Love for BTS",
  description: "Get inspired daily with quotes from BTS members' lyrics, interviews, and speeches. Find your daily dose of inspiration and positivity from RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook.",
  keywords: "BTS quotes, BTS lyrics, BTS inspiration, daily quotes, RM quotes, Jin quotes, Suga quotes, J-Hope quotes, Jimin quotes, V quotes, Jungkook quotes, 방탄소년단 명언",
  openGraph: {
    title: "Daily BTS Quotes | Love for BTS",
    description: "Get inspired daily with quotes from BTS members' lyrics, interviews, and speeches.",
    images: [
      {
        url: "/images/bts-logo.png",
        width: 512,
        height: 512,
        alt: "BTS Quotes"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily BTS Quotes | Love for BTS",
    description: "Get inspired daily with quotes from BTS members' lyrics, interviews, and speeches.",
    images: ["/images/bts-logo.png"],
  }
} 