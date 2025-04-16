/**
 * Utility for handling calendar operations
 */

export interface CalendarEventDetails {
  text: string
  dates: {
    start: string
    end: string
  }
  details: string
  location?: string
}

/**
 * Add an event to Google Calendar
 * @param eventDetails The event details
 * @param callback Optional callback function to execute after opening the calendar
 */
export function addToGoogleCalendar(
  eventDetails: CalendarEventDetails,
  callback?: () => void
): void {
  try {
    const { text, dates, details, location = "" } = eventDetails;
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      text
    )}&dates=${dates.start}/${dates.end}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
    
    window.open(url, "_blank");
    
    // Execute callback if provided
    if (callback && typeof callback === "function") {
      callback();
    }
  } catch (error) {
    console.error("Error adding to Google Calendar:", error);
    throw error;
  }
} 