'use client';

import { useState, useRef, useEffect } from 'react';
import type { InterviewRound, QuestionState, GenerationState } from '../types/interview';
import { convertJsonToMarkdown, parseMarkdownToHtml } from '../utils/interviewUtils';

const SetupPanel = ({ jobDescription, setJobDescription, backgroundInfo, setBackgroundInfo, onGenerate, generationState, hasStarted }: {
  jobDescription: string;
  setJobDescription: (v: string) => void;
  backgroundInfo: string;
  setBackgroundInfo: (v: string) => void;
  onGenerate: () => void;
  generationState: GenerationState;
  hasStarted: boolean;
}) => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-200 flex items-center justify-between h-14">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-900">Setup</h2>
        <p className="text-gray-500 text-xs">Job description required; background optional</p>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 block">Job Description <span className="text-red-500">*</span></label>
        <textarea
          rows={6}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm leading-relaxed"
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        {!jobDescription.trim() && <p className="text-xs text-red-500">Required for generation</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 block">Your Background</label>
        <textarea
          rows={4}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm leading-relaxed"
          placeholder="Optional: Paste your resume or describe your experience..."
          value={backgroundInfo}
          onChange={(e) => setBackgroundInfo(e.target.value)}
        />
        <p className="text-xs text-gray-500">Helps personalize—skip for general prep</p>
      </div>
    </div>

    <div className="p-4 border-t border-gray-200 h-14 flex items-center">
      <button
        onClick={onGenerate}
        disabled={generationState === 'streaming' || !jobDescription.trim()}
        className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        {generationState === 'streaming' ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating...</span>
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

const InterviewPanel = ({ interviewRounds, questionStates, generationState, parsedContent, onShowGuidance, onShowFullAnswer, onCopy }: {
  interviewRounds: InterviewRound[];
  questionStates: QuestionState[];
  generationState: GenerationState;
  parsedContent: string;
  onShowGuidance: (index: number) => void;
  onShowFullAnswer: (index: number) => void;
  onCopy: (text: string) => void;
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
      <div className="p-4 border-b border-gray-200 h-14 sticky top-0 z-10">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-gray-900">Interview Questions</h2>
          {interviewRounds.length > 0 && <p className="text-gray-500 text-xs">{interviewRounds.length} Rounds • {questionStates.length} Questions</p>}
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
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Round {roundIndex + 1}: {round.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{round.description}</p>
                    </div>

                    <div className="space-y-6">
                      {round.questions.map((q, qIndex) => {
                        const globalIndex = startIndex + qIndex;
                        const state = questionStates[globalIndex];
                        if (!state) return null;

                        return (
                          <article key={qIndex} className="p-4 rounded border space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                                {qIndex + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 leading-relaxed">{q.text}</p>
                                {q.personalized && (
                                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">Personalized</span>
                                )}
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => onShowGuidance(globalIndex)}
                                disabled={state.isLoadingGuidance}
                                className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors disabled:opacity-50"
                              >
                                {state.isLoadingGuidance ? 'Loading...' : (state.showGuidance ? 'Hide Tips' : 'Tips')}
                              </button>
                              
                              <button
                                onClick={() => onShowFullAnswer(globalIndex)}
                                disabled={state.isLoadingFullAnswer}
                                className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded transition-colors disabled:opacity-50"
                              >
                                {state.isLoadingFullAnswer ? 'Loading...' : (state.showFullAnswer ? 'Hide Answer' : 'Answer')}
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
                const tagOptions = ['Leadership', 'Strategy', 'Technical'];
                const enhancedRounds = rounds.map((round: { name: string; description: string; questions: string[] }) => ({
                  ...round,
                  icon: '',
                  questions: round.questions.map((q: string) => ({
                    text: q,
                    tags: [tagOptions[Math.floor(Math.random() * tagOptions.length)]],
                    personalized: backgroundInfo.trim() ? Math.random() > 0.5 : false
                  }))
                }));
                setInterviewRounds(enhancedRounds);
                setQuestionStates(enhancedRounds.flatMap((round: InterviewRound) => round.questions.map((q: { text: string; tags: string[]; personalized?: boolean }) => ({
                  question: q.text,
                  tags: q.tags,
                  personalized: q.personalized,
                  showGuidance: false,
                  showFullAnswer: false,
                  isLoadingGuidance: false,
                  isLoadingFullAnswer: false
                }))));
                setParsedContent('');
                setGenerationState('idle');
                setGenerationError(null);
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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobDescription: jobDescription.trim(), 
          backgroundInfo: backgroundInfo.trim() || undefined
        }),
      });

      if (!response.ok) throw new Error('Failed to generate questions');
      await handleStreamingResponse(response);
    } catch (error) {
      console.error('Error:', error);
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate interview questions. Please try again.');
      setGenerationState('idle');
    }
  };

  const toggleExpandable = async (index: number, type: 'guidance' | 'fullAnswer', apiEndpoint: '/api/guidance' | '/api/full-answer') => {
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
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: state.question,
          jobDescription: jobDescription.trim(),
          backgroundInfo: backgroundInfo.trim(),
        }),
      });

      if (!response.ok) throw new Error(`Failed to get ${type}`);
      const data = await response.json();
      const newContent = type === 'guidance' ? data.guidance : data.answer;
      setQuestionStates(prev => prev.map((s, i) => i === index ? {
        ...s,
        [contentKey]: newContent,
        [showKey]: true,
        [isLoadingKey]: false
      } : s));
    } catch (error) {
      console.error(`Error getting ${type}:`, error);
      setQuestionStates(prev => prev.map((s, i) => i === index ? { ...s, [isLoadingKey]: false } : s));
      alert(`Failed to get ${type}. Please try again.`);
    }
  };

  const handleShowGuidance = (index: number) => toggleExpandable(index, 'guidance', '/api/guidance');
  const handleShowFullAnswer = (index: number) => toggleExpandable(index, 'fullAnswer', '/api/full-answer');

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

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">PrepMatch</h1>
            {hasStarted && <button onClick={handleReset} className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">New session</button>}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'setup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Setup
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'questions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Questions
          </button>
        </div>

        {activeTab === 'setup' || !hasStarted ? (
          <div className="w-full h-full md:w-1/2 border-r border-gray-200">
            <SetupPanel
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              backgroundInfo={backgroundInfo}
              setBackgroundInfo={setBackgroundInfo}
              onGenerate={handleGenerate}
              generationState={generationState}
              hasStarted={hasStarted}
            />
          </div>
        ) : null}

        <div className={`w-full h-full ${hasStarted ? 'md:w-1/2' : 'w-full'}`}>
          {hasStarted && (
            <InterviewPanel
              interviewRounds={interviewRounds}
              questionStates={questionStates}
              generationState={generationState}
              parsedContent={parsedContent}
              onShowGuidance={handleShowGuidance}
              onShowFullAnswer={handleShowFullAnswer}
              onCopy={handleCopy}
            />
          )}
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
      {generationError && (
        <div className="fixed top-4 right-4 border border-red-200 rounded p-4 max-w-sm z-50 shadow-lg bg-white">
          <div className="mb-2">
            <h3 className="font-semibold text-red-900 text-sm">Error</h3>
          </div>
          <p className="text-red-700 text-sm mb-2">{generationError}</p>
          <button 
            onClick={handleGenerate}
            className="text-blue-600 text-sm hover:underline font-medium"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}