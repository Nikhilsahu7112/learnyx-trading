// Content integrity checks for Learnyx Trading.
// Run with: node scripts/validate-content.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const curriculum = readFileSync(join(root, 'src/data/curriculum.ts'), 'utf8');
const lessonDir = join(root, 'src/data/lessons');

// Extract lesson slugs from the curriculum seeds.
const curriculumSlugs = new Set();
for (const line of curriculum.split('\n')) {
  const m = line.match(/^\s*slug: '([a-z0-9-]+)',\s*$/);
  if (m) curriculumSlugs.add(m[1]);
}

const files = readdirSync(lessonDir).filter((f) => f.startsWith('level') && f.endsWith('.ts'));
let bodyKeys = [];
let problems = [];

for (const file of files) {
  const src = readFileSync(join(lessonDir, file), 'utf8');
  // Keys look like:  'course/module/lesson': {
  const matches = src.match(/'([a-z0-9-]+)\/([a-z0-9-]+)\/([a-z0-9-]+)':\s*\{/g) ?? [];
  for (const m of matches) {
    const key = m.replace(/:\s*\{$/, '').replace(/'/g, '');
    bodyKeys.push(key);
    const lessonSlug = key.split('/')[2];
    if (!curriculumSlugs.has(lessonSlug)) {
      problems.push(`Unknown lesson slug in ${file}: ${key}`);
    }
  }
}

// Count quiz questions per lesson to enforce >= 1 knowledge check.
for (const file of files) {
  const src = readFileSync(join(lessonDir, file), 'utf8');
  const bodyCount = (src.match(/^\s{2}'[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+':\s*\{/gm) ?? []).length;
  const quizCount = (src.match(/^\s{8}q: /gm) ?? []).length;
  // Every lesson must ship at least 3 knowledge-check questions.
  if (quizCount < bodyCount * 3) {
    problems.push(
      `${file}: ${bodyCount} lessons but only ${quizCount} quiz questions (expected >= 3 per lesson)`,
    );
  }
}

const unique = new Set(bodyKeys);
if (unique.size !== bodyKeys.length) {
  problems.push(`Duplicate lesson keys detected (${bodyKeys.length} keys, ${unique.size} unique)`);
}

console.log(`Curriculum lesson slugs: ${curriculumSlugs.size}`);
console.log(`Authored lesson bodies: ${unique.size}`);

if (problems.length) {
  console.error('\nProblems found:');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log('\nContent integrity: OK');
