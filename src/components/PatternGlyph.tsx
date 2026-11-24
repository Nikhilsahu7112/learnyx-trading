import type { ShapeCandle } from '../data/patterns';

/**
 * Renders a small candlestick drawing from normalised 0–100 prices.
 * Upside-down axis: y=100 is the top of the price range.
 */
export function PatternGlyph({
  shape,
  width = 120,
  height = 110,
  className,
}: {
  shape: ShapeCandle[];
  width?: number;
  height?: number;
  className?: string;
}) {
  const maxP = Math.max(...shape.map((c) => c.h));
  const minP = Math.min(...shape.map((c) => c.l));
  const range = Math.max(1, maxP - minP);
  const pad = 12;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;
  const slot = plotW / shape.length;
  const bodyW = Math.max(6, Math.min(20, slot * 0.5));

  const yOf = (p: number) => pad + plotH * (1 - (p - minP) / range);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={width - pad}
          y1={pad + plotH * f}
          y2={pad + plotH * f}
          stroke="rgba(255,255,255,0.05)"
        />
      ))}
      {shape.map((c, i) => {
        const cx = pad + slot * i + slot / 2;
        const bull = c.c >= c.o;
        const color = bull ? '#4DD3A3' : '#FF7C86';
        const bodyTop = yOf(Math.max(c.o, c.c));
        const bodyBottom = yOf(Math.min(c.o, c.c));
        const bodyH = Math.max(2, bodyBottom - bodyTop);
        return (
          <g key={i}>
            <line
              x1={cx}
              x2={cx}
              y1={yOf(c.h)}
              y2={yOf(c.l)}
              stroke={color}
              strokeWidth="1.5"
            />
            <rect
              x={cx - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              fill={color}
              fillOpacity="0.8"
              rx="1.5"
            />
          </g>
        );
      })}
    </svg>
  );
}
