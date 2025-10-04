// hooks/useQuestionActions.ts
'use client';

import type { QuestionState } from '../types/interview';
import { ApiService } from '../utils/apiService';

export const useQuestionActions = (
  questionStates: QuestionState[],
  setQuestionStates: React.Dispatch<React.SetStateAction<QuestionState[]>>
) => {

  const toggleExpandable = async (
    index: number,
    type: 'guidance' | 'fullAnswer',
    jobDescription: string,
    backgroundInfo: string
  ) => {
    const state = questionStates[index];
    const contentKey = type;
    const showKey = `show${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof QuestionState;
    const isLoadingKey = `isLoading${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof QuestionState;

    if (state[contentKey as keyof QuestionState]) {
      setQuestionStates(prev => prev.map((s, i) => i === index ? { ...s, [showKey]: !s[showKey] } : s));
      return;
    }

    setQuestionStates(prev => prev.map((s, i) => i === index ? { ...s, [isLoadingKey]: true } : s));

    try {
      const apiCall = type === 'guidance' 
        ? ApiService.getGuidance
        : ApiService.getFullAnswer;

      const data = await apiCall(
        state.question,
        jobDescription.trim(),
        backgroundInfo.trim()
      );

      const newContent = type === 'guidance' 
        ? (data as { guidance: string }).guidance 
        : (data as { answer: string }).answer;
        
      setQuestionStates(prev => prev.map((s, i) => i === index ? {
        ...s,
        [contentKey]: newContent,
        [showKey]: true,
        [isLoadingKey]: false
      } : s));
    } catch (error) {
      console.error(`Error getting ${type}:`, error);
      setQuestionStates(prev => prev.map((s, i) => i === index ? { ...s, [isLoadingKey]: false } : s));
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : `Failed to get ${type}. Please try again.`;
      
      alert(errorMessage);
    }
  };

  const handleShowGuidance = (index: number, jobDescription: string, backgroundInfo: string) => 
    toggleExpandable(index, 'guidance', jobDescription, backgroundInfo);

  const handleShowFullAnswer = (index: number, jobDescription: string, backgroundInfo: string) => 
    toggleExpandable(index, 'fullAnswer', jobDescription, backgroundInfo);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return {
    handleShowGuidance,
    handleShowFullAnswer,
    handleCopy
  };
};