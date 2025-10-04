'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question, QuestionType, DifficultyLevel } from '@/types/interview';
import { 
  getQuestionsByRole, 
  filterQuestions, 
  getTagsForRole,
  type Role, 
  type QuestionFilters 
} from '@/lib/questionBank/questionBank';

interface QuestionBrowserProps {
  role: Role;
  onBack: () => void;
  onQuestionSelect: (question: Question) => void;
}

export function QuestionBrowser({ role, onBack, onQuestionSelect }: QuestionBrowserProps) {
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const allQuestions = getQuestionsByRole(role);
  const availableTags = getTagsForRole(role);

  const filteredQuestions = useMemo(() => {
    let questions = filterQuestions(role, filters);
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      questions = questions.filter(q =>
        q.text.toLowerCase().includes(term) ||
        q.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    return questions;
  }, [role, filters, searchTerm]);

  const questionTypes: QuestionType[] = ['technical', 'case-study', 'situational', 'leadership'];
  const difficultyLevels: DifficultyLevel[] = ['entry', 'mid', 'senior', 'expert'];

  const toggleFilter = (filterType: keyof QuestionFilters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value as any)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value as any];
      
      return {
        ...prev,
        [filterType]: newValues.length > 0 ? newValues : undefined
      };
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'technical': return '⚙️';
      case 'case-study': return '📊';
      case 'situational': return '🎯';
      case 'leadership': return '👥';
      default: return '❓';
    }
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-yellow-100 text-yellow-800';
      case 'senior': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2"
          >
            ← Back to roles
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Questions
          </h1>
        </div>
        <div className="text-sm text-gray-600">
          {filteredQuestions.length} of {allQuestions.length} questions
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Question Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type
            </label>
            <div className="flex flex-wrap gap-2">
              {questionTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('type', type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.type?.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {getQuestionTypeIcon(type)} {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficultyLevels.map(level => (
                <button
                  key={level}
                  onClick={() => toggleFilter('difficulty', level)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.difficulty?.includes(level)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(Object.keys(filters).length > 0 || searchTerm) && (
            <div>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No questions found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          filteredQuestions.map((question, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300"
              onClick={() => onQuestionSelect(question)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getQuestionTypeIcon(question.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    ~{question.estimatedTime} min
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3 leading-relaxed">
                {question.text}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {question.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}