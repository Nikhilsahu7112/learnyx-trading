import type {
  Lesson,
  LessonBlock,
  LessonMeta,
  QuizCategory,
  QuizQuestion,
} from '../../lib/types';
import { courseBySlug, lessonMetas, moduleBySlug } from '../curriculum';

export interface QuizSeed {
  q: string;
  options: [string, string, string, string] | string[];
  answer: number;
  explain: string;
}

export interface LessonBody {
  objectives: string[];
  prerequisites?: string[];
  intro: string;
  blocks: LessonBlock[];
  summary: string[];
  mistakes: string[];
  keyPoints: string[];
  quiz: QuizSeed[];
  exercise: string;
  furtherReading?: { title: string; note: string }[];
}

/** Key format: `course-slug/module-slug/lesson-slug`. */
export type LessonBodyRegistry = Record<string, LessonBody>;

const CATEGORY_BY_COURSE: Record<string, QuizCategory> = {
  'market-foundations': 'market-basics',
  'technical-analysis': 'technical-analysis',
  'technical-and-fundamental': 'indicators',
  'strategies-risk-psychology': 'risk-management',
  'advanced-market-education': 'derivatives',
};

const GENERIC_READING = [
  {
    title: 'SEBI Investor Education (investor.sebi.gov.in)',
    note: 'India ka regulator-run free learning portal. Yahan se SEBI ke official investor education material padh sakte hain.',
  },
  {
    title: 'NSE India — Market Pulse & Education',
    note: 'NSE ke public education pages par contract specifications, settlement rules aur product notes milte hain.',
  },
  {
    title: 'Your broker’s public help centre (read-only)',
    note: 'Order types aur charges ke exact rules broker se broker badalte hain. Sirf official documentation padhein — account khulwane ki zaroorat nahi.',
  },
];

function toQuestion(seed: QuizSeed, id: string, category: QuizCategory, difficulty: string): QuizQuestion {
  return {
    id,
    question: seed.q,
    options: seed.options,
    correctIndex: seed.answer,
    explanation: seed.explain,
    category,
    difficulty: difficulty === 'Advanced' ? 'hard' : difficulty === 'Intermediate' ? 'medium' : 'easy',
  };
}

function buildLesson(key: string, body: LessonBody): Lesson | null {
  const [courseSlug, moduleSlug, lessonSlug] = key.split('/');
  const meta: LessonMeta | undefined = lessonMetas.find(
    (l) =>
      l.slug === lessonSlug &&
      l.courseId === courseSlug &&
      moduleBySlug.get(`${courseSlug}/${moduleSlug}`)?.id === l.moduleId,
  );
  const course = courseBySlug.get(courseSlug);
  if (!meta || !course) return null;

  const category = CATEGORY_BY_COURSE[courseSlug] ?? 'market-basics';

  return {
    ...meta,
    title: meta.title,
    learningObjectives: body.objectives,
    prerequisites: body.prerequisites ?? [
      'Koi prior market knowledge zaroori nahi — bas padhne ki ichha aur basic arithmetic.',
    ],
    intro: body.intro,
    blocks: body.blocks,
    summary: body.summary,
    commonMistakes: body.mistakes,
    keyPoints: body.keyPoints,
    knowledgeCheck: body.quiz.map((q, i) =>
      toQuestion(q, `${meta.id}#q${i + 1}`, category, course.difficulty),
    ),
    exercise: body.exercise,
    furtherReading: body.furtherReading ?? GENERIC_READING,
    updatedAt: '2026-11-20',
  };
}

export function buildLessonRegistry(bodies: LessonBodyRegistry): Lesson[] {
  const lessons: Lesson[] = [];
  for (const [key, body] of Object.entries(bodies)) {
    const lesson = buildLesson(key, body);
    if (lesson) lessons.push(lesson);
  }
  return lessons;
}

/** Convenience block builders keep the content files readable. */
export const p = (text: string): LessonBlock => ({ type: 'paragraph', text });
export const h = (text: string): LessonBlock => ({ type: 'heading', text });
export const sub = (text: string): LessonBlock => ({ type: 'subheading', text });
export const list = (items: string[]): LessonBlock => ({ type: 'list', items });
export const olist = (items: string[]): LessonBlock => ({ type: 'list', ordered: true, items });
export const callout = (
  tone: 'info' | 'warn' | 'tip' | 'danger',
  title: string,
  text: string,
): LessonBlock => ({ type: 'callout', tone, title, text });
export const table = (headers: string[], rows: string[][], caption?: string): LessonBlock => ({
  type: 'table',
  headers,
  rows,
  caption,
});
export const formula = (title: string, expression: string, explanation: string): LessonBlock => ({
  type: 'formula',
  title,
  expression,
  explanation,
});
export const example = (title: string, text: string, steps?: string[]): LessonBlock => ({
  type: 'example',
  title,
  steps,
  text,
});
export const terms = (items: { term: string; meaning: string }[]): LessonBlock => ({
  type: 'terms',
  items,
});
export const diagram = (
  kind: 'market-cycle' | 'candles' | 'trend' | 'support-resistance' | 'risk-reward' | 'option-payoff' | 'order-book',
  title: string,
  caption: string,
  description: string,
): LessonBlock => ({ type: 'diagram', kind, title, caption, description });
