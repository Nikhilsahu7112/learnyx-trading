import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Target, XCircle } from 'lucide-react';
import {
  Button,
  ButtonLink,
  Callout,
  Card,
  CardBody,
  PageHeader,
  ProgressBar,
  cx,
} from '../../components/ui';
import { PatternGlyph } from '../../components/PatternGlyph';
import {
  PATTERN_DATA_NOTE,
  candlePatterns,
  patternBiasLabel,
  patternReliabilityNote,
  type CandlePattern,
} from '../../data/patterns';
import { shuffle } from '../../data/quizBank';
import { useProgress } from '../../lib/progress';
import { readJson, writeJson, STORAGE_KEYS } from '../../lib/storage';

interface PatternStats {
  asked: number;
  correct: number;
  streak: number;
  best: number;
}

const EMPTY_STATS: PatternStats = { asked: 0, correct: 0, streak: 0, best: 0 };

export default function PatternTrainer() {
  const { recordQuiz } = useProgress();
  const [order, setOrder] = useState<string[]>(() => shuffle(candlePatterns.map((p) => p.id)));
  const [cursor, setCursor] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [stats, setStats] = useState<PatternStats>(() =>
    readJson<PatternStats>(STORAGE_KEYS.patternStats, EMPTY_STATS),
  );
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  const pattern = useMemo<CandlePattern>(() => {
    const found = candlePatterns.find((p) => p.id === order[cursor % order.length]);
    return found ?? candlePatterns[0];
  }, [order, cursor]);

  const options = useMemo(
    () => shuffle(candlePatterns.filter((p) => p.id !== pattern.id)).slice(0, 3),
    [pattern.id],
  );

  const choices = useMemo(() => shuffle([pattern, ...options]), [pattern, options]);

  function answer(id: string) {
    if (guess) return;
    setGuess(id);
    const right = id === pattern.id;
    const next: PatternStats = {
      asked: stats.asked + 1,
      correct: stats.correct + (right ? 1 : 0),
      streak: right ? stats.streak + 1 : 0,
      best: right ? Math.max(stats.best, stats.streak + 1) : stats.best,
    };
    setStats(next);
    writeJson(STORAGE_KEYS.patternStats, next);
    setSessionAnswered((n) => n + 1);
    setSessionCorrect((n) => n + (right ? 1 : 0));
  }

  function next() {
    if (cursor + 1 >= order.length) {
      const correct = sessionCorrect;
      const total = sessionAnswered;
      if (total > 0) {
        recordQuiz({
          id: `patterns-${Date.now()}`,
          label: `Pattern trainer (${total} patterns)`,
          category: 'pattern',
          correct,
          total,
        });
      }
      setOrder(shuffle(candlePatterns.map((p) => p.id)));
      setCursor(0);
      setSessionAnswered(0);
      setSessionCorrect(0);
      setGuess(null);
      return;
    }
    setCursor((c) => c + 1);
    setGuess(null);
  }

  function resetStats() {
    setStats(EMPTY_STATS);
    writeJson(STORAGE_KEYS.patternStats, EMPTY_STATS);
    setSessionAnswered(0);
    setSessionCorrect(0);
  }

  const accuracy = stats.asked > 0 ? Math.round((stats.correct / stats.asked) * 100) : null;
  const sessionAccuracy =
    sessionAnswered > 0 ? Math.round((sessionCorrect / sessionAnswered) * 100) : null;

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
        eyebrow="Trading Lab · Tool 02"
        title="Candlestick Pattern Trainer"
        description="Pattern dekhein, naam pehchaanein, phir explanation aur confirmation rules padhein. Har pattern ke saath uska context aur limitations bhi milte hain."
      />

      <Callout tone="info" title="Shapes are illustrations">
        <p>{PATTERN_DATA_NOTE}</p>
      </Callout>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <Card>
          <CardBody>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-accent-400 uppercase">
                Pattern {cursor + 1} of {order.length}
              </p>
              <p className="text-[0.68rem] text-text-muted">
                {sessionAnswered > 0
                  ? `This session: ${sessionCorrect}/${sessionAnswered}${sessionAccuracy !== null ? ` (${sessionAccuracy}%)` : ''}`
                  : 'Session not started'}
              </p>
            </div>
            <div className="mt-2">
              <ProgressBar value={(cursor / order.length) * 100} />
            </div>

            <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/50 py-8">
              <PatternGlyph shape={pattern.shape} width={200} height={170} />
              <p className="text-[0.7rem] text-text-muted">
                {pattern.candleCount} candle{pattern.candleCount > 1 ? 's' : ''} shown
              </p>
            </div>

            <p className="mt-5 text-sm font-semibold text-text-primary">
              Is pattern ka naam kya hai?
            </p>

            <div className="mt-3 space-y-2" role="group" aria-label="Pattern options">
              {choices.map((c) => {
                const chosen = guess === c.id;
                const isCorrect = c.id === pattern.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => answer(c.id)}
                    disabled={Boolean(guess)}
                    aria-pressed={chosen}
                    className={cx(
                      'flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[0.85rem] transition-colors',
                      guess && isCorrect && 'border-up-500/45 bg-up-500/12 text-text-primary',
                      guess && chosen && !isCorrect && 'border-down-500/45 bg-down-500/12 text-text-primary',
                      guess && !isCorrect && !chosen && 'border-white/8 bg-white/2 text-text-muted',
                      !guess && 'border-white/12 bg-white/4 text-text-secondary hover:border-accent-500/40 hover:bg-white/8 hover:text-text-primary',
                    )}
                  >
                    <span className="flex-1 font-medium">{c.name}</span>
                    {guess && isCorrect && (
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-up-400" />
                    )}
                    {guess && chosen && !isCorrect && (
                      <XCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-down-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {guess && (
              <div className="animate-fade-in mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
                <p className="text-[0.8rem] font-semibold text-text-primary">
                  {guess === pattern.id ? 'Correct.' : `Ye ${pattern.name} tha.`}
                </p>
                <Button onClick={next}>
                  {cursor + 1 >= order.length ? 'New round' : 'Next pattern'}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardBody className="p-4">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                <Target aria-hidden="true" className="h-3 w-3 text-accent-400" />
                All-time stats
              </p>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-[0.75rem]">
                  <span className="text-text-muted">Accuracy</span>
                  <span className="tnum font-semibold text-text-primary">
                    {accuracy === null ? '—' : `${accuracy}%`}
                  </span>
                </div>
                <div className="flex justify-between text-[0.75rem]">
                  <span className="text-text-muted">Answered</span>
                  <span className="tnum font-semibold text-text-primary">{stats.asked}</span>
                </div>
                <div className="flex justify-between text-[0.75rem]">
                  <span className="text-text-muted">Current streak</span>
                  <span className="tnum font-semibold text-accent-400">{stats.streak}</span>
                </div>
                <div className="flex justify-between text-[0.75rem]">
                  <span className="text-text-muted">Best streak</span>
                  <span className="tnum font-semibold text-violet-400">{stats.best}</span>
                </div>
              </div>
              <Button variant="ghost" className="mt-3 w-full text-[0.7rem]" onClick={resetStats}>
                <RotateCcw aria-hidden="true" className="h-3 w-3" />
                Reset stats
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                Pattern reference
              </p>
              <p className="mt-1.5 text-[0.7rem] leading-relaxed text-text-muted">
                {candlePatterns.length} patterns. Har entry me context, confirmation aur caveat
                likha hai.
              </p>
              <ButtonLink to="/learn/technical-analysis-candlesticks/triple-candle-patterns/morning-evening-star" variant="ghost" className="mt-2 w-full text-[0.7rem]">
                Read framework lesson
              </ButtonLink>
            </CardBody>
          </Card>
        </aside>
      </div>

      {guess && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-text-primary">{pattern.name}</h2>
                <span
                  className={cx(
                    'rounded border px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide uppercase',
                    pattern.bias === 'bullish'
                      ? 'border-up-500/35 bg-up-500/12 text-up-400'
                      : pattern.bias === 'bearish'
                        ? 'border-down-500/35 bg-down-500/12 text-down-400'
                        : 'border-white/15 bg-white/6 text-text-muted',
                  )}
                >
                  {patternBiasLabel[pattern.bias]}
                </span>
              </div>
              <p className="mt-1 text-[0.72rem] text-text-muted">{pattern.hindi}</p>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-text-secondary">
                {pattern.summary}
              </p>
              <p className="mt-3 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Context
              </p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-text-secondary">
                {pattern.context}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-[0.68rem] font-semibold tracking-wide text-up-400 uppercase">
                Confirmation rules
              </p>
              <ul className="mt-2 space-y-1.5">
                {pattern.confirmation.map((c) => (
                  <li key={c} className="flex gap-2 text-[0.8rem] leading-relaxed text-text-secondary">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-up-400" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-warn-500/25 bg-warn-500/[0.07] px-3 py-2.5">
                <p className="text-[0.66rem] font-semibold tracking-wide text-warn-500 uppercase">
                  Reliability: {pattern.reliability}
                </p>
                <p className="mt-1 text-[0.78rem] leading-relaxed text-text-secondary">
                  {patternReliabilityNote[pattern.reliability]}
                </p>
              </div>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-text-muted">{pattern.caveat}</p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
