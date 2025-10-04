"use client"

import { useState } from "react"
import { useAuth } from "@/lib/simple-auth"
import { Button } from "@/components/ui/button"

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { user, login, register, logout, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      let success = false
      if (isLogin) {
        success = await login(email, password)
        if (!success) {
          setError("Invalid email or password")
        }
      } else {
        success = await register(email, password, name)
        if (!success) {
          setError("User already exists")
        }
      }
      
      if (success) {
        setEmail("")
        setPassword("")
        setName("")
      }
    } catch (error) {
      console.error("Auth error:", error)
      setError("An error occurred. Please try again.")
    }
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome, {user.name || user.email}!</span>
        <Button 
          variant="outline" 
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required={!isLogin}
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            minLength={6}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"
          }
        </button>
      </div>
    </div>
  )
}