import { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  CrosshairMode,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
  type LineData,
  type CandlestickData,
  type HistogramData,
} from 'lightweight-charts';
import type { Candle } from '../data/marketSamples';

export interface OverlayLine {
  id: string;
  color: string;
  points: { time: number; value: number }[];
  title: string;
}

export interface PriceChartProps {
  candles: Candle[];
  kind: 'candlestick' | 'line';
  showVolume: boolean;
  overlays?: OverlayLine[];
  height?: number;
  onCrosshair?: (candle: Candle | null) => void;
  ariaLabel: string;
}

const CHART_THEME = {
  layout: {
    background: { type: ColorType.Solid, color: 'transparent' },
    textColor: '#8492A8',
    fontFamily: "'Inter Variable', Inter, system-ui, sans-serif",
    fontSize: 11,
  },
  grid: {
    vertLines: { color: 'rgba(255,255,255,0.045)' },
    horzLines: { color: 'rgba(255,255,255,0.045)' },
  },
};

export function PriceChart({
  candles,
  kind,
  showVolume,
  overlays = [],
  height = 420,
  onCrosshair,
  ariaLabel,
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const mainSeriesRef = useRef<ISeriesApi<'Candlestick'> | ISeriesApi<'Line'> | null>(null);
  const volumeRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const overlayRefs = useRef<Map<string, ISeriesApi<'Line'>>>(new Map());
  const dataRef = useRef<Candle[]>(candles);
  dataRef.current = candles;

  // Create chart once.
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      ...CHART_THEME,
      width: containerRef.current.clientWidth,
      height,
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: 'rgba(150,170,255,0.4)', width: 1, style: 2, labelBackgroundColor: '#1a2438' },
        horzLine: { color: 'rgba(150,170,255,0.4)', width: 1, style: 2, labelBackgroundColor: '#1a2438' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.09)',
        scaleMargins: { top: 0.08, bottom: showVolume ? 0.26 : 0.08 },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.09)',
        timeVisible: false,
        secondsVisible: false,
      },
      handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    });
    chartRef.current = chart;

    const resize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      mainSeriesRef.current = null;
      volumeRef.current = null;
      overlayRefs.current.clear();
    };
  }, [height, showVolume]);

  // Recreate the main series when the chart kind changes.
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    if (mainSeriesRef.current) {
      chart.removeSeries(mainSeriesRef.current);
      mainSeriesRef.current = null;
    }
    // Overlay series are attached to the previous main series' price scale;
    // clearing them keeps state consistent when switching chart types.
    overlayRefs.current.forEach((s) => chart.removeSeries(s));
    overlayRefs.current.clear();

    if (kind === 'candlestick') {
      const series = chart.addCandlestickSeries({
        upColor: '#2FBF8F',
        downColor: '#F0616D',
        borderUpColor: '#4DD3A3',
        borderDownColor: '#FF7C86',
        wickUpColor: '#4DD3A3',
        wickDownColor: '#FF7C86',
        priceLineColor: 'rgba(150,170,255,0.4)',
      });
      mainSeriesRef.current = series;
    } else {
      const series = chart.addLineSeries({
        color: '#7C87FF',
        lineWidth: 2,
        priceLineColor: 'rgba(150,170,255,0.4)',
      });
      mainSeriesRef.current = series;
    }
  }, [kind]);

  // Volume series
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    if (volumeRef.current) {
      chart.removeSeries(volumeRef.current);
      volumeRef.current = null;
    }
    if (!showVolume) return;
    const vol = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
      lastValueVisible: false,
      priceLineVisible: false,
    });
    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
      borderVisible: false,
    });
    volumeRef.current = vol;
  }, [showVolume, kind]);

  // Push data.
  useEffect(() => {
    const main = mainSeriesRef.current;
    if (!main) return;
    if (kind === 'candlestick') {
      const data: CandlestickData[] = candles.map((c) => ({
        time: c.time as UTCTimestamp,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));
      (main as ISeriesApi<'Candlestick'>).setData(data);
    } else {
      const data: LineData[] = candles.map((c) => ({
        time: c.time as UTCTimestamp,
        value: c.close,
      }));
      (main as ISeriesApi<'Line'>).setData(data);
    }
    if (volumeRef.current) {
      const volData: HistogramData[] = candles.map((c) => ({
        time: c.time as UTCTimestamp,
        value: c.volume,
        color: c.close >= c.open ? 'rgba(47,191,143,0.4)' : 'rgba(240,97,109,0.4)',
      }));
      volumeRef.current.setData(volData);
    }
    chartRef.current?.timeScale().fitContent();
  }, [candles, kind]);

  // Overlays
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const existing = overlayRefs.current;
    const wanted = new Set(overlays.map((o) => o.id));

    // remove stale
    for (const [id, series] of existing.entries()) {
      if (!wanted.has(id)) {
        chart.removeSeries(series);
        existing.delete(id);
      }
    }

    for (const overlay of overlays) {
      let series = existing.get(overlay.id);
      if (!series) {
        series = chart.addLineSeries({
          color: overlay.color,
          lineWidth: 1,
          priceLineVisible: false,
          lastValueVisible: false,
          crosshairMarkerVisible: false,
          title: overlay.title,
        });
        existing.set(overlay.id, series);
      }
      series.applyOptions({ color: overlay.color });
      series.setData(
        overlay.points.map((p) => ({ time: p.time as UTCTimestamp, value: p.value })),
      );
    }
  }, [overlays, kind, candles]);

  // Crosshair subscription
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !onCrosshair) return;
    const handler = (param: Parameters<Parameters<IChartApi['subscribeCrosshairMove']>[0]>[0]) => {
      if (!param.time) {
        onCrosshair(null);
        return;
      }
      const t = param.time as number;
      const found = dataRef.current.find((c) => c.time === t);
      onCrosshair(found ?? null);
    };
    chart.subscribeCrosshairMove(handler);
    return () => chart.unsubscribeCrosshairMove(handler);
  }, [onCrosshair]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className="w-full overflow-hidden rounded-xl border border-white/8 bg-ink-950/40"
      style={{ height }}
    />
  );
}
