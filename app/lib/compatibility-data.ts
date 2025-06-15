export interface PersonalityTrait {
  id: string;
  trait: string;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    traits: string[];
  }[];
}

export interface MemberCompatibility {
  name: string;
  slug: string;
  image: string;
  primaryTraits: string[];
  secondaryTraits: string[];
  compatibleWith: {
    slug: string;
    reason: string;
  }[];
  personalityDescription: string;
}

// Personality traits that will be used to match users with members
export const personalityTraits: PersonalityTrait[] = [
  {
    id: "intellectual",
    trait: "Intellectual",
    description: "Values knowledge, deep thinking, and philosophical discussions."
  },
  {
    id: "creative",
    trait: "Creative",
    description: "Expressive, artistic, and always thinking outside the box."
  },
  {
    id: "caring",
    trait: "Caring",
    description: "Empathetic, nurturing, and always looking out for others' wellbeing."
  },
  {
    id: "passionate",
    trait: "Passionate",
    description: "Intense, dedicated, and puts their whole heart into everything they do."
  },
  {
    id: "playful",
    trait: "Playful",
    description: "Brings joy and humor to situations, loves to have fun."
  },
  {
    id: "disciplined",
    trait: "Disciplined",
    description: "Structured, hardworking, and committed to continuous improvement."
  },
  {
    id: "extroverted",
    trait: "Extroverted",
    description: "Energized by social interaction and loves being around people."
  },
  {
    id: "introverted",
    trait: "Introverted",
    description: "Finds energy in quiet reflection and deeper one-on-one connections."
  },
  {
    id: "optimistic",
    trait: "Optimistic",
    description: "Sees the bright side of situations and maintains a positive outlook."
  },
  {
    id: "realistic",
    trait: "Realistic",
    description: "Practical, grounded, and straightforward in approach to life."
  }
];

// Quiz questions
export const biasCompatibilityQuestions: Question[] = [
  {
    id: "q1",
    text: "How do you typically spend your free time?",
    options: [
      {
        id: "q1-a",
        text: "Reading books or visiting museums",
        traits: ["intellectual", "introverted"]
      },
      {
        id: "q1-b",
        text: "Creating art or making music",
        traits: ["creative", "passionate"]
      },
      {
        id: "q1-c",
        text: "Hanging out with friends and making people laugh",
        traits: ["playful", "extroverted"]
      },
      {
        id: "q1-d",
        text: "Practicing a skill or working on self-improvement",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q1-e",
        text: "Taking care of others or volunteering",
        traits: ["caring", "optimistic"]
      }
    ]
  },
  {
    id: "q2",
    text: "When facing a challenge, what's your approach?",
    options: [
      {
        id: "q2-a",
        text: "Analyze all aspects and find the most logical solution",
        traits: ["intellectual", "realistic"]
      },
      {
        id: "q2-b",
        text: "Look for an unconventional, creative approach",
        traits: ["creative", "optimistic"]
      },
      {
        id: "q2-c",
        text: "Seek support from friends or offer support to others facing the same challenge",
        traits: ["caring", "extroverted"]
      },
      {
        id: "q2-d",
        text: "Work harder than everyone else until you overcome it",
        traits: ["disciplined", "passionate"]
      },
      {
        id: "q2-e",
        text: "Stay positive and find humor in the situation",
        traits: ["playful", "optimistic"]
      }
    ]
  },
  {
    id: "q3",
    text: "How would your friends describe you?",
    options: [
      {
        id: "q3-a",
        text: "The thoughtful one with interesting perspectives",
        traits: ["intellectual", "introverted"]
      },
      {
        id: "q3-b",
        text: "The supportive one who's always there for them",
        traits: ["caring", "passionate"]
      },
      {
        id: "q3-c",
        text: "The energetic one who makes everyone laugh",
        traits: ["playful", "extroverted"]
      },
      {
        id: "q3-d",
        text: "The reliable one who gets things done",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q3-e",
        text: "The artistic one with unique ideas",
        traits: ["creative", "passionate"]
      }
    ]
  },
  {
    id: "q4",
    text: "What quality do you value most in others?",
    options: [
      {
        id: "q4-a",
        text: "Intelligence and thoughtfulness",
        traits: ["intellectual", "introverted"]
      },
      {
        id: "q4-b",
        text: "Kindness and empathy",
        traits: ["caring", "optimistic"]
      },
      {
        id: "q4-c",
        text: "Creativity and expressiveness",
        traits: ["creative", "passionate"]
      },
      {
        id: "q4-d",
        text: "Reliability and hard work",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q4-e",
        text: "Humor and ability to have fun",
        traits: ["playful", "extroverted"]
      }
    ]
  },
  {
    id: "q5",
    text: "What's your ideal weekend?",
    options: [
      {
        id: "q5-a",
        text: "Quiet time with a book or watching documentaries",
        traits: ["intellectual", "introverted"]
      },
      {
        id: "q5-b",
        text: "Creating art, music, or writing",
        traits: ["creative", "passionate"]
      },
      {
        id: "q5-c",
        text: "Going to parties or social gatherings",
        traits: ["playful", "extroverted"]
      },
      {
        id: "q5-d",
        text: "Improving a skill or working on personal projects",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q5-e",
        text: "Spending quality time with loved ones",
        traits: ["caring", "optimistic"]
      }
    ]
  },
  {
    id: "q6",
    text: "How do you handle stress?",
    options: [
      {
        id: "q6-a",
        text: "Analyze the problem and create a step-by-step plan",
        traits: ["intellectual", "disciplined"]
      },
      {
        id: "q6-b",
        text: "Express yourself through art or music",
        traits: ["creative", "passionate"]
      },
      {
        id: "q6-c",
        text: "Talk it out with friends or help others to forget your own stress",
        traits: ["caring", "extroverted"]
      },
      {
        id: "q6-d",
        text: "Work harder to overcome the challenge",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q6-e",
        text: "Use humor to lighten the mood",
        traits: ["playful", "optimistic"]
      }
    ]
  },
  {
    id: "q7",
    text: "What's most important to you in your life journey?",
    options: [
      {
        id: "q7-a",
        text: "Growing intellectually and understanding the world",
        traits: ["intellectual", "passionate"]
      },
      {
        id: "q7-b",
        text: "Making others happy and creating positive connections",
        traits: ["caring", "optimistic"]
      },
      {
        id: "q7-c",
        text: "Creating something beautiful or meaningful",
        traits: ["creative", "passionate"]
      },
      {
        id: "q7-d",
        text: "Achieving your goals through hard work",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q7-e",
        text: "Having fun and enjoying every moment",
        traits: ["playful", "extroverted"]
      }
    ]
  },
  {
    id: "q8",
    text: "Which type of music resonates with you most?",
    options: [
      {
        id: "q8-a",
        text: "Complex, thoughtful lyrics with deep meaning",
        traits: ["intellectual", "passionate"]
      },
      {
        id: "q8-b",
        text: "Upbeat, energetic songs that make you want to dance",
        traits: ["playful", "extroverted"]
      },
      {
        id: "q8-c",
        text: "Emotional ballads that touch your heart",
        traits: ["caring", "passionate"]
      },
      {
        id: "q8-d",
        text: "Unique, experimental sounds and artistic expression",
        traits: ["creative", "introverted"]
      },
      {
        id: "q8-e",
        text: "Feel-good anthems that inspire positivity",
        traits: ["optimistic", "disciplined"]
      }
    ]
  },
  {
    id: "q9",
    text: "How do you prefer to express your emotions?",
    options: [
      {
        id: "q9-a",
        text: "Through deep conversations and thoughtful words",
        traits: ["intellectual", "caring"]
      },
      {
        id: "q9-b",
        text: "Through creative outlets like art, music, or writing",
        traits: ["creative", "passionate"]
      },
      {
        id: "q9-c",
        text: "By being physically affectionate and supportive",
        traits: ["caring", "extroverted"]
      },
      {
        id: "q9-d",
        text: "Through actions and dedication to my goals",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q9-e",
        text: "With humor and playfulness to keep things light",
        traits: ["playful", "optimistic"]
      }
    ]
  },
  {
    id: "q10",
    text: "What motivates you to work hard?",
    options: [
      {
        id: "q10-a",
        text: "The desire to learn and grow intellectually",
        traits: ["intellectual", "disciplined"]
      },
      {
        id: "q10-b",
        text: "Passion for creating something meaningful",
        traits: ["creative", "passionate"]
      },
      {
        id: "q10-c",
        text: "Making a positive impact on others' lives",
        traits: ["caring", "optimistic"]
      },
      {
        id: "q10-d",
        text: "Personal satisfaction and achieving excellence",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q10-e",
        text: "The joy of sharing success with others",
        traits: ["playful", "extroverted"]
      }
    ]
  },
  {
    id: "q11",
    text: "In a group project, what role do you naturally take?",
    options: [
      {
        id: "q11-a",
        text: "The researcher who gathers information and analyzes data",
        traits: ["intellectual", "introverted"]
      },
      {
        id: "q11-b",
        text: "The creative visionary who comes up with innovative ideas",
        traits: ["creative", "passionate"]
      },
      {
        id: "q11-c",
        text: "The mediator who keeps everyone motivated and happy",
        traits: ["caring", "extroverted"]
      },
      {
        id: "q11-d",
        text: "The organizer who ensures everything gets done on time",
        traits: ["disciplined", "realistic"]
      },
      {
        id: "q11-e",
        text: "The energizer who keeps the mood light and fun",
        traits: ["playful", "optimistic"]
      }
    ]
  },
  {
    id: "q12",
    text: "What's your approach to personal style and self-expression?",
    options: [
      {
        id: "q12-a",
        text: "Classic and thoughtful - I prefer timeless, meaningful choices",
        traits: ["intellectual", "realistic"]
      },
      {
        id: "q12-b",
        text: "Artistic and unique - I love experimenting with creative looks",
        traits: ["creative", "passionate"]
      },
      {
        id: "q12-c",
        text: "Warm and approachable - I choose styles that make others comfortable",
        traits: ["caring", "optimistic"]
      },
      {
        id: "q12-d",
        text: "Clean and polished - I appreciate well-executed, refined aesthetics",
        traits: ["disciplined", "introverted"]
      },
      {
        id: "q12-e",
        text: "Fun and expressive - I like styles that show my playful personality",
        traits: ["playful", "extroverted"]
      }
    ]
  }
];

// Member compatibility profiles
export const memberCompatibilityProfiles: MemberCompatibility[] = [
  {
    name: "RM",
    slug: "rm",
    image: "/images/members/rm.jpg",
    primaryTraits: ["intellectual", "creative"],
    secondaryTraits: ["caring", "introverted"],
    compatibleWith: [
      {
        slug: "suga",
        reason: "You value deep thinking and creative expression, so you'll appreciate Suga's thoughtful lyrics and production. You both share an introspective nature and intellectual approach."
      },
      {
        slug: "jin",
        reason: "Jin's playfulness and caring nature can balance your intellectual side, creating a complementary dynamic that brings warmth to your thoughtful nature."
      }
    ],
    personalityDescription: "RM is a thoughtful intellectual with profound creativity. He values knowledge, philosophical discussions, and artistic expression. With his high IQ and reflective nature, he approaches both music and life with depth and careful consideration."
  },
  {
    name: "Jin",
    slug: "jin",
    image: "/images/members/jin.jpg",
    primaryTraits: ["caring", "playful"],
    secondaryTraits: ["optimistic", "realistic"],
    compatibleWith: [
      {
        slug: "j-hope",
        reason: "You both share a joyful energy and care deeply for others. J-Hope's optimism perfectly complements your playful spirit and warm heart."
      },
      {
        slug: "v",
        reason: "V's creative spirit and playful side align with your fun-loving nature, while your caring personality balances his unique expressiveness."
      }
    ],
    personalityDescription: "Jin combines warmth and humor to create a joyful presence. As the group's mood-maker, he uses humor to lighten tense situations and takes care of others through acts of service like cooking. His realistic outlook grounds his optimistic nature."
  },
  {
    name: "Suga",
    slug: "suga",
    image: "/images/members/suga.jpg",
    primaryTraits: ["intellectual", "realistic"],
    secondaryTraits: ["passionate", "introverted"],
    compatibleWith: [
      {
        slug: "rm",
        reason: "You share RM's intellectual depth and thoughtful approach to life. Your realistic perspective balances his creative idealism, making for stimulating conversations."
      },
      {
        slug: "jungkook",
        reason: "Your grounded wisdom and realistic perspective can guide Jungkook's disciplined work ethic, while his passion and enthusiasm can energize your introspective nature."
      }
    ],
    personalityDescription: "Suga combines deep thought with realistic pragmatism. Behind his seemingly blunt exterior lies passion for his craft and care for those around him. He approaches challenges with straightforward solutions and values honest expression."
  },
  {
    name: "J-Hope",
    slug: "j-hope",
    image: "/images/members/jhope.jpg",
    primaryTraits: ["optimistic", "disciplined"],
    secondaryTraits: ["extroverted", "caring"],
    compatibleWith: [
      {
        slug: "jin",
        reason: "You and Jin both bring brightness to any room. Your optimistic discipline complements his playful caring nature, creating a positive and supportive dynamic."
      },
      {
        slug: "jimin",
        reason: "Your disciplined approach to performance complements Jimin's passionate dedication, while your shared extroverted and caring nature creates a strong connection."
      }
    ],
    personalityDescription: "J-Hope combines sunshine optimism with surprising discipline. He's the group's mood-maker who works tirelessly behind the scenes. His extroverted energy lifts others' spirits, while his structured approach ensures growth and success."
  },
  {
    name: "Jimin",
    slug: "jimin",
    image: "/images/members/jimin.jpg",
    primaryTraits: ["passionate", "caring"],
    secondaryTraits: ["disciplined", "extroverted"],
    compatibleWith: [
      {
        slug: "v",
        reason: "Your passionate and caring nature perfectly complements V's creative and playful spirit. Your friendship shows how your personalities enhance each other."
      },
      {
        slug: "j-hope",
        reason: "You both share discipline in your craft and a caring nature. J-Hope's optimism balances your intense passion, creating a harmonious and supportive connection."
      }
    ],
    personalityDescription: "Jimin embodies passionate intensity wrapped in a caring heart. His attention to detail in performances shows his disciplined nature, while his affectionate interactions reveal his warm personality. He feels deeply and gives generously."
  },
  {
    name: "V",
    slug: "v",
    image: "/images/members/v.jpg",
    primaryTraits: ["creative", "playful"],
    secondaryTraits: ["passionate", "introverted"],
    compatibleWith: [
      {
        slug: "jimin",
        reason: "Your creative spirit and playfulness align with Jimin's passionate and caring nature. Your friendship shows how your different approaches to life complement each other beautifully."
      },
      {
        slug: "jin",
        reason: "You both share a playful spirit that brings joy to others. Jin's caring nature supports your creative expression, while your unique perspective inspires his humor."
      }
    ],
    personalityDescription: "V blends unique creativity with playful charm. He sees the world through an artistic lens and expresses himself in unconventional ways. Though outwardly playful, he has a deep inner world rich with creative ideas and emotional depth."
  },
  {
    name: "Jungkook",
    slug: "jungkook",
    image: "/images/members/jungkook.jpg",
    primaryTraits: ["disciplined", "passionate"],
    secondaryTraits: ["playful", "introverted"],
    compatibleWith: [
      {
        slug: "v",
        reason: "V's creative playfulness balances your disciplined passion. Your quieter side connects with his introverted depth, creating a supportive friendship."
      },
      {
        slug: "suga",
        reason: "You admire Suga's realistic approach and straight-talking wisdom. His intellectual depth complements your disciplined nature, guiding your passionate dedication."
      }
    ],
    personalityDescription: "Jungkook combines disciplined dedication with passionate intensity. The 'Golden Maknae' works tirelessly to perfect his skills while maintaining playful enthusiasm. Though sometimes shy with strangers, he's energetic with close friends and approaches challenges with unwavering determination."
  }
];

// Find match based on user's primary bias and their traits
export function findCompatibilityMatch(
  primaryBias: string, 
  userTraits: string[]
): { 
  primaryMatch: MemberCompatibility,
  secondaryMatch: MemberCompatibility,
  tertiaryMatch: MemberCompatibility,
  traitSummary: string,
  compatibilityScore: number,
  traitBreakdown: Record<string, number>,
  allScores: Array<{member: MemberCompatibility, score: number, percentage: number}>
} {
  // Get the user's primary bias member profile
  const primaryMember = memberCompatibilityProfiles.find(member => member.slug === primaryBias);
  
  if (!primaryMember) {
    throw new Error("Primary bias not found");
  }
  
  // Calculate trait compatibility scores for all other members
  const compatibilityScores = memberCompatibilityProfiles
    .filter(member => member.slug !== primaryBias)
    .map(member => {
      // Count exact trait matches
      const primaryTraitMatches = member.primaryTraits.filter(trait => 
        userTraits.includes(trait)
      ).length;
      
      const secondaryTraitMatches = member.secondaryTraits.filter(trait => 
        userTraits.includes(trait)
      ).length;
      
      // Calculate total traits for this member
      const totalMemberTraits = member.primaryTraits.length + member.secondaryTraits.length;
      const totalUserTraits = userTraits.length;
      
      // Weight primary traits more heavily
      const weightedMatches = (primaryTraitMatches * 2) + secondaryTraitMatches;
      const maxPossibleWeighted = (member.primaryTraits.length * 2) + member.secondaryTraits.length;
      
      // Calculate base compatibility
      let baseCompatibility = 0;
      if (maxPossibleWeighted > 0) {
        baseCompatibility = (weightedMatches / maxPossibleWeighted) * 100;
      }
      
      // Add member-specific personality factor (based on their unique characteristics)
      let personalityBonus = 0;
      
      // Give different members different base compatibility ranges
      switch (member.slug) {
        case 'rm':
          personalityBonus = userTraits.includes('intellectual') ? 15 : userTraits.includes('creative') ? 10 : 0;
          break;
        case 'jin':
          personalityBonus = userTraits.includes('caring') ? 15 : userTraits.includes('playful') ? 12 : 0;
          break;
        case 'suga':
          personalityBonus = userTraits.includes('realistic') ? 15 : userTraits.includes('introverted') ? 10 : 0;
          break;
        case 'j-hope':
          personalityBonus = userTraits.includes('optimistic') ? 15 : userTraits.includes('disciplined') ? 12 : 0;
          break;
        case 'jimin':
          personalityBonus = userTraits.includes('passionate') ? 15 : userTraits.includes('caring') ? 12 : 0;
          break;
        case 'v':
          personalityBonus = userTraits.includes('creative') ? 15 : userTraits.includes('playful') ? 10 : 0;
          break;
        case 'jungkook':
          personalityBonus = userTraits.includes('disciplined') ? 15 : userTraits.includes('passionate') ? 10 : 0;
          break;
      }
      
      // Calculate final percentage with realistic distribution
      let finalPercentage = Math.round(baseCompatibility + personalityBonus);
      
      // Ensure realistic ranges with variance for each member
      const memberVariance = {
        'rm': Math.floor(Math.random() * 15) + 5, // 5-20 variance
        'jin': Math.floor(Math.random() * 12) + 3, // 3-15 variance  
        'suga': Math.floor(Math.random() * 18) + 2, // 2-20 variance
        'j-hope': Math.floor(Math.random() * 14) + 4, // 4-18 variance
        'jimin': Math.floor(Math.random() * 16) + 3, // 3-19 variance
        'v': Math.floor(Math.random() * 13) + 6, // 6-19 variance
        'jungkook': Math.floor(Math.random() * 17) + 4 // 4-21 variance
      }[member.slug] || 10;
      
      // Apply member-specific variance
      finalPercentage += memberVariance;
      
      // Ensure realistic bounds (30-92% to avoid extremes)
      finalPercentage = Math.max(30, Math.min(92, finalPercentage));
      
      // Ensure no ties by adding small member-specific adjustments
      const tieBreaker = {
        'rm': 2,
        'jin': -1, 
        'suga': 3,
        'j-hope': 1,
        'jimin': -2,
        'v': 0,
        'jungkook': 1
      }[member.slug] || 0;
      
      finalPercentage += tieBreaker;
      finalPercentage = Math.max(25, Math.min(95, finalPercentage));
      
      return {
        member,
        score: weightedMatches,
        percentage: finalPercentage
      };
    })
    .sort((a, b) => {
      // Sort by percentage, then by score as tiebreaker
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return b.score - a.score;
    });
  
  // Get primary, secondary, and tertiary matches
  const primaryMatch = compatibilityScores[0]?.member || memberCompatibilityProfiles[0];
  const secondaryMatch = compatibilityScores[1]?.member || memberCompatibilityProfiles[1];
  const tertiaryMatch = compatibilityScores[2]?.member || memberCompatibilityProfiles[2];
  
  // Get the most common traits for the user
  const traitCounts: Record<string, number> = {};
  userTraits.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1;
  });
  
  // Sort traits by frequency and get personality trait names
  const sortedTraits = Object.entries(traitCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([traitId]) => personalityTraits.find(t => t.id === traitId)?.trait || "")
    .filter(trait => trait !== "");
  
  // Generate more realistic trait summary
  const topTraits = sortedTraits.slice(0, 2);
  const compatibilityScore = compatibilityScores[0]?.percentage || 0;
  
  let traitSummary = "";
  if (topTraits.length >= 2) {
    traitSummary = `Your ${topTraits[0].toLowerCase()} and ${topTraits[1].toLowerCase()} nature shows ${compatibilityScore}% compatibility with ${primaryMatch.name}'s personality.`;
  } else if (topTraits.length === 1) {
    traitSummary = `Your ${topTraits[0].toLowerCase()} personality aligns well with ${primaryMatch.name}, showing ${compatibilityScore}% compatibility.`;
  } else {
    traitSummary = `Your unique personality traits create a ${compatibilityScore}% compatibility match with ${primaryMatch.name}.`;
  }
  
  return {
    primaryMatch,
    secondaryMatch,
    tertiaryMatch,
    traitSummary,
    compatibilityScore,
    traitBreakdown: traitCounts,
    allScores: compatibilityScores
  };
} 