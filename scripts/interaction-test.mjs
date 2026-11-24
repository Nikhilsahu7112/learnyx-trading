#!/usr/bin/env node
/**
 * Interaction tests.
 *
 * These drive the real components in a jsdom document with @testing-library:
 * typing into calculator inputs, answering a quiz question, opening search,
 * running a backtest and opening/closing a paper trade. That is the closest
 * thing to clicking through the app that is possible without a browser here.
 *
 * Canvas-based charts (lightweight-charts) cannot render in jsdom, so chart
 * geometry is explicitly out of scope — the charts are exercised separately by
 * the indicator maths tests in self-test.mjs.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmpDir = path.join(root, '.render-tmp');
const entryFile = path.join(tmpDir, 'interaction-entry.tsx');
const outFile = path.join(tmpDir, 'interaction-bundle.mjs');

const entrySource = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { ProgressProvider } from '../src/lib/progress';
import Calculators from '../src/pages/Calculators';
import Practice from '../src/pages/Practice';
import PaperTrading from '../src/pages/lab/PaperTrading';
import Backtester from '../src/pages/lab/Backtester';
import SearchDialog from '../src/components/SearchDialog';
import { SearchDialog as Dialog } from '../src/components/SearchDialog';

function wrap(node, initial = '/') {
  return React.createElement(
    ProgressProvider,
    null,
    React.createElement(MemoryRouter, { initialEntries: [initial] }, node),
  );
}

export function mountCalculators(el) {
  const root = createRoot(el);
  root.render(wrap(React.createElement(Calculators)));
  return () => root.unmount();
}

export function mountPractice(el) {
  const root = createRoot(el);
  root.render(wrap(React.createElement(Practice), '/practice'));
  return () => root.unmount();
}

export function mountPaper(el) {
  const root = createRoot(el);
  root.render(wrap(React.createElement(PaperTrading), '/lab/paper'));
  return () => root.unmount();
}

export function mountBacktester(el) {
  const root = createRoot(el);
  root.render(wrap(React.createElement(Backtester), '/lab/backtest'));
  return () => root.unmount();
}

export function mountSearch(el, onChange) {
  const root = createRoot(el);
  const Wrapper = () => {
    const [open, setOpen] = React.useState(true);
    return React.createElement(
      ProgressProvider,
      null,
      React.createElement(
        MemoryRouter,
        { initialEntries: ['/'] },
        React.createElement(Dialog, {
          open,
          onClose: () => {
            setOpen(false);
            onChange('closed');
          },
        }),
      ),
    );
  };
  root.render(React.createElement(Wrapper));
  return () => root.unmount();
}

export { SearchDialog };
`;

async function main() {
  await mkdir(tmpDir, { recursive: true });
  await writeFile(entryFile, entrySource, 'utf8');

  await build({
    entryPoints: [entryFile],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    loader: { '.css': 'empty', '.svg': 'empty' },
    external: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'react/jsx-runtime'],
    mainFields: ['module', 'main'],
    logLevel: 'error',
    define: { 'process.env.NODE_ENV': '"development"' },
  });

  /* ---- jsdom environment ---- */
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: 'https://learnyx.test/',
    pretendToBeVisual: true,
  });
  const { window } = dom;

  globalThis.window = window;
  globalThis.document = window.document;
  // Node 22 defines `navigator` as a getter-only global; jsdom's copy is not needed.
  globalThis.HTMLElement = window.HTMLElement;
  globalThis.HTMLInputElement = window.HTMLInputElement;
  globalThis.Node = window.Node;
  globalThis.Event = window.Event;
  globalThis.KeyboardEvent = window.KeyboardEvent;
  globalThis.MouseEvent = window.MouseEvent;
  globalThis.getComputedStyle = window.getComputedStyle.bind(window);
  globalThis.localStorage = window.localStorage;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom ships ResizeObserver-less canvas stubs; components guard on it.
  window.ResizeObserver =
    window.ResizeObserver ??
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  window.scrollTo = () => {};
  globalThis.URL.createObjectURL = () => 'blob:mock';
  globalThis.URL.revokeObjectURL = () => {};

  const React = await import('react');
  const { act } = React;
  const rtl = await import('@testing-library/react');
  const { screen, fireEvent, waitFor, cleanup } = rtl;
  // @testing-library reads its config from the DOM global at call time.
  globalThis.screen = screen;

  const mod = await import(`${outFile}?t=${Date.now()}`);

  let passed = 0;
  const failures = [];

  async function test(name, fn) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    try {
      await fn(container);
      passed += 1;
      process.stdout.write(`  ok   ${name}\n`);
    } catch (err) {
      failures.push({ name, err });
      process.stdout.write(`  FAIL ${name}\n         ${String(err?.message ?? err).split('\n')[0]}\n`);
    } finally {
      await act(async () => {
        cleanup();
      });
      container.remove();
    }
  }

  function assert(cond, message) {
    if (!cond) throw new Error(message);
  }

  function textOf(container) {
    return container.textContent ?? '';
  }

  /* ---------------- Calculators ---------------- */

  process.stdout.write('\nCalculators\n');

  await test('risk-reward updates as the inputs change and rejects a bad stop', async (container) => {
    await act(async () => mod.mountCalculators(container));

    const stop = container.querySelector('#\\:r0\\:') ?? null;
    // Robust lookup: the first three number inputs in the R:R card.
    const card = container.querySelector('#risk-reward');
    assert(card, 'risk-reward card not found');
    const inputs = card.querySelectorAll('input[type="number"]');
    assert(inputs.length === 3, `expected 3 inputs, got ${inputs.length}`);

    const [entryIn, stopIn, targetIn] = inputs;
    assert(entryIn.value === '100', `entry default ${entryIn.value}`);
    assert(stopIn.value === '95', `stop default ${stopIn.value}`);
    assert(targetIn.value === '115', `target default ${targetIn.value}`);

    // Default 100/95/115 → 1 : 3
    assert(textOf(card).includes('1 : 3.00'), `expected 1:3 in:\n${textOf(card).slice(0, 400)}`);

    // Move the target to 110 → 1 : 2
    await act(async () => {
      fireEvent.change(targetIn, { target: { value: '110' } });
    });
    assert(textOf(card).includes('1 : 2.00'), 'expected 1:2 after changing the target');

    // Put the stop above entry on a long → validation message, no ratio
    await act(async () => {
      fireEvent.change(stopIn, { target: { value: '105' } });
    });
    assert(
      textOf(card).includes('Long trade me stop entry se neeche hona chahiye'),
      'expected a stop-side validation message',
    );
    assert(!textOf(card).includes('1 : 2.00'), 'ratio should disappear for an invalid stop');
    void stop;
  });

  await test('position sizing computes 250 units for 1% risk on a 4-point stop', async (container) => {
    await act(async () => mod.mountCalculators(container));
    const card = container.querySelector('#position-size');
    assert(card, 'position-size card missing');
    const text = textOf(card);
    assert(text.includes('250'), `expected 250 units in:\n${text.slice(0, 600)}`);
    assert(text.includes('1,000'), 'expected a ₹1,000 risk amount');
    assert(text.includes('25.00%'), 'expected 25% exposure of balance');
  });

  await test('P&L flips sign when the direction flips', async (container) => {
    await act(async () => mod.mountCalculators(container));
    const card = container.querySelector('#profit-loss');
    assert(card, 'profit-loss card missing');
    assert(textOf(card).includes('+₹2,200'), `expected +2200 in:\n${textOf(card).slice(0, 500)}`);

    const select = card.querySelector('select');
    await act(async () => {
      fireEvent.change(select, { target: { value: 'short' } });
    });
    assert(textOf(card).includes('−₹2,200'), 'expected −2200 for a short with a rising price');
  });

  await test('compounding shows the correct final value and rejects 100%+ loss', async (container) => {
    await act(async () => mod.mountCalculators(container));
    const card = container.querySelector('#compounding');
    assert(card, 'compounding card missing');
    assert(textOf(card).includes('3.11×'), `expected a 3.11x multiple:\n${textOf(card).slice(0, 500)}`);

    const rateInput = card.querySelectorAll('input[type="number"]')[1];
    await act(async () => {
      fireEvent.change(rateInput, { target: { value: '-100' } });
    });
    assert(
      textOf(card).includes('Valid inputs daalein'),
      'expected the invalid-input state at -100%',
    );
  });

  await test('drawdown shows 25% down needing +33.33% to recover', async (container) => {
    await act(async () => mod.mountCalculators(container));
    const card = container.querySelector('#drawdown');
    assert(card, 'drawdown card missing');
    const text = textOf(card);
    assert(text.includes('−25.00%'), `expected −25.00% in:\n${text.slice(0, 600)}`);
    assert(text.includes('+33.33%'), 'expected a +33.33% recovery requirement');
  });

  await test('average price ignores a blank purchase row', async (container) => {
    await act(async () => mod.mountCalculators(container));
    const card = container.querySelector('#average-price');
    assert(card, 'average-price card missing');
    assert(textOf(card).includes('₹95.20'), `expected ₹95.20 in:\n${textOf(card).slice(0, 500)}`);

    // Clear the price of the second lot → only the first is counted.
    const inputs = card.querySelectorAll('input[type="number"]');
    await act(async () => {
      fireEvent.change(inputs[3], { target: { value: '' } });
    });
    assert(textOf(card).includes('1 of 2'), 'expected one purchase counted after clearing a row');
    assert(textOf(card).includes('₹100.00'), 'expected ₹100.00 when only the first lot counts');
  });

  /* ---------------- Quiz ---------------- */

  process.stdout.write('\nPractice quiz\n');

  await test('starting a session shows a question and a wrong answer reveals the explanation', async (container) => {
    await act(async () => mod.mountPractice(container));

    const startBtn = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Start practice'),
    );
    assert(startBtn, 'start button not found');
    await act(async () => {
      fireEvent.click(startBtn);
    });

    const progress = textOf(container);
    assert(/Question 1 of \d+/.test(progress), `no question counter:\n${progress.slice(0, 400)}`);

    const options = [...container.querySelectorAll('[role="group"] button')];
    assert(options.length >= 3, `expected answer buttons, got ${options.length}`);

    await act(async () => {
      fireEvent.click(options[0]);
    });

    const after = textOf(container);
    assert(
      after.includes('Correct!') || after.includes('Not correct.'),
      'expected immediate feedback after answering',
    );
    const next = [...container.querySelectorAll('button')].find((b) =>
      /Next question|See results/.test(b.textContent ?? ''),
    );
    assert(next && !next.disabled, 'next button should be enabled after answering');
  });

  await test('the exit control returns to the setup screen', async (container) => {
    await act(async () => mod.mountPractice(container));
    const startBtn = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Start practice'),
    );
    await act(async () => fireEvent.click(startBtn));
    const exit = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.trim() === 'Exit session',
    );
    assert(exit, 'exit button missing');
    await act(async () => fireEvent.click(exit));
    assert(
      textOf(container).includes('Category'),
      'expected to be back on the setup screen',
    );
  });

  /* ---------------- Paper trading ---------------- */

  process.stdout.write('\nPaper trading\n');

  await test('opening a simulated position moves cash into an open position', async (container) => {
    window.localStorage.clear();
    await act(async () => mod.mountPaper(container));

    const before = textOf(container);
    assert(before.includes('₹1,00,000'), `expected starting equity:\n${before.slice(0, 500)}`);
    assert(before.includes('Koi open position nahi'), 'expected the empty state');

    const qty = container.querySelector('#qty');
    assert(qty, 'quantity input missing');
    await act(async () => {
      fireEvent.change(qty, { target: { value: '10' } });
    });

    const buy = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Simulate buy'),
    );
    assert(buy, 'buy button missing');
    await act(async () => {
      fireEvent.click(buy);
    });

    const after = textOf(container);
    assert(after.includes('Open positions (1)'), `expected one open position:\n${after.slice(0, 700)}`);
    assert(!after.includes('Koi open position nahi'), 'empty state should be gone');
    assert(window.localStorage.getItem('learnyx:v1:paper-trades'), 'trades were not persisted');
  });

  await test('closing a position realises the P&L and records history', async (container) => {
    await act(async () => mod.mountPaper(container));

    // A position should already exist from the previous test's storage.
    const close = [...container.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'Close',
    );
    assert(close, 'close button missing — was the previous test state lost?');
    await act(async () => fireEvent.click(close));

    const after = textOf(container);
    assert(after.includes('Trade history (1)'), `expected a history entry:\n${after.slice(0, 700)}`);
    assert(after.includes('Koi open position nahi'), 'expected no open positions after closing');
  });

  await test('an unaffordable order is rejected with a clear message', async (container) => {
    window.localStorage.clear();
    await act(async () => mod.mountPaper(container));
    const qty = container.querySelector('#qty');
    await act(async () => {
      fireEvent.change(qty, { target: { value: '999999' } });
    });
    const buy = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Simulate buy'),
    );
    await act(async () => fireEvent.click(buy));
    assert(
      textOf(container).includes('Simulated balance kaafi nahi hai'),
      'expected an insufficient-balance error',
    );
  });

  await test('a zero/negative quantity is rejected', async (container) => {
    window.localStorage.clear();
    await act(async () => mod.mountPaper(container));
    const qty = container.querySelector('#qty');
    await act(async () => {
      fireEvent.change(qty, { target: { value: '0' } });
    });
    const buy = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Simulate buy'),
    );
    await act(async () => fireEvent.click(buy));
    assert(
      textOf(container).includes('Quantity ek positive whole number honi chahiye'),
      'expected a quantity validation error',
    );
  });

  /* ---------------- Backtester ---------------- */

  process.stdout.write('\nBacktester\n');

  await test('running a backtest produces metrics and a trade table', async (container) => {
    await act(async () => mod.mountBacktester(container));
    assert(textOf(container).includes('Backtest not run yet'), 'expected the pre-run state');

    const run = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Run backtest'),
    );
    assert(run, 'run button missing');
    await act(async () => {
      fireEvent.click(run);
    });

    const after = textOf(container);
    assert(!after.includes('Backtest not run yet'), 'result state did not replace the empty state');
    assert(after.includes('Total return'), 'expected a total-return metric');
    assert(after.includes('Profit factor'), 'expected a profit-factor metric');
    assert(/Trades \(\d+\)/.test(after), 'expected a trade table heading');
    assert(after.includes('Hypothetical simulation') || after.includes('Sample data'), 'expected the disclaimer');
  });

  /* ---------------- Search ---------------- */

  process.stdout.write('\nSearch\n');

  await test('search lists results for a query and closes on Escape', async (container) => {
    let closeCalls = 0;
    await act(async () => {
      mod.mountSearch(container, () => {
        closeCalls += 1;
      });
    });

    const input = container.querySelector('input');
    assert(input, 'search input missing');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'rsi' } });
    });

    await waitFor(() => {
      const links = container.querySelectorAll('a, button');
      assert(links.length > 3, 'no search results rendered');
    });

    const body = textOf(container);
    assert(/RSI|Relative Strength/i.test(body), `expected an RSI result:\n${body.slice(0, 400)}`);

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    assert(closeCalls === 1, `expected onClose once, got ${closeCalls}`);
  });

  await test('a one-character query produces no results', async (container) => {
    await act(async () => {
      mod.mountSearch(container, () => {});
    });
    const input = container.querySelector('input');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    const body = textOf(container);
    assert(/0 results/.test(body), `expected a 0-results state:\n${body.slice(0, 400)}`);
  });

  await rm(entryFile, { force: true });
  await rm(outFile, { force: true });

  process.stdout.write(`\n${'-'.repeat(60)}\n`);
  if (failures.length === 0) {
    process.stdout.write(`All interaction checks passed: ${passed}.\n`);
    process.exit(0);
  }
  process.stdout.write(`${failures.length} failing, ${passed} passed.\n\n`);
  for (const f of failures) {
    process.stdout.write(`✗ ${f.name}\n  ${f.err?.stack ?? f.err}\n\n`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error('interaction test crashed:', err);
  process.exit(1);
});
