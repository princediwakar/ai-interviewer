// hooks/useRetry.ts
import { useState, useCallback } from 'react';

interface RetryConfig {
  maxAttempts?: number;
  delay?: number;
  backoff?: 'fixed' | 'exponential';
  retryCondition?: (error: Error) => boolean;
}

interface RetryState {
  isRetrying: boolean;
  attemptCount: number;
  lastError?: Error;
}

export function useRetry(config: RetryConfig = {}) {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 'exponential',
    retryCondition = () => true
  } = config;

  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    attemptCount: 0
  });

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    let lastError: Error = new Error('Unknown error');
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setRetryState({
          isRetrying: attempt > 1,
          attemptCount: attempt,
          lastError: undefined
        });

        const result = await operation();
        
        // Success - reset state
        setRetryState({
          isRetrying: false,
          attemptCount: 0,
          lastError: undefined
        });
        
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        setRetryState({
          isRetrying: true,
          attemptCount: attempt,
          lastError
        });

        // Check if we should retry this error
        if (!retryCondition(lastError)) {
          throw lastError;
        }

        // If this was the last attempt, don't wait
        if (attempt === maxAttempts) {
          break;
        }

        // Calculate delay based on backoff strategy
        const currentDelay = backoff === 'exponential' 
          ? delay * Math.pow(2, attempt - 1)
          : delay;

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, currentDelay));
      }
    }

    // All attempts failed
    setRetryState({
      isRetrying: false,
      attemptCount: maxAttempts,
      lastError
    });

    throw lastError;
  }, [maxAttempts, delay, backoff, retryCondition]);

  const reset = useCallback(() => {
    setRetryState({
      isRetrying: false,
      attemptCount: 0,
      lastError: undefined
    });
  }, []);

  return {
    executeWithRetry,
    reset,
    ...retryState
  };
}

// Predefined retry conditions
export const retryConditions = {
  // Retry on network errors and 5xx status codes
  networkAndServerErrors: (error: Error) => {
    return error.message.includes('fetch') || 
           error.message.includes('NetworkError') ||
           error.message.includes('500') ||
           error.message.includes('502') ||
           error.message.includes('503') ||
           error.message.includes('504');
  },

  // Retry on any error except 4xx client errors
  allExceptClientErrors: (error: Error) => {
    return !error.message.includes('400') &&
           !error.message.includes('401') &&
           !error.message.includes('403') &&
           !error.message.includes('404') &&
           !error.message.includes('422');
  },

  // Never retry (for testing)
  never: () => false,

  // Always retry (default)
  always: () => true
};