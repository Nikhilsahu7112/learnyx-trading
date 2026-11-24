import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, BookMarked } from 'lucide-react';
import {
  ButtonLink,
  Card,
  CardBody,
  DifficultyBadge,
  PageHeader,
  ProgressBar,
  Tag,
  cx,
} from '../components/ui';
import { courseBySlug, lessonsForModule, modulesForCourse } from '../data/curriculum';
import { useProgress } from '../lib/progress';
import NotFound from './NotFound';

export default function CourseDetail() {
  const { slug } = useParams();
  const course = slug ? courseBySlug.get(slug) : undefined;
  const { isComplete, completionPct, bookmarks, isBookmarked, toggleBookmark } = useProgress();

  if (!course) return <NotFound />;

  const mods = modulesForCourse(course.id);
  const allIds = mods.flatMap((m) => lessonsForModule(m.id).map((l) => l.id));
  const pct = completionPct(allIds);
  const firstLesson = mods.length
    ? lessonsForModule(mods[0].id)[0]
    : undefined;

  return (
    <div>
      <Link
        to="/courses"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-accent-400"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        All courses
      </Link>

      <PageHeader
        eyebrow={`Level ${course.level} · ${course.titleHi}`}
        title={course.title}
        description={course.summary}
        actions={
          firstLesson && (
            <ButtonLink to={`/learn/${course.slug}/${firstLesson.id.split('/')[1]}/${firstLesson.slug}`}>
              Start course
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          )
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <DifficultyBadge level={course.difficulty} />
          <Tag>{course.moduleCount} modules</Tag>
          <Tag>{course.lessonCount} lessons</Tag>
          <Tag>
            <Clock aria-hidden="true" className="mr-1 h-3 w-3" />
            {Math.round(course.estimatedMinutes / 60)}h reading
          </Tag>
        </div>
        <div className="mt-5 max-w-md">
          <ProgressBar value={pct} label="Your progress in this course" />
        </div>
      </PageHeader>

      <div className="space-y-5">
        {mods.map((m) => {
          const lessons = lessonsForModule(m.id);
          const done = lessons.filter((l) => isComplete(l.id)).length;
          return (
            <Card key={m.id} id={m.slug} className="overflow-hidden scroll-mt-24">
              <CardBody className="border-b border-white/8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-text-muted uppercase">
                      Module {m.order}
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-text-primary">{m.title}</h2>
                    <p className="mt-1.5 max-w-2xl text-[0.8rem] leading-relaxed text-text-secondary">
                      {m.summary}
                    </p>
                  </div>
                  <span className="tnum rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] font-semibold text-text-secondary">
                    {done}/{lessons.length}
                  </span>
                </div>
              </CardBody>
              <ul className="divide-y divide-white/6">
                {lessons.map((l) => {
                  const complete = isComplete(l.id);
                  const marked = isBookmarked(l.id);
                  return (
                    <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                      {complete ? (
                        <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-up-400" />
                      ) : (
                        <Circle aria-hidden="true" className="h-4 w-4 shrink-0 text-white/18" />
                      )}
                      <Link
                        to={`/learn/${l.courseId}/${l.id.split('/')[1]}/${l.slug}`}
                        className={cx(
                          'min-w-0 flex-1 truncate text-[0.84rem] font-medium transition-colors hover:text-accent-300',
                          complete ? 'text-text-muted' : 'text-text-primary',
                        )}
                      >
                        {l.title}
                      </Link>
                      <span className="tnum flex shrink-0 items-center gap-1 text-[0.68rem] text-text-muted">
                        <Clock aria-hidden="true" className="h-2.5 w-2.5" />
                        {l.estimatedMinutes}m
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(l.id)}
                        aria-label={marked ? `Remove bookmark for ${l.title}` : `Bookmark ${l.title}`}
                        aria-pressed={marked}
                        className={cx(
                          'shrink-0 rounded-md p-1.5 transition-colors',
                          marked
                            ? 'text-violet-400 hover:bg-violet-500/12'
                            : 'text-text-muted hover:bg-white/8 hover:text-text-secondary',
                        )}
                      >
                        <BookMarked aria-hidden="true" className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>

      {bookmarks.length > 0 && (
        <Card className="mt-8 p-5">
          <p className="text-sm font-semibold text-text-primary">Your bookmarks</p>
          <p className="mt-1 text-xs text-text-muted">
            {bookmarks.length} lesson{bookmarks.length === 1 ? '' : 's'} bookmarked — Progress page se
            sab dekh sakte hain.
          </p>
          <ButtonLink to="/progress" variant="secondary" className="mt-4">
            Open progress page
          </ButtonLink>
        </Card>
      )}
    </div>
  );
}
