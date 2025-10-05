"use client"

import { UserProfile } from "@/components/UserProfile"
import { AuthProvider } from "@/lib/simple-auth"
import { Navigation } from "@/components/Navigation"

export default function ProfilePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation subtitle="Profile" />
        <UserProfile />
      </div>
    </AuthProvider>
  )
}