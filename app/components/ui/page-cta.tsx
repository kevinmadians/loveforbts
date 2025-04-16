import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface PageCTAProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color?: 'yellow' | 'purple' | 'blue' | 'green'
  className?: string
}

export function PageCTA({ 
  title, 
  description, 
  href, 
  icon: Icon,
  color = 'yellow',
  className = ''
}: PageCTAProps) {
  const colorStyles = {
    yellow: 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100',
    purple: 'border-purple-500 bg-purple-50 hover:bg-purple-100',
    blue: 'border-blue-500 bg-blue-50 hover:bg-blue-100',
    green: 'border-green-500 bg-green-50 hover:bg-green-100',
  }
  
  const iconColorStyles = {
    yellow: 'text-yellow-600 bg-yellow-100',
    purple: 'text-purple-600 bg-purple-100',
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
  }
  
  return (
    <Link 
      href={href}
      className={`
        block p-5 border-2 rounded-xl transition-all 
        ${colorStyles[color]}
        transform hover:-translate-y-1 hover:shadow-md
        ${className}
      `}
    >
      <div className="flex flex-col items-start gap-3">
        <div className={`p-2 rounded-full ${iconColorStyles[color]}`}>
          <Icon size={20} />
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-1 black-han-sans">{title}</h3>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        
        <div className="mt-2 text-sm font-medium flex items-center gap-1 black-han-sans">
          Visit Now 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  )
} 