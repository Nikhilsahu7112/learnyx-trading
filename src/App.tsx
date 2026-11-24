import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoadingBlock, PageHeader } from './components/ui';
import { ProgressProvider } from './lib/progress';

import Home from './pages/Home';

const Learn = lazy(() => import('./pages/Learn'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const Markets = lazy(() => import('./pages/Markets'));
const MarketDetail = lazy(() => import('./pages/MarketDetail'));
const TradingLab = lazy(() => import('./pages/TradingLab'));
const ChartExplorer = lazy(() => import('./pages/lab/ChartExplorer'));
const PatternTrainer = lazy(() => import('./pages/lab/PatternTrainer'));
const IndicatorLab = lazy(() => import('./pages/lab/IndicatorLab'));
const StrategyBuilder = lazy(() => import('./pages/lab/StrategyBuilder'));
const Backtester = lazy(() => import('./pages/lab/Backtester'));
const PaperTrading = lazy(() => import('./pages/lab/PaperTrading'));
const Calculators = lazy(() => import('./pages/Calculators'));
const Glossary = lazy(() => import('./pages/Glossary'));
const GlossaryTerm = lazy(() => import('./pages/GlossaryTerm'));
const Practice = lazy(() => import('./pages/Practice'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const About = lazy(() => import('./pages/About'));
const ApiDocs = lazy(() => import('./pages/ApiDocs'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="py-10">
      <PageHeader title="Loading…" description="Preparing the next screen." />
      <LoadingBlock rows={5} />
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:course/:module/:lesson" element={<LessonPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/:slug" element={<MarketDetail />} />
            <Route path="/lab" element={<TradingLab />} />
            <Route path="/lab/charts" element={<ChartExplorer />} />
            <Route path="/lab/patterns" element={<PatternTrainer />} />
            <Route path="/lab/indicators" element={<IndicatorLab />} />
            <Route path="/lab/strategy" element={<StrategyBuilder />} />
            <Route path="/lab/backtest" element={<Backtester />} />
            <Route path="/lab/paper" element={<PaperTrading />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/glossary/:slug" element={<GlossaryTerm />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ProgressProvider>
  );
}
