import { getQuestionById, getAllRoles } from '@/lib/questionBank/questionBank';
import { notFound } from 'next/navigation';
import QuestionPageClient from './QuestionPageClient';

interface QuestionPageProps {
  params: Promise<{ role: string; questionId: string }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { role, questionId } = await params;
  const allRoles = await getAllRoles();
  const roleInfo = allRoles.find(r => r.id === role);

  if (!roleInfo) {
    notFound();
  }

  const question = await getQuestionById(questionId);

  if (!question) {
    notFound();
  }

  return <QuestionPageClient question={question} role={role} />;
}
