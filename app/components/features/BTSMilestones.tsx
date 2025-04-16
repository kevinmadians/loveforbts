"use client"

import { useMemo } from "react"

type Milestone = {
  year: string
  title: string
  description: string
}

export function BTSMilestones() {
  const milestones = useMemo(() => [
    {
      year: "2013",
      title: "Debut",
      description: "BTS debuts with their first single album '2 Cool 4 Skool' and begins their journey in the K-pop industry."
    },
    {
      year: "2015",
      title: "First Concert Tour",
      description: "BTS embarks on their first concert tour 'BTS Live Trilogy Episode I: BTS Begins' across Asia."
    },
    {
      year: "2017",
      title: "Billboard Music Awards",
      description: "BTS becomes the first K-pop group to win a Billboard Music Award for Top Social Artist."
    },
    {
      year: "2018",
      title: "United Nations Speech",
      description: "RM delivers an empowering speech at the United Nations General Assembly for UNICEF's 'Generation Unlimited' campaign."
    },
    {
      year: "2019",
      title: "Stadium Tour",
      description: "BTS becomes the first Korean act to perform at iconic venues like Wembley Stadium and the Rose Bowl."
    },
    {
      year: "2020",
      title: "Billboard #1 Hit",
      description: "BTS tops the Billboard Hot 100 with their first English single 'Dynamite', marking a historic achievement."
    },
    {
      year: "2021",
      title: "Grammy Nomination",
      description: "BTS receives their first Grammy nomination for 'Dynamite' in the Best Pop Duo/Group Performance category."
    },
    {
      year: "2022",
      title: "White House Visit",
      description: "BTS meets with President Biden at the White House to address anti-Asian hate crimes and promote diversity."
    },
    {
      year: "2023",
      title: "Military Service",
      description: "BTS members begin their mandatory military service, with Jin being the first to enlist in December 2022."
    },
    {
      year: "2025",
      title: "Complete Reunion",
      description: "All BTS members are expected to complete their military service by June 2025, allowing for a full group reunion."
    }
  ], [])

  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">BTS Milestones</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-black transform -translate-x-1/2" />
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2" />
              <div className="hidden md:flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-black z-10" />
              </div>
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8'}`}>
                <div className={`p-4 rounded-xl border-2 border-black ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-white border border-black mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-lg font-bold mb-1">{milestone.title}</h3>
                  <p className="text-sm">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 