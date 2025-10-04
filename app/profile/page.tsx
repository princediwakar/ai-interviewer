"use client"

import { UserProfile } from "@/components/UserProfile"
import { AuthProvider } from "@/lib/simple-auth"
import { Logo } from "../Logo"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Logo className="h-6 w-auto text-gray-900" />
                <h1 className="text-xl font-semibold text-gray-900">AceTheRole</h1>
                <span className="text-sm text-gray-500 ml-2">Profile</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                  Custom Generation
                </Link>
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                  Question Bank
                </Link>
              </div>
            </div>
          </div>
        </header>

        <UserProfile />
      </div>
    </AuthProvider>
  )
}