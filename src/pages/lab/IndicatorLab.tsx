import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import {
  Callout,
  Card,
  CardBody,
  PageHeader,
  Pill,
  formatNumber,
} from '../../components/ui';
import { PriceChart, type OverlayLine } from '../../components/PriceChart';
import {
  SAMPLE_DATA_DISCLAIMER,
  atr,
  bollinger,
  ema,
  getSeries,
  macd,
  rsi,
  sampleInstruments,
  sma,
  vwapSeries,
} from '../../data/marketSamples';
import { indicatorDocs } from '../../lib/search';

type IndicatorId = 'sma' | 'ema' | 'rsi' | 'macd' | 'bollinger' | 'vwap' | 'atr';

const OVERLAY_INDICATORS: IndicatorId[] = ['sma', 'ema', 'bollinger', 'vwap'];

export default function IndicatorLab() {
  const [instrumentId, setInstrumentId] = useState(sampleInstruments[0].id);
  const [indicator, setIndicator] = useState<IndicatorId>('sma');
  const [primaryPeriod, setPrimaryPeriod] = useState(20);
  const [fast, setFast] = useState(12);
  const [slow, setSlow] = useState(26);
  const [signalPeriod, setSignalPeriod] = useState(9);
  const [mult, setMult] = useState(2);
  const [showPrice, setShowPrice] = useState(true);

  const candles = useMemo(() => getSeries(instrumentId, 400), [instrumentId]);
  const closes = useMemo(() => candles.map((c) => c.close), [candles]);
  const doc = indicatorDocs.find((d) => d.id === indicator);
  const isOverlay = OVERLAY_INDICATORS.includes(indicator);

  const computed = useMemo(() => {
    switch (indicator) {
      case 'sma':
        return { main: sma(closes, primaryPeriod) };
      case 'ema':
        return { main: ema(closes, primaryPeriod) };
      case 'rsi':
        return { main: rsi(closes, primaryPeriod) };
      case 'atr':
        return { main: atr(candles, primaryPeriod) };
      case 'vwap':
        return { main: vwapSeries(candles, Math.max(2, primaryPeriod)) };
      case 'bollinger':
        return bollinger(closes, primaryPeriod, mult);
      case 'macd':
        return macd(closes, fast, slow, signalPeriod);
      default:
        return { main: [] as (number | null)[] };
    }
  }, [indicator, closes, candles, primaryPeriod, fast, slow, signalPeriod, mult]);

  const overlays: OverlayLine[] = useMemo(() => {
    if (!isOverlay) return [];
    const out: OverlayLine[] = [];
    const pushSeries = (vals: (number | null)[], color: string, title: string, id: string) => {
      const points = vals
        .map((v, i) => (v !== null ? { time: candles[i].time, value: v } : null))
        .filter((p): p is { time: number; value: number } => p !== null);
      if (points.length) out.push({ id, color, title, points });
    };

    if (indicator === 'bollinger') {
      const b = computed as ReturnType<typeof bollinger>;
      pushSeries(b.upper, '#FF7C86', 'Upper', 'bb-upper');
      pushSeries(b.mid, '#648CFF', 'Mid', 'bb-mid');
      pushSeries(b.lower, '#4DD3A3', 'Lower', 'bb-lower');
    } else if (indicator === 'vwap') {
      pushSeries((computed as { main: (number | null)[] }).main, '#B49BFF', 'VWAP', 'vwap');
    } else {
      pushSeries(
        (computed as { main: (number | null)[] }).main,
        indicator === 'ema' ? '#B49BFF' : '#648CFF',
        indicator.toUpperCase(),
        indicator,
      );
    }
    return out;
  }, [computed, indicator, isOverlay, candles]);

  /* Latest values for the readout panel */
  const readout = useMemo(() => {
    const last = <T,>(arr: T[]) => (arr.length ? arr[arr.length - 1] : undefined);
    const fmt = (v: unknown) =>
      typeof v === 'number' && Number.isFinite(v) ? formatNumber(v) : '—';

    switch (indicator) {
      case 'sma':
      case 'ema':
      case 'vwap':
        return [
          { label: `${indicator.toUpperCase()}(${primaryPeriod})`, value: fmt(last((computed as { main: (number | null)[] }).main)) },
          { label: 'Latest close', value: fmt(closes[closes.length - 1]) },
        ];
      case 'rsi': {
        const v = last((computed as { main: (number | null)[] }).main);
        return [
          { label: `RSI(${primaryPeriod})`, value: fmt(v) },
          {
            label: 'Zone',
            value:
              typeof v === 'number' ? (v >= 70 ? 'Overbought' : v <= 30 ? 'Oversold' : 'Neutral') : '—',
          },
        ];
      }
      case 'bollinger': {
        const b = computed as ReturnType<typeof bollinger>;
        return [
          { label: 'Upper band', value: fmt(last(b.upper)) },
          { label: 'Middle (SMA)', value: fmt(last(b.mid)) },
          { label: 'Lower band', value: fmt(last(b.lower)) },
        ];
      }
      case 'macd': {
        const m = computed as ReturnType<typeof macd>;
        return [
          { label: 'MACD line', value: fmt(last(m.macdLine)) },
          { label: 'Signal line', value: fmt(last(m.signal)) },
          { label: 'Histogram', value: fmt(last(m.histogram)) },
        ];
      }
      case 'atr':
        return [
          { label: `ATR(${primaryPeriod})`, value: fmt(last((computed as { main: (number | null)[] }).main)) },
          { label: 'Latest close', value: fmt(closes[closes.length - 1]) },
        ];
      default:
        return [];
    }
  }, [computed, indicator, closes, primaryPeriod]);

  /* Mini series chart for oscillators (RSI / MACD / ATR) */
  const miniSeries = useMemo(() => {
    if (indicator === 'rsi') return (computed as { main: (number | null)[] }).main;
    if (indicator === 'atr') return (computed as { main: (number | null)[] }).main;
    if (indicator === 'macd') return (computed as ReturnType<typeof macd>).histogram;
    return null;
  }, [indicator, computed]);

  const periodLimit = indicator === 'ema' || indicator === 'sma' ? 200 : 100;

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
        eyebrow="Trading Lab · Tool 03"
        title="Indicator Laboratory"
        description="Har popular indicator ka parameter badal kar dekhein ki output kaise change hota hai. Parameter choice ka effect samajhna indicator ke formula se zyada important hai."
      />

      <Callout tone="warn" title="Sample data only">
        <p>{SAMPLE_DATA_DISCLAIMER}</p>
      </Callout>

      <div className="mt-6 grid gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card>
            <CardBody className="p-4">
              <p className="mb-2 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Indicator
              </p>
              <div className="flex flex-wrap gap-1.5">
                {indicatorDocs.map((d) => (
                  <Pill
                    key={d.id}
                    active={indicator === d.id}
                    onClick={() => {
                      setIndicator(d.id as IndicatorId);
                      setPrimaryPeriod(d.id === 'vwap' ? 20 : d.id === 'macd' ? 12 : 20);
                    }}
                  >
                    {d.id.toUpperCase()}
                  </Pill>
                ))}
              </div>

              <div className="mt-4">
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
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4 p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Parameters
              </p>

              {indicator === 'macd' ? (
                <>
                  <SliderField
                    label="Fast EMA"
                    value={fast}
                    min={2}
                    max={40}
                    onChange={setFast}
                  />
                  <SliderField
                    label="Slow EMA"
                    value={slow}
                    min={5}
                    max={80}
                    onChange={setSlow}
                  />
                  <SliderField
                    label="Signal period"
                    value={signalPeriod}
                    min={2}
                    max={30}
                    onChange={setSignalPeriod}
                  />
                  {fast >= slow && (
                    <p className="text-[0.7rem] text-down-400">
                      Fast EMA slow EMA se chhoti honi chahiye.
                    </p>
                  )}
                </>
              ) : (
                <SliderField
                  label={`Period`}
                  value={primaryPeriod}
                  min={2}
                  max={periodLimit}
                  onChange={setPrimaryPeriod}
                  hint={
                    indicator === 'vwap'
                      ? 'Reset window (bars).'
                      : 'Chhota period = zyada reactive, zyada noise.'
                  }
                />
              )}

              {indicator === 'bollinger' && (
                <SliderField
                  label="Std dev multiplier"
                  value={mult}
                  min={1}
                  max={4}
                  step={0.5}
                  onChange={setMult}
                />
              )}

              <div className="space-y-1.5 border-t border-white/8 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPrice((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-[0.75rem] text-text-secondary hover:text-text-primary"
                >
                  <span>Show price chart</span>
                  {showPrice ? (
                    <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPrimaryPeriod(20);
                    setFast(12);
                    setSlow(26);
                    setSignalPeriod(9);
                    setMult(2);
                  }}
                  className="w-full rounded-lg border border-white/10 bg-white/4 px-2 py-1.5 text-[0.7rem] text-text-muted hover:bg-white/8 hover:text-text-secondary"
                >
                  Reset to textbook defaults
                </button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                <Info aria-hidden="true" className="h-3 w-3 text-accent-400" />
                Latest values
              </p>
              <div className="mt-2 space-y-1.5">
                {readout.map((r) => (
                  <div key={r.label} className="flex justify-between gap-2 text-[0.73rem]">
                    <span className="text-text-muted">{r.label}</span>
                    <span className="tnum font-semibold text-text-primary">{r.value}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0 space-y-4">
          {isOverlay ? (
            <Card className="overflow-hidden">
              <div className="border-b border-white/8 px-4 py-2.5">
                <p className="text-[0.76rem] font-semibold text-text-primary">
                  {doc?.title ?? indicator.toUpperCase()} overlaid on sample price
                </p>
              </div>
              <div className="p-2 sm:p-3">
                <PriceChart
                  candles={candles}
                  kind="candlestick"
                  showVolume={false}
                  overlays={showPrice ? overlays : []}
                  height={440}
                  ariaLabel={`Candlestick chart with ${indicator.toUpperCase()} indicator overlay. Synthetic sample data, not live market data.`}
                />
              </div>
            </Card>
          ) : (
            <>
              <Card className="overflow-hidden">
                <div className="border-b border-white/8 px-4 py-2.5">
                  <p className="text-[0.76rem] font-semibold text-text-primary">
                    Sample price (context)
                  </p>
                </div>
                <div className="p-2 sm:p-3">
                  <PriceChart
                    candles={candles}
                    kind="line"
                    showVolume={false}
                    height={showPrice ? 260 : 400}
                    ariaLabel="Line chart of synthetic sample closing prices, shown for context."
                  />
                </div>
              </Card>
              <Card className="overflow-hidden">
                <div className="border-b border-white/8 px-4 py-2.5">
                  <p className="text-[0.76rem] font-semibold text-text-primary">
                    {indicator.toUpperCase()} output
                  </p>
                </div>
                <div className="p-4">
                  <MiniSeries
                    values={miniSeries ?? []}
                    kind={indicator as 'rsi' | 'atr' | 'macd'}
                  />
                </div>
              </Card>
            </>
          )}

          {doc && (
            <Card>
              <CardBody>
                <h2 className="text-sm font-semibold text-text-primary">{doc.title}</h2>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
                  {doc.explanation}
                </p>
                {doc.interpretation && (
                  <>
                    <p className="mt-3 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                      Reading it
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-text-secondary">
                      {doc.interpretation}
                    </p>
                  </>
                )}
                {doc.caveat && (
                  <div className="mt-3 rounded-lg border border-warn-500/25 bg-warn-500/[0.07] px-3 py-2.5">
                    <p className="text-[0.66rem] font-semibold tracking-wide text-warn-500 uppercase">
                      Limitation
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-text-secondary">
                      {doc.caveat}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[0.72rem] font-semibold text-text-secondary" htmlFor={`slider-${label}`}>
          {label}
        </label>
        <span className="tnum rounded border border-white/10 bg-white/5 px-1.5 text-[0.7rem] font-semibold text-text-primary">
          {value}
        </span>
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#648CFF]"
      />
      {hint && <p className="mt-1 text-[0.66rem] text-text-muted">{hint}</p>}
    </div>
  );
}

/** Simple SVG sparkline for oscillator outputs. */
function MiniSeries({ values, kind }: { values: (number | null)[]; kind: 'rsi' | 'atr' | 'macd' }) {
  const finite = values.filter((v): v is number => v !== null && Number.isFinite(v));
  if (finite.length < 2) {
    return <p className="py-10 text-center text-[0.76rem] text-text-muted">Not enough data to plot.</p>;
  }

  const min = kind === 'rsi' ? 0 : Math.min(...finite);
  const max = kind === 'rsi' ? 100 : Math.max(...finite);
  const range = max - min || 1;
  const w = 640;
  const h = 180;
  const pad = 6;

  const points = values
    .map((v, i) => {
      if (v === null) return null;
      const x = pad + ((w - pad * 2) * i) / (values.length - 1);
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .filter((p): p is string => p !== null)
    .join(' ');

  const zeroY =
    kind === 'macd' ? pad + (h - pad * 2) * (1 - (0 - min) / range) : null;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label={`${kind.toUpperCase()} oscillator line over ${values.length} bars. Value range ${formatNumber(min)} to ${formatNumber(max)}.`}
    >
      {kind === 'rsi' && (
        <>
          <line x1="0" x2={w} y1={pad + (h - pad * 2) * 0.3} y2={pad + (h - pad * 2) * 0.3} stroke="rgba(255,124,134,0.3)" strokeDasharray="3 3" />
          <line x1="0" x2={w} y1={pad + (h - pad * 2) * 0.7} y2={pad + (h - pad * 2) * 0.7} stroke="rgba(77,211,163,0.3)" strokeDasharray="3 3" />
          <text x="4" y={pad + (h - pad * 2) * 0.3 - 3} fill="#FF7C86" fontSize="8">70</text>
          <text x="4" y={pad + (h - pad * 2) * 0.7 + 10} fill="#4DD3A3" fontSize="8">30</text>
        </>
      )}
      {zeroY !== null && (
        <line x1="0" x2={w} y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.16)" strokeDasharray="2 2" />
      )}
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1="0"
          x2={w}
          y1={pad + (h - pad * 2) * f}
          y2={pad + (h - pad * 2) * f}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      <polyline
        points={points}
        fill="none"
        stroke={kind === 'rsi' ? '#9B7BFF' : kind === 'macd' ? '#648CFF' : '#4DD3A3'}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
