import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { MessageProvider } from "./lib/message-context"
import { ArmyStoryProvider } from "./lib/army-story-context"
import { NotificationProvider } from "./lib/notification-context"
import { ThemeProvider } from "./lib/themes/theme-context"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
import { FanChantButtonWrapper } from "./components/FanChantButtonWrapper"
import { CelebrationEffects } from "./components/theme/celebration-effects"
import { CustomHead } from "./components/layout/CustomHead"
import GoogleAnalytics from "./lib/google-analytics"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL('https://loveforbts.com'),
  title: "Love for BTS - BTS Fan Hub for ARMY",
  description: "Your BTS fan hub! Explore fan content, story & more. Made for ARMY, by ARMY. Love BTS? You're in the right place.",
  keywords: [
    "BTS", "Bangtan Sonyeondan", "Bangtan Boys", "K-pop", 
    "ARMY", "BTS ARMY", "BTS fan community", "BTS fan site", 
    "RM", "Jin", "Suga", "J-Hope", "Jimin", "V", "Jungkook", 
    "K-pop fan community", "Love for BTS", "BTS discography",
    "BTS members", "BTS stories", "BTS fan content", "ARMY card", 
    "ARMY stories", "Global ARMY", "BTS fan messages", "BTS support"
  ],
  authors: [{ name: "BTS ARMY Community" }],
  creator: "Love for BTS Community",
  publisher: "Love for BTS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://loveforbts.com",
    title: "Love for BTS - BTS Fan Hub for ARMY",
    description: "Your BTS fan hub! Explore fan content, story & more. Made for ARMY, by ARMY. Love BTS? You're in the right place.",
    siteName: "Love for BTS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Love for BTS - BTS Fan Hub for ARMY",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love for BTS - BTS Fan Hub for ARMY",
    description: "Your BTS fan hub! Explore fan content, story & more. Made for ARMY, by ARMY. Love BTS? You're in the right place.",
    images: ["/og-image.png"],
    creator: "@loveforbts",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'verification_token', // Replace with actual Google verification token
  },
  // You can add more structured data as needed
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Black Han Sans font for K-pop style typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-white`} suppressHydrationWarning={true}>
        {/* Google Analytics */}
        <GoogleAnalytics />
        
        {/* Custom component to force page titles */}
        <CustomHead />
        
        <ThemeProvider>
          <NotificationProvider>
            <ArmyStoryProvider>
              <MessageProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-4 md:pt-8 flex justify-center w-full">
                    {children}
                  </main>
                  <Footer />
                </div>
                
                <FanChantButtonWrapper />
                <CelebrationEffects />
                
                <Toaster 
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: 'white',
                      border: '2px solid black',
                      borderRadius: '12px',
                    },
                    className: 'font-medium',
                  }}
                />
              </MessageProvider>
            </ArmyStoryProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
