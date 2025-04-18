export type PlaylistType = 'mood' | 'activity' | 'era';

export interface Playlist {
  id: string;
  title: string;
  description: string;
  type: PlaylistType;
  coverImage: string; 
  gradient: string;
  songs: string[]; // Spotify track IDs
}

export const playlists: Playlist[] = [
  {
    id: 'energetic',
    title: 'Energetic Vibes',
    description: 'High-energy BTS songs to pump you up and get you moving.',
    type: 'mood',
    coverImage: '/images/playlists/energetic.jpg',
    gradient: 'from-purple-500 to-pink-500',
    songs: [
      '3ZbZtw3RBjQCQ4y3iyOtBp', // ON
      '1oOD1pV43cV9njZwJcYuNK', // Dynamite
      '5RK8pM8J6B0liC3NcuONXF', // FIRE
      '6A8MJBXzQOdU6eAK5ZVali', // MIC Drop
      '4ujb46N0U8PBIpw8LJPjNe', // IDOL
      '44t4lzaoXvtFQ8E0JXYnJx', // Not Today
      '5jggWuFjx1dmOLxVtQtFSB', // DOPE
      '2nFkXVEVZQrIMEEvkDEmm3', // DNA
      '3W1t6QWgOv0qKTkVMjfmTV', // Blood Sweat & Tears
      '6xkryXuiZU0wNSuowDLSMz', // Boy With Luv
    ]
  },
  {
    id: 'chill',
    title: 'Chill & Relax',
    description: 'Mellow BTS songs to help you unwind and relax.',
    type: 'mood',
    coverImage: '/images/playlists/chill.jpg',
    gradient: 'from-blue-400 to-teal-300',
    songs: [
      '4K44UcHzNdXLBhKl34EIYv', // Life Goes On
      '0WCio0cYL2J1MhxEd4c8fY', // Spring Day
      '3d8y0t70g7hw2FOWd7M2cW', // Magic Shop
      '5qW8cBFP0O6Q9oYnwJ5Heu', // The Truth Untold
      '3QqaaI5dV45mQuNvGbhYGh', // Blue & Grey
      '4m44qfDb2Kr2UMeLGW678D', // Butterfly
      '2FQ9HifnCQUfrXiWxRJ5LQ', // Awake
      '1K1Q81RwBj0oHNaYn3iDJj', // Euphoria
      '2rPE9SHXqHqKoXtqCxpFbP', // Serendipity
      '0un6jgyqs0pzBGcik1PbHl', // Singularity
    ]
  },
  {
    id: 'workout',
    title: 'Workout Power',
    description: 'The ultimate BTS workout playlist to keep you motivated.',
    type: 'activity',
    coverImage: '/images/playlists/workout.jpg',
    gradient: 'from-red-500 to-orange-400',
    songs: [
      '0xfZbqFS9ZIyXS34KsSGOr', // UGH!
      '0SF5kDrZxmKuLHdSGI7hRO', // GO GO
      '2jvuMDqBK04WvCYYz5qjvG', // Dionysus
      '3vQ0G2RNGqFuVx8HREZYyK', // So What
      '7qmM7gs5dJZggks76DQaJC', // Fake Love
      '5w4yLuQuJoOPHGLaWyFpps', // Danger
      '60sNu7VUIhQZpF1vU1ZrrZ', // Outro: Tear
      '04Ylx4kzHZHqUjrvZTFWx3', // Baepsae
      '74ZGbH8wkuCXKHCXGbFR0X', // Burning Up (FIRE)
      '1y4zsosWmH81iKOXOlH6YL', // IDOL (feat. Nicki Minaj)
    ]
  },
  {
    id: 'focus',
    title: 'Focus & Study',
    description: 'Calm, melodic BTS songs to help you concentrate and study.',
    type: 'activity',
    coverImage: '/images/playlists/focus.jpg',
    gradient: 'from-indigo-400 to-purple-300',
    songs: [
      '65FftemJ1DbbZ45DUfHJXE', // 134340
      '3m0y8qLoznUYi73SUBP8GI', // Rain
      '6eVtbkhQ5Jf7k2NHm4VnFq', // Trivia 轉: Seesaw
      '6RsGVBXv2ZfMXziM6dqpGC', // Autumn Leaves (고엽)
      '4Qs4e3RfQCVE8TydFexKOx', // Paradise
      '26NCGFvfZhJV8KGIkuawmr', // My Universe
      '4RcsZj6Tl3JZ4oRUVwV1sA', // 00:00 (Zero O'Clock)
      '3M6q2yhHugmPwyiiRHgVJ9', // Fly To My Room
      '5JZCu8dNEjDUUrN8hoEM7V', // We are Bulletproof: the Eternal
      '6wlfPwymGD76N82v1XfJrh', // Heartbeat
    ]
  },
  {
    id: 'emotional',
    title: 'Emotional Journey',
    description: 'BTS songs that touch your heart and soul.',
    type: 'mood',
    coverImage: '/images/playlists/emotional.jpg',
    gradient: 'from-sky-400 to-blue-600',
    songs: [
      '0WCio0cYL2J1MhxEd4c8fY', // Spring Day
      '0XzNKjkQfCeT0dJRN8Mb0N', // The Truth Untold
      '0CFUjNhkUcdF2QwqgDNlSH', // Black Swan
      '0LN0ASTtcGIbNTnjSHG6eT', // Moon
      '32OlwWuMpZ6b0aN2RZOeMS', // Filter
      '2oBMZYteeO8DH92C2Mkkne', // Epiphany
      '0dzwDw38mQVYJZIBphhAHa', // Film Out
      '7JrGf1ApqbP1BVJwAZjxpP', // Jamais Vu
      '1AE1we3kUo6y6TbQF4jIZJ', // Stigma
      '64CZlBIQUtiVxKg4oEKDfE', // Interlude: Shadow
    ]
  },
  {
    id: 'hyyh',
    title: 'HYYH Era Classics',
    description: 'Essential tracks from BTS\' "The Most Beautiful Moment in Life" era.',
    type: 'era',
    coverImage: '/images/playlists/hyyh.jpg',
    gradient: 'from-amber-400 to-orange-500',
    songs: [
      '0WCio0cYL2J1MhxEd4c8fY', // Spring Day
      '0SF5kDrZxmKuLHdSGI7hRO', // I NEED U
      '4m44qfDb2Kr2UMeLGW678D', // Run
      '5qW8cBFP0O6Q9oYnwJ5Heu', // Butterfly
      '6RsGVBXv2ZfMXziM6dqpGC', // Autumn Leaves (고엽)
      '3m0y8qLoznUYi73SUBP8GI', // Rain
      '5jggWuFjx1dmOLxVtQtFSB', // DOPE
      '1qCQTy2N99vDVV4cpp1gUu', // Save ME
      '6cWoKHpzlqlVcUhJiSjgSq', // Epilogue: Young Forever
      '7d7UL2I4EEFTiJxe9Rjilx', // Whalien 52
    ]
  },
  {
    id: 'love-yourself',
    title: 'Love Yourself Series',
    description: 'Journey through BTS\' introspective Love Yourself series.',
    type: 'era',
    coverImage: '/images/playlists/love-yourself.jpg',
    gradient: 'from-pink-400 to-pink-600',
    songs: [
      '6xkryXuiZU0wNSuowDLSMz', // Boy With Luv
      '7qmM7gs5dJZggks76DQaJC', // Fake Love
      '2nFkXVEVZQrIMEEvkDEmm3', // DNA
      '0XzNKjkQfCeT0dJRN8Mb0N', // The Truth Untold
      '1K1Q81RwBj0oHNaYn3iDJj', // Euphoria
      '2rPE9SHXqHqKoXtqCxpFbP', // Serendipity
      '0un6jgyqs0pzBGcik1PbHl', // Singularity
      '5RCkZKOV4SHEcUjP4R1wRe', // IDOL
      '1AE1we3kUo6y6TbQF4jIZJ', // Trivia 承: Love
      '60sNu7VUIhQZpF1vU1ZrrZ', // Outro: Tear
    ]
  },
  {
    id: 'happy',
    title: 'Happy Vibes',
    description: 'Upbeat and joyful BTS songs to brighten your day.',
    type: 'mood',
    coverImage: '/images/playlists/happy.jpg',
    gradient: 'from-yellow-300 to-yellow-500',
    songs: [
      '1oOD1pV43cV9njZwJcYuNK', // Dynamite
      '0t1PBZZxOORpFeTP1b2u7a', // Permission to Dance
      '6xkryXuiZU0wNSuowDLSMz', // Boy With Luv
      '3vQ0G2RNGqFuVx8HREZYyK', // So What
      '0SF5kDrZxmKuLHdSGI7hRO', // GO GO
      '73tqiEw59PeM9JUy7XT2Oz', // Like
      '5qDCzyDn8qT9VIt5ZkUABa', // 21st Century Girl
      '23G7WTVxJjZrJWjZtG8VHg', // Butter
      '2v3BJs0GIn0ZQYLiTRrFrD', // Just One Day
      '5kY83aWAl1tLaGJAhexvVf', // Best Of Me
    ]
  }
];

export const getPlaylistById = (id: string): Playlist | undefined => {
  return playlists.find(playlist => playlist.id === id);
};

export const getPlaylistsByType = (type: PlaylistType): Playlist[] => {
  return playlists.filter(playlist => playlist.type === type);
};

export const getAllPlaylistTypes = (): PlaylistType[] => {
  const types = new Set<PlaylistType>();
  playlists.forEach(playlist => types.add(playlist.type));
  return Array.from(types);
};

export const searchPlaylists = (query: string): Playlist[] => {
  const lowercaseQuery = query.toLowerCase();
  return playlists.filter(playlist => 
    playlist.title.toLowerCase().includes(lowercaseQuery) || 
    playlist.description.toLowerCase().includes(lowercaseQuery)
  );
}; 