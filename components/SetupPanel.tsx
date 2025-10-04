// components/SetupPanel.tsx
'use client';

import type { GenerationState } from '../types/interview';

interface SetupPanelProps {
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
}

export const SetupPanel = ({
  jobDescription,
  setJobDescription,
  backgroundInfo,
  setBackgroundInfo,
  onGenerate,
  generationState,
  hasStarted,
  onTrySample,
  isRetrying,
  attemptCount
}: SetupPanelProps) => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-200 flex items-center justify-between h-14">
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