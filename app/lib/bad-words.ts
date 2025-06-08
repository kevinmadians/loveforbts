// List of words to filter out
const BAD_WORDS = [
  // Profanity
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'hell', 'crap', 'bastard', 'cunt', 'motherfucker', 'prick', 'piss', 'dickhead', 'twat', 'ballsack',

  // Hate speech / Slurs
  'nigger', 'chink', 'spic', 'kike', 'gook', 'fag', 'faggot', 'retard', 'tranny', 'towelhead', 'camel jockey', 'wetback', 'redskin', 'nazi',

  // Inappropriate terms / Adult content
  'sex', 'porn', 'pussy', 'dick', 'dildo', 'blowjob', 'anal', 'slut', 'whore', 'tits', 'boobs', 'cum', 'orgasm', 'threesome', 'hentai', 'nude', 'nudity', 'ejaculation', 'masturbation',

  // Violence / Harmful terms
  'kill', 'death', 'die', 'suicide', 'murder', 'rape', 'lynch', 'terrorist', 'bomb', 'shoot', 'stab', 'hang', 'genocide', 'gas chamber', 'ethnic cleansing',

  // Drug-related
  'cocaine', 'heroin', 'meth', 'ecstasy', 'crack', 'weed', 'marijuana', 'dope', 'lsd', 'acid', 'opium', 'narcotics', 'xanax',

  // Spam-related
  'buy', 'sell', 'price', 'discount', 'offer',

  // URLs and domains
  'http', 'https', 'www', '.com', '.net', '.org',

  // Common spam phrases
  'click here', 'visit now', 'check out', 'limited time',

  // Intelligence/hate language
  'hate', 'stupid', 'idiot', 'dumb',

  // Add more words as needed
]

// Function to check if text contains any bad words
export function containsBadWords(text: string): boolean {
  const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  return BAD_WORDS.some(word => normalizedText.includes(word.toLowerCase()))
}

// Function to get the first bad word found in text
export function getFirstBadWord(text: string): string | null {
  const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const foundWord = BAD_WORDS.find(word => normalizedText.includes(word.toLowerCase()))
  return foundWord || null
}

// Function to sanitize text by replacing bad words with asterisks
export function sanitizeText(text: string): string {
  let sanitized = text
  BAD_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi')
    sanitized = sanitized.replace(regex, '*'.repeat(word.length))
  })
  return sanitized
}
