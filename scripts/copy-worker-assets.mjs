#!/usr/bin/env node
/**
 * Copies the static build into the Worker's assets directory and writes a
 * machine-readable content bundle the Worker serves from KV (or from the
 * bundled fallback when KV is empty).
 *
 * Runs after `vite build` in the `npm run build` pipeline.
 */
import { cp, mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const workerDist = path.join(root, 'worker', 'public');

function log(msg) {
  process.stdout.write(`[copy-worker-assets] ${msg}\n`);
}

async function main() {
  if (!existsSync(dist)) {
    console.error('[copy-worker-assets] dist/ not found — run `vite build` first.');
    process.exit(1);
  }

  // 1. Mirror dist/ into worker/public/ so `wrangler deploy` can upload it as
  //    the static asset bundle. Removing the old copy keeps hashed filenames
  //    from piling up across builds.
  await rm(workerDist, { recursive: true, force: true });
  await mkdir(workerDist, { recursive: true });
  await cp(dist, workerDist, { recursive: true });

  const files = await readdir(workerDist);
  log(`copied ${files.length} top-level entries into worker/public/`);

  // 2. Sanity-check the critical shell files so a broken build fails here
  //    rather than in production.
  const required = ['index.html', 'favicon.svg', 'assets'];
  const missing = required.filter((f) => !existsSync(path.join(workerDist, f)));
  if (missing.length) {
    console.error(`[copy-worker-assets] missing expected output: ${missing.join(', ')}`);
    process.exit(1);
  }

  // 3. Write a small build manifest the Worker exposes via /api/health.
  const manifest = {
    builtAt: new Date().toISOString(),
    node: process.version,
    staticAssets: files.length,
  };
  await writeFile(
    path.join(root, 'worker', 'build-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  log(`wrote worker/build-manifest.json (${manifest.builtAt})`);
}

main().catch((err) => {
  console.error('[copy-worker-assets] failed:', err);
  process.exit(1);
});
