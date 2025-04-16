/**
 * Comment type for fan messages
 */
export type Comment = {
  id: number
  name: string
  country: string
  message: string
  date: string
}

/**
 * Form data type for comment submission
 */
export type CommentFormData = Omit<Comment, "id" | "date">

/**
 * Event type for calendar events
 */
export type CalendarEvent = {
  id: number
  title: string
  date: string
  description?: string
  link?: string
  type: "concert" | "release" | "appearance" | "other"
}

/**
 * API response type for success
 */
export type ApiSuccessResponse<T> = {
  success: true
  data: T
}

/**
 * API response type for errors
 */
export type ApiErrorResponse = {
  success: false
  error: string
}

/**
 * Combined API response type
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Navigation link type
 */
export type NavLink = {
  title: string
  href: string
  icon?: string
} 