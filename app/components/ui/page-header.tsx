import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold black-han-sans mb-2">{title}</h1>
      {description && (
        <p className="text-lg text-gray-700 max-w-3xl">{description}</p>
      )}
    </div>
  )
} 