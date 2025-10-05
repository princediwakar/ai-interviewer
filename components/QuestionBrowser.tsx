// components/QuestionBrowser.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Question, QuestionType, DifficultyLevel } from '@/types/interview';
import { type Role, type QuestionFilters } from '@/lib/questionBank/questionBank';
import { FilterPanel } from './FilterPanel';
import { Button } from './ui/button';

interface QuestionBrowserProps {
  role: Role;
  initialQuestions: Question[];
  availableTags: string[];
  onBack: () => void;
  onQuestionSelect: (question: Question) => void;
}

export function QuestionBrowser({ 
  role, 
  initialQuestions,
  availableTags,
  onBack, 
  onQuestionSelect 
}: QuestionBrowserProps) {
  const [allQuestions] = useState<Question[]>(initialQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(initialQuestions);
  
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [loading] = useState(false);

  useEffect(() => {
    let tempQuestions = [...allQuestions];

    if (filters.difficulty && filters.difficulty.length > 0) {
      tempQuestions = tempQuestions.filter(q => filters.difficulty!.includes(q.difficulty));
    }

    if (filters.type && filters.type.length > 0) {
      tempQuestions = tempQuestions.filter(q => filters.type!.includes(q.type));
    }

    if (filters.tags && filters.tags.length > 0) {
      tempQuestions = tempQuestions.filter(q => 
        filters.tags!.some(tag => q.tags.includes(tag))
      );
    }

    if (searchTerm.trim()) {
      const lowercasedTerm = searchTerm.toLowerCase();
      tempQuestions = tempQuestions.filter(
        (q) =>
          q.text.toLowerCase().includes(lowercasedTerm) ||
          q.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    setFilteredQuestions(tempQuestions);
  }, [filters, searchTerm, allQuestions]);

  const questionTypes: QuestionType[] = ['technical', 'case-study', 'situational', 'leadership'];
  const difficultyLevels: DifficultyLevel[] = ['entry', 'mid', 'senior', 'expert'];

  const toggleFilter = (filterType: keyof QuestionFilters, value: string) => {
    setFilters((prev) => {
      const currentValues = (prev[filterType] as string[] | undefined) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues.length > 0 ? newValues : undefined,
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
    <div>
      <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 font-medium">
            Question Bank
          </button>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">
            {role.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {role.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Questions
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {filteredQuestions.length} of {allQuestions.length} questions showing
            </p>
          </div>
          <div className="w-full sm:w-auto flex gap-3">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              variant="outline"
              onClick={() => setIsFilterPanelOpen(true)}
              className="flex items-center gap-2"
            >
              <span>🔍</span>
              <span className="hidden sm:inline">Filters</span>
              {Object.values(filters).flat().filter(Boolean).length > 0 && (
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {Object.values(filters).flat().filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>
        </div>

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onFilterChange={toggleFilter}
          onClearFilters={clearFilters}
          questionTypes={questionTypes}
          difficultyLevels={difficultyLevels}
          availableTags={availableTags}
        />

        <div className="space-y-4">
          {loading ? (
             <div className="text-center py-12">...</div>
          ) : filteredQuestions.length === 0 ? (
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
            filteredQuestions.map((question) => (
              <Card
                key={question.id}
                className="p-4 sm:p-6 hover:shadow-md transition-shadow border border-gray-200 hover:border-gray-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg">{getQuestionTypeIcon(question.type)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    {question.estimatedTime && <span className="text-xs text-gray-500">
                      ~{question.estimatedTime} min
                    </span>}
                  </div>
                </div>
                <h3
                  className="text-lg font-medium text-gray-900 mb-3 leading-relaxed cursor-pointer"
                  onClick={() => onQuestionSelect(question)}
                >
                  {question.text}
                </h3>
                <div
                  className="flex flex-wrap gap-2 cursor-pointer"
                  onClick={() => onQuestionSelect(question)}
                >
                  {question.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}