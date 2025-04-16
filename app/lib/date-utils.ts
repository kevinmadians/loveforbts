import { format as dateFnsFormat, isValid } from "date-fns"
import { getCurrentDateInKST, convertToKST } from "./timezone-utils"

/**
 * Safely format a date with error handling
 * @param date Date to format
 * @param formatStr Format string for date-fns
 * @param fallback Fallback string if date is invalid
 * @returns Formatted date string or fallback
 */
export function safeFormat(date: Date | undefined, formatStr: string, fallback: string = ""): string {
  if (!date || !isValid(date)) return fallback;
  try {
    return dateFnsFormat(date, formatStr);
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    return fallback;
  }
}

/**
 * Helper function to calculate days left from a target date
 * @param targetDate The target date to calculate days left until
 * @param currentDate The current date (defaults to now in KST)
 * @returns Number of days left (0 if date is invalid or in the past)
 */
export function getDaysLeft(targetDate: Date, currentDate: Date = getCurrentDateInKST()): number {
  try {
    if (!targetDate || !isValid(targetDate)) return 0;
    
    const diffTime = targetDate.getTime() - currentDate.getTime()
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  } catch (error) {
    console.error("Error calculating days left:", error);
    return 0;
  }
}

/**
 * Calculate progress percentage based on days left until discharge
 * @param targetDate The target discharge date
 * @param currentDate The current date (defaults to now in KST)
 * @param startDate The service start date (defaults to Dec 12, 2023)
 * @returns Progress percentage (0-100)
 */
export function getProgress(targetDate: Date, currentDate: Date = getCurrentDateInKST(), startDate: Date = new Date("2023-12-12")): number {
  try {
    if (!targetDate || !isValid(targetDate)) return 0;
    
    // If already discharged (target date is in the past)
    if (targetDate < currentDate) return 100;
    
    // Get standard service length (approximately 18 months)
    const standardServiceDays = 548; 
    
    // Calculate days left
    const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Calculate progress based on days left relative to standard service length
    // Member with more days left will have less progress
    const progress = 100 - ((daysLeft / standardServiceDays) * 100);
    
    // Cap progress between 0-100 and format to fixed 2 decimal places
    return Number(Math.min(100, Math.max(0, progress)).toFixed(2));
  } catch (error) {
    console.error("Error calculating progress:", error);
    return 0;
  }
}

/**
 * Format a Google Calendar compatible date from a Date object
 * @param date The date to format for Google Calendar
 * @returns Formatted date string (YYYYMMDD)
 */
export function formatCalendarDate(date: Date | undefined): string {
  if (!date || !isValid(date)) {
    // Return today's date as fallback
    return safeFormat(getCurrentDateInKST(), "yyyyMMdd");
  }
  return safeFormat(date, "yyyyMMdd");
}

/**
 * Create a range description for an event (e.g. "Apr 5 - Apr 10, 2025" or "April 5, 2025")
 * @param startDate Event start date
 * @param endDate Event end date (optional)
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date, endDate?: Date): string {
  if (!startDate || !isValid(startDate)) {
    return "Date unavailable";
  }
  
  if (endDate && isValid(endDate)) {
    return `${safeFormat(startDate, "MMM d")} - ${safeFormat(endDate, "MMM d, yyyy")}`;
  }
  
  return safeFormat(startDate, "MMMM d, yyyy");
} 