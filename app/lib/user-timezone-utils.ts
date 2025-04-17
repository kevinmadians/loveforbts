/**
 * Utility functions for working with dates in the user's local timezone
 */

/**
 * Get the current date in the user's local timezone
 * @returns Date object in local timezone
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Format a date for display in the user's local timezone
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatLocalDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  if (!date || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  
  // Default options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Format the date in local timezone
  return new Intl.DateTimeFormat(navigator.language || "en-US", mergedOptions).format(date);
}

/**
 * Format a date string in the user's local timezone with short month format
 * @param dateString ISO date string 
 * @returns Formatted date in user's locale
 */
export function formatDateInLocalFormat(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (!date || isNaN(date.getTime())) return "Invalid Date";
    
    // Format using user's locale
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    
    return new Intl.DateTimeFormat(navigator.language || "en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown date";
  }
}

/**
 * Calculate days left until a target date in user's local timezone
 * @param targetDate The target date to calculate days left until
 * @returns Number of days left (0 if date is invalid or in the past)
 */
export function getLocalDaysLeft(targetDate: Date): number {
  try {
    if (!targetDate || isNaN(targetDate.getTime())) return 0;
    
    const currentDate = new Date();
    const diffTime = targetDate.getTime() - currentDate.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  } catch (error) {
    console.error("Error calculating days left:", error);
    return 0;
  }
}

/**
 * Calculate progress percentage based on days left until a target date
 * @param targetDate The target date
 * @param totalDays Total number of days for the period
 * @returns Progress percentage (0-100)
 */
export function getLocalProgress(targetDate: Date, totalDays: number = 548): number {
  try {
    if (!targetDate || isNaN(targetDate.getTime())) return 0;
    
    const currentDate = new Date();
    
    // If target date is in the past
    if (targetDate < currentDate) return 100;
    
    // Calculate days left
    const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Calculate progress based on days left relative to total days
    const progress = 100 - ((daysLeft / totalDays) * 100);
    
    // Cap progress between 0-100 and format to fixed 2 decimal places
    return Number(Math.min(100, Math.max(0, progress)).toFixed(2));
  } catch (error) {
    console.error("Error calculating progress:", error);
    return 0;
  }
}

/**
 * Format a date in Google Calendar format with user's local timezone
 * @param date The date to format
 * @returns Formatted date string for Google Calendar
 */
export function formatLocalCalendarDate(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    // Return today's date as fallback
    const today = new Date();
    
    // Create a date string in format YYYYMMDD
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    return dateStr;
  }
  
  // Format as YYYYMMDD (Google Calendar format)
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  return dateStr;
} 