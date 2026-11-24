import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Layers,
  Globe2,
  FlaskConical,
  Calculator,
  BookA,
  Target,
  Info,
  Menu,
  X,
  Search,
  TrendingUp,
} from 'lucide-react';
import { cx } from './ui';
import { SearchDialog } from './SearchDialog';
import { curriculumStats } from '../data/curriculum';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/courses', label: 'Courses', icon: Layers },
  { to: '/markets', label: 'Markets', icon: Globe2 },
  { to: '/lab', label: 'Trading Lab', icon: FlaskConical },
  { to: '/calculators', label: 'Calculators', icon: Calculator },
  { to: '/glossary', label: 'Glossary', icon: BookA },
  { to: '/practice', label: 'Practice', icon: Target },
  { to: '/about', label: 'About', icon: Info },
];

function Brand() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2"
      aria-label="Learnyx Trading home"
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] border border-white/12 bg-ink-800">
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="brandGrad" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#648CFF" />
              <stop offset="1" stopColor="#9B7BFF" />
            </linearGradient>
          </defs>
          <path
            d="M5 23 L12 15 L17 19 L26 8"
            fill="none"
            stroke="url(#brandGrad)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="8" r="2.4" fill="#9B7BFF" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-tight text-text-primary">
          Learnyx
        </span>
        <span className="text-[0.62rem] font-medium tracking-[0.22em] text-text-muted uppercase">
          Trading
        </span>
      </span>
    </Link>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  end,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  end?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cx(
          'group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
          isActive
            ? 'border border-white/12 bg-white/9 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
            : 'border border-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            aria-hidden="true"
            className={cx('h-4 w-4 shrink-0', isActive ? 'text-accent-400' : 'text-text-muted group-hover:text-text-secondary')}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-left text-sm text-text-muted transition-colors hover:border-white/18 hover:bg-white/7 hover:text-text-secondary"
      aria-label="Search lessons, glossary and practice questions"
    >
      <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">Search everything…</span>
      <kbd className="hidden rounded border border-white/12 bg-white/6 px-1.5 py-0.5 font-sans text-[0.62rem] font-semibold text-text-muted sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className="relative min-h-dvh">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-ink-900" />
        <div className="grid-bg absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-accent-500/12 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-accent-600/8 blur-[120px]" />
      </div>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text-primary"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-[15.5rem] shrink-0 flex-col border-r border-white/8 bg-ink-900/45 px-4 py-5 backdrop-blur-xl lg:flex xl:w-[16.5rem]">
          <div className="px-1">
            <Brand />
          </div>
          <div className="mt-6">
            <SearchTrigger onOpen={() => setSearchOpen(true)} />
          </div>
          <nav aria-label="Primary" className="mt-5 flex flex-1 flex-col gap-1 overflow-y-auto pb-4">
            {navItems.map((item) => (
              <SidebarLink key={item.to} {...item} />
            ))}
          </nav>
          <div className="glass-subtle rounded-xl p-3">
            <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-wide text-text-secondary uppercase">
              <TrendingUp aria-hidden="true" className="h-3.5 w-3.5 text-accent-400" />
              Free forever
            </p>
            <p className="mt-1.5 text-[0.72rem] leading-relaxed text-text-muted">
              {curriculumStats.published} published lessons · {curriculumStats.modules} modules ·
              no login required.
            </p>
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="animate-fade-in absolute inset-y-0 left-0 flex w-[17rem] max-w-[85vw] flex-col border-r border-white/10 bg-ink-850/95 px-4 py-5 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-text-muted hover:bg-white/8 hover:text-text-primary"
                  aria-label="Close navigation"
                >
                  <X aria-hidden="true" className="h-4.5 w-4.5" />
                </button>
              </div>
              <div className="mt-5">
                <SearchTrigger onOpen={() => setSearchOpen(true)} />
              </div>
              <nav aria-label="Primary mobile" className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => (
                  <SidebarLink
                    key={item.to}
                    {...item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile top bar */}
          <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/8 bg-ink-900/80 px-4 py-3 backdrop-blur-xl lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-text-secondary hover:text-text-primary"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu aria-hidden="true" className="h-4.5 w-4.5" />
            </button>
            <Brand />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-text-secondary hover:text-text-primary"
              aria-label="Open search"
            >
              <Search aria-hidden="true" className="h-4.5 w-4.5" />
            </button>
          </header>

          <main
            id="main-content"
            ref={mainRef}
            tabIndex={-1}
            className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
          >
            <div className="mx-auto w-full max-w-6xl">
              <Outlet />
            </div>
          </main>

          <footer className="mt-auto border-t border-white/8 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Brand />
                  <p className="mt-3 max-w-xs text-xs leading-relaxed text-text-muted">
                    A free, login-free financial market education platform in Hinglish. Built for
                    learners, not for trades.
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-text-secondary uppercase">
                    Learn
                  </p>
                  <ul className="mt-3 space-y-2 text-xs">
                    {[
                      { to: '/learn', label: 'Learning paths' },
                      { to: '/courses', label: 'All courses' },
                      { to: '/glossary', label: 'Glossary' },
                      { to: '/practice', label: 'Practice quizzes' },
                    ].map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="text-text-muted transition-colors hover:text-accent-400">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-text-secondary uppercase">
                    Tools
                  </p>
                  <ul className="mt-3 space-y-2 text-xs">
                    {[
                      { to: '/lab', label: 'Trading Lab' },
                      { to: '/lab/patterns', label: 'Pattern trainer' },
                      { to: '/calculators', label: 'Calculators' },
                      { to: '/progress', label: 'My progress' },
                    ].map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="text-text-muted transition-colors hover:text-accent-400">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-text-secondary uppercase">
                    Platform
                  </p>
                  <ul className="mt-3 space-y-2 text-xs">
                    {[
                      { to: '/about', label: 'About' },
                      { to: '/about#boundaries', label: 'Disclaimer' },
                      { to: '/progress', label: 'Export my data' },
                      { to: '/api-docs', label: 'API & architecture' },
                    ].map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="text-text-muted transition-colors hover:text-accent-400">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="divider my-6" />
              <p className="text-[0.7rem] leading-relaxed text-text-muted">
                Learnyx Trading is an educational platform. Its content and simulations are provided
                for learning purposes only. They are not personalised financial, investment, or
                trading advice. Simulated and historical results do not guarantee future performance.
                Financial markets involve risk, and users should understand applicable laws and
                regulations before participating.
              </p>
              <p className="mt-3 text-[0.68rem] text-text-muted">
                © {new Date().getFullYear()} Learnyx Trading · Educational use only · No real trading,
                no brokerage connection, no payments.
              </p>
            </div>
          </footer>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
