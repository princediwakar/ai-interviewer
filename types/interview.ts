// types/interview.ts
export type GenerationState = 'idle' | 'streaming' | 'completed' | 'error';

export type QuestionType = 'behavioral' | 'technical' | 'case-study' | 'situational' | 'leadership';
export type DifficultyLevel = 'entry' | 'mid' | 'senior' | 'expert';

export interface Question {
  text: string;
  tags: string[];
  type: QuestionType;
  difficulty: DifficultyLevel;
  personalized?: boolean;
  estimatedTime?: number; // minutes
}

export interface InterviewRound {
  name: string;
  description: string;
  icon: string;
  questions: Question[];
  estimatedDuration?: number; // minutes
}

export interface QuestionState {
  question: string;
  tags: string[];
  type: QuestionType;
  difficulty: DifficultyLevel;
  personalized?: boolean;
  estimatedTime?: number;
  showGuidance: boolean;
  guidance?: string;
  showFullAnswer: boolean;
  fullAnswer?: string;
  isLoadingGuidance: boolean;
  isLoadingFullAnswer: boolean;
}