// lib/simple-auth.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  preferences: {
    defaultDifficulty: string[]
    defaultQuestionTypes: string[]
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, name?: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  updatePreferences: (preferences: Partial<User['preferences']>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple in-memory storage for demo purposes
const users: Record<string, { email: string; password: string; name: string }> = {}
const SESSION_KEY = 'auth_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(SESSION_KEY)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (_e) {
        localStorage.removeItem(SESSION_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userData = users[email]
    if (userData && userData.password === password) {
      const user = {
        id: email,
        email: userData.email,
        name: userData.name,
        preferences: {
          defaultDifficulty: [],
          defaultQuestionTypes: []
        }
      }
      setUser(user)
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (users[email]) {
      setIsLoading(false)
      return false // User already exists
    }
    
    users[email] = { email, password, name }
    const user = { 
      id: email, 
      email, 
      name, 
      preferences: {
        defaultDifficulty: [],
        defaultQuestionTypes: []
      }
    }
    setUser(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }




  const updatePreferences = (newPreferences: Partial<User['preferences']>) => {
    if (!user) return
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...newPreferences
      }
    }
    setUser(updatedUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}