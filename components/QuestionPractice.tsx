'use client';

import { useState } from 'react';
import { Question } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuestionPracticeProps {
  question: Question;
  onBack: () => void;
}

export function QuestionPractice({ question, onBack }: QuestionPracticeProps) {
  const [showGuidance, setShowGuidance] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [isLoadingGuidance, setIsLoadingGuidance] = useState(false);
  const [isLoadingFullAnswer, setIsLoadingFullAnswer] = useState(false);
  const [guidance, setGuidance] = useState<string>('');
  const [fullAnswer, setFullAnswer] = useState<string>('');

  const handleShowGuidance = async () => {
    if (guidance) {
      setShowGuidance(true);
      return;
    }

    setIsLoadingGuidance(true);
    try {
      const response = await fetch('/api/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.text,
          questionType: question.type,
          questionTags: question.tags
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGuidance(data.guidance);
        setShowGuidance(true);
      }
    } catch (error) {
      console.error('Error fetching guidance:', error);
    } finally {
      setIsLoadingGuidance(false);
    }
  };

  const handleShowFullAnswer = async () => {
    if (fullAnswer) {
      setShowFullAnswer(true);
      return;
    }

    setIsLoadingFullAnswer(true);
    try {
      const response = await fetch('/api/full-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.text,
          questionType: question.type,
          questionTags: question.tags
        })
      });

      if (response.ok) {
        const data = await response.json();
        setFullAnswer(data.answer);
        setShowFullAnswer(true);
      }
    } catch (error) {
      console.error('Error fetching full answer:', error);
    } finally {
      setIsLoadingFullAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-yellow-100 text-yellow-800';
      case 'senior': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeIcon = (type: Question['type']) => {
    switch (type) {
      case 'technical': return '⚙️';
      case 'case-study': return '📊';
      case 'situational': return '🎯';
      case 'leadership': return '👥';
      default: return '❓';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
      >
        ← Back to questions
      </button>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{getQuestionTypeIcon(question.type)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-600">
            ~{question.estimatedTime} minutes
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
          {question.text}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {question.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {question.followUps && question.followUps.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Follow-up questions:</h3>
            <ul className="space-y-1">
              {question.followUps.map((followUp, index) => (
                <li key={index} className="text-gray-700 text-sm">
                  • {followUp}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={handleShowGuidance}
          disabled={isLoadingGuidance}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isLoadingGuidance ? (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            '💡'
          )}
          {showGuidance ? 'Hide' : 'Show'} Answer Tips
        </Button>

        <Button
          onClick={handleShowFullAnswer}
          disabled={isLoadingFullAnswer}
          className="flex items-center gap-2"
        >
          {isLoadingFullAnswer ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            '✨'
          )}
          {showFullAnswer ? 'Hide' : 'Show'} Full Answer
        </Button>
      </div>

      {/* Guidance Section */}
      {showGuidance && guidance && (
        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              💡 Answer Tips
            </h3>
            <button
              onClick={() => handleCopy(guidance)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Copy
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-blue-800">
            {guidance.split('\n').map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Full Answer Section */}
      {showFullAnswer && fullAnswer && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-green-900 flex items-center gap-2">
              ✨ Full Answer
            </h3>
            <button
              onClick={() => handleCopy(fullAnswer)}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Copy
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-green-800">
            {fullAnswer.split('\n').map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}