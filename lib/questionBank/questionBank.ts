// lib/questionBank/questionBank.ts

import { db } from '../db';
import { questions } from '../db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { Question, DifficultyLevel, QuestionType } from '@/types/interview';
import { Role, RoleInfo, QuestionBank, QuestionFilters, ROLES } from './index';

// Create a precise type for a question object selected from the database
type DbQuestion = typeof questions.$inferSelect;

// Helper to convert db question to frontend question with strong types
function dbToFrontendQuestion(dbQuestion: DbQuestion): Question {
  return {
    id: dbQuestion.id,
    text: dbQuestion.question,
    // FIX: Assert that the generic 'string' from the DB conforms to the specific literal types
    difficulty: dbQuestion.difficulty as DifficultyLevel,
    type: dbQuestion.type as QuestionType,
    // Ensure tags is always an array
    tags: dbQuestion.tags ?? [],
  };
}

class DbQuestionBank implements QuestionBank {
  async getQuestionsByRole(role: Role): Promise<Question[]> {
    const dbQuestions = await db.select().from(questions).where(eq(questions.role, role));
    return dbQuestions.map(dbToFrontendQuestion);
  }

  async getQuestionsByFilters(role: Role, filters: QuestionFilters): Promise<Question[]> {
    const conditions = [eq(questions.role, role)];

    if (filters.difficulty && filters.difficulty.length > 0) {
      conditions.push(inArray(questions.difficulty, filters.difficulty));
    }
    if (filters.type && filters.type.length > 0) {
      conditions.push(inArray(questions.type, filters.type));
    }
    
    let dbQuestions = await db.select().from(questions).where(and(...conditions));

    // Filter by tags in memory after the main query
    if (filters.tags && filters.tags.length > 0) {
        dbQuestions = dbQuestions.filter(q =>
            filters.tags!.some(tag => (q.tags ?? []).includes(tag))
        );
    }

    return dbQuestions.map(dbToFrontendQuestion);
  }

  async getAllRoles(): Promise<RoleInfo[]> {
    const result = await db.select({
        role: questions.role,
        count: sql<number>`count(${questions.id})`
    }).from(questions).groupBy(questions.role);

    const roleCounts = result.reduce((acc, row) => {
        acc[row.role as Role] = Number(row.count);
        return acc;
    }, {} as Record<Role, number>);

    return ROLES.map(role => ({
      ...role,
      questionCount: roleCounts[role.id] || 0
    }));
  }

  async getTagsForRole(role: Role): Promise<string[]> {
    const result = await db.selectDistinct({ tags: questions.tags }).from(questions).where(eq(questions.role, role));
    const allTags = result.flatMap(row => row.tags ?? []);
    return [...new Set(allTags)].sort();
  }

  async searchQuestions(role: Role, searchTerm: string): Promise<Question[]> {
      const dbQuestions = await this.getQuestionsByRole(role);
      const term = searchTerm.toLowerCase();
      return dbQuestions.filter(q =>
        q.text.toLowerCase().includes(term) ||
        q.tags.some(tag => tag.toLowerCase().includes(term))
      );
  }

  async getTotalQuestionCount(): Promise<number> {
      const result = await db.select({
          count: sql<number>`count(${questions.id})`
      }).from(questions);
      return Number(result[0].count);
  }

  async getQuestionById(id: string): Promise<Question | null> {
    const result = await db.select().from(questions).where(eq(questions.id, id));
    if (result.length === 0) {
        return null;
    }
    return dbToFrontendQuestion(result[0]);
  }
}

export const questionBank = new DbQuestionBank();

export async function getQuestionsByRole(role: Role): Promise<Question[]> {
    return questionBank.getQuestionsByRole(role);
}

export async function filterQuestions(role: Role, filters: QuestionFilters): Promise<Question[]> {
    return questionBank.getQuestionsByFilters(role, filters);
}

export async function getAllRoles(): Promise<RoleInfo[]> {
    return questionBank.getAllRoles();
}

export async function searchQuestions(role: Role, searchTerm: string): Promise<Question[]> {
    return questionBank.searchQuestions(role, searchTerm);
}

export async function getTagsForRole(role: Role): Promise<string[]> {
    return questionBank.getTagsForRole(role);
}

export async function getQuestionById(id: string): Promise<Question | null> {
    return questionBank.getQuestionById(id);
}

export { type Role, type RoleInfo, type QuestionFilters } from './index';