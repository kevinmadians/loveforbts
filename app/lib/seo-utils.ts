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
  includeSuffix?: boolean;
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
  includeSuffix = true,
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
  
  const pageTitle = includeSuffix ? `${title} - Love for BTS` : title;
  
  return {
    title: pageTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
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
      title: pageTitle,
      description,
      images: [ogImage],
    }
  }
} 