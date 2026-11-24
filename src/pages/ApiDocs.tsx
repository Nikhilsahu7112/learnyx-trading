import { useState } from 'react';
import { CheckCircle2, Play, Server, TriangleAlert, XCircle } from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  CardBody,
  PageHeader,
  Section,
  TableWrap,
  cx,
} from '../components/ui';

interface Endpoint {
  method: 'GET';
  path: string;
  description: string;
  params?: { name: string; description: string }[];
  example: string;
}

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/health',
    description: 'Service liveness aur build metadata. Cache-control: no-store.',
    example: '/api/health',
  },
  {
    method: 'GET',
    path: '/api/courses',
    description: 'Saare 5 levels ka summary — modules, lesson counts aur reading time ke saath.',
    example: '/api/courses',
  },
  {
    method: 'GET',
    path: '/api/courses/:slug',
    description: 'Ek course ka poora structure: modules aur unke lessons ki list.',
    params: [{ name: 'slug', description: 'Course slug, e.g. market-foundations' }],
    example: '/api/courses/market-foundations',
  },
  {
    method: 'GET',
    path: '/api/lessons',
    description: 'Published lessons ki flat list. Query params se filter karein.',
    params: [
      { name: 'course', description: 'Course slug filter' },
      { name: 'module', description: 'Module slug filter' },
      { name: 'limit', description: 'Max results (1–100, default 50)' },
    ],
    example: '/api/lessons?limit=10',
  },
  {
    method: 'GET',
    path: '/api/lessons/:course/:module/:slug',
    description: 'Ek lesson ka poora authored content — blocks, objectives, quiz aur references.',
    params: [
      { name: 'course', description: 'Course slug' },
      { name: 'module', description: 'Module slug' },
      { name: 'slug', description: 'Lesson slug' },
    ],
    example: '/api/lessons/market-foundations/market-basics/what-is-a-stock-market',
  },
  {
    method: 'GET',
    path: '/api/glossary',
    description: 'A–Z glossary entries. Query se search ya filter karein.',
    params: [
      { name: 'q', description: 'Search term (min 2 chars)' },
      { name: 'category', description: 'Category filter' },
      { name: 'letter', description: 'Single letter A–Z' },
    ],
    example: '/api/glossary?q=spread',
  },
  {
    method: 'GET',
    path: '/api/quizzes',
    description: 'Practice question bank. Category aur difficulty se filter karein.',
    params: [
      { name: 'category', description: 'e.g. risk-management' },
      { name: 'difficulty', description: 'easy | medium | hard' },
      { name: 'limit', description: 'Max questions (1–100)' },
    ],
    example: '/api/quizzes?category=risk-management&limit=5',
  },
];

const statusRows = [
  ['200', 'OK — request valid aur resource mil gaya'],
  ['400', 'Bad Request — invalid parameter (validation message JSON me)'],
  ['404', 'Not Found — route ya resource exist nahi karta'],
  ['405', 'Method Not Allowed — sirf GET supported hai'],
  ['429', 'Too Many Requests — rate limit exceeded'],
  ['500', 'Internal Server Error — generic message, koi stack trace nahi'],
];

export default function ApiDocs() {
  const [path, setPath] = useState('/api/health');
  const [result, setResult] = useState<string>('');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResult('');
    setStatus(null);
    try {
      const res = await fetch(path, { headers: { accept: 'application/json' } });
      setStatus(res.status);
      const text = await res.text();
      try {
        setResult(JSON.stringify(JSON.parse(text), null, 2).slice(0, 4000));
      } catch {
        setResult(text.slice(0, 2000));
      }
    } catch (err) {
      setStatus(0);
      setResult(
        `Request failed: ${err instanceof Error ? err.message : 'unknown error'}\n\n` +
          'Agar aap static preview par hain to /api routes available nahi honge — wo Cloudflare Worker se serve hote hain.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Developers"
        title="Public API reference"
        description="Learnyx ka content read-only JSON API ke through available hai. Koi API key nahi chahiye, koi authentication nahi — public educational data hai."
        actions={
          <div className="glass-subtle flex items-center gap-2 rounded-xl px-4 py-3">
            <Server aria-hidden="true" className="h-4 w-4 text-accent-400" />
            <span className="text-xs font-semibold text-text-primary">Read-only · No auth</span>
          </div>
        }
      />

      <Callout tone="info" title="CORS & caching">
        <p>
          Public routes same-origin se serve hote hain aur <code>GET</code> requests accept karte hain.
          Content responses <code>Cache-Control: public, max-age=300</code> ke saath aate hain;{' '}
          <code>/api/health</code> cache nahi hota. Sabhi responses JSON hain.
        </p>
      </Callout>

      <Section title="Live tester" className="mt-8">
        <Card>
          <CardBody>
            <label htmlFor="api-path" className="mb-1.5 block text-[0.72rem] font-semibold text-text-secondary">
              Request path
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-3">
                <span className="text-[0.7rem] font-semibold text-up-400">GET</span>
                <input
                  id="api-path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="w-full bg-transparent py-2 font-mono text-[0.78rem] text-text-primary focus:outline-none"
                  spellCheck={false}
                />
              </div>
              <Button onClick={run} disabled={loading || !path.startsWith('/')}>
                <Play aria-hidden="true" className="h-3.5 w-3.5" />
                {loading ? 'Sending…' : 'Send request'}
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['/api/health', '/api/courses', '/api/glossary?q=spread', '/api/quizzes?limit=3'].map(
                (p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPath(p)}
                    className="rounded border border-white/10 bg-white/4 px-2 py-0.5 font-mono text-[0.65rem] text-text-muted hover:bg-white/8 hover:text-text-secondary"
                  >
                    {p}
                  </button>
                ),
              )}
            </div>

            {status !== null && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  {status >= 200 && status < 300 ? (
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-up-400" />
                  ) : (
                    <XCircle aria-hidden="true" className="h-4 w-4 text-down-400" />
                  )}
                  <p className="text-[0.75rem] font-semibold text-text-primary">
                    {status === 0 ? 'Network error' : `HTTP ${status}`}
                  </p>
                </div>
                <pre className="mt-2 max-h-96 overflow-auto rounded-xl border border-white/10 bg-ink-950/70 p-3 font-mono text-[0.7rem] leading-relaxed whitespace-pre-wrap text-text-secondary">
                  {result}
                </pre>
                {status === 404 && path.startsWith('/api/') && (
                  <p className="mt-2 flex items-start gap-1.5 text-[0.7rem] text-warn-500">
                    <TriangleAlert aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
                    Static preview me API nahi chalti. Deployed Worker par ye route JSON return karta
                    hai (see README deployment section).
                  </p>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </Section>

      <Section title="Endpoints" className="mt-10">
        <div className="space-y-3">
          {endpoints.map((e) => (
            <Card key={e.path + e.method} className="overflow-hidden">
              <div className="border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[0.76rem]">
                  <span className="rounded border border-up-500/35 bg-up-500/12 px-1.5 py-0.5 text-[0.6rem] font-bold text-up-400">
                    {e.method}
                  </span>
                  <span className="text-text-primary">{e.path}</span>
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[0.8rem] leading-relaxed text-text-secondary">{e.description}</p>
                {e.params && (
                  <div className="mt-2.5 space-y-1">
                    {e.params.map((p) => (
                      <p key={p.name} className="text-[0.72rem] text-text-muted">
                        <code className="rounded bg-white/6 px-1 py-0.5 text-accent-300">{p.name}</code>{' '}
                        — {p.description}
                      </p>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPath(e.example);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-2.5 text-[0.7rem] font-semibold text-accent-400 hover:text-accent-300"
                >
                  Try this endpoint →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Status codes" className="mt-10">
        <Card>
          <CardBody>
            <TableWrap headers={['Code', 'Meaning']} rows={statusRows} caption="Sabhi errors JSON me aate hain." />
            <p className="mt-3 text-[0.74rem] leading-relaxed text-text-muted">
              Error responses ka shape: <code>{'{ "error": "message", "code": "NOT_FOUND" }'}</code>.
              Stack traces, environment variables, KV keys ya internal paths kabhi expose nahi hote.
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section title="Admin API" className="mt-10">
        <Card className="border-violet-500/25">
          <CardBody>
            <h3 className="text-sm font-semibold text-text-primary">Private, not documented publicly</h3>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
              <code>/api/admin/*</code> routes environment secret se protected hain. Agar secret set
              nahi hai to ye routes <code>503</code> return karte hain (fail closed, never open). Ye
              routes public navigation me kahin link nahi hote aur yahan unka shape deliberately
              document nahi kiya gaya.
            </p>
            <p className="mt-2.5 text-[0.74rem] leading-relaxed text-text-muted">
              Deployment ke liye secret set karna zaroori hai:{' '}
              <code className="rounded bg-white/6 px-1 py-0.5">npx wrangler secret put ADMIN_SECRET</code>{' '}
              — value command prompt me enter karein, kabhi source ya chat me na daalein.
            </p>
            <p className={cx('mt-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-[0.72rem] text-text-muted')}>
              Admin endpoints ka constant-time token comparison use hota hai. Rate limiting KV-backed
              counter se hoti hai.
            </p>
          </CardBody>
        </Card>
      </Section>
    </div>
  );
}
