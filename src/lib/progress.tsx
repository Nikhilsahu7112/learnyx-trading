import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { readJson, writeJson, STORAGE_KEYS, clearAllLearnyxData } from './storage';
import type { QuizCategory } from './types';

export interface LessonProgress {
  completed: boolean;
  completedAt?: string;
  lastViewedAt: string;
  scrollPct?: number;
}

export interface QuizScore {
  id: string;
  label: string;
  category: QuizCategory | 'lesson' | 'pattern' | 'mixed';
  correct: number;
  total: number;
  at: string;
}

export interface Note {
  lessonId: string;
  text: string;
  updatedAt: string;
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>;
  bookmarks: string[];
  notes: Record<string, Note>;
  quizScores: QuizScore[];
  lastLessonId: string | null;
}

const EMPTY: ProgressState = {
  lessons: {},
  bookmarks: [],
  notes: {},
  quizScores: [],
  lastLessonId: null,
};

interface ProgressApi extends ProgressState {
  ready: boolean;
  storageEnabled: boolean;
  toggleBookmark: (lessonId: string) => void;
  isBookmarked: (lessonId: string) => boolean;
  markComplete: (lessonId: string, completed?: boolean) => void;
  markViewed: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  saveNote: (lessonId: string, text: string) => void;
  deleteNote: (lessonId: string) => void;
  recordQuiz: (score: Omit<QuizScore, 'at'>) => void;
  resetProgress: () => void;
  completionPct: (lessonIds: string[]) => number;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [ready, setReady] = useState(false);
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    const stored = readJson<ProgressState>(STORAGE_KEYS.progress, EMPTY);
    setState({
      ...EMPTY,
      ...stored,
      lessons: stored.lessons ?? {},
      bookmarks: Array.isArray(stored.bookmarks) ? stored.bookmarks : [],
      notes: stored.notes ?? {},
      quizScores: Array.isArray(stored.quizScores) ? stored.quizScores : [],
    });
    setReady(true);
    try {
      const probe = '__learnyx_progress_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      setStorageOk(true);
    } catch {
      setStorageOk(false);
    }
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    const ok = writeJson(STORAGE_KEYS.progress, next);
    if (!ok) setStorageOk(false);
  }, []);

  const toggleBookmark = useCallback(
    (lessonId: string) => {
      setState((prev) => {
        const has = prev.bookmarks.includes(lessonId);
        const next = {
          ...prev,
          bookmarks: has ? prev.bookmarks.filter((b) => b !== lessonId) : [...prev.bookmarks, lessonId],
        };
        writeJson(STORAGE_KEYS.progress, next);
        return next;
      });
    },
    [],
  );

  const markComplete = useCallback(
    (lessonId: string, completed = true) => {
      setState((prev) => {
        const existing = prev.lessons[lessonId];
        const next = {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              completed,
              completedAt: completed ? new Date().toISOString() : existing?.completedAt,
              lastViewedAt: new Date().toISOString(),
              scrollPct: existing?.scrollPct,
            },
          },
        };
        writeJson(STORAGE_KEYS.progress, next);
        return next;
      });
    },
    [],
  );

  const markViewed = useCallback((lessonId: string) => {
    setState((prev) => {
      const existing = prev.lessons[lessonId];
      const next = {
        ...prev,
        lastLessonId: lessonId,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            completed: existing?.completed ?? false,
            completedAt: existing?.completedAt,
            lastViewedAt: new Date().toISOString(),
            scrollPct: existing?.scrollPct,
          },
        },
      };
      writeJson(STORAGE_KEYS.progress, next);
      writeJson(STORAGE_KEYS.lastLesson, lessonId);
      return next;
    });
  }, []);

  const saveNote = useCallback((lessonId: string, text: string) => {
    setState((prev) => {
      const notes = { ...prev.notes };
      if (text.trim()) {
        notes[lessonId] = { lessonId, text, updatedAt: new Date().toISOString() };
      } else {
        delete notes[lessonId];
      }
      const next = { ...prev, notes };
      writeJson(STORAGE_KEYS.progress, next);
      return next;
    });
  }, []);

  const deleteNote = useCallback((lessonId: string) => {
    setState((prev) => {
      const notes = { ...prev.notes };
      delete notes[lessonId];
      const next = { ...prev, notes };
      writeJson(STORAGE_KEYS.progress, next);
      return next;
    });
  }, []);

  const recordQuiz = useCallback((score: Omit<QuizScore, 'at'>) => {
    setState((prev) => {
      const entry: QuizScore = { ...score, at: new Date().toISOString() };
      const quizScores = [entry, ...prev.quizScores].slice(0, 200);
      const next = { ...prev, quizScores };
      writeJson(STORAGE_KEYS.progress, next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    clearAllLearnyxData();
    persist(EMPTY);
  }, [persist]);

  const value = useMemo<ProgressApi>(
    () => ({
      ...state,
      ready,
      storageEnabled: storageOk,
      toggleBookmark,
      isBookmarked: (id: string) => state.bookmarks.includes(id),
      markComplete,
      markViewed,
      isComplete: (id: string) => Boolean(state.lessons[id]?.completed),
      saveNote,
      deleteNote,
      recordQuiz,
      resetProgress,
      completionPct: (lessonIds: string[]) => {
        if (!lessonIds.length) return 0;
        const done = lessonIds.filter((id) => state.lessons[id]?.completed).length;
        return Math.round((done / lessonIds.length) * 100);
      },
    }),
    [state, ready, storageOk, toggleBookmark, markComplete, markViewed, saveNote, deleteNote, recordQuiz, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
