import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight, CheckCircle2, Info, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function formatNumber(n: number, digits = 2) {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('en-IN', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

/**
 * Currency formatter. Unlike `formatNumber`, this always shows the requested
 * decimal places so a money column lines up (95.2 renders as 95.20) and never
 * drops trailing zeros that readers expect on a price.
 */
export function formatCurrency(n: number, currency = '₹', digits = 2) {
  if (!Number.isFinite(n)) return '—';
  return (
    currency +
    n.toLocaleString('en-IN', {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    })
  );
}

export function formatPct(n: number, digits = 2) {
  if (!Number.isFinite(n)) return '—';
  return `${n >= 0 ? '' : ''}${n.toFixed(digits)}%`;
}

export function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function readingTime(minutes: number) {
  return `${minutes} min read`;
}

/* ------------------------------------------------------------------ */
/* Page scaffolding                                                    */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 animate-fade-rise sm:mb-10">
      {eyebrow && (
        <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.18em] text-accent-400 uppercase">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl leading-[1.12] font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-[2.65rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[0.95rem] leading-relaxed text-text-secondary sm:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
      </div>
      {children}
    </header>
  );
}

export function Section({
  title,
  description,
  action,
  children,
  className,
  id,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx('mb-12', className)}>
      {(title || action) && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  interactive,
  id,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  id?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return (
    <Tag id={id} className={cx('card', interactive && 'card-hover', className)}>
      {children}
    </Tag>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('p-5 sm:p-6', className)}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Buttons & links                                                     */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'accent-gradient px-5 py-2.5 text-ink-950 shadow-[0_12px_32px_-14px_rgba(100,140,255,0.85)] hover:brightness-110 active:brightness-95',
  secondary:
    'border border-white/16 bg-white/6 px-5 py-2.5 text-text-primary backdrop-blur hover:border-white/26 hover:bg-white/10',
  ghost: 'px-3 py-2 text-text-secondary hover:bg-white/6 hover:text-text-primary',
  danger:
    'border border-down-500/40 bg-down-500/12 px-5 py-2.5 text-down-400 hover:bg-down-500/20',
};

export function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button className={cx(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className,
  external,
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer noopener"
        className={cx(buttonBase, buttonVariants[variant], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cx(buttonBase, buttonVariants[variant], className)}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Badges & chips                                                      */
/* ------------------------------------------------------------------ */

const difficultyStyles: Record<string, string> = {
  Beginner: 'border-up-500/35 bg-up-500/12 text-up-400',
  Intermediate: 'border-warn-500/35 bg-warn-500/12 text-warn-500',
  Advanced: 'border-down-500/35 bg-down-500/12 text-down-400',
  easy: 'border-up-500/35 bg-up-500/12 text-up-400',
  medium: 'border-warn-500/35 bg-warn-500/12 text-warn-500',
  hard: 'border-down-500/35 bg-down-500/12 text-down-400',
};

export function DifficultyBadge({ level, className }: { level: string; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold tracking-wide uppercase',
        difficultyStyles[level] ?? 'border-white/15 bg-white/6 text-text-secondary',
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.7rem] font-medium text-text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Pill({
  children,
  active,
  onClick,
  ariaPressed,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaPressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ?? active}
      className={cx(
        'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-accent-500/50 bg-accent-500/18 text-text-primary'
          : 'border-white/10 bg-white/4 text-text-secondary hover:border-white/20 hover:bg-white/8 hover:text-text-primary',
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Callouts                                                            */
/* ------------------------------------------------------------------ */

const calloutStyles = {
  info: { box: 'border-accent-500/28 bg-accent-500/8', icon: 'text-accent-400', Icon: Info },
  tip: { box: 'border-up-500/28 bg-up-500/8', icon: 'text-up-400', Icon: Lightbulb },
  warn: { box: 'border-warn-500/30 bg-warn-500/8', icon: 'text-warn-500', Icon: AlertTriangle },
  danger: { box: 'border-down-500/30 bg-down-500/8', icon: 'text-down-400', Icon: ShieldAlert },
};

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const style = calloutStyles[tone];
  const Icon = style.Icon;
  return (
    <div className={cx('rounded-2xl border p-4 sm:p-5', style.box)}>
      <div className="flex gap-3">
        <Icon aria-hidden="true" className={cx('mt-0.5 h-4.5 w-4.5 shrink-0', style.icon)} />
        <div className="min-w-0 text-sm leading-relaxed text-text-secondary">
          {title && <p className="mb-1 font-semibold text-text-primary">{title}</p>}
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Disclaimer({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cx(
        'rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-xs leading-relaxed text-text-muted',
        className,
      )}
    >
      <p>
        <span className="font-semibold text-text-secondary">Educational note: </span>
        {text}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* States                                                              */
/* ------------------------------------------------------------------ */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('skeleton', className)} aria-hidden="true" />;
}

export function LoadingBlock({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cx('h-4', i === rows - 1 ? 'w-2/3' : 'w-full')} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="glass-subtle flex flex-col items-center rounded-2xl px-6 py-12 text-center">
      {icon && <div className="mb-4 text-text-muted">{icon}</div>}
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-down-500/30 bg-down-500/8 p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-down-400">
        <AlertTriangle aria-hidden="true" className="h-4 w-4" />
        Something went wrong
      </p>
      <p className="mt-2 text-sm text-text-secondary">{message}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function ProgressBar({
  value,
  label,
  showValue = true,
  size = 'md',
}: {
  value: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="text-text-muted">{label}</span>}
          {showValue && <span className="tnum font-semibold text-text-secondary">{clamped}%</span>}
        </div>
      )}
      <div
        className={cx('w-full overflow-hidden rounded-full bg-white/8', size === 'sm' ? 'h-1' : 'h-1.5')}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="accent-gradient h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'neutral' | 'up' | 'down' | 'warn';
}) {
  const tones = {
    neutral: 'text-text-primary',
    up: 'text-up-400',
    down: 'text-down-400',
    warn: 'text-warn-500',
  };
  return (
    <div className="glass-subtle rounded-xl px-3.5 py-3">
      <p className="text-[0.68rem] font-medium tracking-wide text-text-muted uppercase">{label}</p>
      <p className={cx('tnum mt-1 text-lg font-semibold', tones[tone])}>{value}</p>
      {sub && <p className="mt-0.5 text-[0.7rem] text-text-muted">{sub}</p>}
    </div>
  );
}

export function KeyValueRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/6 py-2 last:border-0">
      <span className="text-xs text-text-muted">{k}</span>
      <span className="tnum text-sm font-medium text-text-primary">{v}</span>
    </div>
  );
}

export function CompletedFlag({ done }: { done: boolean }) {
  if (!done) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-up-400">
      <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
      Completed
    </span>
  );
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 transition-colors hover:text-accent-300"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Responsive table wrapper — never causes horizontal page scroll. */
export function TableWrap({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: ReactNode[][];
  caption?: string;
}) {
  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-white/6">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-3 py-2.5 text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/6">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 align-top text-text-secondary">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
