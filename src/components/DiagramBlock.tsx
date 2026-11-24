import type { DiagramKind } from '../lib/types';

/**
 * Lightweight inline SVG diagrams for lesson content. Each diagram is decorative
 * but carries a text alternative (title + caption + description) so screen
 * readers get the same conceptual information.
 */
export function DiagramBlock({
  kind,
  title,
  caption,
  description,
}: {
  kind: DiagramKind;
  title: string;
  caption: string;
  description: string;
}) {
  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60">
      <div className="border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
        <p className="text-[0.7rem] font-semibold tracking-wide text-text-secondary uppercase">
          Visual · {title}
        </p>
      </div>
      <div className="px-4 py-4">
        <div role="img" aria-label={description} className="w-full">
          <svg viewBox="0 0 480 180" className="h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`grad-${kind}`} x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#648CFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9B7BFF" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <GraphicFor kind={kind} />
          </svg>
        </div>
        <figcaption className="mt-3 text-[0.78rem] leading-relaxed text-text-muted">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

const axis = (
  <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
    <line x1="30" y1="20" x2="30" y2="150" />
    <line x1="30" y1="150" x2="460" y2="150" />
  </g>
);

const grid = (
  <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
    {[45, 70, 95, 120].map((y) => (
      <line key={y} x1="30" y1={y} x2="460" y2={y} />
    ))}
  </g>
);

function GraphicFor({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case 'candles':
      return (
        <>
          {axis}
          {grid}
          {/* bullish */}
          <line x1="120" y1="40" x2="120" y2="140" stroke="#4DD3A3" strokeWidth="1.5" />
          <rect x="110" y="65" width="20" height="55" fill="#4DD3A3" opacity="0.75" rx="2" />
          <text x="100" y="165" fill="#8492A8" fontSize="9">bullish</text>
          {/* bearish */}
          <line x1="230" y1="35" x2="230" y2="135" stroke="#FF7C86" strokeWidth="1.5" />
          <rect x="220" y="55" width="20" height="60" fill="#FF7C86" opacity="0.75" rx="2" />
          <text x="212" y="165" fill="#8492A8" fontSize="9">bearish</text>
          {/* labels */}
          <g fill="#8492A8" fontSize="8">
            <text x="285" y="45">high</text>
            <text x="285" y="70">open / close</text>
            <text x="285" y="115">body</text>
            <text x="285" y="140">low</text>
          </g>
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="2 2">
            <line x1="245" y1="42" x2="283" y2="42" />
            <line x1="245" y1="112" x2="283" y2="112" />
            <line x1="245" y1="137" x2="283" y2="137" />
          </g>
        </>
      );
    case 'trend':
      return (
        <>
          {axis}
          {grid}
          <polyline
            points="40,130 80,100 110,115 150,80 180,95 220,60 250,75 300,45"
            fill="none"
            stroke="url(#grad-trend)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {[
            [80, 100, 'HH'],
            [150, 80, 'HH'],
            [220, 60, 'HH'],
            [110, 115, 'HL'],
            [180, 95, 'HL'],
            [250, 75, 'HL'],
          ].map(([x, y, label], i) => (
            <g key={i}>
              <circle cx={x as number} cy={y as number} r="3" fill="#648CFF" />
              <text x={(x as number) + 6} y={(y as number) - 6} fill="#AAB5C8" fontSize="8">
                {label}
              </text>
            </g>
          ))}
          <polyline
            points="330,45 360,60 390,90 415,80 440,110"
            fill="none"
            stroke="#FF7C86"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text x="330" y="130" fill="#8492A8" fontSize="8">lower highs / lows</text>
        </>
      );
    case 'support-resistance':
      return (
        <>
          {axis}
          {grid}
          <rect x="30" y="96" width="430" height="18" fill="#4DD3A3" opacity="0.14" />
          <rect x="30" y="42" width="430" height="16" fill="#FF7C86" opacity="0.14" />
          <text x="36" y="110" fill="#4DD3A3" fontSize="8">support zone</text>
          <text x="36" y="54" fill="#FF7C86" fontSize="8">resistance zone</text>
          <polyline
            points="40,140 70,106 100,135 140,104 175,132 215,92 250,70 285,90 320,58 360,88 400,60 450,86"
            fill="none"
            stroke="url(#grad-support-resistance)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </>
      );
    case 'risk-reward':
      return (
        <>
          {axis}
          <line x1="30" y1="90" x2="460" y2="90" stroke="#AAB5C8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="400" y="86" fill="#AAB5C8" fontSize="8">entry</text>
          <line x1="30" y1="120" x2="460" y2="120" stroke="#FF7C86" strokeWidth="1.4" />
          <text x="404" y="132" fill="#FF7C86" fontSize="8">stop</text>
          <line x1="30" y1="34" x2="460" y2="34" stroke="#4DD3A3" strokeWidth="1.4" />
          <text x="404" y="30" fill="#4DD3A3" fontSize="8">target</text>
          <rect x="180" y="90" width="46" height="30" fill="#FF7C86" opacity="0.22" />
          <rect x="180" y="34" width="46" height="56" fill="#4DD3A3" opacity="0.22" />
          <text x="236" y="108" fill="#FF7C86" fontSize="9">1R risk</text>
          <text x="236" y="62" fill="#4DD3A3" fontSize="9">3R reward</text>
        </>
      );
    case 'option-payoff':
      return (
        <>
          {axis}
          {grid}
          <line x1="230" y1="20" x2="230" y2="150" stroke="rgba(255,255,255,0.14)" strokeDasharray="3 3" />
          <text x="222" y="163" fill="#8492A8" fontSize="8">strike</text>
          <polyline
            points="35,118 230,118 230,118 400,36"
            fill="none"
            stroke="#4DD3A3"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="230" cy="118" r="3" fill="#4DD3A3" />
          <text x="320" y="70" fill="#4DD3A3" fontSize="8">profit</text>
          <text x="80" y="112" fill="#FF7C86" fontSize="8">max loss = premium</text>
          <text x="248" y="140" fill="#8492A8" fontSize="8">breakeven →</text>
        </>
      );
    case 'order-book':
      return (
        <>
          <line x1="140" y1="20" x2="140" y2="150" stroke="rgba(255,255,255,0.1)" />
          <line x1="270" y1="20" x2="270" y2="150" stroke="rgba(255,255,255,0.1)" />
          <line x1="360" y1="20" x2="360" y2="150" stroke="rgba(255,255,255,0.1)" />
          <text x="60" y="16" fill="#8492A8" fontSize="8">bid qty</text>
          <text x="170" y="16" fill="#8492A8" fontSize="8">bid price</text>
          <text x="295" y="16" fill="#8492A8" fontSize="8">ask price</text>
          <text x="385" y="16" fill="#8492A8" fontSize="8">ask qty</text>
          {[
            [40, '1,200', '99.90', '100.10', '900'],
            [62, '2,500', '99.85', '100.15', '1,800'],
            [84, '3,100', '99.80', '100.20', '2,400'],
            [106, '5,000', '99.75', '100.25', '4,100'],
            [128, '7,500', '99.70', '100.30', '6,000'],
          ].map(([y, bq, bp, ap, aq], i) => (
            <g key={i} fontSize="8">
              <rect x="40" y={(y as number) - 8} width="90" height="1" fill="rgba(77,211,163,0.25)" />
              <text x="55" y={y as number} fill="#AAB5C8">{bq}</text>
              <text x="185" y={y as number} fill="#4DD3A3">{bp}</text>
              <text x="295" y={y as number} fill="#FF7C86">{ap}</text>
              <text x="390" y={y as number} fill="#AAB5C8">{aq}</text>
            </g>
          ))}
          <line x1="270" y1="30" x2="270" y2="60" stroke="#9B7BFF" strokeWidth="1.2" strokeDasharray="2 2" />
          <text x="276" y="40" fill="#9B7BFF" fontSize="8">spread</text>
          <text x="150" y="146" fill="#8492A8" fontSize="7">mid price sits between best bid and best ask</text>
        </>
      );
    case 'market-cycle':
    default:
      return (
        <>
          {axis}
          {grid}
          <path
            d="M40 110 Q90 140 140 110 T240 50 Q290 25 330 55 T440 110"
            fill="none"
            stroke="url(#grad-market-cycle)"
            strokeWidth="2.2"
          />
          <g fill="#8492A8" fontSize="8">
            <text x="48" y="100">accumulation</text>
            <text x="170" y="52">markup</text>
            <text x="286" y="46">distribution</text>
            <text x="380" y="102">markdown</text>
          </g>
          <g fill="#648CFF">
            <circle cx="40" cy="110" r="3" />
            <circle cx="240" cy="50" r="3" />
            <circle cx="330" cy="55" r="3" />
            <circle cx="440" cy="110" r="3" />
          </g>
        </>
      );
  }
}
