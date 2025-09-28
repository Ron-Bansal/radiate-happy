// components/RandomDragRail.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const DEFAULT_COLORS = [
  "#e63946",
  "#457b9d",
  "#f4a261",
  "#2a9d8f",
  "#e9c46a",
  "#8d99ae",
  "#ff6b6b",
  "#6a4c93",
  "#3a86ff",
  "#8338ec",
];

export default function RandomDragRail({
  items, // [{ src, alt }, ...] optional; otherwise color cards
  count = 10, // used in color mode only
  desktopAxis = "vertical",
  mobileAxis = "horizontal",
  mobileSize = 150, // px
  desktopMax = 400, // px
  tiltRange = [2, 6], // degrees [min, max]
  neighborsOppose = true,
  baseFlow = 0.45, // px/tick
  velDecay = 0.965, // 0..1 (higher = more glide)
  kick = 0.32, // drag impulse multiplier
  colors = DEFAULT_COLORS,

  // Cohesion styling for your grainy green background
  tint = "#7b8d5a", // olive tint
  tintOpacity = 0.3, // 0..1
  ringOpacity = 0.35, // 0..1
  shadowOpacity = 0.5, // 0..1
  showGrain = true, // inline SVG noise overlay

  // Seed for stable tilt across reloads
  tiltSeed = 20250926, // number; same seed => same angles
  className = "",
}) {
  const outlineRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);

  // stable seed & table for angles
  const tiltSeedRef = useRef(tiltSeed >>> 0);
  const tiltTableRef = useRef([]); // per-index angle in degrees (+/-)

  // --- deterministic per-index random helpers (hashed) ---
  const hash32 = (x) => {
    x = x ^ 61 ^ (x >>> 16);
    x = (x + (x << 3)) >>> 0;
    x = x ^ (x >>> 4);
    x = Math.imul(x, 0x27d4eb2d) >>> 0;
    x = x ^ (x >>> 15);
    return x >>> 0;
  };
  const rand01FromSeed = (seed, i) => {
    const m = hash32(((seed ^ 0x9e3779b9) + Math.imul(i, 0x85ebca6b)) >>> 0);
    let t = (m + 0x6d2b79f5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // 0..1
  };

  useEffect(() => {
    if (!trackRef.current) return;

    gsap.registerPlugin(Draggable);

    // sync seed if prop changes
    tiltSeedRef.current = tiltSeed >>> 0;

    const track = trackRef.current;
    const mq = window.matchMedia("(max-width: 768px)");
    const UNIQUE = items?.length ? items.length : count;

    // Build per-index tilt angles (unique magnitude per index, stable)
    const makeTiltTable = () => {
      const [minTilt, maxTilt] = tiltRange;
      tiltTableRef.current = Array.from({ length: UNIQUE }, (_, i) => {
        const r = rand01FromSeed(tiltSeedRef.current, i); // 0..1 per index
        const mag = minTilt + r * (maxTilt - minTilt); // map to range
        const sign = neighborsOppose
          ? i % 2 === 0
            ? 1
            : -1 // alternate
          : r < 0.5
          ? 1
          : -1;
        return mag * sign;
      });
    };

    // Build unique set, then duplicate for seamless loop
    const build = () => {
      track.innerHTML = "";

      const makeColorCard = (i) => {
        const el = document.createElement("div");
        el.className =
          "rd-card relative shrink-0 aspect-square w-[var(--card-mobile)] md:w-full md:max-w-[var(--card-desktop-max)] " +
          "rounded-lg overflow-hidden bg-[#111614] " +
          //   "ring-1 " +
          `ring-[rgba(86,99,71,${ringOpacity})] ` +
          `shadow-[0_14px_36px_rgba(32,38,27,${shadowOpacity})] ` +
          "flex items-center justify-center select-none text-white font-bold";
        el.textContent = String((i % UNIQUE) + 1);
        el.style.filter = "saturate(0.9) contrast(0.98) brightness(0.98)";

        const tintLayer = document.createElement("div");
        tintLayer.className =
          "pointer-events-none absolute inset-0 mix-blend-multiply";
        tintLayer.style.background = "var(--card-tint)";
        tintLayer.style.opacity = String(tintOpacity);

        const vignette = document.createElement("div");
        vignette.className = "pointer-events-none absolute inset-0";
        vignette.style.background =
          "radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.18), transparent 55%)";

        if (showGrain) el.appendChild(makeNoiseSVG());
        el.appendChild(tintLayer);
        el.appendChild(vignette);
        return el;
      };

      const makeImageCard = (i) => {
        const { src, alt } = items[i % items.length];
        const wrap = document.createElement("figure");
        wrap.className =
          "rd-card relative shrink-0 aspect-square w-[var(--card-mobile)] md:w-full md:max-w-[var(--card-desktop-max)] " +
          "rounded-lg overflow-hidden bg-[#111614] " +
          //   "ring-1 " +
          //   `ring-[rgba(86,99,71,${ringOpacity})] ` +
          `shadow-[0_14px_36px_rgba(32,38,27,${shadowOpacity})] ` +
          "flex items-center justify-center select-none";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt || "card image";
        img.className = "block w-full h-full object-cover";
        img.style.filter = "saturate(0.9) contrast(0.98) brightness(0.98)";

        const tintLayer = document.createElement("div");
        tintLayer.className =
          "pointer-events-none absolute inset-0 mix-blend-multiply";
        tintLayer.style.background = "var(--card-tint)";
        tintLayer.style.opacity = String(tintOpacity);

        const vignette = document.createElement("div");
        vignette.className = "pointer-events-none absolute inset-0";
        vignette.style.background =
          "radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.18), transparent 55%)";

        wrap.appendChild(img);
        wrap.appendChild(tintLayer);
        wrap.appendChild(vignette);
        if (showGrain) wrap.appendChild(makeNoiseSVG());
        return wrap;
      };

      const single = Array.from({ length: UNIQUE }, (_, i) =>
        items?.length ? makeImageCard(i) : makeColorCard(i)
      );

      const dup = [
        ...single,
        ...single.map((n) => n.cloneNode(true)),
        ...single.map((n) => n.cloneNode(true)),
      ];

      dup.forEach((el) => track.appendChild(el));
    };

    // Inline SVG turbulence generator for subtle grain
    const makeNoiseSVG = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute(
        "class",
        "pointer-events-none absolute inset-0 opacity-[.12] mix-blend-overlay"
      );
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", "0 0 100 100");
      const filter = document.createElementNS(svg.namespaceURI, "filter");
      filter.setAttribute("id", "grain");
      const feTurbulence = document.createElementNS(
        svg.namespaceURI,
        "feTurbulence"
      );
      feTurbulence.setAttribute("type", "fractalNoise");
      feTurbulence.setAttribute("baseFrequency", "0.9");
      feTurbulence.setAttribute("numOctaves", "2");
      feTurbulence.setAttribute("stitchTiles", "stitch");
      filter.appendChild(feTurbulence);
      const feColorMatrix = document.createElementNS(
        svg.namespaceURI,
        "feColorMatrix"
      );
      feColorMatrix.setAttribute("type", "saturate");
      feColorMatrix.setAttribute("values", "0");
      filter.appendChild(feColorMatrix);
      svg.appendChild(filter);
      const rect = document.createElementNS(svg.namespaceURI, "rect");
      rect.setAttribute("x", "0");
      rect.setAttribute("y", "0");
      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("filter", "url(#grain)");
      svg.appendChild(rect);
      return svg;
    };

    const unitSize = (axis) => {
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.gap || "0");
      if (axis === "vertical") {
        const h = track.children[0]?.getBoundingClientRect().height;
        return (h || 200) + gap;
      } else {
        const w = track.children[0]?.getBoundingClientRect().width;
        return (w || mobileSize) + gap;
      }
    };

    const getAxis = () => (mq.matches ? mobileAxis : desktopAxis);

    // State
    let mode = getAxis();
    let pos = 0;
    let vel = 0;
    let isDown = false;
    let lastMain = 0;
    let drag = null;

    const apply = () => {
      const unit = unitSize(mode);
      const loopLen = unit * UNIQUE;
      pos = ((pos % loopLen) + loopLen) % loopLen;
      if (mode === "vertical")
        gsap.set(track, { x: 0, y: -pos, force3D: true });
      else gsap.set(track, { x: -pos, y: 0, force3D: true });
    };

    const ticker = gsap.ticker.add(() => {
      if (!isDown) {
        vel *= velDecay;
        if (Math.abs(vel) < 0.005) vel = 0;
        pos += baseFlow + vel; // drift + momentum only when not dragging
      } else {
        pos += vel; // apply just drag velocity, no drift
      }
      apply();
    });

    // Use the stable per-index tilt on press (handles duplicated sets via modulo)
    const tiltCardsOnPress = () => {
      const kids = Array.from(track.children);
      kids.forEach((el, i) => {
        const baseIdx = i % UNIQUE;
        const angle = tiltTableRef.current[baseIdx] ?? 0;
        gsap.to(el, { rotateZ: angle, duration: 0.22, ease: "power2.out" });
      });
    };

    const resetTilt = () => {
      gsap.to(track.children, {
        rotateZ: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const setupDrag = () => {
      if (drag) drag.kill();
      const type = mode === "vertical" ? "y" : "x";
      drag = Draggable.create(track, {
        type,
        trigger: track,
        allowContextMenu: true,
        onPress() {
          isDown = true;
          tiltCardsOnPress();
          lastMain = type === "y" ? this.y : this.x;
        },
        onDrag() {
          const cur = type === "y" ? this.y : this.x;
          const delta = cur - lastMain;
          lastMain = cur;
          pos -= delta;
          vel = gsap.utils.clamp(-8, 8, -delta * kick);
          gsap.set(this.target, { x: 0, y: 0 });
          apply();
        },
        onRelease() {
          isDown = false;
          resetTilt();
        },
      })[0];
    };

    const setMode = () => {
      mode = getAxis();
      makeTiltTable(); // build table BEFORE cards so we can use UNIQUE
      build();
      pos = 0;
      vel = 0;
      apply();
      setupDrag();
    };

    // init + listeners
    setMode();
    const mqListener = () => setMode();
    mq.addEventListener("change", mqListener);

    const onResize = () => apply();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      mq.removeEventListener("change", mqListener);
      window.removeEventListener("resize", onResize);
      if (drag) drag.kill();
      gsap.ticker.remove(ticker);
    };
  }, [
    items,
    count,
    desktopAxis,
    mobileAxis,
    mobileSize,
    desktopMax,
    tiltRange,
    neighborsOppose,
    baseFlow,
    velDecay,
    kick,
    colors,
    tint,
    tintOpacity,
    ringOpacity,
    shadowOpacity,
    showGrain,
    tiltSeed, // respond to seed changes
  ]);

  // CSS vars for dynamic sizing + tint
  const styleVars = {
    "--card-mobile": `${mobileSize}px`,
    "--card-desktop-max": `${desktopMax}px`,
    "--desktop-rail-max": `calc(${desktopMax}px + 2rem)`,
    "--card-tint": tint,
  };

  return (
    <div
      className={[
        // Fill parent height, right-align on desktop, respect max width
        "h-full md:h-full md:ml-auto md:w-full md:max-w-[var(--desktop-rail-max)]",
        // Outline styling (no vertical margins)
        // "md:rounded-2xl md:border md:border-white/15 md:bg-transparent md:p-4",
        className || "",
      ].join(" ")}
      style={styleVars}
      ref={outlineRef}
    >
      <div
        // Deeper desktop side gutters to protect rotated corners
        className={[
          "relative h-full rounded-xl box-border",
          "px-3 py-5", // mobile gutters
          "md:py-3 md:px-12", // generous desktop gutters
          // Axis-specific clipping
          "md:overflow-y-hidden md:overflow-x-visible", // desktop (vertical)
          "overflow-x-hidden overflow-y-visible", // mobile (horizontal)
        ].join(" ")}
        ref={railRef}
      >
        <div
          ref={trackRef}
          className={[
            // Extra inner gutter on desktop
            "absolute inset-4 md:inset-y-3 md:inset-x-10",
            // FLEX rail (horizontal mobile → vertical desktop)
            "flex gap-3 flex-row md:flex-col",
            "items-start justify-start",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
