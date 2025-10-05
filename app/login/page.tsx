"use client"

import { Auth } from "@/components/Auth"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
      <Auth />
      </div>
    </div>
  )
}