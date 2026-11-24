import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Layers } from 'lucide-react';
import {
  Card,
  CardBody,
  DifficultyBadge,
  PageHeader,
  ProgressBar,
  Section,
  Tag,
} from '../components/ui';
import { courses, lessonsForModule, modulesForCourse } from '../data/curriculum';
import { useProgress } from '../lib/progress';

export default function Courses() {
  const { completionPct } = useProgress();

  return (
    <div>
      <PageHeader
        eyebrow="Courses"
        title="Paanch levels, ek complete curriculum"
        description="Har level ek course hai jisme multiple modules aur individual lessons hote hain. Curriculum sequence follow karne se concepts stack hote hain — par har lesson self-contained bhi hai."
      />

      <div className="space-y-5">
        {courses.map((c) => {
          const mods = modulesForCourse(c.id);
          const ids = mods.flatMap((m) => lessonsForModule(m.id).map((l) => l.id));
          const pct = completionPct(ids);
          return (
            <Card key={c.id} interactive className="overflow-hidden">
              <CardBody>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-accent-500/35 bg-accent-500/12 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent-400 uppercase">
                        Level {c.level}
                      </span>
                      <DifficultyBadge level={c.difficulty} />
                      <span className="text-[0.68rem] text-text-muted">{c.titleHi}</span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">
                      <Link to={`/courses/${c.slug}`} className="hover:text-accent-300">
                        {c.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-2xl text-[0.85rem] leading-relaxed text-text-secondary">
                      {c.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <Tag>
                        <Layers aria-hidden="true" className="mr-1 h-3 w-3" />
                        {c.moduleCount} modules
                      </Tag>
                      <Tag>{c.lessonCount} lessons</Tag>
                      <Tag>
                        <Clock aria-hidden="true" className="mr-1 h-3 w-3" />
                        {Math.round(c.estimatedMinutes / 60)}h reading
                      </Tag>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                      {mods.map((m) => (
                        <span key={m.id} className="text-[0.72rem] text-text-muted">
                          M{m.order} · {m.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full shrink-0 lg:w-56">
                    <ProgressBar value={pct} label="Progress" />
                    <Link
                      to={`/courses/${c.slug}`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/16 bg-white/6 px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-white/26 hover:bg-white/10"
                    >
                      Open course
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Section className="mt-12">
        <Card className="p-6">
          <h2 className="text-base font-semibold text-text-primary">Kaunsa level se shuru karein?</h2>
          <ul className="mt-3 space-y-2 text-[0.83rem] leading-relaxed text-text-secondary">
            <li>
              <span className="font-semibold text-text-primary">Bilkul naye hain?</span> Level 1
              (Market Foundations) se shuru karein — poora sequence follow karein.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Basics clear hain?</span> Level 2
              (Technical Analysis) se shuru karein aur Level 1 ko reference ki tarah rakhein.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Pehle trade kiya hai?</span> Level 4
              (Risk Management) skip mat karein — ye sabse zyada practical value deta hai.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Derivatives me interest hai?</span>{' '}
              Level 5 se pehle Level 1 aur Level 4 zaroor padhein — leverage ka context zaroori hai.
            </li>
          </ul>
        </Card>
      </Section>
    </div>
  );
}
