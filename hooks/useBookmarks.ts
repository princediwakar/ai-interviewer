"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"

export interface Bookmark {
  id: number
  userId: string
  questionId: string
  createdAt: string
  question: {
    id: string
    role: string
    question: string
    difficulty: string
    type: string
    tags: string[]
  }
}

export function useBookmarks() {
  const { data: session } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBookmarks = async () => {
    if (!session?.user) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/bookmarks")
      
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks")
      }
      
      const data = await response.json()
      setBookmarks(data.bookmarks || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const addBookmark = async (questionId: string) => {
    if (!session?.user) {
      setError("Please sign in to bookmark questions")
      return false
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add bookmark")
      }

      await fetchBookmarks() // Refresh bookmarks
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  const removeBookmark = async (questionId: string) => {
    if (!session?.user) return false

    try {
      const response = await fetch(`/api/bookmarks?questionId=${questionId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove bookmark")
      }

      await fetchBookmarks() // Refresh bookmarks
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  const isBookmarked = (questionId: string) => {
    return bookmarks.some(bookmark => bookmark.questionId === questionId)
  }

  const toggleBookmark = async (questionId: string) => {
    if (isBookmarked(questionId)) {
      return await removeBookmark(questionId)
    } else {
      return await addBookmark(questionId)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchBookmarks()
    }
  }, [session?.user])

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    refetch: fetchBookmarks,
  }
}