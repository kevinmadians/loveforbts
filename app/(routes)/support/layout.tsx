import { generateMetadata } from "@/app/lib/seo-utils"
import React from "react"

export const metadata = generateMetadata({
  title: "Support Us",
  description: "Support our ARMY community to help us maintain and improve this space where we all celebrate our love for BTS.",
  keywords: ["BTS support", "ARMY support", "donate", "Ko-fi", "community", "fan site", "BTS community support"],
  path: "/support"
})

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  )
} 
