"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/simple-auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function UserProfile() {
  const { user, updatePreferences, logout } = useAuth()
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    user?.preferences?.defaultDifficulty || []
  )
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(
    user?.preferences?.defaultQuestionTypes || []
  )

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  const difficulties = ['entry', 'mid', 'senior', 'expert']
  const questionTypes = [
    { id: 'technical', label: '⚙️ Technical', description: 'Technical implementation questions' },
    { id: 'case-study', label: '📊 Case Study', description: 'Business case analysis' },
    { id: 'situational', label: '🎯 Situational', description: 'Scenario-based questions' },
    { id: 'leadership', label: '👥 Leadership', description: 'Management and leadership' }
  ]

  const handleDifficultyToggle = (difficulty: string) => {
    const updated = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty]
    setSelectedDifficulties(updated)
  }

  const handleQuestionTypeToggle = (type: string) => {
    const updated = selectedQuestionTypes.includes(type)
      ? selectedQuestionTypes.filter(t => t !== type)
      : [...selectedQuestionTypes, type]
    setSelectedQuestionTypes(updated)
  }

  const handleSavePreferences = () => {
    updatePreferences({
      defaultDifficulty: selectedDifficulties,
      defaultQuestionTypes: selectedQuestionTypes
    })
    alert('Preferences saved!')
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
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Bookmarks:</strong> {user.bookmarks.length} questions
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Question Preferences</h2>
        <p className="text-gray-600 mb-6">
          Set your default preferences for question filtering. These will be automatically applied when you browse questions.
        </p>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Preferred Difficulty Levels</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyToggle(difficulty)}
                className={`px-4 py-2 rounded-md border-2 transition-colors capitalize ${
                  selectedDifficulties.includes(difficulty)
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
          <h3 className="font-medium mb-3">Preferred Question Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questionTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleQuestionTypeToggle(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedQuestionTypes.includes(type.id)
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{type.label}</div>
                <div className="text-sm opacity-75">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSavePreferences} className="w-full md:w-auto">
          Save Preferences
        </Button>
      </Card>
    </div>
  )
}