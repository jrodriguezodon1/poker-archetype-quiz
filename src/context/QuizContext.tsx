'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Action, QuizState, QuizAction } from '@/lib/types';

const STORAGE_KEY = 'poker-personality-quiz';
const TOTAL_SCENARIOS = 10;

const initialState: QuizState = {
  answers: Array(TOTAL_SCENARIOS).fill(null),
  currentScenario: 0,
  isComplete: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER': {
      const newAnswers = [...state.answers];
      newAnswers[action.scenarioIndex] = action.action;
      return { ...state, answers: newAnswers };
    }
    case 'NEXT_SCENARIO':
      return {
        ...state,
        currentScenario: Math.min(state.currentScenario + 1, TOTAL_SCENARIOS - 1),
      };
    case 'PREV_SCENARIO':
      return {
        ...state,
        currentScenario: Math.max(state.currentScenario - 1, 0),
      };
    case 'GO_TO_SCENARIO':
      return {
        ...state,
        currentScenario: Math.max(0, Math.min(action.index, TOTAL_SCENARIOS - 1)),
      };
    case 'COMPLETE':
      return { ...state, isComplete: true };
    case 'RESET':
      return { ...initialState, answers: Array(TOTAL_SCENARIOS).fill(null) };
    case 'RESTORE':
      return action.state;
    default:
      return state;
  }
}

interface QuizContextValue {
  state: QuizState;
  answer: (scenarioIndex: number, action: Action) => void;
  nextScenario: () => void;
  prevScenario: () => void;
  goToScenario: (index: number) => void;
  complete: () => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as QuizState;
        dispatch({ type: 'RESTORE', state: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const answer = useCallback((scenarioIndex: number, action: Action) => {
    dispatch({ type: 'ANSWER', scenarioIndex, action });
  }, []);

  const nextScenario = useCallback(() => dispatch({ type: 'NEXT_SCENARIO' }), []);
  const prevScenario = useCallback(() => dispatch({ type: 'PREV_SCENARIO' }), []);
  const goToScenario = useCallback((index: number) => dispatch({ type: 'GO_TO_SCENARIO', index }), []);
  const complete = useCallback(() => dispatch({ type: 'COMPLETE' }), []);
  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <QuizContext.Provider value={{ state, answer, nextScenario, prevScenario, goToScenario, complete, reset }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
