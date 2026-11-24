import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  RefreshCw,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  Button,
  Card,
  CardBody,
  PageHeader,
  Pill,
  ProgressBar,
  Section,
  cx,
} from '../components/ui';
import {
  practiceBank,
  practiceCategories,
  questionsByCategory,
  shuffle,
} from '../data/quizBank';
import type { QuizCategory, QuizQuestion } from '../lib/types';
import { useProgress } from '../lib/progress';

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';
const COUNTS = [5, 10, 20] as const;

interface Session {
  questions: QuizQuestion[];
  label: string;
  category: QuizCategory | 'all';
  difficulty: Difficulty;
}

const DIFF_STYLE: Record<string, string> = {
  easy: 'border-up-500/35 bg-up-500/10 text-up-400',
  medium: 'border-warn-500/35 bg-warn-500/10 text-warn-500',
  hard: 'border-down-500/35 bg-down-500/10 text-down-400',
};

export default function Practice() {
  const { recordQuiz, quizScores } = useProgress();

  const [category, setCategory] = useState<QuizCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [count, setCount] = useState<(typeof COUNTS)[number]>(10);

  const [session, setSession] = useState<Session | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const pool = useMemo(() => {
    const base = questionsByCategory(category);
    return difficulty === 'all' ? base : base.filter((q) => q.difficulty === difficulty);
  }, [category, difficulty]);

  function start() {
    const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
    if (selected.length === 0) return;
    const label =
      (category === 'all' ? 'Mixed practice' : practiceCategories.find((c) => c.id === category)?.label ?? 'Practice') +
      (difficulty === 'all' ? '' : ` · ${difficulty}`);
    setSession({ questions: selected, label, category, difficulty });
    setAnswers(new Array(selected.length).fill(null));
    setIndex(0);
    setRevealed(false);
    setFinished(false);
    setRunKey((k) => k + 1);
  }

  function choose(optionIndex: number) {
    if (revealed) return;
    setAnswers((a) => {
      const copy = [...a];
      copy[index] = optionIndex;
      return copy;
    });
    setRevealed(true);
  }

  function nextQuestion() {
    if (!session) return;
    if (index + 1 >= session.questions.length) {
      const correct = session.questions.reduce(
        (n, q, i) => (answers[i] === q.correctIndex ? n + 1 : n),
        0,
      );
      recordQuiz({
        id: `practice-${Date.now()}`,
        label: session.label,
        category: session.category === 'all' ? 'mixed' : session.category,
        correct,
        total: session.questions.length,
      });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setRevealed(false);
  }

  /* ---------------- Results screen ---------------- */
  if (finished && session) {
    const correct = session.questions.reduce(
      (n, q, i) => (answers[i] === q.correctIndex ? n + 1 : n),
      0,
    );
    const total = session.questions.length;
    const pctScore = Math.round((correct / total) * 100);

    return (
      <div key={runKey}>
        <PageHeader eyebrow="Practice · Results" title="Session complete" description={session.label} />

        <Card className="mx-auto max-w-2xl p-6 text-center">
          <div
            className={cx(
              'mx-auto grid h-16 w-16 place-items-center rounded-2xl border',
              pctScore >= 80
                ? 'border-up-500/40 bg-up-500/12 text-up-400'
                : pctScore >= 50
                  ? 'border-warn-500/40 bg-warn-500/12 text-warn-500'
                  : 'border-down-500/40 bg-down-500/12 text-down-400',
            )}
          >
            <Trophy aria-hidden="true" className="h-7 w-7" />
          </div>
          <p className="tnum mt-4 text-4xl font-semibold text-text-primary">{pctScore}%</p>
          <p className="mt-1 text-sm text-text-secondary">
            {correct} of {total} correct
          </p>
          <div className="mx-auto mt-5 max-w-sm">
            <ProgressBar value={pctScore} label="Session score" />
          </div>
          <p className="mx-auto mt-5 max-w-md text-[0.82rem] leading-relaxed text-text-muted">
            {pctScore >= 80
              ? 'Strong session. Ab in concepts ko ek lesson me padh kar depth add karein.'
              : pctScore >= 50
                ? 'Aadha se zyada sahi — jo galat hua unke explanations dobara padhein, phir retry karein.'
                : 'Concepts weak hain — practice se pehle related lessons padhna zyada useful hoga.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button onClick={start}>
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              New session
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setFinished(false);
                setIndex(0);
                setRevealed(true);
              }}
            >
              Review answers
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSession(null);
                setFinished(false);
              }}
            >
              Change settings
            </Button>
          </div>
        </Card>

        <Section title="Answer review" className="mt-8">
          <div className="space-y-3">
            {session.questions.map((q, i) => {
              const chosen = answers[i];
              const isRight = chosen === q.correctIndex;
              return (
                <Card key={q.id} className="p-4">
                  <div className="flex items-start gap-2">
                    {isRight ? (
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-up-400" />
                    ) : (
                      <XCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-down-400" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.84rem] font-medium text-text-primary">{q.question}</p>
                      <p className="mt-1.5 text-[0.76rem] text-text-muted">
                        Your answer:{' '}
                        <span className={isRight ? 'text-up-400' : 'text-down-400'}>
                          {chosen === null ? 'Not answered' : q.options[chosen]}
                        </span>
                      </p>
                      {!isRight && (
                        <p className="mt-1 text-[0.76rem] text-up-400">
                          Correct: {q.options[q.correctIndex]}
                        </p>
                      )}
                      <p className="mt-2 rounded-lg border border-white/8 bg-white/4 px-2.5 py-2 text-[0.75rem] leading-relaxed text-text-secondary">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      </div>
    );
  }

  /* ---------------- Active question ---------------- */
  if (session) {
    const q = session.questions[index];
    const chosen = answers[index];
    const progress = ((index + (revealed ? 1 : 0)) / session.questions.length) * 100;

    return (
      <div key={runKey}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-accent-400 uppercase">
              {session.label}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Question {index + 1} of {session.questions.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                'rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase',
                DIFF_STYLE[q.difficulty],
              )}
            >
              {q.difficulty}
            </span>
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => {
                setSession(null);
                setFinished(false);
              }}
            >
              Exit session
            </Button>
          </div>
        </div>
        <ProgressBar value={progress} label="Session progress" />

        <Card className="mt-5" aria-live="polite">
          <CardBody>
            <h1 className="text-[1.05rem] leading-snug font-semibold text-text-primary">{q.question}</h1>

            <div className="mt-5 space-y-2" role="group" aria-label="Answer options">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = oi === q.correctIndex;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => choose(oi)}
                    disabled={revealed}
                    aria-pressed={isChosen}
                    className={cx(
                      'flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[0.86rem] transition-colors',
                      revealed && isCorrect && 'border-up-500/45 bg-up-500/12 text-text-primary',
                      revealed && isChosen && !isCorrect && 'border-down-500/45 bg-down-500/12 text-text-primary',
                      revealed && !isCorrect && !isChosen && 'border-white/8 bg-white/2 text-text-muted',
                      !revealed && 'border-white/12 bg-white/4 text-text-secondary hover:border-accent-500/40 hover:bg-white/8 hover:text-text-primary',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-white/15 bg-white/6 text-[0.65rem] font-bold text-text-muted"
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {revealed && isCorrect && (
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-up-400" />
                    )}
                    {revealed && isChosen && !isCorrect && (
                      <XCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-down-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="animate-fade-in mt-5 rounded-xl border border-white/10 bg-white/4 p-4">
                <p className="text-[0.72rem] font-semibold text-text-secondary">
                  {chosen === q.correctIndex ? 'Correct!' : 'Not correct.'}
                </p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-text-secondary">
                  {q.explanation}
                </p>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <Button onClick={nextQuestion} disabled={!revealed}>
                {index + 1 >= session.questions.length ? 'See results' : 'Next question'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  /* ---------------- Setup screen ---------------- */
  const recent = [...quizScores].slice(-5).reverse();

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Test your understanding"
        description={`${practiceBank.length} scenario-based questions, 8 categories aur 3 difficulty levels. Har answer ke saath explanation milta hai — sirf score nahi.`}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card>
          <CardBody className="space-y-5">
            <div>
              <p className="mb-2 text-[0.7rem] font-semibold tracking-wide text-text-muted uppercase">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Pill active={category === 'all'} onClick={() => setCategory('all')}>
                  All categories
                </Pill>
                {practiceCategories.map((c) => {
                  const n = practiceBank.filter((q) => q.category === c.id).length;
                  return (
                    <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                      {c.label}
                      <span className="ml-1 text-[0.6rem] opacity-60">{n}</span>
                    </Pill>
                  );
                })}
              </div>
              {category !== 'all' && (
                <p className="mt-2 text-[0.72rem] text-text-muted">
                  {practiceCategories.find((c) => c.id === category)?.description}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-[0.7rem] font-semibold tracking-wide text-text-muted uppercase">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                  <Pill key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
                    {d === 'all' ? 'All levels' : d}
                  </Pill>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[0.7rem] font-semibold tracking-wide text-text-muted uppercase">
                Questions per session
              </p>
              <div className="flex flex-wrap gap-1.5">
                {COUNTS.map((c) => (
                  <Pill key={c} active={count === c} onClick={() => setCount(c)}>
                    {c} questions
                  </Pill>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-white/8 pt-4">
              <Button onClick={start} disabled={pool.length === 0}>
                <Flame aria-hidden="true" className="h-4 w-4" />
                Start practice
              </Button>
              <p className="text-[0.75rem] text-text-muted">
                {pool.length === 0
                  ? 'Is combination me koi question nahi — filters badlein.'
                  : `${Math.min(count, pool.length)} of ${pool.length} available questions will be asked, shuffled each time.`}
              </p>
            </div>
          </CardBody>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                Recent sessions
              </p>
              {recent.length === 0 ? (
                <p className="mt-2 text-[0.75rem] leading-relaxed text-text-muted">
                  Abhi koi session nahi. Pehla practice complete karein — scores aapke browser me
                  save honge.
                </p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {recent.map((s) => (
                    <li
                      key={s.id + s.at}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1.5"
                    >
                      <span className="min-w-0 flex-1 truncate text-[0.72rem] text-text-secondary">
                        {s.label}
                      </span>
                      <span className="tnum shrink-0 text-[0.7rem] font-semibold text-text-primary">
                        {s.correct}/{s.total}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                How practice works
              </p>
              <ul className="mt-2 space-y-1.5 text-[0.74rem] leading-relaxed text-text-muted">
                <li>Questions har session me shuffle hote hain.</li>
                <li>Answer choose karne par turant explanation dikhta hai.</li>
                <li>Scores local storage me save hote hain — koi login nahi.</li>
                <li>Retry par naya random set milta hai.</li>
              </ul>
            </CardBody>
          </Card>
        </aside>
      </div>

      <Section
        title="Category breakdown"
        description="Har category ke questions ki difficulty mix — practice se pehle dekh lein."
        className="mt-10"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {practiceCategories.map((c) => {
            const qs = practiceBank.filter((q) => q.category === c.id);
            const easy = qs.filter((q) => q.difficulty === 'easy').length;
            const medium = qs.filter((q) => q.difficulty === 'medium').length;
            const hard = qs.filter((q) => q.difficulty === 'hard').length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className="card card-hover p-3.5 text-left"
              >
                <p className="text-[0.8rem] font-semibold text-text-primary">{c.label}</p>
                <p className="tnum mt-1 text-[0.68rem] text-text-muted">
                  {qs.length} questions
                </p>
                <div className="mt-2 flex gap-2 text-[0.62rem]">
                  <span className="text-up-400">{easy} easy</span>
                  <span className="text-warn-500">{medium} med</span>
                  <span className="text-down-400">{hard} hard</span>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {quizScores.length > 0 && (
        <div className="mt-8">
          <Button
            variant="ghost"
            className="text-xs text-text-muted"
            onClick={() => {
              setCategory('all');
              setDifficulty('all');
              setCount(10);
            }}
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
