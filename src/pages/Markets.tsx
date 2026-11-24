import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { Callout, Card, CardBody, PageHeader, Tag } from '../components/ui';
import { markets, MARKET_DISCLAIMER } from '../data/markets';

export default function Markets() {
  return (
    <div>
      <PageHeader
        eyebrow="Markets"
        title="Market-specific learning paths"
        description="Har market ki apni structure, participants, terminology aur risk profile hoti hai. Neeche se koi bhi market chunein aur uske specific concepts padhein."
      />

      <Callout tone="warn" title="Risks honesty ke saath">
        <p>
          Forex, commodities, derivatives aur crypto leveraged aur highly volatile ho sakte hain. Kai
          jurisdictions me legal restrictions hain — India me retail forex trading RBI/FEMA rules ke
          under restricted hai. Learnyx sirf education deta hai, koi instrument recommend nahi karta.
        </p>
      </Callout>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {markets.map((m) => (
          <Card key={m.id} interactive className="flex flex-col">
            <CardBody className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold text-text-primary">{m.name}</h2>
                <Tag>{m.sections.length} topics</Tag>
              </div>
              <p className="mt-1 text-[0.75rem] font-medium text-accent-400">{m.tagline}</p>
              <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-text-secondary">
                {m.intro.slice(0, 240)}…
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.sections.slice(0, 4).map((s) => (
                  <span
                    key={s.id}
                    className="rounded border border-white/10 bg-white/4 px-1.5 py-0.5 text-[0.66rem] text-text-muted"
                  >
                    {s.title}
                  </span>
                ))}
              </div>
              <Link
                to={`/markets/${m.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
              >
                Open {m.name.split(' ')[0]} guide
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <ShieldAlert aria-hidden="true" className="h-4 w-4 text-warn-500" />
          A note on market data
        </p>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">{MARKET_DISCLAIMER}</p>
      </div>
    </div>
  );
}
