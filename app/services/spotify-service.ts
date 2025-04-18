const SPOTIFY_CLIENT_ID = 'b71959a2b1ae43ef90a0fe61a21a10f1';
const SPOTIFY_CLIENT_SECRET = '9d204ca75a90441fa94ae97c8cfc0b4b';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// BTS Spotify Artist ID
const BTS_ARTIST_ID = '3Nrfpe0tUJi4K4DXYWgMUX';

// For storing the token in memory during the session
let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
    release_date: string;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

/**
 * Get a Spotify access token using client credentials flow
 */
export const getSpotifyToken = async (): Promise<string> => {
  // Check if we have a valid token already
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error('Failed to get Spotify token');
    }

    const data = await response.json();
    
    // Store the token and its expiration time
    accessToken = data.access_token;
    // Set expiration time with a small buffer (5 seconds)
    tokenExpirationTime = Date.now() + (data.expires_in * 1000) - 5000;
    
    return data.access_token;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error getting Spotify token:', error);
    }
    throw error;
  }
};

/**
 * Make an authenticated request to the Spotify API
 */
const spotifyApiRequest = async (endpoint: string, method = 'GET', params?: Record<string, string>): Promise<any> => {
  try {
    const token = await getSpotifyToken();
    
    let url = `${SPOTIFY_API_BASE_URL}${endpoint}`;
    
    // Add query parameters if they exist
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url += `?${queryParams.toString()}`;
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error making Spotify API request:', error);
    }
    throw error;
  }
};

/**
 * Get track details by Spotify track ID
 */
export const getTrackById = async (trackId: string): Promise<SpotifyTrack> => {
  const data = await spotifyApiRequest(`/tracks/${trackId}`);
  return data as SpotifyTrack;
};

/**
 * Get multiple tracks by their IDs
 * @param trackIds Array of Spotify track IDs to fetch
 * @returns Array of Spotify track objects
 * @throws Error if the API request fails
 */
export const getTracksById = async (trackIds: string[]): Promise<SpotifyTrack[]> => {
  if (!trackIds || trackIds.length === 0) {
    return [];
  }

  // Spotify API limits to 50 tracks per request
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += 50) {
    chunks.push(trackIds.slice(i, i + 50));
  }
  
  try {
    const results = await Promise.all(
      chunks.map(async (chunk) => {
        try {
          return await spotifyApiRequest('/tracks', 'GET', { ids: chunk.join(',') });
        } catch (error: any) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Error fetching chunk of tracks (${chunk.join(',')}):`, error);
          }
          throw new Error(`Failed to fetch track details: ${error.message}`);
        }
      })
    );
    
    // Flatten the results
    const tracks = results.flatMap(result => result.tracks || []);
    
    // Verify that we got track details for all requested IDs
    if (tracks.length === 0 && trackIds.length > 0) {
      throw new Error('No tracks were returned from Spotify API');
    }
    
    if (tracks.some(track => !track)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Some tracks could not be found:', 
          trackIds.filter((id, index) => !tracks[index]));
      }
    }
    
    return tracks.filter(Boolean) as SpotifyTrack[];
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in getTracksById:', error);
    }
    throw new Error(`Failed to get track details: ${error.message}`);
  }
};

/**
 * Search for BTS tracks
 */
export const searchBTSTrack = async (query: string): Promise<SpotifyTrack[]> => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  // Add "BTS" to the search query and limit to tracks
  const searchQuery = `${query} artist:BTS`;
  
  const data = await spotifyApiRequest('/search', 'GET', {
    q: searchQuery,
    type: 'track',
    limit: '10'
  });
  
  // Filter to ensure only BTS tracks (in case Spotify returns others)
  return data.tracks.items.filter((track: SpotifyTrack) => 
    track.artists.some(artist => 
      artist.name === 'BTS' || artist.name === '방탄소년단'
    )
  );
};

/**
 * Get BTS albums
 */
export const getBTSAlbums = async (limit: number = 20, offset: number = 0): Promise<any> => {
  return spotifyApiRequest(`/artists/${BTS_ARTIST_ID}/albums`, 'GET', {
    limit: limit.toString(),
    offset: offset.toString(),
    include_groups: 'album,single'
  });
};

/**
 * Get a Spotify playlist embed URL
 */
export const getPlaylistEmbedUrl = (playlistId: string): string => {
  return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
};

/**
 * Format milliseconds into a time string (mm:ss)
 */
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}; 