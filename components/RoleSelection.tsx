'use client';

import { getAllRoles, type Role, type RoleInfo } from '@/lib/questionBank/questionBank';
import { Card } from '@/components/ui/card';

interface RoleSelectionProps {
  onRoleSelect: (role: Role) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = getAllRoles();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Role
        </h1>
        <p className="text-gray-600">
          Select a role to practice with curated interview questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="p-6 cursor-pointer border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
            onClick={() => onRoleSelect(role.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {role.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {role.description}
              </p>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {role.questionCount} questions
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Total: {roles.reduce((sum, role) => sum + role.questionCount, 0)} curated questions across all roles
        </p>
      </div>
    </div>
  );
}