import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === "production" ? "https://your-domain.com" : "http://localhost:3002"
})

export const { 
  signIn, 
  signOut, 
  signUp, 
  useSession 
} = authClient