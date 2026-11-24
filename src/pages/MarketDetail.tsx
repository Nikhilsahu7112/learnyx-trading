import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';
import {
  Callout,
  Card,
  CardBody,
  PageHeader,
  TableWrap,
} from '../components/ui';
import { marketBySlug } from '../data/markets';
import { lessonMetaById, courseBySlug } from '../data/curriculum';
import NotFound from './NotFound';

export default function MarketDetail() {
  const { slug } = useParams();
  const market = slug ? marketBySlug.get(slug) : undefined;
  if (!market) return <NotFound />;

  return (
    <div>
      <Link
        to="/markets"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-accent-400"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All markets
      </Link>

      <PageHeader eyebrow="Market guide" title={market.name} description={market.intro} />

      <nav aria-label="On this page" className="mb-8 flex flex-wrap gap-1.5">
        {market.sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 text-[0.72rem] text-text-secondary transition-colors hover:border-white/20 hover:bg-white/8 hover:text-text-primary"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="space-y-6">
        {market.sections.map((s) => (
          <Card key={s.id} id={s.id} className="scroll-mt-24">
            <CardBody>
              <h2 className="text-lg font-semibold tracking-tight text-text-primary">{s.title}</h2>
              <p className="mt-2.5 text-[0.86rem] leading-relaxed text-text-secondary">{s.body}</p>

              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-[0.82rem] leading-relaxed text-text-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-accent-500"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {s.table && (
                <div className="mt-4">
                  <TableWrap headers={s.table.headers} rows={s.table.rows} />
                </div>
              )}

              {s.terms && s.terms.length > 0 && (
                <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.terms.map((t) => (
                    <div key={t.term} className="glass-subtle rounded-xl px-3.5 py-2.5">
                      <dt className="text-[0.8rem] font-semibold text-text-primary">{t.term}</dt>
                      <dd className="mt-1 text-[0.76rem] leading-relaxed text-text-secondary">
                        {t.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </CardBody>
          </Card>
        ))}

        <Card>
          <CardBody>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-text-primary">
              <ShieldAlert aria-hidden="true" className="h-4 w-4 text-warn-500" />
              Risks to understand
            </h2>
            <ul className="mt-3 space-y-2">
              {market.risks.map((r) => (
                <li
                  key={r}
                  className="flex gap-2 rounded-lg border border-warn-500/20 bg-warn-500/[0.06] px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-text-secondary"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warn-500" />
                  {r}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-base font-semibold text-text-primary">Continue learning</h2>
            <ul className="mt-3 space-y-2">
              {market.relatedLessons.map((id) => {
                const meta = lessonMetaById.get(id);
                if (!meta) return null;
                const course = courseBySlug.get(meta.courseId);
                return (
                  <li key={id}>
                    <Link
                      to={`/learn/${meta.courseId}/${id.split('/')[1]}/${meta.slug}`}
                      className="group flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-3.5 py-2.5 transition-colors hover:border-white/18 hover:bg-white/6"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.82rem] font-medium text-text-primary group-hover:text-accent-300">
                          {meta.title}
                        </span>
                        <span className="mt-0.5 block text-[0.68rem] text-text-muted">
                          Level {course?.level} · {meta.estimatedMinutes} min
                        </span>
                      </span>
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>

        <Callout tone="info" title="Educational use only">
          <p>
            Ye page market structure aur terminology padhata hai. Koi broker, exchange, contract ya
            instrument recommend nahi karta. Kisi bhi market me participate karne se pehle applicable
            laws, taxation aur apni risk tolerance samajhna aapki zimmedari hai.
          </p>
        </Callout>
      </div>
    </div>
  );
}
