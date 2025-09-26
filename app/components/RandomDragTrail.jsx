// components/RandomDragRail.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const DEFAULT_COLORS = [
  "#e63946", "#457b9d", "#f4a261", "#2a9d8f", "#e9c46a",
  "#8d99ae", "#ff6b6b", "#6a4c93", "#3a86ff", "#8338ec",
];

export default function RandomDragRail({
  items,
  count = 10,
  desktopAxis = "vertical",
  mobileAxis = "horizontal",
  mobileSize = 150,
  desktopMax = 400,
  tiltRange = [4, 12],
  neighborsOppose = true,
  baseFlow = 0.45,
  velDecay = 0.965,
  kick = 0.32,
  colors = DEFAULT_COLORS,
  className = "",
}) {
  const outlineRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    gsap.registerPlugin(Draggable);

    const track = trackRef.current;
    const mq = window.matchMedia("(max-width: 768px)");

    const UNIQUE = items?.length ? items.length : count;

    const build = () => {
      track.innerHTML = "";

      const makeColorCard = (i) => {
        const el = document.createElement("div");
        el.className =
          "rd-card shrink-0 aspect-square w-[var(--card-mobile)] md:w-full md:max-w-[var(--card-desktop-max)] " +
          "rounded-xl text-white font-bold text-[1.05rem] shadow-[0_8px_20px_rgba(0,0,0,0.25)] " +
          "flex items-center justify-center select-none";
        el.textContent = String((i % UNIQUE) + 1);
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        return el;
      };

      const makeImageCard = (i) => {
        const { src, alt } = items[i % items.length];
        const wrap = document.createElement("figure");
        wrap.className =
          "rd-card shrink-0 aspect-square w-[var(--card-mobile)] md:w-full md:max-w-[var(--card-desktop-max)] " +
          "rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.25)] " +
          "flex items-center justify-center select-none bg-neutral-900";
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt || "card image";
        img.className = "block w-full h-full object-cover";
        wrap.appendChild(img);
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
      if (mode === "vertical") gsap.set(track, { x: 0, y: -pos, force3D: true });
      else gsap.set(track, { x: -pos, y: 0, force3D: true });
    };

    const ticker = gsap.ticker.add(() => {
      if (!isDown) {
        vel *= velDecay;
        if (Math.abs(vel) < 0.005) vel = 0;
      }
      pos += baseFlow + vel;
      apply();
    });

    const tiltCardsOnPress = () => {
      const kids = Array.from(track.children);
      const [minTilt, maxTilt] = tiltRange;
      const baseSign = Math.random() < 0.5 ? 1 : -1;
      kids.forEach((el, i) => {
        const mag = gsap.utils.random(minTilt, maxTilt);
        const sign = neighborsOppose
          ? i % 2 === 0
            ? baseSign
            : -baseSign
          : Math.random() < 0.5
          ? 1
          : -1;
        gsap.to(el, { rotateZ: mag * sign, duration: 0.22, ease: "power2.out" });
      });
    };

    const resetTilt = () => {
      gsap.to(track.children, { rotateZ: 0, duration: 0.35, ease: "power2.out" });
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
      build();
      pos = 0;
      vel = 0;
      apply();
      setupDrag();
    };

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
  ]);

  const styleVars = {
    "--card-mobile": `${mobileSize}px`,
    "--card-desktop-max": `${desktopMax}px`,
    "--desktop-rail-max": `calc(${desktopMax}px + 2rem)`,
  };

  return (
    <div
      className={[
        // Fill parent height, right-align on desktop, respect max width
        "h-full md:h-full md:ml-auto md:w-full md:max-w-[var(--desktop-rail-max)]",
        // Outline styling
        // "md:rounded-2xl md:border md:border-white/15 md:bg-transparent md:p-4",
        // (No vertical margins applied anywhere)
        className || "",
      ].join(" ")}
      style={styleVars}
      ref={outlineRef}
    >
      <div
        // Deeper desktop side gutters; no vertical margins (only padding)
        className={[
          "relative h-full rounded-xl box-border",
          "px-3 py-5",           // mobile
          "md:py-3 md:px-10",    // much wider X gutter on desktop
          // Axis-specific clipping
          "md:overflow-y-hidden md:overflow-x-visible", // desktop (vertical)
          "overflow-x-hidden overflow-y-visible",       // mobile (horizontal)
        ].join(" ")}
        ref={railRef}
      >
        <div
          ref={trackRef}
          className={[
            // Extra inner gutter on desktop to protect rotated corners
            "absolute inset-4 md:inset-y-3 md:inset-x-8",
            // FLEX rail (horizontal mobile → vertical desktop)
            "flex gap-3 flex-row md:flex-col",
            "items-start justify-start",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
