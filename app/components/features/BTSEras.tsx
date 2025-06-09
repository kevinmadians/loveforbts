"use client"

import { useMemo } from "react"

type Era = {
  name: string
  year: string
  color: string
  description: string
  keyRelease: string
}

export function BTSEras() {
  const eras = useMemo(() => [
    {
      name: "School Trilogy",
      year: "2013-2014",
      color: "bg-gray-100",
      description: "BTS's debut era focusing on the hardships of youth",
      keyRelease: "2 Cool 4 Skool, O!RUL8,2?, Skool Luv Affair"
    },
    {
      name: "Youth Trilogy", 
      year: "2015-2016",
      color: "bg-pink-100",
      description: "Explored the beauty and challenges of youth",
      keyRelease: "The Most Beautiful Moment in Life Pt.1 & Pt.2, Young Forever"
    },
    {
      name: "Wings",
      year: "2016-2017",
      color: "bg-purple-100",
      description: "Coming of age and personal growth exploration",
      keyRelease: "Wings, You Never Walk Alone"
    },
    {
      name: "Love Yourself",
      year: "2017-2018",
      color: "bg-blue-100",
      description: "Journey of self-love and personal acceptance",
      keyRelease: "Love Yourself: Her, Tear, Answer"
    },
    {
      name: "Map of the Soul",
      year: "2019-2020",
      color: "bg-yellow-100",
      description: "Jungian psychology exploration of self",
      keyRelease: "Map of the Soul: Persona, 7"
    },
    {
      name: "Pandemic Era",
      year: "2020-2021",
      color: "bg-indigo-100",
      description: "Finding light during difficult global times",
      keyRelease: "BE, Dynamite, Butter, Permission to Dance"
    },
    {
      name: "Anthology",
      year: "2022-2023",
      color: "bg-red-100",
      description: "Celebrating BTS's first chapter before military service",
      keyRelease: "Proof, Yet To Come"
    }
  ], [])

  return (
    <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">BTS Musical Journey</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eras.map((era) => (
          <div 
            key={era.name}
            className={`${era.color} p-4 rounded-xl border-2 border-black transition-transform hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{era.name}</h3>
              <span className="text-sm bg-white px-2 py-1 rounded-full border border-black">{era.year}</span>
            </div>
            <p className="text-sm mb-2">{era.description}</p>
            <div className="bg-white rounded-lg p-2 border border-black mt-auto">
              <p className="text-xs font-semibold">Key Releases:</p>
              <p className="text-xs">{era.keyRelease}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
