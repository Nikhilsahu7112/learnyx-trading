import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Play, RotateCcw } from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  CardBody,
  PageHeader,
  Pill,
  StatTile,
  TableWrap,
  cx,
  formatNumber,
} from '../../components/ui';
import {
  SAMPLE_DATA_DISCLAIMER,
  aggregate,
  aggregations,
  getSeries,
  sampleInstruments,
  type Aggregation,
} from '../../data/marketSamples';
import {
  DEFAULT_STRATEGY,
  describeCondition,
  runBacktest,
  type BacktestResult,
  type StrategyConfig,
} from '../../lib/strategy';
import { readJson, STORAGE_KEYS } from '../../lib/storage';

export default function Backtester() {
  const [instrumentId, setInstrumentId] = useState(sampleInstruments[0].id);
  const [agg, setAgg] = useState<Aggregation>(1);
  const [capital, setCapital] = useState('100000');
  const [riskPct, setRiskPct] = useState('1');
  const [feePct, setFeePct] = useState('0.05');
  const [slippagePct, setSlippagePct] = useState('0.05');
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [ranAt, setRanAt] = useState<string | null>(null);

  const savedConfig = useMemo(
    () => readJson<StrategyConfig>(STORAGE_KEYS.labPrefs, DEFAULT_STRATEGY),
    [],
  );
  const [config] = useState<StrategyConfig>(savedConfig);

  const candles = useMemo(() => aggregate(getSeries(instrumentId, 500), agg), [instrumentId, agg]);
  const instrument = sampleInstruments.find((i) => i.id === instrumentId);

  const numeric = {
    capital: Math.max(1000, Number(capital) || 100000),
    riskPct: Math.min(10, Math.max(0.1, Number(riskPct) || 1)),
    feePct: Math.min(2, Math.max(0, Number(feePct) || 0)),
    slippagePct: Math.min(2, Math.max(0, Number(slippagePct) || 0)),
  };

  function run() {
    const res = runBacktest(candles, config, {
      initialCapital: numeric.capital,
      riskPerTradePct: numeric.riskPct,
      feePct: numeric.feePct,
      slippagePct: numeric.slippagePct,
    });
    setResult(res);
    setRanAt(new Date().toLocaleTimeString('en-IN'));
  }

  const equityPath = useMemo(() => {
    if (!result || result.equityCurve.length < 2) return null;
    const values = result.equityCurve.map((p) => p.equity);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const w = 700;
    const h = 220;
    const pad = 8;
    const pts = values
      .map((v, i) => {
        const x = pad + ((w - pad * 2) * i) / (values.length - 1);
        const y = pad + (h - pad * 2) * (1 - (v - min) / range);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return { pts, w, h, min, max };
  }, [result]);

  return (
    <div>
      <Link
        to="/lab"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-accent-400"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Back to Trading Lab
      </Link>

      <PageHeader
        eyebrow="Trading Lab · Tool 05"
        title="Backtesting Simulator"
        description="Strategy Builder ke rules ko sample data par simulate karein. Fees, slippage aur risk per trade configurable hain — assumptions transparent rakhe gaye hain."
      />

      <Callout tone="warn" title="Hypothetical simulation">
        <p>
          {SAMPLE_DATA_DISCLAIMER} Backtest results past simulation hain. Inhe future returns ka
          evidence na samjhein — overfitting, small samples aur regime change sab results ko invalid
          kar sakte hain.
        </p>
      </Callout>

      <div className="mt-6 grid gap-4 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-3.5 p-4">
              <div>
                <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Instrument
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sampleInstruments.map((i) => (
                    <Pill key={i.id} active={i.id === instrumentId} onClick={() => { setInstrumentId(i.id); setResult(null); }}>
                      {i.symbol}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Timeframe
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {aggregations.map((a) => (
                    <Pill key={a.value} active={agg === a.value} onClick={() => { setAgg(a.value); setResult(null); }}>
                      {a.label}
                    </Pill>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-3 p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Assumptions
              </p>
              <NumRow id="capital" label="Initial capital" value={capital} onChange={setCapital} prefix="₹" />
              <NumRow id="risk" label="Risk per trade" value={riskPct} onChange={setRiskPct} suffix="%" step="0.1" />
              <NumRow id="fee" label="Fee per side" value={feePct} onChange={setFeePct} suffix="%" step="0.01" />
              <NumRow id="slip" label="Slippage per side" value={slippagePct} onChange={setSlippagePct} suffix="%" step="0.01" />
              <p className="text-[0.66rem] leading-relaxed text-text-muted">
                Entry next bar ke open par hoti hai (slippage ke saath). Agar ek hi bar me stop aur
                target dono hit hon, stop pehle maana jaata hai — conservative assumption.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Strategy loaded
              </p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{config.name}</p>
              <ul className="mt-2 space-y-1">
                {config.entryConditions.map((c) => (
                  <li key={c.id} className="text-[0.7rem] leading-relaxed text-text-muted">
                    <span className="text-accent-400">Entry:</span> {describeCondition(c)}
                  </li>
                ))}
                {config.exitConditions.map((c) => (
                  <li key={c.id} className="text-[0.7rem] leading-relaxed text-text-muted">
                    <span className="text-violet-400">Exit:</span> {describeCondition(c)}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col gap-1.5">
                <Button className="w-full" onClick={run}>
                  <Play aria-hidden="true" className="h-3.5 w-3.5" />
                  Run backtest
                </Button>
                <Link
                  to="/lab/strategy"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-[0.7rem] font-semibold text-text-secondary hover:bg-white/9 hover:text-text-primary"
                >
                  Edit rules
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0 space-y-4">
          {!result ? (
            <Card className="p-10 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-white/5">
                <Play aria-hidden="true" className="h-5 w-5 text-accent-400" />
              </div>
              <p className="mt-4 text-sm font-semibold text-text-primary">Backtest not run yet</p>
              <p className="mx-auto mt-1.5 max-w-sm text-[0.8rem] leading-relaxed text-text-muted">
                Assumptions set karke "Run backtest" dabayein. {candles.length} bars of sample data
                par simulation hogi.
              </p>
            </Card>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[0.72rem] text-text-muted">
                  {instrument?.name} · {aggregations.find((a) => a.value === agg)?.label} ·{' '}
                  {candles.length} bars · run at {ranAt}
                </p>
                <Button variant="ghost" className="text-[0.7rem]" onClick={() => setResult(null)}>
                  <RotateCcw aria-hidden="true" className="h-3 w-3" />
                  Clear
                </Button>
              </div>

              {result.warnings.length > 0 && (
                <div className="rounded-xl border border-warn-500/30 bg-warn-500/[0.07] p-3.5">
                  <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-warn-500">
                    <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
                    Caveats
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {result.warnings.map((w) => (
                      <li key={w} className="text-[0.75rem] leading-relaxed text-text-secondary">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                <StatTile
                  label="Total return"
                  value={`${result.metrics.totalReturn >= 0 ? '+' : ''}${result.metrics.totalReturn.toFixed(2)}%`}
                  tone={result.metrics.totalReturn >= 0 ? 'up' : 'down'}
                />
                <StatTile label="Trades" value={String(result.metrics.trades)} />
                <StatTile label="Win rate" value={`${result.metrics.winRate.toFixed(1)}%`} />
                <StatTile
                  label="Profit factor"
                  value={result.metrics.profitFactor === null ? '—' : result.metrics.profitFactor.toFixed(2)}
                  tone={
                    result.metrics.profitFactor === null
                      ? 'neutral'
                      : result.metrics.profitFactor >= 1
                        ? 'up'
                        : 'down'
                  }
                />
                <StatTile label="Max drawdown" value={`−${result.metrics.maxDrawdown.toFixed(1)}%`} tone="down" />
                <StatTile label="Expectancy / trade" value={`${result.metrics.expectancy >= 0 ? '+' : ''}${result.metrics.expectancy.toFixed(2)}R`} />
                <StatTile label="Avg bars held" value={result.metrics.avgBars.toFixed(1)} />
                <StatTile label="Exposure" value={`${result.metrics.exposure.toFixed(1)}%`} />
              </div>

              {equityPath && (
                <Card className="overflow-hidden">
                  <div className="border-b border-white/8 px-4 py-2.5">
                    <p className="text-[0.76rem] font-semibold text-text-primary">Equity curve</p>
                    <p className="text-[0.66rem] text-text-muted">
                      Hypothetical account value · {formatNumber(equityPath.min, 0)} to{' '}
                      {formatNumber(equityPath.max, 0)}
                    </p>
                  </div>
                  <div className="p-3">
                    <svg
                      viewBox={`0 0 ${equityPath.w} ${equityPath.h}`}
                      className="w-full"
                      role="img"
                      aria-label={`Hypothetical equity curve with ${result.metrics.trades} trades, ending at ${formatNumber(result.equityCurve[result.equityCurve.length - 1]?.equity ?? 0, 0)}.`}
                    >
                      <g stroke="rgba(255,255,255,0.05)">
                        {[0.25, 0.5, 0.75].map((f) => (
                          <line
                            key={f}
                            x1="0"
                            x2={equityPath.w}
                            y1={equityPath.h * f}
                            y2={equityPath.h * f}
                          />
                        ))}
                      </g>
                      <polyline
                        points={equityPath.pts}
                        fill="none"
                        stroke={result.metrics.totalReturn >= 0 ? '#4DD3A3' : '#FF7C86'}
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Card>
              )}

              <Card className="overflow-hidden">
                <div className="border-b border-white/8 px-4 py-2.5">
                  <p className="text-[0.76rem] font-semibold text-text-primary">
                    Trades ({result.trades.length})
                  </p>
                </div>
                {result.trades.length === 0 ? (
                  <p className="px-4 py-8 text-center text-[0.8rem] text-text-muted">
                    In rules ne koi trade generate nahi kiya. Conditions looser karein ya timeframe
                    badlein.
                  </p>
                ) : (
                  <div className="max-h-96 overflow-auto">
                    <TableWrap
                      headers={['#', 'Entry', 'Exit', 'Bars', 'Return', 'Exit reason']}
                      rows={result.trades.slice(-40).reverse().map((t, i) => [
                        <span key="n" className="tnum text-text-muted">{result.trades.length - i}</span>,
                        <span key="e" className="tnum">{formatNumber(t.entryPrice)}</span>,
                        <span key="x" className="tnum">{formatNumber(t.exitPrice)}</span>,
                        <span key="b" className="tnum">{t.bars}</span>,
                        <span
                          key="r"
                          className={cx('tnum font-semibold', t.returnPct >= 0 ? 'text-up-400' : 'text-down-400')}
                        >
                          {t.returnPct >= 0 ? '+' : ''}
                          {t.returnPct.toFixed(2)}%
                        </span>,
                        <span key="why" className="text-[0.7rem] text-text-muted">{t.exitReason}</span>,
                      ])}
                      caption={
                        result.trades.length > 40
                          ? `Last 40 of ${result.trades.length} trades shown.`
                          : undefined
                      }
                    />
                  </div>
                )}
              </Card>

              <Card>
                <CardBody>
                  <h2 className="text-sm font-semibold text-text-primary">
                    Ye results kya nahi batate
                  </h2>
                  <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed text-text-secondary">
                    <li>Sample data synthetic hai — real market microstructure, gaps aur news events missing hain.</li>
                    <li>Chhote samples par win rate aur PF random noise se dominate hote hain.</li>
                    <li>Parameters isi data par tune karna overfitting hai — out-of-sample test zaroori hai.</li>
                    <li>Fees/slippage estimates real execution se alag honge (liquidity, spreads, impact).</li>
                    <li>Past simulation future performance ki guarantee nahi deta — koi bhi claim aisa nahi hai.</li>
                  </ul>
                </CardBody>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NumRow({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 'any',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.7rem] font-medium text-text-secondary">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded-lg border border-white/12 bg-white/4 px-2.5 focus-within:border-accent-500/60">
        {prefix && <span className="text-[0.7rem] text-text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tnum w-full bg-transparent py-1.5 text-[0.78rem] text-text-primary focus:outline-none"
        />
        {suffix && <span className="text-[0.7rem] text-text-muted">{suffix}</span>}
      </div>
    </div>
  );
}
