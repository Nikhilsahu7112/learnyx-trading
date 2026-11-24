import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Ban,
  Briefcase,
  CircleDollarSign,
  RotateCcw,
  ShoppingCart,
  TriangleAlert,
} from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  CardBody,
  EmptyState,
  PageHeader,
  Pill,
  StatTile,
  TableWrap,
  cx,
  formatNumber,
} from '../../components/ui';
import {
  SAMPLE_DATA_DISCLAIMER,
  getSeries,
  sampleInstruments,
} from '../../data/marketSamples';
import { readJson, writeJson, STORAGE_KEYS } from '../../lib/storage';
import type { PaperAccount, PaperTrade } from '../../lib/types';

const DEFAULT_BALANCE = 100000;

interface Store {
  account: PaperAccount;
  trades: PaperTrade[];
}

const DEFAULT_STORE: Store = {
  account: { balance: DEFAULT_BALANCE, startingBalance: DEFAULT_BALANCE, currency: '₹' },
  trades: [],
};

function load(): Store {
  const account = readJson<PaperAccount>(STORAGE_KEYS.paperAccount, DEFAULT_STORE.account);
  const trades = readJson<PaperTrade[]>(STORAGE_KEYS.paperTrades, []);
  return {
    account: {
      balance: typeof account?.balance === 'number' ? account.balance : DEFAULT_BALANCE,
      startingBalance:
        typeof account?.startingBalance === 'number' ? account.startingBalance : DEFAULT_BALANCE,
      currency: '₹',
    },
    trades: Array.isArray(trades) ? trades : [],
  };
}

export default function PaperTrading() {
  const [store, setStore] = useState<Store>(load);
  const [instrumentId, setInstrumentId] = useState(sampleInstruments[0].id);
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [qty, setQty] = useState('10');
  const [error, setError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const candles = useMemo(() => getSeries(instrumentId, 500), [instrumentId]);
  const price = candles[candles.length - 1]?.close ?? 0;
  const instrument = sampleInstruments.find((i) => i.id === instrumentId) ?? sampleInstruments[0];

  useEffect(() => {
    writeJson(STORAGE_KEYS.paperAccount, store.account);
    writeJson(STORAGE_KEYS.paperTrades, store.trades);
  }, [store]);

  const openTrades = store.trades.filter((t) => t.status === 'open');
  const closedTrades = store.trades.filter((t) => t.status === 'closed');

  /* Mark-to-market using the synthetic last close for each instrument. */
  const marks = useMemo(() => {
    const cache = new Map<string, number>();
    for (const i of sampleInstruments) {
      const series = getSeries(i.id, 500);
      cache.set(i.id, series[series.length - 1]?.close ?? 0);
    }
    return cache;
  }, []);

  function openTrade() {
    setError(null);
    const q = Math.floor(Number(qty));
    if (!Number.isFinite(q) || q <= 0) {
      setError('Quantity ek positive whole number honi chahiye.');
      return;
    }
    const cost = q * price;
    if (!side || cost > store.account.balance) {
      setError(
        `Simulated balance kaafi nahi hai. Position value ₹${formatNumber(cost, 0)} hai, available ₹${formatNumber(store.account.balance, 0)}.`,
      );
      return;
    }

    const trade: PaperTrade = {
      id: `pt-${Date.now()}`,
      instrumentId,
      symbol: instrument.symbol,
      side,
      quantity: q,
      entryPrice: price,
      entryAt: new Date().toISOString(),
      status: 'open',
    };

    setStore((s) => ({
      account: { ...s.account, balance: s.account.balance - cost },
      trades: [trade, ...s.trades],
    }));
    setQty('10');
  }

  function closeTrade(id: string) {
    setStore((s) => {
      const trade = s.trades.find((t) => t.id === id);
      if (!trade) return s;
      const mark = marks.get(trade.instrumentId) ?? trade.entryPrice;
      const proceeds = trade.quantity * mark;
      const pnl =
        (mark - trade.entryPrice) * trade.quantity * (trade.side === 'long' ? 1 : -1);
      return {
        account: { ...s.account, balance: s.account.balance + proceeds },
        trades: s.trades.map((t) =>
          t.id === id
            ? { ...t, status: 'closed', exitPrice: mark, exitAt: new Date().toISOString(), pnl }
            : t,
        ),
      };
    });
  }

  function reset() {
    setStore({ ...DEFAULT_STORE });
    setConfirmReset(false);
    setError(null);
  }

  const openValue = openTrades.reduce(
    (sum, t) => sum + t.quantity * (marks.get(t.instrumentId) ?? t.entryPrice),
    0,
  );
  const unrealised = openTrades.reduce((sum, t) => {
    const mark = marks.get(t.instrumentId) ?? t.entryPrice;
    return sum + (mark - t.entryPrice) * t.quantity * (t.side === 'long' ? 1 : -1);
  }, 0);
  const realised = closedTrades.reduce((sum, t) => sum + (t.pnl ?? 0), 0);
  const equity = store.account.balance + openValue;
  const totalReturnPct =
    ((equity - store.account.startingBalance) / store.account.startingBalance) * 100;

  const wins = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length;
  const winRate = closedTrades.length ? (wins / closedTrades.length) * 100 : null;

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
        eyebrow="Trading Lab · Tool 06"
        title="Paper Trading Simulator"
        description="Virtual balance ke saath positions open/close karein. Koi real order, koi brokerage, koi real money — sab kuch aapke browser me simulate hota hai."
      />

      <Callout tone="warn" title="Simulation, not trading">
        <p>
          {SAMPLE_DATA_DISCLAIMER} Yahan koi order exchange ya broker tak nahi jaata. Prices synthetic
          last-close values hain, spreads aur execution costs real nahi.
        </p>
      </Callout>

      <div className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatTile
          label="Virtual equity"
          value={`₹${formatNumber(equity, 0)}`}
          tone={equity >= store.account.startingBalance ? 'up' : 'down'}
        />
        <StatTile
          label="Realised P&L"
          value={`${realised >= 0 ? '+' : '−'}₹${formatNumber(Math.abs(realised), 0)}`}
          tone={realised >= 0 ? 'up' : 'down'}
        />
        <StatTile
          label="Unrealised P&L"
          value={`${unrealised >= 0 ? '+' : '−'}₹${formatNumber(Math.abs(unrealised), 0)}`}
          tone={unrealised >= 0 ? 'up' : 'down'}
        />
        <StatTile
          label="Total return"
          value={`${totalReturnPct >= 0 ? '+' : ''}${totalReturnPct.toFixed(2)}%`}
          tone={totalReturnPct >= 0 ? 'up' : 'down'}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-down-500/35 bg-down-500/10 px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[0.78rem] font-medium text-down-400">
            <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
            {error}
          </p>
        </div>
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
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
                <p className="tnum mt-2 text-[0.72rem] text-text-muted">
                  Last synthetic close <span className="text-text-primary">₹{formatNumber(price)}</span>
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Side
                </p>
                <div className="flex gap-1.5">
                  <Pill active={side === 'long'} onClick={() => setSide('long')}>
                    Buy / Long
                  </Pill>
                  <Pill active={side === 'short'} onClick={() => setSide('short')}>
                    Sell / Short
                  </Pill>
                </div>
              </div>

              <div>
                <label htmlFor="qty" className="mb-1.5 block text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  step={1}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="tnum w-full rounded-lg border border-white/12 bg-white/4 px-3 py-2 text-sm text-text-primary focus:border-accent-500/50 focus:outline-none"
                />
                <p className="mt-1 text-[0.68rem] text-text-muted">
                  Estimated position value ₹
                  {formatNumber(Math.max(0, Math.floor(Number(qty) || 0)) * price, 0)} · available ₹
                  {formatNumber(store.account.balance, 0)}
                </p>
              </div>

              <Button className="w-full" onClick={openTrade}>
                <ShoppingCart aria-hidden="true" className="h-4 w-4" />
                Simulate {side === 'long' ? 'buy' : 'sell'}
              </Button>

              <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2">
                <p className="text-[0.7rem] leading-relaxed text-text-muted">
                  Note: shorts ka poora notional bhi simulated cash se hold hota hai — simplified
                  margin model. Real markets me margin rules alag hote hain.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                <CircleDollarSign aria-hidden="true" className="h-3 w-3 text-accent-400" />
                Account
              </p>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-[0.74rem]">
                  <span className="text-text-muted">Cash available</span>
                  <span className="tnum font-semibold text-text-primary">
                    ₹{formatNumber(store.account.balance, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-[0.74rem]">
                  <span className="text-text-muted">Position value</span>
                  <span className="tnum font-semibold text-text-primary">
                    ₹{formatNumber(openValue, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-[0.74rem]">
                  <span className="text-text-muted">Open positions</span>
                  <span className="tnum font-semibold text-text-primary">{openTrades.length}</span>
                </div>
                <div className="flex justify-between text-[0.74rem]">
                  <span className="text-text-muted">Closed trades</span>
                  <span className="tnum font-semibold text-text-primary">{closedTrades.length}</span>
                </div>
                <div className="flex justify-between text-[0.74rem]">
                  <span className="text-text-muted">Win rate</span>
                  <span className="tnum font-semibold text-text-primary">
                    {winRate === null ? '—' : `${winRate.toFixed(0)}%`}
                  </span>
                </div>
              </div>
              {confirmReset ? (
                <div className="mt-3 flex flex-col gap-1.5">
                  <p className="text-[0.7rem] text-text-muted">
                    Sab positions aur history delete ho jaayegi. Undo nahi hoga.
                  </p>
                  <div className="flex gap-1.5">
                    <Button variant="secondary" className="flex-1 text-[0.7rem]" onClick={reset}>
                      Confirm reset
                    </Button>
                    <Button variant="ghost" className="flex-1 text-[0.7rem]" onClick={() => setConfirmReset(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="mt-3 w-full text-[0.7rem]"
                  onClick={() => setConfirmReset(true)}
                  disabled={store.trades.length === 0}
                >
                  <RotateCcw aria-hidden="true" className="h-3 w-3" />
                  Reset account
                </Button>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0 space-y-4">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <p className="flex items-center gap-1.5 text-[0.76rem] font-semibold text-text-primary">
                <Briefcase aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
                Open positions ({openTrades.length})
              </p>
            </div>
            {openTrades.length === 0 ? (
              <div className="px-4 py-8">
                <EmptyState
                  icon={<Briefcase aria-hidden="true" className="h-4 w-4" />}
                  title="Koi open position nahi"
                  description="Left panel se ek simulated position open karein."
                />
              </div>
            ) : (
              <div className="overflow-auto">
                <TableWrap
                  headers={['Symbol', 'Side', 'Qty', 'Entry', 'Mark', 'Unrealised', '']}
                  rows={openTrades.map((t) => {
                    const mark = marks.get(t.instrumentId) ?? t.entryPrice;
                    const pnl = (mark - t.entryPrice) * t.quantity * (t.side === 'long' ? 1 : -1);
                    return [
                      <span key="s" className="font-medium text-text-primary">{t.symbol}</span>,
                      <span key="d" className={t.side === 'long' ? 'text-up-400' : 'text-down-400'}>
                        {t.side}
                      </span>,
                      <span key="q" className="tnum">{t.quantity}</span>,
                      <span key="e" className="tnum">{formatNumber(t.entryPrice)}</span>,
                      <span key="m" className="tnum">{formatNumber(mark)}</span>,
                      <span
                        key="p"
                        className={cx('tnum font-semibold', pnl >= 0 ? 'text-up-400' : 'text-down-400')}
                      >
                        {pnl >= 0 ? '+' : '−'}₹{formatNumber(Math.abs(pnl), 0)}
                      </span>,
                      <button
                        key="x"
                        type="button"
                        onClick={() => closeTrade(t.id)}
                        className="rounded-md border border-white/14 bg-white/6 px-2 py-0.5 text-[0.68rem] font-semibold text-text-secondary hover:border-white/26 hover:text-text-primary"
                      >
                        Close
                      </button>,
                    ];
                  })}
                />
              </div>
            )}
          </Card>

          <Card className="overflow-hidden">
            <div className="border-b border-white/8 px-4 py-2.5">
              <p className="text-[0.76rem] font-semibold text-text-primary">
                Trade history ({closedTrades.length})
              </p>
            </div>
            {closedTrades.length === 0 ? (
              <p className="px-4 py-6 text-center text-[0.78rem] text-text-muted">
                Abhi koi closed trade nahi. Positions close karne par history yahan aayegi.
              </p>
            ) : (
              <div className="max-h-80 overflow-auto">
                <TableWrap
                  headers={['Symbol', 'Side', 'Qty', 'Entry', 'Exit', 'P&L', 'Closed']}
                  rows={closedTrades.map((t) => [
                    <span key="s" className="font-medium text-text-primary">{t.symbol}</span>,
                    <span key="d" className={t.side === 'long' ? 'text-up-400' : 'text-down-400'}>
                      {t.side}
                    </span>,
                    <span key="q" className="tnum">{t.quantity}</span>,
                    <span key="e" className="tnum">{formatNumber(t.entryPrice)}</span>,
                    <span key="x" className="tnum">{formatNumber(t.exitPrice ?? 0)}</span>,
                    <span
                      key="p"
                      className={cx(
                        'tnum font-semibold',
                        (t.pnl ?? 0) >= 0 ? 'text-up-400' : 'text-down-400',
                      )}
                    >
                      {(t.pnl ?? 0) >= 0 ? '+' : '−'}₹{formatNumber(Math.abs(t.pnl ?? 0), 0)}
                    </span>,
                    <span key="at" className="text-[0.68rem] text-text-muted">
                      {t.exitAt ? new Date(t.exitAt).toLocaleDateString('en-IN') : '—'}
                    </span>,
                  ])}
                />
              </div>
            )}
          </Card>

          <Card>
            <CardBody>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                <Ban aria-hidden="true" className="h-4 w-4 text-down-400" />
                Why this is not real trading
              </p>
              <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed text-text-secondary">
                <li>Koi broker/exchange connection nahi — orders sirf local state me hain.</li>
                <li>Prices synthetic sample series ke last close se aate hain.</li>
                <li>Bid-ask spread, partial fills, margin calls aur gap risk model nahi kiye gaye.</li>
                <li>Paper trading ka success real trading ka predictor nahi hota — execution aur psychology alag hote hain.</li>
                <li>Data aapke browser me hai; browser data clear karne par history chali jaayegi.</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
