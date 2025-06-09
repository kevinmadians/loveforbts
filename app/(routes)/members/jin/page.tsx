"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { JinAdditionalContent } from "@/app/components/members/JinAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function JinPage() {
  // Find Jin's data from members data
  const jinData = membersData.find(member => member.slug === 'jin')
  
  if (!jinData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={jinData} 
        customHeading="Worldwide Handsome Jin"
        customDescription="BTS's oldest member with legendary visuals, unforgettable laugh, and dad jokes that bring joy to everyone around him."
      />
      
      {/* Additional Jin-specific content */}
      <JinAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="jin" />
    </>
  )
} 
