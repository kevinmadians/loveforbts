"use client"

import Link from "next/link"
import { membersData } from "@/app/lib/members-data"

interface MemberNavigationProps {
  currentMember: string
}

export function MemberNavigation({ currentMember }: MemberNavigationProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-black p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">
        Explore Other Members
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {membersData.map((member) => (
          <Link
            key={member.slug}
            href={`/members/${member.slug}`}
            className={`flex items-center justify-center p-3 rounded-xl transition-all font-medium ${
              currentMember === member.slug
                ? "bg-gray-200 cursor-default border-2 border-black"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="text-center">
              {member.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
} 
