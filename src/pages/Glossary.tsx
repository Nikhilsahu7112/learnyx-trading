import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Card, CardBody, PageHeader, Pill, Tag, cx } from '../components/ui';
import { glossary, glossaryCategories, glossaryLetters, type GlossaryCategory } from '../data/glossary';

export default function Glossary() {
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState<string | 'ALL'>('ALL');
  const [category, setCategory] = useState<GlossaryCategory | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((g) => {
      if (letter !== 'ALL' && g.letter !== letter) return false;
      if (category !== 'ALL' && g.category !== category) return false;
      if (!q) return true;
      return (
        g.term.toLowerCase().includes(q) ||
        g.short.toLowerCase().includes(q) ||
        g.detail.toLowerCase().includes(q)
      );
    });
  }, [query, letter, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const g of filtered) {
      const list = map.get(g.letter) ?? [];
      list.push(g);
      map.set(g.letter, list);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const activeFilters = (query ? 1 : 0) + (letter !== 'ALL' ? 1 : 0) + (category !== 'ALL' ? 1 : 0);

  return (
    <div>
      <PageHeader
        eyebrow="Glossary"
        title="A–Z financial glossary"
        description={`${glossary.length} carefully written terms — simple Hinglish meaning ke saath, detailed explanation aur related terms. Koi filler entry nahi.`}
      />

      <Card className="mb-6">
        <CardBody className="space-y-4 p-4 sm:p-5">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, meanings or explanations…"
              aria-label="Search glossary"
              className="w-full rounded-xl border border-white/12 bg-white/5 py-2.5 pr-10 pl-9 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-500/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-text-muted hover:text-text-primary"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-wide text-text-muted uppercase">
              Alphabet
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setLetter('ALL')}
                className={cx(
                  'h-7 rounded-md border px-2 text-[0.7rem] font-semibold transition-colors',
                  letter === 'ALL'
                    ? 'border-accent-500/50 bg-accent-500/18 text-text-primary'
                    : 'border-white/10 bg-white/4 text-text-muted hover:bg-white/8',
                )}
              >
                ALL
              </button>
              {glossaryLetters.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLetter(letter === l ? 'ALL' : l)}
                  aria-pressed={letter === l}
                  className={cx(
                    'h-7 w-7 rounded-md border text-[0.7rem] font-semibold transition-colors',
                    letter === l
                      ? 'border-accent-500/50 bg-accent-500/18 text-text-primary'
                      : 'border-white/10 bg-white/4 text-text-muted hover:bg-white/8 hover:text-text-secondary',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[0.65rem] font-semibold tracking-wide text-text-muted uppercase">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Pill active={category === 'ALL'} onClick={() => setCategory('ALL')}>
                All
              </Pill>
              {glossaryCategories.map((c) => (
                <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Pill>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/8 pt-3">
            <p className="text-[0.72rem] text-text-muted">
              {filtered.length} term{filtered.length === 1 ? '' : 's'} shown
              {activeFilters > 0 && ` · ${activeFilters} filter${activeFilters === 1 ? '' : 's'} active`}
            </p>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setLetter('ALL');
                  setCategory('ALL');
                }}
                className="text-[0.72rem] font-semibold text-accent-400 hover:text-accent-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        </CardBody>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-sm font-semibold text-text-primary">Koi term nahi mila</p>
          <p className="mt-2 text-xs text-text-muted">
            Search term chhota karein ya filters clear karein.
          </p>
        </Card>
      ) : (
        <div className="space-y-7">
          {grouped.map(([letterKey, entries]) => (
            <section key={letterKey} aria-labelledby={`letter-${letterKey}`}>
              <h2
                id={`letter-${letterKey}`}
                className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/12 bg-white/6 text-[0.72rem] font-bold text-accent-400">
                  {letterKey}
                </span>
                <span className="text-[0.68rem] font-normal text-text-muted">
                  {entries.length} term{entries.length === 1 ? '' : 's'}
                </span>
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {entries.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/glossary/${g.slug}`}
                    className="card card-hover group p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[0.86rem] font-semibold text-text-primary group-hover:text-accent-300">
                        {g.term}
                      </h3>
                      <Tag className="shrink-0 text-[0.6rem]">{g.category}</Tag>
                    </div>
                    <p className="mt-1 text-[0.75rem] font-medium text-accent-400">{g.short}</p>
                    <p className="mt-1.5 line-clamp-2 text-[0.75rem] leading-relaxed text-text-muted">
                      {g.detail}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
