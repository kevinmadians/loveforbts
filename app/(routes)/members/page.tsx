"use client"

import { MemberCard } from "@/app/components/members/MemberCard"
import { OfficialAccounts } from "@/app/components/members/OfficialAccounts"
import { BTSInfo } from "@/app/components/features/BTSInfo"
import { BTSEras } from "@/app/components/features/BTSEras"
import { BTSMilestones } from "@/app/components/features/BTSMilestones"
import { ARMYLove } from "@/app/components/features/ARMYLove"
import { membersData } from "@/app/lib/members-data"

export default function MembersDirectoryPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Fun Easter Egg for ARMY */}
      <ARMYLove />
      
      {/* Hero Section */}
      <div className="mb-6 md:mb-12 text-center pt-0 mt-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-6 text-center black-han-sans">
          BTS Members
        </h1>
        
        <p className="text-lg mb-4 md:mb-8 text-center max-w-3xl mx-auto">
          Meet the seven incredible talents that make up BTS. Each member brings their unique skills, 
          personality, and artistic vision to create the global phenomenon we know and love.
        </p>
      </div>
      
      {/* Official BTS Social Media Accounts */}
      <OfficialAccounts />
      
      {/* BTS Group Info Section */}
      <BTSInfo />
      
      {/* Members Cards Section */}
      <div className="bg-white rounded-2xl border-2 border-black overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center black-han-sans">
          Meet the Members
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membersData.map((member) => (
            <MemberCard
              key={member.slug}
              name={member.name}
              role={member.role}
              image={member.image}
              slug={member.slug}
              shortBio={member.shortBio}
            />
          ))}
        </div>
      </div>
      
      {/* BTS Eras Timeline */}
      <BTSEras />
      
      {/* BTS Milestones */}
      <BTSMilestones />
    </div>
  )
} 