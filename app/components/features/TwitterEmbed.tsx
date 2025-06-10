"use client"

import React, { useEffect } from 'react'

interface TwitterEmbedProps {
  tweetId: string
  className?: string
}

interface MultipleTwitterEmbedProps {
  tweetIds: string[]
  className?: string
}

export const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetId, className = "" }) => {
  useEffect(() => {
    // Load Twitter script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://platform.twitter.com/widgets.js'
      script.charset = 'utf-8'
      document.head.appendChild(script)
    } else {
      // If script is already loaded, render the widget
      window.twttr.widgets.load()
    }
  }, [])

  return (
    <div className={`bg-white border-2 border-black rounded-2xl p-4 sm:p-6 w-full ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center black-han-sans">
        Latest from BTS
      </h2>
      
      <div className="flex justify-center">
        <blockquote className="twitter-tweet" data-theme="light">
          <p lang="ko" dir="ltr">
            🟣 BTS OFFICIAL<br/>
            <br/>
            대한민국 국군으로서의 의무를 성실히 이행하고 제대하게 되었습니다.<br/>
            그동안 응원해주신 팬여러분들께 진심으로 감사드립니다.<br/>
            <br/>
            앞으로도 더 나은 모습으로 보답하겠습니다.<br/>
            <br/>
            (ENGLISH) We have been discharged after faithfully carrying out our duties as members of the ROK Army. We sincerely thank the fans for their support. We will repay you with an even better image in the future.
          </p>
          &mdash; BTS_official (@BTS_twt) <a href={`https://twitter.com/BTS_twt/status/${tweetId}?ref_src=twsrc%5Etfw`}>December 16, 2024</a>
        </blockquote>
      </div>
    </div>
  )
}

export const MultipleTwitterEmbed: React.FC<MultipleTwitterEmbedProps> = ({ tweetIds, className = "" }) => {
  useEffect(() => {
    // Load Twitter script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://platform.twitter.com/widgets.js'
      script.charset = 'utf-8'
      document.head.appendChild(script)
    } else {
      // If script is already loaded, render the widget
      window.twttr.widgets.load()
    }
  }, [])

  return (
    <div className={`bg-white border-2 border-black rounded-2xl p-4 sm:p-6 w-full ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center black-han-sans">
        Latest from BTS
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {tweetIds.map((tweetId, index) => (
          <div key={tweetId} className="flex justify-center">
            <blockquote className="twitter-tweet" data-theme="light" data-conversation="none">
              <a href={`https://twitter.com/BTS_twt/status/${tweetId}?ref_src=twsrc%5Etfw`}>
                Loading Tweet {index + 1}...
              </a>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  )
}

// Extend the Window interface to include twttr
declare global {
  interface Window {
    twttr: any
  }
} 