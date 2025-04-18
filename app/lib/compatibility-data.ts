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
  traitSummary: string
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
      // Calculate how many of the user's traits match this member's traits
      const primaryTraitMatches = member.primaryTraits.filter(trait => 
        userTraits.includes(trait)
      ).length;
      
      const secondaryTraitMatches = member.secondaryTraits.filter(trait => 
        userTraits.includes(trait)
      ).length;
      
      // Primary traits are weighted higher
      const score = (primaryTraitMatches * 2) + secondaryTraitMatches;
      
      return {
        member,
        score
      };
    })
    .sort((a, b) => b.score - a.score);
  
  // Get primary and secondary matches
  const primaryMatch = compatibilityScores[0]?.member || memberCompatibilityProfiles[0];
  const secondaryMatch = compatibilityScores[1]?.member || memberCompatibilityProfiles[1];
  
  // Get the most common traits for the user
  const traitCounts: Record<string, number> = {};
  userTraits.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1;
  });
  
  // Sort traits by frequency
  const sortedTraits = Object.entries(traitCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([traitId]) => personalityTraits.find(t => t.id === traitId)?.trait || "");
  
  // Generate trait summary
  const topTraits = sortedTraits.slice(0, 3);
  const traitSummary = `You tend to be ${topTraits.join(", ").toLowerCase()} in your approach to life, which aligns well with ${primaryMatch.name}'s personality.`;
  
  return {
    primaryMatch,
    secondaryMatch,
    traitSummary
  };
} 