import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  CardBody,
  PageHeader,
  Pill,
  cx,
} from '../../components/ui';
import {
  DEFAULT_STRATEGY,
  OP_LABELS,
  OPERAND_LABELS,
  describeCondition,
  type CompareOp,
  type Condition,
  type Operand,
  type OperandKind,
  type StrategyConfig,
} from '../../lib/strategy';
import { readJson, writeJson, STORAGE_KEYS } from '../../lib/storage';

const OPERAND_KINDS: OperandKind[] = [
  'price',
  'sma',
  'ema',
  'rsi',
  'atr',
  'bbUpper',
  'bbLower',
  'constant',
];

function newCondition(prefix: string): Condition {
  return {
    id: `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    left: { kind: 'sma', period: 20 },
    op: 'gt',
    right: { kind: 'price' },
  };
}

function OperandEditor({
  operand,
  onChange,
  label,
}: {
  operand: Operand;
  onChange: (o: Operand) => void;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
      <p className="mb-1.5 text-[0.62rem] font-semibold tracking-wide text-text-muted uppercase">
        {label}
      </p>
      <select
        aria-label={`${label} type`}
        value={operand.kind}
        onChange={(e) => {
          const kind = e.target.value as OperandKind;
          onChange({
            kind,
            period: kind === 'constant' || kind === 'price' ? undefined : (operand.period ?? 20),
            value: kind === 'constant' ? (operand.value ?? 50) : undefined,
          });
        }}
        className="w-full rounded-md border border-white/10 bg-ink-850 px-2 py-1 text-[0.72rem] text-text-primary focus:border-accent-500/60 focus:outline-none"
      >
        {OPERAND_KINDS.map((k) => (
          <option key={k} value={k}>
            {OPERAND_LABELS[k]}
          </option>
        ))}
      </select>
      {operand.kind !== 'price' && operand.kind !== 'constant' && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <label htmlFor={`${label}-period`} className="text-[0.64rem] text-text-muted">
            Period
          </label>
          <input
            id={`${label}-period`}
            type="number"
            min={2}
            max={200}
            value={operand.period ?? 20}
            onChange={(e) =>
              onChange({
                ...operand,
                period: Math.max(2, Math.min(200, Number(e.target.value) || 2)),
              })
            }
            className="tnum w-16 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.7rem] text-text-primary focus:border-accent-500/60 focus:outline-none"
          />
        </div>
      )}
      {operand.kind === 'constant' && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <label htmlFor={`${label}-value`} className="text-[0.64rem] text-text-muted">
            Value
          </label>
          <input
            id={`${label}-value`}
            type="number"
            value={operand.value ?? 50}
            onChange={(e) => onChange({ ...operand, value: Number(e.target.value) || 0 })}
            className="tnum w-20 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.7rem] text-text-primary focus:border-accent-500/60 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

export default function StrategyBuilder() {
  const [config, setConfig] = useState<StrategyConfig>(() =>
    readJson<StrategyConfig>(STORAGE_KEYS.labPrefs, DEFAULT_STRATEGY),
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Persist the rule set so the backtester can pick it up.
    writeJson(STORAGE_KEYS.labPrefs, config);
  }, [config]);

  function update(patch: Partial<StrategyConfig>) {
    setConfig((c) => ({ ...c, ...patch }));
  }

  function updateCondition(group: 'entryConditions' | 'exitConditions', id: string, next: Condition) {
    setConfig((c) => ({
      ...c,
      [group]: c[group].map((x) => (x.id === id ? next : x)),
    }));
  }

  function removeCondition(group: 'entryConditions' | 'exitConditions', id: string) {
    setConfig((c) => ({ ...c, [group]: c[group].filter((x) => x.id !== id) }));
  }

  function addCondition(group: 'entryConditions' | 'exitConditions') {
    setConfig((c) => ({
      ...c,
      [group]: [...c[group], newCondition(group === 'entryConditions' ? 'entry' : 'exit')],
    }));
  }

  const summary = [
    `${config.direction === 'long' ? 'LONG' : 'SHORT'} entry when ${config.entryConditions
      .map(describeCondition)
      .join(' AND ') || '(no conditions)'}`,
    config.exitConditions.length
      ? `Exit when ${config.exitConditions.map(describeCondition).join(' AND ')}`
      : 'Exit only on stop / target / timeout',
    `Stop: ${config.stopValue}${config.stopMode === 'atr' ? '× ATR' : '%'}`,
    config.targetMode === 'none'
      ? 'No fixed target'
      : `Target: ${config.targetValue}${config.targetMode === 'rr' ? 'R' : '%'}`,
    `Max ${config.maxBarsInTrade} bars in trade`,
  ];

  async function copyRules() {
    try {
      await navigator.clipboard.writeText(`${config.name}\n\n${summary.join('\n')}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

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
        eyebrow="Trading Lab · Tool 04"
        title="Strategy Builder"
        description="Apne rules ko plain language me define karein. Har condition explicit hai — koi hidden signal, koi black box. Rules yahan banayein, phir Backtester me simulate karein."
      />

      <Callout tone="info" title="Rules, not recommendations">
        <p>
          Yahan aap khud rules bana rahe hain. Learnyx koi strategy suggest nahi karta aur kisi rule
          set ko profitable nahi kehta. Backtest results bhi historical simulation hain, future
          guarantee nahi.
        </p>
      </Callout>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          <Card>
            <CardBody>
              <label htmlFor="strategy-name" className="mb-1.5 block text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Strategy name
              </label>
              <input
                id="strategy-name"
                value={config.name}
                onChange={(e) => update({ name: e.target.value.slice(0, 60) })}
                className="w-full rounded-xl border border-white/12 bg-white/4 px-3 py-2 text-sm text-text-primary focus:border-accent-500/50 focus:outline-none"
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Direction
                </span>
                <div className="flex gap-1.5">
                  <Pill active={config.direction === 'long'} onClick={() => update({ direction: 'long' })}>
                    Long only
                  </Pill>
                  <Pill active={config.direction === 'short'} onClick={() => update({ direction: 'short' })}>
                    Short only
                  </Pill>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">Entry conditions</h2>
                  <p className="mt-0.5 text-[0.7rem] text-text-muted">Sab conditions true honi chahiye (AND).</p>
                </div>
                <Button variant="secondary" className="text-xs" onClick={() => addCondition('entryConditions')}>
                  <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                {config.entryConditions.length === 0 && (
                  <p className="rounded-lg border border-dashed border-white/12 px-3 py-2.5 text-[0.75rem] text-text-muted">
                    Koi entry condition nahi — backtest zero trades dega.
                  </p>
                )}
                {config.entryConditions.map((c, i) => (
                  <div key={c.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-2.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[0.64rem] font-semibold tracking-wide text-accent-400 uppercase">
                        Condition {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCondition('entryConditions', c.id)}
                        aria-label={`Remove entry condition ${i + 1}`}
                        className="rounded p-1 text-text-muted hover:text-down-400"
                      >
                        <Trash2 aria-hidden="true" className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                      <OperandEditor
                        label={`Condition ${i + 1} left`}
                        operand={c.left}
                        onChange={(o) => updateCondition('entryConditions', c.id, { ...c, left: o })}
                      />
                      <select
                        aria-label={`Condition ${i + 1} operator`}
                        value={c.op}
                        onChange={(e) =>
                          updateCondition('entryConditions', c.id, { ...c, op: e.target.value as CompareOp })
                        }
                        className="rounded-md border border-white/10 bg-ink-850 px-2 py-1.5 text-[0.7rem] text-text-secondary focus:border-accent-500/60 focus:outline-none"
                      >
                        {(Object.keys(OP_LABELS) as CompareOp[]).map((op) => (
                          <option key={op} value={op}>
                            {OP_LABELS[op]}
                          </option>
                        ))}
                      </select>
                      <OperandEditor
                        label={`Condition ${i + 1} right`}
                        operand={c.right}
                        onChange={(o) => updateCondition('entryConditions', c.id, { ...c, right: o })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">Exit conditions</h2>
                  <p className="mt-0.5 text-[0.7rem] text-text-muted">
                    Optional — stop, target aur timeout hamesha active rehte hain.
                  </p>
                </div>
                <Button variant="secondary" className="text-xs" onClick={() => addCondition('exitConditions')}>
                  <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                {config.exitConditions.length === 0 && (
                  <p className="rounded-lg border border-dashed border-white/12 px-3 py-2.5 text-[0.75rem] text-text-muted">
                    Koi rule-based exit nahi. Trades stop, target ya timeout par band honge.
                  </p>
                )}
                {config.exitConditions.map((c, i) => (
                  <div key={c.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-2.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[0.64rem] font-semibold tracking-wide text-violet-400 uppercase">
                        Exit {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCondition('exitConditions', c.id)}
                        aria-label={`Remove exit condition ${i + 1}`}
                        className="rounded p-1 text-text-muted hover:text-down-400"
                      >
                        <Trash2 aria-hidden="true" className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                      <OperandEditor
                        label={`Exit ${i + 1} left`}
                        operand={c.left}
                        onChange={(o) => updateCondition('exitConditions', c.id, { ...c, left: o })}
                      />
                      <select
                        aria-label={`Exit ${i + 1} operator`}
                        value={c.op}
                        onChange={(e) =>
                          updateCondition('exitConditions', c.id, { ...c, op: e.target.value as CompareOp })
                        }
                        className="rounded-md border border-white/10 bg-ink-850 px-2 py-1.5 text-[0.7rem] text-text-secondary focus:border-accent-500/60 focus:outline-none"
                      >
                        {(Object.keys(OP_LABELS) as CompareOp[]).map((op) => (
                          <option key={op} value={op}>
                            {OP_LABELS[op]}
                          </option>
                        ))}
                      </select>
                      <OperandEditor
                        label={`Exit ${i + 1} right`}
                        operand={c.right}
                        onChange={(o) => updateCondition('exitConditions', c.id, { ...c, right: o })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-sm font-semibold text-text-primary">Risk rules</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                    Stop mode
                  </p>
                  <div className="flex gap-1.5">
                    <Pill active={config.stopMode === 'percent'} onClick={() => update({ stopMode: 'percent' })}>
                      Percent
                    </Pill>
                    <Pill active={config.stopMode === 'atr'} onClick={() => update({ stopMode: 'atr' })}>
                      ATR multiple
                    </Pill>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor="stop-value" className="text-[0.7rem] text-text-muted">
                      Value
                    </label>
                    <input
                      id="stop-value"
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={config.stopValue}
                      onChange={(e) => update({ stopValue: Math.max(0.1, Number(e.target.value) || 0.1) })}
                      className="tnum w-20 rounded border border-white/10 bg-white/5 px-2 py-1 text-[0.75rem] text-text-primary focus:border-accent-500/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                    Target mode
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Pill active={config.targetMode === 'rr'} onClick={() => update({ targetMode: 'rr' })}>
                      R multiple
                    </Pill>
                    <Pill active={config.targetMode === 'percent'} onClick={() => update({ targetMode: 'percent' })}>
                      Percent
                    </Pill>
                    <Pill active={config.targetMode === 'none'} onClick={() => update({ targetMode: 'none' })}>
                      None
                    </Pill>
                  </div>
                  {config.targetMode !== 'none' && (
                    <div className="mt-2 flex items-center gap-2">
                      <label htmlFor="target-value" className="text-[0.7rem] text-text-muted">
                        Value
                      </label>
                      <input
                        id="target-value"
                        type="number"
                        min={0.1}
                        step={0.1}
                        value={config.targetValue}
                        onChange={(e) => update({ targetValue: Math.max(0.1, Number(e.target.value) || 0.1) })}
                        className="tnum w-20 rounded border border-white/10 bg-white/5 px-2 py-1 text-[0.75rem] text-text-primary focus:border-accent-500/60 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="max-bars" className="mb-1.5 block text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                    Max bars in trade ({config.maxBarsInTrade})
                  </label>
                  <input
                    id="max-bars"
                    type="range"
                    min={5}
                    max={120}
                    step={5}
                    value={config.maxBarsInTrade}
                    onChange={(e) => update({ maxBarsInTrade: Number(e.target.value) })}
                    className="w-full accent-[#648CFF]"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                Plain-language rules
              </p>
              <ol className="mt-2 space-y-1.5">
                {summary.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[0.74rem] leading-relaxed text-text-secondary">
                    <span className="tnum mt-0.5 shrink-0 rounded bg-white/8 px-1 text-[0.6rem] font-semibold text-text-muted">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex flex-col gap-1.5">
                <Button variant="secondary" className="w-full text-xs" onClick={copyRules}>
                  <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                  {copied ? 'Copied' : 'Copy rules'}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-xs"
                  onClick={() => setConfig({ ...DEFAULT_STRATEGY })}
                >
                  <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                  Reset to default
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                Next step
              </p>
              <p className="mt-1.5 text-[0.74rem] leading-relaxed text-text-muted">
                Ye rules sample data par test karein. Backtester inhe automatically load karta hai.
              </p>
              <Link
                to="/lab/backtest"
                className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-accent-500/40 bg-accent-500/15 px-3 py-2 text-xs font-semibold text-text-primary hover:bg-accent-500/22"
              >
                Run backtest
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </CardBody>
          </Card>

          <div className={cx('rounded-xl border border-white/10 bg-white/[0.03] p-3.5')}>
            <p className="text-[0.66rem] font-semibold tracking-wide text-text-muted uppercase">
              Saved locally
            </p>
            <p className="mt-1 text-[0.72rem] leading-relaxed text-text-muted">
              Ye rule set aapke browser me save hota hai. Koi account ya server sync nahi.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
