"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Gym Cost Reality Check — single-file React component
 *
 * MVP:
 * - Shows your daily cost and your next session's effective cost (days since last gym * daily cost)
 * - Striking, sharp, geometric identity: shards, wedges, rings, punchy gradients, crisp strokes
 *
 * Next:
 * - Fast calendar marking (multi-month)
 * - "Clothesline" proportional markers below calendar to compare session costs over time
 */

// -----------------------------
// Utilities
// -----------------------------

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function formatNZD(n: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: n < 10 ? 2 : 0,
  }).format(n);
}

function daysBetween(a: Date, b: Date) {
  const ms = 24 * 60 * 60 * 1000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / ms);
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function niceNumber(n: number) {
  // 1, 2, 5 scaling
  const exp = Math.floor(Math.log10(Math.max(1e-9, n)));
  const f = n / Math.pow(10, exp);
  const nf = f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10;
  return nf * Math.pow(10, exp);
}

// -----------------------------
// Theme
// -----------------------------

const THEME = {
  bg: "#070A12",
  panel: "rgba(255,255,255,0.06)",
  panel2: "rgba(255,255,255,0.08)",
  stroke: "rgba(255,255,255,0.14)",
  text: "rgba(255,255,255,0.90)",
  muted: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.45)",
  neon1: "#00E5FF",
  neon2: "#9B5CFF",
  neon3: "#FF2E93",
  acid: "#C6FF00",
  ember: "#FFB020",
  danger: "#FF3B30",
};

// -----------------------------
// Main Component
// -----------------------------

type FeeCadence = "weekly" | "fortnight" | "monthly";

type Session = {
  dateISO: string; // YYYY-MM-DD
};

export default function GymCostRealityCheck() {
  // Basic inputs
  const [feeAmount, setFeeAmount] = useState(30);
  const [cadence, setCadence] = useState<FeeCadence>("fortnight");
  const [currency, setCurrency] = useState<
    "NZD" | "USD" | "AUD" | "EUR" | "GBP"
  >("NZD");

  // "Last gym" for MVP
  const today = useMemo(() => startOfDay(new Date()), []);
  const [lastGymISO, setLastGymISO] = useState(() => {
    // default: 14 days ago
    const d = new Date(today);
    d.setDate(d.getDate() - 14);
    return isoDate(d);
  });

  // Session log (for post-MVP / early support)
  const [sessions, setSessions] = useState<Session[]>(() => {
    const seed: Session[] = [];
    // seed with lastGymISO once mounted
    return seed;
  });

  // Keep sessions seeded with lastGymISO once
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    setSessions([{ dateISO: lastGymISO }]);
  }, [lastGymISO]);

  // Derived
  const cadenceDays = useMemo(() => {
    if (cadence === "weekly") return 7;
    if (cadence === "fortnight") return 14;
    return 30.4375; // average month
  }, [cadence]);

  const dailyCost = useMemo(
    () => feeAmount / cadenceDays,
    [feeAmount, cadenceDays]
  );

  const lastGymDate = useMemo(() => {
    const [y, m, d] = lastGymISO.split("-").map(Number);
    return startOfDay(new Date(y, m - 1, d));
  }, [lastGymISO]);

  const daysSinceLast = useMemo(
    () => clamp(daysBetween(lastGymDate, today), 0, 3650),
    [lastGymDate, today]
  );

  const effectiveNextCost = useMemo(() => {
    // "My next workout costs": days since last * daily cost
    // If they went today (0), show dailyCost instead so it doesn’t look broken.
    const base = daysSinceLast === 0 ? 1 : daysSinceLast;
    return base * dailyCost;
  }, [daysSinceLast, dailyCost]);

  // Log-based average cost per session (experimental / post-MVP)
  const avgPerSession = useMemo(() => {
    if (!sessions.length) return null;
    // Assume feeAmount covers cadenceDays period and cost accrues daily.
    // Over a window: from oldest session to today, total cost = days * dailyCost
    const dates = sessions
      .map((s) => {
        const [y, m, d] = s.dateISO.split("-").map(Number);
        return startOfDay(new Date(y, m - 1, d));
      })
      .sort((a, b) => a.getTime() - b.getTime());

    const oldest = dates[0];
    const days = Math.max(1, daysBetween(oldest, today));
    const total = days * dailyCost;
    return total / sessions.length;
  }, [sessions, dailyCost, today]);

  // Proportional scale for visuals
  const ratio = useMemo(
    () => effectiveNextCost / Math.max(1e-6, dailyCost),
    [effectiveNextCost, dailyCost]
  );

  const severity = useMemo(() => {
    // Map ratio to 0..1 with a soft log curve
    const r = Math.max(1, ratio);
    const s = Math.log10(r) / Math.log10(60); // ratio 60 -> 1
    return clamp(s, 0, 1);
  }, [ratio]);

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: effectiveNextCost < 10 ? 2 : 0,
    });
  }, [currency, effectiveNextCost]);

  const fmt = (n: number) => currencyFormatter.format(n);

  // Calendar state (simple, fast MVP-ish)
  const [monthOffset, setMonthOffset] = useState(0);
  const monthAnchor = useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + monthOffset);
    return startOfDay(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [today, monthOffset]);

  const calendar = useMemo(() => buildMonthGrid(monthAnchor), [monthAnchor]);

  const sessionSet = useMemo(
    () => new Set(sessions.map((s) => s.dateISO)),
    [sessions]
  );

  const toggleSession = (dateISO: string) => {
    setSessions((prev) => {
      const exists = prev.some((s) => s.dateISO === dateISO);
      if (exists)
        return prev
          .filter((s) => s.dateISO !== dateISO)
          .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
      return [...prev, { dateISO }].sort((a, b) =>
        a.dateISO.localeCompare(b.dateISO)
      );
    });
  };

  // “Clothesline” markers — proportional based on effective cost since prev session
  const clothesline = useMemo(() => {
    const dates = sessions
      .map((s) => {
        const [y, m, d] = s.dateISO.split("-").map(Number);
        return startOfDay(new Date(y, m - 1, d));
      })
      .sort((a, b) => a.getTime() - b.getTime());

    if (!dates.length) return [] as Array<{ date: Date; cost: number }>;

    // For each session, cost = days since previous session * dailyCost (or dailyCost if first)
    const out: Array<{ date: Date; cost: number }> = [];
    for (let i = 0; i < dates.length; i++) {
      const d = dates[i];
      const prev = dates[i - 1];
      const gap = prev ? Math.max(1, daysBetween(prev, d)) : 1;
      out.push({ date: d, cost: gap * dailyCost });
    }

    return out;
  }, [sessions, dailyCost]);

  const maxClotheslineCost = useMemo(() => {
    const max = clothesline.reduce((m, x) => Math.max(m, x.cost), 0);
    return Math.max(max, effectiveNextCost, dailyCost);
  }, [clothesline, effectiveNextCost, dailyCost]);

  return (
    <div style={styles.page}>
      <BackgroundIdentity severity={severity} />

      <div style={styles.shell}>
        <Header />

        <div style={styles.grid}>
          <section style={styles.cardTall}>
            <div style={styles.cardTopRow}>
              <div>
                <div style={styles.kicker}>Reality Check</div>
                <h2 style={styles.h2}>
                  Your next session cost (if you go today)
                </h2>
              </div>
              <SeverityPill severity={severity} ratio={ratio} />
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
              <BigMeter
                severity={severity}
                dailyCost={dailyCost}
                effective={effectiveNextCost}
                ratio={ratio}
                fmt={fmt}
              />

              <div style={styles.statRow}>
                <Stat
                  label="Daily cost"
                  value={fmt(dailyCost)}
                  hint={`${feeAmount} / ${cadenceLabel(cadence)}`}
                />
                <Stat
                  label="Days since last gym"
                  value={`${daysSinceLast} days`}
                  hint="(counts full days)"
                />
                <Stat
                  label="Effective cost"
                  value={fmt(effectiveNextCost)}
                  hint="(daily × days)"
                />
              </div>

              <div style={styles.divider} />

              <div style={{ display: "grid", gap: 12 }}>
                <div style={styles.subheadRow}>
                  <div style={styles.subheadTitle}>Inputs</div>
                  <div style={styles.subheadHint}>
                    Keep it dead simple. Make it brutally honest.
                  </div>
                </div>

                <div style={styles.inputsGrid}>
                  <Field label="Fee" hint="Amount per cadence">
                    <div style={styles.inline}>
                      <input
                        style={styles.input}
                        type="number"
                        min={0}
                        step={1}
                        value={feeAmount}
                        onChange={(e) =>
                          setFeeAmount(Number(e.target.value || 0))
                        }
                      />
                      <select
                        style={styles.select}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                      >
                        <option value="NZD">NZD</option>
                        <option value="AUD">AUD</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </Field>

                  <Field label="Cadence" hint="How often you’re billed">
                    <select
                      style={styles.selectWide}
                      value={cadence}
                      onChange={(e) => setCadence(e.target.value as any)}
                    >
                      <option value="weekly">Weekly (7d)</option>
                      <option value="fortnight">Fortnight (14d)</option>
                      <option value="monthly">Monthly (~30.4d)</option>
                    </select>
                  </Field>

                  <Field label="Last gym" hint="Last day you went">
                    <input
                      style={styles.inputWide}
                      type="date"
                      value={lastGymISO}
                      onChange={(e) => {
                        const v = e.target.value;
                        setLastGymISO(v);
                        // also keep it in session log as a baseline
                        setSessions((prev) => {
                          const has = prev.some((s) => s.dateISO === v);
                          const next = has ? prev : [...prev, { dateISO: v }];
                          return next.sort((a, b) =>
                            a.dateISO.localeCompare(b.dateISO)
                          );
                        });
                      }}
                    />
                  </Field>

                  <Field label="Quick add" hint="Tap a date below">
                    <div style={styles.microHint}>
                      Use the calendar. It’s faster than forms. (This is your
                      gentle future-proofing.)
                    </div>
                  </Field>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.cardTopRow}>
              <div>
                <div style={styles.kicker}>Log</div>
                <h2 style={styles.h2}>Mark gym days (fast)</h2>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  style={styles.ghostBtn}
                  onClick={() => setMonthOffset((m) => m - 1)}
                >
                  ◀
                </button>
                <div style={styles.monthLabel}>{monthTitle(monthAnchor)}</div>
                <button
                  style={styles.ghostBtn}
                  onClick={() => setMonthOffset((m) => m + 1)}
                >
                  ▶
                </button>
              </div>
            </div>

            <CalendarGrid
              grid={calendar}
              sessionSet={sessionSet}
              onToggle={(dISO) => toggleSession(dISO)}
              todayISO={isoDate(today)}
            />

            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              <div style={styles.divider} />

              <div style={styles.summaryRow}>
                <div>
                  <div style={styles.kicker}>Average (rough)</div>
                  <div style={styles.bigNumber}>
                    {avgPerSession == null ? "—" : fmt(avgPerSession)}
                    <span style={styles.bigUnit}> / session</span>
                  </div>
                  <div style={styles.smallPrint}>
                    Uses oldest logged gym day → today. Good enough for a gut
                    punch, not accounting-grade.
                  </div>
                </div>

                <div style={styles.miniCard}>
                  <div style={styles.miniCardTitle}>Sessions logged</div>
                  <div style={styles.miniCardValue}>{sessions.length}</div>
                  <div style={styles.miniCardHint}>Tap days to add/remove.</div>
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.subheadRow}>
                <div style={styles.subheadTitle}>Clothesline</div>
                <div style={styles.subheadHint}>
                  Each marker = cost of that session since the previous one.
                </div>
              </div>

              <Clothesline
                items={clothesline}
                maxCost={maxClotheslineCost}
                fmt={fmt}
                dailyCost={dailyCost}
              />
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// -----------------------------
// Visual Identity
// -----------------------------

function BackgroundIdentity({ severity }: { severity: number }) {
  // Sharp geometric shards + subtle noise-ish pattern
  const glow = 0.18 + 0.38 * severity;
  const tilt = -18 + severity * 26;

  return (
    <div aria-hidden style={{ ...styles.bg, opacity: 1 }}>
      <div
        style={{
          ...styles.radial,
          opacity: 0.95,
          filter: `blur(${14 + severity * 18}px)`,
        }}
      />
      <div
        style={{
          ...styles.shards,
          transform: `rotate(${tilt}deg)`,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          ...styles.grain,
          opacity: 0.18,
          mixBlendMode: "overlay" as any,
        }}
      />
      <div
        style={{
          ...styles.edgeGlow,
          opacity: glow,
        }}
      />
    </div>
  );
}

function SeverityPill({
  severity,
  ratio,
}: {
  severity: number;
  ratio: number;
}) {
  const label =
    ratio < 3
      ? "OK-ish"
      : ratio < 8
      ? "Slipping"
      : ratio < 18
      ? "Yikes"
      : ratio < 35
      ? "Pain"
      : "Criminal";

  return (
    <div
      style={{
        ...styles.pill,
        borderColor: `rgba(255,255,255,${0.18 + severity * 0.18})`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.4), 0 16px 50px rgba(0,0,0,0.45)`,
      }}
    >
      <span style={{ ...styles.pillDot, background: pillDot(severity) }} />
      <span style={styles.pillText}>{label}</span>
      <span style={styles.pillSub}>{Math.round(ratio)}×</span>
    </div>
  );
}

function pillDot(sev: number) {
  // Interpolate through neon tones
  if (sev < 0.33) return "linear-gradient(135deg, #00E5FF, #9B5CFF)";
  if (sev < 0.66) return "linear-gradient(135deg, #FFB020, #FF2E93)";
  return "linear-gradient(135deg, #FF3B30, #C6FF00)";
}

function BigMeter({
  severity,
  dailyCost,
  effective,
  ratio,
  fmt,
}: {
  severity: number;
  dailyCost: number;
  effective: number;
  ratio: number;
  fmt: (n: number) => string;
}) {
  // visually compare daily vs effective via a "blade" scale
  const cap = Math.max(4, niceNumber(ratio));
  const t = clamp(ratio / cap, 0, 1);

  const bladeH = 250;
  const bladeW = 260;

  const dailyMark = (1 / cap) * bladeH;
  const effMark = t * bladeH;

  return (
    <div style={styles.meterWrap}>
      <div style={styles.meterLeft}>
        <div style={styles.kicker}>Effective</div>
        <div style={styles.heroNumber}>
          {fmt(effective)}
          <span style={styles.heroUnit}> / session</span>
        </div>
        <div style={styles.heroHint}>
          That’s your <span style={styles.emph}>next workout</span> priced by
          time since last.
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <CompareRow label="Daily" value={fmt(dailyCost)} tone="cool" />
          <CompareRow label="Effective" value={fmt(effective)} tone="hot" />
        </div>
      </div>

      <div style={styles.meterRight}>
        <div style={{ ...styles.blade, width: bladeW, height: bladeH }}>
          <div style={styles.bladeGrid} />

          <div
            style={{
              ...styles.bladeFill,
              height: `${effMark}px`,
              background: `linear-gradient(180deg, rgba(255,46,147,0.0), rgba(255,46,147,0.55), rgba(255,59,48,0.9))`,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 30px 60px rgba(255,46,147,${
                0.25 + 0.35 * severity
              })`,
            }}
          />

          {/* Daily marker */}
          <div
            style={{
              ...styles.tick,
              bottom: `${dailyMark}px`,
              opacity: 0.85,
            }}
          >
            <div style={styles.tickLine} />
            <div style={styles.tickLabel}>Daily ({fmt(dailyCost)})</div>
          </div>

          {/* Effective marker */}
          <div
            style={{
              ...styles.tick,
              bottom: `${effMark}px`,
              opacity: 1,
            }}
          >
            <div
              style={{ ...styles.tickLine, background: "rgba(198,255,0,0.9)" }}
            />
            <div
              style={{ ...styles.tickLabel, color: "rgba(255,255,255,0.92)" }}
            >
              Effective ({fmt(effective)})
            </div>
          </div>

          <div style={styles.bladeCap}>Scale cap: {cap}×</div>
        </div>

        <div style={styles.ratioChip}>
          <div style={styles.ratioChipTitle}>This is</div>
          <div style={styles.ratioChipValue}>
            {Math.round(ratio)}×
            <span style={styles.ratioChipSub}> your daily cost</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cool" | "hot";
}) {
  return (
    <div style={styles.compareRow}>
      <div style={styles.compareLabel}>{label}</div>
      <div
        style={{
          ...styles.compareValue,
          color:
            tone === "cool" ? "rgba(0,229,255,0.95)" : "rgba(255,46,147,0.98)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

// -----------------------------
// Calendar + Clothesline
// -----------------------------

type MonthGrid = {
  monthStart: Date;
  weeks: Array<Array<{ date: Date; inMonth: boolean }>>;
};

function buildMonthGrid(monthStart: Date): MonthGrid {
  const start = startOfDay(
    new Date(monthStart.getFullYear(), monthStart.getMonth(), 1)
  );
  const end = startOfDay(
    new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
  );

  const startDow = (start.getDay() + 6) % 7; // Monday=0
  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - startDow);

  const weeks: MonthGrid["weeks"] = [];
  let cur = new Date(gridStart);

  while (weeks.length < 6) {
    const week: Array<{ date: Date; inMonth: boolean }> = [];
    for (let i = 0; i < 7; i++) {
      const d = startOfDay(new Date(cur));
      const inMonth = d.getMonth() === start.getMonth();
      week.push({ date: d, inMonth });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);

    const last = week[6].date;
    if (last > end && weeks.length >= 5) break;
  }

  return { monthStart: start, weeks };
}

function monthTitle(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function CalendarGrid({
  grid,
  sessionSet,
  onToggle,
  todayISO,
}: {
  grid: MonthGrid;
  sessionSet: Set<string>;
  onToggle: (dateISO: string) => void;
  todayISO: string;
}) {
  const dows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ marginTop: 14 }}>
      <div style={styles.dowRow}>
        {dows.map((x) => (
          <div key={x} style={styles.dowCell}>
            {x}
          </div>
        ))}
      </div>

      <div style={styles.calGrid}>
        {grid.weeks.flatMap((week, wi) =>
          week.map((cell, di) => {
            const id = isoDate(cell.date);
            const on = sessionSet.has(id);
            const isToday = id === todayISO;

            return (
              <button
                key={`${wi}-${di}`}
                onClick={() => onToggle(id)}
                style={{
                  ...styles.day,
                  opacity: cell.inMonth ? 1 : 0.42,
                  borderColor: on
                    ? "rgba(198,255,0,0.55)"
                    : "rgba(255,255,255,0.12)",
                  boxShadow: on
                    ? "0 0 0 1px rgba(198,255,0,0.18), 0 18px 45px rgba(198,255,0,0.10)"
                    : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={styles.dayNum}>{cell.date.getDate()}</div>
                  {isToday ? <span style={styles.todayDot} /> : null}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      ...styles.dayChip,
                      background: on
                        ? "linear-gradient(135deg, rgba(198,255,0,0.22), rgba(0,229,255,0.10))"
                        : "rgba(255,255,255,0.06)",
                      borderColor: on
                        ? "rgba(198,255,0,0.34)"
                        : "rgba(255,255,255,0.10)",
                    }}
                  >
                    {on ? "Gym" : "—"}
                  </span>
                </div>

                {/* corner shard */}
                <div
                  aria-hidden
                  style={{
                    ...styles.cornerShard,
                    opacity: on ? 0.95 : 0.4,
                  }}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function Clothesline({
  items,
  maxCost,
  fmt,
  dailyCost,
}: {
  items: Array<{ date: Date; cost: number }>;
  maxCost: number;
  fmt: (n: number) => string;
  dailyCost: number;
}) {
  const safeMax = Math.max(1e-6, maxCost);

  return (
    <div style={styles.clotheslineWrap}>
      <div style={styles.line} />

      <div style={styles.hangers}>
        {items.length === 0 ? (
          <div style={styles.emptyLine}>No sessions yet. Tap dates above.</div>
        ) : (
          items.map((it) => {
            const t = clamp(it.cost / safeMax, 0, 1);
            const size = 12 + t * 48;
            const rot = -10 + t * 22;
            const hue =
              t < 0.33
                ? "rgba(0,229,255,0.95)"
                : t < 0.66
                ? "rgba(255,176,32,0.95)"
                : "rgba(255,46,147,0.98)";

            return (
              <div key={it.date.toISOString()} style={styles.hanger}>
                <div style={styles.string} />
                <div
                  style={{
                    ...styles.tag,
                    width: size,
                    height: size,
                    transform: `rotate(${rot}deg)`,
                    borderColor: "rgba(255,255,255,0.18)",
                    boxShadow: `0 10px 32px rgba(0,0,0,0.55), 0 0 42px ${hue.replace(
                      ")",
                      ",0.22)"
                    )}`,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                  }}
                >
                  <div style={{ ...styles.tagInner, outlineColor: hue }} />
                </div>
                <div style={styles.tagMeta}>
                  <div style={styles.tagDate}>
                    {it.date.toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div style={styles.tagCost}>{fmt(it.cost)}</div>
                  <div style={styles.tagHint}>
                    {Math.max(1, Math.round(it.cost / dailyCost))}d gap
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// -----------------------------
// UI bits
// -----------------------------

function Header() {
  return (
    <div style={styles.header}>
      <div style={styles.brandMark} aria-hidden>
        <div style={styles.brandRing} />
        <div style={styles.brandShard} />
      </div>
      <div>
        <div style={styles.title}>Gym Cost Reality Check</div>
        <div style={styles.subtitle}>
          Turn procrastination into a number that hurts.
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={styles.footer}>
      <div style={styles.footerHint}>
        Tip: make this your browser new tab for a week. Don’t negotiate with it.
      </div>
      <div style={styles.footerTiny}>
        v0 — visual MVP + quick calendar + clothesline
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {hint ? <div style={styles.statHint}>{hint}</div> : null}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.field}>
      <div style={styles.fieldTop}>
        <div style={styles.fieldLabel}>{label}</div>
        {hint ? <div style={styles.fieldHint}>{hint}</div> : null}
      </div>
      {children}
    </div>
  );
}

function cadenceLabel(c: FeeCadence) {
  if (c === "weekly") return "week";
  if (c === "fortnight") return "fortnight";
  return "month";
}

// -----------------------------
// Styles (no Tailwind required)
// -----------------------------

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: THEME.bg,
    color: THEME.text,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  radial: {
    position: "absolute",
    inset: "-20%",
    background:
      "radial-gradient(60% 50% at 20% 10%, rgba(0,229,255,0.22), rgba(0,229,255,0) 55%), radial-gradient(55% 45% at 80% 20%, rgba(155,92,255,0.18), rgba(155,92,255,0) 58%), radial-gradient(60% 55% at 55% 90%, rgba(255,46,147,0.18), rgba(255,46,147,0) 60%)",
  },
  shards: {
    position: "absolute",
    inset: "-10%",
    background:
      "conic-gradient(from 160deg at 30% 40%, rgba(198,255,0,0.0), rgba(198,255,0,0.16), rgba(255,46,147,0.0), rgba(0,229,255,0.14), rgba(155,92,255,0.0), rgba(255,176,32,0.12), rgba(198,255,0,0.0))",
    maskImage:
      "radial-gradient(75% 60% at 35% 40%, #000 45%, transparent 72%), radial-gradient(75% 60% at 70% 70%, #000 40%, transparent 70%)",
    WebkitMaskImage:
      "radial-gradient(75% 60% at 35% 40%, #000 45%, transparent 72%), radial-gradient(75% 60% at 70% 70%, #000 40%, transparent 70%)",
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)' opacity='0.25'/></svg>")`,
    backgroundSize: "240px 240px",
  },
  ow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(1200px 480px at 50% 0%, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%), radial-gradient(900px 520px at 100% 50%, rgba(0,229,255,0.10), rgba(0,229,255,0) 62%), radial-gradient(900px 520px at 0% 60%, rgba(255,46,147,0.08), rgba(255,46,147,0) 62%)",
  },

  shell: {
    position: "relative",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "28px 18px 40px",
  },
  header: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${THEME.stroke}`,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 18px 55px rgba(0,0,0,0.45)",
  },
  brandRing: {
    position: "absolute",
    inset: 8,
    borderRadius: 999,
    border: "1.5px solid rgba(0,229,255,0.45)",
    boxShadow: "0 0 30px rgba(0,229,255,0.20)",
  },
  brandShard: {
    position: "absolute",
    width: 28,
    height: 28,
    right: -10,
    bottom: -10,
    background:
      "linear-gradient(135deg, rgba(255,46,147,0.85), rgba(155,92,255,0.65))",
    transform: "rotate(18deg)",
    clipPath: "polygon(15% 0%, 100% 20%, 72% 100%, 0% 80%)",
  },
  title: {
    fontSize: 18,
    letterSpacing: "0.2px",
    fontWeight: 700,
    lineHeight: 1.1,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: THEME.muted,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 14,
  },

  cardTall: {
    borderRadius: 22,
    padding: 18,
    border: `1px solid ${THEME.stroke}`,
    background: `linear-gradient(180deg, ${THEME.panel}, rgba(255,255,255,0.04))`,
    boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    borderRadius: 22,
    padding: 18,
    border: `1px solid ${THEME.stroke}`,
    background: `linear-gradient(180deg, ${THEME.panel2}, rgba(255,255,255,0.04))`,
    boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
    position: "relative",
    overflow: "hidden",
  },

  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  kicker: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: THEME.faint,
  },
  h2: {
    margin: "6px 0 0",
    fontSize: 16,
    fontWeight: 720,
    letterSpacing: "0.1px",
  },

  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    borderRadius: 999,
    border: `1px solid ${THEME.stroke}`,
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  pillDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 13,
    fontWeight: 650,
  },
  pillSub: {
    fontSize: 12,
    color: THEME.muted,
    marginLeft: 2,
  },

  meterWrap: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 16,
    alignItems: "stretch",
  },
  meterLeft: {
    paddingRight: 6,
  },
  meterRight: {
    display: "grid",
    justifyContent: "end",
    gap: 10,
  },
  heroNumber: {
    marginTop: 10,
    fontSize: 44,
    lineHeight: 1.0,
    fontWeight: 820,
    letterSpacing: "-0.02em",
  },
  heroUnit: {
    fontSize: 14,
    color: THEME.muted,
    fontWeight: 600,
    marginLeft: 8,
    letterSpacing: "0.02em",
  },
  heroHint: {
    marginTop: 10,
    fontSize: 14,
    color: THEME.muted,
    lineHeight: 1.35,
  },
  emph: {
    color: "rgba(255,255,255,0.92)",
    fontWeight: 700,
  },

  compareRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "10px 12px",
    borderRadius: 14,
    border: `1px solid rgba(255,255,255,0.10)`,
    background: "rgba(0,0,0,0.18)",
  },
  compareLabel: {
    fontSize: 12,
    color: THEME.muted,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  compareValue: {
    fontSize: 15,
    fontWeight: 750,
  },

  blade: {
    borderRadius: 18,
    border: `1px solid rgba(255,255,255,0.14)`,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 28px 90px rgba(0,0,0,0.55)",
  },
  bladeGrid: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 100% 22px, linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 26px 100%",
    opacity: 0.45,
  },
  bladeFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: "polygon(0% 100%, 100% 100%, 100% 12%, 62% 0%, 0% 18%)",
  },
  tick: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 10px",
  },
  tickLine: {
    width: 18,
    height: 2,
    background: "rgba(0,229,255,0.9)",
    borderRadius: 999,
  },
  tickLabel: {
    fontSize: 12,
    color: THEME.muted,
    whiteSpace: "nowrap",
  },
  bladeCap: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 11,
    color: THEME.faint,
    padding: "6px 8px",
    borderRadius: 999,
    border: `1px solid rgba(255,255,255,0.12)`,
    background: "rgba(0,0,0,0.18)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  ratioChip: {
    borderRadius: 18,
    border: `1px solid rgba(255,255,255,0.14)`,
    background: "rgba(0,0,0,0.22)",
    padding: "10px 12px",
  },
  ratioChipTitle: {
    fontSize: 11,
    color: THEME.faint,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  ratioChipValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: 820,
    letterSpacing: "-0.01em",
  },
  ratioChipSub: {
    fontSize: 12,
    color: THEME.muted,
    fontWeight: 650,
    marginLeft: 6,
  },

  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  stat: {
    borderRadius: 18,
    border: `1px solid rgba(255,255,255,0.10)`,
    background: "rgba(0,0,0,0.16)",
    padding: "12px 12px",
  },
  statLabel: {
    fontSize: 11,
    color: THEME.faint,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 760,
  },
  statHint: {
    marginTop: 4,
    fontSize: 12,
    color: THEME.muted,
  },

  divider: {
    height: 1,
    background: "rgba(255,255,255,0.10)",
    margin: "6px 0",
  },

  subheadRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
  },
  subheadTitle: {
    fontSize: 13,
    fontWeight: 750,
    letterSpacing: "0.02em",
  },
  subheadHint: {
    fontSize: 12,
    color: THEME.muted,
  },

  inputsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  field: {
    borderRadius: 18,
    border: `1px solid rgba(255,255,255,0.10)`,
    background: "rgba(0,0,0,0.16)",
    padding: 12,
  },
  fieldTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "baseline",
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 700,
  },
  fieldHint: {
    fontSize: 11,
    color: THEME.faint,
  },

  input: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    padding: "10px 12px",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    fontSize: 14,
  },
  inputWide: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    padding: "10px 12px",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    fontSize: 14,
  },
  select: {
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    padding: "10px 12px",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    fontSize: 14,
  },
  selectWide: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    padding: "10px 12px",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
    fontSize: 14,
  },
  inline: {
    display: "grid",
    gridTemplateColumns: "1fr 92px",
    gap: 10,
  },
  microHint: {
    fontSize: 13,
    color: THEME.muted,
    lineHeight: 1.35,
  },

  dowRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    marginBottom: 8,
  },
  dowCell: {
    fontSize: 11,
    color: THEME.faint,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textAlign: "center",
  },
  calGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
  },
  day: {
    textAlign: "left",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.18)",
    padding: 10,
    minHeight: 64,
    cursor: "pointer",
    position: "relative",
    transition:
      "transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease",
  },
  dayNum: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(255,255,255,0.88)",
  },
  dayChip: {
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.72)",
  },
  cornerShard: {
    position: "absolute",
    right: -6,
    top: -6,
    width: 22,
    height: 22,
    background:
      "linear-gradient(135deg, rgba(0,229,255,0.9), rgba(255,46,147,0.85))",
    clipPath: "polygon(30% 0%, 100% 0%, 100% 70%, 60% 100%, 0% 50%)",
    filter: "blur(0.2px)",
  },
  todayDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "rgba(198,255,0,0.95)",
    boxShadow: "0 0 18px rgba(198,255,0,0.35)",
  },

  monthLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    fontWeight: 650,
  },
  ghostBtn: {
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.86)",
    padding: "8px 10px",
    cursor: "pointer",
  },

  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 190px",
    gap: 12,
    alignItems: "start",
  },
  bigNumber: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: 820,
    letterSpacing: "-0.02em",
  },
  bigUnit: {
    fontSize: 12,
    color: THEME.muted,
    fontWeight: 650,
    marginLeft: 6,
    letterSpacing: "0.02em",
  },
  smallPrint: {
    marginTop: 8,
    fontSize: 12,
    color: THEME.muted,
    lineHeight: 1.35,
  },

  miniCard: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.18)",
    padding: 12,
  },
  miniCardTitle: {
    fontSize: 11,
    color: THEME.faint,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  miniCardValue: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 840,
  },
  miniCardHint: {
    marginTop: 6,
    fontSize: 12,
    color: THEME.muted,
  },

  clotheslineWrap: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.16)",
    padding: 14,
    position: "relative",
    overflow: "hidden",
  },
  line: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 26,
    height: 2,
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(255,255,255,0.22), rgba(255,255,255,0.10))",
    borderRadius: 999,
  },
  hangers: {
    marginTop: 12,
    display: "flex",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 6,
  },
  emptyLine: {
    fontSize: 13,
    color: THEME.muted,
    padding: "12px 8px",
  },
  hanger: {
    position: "relative",
    minWidth: 120,
    display: "grid",
    justifyItems: "center",
    gap: 10,
    paddingTop: 8,
  },
  string: {
    width: 2,
    height: 18,
    background: "rgba(255,255,255,0.18)",
    borderRadius: 999,
  },
  tag: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  tagInner: {
    width: "70%",
    height: "70%",
    borderRadius: 14,
    outline: "2px solid rgba(0,229,255,0.0)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
    clipPath: "polygon(10% 0%, 100% 18%, 86% 100%, 0% 82%)",
  },
  tagMeta: {
    textAlign: "center",
    lineHeight: 1.15,
  },
  tagDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.78)",
    fontWeight: 700,
  },
  tagCost: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 820,
  },
  tagHint: {
    marginTop: 4,
    fontSize: 11,
    color: THEME.muted,
  },

  footer: {
    marginTop: 14,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "baseline",
    padding: "10px 2px 0",
    color: THEME.muted,
  },
  footerHint: {
    fontSize: 12,
  },
  footerTiny: {
    fontSize: 11,
    color: THEME.faint,
  },
};

// Responsive tweaks
const media =
  typeof window !== "undefined"
    ? window.matchMedia("(max-width: 980px)")
    : null;
if (media?.matches) {
  // This runs only on first import; fine for a demo.
  styles.grid.gridTemplateColumns = "1fr";
  styles.meterWrap.gridTemplateColumns = "1fr";
  styles.meterRight.justifyContent = "start";
  styles.summaryRow.gridTemplateColumns = "1fr";
}
