import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BTS Quote Cards Generator - Create Beautiful Inspirational Cards | Love for BTS',
  description: 'Create stunning quote cards with inspirational BTS messages. Choose from 100+ quotes, 10 beautiful themes, and download for Instagram, Twitter, TikTok. Free BTS quote card maker for ARMY!',
  keywords: [
    'BTS quote cards',
    'BTS quotes generator',
    'inspirational quote cards',
    'BTS social media cards',
    'Instagram story cards',
    'Twitter quote cards',
    'TikTok BTS cards',
    'free quote generator',
    'BTS inspirational quotes',
    'ARMY quote cards',
    'BTS fan art generator',
    'social media graphics',
    'motivational quotes BTS',
    'BTS wisdom quotes',
    'download quote cards',
    'custom quote cards',
    'BTS themed graphics',
    'quote card maker',
    'BTS positivity cards',
    'inspirational BTS messages'
  ],
  authors: [{ name: 'Love for BTS' }],
  creator: 'Love for BTS',
  publisher: 'Love for BTS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BTS Quote Cards Generator - Create Beautiful Inspirational Cards',
    description: 'Create stunning quote cards with inspirational BTS messages. Choose from 100+ quotes, 10 beautiful themes, and download for Instagram, Twitter, TikTok.',
    url: 'https://loveforbts.com/bts-cards-generator',
    siteName: 'Love for BTS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/bts-group.jpg',
        width: 1200,
        height: 630,
        alt: 'BTS Quote Cards Generator - Create Beautiful Inspirational Cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTS Quote Cards Generator - Create Beautiful Inspirational Cards',
    description: 'Create stunning quote cards with inspirational BTS messages. Choose from 100+ quotes, 10 beautiful themes, and download for social media.',
    images: ['/images/bts-group.jpg'],
    creator: '@loveforbts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://loveforbts.com/bts-cards-generator',
  },
} 