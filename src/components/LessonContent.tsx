import type { LessonBlock } from '../lib/types';
import { DiagramBlock } from './DiagramBlock';
import { Callout, TableWrap } from './ui';

/** Safely renders the tiny inline markdown subset used in lesson text: **bold**, *italic*, `code`. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="lesson-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case 'heading':
            return (
              <h3 key={i} id={block.id}>
                {block.text}
              </h3>
            );
          case 'subheading':
            return <h4 key={i}>{block.text}</h4>;
          case 'list':
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <div key={i} className="not-prose">
                <Callout tone={block.tone} title={block.title}>
                  <p>
                    <Inline text={block.text} />
                  </p>
                </Callout>
              </div>
            );
          case 'table':
            return (
              <div key={i} className="not-prose">
                <TableWrap
                  headers={block.headers}
                  rows={block.rows.map((row) =>
                    row.map((cell) => <Inline key={cell} text={cell} />),
                  )}
                  caption={block.caption}
                />
                {block.caption && (
                  <p className="mt-1 text-[0.72rem] text-text-muted">{block.caption}</p>
                )}
              </div>
            );
          case 'formula':
            return (
              <div key={i} className="not-prose my-5">
                <div className="rounded-2xl border border-white/10 bg-ink-850/70 p-4">
                  <p className="text-[0.68rem] font-semibold tracking-wide text-text-muted uppercase">
                    {block.title}
                  </p>
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-white/8 bg-ink-950/60 px-3 py-2.5 font-mono text-[0.78rem] leading-relaxed whitespace-pre-wrap text-accent-300">
                    {block.expression}
                  </pre>
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-text-secondary">
                    <Inline text={block.explanation} />
                  </p>
                </div>
              </div>
            );
          case 'example':
            return (
              <div key={i} className="not-prose my-5">
                <div className="rounded-2xl border border-up-500/22 bg-up-500/[0.06] p-4">
                  <p className="text-[0.7rem] font-semibold tracking-wide text-up-400 uppercase">
                    Worked example
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-text-primary">{block.title}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
                    <Inline text={block.text} />
                  </p>
                  {block.steps && block.steps.length > 0 && (
                    <ol className="mt-3 space-y-1.5">
                      {block.steps.map((s, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-[0.78rem] leading-relaxed text-text-secondary"
                        >
                          <span className="tnum mt-0.5 shrink-0 rounded bg-up-500/15 px-1.5 text-[0.65rem] font-semibold text-up-400">
                            {j + 1}
                          </span>
                          <span>
                            <Inline text={s} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            );
          case 'terms':
            return (
              <dl key={i} className="not-prose my-5 grid gap-2 sm:grid-cols-2">
                {block.items.map((t) => (
                  <div key={t.term} className="glass-subtle rounded-xl px-3.5 py-3">
                    <dt className="text-[0.82rem] font-semibold text-text-primary">{t.term}</dt>
                    <dd className="mt-1 text-[0.78rem] leading-relaxed text-text-secondary">
                      <Inline text={t.meaning} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case 'diagram':
            return (
              <DiagramBlock
                key={i}
                kind={block.kind}
                title={block.title}
                caption={block.caption}
                description={block.description}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
