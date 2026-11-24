import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CandlestickChart,
  LineChart,
  Target,
  Wallet,
  SlidersHorizontal,
  Gauge,
  FlaskConical,
} from 'lucide-react';
import { Callout, Card, CardBody, PageHeader, Tag } from '../components/ui';
import { SAMPLE_DATA_DISCLAIMER } from '../data/marketSamples';

const tools = [
  {
    to: '/lab/charts',
    icon: CandlestickChart,
    title: 'Chart Explorer',
    description:
      'Candlestick aur line charts, daily/weekly aggregation, volume, crosshair, zoom aur pan. OHLC readouts ke saath chart reading practice karein.',
    features: ['Candlestick & line', 'Aggregations', 'Volume pane', 'OHLC readout'],
    ready: true,
  },
  {
    to: '/lab/patterns',
    icon: Target,
    title: 'Candlestick Pattern Trainer',
    description:
      'Pattern dikhega — aap identify karein, phir explanation aur similar patterns dekhein. Session score track hota hai.',
    features: ['14 patterns', 'Instant explanation', 'Session score', 'Similar patterns'],
    ready: true,
  },
  {
    to: '/lab/indicators',
    icon: LineChart,
    title: 'Indicator Laboratory',
    description:
      'SMA, EMA, RSI, MACD, Bollinger Bands, VWAP aur ATR ke parameters badal kar live observe karein ki indicator kaise badalta hai.',
    features: ['7 indicators', 'Live parameters', 'Overlay & panes', 'Explanations'],
    ready: true,
  },
  {
    to: '/lab/strategy',
    icon: SlidersHorizontal,
    title: 'Strategy Builder',
    description:
      'Indicator, condition, entry, exit, stop aur target define karein. Rules readable format me dikhenge — koi recommendation nahi.',
    features: ['Rule composition', 'Readable output', 'Validation', 'Handoff to backtest'],
    ready: true,
  },
  {
    to: '/lab/backtest',
    icon: Gauge,
    title: 'Historical Backtesting Simulator',
    description:
      'Sample data par rules simulate karein. Fees aur slippage configurable hain. Sab outputs historical simulation hain, predictions nahi.',
    features: ['Configurable costs', 'Win rate & PF', 'Max drawdown', 'Equity curve'],
    ready: true,
  },
  {
    to: '/lab/paper',
    icon: Wallet,
    title: 'Paper Trading Simulator',
    description:
      'Virtual balance ke saath simulated positions, entry/exit aur P&L. Koi real money, koi brokerage, koi real order nahi.',
    features: ['Virtual balance', 'Long & short', 'Trade history', 'Reset anytime'],
    ready: true,
  },
];

export default function TradingLab() {
  return (
    <div>
      <PageHeader
        eyebrow="Trading Lab"
        title="Practice market skills without risking capital"
        description="Chhe interactive tools — sab educational, sab virtual. Yahan koi real order execute nahi hota, koi brokerage connected nahi hai, aur saara data clearly labelled sample data hai."
        actions={
          <div className="glass-subtle rounded-xl px-4 py-3">
            <p className="text-[0.65rem] font-medium tracking-wide text-text-muted uppercase">
              No login required
            </p>
            <p className="mt-1 text-sm font-semibold text-text-primary">Everything runs locally</p>
          </div>
        }
      />

      <Callout tone="warn" title="Sample data, not live markets">
        <p>{SAMPLE_DATA_DISCLAIMER}</p>
      </Callout>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Card key={t.to} interactive className="flex flex-col">
            <CardBody className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/6">
                  <t.icon aria-hidden="true" className="h-4.5 w-4.5 text-accent-400" />
                </span>
                <Tag className="border-up-500/30 bg-up-500/10 text-up-400">Available</Tag>
              </div>
              <h2 className="mt-4 text-base font-semibold text-text-primary">{t.title}</h2>
              <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-text-secondary">
                {t.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.features.map((f) => (
                  <Tag key={f}>{f}</Tag>
                ))}
              </div>
              <Link
                to={t.to}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
              >
                Open tool
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-5">
        <div className="flex items-start gap-3">
          <FlaskConical aria-hidden="true" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-400" />
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Lab ka honest scope</h2>
            <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed text-text-secondary">
              <li>Sab tools browser me chalte hain — koi data server par nahi jaata.</li>
              <li>Paper trading ka data aapke browser ke local storage me rehta hai.</li>
              <li>Simulation results future returns ka koi indication nahi dete.</li>
              <li>Yahan koi strategy recommendation ya signal service nahi hai.</li>
              <li>Real trading ke liye alag skill, capital aur regulatory requirements hain.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
