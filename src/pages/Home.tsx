import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calculator,
  CandlestickChart,
  CheckCircle2,
  ChevronDown,
  FlaskConical,

  GraduationCap,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
  BrainCircuit,
  Play,
} from 'lucide-react';
import { HeroChart } from '../components/HeroChart';
import {
  ArrowLink,
  ButtonLink,
  Card,
  CardBody,
  DifficultyBadge,
  Section,
  Tag,
  cx,
} from '../components/ui';
import {
  courses,
  curriculumStats,
  lessonsForModule,
  modulesForCourse,
  publishedLessons,
} from '../data/curriculum';
import { markets } from '../data/markets';
import { calculators } from '../lib/search';
import { useProgress } from '../lib/progress';

const learningPaths = [
  {
    level: 1,
    title: 'Market Foundations',
    blurb: 'Zero se shuru — market kya hai, exchange kaise kaam karta hai, orders aur terminology.',
    icon: Layers,
    to: '/courses/market-foundations',
    accent: 'from-accent-500/22 to-accent-500/0',
  },
  {
    level: 2,
    title: 'Technical Analysis',
    blurb: 'Charts padhna, candlesticks, trend structure, support-resistance aur price action.',
    icon: CandlestickChart,
    to: '/courses/technical-analysis',
    accent: 'from-violet-500/22 to-violet-500/0',
  },
  {
    level: 3,
    title: 'Analysis in Depth',
    blurb: 'Indicators, volume analysis, company financials aur macroeconomics.',
    icon: LineChart,
    to: '/courses/technical-and-fundamental',
    accent: 'from-up-500/20 to-up-500/0',
  },
  {
    level: 4,
    title: 'Risk & Psychology',
    blurb: 'Trading styles, position sizing, drawdown, emotional traps aur strategy testing.',
    icon: ShieldCheck,
    to: '/courses/strategies-risk-psychology',
    accent: 'from-warn-500/20 to-warn-500/0',
  },
  {
    level: 5,
    title: 'Advanced Markets',
    blurb: 'Derivatives, Greeks, volatility, order flow, algo trading aur portfolio risk.',
    icon: BrainCircuit,
    to: '/courses/advanced-market-education',
    accent: 'from-down-500/18 to-down-500/0',
  },
];

const faqs = [
  {
    q: 'Kya Learnyx Trading free hai? Koi login chahiye?',
    a: 'Poori tarah free hai. Koi account, signup, subscription ya payment nahi. Aap website kholte hain aur turant padhna shuru kar sakte hain. Progress aapke browser me locally save hoti hai — kisi server par nahi jaati.',
  },
  {
    q: 'Kya yahan real trading hoti hai ya paisa lagta hai?',
    a: 'Nahi, bilkul nahi. Learnyx ek educational platform hai. Yahan koi brokerage connection nahi, koi real order execution nahi, koi deposit nahi. Trading Lab ke saare simulators virtual hain — fictional balance aur clearly labelled sample data ke saath.',
  },
  {
    q: 'Content Hinglish me kyun hai?',
    a: 'Kyunki financial concepts English terminology me sabse accurate rehte hain, par unhe samajhne ke liye ek comfortable language chahiye. Isliye hum simple Hindi me explain karte hain aur English financial terms use karte hain — jaise "support zone", "risk-to-reward", "drawdown".',
  },
  {
    q: 'Kya main yahan se trading seekh kar paisa kama sakta hoon?',
    a: 'Yahan koi profit promise nahi hai aur na hi koi strategy recommendation. Hum concepts, risk management aur analytical frameworks padhate hain. Market me paisa kamana skill, capital, discipline aur risk tolerance par depend karta hai — aur losses possible hain. Jo bhi "guaranteed returns" ka dawa kare, usse door rahiye.',
  },
  {
    q: 'Progress kaise save hoti hai? Kya different devices par sync hoti hai?',
    a: 'Progress browser ke local storage me save hoti hai. Iska matlab: same browser me aapka progress safe rehta hai, par different device ya browser me automatically sync nahi hota. Aap Progress page se apna data JSON file me export kar sakte hain, aur kabhi bhi reset kar sakte hain.',
  },
  {
    q: 'Kya content SEBI-regulated advice hai?',
    a: 'Nahi. Ye educational content hai, personalised financial advice nahi. Hum registered investment adviser nahi hain aur kisi broker ya product se affiliated nahi hain. Koi bhi financial decision lene se pehle apni situation ke hisaab se SEBI-registered adviser se salah lein.',
  },
];

export default function Home() {
  const { completionPct, lessons: progressLessons } = useProgress();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featured = publishedLessons().slice(0, 6);
  const totalPublished = curriculumStats.published;
  const started = Object.keys(progressLessons).length;

  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative -mx-4 -mt-6 overflow-hidden border-b border-white/8 px-4 py-14 sm:-mx-6 sm:px-6 sm:py-20 lg:-mx-10 lg:px-10 lg:py-24">
        <HeroChart />
        <div className="relative mx-auto max-w-4xl">
          <div className="animate-fade-rise inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[0.7rem] font-medium text-text-secondary backdrop-blur">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
            Free forever · No login · No payments
          </div>

          <h1 className="animate-fade-rise mt-6 text-[2.15rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.6rem]">
            <span className="text-gradient">Understand Markets.</span>
            <br />
            <span className="text-text-primary">Master Trading.</span>
          </h1>

          <p className="animate-fade-rise mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-text-secondary sm:text-lg">
            Learn financial markets from the ground up with structured lessons, interactive chart
            labs, practical examples, and risk-management education.
          </p>

          <div className="animate-fade-rise mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/courses" className="w-full sm:w-auto">
              Explore Courses
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to="/lab" variant="secondary" className="w-full sm:w-auto">
              <FlaskConical aria-hidden="true" className="h-4 w-4" />
              Open Trading Lab
            </ButtonLink>
          </div>

          <dl className="animate-fade-rise mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Levels', value: `${curriculumStats.levels}` },
              { label: 'Modules', value: `${curriculumStats.modules}` },
              { label: 'Published lessons', value: `${totalPublished}` },
              { label: 'Glossary terms', value: '161+' },
            ].map((s) => (
              <div key={s.label} className="glass-subtle rounded-xl px-4 py-3">
                <dt className="text-[0.65rem] font-medium tracking-wide text-text-muted uppercase">
                  {s.label}
                </dt>
                <dd className="tnum mt-1 text-xl font-semibold text-text-primary">{s.value}</dd>
              </div>
            ))}
          </dl>

          {started > 0 && (
            <div className="glass-subtle mt-6 rounded-xl px-4 py-3">
              <p className="text-xs text-text-secondary">
                Welcome back — you have opened{' '}
                <span className="font-semibold text-text-primary">{started}</span> lesson
                {started === 1 ? '' : 's'} ·{' '}
                <span className="tnum font-semibold text-accent-400">{completionPct(publishedLessons().map((l) => l.id))}%</span>{' '}
                of published lessons completed.
              </p>
              <Link
                to="/progress"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
              >
                View my progress
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LEARNING PATHS                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="pt-12">
        <Section
          title="Learning paths"
          description="Paanch levels — complete beginner se advanced market concepts tak. Har level independent hai par sequence best results deta hai."
          action={<ArrowLink to="/courses">All courses</ArrowLink>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningPaths.map((p) => {
              const course = courses.find((c) => c.level === p.level);
              const Icon = p.icon;
              const done = course
                ? completionPct(
                    modulesForCourse(course.id).flatMap((m) =>
                      lessonsForModule(m.id)
                        .filter((l) => l.published)
                        .map((l) => l.id),
                    ),
                  )
                : 0;
              return (
                <Card key={p.level} interactive className="group relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={cx(
                      'pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b blur-2xl',
                      p.accent,
                    )}
                  />
                  <CardBody className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/6">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5 text-accent-400" />
                      </span>
                      <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-text-muted uppercase">
                        Level {p.level}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-text-primary">{p.title}</h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
                      {p.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
                      <span className="text-[0.7rem] text-text-muted">
                        {course?.moduleCount ?? 0} modules · {course?.lessonCount ?? 0} lessons
                      </span>
                      {done > 0 && (
                        <span className="tnum text-[0.7rem] font-semibold text-up-400">{done}%</span>
                      )}
                    </div>
                    <Link
                      to={p.to}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 group-hover:text-accent-300"
                    >
                      Open path
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* MARKETS                                                        */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Explore financial markets"
          description="Har market ke apne structure, rules aur risks hote hain. Yahan se market-specific learning pages tak jaayein."
          action={<ArrowLink to="/markets">All markets</ArrowLink>}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <Link
                key={m.id}
                to={`/markets/${m.slug}`}
                className="card card-hover group flex flex-col gap-2 p-4"
              >
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-300">
                  {m.name}
                </span>
                <span className="text-[0.75rem] leading-relaxed text-text-muted">{m.tagline}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[0.7rem] font-medium text-accent-400">
                  Learn more
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* COURSE CATEGORIES                                              */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Course categories"
          description="Modules aur lessons ka complete map — sab published content ke saath."
          action={<ArrowLink to="/learn">Full curriculum</ArrowLink>}
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((c) => (
              <Card key={c.id} interactive className="flex flex-col">
                <CardBody className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <DifficultyBadge level={c.difficulty} />
                    <span className="text-[0.65rem] font-semibold text-text-muted">
                      LEVEL {c.level}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[0.95rem] font-semibold text-text-primary">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-text-secondary">
                    {c.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <Tag>{c.moduleCount} modules</Tag>
                    <Tag>{c.lessonCount} lessons</Tag>
                    <Tag>{Math.round(c.estimatedMinutes / 60)}h content</Tag>
                  </div>
                  <Link
                    to={`/courses/${c.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
                  >
                    View course
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* TRADING LAB PREVIEW                                            */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Interactive Trading Lab"
          description="Concept padhna ek cheez hai, usse dekhna doosri. Lab me charts, patterns, indicators, strategies aur simulators ke saath practice karein — bina paisa khoye."
          action={<ArrowLink to="/lab">Open the lab</ArrowLink>}
        >
          <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
            <Card className="relative overflow-hidden">
              <div aria-hidden="true" className="absolute inset-0 opacity-40">
                <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="h-full w-full">
                  <defs>
                    <linearGradient id="labLine" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#648CFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#9B7BFF" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 140 L30 128 L60 132 L90 112 L120 118 L150 96 L180 102 L210 80 L240 88 L270 66 L300 74 L330 52 L360 60 L400 38"
                    fill="none"
                    stroke="url(#labLine)"
                    strokeWidth="2"
                  />
                  {[
                    [30, 128, 136], [60, 132, 140], [90, 112, 122], [120, 118, 128],
                    [150, 96, 106], [180, 102, 112], [210, 80, 92], [240, 88, 98],
                    [270, 66, 78], [300, 74, 86], [330, 52, 64], [360, 60, 72],
                  ].map(([x, y, l], i) => (
                    <g key={i} opacity="0.5">
                      <line x1={x} y1={y - 8} x2={x} y2={l + 4} stroke={i % 2 ? '#FF7C86' : '#4DD3A3'} strokeWidth="1" />
                      <rect x={x - 3} y={Math.min(y, l)} width="6" height={Math.abs(l - y)} fill={i % 2 ? '#FF7C86' : '#4DD3A3'} rx="1" />
                    </g>
                  ))}
                </svg>
              </div>
              <CardBody className="relative">
                <div className="flex items-center gap-2">
                  <BarChart3 aria-hidden="true" className="h-4 w-4 text-accent-400" />
                  <p className="text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase">
                    Sample data · educational only
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">Chart Explorer</h3>
                <p className="mt-2 max-w-md text-[0.82rem] leading-relaxed text-text-secondary">
                  Candlestick and line charts with multiple aggregations, volume, crosshair and full
                  chart controls — on clearly labelled synthetic sample data.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Candlestick', 'Line chart', 'Volume', 'Crosshair', 'Zoom & pan'].map((f) => (
                    <Tag key={f}>{f}</Tag>
                  ))}
                </div>
                <ButtonLink to="/lab/charts" variant="secondary" className="mt-5">
                  <Play aria-hidden="true" className="h-3.5 w-3.5" />
                  Try Chart Explorer
                </ButtonLink>
              </CardBody>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  icon: CandlestickChart,
                  title: 'Pattern Trainer',
                  text: 'Candlestick patterns identify karein aur instant explanation paayein.',
                  to: '/lab/patterns',
                },
                {
                  icon: LineChart,
                  title: 'Indicator Lab',
                  text: 'SMA, EMA, RSI, MACD, Bollinger, VWAP aur ATR ke parameters badal kar dekhein.',
                  to: '/lab/indicators',
                },
                {
                  icon: Target,
                  title: 'Strategy & Backtest',
                  text: 'Rules banayein aur fees-slippage ke saath simulate karein.',
                  to: '/lab/backtest',
                },
                {
                  icon: Wallet,
                  title: 'Paper Trading',
                  text: 'Virtual balance, simulated positions aur P&L — koi real money nahi.',
                  to: '/lab/paper',
                },
              ].map((t) => (
                <Link key={t.to} to={t.to} className="card card-hover group flex gap-3 p-4">
                  <t.icon aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-400" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-text-primary group-hover:text-accent-300">
                      {t.title}
                    </span>
                    <span className="mt-1 block text-[0.75rem] leading-relaxed text-text-muted">
                      {t.text}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* FEATURED LESSONS                                               */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Featured lessons"
          description="Har lesson ke saath learning objectives, Hinglish explanation, worked examples, formulas, common mistakes aur knowledge-check quiz."
          action={<ArrowLink to="/learn">Browse all lessons</ArrowLink>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((l) => {
              const course = courses.find((c) => c.id === l.courseId);
              return (
                <Link
                  key={l.id}
                  to={`/learn/${l.courseId}/${l.id.split('/')[1]}/${l.slug}`}
                  className="card card-hover group flex flex-col p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Tag>Level {course?.level}</Tag>
                    <span className="text-[0.65rem] text-text-muted">{l.estimatedMinutes} min</span>
                  </div>
                  <h3 className="mt-3 text-[0.9rem] font-semibold leading-snug text-text-primary group-hover:text-accent-300">
                    {l.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-text-muted">
                    {l.tags.slice(0, 3).join(' · ')}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-accent-400">
                    Start lesson
                    <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* CALCULATORS                                                    */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Trading calculators"
          description="Six functional calculators with validation and educational labels. Sab hypothetical values par kaam karte hain."
          action={<ArrowLink to="/calculators">Open calculators</ArrowLink>}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c) => (
              <Link
                key={c.slug}
                to={`/calculators#${c.slug}`}
                className="card card-hover group flex items-start gap-3 p-4"
              >
                <Calculator aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-400" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-text-primary group-hover:text-accent-300">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-[0.75rem] leading-relaxed text-text-muted">
                    {c.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* METHODOLOGY                                                    */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Learning methodology"
          description="Ye platform padhai ke liye bana hai — entertainment ke liye nahi. Har lesson ek consistent structure follow karta hai."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                step: '01',
                title: 'Concept first',
                text: 'Definition se zyada "ye cheez kaam kaise karti hai" par focus. Plain Hinglish explanation, English terminology ke saath.',
              },
              {
                icon: Calculator,
                step: '02',
                title: 'Worked examples',
                text: 'Har formula ke saath step-by-step calculation, clearly hypothetical numbers ke saath — taaki aap khud reproduce kar sakein.',
              },
              {
                icon: FlaskConical,
                step: '03',
                title: 'Hands-on practice',
                text: 'Trading Lab me charts, patterns aur indicators ke saath experiment, aur Backtester me fees-slippage reality check.',
              },
              {
                icon: ShieldCheck,
                step: '04',
                title: 'Honest limitations',
                text: 'Har lesson me common mistakes aur limitations. Koi "guaranteed profit" claim nahi, koi fake accuracy nahi.',
              },
            ].map((m) => (
              <Card key={m.step} className="p-5">
                <div className="flex items-center justify-between">
                  <m.icon aria-hidden="true" className="h-5 w-5 text-accent-400" />
                  <span className="tnum text-[0.7rem] font-semibold text-text-muted">{m.step}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-text-primary">{m.title}</h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-text-secondary">{m.text}</p>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Published lessons', value: `${totalPublished}` },
              { label: 'Quiz questions', value: '210+' },
              { label: 'Glossary terms', value: '161+' },
            ].map((s) => (
              <div key={s.label} className="glass-subtle rounded-xl px-4 py-3">
                <p className="text-[0.65rem] font-medium tracking-wide text-text-muted uppercase">
                  {s.label}
                </p>
                <p className="tnum mt-1 text-lg font-semibold text-text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* FAQ                                                            */}
        {/* -------------------------------------------------------------- */}
        <Section
          title="Frequently asked questions"
          description="Straight answers — no marketing language."
        >
          <div className="space-y-2">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[0.88rem] font-semibold text-text-primary">{f.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cx(
                        'h-4 w-4 shrink-0 text-text-muted transition-transform duration-300',
                        open && 'rotate-180',
                      )}
                    />
                  </button>
                  {open && (
                    <div className="animate-fade-in border-t border-white/8 px-5 py-4">
                      <p className="text-[0.82rem] leading-relaxed text-text-secondary">{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* -------------------------------------------------------------- */}
        {/* CTA                                                            */}
        {/* -------------------------------------------------------------- */}
        <section className="relative mb-4 overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-accent-500/12 via-ink-800/60 to-violet-500/12 p-8 sm:p-12">
          <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-25" />
          <div className="relative max-w-2xl">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-accent-400 uppercase">
              Start where you are
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              Zero se shuru karein — ya seedha apne level par jaayein.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Market Foundations se shuru karein agar aap naye hain, ya Technical Analysis se shuru
              karein agar basics clear hain. Har lesson self-contained hai, par sequence best results
              deta hai.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/learn">
                <GraduationCap aria-hidden="true" className="h-4 w-4" />
                Start learning
              </ButtonLink>
              <ButtonLink to="/glossary" variant="secondary">
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                Browse glossary
              </ButtonLink>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] text-text-muted">
              {['No login', 'No payments', 'No real trading', 'Local-only progress'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-up-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
