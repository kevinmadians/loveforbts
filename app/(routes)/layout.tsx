"use client"

import React from "react"

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl mx-auto py-4 md:py-8 px-4 md:px-6">
        {children}
      </div>
    </div>
  )
} 
