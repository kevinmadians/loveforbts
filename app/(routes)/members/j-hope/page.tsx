"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { JHopeAdditionalContent } from "@/app/components/members/JHopeAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function JHopePage() {
  // Find J-Hope's data from members data
  const jhopeData = membersData.find(member => member.slug === 'j-hope')
  
  if (!jhopeData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={jhopeData} 
        customHeading="Jung Hoseok: Sunshine Personified"
        customDescription="BTS's lead dancer and rapper whose boundless energy, infectious smile, and extraordinary dance skills bring joy to ARMY while showcasing his impressive solo artistry."
      />
      
      {/* Additional J-Hope-specific content */}
      <JHopeAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="j-hope" />
    </>
  )
} 