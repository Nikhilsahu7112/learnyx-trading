import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookMarked,
  CheckCircle2,
  Download,
  NotebookPen,
  RotateCcw,
  Trash2,
  TriangleAlert,
  Trophy,
} from 'lucide-react';
import {
  Button,
  Callout,
  Card,
  EmptyState,
  PageHeader,
  ProgressBar,
  Section,
  cx,
} from '../components/ui';
import { useProgress } from '../lib/progress';
import { exportAllData, clearAllLearnyxData } from '../lib/storage';
import { courses, lessonsForModule, modulesForCourse, lessonMetaById, courseBySlug } from '../data/curriculum';
import { getLesson } from '../data/lessons';

export default function ProgressPage() {
  const {
    lessons,
    bookmarks,
    notes,
    quizScores,
    ready,
    storageEnabled,
    resetProgress,
    deleteNote,
    completionPct,
    lastLessonId,
  } = useProgress();

  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmWipe, setConfirmWipe] = useState(false);

  const totalLessons = useMemo(
    () => courses.flatMap((c) => modulesForCourse(c.id).flatMap((m) => lessonsForModule(m.id))),
    [],
  );
  const overallPct = completionPct(totalLessons.map((l) => l.id));
  const completedCount = totalLessons.filter((l) => lessons[l.id]?.completed).length;

  const lastLesson = lastLessonId ? lessonMetaById.get(lastLessonId) : null;
  const lastCourse = lastLesson ? courseBySlug.get(lastLesson.courseId) : null;

  const bookmarkItems = bookmarks
    .map((id) => ({ meta: lessonMetaById.get(id), content: getLessonByMetaId(id) }))
    .filter((b) => b.meta);

  const noteItems = Object.values(notes).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const recentSessions = [...quizScores].reverse().slice(0, 8);

  const avgScore = quizScores.length
    ? Math.round(
        (quizScores.reduce((s, q) => s + q.correct / q.total, 0) / quizScores.length) * 100,
      )
    : null;

  function handleExport() {
    const blob = new Blob([JSON.stringify(exportAllData(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnyx-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!ready) {
    return (
      <div>
        <PageHeader eyebrow="Progress" title="Loading your local progress…" />
        <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Your progress"
        title="Learning dashboard"
        description="Sab progress aapke browser ke local storage me rehta hai. Koi account nahi, koi server upload nahi — aap ise kabhi bhi export ya delete kar sakte hain."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={handleExport} disabled={!storageEnabled}>
              <Download aria-hidden="true" className="h-4 w-4" />
              Export data
            </Button>
          </div>
        }
      />

      {!storageEnabled && (
        <Callout tone="warn" title="Storage unavailable">
          <p>
            Aapka browser localStorage block kar raha hai (private mode ya strict privacy settings).
            Progress is session tak hi rahega aur page reload par reset ho jaayega. Sab lessons phir
            bhi padh sakte hain.
          </p>
        </Callout>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
            Lessons completed
          </p>
          <p className="tnum mt-2 text-2xl font-semibold text-text-primary">
            {completedCount}
            <span className="text-sm font-normal text-text-muted"> / {totalLessons.length}</span>
          </p>
          <div className="mt-3">
            <ProgressBar value={overallPct} />
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
            Overall completion
          </p>
          <p className="tnum mt-2 text-2xl font-semibold text-accent-400">{overallPct}%</p>
          <p className="mt-2 text-[0.7rem] text-text-muted">
            {overallPct === 0
              ? 'Pehla lesson shuru karein.'
              : overallPct < 50
                ? 'Consistency build ho rahi hai.'
                : 'Achha pace — continue karein.'}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
            Practice sessions
          </p>
          <p className="tnum mt-2 text-2xl font-semibold text-text-primary">{quizScores.length}</p>
          <p className="mt-2 text-[0.7rem] text-text-muted">
            {avgScore === null ? 'Abhi koi session nahi.' : `Average score ${avgScore}%`}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
            Bookmarks & notes
          </p>
          <p className="tnum mt-2 text-2xl font-semibold text-text-primary">
            {bookmarks.length}
            <span className="text-sm font-normal text-text-muted"> / {noteItems.length}</span>
          </p>
          <p className="mt-2 text-[0.7rem] text-text-muted">Bookmarks / notes</p>
        </Card>
      </div>

      {lastLesson && lastCourse && (
        <Card className="mt-5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                Continue where you left off
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                {lastLesson.title}
              </p>
              <p className="text-[0.72rem] text-text-muted">
                Level {lastCourse.level} · {lastCourse.title}
              </p>
            </div>
            <Link
              to={`/learn/${lastLesson.courseId}/${lastLesson.id.split('/')[1]}/${lastLesson.slug}`}
              className="shrink-0 rounded-xl border border-accent-500/40 bg-accent-500/15 px-4 py-2 text-xs font-semibold text-text-primary hover:bg-accent-500/22"
            >
              Resume lesson
            </Link>
          </div>
        </Card>
      )}

      {/* Per-course progress */}
      <Section title="Course progress" className="mt-10">
        <div className="grid gap-3 md:grid-cols-2">
          {courses.map((c) => {
            const ids = modulesForCourse(c.id).flatMap((m) => lessonsForModule(m.id).map((l) => l.id));
            const done = ids.filter((id) => lessons[id]?.completed).length;
            return (
              <Card key={c.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold tracking-wide text-text-muted uppercase">
                      Level {c.level}
                    </p>
                    <Link
                      to={`/courses/${c.slug}`}
                      className="mt-0.5 block truncate text-[0.84rem] font-semibold text-text-primary hover:text-accent-300"
                    >
                      {c.title}
                    </Link>
                  </div>
                  <span className="tnum shrink-0 text-[0.7rem] font-semibold text-text-secondary">
                    {done}/{ids.length}
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={completionPct(ids)} />
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Bookmarks */}
      <Section title="Bookmarked lessons" description="Jo lessons aapne baad ke liye save kiye.">
        {bookmarkItems.length === 0 ? (
          <EmptyState
            icon={<BookMarked aria-hidden="true" className="h-5 w-5" />}
            title="Koi bookmark nahi"
            description="Kisi bhi lesson ke header se Bookmark button dabayein — wo yahan aa jaayega."
            action={
              <Link
                to="/learn"
                className="rounded-xl border border-white/14 bg-white/6 px-4 py-2 text-xs font-semibold text-text-primary hover:bg-white/10"
              >
                Browse lessons
              </Link>
            }
          />
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {bookmarkItems.map(({ meta }) =>
              meta ? (
                <Link
                  key={meta.id}
                  to={`/learn/${meta.courseId}/${meta.id.split('/')[1]}/${meta.slug}`}
                  className="card card-hover flex items-center gap-2.5 p-3.5"
                >
                  {lessons[meta.id]?.completed ? (
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-up-400" />
                  ) : (
                    <BookMarked aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-400" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.82rem] font-medium text-text-primary">
                      {meta.title}
                    </span>
                    <span className="block text-[0.68rem] text-text-muted">
                      {courseBySlug.get(meta.courseId)?.title}
                    </span>
                  </span>
                </Link>
              ) : null,
            )}
          </div>
        )}
      </Section>

      {/* Notes */}
      <Section title="Your notes" description="Lessons ke saath likhi notes, newest first.">
        {noteItems.length === 0 ? (
          <EmptyState
            icon={<NotebookPen aria-hidden="true" className="h-5 w-5" />}
            title="Koi note nahi"
            description="Kisi bhi lesson ke side panel me notes likh sakte hain — wo sirf aapke browser me save hoti hain."
          />
        ) : (
          <div className="space-y-2">
            {noteItems.map((n) => {
              const meta = lessonMetaById.get(n.lessonId);
              return (
                <Card key={n.lessonId} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {meta ? (
                        <Link
                          to={`/learn/${meta.courseId}/${n.lessonId.split('/')[1]}/${meta.slug}`}
                          className="text-[0.82rem] font-semibold text-text-primary hover:text-accent-300"
                        >
                          {meta.title}
                        </Link>
                      ) : (
                        <p className="text-[0.82rem] font-semibold text-text-primary">
                          {n.lessonId}
                        </p>
                      )}
                      <p className="mt-1 text-[0.68rem] text-text-muted">
                        Updated {new Date(n.updatedAt).toLocaleString('en-IN')}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-[0.8rem] leading-relaxed text-text-secondary">
                        {n.text}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteNote(n.lessonId)}
                      aria-label={`Delete note for ${meta?.title ?? n.lessonId}`}
                      className="shrink-0 rounded-lg border border-white/10 bg-white/4 p-1.5 text-text-muted hover:border-down-500/40 hover:text-down-400"
                    >
                      <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      {/* Quiz history */}
      <Section title="Session history" description="Recent practice aur lesson quiz results.">
        {recentSessions.length === 0 ? (
          <EmptyState
            icon={<Trophy aria-hidden="true" className="h-5 w-5" />}
            title="Koi session nahi"
            description="Practice section se ek session start karein — results yahan track honge."
            action={
              <Link
                to="/practice"
                className="rounded-xl border border-white/14 bg-white/6 px-4 py-2 text-xs font-semibold text-text-primary hover:bg-white/10"
              >
                Start practice
              </Link>
            }
          />
        ) : (
          <div className="space-y-1.5">
            {recentSessions.map((s) => {
              const pctScore = Math.round((s.correct / s.total) * 100);
              return (
                <div
                  key={s.id + s.at}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5"
                >
                  <span className="min-w-0 flex-1 truncate text-[0.8rem] text-text-secondary">
                    {s.label}
                  </span>
                  <span className="text-[0.68rem] text-text-muted">
                    {new Date(s.at).toLocaleDateString('en-IN')}
                  </span>
                  <span
                    className={cx(
                      'tnum shrink-0 rounded-md border px-2 py-0.5 text-[0.68rem] font-semibold',
                      pctScore >= 80
                        ? 'border-up-500/35 bg-up-500/10 text-up-400'
                        : pctScore >= 50
                          ? 'border-warn-500/35 bg-warn-500/10 text-warn-500'
                          : 'border-down-500/35 bg-down-500/10 text-down-400',
                    )}
                  >
                    {s.correct}/{s.total}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Danger zone */}
      <Card className="border-down-500/20 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
          <TriangleAlert aria-hidden="true" className="h-4 w-4 text-down-400" />
          Data controls
        </p>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-text-secondary">
          Progress reset karne se completed lessons, quiz scores, bookmarks aur notes delete ho
          jaayenge. Ye action undo nahi ho sakta.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {confirmReset ? (
            <>
              <Button
                variant="secondary"
                className="border-down-500/40 text-down-400 hover:bg-down-500/12"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
              >
                Yes, reset progress
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setConfirmReset(true)}>
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Reset progress
            </Button>
          )}

          {confirmWipe ? (
            <>
              <Button
                variant="secondary"
                className="border-down-500/40 text-down-400 hover:bg-down-500/12"
                onClick={() => {
                  clearAllLearnyxData();
                  resetProgress();
                  setConfirmWipe(false);
                }}
              >
                Delete everything
              </Button>
              <Button variant="ghost" onClick={() => setConfirmWipe(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => setConfirmWipe(true)}>
              <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
              Clear all local data
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/** Resolve full lesson content by its canonical id, used for bookmark labels only. */
function getLessonByMetaId(id: string) {
  const meta = lessonMetaById.get(id);
  if (!meta) return undefined;
  return getLesson(meta.courseId, id.split('/')[1], meta.slug);
}
