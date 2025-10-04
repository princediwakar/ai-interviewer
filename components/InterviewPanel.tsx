// components/InterviewPanel.tsx
'use client';

import { useRef, useEffect } from 'react';
import type { InterviewRound, QuestionState, GenerationState } from '../types/interview';
import { getQuestionTypeConfig, getDifficultyConfig, formatEstimatedTime } from '../utils/questionUtils';
import { StreamingDisplay } from './StreamingDisplay';

interface InterviewPanelProps {
  interviewRounds: InterviewRound[];
  questionStates: QuestionState[];
  generationState: GenerationState;
  parsedContent: string;
  onShowGuidance: (index: number) => void;
  onShowFullAnswer: (index: number) => void;
  onCopy: (text: string) => void;
  onExport?: (format: 'print') => void;
}


const EmptyState = () => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-200 h-14 sticky top-0 z-10">
      <h2 className="text-sm font-semibold text-gray-900">Interview Questions</h2>
    </div>
    <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium">Ready to generate questions</p>
          <p className="text-xs mt-1 text-gray-400">Fill in your job description to get started</p>
        </div>
      </div>
    </div>
  </div>
);

const QuestionCard = ({ 
  question, 
  questionIndex, 
  globalIndex, 
  state, 
  onShowGuidance, 
  onShowFullAnswer, 
  onCopy 
}: {
  question: InterviewRound['questions'][0];
  questionIndex: number;
  globalIndex: number;
  state: QuestionState;
  onShowGuidance: (index: number) => void;
  onShowFullAnswer: (index: number) => void;
  onCopy: (text: string) => void;
}) => {
  const typeConfig = getQuestionTypeConfig(state.type);
  const difficultyConfig = getDifficultyConfig(state.difficulty);

  return (
    <article className="p-4 rounded-lg border border-gray-200 space-y-3 hover:border-gray-300 transition-colors bg-white shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5 shadow-sm">
          {questionIndex + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 leading-relaxed md:text-base">{question.text}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${typeConfig.color}`}>
              <span className="mr-1">{typeConfig.icon}</span>
              {typeConfig.label}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${difficultyConfig.color}`}>
              {difficultyConfig.label}
            </span>
            {state.estimatedTime && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full border border-gray-200">
                ⏱️ {formatEstimatedTime(state.estimatedTime)}
              </span>
            )}
            {state.personalized && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
                🎯 Personalized
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onShowGuidance(globalIndex)}
          disabled={state.isLoadingGuidance}
          className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 touch-manipulation"
        >
          {state.isLoadingGuidance ? (
            <span className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
              Loading...
            </span>
          ) : (
            <>💡 {state.showGuidance ? 'Hide Tips' : 'Get Tips'}</>
          )}
        </button>
        
        <button
          onClick={() => onShowFullAnswer(globalIndex)}
          disabled={state.isLoadingFullAnswer}
          className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50 touch-manipulation"
        >
          {state.isLoadingFullAnswer ? (
            <span className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
              Loading...
            </span>
          ) : (
            <>📝 {state.showFullAnswer ? 'Hide Answer' : 'Sample Answer'}</>
          )}
        </button>
      </div>

      {state.showGuidance && state.guidance && (
        <div className="p-3 bg-blue-50 rounded">
          <h4 className="text-xs font-medium text-blue-900 mb-2">Tips</h4>
          <p className="text-xs text-blue-800 leading-relaxed">{state.guidance}</p>
        </div>
      )}

      {state.showFullAnswer && state.fullAnswer && (
        <div className="p-3 bg-green-50 rounded">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-green-900">Sample Answer</h4>
            <button
              onClick={() => onCopy(state.fullAnswer || '')}
              className="text-xs text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-100 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-green-800 leading-relaxed whitespace-pre-wrap">{state.fullAnswer}</p>
        </div>
      )}
    </article>
  );
};

export const InterviewPanel = ({
  interviewRounds,
  questionStates,
  generationState,
  parsedContent,
  onShowGuidance,
  onShowFullAnswer,
  onCopy,
  onExport
}: InterviewPanelProps) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [interviewRounds, parsedContent]);

  if (generationState === 'idle' && interviewRounds.length === 0 && !parsedContent.trim()) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 h-14 sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900">Interview Questions</h2>
            {interviewRounds.length > 0 && (
              <p className="text-gray-500 text-xs">{interviewRounds.length} Rounds • {questionStates.length} Questions</p>
            )}
          </div>
          {interviewRounds.length > 0 && onExport && (
            <button
              onClick={() => onExport('print')}
              className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors border border-green-200 font-medium"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" ref={outputRef}>
        <div className="p-4 prose prose-sm max-w-none">
          {generationState === 'streaming' && (
            <StreamingDisplay 
              content={parsedContent} 
              isComplete={false}
            />
          )}

          {interviewRounds.length > 0 && generationState === 'idle' && (
            <div className="space-y-8">
              {interviewRounds.map((round, roundIndex) => {
                const startIndex = interviewRounds.slice(0, roundIndex).reduce((acc, r) => acc + r.questions.length, 0);
                return (
                  <section key={roundIndex} className="space-y-6">
                    <div className="p-4 rounded border">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Round {roundIndex + 1}: {round.name}
                        </h3>
                        {round.estimatedDuration && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            📅 {formatEstimatedTime(round.estimatedDuration)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">{round.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{round.questions.length} questions</span>
                        {round.questions.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              Avg {Math.round(round.questions.reduce((acc, q) => acc + (q.estimatedTime || 5), 0) / round.questions.length)}m per question
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {round.questions.map((q, qIndex) => {
                        const globalIndex = startIndex + qIndex;
                        const state = questionStates[globalIndex];
                        if (!state) return null;

                        return (
                          <QuestionCard
                            key={qIndex}
                            question={q}
                            questionIndex={qIndex}
                            globalIndex={globalIndex}
                            state={state}
                            onShowGuidance={onShowGuidance}
                            onShowFullAnswer={onShowFullAnswer}
                            onCopy={onCopy}
                          />
                        );
                      })}
                    </div>
                  </section>
                );
              })}

              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm text-blue-800">Generated {interviewRounds.length} rounds with {questionStates.length} questions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};