import {
  atr,
  bollinger,
  ema,
  rsi,
  sma,
  type Candle,
} from '../data/marketSamples';

/**
 * A deliberately small, transparent rule engine for the Strategy Builder and
 * Backtesting Simulator. Every rule is a simple comparison evaluated on the
 * close of a bar, with no look-ahead: a signal generated on bar t is executed
 * on the open of bar t+1 (with slippage), which is how we keep the simulation
 * honest.
 */

export type OperandKind =
  | 'price'
  | 'sma'
  | 'ema'
  | 'rsi'
  | 'atr'
  | 'bbUpper'
  | 'bbLower'
  | 'bbMid'
  | 'constant';

export type CompareOp = 'gt' | 'lt' | 'crossUp' | 'crossDown';

export interface Operand {
  kind: OperandKind;
  period?: number;
  value?: number;
}

export interface Condition {
  id: string;
  left: Operand;
  op: CompareOp;
  right: Operand;
}

export interface StrategyConfig {
  name: string;
  direction: 'long' | 'short';
  entryConditions: Condition[];
  exitConditions: Condition[];
  stopMode: 'percent' | 'atr';
  stopValue: number;
  targetMode: 'percent' | 'rr' | 'none';
  targetValue: number;
  maxBarsInTrade: number;
}

export const OPERAND_LABELS: Record<OperandKind, string> = {
  price: 'Close price',
  sma: 'SMA',
  ema: 'EMA',
  rsi: 'RSI',
  atr: 'ATR',
  bbUpper: 'Bollinger upper',
  bbLower: 'Bollinger lower',
  bbMid: 'Bollinger middle',
  constant: 'Fixed value',
};

export const OP_LABELS: Record<CompareOp, string> = {
  gt: 'is greater than',
  lt: 'is less than',
  crossUp: 'crosses above',
  crossDown: 'crosses below',
};

export function describeOperand(o: Operand): string {
  if (o.kind === 'constant') return String(o.value ?? 0);
  const period = o.period ?? 20;
  switch (o.kind) {
    case 'price':
      return 'Close';
    case 'sma':
      return `SMA(${period})`;
    case 'ema':
      return `EMA(${period})`;
    case 'rsi':
      return `RSI(${period})`;
    case 'atr':
      return `ATR(${period})`;
    case 'bbUpper':
      return `BB Upper(${period})`;
    case 'bbLower':
      return `BB Lower(${period})`;
    case 'bbMid':
      return `BB Mid(${period})`;
    default:
      return o.kind;
  }
}

export function describeCondition(c: Condition): string {
  return `${describeOperand(c.left)} ${OP_LABELS[c.op]} ${describeOperand(c.right)}`;
}

/* ------------------------------------------------------------------ */
/* Series cache                                                        */
/* ------------------------------------------------------------------ */

function seriesFor(kind: OperandKind, period: number, candles: Candle[], closes: number[]) {
  switch (kind) {
    case 'price':
      return closes;
    case 'sma':
    case 'bbMid':
      return sma(closes, period);
    case 'ema':
      return ema(closes, period);
    case 'rsi':
      return rsi(closes, period);
    case 'atr':
      return atr(candles, period);
    case 'bbUpper':
      return bollinger(closes, period, 2).upper;
    case 'bbLower':
      return bollinger(closes, period, 2).lower;
    case 'constant':
    default:
      return [];
  }
}

function valueAt(o: Operand, i: number, candles: Candle[], closes: number[]): number | null {
  if (o.kind === 'constant') return o.value ?? 0;
  const period = o.period ?? 20;
  const arr = seriesFor(o.kind, period, candles, closes);
  const v = arr[i];
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export function evaluateCondition(
  c: Condition,
  i: number,
  candles: Candle[],
  closes: number[],
): boolean {
  if (i < 1) return false;
  const l = valueAt(c.left, i, candles, closes);
  const r = valueAt(c.right, i, candles, closes);
  const lPrev = valueAt(c.left, i - 1, candles, closes);
  const rPrev = valueAt(c.right, i - 1, candles, closes);
  if (l === null || r === null) return false;

  switch (c.op) {
    case 'gt':
      return l > r;
    case 'lt':
      return l < r;
    case 'crossUp':
      return lPrev !== null && rPrev !== null && lPrev <= rPrev && l > r;
    case 'crossDown':
      return lPrev !== null && rPrev !== null && lPrev >= rPrev && l < r;
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/* Backtest                                                            */
/* ------------------------------------------------------------------ */

export interface BacktestTrade {
  entryIndex: number;
  exitIndex: number;
  entryTime: number;
  exitTime: number;
  entryPrice: number;
  exitPrice: number;
  direction: 'long' | 'short';
  bars: number;
  returnPct: number;
  exitReason: 'stop' | 'target' | 'rule' | 'timeout' | 'end';
  maePct: number;
  mfePct: number;
}

export interface BacktestResult {
  trades: BacktestTrade[];
  equityCurve: { time: number; equity: number }[];
  metrics: {
    trades: number;
    wins: number;
    losses: number;
    winRate: number;
    avgWin: number;
    avgLoss: number;
    profitFactor: number | null;
    expectancy: number;
    totalReturn: number;
    maxDrawdown: number;
    avgBars: number;
    exposure: number;
  };
  warnings: string[];
}

export interface BacktestOptions {
  initialCapital: number;
  riskPerTradePct: number;
  feePct: number;
  slippagePct: number;
}

export function runBacktest(
  candles: Candle[],
  config: StrategyConfig,
  options: BacktestOptions,
): BacktestResult {
  const closes = candles.map((c) => c.close);
  const trades: BacktestTrade[] = [];
  const warnings: string[] = [];
  const equityCurve: { time: number; equity: number }[] = [];

  if (config.entryConditions.length === 0) {
    warnings.push('Koi entry condition define nahi hai — trades generate nahi honge.');
  }

  let cash = options.initialCapital;
  let position: {
    entryIndex: number;
    entryPrice: number;
    stop: number;
    target: number | null;
    qty: number;
    mae: number;
    mfe: number;
  } | null = null;

  const slippage = options.slippagePct / 100;
  const fee = options.feePct / 100;
  const warmup = Math.max(
    30,
    ...config.entryConditions.flatMap((c) => [
      c.left.kind === 'constant' ? 0 : (c.left.period ?? 20),
      c.right.kind === 'constant' ? 0 : (c.right.period ?? 20),
    ]),
  );

  for (let i = warmup; i < candles.length; i++) {
    const bar = candles[i];

    // 1. Manage an open position using this bar's high/low.
    if (position) {
      const isLong = config.direction === 'long';
      // Track excursion.
      const favorable = isLong
        ? ((bar.high - position.entryPrice) / position.entryPrice) * 100
        : ((position.entryPrice - bar.low) / position.entryPrice) * 100;
      const adverse = isLong
        ? ((position.entryPrice - bar.low) / position.entryPrice) * 100
        : ((bar.high - position.entryPrice) / position.entryPrice) * 100;
      position.mfe = Math.max(position.mfe, favorable);
      position.mae = Math.max(position.mae, adverse);

      let exitPrice: number | null = null;
      let exitReason: BacktestTrade['exitReason'] | null = null;

      // Conservative assumption: when both stop and target are inside the same
      // bar, assume the stop was hit first.
      const hitStop = isLong ? bar.low <= position.stop : bar.high >= position.stop;
      const hitTarget =
        position.target !== null &&
        (isLong ? bar.high >= position.target : bar.low <= position.target);

      if (hitStop) {
        exitPrice = position.stop;
        exitReason = 'stop';
      } else if (hitTarget && position.target !== null) {
        exitPrice = position.target;
        exitReason = 'target';
      } else if (i - position.entryIndex >= config.maxBarsInTrade) {
        exitPrice = bar.close;
        exitReason = 'timeout';
      } else if (
        config.exitConditions.length > 0 &&
        config.exitConditions.every((c) => evaluateCondition(c, i, candles, closes))
      ) {
        exitPrice = bar.close;
        exitReason = 'rule';
      }

      if (exitPrice !== null && exitReason) {
        const applySlippage = exitPrice * (isLong ? 1 - slippage : 1 + slippage);
        const grossReturn = isLong
          ? (applySlippage - position.entryPrice) / position.entryPrice
          : (position.entryPrice - applySlippage) / position.entryPrice;
        const netReturn = grossReturn - fee * 2;
        const pnl = position.qty * (applySlippage - position.entryPrice) * (isLong ? 1 : -1);
        cash += pnl;
        trades.push({
          entryIndex: position.entryIndex,
          exitIndex: i,
          entryTime: candles[position.entryIndex].time,
          exitTime: bar.time,
          entryPrice: position.entryPrice,
          exitPrice: applySlippage,
          direction: config.direction,
          bars: i - position.entryIndex,
          returnPct: netReturn * 100,
          exitReason,
          maePct: position.mae,
          mfePct: position.mfe,
        });
        position = null;
      }
    }

    // 2. Look for an entry signal on this bar's close; execute next bar's open.
    if (!position && i + 1 < candles.length) {
      const all = config.entryConditions.every((c) => evaluateCondition(c, i, candles, closes));
      if (all && config.entryConditions.length > 0) {
        const nextOpen = candles[i + 1].open;
        const entryPrice = nextOpen * (config.direction === 'long' ? 1 + slippage : 1 - slippage);

        let stop: number;
        if (config.stopMode === 'atr') {
          const atrVal = valueAt({ kind: 'atr', period: 14 }, i, candles, closes) ?? entryPrice * 0.02;
          stop =
            config.direction === 'long'
              ? entryPrice - atrVal * config.stopValue
              : entryPrice + atrVal * config.stopValue;
        } else {
          stop =
            config.direction === 'long'
              ? entryPrice * (1 - config.stopValue / 100)
              : entryPrice * (1 + config.stopValue / 100);
        }

        let target: number | null = null;
        const riskPerUnit = Math.abs(entryPrice - stop);
        if (config.targetMode === 'percent') {
          target =
            config.direction === 'long'
              ? entryPrice * (1 + config.targetValue / 100)
              : entryPrice * (1 - config.targetValue / 100);
        } else if (config.targetMode === 'rr' && riskPerUnit > 0) {
          target =
            config.direction === 'long'
              ? entryPrice + riskPerUnit * config.targetValue
              : entryPrice - riskPerUnit * config.targetValue;
        }

        const riskCash = (cash * options.riskPerTradePct) / 100;
        const qty = riskPerUnit > 0 ? Math.floor(riskCash / riskPerUnit) : 0;

        if (qty > 0 && riskPerUnit > 0) {
          position = {
            // The fill happens on bar i+1's open. Recording the entry index as
            // i would under-count holding time by one bar and allow an exit
            // "before" entry when the stop is hit on the fill bar itself.
            entryIndex: i + 1,
            entryPrice,
            stop,
            target,
            qty,
            mae: 0,
            mfe: 0,
          };
        }
      }
    }

    equityCurve.push({
      time: bar.time,
      equity: cash + (position ? position.qty * (bar.close - position.entryPrice) * (config.direction === 'long' ? 1 : -1) : 0),
    });
  }

  // Force-close any open position at the last close.
  if (position) {
    const last = candles[candles.length - 1];
    const isLong = config.direction === 'long';
    const pnl = position.qty * (last.close - position.entryPrice) * (isLong ? 1 : -1);
    cash += pnl;
    trades.push({
      entryIndex: position.entryIndex,
      exitIndex: candles.length - 1,
      entryTime: candles[position.entryIndex].time,
      exitTime: last.time,
      entryPrice: position.entryPrice,
      exitPrice: last.close,
      direction: config.direction,
      bars: candles.length - 1 - position.entryIndex,
      returnPct: ((isLong ? last.close - position.entryPrice : position.entryPrice - last.close) / position.entryPrice) * 100,
      exitReason: 'end',
      maePct: position.mae,
      mfePct: position.mfe,
    });
    equityCurve.push({ time: last.time, equity: cash });
  }

  /* ---- Metrics ---- */
  const wins = trades.filter((t) => t.returnPct > 0);
  const losses = trades.filter((t) => t.returnPct <= 0);
  const grossWin = wins.reduce((s, t) => s + t.returnPct, 0);
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.returnPct, 0));
  const avgWin = wins.length ? grossWin / wins.length : 0;
  const avgLoss = losses.length ? grossLoss / losses.length : 0;

  let peak = -Infinity;
  let maxDd = 0;
  const finalEquity = equityCurve.length ? equityCurve[equityCurve.length - 1].equity : options.initialCapital;
  let maxEquity = options.initialCapital;
  for (const p of equityCurve) {
    peak = Math.max(peak, p.equity, maxEquity);
    if (peak > 0) {
      const dd = ((peak - p.equity) / peak) * 100;
      maxDd = Math.max(maxDd, dd);
    }
  }

  if (trades.length > 0 && trades.length < 10) {
    warnings.push(
      `Sirf ${trades.length} trades — ye statistically meaningless sample hai. Results ko edge ka proof na samjhein.`,
    );
  }
  if (config.entryConditions.length === 0) {
    warnings.push('Entry condition set karein warna backtest kuch simulate nahi karega.');
  }

  return {
    trades,
    equityCurve,
    warnings,
    metrics: {
      trades: trades.length,
      wins: wins.length,
      losses: losses.length,
      winRate: trades.length ? (wins.length / trades.length) * 100 : 0,
      avgWin,
      avgLoss,
      profitFactor: grossLoss > 0 ? grossWin / grossLoss : null,
      expectancy: trades.length ? (grossWin - grossLoss) / trades.length : 0,
      totalReturn: ((finalEquity - options.initialCapital) / options.initialCapital) * 100,
      maxDrawdown: maxDd,
      avgBars: trades.length ? trades.reduce((s, t) => s + t.bars, 0) / trades.length : 0,
      exposure: candles.length ? (trades.reduce((s, t) => s + t.bars, 0) / candles.length) * 100 : 0,
    },
  };
}

export const DEFAULT_STRATEGY: StrategyConfig = {
  name: 'Untitled strategy',
  direction: 'long',
  entryConditions: [
    {
      id: 'entry-1',
      left: { kind: 'ema', period: 20 },
      op: 'crossUp',
      right: { kind: 'ema', period: 50 },
    },
  ],
  exitConditions: [
    {
      id: 'exit-1',
      left: { kind: 'ema', period: 20 },
      op: 'crossDown',
      right: { kind: 'ema', period: 50 },
    },
  ],
  stopMode: 'atr',
  stopValue: 2,
  targetMode: 'rr',
  targetValue: 2,
  maxBarsInTrade: 40,
};

export const STRATEGY_STORAGE_KEY = 'strategy-config';
