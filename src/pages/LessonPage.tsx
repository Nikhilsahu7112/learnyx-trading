import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Clock,
  GraduationCap,
  ListChecks,
  NotebookPen,
  Quote,
  Target,
} from 'lucide-react';
import {
  Button,
  ButtonLink,
  Callout,
  Card,
  CardBody,
  DifficultyBadge,
  PageHeader,
  ProgressBar,
  Tag,
  cx,
} from '../components/ui';
import { LessonBlocks } from '../components/LessonContent';
import { KnowledgeCheck } from '../components/KnowledgeCheck';
import { findLessonRef, readingSequence } from '../data/curriculum';
import { getLesson, lessonByKey } from '../data/lessons';
import { useProgress } from '../lib/progress';
import NotFound from './NotFound';

export default function LessonPage() {
  const { course, module: moduleSlug, lesson: lessonSlug } = useParams();
  const { markViewed, markComplete, isComplete, toggleBookmark, isBookmarked, notes, saveNote, completionPct } =
    useProgress();
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const ref = course && moduleSlug && lessonSlug ? findLessonRef(course, moduleSlug, lessonSlug) : null;
  const content = ref ? getLesson(ref.course.slug, ref.module.slug, ref.lesson.slug) : undefined;

  const sequence = useMemo(() => readingSequence(), []);
  const index = ref ? sequence.findIndex((l) => l.id === ref.lesson.id) : -1;
  const prev = index > 0 ? sequence[index - 1] : null;
  const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;

  useEffect(() => {
    if (ref) markViewed(ref.lesson.id);
  }, [ref, markViewed]);

  useEffect(() => {
    if (ref) {
      setNoteDraft(notes[ref.lesson.id]?.text ?? '');
      setNoteSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.lesson.id]);

  if (!ref) return <NotFound />;

  const done = isComplete(ref.lesson.id);
  const bookmarked = isBookmarked(ref.lesson.id);

  if (!content) {
    const lessonIds = ref.course
      ? sequence.filter((l) => l.courseId === ref.course.slug).map((l) => l.id)
      : [];
    return (
      <div>
        <PageHeader
          eyebrow={`Level ${ref.course.level} · Module ${ref.module.order}`}
          title={ref.lesson.title}
          description="Ye lesson abhi author nahi hua hai. Hum ise “in progress” ke roop me label kar rahe hain — fake content se better hai honest na hona."
        />
        <Callout tone="warn" title="Lesson in progress">
          <p>
            Ye lesson curriculum structure ka hissa hai par uska poora content abhi publish nahi hua.
            Hum placeholder text nahi dikhate. Tab tak aap is module ke published lessons padh sakte
            hain, ya practice section try kar sakte hain.
          </p>
        </Callout>
        <div className="mt-6">
          <ProgressBar value={completionPct(lessonIds)} label="Course progress" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to={`/courses/${ref.course.slug}`}>
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to course
          </ButtonLink>
          <ButtonLink to="/practice" variant="secondary">
            Practice instead
          </ButtonLink>
        </div>
      </div>
    );
  }

  const courseLessons = sequence.filter((l) => l.courseId === ref.course.slug);
  const coursePct = completionPct(courseLessons.map((l) => l.id));

  return (
    <div className="pb-8">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-text-muted">
        <Link to="/learn" className="hover:text-accent-400">Learn</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/courses/${ref.course.slug}`} className="hover:text-accent-400">
          {ref.course.title}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-text-secondary">Module {ref.module.order}</span>
      </nav>

      <header className="animate-fade-rise">
        <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-accent-400 uppercase">
          Level {ref.course.level} · {ref.module.title}
        </p>
        <h1 className="mt-2.5 text-3xl leading-[1.15] font-semibold tracking-tight text-text-primary sm:text-[2.4rem]">
          {content.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DifficultyBadge level={content.difficulty} />
          <Tag>
            <Clock aria-hidden="true" className="mr-1 h-3 w-3" />
            {content.estimatedMinutes} min read
          </Tag>
          <Tag>Updated {content.updatedAt}</Tag>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full border border-up-500/35 bg-up-500/12 px-2.5 py-0.5 text-[0.68rem] font-semibold text-up-400">
              <CheckCircle2 aria-hidden="true" className="h-3 w-3" />
              Completed
            </span>
          )}
        </div>
        <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-text-secondary">
          {content.intro}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            variant={done ? 'secondary' : 'primary'}
            onClick={() => markComplete(content.id, !done)}
          >
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            {done ? 'Mark as incomplete' : 'Mark as complete'}
          </Button>
          <Button variant="secondary" onClick={() => toggleBookmark(content.id)}>
            <BookMarked aria-hidden="true" className="h-4 w-4" />
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <a
            href="#knowledge-check"
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/6 hover:text-text-primary"
          >
            <Target aria-hidden="true" className="h-4 w-4" />
            Jump to quiz
          </a>
        </div>
        <div className="mt-6 max-w-md">
          <ProgressBar value={coursePct} label="Course progress" />
        </div>
      </header>

      <div className="divider my-8" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <article className="min-w-0">
          {/* 4. Learning objectives */}
          <Card className="mb-6">
            <CardBody>
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase">
                <ListChecks aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
                Learning objectives
              </p>
              <ul className="mt-3 space-y-2">
                {content.learningObjectives.map((o) => (
                  <li key={o} className="flex gap-2 text-[0.84rem] leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-accent-500" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5">
                <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Prerequisites
                </p>
                <ul className="mt-1.5 space-y-1">
                  {content.prerequisites.map((p) => (
                    <li key={p} className="text-[0.78rem] leading-relaxed text-text-muted">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>

          {/* 6-12. Detailed explanation */}
          <LessonBlocks blocks={content.blocks} />

          {/* 13. Practical exercise */}
          <div className="my-6 rounded-2xl border border-violet-500/25 bg-violet-500/[0.07] p-5">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-wide text-violet-400 uppercase">
              <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
              Practical exercise
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-text-secondary">
              {content.exercise}
            </p>
          </div>

          {/* 14. Common mistakes */}
          <div className="my-6">
            <h2 className="text-base font-semibold text-text-primary">Common mistakes</h2>
            <ul className="mt-3 space-y-2">
              {content.commonMistakes.map((m) => (
                <li
                  key={m}
                  className="flex gap-2 rounded-lg border border-down-500/20 bg-down-500/[0.06] px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-text-secondary"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-down-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* 15. Important points */}
          <div className="my-6">
            <h2 className="text-base font-semibold text-text-primary">Important points</h2>
            <ul className="mt-3 space-y-2">
              {content.keyPoints.map((k) => (
                <li key={k} className="flex gap-2 text-[0.83rem] leading-relaxed text-text-secondary">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-up-400" />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          {/* 16. Summary */}
          <div className="my-6 rounded-2xl border border-white/12 bg-white/[0.045] p-5">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase">
              <Quote aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
              Short summary
            </p>
            <ul className="mt-3 space-y-1.5">
              {content.summary.map((s) => (
                <li key={s} className="flex gap-2 text-[0.83rem] leading-relaxed text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-violet-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 17. Knowledge check */}
          <div className="my-8">
            <KnowledgeCheck
              questions={content.knowledgeCheck}
              lessonId={content.id}
              onComplete={() => markComplete(content.id, true)}
            />
          </div>

          {/* 18. References */}
          <div className="my-6">
            <h2 className="text-base font-semibold text-text-primary">References & further reading</h2>
            <ul className="mt-3 space-y-2">
              {content.furtherReading.map((r) => (
                <li key={r.title} className="rounded-lg border border-white/8 bg-white/3 px-3.5 py-2.5">
                  <p className="text-[0.82rem] font-medium text-text-primary">{r.title}</p>
                  <p className="mt-1 text-[0.76rem] leading-relaxed text-text-muted">{r.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.7rem] text-text-muted">
              External resources open in new tabs. Learnyx Trading is not affiliated with them and does
              not control their content.
            </p>
          </div>

          {/* 19-20. Prev / next */}
          <nav aria-label="Lesson navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/learn/${prev.courseId}/${prev.id.split('/')[1]}/${prev.slug}`}
                className="card card-hover group flex flex-col gap-1 p-4"
              >
                <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  <ArrowLeft aria-hidden="true" className="h-3 w-3" />
                  Previous lesson
                </span>
                <span className="text-[0.85rem] font-medium text-text-primary group-hover:text-accent-300">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 px-4 py-4 text-[0.75rem] text-text-muted">
                Ye pehla lesson hai — sequence yahin se shuru hota hai.
              </div>
            )}
            {next ? (
              <Link
                to={`/learn/${next.courseId}/${next.id.split('/')[1]}/${next.slug}`}
                className="card card-hover group flex flex-col items-end gap-1 p-4 text-right"
              >
                <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  Next lesson
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                </span>
                <span className="text-[0.85rem] font-medium text-text-primary group-hover:text-accent-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                to="/practice"
                className="card card-hover group flex flex-col items-end gap-1 p-4 text-right"
              >
                <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                  You reached the end
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                </span>
                <span className="text-[0.85rem] font-medium text-text-primary group-hover:text-accent-300">
                  Continue with practice quizzes
                </span>
              </Link>
            )}
          </nav>
        </article>

        {/* Side rail */}
        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <Card className="mb-4">
            <CardBody className="p-4">
              <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                <NotebookPen aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                Your notes
              </p>
              <p className="mt-1.5 text-[0.68rem] leading-relaxed text-text-muted">
                Notes sirf aapke browser me save hoti hain. Kabhi server par nahi jaati.
              </p>
              <label htmlFor="lesson-note" className="sr-only">
                Notes for this lesson
              </label>
              <textarea
                id="lesson-note"
                value={noteDraft}
                onChange={(e) => {
                  setNoteDraft(e.target.value);
                  setNoteSaved(false);
                }}
                rows={5}
                placeholder="Apne words me summary likhein…"
                className="mt-2.5 w-full resize-y rounded-lg border border-white/12 bg-white/4 px-2.5 py-2 text-[0.78rem] text-text-primary placeholder:text-text-muted focus:border-accent-500/50 focus:outline-none"
              />
              <Button
                variant="secondary"
                className={cx('mt-2 w-full text-xs', noteSaved && 'text-up-400')}
                onClick={() => {
                  saveNote(content.id, noteDraft);
                  setNoteSaved(true);
                }}
              >
                {noteSaved ? 'Saved locally' : 'Save note'}
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4">
              <p className="text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
                In this course
              </p>
              <ol className="mt-2.5 space-y-1">
                {courseLessons.map((l) => {
                  const isCurrent = l.id === content.id;
                  return (
                    <li key={l.id}>
                      <Link
                        to={`/learn/${l.courseId}/${l.id.split('/')[1]}/${l.slug}`}
                        className={cx(
                          'flex items-start gap-1.5 rounded px-1.5 py-1 text-[0.72rem] leading-snug transition-colors',
                          isCurrent
                            ? 'bg-accent-500/14 font-semibold text-text-primary'
                            : 'text-text-muted hover:bg-white/6 hover:text-text-secondary',
                        )}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {lessonByKey.get(l.id) ? (
                          <span
                            aria-hidden="true"
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500/70"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full border border-white/25"
                          />
                        )}
                        {l.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
