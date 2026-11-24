import { courses, lessonMetas, modules } from '../data/curriculum';
import { glossary } from '../data/glossary';
import { markets } from '../data/markets';
import { practiceBank } from '../data/quizBank';

export type SearchKind =
  | 'Courses'
  | 'Lessons'
  | 'Glossary'
  | 'Indicators'
  | 'Markets'
  | 'Calculators'
  | 'Practice';

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  keywords: string;
  to: string;
}

export const calculators = [
  {
    slug: 'risk-reward',
    title: 'Risk-to-Reward Calculator',
    description: 'Entry, stop-loss aur target se risk, reward aur R:R ratio.',
    keywords: 'risk reward ratio entry stop target r multiple',
  },
  {
    slug: 'position-size',
    title: 'Position Sizing Calculator',
    description: 'Account balance, risk % aur stop distance se position size.',
    keywords: 'position size position sizing quantity risk percent stop distance',
  },
  {
    slug: 'profit-loss',
    title: 'Profit & Loss Calculator',
    description: 'Entry, exit, quantity aur direction se gross P&L aur %.',
    keywords: 'profit loss pnl calculator long short percentage',
  },
  {
    slug: 'compounding',
    title: 'Compound Growth Calculator',
    description: 'Initial amount, return aur periods se compounding growth.',
    keywords: 'compound growth compounding calculator interest returns periods',
  },
  {
    slug: 'average-price',
    title: 'Average Price Calculator',
    description: 'Multiple purchases ka weighted average price.',
    keywords: 'average price weighted average cost basis entries',
  },
  {
    slug: 'drawdown',
    title: 'Drawdown Calculator',
    description: 'Peak aur current value se drawdown % aur recovery requirement.',
    keywords: 'drawdown peak current recovery loss percentage',
  },
];

export const indicatorDocs = [
  {
    slug: 'sma',
    id: 'sma',
    title: 'Simple Moving Average (SMA)',
    keywords: 'sma simple moving average trend filter',
    explanation:
      'SMA pichhle N closes ka plain average hai. Har naya bar aane par sabse purana close average se nikal jaata hai, isliye SMA ek smooth, lagging line banti hai jo trend ka direction dikhati hai par turning points par late hoti hai.',
    interpretation:
      'Price SMA ke upar ho to short-term momentum us period ke average se strong hai. Do SMAs ka crossover trend shift ka rough indication deta hai — par whipsaw prone hota hai.',
    caveat:
      'SMA har close ko equal weight deta hai, isliye latest price action ko turant reflect nahi karta. Ranging market me baar-baar false crossovers deta hai.',
  },
  {
    slug: 'ema',
    id: 'ema',
    title: 'Exponential Moving Average (EMA)',
    keywords: 'ema exponential moving average responsive',
    explanation:
      'EMA recent closes ko zyada weight deta hai (smoothing factor 2/(N+1)). Isliye ye price changes par SMA se tez react karta hai, aur chhote period me zyada responsive lagta hai.',
    interpretation:
      'Faster reaction ka matlab hai jaldi signal, par zyada noise bhi. Trend-following me EMA common hai; ranging markets me ye jaldi-jaldi flip karta hai.',
    caveat:
      'Responsiveness aur false signals ka trade-off hai. EMA ko "better SMA" samajhna galat hai — dono ka apna lag profile hai.',
  },
  {
    slug: 'rsi',
    id: 'rsi',
    title: 'Relative Strength Index (RSI)',
    keywords: 'rsi momentum oscillator overbought oversold divergence',
    explanation:
      'RSI 0–100 momentum oscillator hai jo average gains ko average losses se compare karta hai. Standard period 14 hai. High reading ka matlab recent gains losses se zyada dominant hain.',
    interpretation:
      '70+ ko overbought aur 30- ko oversold kaha jaata hai, par strong trend me RSI lambe samay tak extreme reh sakta hai. Divergence (price naya high, RSI lower high) momentum weakening ka hint deta hai.',
    caveat:
      'Overbought hone ka matlab "sell" nahi hota — strong uptrends me RSI 70+ par weeks reh sakta hai. Level-based trading ko trend filter ke saath combine karein.',
  },
  {
    slug: 'macd',
    id: 'macd',
    title: 'MACD',
    keywords: 'macd momentum signal line histogram convergence divergence',
    explanation:
      'MACD do EMAs ka difference hai (typically 12-period minus 26-period), aur signal line uska 9-period EMA hota hai. Histogram dono ka difference dikhata hai — momentum acceleration/deceleration ka proxy.',
    interpretation:
      'MACD line signal line ke upar ho to momentum upar ki taraf maana jaata hai. Histogram shrink hona momentum kam ho raha hai — price direction badalna zaroori nahi.',
    caveat:
      'MACD lagging indicator hai, aur price ke large moves par ye oscillator range se bahar nikal sakta hai. Crossovers late aate hain; sideways markets me bahut false signals dete hain.',
  },
  {
    slug: 'bollinger',
    id: 'bollinger',
    title: 'Bollinger Bands',
    keywords: 'bollinger bands volatility squeeze standard deviation',
    explanation:
      'Bollinger Bands middle SMA (typically 20) ke around ±k standard deviations par upper aur lower bands banate hain. Bands ki width volatility ke proportional hoti hai — volatility badhne par bands fail jaate hain.',
    interpretation:
      'Squeeze (bands narrow) low volatility dikhata hai, jo aksar expansion se pehle aata hai — par direction nahi batata. Band touch karna khud koi buy/sell signal nahi hai.',
    caveat:
      'Mean-reversion interpretation trending markets me dangerous hai: price band ke bahar lambe samay tak "walk" kar sakta hai.',
  },
  {
    slug: 'vwap',
    id: 'vwap',
    title: 'VWAP',
    keywords: 'vwap volume weighted average price institutional',
    explanation:
      'VWAP volume-weighted average price hai — har bar ka typical price uske volume se weight hota hai. Intraday institutional execution benchmarks me iska use hota hai, isliye ise session ke "fair value" reference ki tarah dekha jaata hai.',
    interpretation:
      'Price VWAP ke upar ho to buyers session me average se zyada aggressive rahe hain. VWAP ka slope short-term bias batata hai, par ye prediction nahi hai.',
    caveat:
      'VWAP session-based hai — ye har naye session par reset hota hai, isliye multi-day trend analysis ke liye useful nahi. Ye simulation me periodic reset use karta hai.',
  },
  {
    slug: 'atr',
    id: 'atr',
    title: 'ATR (Average True Range)',
    keywords: 'atr average true range volatility stop sizing',
    explanation:
      'ATR true range ka average hai, jahan true range max(high−low, |high−prevClose|, |low−prevClose|) hota hai. Ye gap-adjusted volatility measure hai, direction nahi.',
    interpretation:
      'ATR badhna volatility expansion dikhata hai; ghatna contraction. Position sizing aur stop distance ko ATR ke multiple me define karna common practice hai (e.g. 1.5×ATR).',
    caveat:
      'ATR directionless hai — high ATR ka matlab up ya down nahi. Sudden volatility spike ke baad ATR-based stops wide ho jaate hain, jisse risk amount badal jaata hai.',
  },
];

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const c of courses) {
    docs.push({
      id: `course:${c.slug}`,
      kind: 'Courses',
      title: `Level ${c.level} · ${c.title}`,
      subtitle: c.summary.slice(0, 120),
      keywords: `${c.title} ${c.titleHi} level ${c.level} ${c.difficulty}`,
      to: `/courses/${c.slug}`,
    });
  }

  for (const m of modules) {
    const course = courses.find((c) => c.id === m.courseId);
    docs.push({
      id: `module:${m.id}`,
      kind: 'Courses',
      title: m.title,
      subtitle: `${course ? `Level ${course.level}` : ''} · module · ${m.summary.slice(0, 90)}`,
      keywords: `${m.title} ${m.titleHi} ${m.summary}`,
      to: `/courses/${m.courseId}#${m.slug}`,
    });
  }

  // Lesson entries deliberately index curriculum metadata only. Pulling the
  // authored bodies in here would drag the entire lesson corpus (~670 kB) into
  // the initial bundle, which every visitor would have to download just to see
  // the homepage. Body text search is not worth that cost.
  for (const meta of lessonMetas) {
    const course = courses.find((c) => c.id === meta.courseId);
    const moduleName = meta.id.split('/')[1].replace(/-/g, ' ');
    docs.push({
      id: `lesson:${meta.id}`,
      kind: 'Lessons',
      title: meta.title,
      subtitle: `Level ${course?.level ?? ''} · ${moduleName}${meta.published ? '' : ' · in progress'}`,
      keywords: [
        meta.title,
        moduleName,
        course?.title ?? '',
        course?.titleHi ?? '',
        meta.tags.join(' '),
        meta.difficulty,
      ].join(' '),
      to: `/learn/${meta.courseId}/${meta.id.split('/')[1]}/${meta.slug}`,
    });
  }

  for (const g of glossary) {
    docs.push({
      id: `glossary:${g.slug}`,
      kind: 'Glossary',
      title: g.term,
      subtitle: g.short,
      keywords: `${g.term} ${g.short} ${g.detail} ${g.category} ${g.related.join(' ')}`,
      to: `/glossary/${g.slug}`,
    });
  }

  for (const ind of indicatorDocs) {
    docs.push({
      id: `indicator:${ind.slug}`,
      kind: 'Indicators',
      title: ind.title,
      subtitle: 'Open the Indicator Laboratory to explore it interactively',
      keywords: ind.keywords,
      to: `/lab/indicators?indicator=${ind.slug}`,
    });
  }

  for (const m of markets) {
    docs.push({
      id: `market:${m.slug}`,
      kind: 'Markets',
      title: m.name,
      subtitle: m.tagline,
      keywords: `${m.name} ${m.tagline} ${m.sections.map((s) => s.title).join(' ')}`,
      to: `/markets/${m.slug}`,
    });
  }

  for (const c of calculators) {
    docs.push({
      id: `calc:${c.slug}`,
      kind: 'Calculators',
      title: c.title,
      subtitle: c.description,
      keywords: `${c.title} ${c.description} ${c.keywords}`,
      to: `/calculators#${c.slug}`,
    });
  }

  for (const q of practiceBank) {
    docs.push({
      id: `practice:${q.id}`,
      kind: 'Practice',
      title: q.question.length > 92 ? `${q.question.slice(0, 92)}…` : q.question,
      subtitle: `${q.category.replace(/-/g, ' ')} · ${q.difficulty}`,
      keywords: `${q.question} ${q.options.join(' ')} ${q.category}`,
      to: `/practice?category=${q.category}`,
    });
  }

  return docs;
}

let cachedIndex: SearchDoc[] | null = null;

export function getSearchIndex() {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

export interface RankedResult extends SearchDoc {
  score: number;
}

export function searchDocs(query: string, limit = 24): RankedResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const results: RankedResult[] = [];

  for (const doc of getSearchIndex()) {
    const title = doc.title.toLowerCase();
    const keywords = doc.keywords.toLowerCase();
    const subtitle = doc.subtitle.toLowerCase();
    let score = 0;

    if (title === q) score += 120;
    if (title.startsWith(q)) score += 60;
    if (title.includes(q)) score += 34;
    if (subtitle.includes(q)) score += 12;

    let matchedAll = true;
    for (const t of tokens) {
      let tokenScore = 0;
      if (title.includes(t)) tokenScore += 14;
      else if (subtitle.includes(t)) tokenScore += 5;
      else if (keywords.includes(t)) tokenScore += 3;
      else matchedAll = false;
      score += tokenScore;
    }

    if (score > 0 && matchedAll) {
      // Slight preference for glossary/lesson precision over long practice text.
      if (doc.kind === 'Glossary') score += 3;
      results.push({ ...doc, score });
    }
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

export const searchKinds: SearchKind[] = [
  'Lessons',
  'Glossary',
  'Courses',
  'Indicators',
  'Markets',
  'Calculators',
  'Practice',
];
