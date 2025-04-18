import { Metadata } from 'next';
import { generateMetadata } from '@/app/lib/seo-utils';

export const metadata: Metadata = generateMetadata({
  title: 'ARMY Vocabulary Guide',
  description: 'Learn BTS and ARMY slang, inside jokes, nicknames, and fandom terms with our comprehensive vocabulary guide - perfect for new fans!',
  keywords: ['BTS vocabulary', 'ARMY slang', 'K-pop terms', 'BTS inside jokes', 'BTS memes', 'ARMY guide', 'BTS fandom', 'Bangtan', 'I purple you', 'Borahae'],
  path: '/vocabulary',
  ogImage: '/images/social/vocabulary-guide.jpg',
}); 