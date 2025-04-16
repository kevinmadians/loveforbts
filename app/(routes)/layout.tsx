"use client"

import React from "react"

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="w-full py-4 md:py-8 flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  )
} 