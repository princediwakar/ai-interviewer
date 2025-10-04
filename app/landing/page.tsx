'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '../Logo';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Logo className="h-12 w-auto text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">AceTheRole</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your interview preparation with personalized questions or curated question banks
          </p>
        </div>

        {/* Two Main Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Custom Generation */}
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prepare for Specific Job
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Paste your job description and get AI-generated, personalized interview questions 
              tailored to that exact role and your background.
            </p>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                AI-powered personalization
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Job-specific questions
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Instant answer guidance
              </div>
            </div>
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Start Custom Prep
              </Button>
            </Link>
          </Card>

          {/* Question Bank */}
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200 group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Practice by Role
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Browse our curated collection of high-quality interview questions 
              organized by role - no job description needed.
            </p>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                150+ curated questions
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                6 major role categories
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Difficulty-based filtering
              </div>
            </div>
            <Link href="/question-bank">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                Browse Questions
              </Button>
            </Link>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Everything you need to ace your interviews
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Guidance</h4>
              <p className="text-sm text-gray-600">Get AI-powered tips for every question</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">✨</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Full Answers</h4>
              <p className="text-sm text-gray-600">Complete sample responses to learn from</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Export & Share</h4>
              <p className="text-sm text-gray-600">Save as PDF or share with others</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Search</h4>
              <p className="text-sm text-gray-600">Find questions by type, difficulty, or topic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}