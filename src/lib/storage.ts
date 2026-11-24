/**
 * Local-only progress storage. No account, no network, no external service.
 * Every write is wrapped defensively: if localStorage is unavailable (private mode,
 * disabled storage, quota exceeded) the app keeps working with in-memory state.
 */

const PREFIX = 'learnyx:v1:';

export const STORAGE_KEYS = {
  progress: 'progress',
  bookmarks: 'bookmarks',
  notes: 'notes',
  quizScores: 'quiz-scores',
  lastLesson: 'last-lesson',
  paperTrades: 'paper-trades',
  paperAccount: 'paper-account',
  patternStats: 'pattern-stats',
  labPrefs: 'lab-prefs',
  settings: 'settings',
} as const;

let memoryFallback = new Map<string, string>();

function storageAvailable(): boolean {
  try {
    const probe = '__learnyx_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export const storageEnabled = typeof window !== 'undefined' && storageAvailable();

export function readJson<T>(key: string, fallback: T): T {
  const fullKey = PREFIX + key;
  try {
    const raw = storageEnabled ? window.localStorage.getItem(fullKey) : memoryFallback.get(fullKey);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): boolean {
  const fullKey = PREFIX + key;
  const serialized = JSON.stringify(value);
  try {
    if (storageEnabled) {
      window.localStorage.setItem(fullKey, serialized);
    } else {
      memoryFallback.set(fullKey, serialized);
    }
    return true;
  } catch {
    memoryFallback.set(fullKey, serialized);
    return false;
  }
}

export function removeKey(key: string) {
  const fullKey = PREFIX + key;
  try {
    if (storageEnabled) window.localStorage.removeItem(fullKey);
    memoryFallback.delete(fullKey);
  } catch {
    memoryFallback.delete(fullKey);
  }
}

export function clearAllLearnyxData() {
  memoryFallback = new Map();
  if (!storageEnabled) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

export function exportAllData() {
  const dump: Record<string, unknown> = {
    exportedAt: new Date().toISOString(),
    app: 'Learnyx Trading',
    version: 1,
    storageAvailable: storageEnabled,
    data: {},
  };
  const data: Record<string, unknown> = {};
  for (const key of Object.values(STORAGE_KEYS)) {
    data[key] = readJson(key, null);
  }
  dump.data = data;
  return dump;
}
