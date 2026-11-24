import { useId } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardBody, cx, formatCurrency } from './ui';

/** Numeric input with label, hint, unit and validation display. */
export function NumberField({
  label,
  value,
  onChange,
  step = 'any',
  min,
  max,
  hint,
  prefix,
  suffix,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string | number;
  min?: number;
  max?: number;
  hint?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.72rem] font-semibold text-text-secondary">
        {label}
      </label>
      <div
        className={cx(
          'flex items-center gap-1 rounded-xl border bg-white/4 px-3 transition-colors focus-within:border-accent-500/60',
          error ? 'border-down-500/50' : 'border-white/12',
        )}
      >
        {prefix && <span className="text-xs text-text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          className="tnum w-full bg-transparent py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {suffix && <span className="text-xs text-text-muted">{suffix}</span>}
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1 flex items-center gap-1 text-[0.68rem] text-down-400">
          <AlertTriangle aria-hidden="true" className="h-3 w-3" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.68rem] text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.72rem] font-semibold text-text-secondary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/12 bg-white/4 px-3 py-2 text-sm text-text-primary focus:border-accent-500/60 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-800 text-text-primary">
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-[0.68rem] text-text-muted">{hint}</p>}
    </div>
  );
}

export function ResultRow({
  label,
  value,
  tone = 'neutral',
  sub,
  emphasis,
}: {
  label: string;
  value: string;
  tone?: 'neutral' | 'up' | 'down' | 'warn';
  sub?: string;
  emphasis?: boolean;
}) {
  const tones = {
    neutral: 'text-text-primary',
    up: 'text-up-400',
    down: 'text-down-400',
    warn: 'text-warn-500',
  };
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/6 py-2 last:border-0">
      <span className="text-[0.75rem] text-text-muted">{label}</span>
      <span className="text-right">
        <span
          className={cx(
            'tnum block font-semibold',
            emphasis ? 'text-lg' : 'text-sm',
            tones[tone],
          )}
        >
          {value}
        </span>
        {sub && <span className="block text-[0.65rem] text-text-muted">{sub}</span>}
      </span>
    </div>
  );
}

export function CalcShell({
  id,
  title,
  description,
  inputs,
  results,
  note,
}: {
  id: string;
  title: string;
  description: string;
  inputs: React.ReactNode;
  results: React.ReactNode;
  note?: string;
}) {
  return (
    <Card id={id} className="scroll-mt-24 overflow-hidden">
      <CardBody>
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-text-secondary">{description}</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">{inputs}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <p className="mb-1 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
              Result
            </p>
            {results}
          </div>
        </div>
        {note && <p className="mt-4 text-[0.7rem] leading-relaxed text-text-muted">{note}</p>}
      </CardBody>
    </Card>
  );
}

/** Parses a numeric input safely; returns NaN for blanks/invalid values. */
export function num(v: string): number {
  if (v.trim() === '') return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

/** Currency value with the sign stripped (callers add +/− explicitly). */
export function fmt(n: number, currency = '₹', digits = 2) {
  if (!Number.isFinite(n)) return '—';
  return formatCurrency(Math.abs(n), currency, digits);
}

export function fmtSigned(n: number, currency = '₹', digits = 2) {
  if (!Number.isFinite(n)) return '—';
  const sign = n < 0 ? '−' : n > 0 ? '+' : '';
  return sign + fmt(Math.abs(n), currency, digits);
}

export function pct(n: number, digits = 2) {
  if (!Number.isFinite(n)) return '—';
  return `${n >= 0 ? '' : '−'}${Math.abs(n).toFixed(digits)}%`;
}

export const HYPOTHETICAL_NOTE =
  'All values are hypothetical. Learnyx Trading does not connect to any broker, does not execute orders, and does not provide personalised financial advice.';
