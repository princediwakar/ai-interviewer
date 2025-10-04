/**
 * Question Bank - Curated questions organized by role
 * Separate from JD-based AI generation
 */

import { Question } from '@/types/interview';

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

// Question bank interface
export interface QuestionBank {
  getQuestionsByRole(role: Role): Question[];
  getQuestionsByFilters(role: Role, filters: QuestionFilters): Question[];
  getAllRoles(): RoleInfo[];
}

export interface QuestionFilters {
  difficulty?: Question['difficulty'][];
  type?: Question['type'][];
  tags?: string[];
}

// Implementation will be added in individual role files
export * from './engineering';
export * from './product';
export * from './marketing';
export * from './sales';
export * from './dataScience';
export * from './operations';