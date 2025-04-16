import React, { ReactNode } from 'react'

interface CTAContainerProps {
  title: string
  children: ReactNode
  className?: string
}

export function CTAContainer({ 
  title, 
  children, 
  className = '' 
}: CTAContainerProps) {
  return (
    <div className={`w-full py-10 ${className}`}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold black-han-sans">
            {title}
          </h2>
          <div className="mt-2 w-16 h-1 bg-black mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      </div>
    </div>
  )
} 