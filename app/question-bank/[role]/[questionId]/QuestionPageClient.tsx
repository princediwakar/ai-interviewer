'use client';

import { QuestionPractice } from '@/components/QuestionPractice';
import { Question } from '@/types/interview';
import { Navigation } from '@/components/Navigation';
import { useRouter } from 'next/navigation';

interface QuestionPageClientProps {
  question: Question;
  role: string;
}

export default function QuestionPageClient({ question }: QuestionPageClientProps) {
  const router = useRouter();

  return (
      <div className="min-h-screen bg-white">
        <Navigation subtitle="Question Bank" />
        <QuestionPractice
          question={question}
          onBack={() => router.back()}
        />
      </div>
  );
}