import type { Metadata } from "next"
import { generateMetadata } from "@/app/lib/seo-utils"

interface MemberSEOProps {
  name: string;
  role: string;
  shortBio: string;
  slug: string;
  image: string;
}

/**
 * Generates SEO metadata for individual BTS member pages
 */
export function generateMemberMetadata({
  name,
  role,
  shortBio,
  slug,
  image
}: MemberSEOProps): Metadata {
  const title = `${name} (${role})`;
  const description = `Learn about BTS member ${name}, ${role}. ${shortBio.substring(0, 150)}...`;
  const memberKeywords = [
    `${name}`, `BTS ${name}`, `${name} profile`,
    `${name} facts`, `${name} bio`, `${role}`,
    `${name} journey`, `${name} achievements`,
    `BTS ${role}`, "BTS member profile"
  ];

  return generateMetadata({
    title,
    description,
    keywords: memberKeywords,
    path: `/members/${slug}`,
    ogImage: image || "/og-image.png",
    ogImageAlt: `BTS member ${name} - Love for BTS`
  });
} 