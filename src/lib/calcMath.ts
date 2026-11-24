/**
 * Pure calculator math.
 *
 * These functions are deliberately separated from the React components so that
 * every formula can be unit-tested with exact expected values. Invalid inputs
 * return `null` rather than NaN, and the UI renders "—" for null.
 */

export interface RiskRewardInput {
  direction: 'long' | 'short';
  entry: number;
  stop: number;
  target: number;
}

export interface RiskRewardOutput {
  risk: number;
  reward: number;
  ratio: number;
  riskPct: number;
  rewardPct: number;
  breakevenWinRate: number;
}

export function calcRiskReward(input: RiskRewardInput): RiskRewardOutput | null {
  const { direction, entry, stop, target } = input;
  if (![entry, stop, target].every((n) => Number.isFinite(n) && n > 0)) return null;

  // The stop must sit on the losing side of the entry, otherwise the "risk" is
  // actually a guaranteed profit and the ratio is meaningless.
  if (direction === 'long' && stop >= entry) return null;
  if (direction === 'short' && stop <= entry) return null;

  const risk = Math.abs(entry - stop);
  const reward = direction === 'long' ? target - entry : entry - target;
  const ratio = risk > 0 ? reward / risk : 0;

  return {
    risk,
    reward,
    ratio,
    riskPct: (risk / entry) * 100,
    rewardPct: (reward / entry) * 100,
    // Breakeven win rate for an R multiple: 1 / (1 + R).
    breakevenWinRate: ratio > 0 ? (1 / (1 + ratio)) * 100 : 100,
  };
}

export interface PositionSizeInput {
  balance: number;
  riskPct: number;
  entry: number;
  stop: number;
}

export interface PositionSizeOutput {
  riskAmount: number;
  perUnitRisk: number;
  size: number;
  positionValue: number;
  exposurePct: number;
  actualRisk: number;
}

export function calcPositionSize(input: PositionSizeInput): PositionSizeOutput | null {
  const { balance, riskPct, entry, stop } = input;
  if (!Number.isFinite(balance) || balance <= 0) return null;
  if (!Number.isFinite(riskPct) || riskPct <= 0 || riskPct > 100) return null;
  if (!Number.isFinite(entry) || !Number.isFinite(stop) || entry <= 0 || stop <= 0) return null;
  if (entry === stop) return null;

  const riskAmount = (balance * riskPct) / 100;
  const perUnitRisk = Math.abs(entry - stop);
  // Whole units only: fractional shares are not universally available and the
  // floor keeps actual risk at or below the intended amount.
  const size = Math.floor(riskAmount / perUnitRisk);
  if (size <= 0) {
    return { riskAmount, perUnitRisk, size: 0, positionValue: 0, exposurePct: 0, actualRisk: 0 };
  }

  const positionValue = size * entry;
  return {
    riskAmount,
    perUnitRisk,
    size,
    positionValue,
    exposurePct: (positionValue / balance) * 100,
    actualRisk: size * perUnitRisk,
  };
}

export interface PnlInput {
  direction: 'long' | 'short';
  entry: number;
  exit: number;
  quantity: number;
}

export interface PnlOutput {
  perUnit: number;
  gross: number;
  changePct: number;
  positionValue: number;
}

export function calcPnl(input: PnlInput): PnlOutput | null {
  const { direction, entry, exit, quantity } = input;
  if (![entry, exit, quantity].every((n) => Number.isFinite(n) && n > 0)) return null;
  const perUnit = direction === 'long' ? exit - entry : entry - exit;
  return {
    perUnit,
    gross: perUnit * quantity,
    changePct: (perUnit / entry) * 100,
    positionValue: entry * quantity,
  };
}

export interface CompoundInput {
  initial: number;
  ratePct: number;
  periods: number;
}

export interface CompoundOutput {
  finalValue: number;
  gain: number;
  multiple: number;
}

export function calcCompound(input: CompoundInput): CompoundOutput | null {
  const { initial, ratePct, periods } = input;
  if (!Number.isFinite(initial) || initial <= 0) return null;
  if (!Number.isFinite(ratePct)) return null;
  // 100%+ negative return per period would make the base zero or negative,
  // which is not a meaningful compounding scenario.
  if (ratePct <= -100) return null;
  if (!Number.isFinite(periods) || periods <= 0 || periods > 100) return null;

  const finalValue = initial * Math.pow(1 + ratePct / 100, periods);
  return { finalValue, gain: finalValue - initial, multiple: finalValue / initial };
}

export function calcWeightedAverage(lots: { qty: number; price: number }[]): {
  totalQty: number;
  totalCost: number;
  average: number;
} | null {
  const valid = lots.filter(
    (l) => Number.isFinite(l.qty) && l.qty > 0 && Number.isFinite(l.price) && l.price > 0,
  );
  if (valid.length === 0) return null;
  const totalQty = valid.reduce((s, l) => s + l.qty, 0);
  const totalCost = valid.reduce((s, l) => s + l.qty * l.price, 0);
  if (totalQty <= 0) return null;
  return { totalQty, totalCost, average: totalCost / totalQty };
}

export interface DrawdownInput {
  peak: number;
  current: number;
}

export interface DrawdownOutput {
  drawdownPct: number;
  absoluteLoss: number;
  recoveryPct: number;
}

export function calcDrawdown(input: DrawdownInput): DrawdownOutput | null {
  const { peak, current } = input;
  if (!Number.isFinite(peak) || peak <= 0) return null;
  if (!Number.isFinite(current) || current < 0) return null;

  const absoluteLoss = Math.max(0, peak - current);
  const drawdownPct = (absoluteLoss / peak) * 100;
  // Gain required from the current level to get back to the peak.
  const recoveryPct = current > 0 && peak > current ? ((peak - current) / current) * 100 : 0;

  return { drawdownPct, absoluteLoss, recoveryPct };
}
