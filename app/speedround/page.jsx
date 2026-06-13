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
  const [totalSecs] = useState(17 * 60);
  const [remain, setRemain] = useState(17 * 60);
  const [running, setRunning] = useState(false);
  const [reps, setReps] = useState(
    Object.fromEntries(EXERCISES.map((e) => [e.name, 0]))
  );
  const [flashExercise, setFlashExercise] = useState(null);

  const [activeExercise, setActiveExercise] = useState(EXERCISES[0].name);
  const [logInput, setLogInput] = useState("");

  const [nowMs, setNowMs] = useState(0);
  const intervalRef = useRef(null);
  const rafRef = useRef(null);
  const lastTickRef = useRef(0);

  const inputRef = useRef(null);

  // auto-focus & select when active exercise changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [activeExercise]);

  // 1s tick for countdown
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    lastTickRef.current = performance.now();

    intervalRef.current = setInterval(() => {
      lastTickRef.current = performance.now();

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
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
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

  const handleAddActive = () => {
    if (!activeExercise) return;
    handleSetAdd(activeExercise, logInput);
    setLogInput("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setRemain(totalSecs);
    lastTickRef.current = 0;
  };

  const totalReps = Object.values(reps).reduce((a, b) => a + b, 0);

  const secondsIntoMinute = (60 - (remain % 60)) % 60;

  let fractional = 0;
  if (running && lastTickRef.current) {
    const elapsed = nowMs - lastTickRef.current;
    fractional = Math.max(0, Math.min(1, elapsed / 1000));
  }

  const secondProgressFraction = (secondsIntoMinute + fractional) / 60;
  const sessionProgress = (1 - remain / totalSecs) * 100;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans relative overflow-x-hidden">
      {/* Ambient gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#83344A] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A1F2E] rounded-full blur-[120px]" />
      </div>

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/55">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-4 pb-3">
          {/* Title + timer row */}
          <div className="flex items-center justify-between mb-3 gap-4">
            <div className="flex items-baseline gap-3 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                ASCENT
              </h1>
              <span className="text-[13px] md:text-sm text-[#B74B65] font-mono">
                SPEED ROUND
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-xs md:text-sm text-white/70 font-mono">
                Session: {Math.round(sessionProgress)}%
              </div>
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Reset timer? This will restart the countdown but keep your reps."
                    )
                  ) {
                    resetTimer();
                  }
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] md:text-[12px] font-semibold"
              >
                Reset
              </button>
              <div className="flex items-center gap-2">
                <div className="font-mono tabular-nums text-lg md:text-2xl tracking-tight">
                  {formatTime(remain)}
                </div>
                <button
                  onClick={() => setRunning((v) => !v)}
                  className="inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-[#B74B65] to-[#D96686] hover:shadow-[0_0_22px_rgba(183,75,101,0.45)] active:scale-95"
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
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B74B65] via-[#D06180] to-[#EA7894]"
                style={{ width: `${sessionProgress}%` }}
              />
            </div>

            <div className="relative">
              <div className="relative h-6 rounded-full bg-white/10 overflow-hidden border border-white/10">
                <div
                  className="absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-[#B74B65] via-[#D06180] to-[#EA7894] shadow-[0_0_18px_rgba(183,75,101,0.55)] will-change-transform"
                  style={{
                    width: "100%",
                    transformOrigin: "left",
                    transform: `scaleX(${secondProgressFraction})`,
                  }}
                />

                {[15, 30, 45].map((n, i) => (
                  <div
                    key={i}
                    className="absolute inset-y-0 z-20 pointer-events-none"
                    style={{ left: `${(n / 60) * 100}%` }}
                  >
                    <div className="absolute -top-5 -translate-x-1/2 text-[11px] md:text-xs text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]">
                      {n}
                    </div>
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2">
                      <div className="absolute top-0 h-full w-[1.5px] bg-white/50 mix-blend-normal" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 pb-24 md:pb-28 pt-28 md:pt-32">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-4 max-w-xl w-full mx-auto lg:mx-0 min-w-0">
            {/* Summary card (calm) */}
            <div className="rounded-xl bg-white/[0.025] border border-white/10 p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wide text-white/45 font-mono">
                  Summary
                </div>
                {/* <div className="text-[10px] text-white/35 font-mono">
                  No action needed
                </div> */}
              </div>

              <div className="grid grid-cols-5 text-left mb-2 gap-2">
                {EXERCISES.map((ex) => (
                  <div
                    key={ex.name}
                    className="text-[11px] md:text-xs text-white/60 font-mono truncate"
                  >
                    {ex.name}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 text-left gap-2">
                {EXERCISES.map((ex) => {
                  const count = reps[ex.name] ?? 0;
                  return (
                    <div
                      key={ex.name + "-count"}
                      className="text-lg md:text-xl font-black tabular-nums text-[#B74B65]"
                    >
                      {count}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-end">
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-black text-[#B74B65] leading-none">
                    {totalReps}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 font-mono">
                    Total Reps
                  </div>
                </div>
              </div>
            </div>

            {/* Logging card (CTA) */}
            <div className="rounded-xl border border-[#B74B65]/60 bg-gradient-to-br from-[#B74B65]/40 via-[#B74B65]/18 to-white/[0.02] p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_28px_rgba(183,75,101,0.35)]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[#FDECF2] font-mono">
                    Log reps
                  </div>
                  <div className="text-xs text-[#FDECF2]/70">
                    Choose an exercise, then log number of reps
                  </div>
                </div>
                {/* <span className="px-3 py-1 rounded-full bg-black/30 border border-white/15 text-[10px] font-mono text-white/80">
                  Primary action
                </span> */}
              </div>

              <div>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {EXERCISES.map((ex) => {
                    const isActive = ex.name === activeExercise;
                    return (
                      <button
                        key={ex.name}
                        onClick={() => {
                          setActiveExercise(ex.name);
                        }}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                          isActive
                            ? "bg-black/40 border-[#FDECF2] text-[#FDECF2] shadow-[0_0_16px_rgba(0,0,0,0.65)]"
                            : "bg-black/10 border-white/20 text-white/80 hover:bg-black/20"
                        }`}
                      >
                        {ex.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2.5">
                <div className="text-xs text-[#FDECF2]/90 font-mono">
                  Active:{" "}
                  <span className="font-semibold text-white">
                    {activeExercise}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => bump(activeExercise, -1)}
                    className="h-8 px-2.5 rounded-lg bg-black/10 hover:bg-black/25 border border-white/25 text-[13px] font-bold text-white/80 active:scale-95"
                  >
                    −1
                  </button>
                  <button
                    onClick={() => bump(activeExercise, 1)}
                    className="h-9 px-3 rounded-lg bg-black/35 hover:bg-black/45 border border-white/25 text-sm font-bold text-white active:scale-95"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => bump(activeExercise, 5)}
                    className="h-9 px-3 rounded-lg bg-black/35 hover:bg-black/45 border border-white/25 text-sm font-bold text-white active:scale-95"
                  >
                    +5
                  </button>
                </div>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter reps… e.g. 8 or -5"
                    className="w-full pr-24 pl-3 py-2.5 rounded-xl bg-black/35 border border-white/25 text-left font-mono text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FDECF2]/70"
                    value={logInput}
                    onChange={(e) => setLogInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddActive();
                        e.currentTarget.blur();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddActive}
                    className="absolute right-1 top-1 h-[34px] px-3 rounded-lg bg-[#FDECF2]/10 hover:bg-[#FDECF2]/20 border border-[#FDECF2]/50 text-[11px] font-semibold text-[#FDECF2] active:scale-95"
                  >
                    Add set
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: tallies */}
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 min-w-0">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wide text-white/45 font-mono">
                Totals
              </div>
              <div className="text-[11px] text-white/35 font-mono">
                Tap a row to switch exercise
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {EXERCISES.map((exercise, idx) => {
                const count = reps[exercise.name] ?? 0;
                const isActive = activeExercise === exercise.name;

                return (
                  <div
                    key={exercise.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveExercise(exercise.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveExercise(exercise.name);
                      }
                    }}
                    className={`py-2 md:py-3 transition-all duration-300 cursor-pointer rounded-xl px-3 sm:px-4 md:px-5 sm:-mx-4 md:-mx-5 ${
                      isActive
                        ? "bg-[#B74B65]/18 border border-[#B74B65]/70 shadow-[0_0_22px_rgba(183,75,101,0.32)]"
                        : "border border-transparent hover:bg-white/[0.02]"
                    } ${
                      flashExercise === exercise.name
                        ? "scale-[1.01]"
                        : "scale-[1]"
                    }`}
                    style={{
                      animation:
                        flashExercise === exercise.name
                          ? "pulse 0.28s ease"
                          : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#B74B65] font-mono text-[11px] opacity-60">
                            0{idx + 1}
                          </span>
                          <h3 className="text-sm md:text-base font-semibold tracking-tight truncate">
                            {exercise.name}
                          </h3>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B74B65]/35 border border-[#FDECF2]/40 text-[#FDECF2]">
                              ACTIVE
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-2xl md:text-3xl font-black tabular-nums text-[#B74B65] leading-none">
                          {count}
                        </div>
                        <div className="text-white/30 text-[10px] md:text-[11px] font-mono uppercase">
                          Reps
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-300 ease-out overflow-hidden ${
                        count > 0
                          ? "max-h-24 opacity-100 mt-1"
                          : "max-h-0 opacity-0 -mb-1"
                      }`}
                    >
                      <div className="flex items-center">
                        <TallyDisplay count={count} size={38} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
