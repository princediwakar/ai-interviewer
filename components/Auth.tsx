// components/Auth.tsx

"use client"

import { useState } from "react"
import Image from "next/image"
import { signIn, signOut, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function Auth() {
  const { data: session, isPending } = useSession()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true)
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      })
    } catch (error) {
      console.error("Sign in error:", error)
      // You could set an error state here to show a message to the user
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  // Show a simple loading skeleton while checking the session
  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
    )
  }

  // If the user is signed in, show their details
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {session.user.name || session.user.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  // If the user is signed out, show the sign-in button
  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isSigningIn}
      variant="outline"
    >
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {isSigningIn ? "Signing in..." : "Sign In"}
    </Button>
  )
}