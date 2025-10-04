/**
 * Main Question Bank Implementation
 * Provides centralized access to all curated questions
 */

import { Question } from '@/types/interview';
import { Role, RoleInfo, QuestionBank, QuestionFilters, ROLES } from './index';
import { ENGINEERING_QUESTIONS } from './engineering';
import { PRODUCT_QUESTIONS } from './product';
import { MARKETING_QUESTIONS } from './marketing';
import { SALES_QUESTIONS } from './sales';
import { DATA_SCIENCE_QUESTIONS } from './dataScience';
import { OPERATIONS_QUESTIONS } from './operations';

// Question bank implementation
class QuestionBankImpl implements QuestionBank {
  private questions: Record<Role, Question[]> = {
    'engineering': ENGINEERING_QUESTIONS,
    'product-management': PRODUCT_QUESTIONS,
    'marketing': MARKETING_QUESTIONS,
    'sales': SALES_QUESTIONS,
    'data-science': DATA_SCIENCE_QUESTIONS,
    'operations': OPERATIONS_QUESTIONS
  };

  getQuestionsByRole(role: Role): Question[] {
    return this.questions[role] || [];
  }

  getQuestionsByFilters(role: Role, filters: QuestionFilters): Question[] {
    let questions = this.getQuestionsByRole(role);

    // Apply difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      questions = questions.filter(q => filters.difficulty!.includes(q.difficulty));
    }

    // Apply type filter
    if (filters.type && filters.type.length > 0) {
      questions = questions.filter(q => filters.type!.includes(q.type));
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      questions = questions.filter(q => 
        filters.tags!.some(tag => q.tags.includes(tag))
      );
    }

    return questions;
  }

  getAllRoles(): RoleInfo[] {
    return ROLES.map(role => ({
      ...role,
      questionCount: this.questions[role.id]?.length || 0
    }));
  }

  // Get all unique tags across all questions for a role
  getTagsForRole(role: Role): string[] {
    const questions = this.getQuestionsByRole(role);
    const allTags = questions.flatMap(q => q.tags);
    return [...new Set(allTags)].sort();
  }

  // Get questions by search term
  searchQuestions(role: Role, searchTerm: string): Question[] {
    const questions = this.getQuestionsByRole(role);
    const term = searchTerm.toLowerCase();
    
    return questions.filter(q => 
      q.text.toLowerCase().includes(term) ||
      q.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  // Get total question count across all roles
  getTotalQuestionCount(): number {
    return Object.values(this.questions).reduce((total, roleQuestions) => 
      total + roleQuestions.length, 0
    );
  }
}

// Export singleton instance
export const questionBank = new QuestionBankImpl();

// Export utility functions
export function getQuestionsByRole(role: Role): Question[] {
  return questionBank.getQuestionsByRole(role);
}

export function filterQuestions(role: Role, filters: QuestionFilters): Question[] {
  return questionBank.getQuestionsByFilters(role, filters);
}

export function getAllRoles(): RoleInfo[] {
  return questionBank.getAllRoles();
}

export function searchQuestions(role: Role, searchTerm: string): Question[] {
  return questionBank.searchQuestions(role, searchTerm);
}

export function getTagsForRole(role: Role): string[] {
  return questionBank.getTagsForRole(role);
}

export { type Role, type RoleInfo, type QuestionFilters } from './index';