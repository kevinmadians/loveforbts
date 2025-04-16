"use client"

import { useState, useEffect, useCallback } from "react"

type Comment = {
  id: number
  name: string
  country: string
  message: string
  date: string
}

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all comments
  const fetchComments = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/comments")
      
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`)
      }
      
      const data = await response.json()
      setComments(data)
    } catch (err) {
      console.error("Error fetching comments:", err)
      setError("Failed to load comments. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Add a new comment
  const addComment = useCallback(async (newComment: Omit<Comment, "id" | "date">) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to add comment: ${response.status}`)
      }

      // Get the newly created comment from the response
      const createdComment = await response.json()
      
      // Update the local state with the new comment
      setComments(prev => [createdComment, ...prev])
      
      return { success: true, data: createdComment }
    } catch (err: any) {
      console.error("Error adding comment:", err)
      setError(err.message || "Failed to add comment. Please try again.")
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Load comments on first render
  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
  }
} 