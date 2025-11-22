"use client";

import { useState, useEffect, useRef } from "react";

// ----------------------------- Helpers & Tests ------------------------------
const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const ss = String(s % 60).padStart(2, "0");
  return `${m}:${ss}`;
};

if (typeof window !== "undefined") {
  try {
    console.assert(formatTime(0) === "0:00", "formatTime(0) -> 0:00");
    console.assert(formatTime(187) === "3:07", "formatTime(187) -> 3:07");
    console.assert(formatTime(60) === "1:00", "formatTime(60) -> 1:00");
  } catch {}
}

// ----------------------------- Data ----------------------------------------
const EXERCISES = [
  { name: "Pull Ups", last: 27 },
  { name: "Dips", last: 27 },
  { name: "Squats", last: 27 },
  { name: "Hanging Leg Raises", last: 27 },
  { name: "Push Ups", last: 27 },
];

// ----------------------------- Tally SVGs ----------------------------------
const TALLY_COLOR = "#B74B65";

const TallyMark = ({ size = 36 }) => (
  <svg
    className="inline-block"
    width={size * 0.22}
    height={size}
    viewBox="0 0 6 24"
    aria-hidden
  >
    <line
      className="stroke-[2.8]"
      stroke={TALLY_COLOR}
      strokeLinecap="round"
      x1="3"
      y1="3"
      x2="3"
      y2="21"
    />
  </svg>
);

const TallyFive = ({ size = 36 }) => (
  <svg
    className="inline-block"
    width={size}
    height={size}
    viewBox="0 0 28 24"
    aria-hidden
  >
    <line
      stroke={TALLY_COLOR}
      className="stroke-[2.8]"
      strokeLinecap="round"
      x1="3"
      y1="3"
      x2="3"
      y2="21"
    />
    <line
      stroke={TALLY_COLOR}
      className="stroke-[2.8]"
      strokeLinecap="round"
      x1="9"
      y1="3"
      x2="9"
      y2="21"
    />
    <line
      stroke={TALLY_COLOR}
      className="stroke-[2.8]"
      strokeLinecap="round"
      x1="15"
      y1="3"
      x2="15"
      y2="21"
    />
    <line
      stroke={TALLY_COLOR}
      className="stroke-[2.8]"
      strokeLinecap="round"
      x1="21"
      y1="3"
      x2="21"
      y2="21"
    />
    <line
      stroke={TALLY_COLOR}
      className="stroke-[2.8]"
      strokeLinecap="round"
      x1="1.5"
      y1="20"
      x2="25.5"
      y2="4"
    />
  </svg>
);

const TallyDisplay = ({ count, size = 40 }) => {
  const tens = Math.floor(count / 10);
  const afterTens = count % 10;
  const fives = Math.floor(afterTens / 5);
  const ones = afterTens % 5;

  return (
    <div className="flex items-center flex-wrap">
      {Array.from({ length: tens }).map((_, i) => (
        <div key={`ten-${i}`} className="flex items-center mr-4">
          <div className="-mr-[3px]">
            <TallyFive size={size} />
          </div>
          <div>
            <TallyFive size={size} />
          </div>
        </div>
      ))}
      {Array.from({ length: fives }).map((_, i) => (
        <div key={`five-${i}`} className="mr-2">
          <TallyFive size={size} />
        </div>
      ))}
      {Array.from({ length: ones }).map((_, i) => (
        <div key={`one-${i}`} className="mr-2">
          <TallyMark size={size} />
        </div>
      ))}
    </div>
  );
};

// ----------------------------- Main Component ------------------------------
export default function AscentWorkout() {
  const [totalSecs, setTotalSecs] = useState(17 * 60);
  const [remain, setRemain] = useState(17 * 60);
  const [running, setRunning] = useState(false);
  const [reps, setReps] = useState(
    Object.fromEntries(EXERCISES.map((e) => [e.name, 0]))
  );
  const [flashExercise, setFlashExercise] = useState(null);
  const [nowMs, setNowMs] = useState(0); // micro-smoothing
  const [suppressTransition, setSuppressTransition] = useState(false); // prevent jarring reset at minute wrap
  const intervalRef = useRef(null);
  const rafRef = useRef(null);
  const lastTickRef = useRef(0);

  // 1s tick for countdown
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // mark the "start" tick so the first second animates smoothly too
    lastTickRef.current = performance.now();

    intervalRef.current = setInterval(() => {
      lastTickRef.current = performance.now(); // exact time this second elapsed

      setRemain((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // RAF for smooth seconds progress between ticks
  useEffect(() => {
    if (!running) return;

    const loop = (t) => {
      setNowMs(t);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const bump = (name, delta) => {
    setReps((prev) => ({
      ...prev,
      [name]: Math.max(0, (prev[name] ?? 0) + delta),
    }));
    setFlashExercise(name);
    setTimeout(() => setFlashExercise(null), 280);
  };

  const handleSetAdd = (name, value) => {
    const cleaned = String(value ?? "").trim();
    const v = Number(cleaned);
    if (!Number.isNaN(v) && v !== 0) bump(name, v);
  };

  const reset = () => {
    setRunning(false);
    setRemain(totalSecs);
    setReps(Object.fromEntries(EXERCISES.map((e) => [e.name, 0])));
  };

  const adjustTime = (delta) => {
    if (running) return;
    const newTotal = Math.max(60, totalSecs + delta);
    setTotalSecs(newTotal);
    setRemain(newTotal);
  };

  const totalReps = Object.values(reps).reduce((a, b) => a + b, 0);
  const lastTimeTotal = EXERCISES.reduce((sum, e) => sum + e.last, 0);

  // Smooth second progress left-to-right
  const secondsIntoMinute = (60 - (remain % 60)) % 60; // 0..59 elapsed in current minute

  // 0..1 between whole-second ticks, tied to the *actual* tick time to avoid rubberbanding
  let fractional = 0;
  if (running && lastTickRef.current) {
    const elapsed = nowMs - lastTickRef.current; // ms since last tick
    fractional = Math.max(0, Math.min(1, elapsed / 1000));
  }

  const secondProgressFraction = (secondsIntoMinute + fractional) / 60; // 0..1

  // overall session progress for the bottom bar + header label
  const sessionProgress = (1 - remain / totalSecs) * 100;

  useEffect(() => {
    if (!running) return;
    if (secondsIntoMinute < 0.5 && remain !== totalSecs) {
      setSuppressTransition(true);
      const t = setTimeout(() => setSuppressTransition(false), 80);
      return () => clearTimeout(t);
    }
  }, [secondsIntoMinute, running, remain, totalSecs]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans relative overflow-x-hidden">
      {/* Ambient gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#83344A] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A1F2E] rounded-full blur-[120px]" />
      </div>

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/55">
        <div className="max-w-[1400px] mx-auto px-6 pt-4 pb-3">
          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                ASCENT
              </h1>
              <span className="text-[13px] md:text-sm text-[#B74B65] font-mono">
                SPEED ROUND
              </span>
            </div>
            <div className="flex items-center gap-2" />
          </div>

          {/* Seconds bar with labels & ticks overlayed above fill */}
          <div className="relative">
            <div className="relative h-6 rounded-full bg-white/10 overflow-hidden border border-white/10">
              {/* progress fill (use transform scaleX for GPU-friendly, linear updates) */}
              <div
                className="absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-[#B74B65] via-[#D06180] to-[#EA7894] shadow-[0_0_18px_rgba(183,75,101,0.55)] will-change-transform"
                style={{
                  width: "100%",
                  transformOrigin: "left",
                  transform: `scaleX(${secondProgressFraction})`,
                }}
              />

              {/* markers (labels + subtle ticks) above the fill for contrast */}
              {[15, 30, 45].map((n, i) => (
                <div
                  key={i}
                  className="absolute inset-y-0 z-20 pointer-events-none"
                  style={{ left: `${(n / 60) * 100}%` }}
                >
                  {/* label */}
                  <div className="absolute -top-5 -translate-x-1/2 text-[11px] md:text-xs text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]">
                    {n}
                  </div>
                  {/* subtle tick below label */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2">
                    <div className="absolute top-0 h-full w-[1.5px] bg-white/80 mix-blend-normal" />
                  </div>
                </div>
              ))}

              {/* moving dot: hide at extremes to avoid left-edge circle */}
              {/* <div
                className="absolute -top-2 z-30 w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"
                style={{
                  opacity: secondProgressFraction > 0.01 && secondProgressFraction < 0.99 ? 1 : 0,
                  transform: `translateX(calc(${secondProgressFraction * 100}% - 50%))`,
                  transition: 'opacity 100ms linear'
                }}
              /> */}
            </div>

            {/* Actions row: left timer + icon, right session% + confirm reset */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-mono tabular-nums text-2xl md:text-3xl tracking-tight">
                  {formatTime(remain)}
                </div>
                <button
                  onClick={() => setRunning((v) => !v)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-[#B74B65] to-[#D96686] hover:shadow-[0_0_22px_rgba(183,75,101,0.45)] active:scale-95"
                  aria-label={running ? "Pause session" : "Start session"}
                  title={running ? "Pause session" : "Start session"}
                >
                  {running ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="6" y="5" width="4" height="14" rx="1.2" />
                      <rect x="14" y="5" width="4" height="14" rx="1.2" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7-11-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs md:text-sm text-white/70 font-mono">
                  Session: {Math.round(sessionProgress)}%
                </div>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Reset session? All current reps will be cleared."
                      )
                    )
                      reset();
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[12px] font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main container with top padding for fixed header */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-28 md:pb-36 pt-28 md:pt-32">
        {/* Session progress bar */}
        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#B74B65] via-[#D06180] to-[#EA7894]"
            style={{ width: `${sessionProgress}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="text-4xl md:text-5xl font-black text-[#B74B65] leading-none">
              {totalReps}
            </div>
            <div className="text-white/40 text-[11px] md:text-xs font-mono uppercase mt-1">
              Total Reps
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="text-4xl md:text-5xl font-black text-white/30 leading-none">
              {lastTimeTotal}
            </div>
            <div className="text-white/40 text-[11px] md:text-xs font-mono uppercase mt-1">
              Last Session
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex items-center justify-between">
            <div className="text-white/70 text-sm font-mono">Exercises</div>
            <div className="text-3xl md:text-4xl font-black">
              {EXERCISES.length}
            </div>
          </div>
        </div>

        {/* Exercise list */}
        <div className="grid gap-4">
          {EXERCISES.map((exercise, idx) => {
            const count = reps[exercise.name] ?? 0;
            const trend =
              count > exercise.last ? "↑" : count < exercise.last ? "↓" : "→";
            const trendColor =
              count > exercise.last
                ? "#4ADE80"
                : count < exercise.last
                ? "#F87171"
                : "#94A3B8";
            const idBase = exercise.name.replaceAll(" ", "");

            return (
              <div
                key={exercise.name}
                className={`relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 transition-all duration-300 ${
                  flashExercise === exercise.name
                    ? "scale-[1.015] shadow-[0_0_38px_rgba(183,75,101,0.25)]"
                    : ""
                }`}
                style={{
                  animation:
                    flashExercise === exercise.name
                      ? "pulse 0.28s ease"
                      : "none",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#B74B65] font-mono text-[12px] opacity-60">
                        0{idx + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">
                        {exercise.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/40 font-mono">
                        Last: {exercise.last}
                      </span>
                      <span className="font-bold" style={{ color: trendColor }}>
                        {trend}
                      </span>
                    </div>
                  </div>

                  {/* Big numeric total */}
                  <div className="text-right shrink-0">
                    <div className="text-4xl md:text-5xl font-black tabular-nums text-[#B74B65] leading-none">
                      {count}
                    </div>
                    <div className="text-white/30 text-[10px] md:text-xs font-mono uppercase">
                      Reps
                    </div>
                  </div>
                </div>

                {/* Tally (collapsible) + Controls */}
                <div className="flex flex-col gap-4">
                  {/* Collapsible tally zone: hidden at 0 reps, expands gracefully when >0 */}
                  <div
                    className={`transition-all duration-300 ease-out overflow-hidden ${
                      count > 0
                        ? "max-h-24 opacity-100 mt-1"
                        : "max-h-0 opacity-0 -mb-1"
                    }`}
                  >
                    <div className="flex items-center">
                      <TallyDisplay count={count} size={44} />
                    </div>
                  </div>

                  {/* Input with embedded Add button */}
                  <div className="flex flex-col gap-2 w-full max-w-[360px]">
                    <div className="relative">
                      <input
                        type="text"
                        id={`set-${idBase}`}
                        inputMode="numeric"
                        placeholder="Enter reps… e.g. 8 or -5"
                        className="w-full pr-24 pl-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-left font-mono focus:outline-none focus:ring-2 focus:ring-[#B74B65]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const v = e.target.value;
                            handleSetAdd(exercise.name, v);
                            e.target.value = "";
                            e.target.blur();
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById(`set-${idBase}`);
                          if (!el) return;
                          handleSetAdd(exercise.name, el.value);
                          el.value = "";
                          el.blur();
                        }}
                        className="absolute right-1.5 top-1.5 h-[34px] px-3 rounded-lg bg-[#B74B65]/20 hover:bg-[#B74B65]/30 border border-[#B74B65]/35 text-xs font-semibold active:scale-95"
                      >
                        Add set
                      </button>
                    </div>

                    {/* Quick actions: -1 smaller, then +1, +5 */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => bump(exercise.name, -1)}
                        className="h-8 px-2.5 rounded-lg bg-transparent hover:bg-white/5 border border-white/15 text-[13px] font-bold text-white/70 active:scale-95"
                      >
                        −1
                      </button>
                      <button
                        onClick={() => bump(exercise.name, 1)}
                        className="h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold active:scale-95"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => bump(exercise.name, 5)}
                        className="h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold active:scale-95"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#B74B65]/5 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.015);
          }
        }
      `}</style>
    </div>
  );
}
