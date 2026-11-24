/**
 * Node module resolution hook for the self-test.
 *
 * The app is written for a bundler: relative imports have no file extension and
 * `.ts` files import `.ts` files directly. Node's ESM loader requires explicit
 * paths, so this hook resolves a bare relative specifier to the first matching
 * `.ts` / `.tsx` / `.mjs` file on disk.
 */
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CANDIDATE_SUFFIXES = ['.ts', '.tsx', '.mjs', '.js', '/index.ts', '/index.tsx'];

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && /\.(ts|tsx)$/.test(context.parentURL ?? '')) {
    const parentPath = fileURLToPath(context.parentURL);
    const base = new URL(specifier, context.parentURL);
    const basePath = fileURLToPath(base);

    if (!existsSync(basePath) || (existsSync(basePath) && statSync(basePath).isDirectory())) {
      for (const suffix of CANDIDATE_SUFFIXES) {
        const candidate = basePath + suffix;
        if (existsSync(candidate) && statSync(candidate).isFile()) {
          return nextResolve(new URL(`file://${candidate}`).href, context);
        }
      }
    }
  }
  return nextResolve(specifier, context);
}
