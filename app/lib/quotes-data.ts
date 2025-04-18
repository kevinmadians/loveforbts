export type QuoteCategory = 'lyric' | 'interview' | 'speech';

export interface BTSQuote {
  text: string;
  source: string;
  member?: string;
  year?: string;
  category: QuoteCategory;
  translation?: string;
}

export const btsQuotes: BTSQuote[] = [
  // RM Quotes
  {
    text: "Your presence can give happiness. I hope you remember that.",
    source: "Love Yourself Concert",
    member: "RM",
    year: "2018",
    category: "speech"
  },
  {
    text: "What's good is good for me, and what's bad is bad for me. Just because someone else is having a hard time, doesn't mean my own hard times are invalidated.",
    source: "VLive",
    member: "RM",
    year: "2018",
    category: "interview"
  },
  {
    text: "Even when this rain stops, when clouds go away, I stand here, with you.",
    source: "Forever Rain",
    member: "RM",
    year: "2018",
    category: "lyric"
  },
  {
    text: "We're all in different ships, but we're sailing in the same storm.",
    source: "United Nations Speech",
    member: "RM",
    year: "2021",
    category: "speech"
  },
  {
    text: "The stars shine brightest when the night is darkest.",
    source: "Mikrokosmos",
    member: "RM",
    year: "2019",
    category: "lyric"
  },

  // Jin Quotes
  {
    text: "When things get tough, look at the people who love you.",
    source: "Muster Fan Meeting",
    member: "Jin",
    year: "2019",
    category: "speech"
  },
  {
    text: "If you want to love others, I think you should love yourself first.",
    source: "Love Yourself Concert",
    member: "Jin",
    year: "2018",
    category: "speech"
  },
  {
    text: "I want to relieve your pain—even if I have to take it all.",
    source: "Awake",
    member: "Jin",
    year: "2016",
    category: "lyric"
  },
  {
    text: "Worldwide Handsome, you know?",
    source: "Interview",
    member: "Jin",
    year: "2017",
    category: "interview"
  },
  {
    text: "Life is tough, and things don't always work out well, but we should be brave and go on with our lives.",
    source: "Weverse Magazine",
    member: "Jin",
    year: "2021",
    category: "interview"
  },

  // Suga Quotes
  {
    text: "If you can't respect, don't even open your mouth.",
    source: "Agust D",
    member: "Suga",
    year: "2016",
    category: "lyric"
  },
  {
    text: "The dawn right before the sun rises is the darkest.",
    source: "Tomorrow",
    member: "Suga",
    year: "2014",
    category: "lyric"
  },
  {
    text: "If you think you're going to crash, accelerate even more.",
    source: "Interlude: Shadow",
    member: "Suga",
    year: "2020",
    category: "lyric"
  },
  {
    text: "Don't be trapped in someone else's dream.",
    source: "Graduation Speech",
    member: "Suga",
    year: "2017",
    category: "speech"
  },
  {
    text: "Life is like a scaled model of something bigger—are you going to give up creating it?",
    source: "First Love",
    member: "Suga",
    year: "2016",
    category: "lyric"
  },

  // J-Hope Quotes
  {
    text: "You can try to find happiness in a different way than others. Everyone has their own way.",
    source: "Bangtan Bomb",
    member: "J-Hope",
    year: "2019",
    category: "interview"
  },
  {
    text: "I believe that there's no growth without pain.",
    source: "Wings Tour",
    member: "J-Hope",
    year: "2017",
    category: "speech"
  },
  {
    text: "Even in the far future, I'll be by your side.",
    source: "Just Dance",
    member: "J-Hope",
    year: "2018",
    category: "lyric"
  },
  {
    text: "It's okay to not have a dream as long as you're happy.",
    source: "Hope World",
    member: "J-Hope",
    year: "2018",
    category: "lyric"
  },
  {
    text: "When things get hard, stop for a while and look back to see how far you've come. Don't forget how rewarding it is.",
    source: "MAMA 2018",
    member: "J-Hope",
    year: "2018",
    category: "speech"
  },

  // Jimin Quotes
  {
    text: "You are the cause of my euphoria.",
    source: "Euphoria",
    member: "Jimin",
    year: "2018",
    category: "lyric"
  },
  {
    text: "I want to show the world that my strength comes from my wounds.",
    source: "SBS Interview",
    member: "Jimin",
    year: "2020",
    category: "interview"
  },
  {
    text: "I'd rather die than live without passion.",
    source: "Blood Sweat & Tears",
    member: "Jimin",
    year: "2016",
    category: "lyric"
  },
  {
    text: "Even if you feel like drying up, believe in what you're protecting and keep going.",
    source: "V App Broadcast",
    member: "Jimin",
    year: "2019",
    category: "interview"
  },
  {
    text: "I believe that dreams and happiness aren't something you achieve but something you keep working toward.",
    source: "Face Yourself",
    member: "Jimin",
    year: "2018",
    category: "interview"
  },

  // V Quotes
  {
    text: "I'm your hope, you're my hope, I'm j-hope.",
    source: "Introduction",
    member: "J-Hope",
    year: "2013",
    category: "speech"
  },
  {
    text: "Even the brightest stars can't shine without darkness.",
    source: "Stigma",
    member: "V",
    year: "2016",
    category: "lyric"
  },
  {
    text: "Purple is the last color of the rainbow. Purple means I will trust and love you for a long time.",
    source: "Muster Fan Meeting",
    member: "V",
    year: "2016",
    category: "speech"
  },
  {
    text: "If you don't love yourself, you can never love anyone else.",
    source: "Singularity",
    member: "V",
    year: "2018",
    category: "lyric"
  },
  {
    text: "In a world of liars, I need something real.",
    source: "Winter Bear",
    member: "V",
    year: "2019",
    category: "lyric"
  },

  // Jungkook Quotes
  {
    text: "You gave me the best of me, so you'll give you the best of you.",
    source: "Magic Shop",
    member: "Jungkook",
    year: "2018",
    category: "lyric"
  },
  {
    text: "Rather than worrying about others, put your own life first. Get your own life sorted, then help others.",
    source: "Bon Voyage",
    member: "Jungkook",
    year: "2017",
    category: "interview"
  },
  {
    text: "I'd rather be happy, thinking about whether I'm happy right now, than becoming unhappy trying to achieve happiness.",
    source: "Billboard Interview",
    member: "Jungkook",
    year: "2018",
    category: "interview"
  },
  {
    text: "Don't be trapped in someone else's dream.",
    source: "No More Dream",
    member: "Jungkook",
    year: "2013",
    category: "lyric"
  },
  {
    text: "Let's not push off the things you need to do today for tomorrow.",
    source: "Fan Meeting",
    member: "Jungkook",
    year: "2019",
    category: "speech"
  },

  // Group Quotes
  {
    text: "We still need to find our place in the world. Don't forget your beginnings.",
    source: "Born Singer",
    category: "lyric",
    year: "2013"
  },
  {
    text: "Love yourself, love myself, peace.",
    source: "Answer: Love Myself",
    category: "lyric",
    year: "2018"
  },
  {
    text: "Life is a series of choices. Live it well, like a gem.",
    source: "ON",
    category: "lyric",
    year: "2020"
  },
  {
    text: "The power of the dreams you have when you're young can make a miracle.",
    source: "No More Dream",
    category: "lyric",
    year: "2013"
  },
  {
    text: "Even if you feel like nothing, you are still part of this world that's spinning.",
    source: "Zero O'Clock",
    category: "lyric",
    year: "2020"
  },
  {
    text: "You can lean on me, you can trust in me, I'll be there.",
    source: "2!3!",
    category: "lyric",
    year: "2016"
  },
  {
    text: "When you love someone, small things become meaningful.",
    source: "Spring Day",
    category: "lyric",
    year: "2017"
  },
  {
    text: "You got me, I got you, so we'll be alright.",
    source: "Magic Shop",
    category: "lyric",
    year: "2018"
  },
  {
    text: "We are not seven, we are one.",
    source: "We Are Bulletproof: The Eternal",
    category: "lyric",
    year: "2020"
  },
  {
    text: "Even when I fall and hurt myself, I keep running toward my dream.",
    source: "Run",
    category: "lyric",
    year: "2015"
  }
];

export function getRandomQuote(): BTSQuote {
  const randomIndex = Math.floor(Math.random() * btsQuotes.length);
  return btsQuotes[randomIndex];
}

export function getQuoteOfTheDay(): BTSQuote {
  // Calculate a consistent index based on the current date
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  
  // Create a simple hash of the date string to get a consistent index
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to get a consistent quote for the day
  const index = Math.abs(hash) % btsQuotes.length;
  return btsQuotes[index];
}

export function getQuotesByMember(member: string): BTSQuote[] {
  return btsQuotes.filter(quote => quote.member === member);
}

export function getQuotesByCategory(category: QuoteCategory): BTSQuote[] {
  return btsQuotes.filter(quote => quote.category === category);
} 