import { notFound } from "next/navigation"
import { ServerAlbumDetail } from "@/app/components/discography/ServerAlbumDetail"
import { discographyData } from "@/app/lib/discography-data"

export default function AlbumPage({ params }: { params: { slug: string } }) {
  // Destructure slug to avoid direct params access
  const { slug } = params;
  
  // Find the album data based on the slug
  const album = discographyData.find(album => album.slug === slug);
  
  // If album not found, show 404
  if (!album) {
    notFound();
  }
  
  return <ServerAlbumDetail album={album} />;
} 