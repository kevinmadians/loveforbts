import { MemberData } from "./members-data"

/**
 * Generates JSON-LD structured data for the website
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Love for BTS",
    "url": "https://loveforbts.com",
    "description": "BTS Fan Hub for ARMY - Explore fan content, stories & more. Made for ARMY, by ARMY.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://loveforbts.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generates JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Love for BTS",
    "url": "https://loveforbts.com",
    "logo": "https://loveforbts.com/images/your-logo.png",
    "sameAs": [
      "https://twitter.com/loveforbts",
      "https://instagram.com/loveforbts"
    ]
  };
}

/**
 * Generates JSON-LD structured data for BTS member
 */
export function generateMemberStructuredData(member: MemberData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "description": member.shortBio,
    "image": member.image,
    "url": `https://loveforbts.com/members/${member.slug}`,
    "jobTitle": member.role,
    "sameAs": [
      "https://www.instagram.com/bts.bighitofficial/",
      "https://twitter.com/bts_bighit",
      "https://www.youtube.com/channel/UCLkAepWjdylmXSltofFvsYQ"
    ],
    "affiliation": {
      "@type": "MusicGroup",
      "name": "BTS",
      "url": "https://loveforbts.com/members"
    }
  };
}

/**
 * Generates JSON-LD structured data for an ARMY story
 */
export function generateStoryStructuredData(story: {
  id: string;
  title: string;
  content: string;
  author: string;
  country: string;
  dateCreated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.content.substring(0, 150) + "...",
    "author": {
      "@type": "Person",
      "name": story.author
    },
    "datePublished": story.dateCreated,
    "dateModified": story.dateCreated,
    "publisher": {
      "@type": "Organization",
      "name": "Love for BTS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://loveforbts.com/images/your-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://loveforbts.com/army-story/${story.id}`
    }
  };
} 