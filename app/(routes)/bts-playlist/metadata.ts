import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "BTS Playlist Generator | Create & Share Custom BTS ARMY Playlists",
  description: "Create and discover the best BTS playlists curated by ARMY fans worldwide. Generate custom K-pop playlists with your favorite Bangtan songs, from Dynamite to Spring Day and more.",
  keywords: "BTS playlist generator, best BTS playlist, BTS ARMY playlist, custom BTS playlist, K-pop playlist creator, Bangtan playlist generator, BTS song collection, BTS music generator, BTS fan playlist maker, Korean pop playlist, BTS hit songs playlist, BTS setlist generator",
  authors: [{ name: "Love for BTS" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://loveforbts.com/bts-playlist",
  },
  openGraph: {
    title: "BTS Playlist Generator | Create & Share Custom BTS ARMY Playlists",
    description: "Create and discover the best BTS playlists curated by ARMY fans worldwide. Generate custom K-pop playlists with your favorite Bangtan songs, from Dynamite to Spring Day and more.",
    type: "website",
    siteName: "Love for BTS",
    images: [
      {
        url: "/images/og-bts-playlist.jpg",
        width: 1200,
        height: 630,
        alt: "BTS Playlist Generator - Create Custom ARMY Playlists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BTS Playlist Generator | Create & Share Custom BTS ARMY Playlists",
    description: "Create and discover the best BTS playlists curated by ARMY fans worldwide. Generate custom K-pop playlists with your favorite Bangtan songs, from Dynamite to Spring Day and more.",
    images: ["/images/og-bts-playlist.jpg"],
  },
  other: {
    "application-name": "BTS Playlist Generator",
    "application-category": "Music",
    "application-genre": "K-pop, Music Playlist",
  },
} 