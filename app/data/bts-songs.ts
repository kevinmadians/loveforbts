export interface BTSSong {
  title: string;
  album?: string;
  year?: number;
  isTitleTrack?: boolean;
}

export interface BTSSongData {
  albumArt: string;
  spotifyLink: string;
}

export const btsSongs: Record<string, BTSSongData> = {
  // Group Albums
  "No More Dream": {
    albumArt: "/images/albums/2-cool-4-skool.jpg",
    spotifyLink: "https://open.spotify.com/track/4frlkLwlnm58ejpNwWjxyl"
  },
  "N.O": {
    albumArt: "/images/albums/orul82.jpg",
    spotifyLink: "https://open.spotify.com/track/7JosxtkCqIQieNWXA2Dj3v"
  },
  "Boy In Luv": {
    albumArt: "/images/albums/skool-luv-affair.jpg",
    spotifyLink: "https://open.spotify.com/track/3FnDv33WrrMtuEr7hNR3ev"
  },
  "Just One Day": {
    albumArt: "/images/albums/skool-luv-affair.jpg",
    spotifyLink: "https://open.spotify.com/track/6r5fBrGgp4BoXeFJvODY7p"
  },
  "Tomorrow": {
    albumArt: "/images/albums/skool-luv-affair.jpg",
    spotifyLink: "https://open.spotify.com/track/2XcmjvBkX5xRRPOFN0GzTG"
  },
  "Jump": {
    albumArt: "/images/albums/skool-luv-affair.jpg",
    spotifyLink: "https://open.spotify.com/track/7GUg2fMRVWVnZp8MUoq1j6"
  },
  "Danger": {
    albumArt: "/images/albums/dark-and-wild.jpg",
    spotifyLink: "https://open.spotify.com/track/6K6SuYQOjN6V8CgZqLoyaH"
  },
  "War of Hormone": {
    albumArt: "/images/albums/dark-and-wild.jpg",
    spotifyLink: "https://open.spotify.com/track/4K6nYODsGYN2JW0L4rhCOI"
  },
  "Let Me Know": {
    albumArt: "/images/albums/dark-and-wild.jpg",
    spotifyLink: "https://open.spotify.com/track/5DhB2w0LhSZ9QW7MwB3O6c"
  },
  "Rain": {
    albumArt: "/images/albums/dark-and-wild.jpg",
    spotifyLink: "https://open.spotify.com/track/6lVoKdCGIgwrHZfzKo8z3w"
  },
  "I Need U": {
    albumArt: "/images/albums/hyyh-pt1.jpg",
    spotifyLink: "https://open.spotify.com/track/6HQEX0Y5FU7bP9eWGw6yy8"
  },
  "Dope": {
    albumArt: "/images/albums/hyyh-pt1.jpg",
    spotifyLink: "https://open.spotify.com/track/0a3iwFy3PDUC6I1QUWKvzV"
  },
  "Hold Me Tight": {
    albumArt: "/images/albums/hyyh-pt1.jpg",
    spotifyLink: "https://open.spotify.com/track/1WGkAj4W1V9fT7GKo8EEsq"
  },
  "Run": {
    albumArt: "/images/albums/hyyh-pt2.jpg",
    spotifyLink: "https://open.spotify.com/track/4X3rjxm9KJg2GqTAj6PJ5k"
  },
  "Butterfly": {
    albumArt: "/images/albums/hyyh-pt2.jpg",
    spotifyLink: "https://open.spotify.com/track/6OONqOBmJGJDPcR6zY5KPD"
  },
  "Whalien 52": {
    albumArt: "/images/albums/hyyh-pt2.jpg",
    spotifyLink: "https://open.spotify.com/track/29DH7Zi4NVAqrJEzPSMiud"
  },
  "Autumn Leaves": {
    albumArt: "/images/albums/hyyh-pt2.jpg",
    spotifyLink: "https://open.spotify.com/track/0ADrfWcsacOQe1zlshNJ2C"
  },
  "Fire": {
    albumArt: "/images/albums/young-forever.jpg",
    spotifyLink: "https://open.spotify.com/track/4hjqR02PqSS9xGZXzziWb8"
  },
  "Save Me": {
    albumArt: "/images/albums/young-forever.jpg",
    spotifyLink: "https://open.spotify.com/track/7smZU6SLQdJJrm2dZNFo4g"
  },
  "Blood Sweat & Tears": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/7MghAO4QJG6hWe5KQOj6vO"
  },
  "Lost": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/7sXINEV8wnKlkBYoKc3R88"
  },
  "21st Century Girl": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/1YW2iL4gFAUnG6owu6W8eE"
  },
  "2! 3!": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/1VCuHYlZwLQ8YCBNGGDaDl"
  },
  "Spring Day": {
    albumArt: "/images/albums/you-never-walk-alone.jpg",
    spotifyLink: "https://open.spotify.com/track/1T8lAkjRkN6b9tKOSEp9JI"
  },
  "Not Today": {
    albumArt: "/images/albums/you-never-walk-alone.jpg",
    spotifyLink: "https://open.spotify.com/track/5vVlFCa7TcL7mYuT9LpNUi"
  },
  "DNA": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/3XKM6wPDPaACr8fjN7lBGN"
  },
  "Best of Me": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/7lCWkWFjPPHgL6Z36Pf6Jm"
  },
  "Dimple": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/0M4kXNzL09oeNJ7p5lsGhG"
  },
  "Pied Piper": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/72Y1lTRzGJxrGlXyLnWpPf"
  },
  "MIC Drop": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/6ELDuHIVSMhFwn6vZ5t9uW"
  },
  "Go Go": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/4GRsT8J71vhkEqq4bS7SbS"
  },
  "Fake Love": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/62KY9jXhbLzqSNgNP6zr7V"
  },
  "The Truth Untold": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/2Gyd0YKLPAWqgEFe6VyggG"
  },
  "134340": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/7HlvnPmKIDkz8CHWAS0c6n"
  },
  "Paradise": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/6MpP2qzKhNkQiNMFIUzD8K"
  },
  "Love Maze": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/1j8vUkfOC0nXN6cPYcaRuq"
  },
  "Magic Shop": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/2UONHxQ1VIjWi8dA7TCa2t"
  },
  "Airplane Pt.2": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/1SH8kINfYPmhDt2idN8UNN"
  },
  "Anpanman": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/3pDlOPLiF6lOJ3UImh0m7M"
  },
  "So What": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/1xVcL0V8P1VBPSPUyE1z7J"
  },
  "IDOL": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/5t2M8DtzWjSvw6GzZJZzgJ"
  },
  "I'm Fine": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/7tDJ5VndrAVzqZ1vKVXOBR"
  },
  "Answer: Love Myself": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/7QBjmJcfI1B9Qy9qNlRPas"
  },
  "Boy With Luv": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/2XC5wta1NYSNaS5zjmdbFp"
  },
  "Mikrokosmos": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/4CIxOcXUZCv5G8wPdKQ1SZ"
  },
  "Make It Right": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/0eWNZoZuKCuPvJnYbKRHtG"
  },
  "HOME": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/3wWX2JCGhDQpjZdYrPgjpE"
  },
  "Jamais Vu": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/0EiqNXCKJWNEFnDYnCE4LZ"
  },
  "Dionysus": {
    albumArt: "/images/albums/map-of-the-soul-persona.jpg",
    spotifyLink: "https://open.spotify.com/track/1J2xDgXzGZyL74YTOtV0pn"
  },
  "ON": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/3xtT4uuFHUKDZYgUKHvSKH"
  },
  "Black Swan": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/0DpJmULqYpLOJASDj7WRw4"
  },
  "My Time": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/1p1lJhiO95CU0jTaVhNFJQ"
  },
  "Filter": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/2FNV3hRcZMRFp0OhqHQjcG"
  },
  "Inner Child": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/5uAcgR8l4gRjcMN4vOvIUy"
  },
  "Friends": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/2X5pCgDqJEJdNYgCPCw8rW"
  },
  "Moon": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/2zHNShw7sWB3FFtZdWr6Gd"
  },
  "Outro: Ego": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/7L8LRjuQBjZiZlKPKz5bMM"
  },
  "UGH!": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/7vR3vdnqvHmZsKK1KQ8m8m"
  },
  "Respect": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/0v1P2jjE5nzkwm0kNKdKpf"
  },
  "Louder than bombs": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/7LevKGsZWiMjQhXa4RmGq6"
  },
  "00:00 (Zero O'Clock)": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/7MaM1B56pqMoE4h5BhKDQI"
  },
  "We are Bulletproof: the Eternal": {
    albumArt: "/images/albums/map-of-the-soul-7.jpg",
    spotifyLink: "https://open.spotify.com/track/5vVw6lBaBUIpUOafSnJzNG"
  },
  "Dynamite": {
    albumArt: "/images/albums/dynamite.jpg",
    spotifyLink: "https://open.spotify.com/track/5QDLhrAOJJdNAmCTJ8xMyW"
  },
  "Life Goes On": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/7ksUlOtVlVPsC0tBwVl2D9"
  },
  "Fly To My Room": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/0PpLtXqe1KDgm5XtRgO9hK"
  },
  "Blue & Grey": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/7LnOD9Dq7QhCdjKnvOYHFQ"
  },
  "Telepathy": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/31H9oUAiOkF6g1Mk8rMI8Y"
  },
  "Dis-ease": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/5bJ8c0eKJx7P5OzUtUJi7U"
  },
  "Stay": {
    albumArt: "/images/albums/be.jpg",
    spotifyLink: "https://open.spotify.com/track/1P8dkGSyudaFYrfMb4QQs9"
  },
  "Butter": {
    albumArt: "/images/albums/butter.jpg",
    spotifyLink: "https://open.spotify.com/track/29Ddb1R5eaWjBcQyC4TfUg"
  },
  "Permission to Dance": {
    albumArt: "/images/albums/permission-to-dance.jpg",
    spotifyLink: "https://open.spotify.com/track/7JjPUoGGCBf16u9lvvjNPL"
  },
  "My Universe": {
    albumArt: "/images/albums/my-universe.jpg",
    spotifyLink: "https://open.spotify.com/track/3FeVmId7tL5YN8B7R3imoM"
  },
  "Yet To Come": {
    albumArt: "/images/albums/proof.jpg",
    spotifyLink: "https://open.spotify.com/track/0GSSdIzDOmnCnq5SQPgHOh"
  },
  "Run BTS": {
    albumArt: "/images/albums/proof.jpg",
    spotifyLink: "https://open.spotify.com/track/7JQgkTe5HfgYnS4rMxW0mF"
  },
  "Born Singer": {
    albumArt: "/images/albums/proof.jpg",
    spotifyLink: "https://open.spotify.com/track/0R60NqL4bF6TqFJpb1OmPE"
  },

  // Solo Works - Jin
  "The Astronaut": {
    albumArt: "/images/albums/astronaut.jpg",
    spotifyLink: "https://open.spotify.com/track/3Wrjm47oTz2sjIgck11l5e"
  },
  "Super Tuna": {
    albumArt: "/images/albums/jin-super-tuna.jpg",
    spotifyLink: "https://open.spotify.com/track/1evJfEbZBvxp6x3zBHC0TZ"
  },
  "Awake": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/5Rm9nOXiCQ9x5i5N9Y9m9L"
  },
  "Epiphany": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/35jPPqrX3Z5nWqKBN3OEVc"
  },

  // Solo Works - SUGA/Agust D
  "Daechwita": {
    albumArt: "/images/albums/suga-d-2.jpg",
    spotifyLink: "https://open.spotify.com/track/1A6QjA2jQNKu3K85xEvCHj"
  },
  "People": {
    albumArt: "/images/albums/suga-d-2.jpg",
    spotifyLink: "https://open.spotify.com/track/0LsNjn3ej0TFD1CQi7H3ZL"
  },
  "Haegeum": {
    albumArt: "/images/albums/suga-d-day.jpg",
    spotifyLink: "https://open.spotify.com/track/3xKsf9qdS1CyvXSMEid6g8"
  },
  "That That": {
    albumArt: "/images/albums/suga-that-that.jpg",
    spotifyLink: "https://open.spotify.com/track/6QEjag3gRSaqFj2xJNIJPk"
  },
  "Trivia: Seesaw": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/7qE2lx0DlgHTT7EqCqfpz1"
  },

  // Solo Works - J-Hope
  "Daydream": {
    albumArt: "/images/albums/hope-world.jpg",
    spotifyLink: "https://open.spotify.com/track/6SfWgKQXLlrZhQRqOEfNTU"
  },
  "MORE": {
    albumArt: "/images/albums/jack-in-the-box.jpg",
    spotifyLink: "https://open.spotify.com/track/2OEEbvLIkE6FBQdl0GQBEY"
  },
  "Arson": {
    albumArt: "/images/albums/jack-in-the-box.jpg",
    spotifyLink: "https://open.spotify.com/track/3QJjPCH8nH4OtGK4MQbBpk"
  },
  "On the Street": {
    albumArt: "/images/albums/on-the-street.jpg",
    spotifyLink: "https://open.spotify.com/track/1Qrg8KqiBpW07V7PNxwwRR"
  },
  "Chicken Noodle Soup": {
    albumArt: "/images/albums/chicken-noodle-soup.jpg",
    spotifyLink: "https://open.spotify.com/track/2kzztXyUgC0Mc9gGBPRIW2"
  },
  "Trivia: Just Dance": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/3LtNBIzjGKFczbEF9UU9Kv"
  },

  // Solo Works - RM
  "Wild Flower": {
    albumArt: "/images/albums/rm-indigo.jpg",
    spotifyLink: "https://open.spotify.com/track/74bTdKGH9D6LrDCzYD5Zr6"
  },
  "Moonchild": {
    albumArt: "/images/albums/mono.jpg",
    spotifyLink: "https://open.spotify.com/track/2EYbwjmOKJFoY7RlLjJkpu"
  },
  "Trivia: Love": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/5R2WQhvvGtxFfRJ3zTdyir"
  },

  // Solo Works - Jimin
  "Like Crazy": {
    albumArt: "/images/albums/jimin-face.jpg",
    spotifyLink: "https://open.spotify.com/track/5K4W6rqBFWDnAN6FQUkS6x"
  },
  "Set Me Free Pt.2": {
    albumArt: "/images/albums/jimin-face.jpg",
    spotifyLink: "https://open.spotify.com/track/4Mj7DGSdubJ1U4pIgKoEo1"
  },
  "Promise": {
    albumArt: "/images/albums/jimin-promise.jpg",
    spotifyLink: "https://open.spotify.com/track/1WVKNnOqYSdkYF5Y1dLaUG"
  },
  "Who": {
    albumArt: "/images/albums/jimin-muse.jpg",
    spotifyLink: "https://open.spotify.com/track/7JW37qIx3WO4JQuOPQpTOQ"
  },
  "Lie": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/5Vp6l3GBnFHSyLOElzc2OJ"
  },
  "Serendipity": {
    albumArt: "/images/albums/love-yourself-her.jpg",
    spotifyLink: "https://open.spotify.com/track/5ExGSPJQNEiQaJEQJX15Ol"
  },

  // Solo Works - V
  "Slow Dancing": {
    albumArt: "/images/albums/v-layover.jpg",
    spotifyLink: "https://open.spotify.com/track/1rOPez9OmPEZ7MZjjKekod"
  },
  "Love Me Again": {
    albumArt: "/images/albums/v-layover.jpg",
    spotifyLink: "https://open.spotify.com/track/2OLyYMCaM8OeIVNQVGDo7l"
  },
  "Christmas Tree": {
    albumArt: "/images/albums/christmas-tree.jpg",
    spotifyLink: "https://open.spotify.com/track/0l8T8wC6tIGjxW2ZZqwfLZ"
  },
  "Winter Bear": {
    albumArt: "/images/albums/winter-bear.jpg",
    spotifyLink: "https://open.spotify.com/track/6JUqhZBajCgL26t5y6TZCr"
  },
  "Stigma": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/2JLj7fExRyEFEgfyqyGCsK"
  },
  "Singularity": {
    albumArt: "/images/albums/love-yourself-tear.jpg",
    spotifyLink: "https://open.spotify.com/track/4K9D8STPKJz8j1GKAf8k4c"
  },

  // Solo Works - Jungkook
  "Standing Next To You": {
    albumArt: "/images/albums/jungkook-golden.jpg",
    spotifyLink: "https://open.spotify.com/track/5jQI2r1RdgtuT8S3iG8zFC"
  },
  "Seven": {
    albumArt: "/images/albums/seven.jpg",
    spotifyLink: "https://open.spotify.com/track/560DamWP20uzLNhLb1HIlJ"
  },
  "3D": {
    albumArt: "/images/albums/3d.jpg",
    spotifyLink: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
  },
  "Dreamers": {
    albumArt: "/images/albums/dreamers.jpg",
    spotifyLink: "https://open.spotify.com/track/4l4wV4ITAkStgZfwJ0fDOV"
  },
  "Still With You": {
    albumArt: "/images/albums/still-with-you.jpg",
    spotifyLink: "https://open.spotify.com/track/36O8Pt3BHdyoIHYhxLcFZS"
  },
  "Euphoria": {
    albumArt: "/images/albums/love-yourself-answer.jpg",
    spotifyLink: "https://open.spotify.com/track/0nrRP2bk19rLc0orkWPQk2"
  },
  "Begin": {
    albumArt: "/images/albums/wings.jpg",
    spotifyLink: "https://open.spotify.com/track/4x6J4FhW3pPVPk6lVRDAfL"
  },
  "Left and Right": {
    albumArt: "/images/albums/left-and-right.jpg",
    spotifyLink: "https://open.spotify.com/track/7wBJfHzpfI3032CSD7CE2m"
  }
};

// Convert to array format for backward compatibility
export const btsArraySongs: BTSSong[] = Object.keys(btsSongs).map(title => ({
  title,
  album: "",
  year: 2013,
  isTitleTrack: false
}));

export const searchBTSSongs = (query: string): BTSSong[] => {
  const searchTerm = query.toLowerCase();
  return btsArraySongs.filter(song => 
    song.title.toLowerCase().includes(searchTerm) ||
    song.album?.toLowerCase().includes(searchTerm)
  );
};