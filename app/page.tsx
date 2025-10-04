'use client';

import { useState, useRef, useEffect } from 'react';
import type { InterviewRound, QuestionState, GenerationState, Question } from '../types/interview';
import { convertJsonToMarkdown, parseMarkdownToHtml } from '../utils/interviewUtils';
import { SAMPLE_PAIRS } from '@/lib/sampleData'; // Adjust the import path
import { useSessionPersistence } from '../hooks/useLocalStorage';
import { generateMarkdownExport, downloadMarkdown, generatePrintableHTML, printHTML, type ExportData } from '../utils/exportUtils';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useRetry, retryConditions } from '../hooks/useRetry';
import { ApiService } from '../utils/apiService';
import { getQuestionTypeConfig, getDifficultyConfig, formatEstimatedTime } from '../utils/questionUtils';

const SetupPanel = ({ jobDescription, setJobDescription, backgroundInfo, setBackgroundInfo, onGenerate, generationState, hasStarted, onTrySample, isRetrying, attemptCount }: {
  jobDescription: string;
  setJobDescription: (v: string) => void;
  backgroundInfo: string;
  setBackgroundInfo: (v: string) => void;
  onGenerate: () => void;
  generationState: GenerationState;
  hasStarted: boolean;
  onTrySample: () => void;
  isRetrying: boolean;
  attemptCount: number;
}) => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-200 flex items-center justify-between h-auto">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-900">Setup Your Interview Prep</h2>
        <p className="text-gray-500 text-xs">Get personalized questions based on your job and background</p>
      </div>
      {!hasStarted && (
        <button
          onClick={onTrySample}
          className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-md hover:from-blue-100 hover:to-indigo-100 transition-colors border border-blue-200 font-medium"
        >
          Try Sample
        </button>
      )}
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {!hasStarted && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">1</div>
            <p className="text-blue-900 text-sm font-medium">Add job description</p>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs font-semibold">2</div>
            <p className="text-blue-800 text-sm">Add your background (optional)</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs font-semibold">3</div>
            <p className="text-blue-800 text-sm">Generate personalized questions</p>
          </div>
        </div>
      )}

      <div className="space-y-2 job-description-area">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-900 block">Job Description <span className="text-red-500">*</span></label>
          {!jobDescription.trim() && !hasStarted && (
            <button
              // *** FIX HERE ***
              // Changed from using the old variable to calling the onTrySample function.
              onClick={onTrySample}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Use sample
            </button>
          )}
        </div>
        <textarea
          rows={6}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm leading-relaxed"
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        {!jobDescription.trim() && (
          <p className="text-xs text-red-500">Job description is required to generate questions</p>
        )}
        {jobDescription.trim() && (
          <p className="text-xs text-green-600">✓ Job description added ({jobDescription.length} characters)</p>
        )}
      </div>

      <div className="space-y-2 background-area">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-900 block">Your Background</label>
          {!backgroundInfo.trim() && !hasStarted && (
            <button
              // *** FIX HERE ***
              // Changed from using the old variable to calling the onTrySample function.
              onClick={onTrySample}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Use sample
            </button>
          )}
        </div>
        <textarea
          rows={6}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm leading-relaxed"
          placeholder="Optional: Paste your resume or describe your experience..."
          value={backgroundInfo}
          onChange={(e) => setBackgroundInfo(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          {backgroundInfo.trim() 
            ? `✓ Background added (${backgroundInfo.length} characters) - Questions will be personalized`
            : "Add your background for personalized questions, or skip for general prep"
          }
        </p>
      </div>
    </div>

    <div className="p-4 border-t border-gray-200 h-14 flex items-center">
      <button
        onClick={onGenerate}
        disabled={generationState === 'streaming' || !jobDescription.trim()}
        className="generate-button w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        {generationState === 'streaming' ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>
              {isRetrying ? `Retrying (${attemptCount}/3)...` : 'Generating...'}
            </span>
          </div>
        ) : (
          'Generate Questions'
        )}
      </button>
    </div>

    {hasStarted && (
      <div className="p-2 border-t border-gray-200 h-8 flex items-center justify-center">
        <p className="text-gray-500 text-xs">Data processed securely</p>
      </div>
    )}
  </div>
);

const InterviewPanel = ({ interviewRounds, questionStates, generationState, parsedContent, onShowGuidance, onShowFullAnswer, onCopy, onExport }: {
  interviewRounds: InterviewRound[];
  questionStates: QuestionState[];
  generationState: GenerationState;
  parsedContent: string;
  onShowGuidance: (index: number) => void;
  onShowFullAnswer: (index: number) => void;
  onCopy: (text: string) => void;
  onExport?: (format: 'markdown' | 'print') => void;
}) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [interviewRounds, parsedContent]);

  if (generationState === 'idle' && interviewRounds.length === 0 && !parsedContent.trim()) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 h-14 sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-gray-900">Interview Questions</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
          <div className="text-center">
            <p className="text-sm">Fill in your job description</p>
            <p className="text-xs mt-1">→ Generate personalized questions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 h-auto sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900">Interview Questions</h2>
            {interviewRounds.length > 0 && <p className="text-gray-500 text-xs">{interviewRounds.length} Rounds • {questionStates.length} Questions</p>}
          </div>
          {interviewRounds.length > 0 && onExport && (
            <div className="flex space-x-2">
              <button
                onClick={() => onExport('markdown')}
                className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200 font-medium"
              >
                Export
              </button>
              <button
                onClick={() => onExport('print')}
                className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors border border-green-200 font-medium"
              >
                Print
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" ref={outputRef}>
        <div className="p-4 prose prose-sm max-w-none">
          {generationState === 'streaming' && parsedContent && (
            <div className="space-y-6">
              <div dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(parsedContent) }} />
              <div className="flex justify-end mt-2">
                <span className="w-1 h-2 bg-gray-400 animate-pulse">|</span>
              </div>
            </div>
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
                          <article key={qIndex} className="p-4 rounded-lg border border-gray-200 space-y-3 hover:border-gray-300 transition-colors bg-white shadow-sm">
                            <div className="flex items-start space-x-3">
                              <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5 shadow-sm">
                                {qIndex + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 leading-relaxed md:text-base">{q.text}</p>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  {(() => {
                                    const typeConfig = getQuestionTypeConfig(state.type);
                                    const difficultyConfig = getDifficultyConfig(state.difficulty);
                                    return (
                                      <>
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
                                      </>
                                    );
                                  })()}
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

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([]);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [parsedContent, setParsedContent] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'setup' | 'questions'>('setup');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const { saveSession } = useSessionPersistence();
  const { executeWithRetry, isRetrying, attemptCount } = useRetry({
    maxAttempts: 3,
    delay: 2000,
    retryCondition: retryConditions.networkAndServerErrors
  });

  const handleStreamingResponse = async (response: Response) => {
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
                setParsedContent(prev => {
                  const newContent = prev + data.content;
                  return convertJsonToMarkdown(newContent);
                });
              } else if (data.type === 'complete') {
                const { rounds } = data.data;
                const enhancedRounds = rounds.map((round: InterviewRound) => ({
                  ...round,
                  icon: '',
                  questions: round.questions.map((q: Question) => ({
                    text: q.text || q, // Handle both new and old format
                    type: q.type || 'behavioral',
                    difficulty: q.difficulty || 'mid',
                    estimatedTime: q.estimatedTime || 5,
                    tags: q.tags || [q.type || 'General'],
                    personalized: q.personalized ?? (backgroundInfo.trim() ? Math.random() > 0.5 : false)
                  }))
                }));
                const newQuestionStates = enhancedRounds.flatMap((round: InterviewRound) => round.questions.map((q: Question) => ({
                  question: q.text,
                  type: q.type,
                  difficulty: q.difficulty,
                  estimatedTime: q.estimatedTime,
                  tags: q.tags,
                  personalized: q.personalized,
                  showGuidance: false,
                  showFullAnswer: false,
                  isLoadingGuidance: false,
                  isLoadingFullAnswer: false
                })));
                
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

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return alert('Job Description is required');

    setGenerationState('streaming');
    setHasStarted(true);
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
        await handleStreamingResponse(response);
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

  const toggleExpandable = async (index: number, type: 'guidance' | 'fullAnswer') => {
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
      await executeWithRetry(async () => {
        const apiCall = type === 'guidance' 
          ? ApiService.getGuidance
          : ApiService.getFullAnswer;

        const data = await apiCall(
          state.question,
          jobDescription.trim(),
          backgroundInfo.trim()
        );

        const newContent = type === 'guidance' ? (data as { guidance: string }).guidance : (data as { answer: string }).answer;
        setQuestionStates(prev => prev.map((s, i) => i === index ? {
          ...s,
          [contentKey]: newContent,
          [showKey]: true,
          [isLoadingKey]: false
        } : s));
      });
    } catch (error) {
      console.error(`Error getting ${type}:`, error);
      setQuestionStates(prev => prev.map((s, i) => i === index ? { ...s, [isLoadingKey]: false } : s));
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : `Failed to get ${type}. Please try again.`;
      
      alert(errorMessage);
    }
  };

  const handleShowGuidance = (index: number) => toggleExpandable(index, 'guidance');
  const handleShowFullAnswer = (index: number) => toggleExpandable(index, 'fullAnswer');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReset = () => {
    setJobDescription('');
    setBackgroundInfo('');
    setInterviewRounds([]);
    setQuestionStates([]);
    setHasStarted(false);
    setGenerationState('idle');
    setParsedContent('');
    setGenerationError(null);
    setActiveTab('setup');
  };

  const handleTrySample = () => {
    // 1. Calculate a random index every time the function is called
    const randomIndex = Math.floor(Math.random() * SAMPLE_PAIRS.length);
    
    // 2. Select a new sample from the array
    const selectedSample = SAMPLE_PAIRS[randomIndex];
  
    // 3. Set the state with the new, randomly selected data
    setJobDescription(selectedSample.jobDescription);
    setBackgroundInfo(selectedSample.background);
  };

  const handleExport = (format: 'markdown' | 'print') => {
    if (interviewRounds.length === 0) return;

    const exportData: ExportData = {
      jobDescription,
      backgroundInfo,
      interviewRounds,
      questionStates,
      exportDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    if (format === 'markdown') {
      const markdown = generateMarkdownExport(exportData);
      const filename = `interview-prep-${new Date().toISOString().split('T')[0]}.md`;
      downloadMarkdown(markdown, filename);
    } else if (format === 'print') {
      const html = generatePrintableHTML(exportData);
      printHTML(html);
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">PrepMatch</h1>
            {hasStarted && <button onClick={handleReset} className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">New session</button>}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {/* Desktop Split View */}
        <div className="hidden md:flex w-full h-full">
          <div className="w-1/2 border-r border-gray-200">
            <SetupPanel
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              backgroundInfo={backgroundInfo}
              setBackgroundInfo={setBackgroundInfo}
              onGenerate={handleGenerate}
              generationState={generationState}
              hasStarted={hasStarted}
              onTrySample={handleTrySample}
              isRetrying={isRetrying}
              attemptCount={attemptCount}
            />
          </div>
          <div className="interview-panel w-1/2">
            <InterviewPanel
              interviewRounds={interviewRounds}
              questionStates={questionStates}
              generationState={generationState}
              parsedContent={parsedContent}
              onShowGuidance={handleShowGuidance}
              onShowFullAnswer={handleShowFullAnswer}
              onCopy={handleCopy}
              onExport={handleExport}
            />
          </div>
        </div>

        {/* Mobile View - Tabs and Content */}
        <div className="md:hidden flex flex-col w-full h-full">
          {/* Mobile Tabs */}
          <div className="flex border-b border-gray-200 bg-white flex-shrink-0">
            <button
              onClick={() => setActiveTab('setup')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'setup' ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              📝 Setup
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'questions' ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              💬 Questions {interviewRounds.length > 0 && `(${questionStates.length})`}
            </button>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'setup' ? (
              <SetupPanel
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                backgroundInfo={backgroundInfo}
                setBackgroundInfo={setBackgroundInfo}
                onGenerate={handleGenerate}
                generationState={generationState}
                hasStarted={hasStarted}
                onTrySample={handleTrySample}
                isRetrying={isRetrying}
                attemptCount={attemptCount}
              />
            ) : (
              <div className="interview-panel w-full h-full">
                <InterviewPanel
                  interviewRounds={interviewRounds}
                  questionStates={questionStates}
                  generationState={generationState}
                  parsedContent={parsedContent}
                  onShowGuidance={handleShowGuidance}
                  onShowFullAnswer={handleShowFullAnswer}
                  onCopy={handleCopy}
                  onExport={handleExport}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Generate Button */}
      {hasStarted && window.innerWidth < 768 && activeTab === 'setup' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 p-3 z-20 shadow-lg bg-white">
          <button
            onClick={handleGenerate}
            disabled={generationState === 'streaming' || !jobDescription.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Generate Questions
          </button>
        </div>
      )}

      {/* Error Handling */}
      {(generationError || isRetrying) && (
        <div className="fixed top-4 right-4 border rounded p-4 max-w-sm z-50 shadow-lg bg-white">
          {isRetrying ? (
            <div className="border-blue-200">
              <div className="mb-2">
                <h3 className="font-semibold text-blue-900 text-sm">Retrying...</h3>
              </div>
              <p className="text-blue-700 text-sm mb-2">
                Attempt {attemptCount} of 3. Having trouble connecting, retrying automatically...
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600 text-sm">Please wait</span>
              </div>
            </div>
          ) : generationError && (
            <div className="border-red-200">
              <div className="mb-2">
                <h3 className="font-semibold text-red-900 text-sm">Error</h3>
              </div>
              <p className="text-red-700 text-sm mb-2">{generationError}</p>
              {attemptCount > 0 && (
                <p className="text-gray-600 text-xs mb-3">
                  Tried {attemptCount} time{attemptCount > 1 ? 's' : ''} unsuccessfully
                </p>
              )}
              <div className="flex space-x-2">
                <button 
                  onClick={handleGenerate}
                  className="text-blue-600 text-sm hover:underline font-medium"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => setGenerationError(null)}
                  className="text-gray-500 text-sm hover:underline font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
}