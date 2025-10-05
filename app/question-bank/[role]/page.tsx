import { notFound } from 'next/navigation';
import {
  getAllRoles,
  getQuestionsByRole,
  getTagsForRole,
  type Role,
} from '@/lib/questionBank/questionBank';
import RolePageClient from './RolePageClient';

interface RolePageProps {
  params: Promise<{
    role: string;
  }>;
}

export default async function RolePage({ params }: RolePageProps) {
  // FIX: Access params.role once at the top to ensure it's resolved.
  const role = (await params).role as Role;

  const allRoles = await getAllRoles();
  // Now, use the local 'role' variable for all operations.
  const roleInfo = allRoles.find(r => r.id === role);

  if (!roleInfo) {
    notFound();
  }

  // Use the 'role' variable for data fetching.
  const questions = await getQuestionsByRole(role);
  const availableTags = await getTagsForRole(role);

  // Pass the 'role' variable to the client component.
  return <RolePageClient role={role} questions={questions} availableTags={availableTags} />;
}

