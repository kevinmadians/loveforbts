import { NextResponse } from 'next/server';
import { getTracksById } from '@/app/services/spotify-service';

/**
 * GET handler for /api/spotify/tracks
 * Fetches multiple Spotify tracks by their IDs
 * 
 * @param request NextRequest object
 * @returns Response with track details or error
 * 
 * Query parameters:
 * - ids: Comma-separated list of Spotify track IDs
 * 
 * Example: /api/spotify/tracks?ids=6rqhFgbbKwnb9MLmUQDhG6,4cOdK2wGLETKBW3PvgPWqT
 */
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url);
    
    // Get track IDs from query params
    const trackIds = searchParams.get('ids');
    
    if (!trackIds) {
      return NextResponse.json(
        { error: 'Missing track IDs. Please provide track IDs as a comma-separated list with the "ids" parameter.' },
        { status: 400 }
      );
    }
    
    // Split the comma-separated track IDs
    const idsArray = trackIds.split(',').map(id => id.trim()).filter(Boolean);
    
    if (idsArray.length === 0) {
      return NextResponse.json(
        { error: 'No valid track IDs provided.' },
        { status: 400 }
      );
    }
    
    // Fetch track details
    const tracks = await getTracksById(idsArray);
    
    return NextResponse.json({ tracks });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching Spotify tracks:', error);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch track details' },
      { status: 500 }
    );
  }
} 