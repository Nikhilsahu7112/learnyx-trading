/**
 * Decorative animated chart background for the hero.
 * Purely ornamental: generated from a fixed seed, aria-hidden, and it never
 * displays any market number (so it can never be mistaken for live data).
 */
export function HeroChart() {
  const points = [
    [0, 132], [40, 120], [80, 126], [120, 104], [160, 112], [200, 92],
    [240, 100], [280, 78], [320, 88], [360, 64], [400, 72], [440, 52],
    [480, 60], [520, 40], [560, 48], [600, 28],
  ];
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const area = `${path} L600 160 L0 160 Z`;

  const candles = [
    { x: 60, o: 118, c: 108, h: 122, l: 104 },
    { x: 110, o: 108, c: 114, h: 118, l: 104 },
    { x: 160, o: 114, c: 100, h: 118, l: 96 },
    { x: 210, o: 100, c: 106, h: 110, l: 94 },
    { x: 260, o: 106, c: 92, h: 112, l: 88 },
    { x: 310, o: 92, c: 84, h: 98, l: 78 },
    { x: 360, o: 84, c: 90, h: 94, l: 80 },
    { x: 410, o: 90, c: 74, h: 94, l: 70 },
    { x: 460, o: 74, c: 68, h: 82, l: 62 },
    { x: 510, o: 68, c: 58, h: 74, l: 54 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[62%] w-full opacity-[0.55]"
      >
        <defs>
          <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#648CFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#648CFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroLine" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#648CFF" stopOpacity="0.25" />
            <stop offset="55%" stopColor="#7C87FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9B7BFF" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <path d={area} fill="url(#heroArea)" />
        <path
          d={path}
          fill="none"
          stroke="url(#heroLine)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="animate-dash"
          style={{ ['--dash-len' as string]: '1400' }}
        />

        {candles.map((c, i) => {
          const up = c.c < c.o; // y axis is inverted: lower y = higher price
          const color = up ? '#4DD3A3' : '#FF7C86';
          const top = Math.min(c.o, c.c);
          const height = Math.abs(c.o - c.c);
          return (
            <g key={i} opacity={0.45}>
              <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={color} strokeWidth="1" />
              <rect
                x={c.x - 4}
                y={top}
                width="8"
                height={Math.max(height, 1.5)}
                fill={color}
                opacity="0.7"
                rx="1"
              />
            </g>
          );
        })}
      </svg>

      <div className="animate-drift absolute top-6 right-4 hidden sm:block">
        <div className="h-24 w-40 rounded-xl border border-white/8 bg-white/[0.03]" />
      </div>
    </div>
  );
}
