// types/interview.ts
export type GenerationState = 'idle' | 'streaming' | 'completed' | 'error';

export interface InterviewRound {
  name: string;
  description: string;
  icon: string;
  questions: { text: string; tags: string[]; personalized?: boolean }[];
}

export interface QuestionState {
  question: string;
  tags: string[];
  personalized?: boolean;
  showGuidance: boolean;
  guidance?: string;
  showFullAnswer: boolean;
  fullAnswer?: string;
  isLoadingGuidance: boolean;
  isLoadingFullAnswer: boolean;
}