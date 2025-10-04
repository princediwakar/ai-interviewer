// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

export interface SessionData {
  jobDescription: string;
  backgroundInfo: string;
  interviewRounds: any[];
  questionStates: any[];
  timestamp: number;
  sessionId: string;
}

export function useSessionPersistence() {
  const [sessions, setSessions, removeSessions] = useLocalStorage<SessionData[]>('interview-sessions', []);

  const saveSession = (sessionData: Omit<SessionData, 'timestamp' | 'sessionId'>) => {
    const session: SessionData = {
      ...sessionData,
      timestamp: Date.now(),
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setSessions(prev => {
      const filtered = prev.filter(s => 
        s.jobDescription !== sessionData.jobDescription || 
        s.backgroundInfo !== sessionData.backgroundInfo
      );
      return [session, ...filtered].slice(0, 10); // Keep only last 10 sessions
    });
    
    return session.sessionId;
  };

  const loadSession = (sessionId: string) => {
    return sessions.find(session => session.sessionId === sessionId);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.sessionId !== sessionId));
  };

  const clearAllSessions = () => {
    removeSessions();
  };

  return {
    sessions,
    saveSession,
    loadSession,
    deleteSession,
    clearAllSessions
  };
}