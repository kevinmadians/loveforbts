import { Metadata } from 'next'
import { supabase } from '@/app/lib/supabase'

interface PlaylistData {
  id: string
  name: string
  description: string | null
  creator_name: string
  songs: any[]
  created_at: string
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Fetch playlist data for SEO
    const { data: playlist, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !playlist) {
      return {
        title: "Playlist Not Found | BTS ARMY Playlists",
        description: "The playlist you're looking for could not be found. Discover more BTS playlists created by ARMY fans worldwide.",
      }
    }

    const playlistData: PlaylistData = playlist
    const songs = typeof playlistData.songs === 'string' ? JSON.parse(playlistData.songs) : playlistData.songs
    const topSongs = songs.slice(0, 3).map((song: any) => song.title).join(', ')
    
    const title = `${playlistData.name} - BTS ARMY Playlist by ${playlistData.creator_name}`
    const description = playlistData.description || 
      `Discover "${playlistData.name}" - a custom BTS playlist by ${playlistData.creator_name} featuring ${songs.length} amazing songs including ${topSongs}. Perfect for ARMY fans who love K-pop music.`
    
    const keywords = `${playlistData.name}, BTS playlist, ARMY playlist, ${playlistData.creator_name}, K-pop playlist, BTS songs, ${topSongs}, custom BTS playlist, Bangtan playlist, BTS music collection, Korean pop playlist, BTS fan playlist`

    return {
      title,
      description,
      keywords,
      authors: [{ name: playlistData.creator_name }],
      robots: "index, follow",
      alternates: {
        canonical: `https://loveforbts.com/bts-playlist/${params.id}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        siteName: "Love for BTS",
        images: [
          {
            url: "/images/og-bts-playlist-detail.jpg",
            width: 1200,
            height: 630,
            alt: `${playlistData.name} - BTS ARMY Playlist`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/og-bts-playlist-detail.jpg"],
      },
      other: {
        "music:duration": `${Math.round(songs.length * 3.5)}`,
        "music:song_count": songs.length.toString(),
        "music:creator": playlistData.creator_name,
        "music:genre": "K-pop",
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: "BTS ARMY Playlist | Best K-pop Music Collection",
      description: "Discover amazing BTS playlists created by ARMY fans worldwide. Find your favorite K-pop songs and create custom playlists.",
      keywords: "BTS playlist, ARMY playlist, K-pop music, Bangtan songs, custom playlist, Korean pop",
    }
  }
} 