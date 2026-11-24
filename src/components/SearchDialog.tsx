import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { searchDocs, searchKinds, type SearchKind, type RankedResult } from '../lib/search';
import { cx } from './ui';

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<SearchKind | 'All'>('All');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);

  const all = useMemo(() => searchDocs(query, 60), [query]);
  const results: RankedResult[] = useMemo(
    () => (kind === 'All' ? all : all.filter((r) => r.kind === kind)).slice(0, 22),
    [all, kind],
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setKind('All');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query, kind]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === 'Enter') {
        const target = results[active];
        if (target) {
          e.preventDefault();
          navigate(target.to);
          onClose();
        }
      } else if (e.key === 'Tab') {
        // keep focus trapped inside the dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, input, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, active, navigate, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center px-3 pt-[8vh] sm:px-6">
      <div
        className="animate-fade-in absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search Learnyx Trading"
        className="glass-strong animate-fade-rise relative w-full max-w-2xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, glossary, markets, calculators…"
            aria-label="Search input"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-md p-1.5 text-text-muted hover:bg-white/8 hover:text-text-primary"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-white/8 px-4 py-2.5">
          {(['All', ...searchKinds] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={cx(
                'rounded-md px-2 py-1 text-[0.7rem] font-medium transition-colors',
                kind === k
                  ? 'bg-accent-500/22 text-text-primary'
                  : 'text-text-muted hover:bg-white/6 hover:text-text-secondary',
              )}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-text-secondary">Start typing to search everything.</p>
              <p className="mt-2 text-xs text-text-muted">
                Try “support”, “RSI”, “risk of ruin”, “NIFTY” or “drawdown”.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm font-medium text-text-primary">No results for “{query}”</p>
              <p className="mt-2 text-xs text-text-muted">
                Try a shorter term, or browse the Glossary and Courses pages directly.
              </p>
            </div>
          ) : (
            <ul role="listbox" aria-label="Search results">
              {results.map((r, i) => (
                <li key={r.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      navigate(r.to);
                      onClose();
                    }}
                    className={cx(
                      'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      i === active ? 'bg-white/9' : 'hover:bg-white/6',
                    )}
                  >
                    <span className="mt-0.5 inline-flex shrink-0 rounded border border-white/12 bg-white/6 px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wide text-text-muted uppercase">
                      {r.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text-primary">
                        {r.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-text-muted">
                        {r.subtitle}
                      </span>
                    </span>
                    {i === active && (
                      <CornerDownLeft aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-text-muted" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/8 px-4 py-2 text-[0.66rem] text-text-muted">
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span className="hidden sm:inline">{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}
