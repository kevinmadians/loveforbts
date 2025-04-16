import { membersData } from "@/app/lib/members-data"
import { generateMemberMetadata } from "../seo-helper"
import type { Metadata } from "next"

// Find Jungkook's data from members data
const jungkookData = membersData.find(member => member.slug === 'jungkook')

// Generate metadata if data exists, or provide fallback
export const metadata: Metadata = jungkookData 
  ? generateMemberMetadata(jungkookData)
  : {
      title: "Jungkook (Main Vocalist)",
      description: "Learn about BTS member Jungkook, the Golden Maknae. Explore his performances, photos, videos, facts, and journey with BTS.",
      alternates: {
        canonical: "https://loveforbts.com/members/jungkook",
      }
    } 