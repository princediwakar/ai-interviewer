// lib/questionBank/index.ts
/**
 * Question Bank - Curated questions organized by role
 * Separate from JD-based AI generation
 */

import { DifficultyLevel, Question, QuestionType } from '@/types/interview';

export type Role = 
  | 'engineering'
  | 'product-management' 
  | 'marketing'
  | 'sales'
  | 'data-science'
  | 'operations';

export interface RoleInfo {
  id: Role;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

export const ROLES: RoleInfo[] = [
  {
    id: 'engineering',
    name: 'Software Engineering',
    description: 'Frontend, Backend, Full-stack, Mobile development roles',
    icon: '💻',
    questionCount: 0
  },
  {
    id: 'product-management',
    name: 'Product Management',
    description: 'Product Manager, Product Owner, Strategy roles',
    icon: '📊',
    questionCount: 0
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital Marketing, Growth, Brand, Content Marketing',
    icon: '📈',
    questionCount: 0
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Account Executive, Sales Development, Business Development',
    icon: '💼',
    questionCount: 0
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Data Scientist, ML Engineer, Data Analyst',
    icon: '🔬',
    questionCount: 0
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Operations Manager, Project Manager, Business Operations',
    icon: '⚙️',
    questionCount: 0
  }
];

export interface QuestionFilters {
  difficulty?: DifficultyLevel[];
  type?: QuestionType[];
  tags?: string[];
}

// FIX: Ensure all method signatures in the interface ONLY return a Promise<T>.
// This will correctly match your async class implementation.
export interface QuestionBank {
  getQuestionsByRole(role: Role): Promise<Question[]>;
  getQuestionsByFilters(role: Role, filters: QuestionFilters): Promise<Question[]>;
  getAllRoles(): Promise<RoleInfo[]>;
  getTagsForRole(role: Role): Promise<string[]>;
  searchQuestions(role: Role, searchTerm: string): Promise<Question[]>;
  getTotalQuestionCount(): Promise<number>;
  getQuestionById(id: string): Promise<Question | null>;
}
