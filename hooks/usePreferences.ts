"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"

export interface UserPreferences {
  preferredRoles: string[]
  defaultDifficulty: string
  emailNotifications: boolean
}

export function usePreferences() {
  const { data: session } = useSession()
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredRoles: [],
    defaultDifficulty: "mid",
    emailNotifications: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPreferences = async () => {
    if (!session?.user) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/preferences")
      
      if (!response.ok) {
        throw new Error("Failed to fetch preferences")
      }
      
      const data = await response.json()
      setPreferences(data.preferences)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!session?.user) {
      setError("Please sign in to update preferences")
      return false
    }

    try {
      const response = await fetch("/api/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update preferences")
      }

      const data = await response.json()
      setPreferences(data.preferences)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchPreferences()
    }
  }, [session?.user])

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    refetch: fetchPreferences,
  }
}