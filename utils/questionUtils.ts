// utils/questionUtils.ts
import type { QuestionType, DifficultyLevel } from '../types/interview';

export function getQuestionTypeConfig(type: QuestionType) {
  const configs = {
    behavioral: {
      label: 'Behavioral',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '🎯',
      description: 'Past experiences using STAR method'
    },
    technical: {
      label: 'Technical',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '⚙️',
      description: 'Role-specific technical knowledge'
    },
    'case-study': {
      label: 'Case Study',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: '📊',
      description: 'Strategic thinking scenarios'
    },
    situational: {
      label: 'Situational',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: '🤔',
      description: 'Hypothetical workplace situations'
    },
    leadership: {
      label: 'Leadership',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '👑',
      description: 'Vision and team management'
    }
  };

  return configs[type] || configs.behavioral;
}

export function getDifficultyConfig(difficulty: DifficultyLevel) {
  const configs = {
    entry: {
      label: 'Entry',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      level: 1,
      description: 'Basic role understanding (0-2 years)'
    },
    mid: {
      label: 'Mid',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      level: 2,
      description: 'Applied knowledge (2-5 years)'
    },
    senior: {
      label: 'Senior',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      level: 3,
      description: 'Strategic thinking (5+ years)'
    },
    expert: {
      label: 'Expert',
      color: 'bg-red-100 text-red-800 border-red-200',
      level: 4,
      description: 'Industry expertise (8+ years)'
    }
  };

  return configs[difficulty] || configs.mid;
}

export function formatEstimatedTime(minutes?: number): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function getQuestionTypeDistribution(questions: Array<{ type: QuestionType }>) {
  const distribution = questions.reduce((acc, q) => {
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
  }, {} as Record<QuestionType, number>);

  return Object.entries(distribution).map(([type, count]) => ({
    type: type as QuestionType,
    count,
    percentage: Math.round((count / questions.length) * 100)
  }));
}

export function getDifficultyDistribution(questions: Array<{ difficulty: DifficultyLevel }>) {
  const distribution = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<DifficultyLevel, number>);

  return Object.entries(distribution).map(([difficulty, count]) => ({
    difficulty: difficulty as DifficultyLevel,
    count,
    percentage: Math.round((count / questions.length) * 100)
  }));
}