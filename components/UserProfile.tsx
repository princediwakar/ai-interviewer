"use client"

import { useState, useEffect } from 'react'
import { useSession, signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { usePreferences } from '@/hooks/usePreferences'

export function UserProfile() {
  const { data: session } = useSession()
  const { preferences, updatePreferences, loading: preferencesLoading } = usePreferences()
  
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState('mid')
  const [emailNotifications, setEmailNotifications] = useState(true)

  useEffect(() => {
    if (preferences) {
      setSelectedRoles(preferences.preferredRoles || [])
      setSelectedDifficulty(preferences.defaultDifficulty || 'mid')
      setEmailNotifications(preferences.emailNotifications ?? true)
    }
  }, [preferences])

  if (!session?.user) {
    return <div>Please log in to view your profile.</div>
  }

  const difficulties = ['entry', 'mid', 'senior', 'expert']
  const roles = [
    { id: 'engineering', label: '⚙️ Engineering', description: 'Software engineering roles' },
    { id: 'product', label: '📊 Product', description: 'Product management roles' },
    { id: 'marketing', label: '🎯 Marketing', description: 'Marketing and growth roles' },
    { id: 'sales', label: '💼 Sales', description: 'Sales and business development' },
    { id: 'data-science', label: '📈 Data Science', description: 'Data analysis and ML roles' },
    { id: 'operations', label: '⚡ Operations', description: 'Operations and business roles' }
  ]

  const handleRoleToggle = (roleId: string) => {
    const updated = selectedRoles.includes(roleId)
      ? selectedRoles.filter(r => r !== roleId)
      : [...selectedRoles, roleId]
    setSelectedRoles(updated)
  }

  const handleSavePreferences = async () => {
    const success = await updatePreferences({
      preferredRoles: selectedRoles,
      defaultDifficulty: selectedDifficulty,
      emailNotifications
    })
    
    if (success) {
      alert('Preferences saved!')
    } else {
      alert('Failed to save preferences. Please try again.')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'entry': return 'bg-green-100 text-green-800 border-green-300'
      case 'mid': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'senior': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'expert': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Profile</h1>
            <p className="text-gray-600">
              <strong>Name:</strong> {session.user.name || 'Not provided'}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {session.user.email}
            </p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </Card>

     

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <p className="text-gray-600 mb-6">
          Set your default preferences for question filtering and notifications.
        </p>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Preferred Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => handleRoleToggle(role.id)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedRoles.includes(role.id)
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{role.label}</div>
                <div className="text-sm opacity-75">{role.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Default Difficulty Level</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-md border-2 transition-colors capitalize ${
                  selectedDifficulty === difficulty
                    ? getDifficultyColor(difficulty)
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable email notifications</span>
          </label>
        </div>

        <Button 
          onClick={handleSavePreferences} 
          disabled={preferencesLoading}
          className="w-full md:w-auto"
        >
          {preferencesLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </Card>
    </div>
  )
}