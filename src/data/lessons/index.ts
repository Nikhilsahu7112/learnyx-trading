import type { Lesson } from '../../lib/types';
import { buildLessonRegistry } from './builder';
import { level1 } from './level1';
import { level1b } from './level1b';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';

/**
 * All authored lesson bodies. The registry is validated against the curriculum —
 * a body whose key does not match a real lesson is ignored, and the reading
 * sequence only walks lessons that actually have content.
 */
const allBodies = { ...level1, ...level1b, ...level2, ...level3, ...level4, ...level5 };

export const lessons: Lesson[] = buildLessonRegistry(allBodies).sort((a, b) => {
  const [al, am] = a.id.split('/');
  const [bl, bm] = b.id.split('/');
  if (al !== bl) return al.localeCompare(bl);
  if (am !== bm) return am.localeCompare(bm);
  return a.order - b.order;
});

export const lessonByKey = new Map(lessons.map((l) => [l.id, l]));

export function getLesson(courseSlug: string, moduleSlug: string, lessonSlug: string) {
  for (const lesson of lessons) {
    if (lesson.slug !== lessonSlug || lesson.courseId !== courseSlug) continue;
    const moduleMeta = lesson.id.split('/')[1];
    if (moduleMeta === moduleSlug) return lesson;
  }
  return undefined;
}

export const lessonContentKeys = Object.keys(allBodies);
