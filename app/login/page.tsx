"use client"

import { Auth } from "@/components/Auth"
import { AuthProvider } from "@/lib/simple-auth"

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Auth />
        </div>
      </div>
    </AuthProvider>
  )
}