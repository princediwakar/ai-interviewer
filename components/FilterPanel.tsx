'use client';

import { QuestionFilters} from '@/lib/questionBank/questionBank';
import {DifficultyLevel, QuestionType} from '@/types/interview'
import { Button } from './ui/button';
// Assuming you are using lucide-react for icons
import { X } from 'lucide-react';

// Define the props interface for the FilterPanel component
export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: QuestionFilters;
  onFilterChange: (filterType: keyof QuestionFilters, value: string) => void;
  onClearFilters: () => void;
  questionTypes: QuestionType[];
  difficultyLevels: DifficultyLevel[];
  // FIX: Add the missing 'availableTags' property to the interface
  availableTags: string[];
}

// A simple utility to format filter names for display
const formatLabel = (label: string) => {
  return label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export function FilterPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  questionTypes,
  difficultyLevels,
  availableTags,
}: FilterPanelProps) {
  if (!isOpen) return null;

  return (
    // Overlay and Panel Container
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 transition-opacity" 
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col transform transition-transform ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Panel Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficultyLevels.map((level) => (
                <Button
                  key={level}
                  variant={filters.difficulty?.includes(level) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange('difficulty', level)}
                  className="rounded-full"
                >
                  {formatLabel(level)}
                </Button>
              ))}
            </div>
          </div>

          {/* Question Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Question Type</h3>
            <div className="flex flex-wrap gap-2">
              {questionTypes.map((type) => (
                <Button
                  key={type}
                  variant={filters.type?.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange('type', type)}
                  className="rounded-full"
                >
                  {formatLabel(type)}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags Filter - It now correctly uses the availableTags prop */}
          {availableTags && availableTags.length > 0 && (
             <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onFilterChange('tags', tag)}
                      className="rounded-full"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
             </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-4 border-t bg-gray-50 flex gap-4 flex-shrink-0">
           <Button variant="outline" className="flex-1" onClick={onClearFilters}>
            Clear All
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
