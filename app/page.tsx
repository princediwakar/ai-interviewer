'use client';

import { useState } from 'react';
import { SAMPLE_PAIRS } from '@/lib/sampleData';
import { generatePDF, type ExportData } from '../utils/exportUtils';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SetupPanel } from '../components/SetupPanel';
import { InterviewPanel } from '../components/InterviewPanel';
import { useInterviewGeneration } from '../hooks/useInterviewGeneration';
import { useQuestionActions } from '../hooks/useQuestionActions';
import { Logo } from './Logo'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'setup' | 'questions'>('setup');

  const {
    generationState,
    interviewRounds,
    questionStates,
    setQuestionStates,
    parsedContent,
    generationError,
    isRetrying,
    attemptCount,
    generateQuestions,
    reset: resetGeneration,
    setGenerationError
  } = useInterviewGeneration();

  const { handleShowGuidance, handleShowFullAnswer, handleCopy } = useQuestionActions(
    questionStates,
    setQuestionStates
  );

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert('Job Description is required');
      return;
    }

    setHasStarted(true);
    await generateQuestions(jobDescription, backgroundInfo);
  };

  const handleReset = () => {
    setJobDescription('');
    setBackgroundInfo('');
    setHasStarted(false);
    setActiveTab('setup');
    resetGeneration();
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

  const handleExport = (format: 'print') => {
    if (interviewRounds.length === 0) return;

    const exportData: ExportData = {
      jobDescription: '',  // Don't include JD in PDF
      backgroundInfo: '',  // Don't include background in PDF
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

    generatePDF(exportData);
  };

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-white">
        <header className="border-b border-gray-200 flex-shrink-0">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">

              {/* --- Logo and Title --- */}
              <div className="flex items-center space-x-2">
                <Logo className="h-6 w-auto text-gray-900" />
                <h1 className="text-xl font-semibold text-gray-900">AceTheRole</h1>
              </div>

              {hasStarted && <button onClick={handleReset} className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">New session</button>}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          {/* Desktop Split View */}
          <div className="hidden md:flex w-full h-full">
            <div className="w-1/3 border-r border-gray-200">
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
            <div className="interview-panel w-2/3">
              <InterviewPanel
                interviewRounds={interviewRounds}
                questionStates={questionStates}
                generationState={generationState}
                parsedContent={parsedContent}
                onShowGuidance={(index) => handleShowGuidance(index, jobDescription, backgroundInfo)}
                onShowFullAnswer={(index) => handleShowFullAnswer(index, jobDescription, backgroundInfo)}
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
                    onShowGuidance={(index) => handleShowGuidance(index, jobDescription, backgroundInfo)}
                    onShowFullAnswer={(index) => handleShowFullAnswer(index, jobDescription, backgroundInfo)}
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