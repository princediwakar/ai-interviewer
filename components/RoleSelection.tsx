// components/RoleSelection.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { type Role, type RoleInfo } from '@/lib/questionBank';

// Define a specific type for difficulty levels for better type safety
type DifficultyLevel = 'entry' | 'mid' | 'senior' | 'expert';

// This interface now correctly extends RoleInfo (the object type)
interface RoleWithDetails extends RoleInfo {
  difficultyDist: {
    [key in DifficultyLevel]: number;
  };
  sampleQuestion: string;
}

interface RoleSelectionProps {
  roles: RoleWithDetails[];
}

export function RoleSelection({ roles }: RoleSelectionProps) {
  const router = useRouter();

  // The signature is now correct, accepting the Role (string literal union) type
  const handleRoleSelect = (roleId: Role) => {
    router.push(`/question-bank/${roleId}`);
  };

  // The 'level' parameter is now strongly typed
  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case 'entry': return 'bg-green-400';
      case 'mid': return 'bg-yellow-400';
      case 'senior': return 'bg-orange-400';
      case 'expert': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  if (roles.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Role
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select a role to practice with expertly curated interview questions tailored to your field
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const { difficultyDist, sampleQuestion } = role;
          
          return (
            <Card
              key={role.id}
              className="p-6 cursor-pointer border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group relative overflow-hidden h-full"
              onClick={() => handleRoleSelect(role.id)}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900">
                    {role.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                {/* Difficulty Distribution (Refactored for cleaner code) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Difficulty Distribution</span>
                    <span>{role.questionCount} questions</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    {(Object.keys(difficultyDist) as DifficultyLevel[]).map((level) => (
                      difficultyDist[level] > 0 && (
                        <div 
                          key={level}
                          className={`${getDifficultyColor(level)} transition-all duration-300`}
                          style={{ width: `${difficultyDist[level]}%` }}
                          title={`${level.charAt(0).toUpperCase() + level.slice(1)}: ${difficultyDist[level]}%`}
                        />
                      )
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Entry</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Sample Question Preview */}
                <div className="mb-6 flex-1">
                  <div className="text-xs text-gray-600 mb-2 font-medium">Sample Question:</div>
                  <div className="bg-gray-50 group-hover:bg-white rounded-lg p-3 border group-hover:border-blue-200 transition-all duration-300">
                    <p className="text-sm text-gray-700 leading-relaxed overflow-hidden"
                       style={{
                         display: '-webkit-box',
                         WebkitLineClamp: 3,
                         WebkitBoxOrient: 'vertical'
                       }}>
                      &quot;{sampleQuestion}&quot;
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <div className="bg-blue-600 group-hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 group-hover:shadow-lg">
                    Start Practice →
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Total Stats */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {roles.reduce((sum, role) => sum + role.questionCount, 0)}
          </div>
          <div className="text-gray-600">
            Total curated questions across all roles
          </div>
        </div>
      </div>
    </div>
  );
}