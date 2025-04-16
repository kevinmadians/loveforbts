"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { RmAdditionalContent } from "@/app/components/members/RmAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function RMPage() {
  // Find RM's data from members data
  const rmData = membersData.find(member => member.slug === 'rm')
  
  if (!rmData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={rmData} 
        customHeading="Kim Namjoon: The Thoughtful Leader"
        customDescription="BTS's leader with exceptional intelligence and artistic vision who guides the group's creative direction while advocating for self-love and authenticity."
      />
      
      {/* Additional RM-specific content */}
      <RmAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="rm" />
    </>
  )
} 