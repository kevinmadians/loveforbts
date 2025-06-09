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
  'permission-to-dance': permissionToDanceTheme
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