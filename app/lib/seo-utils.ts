import type { Metadata } from "next"

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
}

/**
 * Generates consistent SEO metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path,
  ogImage = "/og-image.png",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogImageAlt = "Love for BTS - BTS Fan Hub for ARMY",
}: SEOProps): Metadata {
  const url = `https://loveforbts.com${path}`
  
  // Common SEO keywords for all pages
  const commonKeywords = [
    "BTS", "ARMY", "K-pop", "Love for BTS", 
    "BTS fan community", "BTS ARMY",
    "Bangtan Sonyeondan", "방탄소년단", 
    "BTS fan site", "Loveforbts"
  ]
  
  // Merge with page-specific keywords
  const mergedKeywords = [...commonKeywords, ...keywords]
  
  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} - Love for BTS`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Love for BTS`,
      description,
      images: [ogImage],
    }
  }
} 