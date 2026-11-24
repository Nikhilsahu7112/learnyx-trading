/** Shared types used by both the frontend and the Cloudflare Worker. */

export type MarketId =
  | 'indian'
  | 'us'
  | 'forex'
  | 'commodity'
  | 'crypto'
  | 'derivatives'
  | 'global';

export type Level = 1 | 2 | 3 | 4 | 5;

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  level: Level;
  slug: string;
  title: string;
  titleHi: string;
  summary: string;
  difficulty: Difficulty;
  icon: string;
  accent: 'blue' | 'violet' | 'teal' | 'amber' | 'rose';
  moduleCount: number;
  lessonCount: number;
  estimatedMinutes: number;
}

export interface Module {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  titleHi: string;
  summary: string;
  order: number;
}

export interface LessonMeta {
  id: string;
  courseId: string;
  moduleId: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  order: number;
  published: boolean;
  tags: string[];
}

export type LessonBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id?: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'callout'; tone: 'info' | 'warn' | 'tip' | 'danger'; title: string; text: string }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'formula'; title: string; expression: string; explanation: string }
  | { type: 'example'; title: string; steps?: string[]; text: string }
  | { type: 'terms'; items: { term: string; meaning: string }[] }
  | { type: 'diagram'; kind: DiagramKind; title: string; caption: string; description: string };

export type DiagramKind =
  | 'market-cycle'
  | 'candles'
  | 'trend'
  | 'support-resistance'
  | 'risk-reward'
  | 'option-payoff'
  | 'order-book';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: QuizCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuizCategory =
  | 'market-basics'
  | 'technical-analysis'
  | 'candlesticks'
  | 'indicators'
  | 'fundamental'
  | 'risk-management'
  | 'derivatives'
  | 'advanced';

export interface Lesson extends LessonMeta {
  learningObjectives: string[];
  prerequisites: string[];
  intro: string;
  blocks: LessonBlock[];
  summary: string[];
  commonMistakes: string[];
  keyPoints: string[];
  knowledgeCheck: QuizQuestion[];
  exercise: string;
  furtherReading: { title: string; note: string }[];
  updatedAt: string;
}

export interface GlossaryEntry {
  term: string;
  slug: string;
  letter: string;
  short: string;
  detail: string;
  category: string;
  related: string[];
  example?: string;
}

export interface MarketProfile {
  id: MarketId;
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  icon: string;
  accent: 'blue' | 'violet' | 'teal' | 'amber' | 'rose';
  sections: {
    id: string;
    title: string;
    body: string;
    bullets?: string[];
    terms?: { term: string; meaning: string }[];
    table?: { headers: string[]; rows: string[][] };
  }[];
  risks: string[];
  relatedLessons: string[];
}

export interface ApiListResponse<T> {
  data: T[];
  meta: { count: number; source: string; version: string; generatedAt: string };
}

export interface ApiItemResponse<T> {
  data: T;
  meta: { source: string; version: string; generatedAt: string };
}

export interface ApiError {
  error: { code: string; message: string; status: number };
}

export interface HealthResponse {
  status: 'ok';
  service: string;
  version: string;
  time: string;
  kv: 'bound' | 'unbound';
  admin: 'configured' | 'disabled';
  counts: Record<string, number>;
}

/* ------------------------------------------------------------------ */
/* Paper trading                                                       */
/* ------------------------------------------------------------------ */

export interface PaperAccount {
  balance: number;
  startingBalance: number;
  currency: string;
}

export interface PaperTrade {
  id: string;
  instrumentId: string;
  symbol: string;
  side: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  entryAt: string;
  status: 'open' | 'closed';
  exitPrice?: number;
  exitAt?: string;
  pnl?: number;
}
