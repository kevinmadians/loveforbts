// Interface for member photos
export interface MemberPhotos {
  [key: string]: string[]; // Member slug -> array of photo paths
}

// Collection of varied photos for each member
export const memberVariedPhotos: MemberPhotos = {
  "rm": [
    "/images/members/varied/rm/rm-1.jpg",
    "/images/members/varied/rm/rm-2.jpg",
    "/images/members/varied/rm/rm-3.jpg",
    "/images/members/varied/rm/rm-4.jpg",
    "/images/members/varied/rm/rm-5.jpg",
  ],
  "jin": [
    "/images/members/varied/jin/jin-1.jpg",
    "/images/members/varied/jin/jin-2.jpg",
    "/images/members/varied/jin/jin-3.jpg",
    "/images/members/varied/jin/jin-4.jpg",
    "/images/members/varied/jin/jin-5.jpg",
  ],
  "suga": [
    "/images/members/varied/suga/suga-1.jpg",
    "/images/members/varied/suga/suga-2.jpg",
    "/images/members/varied/suga/suga-3.jpg",
    "/images/members/varied/suga/suga-4.jpg",
    "/images/members/varied/suga/suga-5.jpg",
  ],
  "j-hope": [
    "/images/members/varied/j-hope/jhope-1.jpg",
    "/images/members/varied/j-hope/jhope-2.jpg",
    "/images/members/varied/j-hope/jhope-3.jpg",
    "/images/members/varied/j-hope/jhope-4.jpg",
    "/images/members/varied/j-hope/jhope-5.jpg",
  ],
  "jimin": [
    "/images/members/varied/jimin/jimin-1.jpg",
    "/images/members/varied/jimin/jimin-2.jpg",
    "/images/members/varied/jimin/jimin-3.jpg",
    "/images/members/varied/jimin/jimin-4.jpg",
    "/images/members/varied/jimin/jimin-5.jpg",
  ],
  "v": [
    "/images/members/varied/v/v-1.jpg",
    "/images/members/varied/v/v-2.jpg",
    "/images/members/varied/v/v-3.jpg",
    "/images/members/varied/v/v-4.jpg",
    "/images/members/varied/v/v-5.jpg",
  ],
  "jungkook": [
    "/images/members/varied/jungkook/jungkook-1.jpg",
    "/images/members/varied/jungkook/jungkook-2.jpg",
    "/images/members/varied/jungkook/jungkook-3.jpg",
    "/images/members/varied/jungkook/jungkook-4.jpg",
    "/images/members/varied/jungkook/jungkook-5.jpg",
  ],
  "ot7": [
    "/images/members/varied/ot7/ot7-1.jpg",
    "/images/members/varied/ot7/ot7-2.jpg",
    "/images/members/varied/ot7/ot7-3.jpg",
    "/images/members/varied/ot7/ot7-4.jpg",
  ]
};

/**
 * Get a random photo for a specific member with time-based rotation
 * @param memberSlug The member's slug
 * @returns A photo path that changes every few hours
 */
export function getRandomMemberPhoto(memberSlug: string): string {
  const photos = memberVariedPhotos[memberSlug] || [];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return `/images/members/${memberSlug}.jpg`;
  }
  
  // Use time-based selection for dynamic changes
  const now = new Date();
  const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 4)); // Changes every 4 hours
  const index = hoursSinceEpoch % photos.length;
  return photos[index];
}

/**
 * Get multiple different random photos for a member
 * @param memberSlug The member's slug
 * @param count Number of different photos to return
 * @returns Array of unique random photo paths
 */
export function getMultipleMemberPhotos(memberSlug: string, count: number): string[] {
  const photos = [...(memberVariedPhotos[memberSlug] || [])];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return [`/images/members/${memberSlug}.jpg`];
  }
  
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }
  
  // Return the first 'count' photos, or all if count > photos.length
  return photos.slice(0, Math.min(count, photos.length));
}

/**
 * Get the current photo for ARMY Card display with dynamic rotation
 * This ensures the same photo is shown during a user's session but changes over time
 * @param memberSlug The member's slug
 * @returns A photo path that's consistent during session but changes periodically
 */
export function getArmyCardPhoto(memberSlug: string): string {
  const photos = memberVariedPhotos[memberSlug] || [];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return `/images/members/${memberSlug}.jpg`;
  }
  
  // Use a combination of date and memberSlug for consistent but dynamic selection
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const memberHash = memberSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = (dayOfYear + memberHash) % photos.length;
  return photos[index];
}

/**
 * Get the next photo in sequence for manual cycling
 * @param memberSlug The member's slug
 * @param currentPhoto The current photo path
 * @returns The next photo in the sequence
 */
export function getNextMemberPhoto(memberSlug: string, currentPhoto: string): string {
  const photos = memberVariedPhotos[memberSlug] || [];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return `/images/members/${memberSlug}.jpg`;
  }
  
  // Find the current photo index
  const currentIndex = photos.indexOf(currentPhoto);
  
  // If current photo is not found or is the last one, return the first photo
  if (currentIndex === -1 || currentIndex >= photos.length - 1) {
    return photos[0];
  }
  
  // Return the next photo in sequence
  return photos[currentIndex + 1];
}

/**
 * Get a random photo from the available varied photos
 * @param memberSlug The member's slug
 * @returns A random photo path
 */
export function getRandomVariedPhoto(memberSlug: string): string {
  const photos = memberVariedPhotos[memberSlug] || [];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return `/images/members/${memberSlug}.jpg`;
  }
  
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
} 