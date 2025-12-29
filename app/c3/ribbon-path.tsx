import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ObjectRibbonMarquee
 * - Full-width responsive
 * - Infinite loop of circles along a sine-like wave (upwards first)
 * - ~1rem gap between items
 * - Hover a circle: slows the whole flow + hovered circle scales up
 * - Extra vertical headroom so hover scaling doesn't clip
 *
 * Performance:
 * - Circles render once.
 * - rAF loop writes CSS vars (--x/--y) directly to DOM nodes for smooth animation.
 */

type RibbonItem = {
  src: string;
  alt?: string;
};

type Props = {
  /**
   * Provide your images here. The marquee repeats them if there are fewer than needed.
   * Example: [{ src: '/img/a.png', alt: 'A' }, ...]
   */
  items: RibbonItem[];
};

export default function ObjectRibbonMarquee({ items }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [w, setW] = useState(0);
  const [anyHover, setAnyHover] = useState(false);
  const hoverCountRef = useRef(0);

  // 1rem in px for the requested gap
  const remPx = useMemo(() => {
    if (typeof window === 'undefined') return 16;
    const v = getComputedStyle(document.documentElement).fontSize;
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : 16;
  }, []);

  // --- Tuning knobs ---
  const height = 320; // a touch taller so hover scale doesn't clip + more breathing room
  const radius = 64;
  const gap = remPx; // 1rem
  const spacing = radius * 2 + gap;
  const hidePad = radius * 6; // must be > hover size so teleports happen while hidden
  const overscan = hidePad + 160; // offscreen wrap zone (bigger than visible window)

  const baseY = height / 2 + 14; // nudged down to add top padding/air // keep wave centered vertically
  const amplitude = 54;
  const period = 720; // larger = gentler wave

  // Speeds (px/sec)
  const speedNormal = 36;
  const speedHover = 10;

  // --- Path helpers ---
  // Dramatic first hill, second hill stays as-is.
  // We apply an envelope that repeats every 2 periods: first is high, second is normal.
  const ampAt = (x: number) => {
    const phase2 = ((x % (2 * period)) + 2 * period) % (2 * period); // 0..2P
    // More dramatic: 1.7 -> 0.8 across 2P (first peak noticeably larger, second unchanged)
    const envelope = 1.7 - 0.9 * (phase2 / (2 * period));
    return amplitude * envelope;
  };

  // Upwards first: negate sine (screen coords: smaller y is up)
  const yAt = (x: number) => {
    return baseY - ampAt(x) * Math.sin((2 * Math.PI * x) / period);
  };

  // Measure width responsively
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setW(Math.max(0, Math.floor(cr.width)));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // How many circles to cover width + overscan
  const count = useMemo(() => {
    const span = w + overscan * 2;
    return Math.max(1, Math.ceil(span / spacing) + 4);
  }, [w, spacing, overscan]);

  // Stable random colors (deterministic-ish) for fallback placeholders
  const colors = useMemo(() => {
    const out: string[] = [];
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      const h = Math.floor(rand() * 360);
      const s = 70 + Math.floor(rand() * 18);
      const l = 54 + Math.floor(rand() * 10);
      out.push(`hsl(${h} ${s}% ${l}%)`);
    }

    return out;
  }, [count]);

  // Animation (DOM-driven for smoothness)
  const offsetRef = useRef(0);
  const velRef = useRef(speedNormal);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = (t: number) => {
      const last = lastTRef.current ?? t;
      const dt = Math.min(0.033, (t - last) / 1000);
      lastTRef.current = t;

      const target = anyHover ? speedHover : speedNormal;
      const ease = 1 - Math.pow(0.0005, dt);
      velRef.current += (target - velRef.current) * ease;

      const total = count * spacing;
      offsetRef.current = (offsetRef.current + velRef.current * dt) % total;

      const width = w;
      if (width > 0) {
        for (let i = 0; i < count; i++) {
          const node = itemRefs.current[i];
          if (!node) continue;

          // Left -> right: x increases as offset increases
          let x = i * spacing + offsetRef.current;

          // Wrap into 0..total then shift to [-overscan .. width+overscan]
          x = ((x % total) + total) % total;
          x = x - overscan;

          // If total span is smaller than view span (tiny screens), stretch
          const viewSpan = width + overscan * 2;
          if (total < viewSpan) x = x * (viewSpan / Math.max(1, total));

          const y = yAt(x);

          // Hide far-off items
          const visible = x > -hidePad && x < width + hidePad; // keep items hidden during wrap jump
          node.style.opacity = visible ? '1' : '0';

          node.style.setProperty('--x', `${x}px`);
          node.style.setProperty('--y', `${y}px`);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = null;
    };
  }, [anyHover, count, spacing, w]);

  // Dev-only sanity checks (“test cases”)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    const testXs = [0, period / 2, period, 1.5 * period, 2 * period];
    for (const x of testXs) {
      const y = yAt(x);
      if (!Number.isFinite(y)) {
        // eslint-disable-next-line no-console
        console.error('ObjectRibbonMarquee test failed: yAt returned non-finite', { x, y });
      }
    }

    const a1 = ampAt(0);
    const a2 = ampAt(period);
    if (!(a1 > a2)) {
      // eslint-disable-next-line no-console
      console.warn('ObjectRibbonMarquee test: expected first hill amplitude > second hill amplitude', { a1, a2 });
    }
  }, [period]);

  return (
    <div
      ref={wrapRef}
      className={'relative xw-full w-[110vw]'}
      style={{
        height,
        overflow: 'hidden',
        marginLeft: '-2vw',
        marginRight: '-2vw',
        paddingLeft: '2vw',
        paddingRight: '2vw',
      }}
      aria-label={'Object ribbon marquee'}
    >
      {Array.from({ length: count }).map((_, i) => {
        const hasImages = Array.isArray(items) && items.length > 0;
        const item = hasImages ? items[i % items.length] : null;

        return (
          <button
            key={i}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            type={'button'}
            className={'absolute'}
            style={{
              left: 0,
              top: 0,
              width: radius * 2,
              height: radius * 2,
              borderRadius: 999,
              overflow: 'hidden',
              background: item ? 'transparent' : colors[i] ?? '#999',
              // border: '1px solid rgba(0,0,0,0.08)',
              // boxShadow: '0 10px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              zIndex: 1,
              transform:
                'translate3d(var(--x, -9999px), var(--y, 0px), 0) translate(-50%, -50%) scale(var(--s, 1))',
              transition: 'transform 220ms cubic-bezier(.2,.9,.2,1), opacity 160ms ease',
              willChange: 'transform',
              opacity: 1,
              // @ts-ignore
              '--x': '-9999px',
              // @ts-ignore
              '--y': '0px',
              // @ts-ignore
              '--s': 1,
            }}
            onMouseEnter={(e) => {
              // Slow-down only when hovering circles
              hoverCountRef.current += 1;
              setAnyHover(true);
              (e.currentTarget as HTMLButtonElement).style.setProperty('--s', '1.25');
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.setProperty('--s', '1');
              hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
              if (hoverCountRef.current === 0) setAnyHover(false);
            }}
            aria-label={item?.alt ?? `Ribbon item ${i + 1}`}
          >
            {item ? (
              <img
                src={item.src}
                alt={item.alt ?? ''}
                draggable={false}
                loading={'eager'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
