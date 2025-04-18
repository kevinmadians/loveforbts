import { NextResponse } from 'next/server';
import { searchBTSTrack } from '@/app/services/spotify-service';

/**
 * GET handler for /api/spotify/search
 * Searches for BTS tracks on Spotify based on a query
 * 
 * @param request NextRequest object
 * @returns Response with search results or error
 * 
 * Query parameters:
 * - query: Search term to find BTS tracks (required)
 *   Note: "BTS" is automatically added to the search query to ensure results are from BTS
 *   The results are also filtered to include only official BTS tracks (including 방탄소년단)
 * 
 * Example: /api/spotify/search?query=Dynamite
 */
export async function GET(request: Request) {
  try {
    // Get the URL and search parameters from the request
    const { searchParams } = new URL(request.url);
    
    // Get the query parameter
    const query = searchParams.get('query');
    
    // Validate query parameter
    if (!query) {
      return NextResponse.json(
        { error: 'Missing search query. Please provide a "query" parameter.' },
        { status: 400 }
      );
    }
    
    // Search for BTS tracks using the spotify service
    // (This adds "artist:BTS" to the query and filters for BTS/방탄소년단 artist names)
    const results = await searchBTSTrack(query);
    
    return NextResponse.json({ results });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error searching Spotify tracks:', error);
    }
    
    return NextResponse.json(
      { error: `Failed to search tracks: ${error.message}` },
      { status: 500 }
    );
  }
} 