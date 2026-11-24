import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CandlestickChart, LineChart, Maximize2, RotateCcw } from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  CardBody,
  PageHeader,
  Pill,
  StatTile,
  cx,
  formatNumber,
} from '../../components/ui';
import { PriceChart } from '../../components/PriceChart';
import {
  SAMPLE_DATA_DISCLAIMER,
  aggregate,
  aggregations,
  describeSeries,
  getSeries,
  sampleInstruments,
  sma,
  type Aggregation,
  type Candle,
} from '../../data/marketSamples';

export default function ChartExplorer() {
  const [instrumentId, setInstrumentId] = useState(sampleInstruments[0].id);
  const [kind, setKind] = useState<'candlestick' | 'line'>('candlestick');
  const [agg, setAgg] = useState<Aggregation>(1);
  const [showVolume, setShowVolume] = useState(true);
  const [showSma20, setShowSma20] = useState(false);
  const [showSma50, setShowSma50] = useState(false);
  const [hovered, setHovered] = useState<Candle | null>(null);
  const [tall, setTall] = useState(false);

  const instrument = sampleInstruments.find((i) => i.id === instrumentId) ?? sampleInstruments[0];
  const daily = useMemo(() => getSeries(instrumentId, 500), [instrumentId]);
  const candles = useMemo(() => aggregate(daily, agg), [daily, agg]);
  const stats = useMemo(() => describeSeries(candles), [candles]);

  const overlays = useMemo(() => {
    const closes = candles.map((c) => c.close);
    const out = [];
    if (showSma20) {
      const vals = sma(closes, 20);
      out.push({
        id: 'sma20',
        color: '#648CFF',
        title: 'SMA 20',
        points: vals
          .map((v, i) => (v !== null ? { time: candles[i].time, value: v } : null))
          .filter((p): p is { time: number; value: number } => p !== null),
      });
    }
    if (showSma50) {
      const vals = sma(closes, 50);
      out.push({
        id: 'sma50',
        color: '#B49BFF',
        title: 'SMA 50',
        points: vals
          .map((v, i) => (v !== null ? { time: candles[i].time, value: v } : null))
          .filter((p): p is { time: number; value: number } => p !== null),
      });
    }
    return out;
  }, [candles, showSma20, showSma50]);

  const onCrosshair = useCallback((c: Candle | null) => setHovered(c), []);

  const last = candles[candles.length - 1];
  const shown = hovered ?? last;

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
        eyebrow="Trading Lab · Tool 01"
        title="Chart Explorer"
        description="Candlestick aur line charts par chart-reading practice karein. Aggregation badal kar dekhein ki same data different timeframes par kaise behave karta hai."
      />

      <Callout tone="warn" title="Sample data only">
        <p>{SAMPLE_DATA_DISCLAIMER}</p>
      </Callout>

      {/* Controls */}
      <Card className="mt-6">
        <CardBody className="space-y-4">
          <div>
            <p className="mb-2 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
              Instrument
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleInstruments.map((i) => (
                <Pill
                  key={i.id}
                  active={i.id === instrumentId}
                  onClick={() => setInstrumentId(i.id)}
                >
                  {i.symbol}
                </Pill>
              ))}
            </div>
            <p className="mt-2 text-[0.72rem] text-text-muted">{instrument.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Chart type
              </p>
              <div className="flex gap-1.5">
                <Pill active={kind === 'candlestick'} onClick={() => setKind('candlestick')}>
                  <span className="flex items-center gap-1">
                    <CandlestickChart aria-hidden="true" className="h-3 w-3" />
                    Candles
                  </span>
                </Pill>
                <Pill active={kind === 'line'} onClick={() => setKind('line')}>
                  <span className="flex items-center gap-1">
                    <LineChart aria-hidden="true" className="h-3 w-3" />
                    Line
                  </span>
                </Pill>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Aggregation
              </p>
              <div className="flex flex-wrap gap-1.5">
                {aggregations.map((a) => (
                  <Pill key={a.value} active={agg === a.value} onClick={() => setAgg(a.value)}>
                    {a.label}
                  </Pill>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Overlays
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Pill active={showVolume} onClick={() => setShowVolume((v) => !v)}>
                  Volume
                </Pill>
                <Pill active={showSma20} onClick={() => setShowSma20((v) => !v)}>
                  SMA 20
                </Pill>
                <Pill active={showSma50} onClick={() => setShowSma50((v) => !v)}>
                  SMA 50
                </Pill>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/8 pt-3">
            <Button variant="secondary" onClick={() => setTall((v) => !v)}>
              <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
              {tall ? 'Normal height' : 'Taller chart'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowSma20(false);
                setShowSma50(false);
                setShowVolume(true);
                setAgg(1);
                setKind('candlestick');
              }}
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Reset view
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Chart */}
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded border border-violet-500/30 bg-violet-500/12 px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-violet-400 uppercase">
              Sample
            </span>
            <p className="text-[0.76rem] font-semibold text-text-primary">
              {instrument.name} · {aggregations.find((a) => a.value === agg)?.label}
            </p>
          </div>
          <p className="tnum flex flex-wrap items-center gap-3 text-[0.7rem] text-text-muted">
            <span>
              O <span className="text-text-secondary">{formatNumber(shown.open)}</span>
            </span>
            <span>
              H <span className="text-up-400">{formatNumber(shown.high)}</span>
            </span>
            <span>
              L <span className="text-down-400">{formatNumber(shown.low)}</span>
            </span>
            <span>
              C <span className="text-text-primary">{formatNumber(shown.close)}</span>
            </span>
            <span>
              V <span className="text-text-secondary">{formatNumber(shown.volume, 0)}</span>
            </span>
          </p>
        </div>
        <div className="p-2 sm:p-3">
          <PriceChart
            candles={candles}
            kind={kind}
            showVolume={showVolume}
            overlays={overlays}
            height={tall ? 620 : 420}
            onCrosshair={onCrosshair}
            ariaLabel={`${kind === 'candlestick' ? 'Candlestick' : 'Line'} chart of synthetic sample instrument ${instrument.name}. ${candles.length} bars. Latest close ${formatNumber(last.close)}. This is synthetic sample data, not a live market feed.`}
          />
        </div>
      </Card>

      {stats && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <StatTile label="Period open" value={formatNumber(stats.open)} />
          <StatTile label="Period close" value={formatNumber(stats.close)} />
          <StatTile label="Period high" value={formatNumber(stats.high)} tone="up" />
          <StatTile label="Period low" value={formatNumber(stats.low)} tone="down" />
          <StatTile
            label="Change"
            value={`${stats.changePct >= 0 ? '+' : ''}${stats.changePct.toFixed(2)}%`}
            tone={stats.changePct >= 0 ? 'up' : 'down'}
          />
          <StatTile label="Bars" value={String(stats.bars)} />
        </div>
      )}

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-text-primary">Chart reading prompts</h2>
        <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed text-text-secondary">
          <li>Kya higher highs / higher lows ka sequence dikh raha hai? Weekly par switch karke compare karein.</li>
          <li>Sabse obvious support aur resistance zones kahan hain? Zone ki width volatility ke hisaab se theek hai?</li>
          <li>Kis candle par volume average se zyada tha, aur uske baad kya hua?</li>
          <li>SMA 20 aur SMA 50 ko on karein — price ka unke relative position kya batata hai?</li>
        </ul>
        <p className={cx('mt-3 text-[0.72rem] text-text-muted')}>
          Note: chart par hover karke OHLC readout dekhein. Crosshair se exact values compare karein.
        </p>
      </Card>
    </div>
  );
}
