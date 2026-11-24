import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardBody, PageHeader, Tag } from '../components/ui';
import { glossary, glossaryBySlug } from '../data/glossary';
import { getSearchIndex } from '../lib/search';
import NotFound from './NotFound';

export default function GlossaryTerm() {
  const { slug } = useParams();
  const entry = slug ? glossaryBySlug.get(slug) : undefined;
  if (!entry) return <NotFound />;

  const related = entry.related
    .map((t) => glossary.find((g) => g.term.toLowerCase() === t.toLowerCase()))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const relatedLessons = getSearchIndex()
    .filter(
      (d) =>
        d.kind === 'Lessons' &&
        (d.keywords.toLowerCase().includes(entry.term.toLowerCase()) ||
          d.title.toLowerCase().includes(entry.term.toLowerCase())),
    )
    .slice(0, 4);

  const index = glossary.findIndex((g) => g.slug === entry.slug);
  const prev = index > 0 ? glossary[index - 1] : null;
  const next = index < glossary.length - 1 ? glossary[index + 1] : null;

  return (
    <div>
      <Link
        to="/glossary"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-accent-400"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Glossary
      </Link>

      <PageHeader eyebrow={entry.category} title={entry.term} description={entry.short} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <Card>
          <CardBody>
            <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
              Detailed explanation
            </p>
            <p className="lesson-prose mt-2">{entry.detail}</p>

            {entry.example && (
              <div className="mt-4 rounded-xl border border-up-500/22 bg-up-500/[0.06] px-4 py-3">
                <p className="text-[0.68rem] font-semibold tracking-wide text-up-400 uppercase">
                  Example
                </p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-text-secondary">
                  {entry.example}
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5">
              <Tag>{entry.category}</Tag>
              <Tag>Letter {entry.letter}</Tag>
            </div>
          </CardBody>
        </Card>

        <aside className="space-y-4">
          {related.length > 0 && (
            <Card>
              <CardBody className="p-4">
                <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                  Related terms
                </p>
                <ul className="mt-2 space-y-1">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/glossary/${r.slug}`}
                        className="block rounded px-1.5 py-1 text-[0.75rem] text-text-muted transition-colors hover:bg-white/6 hover:text-accent-400"
                      >
                        {r.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          {relatedLessons.length > 0 && (
            <Card>
              <CardBody className="p-4">
                <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                  Lessons that cover this
                </p>
                <ul className="mt-2 space-y-1">
                  {relatedLessons.map((l) => (
                    <li key={l.id}>
                      <Link
                        to={l.to}
                        className="block rounded px-1.5 py-1 text-[0.75rem] leading-snug text-text-muted transition-colors hover:bg-white/6 hover:text-accent-400"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </aside>
      </div>

      <nav aria-label="Glossary navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev && (
          <Link to={`/glossary/${prev.slug}`} className="card card-hover group flex flex-col gap-1 p-4">
            <span className="flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-wide text-text-muted uppercase">
              <ArrowLeft aria-hidden="true" className="h-3 w-3" />
              Previous term
            </span>
            <span className="text-[0.85rem] font-medium text-text-primary group-hover:text-accent-300">
              {prev.term}
            </span>
          </Link>
        )}
        {next && (
          <Link
            to={`/glossary/${next.slug}`}
            className="card card-hover group flex flex-col items-end gap-1 p-4 text-right sm:col-start-2"
          >
            <span className="flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-wide text-text-muted uppercase">
              Next term
              <ArrowRight aria-hidden="true" className="h-3 w-3" />
            </span>
            <span className="text-[0.85rem] font-medium text-text-primary group-hover:text-accent-300">
              {next.term}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
