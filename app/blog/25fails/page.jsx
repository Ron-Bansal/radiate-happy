"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { blogPosts } from "./content";

/* ---- keep your blogPosts array; you may add `thumbnail` fields ---- */
// const blogPosts = [/* ... your existing 25 posts ... */];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

const CARD_W_DESKTOP = 256; // ~w-64 base width for desktop cards
const CARD_W_MOBILE = 192; // ~w-48 base width for mobile cards
const CARD_H_MOBILE_MAX = 220; // total mobile card height budget
const MOBILE_META_BLOCK = 64; // approx title/date/padding under thumb

/** Parse Tailwind aspect like 'aspect-[3/4]' → {w:3,h:4} (default 4/3) */
function parseAspect(aspectStr) {
  const m = /aspect-\[(\d+)\s*\/\s*(\d+)\]/.exec(aspectStr || "");
  if (!m) return { w: 4, h: 3 };
  const w = parseFloat(m[1]),
    h = parseFloat(m[2]);
  return !w || !h ? { w: 4, h: 3 } : { w, h };
}

/** Icons */
const ChevronLeft = (p) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronRight = (p) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronUp = (p) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <path
      d="M5 12.5L10 7.5L15 12.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronDown = (p) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const GridIcon = (p) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <path
      d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z"
      fill="currentColor"
    />
  </svg>
);
const SpeakerOn = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
    <path
      d="M15 9a3 3 0 010 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const SpeakerOff = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 10v4h3l4 3V7L7 10H4z" fill="currentColor" />
    <path
      d="M19 9l-6 6M13 9l6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/** Panel thumbnail with bg fallback; supports explicit height (mobile) */
function PanelThumb({ post, isActive, height }) {
  const [imgOk, setImgOk] = useState(!!post.thumbnail);
  if (height) {
    return (
      <div
        className="w-full rounded overflow-hidden ring-1 ring-neutral-200 relative"
        style={{ height }}
      >
        <div className="absolute inset-0">
          <div className={`${post.color} w-full h-full`} />
        </div>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgOk(false)}
            style={{ opacity: imgOk ? 1 : 0 }}
          />
        )}
        {isActive && (
          <div className="absolute inset-0 ring-2 ring-black rounded pointer-events-none" />
        )}
      </div>
    );
  }
  return (
    <div className="w-full rounded overflow-hidden ring-1 ring-neutral-200 relative">
      <div className={`${post.color} ${post.aspectRatio} w-full`} />
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgOk(false)}
          style={{ opacity: imgOk ? 1 : 0 }}
        />
      )}
      {isActive && (
        <div className="absolute inset-0 ring-2 ring-black rounded pointer-events-none" />
      )}
    </div>
  );
}

/** Card */
const BlogCard = ({
  post,
  isActive,
  onClick,
  scale = 1,
  tilt = 0,
  shadow = 0.08,
  isMobile,
}) => {
  const baseW = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP;

  // MOBILE: preserve aspect by proportionally scaling width & height if needed
  let cardW = baseW;
  let thumbH;
  if (isMobile) {
    const { w, h } = parseAspect(post.aspectRatio);
    const naturalH = baseW * (h / w);
    const maxThumb = Math.max(80, CARD_H_MOBILE_MAX - MOBILE_META_BLOCK);
    const s = naturalH > maxThumb ? maxThumb / naturalH : 1; // scale whole card if too tall
    cardW = Math.round(baseW * s);
    thumbH = Math.round(naturalH * s);
  }

  return (
    <div
      id={`card-${post.id}`}
      onClick={onClick}
      className={`cursor-pointer will-change-transform ${
        isMobile ? "inline-block mr-6 align-top" : "mb-6 ml-auto"
      }`}
      style={{
        width: isMobile ? cardW : baseW,
        transform: `perspective(1000px) rotateX(${tilt}deg) scale(${scale})`,
        transformOrigin: isMobile ? "top left" : "right top",
        boxShadow: `0 14px 34px rgba(20,24,30,${shadow})`,
      }}
    >
      <PanelThumb
        post={post}
        isActive={isActive}
        height={isMobile ? thumbH : undefined}
      />
      <div className="w-full mt-3 px-2 pb-2">
        {/* Mobile: lighter, 2-line wrap; override nowrap from tray */}
        <h3
          className={`${
            isMobile ? "text-base font-normal" : "text-sm font-medium"
          } text-neutral-900 leading-snug mb-1 whitespace-normal break-words`}
          style={
            isMobile
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }
              : {}
          }
          title={post.title}
        >
          {post.title}
        </h3>
        <p
          className={`${isMobile ? "text-[13px]" : "text-xs"} text-neutral-500`}
        >
          {post.date}
        </p>
      </div>
    </div>
  );
};

/** Minimal markdown formatter */
const MarkdownContent = ({ content }) => {
  const formatMarkdown = (text) => {
    const lines = text.split("\n");
    const elements = [];
    lines.forEach((line, idx) => {
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={idx}
            className="text-5xl md:text-6xl font-light tracking-tight mb-4 mt-12 text-neutral-900"
          >
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={idx}
            className="text-2xl md:text-3xl font-light mb-6 mt-16 text-neutral-900"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={idx}
            className="text-xl md:text-2xl font-light mb-4 mt-12 text-neutral-900"
          >
            {line.slice(4)}
          </h3>
        );
      } else if (line.match(/^!\[.*?\]\((.*?)\)/)) {
        const m = line.match(/^!\[.*?\]\((.*?)\)/);
        elements.push(
          <img key={idx} src={m[1]} alt="" className="w-full my-12" />
        );
      } else if (
        line.startsWith("*") &&
        line.endsWith("*") &&
        !line.startsWith("**")
      ) {
        elements.push(
          <p key={idx} className="text-base italic text-neutral-500 mb-4">
            {line.slice(1, -1)}
          </p>
        );
      } else if (line.trim() === "---") {
        elements.push(<hr key={idx} className="my-12 border-neutral-200" />);
      } else if (line.trim()) {
        elements.push(
          <p
            key={idx}
            className="text-base leading-relaxed mb-6 text-neutral-700"
          >
            {line}
          </p>
        );
      } else {
        elements.push(<div key={idx} className="h-4" />);
      }
    });
    return elements;
  };
  return <div className="max-w-none">{formatMarkdown(content)}</div>;
};

/** Web Audio tick: soft wood-block-ish tap
 *  - Very short band-passed noise burst (no oscillator layer by default)
 *  - Subtle volume, slight freq randomization, quick decay
 *  - Throttled so it can’t spam
 *  - Respects `muted`
 */
function useTactileTick({ enabledSelector, getActiveIndex, muted }) {
  const audioRef = useRef(null);
  const lastIdxRef = useRef(-1);
  const lastPlayRef = useRef(0);

  useEffect(() => {
    const container = enabledSelector?.();
    if (!container) return;

    let raf = 0;

    const ensureAudio = async () => {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioRef.current) {
        const ctx = new Ctx();
        try {
          await ctx.resume();
        } catch {}
        audioRef.current = ctx;
      } else {
        try {
          await audioRef.current.resume?.();
        } catch {}
      }
    };

    // const createNoiseBuffer = (ctx, dur = 0.09) => {
    //   const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    //   const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    //   const data = buffer.getChannelData(0);
    //   for (let i = 0; i < len; i++) {
    //     // slightly rough noise (de-emphasize tail)
    //     data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    //   }
    //   return buffer;
    // };

    const createNoiseBuffer = (ctx, dur = 0.06, a = 0.85) => {
      const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let prev = 0;
      for (let i = 0; i < len; i++) {
        const x = Math.random() * 2 - 1;
        const y = x - a * prev; // simple pre-emphasis (high-pass-ish)
        prev = x;
        d[i] = y * (1 - i / len); // keep your taper if you like
      }
      return buf;
    };

    const playTick = () => {
      const now = performance.now();
      if (now - lastPlayRef.current < 110) return; // ~9 Hz max
      lastPlayRef.current = now;

      const ctx = audioRef.current;
      if (!ctx || muted) return;

      const VOL = 0.028;
      const t0 = ctx.currentTime;

      // Two bright partials (glassy, not piercing)
      const base1 = 1050 + Math.random() * 80;
      const base2 = 2050 + Math.random() * 100;

      const mix = ctx.createGain();
      mix.gain.value = 1;

      // partial A
      const o1 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.setValueAtTime(base1, t0);
      o1.frequency.exponentialRampToValueAtTime(base1 * 0.95, t0 + 0.04); // tiny glide
      const g1 = ctx.createGain();
      g1.gain.setValueAtTime(0.0001, t0);
      g1.gain.exponentialRampToValueAtTime(VOL, t0 + 0.002);
      g1.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
      o1.connect(g1).connect(mix);

      // partial B (quieter, slightly longer)
      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.setValueAtTime(base2, t0);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, t0);
      g2.gain.exponentialRampToValueAtTime(VOL * 0.65, t0 + 0.0025);
      g2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.07);
      o2.connect(g2).connect(mix);

      // tiny sparkle transient (band-passed noise)
      const n = ctx.createBufferSource();
      n.buffer = createNoiseBuffer(ctx, 0.02);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 3800 + Math.random() * 250;
      bp.Q.value = 8.5;
      const nG = ctx.createGain();
      nG.gain.setValueAtTime(0.0001, t0);
      nG.gain.exponentialRampToValueAtTime(VOL * 0.22, t0 + 0.0015);
      nG.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.012);
      n.connect(bp).connect(nG).connect(mix);

      // gentle low-pass to keep it classy (no harsh top)
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3000;

      // micro-slap for presence (very quiet, 12–14 ms)
      const d = ctx.createDelay();
      d.delayTime.value = 0.013 + Math.random() * 0.002;
      const dG = ctx.createGain();
      dG.gain.value = 0.13;

      mix.connect(lp).connect(ctx.destination);
      mix.connect(d).connect(dG).connect(lp);

      o1.start();
      o1.stop(t0 + 0.08);
      o2.start();
      o2.stop(t0 + 0.085);
      n.start();
      n.stop(t0 + 0.02);
    };

    const onUserGesture = () => ensureAudio();
    document.addEventListener("pointerdown", onUserGesture, { once: true });
    container.addEventListener("pointerdown", onUserGesture, { once: true });

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = getActiveIndex?.() ?? -1;
        if (idx !== -1 && idx !== lastIdxRef.current && audioRef.current) {
          lastIdxRef.current = idx;
          playTick();
        }
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [enabledSelector, getActiveIndex, muted]);
}

export default function FailingLoudly() {
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fx, setFx] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [muted, setMuted] = useState(false); // audio mute
  const scrollRef = useRef(null); // holds scroller for mobile tray / desktop panel
  const panelRef = useRef(null);
  const rafRef = useRef(null);

  const PANEL_W = 380;

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven FX (desktop only)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const compute = () => {
      if (isMobile || isCollapsed) {
        const next = {};
        blogPosts.forEach(
          (p) => (next[p.id] = { scale: 0.9, tilt: 0, shadow: 0.1 })
        );
        setFx(next);
        return;
      }
      const next = {};
      const cards = blogPosts
        .map((p) => document.getElementById(`card-${p.id}`))
        .filter(Boolean);
      const cRect = container.getBoundingClientRect();
      const viewH = cRect.height;

      cards.forEach((el) => {
        const r = el.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        let t = (centerY - cRect.top) / viewH; // 0 top .. 1 bottom
        t = clamp(t, 0, 1);
        const spread = 0.95;
        const raw = clamp(1 - t / spread, 0, 1);
        const delayed = clamp(raw - 0.05, 0, 1);
        const pow = Math.pow(delayed, 1.25);
        const scale = lerp(0.65, 1.0, pow);
        const tilt = lerp(-4, 4, 1 - t);
        const shadow = lerp(0.07, 0.18, pow);
        next[Number(el.id.replace("card-", ""))] = { scale, tilt, shadow };
      });
      setFx(next);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    container.addEventListener("scroll", onScroll, { passive: true });

    const onTransitionEnd = () => {
      requestAnimationFrame(compute);
      setTimeout(compute, 60);
      setTimeout(compute, 140);
    };
    panelRef.current?.addEventListener("transitionend", onTransitionEnd);

    const onWinResize = () => onScroll();
    window.addEventListener("resize", onWinResize);

    const kick = setTimeout(onScroll, 120);

    return () => {
      clearTimeout(kick);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWinResize);
      panelRef.current?.removeEventListener("transitionend", onTransitionEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isCollapsed]);

  // derive prev/next
  const selectedIdx = useMemo(
    () => blogPosts.findIndex((p) => p.id === selectedPost.id),
    [selectedPost.id]
  );
  const prev = selectedIdx > 0 ? blogPosts[selectedIdx - 1] : null;
  const next =
    selectedIdx < blogPosts.length - 1 ? blogPosts[selectedIdx + 1] : null;

  // tactile tick on MOBILE (horizontal tray)
  useTactileTick({
    enabledSelector: () =>
      isMobile && mobileExpanded ? scrollRef.current : null,
    getActiveIndex: () => {
      const container = scrollRef.current;
      if (!container) return -1;
      const cRect = container.getBoundingClientRect();
      const center = cRect.left + cRect.width / 2;
      let closestIdx = -1,
        best = Infinity;
      blogPosts.forEach((p, i) => {
        const el = document.getElementById(`card-${p.id}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dist = Math.abs(cx - center);
        if (dist < best) {
          best = dist;
          closestIdx = i;
        }
      });
      return closestIdx;
    },
    muted,
  });

  // tactile tick on DESKTOP (vertical panel)
  useTactileTick({
    enabledSelector: () =>
      !isMobile && !isCollapsed ? scrollRef.current : null,
    getActiveIndex: () => {
      const container = scrollRef.current;
      if (!container) return -1;
      const cRect = container.getBoundingClientRect();
      const centerY = cRect.top + cRect.height / 2;
      let closestIdx = -1,
        best = Infinity;
      blogPosts.forEach((p, i) => {
        const el = document.getElementById(`card-${p.id}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cy = r.top + r.height / 2;
        const dist = Math.abs(cy - centerY);
        if (dist < best) {
          best = dist;
          closestIdx = i;
        }
      });
      return closestIdx;
    },
    muted,
  });

  /** MOBILE */
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-white">
        {/* Mobile Tray */}
        <div
          ref={panelRef}
          className={`bg-neutral-50 border-b border-neutral-200 transition-[height] duration-300 relative ${
            mobileExpanded ? "h-80" : "h-16"
          }`}
        >
          {/* View All (icon + text) */}
          <div className="absolute right-10 top-1.5 flex items-center gap-1">
            <GridIcon className="text-neutral-500" />
            <Link
              href="/25fails/view-all"
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
            >
              View All
            </Link>
          </div>

          {/* Mute toggle (bottom-right, same row as chevron) */}
          {mobileExpanded && (
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute right-3 bottom-2 h-9 w-9 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:text-neutral-900 flex items-center justify-center"
              aria-label={muted ? "Unmute" : "Mute"}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? <SpeakerOff /> : <SpeakerOn />}
            </button>
          )}

          {/* Chevron button at bottom center */}
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="absolute left-1/2 -translate-x-1/2 bottom-2 h-9 w-9 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:text-neutral-900 flex items-center justify-center"
            aria-label={mobileExpanded ? "Collapse panel" : "Expand panel"}
            title={mobileExpanded ? "Collapse" : "Expand"}
          >
            {mobileExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          {mobileExpanded && (
            <div
              ref={scrollRef}
              className="absolute inset-x-0 top-6 bottom-12 overflow-x-auto px-6 pb-2 whitespace-nowrap"
            >
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  isActive={selectedPost.id === post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    setMobileExpanded(false);
                  }}
                  scale={0.95}
                  tilt={0}
                  shadow={0.1}
                  isMobile
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <article className="max-w-2xl mx-auto px-6 pt-8 pb-12">
            <MarkdownContent content={selectedPost.content} />
            <nav className="mt-12 pt-6 border-t border-neutral-200 flex items-center justify-between gap-4">
              <button
                disabled={!prev}
                onClick={() => prev && setSelectedPost(prev)}
                className="text-sm text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed"
                title={prev?.title || ""}
              >
                {prev ? `← ${prev.title}` : "—"}
              </button>
              <button
                disabled={!next}
                onClick={() => next && setSelectedPost(next)}
                className="text-sm text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed"
                title={next?.title || ""}
              >
                {next ? `${next.title} →` : "—"}
              </button>
            </nav>
          </article>
        </div>
      </div>
    );
  }

  /** DESKTOP */
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-2xl mx-auto px-8 md:px-12 py-20">
          <MarkdownContent content={selectedPost.content} />
          <nav className="mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between gap-6">
            <button
              disabled={!prev}
              onClick={() => prev && setSelectedPost(prev)}
              className="text-sm text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed truncate"
              title={prev?.title || ""}
            >
              {prev ? `← ${prev.title}` : "—"}
            </button>
            <button
              disabled={!next}
              onClick={() => next && setSelectedPost(next)}
              className="text-sm text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed truncate"
              title={next?.title || ""}
            >
              {next ? `${next.title} →` : "—"}
            </button>
          </nav>
        </article>
      </div>

      {/* Right Panel */}
      <div
        ref={panelRef}
        className={`bg-neutral-50 transition-[width] duration-300 flex flex-col border-l border-neutral-200 relative ${
          isCollapsed ? "w-12" : ""
        }`}
        style={{ width: isCollapsed ? "48px" : "380px" }}
      >
        {/* Header with View All */}
        <div className="h-12 px-3 border-b border-neutral-200 flex items-center justify-between">
          {!isCollapsed ? (
            <>
              <span className="text-xs font-medium text-neutral-600">
                Preview
              </span>
              <Link
                href="/25fails/view-all"
                className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
              >
                <GridIcon /> <span>View All</span>
              </Link>
            </>
          ) : (
            <Link
              href="/25fails/view-all"
              className="mx-auto text-neutral-500 hover:text-neutral-900"
              aria-label="View All"
              title="View All"
            >
              <GridIcon />
            </Link>
          )}
        </div>

        {/* Scrollable Cards */}
        {!isCollapsed && (
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-10">
            {blogPosts.map((post) => {
              const f = fx[post.id] || {};
              return (
                <BlogCard
                  key={post.id}
                  post={post}
                  isActive={selectedPost.id === post.id}
                  onClick={() => setSelectedPost(post)}
                  scale={f.scale ?? 0.8}
                  tilt={f.tilt ?? 0}
                  shadow={f.shadow ?? 0.1}
                  isMobile={false}
                />
              );
            })}
          </div>
        )}

        {/* Floating collapse chevron (middle-left) */}
        {!isCollapsed ? (
          <>
            <button
              onClick={() => setIsCollapsed(true)}
              className="absolute top-1/2 -translate-y-1/2 -left-3 z-20 h-8 w-8 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:text-neutral-900 flex items-center justify-center"
              aria-label="Collapse panel"
              title="Collapse"
            >
              <ChevronRight />
            </button>

            {/* Mute toggle (bottom-left) */}
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute left-2 bottom-2 h-9 w-9 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:text-neutral-900 flex items-center justify-center"
              aria-label={muted ? "Unmute" : "Mute"}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? <SpeakerOff /> : <SpeakerOn />}
            </button>
          </>
        ) : (
          <div className="flex-1 relative">
            <button
              onClick={() => setIsCollapsed(false)}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 h-8 w-8 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:text-neutral-900 flex items-center justify-center"
              aria-label="Expand panel"
              title="Expand"
            >
              <ChevronLeft />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
