#!/usr/bin/env node
/**
 * Render smoke test.
 *
 * A browser is not available in this environment, so instead of pretending the
 * UI was clicked through, this script executes every page component for real:
 * it bundles the app with esbuild, then renders each route to HTML with
 * react-dom/server inside a MemoryRouter.
 *
 * What this proves:
 *   - every page module imports without throwing (no bad exports, no cycles)
 *   - every page renders against the real curriculum/glossary data
 *   - common runtime faults (undefined.map, missing context, bad hooks) surface
 *
 * What this does NOT prove: layout, interaction, or canvas charts. Those need a
 * browser and are listed as manual checks in the README.
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmpDir = path.join(root, '.render-tmp');
const entryFile = path.join(tmpDir, 'render-entry.tsx');
const outFile = path.join(tmpDir, 'render-bundle.mjs');

const routes = [
  ['/', 'Home'],
  ['/learn', 'Learn'],
  ['/courses', 'Courses'],
  ['/courses/market-foundations', 'CourseDetail'],
  ['/courses/technical-analysis', 'CourseDetail (level 2)'],
  ['/markets', 'Markets'],
  ['/markets/indian-market', 'MarketDetail'],
  ['/markets/derivatives-market', 'MarketDetail (derivatives)'],
  ['/lab', 'TradingLab'],
  ['/lab/charts', 'ChartExplorer'],
  ['/lab/patterns', 'PatternTrainer'],
  ['/lab/indicators', 'IndicatorLab'],
  ['/lab/strategy', 'StrategyBuilder'],
  ['/lab/backtest', 'Backtester'],
  ['/lab/paper', 'PaperTrading'],
  ['/calculators', 'Calculators'],
  ['/glossary', 'Glossary'],
  ['/glossary/atr-average-true-range', 'GlossaryTerm'],
  ['/glossary/candlestick', 'GlossaryTerm (candlestick)'],
  ['/practice', 'Practice'],
  ['/progress', 'ProgressPage'],
  ['/about', 'About'],
  ['/api-docs', 'ApiDocs'],
  ['/learn/technical-analysis/chart-fundamentals/what-is-a-price-chart', 'LessonPage'],
  ['/this-page-does-not-exist', 'NotFound'],
];

const entrySource = `
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from '../src/lib/progress';
import { Layout } from '../src/components/Layout';

import Home from '../src/pages/Home';
import Learn from '../src/pages/Learn';
import Courses from '../src/pages/Courses';
import CourseDetail from '../src/pages/CourseDetail';
import LessonPage from '../src/pages/LessonPage';
import Markets from '../src/pages/Markets';
import MarketDetail from '../src/pages/MarketDetail';
import TradingLab from '../src/pages/TradingLab';
import ChartExplorer from '../src/pages/lab/ChartExplorer';
import PatternTrainer from '../src/pages/lab/PatternTrainer';
import IndicatorLab from '../src/pages/lab/IndicatorLab';
import StrategyBuilder from '../src/pages/lab/StrategyBuilder';
import Backtester from '../src/pages/lab/Backtester';
import PaperTrading from '../src/pages/lab/PaperTrading';
import Calculators from '../src/pages/Calculators';
import Glossary from '../src/pages/Glossary';
import GlossaryTerm from '../src/pages/GlossaryTerm';
import Practice from '../src/pages/Practice';
import ProgressPage from '../src/pages/ProgressPage';
import About from '../src/pages/About';
import ApiDocs from '../src/pages/ApiDocs';
import NotFound from '../src/pages/NotFound';

export function renderRoute(pathname) {
  return renderToString(
    React.createElement(
      ProgressProvider,
      null,
      React.createElement(
        MemoryRouter,
        { initialEntries: [pathname] },
        React.createElement(
          Routes,
          null,
          React.createElement(
            Route,
            { element: React.createElement(Layout) },
            React.createElement(Route, { index: true, element: React.createElement(Home) }),
            React.createElement(Route, { path: '/learn', element: React.createElement(Learn) }),
            React.createElement(Route, { path: '/learn/:course/:module/:lesson', element: React.createElement(LessonPage) }),
            React.createElement(Route, { path: '/courses', element: React.createElement(Courses) }),
            React.createElement(Route, { path: '/courses/:slug', element: React.createElement(CourseDetail) }),
            React.createElement(Route, { path: '/markets', element: React.createElement(Markets) }),
            React.createElement(Route, { path: '/markets/:slug', element: React.createElement(MarketDetail) }),
            React.createElement(Route, { path: '/lab', element: React.createElement(TradingLab) }),
            React.createElement(Route, { path: '/lab/charts', element: React.createElement(ChartExplorer) }),
            React.createElement(Route, { path: '/lab/patterns', element: React.createElement(PatternTrainer) }),
            React.createElement(Route, { path: '/lab/indicators', element: React.createElement(IndicatorLab) }),
            React.createElement(Route, { path: '/lab/strategy', element: React.createElement(StrategyBuilder) }),
            React.createElement(Route, { path: '/lab/backtest', element: React.createElement(Backtester) }),
            React.createElement(Route, { path: '/lab/paper', element: React.createElement(PaperTrading) }),
            React.createElement(Route, { path: '/calculators', element: React.createElement(Calculators) }),
            React.createElement(Route, { path: '/glossary', element: React.createElement(Glossary) }),
            React.createElement(Route, { path: '/glossary/:slug', element: React.createElement(GlossaryTerm) }),
            React.createElement(Route, { path: '/practice', element: React.createElement(Practice) }),
            React.createElement(Route, { path: '/progress', element: React.createElement(ProgressPage) }),
            React.createElement(Route, { path: '/about', element: React.createElement(About) }),
            React.createElement(Route, { path: '/api-docs', element: React.createElement(ApiDocs) }),
            React.createElement(Route, { path: '*', element: React.createElement(NotFound) }),
          ),
        ),
      ),
    ),
  );
}
`;

/* A minimal browser-ish environment: components read localStorage defensively
 * and lightweight-charts touches window at import time. */
function installDomStubs() {
  const noop = () => {};
  const store = new Map();
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => void store.set(k, String(v)),
    removeItem: (k) => void store.delete(k),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
  globalThis.window = {
    localStorage: globalThis.localStorage,
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
    addEventListener: noop,
    removeEventListener: noop,
    devicePixelRatio: 1,
    innerWidth: 1440,
    innerHeight: 900,
    requestAnimationFrame: (cb) => setTimeout(cb, 0),
    cancelAnimationFrame: noop,
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
  };
  globalThis.document = {
    addEventListener: noop,
    removeEventListener: noop,
    createElement: () => ({
      style: {},
      setAttribute: noop,
      appendChild: noop,
      getContext: () => null,
      addEventListener: noop,
      removeEventListener: noop,
    }),
    documentElement: { style: { setProperty: noop } },
    body: { appendChild: noop, style: {} },
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  globalThis.matchMedia = globalThis.window.matchMedia;
  globalThis.requestAnimationFrame = globalThis.window.requestAnimationFrame;
  globalThis.cancelAnimationFrame = noop;
  // Node 22 exposes a read-only `navigator`; leave it alone.
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

async function main() {
  await mkdir(tmpDir, { recursive: true });
  await writeFile(entryFile, entrySource, 'utf8');

  await build({
    entryPoints: [entryFile],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    loader: { '.css': 'empty', '.svg': 'empty' },
    // react/react-router stay external and are imported by Node itself; everything
    // else (lucide, lightweight-charts) is bundled so CJS/ESM interop is handled
    // by esbuild rather than by Node's loader.
    external: ['react', 'react-dom', 'react-dom/server', 'react-router-dom', 'react/jsx-runtime'],
    mainFields: ['module', 'main'],
    logLevel: 'error',
    define: { 'process.env.NODE_ENV': '"production"' },
  });

  installDomStubs();
  const { renderRoute } = await import(`${outFile}?t=${Date.now()}`);

  let failures = 0;
  const results = [];

  for (const [pathname, label] of routes) {
    try {
      const html = renderRoute(pathname);
      const problems = [];

      if (!html || html.length < 500) problems.push(`suspiciously small output (${html?.length ?? 0} chars)`);
      // A page that only rendered the shell means the route did not match.
      if (!html.includes('Learnyx')) problems.push('no brand in output');
      // Crash placeholders.
      for (const marker of ['undefined', 'NaN%', '[object Object]', 'Error:']) {
        if (html.includes(marker)) problems.push(`contains "${marker}"`);
      }
      // Heading presence: every screen must expose an <h1>.
      if (!/<h1[\s>]/.test(html)) problems.push('no <h1>');

      if (problems.length) {
        failures += 1;
        results.push({ pathname, label, ok: false, problems });
      } else {
        results.push({ pathname, label, ok: true, size: html.length });
      }
    } catch (err) {
      failures += 1;
      results.push({
        pathname,
        label,
        ok: false,
        problems: [String(err?.stack ?? err).split('\n').slice(0, 4).join('\n            ')],
      });
    }
  }

  process.stdout.write('\nRoute render checks\n');
  for (const r of results) {
    if (r.ok) {
      process.stdout.write(`  ok   ${r.pathname} (${r.label}) ${r.size} chars\n`);
    } else {
      process.stdout.write(`  FAIL ${r.pathname} (${r.label})\n`);
      for (const p of r.problems) process.stdout.write(`         ${p}\n`);
    }
  }

  await rm(entryFile, { force: true });
  await rm(outFile, { force: true });

  process.stdout.write(`\n${routes.length - failures}/${routes.length} routes rendered cleanly.\n`);
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error('render test crashed:', err);
  process.exit(1);
});
