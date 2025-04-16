import type { Metadata } from "next"

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
  const url = `https://loveforbts.com/members/${slug}`;
  
  const keywords = [
    "BTS", "ARMY", "K-pop", "Love for BTS",
    "BTS fan community", "BTS ARMY",
    "Bangtan Sonyeondan", "방탄소년단",
    `${name}`, `BTS ${name}`, `${name} profile`,
    `${name} facts`, `${name} bio`, `${role}`,
    `${name} journey`, `${name} achievements`,
    `BTS ${role}`, "BTS member profile"
  ];
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${name} (${role}) - Love for BTS`,
      description,
      url,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `BTS member ${name} - Love for BTS`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} (${role}) - Love for BTS`,
      description,
      images: ["/og-image.png"],
    }
  };
} 