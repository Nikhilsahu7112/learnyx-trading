/**
 * Learnyx Trading — Cloudflare Worker.
 *
 * Responsibilities:
 *   1. Serve the statically built SPA (assets binding) with safe fallbacks.
 *   2. Expose the public read-only JSON API under /api/*.
 *   3. Expose a token-protected admin API under /api/admin/* that fails closed
 *      when ADMIN_SECRET is not configured.
 *
 * Security posture:
 *   - No secret is ever read from source; only from the Worker environment.
 *   - All error responses are generic (no stack traces, no env dump).
 *   - Admin authentication uses a constant-time comparison and never echoes
 *     the secret back in any response.
 */

import { courses, lessonMetas, modules } from '../src/data/curriculum';
import { glossary } from '../src/data/glossary';
import { markets } from '../src/data/markets';
import { practiceBank } from '../src/data/quizBank';
import { lessons } from '../src/data/lessons';

export interface Env {
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  LEARNYX_KV?: KVNamespace;
  ADMIN_SECRET?: string;
  ENVIRONMENT?: string;
  BUILD_VERSION?: string;
}

const SERVICE = 'learnyx-trading-api';
const VERSION = '1.0.0';
const API_PREFIX = '/api';
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 50;
const RATE_LIMIT_PER_MINUTE = 120;

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const BASE_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'SAMEORIGIN',
};

function meta(source: string, count?: number) {
  return {
    count: count ?? undefined,
    source,
    version: VERSION,
    generatedAt: new Date().toISOString(),
  };
}

function json(data: unknown, status = 200, cache = 'public, max-age=300', extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...BASE_HEADERS, 'cache-control': cache, ...extra },
  });
}

function listResponse<T>(data: T[], source: string) {
  return json({ data, meta: meta(source, data.length) });
}

function itemResponse<T>(data: T, source: string) {
  return json({ data, meta: meta(source) });
}

type ErrorCode =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'RATE_LIMITED'
  | 'UNAUTHORIZED'
  | 'SERVICE_UNAVAILABLE'
  | 'INTERNAL';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  BAD_REQUEST: 'The request was invalid. Check the query parameters and try again.',
  NOT_FOUND: 'The requested resource does not exist.',
  METHOD_NOT_ALLOWED: 'This endpoint only supports GET requests.',
  RATE_LIMITED: 'Too many requests. Please retry after a short pause.',
  UNAUTHORIZED: 'Authentication is required for this endpoint.',
  SERVICE_UNAVAILABLE: 'This endpoint is disabled on this deployment.',
  INTERNAL: 'Something went wrong while processing the request.',
};

const ERROR_STATUS: Record<ErrorCode, number> = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  RATE_LIMITED: 429,
  UNAUTHORIZED: 401,
  SERVICE_UNAVAILABLE: 503,
  INTERNAL: 500,
};

function fail(code: ErrorCode, extraHeaders: Record<string, string> = {}) {
  const status = ERROR_STATUS[code];
  const response = json(
    { error: { code, message: ERROR_MESSAGES[code], status } },
    status,
    'no-store',
    extraHeaders,
  );
  return response;
}

function intParam(value: string | null, fallback: number, min: number, max: number) {
  if (value === null) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  if (n < min || n > max) return null;
  return n;
}

/* ------------------------------------------------------------------ */
/* Rate limiting (KV-backed, best effort)                              */
/* ------------------------------------------------------------------ */

async function checkRateLimit(env: Env, req: Request): Promise<boolean> {
  if (!env.LEARNYX_KV) return true; // No KV → no shared counter; do not block.
  const ip = req.headers.get('cf-connecting-ip') ?? 'unknown';
  // Hash-free key: KV key namespace is private, and the IP is not returned.
  const bucket = Math.floor(Date.now() / 60_000);
  const key = `ratelimit:${bucket}:${ip.slice(0, 45)}`;
  try {
    const current = Number((await env.LEARNYX_KV.get(key)) ?? '0');
    if (current >= RATE_LIMIT_PER_MINUTE) return false;
    await env.LEARNYX_KV.put(key, String(current + 1), { expirationTtl: 120 });
    return true;
  } catch {
    return true; // Fail open on limiter errors; content is static and public.
  }
}

/* ------------------------------------------------------------------ */
/* Constant-time comparison                                            */
/* ------------------------------------------------------------------ */

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  // Compare lengths in constant time by always hashing to a fixed digest size.
  const len = Math.max(ab.length, bb.length, 1);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

/* ------------------------------------------------------------------ */
/* Route handlers                                                      */
/* ------------------------------------------------------------------ */

function handleHealth(env: Env) {
  return json(
    {
      status: 'ok',
      service: SERVICE,
      version: VERSION,
      time: new Date().toISOString(),
      kv: env.LEARNYX_KV ? 'bound' : 'unbound',
      admin: env.ADMIN_SECRET && env.ADMIN_SECRET.length >= 16 ? 'configured' : 'disabled',
      counts: {
        courses: courses.length,
        modules: modules.length,
        lessons: lessonMetas.length,
        publishedLessons: lessons.length,
        glossary: glossary.length,
        markets: markets.length,
        quizzes: practiceBank.length,
      },
    },
    200,
    'no-store',
  );
}

function handleCourses(url: URL) {
  const segments = url.pathname.split('/').filter(Boolean);
  // /api/courses/:slug
  if (segments.length === 3) {
    const slug = decodeURIComponent(segments[2]);
    const course = courses.find((c) => c.slug === slug);
    if (!course) return fail('NOT_FOUND');
    const courseModules = modules
      .filter((m) => m.courseId === course.id)
      .sort((a, b) => a.order - b.order)
      .map((m) => ({
        id: m.id,
        slug: m.slug,
        title: m.title,
        summary: m.summary,
        order: m.order,
        lessons: lessonMetas
          .filter((l) => l.moduleId === m.id)
          .sort((a, b) => a.order - b.order)
          .map((l) => ({
            id: l.id,
            slug: l.slug,
            title: l.title,
            difficulty: l.difficulty,
            estimatedMinutes: l.estimatedMinutes,
            published: l.published,
          })),
      }));
    return itemResponse({ ...course, modules: courseModules }, 'curriculum');
  }

  const data = courses.map((c) => ({
    id: c.id,
    level: c.level,
    slug: c.slug,
    title: c.title,
    titleHi: c.titleHi,
    summary: c.summary,
    difficulty: c.difficulty,
    moduleCount: c.moduleCount,
    lessonCount: c.lessonCount,
    estimatedMinutes: c.estimatedMinutes,
  }));
  return listResponse(data, 'curriculum');
}

function handleLessons(url: URL) {
  const segments = url.pathname.split('/').filter(Boolean);
  // /api/lessons/:course/:module/:slug
  if (segments.length === 5) {
    const [, , courseSlug, moduleSlug, lessonSlug] = segments.map((s) => decodeURIComponent(s));
    const lesson = lessons.find((l) => {
      if (l.courseId !== courseSlug || l.slug !== lessonSlug) return false;
      return l.id.split('/')[1] === moduleSlug;
    });
    if (!lesson) return fail('NOT_FOUND');
    return itemResponse(lesson, 'lessons');
  }

  const courseFilter = url.searchParams.get('course');
  const moduleFilter = url.searchParams.get('module');
  const limit = intParam(url.searchParams.get('limit'), DEFAULT_LIMIT, 1, MAX_LIMIT);
  if (limit === null) return fail('BAD_REQUEST');

  let filtered = lessonMetas.filter((l) => l.published);
  if (courseFilter) filtered = filtered.filter((l) => l.courseId === courseFilter);
  if (moduleFilter) filtered = filtered.filter((l) => l.id.split('/')[1] === moduleFilter);

  const data = filtered.slice(0, limit).map((l) => ({
    id: l.id,
    courseId: l.courseId,
    moduleSlug: l.id.split('/')[1],
    slug: l.slug,
    title: l.title,
    difficulty: l.difficulty,
    estimatedMinutes: l.estimatedMinutes,
    tags: l.tags,
  }));
  return listResponse(data, 'lessons');
}

function handleGlossary(url: URL) {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const category = url.searchParams.get('category');
  const letter = url.searchParams.get('letter');

  if (letter && !/^[a-z]$/i.test(letter)) return fail('BAD_REQUEST');

  let entries = glossary;
  if (category) entries = entries.filter((g) => g.category === category);
  if (letter) entries = entries.filter((g) => g.letter === letter.toUpperCase());
  if (q.length >= 2) {
    entries = entries.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.short.toLowerCase().includes(q) ||
        g.detail.toLowerCase().includes(q),
    );
  }

  return listResponse(entries, 'glossary');
}

function handleQuizzes(url: URL) {
  const category = url.searchParams.get('category');
  const difficulty = url.searchParams.get('difficulty');
  const limit = intParam(url.searchParams.get('limit'), MAX_LIMIT, 1, MAX_LIMIT);
  if (limit === null) return fail('BAD_REQUEST');

  if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) return fail('BAD_REQUEST');

  let items = practiceBank;
  if (category) items = items.filter((q) => q.category === category);
  if (difficulty) items = items.filter((q) => q.difficulty === difficulty);

  const data = items.slice(0, limit).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    category: q.category,
    difficulty: q.difficulty,
  }));
  return listResponse(data, 'quizzes');
}

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */

async function handleAdmin(request: Request, env: Env, url: URL) {
  // Fail closed: without a properly configured secret, the admin surface does
  // not exist at all from the outside.
  if (!env.ADMIN_SECRET || env.ADMIN_SECRET.length < 16) {
    return fail('SERVICE_UNAVAILABLE');
  }

  const auth = request.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token || !timingSafeEqual(token, env.ADMIN_SECRET)) {
    return fail('UNAUTHORIZED', { 'www-authenticate': 'Bearer' });
  }

  const segments = url.pathname.split('/').filter(Boolean); // api, admin, ...
  const action = segments[2] ?? '';

  if (action === 'stats') {
    if (!env.LEARNYX_KV) return fail('SERVICE_UNAVAILABLE');
    const keys = await env.LEARNYX_KV.list({ prefix: 'content:', limit: 100 });
    return json(
      {
        data: {
          kvKeys: keys.keys.map((k) => k.name),
          kvBound: true,
          counts: {
            courses: courses.length,
            lessons: lessons.length,
            glossary: glossary.length,
            quizzes: practiceBank.length,
          },
        },
        meta: meta('admin'),
      },
      200,
      'no-store',
    );
  }

  if (action === 'content') {
    if (!env.LEARNYX_KV) return fail('SERVICE_UNAVAILABLE');
    if (request.method !== 'POST') return fail('METHOD_NOT_ALLOWED');

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return fail('BAD_REQUEST');
    }

    if (!body || typeof body !== 'object') return fail('BAD_REQUEST');
    const payload = body as { key?: unknown; value?: unknown };
    if (typeof payload.key !== 'string' || !/^[a-zA-Z0-9:_-]{3,80}$/.test(payload.key)) {
      return fail('BAD_REQUEST');
    }
    if (payload.value === undefined) return fail('BAD_REQUEST');
    const serialised = JSON.stringify(payload.value);
    if (serialised.length > 512_000) return fail('BAD_REQUEST');

    await env.LEARNYX_KV.put(`content:${payload.key}`, serialised);
    return json({ data: { key: payload.key, saved: true }, meta: meta('admin') }, 200, 'no-store');
  }

  return fail('NOT_FOUND');
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const SECURITY_HEADERS: Record<string, string> = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'geolocation=(), microphone=(), camera=(), payment=()',
  'content-security-policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (!url.pathname.startsWith(API_PREFIX)) {
      // Static assets (SPA). The assets binding handles hashed assets and the
      // SPA fallback configured in wrangler.toml.
      if (env.ASSETS) {
        const assetResponse = await env.ASSETS.fetch(request);
        return withSecurityHeaders(assetResponse);
      }
      return withSecurityHeaders(
        new Response('Learnyx Trading static assets are not configured on this Worker.', {
          status: 500,
          headers: { 'content-type': 'text/plain; charset=utf-8' },
        }),
      );
    }

    // Everything below is the JSON API.
    if (request.method !== 'GET' && request.method !== 'POST') {
      return fail('METHOD_NOT_ALLOWED');
    }

    const rateOk = await checkRateLimit(env, request);
    if (!rateOk) return fail('RATE_LIMITED', { 'retry-after': '60' });

    const path = url.pathname.replace(/\/+$/, '') || '/api';

    try {
      if (path === '/api' || path === '/api/health') {
        if (request.method !== 'GET') return fail('METHOD_NOT_ALLOWED');
        return handleHealth(env);
      }

      if (path.startsWith('/api/admin')) {
        return await handleAdmin(request, env, url);
      }

      if (request.method !== 'GET') return fail('METHOD_NOT_ALLOWED');

      if (path === '/api/courses' || path.startsWith('/api/courses/')) {
        if (path.split('/').filter(Boolean).length > 3) return fail('NOT_FOUND');
        return handleCourses(url);
      }

      if (path === '/api/lessons' || path.startsWith('/api/lessons/')) {
        return handleLessons(url);
      }

      if (path === '/api/glossary') {
        return handleGlossary(url);
      }

      if (path === '/api/quizzes') {
        return handleQuizzes(url);
      }

      if (path === '/api/markets') {
        return listResponse(
          markets.map((m) => ({
            id: m.id,
            slug: m.slug,
            name: m.name,
            tagline: m.tagline,
            sections: m.sections.length,
          })),
          'markets',
        );
      }

      return fail('NOT_FOUND');
    } catch {
      // Never leak internals.
      return fail('INTERNAL');
    }
  },
};
