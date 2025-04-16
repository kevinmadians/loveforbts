import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind's class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string into a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  
  // Return 'Invalid Date' if the date is not valid
  if (isNaN(date.getTime())) {
    return "Invalid Date"
  }
  
  // Format: Month Day, Year (e.g., April 15, 2023)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date)
}

/**
 * Truncate text to a specified length with an ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  
  return text.slice(0, maxLength) + "..."
}

/**
 * Check if a value is empty (undefined, null, empty string, empty array, or empty object)
 */
export function isEmpty(value: any): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  
  return false
}

/**
 * Capitalize the first letter of each word in a string
 */
export function capitalizeWords(str: string): string {
  if (!str) return ""
  
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

/**
 * Add an event to Google Calendar
 * @param eventDetails Event details to add to calendar
 * @param onSuccess Callback function to execute on success
 */
export function addToGoogleCalendar(
  eventDetails: {
    text: string;
    dates: {
      start: string;
      end: string;
    };
    details?: string;
    location?: string;
  },
  onSuccess?: () => void
): void {
  const { text, dates, details = "", location = "" } = eventDetails;
  
  // Format dates for Google Calendar URL (YYYYMMDD format)
  const startDate = dates.start;
  const endDate = dates.end;
  
  // Create Google Calendar URL
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  
  // Open in new tab
  window.open(calendarUrl, '_blank');
  
  // Call success callback if provided
  if (onSuccess) {
    onSuccess();
  }
} 