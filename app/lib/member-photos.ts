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
  ]
};

/**
 * Get a random photo for a specific member
 * @param memberSlug The member's slug
 * @returns A random photo path from the member's collection
 */
export function getRandomMemberPhoto(memberSlug: string): string {
  const photos = memberVariedPhotos[memberSlug] || [];
  if (photos.length === 0) {
    // Fallback to the standard photo
    return `/images/members/${memberSlug}.jpg`;
  }
  
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
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