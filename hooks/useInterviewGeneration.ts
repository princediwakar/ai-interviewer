// hooks/useInterviewGeneration.ts
'use client';

import { useState } from 'react';
import type { InterviewRound, QuestionState, GenerationState, Question } from '../types/interview';
import { convertJsonToMarkdown } from '../utils/interviewUtils';
import { ApiService } from '../utils/apiService';
import { useRetry, retryConditions } from './useRetry';
import { useSessionPersistence } from './useLocalStorage';

export const useInterviewGeneration = () => {
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([]);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [parsedContent, setParsedContent] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const { saveSession } = useSessionPersistence();
  const { executeWithRetry, isRetrying, attemptCount } = useRetry({
    maxAttempts: 3,
    delay: 2000,
    retryCondition: retryConditions.networkAndServerErrors
  });

  const handleStreamingResponse = async (response: Response, jobDescription: string, backgroundInfo: string) => {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'content') {
                setParsedContent(prev => prev + data.content);
              } else if (data.type === 'complete') {
                const { rounds } = data.data;
                const enhancedRounds = rounds.map((round: InterviewRound) => ({
                  ...round,
                  icon: '',
                  questions: round.questions.map((q: Question) => ({
                    text: q.text || q,
                    type: q.type || 'behavioral',
                    difficulty: q.difficulty || 'mid',
                    estimatedTime: q.estimatedTime || 5,
                    tags: q.tags || [q.type || 'General'],
                    personalized: q.personalized ?? (backgroundInfo.trim() ? Math.random() > 0.5 : false),
                    followUps: q.followUps,
                    realismContext: q.realismContext
                  }))
                }));
                const newQuestionStates = enhancedRounds.flatMap((round: InterviewRound) => 
                  round.questions.map((q: Question) => ({
                    question: q.text,
                    type: q.type,
                    difficulty: q.difficulty,
                    estimatedTime: q.estimatedTime,
                    tags: q.tags,
                    personalized: q.personalized,
                    followUps: q.followUps,
                    realismContext: q.realismContext,
                    showGuidance: false,
                    showFullAnswer: false,
                    isLoadingGuidance: false,
                    isLoadingFullAnswer: false
                  }))
                );
                
                setInterviewRounds(enhancedRounds);
                setQuestionStates(newQuestionStates);
                setParsedContent('');
                setGenerationState('idle');
                setGenerationError(null);
                
                // Auto-save session
                const sessionId = saveSession({
                  jobDescription: jobDescription.trim(),
                  backgroundInfo: backgroundInfo.trim(),
                  interviewRounds: enhancedRounds,
                  questionStates: newQuestionStates
                });
                setCurrentSessionId(sessionId);
                return;
              } else if (data.type === 'error') throw new Error(data.error);
            } catch {}
          }
        });
      }
      setGenerationState('idle');
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Generation failed');
      setGenerationState('idle');
    }
  };

  const generateQuestions = async (jobDescription: string, backgroundInfo: string) => {
    if (!jobDescription.trim()) {
      alert('Job Description is required');
      return;
    }

    setGenerationState('streaming');
    setInterviewRounds([]);
    setQuestionStates([]);
    setParsedContent('');
    setGenerationError(null);
    
    try {
      await executeWithRetry(async () => {
        const { response } = await ApiService.generateQuestions(
          jobDescription.trim(),
          backgroundInfo.trim() || undefined
        );
        await handleStreamingResponse(response, jobDescription, backgroundInfo);
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate interview questions. Please try again.';
      
      setGenerationError(errorMessage);
      setGenerationState('idle');
    }
  };

  const reset = () => {
    setInterviewRounds([]);
    setQuestionStates([]);
    setGenerationState('idle');
    setParsedContent('');
    setGenerationError(null);
    setCurrentSessionId(null);
  };

  return {
    generationState,
    interviewRounds,
    questionStates,
    setQuestionStates,
    parsedContent,
    generationError,
    currentSessionId,
    isRetrying,
    attemptCount,
    generateQuestions,
    reset,
    setGenerationError
  };
};