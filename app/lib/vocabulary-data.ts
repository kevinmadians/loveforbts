export type VocabularyCategory = 'fandom' | 'meme' | 'song' | 'inside-joke' | 'nickname' | 'phrase';

export interface VocabularyTerm {
  term: string;
  definition: string;
  example?: string;
  source?: string;
  category: VocabularyCategory;
  relatedMembers?: string[];
  year?: string;
  emoji?: string;
}

export const vocabularyTerms: VocabularyTerm[] = [
  // Fandom Terms
  {
    term: "ARMY",
    definition: "The official name of BTS's fandom. It stands for 'Adorable Representative M.C. for Youth' and also symbolizes how ARMY and BTS are always together, as an actual army is always with the bullet-proof vest (BTS).",
    category: "fandom",
    year: "2013",
    source: "Official BTS fan club announcement",
    emoji: "💜"
  },
  {
    term: "Bangtan",
    definition: "Short for Bangtan Sonyeondan (방탄소년단), BTS's Korean name meaning 'Bulletproof Boy Scouts'.",
    category: "fandom",
    year: "2013",
    source: "BTS's debut introduction"
  },
  {
    term: "I Purple You",
    definition: "A phrase coined by V meaning 'I will trust and love you for a long time'. Purple is the last color of the rainbow, symbolizing long-lasting love.",
    example: "V told fans at a concert: \"I purple you!\"",
    category: "phrase",
    relatedMembers: ["V"],
    year: "2016",
    source: "BTS 3rd Muster fan meeting",
    emoji: "💜"
  },
  {
    term: "Bias",
    definition: "A fan's favorite member of a K-pop group.",
    example: "Jungkook is my bias in BTS.",
    category: "fandom",
    emoji: "❤️"
  },
  {
    term: "Bias Wrecker",
    definition: "A member who threatens to become your new bias by being particularly appealing or charming.",
    example: "Jin keeps bias wrecking me with his worldwide handsome visuals!",
    category: "fandom",
    emoji: "💔"
  },
  
  // Nicknames
  {
    term: "Worldwide Handsome",
    definition: "Jin's self-proclaimed nickname highlighting his visual appeal on a global scale.",
    example: "Jin introduced himself as 'Worldwide Handsome Jin' during interviews.",
    category: "nickname",
    relatedMembers: ["Jin"],
    year: "2017",
    source: "Jin first used this at the 2017 Billboard Music Awards",
    emoji: "👑"
  },
  {
    term: "Golden Maknae",
    definition: "Jungkook's nickname that acknowledges his talent in multiple areas despite being the youngest member.",
    category: "nickname",
    relatedMembers: ["Jungkook"],
    source: "Given by members during early interviews",
    emoji: "🥇"
  },
  {
    term: "God of Destruction",
    definition: "A nickname for Jungkook due to his tendency to accidentally break things.",
    category: "nickname",
    relatedMembers: ["Jungkook"],
    source: "From several Run BTS episodes where he broke equipment",
    emoji: "💥"
  },
  {
    term: "Minstradamus",
    definition: "Nickname for Suga (Min Yoongi) referencing Nostradamus, as many of his predictions about BTS's success came true.",
    category: "nickname",
    relatedMembers: ["Suga"],
    source: "Fan-created after Suga's predictions about Billboard success came true",
    emoji: "🔮"
  },
  {
    term: "Sunshine",
    definition: "J-Hope's nickname due to his bright and positive personality.",
    category: "nickname",
    relatedMembers: ["J-Hope"],
    source: "Given by fans and acknowledged by members",
    emoji: "☀️"
  },
  {
    term: "Joonie",
    definition: "Affectionate nickname for RM (Namjoon) used by fans and members.",
    category: "nickname",
    relatedMembers: ["RM"],
    emoji: "🧠"
  },
  {
    term: "Mochi",
    definition: "Jimin's nickname due to his soft, squishy cheeks that resemble mochi (Japanese rice cake).",
    category: "nickname",
    relatedMembers: ["Jimin"],
    source: "Given by fans, acknowledged by members in Run BTS episodes",
    emoji: "🍡"
  },
  {
    term: "TaeTae",
    definition: "Affectionate nickname for V (Taehyung).",
    category: "nickname",
    relatedMembers: ["V"],
    emoji: "🐯"
  },
  
  // Memes & Inside Jokes
  {
    term: "It's a Bighit Thing",
    definition: "A phrase ARMYs use to explain unusual or unexplainable decisions made by BTS's company.",
    category: "meme",
    source: "Fan community response to unexpected company decisions"
  },
  {
    term: "Eat Jin",
    definition: "A series where Jin livestreams himself eating and chatting with fans.",
    category: "inside-joke",
    relatedMembers: ["Jin"],
    source: "Self-created series by Jin on V Live platform",
    emoji: "🍽️"
  },
  {
    term: "Moon Child",
    definition: "A nickname for RM based on his love for the night and his solo song 'Moonchild'.",
    category: "nickname",
    relatedMembers: ["RM"],
    source: "From RM's 2018 mixtape mono, track 'moonchild'",
    emoji: "🌙"
  },
  {
    term: "Finger Heart",
    definition: "A gesture made by crossing the thumb and index finger to form a small heart shape, popularized by V.",
    category: "inside-joke",
    relatedMembers: ["V"],
    source: "Korean entertainment gesture that V helped popularize globally",
    emoji: "🫰"
  },
  {
    term: "Jimin, you got no jams",
    definition: "A phrase RM said to Jimin. 'Jams' is Korean slang for 'fun/humor', so RM was saying Jimin isn't funny.",
    category: "meme",
    relatedMembers: ["RM", "Jimin"],
    source: "American Hustle Life (2014) reality show",
    emoji: "😐"
  },
  {
    term: "Borahae",
    definition: "A combination of the Korean words 'borasaek' (purple) and 'saranghae' (I love you). Created by V to mean 'I purple you'.",
    category: "phrase",
    relatedMembers: ["V"],
    year: "2016",
    source: "BTS 3rd Muster fan meeting",
    emoji: "💜"
  },
  {
    term: "CARMYs",
    definition: "ARMY who became fans during or after the Carpool Karaoke with James Corden.",
    category: "fandom",
    year: "2020",
    source: "Fan community term after BTS's appearance on The Late Late Show",
    emoji: "🚗"
  },
  {
    term: "HYBE Boy",
    definition: "A term used when BTS members act like company representatives by promoting HYBE (their company) products or initiatives.",
    category: "meme",
    source: "Fan community term after Big Hit Entertainment became HYBE"
  },
  
  // Phrases & Song References
  {
    term: "Love Yourself",
    definition: "A core message in BTS's music and a trilogy of albums (Love Yourself: Her, Tear, and Answer).",
    category: "phrase",
    year: "2017-2018",
    source: "Album series and UNICEF campaign name",
    emoji: "💕"
  },
  {
    term: "Satoori",
    definition: "Korean regional dialects. Members often show their hometown dialects, especially in their song 'Satoori Rap'.",
    category: "song",
    source: "Track on O!RUL8,2? album (2013)",
    emoji: "🗣️"
  },
  {
    term: "MicDrop",
    definition: "One of BTS's iconic songs, but also used when a member says something impactful and final.",
    example: "RM ended his speech with a powerful statement - total mic drop moment!",
    category: "song",
    year: "2017",
    source: "Track on Love Yourself: Her album",
    emoji: "🎤"
  },
  {
    term: "Cypher",
    definition: "A series of rap tracks by BTS's rap line (RM, Suga, and J-Hope) featured across multiple albums.",
    category: "song",
    relatedMembers: ["RM", "Suga", "J-Hope"],
    source: "Series starting from 2013's O!RUL8,2? through Wings albums",
    emoji: "🔥"
  },
  {
    term: "Namjooning",
    definition: "The act of enjoying nature, art, and literature while taking time for self-reflection, named after RM's thoughtful hobbies.",
    example: "I went to the museum and then read poetry in the park today. Just Namjooning.",
    category: "meme",
    relatedMembers: ["RM"],
    source: "Fan-created term based on RM's Instagram and VLive content",
    emoji: "🏞️"
  },
  {
    term: "Pied Piper",
    definition: "A BTS song that playfully criticizes fans for spending too much time on BTS instead of studying or working.",
    category: "song",
    year: "2017",
    source: "Track on Love Yourself: Her album",
    emoji: "📚"
  },
  {
    term: "Magic Shop",
    definition: "A metaphorical place where fans can find comfort and healing, based on BTS's song of the same name.",
    category: "song",
    year: "2018",
    source: "Track on Love Yourself: Tear album",
    emoji: "✨"
  },
  
  // Inside Jokes
  {
    term: "Fighting! (Hwaiting!)",
    definition: "Korean expression used to cheer someone on, similar to 'You can do it!' or 'Go team!'",
    category: "phrase",
    source: "Common Korean expression often used by members",
    emoji: "💪"
  },
  {
    term: "Excuse Me, I'm Good at English",
    definition: "A funny phrase Jin used during an interview when he wanted to answer in English instead of using a translator.",
    category: "inside-joke",
    relatedMembers: ["Jin"],
    source: "Billboard Music Awards 2017 red carpet interview"
  },
  {
    term: "Kim Namjoon, KIM NAMJOON!",
    definition: "A phrase ARMYs use to express frustration or admiration when RM (Kim Namjoon) does something either genius or chaotic.",
    category: "inside-joke",
    relatedMembers: ["RM"],
    source: "Fan community expression",
    emoji: "😱"
  },
  {
    term: "Min Yoongi Marry Me",
    definition: "A popular fan chant that Suga has acknowledged and joked about in concerts.",
    category: "inside-joke",
    relatedMembers: ["Suga"],
    source: "Fan chants at concerts, acknowledged by Suga in fan meetings",
    emoji: "💍"
  },
  {
    term: "I Like Black, I Like Black Hair",
    definition: "A phrase Jungkook said in a live broadcast that became a meme when fans ask members to return to black hair.",
    category: "inside-joke",
    relatedMembers: ["Jungkook"],
    source: "V Live broadcast from 2018"
  },
  {
    term: "Hajima",
    definition: "Korean word meaning 'stop it', often playfully used by members to each other during their antics.",
    category: "phrase",
    source: "Common Korean phrase frequently used in Run BTS episodes",
    emoji: "🛑"
  },
  {
    term: "Daebak",
    definition: "Korean expression meaning 'awesome' or 'amazing'.",
    category: "phrase",
    source: "Common Korean expression frequently used by members",
    emoji: "🤩"
  },
  {
    term: "Jimin-ssi",
    definition: "A formal way of addressing Jimin that fans found amusing when used by other members.",
    category: "inside-joke",
    relatedMembers: ["Jimin"],
    source: "Run BTS episodes where members formally address each other"
  },
  
  // Adding more unique terms
  {
    term: "Silver Spoon (Baepsae)",
    definition: "A song referencing the Korean idiom about a crow trying to walk like a stork, symbolizing younger generations struggling against an unfair system.",
    category: "song",
    year: "2015",
    source: "Track on The Most Beautiful Moment in Life Pt. 2 album",
    emoji: "🥄"
  },
  {
    term: "RUN BTS",
    definition: "BTS's variety show where they participate in games and challenges. Also used when chaos ensues, referencing the chaotic nature of the show.",
    category: "inside-joke",
    source: "Web variety show started in 2015 on VLIVE and Weverse",
    emoji: "🏃"
  },
  {
    term: "Otsukare",
    definition: "Japanese phrase meaning 'good job' or 'you've worked hard'. Made famous by Suga and Jin's hilarious dance performance to their improvised 'Otsukare Song'.",
    category: "inside-joke",
    relatedMembers: ["Jin", "Suga"],
    year: "2018",
    source: "BTS Japan Fanmeeting Vol. 4",
    emoji: "👏"
  },
  {
    term: "Infires!",
    definition: "RM's mispronunciation of 'in fires' that became a running joke among the members and fans.",
    category: "inside-joke",
    relatedMembers: ["RM"],
    source: "BTS 'Idol' MV behind-the-scenes shooting",
    emoji: "🔥"
  },
  {
    term: "Tannie",
    definition: "Nickname for Yeontan, V's pet Pomeranian dog who has become beloved by fans.",
    category: "nickname",
    relatedMembers: ["V"],
    source: "V's live broadcasts introducing his pet",
    emoji: "🐶"
  },
  {
    term: "Promise I'll Return (PTD)",
    definition: "A promise the members made to fans in their song 'Permission to Dance' about returning after military service.",
    category: "phrase",
    year: "2021",
    source: "Lyrics from 'Permission to Dance' single",
    emoji: "🤝"
  },
  {
    term: "Let's Get It",
    definition: "A phrase often used by J-Hope and other members to express enthusiasm before a performance or challenge.",
    category: "phrase",
    relatedMembers: ["J-Hope"],
    source: "Multiple Run BTS episodes and behind-the-scenes content",
    emoji: "👊"
  },
  {
    term: "Anpanman",
    definition: "A BTS song referencing a Japanese cartoon superhero who helps others despite his own limitations. The members often relate to this character.",
    category: "song",
    year: "2018",
    source: "Track on Love Yourself: Tear album",
    emoji: "🦸"
  },
  {
    term: "Super Tuna",
    definition: "Jin's viral self-composed song about fishing that accidentally became a TikTok trend despite his attempts to prevent it.",
    category: "inside-joke",
    relatedMembers: ["Jin"],
    year: "2021",
    source: "Released for Jin's birthday in December 2021",
    emoji: "🐟"
  },
  {
    term: "So Called 'Billboard' Singers",
    definition: "A self-deprecating joke Jin made when BTS had just started appearing on Billboard charts.",
    category: "inside-joke",
    relatedMembers: ["Jin"],
    source: "2017 BTS Festa dinner video",
    emoji: "📊"
  },
  {
    term: "We Are Bulletproof",
    definition: "A recurring phrase in BTS music representing resilience and determination. It appears in multiple songs across their discography.",
    category: "phrase",
    source: "First appeared in predebut song, later in series of songs",
    emoji: "🛡️"
  },
  {
    term: "Anti-Fan",
    definition: "A lighthearted term used for members when they playfully criticize or tease each other, acting like 'anti-fans' instead of bandmates.",
    category: "inside-joke",
    source: "Fan community term based on members' interactions",
    emoji: "🙃"
  },
  {
    term: "Christmas Tree",
    definition: "Nickname for Jin when he stands in the middle of group photos with the shorter members creating a Christmas tree shape around him.",
    category: "inside-joke",
    relatedMembers: ["Jin"],
    source: "Fan observation of group photos, acknowledged by members",
    emoji: "🎄"
  },
  {
    term: "Agust D",
    definition: "Suga's alter ego and stage name for his solo mixtapes. It's 'DT SUGA' spelled backwards (DT = Daegu Town, his hometown).",
    category: "nickname",
    relatedMembers: ["Suga"],
    year: "2016",
    source: "First solo mixtape released in 2016",
    emoji: "🐱"
  }
];

export function getAllTerms(): VocabularyTerm[] {
  return [...vocabularyTerms].sort((a, b) => a.term.localeCompare(b.term));
}

export function getTermsByCategory(category: VocabularyCategory): VocabularyTerm[] {
  return vocabularyTerms.filter(term => term.category === category);
}

export function getTermsByMember(memberName: string): VocabularyTerm[] {
  return vocabularyTerms.filter(term => 
    term.relatedMembers?.includes(memberName)
  );
}

export function getTermsCount(): number {
  return vocabularyTerms.length;
}

export function getCategoriesWithCount(): {category: VocabularyCategory; count: number; label: string}[] {
  const categories: VocabularyCategory[] = ['fandom', 'meme', 'song', 'inside-joke', 'nickname', 'phrase'];
  const categoryLabels: Record<VocabularyCategory, string> = {
    'fandom': 'Fandom Terms',
    'meme': 'Memes',
    'song': 'Song References',
    'inside-joke': 'Inside Jokes',
    'nickname': 'Nicknames',
    'phrase': 'Phrases'
  };
  
  return categories.map(category => ({
    category,
    count: vocabularyTerms.filter(term => term.category === category).length,
    label: categoryLabels[category]
  }));
} 