"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { VAdditionalContent } from "@/app/components/members/VAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function VPage() {
  // Find V's data from members data
  const vData = membersData.find(member => member.slug === 'v')
  
  if (!vData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={vData} 
        customHeading="Taehyung: The Soulful Artist"
        customDescription="Deep-voiced vocalist with striking visuals and a free-spirited soul who brings vintage charm and artistic magic to everything he touches."
      />
      
      {/* Additional V-specific content */}
      <VAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="v" />
    </>
  )
} 
