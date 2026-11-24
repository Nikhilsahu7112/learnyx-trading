import { useState } from 'react';
import { Calculator as CalcIcon, Minus, Plus } from 'lucide-react';
import {
  Callout,
  Card,
  PageHeader,
  Skeleton,
  cx,
  formatCurrency,
} from '../components/ui';
import {
  CalcShell,
  HYPOTHETICAL_NOTE,
  NumberField,
  ResultRow,
  SelectField,
  fmt,
  fmtSigned,
  num,
  pct,
} from '../components/calc';
import { calculators } from '../lib/search';
import { useProgress } from '../lib/progress';
import {
  calcCompound,
  calcDrawdown,
  calcPnl,
  calcPositionSize,
  calcRiskReward,
  calcWeightedAverage,
} from '../lib/calcMath';

/* ------------------------------------------------------------------ */
/* 1. Risk to Reward                                                   */
/* ------------------------------------------------------------------ */
function RiskRewardCalc() {
  const [entry, setEntry] = useState('100');
  const [stop, setStop] = useState('95');
  const [target, setTarget] = useState('115');
  const [dir, setDir] = useState<'long' | 'short'>('long');

  const e = num(entry);
  const s = num(stop);
  const t = num(target);
  const valid = Number.isFinite(e) && Number.isFinite(s) && Number.isFinite(t) && e > 0 && s > 0 && t > 0;

  const out = calcRiskReward({ direction: dir, entry: e, stop: s, target: t });

  let error = '';
  if (!valid) error = 'Valid prices daalein (saare zero se zyada).';
  else if (!out)
    error =
      dir === 'long'
        ? 'Long trade me stop entry se neeche hona chahiye.'
        : 'Short trade me stop entry se upar hona chahiye.';

  return (
    <CalcShell
      id="risk-reward"
      title="Risk-to-Reward Calculator"
      description="Entry, stop-loss aur target se risk, potential reward aur R:R ratio nikalein. Direction ka dhyaan rakhein — long me stop neeche, short me upar."
      inputs={
        <>
          <SelectField
            label="Direction"
            value={dir}
            onChange={(v) => setDir(v as 'long' | 'short')}
            options={[
              { value: 'long', label: 'Long (buy)' },
              { value: 'short', label: 'Short (sell)' },
            ]}
          />
          <NumberField label="Entry price" value={entry} onChange={setEntry} prefix="₹" />
          <NumberField label="Stop-loss price" value={stop} onChange={setStop} prefix="₹" />
          <NumberField label="Target price" value={target} onChange={setTarget} prefix="₹" />
          {error && <p className="text-[0.72rem] text-down-400">{error}</p>}
        </>
      }
      results={
        out ? (
          <>
            <ResultRow label="Risk per unit" value={fmt(out.risk)} tone="down" sub={`${pct(out.riskPct)} of entry`} />
            <ResultRow
              label="Potential reward per unit"
              value={out.reward >= 0 ? fmt(out.reward) : `${fmt(out.reward)} (target galat side par)`}
              tone={out.reward > 0 ? 'up' : 'warn'}
              sub={`${pct(out.rewardPct)} of entry`}
            />
            <ResultRow
              label="Risk : Reward"
              value={out.ratio > 0 ? `1 : ${out.ratio.toFixed(2)}` : '—'}
              tone={out.ratio >= 2 ? 'up' : out.ratio >= 1 ? 'warn' : 'down'}
              emphasis
              sub={out.ratio > 0 ? (out.ratio >= 2 ? 'Common educational benchmark ke above' : 'Educational benchmark se neeche') : undefined}
            />
            <ResultRow label="Breakeven win rate needed" value={pct(out.breakevenWinRate)} />
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Valid inputs daalein to results dikhenge.
          </p>
        )
      }
      note={HYPOTHETICAL_NOTE}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. Position sizing                                                  */
/* ------------------------------------------------------------------ */
function PositionSizeCalc() {
  const [balance, setBalance] = useState('100000');
  const [riskPct, setRiskPct] = useState('1');
  const [entry, setEntry] = useState('100');
  const [stop, setStop] = useState('96');

  const b = num(balance);
  const r = num(riskPct);
  const e = num(entry);
  const s = num(stop);

  const out = calcPositionSize({ balance: b, riskPct: r, entry: e, stop: s });

  let error = '';
  if (!Number.isFinite(b) || b <= 0) error = 'Account balance positive hona chahiye.';
  else if (!Number.isFinite(r) || r <= 0 || r > 100)
    error = 'Risk % 0 se 100 ke beech hona chahiye (practically 1–2%).';
  else if (!Number.isFinite(e) || !Number.isFinite(s) || e <= 0 || s <= 0 || e === s)
    error = 'Entry aur stop valid aur different hone chahiye.';
  else if (out && out.size === 0) error = 'Is risk amount me ek bhi unit afford nahi hota — balance ya risk % badhayein.';

  return (
    <CalcShell
      id="position-size"
      title="Position Sizing Calculator"
      description="Fixed risk approach: pehle stop distance, phir risk amount, phir position size. Yehi risk management ka core mechanic hai."
      inputs={
        <>
          <NumberField
            label="Account balance (hypothetical)"
            value={balance}
            onChange={setBalance}
            prefix="₹"
            hint="Educational math ke liye — koi real account connect nahi hai."
          />
          <NumberField
            label="Risk per trade"
            value={riskPct}
            onChange={setRiskPct}
            suffix="%"
            hint="Practically 1–2% recommended; 5%+ me losing streak destructive hota hai."
          />
          <NumberField label="Entry price" value={entry} onChange={setEntry} prefix="₹" />
          <NumberField label="Stop-loss price" value={stop} onChange={setStop} prefix="₹" />
          {error && <p className="text-[0.72rem] text-down-400">{error}</p>}
        </>
      }
      results={
        out && out.size > 0 ? (
          <>
            <ResultRow label="Risk amount" value={fmt(out.riskAmount)} tone="down" />
            <ResultRow label="Price difference (per unit)" value={fmt(out.perUnitRisk)} />
            <ResultRow label="Position size (units)" value={out.size.toLocaleString('en-IN')} emphasis tone="up" />
            <ResultRow label="Position value" value={fmt(out.positionValue)} sub={`${pct(out.exposurePct)} of balance`} />
            <ResultRow label="Actual risk if stopped" value={fmt(out.actualRisk)} tone="down" />
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Valid inputs daalein to results dikhenge.
          </p>
        )
      }
      note={`${HYPOTHETICAL_NOTE} Position size floor karke round kiya gaya hai — actual risk aapke target risk amount se thoda kam hoga.`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 3. P&L                                                              */
/* ------------------------------------------------------------------ */
function ProfitLossCalc() {
  const [entry, setEntry] = useState('250');
  const [exit, setExit] = useState('272');
  const [qty, setQty] = useState('100');
  const [dir, setDir] = useState<'long' | 'short'>('long');

  const out = calcPnl({
    direction: dir,
    entry: num(entry),
    exit: num(exit),
    quantity: num(qty),
  });

  return (
    <CalcShell
      id="profit-loss"
      title="Profit & Loss Calculator"
      description="Entry, exit, quantity aur direction se gross P&L aur percentage change. Costs (brokerage, taxes, slippage) include nahi hain."
      inputs={
        <>
          <SelectField
            label="Direction"
            value={dir}
            onChange={(v) => setDir(v as 'long' | 'short')}
            options={[
              { value: 'long', label: 'Long (bought first)' },
              { value: 'short', label: 'Short (sold first)' },
            ]}
          />
          <NumberField label="Entry price" value={entry} onChange={setEntry} prefix="₹" />
          <NumberField label="Exit price" value={exit} onChange={setExit} prefix="₹" />
          <NumberField label="Quantity" value={qty} onChange={setQty} hint="Units / shares." />
        </>
      }
      results={
        out ? (
          <>
            <ResultRow label="Per-unit move" value={fmtSigned(out.perUnit)} tone={out.perUnit >= 0 ? 'up' : 'down'} />
            <ResultRow
              label="Gross P&L"
              value={fmtSigned(out.gross)}
              tone={out.gross >= 0 ? 'up' : 'down'}
              emphasis
            />
            <ResultRow
              label="Percentage change"
              value={pct(out.changePct)}
              tone={out.changePct >= 0 ? 'up' : 'down'}
            />
            <ResultRow label="Position value at entry" value={fmt(out.positionValue)} />
            <p className="mt-2 text-[0.68rem] text-text-muted">
              Ye gross hai — brokerage, STT/taxes aur slippage nikaalne par net alag hoga.
            </p>
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Valid inputs daalein to results dikhenge.
          </p>
        )
      }
      note={HYPOTHETICAL_NOTE}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 4. Compounding                                                      */
/* ------------------------------------------------------------------ */
function CompoundingCalc() {
  const [initial, setInitial] = useState('100000');
  const [rate, setRate] = useState('12');
  const [periods, setPeriods] = useState('10');

  const p = num(initial);
  const r = num(rate);
  const n = num(periods);
  const out = calcCompound({ initial: p, ratePct: r, periods: n });

  const rows =
    out && Number.isFinite(n)
      ? Array.from({ length: Math.min(Math.ceil(n), 8) }, (_, i) => {
          const year = Math.round(((i + 1) / Math.min(Math.ceil(n), 8)) * n);
          return { year, value: p * Math.pow(1 + r / 100, year) };
        })
      : [];

  return (
    <CalcShell
      id="compounding"
      title="Compound Growth Calculator"
      description="Initial amount, assumed periodic return aur number of periods se compounding growth. Constant returns ek simplifying assumption hai — real markets me negative years bhi aate hain."
      inputs={
        <>
          <NumberField label="Initial amount" value={initial} onChange={setInitial} prefix="₹" />
          <NumberField
            label="Assumed return per period"
            value={rate}
            onChange={setRate}
            suffix="%"
            hint="Negative bhi ho sakta hai (e.g. −5)."
          />
          <NumberField
            label="Number of periods (years)"
            value={periods}
            onChange={setPeriods}
            min={1}
            max={60}
            suffix="yrs"
          />
        </>
      }
      results={
        out ? (
          <>
            <ResultRow label="Final value" value={fmt(out.finalValue)} emphasis tone={out.gain >= 0 ? 'up' : 'down'} />
            <ResultRow label="Total gain" value={fmtSigned(out.gain)} tone={out.gain >= 0 ? 'up' : 'down'} />
            <ResultRow label="Multiple of initial" value={`${out.multiple.toFixed(2)}×`} />
            <ResultRow label="Assumed CAGR" value={pct(r)} />
            <div className="mt-3 space-y-1.5">
              {rows.map((row) => (
                <div key={row.year} className="flex items-center gap-2">
                  <span className="w-10 shrink-0 text-[0.65rem] text-text-muted">Y{row.year}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 to-violet-500"
                      style={{ width: `${Math.min(100, Math.max(0, (row.value / out.finalValue) * 100))}%` }}
                    />
                  </div>
                  <span className="tnum w-24 shrink-0 text-right text-[0.65rem] text-text-secondary">
                    {formatCurrency(row.value, '₹', 0)}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Valid inputs daalein (periods 1–60) to results dikhenge.
          </p>
        )
      }
      note="Constant return assumption unrealistic hai: real returns volatile hote hain, aur ek bada drawdown compounding path ko materially change karta hai. Ye calculator sirf mathematical illustration hai."
    />
  );
}

/* ------------------------------------------------------------------ */
/* 5. Average price                                                    */
/* ------------------------------------------------------------------ */
interface Lot {
  id: number;
  qty: string;
  price: string;
}

function AveragePriceCalc() {
  const [lots, setLots] = useState<Lot[]>([
    { id: 1, qty: '100', price: '100' },
    { id: 2, qty: '150', price: '92' },
  ]);

  const parsed = lots.map((l) => ({ qty: num(l.qty), price: num(l.price) }));
  const validLots = parsed.filter(
    (l) => Number.isFinite(l.qty) && l.qty > 0 && Number.isFinite(l.price) && l.price > 0,
  );
  const out = calcWeightedAverage(parsed);

  return (
    <CalcShell
      id="average-price"
      title="Average Price Calculator"
      description="Multiple purchases ka weighted average price. Quantity se weight hota hai — simple average galat hoga."
      inputs={
        <>
          {lots.map((lot, i) => (
            <div key={lot.id} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
              <NumberField
                label={`Purchase ${i + 1} qty`}
                value={lot.qty}
                onChange={(v) =>
                  setLots((ls) => ls.map((l) => (l.id === lot.id ? { ...l, qty: v } : l)))
                }
              />
              <NumberField
                label="Price"
                value={lot.price}
                onChange={(v) =>
                  setLots((ls) => ls.map((l) => (l.id === lot.id ? { ...l, price: v } : l)))
                }
                prefix="₹"
              />
              <button
                type="button"
                onClick={() => setLots((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== lot.id) : ls))}
                disabled={lots.length === 1}
                aria-label={`Remove purchase ${i + 1}`}
                className="mb-1 rounded-lg border border-white/10 bg-white/4 p-2 text-text-muted hover:bg-white/8 hover:text-down-400 disabled:opacity-40"
              >
                <Minus aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setLots((ls) => [
                ...ls,
                { id: Math.max(0, ...ls.map((l) => l.id)) + 1, qty: '', price: '' },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-white/9 hover:text-text-primary"
          >
            <Plus aria-hidden="true" className="h-3.5 w-3.5" />
            Add purchase
          </button>
        </>
      }
      results={
        out ? (
          <>
            <ResultRow label="Total quantity" value={out.totalQty.toLocaleString('en-IN')} />
            <ResultRow label="Total cost" value={fmt(out.totalCost)} />
            <ResultRow label="Weighted average price" value={fmt(out.average)} emphasis tone="up" />
            <ResultRow label="Purchases counted" value={`${validLots.length} of ${lots.length}`} />
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Kam se kam ek valid purchase daalein.
          </p>
        )
      }
      note="Averaging down cost basis kam karta hai par risk badhata hai — position size limits aur thesis ko pehle define karein."
    />
  );
}

/* ------------------------------------------------------------------ */
/* 6. Drawdown                                                         */
/* ------------------------------------------------------------------ */
function DrawdownCalc() {
  const [peak, setPeak] = useState('120000');
  const [current, setCurrent] = useState('90000');

  const p = num(peak);
  const c = num(current);
  const out = calcDrawdown({ peak: p, current: c });

  return (
    <CalcShell
      id="drawdown"
      title="Drawdown Calculator"
      description="Peak se current value tak decline percentage, aur usse recover karne ke liye kitna gain chahiye — dono ka farq dekhna zaroori hai."
      inputs={
        <>
          <NumberField label="Previous peak value" value={peak} onChange={setPeak} prefix="₹" />
          <NumberField label="Current value" value={current} onChange={setCurrent} prefix="₹" />
          {Number.isFinite(p) && Number.isFinite(c) && c > p && (
            <p className="text-[0.72rem] text-warn-500">
              Current value peak se zyada hai — koi drawdown nahi (naya peak ban gaya hai).
            </p>
          )}
        </>
      }
      results={
        out ? (
          <>
            <ResultRow label="Peak-to-current decline" value={fmt(out.absoluteLoss)} tone="down" />
            <ResultRow
              label="Drawdown"
              value={out.drawdownPct > 0 ? `−${out.drawdownPct.toFixed(2)}%` : '0.00%'}
              tone={out.drawdownPct > 0 ? 'down' : 'neutral'}
              emphasis
            />
            <ResultRow
              label="Gain needed to recover"
              value={out.recoveryPct > 0 ? `+${out.recoveryPct.toFixed(2)}%` : '—'}
              tone="warn"
              sub="Drawdown recovery asymmetric hai"
            />
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-down-500 to-warn-500"
                style={{ width: `${Math.min(100, Math.max(0, out.drawdownPct))}%` }}
              />
            </div>
            <p className="mt-2 text-[0.68rem] text-text-muted">
              {out.drawdownPct >= 50
                ? '50%+ drawdown — recovery ke liye 100%+ gain chahiye. Ye account survival ka serious risk hai.'
                : out.drawdownPct >= 20
                  ? '20%+ drawdown — position sizing aur strategy review ka signal.'
                  : 'Drawdown managed range me hai. Consistency maintain karein.'}
            </p>
          </>
        ) : (
          <p className="py-6 text-center text-[0.78rem] text-text-muted">
            Valid values daalein to results dikhenge.
          </p>
        )
      }
      note="Drawdown ke baad recovery velocity matter karti hai — traders ko lagta hai chhota drawdown hai, par dekhiye recovery % kitna zyada hai."
    />
  );
}

/* ------------------------------------------------------------------ */

export default function Calculators() {
  const { ready } = useProgress();

  return (
    <div>
      <PageHeader
        eyebrow="Calculators"
        title="Six practical trading calculators"
        description="Sab calculators browser me chalte hain, inputs validate karte hain, aur hypothetical labels ke saath results dikhate hain. Ye koi recommendation ya forecast nahi hain."
        actions={
          <div className="glass-subtle flex items-center gap-2 rounded-xl px-4 py-3">
            <CalcIcon aria-hidden="true" className="h-4 w-4 text-accent-400" />
            <span className="text-xs font-semibold text-text-primary">6 tools · offline</span>
          </div>
        }
      />

      <nav aria-label="Calculators" className="mb-6 flex flex-wrap gap-1.5">
        {calculators.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 text-[0.72rem] text-text-secondary transition-colors hover:border-white/20 hover:bg-white/8 hover:text-text-primary"
          >
            {c.title.replace(' Calculator', '')}
          </a>
        ))}
      </nav>

      <Callout tone="warn" title="Hypothetical values only">
        <p>
          Ye calculators hypothetical numbers par math karte hain. Koi real account, brokerage ya
          payment involved nahi. Results ko financial advice na samjhein.
        </p>
      </Callout>

      {!ready ? (
        <div className="mt-6 space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <RiskRewardCalc />
          <PositionSizeCalc />
          <ProfitLossCalc />
          <CompoundingCalc />
          <AveragePriceCalc />
          <DrawdownCalc />

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-text-primary">Ye calculators kya nahi karte</h2>
            <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed text-text-secondary">
              <li>Brokerage, STT, GST ya slippage automatically include nahi karte (except where noted).</li>
              <li>Tax implications calculate nahi karte — wo jurisdiction-specific hote hain.</li>
              <li>Kisi bhi instrument ya strategy ki recommendation nahi dete.</li>
              <li>Aapka data kahin save ya transmit nahi karte.</li>
            </ul>
            <p className={cx('mt-3 text-[0.7rem] text-text-muted')}>
              Net return dekhna hai to P&L calculator ke result se apne actual costs manually minus
              karein.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
