import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { MessageProvider } from "./lib/message-context"
import { ArmyStoryProvider } from "./lib/army-story-context"
import { NotificationProvider } from "./lib/notification-context"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
import { FanChantButtonWrapper } from "./components/FanChantButtonWrapper"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Love for BTS",
  description: "BTS Fan Community - Share your love for BTS with other fans worldwide",
  keywords: "BTS, K-pop, fan community, ARMY, music",
  authors: [{ name: "BTS ARMY" }],
  creator: "BTS Fan Community",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Love for BTS",
    description: "BTS Fan Community - Share your love for BTS with other fans worldwide",
    siteName: "Love for BTS",
  },
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
      <body className={`${inter.variable} font-sans min-h-screen bg-white`}>
        <NotificationProvider>
          <ArmyStoryProvider>
            <MessageProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-4 md:pt-8">
                  {children}
                </main>
                <Footer />
              </div>
              
              <FanChantButtonWrapper />
              
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
      </body>
    </html>
  )
}