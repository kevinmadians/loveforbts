"use client"

import { membersData } from "@/app/lib/members-data"
import { MemberDetailLayout } from "@/app/components/members/MemberDetailLayout"
import { JungkookAdditionalContent } from "@/app/components/members/JungkookAdditionalContent"
import { MemberNavigation } from "@/app/components/members/MemberNavigation"

export default function JungkookPage() {
  // Find Jungkook's data from members data
  const jungkookData = membersData.find(member => member.slug === 'jungkook')
  
  if (!jungkookData) {
    return <div>Member information not found</div>
  }
  
  return (
    <>
      <MemberDetailLayout 
        member={jungkookData} 
        customHeading="Jungkook: The Golden Maknae"
        customDescription="Multi-talented youngest member who excels at everything from singing and dancing to art and athletics, earning his legendary 'Golden Maknae' title."
      />
      
      {/* Additional Jungkook-specific content */}
      <JungkookAdditionalContent />
      
      {/* Navigation to other members */}
      <MemberNavigation currentMember="jungkook" />
    </>
  )
} 
