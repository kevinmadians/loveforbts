import { AlbumDetail, AlbumWithNavigation } from "./AlbumDetail"
import { AlbumData, discographyData } from "@/app/lib/discography-data"

interface ServerAlbumDetailProps {
  album: AlbumData
}

export function ServerAlbumDetail({ album }: ServerAlbumDetailProps) {
  // Find next and previous albums for navigation
  const sortedAlbums = [...discographyData].sort((a, b) => {
    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
  });
  
  const currentIndex = sortedAlbums.findIndex(a => a.slug === album.slug);
  
  const previousAlbum = currentIndex > 0 ? sortedAlbums[currentIndex - 1] : null;
  const nextAlbum = currentIndex < sortedAlbums.length - 1 ? sortedAlbums[currentIndex + 1] : null;

  // Prepare data for client component
  const albumWithNav: AlbumWithNavigation = {
    ...album,
    previousAlbum,
    nextAlbum
  };

  return <AlbumDetail albumWithNav={albumWithNav} />
} 