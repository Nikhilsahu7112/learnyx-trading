import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { ButtonLink, Card, PageHeader } from '../components/ui';

const suggestions = [
  { to: '/learn', label: 'Learn — full curriculum' },
  { to: '/courses', label: 'Courses — 5 levels' },
  { to: '/glossary', label: 'Glossary — A to Z terms' },
  { to: '/practice', label: 'Practice — quizzes' },
  { to: '/lab', label: 'Trading Lab — 6 tools' },
];

export default function NotFound() {
  return (
    <div>
      <PageHeader
        eyebrow="404"
        title="Ye page exist nahi karta"
        description="Link purana ho sakta hai ya address me typo ho. Neeche se koi bhi section khol lein — poora content bina login ke accessible hai."
      />

      <Card className="max-w-2xl p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/6">
            <Compass aria-hidden="true" className="h-5 w-5 text-accent-400" />
          </span>
          <p className="text-sm font-semibold text-text-primary">Try one of these instead</p>
        </div>
        <ul className="mt-4 space-y-1">
          {suggestions.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="flex items-center justify-between rounded-lg px-2.5 py-2 text-[0.84rem] text-text-secondary transition-colors hover:bg-white/6 hover:text-text-primary"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-white/8 pt-4">
          <ButtonLink to="/" variant="secondary">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to home
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
