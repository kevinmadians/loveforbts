/**
 * Timezone utility functions for Korean Standard Time (KST)
 */

/**
 * Get the current date and time in Korean Standard Time (KST)
 * @returns Date object in KST
 */
export function getCurrentDateInKST(): Date {
  // Create a date object for the current time
  const now = new Date();
  
  // Get UTC time in milliseconds
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  
  // KST is UTC+9
  const kstTime = utcTime + (9 * 60 * 60 * 1000);
  
  // Return the KST date
  return new Date(kstTime);
}

/**
 * Convert a date to Korean Standard Time (KST)
 * @param date Date to convert
 * @returns Date object in KST
 */
export function convertToKST(date: Date): Date {
  if (!date || isNaN(date.getTime())) {
    return new Date(); // Return current date if invalid
  }
  
  // Get UTC time in milliseconds
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  
  // KST is UTC+9
  const kstTime = utcTime + (9 * 60 * 60 * 1000);
  
  // Return the KST date
  return new Date(kstTime);
}

/**
 * Convert a date string to a Date object in Korean Standard Time (KST)
 * @param dateString Date string to convert
 * @returns Date object in KST
 */
export function parseKSTDate(dateString: string): Date {
  // Parse the date string
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return new Date(); // Return current date if invalid
  }
  
  // Return the date in KST
  return convertToKST(date);
}

/**
 * Format a date to include "KST" time zone indicator
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string with KST indicator
 */
export function formatKSTDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  if (!date || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  
  const kstDate = convertToKST(date);
  
  // Default options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Format the date
  return `${new Intl.DateTimeFormat("en-US", mergedOptions).format(kstDate)} KST`;
} 