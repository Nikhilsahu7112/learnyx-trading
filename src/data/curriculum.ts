import type { Course, LessonMeta, Module } from '../lib/types';

/**
 * The Learnyx Trading curriculum is defined in one place so that the frontend,
 * the search index and the Worker API all describe exactly the same structure.
 *
 * `published` is honest: only lessons whose full educational content has been
 * authored are marked true. Everything else is shown as "in progress".
 */

interface LessonSeed {
  slug: string;
  title: string;
  minutes: number;
  tags?: string[];
  published?: boolean;
}

interface ModuleSeed {
  slug: string;
  title: string;
  titleHi: string;
  summary: string;
  lessons: LessonSeed[];
}

interface CourseSeed {
  level: 1 | 2 | 3 | 4 | 5;
  slug: string;
  title: string;
  titleHi: string;
  summary: string;
  difficulty: Course['difficulty'];
  icon: string;
  accent: Course['accent'];
  modules: ModuleSeed[];
}

export const courseSeeds: CourseSeed[] = [
  {
    level: 1,
    slug: 'market-foundations',
    title: 'Market Foundations',
    titleHi: 'Market ki Buniyaad',
    summary:
      'Shuru se shuru — financial market kya hai, stock exchange kaise kaam karta hai, orders kaise lagte hain, aur har trader ko pata hone wali terminology.',
    difficulty: 'Beginner',
    icon: 'Landmark',
    accent: 'blue',
    modules: [
      {
        slug: 'intro-to-financial-markets',
        title: 'Introduction to Financial Markets',
        titleHi: 'Financial Market ka Parichay',
        summary:
          'Market kyun exist karta hai, company paisa kaise uthaati hai, stock aur share ka matlab, primary vs secondary market aur participants.',
        lessons: [
          {
            slug: 'what-is-a-financial-market',
            title: 'What Is a Financial Market?',
            minutes: 12,
            tags: ['basics', 'market structure'],
          },
          {
            slug: 'how-companies-raise-capital',
            title: 'How Companies Raise Capital',
            minutes: 12,
            tags: ['IPO', 'primary market'],
          },
          {
            slug: 'stocks-shares-and-ownership',
            title: 'Stocks, Shares and Ownership',
            minutes: 11,
            tags: ['equity', 'ownership'],
          },
          {
            slug: 'trading-vs-investing',
            title: 'Trading vs Investing, Speculation vs Investing',
            minutes: 13,
            tags: ['investing', 'speculation'],
          },
          {
            slug: 'market-participants',
            title: 'Financial Market Participants',
            minutes: 10,
            tags: ['participants', 'institutions'],
          },
        ],
      },
      {
        slug: 'market-infrastructure',
        title: 'Stock Market Infrastructure',
        titleHi: 'Stock Market ka Dhaancha',
        summary:
          'Exchanges, NSE, BSE, NYSE, NASDAQ, indices jaise NIFTY aur SENSEX, brokers, depositories aur clearing-settlement system.',
        lessons: [
          {
            slug: 'what-is-a-stock-exchange',
            title: 'What Is a Stock Exchange?',
            minutes: 12,
            tags: ['exchange', 'NSE', 'BSE'],
          },
          {
            slug: 'market-indices-explained',
            title: 'Market Indices: NIFTY, SENSEX, S&P 500',
            minutes: 14,
            tags: ['index', 'NIFTY', 'SENSEX', 'S&P 500'],
          },
          {
            slug: 'brokers-depositories-settlement',
            title: 'Brokers, Depositories and Settlement',
            minutes: 13,
            tags: ['broker', 'depository', 'settlement', 'T+1'],
          },
        ],
      },
      {
        slug: 'market-terminology',
        title: 'Important Market Terminology',
        titleHi: 'Zaroori Market Shabdavali',
        summary:
          'Bull, bear, volatility, liquidity, market cap, volume, bid-ask, spread, order book, circuit breaker, gap up/down aur sentiment.',
        lessons: [
          {
            slug: 'bull-bear-and-market-sentiment',
            title: 'Bull, Bear and Market Sentiment',
            minutes: 11,
            tags: ['bull market', 'bear market', 'sentiment'],
          },
          {
            slug: 'liquidity-volume-and-market-cap',
            title: 'Liquidity, Volume and Market Capitalisation',
            minutes: 13,
            tags: ['liquidity', 'volume', 'market cap'],
          },
          {
            slug: 'bid-ask-spread-and-order-book',
            title: 'Bid, Ask, Spread and the Order Book',
            minutes: 14,
            tags: ['bid', 'ask', 'spread', 'order book'],
          },
          {
            slug: 'circuit-breakers-and-gaps',
            title: 'Circuit Breakers, Gap Up and Gap Down',
            minutes: 11,
            tags: ['circuit breaker', 'gap up', 'gap down'],
          },
        ],
      },
      {
        slug: 'accounts-and-orders',
        title: 'Trading Accounts and Orders',
        titleHi: 'Trading Account aur Orders',
        summary:
          'Demat aur trading account ka concept, order types, execution, partial fill, slippage aur trading sessions — sirf samajhne ke liye.',
        lessons: [
          {
            slug: 'demat-and-trading-accounts',
            title: 'Demat and Trading Accounts (Concept Only)',
            minutes: 11,
            tags: ['demat', 'trading account'],
          },
          {
            slug: 'market-and-limit-orders',
            title: 'Market Orders and Limit Orders',
            minutes: 13,
            tags: ['market order', 'limit order'],
          },
          {
            slug: 'stop-orders-and-gtt',
            title: 'Stop Orders, Stop-Limit Orders and GTT',
            minutes: 13,
            tags: ['stop loss', 'GTT'],
          },
          {
            slug: 'execution-slippage-and-sessions',
            title: 'Execution, Partial Fills, Slippage and Sessions',
            minutes: 12,
            tags: ['slippage', 'execution', 'trading session'],
          },
        ],
      },
      {
        slug: 'understanding-markets',
        title: 'Understanding Financial Markets',
        titleHi: 'Alag-alag Markets ko Samajhna',
        summary:
          'Equity, forex, commodity, bond, derivatives aur crypto markets, global relationships aur economic events ka asar.',
        lessons: [
          {
            slug: 'equity-and-bond-markets',
            title: 'Equity and Bond Markets',
            minutes: 13,
            tags: ['equity', 'bond', 'debt'],
          },
          {
            slug: 'forex-commodity-and-crypto',
            title: 'Forex, Commodity and Cryptocurrency Markets',
            minutes: 14,
            tags: ['forex', 'commodity', 'crypto'],
          },
          {
            slug: 'derivatives-and-global-links',
            title: 'Derivatives and Global Market Relationships',
            minutes: 14,
            tags: ['derivatives', 'global markets', 'macro'],
          },
          {
            slug: 'economic-events-and-markets',
            title: 'Economic Events and Their Influence',
            minutes: 12,
            tags: ['economic events', 'RBI', 'Fed'],
          },
        ],
      },
    ],
  },
  {
    level: 2,
    slug: 'technical-analysis',
    title: 'Technical Analysis & Chart Reading',
    titleHi: 'Technical Analysis aur Chart Padhna',
    summary:
      'Chart types, candlestick anatomy aur patterns, trend structure, support-resistance aur advanced price action — sab example ke saath.',
    difficulty: 'Beginner',
    icon: 'CandlestickChart',
    accent: 'violet',
    modules: [
      {
        slug: 'chart-fundamentals',
        title: 'Chart Fundamentals',
        titleHi: 'Chart ki Buniyaad',
        summary:
          'Price chart kya hota hai, line vs bar vs candlestick, OHLC ka matlab aur timeframes ka role.',
        lessons: [
          {
            slug: 'what-is-a-price-chart',
            title: 'What Is a Price Chart?',
            minutes: 12,
            tags: ['charts', 'OHLC'],
          },
          {
            slug: 'chart-types-compared',
            title: 'Line, Bar and Candlestick Charts',
            minutes: 13,
            tags: ['line chart', 'candlestick chart', 'bar chart'],
          },
          {
            slug: 'timeframes-explained',
            title: 'Timeframes: Intraday to Monthly',
            minutes: 12,
            tags: ['timeframe', 'intraday', 'swing'],
          },
        ],
      },
      {
        slug: 'candlestick-analysis',
        title: 'Candlestick Analysis',
        titleHi: 'Candlestick Analysis',
        summary:
          'Body, wick, open-high-low-close aur 14 major patterns — context, limitations aur confirmation ke saath.',
        lessons: [
          {
            slug: 'candlestick-anatomy',
            title: 'Candlestick Anatomy: Body and Wicks',
            minutes: 13,
            tags: ['candlestick', 'body', 'wick'],
          },
          {
            slug: 'single-candle-patterns',
            title: 'Doji, Hammer, Shooting Star and Friends',
            minutes: 16,
            tags: ['doji', 'hammer', 'shooting star', 'spinning top', 'marubozu'],
          },
          {
            slug: 'double-candle-patterns',
            title: 'Engulfing, Harami and Tweezer Patterns',
            minutes: 15,
            tags: ['engulfing', 'harami', 'tweezer'],
          },
          {
            slug: 'triple-candle-patterns',
            title: 'Morning Star and Evening Star',
            minutes: 14,
            tags: ['morning star', 'evening star', 'reversal'],
          },
        ],
      },
      {
        slug: 'trend-analysis',
        title: 'Trend Analysis',
        titleHi: 'Trend Analysis',
        summary:
          'Uptrend, downtrend, sideways, higher highs-lows, trendlines, channels aur trend confirmation ke rules.',
        lessons: [
          {
            slug: 'trend-structure-basics',
            title: 'Uptrend, Downtrend and Sideways Markets',
            minutes: 14,
            tags: ['trend', 'higher highs', 'lower lows'],
          },
          {
            slug: 'trendlines-and-channels',
            title: 'Trendlines and Channels',
            minutes: 15,
            tags: ['trendline', 'channel'],
          },
          {
            slug: 'trend-confirmation',
            title: 'Confirming a Trend Without Guessing',
            minutes: 13,
            tags: ['trend confirmation', 'volume'],
          },
        ],
      },
      {
        slug: 'support-and-resistance',
        title: 'Support and Resistance',
        titleHi: 'Support aur Resistance',
        summary:
          'Zones kaise bante hain, dynamic levels, role reversal, breakout, false breakout, retest aur consolidation.',
        lessons: [
          {
            slug: 'support-resistance-zones',
            title: 'Support and Resistance Zones',
            minutes: 14,
            tags: ['support', 'resistance', 'zone'],
          },
          {
            slug: 'dynamic-sr-and-role-reversal',
            title: 'Dynamic S/R and Role Reversal',
            minutes: 13,
            tags: ['moving average', 'role reversal'],
          },
          {
            slug: 'breakouts-retests-consolidation',
            title: 'Breakouts, False Breakouts and Retests',
            minutes: 15,
            tags: ['breakout', 'false breakout', 'retest', 'consolidation'],
          },
        ],
      },
      {
        slug: 'advanced-price-action',
        title: 'Advanced Price Action',
        titleHi: 'Advanced Price Action',
        summary:
          'Market structure, swing points, BOS, CHoCH, liquidity concepts aur continuation vs reversal structures.',
        lessons: [
          {
            slug: 'market-structure-swing-points',
            title: 'Market Structure and Swing Points',
            minutes: 15,
            tags: ['market structure', 'swing high', 'swing low'],
          },
          {
            slug: 'break-of-structure-choch',
            title: 'Break of Structure and Change of Character',
            minutes: 16,
            tags: ['BOS', 'CHoCH', 'reversal'],
          },
          {
            slug: 'liquidity-and-pullbacks',
            title: 'Liquidity Concepts, Pullbacks and Continuation',
            minutes: 15,
            tags: ['liquidity', 'pullback', 'continuation'],
          },
        ],
      },
    ],
  },
  {
    level: 3,
    slug: 'technical-and-fundamental',
    title: 'Technical & Fundamental Analysis',
    titleHi: 'Technical aur Fundamental Analysis',
    summary:
      'Indicators kaise bante hain aur unhe kaise padhein, volume analysis, company financials aur macroeconomics.',
    difficulty: 'Intermediate',
    icon: 'LineChart',
    accent: 'teal',
    modules: [
      {
        slug: 'technical-indicators',
        title: 'Technical Indicators',
        titleHi: 'Technical Indicators',
        summary:
          'SMA, EMA, RSI, MACD, Bollinger Bands, VWAP, ATR, Stochastic aur Fibonacci — formula, interpretation aur limitations.',
        lessons: [
          {
            slug: 'moving-averages',
            title: 'Simple and Exponential Moving Averages',
            minutes: 15,
            tags: ['SMA', 'EMA', 'moving average'],
          },
          {
            slug: 'rsi-and-stochastic',
            title: 'RSI and Stochastic Oscillator',
            minutes: 16,
            tags: ['RSI', 'stochastic', 'momentum'],
          },
          {
            slug: 'macd-and-bollinger-bands',
            title: 'MACD and Bollinger Bands',
            minutes: 16,
            tags: ['MACD', 'Bollinger Bands', 'volatility'],
          },
          {
            slug: 'vwap-and-atr',
            title: 'VWAP and ATR',
            minutes: 15,
            tags: ['VWAP', 'ATR', 'average true range'],
          },
          {
            slug: 'fibonacci-retracement',
            title: 'Fibonacci Retracement and Extension',
            minutes: 15,
            tags: ['Fibonacci', 'retracement', 'extension'],
          },
        ],
      },
      {
        slug: 'volume-analysis',
        title: 'Volume Analysis',
        titleHi: 'Volume Analysis',
        summary:
          'Volume bars, average volume, spikes, confirmation, divergence aur On-Balance Volume.',
        lessons: [
          {
            slug: 'volume-basics',
            title: 'Trading Volume Basics',
            minutes: 13,
            tags: ['volume', 'volume bars'],
          },
          {
            slug: 'volume-divergence-and-obv',
            title: 'Volume Divergence and On-Balance Volume',
            minutes: 15,
            tags: ['divergence', 'OBV'],
          },
        ],
      },
      {
        slug: 'fundamental-analysis',
        title: 'Fundamental Analysis',
        titleHi: 'Fundamental Analysis',
        summary:
          'Revenue se free cash flow tak, EPS, P/E, P/B, ROE, ROCE, debt-to-equity aur teen financial statements.',
        lessons: [
          {
            slug: 'reading-financial-statements',
            title: 'Reading the Three Financial Statements',
            minutes: 17,
            tags: ['income statement', 'balance sheet', 'cash flow'],
          },
          {
            slug: 'valuation-ratios',
            title: 'Valuation Ratios: P/E, P/B, Dividend Yield',
            minutes: 16,
            tags: ['P/E', 'P/B', 'valuation'],
          },
          {
            slug: 'profitability-and-leverage-ratios',
            title: 'Profitability and Leverage Ratios',
            minutes: 15,
            tags: ['ROE', 'ROCE', 'debt to equity'],
          },
        ],
      },
      {
        slug: 'macroeconomics',
        title: 'Macroeconomics',
        titleHi: 'Macroeconomics',
        summary:
          'Inflation, interest rates, central banks, GDP, employment, monetary-fiscal policy aur currency movements.',
        lessons: [
          {
            slug: 'inflation-and-interest-rates',
            title: 'Inflation and Interest Rates',
            minutes: 15,
            tags: ['inflation', 'interest rate', 'RBI', 'Fed'],
          },
          {
            slug: 'growth-employment-and-cycles',
            title: 'Growth, Employment and Economic Cycles',
            minutes: 14,
            tags: ['GDP', 'employment', 'economic cycle'],
          },
          {
            slug: 'policy-and-currencies',
            title: 'Monetary Policy, Fiscal Policy and Currencies',
            minutes: 14,
            tags: ['monetary policy', 'fiscal policy', 'currency'],
          },
        ],
      },
    ],
  },
  {
    level: 4,
    slug: 'strategies-risk-psychology',
    title: 'Strategies, Risk Management & Psychology',
    titleHi: 'Strategy, Risk aur Psychology',
    summary:
      'Trading styles, position sizing, drawdown, risk of ruin, emotional traps aur strategy testing ka poora framework.',
    difficulty: 'Intermediate',
    icon: 'ShieldCheck',
    accent: 'amber',
    modules: [
      {
        slug: 'trading-styles',
        title: 'Trading Styles',
        titleHi: 'Trading Styles',
        summary:
          'Scalping se long-term investing tak — time commitment, risk aur limitations ka honest comparison.',
        lessons: [
          {
            slug: 'trading-style-spectrum',
            title: 'The Trading Style Spectrum',
            minutes: 14,
            tags: ['scalping', 'intraday', 'swing', 'positional'],
          },
          {
            slug: 'investing-and-algorithmic-styles',
            title: 'Long-Term Investing and Algorithmic Trading',
            minutes: 13,
            tags: ['investing', 'algorithmic trading'],
          },
        ],
      },
      {
        slug: 'risk-management',
        title: 'Risk Management',
        titleHi: 'Risk Management',
        summary:
          'Risk per trade, position sizing, stop-loss logic, drawdown, risk of ruin aur capital preservation.',
        lessons: [
          {
            slug: 'risk-reward-and-position-sizing',
            title: 'Risk-Reward and Position Sizing',
            minutes: 16,
            tags: ['risk reward', 'position sizing'],
          },
          {
            slug: 'drawdown-and-risk-of-ruin',
            title: 'Drawdown and Risk of Ruin',
            minutes: 16,
            tags: ['drawdown', 'risk of ruin'],
          },
          {
            slug: 'diversification-and-exposure',
            title: 'Diversification and Portfolio Exposure',
            minutes: 13,
            tags: ['diversification', 'exposure'],
          },
        ],
      },
      {
        slug: 'trading-psychology',
        title: 'Trading Psychology',
        titleHi: 'Trading Psychology',
        summary:
          'Fear, greed, FOMO, revenge trading, confirmation bias, discipline aur trading journal ka role.',
        lessons: [
          {
            slug: 'emotional-traps',
            title: 'Fear, Greed, FOMO and Revenge Trading',
            minutes: 15,
            tags: ['fear', 'greed', 'FOMO', 'revenge trading'],
          },
          {
            slug: 'discipline-and-journals',
            title: 'Discipline, Patience and Trading Journals',
            minutes: 14,
            tags: ['discipline', 'trading journal'],
          },
        ],
      },
      {
        slug: 'strategy-testing',
        title: 'Strategy Testing',
        titleHi: 'Strategy Testing',
        summary:
          'Strategy rules likhna, backtesting, forward testing, paper trading, win rate, profit factor aur overfitting.',
        lessons: [
          {
            slug: 'defining-strategy-rules',
            title: 'What Makes a Testable Strategy',
            minutes: 14,
            tags: ['strategy rules', 'entry', 'exit'],
          },
          {
            slug: 'backtesting-and-metrics',
            title: 'Backtesting, Forward Testing and Metrics',
            minutes: 17,
            tags: ['backtesting', 'win rate', 'profit factor'],
          },
          {
            slug: 'biases-in-testing',
            title: 'Overfitting, Sample Size and Survivorship Bias',
            minutes: 14,
            tags: ['overfitting', 'sample size', 'survivorship bias'],
          },
        ],
      },
    ],
  },
  {
    level: 5,
    slug: 'advanced-market-education',
    title: 'Advanced Market Education',
    titleHi: 'Advanced Market Education',
    summary:
      'Futures-options, Greeks, implied volatility, open interest, order flow, algorithmic trading aur portfolio risk metrics.',
    difficulty: 'Advanced',
    icon: 'BrainCircuit',
    accent: 'rose',
    modules: [
      {
        slug: 'derivatives',
        title: 'Derivatives',
        titleHi: 'Derivatives',
        summary:
          'Futures aur options ka contract structure, strike, expiry, premium, intrinsic aur time value, ITM-ATM-OTM.',
        lessons: [
          {
            slug: 'futures-contracts',
            title: 'Futures Contracts Explained',
            minutes: 16,
            tags: ['futures', 'margin', 'expiry'],
          },
          {
            slug: 'options-fundamentals',
            title: 'Options: Calls, Puts and Premiums',
            minutes: 18,
            tags: ['options', 'call', 'put', 'premium'],
          },
          {
            slug: 'moneyness-and-payoffs',
            title: 'Moneyness, Intrinsic Value and Payoff Diagrams',
            minutes: 16,
            tags: ['ITM', 'ATM', 'OTM', 'payoff'],
          },
        ],
      },
      {
        slug: 'options-greeks',
        title: 'Options Greeks',
        titleHi: 'Options Greeks',
        summary:
          'Delta, Gamma, Theta, Vega aur Rho ka mathematical matlab aur option price par asar.',
        lessons: [
          {
            slug: 'delta-and-gamma',
            title: 'Delta and Gamma',
            minutes: 16,
            tags: ['delta', 'gamma', 'Greeks'],
          },
          {
            slug: 'theta-vega-rho',
            title: 'Theta, Vega and Rho',
            minutes: 16,
            tags: ['theta', 'vega', 'rho'],
          },
        ],
      },
      {
        slug: 'advanced-market-concepts',
        title: 'Advanced Market Concepts',
        titleHi: 'Advanced Market Concepts',
        summary:
          'Implied vs historical volatility, open interest, order flow, market microstructure, liquidity aur market impact.',
        lessons: [
          {
            slug: 'volatility-and-open-interest',
            title: 'Implied Volatility and Open Interest',
            minutes: 16,
            tags: ['implied volatility', 'open interest', 'VIX'],
          },
          {
            slug: 'order-flow-and-microstructure',
            title: 'Order Flow and Market Microstructure',
            minutes: 16,
            tags: ['order flow', 'market impact', 'spread'],
          },
        ],
      },
      {
        slug: 'algorithmic-trading',
        title: 'Algorithmic Trading',
        titleHi: 'Algorithmic Trading',
        summary:
          'Rule-based systems, historical data, backtest design aur Python se basic financial programming concepts.',
        lessons: [
          {
            slug: 'algo-trading-foundations',
            title: 'Algorithmic Trading Foundations',
            minutes: 15,
            tags: ['algorithmic trading', 'automation'],
          },
          {
            slug: 'python-and-data-analysis',
            title: 'Python and Financial Data Analysis',
            minutes: 18,
            tags: ['Python', 'pandas', 'data analysis'],
          },
        ],
      },
      {
        slug: 'portfolio-risk',
        title: 'Portfolio and Risk Concepts',
        titleHi: 'Portfolio aur Risk Concepts',
        summary:
          'Diversification, asset allocation, correlation, beta, standard deviation, Sharpe ratio aur portfolio drawdown.',
        lessons: [
          {
            slug: 'portfolio-basics',
            title: 'Portfolio Diversification and Asset Allocation',
            minutes: 15,
            tags: ['diversification', 'asset allocation'],
          },
          {
            slug: 'risk-metrics',
            title: 'Beta, Standard Deviation and Sharpe Ratio',
            minutes: 18,
            tags: ['beta', 'standard deviation', 'Sharpe ratio'],
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Derived lookups                                                     */
/* ------------------------------------------------------------------ */

function moduleIdFor(level: number, moduleIndex: number) {
  return `l${level}m${moduleIndex + 1}`;
}

export const courses: Course[] = courseSeeds.map((c) => {
  const lessonCount = c.modules.reduce((n, m) => n + m.lessons.length, 0);
  const minutes = c.modules.reduce((n, m) => n + m.lessons.reduce((s, l) => s + l.minutes, 0), 0);
  return {
    id: c.slug,
    level: c.level,
    slug: c.slug,
    title: c.title,
    titleHi: c.titleHi,
    summary: c.summary,
    difficulty: c.difficulty,
    icon: c.icon,
    accent: c.accent,
    moduleCount: c.modules.length,
    lessonCount,
    estimatedMinutes: minutes,
  };
});

export const modules: Module[] = courseSeeds.flatMap((c) =>
  c.modules.map((m, i) => ({
    id: moduleIdFor(c.level, i),
    courseId: c.slug,
    slug: m.slug,
    title: m.title,
    titleHi: m.titleHi,
    summary: m.summary,
    order: i + 1,
  })),
);

export const lessonMetas: LessonMeta[] = courseSeeds.flatMap((c) =>
  c.modules.flatMap((m, mi) =>
    m.lessons.map((l, li) => ({
      id: `${c.level}/${m.slug}/${l.slug}`,
      courseId: c.slug,
      moduleId: moduleIdFor(c.level, mi),
      slug: l.slug,
      title: l.title,
      difficulty: c.difficulty,
      estimatedMinutes: l.minutes,
      order: li + 1,
      published: l.published !== false,
      tags: l.tags ?? [],
    })),
  ),
);

export const moduleBySlug = new Map(modules.map((m) => [`${m.courseId}/${m.slug}`, m]));
export const courseBySlug = new Map(courses.map((c) => [c.slug, c]));
export const lessonMetaById = new Map(lessonMetas.map((l) => [l.id, l]));

export function modulesForCourse(courseId: string) {
  return modules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function lessonsForModule(moduleId: string) {
  return lessonMetas.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function publishedLessons() {
  return lessonMetas.filter((l) => l.published);
}

/** Flat ordered reading sequence across all published lessons. */
export function readingSequence() {
  return courses.flatMap((c) =>
    modulesForCourse(c.id).flatMap((m) => lessonsForModule(m.id).filter((l) => l.published)),
  );
}

export function findLessonRef(courseSlug: string, moduleSlug: string, lessonSlug: string) {
  const course = courseBySlug.get(courseSlug);
  if (!course) return null;
  const mod = moduleBySlug.get(`${courseSlug}/${moduleSlug}`);
  if (!mod) return null;
  const lesson = lessonMetas.find((l) => l.moduleId === mod.id && l.slug === lessonSlug);
  if (!lesson) return null;
  return { course, module: mod, lesson };
}

export const curriculumStats = {
  levels: courses.length,
  modules: modules.length,
  lessons: lessonMetas.length,
  published: lessonMetas.filter((l) => l.published).length,
  minutes: lessonMetas.filter((l) => l.published).reduce((s, l) => s + l.estimatedMinutes, 0),
};
