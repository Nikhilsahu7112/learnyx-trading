import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Target } from 'lucide-react';
import type { QuizQuestion } from '../lib/types';
import { Button, Card, ProgressBar, cx } from './ui';
import { useProgress } from '../lib/progress';

export function KnowledgeCheck({
  questions,
  lessonId,
  onComplete,
}: {
  questions: QuizQuestion[];
  lessonId: string;
  onComplete?: () => void;
}) {
  const { recordQuiz } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = questions.reduce(
    (n, q, i) => (answers[i] === q.correctIndex ? n + 1 : n),
    0,
  );
  const answeredAll = Object.keys(answers).length === questions.length;

  function submit() {
    setSubmitted(true);
    recordQuiz({
      id: lessonId,
      label: 'Lesson knowledge check',
      category: 'lesson',
      correct: correctCount,
      total: questions.length,
    });
    if (correctCount === questions.length) onComplete?.();
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <Card className="overflow-hidden" id="knowledge-check">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5">
        <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase">
          <Target aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
          Knowledge check
        </p>
        {submitted && (
          <span className="tnum text-xs font-semibold text-text-primary">
            {correctCount}/{questions.length} correct
          </span>
        )}
      </div>

      <div className="divide-y divide-white/6">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <fieldset key={q.id} className="px-5 py-5">
              <legend className="mb-3 text-[0.86rem] font-semibold leading-snug text-text-primary">
                <span className="tnum mr-1.5 text-text-muted">{qi + 1}.</span>
                {q.question}
              </legend>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === q.correctIndex;
                  const show = submitted;
                  return (
                    <label
                      key={oi}
                      className={cx(
                        'flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-[0.82rem] transition-colors',
                        show && isCorrect && 'border-up-500/40 bg-up-500/10 text-text-primary',
                        show && isChosen && !isCorrect && 'border-down-500/40 bg-down-500/10 text-text-primary',
                        !show && isChosen && 'border-accent-500/45 bg-accent-500/12 text-text-primary',
                        !show && !isChosen && 'border-white/10 bg-white/3 text-text-secondary hover:border-white/20 hover:bg-white/6',
                        show && !isCorrect && !isChosen && 'border-white/8 bg-white/2 text-text-muted',
                      )}
                    >
                      <input
                        type="radio"
                        name={`${q.id}`}
                        value={oi}
                        checked={isChosen}
                        disabled={submitted}
                        onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#648CFF]"
                      />
                      <span className="flex-1">{opt}</span>
                      {show && isCorrect && (
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-up-400" />
                      )}
                      {show && isChosen && !isCorrect && (
                        <XCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-down-400" />
                      )}
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <div className="animate-fade-in mt-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2.5">
                  <p className="text-[0.72rem] font-semibold text-text-secondary">
                    {chosen === q.correctIndex ? 'Correct.' : 'Not quite.'}
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-text-muted">
                    {q.explanation}
                  </p>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {submitted ? (
          <>
            <div className="w-full sm:max-w-xs">
              <ProgressBar
                value={(correctCount / questions.length) * 100}
                label={`${correctCount} of ${questions.length} correct`}
              />
            </div>
            <Button variant="secondary" onClick={reset}>
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Retry quiz
            </Button>
          </>
        ) : (
          <>
            <p className="text-[0.75rem] text-text-muted">
              {answeredAll
                ? 'All questions answered — check your answers.'
                : `${Object.keys(answers).length} of ${questions.length} answered.`}
            </p>
            <Button onClick={submit} disabled={!answeredAll}>
              Check answers
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
