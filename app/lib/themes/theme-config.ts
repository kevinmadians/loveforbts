export interface ThemeColors {
  // Primary colors
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  
  // Background colors
  background: string
  foreground: string
  
  // Accent colors
  accent: string
  accentForeground: string
  
  // UI elements
  border: string
  input: string
  ring: string
  
  // Card colors
  card: string
  cardForeground: string
  
  // Muted colors
  muted: string
  mutedForeground: string
  
  // BTS specific
  btsAccent: string
  btsSecondary: string
  
  // Navbar specific
  navbarBg: string
  navbarText: string
  navbarHover: string
}

export interface ThemeConfig {
  id: string
  name: string
  displayName: string
  description: string
  album: string
  colors: ThemeColors
  elements: {
    patterns?: string[]
    animations?: string[]
    emojis?: string[]
  }
}

// Spring Day Theme - Soft pastels, renewal, gentle hope
export const springDayTheme: ThemeConfig = {
  id: 'spring-day',
  name: 'spring-day',
  displayName: 'Spring Day',
  description: 'Soft pastels, renewal, gentle hope',
  album: 'You Never Walk Alone',
  colors: {
    // Primary: Soft Pastel Blue
    primary: '#A8C8EC',
    primaryForeground: '#2A2A2A',
    
    // Secondary: Soft Peach
    secondary: '#F5C6A0',
    secondaryForeground: '#2A2A2A',
    
    // Background: Pure white
    background: '#FFFFFF',
    foreground: '#333333',
    
    // Accent: Soft Lavender
    accent: '#D4B5F0',
    accentForeground: '#2A2A2A',
    
    // UI elements
    border: '#A8C8EC',
    input: '#FAFCFE',
    ring: '#A8C8EC',
    
    // Cards: Very light pastels
    card: '#FAFCFE',
    cardForeground: '#333333',
    
    // Muted: Light pastel grey
    muted: '#F0F4F8',
    mutedForeground: '#777777',
    
    // BTS specific colors
    btsAccent: '#A8C8EC',
    btsSecondary: '#D4B5F0',
    
    // Navbar: Soft pastel blue
    navbarBg: '#A8C8EC',
    navbarText: '#2A2A2A',
    navbarHover: '#96BAEA'
  },
  elements: {
    patterns: ['soft-petals', 'light-snow', 'gentle-breeze', 'morning-mist', 'pastel-clouds'],
    animations: ['gentle-float', 'soft-glow', 'light-drift', 'subtle-bloom', 'calm-wave'],
    emojis: ['🌸', '☁️', '🕊️', '💙', '🌺', '🦋', '🌊', '✨', '🎨', '💫']
  }
}

// Black Swan Theme - Elegant darkness, artistic passion, fear of creative death
export const blackSwanTheme: ThemeConfig = {
  id: 'black-swan',
  name: 'black-swan',
  displayName: 'Black Swan',
  description: 'Elegant darkness, artistic passion, fear of creative death',
  album: 'Map of the Soul: 7',
  colors: {
    // Primary: Deep Charcoal Black
    primary: '#1A1A1A',
    primaryForeground: '#FFFFFF',
    
    // Secondary: Elegant Gold (like ballet decorations)
    secondary: '#D4A574',
    secondaryForeground: '#000000',
    
    // Background: Almost black with subtle warmth
    background: '#0F0F0F',
    foreground: '#E8E8E8',
    
    // Accent: Ethereal White (swan feathers)
    accent: '#F8F8F8',
    accentForeground: '#1A1A1A',
    
    // UI elements
    border: '#333333',
    input: '#1F1F1F',
    ring: '#D4A574',
    
    // Cards: Dark grey with subtle gold tint
    card: '#1F1F1F',
    cardForeground: '#E8E8E8',
    
    // Muted: Dark greys
    muted: '#2A2A2A',
    mutedForeground: '#A0A0A0',
    
    // BTS specific colors
    btsAccent: '#D4A574',
    btsSecondary: '#F8F8F8',
    
    // Navbar: Deep black
    navbarBg: '#1A1A1A',
    navbarText: '#FFFFFF',
    navbarHover: '#333333'
  },
  elements: {
    patterns: ['swan-feathers', 'ballet-stage', 'dramatic-shadows', 'golden-lights', 'dark-reflections'],
    animations: ['graceful-drift', 'elegant-float', 'dramatic-fade', 'swan-glide', 'shadow-dance'],
    emojis: ['🖤', '🦢', '🎭', '✨', '🌙', '💫', '🎪', '🖋️', '🎨', '🔮']
  }
}

// Love Yourself結 Answer Theme - Colorful gradient love, self-acceptance, flowing beauty
export const loveYourselfAnswerTheme: ThemeConfig = {
  id: 'love-yourself-answer',
  name: 'love-yourself-answer',
  displayName: 'Love Yourself結 Answer',
  description: 'Colorful gradient love, self-acceptance, flowing beauty',
  album: 'Love Yourself 結 Answer',
  colors: {
    // Primary: Vibrant Pink (left side of gradient)
    primary: '#E91E63',
    primaryForeground: '#FFFFFF',
    
    // Secondary: Deep Purple (center of gradient)
    secondary: '#9C27B0',
    secondaryForeground: '#FFFFFF',
    
    // Background: Pure white to let the colors pop
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    
    // Accent: Bright Blue (right side of gradient)
    accent: '#2196F3',
    accentForeground: '#FFFFFF',
    
    // UI elements
    border: '#E91E63',
    input: '#FFF0F7',
    ring: '#E91E63',
    
    // Cards: Very light pink tint
    card: '#FEFAFC',
    cardForeground: '#1A1A1A',
    
    // Muted: Soft lavender
    muted: '#F3E5F5',
    mutedForeground: '#666666',
    
    // BTS specific colors
    btsAccent: '#E91E63',
    btsSecondary: '#9C27B0',
    
    // Navbar: Gradient effect (primary pink)
    navbarBg: '#E91E63',
    navbarText: '#FFFFFF',
    navbarHover: '#C2185B'
  },
  elements: {
    patterns: ['flowing-lines', 'gradient-waves', 'love-hearts', 'color-streams', 'rainbow-mist'],
    animations: ['gradient-flow', 'love-pulse', 'color-shift', 'flowing-motion', 'rainbow-wave'],
    emojis: ['💜', '💖', '🌈', '💫', '✨', '🎨', '🦋', '💕', '🌸', '🔮']
  }
}

// Permission to Dance Theme - Festival, celebration, freedom vibes
export const permissionToDanceTheme: ThemeConfig = {
  id: 'permission-to-dance',
  name: 'permission-to-dance',
  displayName: 'Permission to Dance',
  description: 'Festival, celebration, freedom vibes',
  album: 'Permission to Dance',
  colors: {
    // Primary: Sunset Orange
    primary: '#FF6B35',
    primaryForeground: '#FFFFFF',
    
    // Secondary: Purple
    secondary: '#8A2BE2',
    secondaryForeground: '#FFFFFF',
    
    // Background: White with warm tints
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    
    // Accent: Sunset Orange
    accent: '#FF6B35',
    accentForeground: '#FFFFFF',
    
    // UI elements
    border: '#FF6B35',
    input: '#FFF5F0',
    ring: '#FF6B35',
    
    // Cards: Light orange tint
    card: '#FFF8F5',
    cardForeground: '#1A1A1A',
    
    // Muted: Soft orange
    muted: '#FFF0E6',
    mutedForeground: '#666666',
    
    // BTS specific colors
    btsAccent: '#FF6B35',
    btsSecondary: '#8A2BE2',
    
    // Navbar: Sunset Orange
    navbarBg: '#FF6B35',
    navbarText: '#000000',
    navbarHover: '#E55A2B'
  },
  elements: {
    patterns: ['confetti', 'balloons', 'party-decorations', 'sparkles', 'celebration-burst'],
    animations: ['float', 'bounce', 'celebration', 'dance', 'sparkle', 'party-wave'],
    emojis: ['🎉', '🎊', '💃', '🕺', '🎈', '🎆', '✨', '🌟', '🎭', '🎪', '🎨', '🌈']
  }
}

// Butter Theme (Current) - Keep existing
export const butterTheme: ThemeConfig = {
  id: 'butter',
  name: 'butter',
  displayName: 'Butter',
  description: 'Smooth, bright, summery vibes',
  album: 'Butter',
  colors: {
    // Primary: Golden Yellow
    primary: '#FFDE00',
    primaryForeground: '#000000',
    
    // Secondary: Cream
    secondary: '#FFF8DC',
    secondaryForeground: '#000000',
    
    // Background: White
    background: '#FFFFFF',
    foreground: '#000000',
    
    // Accent: Golden Yellow
    accent: '#FFDE00',
    accentForeground: '#000000',
    
    // UI elements
    border: '#000000',
    input: '#FFFFFF',
    ring: '#FFDE00',
    
    // Cards
    card: '#FFFFFF',
    cardForeground: '#000000',
    
    // Muted: Light cream
    muted: '#FFF8DC',
    mutedForeground: '#666666',
    
    // BTS specific
    btsAccent: '#FFDE00',
    btsSecondary: '#FFF8DC',
    
    // Navbar: Golden Yellow
    navbarBg: '#FFDE00',
    navbarText: '#000000',
    navbarHover: '#E5C700'
  },
  elements: {
    patterns: ['sunflower', 'smooth-gradients'],
    animations: ['smooth', 'glow'],
    emojis: ['🌻', '☀️', '💛', '✨']
  }
}

// Available themes registry
export const availableThemes: Record<string, ThemeConfig> = {
  'butter': butterTheme,
  'permission-to-dance': permissionToDanceTheme,
  'spring-day': springDayTheme,
  'black-swan': blackSwanTheme,
  'love-yourself-answer': loveYourselfAnswerTheme
}

// Default theme
export const defaultTheme = 'butter'

// Get theme by ID
export const getTheme = (themeId: string): ThemeConfig => {
  return availableThemes[themeId] || availableThemes[defaultTheme]
}

// Get all theme IDs
export const getAllThemeIds = (): string[] => {
  return Object.keys(availableThemes)
}

// Get all themes
export const getAllThemes = (): ThemeConfig[] => {
  return Object.values(availableThemes)
} 