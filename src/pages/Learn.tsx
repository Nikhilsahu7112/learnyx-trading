import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Clock, Search, BookMarked, Circle } from 'lucide-react';
import {
  Card,
  CardBody,
  DifficultyBadge,
  PageHeader,
  ProgressBar,
  Section,
  Skeleton,
  Tag,
  cx,
} from '../components/ui';
import {
  courses,
  curriculumStats,
  lessonsForModule,
  modulesForCourse,
} from '../data/curriculum';
import { useProgress } from '../lib/progress';

export default function Learn() {
  const { isComplete, completionPct, ready, bookmarks } = useProgress();
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [onlyIncomplete, setOnlyIncomplete] = useState(false);

  const allLessonIds = useMemo(
    () => modulesForCourse.length ? courses.flatMap((c) => modulesForCourse(c.id).flatMap((m) => lessonsForModule(m.id).map((l) => l.id))) : [],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses
      .filter((c) => levelFilter === 'all' || c.level === levelFilter)
      .map((c) => ({
        course: c,
        modules: modulesForCourse(c.id)
          .map((m) => ({
            module: m,
            lessons: lessonsForModule(m.id).filter((l) => {
              if (onlyIncomplete && isComplete(l.id)) return false;
              if (!q) return true;
              return (
                l.title.toLowerCase().includes(q) ||
                l.tags.join(' ').toLowerCase().includes(q) ||
                m.title.toLowerCase().includes(q)
              );
            }),
          }))
          .filter((m) => m.lessons.length > 0),
      }))
      .filter((c) => c.modules.length > 0);
  }, [query, levelFilter, onlyIncomplete, isComplete]);

  const totalDone = allLessonIds.filter((id) => isComplete(id)).length;

  return (
    <div>
      <PageHeader
        eyebrow="Curriculum"
        title="Structured learning paths"
        description={`Paanch levels, har level me modules aur individual lessons. ${curriculumStats.published} of ${curriculumStats.lessons} lessons fully authored hain — baaki clearly "in progress" labelled hain, placeholder text nahi. Progress aapke browser me locally save hoti hai.`}
        actions={
          <div className="glass-subtle rounded-xl px-4 py-3">
            <p className="text-[0.65rem] font-medium tracking-wide text-text-muted uppercase">
              Overall progress
            </p>
            <p className="tnum mt-1 text-lg font-semibold text-text-primary">
              {totalDone} / {allLessonIds.length} lessons
            </p>
          </div>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Levels', value: curriculumStats.levels },
          { label: 'Modules', value: curriculumStats.modules },
          { label: 'Lessons authored', value: `${curriculumStats.published}/${curriculumStats.lessons}` },
          { label: 'Bookmarks', value: bookmarks.length },
        ].map((s) => (
          <div key={s.label} className="glass-subtle rounded-xl px-4 py-3">
            <p className="text-[0.65rem] font-medium tracking-wide text-text-muted uppercase">
              {s.label}
            </p>
            <p className="tnum mt-1 text-lg font-semibold text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card mb-8 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter lessons by title or topic…"
              aria-label="Filter lessons"
              className="w-full rounded-xl border border-white/12 bg-white/5 py-2 pr-3 pl-9 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-500/50 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLevelFilter('all')}
              className={cx(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                levelFilter === 'all'
                  ? 'border-accent-500/50 bg-accent-500/18 text-text-primary'
                  : 'border-white/10 bg-white/4 text-text-secondary hover:bg-white/8',
              )}
            >
              All levels
            </button>
            {courses.map((c) => (
              <button
                key={c.level}
                type="button"
                onClick={() => setLevelFilter(c.level)}
                className={cx(
                  'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                  levelFilter === c.level
                    ? 'border-accent-500/50 bg-accent-500/18 text-text-primary'
                    : 'border-white/10 bg-white/4 text-text-secondary hover:bg-white/8',
                )}
              >
                L{c.level}
              </button>
            ))}
            <label className="ml-1 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-text-secondary">
              <input
                type="checkbox"
                checked={onlyIncomplete}
                onChange={(e) => setOnlyIncomplete(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#648CFF]"
              />
              Incomplete only
            </label>
          </div>
        </div>
      </div>

      {!ready ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm font-semibold text-text-primary">No lessons match your filters</p>
          <p className="mt-2 text-xs text-text-muted">
            Try clearing the search box or selecting “All levels”.
          </p>
        </Card>
      ) : (
        filtered.map(({ course, modules }) => {
          const courseLessonIds = modulesForCourse(course.id).flatMap((m) =>
            lessonsForModule(m.id).map((l) => l.id),
          );
          const pct = completionPct(courseLessonIds);
          return (
            <Section key={course.id} className="mb-10">
              <Card className="overflow-hidden">
                <CardBody className="border-b border-white/8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-accent-500/35 bg-accent-500/12 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent-400 uppercase">
                          Level {course.level}
                        </span>
                        <DifficultyBadge level={course.difficulty} />
                      </div>
                      <h2 className="mt-2.5 text-lg font-semibold text-text-primary">
                        {course.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-[0.82rem] leading-relaxed text-text-secondary">
                        {course.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Tag>{course.moduleCount} modules</Tag>
                        <Tag>{course.lessonCount} lessons</Tag>
                        <Tag>{Math.round(course.estimatedMinutes / 60)}h reading</Tag>
                      </div>
                    </div>
                    <div className="w-full shrink-0 sm:w-48">
                      <ProgressBar value={pct} label="Course progress" />
                      <Link
                        to={`/courses/${course.slug}`}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
                      >
                        Course overview
                        <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardBody>

                <div className="divide-y divide-white/6">
                  {modules.map(({ module, lessons }) => (
                    <div key={module.id} className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <span className="tnum mt-0.5 rounded border border-white/12 bg-white/5 px-1.5 py-0.5 text-[0.62rem] font-semibold text-text-muted">
                          M{module.order}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[0.86rem] font-semibold text-text-primary">
                            {module.title}
                          </h3>
                          <p className="mt-1 text-[0.75rem] leading-relaxed text-text-muted">
                            {module.summary}
                          </p>
                          <ul className="mt-3 space-y-1">
                            {lessons.map((l) => {
                              const done = isComplete(l.id);
                              const bookmarked = bookmarks.includes(l.id);
                              return (
                                <li key={l.id}>
                                  <Link
                                    to={`/learn/${l.courseId}/${l.id.split('/')[1]}/${l.slug}`}
                                    className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-white/6"
                                  >
                                    {done ? (
                                      <CheckCircle2
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5 shrink-0 text-up-400"
                                      />
                                    ) : (
                                      <Circle
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5 shrink-0 text-white/20"
                                      />
                                    )}
                                    <span
                                      className={cx(
                                        'flex-1 truncate text-[0.8rem] group-hover:text-accent-300',
                                        done ? 'text-text-muted' : 'text-text-secondary',
                                      )}
                                    >
                                      {l.title}
                                    </span>
                                    {!l.published && (
                                      <span className="shrink-0 rounded border border-warn-500/35 bg-warn-500/10 px-1.5 py-0.5 text-[0.58rem] font-semibold tracking-wide text-warn-500 uppercase">
                                        In progress
                                      </span>
                                    )}
                                    {bookmarked && (
                                      <BookMarked
                                        aria-label="Bookmarked"
                                        className="h-3 w-3 shrink-0 text-violet-400"
                                      />
                                    )}
                                    <span className="tnum flex shrink-0 items-center gap-1 text-[0.66rem] text-text-muted">
                                      <Clock aria-hidden="true" className="h-2.5 w-2.5" />
                                      {l.estimatedMinutes}m
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>
          );
        })
      )}
    </div>
  );
}
