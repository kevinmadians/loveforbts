const SPOTIFY_CLIENT_ID = 'b71959a2b1ae43ef90a0fe61a21a10f1';
const SPOTIFY_CLIENT_SECRET = '9d204ca75a90441fa94ae97c8cfc0b4b';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// BTS Spotify Artist ID
const BTS_ARTIST_ID = '3Nrfpe0tUJi4K4DXYWgMUX';

// For storing the token in memory during the session
let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

// Simple in-memory cache for track data
interface TrackCache {
  [trackId: string]: {
    data: SpotifyTrack;
    timestamp: number;
  };
}

// Cache tracks for 1 hour
const TRACK_CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const trackCache: TrackCache = {};

// For search throttling and caching
interface SearchCache {
  [query: string]: {
    results: SpotifyTrack[];
    timestamp: number;
  };
}
const searchCache: SearchCache = {};
const SEARCH_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
let lastSearchTime = 0;
const SEARCH_THROTTLE = 300; // Minimum ms between search requests

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
const spotifyApiRequest = async (endpoint: string, method = 'GET', params?: Record<string, string>, retryCount = 0): Promise<any> => {
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
    
    // Handle rate limiting with exponential backoff
    if (response.status === 429) {
      // Max 3 retries
      if (retryCount >= 3) {
        throw new Error(`Spotify API rate limit exceeded after ${retryCount} retries`);
      }
      
      // Get retry-after header or use exponential backoff
      const retryAfter = response.headers.get('Retry-After');
      const delayMs = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, retryCount) * 1000;
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Rate limited by Spotify. Retrying in ${delayMs}ms (retry ${retryCount + 1}/3)`);
      }
      
      // Wait for the required time
      await new Promise(resolve => setTimeout(resolve, delayMs));
      
      // Retry the request with incremented retry count
      return spotifyApiRequest(endpoint, method, params, retryCount + 1);
    }
    
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
 * Get track details by Spotify track ID with caching
 */
export const getTrackById = async (trackId: string): Promise<SpotifyTrack> => {
  // Check cache first
  const cachedTrack = trackCache[trackId];
  const now = Date.now();
  
  if (cachedTrack && (now - cachedTrack.timestamp) < TRACK_CACHE_TTL) {
    return cachedTrack.data;
  }
  
  // If not in cache or expired, fetch from API
  const data = await spotifyApiRequest(`/tracks/${trackId}`);
  
  // Cache the result
  trackCache[trackId] = {
    data: data as SpotifyTrack,
    timestamp: now
  };
  
  return data as SpotifyTrack;
};

/**
 * Get multiple tracks by their IDs with caching
 * @param trackIds Array of Spotify track IDs to fetch
 * @returns Array of Spotify track objects
 * @throws Error if the API request fails
 */
export const getTracksById = async (trackIds: string[]): Promise<SpotifyTrack[]> => {
  if (!trackIds || trackIds.length === 0) {
    return [];
  }

  const now = Date.now();
  const results: SpotifyTrack[] = [];
  const idsToFetch: string[] = [];
  
  // Check which tracks we can get from cache
  for (const trackId of trackIds) {
    const cached = trackCache[trackId];
    if (cached && (now - cached.timestamp) < TRACK_CACHE_TTL) {
      results.push(cached.data);
    } else {
      idsToFetch.push(trackId);
    }
  }
  
  // If all tracks were in cache, return early
  if (idsToFetch.length === 0) {
    return results;
  }

  // Spotify API limits to 50 tracks per request
  const chunks = [];
  for (let i = 0; i < idsToFetch.length; i += 50) {
    chunks.push(idsToFetch.slice(i, i + 50));
  }
  
  try {
    // Process chunks sequentially with delay to avoid rate limiting
    const apiResults = [];
    for (const chunk of chunks) {
      try {
        // Add a delay between chunks to avoid rate limiting
        if (apiResults.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const result = await spotifyApiRequest('/tracks', 'GET', { ids: chunk.join(',') });
        apiResults.push(result);
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Error fetching chunk of tracks (${chunk.join(',')}):`, error);
        }
        throw new Error(`Failed to fetch track details: ${error.message}`);
      }
    }
    
    // Flatten the results
    const fetchedTracks = apiResults.flatMap(result => result.tracks || []);
    
    // Cache the new results
    for (const track of fetchedTracks) {
      if (track) {
        trackCache[track.id] = {
          data: track,
          timestamp: now
        };
      }
    }
    
    // Combine cached and new results, maintaining original order
    const allTracks = trackIds.map(id => {
      const cached = trackCache[id];
      return cached ? cached.data : null;
    });
    
    // Verify that we got track details for all requested IDs
    if (allTracks.every(track => track === null) && trackIds.length > 0) {
      throw new Error('No tracks were returned from Spotify API');
    }
    
    if (allTracks.some(track => !track)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Some tracks could not be found:', 
          trackIds.filter((id, index) => !allTracks[index]));
      }
    }
    
    return allTracks.filter(Boolean) as SpotifyTrack[];
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in getTracksById:', error);
    }
    throw new Error(`Failed to get track details: ${error.message}`);
  }
};

/**
 * Search for BTS tracks with throttling and caching
 */
export const searchBTSTrack = async (query: string): Promise<SpotifyTrack[]> => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cachedResults = searchCache[normalizedQuery];
  const now = Date.now();
  
  if (cachedResults && (now - cachedResults.timestamp) < SEARCH_CACHE_TTL) {
    return cachedResults.results;
  }
  
  // Throttle requests to prevent hitting rate limits
  const timeSinceLastSearch = now - lastSearchTime;
  if (timeSinceLastSearch < SEARCH_THROTTLE) {
    await new Promise(resolve => setTimeout(resolve, SEARCH_THROTTLE - timeSinceLastSearch));
  }
  
  // Update the last search time
  lastSearchTime = Date.now();
  
  // Add "BTS" to the search query and limit to tracks
  const searchQuery = `${query} artist:BTS`;
  
  try {
    const data = await spotifyApiRequest('/search', 'GET', {
      q: searchQuery,
      type: 'track',
      limit: '10'
    });
    
    // Filter to ensure only BTS tracks (in case Spotify returns others)
    const results = data.tracks.items.filter((track: SpotifyTrack) => 
      track.artists.some(artist => 
        artist.name === 'BTS' || artist.name === '방탄소년단'
      )
    );
    
    // Cache the results
    searchCache[normalizedQuery] = {
      results,
      timestamp: Date.now()
    };
    
    return results;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error searching BTS tracks:', error);
    }
    
    // If we fail, return empty results
    return [];
  }
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
 * Format milliseconds into a time string (mm:ss)
 */
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}; 