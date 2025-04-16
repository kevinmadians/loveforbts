"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { SugaAdditionalContent } from "@/app/components/members/SugaAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function SugaPage() {
  // Find Suga's data from members data
  const sugaData = membersData.find(member => member.slug === 'suga')
  
  if (!sugaData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={sugaData} 
        customHeading="Min Yoongi: The Genius Producer"
        customDescription="Brilliant producer with raw, honest lyrics who shines both as BTS's rapper and solo artist Agust D."
      />
      
      {/* Additional Suga-specific content */}
      <SugaAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="suga" />
    </>
  )
} 