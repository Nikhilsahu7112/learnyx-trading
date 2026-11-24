# Learnyx Trading

**Understand Markets. Master Trading.**

A free, login-free trading and financial-market education platform written in
Hinglish (simple Hindi grammar with standard English financial terminology).
Everything is readable immediately — there is no signup, no paywall, no
subscription and no payment flow anywhere in the product.

Learnyx teaches *how markets work*. It is not a signal service, not a broker
and not investment advice.

---

## Table of contents

1. [What is in the product](#1-what-is-in-the-product)
2. [Architecture](#2-architecture)
3. [Tech stack](#3-tech-stack)
4. [Install and run locally](#4-install-and-run-locally)
5. [Build](#5-build)
6. [Testing](#6-testing)
7. [Cloudflare configuration](#7-cloudflare-configuration)
8. [Creating the KV namespace](#8-creating-the-kv-namespace)
9. [Secrets (admin access)](#9-secrets-admin-access)
10. [Deploying](#10-deploying)
11. [API reference](#11-api-reference)
12. [Project structure](#12-project-structure)
13. [Content integrity rules](#13-content-integrity-rules)
14. [Accessibility and performance notes](#14-accessibility-and-performance-notes)
15. [Known limitations](#15-known-limitations)
16. [Troubleshooting](#16-troubleshooting)
17. [Disclaimer](#17-disclaimer)

---

## 1. What is in the product

| Area | What ships |
| --- | --- |
| Curriculum | 5 levels → 23 modules → 70 fully authored lessons (≈16.5 hours of reading). Every lesson follows the same 20-part template: objectives, prerequisites, intro, Hinglish explanation, terminology, formulas, worked examples, diagrams, exercise, common mistakes, key points, summary, quiz, references, prev/next. |
| Market guides | 6 long-form guides: Indian equities, US markets, Forex, Commodities, Crypto, and Derivatives/international. Each has structure, participants, terminology, sub-topic tables and explicit risk/legality notes. |
| Trading Lab | 6 interactive tools — Chart Explorer, Candlestick Pattern Trainer, Indicator Laboratory, Strategy Builder, Backtesting Simulator, Paper Trading Simulator. All simulated, all local. |
| Calculators | 6 tools — Risk-Reward, Position Sizing, P&L, Compound Growth, Average Price, Drawdown. Input validation, hypothetical labels, exact-formula unit tests. |
| Glossary | 288 real terms, A–Z, search, letter navigation, category filter, related-term cross-links and related lessons. |
| Practice | 82 scenario-based questions across 8 categories and 3 difficulty levels, plus per-lesson knowledge checks. Instant feedback, explanations, score, retry. |
| Progress | Lessons completed, quiz history, bookmarks and personal notes — stored in `localStorage` only, with export and reset. |
| Search | Global ⌘K / Ctrl-K search across lessons, glossary, courses, indicators, markets, calculators and practice. Full keyboard support. |

**Honesty rules baked into the build:**

- Every chart on screen uses *synthetic sample data* with a fixed seed and a
  fixed end date (2025-12-31). Every chart screen carries the disclaimer.
- No fake testimonials, no invented student counts, no performance claims.
- Lessons that are not authored are never rendered with placeholder text. A
  curriculum slot without a body renders an explicit "in progress" state, and
  the API returns `404` for it.

---

## 2. Architecture

```
Browser (SPA, no auth)
   │   same-origin relative URLs only
   ▼
Cloudflare Worker  ── static assets binding (ASSETS) ──► dist/ → worker/public/
   │
   ├── /api/health      liveness + counts           (no-store)
   ├── /api/courses     curriculum summary + detail (cache 300s)
   ├── /api/lessons     metadata list + full lesson (cache 300s)
   ├── /api/glossary    A–Z search/filter           (cache 300s)
   ├── /api/quizzes     practice bank               (cache 300s)
   ├── /api/markets     market guide index
   └── /api/admin/*     Bearer-token protected, fails closed
                        │
                        └── KV binding (LEARNYX_KV): rate-limit counters,
                            admin-managed content overrides
```

**Design decisions worth knowing:**

- **One Worker, not two.** Static assets and the JSON API share a Worker so
  there is no CORS surface and no second deployment to keep in sync.
- **The SPA never calls an absolute host.** All `fetch` calls are relative
  (`/api/...`). A self-test asserts that no source file contains
  `fetch('http...')`.
- **Content lives in TypeScript modules.** `src/data/*` is imported by both the
  React app and the Worker, so the API and the UI can never drift apart. The
  Worker bundle is built by Wrangler from the same sources.
- **The lesson corpus is lazily chunked.** Curriculum metadata is in the initial
  bundle (~63 kB gzip app chunk); the 660 kB of authored lesson prose is emitted
  as a separate `lessons-*.js` chunk and only fetched when a lesson (or the API)
  needs it. A test enforces this so a future import cannot silently regress it.

---

## 3. Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript 5.9 | Typed domain model across app and API |
| Bundler | Vite 8 (rolldown) | Fast dev server, small production output |
| Styling | Tailwind CSS v4 + design tokens in `src/index.css` | Glassmorphism tokens in one place, no CSS-in-JS runtime |
| Charts | TradingView **Lightweight Charts** 4.2.3 | Free, open source, canvas-rendered, small |
| Icons | Lucide | Open source, tree-shaken per icon |
| Font | Inter Variable (self-hosted via `@fontsource-variable/inter`) | No third-party font request, no layout shift |
| Hosting | Cloudflare Workers + static assets | Free tier, global edge, one deploy target |
| Data | Cloudflare KV (`LEARNYX_KV`) | Rate-limit counters + optional content overrides |

Zero paid services. Zero analytics/tracking. Zero third-party API keys.

---

## 4. Install and run locally

Requirements: **Node.js 20+** (developed on Node 22) and npm.

```bash
npm install
npm run dev          # http://localhost:5173
```

The Vite dev server binds `0.0.0.0` and proxies only `^/api/` to a local Worker
on port 8787. The regex matters: a plain `/api` prefix would also capture the
app's own `/api-docs` page.

### Running with the real API

Two terminals:

```bash
# terminal 1 — Worker on :8787 (uses local KV simulation, no cloud calls)
npm run dev:worker

# terminal 2 — app on :5173 with /api/* proxied to the Worker
npm run dev
```

Without the Worker running, every page still works: the SPA imports content
directly from the same modules the API serves. Only the live tester on
`/api-docs` will report a network error — and it says so explicitly.

### Useful scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run dev:worker` | `wrangler dev` (local Worker + KV simulation) |
| `npm run build` | Type-check → Vite build → copy assets into `worker/public` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Content integrity + route render + interaction tests |
| `npm run test:content` | Content/data/API contract assertions only |
| `npm run test:render` | Server-renders all 25 routes |
| `npm run test:interaction` | jsdom tests that click through calculators, quiz, paper trading, search |
| `npm run kv:create` | Create the KV namespace (prints the id) |
| `npm run deploy` | Build then `wrangler deploy` |

---

## 5. Build

```bash
npm run build
```

This runs three steps:

1. `tsc -b` — type-checks the app project and the Worker project (no emit; a
   stale `noEmit: false` on the worker project previously wrote `.js` files next
   to sources and shadowed the `.ts` modules).
2. `vite build` — outputs `dist/`.
3. `node scripts/copy-worker-assets.mjs` — mirrors `dist/` into
   `worker/public/`, verifies `index.html` / `favicon.svg` / `assets/` exist, and
   writes `worker/build-manifest.json`.

Expected ballpark output: app chunk ≈ 63 kB gzip, vendor ≈ 81 kB, charts
≈ 50 kB, lesson corpus ≈ separate lazy chunk. CSS ≈ 12 kB gzip.

---

## 6. Testing

```bash
npm test
```

Three suites, all runnable without a browser:

**`scripts/self-test.mjs`** — 114 assertions across 14 groups:
curriculum integrity (unique ids, every module/lesson resolvable, counts match,
`published` flag matches reality), lesson template completeness for all 70
bodies, block well-formedness, quiz answer keys in range, glossary cross-link
resolution (every `related` term exists), market guide integrity, practice bank
keys, candlestick shape validity, search index coverage, sample-data determinism
and indicator bounds (RSI ∈ [0,100], Bollinger ordering, ATR > 0), the backtest
engine (determinism, win+loss = trades, higher fees can never improve returns),
calculator maths with exact values, the 9 primary nav routes resolving, absence
of hardcoded secrets, bundle chunking, and the full Worker API contract
(status codes, validation, 401/503 admin behaviour, rate limiting, security
headers, SPA fallthrough).

**`scripts/render-test.mjs`** — server-renders all 25 routes with
`react-dom/server` inside a `MemoryRouter`, asserting each produces a real page
(>500 chars, has an `<h1>`, no `undefined`/`NaN`/`[object Object]` leakage).

**`scripts/interaction-test.mjs`** — 15 jsdom tests using Testing Library: types
into the calculators and asserts computed values (1:3 → 1:2 on target change,
250 units for 1% risk on a 4-point stop, P&L sign flip, 25% drawdown needing
+33.33% recovery), answers quiz questions and checks feedback, opens/closes a
simulated paper position and verifies persistence, runs a backtest and reads
metrics, and searches with Escape-to-close.

### Manual checks that still need a real browser

Canvas charts cannot render in jsdom, so these must be eyeballed on a deployed
build or `npm run dev`:

- Chart Explorer: candles, volume pane, aggregation switching, crosshair OHLC.
- Indicator Laboratory: overlays and oscillator sparklines at several periods.
- Lightweight-charts resize behaviour when the viewport changes.
- Visual pass at 1920 / 1440 / 1366 / 768 / 390 / 360 px (no horizontal scroll).
- Reduced-motion (`prefers-reduced-motion: reduce`) animation suppression.

---

## 7. Cloudflare configuration

Everything lives in `wrangler.toml`:

```toml
name = "learnyx-trading"
main = "worker/index.ts"
compatibility_date = "2026-11-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "./worker/public"
binding = "ASSETS"
not_found_handling = "single-page-application"

[[kv_namespaces]]
binding = "LEARNYX_KV"
id = "REPLACE_WITH_LEARNYX_KV_NAMESPACE_ID"

[vars]
ENVIRONMENT = "production"
BUILD_VERSION = "1.0.0"
```

`ADMIN_SECRET` is deliberately **not** in this file. A self-test asserts that it
never appears there.

---

## 8. Creating the KV namespace

Create a **new** namespace for this project. Do not reuse an id from any other
project.

```bash
npx wrangler login          # one-time, browser based
npm run kv:create
```

Wrangler prints something like:

```
[[kv_namespaces]]
binding = "LEARNYX_KV"
id = "0123abcd0123abcd0123abcd0123abcd"
```

Copy **only the id** into `wrangler.toml`, replacing
`REPLACE_WITH_LEARNYX_KV_NAMESPACE_ID`. The namespace id is an identifier, not a
secret, so it is fine to commit it.

For local development you do **not** need a real namespace — `wrangler dev`
simulates KV on disk. If you want a separate preview namespace:

```bash
npx wrangler kv namespace create LEARNYX_KV --preview
```

and add a `preview_id` to the same `[[kv_namespaces]]` block.

> If the namespace cannot be created without touching an existing resource,
> stop and resolve that first. Do not point `LEARNYX_KV` at an unrelated
> namespace.

---

## 9. Secrets (admin access)

The admin API is optional and disabled by default. It **fails closed**: with no
secret configured, every `/api/admin/*` route returns `503` and the admin surface
does not exist from the outside.

Set the secret interactively — never in a file, never in chat, never in git:

```bash
npx wrangler secret put ADMIN_SECRET
# paste a long random value (>= 32 characters) at the prompt
```

Generate one locally if you need to:

```bash
openssl rand -base64 48
```

Behaviour:

| `ADMIN_SECRET` state | `/api/admin/*` | `/api/health` reports |
| --- | --- | --- |
| unset | `503 SERVICE_UNAVAILABLE` | `"admin": "disabled"` |
| shorter than 16 chars | `503 SERVICE_UNAVAILABLE` | `"admin": "disabled"` |
| ≥ 16 chars, no/incorrect token | `401 UNAUTHORIZED` | `"admin": "configured"` |
| ≥ 16 chars, correct token | `200` | `"admin": "configured"` |

Tokens are compared with a constant-time length-or-diff check, and the secret is
never echoed in any response body or log line.

For local admin testing, `.dev.vars` (git-ignored):

```
ADMIN_SECRET=local-development-only-value-not-a-real-secret
```

Removing the secret (`npx wrangler secret delete ADMIN_SECRET`) instantly
disables admin again.

---

## 10. Deploying

```bash
npx wrangler login              # if not already logged in
npm run build
npx wrangler kv namespace create LEARNYX_KV   # first time only
# → paste the id into wrangler.toml
npx wrangler secret put ADMIN_SECRET          # optional
npm run deploy
```

`npm run deploy` re-runs the build, so `worker/public/` always matches `dist/`.

Verify after deploy:

```bash
curl -s https://<your-worker>.workers.dev/api/health
curl -s https://<your-worker>.workers.dev/api/courses | head -c 200
curl -s -o /dev/null -w "%{http_code}\n" https://<your-worker>.workers.dev/glossary
# expect 200, 200, and 200 (SPA fallback)
```

Roll back:

```bash
npx wrangler deployments list
npx wrangler rollback <deployment-id>
```

---

## 11. API reference

All public routes are `GET`, unauthenticated and return JSON. Content routes
send `cache-control: public, max-age=300`; `/api/health` sends `no-store`.
Every response carries `x-content-type-options`, `x-frame-options`,
`referrer-policy`, `permissions-policy` and a CSP.

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/health` | status, version, KV/admin state, content counts |
| GET | `/api/courses` | 5 level summaries |
| GET | `/api/courses/:slug` | modules + lessons for one course |
| GET | `/api/lessons` | published lesson metadata; `course`, `module`, `limit` (1–100) |
| GET | `/api/lessons/:course/:module/:slug` | full authored lesson |
| GET | `/api/glossary` | `q` (≥2 chars), `category`, `letter` (single A–Z) |
| GET | `/api/quizzes` | `category`, `difficulty` ∈ easy/medium/hard, `limit` |
| GET | `/api/markets` | market guide index |
| GET/POST | `/api/admin/stats`, `/api/admin/content` | Bearer token required |

Error shape (never contains a stack trace, env value or KV key):

```json
{ "error": { "code": "NOT_FOUND", "message": "The requested resource does not exist.", "status": 404 } }
```

Codes: `400 BAD_REQUEST`, `401 UNAUTHORIZED`, `404 NOT_FOUND`,
`405 METHOD_NOT_ALLOWED`, `429 RATE_LIMITED`, `500 INTERNAL`,
`503 SERVICE_UNAVAILABLE`.

Rate limiting is KV-backed at 120 requests/minute per IP bucket. If KV is
unbound or the limiter throws, requests are allowed rather than blocked — the
content is public and static, so degrading open is the safer failure mode.

---

## 12. Project structure

```
.
├── index.html                     # SPA shell, meta, theme colour
├── vite.config.ts                 # dev proxy (^/api/), manual chunks
├── wrangler.toml                  # Worker + assets + KV binding
├── tsconfig.json                  # solution file (app + worker)
├── tsconfig.app.json              # src/, noEmit, strict
├── tsconfig.worker.json           # worker/, noEmit, CF types
├── public/favicon.svg
├── src/
│   ├── main.tsx                   # StrictMode + BrowserRouter
│   ├── App.tsx                    # single <Routes>, lazy pages
│   ├── index.css                  # design tokens, glass utilities, prose
│   ├── components/
│   │   ├── Layout.tsx             # sidebar / mobile drawer / footer / ⌘K
│   │   ├── ui.tsx                 # design system + formatters
│   │   ├── SearchDialog.tsx       # modal search, focus trap
│   │   ├── PriceChart.tsx         # lightweight-charts wrapper
│   │   ├── DiagramBlock.tsx       # inline SVG teaching diagrams
│   │   ├── LessonContent.tsx      # lesson block renderer
│   │   ├── KnowledgeCheck.tsx     # per-lesson quiz
│   │   ├── PatternGlyph.tsx       # candlestick shape renderer
│   │   ├── HeroChart.tsx          # decorative aria-hidden hero
│   │   └── calc.tsx               # calculator form primitives
│   ├── lib/
│   │   ├── types.ts               # shared domain types
│   │   ├── storage.ts             # namespaced localStorage + fallback
│   │   ├── progress.tsx           # progress context
│   │   ├── search.ts              # search index + calculators/indicators
│   │   ├── calcMath.ts            # pure, unit-tested calculator formulas
│   │   └── strategy.ts            # rule engine + backtester
│   ├── data/
│   │   ├── curriculum.ts          # 5 levels / 23 modules / 70 lessons
│   │   ├── lessons/               # builder + level1…level5 bodies
│   │   ├── glossary.ts            # 288 terms
│   │   ├── markets.ts             # 6 market guides
│   │   ├── quizBank.ts            # 82 practice questions
│   │   ├── patterns.ts            # 14 candlestick patterns
│   │   └── marketSamples.ts       # synthetic OHLC + indicators
│   └── pages/                     # 25 routes (incl. lab/*)
├── worker/
│   ├── index.ts                   # router, security headers, admin gate
│   └── public/                    # generated by the build (git-ignored)
└── scripts/
    ├── copy-worker-assets.mjs
    ├── self-test.mjs
    ├── render-test.mjs
    ├── interaction-test.mjs
    ├── ts-resolve-hooks.mjs       # lets Node import the .ts sources
    └── validate-content.mjs
```

---

## 13. Content integrity rules

These are enforced by tests, not by convention:

1. A lesson is only marked published when a full body exists. The API refuses to
   serve an unpublished slot (404), and the UI shows an explicit "in progress"
   screen instead of placeholder text.
2. Every authored lesson must have objectives, prerequisites, ≥6 body blocks,
   ≥2 common mistakes, ≥3 key points, a summary, a quiz and further reading.
3. Every quiz answer key must be a valid index and every option list unique.
4. Every glossary `related` reference must resolve to a real term — a dead
   cross-reference is a broken link.
5. Every market guide's `relatedLessons` must resolve to a real curriculum id.
6. Candlestick shapes must satisfy `high ≥ body` and `low ≤ body`.
7. No lesson body may contain lorems, `TODO`, `TBD`, "coming soon" or
   "placeholder".
8. Sample series must be deterministic: the same seed produces byte-identical
   candles, so a screenshot can always be reproduced.

---

## 14. Accessibility and performance notes

Implemented:

- Skip link, semantic landmarks (`header`/`nav`/`main`/`footer`), single `<h1>`
  per page, ordered heading levels.
- ⌘K / Ctrl-K search with full keyboard control (↑ ↓ ↵ Esc) and a manual focus
  trap inside the modal.
- Visible focus rings on every interactive element; `aria-pressed` on toggles,
  `aria-current` on the active nav item, `aria-label` on icon-only buttons.
- Charts expose a text alternative via `role="img"` + `aria-label` describing the
  series, bar count and disclaimer.
- Feedback is never colour-only: correct/incorrect answers pair colour with an
  icon and a text verdict.
- `prefers-reduced-motion: reduce` disables the ambient and entrance animations.
- Self-hosted font (no third-party request), no tracking scripts, no cookies.
- Layout uses `min-w-0` + `overflow-x-auto` on tables so narrow viewports do not
  scroll horizontally.

Not yet verified (see §6): pixel-level layout at the six target widths, and
canvas chart rendering. Those require a browser.

---

## 15. Known limitations

Stated plainly rather than hidden:

- **28 curriculum slots are unauthored.** The curriculum is defined as 98 slots;
  70 have full bodies. The rest render an "in progress" screen and 404 on the
  API. They are visible in the structure, honestly labelled, never faked.
- **All market data is synthetic.** Four fictional instruments, seeded
  generation, 500 daily candles ending 2025-12-31. There is no live feed and
  there will not be one — a live feed would need a paid provider.
- **The backtester is an educational engine**, not a research platform. It uses
  one position at a time, next-bar-open fills, configurable fees/slippage, and a
  conservative "stop before target" assumption inside a single bar.
- **Paper trading is local state.** No broker, no execution, no margin model
  beyond a simplified cash hold. Clearing browser storage erases history.
- **Admin CMS is intentionally minimal.** It can read stats and write
  `content:*` keys to KV. There is no rich editor UI because exposing one safely
  is a larger surface than this build needs; the API is documented here only.
- **Browser-verified layout is pending.** jsdom cannot run the canvas charts, so
  §6 lists exactly what a human still needs to eyeball.
- **Deployment is not performed in this environment.** No Cloudflare
  credentials exist here. Every deploy step above is documented, not executed —
  nothing in this repo claims a live URL works.

---

## 16. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `/api-docs` returns a 502 or JSON error in dev | Vite proxied `/api-docs` to the Worker | Proxy key must be the regex `^/api/` (already configured) |
| `Missing export "lessonSummaries"` during build | Stale emitted `.js` files shadowing `.ts` sources | `tsc -b` must use `noEmit: true` in `tsconfig.worker.json`; delete stray `.js` under `src/`/`worker/` |
| `manualChunks is not a function` | Vite 8 (rolldown) rejects the object form | Use the function form (already configured) |
| `Cannot find module '.../lessons/builder'` when running a script with Node | Node ESM needs explicit extensions | Run via `npm test` (uses `scripts/ts-resolve-hooks.mjs`) |
| Worker returns `500` for all pages | `worker/public/` not built | `npm run build` before `wrangler deploy` |
| `/api/admin/*` returns `503` | `ADMIN_SECRET` unset or <16 chars | `npx wrangler secret put ADMIN_SECRET` |
| `/api/admin/*` returns `401` with the right secret | Header format | Send `Authorization: Bearer <secret>` exactly |
| Health shows `"kv": "unbound"` | `[[kv_namespaces]]` missing or id still the placeholder | Create the namespace and paste the id |
| Progress does not persist | Browser blocks `localStorage` (private mode) | The UI shows a "Storage unavailable" notice; progress lasts for the session only |
| Charts blank | Canvas unsupported / chart container zero-width | Check the browser; `PriceChart` sizes from a `ResizeObserver` |

---

## 17. Disclaimer

Learnyx Trading is an educational project. All content, examples, charts,
calculators, simulations and backtests are for learning only.

- Nothing here is investment advice, a recommendation, or an offer to buy or
  sell any security, derivative, currency or digital asset.
- No real-money trading, brokerage connection, deposit or order execution exists
  in this product.
- Market data shown anywhere in the app is synthetic sample data.
- Past simulated performance is not indicative of future results.
- Leverage, derivatives and short selling carry a risk of loss larger than the
  amount committed. Retail forex and certain derivatives are restricted or
  prohibited in some jurisdictions, including under RBI/FEMA rules in India.
- Consult a SEBI-registered investment adviser before making financial
  decisions.
