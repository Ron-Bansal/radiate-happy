"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// ----------------------------- Helpers -------------------------------------
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
  { name: "Pull Ups", short: "Pulls", last: 27 },
  { name: "Dips", short: "Dips", last: 27 },
  { name: "Squats", short: "Squats", last: 27 },
  { name: "Hanging Leg Raises", short: "Legs", last: 27 },
  { name: "Push Ups", short: "Push", last: 27 },
];

const TOTAL_SECONDS = 17 * 60;

// ----------------------------- Tally SVGs ----------------------------------
const ACCENT = "#B74B65"; // desaturated rose, single accent
const ACCENT_SOFT = "#E6A9B8";

const TallyMark = ({ size = 36, color = ACCENT }) => (
  <svg
    width={size * 0.22}
    height={size}
    viewBox="0 0 6 24"
    aria-hidden
    className="inline-block"
  >
    <line
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      x1="3"
      y1="3"
      x2="3"
      y2="21"
    />
  </svg>
);

const TallyFive = ({ size = 36, color = ACCENT }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 24"
    aria-hidden
    className="inline-block"
  >
    {[3, 9, 15, 21].map((x) => (
      <line
        key={x}
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        x1={x}
        y1="3"
        x2={x}
        y2="21"
      />
    ))}
    <line
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      x1="1.5"
      y1="20"
      x2="25.5"
      y2="4"
    />
  </svg>
);

const TallyDisplay = ({ count, size = 34, color = ACCENT }) => {
  const tens = Math.floor(count / 10);
  const afterTens = count % 10;
  const fives = Math.floor(afterTens / 5);
  const ones = afterTens % 5;

  return (
    <div className="flex items-center flex-wrap gap-y-2">
      {Array.from({ length: tens }).map((_, i) => (
        <div key={`ten-${i}`} className="flex items-center mr-4">
          <div className="-mr-[3px]">
            <TallyFive size={size} color={color} />
          </div>
          <TallyFive size={size} color={color} />
        </div>
      ))}
      {Array.from({ length: fives }).map((_, i) => (
        <div key={`five-${i}`} className="mr-3">
          <TallyFive size={size} color={color} />
        </div>
      ))}
      {Array.from({ length: ones }).map((_, i) => (
        <div key={`one-${i}`} className="mr-2">
          <TallyMark size={size} color={color} />
        </div>
      ))}
    </div>
  );
};

// ----------------------------- Icons ---------------------------------------
const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5.5v13a.5.5 0 0 0 .76.43l10.5-6.5a.5.5 0 0 0 0-.86L8.76 5.07A.5.5 0 0 0 8 5.5z" />
  </svg>
);
const PauseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="6.5" y="5" width="3.75" height="14" rx="1" />
    <rect x="13.75" y="5" width="3.75" height="14" rx="1" />
  </svg>
);

// ----------------------------- Main Component ------------------------------
export default function SpeedRound() {
  const [remain, setRemain] = useState(TOTAL_SECONDS);
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

  // auto-focus when active exercise changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [activeExercise]);

  // 1s countdown
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

  // RAF for smooth second-hand
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
    setTimeout(() => setFlashExercise(null), 260);
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
    inputRef.current?.focus();
  };

  const resetTimer = () => {
    setRunning(false);
    setRemain(TOTAL_SECONDS);
    lastTickRef.current = 0;
  };

  const totalReps = useMemo(
    () => Object.values(reps).reduce((a, b) => a + b, 0),
    [reps]
  );
  const lastTotal = useMemo(
    () => EXERCISES.reduce((a, e) => a + e.last, 0),
    []
  );
  const deltaVsLast = totalReps - lastTotal;

  const secondsIntoMinute = (60 - (remain % 60)) % 60;
  let fractional = 0;
  if (running && lastTickRef.current) {
    const elapsed = nowMs - lastTickRef.current;
    fractional = Math.max(0, Math.min(1, elapsed / 1000));
  }
  const secondProgressFraction = (secondsIntoMinute + fractional) / 60;
  const sessionProgress = (1 - remain / TOTAL_SECONDS) * 100;
  const elapsedSeconds = TOTAL_SECONDS - remain;
  const minutesElapsed = Math.floor(elapsedSeconds / 60);

  const pacePerMin =
    elapsedSeconds > 0 ? (totalReps / elapsedSeconds) * 60 : 0;

  return (
    <div
      className="min-h-[100dvh] bg-[#0B0B0D] text-zinc-100 relative overflow-x-hidden selection:bg-[#B74B65]/40"
      style={{ fontFamily: "var(--font-epilogue), ui-sans-serif, system-ui" }}
    >
      {/* Subtle grain only — no ambient blobs */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* ───────── FIXED HEADER ───────── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0B0B0D]/75 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-5 pb-4">
          <div className="flex items-end justify-between gap-6 mb-4">
            {/* Brand */}
            <div className="flex items-baseline gap-4 min-w-0">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: ACCENT,
                    boxShadow: running
                      ? `0 0 0 4px ${ACCENT}22`
                      : "none",
                    transition: "box-shadow 200ms ease",
                  }}
                />
                <h1 className="text-[15px] md:text-base font-semibold tracking-[0.22em] uppercase">
                  Ascent
                </h1>
              </div>
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/40 font-mono hidden sm:inline">
                Speed Round · 17:00
              </span>
            </div>

            {/* Timer cluster */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex flex-col items-end leading-none">
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                  Elapsed
                </span>
                <span className="tabular-nums font-mono text-sm text-white/75 mt-1">
                  {formatTime(elapsedSeconds)}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span
                  className="tabular-nums font-mono text-3xl md:text-[40px] font-light tracking-tight leading-none"
                  style={{ color: remain < 60 ? ACCENT : "white" }}
                >
                  {formatTime(remain)}
                </span>
              </div>

              <button
                onClick={() => setRunning((v) => !v)}
                className="group inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12 rounded-full text-white transition-transform duration-200 active:scale-95"
                style={{
                  background: ACCENT,
                  boxShadow:
                    "0 10px 30px -12px rgba(183,75,101,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
                aria-label={running ? "Pause session" : "Start session"}
              >
                {running ? (
                  <PauseIcon width="18" height="18" />
                ) : (
                  <PlayIcon width="18" height="18" />
                )}
              </button>

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
                className="hidden sm:inline-flex items-center h-11 md:h-12 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] tracking-[0.2em] uppercase font-medium text-white/75 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Progress rail */}
          <div className="space-y-2.5">
            {/* Session rail — hairline */}
            <div className="relative h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full will-change-transform"
                style={{
                  width: `${sessionProgress}%`,
                  background: `linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT_SOFT} 100%)`,
                }}
              />
            </div>

            {/* Seconds rail with tick marks */}
            <div className="relative h-5 rounded-full bg-white/[0.05] overflow-hidden border border-white/[0.06]">
              <div
                className="absolute inset-y-0 left-0 rounded-full will-change-transform"
                style={{
                  width: "100%",
                  transformOrigin: "left",
                  transform: `scaleX(${secondProgressFraction})`,
                  background: ACCENT,
                  opacity: 0.85,
                }}
              />
              {[15, 30, 45].map((n) => (
                <div
                  key={n}
                  className="absolute inset-y-0 pointer-events-none"
                  style={{ left: `${(n / 60) * 100}%` }}
                >
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-white/40" />
                  <div className="absolute -top-[22px] -translate-x-1/2 text-[10px] tracking-wider font-mono text-white/50">
                    {n}s
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ───────── MAIN ───────── */}
      <main className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 pt-32 md:pt-36 pb-48 md:pb-44">
        {/* Meta strip */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-mono text-white/45">
            <span className="h-px w-8 bg-white/20" />
            <span>Session 027 · 17 min interval</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono text-white/50">
            <div>
              <span className="text-white/35 mr-1.5">Total</span>
              <span
                className="tabular-nums text-white"
                style={{ color: ACCENT }}
              >
                {totalReps}
              </span>
            </div>
            <div>
              <span className="text-white/35 mr-1.5">Pace</span>
              <span className="tabular-nums text-white/85">
                {pacePerMin.toFixed(1)}/min
              </span>
            </div>
            <div>
              <span className="text-white/35 mr-1.5">Δ</span>
              <span
                className="tabular-nums"
                style={{ color: deltaVsLast >= 0 ? ACCENT : "rgba(255,255,255,0.7)" }}
              >
                {deltaVsLast >= 0 ? "+" : ""}
                {deltaVsLast}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tally wall — the main instrument ── */}
        <section className="rounded-lg border border-white/[0.08] bg-white/[0.015] overflow-hidden">
          {EXERCISES.map((exercise, idx) => {
            const count = reps[exercise.name] ?? 0;
            const isActive = activeExercise === exercise.name;
            const isFlash = flashExercise === exercise.name;
            const delta = count - exercise.last;
            const progressVsLast = Math.min(
              1,
              exercise.last > 0 ? count / exercise.last : 0
            );

            return (
              <div
                key={exercise.name}
                role="button"
                tabIndex={0}
                onClick={() => setActiveExercise(exercise.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveExercise(exercise.name);
                  }
                }}
                className="group relative cursor-pointer"
                style={{
                  background: isActive
                    ? "rgba(183,75,101,0.06)"
                    : "transparent",
                  borderTop:
                    idx === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  transform: isFlash ? "translateY(-1px)" : "translateY(0)",
                  transition:
                    "background 200ms ease, transform 220ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Active accent bar */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity"
                  style={{
                    background: ACCENT,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="px-5 md:px-8 py-5 md:py-6 grid grid-cols-12 gap-4 md:gap-6 items-center">
                  {/* Label */}
                  <div className="col-span-12 md:col-span-3 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-mono text-white/35 tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[15px] md:text-base font-medium tracking-tight truncate text-white">
                        {exercise.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-white/40">
                      <span>PREV {exercise.last}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span
                        style={{
                          color:
                            delta > 0
                              ? ACCENT_SOFT
                              : delta < 0
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(255,255,255,0.35)",
                        }}
                      >
                        Δ {delta >= 0 ? "+" : ""}
                        {delta}
                      </span>
                    </div>
                    {/* Progress bar vs last */}
                    <div className="mt-2.5 h-[2px] bg-white/[0.06] rounded-full overflow-hidden max-w-[160px]">
                      <div
                        className="h-full will-change-transform"
                        style={{
                          width: `${progressVsLast * 100}%`,
                          background: ACCENT,
                          opacity: 0.8,
                          transition: "width 360ms cubic-bezier(0.16,1,0.3,1)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Tally display — the hero */}
                  <div className="col-span-12 md:col-span-7 min-h-[44px] flex items-center">
                    {count > 0 ? (
                      <TallyDisplay count={count} size={40} />
                    ) : (
                      <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/25">
                        — awaiting first rep
                      </span>
                    )}
                  </div>

                  {/* Count + quick controls */}
                  <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                    <div
                      className="tabular-nums text-4xl md:text-5xl font-light tracking-tight leading-none"
                      style={{
                        color: count > 0 ? ACCENT : "rgba(255,255,255,0.18)",
                      }}
                    >
                      {String(count).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          bump(exercise.name, -1);
                        }}
                        className="h-8 w-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-sm text-white/75 active:scale-95 transition-all"
                        aria-label={`Decrease ${exercise.name}`}
                      >
                        −
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          bump(exercise.name, 1);
                        }}
                        className="h-8 w-8 rounded-full text-sm text-white active:scale-95 transition-all"
                        style={{ background: ACCENT }}
                        aria-label={`Increase ${exercise.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Footer note */}
        <div className="mt-5 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">
          <span>Tap a row to target · Enter to log</span>
          <span>Reset keeps your reps</span>
        </div>
      </main>

      {/* ───────── BOTTOM DOCK — Console ───────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#0B0B0D]/85 border-t border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:items-center">
            {/* Active indicator */}
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: ACCENT }}
              />
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                  Logging
                </div>
                <div className="text-sm md:text-base font-medium tracking-tight truncate text-white">
                  {activeExercise}
                </div>
              </div>
            </div>

            {/* Steppers + input */}
            <div className="flex items-center gap-2">
              {[
                { label: "−1", v: -1 },
                { label: "+1", v: 1 },
                { label: "+5", v: 5 },
                { label: "+10", v: 10 },
              ].map(({ label, v }) => (
                <button
                  key={label}
                  onClick={() => bump(activeExercise, v)}
                  className="h-11 px-3 md:px-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sm font-medium tabular-nums text-white/90 active:scale-95 transition-all shrink-0"
                >
                  {label}
                </button>
              ))}
              <div className="relative flex-1 min-w-[140px]">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="Custom reps…"
                  className="w-full h-11 pr-20 pl-3.5 rounded-lg bg-black/30 border border-white/15 font-mono text-sm placeholder:text-white/35 focus:outline-none focus:border-[#B74B65]/60 focus:bg-black/50 transition-colors"
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
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-md text-[11px] tracking-[0.2em] uppercase font-semibold text-white active:scale-95 transition-transform"
                  style={{ background: ACCENT }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Running total */}
            <div className="hidden md:flex items-baseline justify-end gap-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
                Total
              </span>
              <span
                className="tabular-nums text-2xl font-light tracking-tight"
                style={{ color: ACCENT }}
              >
                {String(totalReps).padStart(3, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
