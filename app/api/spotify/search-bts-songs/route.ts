import type { NextRequest } from 'next/server';

let accessToken: string | null = null;
let tokenExpiresAt = 0;

async function getSpotifyAccessToken() {
  try {
    if (accessToken && Date.now() < tokenExpiresAt) return accessToken;
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });
    if (!res.ok) throw new Error(`Failed to fetch Spotify token: ${res.status} ${res.statusText}`);
    const data = await res.json();
    accessToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return accessToken;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Spotify token error:', err);
    }
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    if (!q || q.length < 2) {
      return new Response(JSON.stringify({ songs: [] }), { status: 200 });
    }
    const token = await getSpotifyAccessToken();
    if (!token) {
      return new Response(JSON.stringify({ songs: [] }), { status: 200 });
    }
    // Only search for BTS tracks
    const query = `artist:BTS ${q}`;
    const res = await fetch(`https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error('Spotify search error:', await res.text());
      return new Response(JSON.stringify({ songs: [] }), { status: 200 });
    }
    const data = await res.json();
    const songs = (data.tracks?.items || [])
      .map((track: any) => track.name)
      .filter((name: string, idx: number, arr: string[]) => arr.indexOf(name) === idx); // unique
    return new Response(JSON.stringify({ songs }), { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ songs: [] }), { status: 200 });
  }
} 