// components/StreamingDisplay.tsx
'use client';

import { useState, useEffect } from 'react';

interface StreamingDisplayProps {
  content: string;
  isComplete?: boolean;
}

interface ParsedRound {
  name: string;
  description: string;
  questions: string[];
}

const parseStreamingContent = (content: string): ParsedRound[] => {
  const rounds: ParsedRound[] = [];
  const lines = content.split('\n');
  let currentRound: Partial<ParsedRound> | null = null;
  
  for (const line of lines) {
    // Extract round name
    if (line.includes('"name":')) {
      const nameMatch = line.match(/"name":\s*"([^"]+)"/);
      if (nameMatch) {
        // Finish previous round
        if (currentRound && currentRound.name) {
          rounds.push({
            name: currentRound.name,
            description: currentRound.description || '',
            questions: currentRound.questions || []
          });
        }
        
        // Start new round
        currentRound = {
          name: nameMatch[1],
          questions: []
        };
      }
    }
    
    // Extract description
    else if (line.includes('"description":') && currentRound) {
      const descMatch = line.match(/"description":\s*"([^"]+)"/);
      if (descMatch) {
        currentRound.description = descMatch[1];
      }
    }
    
    // Extract questions
    else if (line.includes('"text":') && currentRound) {
      const qMatch = line.match(/"text":\s*"([^"]+)"/);
      if (qMatch && qMatch[1].length > 10) {
        currentRound.questions = currentRound.questions || [];
        if (!currentRound.questions.includes(qMatch[1])) {
          currentRound.questions.push(qMatch[1]);
        }
      }
    }
  }
  
  // Add final round if exists
  if (currentRound && currentRound.name) {
    rounds.push({
      name: currentRound.name,
      description: currentRound.description || '',
      questions: currentRound.questions || []
    });
  }
  
  return rounds;
};

const TypewriterCursor = () => (
  <span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-1" />
);

const StreamingRound = ({ round, roundIndex, isStreaming }: { 
  round: ParsedRound; 
  roundIndex: number; 
  isStreaming: boolean;
}) => {
  // Check if round name already contains round numbering
  const displayName = round.name.toLowerCase().startsWith('round ') 
    ? round.name 
    : `Round ${roundIndex + 1}: ${round.name}`;

  return (
    <section className="space-y-6">
      <div className="p-4 rounded border">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            {displayName}
          </h3>
        </div>
        {round.description && (
          <p className="text-xs text-gray-600 leading-relaxed mb-2">{round.description}</p>
        )}
        <div className="flex items-center text-xs text-gray-500">
          <span>{round.questions.length} question{round.questions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="space-y-6">
        {round.questions.map((question, qIndex) => (
          <article key={qIndex} className="p-4 rounded-lg border border-gray-200 space-y-3 hover:border-gray-300 transition-colors bg-white shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5 shadow-sm">
                {qIndex + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-relaxed md:text-base">
                  {question}
                  {isStreaming && qIndex === round.questions.length - 1 && <TypewriterCursor />}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                💡 Get Tips
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                📝 Sample Answer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export const StreamingDisplay = ({ content, isComplete = false }: StreamingDisplayProps) => {
  const [parsedRounds, setParsedRounds] = useState<ParsedRound[]>([]);
  
  useEffect(() => {
    if (content) {
      const rounds = parseStreamingContent(content);
      setParsedRounds(rounds);
    }
  }, [content]);

  if (!content && !parsedRounds.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-600">Analyzing your job requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {parsedRounds.map((round, index) => (
        <StreamingRound 
          key={index} 
          round={round} 
          roundIndex={index} 
          isStreaming={!isComplete && index === parsedRounds.length - 1}
        />
      ))}
      
      {parsedRounds.length > 0 && !isComplete && (
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-blue-700">
            Generating more questions...
          </span>
        </div>
      )}
      
      {isComplete && parsedRounds.length > 0 && (
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            Generated {parsedRounds.length} rounds with {parsedRounds.reduce((acc, r) => acc + r.questions.length, 0)} questions
          </p>
        </div>
      )}
    </div>
  );
};