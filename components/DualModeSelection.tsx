// components/DualModeSelection.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface DualModeSelectionProps {
  onAIGenerationSelect: () => void;
}

export function DualModeSelection({ onAIGenerationSelect }: DualModeSelectionProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Interview Prep Approach
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get personalized questions for a specific job or practice with our curated question bank
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* AI Generation Mode */}
        <Card className="p-8 cursor-pointer border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div 
            onClick={onAIGenerationSelect}
            className="relative z-10"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  🤖
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  AI-Powered Generation
                </h2>
                <p className="text-gray-600 font-medium">
                  For specific job preparation
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Upload your job description and background</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Get AI-generated questions tailored to the role</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Receive personalized answer guidance</p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-800">
                  <strong>Best for:</strong> When you have a specific job you&apos;re interviewing for
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 group-hover:shadow-lg">
                Start AI Generation
              </button>
            </div>
          </div>
        </Card>

        {/* Question Bank Mode */}
        <Card className="p-8 cursor-pointer border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <Link href="/question-bank" className="block relative z-10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  📚
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Curated Question Bank
                </h2>
                <p className="text-gray-600 font-medium">
                  For role-based practice
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Choose from 6 professional roles</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Practice with 129+ expertly curated questions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-700">Filter by difficulty and question type</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Best for:</strong> General interview prep and skill building by role
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 group-hover:shadow-lg">
                Browse Question Bank
              </button>
            </div>
          </Link>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">129+</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-sm text-gray-600">Role Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">AI</div>
            <div className="text-sm text-gray-600">Powered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">∞</div>
            <div className="text-sm text-gray-600">Possibilities</div>
          </div>
        </div>
      </div>
    </div>
  );
}