// Define types for quiz questions and difficulty levels
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'fill-blank' | 'line-completion' | 'guess-song' | 'visual-recognition' | 'chronology' | 'member-connection' | 'personality';

export interface BaseQuestion {
  songName?: string;
  difficulty: Difficulty;
  hint?: string;
  image?: string;
  questionType: QuestionType;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  questionType: 'multiple-choice';
  lyricsSnippet: string;
  options: string[];
  correctAnswer: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  questionType: 'fill-blank';
  lyricsWithBlank: string; // Text with ___ for blanks
  correctAnswer: string;   // The missing word(s)
  context?: string;        // Optional line before/after for context
}

export interface LineCompletionQuestion extends BaseQuestion {
  questionType: 'line-completion';
  lineStart: string;      // Beginning of the line
  options: string[];      // Possible line endings
  correctAnswer: string;  // Correct line ending
}

export interface GuessSongQuestion extends BaseQuestion {
  questionType: 'guess-song';
  lyricsSnippet: string;  // A memorable part of the lyrics
  releaseYear?: number;   // Optional year to give as a hint
  album?: string;         // Optional album name to give as a hint
  possibleAnswers: string[]; // List of accepted song name variations
}

// New question types for more engaging content

export interface VisualRecognitionQuestion extends BaseQuestion {
  questionType: 'visual-recognition';
  question: string;
  options: string[];
  correctAnswer: string;
  description?: string; // Optional context about the image
}

export interface ChronologyQuestion extends BaseQuestion {
  questionType: 'chronology';
  question: string;
  events: string[];   // Events that need to be ordered
  correctOrder: number[]; // Indices of the events in correct order
}

export interface MemberConnectionQuestion extends BaseQuestion {
  questionType: 'member-connection';
  question: string;
  options: string[];
  correctAnswer: string;
  memberName: string; // The member this question relates to
  context?: string;   // Additional context about the connection
}

export interface PersonalityQuestion extends BaseQuestion {
  questionType: 'personality';
  question: string;
  options: {
    text: string;
    memberMatch: string; // Which member this answer aligns with
  }[];
  // No correct answer as it's personality-based
}

export type QuizQuestion = MultipleChoiceQuestion | FillBlankQuestion | LineCompletionQuestion | GuessSongQuestion | 
                          VisualRecognitionQuestion | ChronologyQuestion | MemberConnectionQuestion | PersonalityQuestion;

// Sample guess-the-song questions
export const guessSongQuestions: GuessSongQuestion[] = [
  {
    songName: "Dynamite",
    difficulty: "easy",
    questionType: "guess-song",
    lyricsSnippet: "Shining through the city with a little funk and soul\nSo I'ma light it up like dynamite, woah",
    releaseYear: 2020,
    album: "Single",
    possibleAnswers: ["dynamite", "bts dynamite"],
    image: "/images/quiz/lyrics/dynamite.jpg"
  },
  {
    songName: "Butter",
    difficulty: "easy",
    questionType: "guess-song",
    lyricsSnippet: "Smooth like butter, like a criminal undercover\nGon' pop like trouble breaking into your heart like that",
    releaseYear: 2021,
    album: "Single",
    possibleAnswers: ["butter", "bts butter"],
    image: "/images/quiz/lyrics/butter.jpg"
  },
  {
    songName: "Spring Day",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "I miss you (I miss you)\nWhen I say that, I miss you more\nI'm looking at your photo, but I still miss you",
    releaseYear: 2017,
    album: "You Never Walk Alone",
    possibleAnswers: ["spring day", "봄날", "bts spring day"],
    image: "/images/quiz/lyrics/spring-day.jpg"
  },
  {
    songName: "Blood Sweat & Tears",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "My blood, sweat, and tears, my last dance\nTake it all away, take it all away, yeah",
    releaseYear: 2016,
    album: "Wings",
    possibleAnswers: ["blood sweat & tears", "blood sweat and tears", "피 땀 눈물"],
    image: "/images/quiz/lyrics/blood-sweat-tears.jpg"
  },
  {
    songName: "Fake Love",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "I'm so sick of this fake love, fake love, fake love\nI'm so sorry but it's fake love, fake love, fake love",
    releaseYear: 2018,
    album: "Love Yourself: Tear",
    possibleAnswers: ["fake love", "bts fake love"],
    image: "/images/quiz/lyrics/fake-love.jpg"
  },
  {
    songName: "DNA",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "This is inevitable, I'm the one you've been looking for\nOur DNA was meant to be together since the beginning",
    releaseYear: 2017,
    album: "Love Yourself: Her",
    possibleAnswers: ["dna", "bts dna"],
    image: "/images/quiz/lyrics/dna.jpg"
  },
  {
    songName: "Mic Drop",
    difficulty: "hard",
    questionType: "guess-song",
    lyricsSnippet: "Did you see my bag? Did you see my bag?\nIt's hella trophies and it's hella thick",
    releaseYear: 2017,
    album: "Love Yourself: Her",
    possibleAnswers: ["mic drop", "bts mic drop"],
    image: "/images/quiz/lyrics/mic-drop.jpg"
  },
  {
    songName: "Black Swan",
    difficulty: "hard",
    questionType: "guess-song",
    lyricsSnippet: "The heart no longer races when hearing the music playing\nThat would be my first death I've been always afraid of",
    releaseYear: 2020,
    album: "Map of the Soul: 7",
    possibleAnswers: ["black swan", "bts black swan"],
    image: "/images/quiz/lyrics/black-swan.jpg"
  },
  {
    songName: "Fire",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "Live your life, they're gonna talk anyway\nSet everything on fire, bow wow wow",
    releaseYear: 2016,
    album: "The Most Beautiful Moment in Life: Young Forever",
    possibleAnswers: ["fire", "bts fire", "불타오르네"],
    image: "/images/quiz/lyrics/fire.jpg"
  },
  {
    songName: "Life Goes On",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "One day, the world stopped without any warning\nSpring didn't know to wait, showed up not even a minute late",
    releaseYear: 2020,
    album: "BE",
    possibleAnswers: ["life goes on", "bts life goes on"],
    image: "/images/quiz/lyrics/life-goes-on.jpg"
  },
  {
    songName: "Boy With Luv",
    difficulty: "easy",
    questionType: "guess-song",
    lyricsSnippet: "Oh my my my, oh my my my\nI've waited all my life\nI want to be with you for every moment of your day",
    releaseYear: 2019,
    album: "Map of the Soul: Persona",
    possibleAnswers: ["boy with luv", "작은 것들을 위한 시", "bts boy with luv"],
    image: "/images/quiz/lyrics/boy-with-luv.jpg"
  },
  {
    songName: "Idol",
    difficulty: "medium",
    questionType: "guess-song",
    lyricsSnippet: "You can't stop me loving myself\nYou can't stop me loving myself",
    releaseYear: 2018,
    album: "Love Yourself: Answer",
    possibleAnswers: ["idol", "bts idol", "아이돌"],
    image: "/images/quiz/lyrics/idol.jpg"
  }
];

// Sample fill-in-the-blank questions
export const fillBlankQuestions: FillBlankQuestion[] = [
  {
    songName: "Blood Sweat & Tears",
    difficulty: "medium",
    questionType: "fill-blank",
    lyricsWithBlank: "My blood, sweat, and tears, my last ___",
    correctAnswer: "dance",
    hint: "This is something performers do on stage",
    image: "/images/quiz/lyrics/blood-sweat-tears.jpg"
  },
  {
    songName: "Dynamite",
    difficulty: "easy",
    questionType: "fill-blank",
    lyricsWithBlank: "Shining through the city with a little ___ of ___ funk",
    correctAnswer: "funk",
    hint: "A music genre with rhythmic basslines",
    image: "/images/quiz/lyrics/dynamite.jpg"
  },
  {
    songName: "Butter",
    difficulty: "easy",
    questionType: "fill-blank",
    lyricsWithBlank: "Smooth like ___, like a criminal undercover",
    correctAnswer: "butter",
    hint: "The song title is the answer",
    image: "/images/quiz/lyrics/butter.jpg"
  },
  {
    songName: "Fake Love",
    difficulty: "medium",
    questionType: "fill-blank",
    lyricsWithBlank: "I'm so sick of this ___ love, I'm so sorry but it's fake love",
    correctAnswer: "fake",
    hint: "The opposite of real",
    image: "/images/quiz/lyrics/fake-love.jpg"
  },
  {
    songName: "DNA",
    difficulty: "medium",
    questionType: "fill-blank",
    lyricsWithBlank: "This is not the ___ of coincidence, our blood was meant to blend",
    correctAnswer: "result",
    hint: "A consequence or outcome",
    image: "/images/quiz/lyrics/dna.jpg"
  }
];

// Sample line completion questions
export const lineCompletionQuestions: LineCompletionQuestion[] = [
  {
    songName: "Fire",
    difficulty: "medium",
    questionType: "line-completion",
    lineStart: "Live your life, they're",
    options: [
      "coming after you",
      "gonna talk anyway",
      "always watching you",
      "never satisfied"
    ],
    correctAnswer: "gonna talk anyway",
    hint: "The line is about ignoring what others think",
    image: "/images/quiz/lyrics/fire.jpg"
  },
  {
    songName: "Spring Day",
    difficulty: "hard",
    questionType: "line-completion",
    lineStart: "How much longer do I have to",
    options: [
      "wait for you",
      "endure this pain",
      "stay in this winter",
      "carry this burden"
    ],
    correctAnswer: "wait for you",
    hint: "The song is about missing someone",
    image: "/images/quiz/lyrics/spring-day.jpg"
  }
];

export const lyricsQuizQuestions: MultipleChoiceQuestion[] = [
  {
    songName: 'Dynamite',
    lyricsSnippet: "Shining through the city with a little funk and soul, so I\u2019ma light it up like...",
    options: ['Fireflies', 'Dynamite', 'Starlight', 'Sunshine'],
    correctAnswer: 'Dynamite',
    difficulty: 'easy',
    image: '/images/quiz/lyrics/dynamite.jpg',
    hint: 'This was BTS\'s first all-English single that hit #1 on Billboard Hot 100',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Spring Day',
    lyricsSnippet: "Snowflakes are falling, getting farther away. I _____ (_____), I _____ (_____)",
    options: ['Look for you (Look for you)', 'Miss you (Miss you)', 'Call you (Call you)', 'Wait for you (Wait for you)'],
    correctAnswer: 'Miss you (Miss you)',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/spring-day.jpg',
    hint: 'One of BTS\'s most beloved songs about longing and waiting for better days',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Boy With Luv (feat. Halsey)',
    lyricsSnippet: "Oh my my my, oh my my my, I've waited all my life...",
    options: [
      'To give you all my love',
      'You got me flying so high',
      'To be with you tonight',
      'I\'d like to be with you at every moment of yours'
    ],
    correctAnswer: 'I\'d like to be with you at every moment of yours',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/boy-with-luv.jpg',
    hint: 'This song featured American singer Halsey',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Butter',
    lyricsSnippet: "Smooth like _____",
    options: ['Silk', 'Butter', 'Honey', 'Chocolate'],
    correctAnswer: 'Butter',
    difficulty: 'easy',
    image: '/images/quiz/lyrics/butter.jpg',
    hint: 'This song spent 10 weeks at #1 on Billboard Hot 100',
    questionType: 'multiple-choice'
  },
  {
    songName: 'FAKE LOVE',
    lyricsSnippet: "I'm so sick of this _____ love",
    options: ['Toxic', 'Fake', 'Painful', 'Lost'],
    correctAnswer: 'Fake',
    difficulty: 'easy',
    image: '/images/quiz/lyrics/fake-love.jpg',
    hint: 'This song is about realizing that the love was based on a persona, not true self',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Black Swan',
    lyricsSnippet: "The heart no longer races when the music starts to play. That _____ would be my first death",
    options: ['Moment', 'Silence', 'Feeling', 'Sound'],
    correctAnswer: 'Moment',
    difficulty: 'hard',
    image: '/images/quiz/lyrics/black-swan.jpg',
    hint: 'This song is about the fear of losing passion for music',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Permission to Dance',
    lyricsSnippet: "We don't need _____. The wait is over",
    options: ['To worry', 'To fear', 'Permission to dance', 'Another try'],
    correctAnswer: 'Permission to dance',
    difficulty: 'easy',
    image: '/images/quiz/lyrics/permission-to-dance.jpg',
    hint: 'Ed Sheeran co-wrote this uplifting song',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Idol',
    lyricsSnippet: "You can\u2019t stop me loving myself",
    options: ['You can\u2019t stop me loving myself', 'I\u2019m so proud of myself', 'Who am I? I\u2019m idol', 'I know who I am'],
    correctAnswer: 'You can\u2019t stop me loving myself',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/idol.jpg',
    hint: 'A song celebrating self-identity and incorporating Korean traditional music',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Mic Drop',
    lyricsSnippet: "Did you see my bag? Did you see my bag? It's hella trophies and it's hella thick",
    options: [
      'Did you see my bag? Did you see my bag? It\u2019s hella trophies and it\u2019s hella thick',
      'Did you see my swag? Did you see my swag? It\u2019s hella trophies and it\u2019s hella thick',
      'Did you see my style? Did you see my style? It\u2019s hella trophies and it\u2019s hella thick',
      'Did you see my fame? Did you see my fame? It\u2019s hella trophies and it\u2019s hella thick'
    ],
    correctAnswer: 'Did you see my bag? Did you see my bag? It\u2019s hella trophies and it\u2019s hella thick',
    difficulty: 'hard',
    image: '/images/quiz/lyrics/mic-drop.jpg',
    hint: 'Steve Aoki did a popular remix of this song',
    questionType: 'multiple-choice'
  },
  {
    songName: 'DNA',
    lyricsSnippet: "Our meeting is like a mathematical formula, _____, I'm the evidence of destiny",
    options: ['Unsolvable', 'Unchangeable', 'Inexplicable', 'Unmistakable'],
    correctAnswer: 'Unmistakable',
    difficulty: 'hard',
    image: '/images/quiz/lyrics/dna.jpg',
    hint: 'This song has BTS\'s signature whistle in the beginning',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Life Goes On',
    lyricsSnippet: "One day, the world stopped without any warning. Spring didn't know to wait, showed up not even a minute late",
    options: [
      'One day, the world stopped without any warning. Spring didn\u2019t know to wait, showed up not even a minute late',
      'One day, the world paused without any notice. Spring didn\u2019t care to wait, arrived right on time',
      'One day, everything changed without warning. Spring didn\u2019t hesitate, came exactly when expected',
      'One day, life stopped without any warning. Spring didn\u2019t know to pause, bloomed exactly as planned'
    ],
    correctAnswer: 'One day, the world stopped without any warning. Spring didn\u2019t know to wait, showed up not even a minute late',
    difficulty: 'hard',
    image: '/images/quiz/lyrics/life-goes-on.jpg',
    hint: 'This song was released during the COVID-19 pandemic',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Blood Sweat & Tears',
    lyricsSnippet: "My blood, sweat, and tears, my last dance. Take it all away",
    options: [
      'My blood, sweat, and tears, my last dance. Take it all away',
      'My blood, sweat, and tears, my whole life. Take it all away',
      'My blood, sweat, and tears, my everything. Take it all away',
      'My blood, sweat, and tears, my soul. Take it all away'
    ],
    correctAnswer: 'My blood, sweat, and tears, my last dance. Take it all away',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/blood-sweat-tears.jpg',
    hint: 'This song\'s music video has references to the novel "Demian" by Hermann Hesse',
    questionType: 'multiple-choice'
  }
];

export const memberSoloQuizQuestions: MultipleChoiceQuestion[] = [
  {
    songName: 'Seven (feat. Latto)',
    lyricsSnippet: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday ______",
    options: ['(Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)', '(Sunday)', '(Seven days a week)', '(All week long)'],
    correctAnswer: '(Seven days a week)',
    difficulty: 'easy',
    image: '/images/quiz/lyrics/jungkook-seven.jpg',
    hint: 'Jungkook\'s debut solo single',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Like Crazy',
    lyricsSnippet: "I'd rather be lost in the ____ with you",
    options: ['Dream', 'Night', 'Madness', 'Stars'],
    correctAnswer: 'Madness',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/jimin-like-crazy.jpg',
    hint: 'Jimin\'s solo track from his album FACE',
    questionType: 'multiple-choice'
  },
  {
    songName: 'Slow Dancing',
    lyricsSnippet: "Baby, let me be your _____",
    options: ['Man', 'Light', 'Dance', 'Home'],
    correctAnswer: 'Man',
    difficulty: 'medium',
    image: '/images/quiz/lyrics/v-slow-dancing.jpg',
    hint: 'V\'s song from his solo album Layover',
    questionType: 'multiple-choice'
  }
];

// Visual Recognition Questions - Identify elements from music videos, performances, etc.
export const visualRecognitionQuestions: VisualRecognitionQuestion[] = [
  {
    questionType: 'visual-recognition',
    question: "Which music video does this iconic scene come from?",
    options: ['FAKE LOVE', 'Blood Sweat & Tears', 'Black Swan', 'ON'],
    correctAnswer: 'Blood Sweat & Tears',
    difficulty: 'medium',
    image: "/images/default-quiz.jpg",
    description: "The famous museum scene with Jin and the statue",
    hint: "This music video has strong references to art and mythology"
  },
  {
    questionType: 'visual-recognition',
    question: "Which award show performance is this outfit from?",
    options: ['2019 MMA', '2018 MAMA', '2021 Grammy Awards', '2020 MTV VMAs'],
    correctAnswer: '2019 MMA',
    difficulty: 'hard',
    image: "/images/default-quiz.jpg",
    description: "The memorable traditional-inspired performance",
    hint: "This performance included solo stages and a traditional Korean-inspired segment"
  },
  {
    questionType: 'visual-recognition',
    question: "Which Run BTS episode concept is shown here?",
    options: ['Cooking competition', 'Arcade games', 'Village games', 'Sports day'],
    correctAnswer: 'Village games',
    difficulty: 'medium',
    image: "/images/default-quiz.jpg",
    description: "The members in traditional Korean clothing playing games",
    hint: "This was a multi-episode special with traditional Korean games"
  },
  {
    questionType: 'visual-recognition',
    question: "Which tour is this stage setup from?",
    options: ['Love Yourself', 'Wings', 'Map of the Soul', 'Permission to Dance'],
    correctAnswer: 'Map of the Soul',
    difficulty: 'hard',
    image: "/images/default-quiz.jpg",
    description: "The elaborate stage design from this major tour",
    hint: "This tour was interrupted by the COVID-19 pandemic"
  },
  {
    questionType: 'visual-recognition',
    question: "Which BTS concept photo era is this from?",
    options: ['Butter', 'Dynamite', 'BE', 'PROOF'],
    correctAnswer: 'BE',
    difficulty: 'medium',
    image: "/images/default-quiz.jpg",
    description: "The members in a cozy, laid-back setting",
    hint: "This album was created during the pandemic and had a more personal touch"
  }
];

// Chronology Questions - Put events in the correct order
export const chronologyQuestions: ChronologyQuestion[] = [
  {
    questionType: 'chronology',
    question: "Put these BTS title tracks in chronological order of release:",
    events: ['Dynamite', 'DNA', 'Boy With Luv', 'Butter'],
    correctOrder: [1, 2, 0, 3], // DNA (2017), Boy With Luv (2019), Dynamite (2020), Butter (2021)
    difficulty: 'medium',
    image: "/images/default-quiz.jpg",
    hint: "Think about which songs were released before and after the pandemic"
  },
  {
    questionType: 'chronology',
    question: "Order these events in BTS history:",
    events: [
      'First Billboard Hot 100 #1', 
      'First daesang award', 
      'UN General Assembly speech', 
      'First Grammy nomination'
    ],
    correctOrder: [1, 2, 0, 3], // Daesang (2016), UN (2018), Hot 100 #1 (2020), Grammy nom (2020 late)
    difficulty: 'hard',
    image: "/images/default-quiz.jpg",
    hint: "Their first Daesang came before their international breakthrough"
  },
  {
    questionType: 'chronology',
    question: "Order these BTS albums from oldest to newest:",
    events: [
      'Love Yourself: Tear',
      'Wings',
      'Map of the Soul: 7',
      'The Most Beautiful Moment in Life: Young Forever'
    ],
    correctOrder: [3, 1, 0, 2], // HYYH (2016), Wings (2016), LY:Tear (2018), MOTS:7 (2020)
    difficulty: 'medium',
    image: "/images/default-quiz.jpg",
    hint: "The HYYH series came before Wings"
  }
];

// Member Connection Questions - Test knowledge about specific members
export const memberConnectionQuestions: MemberConnectionQuestion[] = [
  {
    questionType: 'member-connection',
    question: "Which pet belongs to Taehyung (V)?",
    options: ['Bam (doberman)', 'Mickey (dog)', 'Yeontan (pomeranian)', 'Holly (dog)'],
    correctAnswer: 'Yeontan (pomeranian)',
    memberName: 'V',
    difficulty: 'easy',
    image: "/images/members/v.jpg",
    hint: "This small fluffy dog often appears in V's social media posts"
  },
  {
    questionType: 'member-connection',
    question: "Which art form is J-Hope known for specializing in?",
    options: ['Painting', 'Dancing', 'Piano', 'Photography'],
    correctAnswer: 'Dancing',
    memberName: 'J-Hope',
    difficulty: 'easy',
    image: "/images/members/jhope.jpg",
    context: "He was part of a street dance team before joining Big Hit",
    hint: "His stage name reflects his role in the group"
  },
  {
    questionType: 'member-connection',
    question: "Which mixtape did Suga release under the name Agust D?",
    options: ['D-2', 'Hope World', 'Mono', 'Indigo'],
    correctAnswer: 'D-2',
    memberName: 'Suga',
    difficulty: 'medium',
    image: "/images/members/suga.jpg",
    context: "This was his second mixtape as Agust D",
    hint: "The title refers to it being his second release"
  },
  {
    questionType: 'member-connection',
    question: "Which instrument does Jin play?",
    options: ['Drums', 'Guitar', 'Piano', 'Saxophone'],
    correctAnswer: 'Guitar',
    memberName: 'Jin',
    difficulty: 'medium',
    image: "/images/members/jin.jpg",
    context: "He has performed solo songs using this instrument",
    hint: "He played this instrument during his 'Epiphany' performances"
  },
  {
    questionType: 'member-connection',
    question: "What is RM's notable intellectual achievement?",
    options: ['Perfect score on Korean SAT', 'IQ of 148', 'Speaking 4 languages fluently', 'Published poet'],
    correctAnswer: 'IQ of 148',
    memberName: 'RM',
    difficulty: 'medium',
    image: "/images/members/rm.jpg",
    context: "He is known as the intellectual leader of the group",
    hint: "This puts him in the genius category"
  }
];

// Personality questions - no right or wrong answers, matches with members
export const personalityQuestions: PersonalityQuestion[] = [
  {
    questionType: 'personality',
    question: "How would you spend an ideal free day?",
    options: [
      { text: "At an art museum or gallery", memberMatch: "V" },
      { text: "Reading books and visiting coffee shops", memberMatch: "RM" },
      { text: "Dancing and being active all day", memberMatch: "J-Hope" },
      { text: "Gaming and relaxing at home", memberMatch: "Jungkook" },
      { text: "Shopping and taking selcas", memberMatch: "Jimin" },
      { text: "Making music in the studio", memberMatch: "Suga" },
      { text: "Cooking and watching movies", memberMatch: "Jin" }
    ],
    difficulty: 'easy',
    image: "/images/bts-group.jpg"
  },
  {
    questionType: 'personality',
    question: "Which role would you play in a friend group?",
    options: [
      { text: "The reliable one who takes care of everyone", memberMatch: "Jin" },
      { text: "The passionate one with big dreams", memberMatch: "Jungkook" },
      { text: "The quiet but deeply thoughtful one", memberMatch: "Suga" },
      { text: "The mood-maker who brightens everyone's day", memberMatch: "J-Hope" },
      { text: "The sensitive and caring one", memberMatch: "Jimin" },
      { text: "The quirky one with unusual interests", memberMatch: "V" },
      { text: "The intellectual who analyzes everything", memberMatch: "RM" }
    ],
    difficulty: 'easy',
    image: "/images/bts-group-1.jpg"
  },
  {
    questionType: 'personality',
    question: "What's your approach to challenges?",
    options: [
      { text: "Work harder than everyone else until I master it", memberMatch: "Jungkook" },
      { text: "Analyze the problem and find the most efficient solution", memberMatch: "RM" },
      { text: "Stay positive and keep a good attitude through difficulties", memberMatch: "J-Hope" },
      { text: "Take my time and work consistently", memberMatch: "Suga" },
      { text: "Add my own creative twist to the situation", memberMatch: "V" },
      { text: "Use humor to overcome the stress", memberMatch: "Jin" },
      { text: "Give it my all with intense passion", memberMatch: "Jimin" }
    ],
    difficulty: 'easy',
    image: "/images/bts-group-2.jpg"
  }
];

// Combine all question types for a mixed quiz - placing this at the end
export const mixedQuizQuestions: QuizQuestion[] = [
  // Original question types
  ...guessSongQuestions.slice(0, 5),
  ...fillBlankQuestions.slice(0, 3),
  ...lineCompletionQuestions.slice(0, 2),
  
  // New engaging question types
  ...visualRecognitionQuestions.slice(0, 5),
  ...chronologyQuestions.slice(0, 3),
  ...memberConnectionQuestions.slice(0, 5)
]; 

// Add creative quiz types (not including personality because that has no right/wrong answers)
export const creativeQuizQuestions: QuizQuestion[] = [
  ...visualRecognitionQuestions,
  ...chronologyQuestions,
  ...memberConnectionQuestions
]; 