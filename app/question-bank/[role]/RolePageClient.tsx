// app/question-bank/[role]/RolePageClient.tsx
'use client';

import { QuestionBrowser } from '@/components/QuestionBrowser';
import { type Role } from '@/lib/questionBank/questionBank';
import { Navigation } from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/lib/simple-auth';
import { Question } from '@/types/interview';

interface RolePageClientProps {
  role: Role;
  questions: Question[];
  availableTags: string[];
}

export default function RolePageClient({ role, questions, availableTags }: RolePageClientProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navigation subtitle="Question Bank" />
        <QuestionBrowser
          role={role}
          // FIX: Pass the prop as `initialQuestions` to match the component's updated interface
          initialQuestions={questions} 
          availableTags={availableTags}
          onBack={() => router.back()}
          onQuestionSelect={(question) => {
            router.push(`/question-bank/${role}/${question.id}`);
          }}
        />
      </div>
    </AuthProvider>
  );
}
