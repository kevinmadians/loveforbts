"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { JiminAdditionalContent } from "@/app/components/members/JiminAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function JiminPage() {
  // Find Jimin's data from members data
  const jiminData = membersData.find(member => member.slug === 'jimin')
  
  if (!jiminData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={jiminData} 
        customHeading="Park Jimin: Graceful Perfectionist"
        customDescription="Contemporary dancer with elegant moves and a distinctive voice who captivates with his duality of delicate grace and powerful charisma."
      />
      
      {/* Additional Jimin-specific content */}
      <JiminAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="jimin" />
    </>
  )
} 