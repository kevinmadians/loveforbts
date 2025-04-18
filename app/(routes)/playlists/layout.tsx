import { Metadata } from 'next';
import { generateMetadata } from '@/app/lib/seo-utils';

export const metadata: Metadata = generateMetadata({
  title: 'BTS Playlists',
  description: 'Explore curated BTS playlists for different moods, activities, and eras. Find the perfect BTS soundtrack for any moment.',
  keywords: ['BTS playlists', 'BTS music', 'BTS songs', 'kpop playlists', 'themed playlists', 'mood music', 'BTS Spotify'],
  path: '/playlists',
  ogImage: '/images/playlists/playlist-header.jpg',
});

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      {children}
    </div>
  );
} 