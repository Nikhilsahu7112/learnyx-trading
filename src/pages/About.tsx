import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  Database,
  Eye,
  Lock,
  Server,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import {
  Callout,
  Card,
  CardBody,
  PageHeader,
  Section,
  TableWrap,
} from '../components/ui';
import { curriculumStats } from '../data/curriculum';
import { glossary } from '../data/glossary';
import { practiceBank } from '../data/quizBank';
import { markets } from '../data/markets';

const principles = [
  {
    icon: Eye,
    title: 'Honesty over polish',
    body:
      'Jo content publish nahi hua wo "in progress" label ke saath dikhta hai. Koi fake testimonial, student count ya performance record nahi. Har chart sample data hai aur har number hypothetical.',
  },
  {
    icon: Lock,
    title: 'No login, ever',
    body:
      'Poora educational content bina account ke accessible hai. Progress aapke browser me rehta hai. Admin tools separate hain aur public site par kabhi expose nahi hote.',
  },
  {
    icon: BookOpen,
    title: 'Education, not advice',
    body:
      'Hum koi instrument, broker ya strategy recommend nahi karte. Real-money trading, brokerage connections aur deposits deliberately out of scope hain.',
  },
  {
    icon: Wrench,
    title: 'Real tools, clearly labelled',
    body:
      'Trading Lab ke tools genuine math aur sample data par kaam karte hain. Har screen par clearly likha hai ki data synthetic hai aur orders simulated hain.',
  },
];

const stack = [
  ['Frontend', 'React 19 + TypeScript + Vite 8'],
  ['Styling', 'Tailwind CSS v4 (design tokens), Inter variable font'],
  ['Charts', 'TradingView Lightweight Charts (open source, free)'],
  ['Icons', 'Lucide (open source)'],
  ['Hosting', 'Cloudflare Workers + static assets'],
  ['Content API', 'Cloudflare Workers + KV namespace (read-only public routes)'],
  ['Storage', 'Browser localStorage only — no accounts, no cookies'],
];

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Learnyx Trading ke baare me"
        description="Ek free, login-free trading education platform jo Hinglish me market structure, technical analysis, risk management aur derivatives ko honestly sikhata hai — bina hype aur bina promises ke."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Levels', value: curriculumStats.levels },
          { label: 'Lessons authored', value: curriculumStats.published },
          { label: 'Glossary terms', value: glossary.length },
          { label: 'Practice questions', value: practiceBank.length },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
              {s.label}
            </p>
            <p className="tnum mt-1.5 text-2xl font-semibold text-text-primary">{s.value}</p>
          </Card>
        ))}
      </div>

      <Section title="What Learnyx is" className="mt-10">
        <Card>
          <CardBody className="space-y-3 text-[0.88rem] leading-relaxed text-text-secondary">
            <p>
              Learnyx Trading ek structured curriculum hai jo market foundations se shuru hota hai aur
              advanced derivatives concepts tak jaata hai. Har lesson ka ek hi format hai: learning
              objectives, prerequisites, Hinglish explanation, terminology, formulas, worked examples,
              diagrams, practical exercise, common mistakes, key points, summary, knowledge-check quiz
              aur further reading.
            </p>
            <p>
              Language deliberately Hinglish hai — simple Hindi grammar with English financial
              terminology, kyunki real markets ki vocabulary English me hai. Isse concepts translate
              karne ki mental load kam hoti hai.
            </p>
            <p>
              {markets.length} market guides (Indian equities, US markets, forex, commodities, crypto
              aur derivatives/international) market-specific structure, participants, terminology aur
              risks cover karte hain — jurisdiction warnings ke saath.
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section title="Core principles" className="mt-10">
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <Card key={p.title}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6">
                    <p.icon aria-hidden="true" className="h-4 w-4 text-accent-400" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{p.title}</h3>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-text-secondary">{p.body}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="boundaries" title="What Learnyx is not" className="mt-10 scroll-mt-24">
        <Callout tone="warn" title="Clear boundaries">
          <ul className="mt-1 space-y-1.5">
            <li>Not a broker, advisor, portfolio manager or signal service.</li>
            <li>No real-money trading, no deposits, no brokerage API connections.</li>
            <li>No guaranteed returns, no "₹X per day" claims, no course upsells.</li>
            <li>No personalised recommendations — examples purely educational hain.</li>
            <li>No live market data feed; charts synthetic sample data use karte hain.</li>
          </ul>
        </Callout>
      </Section>

      <Section title="Technology" className="mt-10">
        <Card>
          <CardBody>
            <TableWrap headers={['Layer', 'Choice']} rows={stack} />
            <p className="mt-3 text-[0.75rem] leading-relaxed text-text-muted">
              Saari dependencies open-source aur free tier hain. Koi paid API, analytics service ya
              third-party tracker use nahi hota.
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section title="How the content is organised" className="mt-10">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: 'Curriculum',
              body: `${curriculumStats.levels} levels, ${curriculumStats.modules} modules, ${curriculumStats.lessons} lesson slots — jisme se ${curriculumStats.published} authored hain.`,
              to: '/learn',
            },
            {
              icon: Database,
              title: 'Reference',
              body: `${glossary.length} glossary terms, 6 calculators, 7 indicator explainers, ${markets.length} market guides.`,
              to: '/glossary',
            },
            {
              icon: Server,
              title: 'Practice',
              body: `${practiceBank.length} practice questions aur per-lesson knowledge checks, local score tracking ke saath.`,
              to: '/practice',
            },
          ].map((c) => (
            <Card key={c.title} interactive>
              <CardBody>
                <c.icon aria-hidden="true" className="h-4 w-4 text-accent-400" />
                <h3 className="mt-2.5 text-sm font-semibold text-text-primary">{c.title}</h3>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-text-secondary">{c.body}</p>
                <Link
                  to={c.to}
                  className="mt-2.5 inline-block text-[0.72rem] font-semibold text-accent-400 hover:text-accent-300"
                >
                  Open →
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="For developers" className="mt-10">
        <Card className="p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Code2 aria-hidden="true" className="h-4 w-4 text-violet-400" />
            Public read-only API
          </p>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
            Site ka content ek public JSON API ke through bhi milta hai — courses, lessons, glossary
            aur quizzes. Ye routes read-only hain aur authentication nahi maangte. Admin routes
            separate hain, environment secret se protected hain, aur public site par visible nahi
            hote.
          </p>
          <Link
            to="/api-docs"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
          >
            API documentation →
          </Link>
        </Card>
      </Section>

      <Section title="Contact & feedback" className="mt-10">
        <Card>
          <CardBody>
            <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Users aria-hidden="true" className="h-4 w-4 text-accent-400" />
              No marketing, no mailing list
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
              Learnyx ke paas koi signup, newsletter ya tracking pixel nahi hai. Content corrections
              ke liye apne deployment ka repo issue tracker use karein — koi personal contact channel
              yahan define nahi kiya gaya, kyunki koi support desk exist nahi karta.
            </p>
            <p className="mt-3 flex items-start gap-2 text-[0.76rem] leading-relaxed text-text-muted">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-up-400" />
              Educational content only. Koi bhi financial decision apni research aur, jahan zaroori
              ho, SEBI-registered advisor ki salah par lein.
            </p>
          </CardBody>
        </Card>
      </Section>
    </div>
  );
}
