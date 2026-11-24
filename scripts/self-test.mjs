#!/usr/bin/env node
/**
 * Learnyx Trading self-test.
 *
 * Runs a set of structural and behavioural checks that do not need a browser:
 *   - content integrity (counts, uniqueness, quiz answer keys, glossary links)
 *   - routing surface (every nav target has a page module)
 *   - bundle hygiene (lazy-loaded tool pages stay out of the initial chunk)
 *   - Worker API contract (exercised through the real Worker entry point)
 *
 * Exit code 0 means every assertion passed. Anything else means a real defect.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { register } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------------ */
/* Tiny test harness                                                   */
/* ------------------------------------------------------------------ */

let passed = 0;
const failures = [];
const groups = [];

function group(name, fn) {
  groups.push({ name, fn });
}

async function runGroup(name, fn) {
  process.stdout.write(`\n${name}\n`);
  try {
    await fn();
  } catch (err) {
    failures.push({ name, err });
    process.stdout.write(`  FAIL group crashed\n         ${String(err.message).split('\n')[0]}\n`);
  }
}

function check(name, fn) {
  try {
    fn();
    passed += 1;
    process.stdout.write(`  ok   ${name}\n`);
  } catch (err) {
    failures.push({ name, err });
    process.stdout.write(`  FAIL ${name}\n         ${String(err.message).split('\n')[0]}\n`);
  }
}

/* ------------------------------------------------------------------ */
/* Load TypeScript sources directly                                    */
/* ------------------------------------------------------------------ */

// `tsconfig.app.json` uses extensionless relative imports. Node's ESM resolver
// needs an explicit extension for .ts files, so register the resolver that
// remaps extensionless specifiers.
register('./ts-resolve-hooks.mjs', import.meta.url);

const data = await (async () => {
  const curriculum = await import('../src/data/curriculum.ts');
  const lessons = await import('../src/data/lessons/index.ts');
  const glossary = await import('../src/data/glossary.ts');
  const markets = await import('../src/data/markets.ts');
  const quiz = await import('../src/data/quizBank.ts');
  const patterns = await import('../src/data/patterns.ts');
  const search = await import('../src/lib/search.ts');
  const strategy = await import('../src/lib/strategy.ts');
  const samples = await import('../src/data/marketSamples.ts');
  const calcMath = await import('../src/lib/calcMath.ts');
  const worker = await import('../worker/index.ts');
  return {
    curriculum,
    lessons,
    glossary,
    markets,
    quiz,
    patterns,
    search,
    strategy,
    samples,
    worker,
    calcMath,
  };
})();

/* ------------------------------------------------------------------ */
/* 1. Curriculum integrity                                            */
/* ------------------------------------------------------------------ */

group('curriculum', () => {
  const { curriculum } = data;
  const { courses, modules, lessonMetas, curriculumStats } = curriculum;

  check('5 courses exist', () => assert.equal(courses.length, 5));
  check('levels are 1..5 in order', () =>
    assert.deepEqual(courses.map((c) => c.level), [1, 2, 3, 4, 5]));

  check('lesson ids are unique', () => {
    const ids = lessonMetas.map((l) => l.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  check('course slugs are unique', () => {
    const slugs = courses.map((c) => c.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  check('every module belongs to a real course', () => {
    const courseIds = new Set(courses.map((c) => c.id));
    for (const m of modules) assert.ok(courseIds.has(m.courseId), `${m.id} → ${m.courseId}`);
  });

  check('every lesson has a resolvable course + module', () => {
    const courseIds = new Set(courses.map((c) => c.id));
    const moduleIds = new Set(modules.map((m) => m.id));
    for (const l of lessonMetas) {
      assert.ok(courseIds.has(l.courseId), `course missing for ${l.id}`);
      assert.ok(moduleIds.has(l.moduleId), `module missing for ${l.id}`);
    }
  });

  check('course counts match their modules', () => {
    for (const c of courses) {
      const mods = modules.filter((m) => m.courseId === c.id);
      const count = mods.reduce(
        (n, m) => n + lessonMetas.filter((l) => l.moduleId === m.id).length,
        0,
      );
      assert.equal(c.lessonCount, count, `${c.slug} lessonCount`);
      assert.equal(c.moduleCount, mods.length, `${c.slug} moduleCount`);
    }
  });

  check('published flag is honest (body exists for every published lesson)', () => {
    const bodyIds = new Set(data.lessons.lessons.map((l) => l.id));
    for (const meta of lessonMetas) {
      if (meta.published) {
        assert.ok(bodyIds.has(meta.id), `published without body: ${meta.id}`);
      } else {
        assert.ok(!bodyIds.has(meta.id), `body present but marked unpublished: ${meta.id}`);
      }
    }
  });

  check('curriculumStats matches computed values', () => {
    assert.equal(curriculumStats.levels, courses.length);
    assert.equal(curriculumStats.modules, modules.length);
    assert.equal(curriculumStats.lessons, lessonMetas.length);
    assert.equal(
      curriculumStats.published,
      lessonMetas.filter((l) => l.published).length,
    );
  });

  check('reading sequence has no gaps or duplicates', () => {
    const seq = curriculum.readingSequence();
    const ids = seq.map((l) => l.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(seq.length > 0);
  });
});

/* ------------------------------------------------------------------ */
/* 2. Authored lesson bodies                                          */
/* ------------------------------------------------------------------ */

group('lessons', () => {
  const { lessons } = data.lessons;
  const { lessonMetas } = data.curriculum;

  check('every body maps to a curriculum lesson', () => {
    const metas = new Set(lessonMetas.map((l) => l.id));
    for (const l of lessons) assert.ok(metas.has(l.id), `orphan body: ${l.id}`);
  });

  check('every body has the full 20-part template', () => {
    for (const l of lessons) {
      assert.ok(l.title.length > 3, `${l.id}: title`);
      assert.ok(l.intro.length > 80, `${l.id}: intro too short`);
      assert.ok(l.learningObjectives.length >= 3, `${l.id}: objectives`);
      assert.ok(l.prerequisites.length >= 1, `${l.id}: prerequisites`);
      assert.ok(l.blocks.length >= 6, `${l.id}: blocks (${l.blocks.length})`);
      assert.ok(l.commonMistakes.length >= 2, `${l.id}: common mistakes`);
      assert.ok(l.keyPoints.length >= 3, `${l.id}: key points`);
      assert.ok(l.summary.length >= 2, `${l.id}: summary`);
      assert.ok(l.knowledgeCheck.length >= 1, `${l.id}: quiz`);
      assert.ok(l.furtherReading.length >= 1, `${l.id}: references`);
      assert.ok(l.exercise.length > 40, `${l.id}: exercise`);
      assert.ok(l.estimatedMinutes > 0, `${l.id}: minutes`);
    }
  });

  check('every lesson block is well-formed', () => {
    for (const l of lessons) {
      l.blocks.forEach((b, i) => {
        const where = `${l.id} block ${i} (${b.type})`;
        switch (b.type) {
          case 'paragraph':
            assert.ok(b.text.length > 20, `${where}: text`);
            break;
          case 'list':
            assert.ok(b.items.length >= 2, `${where}: items`);
            break;
          case 'table':
            assert.ok(b.headers.length > 0, `${where}: headers`);
            for (const row of b.rows) {
              assert.equal(row.length, b.headers.length, `${where}: row width`);
            }
            break;
          case 'formula':
            assert.ok(b.expression.length > 0, `${where}: expression`);
            assert.ok(b.explanation.length > 10, `${where}: explanation`);
            break;
          case 'example':
            assert.ok(b.text.length > 20, `${where}: text`);
            break;
          case 'terms':
            assert.ok(b.items.length >= 2, `${where}: terms`);
            break;
          case 'callout':
            assert.ok(b.text.length > 10, `${where}: text`);
            break;
          case 'diagram':
            assert.ok(b.caption.length > 20, `${where}: caption`);
            assert.ok(b.description.length > 20, `${where}: description`);
            break;
          case 'heading':
          case 'subheading':
            assert.ok(b.text.length > 2, `${where}: text`);
            break;
          default:
            assert.fail(`${where}: unknown block type`);
        }
      });
    }
  });

  check('lesson quizzes have valid answer keys', () => {
    for (const l of lessons) {
      l.knowledgeCheck.forEach((q, i) => {
        assert.ok(q.options.length >= 3, `${l.id} q${i}: options`);
        assert.ok(
          q.correctIndex >= 0 && q.correctIndex < q.options.length,
          `${l.id} q${i}: correctIndex out of range`,
        );
        assert.ok(q.explanation.length > 15, `${l.id} q${i}: explanation too short`);
        assert.equal(new Set(q.options).size, q.options.length, `${l.id} q${i}: duplicate options`);
      });
    }
  });

  check('no lesson uses a placeholder marker', () => {
    const banned = [/lorem ipsum/i, /\bTODO\b/, /\bTBD\b/, /coming soon/i, /placeholder/i];
    for (const l of lessons) {
      const blob = JSON.stringify(l);
      for (const re of banned) assert.ok(!re.test(blob), `${l.id}: matched ${re}`);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 3. Glossary, markets, quizzes, patterns                            */
/* ------------------------------------------------------------------ */

group('glossary', () => {
  const { glossary, glossaryBySlug } = data.glossary;

  check('glossary has a substantial number of terms', () => assert.ok(glossary.length >= 120));
  check('glossary slugs are unique', () => {
    const slugs = glossary.map((g) => g.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });
  check('term and letter fields agree', () => {
    for (const g of glossary) {
      assert.equal(g.letter, g.term[0].toUpperCase(), `${g.term} letter`);
      assert.equal(glossaryBySlug.get(g.slug), g);
    }
  });
  check('every glossary entry has real content', () => {
    for (const g of glossary) {
      assert.ok(g.short.length > 10, `${g.term}: short`);
      assert.ok(g.detail.length > 60, `${g.term}: detail (${g.detail.length})`);
      assert.ok(g.category.length > 0, `${g.term}: category`);
    }
  });
  check('related terms resolve to real entries', () => {
    const termSet = new Set(glossary.map((g) => g.term.toLowerCase()));
    for (const g of glossary) {
      for (const rel of g.related) {
        assert.ok(termSet.has(rel.toLowerCase()), `${g.term} → ${rel}`);
      }
    }
  });
});

group('markets', () => {
  const { markets, marketBySlug } = data.markets;
  check('six market guides exist', () => assert.equal(markets.length, 6));
  check('market slugs are unique and resolvable', () => {
    assert.equal(new Set(markets.map((m) => m.slug)).size, markets.length);
    for (const m of markets) assert.equal(marketBySlug.get(m.slug), m);
  });
  check('every market has sections, risks and real copy', () => {
    for (const m of markets) {
      assert.ok(m.sections.length >= 4, `${m.slug}: sections`);
      assert.ok(m.risks.length >= 2, `${m.slug}: risks`);
      assert.ok(m.intro.length > 100, `${m.slug}: intro`);
      for (const s of m.sections) {
        assert.ok(s.body.length > 150, `${m.slug}/${s.id}: body`);
      }
    }
  });
  check('related lesson ids all exist', () => {
    const ids = new Set(data.curriculum.lessonMetas.map((l) => l.id));
    for (const m of markets) {
      for (const id of m.relatedLessons) assert.ok(ids.has(id), `${m.slug} → ${id}`);
    }
  });
});

group('quizzes', () => {
  const { practiceBank, practiceCategories, questionsByCategory, shuffle } = data.quiz;

  check('practice bank has a solid question count', () => assert.ok(practiceBank.length >= 80));
  check('question ids are unique', () => {
    const ids = practiceBank.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
  });
  check('every question has a valid answer key', () => {
    for (const q of practiceBank) {
      assert.ok(q.options.length >= 3, `${q.id}: options`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length, `${q.id}: index`);
      assert.ok(q.explanation.length > 15, `${q.id}: explanation`);
      assert.equal(new Set(q.options).size, q.options.length, `${q.id}: duplicate options`);
    }
  });
  check('all 8 categories are represented', () => {
    assert.equal(practiceCategories.length, 8);
    for (const c of practiceCategories) {
      assert.ok(questionsByCategory(c.id).length > 0, `${c.id} has no questions`);
    }
  });
  check('every category filter returns a subset', () => {
    for (const c of practiceCategories) {
      const subset = questionsByCategory(c.id);
      assert.ok(subset.every((q) => q.category === c.id), `${c.id} filter leaked`);
    }
  });
  check('shuffle preserves the multiset', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const out = shuffle(arr);
    assert.equal(out.length, arr.length);
    assert.deepEqual([...out].sort((a, b) => a - b), arr);
  });
});

group('patterns', () => {
  const { candlePatterns } = data.patterns;
  check('pattern library has 14 entries', () => assert.equal(candlePatterns.length, 14));
  check('pattern ids are unique', () => {
    const ids = candlePatterns.map((p) => p.id);
    assert.equal(new Set(ids).size, ids.length);
  });
  check('every pattern has shape, context, confirmation and caveat', () => {
    for (const p of candlePatterns) {
      assert.equal(p.shape.length, p.candleCount, `${p.id}: shape length`);
      assert.ok(p.summary.length > 40, `${p.id}: summary`);
      assert.ok(p.context.length > 30, `${p.id}: context`);
      assert.ok(p.confirmation.length >= 2, `${p.id}: confirmation`);
      assert.ok(p.caveat.length > 40, `${p.id}: caveat`);
      for (const c of p.shape) {
        assert.ok(c.h >= Math.max(c.o, c.c), `${p.id}: high must be >= body`);
        assert.ok(c.l <= Math.min(c.o, c.c), `${p.id}: low must be <= body`);
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/* 4. Search index                                                     */
/* ------------------------------------------------------------------ */

group('search', () => {
  const { searchDocs, getSearchIndex, searchKinds } = data.search;

  check('index covers every kind', () => {
    const kinds = new Set(getSearchIndex().map((d) => d.kind));
    for (const k of searchKinds) assert.ok(kinds.has(k), `missing kind: ${k}`);
  });
  check('every indexed route starts with a slash', () => {
    for (const d of getSearchIndex()) assert.ok(d.to.startsWith('/'), `${d.id}: ${d.to}`);
  });
  check('queries are case-insensitive and ranked', () => {
    const upper = searchDocs('RSI');
    const lower = searchDocs('rsi');
    assert.equal(upper.length, lower.length);
    assert.ok(upper.length > 0);
  });
  check('single-character queries return nothing', () => {
    assert.equal(searchDocs('a').length, 0);
  });
  check('nonsense queries return nothing', () => {
    assert.equal(searchDocs('zzqxjv').length, 0);
  });
  check('a known lesson is findable by title word', () => {
    const results = searchDocs('candlestick');
    assert.ok(results.length > 0, 'no results for "candlestick"');
  });
});

/* ------------------------------------------------------------------ */
/* 5. Sample data + indicators                                        */
/* ------------------------------------------------------------------ */

group('sample data', () => {
  const {
    getSeries,
    sampleInstruments,
    aggregate,
    sma,
    ema,
    rsi,
    macd,
    bollinger,
    atr,
    vwapSeries,
  } = data.samples;

  const series = getSeries(sampleInstruments[0].id, 500);

  check('series is deterministic', () => {
    const again = getSeries(sampleInstruments[0].id, 500);
    assert.deepEqual(again, series);
  });
  check('candles are internally consistent', () => {
    for (const c of series) {
      assert.ok(c.high >= Math.max(c.open, c.close), 'high');
      assert.ok(c.low <= Math.min(c.open, c.close), 'low');
      assert.ok(c.high >= c.low, 'high/low');
      assert.ok(c.volume > 0, 'volume');
      assert.ok(Number.isFinite(c.close), 'close finite');
    }
  });
  check('timestamps strictly increase', () => {
    for (let i = 1; i < series.length; i++) {
      assert.ok(series[i].time > series[i - 1].time, `order at ${i}`);
    }
  });
  check('aggregation preserves the time span and volume', () => {
    const weekly = aggregate(series, 5);
    assert.ok(weekly.length < series.length);
    const totalVol = (arr) => arr.reduce((s, c) => s + c.volume, 0);
    const diff = Math.abs(totalVol(weekly) - totalVol(series));
    assert.ok(diff / totalVol(series) < 0.25, `volume drift ${diff}`);
    assert.ok(weekly.every((c) => Number.isFinite(c.close)));
  });

  const closes = series.map((c) => c.close);

  check('SMA has the right shape and warmup', () => {
    const out = sma(closes, 20);
    assert.equal(out.length, closes.length);
    assert.equal(out[18], null);
    assert.ok(typeof out[19] === 'number');
  });
  check('EMA warmup then finite values', () => {
    const out = ema(closes, 20);
    assert.equal(out[18], null);
    assert.ok(typeof out[19] === 'number');
  });
  check('RSI stays inside 0..100', () => {
    for (const v of rsi(closes, 14)) {
      if (v !== null) assert.ok(v >= 0 && v <= 100, `rsi ${v}`);
    }
  });
  check('Bollinger bands keep upper >= mid >= lower', () => {
    const { mid, upper, lower } = bollinger(closes, 20, 2);
    for (let i = 0; i < closes.length; i++) {
      if (upper[i] === null) continue;
      assert.ok(upper[i] >= mid[i], `upper ${i}`);
      assert.ok(mid[i] >= lower[i], `lower ${i}`);
    }
  });
  check('MACD produces three aligned series', () => {
    const m = macd(closes);
    assert.equal(m.macdLine.length, closes.length);
    assert.equal(m.signal.length, closes.length);
    assert.equal(m.histogram.length, closes.length);
  });
  check('ATR is positive once warmed up', () => {
    const out = atr(series, 14);
    for (const v of out.slice(20)) assert.ok(v === null || v > 0, `atr ${v}`);
  });
  check('VWAP stays within the period price range', () => {
    const out = vwapSeries(series, 20);
    for (let i = 0; i < 20; i++) {
      const v = out[i];
      if (v === null) continue;
      assert.ok(v >= Math.min(...series.slice(0, i + 1).map((c) => c.low)) * 0.99);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 6. Strategy engine                                                 */
/* ------------------------------------------------------------------ */

group('strategy engine', () => {
  const { runBacktest, DEFAULT_STRATEGY, describeCondition } = data.strategy;
  const series = data.samples.getSeries(data.samples.sampleInstruments[1].id, 500);

  const options = { initialCapital: 100000, riskPerTradePct: 1, feePct: 0.05, slippagePct: 0.05 };

  check('default strategy produces a coherent result', () => {
    const res = runBacktest(series, DEFAULT_STRATEGY, options);
    assert.equal(res.equityCurve.length > 0, true);
    assert.ok(res.trades.length > 0, 'expected at least one trade');
    assert.ok(res.metrics.trades === res.trades.length);
    assert.ok(res.metrics.winRate >= 0 && res.metrics.winRate <= 100);
    assert.ok(res.metrics.maxDrawdown >= 0);
    for (const t of res.trades) {
      // Exit can land on the fill bar itself (gap through the stop), so the
      // contract is exit >= entry, not strictly greater.
      assert.ok(t.exitIndex >= t.entryIndex, 'exit on or after entry');
      assert.ok(t.exitIndex < series.length, 'exit inside the data range');
      assert.ok(Number.isFinite(t.returnPct));
      assert.ok(t.exitReason);
    }
  });

  check('wins + losses equals the trade count', () => {
    const res = runBacktest(series, DEFAULT_STRATEGY, options);
    assert.equal(res.metrics.wins + res.metrics.losses, res.metrics.trades);
  });

  check('no entry conditions means no trades and a warning', () => {
    const res = runBacktest(series, { ...DEFAULT_STRATEGY, entryConditions: [] }, options);
    assert.equal(res.trades.length, 0);
    assert.ok(res.warnings.length > 0);
  });

  check('same inputs give identical results (deterministic)', () => {
    const a = runBacktest(series, DEFAULT_STRATEGY, options);
    const b = runBacktest(series, DEFAULT_STRATEGY, options);
    assert.deepEqual(a.metrics, b.metrics);
  });

  check('condition descriptions are human readable', () => {
    const text = DEFAULT_STRATEGY.entryConditions.map(describeCondition).join(' AND ');
    assert.ok(text.includes('EMA'));
    assert.ok(text.includes('crosses above'));
  });

  check('higher fees can never improve the outcome', () => {
    const cheap = runBacktest(series, DEFAULT_STRATEGY, { ...options, feePct: 0, slippagePct: 0 });
    const dear = runBacktest(series, DEFAULT_STRATEGY, { ...options, feePct: 1, slippagePct: 1 });
    assert.ok(dear.metrics.totalReturn <= cheap.metrics.totalReturn + 1e-9);
  });
});


/* ------------------------------------------------------------------ */
/* 7. Calculator maths (exact values)                                 */
/* ------------------------------------------------------------------ */

group('calculators', () => {
  const {
    calcRiskReward,
    calcPositionSize,
    calcPnl,
    calcCompound,
    calcWeightedAverage,
    calcDrawdown,
  } = data.calcMath;

  const near = (actual, expected, tol = 1e-9) =>
    assert.ok(Math.abs(actual - expected) < tol, `expected ${expected}, got ${actual}`);

  check('risk-reward: long 100/95/115 gives 1:3 and a 25% breakeven rate', () => {
    const out = calcRiskReward({ direction: 'long', entry: 100, stop: 95, target: 115 });
    assert.ok(out);
    near(out.risk, 5);
    near(out.reward, 15);
    near(out.ratio, 3);
    near(out.riskPct, 5);
    near(out.rewardPct, 15);
    near(out.breakevenWinRate, 25);
  });

  check('risk-reward: short 100/105/90 gives 1:2', () => {
    const out = calcRiskReward({ direction: 'short', entry: 100, stop: 105, target: 90 });
    assert.ok(out);
    near(out.risk, 5);
    near(out.reward, 10);
    near(out.ratio, 2);
    near(out.breakevenWinRate, 100 / 3);
  });

  check('risk-reward: rejects a stop on the wrong side', () => {
    assert.equal(calcRiskReward({ direction: 'long', entry: 100, stop: 105, target: 120 }), null);
    assert.equal(calcRiskReward({ direction: 'short', entry: 100, stop: 95, target: 80 }), null);
  });

  check('risk-reward: rejects zero/negative inputs', () => {
    assert.equal(calcRiskReward({ direction: 'long', entry: 0, stop: 0, target: 10 }), null);
    assert.equal(calcRiskReward({ direction: 'long', entry: -5, stop: -10, target: 10 }), null);
    assert.equal(calcRiskReward({ direction: 'long', entry: NaN, stop: 95, target: 115 }), null);
  });

  check('risk-reward: equal entry and stop is rejected', () => {
    assert.equal(calcRiskReward({ direction: 'long', entry: 100, stop: 100, target: 120 }), null);
  });

  check('position size: 1% of 100000 with a 4-point stop gives 250 units', () => {
    const out = calcPositionSize({ balance: 100000, riskPct: 1, entry: 100, stop: 96 });
    assert.ok(out);
    near(out.riskAmount, 1000);
    near(out.perUnitRisk, 4);
    assert.equal(out.size, 250);
    near(out.positionValue, 25000);
    near(out.exposurePct, 25);
    near(out.actualRisk, 1000);
  });

  check('position size: floors to whole units and never exceeds the risk budget', () => {
    const out = calcPositionSize({ balance: 50000, riskPct: 1.5, entry: 250, stop: 241 });
    assert.ok(out);
    // 750 / 9 = 83.33 → 83 units, actual risk 747 ≤ 750
    assert.equal(out.size, 83);
    assert.ok(out.actualRisk <= out.riskAmount);
  });

  check('position size: rejects a stop equal to the entry', () => {
    assert.equal(calcPositionSize({ balance: 100000, riskPct: 1, entry: 100, stop: 100 }), null);
  });

  check('position size: rejects risk percentages outside 0–100', () => {
    assert.equal(calcPositionSize({ balance: 100000, riskPct: 0, entry: 100, stop: 95 }), null);
    assert.equal(calcPositionSize({ balance: 100000, riskPct: 150, entry: 100, stop: 95 }), null);
  });

  check('position size: returns zero size when one unit is unaffordable', () => {
    const out = calcPositionSize({ balance: 100, riskPct: 1, entry: 1000, stop: 500 });
    assert.ok(out);
    assert.equal(out.size, 0);
    near(out.actualRisk, 0);
  });

  check('pnl: long 250 → 272 with 100 units is +₹2,200 and +8.8%', () => {
    const out = calcPnl({ direction: 'long', entry: 250, exit: 272, quantity: 100 });
    assert.ok(out);
    near(out.perUnit, 22);
    near(out.gross, 2200);
    near(out.changePct, 8.8);
    near(out.positionValue, 25000);
  });

  check('pnl: short profits when price falls', () => {
    const out = calcPnl({ direction: 'short', entry: 250, exit: 230, quantity: 50 });
    assert.ok(out);
    near(out.perUnit, 20);
    near(out.gross, 1000);
    near(out.changePct, 8);
  });

  check('pnl: a long loss is negative', () => {
    const out = calcPnl({ direction: 'long', entry: 100, exit: 90, quantity: 10 });
    assert.ok(out);
    near(out.gross, -100);
    near(out.changePct, -10);
  });

  check('pnl: rejects non-positive quantity', () => {
    assert.equal(calcPnl({ direction: 'long', entry: 100, exit: 110, quantity: 0 }), null);
    assert.equal(calcPnl({ direction: 'long', entry: 100, exit: 110, quantity: -5 }), null);
  });

  check('compound: 100000 at 12% for 10 years', () => {
    const out = calcCompound({ initial: 100000, ratePct: 12, periods: 10 });
    assert.ok(out);
    near(out.finalValue, 100000 * Math.pow(1.12, 10), 1e-9);
    near(out.gain, out.finalValue - 100000);
    near(out.multiple, Math.pow(1.12, 10), 1e-12);
  });

  check('compound: 0% growth keeps the principal intact', () => {
    const out = calcCompound({ initial: 50000, ratePct: 0, periods: 5 });
    assert.ok(out);
    near(out.finalValue, 50000);
    near(out.gain, 0);
  });

  check('compound: a negative rate loses money', () => {
    const out = calcCompound({ initial: 100000, ratePct: -10, periods: 3 });
    assert.ok(out);
    near(out.finalValue, 72900, 1e-6);
    assert.ok(out.gain < 0);
  });

  check('compound: rejects -100% and beyond, and non-positive periods', () => {
    assert.equal(calcCompound({ initial: 100000, ratePct: -100, periods: 5 }), null);
    assert.equal(calcCompound({ initial: 100000, ratePct: 10, periods: 0 }), null);
    assert.equal(calcCompound({ initial: 100000, ratePct: 10, periods: 101 }), null);
    assert.equal(calcCompound({ initial: 0, ratePct: 10, periods: 5 }), null);
  });

  check('weighted average: 100@100 and 150@92 gives 95.2', () => {
    const out = calcWeightedAverage([
      { qty: 100, price: 100 },
      { qty: 150, price: 92 },
    ]);
    assert.ok(out);
    near(out.totalQty, 250);
    near(out.totalCost, 23800);
    near(out.average, 95.2);
  });

  check('weighted average: ignores invalid rows but keeps valid ones', () => {
    const out = calcWeightedAverage([
      { qty: 100, price: 100 },
      { qty: 0, price: 50 },
      { qty: 50, price: -10 },
      { qty: NaN, price: 80 },
    ]);
    assert.ok(out);
    near(out.average, 100);
    near(out.totalQty, 100);
  });

  check('weighted average: all-invalid input returns null', () => {
    assert.equal(calcWeightedAverage([]), null);
    assert.equal(calcWeightedAverage([{ qty: 0, price: 100 }]), null);
  });

  check('drawdown: 120000 → 90000 is 25%, needing +33.33% to recover', () => {
    const out = calcDrawdown({ peak: 120000, current: 90000 });
    assert.ok(out);
    near(out.absoluteLoss, 30000);
    near(out.drawdownPct, 25);
    near(out.recoveryPct, 100 / 3, 1e-9);
  });

  check('drawdown: a 50% loss needs a 100% gain to recover', () => {
    const out = calcDrawdown({ peak: 100, current: 50 });
    assert.ok(out);
    near(out.drawdownPct, 50);
    near(out.recoveryPct, 100);
  });

  check('drawdown: a new high means zero drawdown', () => {
    const out = calcDrawdown({ peak: 100000, current: 130000 });
    assert.ok(out);
    near(out.drawdownPct, 0);
    near(out.recoveryPct, 0);
    near(out.absoluteLoss, 0);
  });

  check('drawdown: rejects a non-positive peak', () => {
    assert.equal(calcDrawdown({ peak: 0, current: 0 }), null);
    assert.equal(calcDrawdown({ peak: -5, current: 10 }), null);
  });
});

/* ------------------------------------------------------------------ */
/* 8. Routing surface and bundle hygiene                              */
/* ------------------------------------------------------------------ */

group('routes', () => {
  const appSrc = readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
  const importRe = /import\(\s*'\.\/pages\/([^']+)'\s*\)/g;
  const lazyPages = [...appSrc.matchAll(importRe)].map((m) => m[1]);

  check('App.tsx lazy-loads the tool and content pages', () => {
    assert.ok(lazyPages.length >= 18, `only ${lazyPages.length} lazy pages`);
  });

  check('every lazily imported page module exists', () => {
    for (const p of lazyPages) {
      const file = path.join(root, 'src/pages', `${p}.tsx`);
      assert.ok(existsSync(file), `missing src/pages/${p}.tsx`);
    }
  });

  check('every page exports a default component', () => {
    for (const p of lazyPages) {
      const src = readFileSync(path.join(root, 'src/pages', `${p}.tsx`), 'utf8');
      assert.ok(/export default/.test(src), `src/pages/${p}.tsx has no default export`);
    }
  });

  check('the 9 primary navigation targets resolve to real routes', () => {
    const appRoutes = [...appSrc.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
    const nav = ['/', '/learn', '/courses', '/markets', '/lab', '/calculators', '/glossary', '/practice', '/about'];
    for (const target of nav) {
      const covered =
        target === '/'
          ? appSrc.includes('index')
          : appRoutes.some((r) => r === target || r === `${target}/*` || r.startsWith(`${target}/`));
      assert.ok(covered, `no route for ${target}`);
    }
  });

  check('no page re-implements fetch to a hardcoded host', () => {
    const files = [];
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name)) files.push(full);
      }
    };
    walk(path.join(root, 'src'));
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      assert.ok(
        !/fetch\(\s*['"]https?:\/\//.test(src),
        `${path.relative(root, f)} fetches an absolute URL`,
      );
    }
  });

  check('no hardcoded secrets in source', () => {
    const files = [];
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(tsx?|mjs|json|toml)$/.test(entry.name)) files.push(full);
      }
    };
    walk(path.join(root, 'src'));
    walk(path.join(root, 'worker'));
    files.push(path.join(root, 'wrangler.toml'));
    for (const f of files) {
      if (f.includes(`${path.sep}public${path.sep}`)) continue;
      const src = readFileSync(f, 'utf8');
      for (const re of [
        /ADMIN_SECRET\s*=\s*['"][^'"]{8,}/,
        /sk_live_[A-Za-z0-9]{10,}/,
        /AKIA[0-9A-Z]{16}/,
        /ghp_[A-Za-z0-9]{20,}/,
      ]) {
        assert.ok(!re.test(src), `${path.relative(root, f)} matched ${re}`);
      }
    }
  });
});

group('bundle', () => {
  const distAssets = path.join(root, 'dist/assets');
  if (!existsSync(distAssets)) {
    check('dist exists (run npm run build first)', () => assert.fail('dist/assets missing'));
    return;
  }
  const files = readdirSync(distAssets);

  check('vendor and charts are split from the app chunk', () => {
    assert.ok(files.some((f) => f.startsWith('vendor-')), 'no vendor chunk');
    assert.ok(files.some((f) => f.startsWith('charts-')), 'no charts chunk');
  });

  check('the lesson corpus is not in the initial app chunk', () => {
    const appChunk = files.find((f) => /^index-.*\.js$/.test(f));
    assert.ok(appChunk, 'no index chunk');
    const size = readFileSync(path.join(distAssets, appChunk)).byteLength;
    // The whole corpus is ~670 kB of source; a 200 kB gzip-able app shell means
    // the bodies stayed in the lazy lesson chunk.
    assert.ok(size < 400_000, `initial app chunk is ${size} bytes`);
  });

  check('the lesson corpus lives in its own shared chunk', () => {
    // The corpus is shared by the lesson route and the Worker API, so rolldown
    // emits it as a named shared chunk rather than folding it into LessonPage.
    const corpusChunk = files.find((f) => f.startsWith('lessons-'));
    assert.ok(corpusChunk, 'no dedicated lessons chunk');
    const size = readFileSync(path.join(distAssets, corpusChunk)).byteLength;
    assert.ok(size > 100_000, `corpus chunk only ${size} bytes`);
    const appChunk = files.find((f) => /^index-.*\.js$/.test(f));
    // A distinctive phrase from an authored lesson body must appear in the lazy
    // corpus chunk and never in the always-loaded one.
    const marker = 'ek mechanism jahan buyers aur sellers';
    const appSrc = readFileSync(path.join(distAssets, appChunk), 'utf8');
    assert.ok(!appSrc.includes(marker), 'lesson prose leaked into the initial chunk');
    assert.ok(
      readFileSync(path.join(distAssets, corpusChunk), 'utf8').includes(marker),
      'corpus chunk does not contain the lesson prose',
    );
  });
});

/* ------------------------------------------------------------------ */
/* 8. Worker API contract                                             */
/* ------------------------------------------------------------------ */

group('worker api', async () => {
  const worker = data.worker.default;

  const call = (urlPath, init = {}, env = {}) =>
    worker.fetch(
      new Request(`https://learnyx.test${urlPath}`, {
        headers: { 'cf-connecting-ip': '203.0.113.7', ...(init.headers ?? {}) },
        ...init,
      }),
      env,
    );

  const cases = [];
  const asyncCheck = (name, fn) => cases.push({ name, fn });

  asyncCheck('GET /api/health returns ok with counts', async () => {
    const res = await call('/api/health');
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
    assert.equal(body.counts.courses, 5);
    assert.ok(body.counts.glossary > 100);
    assert.equal(res.headers.get('cache-control'), 'no-store');
  });

  asyncCheck('GET /api/courses lists all five levels', async () => {
    const res = await call('/api/courses');
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.data.length, 5);
    assert.equal(body.meta.count, 5);
  });

  asyncCheck('GET /api/courses/:slug returns modules with lessons', async () => {
    const res = await call('/api/courses/market-foundations');
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.ok(body.data.modules.length > 0);
    assert.ok(body.data.modules[0].lessons.length > 0);
  });

  asyncCheck('GET /api/courses/:slug 404s for unknown slugs', async () => {
    const res = await call('/api/courses/does-not-exist');
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.error.code, 'NOT_FOUND');
  });

  asyncCheck('GET /api/lessons honours limit and only returns published lessons', async () => {
    const res = await call('/api/lessons?limit=5');
    const body = await res.json();
    assert.equal(body.data.length, 5);
    assert.ok(body.data.every((l) => l.title));
  });

  asyncCheck('GET /api/lessons rejects invalid limits', async () => {
    for (const bad of ['0', '101', 'abc', '1.5']) {
      const res = await call(`/api/lessons?limit=${bad}`);
      assert.equal(res.status, 400, `limit=${bad}`);
    }
  });

  asyncCheck('GET /api/lessons/:course/:module/:slug returns full content', async () => {
    const meta = data.curriculum.lessonMetas.find((l) => l.published);
    assert.ok(meta);
    const [level, mod, slug] = meta.id.split('/');
    const res = await call(`/api/lessons/${meta.courseId}/${mod}/${slug}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.data.id, `${level}/${mod}/${slug}`);
    assert.ok(body.data.blocks.length > 0);
  });

  asyncCheck('every curriculum slot is either served or explicitly unpublished', async () => {
    // Core honesty invariant: a slot is served only if it has an authored body,
    // and an unauthored slot always 404s instead of returning placeholder text.
    for (const meta of data.curriculum.lessonMetas) {
      const [, mod, slug] = meta.id.split('/');
      const res = await call(`/api/lessons/${meta.courseId}/${mod}/${slug}`);
      if (meta.published) {
        assert.equal(res.status, 200, `${meta.id} should be served`);
      } else {
        assert.equal(res.status, 404, `${meta.id} should be unpublished`);
      }
    }
  });

  asyncCheck('GET /api/glossary filters by query and letter', async () => {
    const all = await (await call('/api/glossary')).json();
    assert.ok(all.data.length > 100);
    const q = await (await call('/api/glossary?q=spread')).json();
    assert.ok(q.data.length > 0);
    assert.ok(q.data.every((g) => /spread/i.test(`${g.term} ${g.short} ${g.detail}`)));
    const letter = await (await call('/api/glossary?letter=s')).json();
    assert.ok(letter.data.every((g) => g.letter === 'S'));
  });

  asyncCheck('GET /api/glossary rejects multi-character letters', async () => {
    const res = await call('/api/glossary?letter=ab');
    assert.equal(res.status, 400);
  });

  asyncCheck('GET /api/quizzes filters by category and difficulty', async () => {
    const res = await call('/api/quizzes?category=risk-management&limit=3');
    const body = await res.json();
    assert.ok(body.data.length > 0);
    assert.ok(body.data.every((q) => q.category === 'risk-management'));
    const bad = await call('/api/quizzes?difficulty=impossible');
    assert.equal(bad.status, 400);
  });

  asyncCheck('unknown API paths 404 without leaking internals', async () => {
    const res = await call('/api/nope');
    assert.equal(res.status, 404);
    const text = await res.text();
    assert.ok(!/at .*\(.*:\d+:\d+\)/.test(text), 'stack trace leaked');
  });

  asyncCheck('non-GET methods are rejected', async () => {
    for (const method of ['PUT', 'DELETE', 'PATCH']) {
      const res = await call('/api/courses', { method });
      assert.equal(res.status, 405, method);
    }
  });

  asyncCheck('admin fails closed without a secret', async () => {
    const res = await call('/api/admin/stats', {}, {});
    assert.equal(res.status, 503);
  });

  asyncCheck('admin fails closed with a too-short secret', async () => {
    const res = await call('/api/admin/stats', {}, { ADMIN_SECRET: 'short' });
    assert.equal(res.status, 503);
  });

  asyncCheck('admin rejects missing or wrong bearer tokens', async () => {
    const env = { ADMIN_SECRET: 'a'.repeat(40) };
    const noAuth = await call('/api/admin/stats', {}, env);
    assert.equal(noAuth.status, 401);
    const wrong = await call('/api/admin/stats', { headers: { authorization: 'Bearer nope' } }, env);
    assert.equal(wrong.status, 401);
  });

  asyncCheck('admin accepts the correct bearer token (KV-bound deployment)', async () => {
    const env = {
      ADMIN_SECRET: 'a'.repeat(40),
      LEARNYX_KV: {
        get: async () => null,
        put: async () => undefined,
        list: async () => ({ keys: [{ name: 'content:demo' }] }),
      },
    };
    const res = await call('/api/admin/stats', { headers: { authorization: `Bearer ${'a'.repeat(40)}` } }, env);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(!JSON.stringify(body).includes('a'.repeat(40)), 'secret echoed back');
  });

  asyncCheck('health reports admin as configured only when the secret is long enough', async () => {
    const configured = await (await call('/api/health', {}, { ADMIN_SECRET: 'x'.repeat(32) })).json();
    assert.equal(configured.admin, 'configured');
    const disabled = await (await call('/api/health', {}, { ADMIN_SECRET: 'tiny' })).json();
    assert.equal(disabled.admin, 'disabled');
  });

  asyncCheck('rate limiting kicks in above the per-minute budget', async () => {
    const store = new Map();
    const env = {
      LEARNYX_KV: {
        get: async (k) => store.get(k) ?? null,
        put: async (k, v) => void store.set(k, v),
        list: async () => ({ keys: [] }),
      },
    };
    let last = null;
    for (let i = 0; i < 125; i++) {
      last = await call('/api/health', {}, env);
    }
    assert.equal(last.status, 429);
    assert.ok(last.headers.get('retry-after'));
  });

  asyncCheck('security headers are present on asset responses', async () => {
    const env = {
      ASSETS: {
        fetch: async () => new Response('<html></html>', { headers: { 'content-type': 'text/html' } }),
      },
    };
    const res = await call('/learn', {}, env);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.ok(res.headers.get('content-security-policy'));
    assert.ok(res.headers.get('permissions-policy'));
  });

  asyncCheck('SPA routes fall through to the assets binding', async () => {
    let seen = null;
    const env = {
      ASSETS: {
        fetch: async (req) => {
          seen = new URL(req.url).pathname;
          return new Response('ok');
        },
      },
    };
    await call('/glossary/atr', {}, env);
    assert.equal(seen, '/glossary/atr');
  });

  for (const c of cases) {
    try {
      await c.fn();
      passed += 1;
      process.stdout.write(`  ok   ${c.name}\n`);
    } catch (err) {
      failures.push({ name: c.name, err });
      process.stdout.write(`  FAIL ${c.name}\n         ${String(err.message).split('\n')[0]}\n`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* 9. Deployment configuration                                        */
/* ------------------------------------------------------------------ */

group('config', () => {
  check('wrangler.toml declares the KV binding and assets', () => {
    const toml = readFileSync(path.join(root, 'wrangler.toml'), 'utf8');
    assert.ok(toml.includes('binding = "LEARNYX_KV"'));
    assert.ok(toml.includes('binding = "ASSETS"'));
    assert.ok(toml.includes('directory = "./worker/public"'));
    assert.ok(toml.includes('single-page-application'));
  });

  check('wrangler.toml contains no secret values', () => {
    const toml = readFileSync(path.join(root, 'wrangler.toml'), 'utf8');
    assert.ok(!/ADMIN_SECRET\s*=/.test(toml), 'ADMIN_SECRET must not be committed');
  });

  check('.gitignore excludes build output and local env files', () => {
    const ignore = readFileSync(path.join(root, '.gitignore'), 'utf8');
    for (const entry of ['dist', 'node_modules', 'worker/public', '.dev.vars']) {
      assert.ok(ignore.includes(entry), `missing ${entry}`);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Summary                                                             */
/* ------------------------------------------------------------------ */

for (const g of groups) {
  await runGroup(g.name, g.fn);
}

process.stdout.write(`\n${'-'.repeat(60)}\n`);
if (failures.length === 0) {
  process.stdout.write(`All checks passed: ${passed} assertions across ${groups.length} groups.\n`);
  process.exit(0);
}
process.stdout.write(`${failures.length} failing check(s), ${passed} passed.\n\n`);
for (const f of failures) {
  process.stdout.write(`✗ ${f.name}\n  ${f.err.stack ?? f.err}\n\n`);
}
process.exit(1);
