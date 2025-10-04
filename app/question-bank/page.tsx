'use client';

import { useState } from 'react';
import { RoleSelection } from '@/components/RoleSelection';
import { QuestionBrowser } from '@/components/QuestionBrowser';
import { QuestionPractice } from '@/components/QuestionPractice';
import { Question } from '@/types/interview';
import { Role } from '@/lib/questionBank/questionBank';
import { Logo } from '../Logo';
import Link from 'next/link';

type ViewState = 'role-selection' | 'question-browser' | 'question-practice';

export default function QuestionBankPage() {
  const [currentView, setCurrentView] = useState<ViewState>('role-selection');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentView('question-browser');
  };

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setCurrentView('question-practice');
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setSelectedQuestion(null);
    setCurrentView('role-selection');
  };

  const handleBackToQuestions = () => {
    setSelectedQuestion(null);
    setCurrentView('question-browser');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo className="h-6 w-auto text-gray-900" />
              <h1 className="text-xl font-semibold text-gray-900">AceTheRole</h1>
              <span className="text-sm text-gray-500 ml-2">Question Bank</span>
            </div>
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
              Custom Generation
            </Link>
          </div>
        </div>
      </header>

      {currentView === 'role-selection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}

      {currentView === 'question-browser' && selectedRole && (
        <QuestionBrowser
          role={selectedRole}
          onBack={handleBackToRoles}
          onQuestionSelect={handleQuestionSelect}
        />
      )}

      {currentView === 'question-practice' && selectedQuestion && (
        <QuestionPractice
          question={selectedQuestion}
          onBack={handleBackToQuestions}
        />
      )}
    </div>
  );
}