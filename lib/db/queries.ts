// lib/db/queries.ts
import "server-only";
import { db, userPreferences, questions, practiceSessions } from "./index";
import { eq, and, desc, ilike, SQL } from "drizzle-orm";
import type { NewUserPreferences, NewPracticeSession } from "./schema";

// User preferences operations
export async function getUserPreferences(userId: string) {
  const result = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);
  
  return result[0] || null;
}

export async function upsertUserPreferences(userId: string, data: Partial<NewUserPreferences>) {
  const existing = await getUserPreferences(userId);
  
  if (existing) {
    return await db
      .update(userPreferences)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userPreferences.userId, userId))
      .returning();
  } else {
    return await db
      .insert(userPreferences)
      .values({ userId, ...data })
      .returning();
  }
}

// Question operations with enhanced search
export async function searchQuestions(params: {
  role?: string;
  difficulty?: string;
  type?: string;
  searchTerm?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}) {
  // Base query builder
  const qb = db.select().from(questions);

  const conditions: SQL[] = [];

  if (params.role) {
    conditions.push(eq(questions.role, params.role));
  }
  
  if (params.difficulty) {
    conditions.push(eq(questions.difficulty, params.difficulty));
  }
  
  if (params.type) {
    conditions.push(eq(questions.type, params.type));
  }
  
  if (params.searchTerm) {
    conditions.push(ilike(questions.question, `%${params.searchTerm}%`));
  }
  
  // Conditionally apply the 'where' clause if there are any conditions
  const queryWithFilters = conditions.length > 0 
    ? qb.where(and(...conditions))
    : qb;

  // Apply ordering
  const queryWithOrdering = queryWithFilters.orderBy(desc(questions.createdAt));

  // Return the awaited result from each conditional branch directly.
  // This avoids variable reassignment and the complex union type issues.
  if (params.limit && params.offset) {
    return await queryWithOrdering.limit(params.limit).offset(params.offset);
  }
  
  if (params.limit) {
    return await queryWithOrdering.limit(params.limit);
  }
  
  if (params.offset) {
    return await queryWithOrdering.offset(params.offset);
  }
  
  // If no limit or offset is provided, return the base ordered query.
  return await queryWithOrdering;
}

export async function getQuestionById(id: string) {
  const result = await db
    .select()
    .from(questions)
    .where(eq(questions.id, id))
    .limit(1);
  
  return result[0] || null;
}

export async function getQuestionsByRole(role: string) {
  return await db
    .select()
    .from(questions)
    .where(eq(questions.role, role))
    .orderBy(questions.difficulty, questions.type);
}

// Practice session operations
export async function createPracticeSession(data: NewPracticeSession) {
  return await db.insert(practiceSessions).values(data).returning();
}

export async function updatePracticeSession(
  sessionId: string, 
  data: Partial<NewPracticeSession>
) {
  return await db
    .update(practiceSessions)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(practiceSessions.id, sessionId))
    .returning();
}

export async function getUserPracticeSessions(userId: string, limit = 20) {
  return await db
    .select({
      session: practiceSessions,
      question: questions
    })
    .from(practiceSessions)
    .innerJoin(questions, eq(practiceSessions.questionId, questions.id))
    .where(eq(practiceSessions.userId, userId))
    .orderBy(desc(practiceSessions.createdAt))
    .limit(limit);
}

export async function getQuestionStats(userId: string) {
  // This would return stats like total questions practiced, completion rates, etc.
  // Implementation depends on specific analytics needs
  const sessions = await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.userId, userId));
  
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
  
  return {
    totalSessions,
    completedSessions,
    completionRate: Math.round(completionRate)
  };
}