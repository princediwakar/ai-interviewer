// app/question-bank/page.tsx
import { RoleSelection } from '@/components/RoleSelection';
import { getAllRoles, getQuestionsByRole } from '@/lib/questionBank/questionBank';
import { Navigation } from '@/components/Navigation';

export default async function QuestionBankPage() {
  const roles = await getAllRoles();

  const rolesWithDetails = await Promise.all(roles.map(async (role) => {
    const questions = await getQuestionsByRole(role.id);
    const distribution = { entry: 0, mid: 0, senior: 0, expert: 0 };
    questions.forEach(q => {
      if (q.difficulty in distribution) {
        distribution[q.difficulty]++;
      }
    });
    const total = questions.length;
    const difficultyDist = {
      entry: total > 0 ? Math.round((distribution.entry / total) * 100) : 0,
      mid: total > 0 ? Math.round((distribution.mid / total) * 100) : 0,
      senior: total > 0 ? Math.round((distribution.senior / total) * 100) : 0,
      expert: total > 0 ? Math.round((distribution.expert / total) * 100) : 0
    };
    const sampleQuestion = questions.length > 0 ? questions[0].text : "No questions available";

    return {
      ...role,
      difficultyDist,
      sampleQuestion
    };
  }));

  return (
      <div className="min-h-screen bg-white">
        <Navigation subtitle="Question Bank" />
        <RoleSelection roles={rolesWithDetails} />
      </div>
  );
}