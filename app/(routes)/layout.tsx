"use client"

import React from "react"

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="w-full py-12 flex flex-col items-center justify-center">
        {children}
      </main>
    </>
  )
} 