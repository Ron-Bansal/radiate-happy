"use client";

import { useEffect, useMemo, useState } from "react";

const BG_STYLE =
  "radial-gradient(circle at 0% 0%, rgba(214,235,59,0.03), transparent 45%), #050505";

const COLORS = {
  bg: "#050505",
  surface: "#101111",
  surfaceMuted: "rgba(10,11,11,0.45)",
  ink: "#f1f3e8",
  muted: "rgba(241,243,232,0.55)",
  accent: "#d6eb3b",
  cardRadius: "26px",
  scrollTrack: "rgba(241,243,232,0.03)",
  scrollThumb: "rgba(214,235,59,0.35)",
};

const MS_DAY = 86400000;

function safeLoad(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function safeSave(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function calcCycleFromOffset(today, offset) {
  const year = today.getFullYear();
  const qIndex = Math.floor(today.getMonth() / 3);
  const baseQStart = qIndex * 3;
  const startMonth = baseQStart + offset * 3;
  const start = new Date(year, startMonth, 1);
  const end = new Date(year, startMonth + 3, 0);
  const title = `${start.toLocaleString("en-US", {
    month: "short",
  })} - ${end.toLocaleString("en-US", {
    month: "short",
  })} ${end.getFullYear()}`;
  return { start, end, title, qIndex, year };
}

function progressForRange(today, start, end) {
  if (!start || !end) return 0;
  if (today < start) return 0;
  if (today > end) return 100;
  const totalDays = Math.floor((end - start) / MS_DAY) + 1;
  const passed = Math.floor((today - start) / MS_DAY) + 1;
  return Math.round((passed / totalDays) * 100);
}

function loadList(type, id) {
  return safeLoad(`12w_${type}_${id}`, []);
}

function saveList(type, id, arr) {
  safeSave(`12w_${type}_${id}`, arr);
}

/* =========================
   FEED CARD (single cycle)
   ========================= */
function FeedCycleCard({ cycle, today, currentShow, bump }) {
  const [mode, setMode] = useState("win"); // 'win' | 'goal'
  const [input, setInput] = useState("");

  // re-load from localStorage each render (since we bump version on write)
  const wins = loadList("brag", cycle.id);
  const goals = loadList("goals", cycle.id);
  const pct = progressForRange(today, cycle.start, cycle.end);
  const isFuture = cycle.start && today < cycle.start;

  const handleAdd = () => {
    const val = input.trim();
    if (!val) return;
    const payload = {
      title: val,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    if (mode === "goal") {
      const arr = loadList("goals", cycle.id);
      arr.unshift(payload);
      saveList("goals", cycle.id, arr);
    } else {
      const arr = loadList("brag", cycle.id);
      arr.unshift(payload);
      saveList("brag", cycle.id, arr);
    }
    setInput("");
    bump();
  };

  const handleEdit = (type, idx) => {
    const arr = loadList(type === "brag" ? "brag" : "goals", cycle.id);
    const current = arr[idx];
    const next = window.prompt(
      `Edit ${type === "brag" ? "win" : "goal"}`,
      current?.title || ""
    );
    if (next !== null && next.trim()) {
      arr[idx].title = next.trim();
      saveList(type === "brag" ? "brag" : "goals", cycle.id, arr);
      bump();
    }
  };

  const handleDelete = (type, idx) => {
    const arr = loadList(type === "brag" ? "brag" : "goals", cycle.id);
    arr.splice(idx, 1);
    saveList(type === "brag" ? "brag" : "goals", cycle.id, arr);
    bump();
  };

  return (
    <article
      className={[
        "relative flex min-w-[300px] max-w-[360px] flex-col gap-2.5 rounded-[26px] bg-[#101111] p-4 shadow-[0_22px_50px_rgba(0,0,0,0.25)] scroll-mr-4 scroll-snap-align-start",
        cycle.current && "shadow-[0_26px_58px_rgba(214,235,59,0.08)]",
        isFuture &&
          "bg-[rgba(10,11,11,0.28)] border border-[rgba(214,235,59,0.01)]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: `radial-gradient(circle at 0% 0%, rgba(214,235,59,0.045), rgba(16,17,17,0)), ${
          isFuture ? "rgba(10,11,11,0.28)" : "#101111"
        }`,
        border: "1px solid rgba(214,235,59,0.035)",
      }}
      data-cycle-id={cycle.id}
    >
      {cycle.current ? (
        <div className="absolute right-2 top-2 rounded-full border border-[rgba(214,235,59,0.45)] bg-[rgba(214,235,59,0.16)] px-2 py-0.5 text-[0.55rem] text-white">
          current cycle
        </div>
      ) : null}
      <div>
        <div className="text-[0.62rem] text-white/45">{cycle.label}</div>
        <h2 className="text-[1.02rem] font-semibold tracking-[0.03em] text-[#f1f3e8]">
          {cycle.range}
        </h2>
      </div>
      <div
        className="h-[3px] w-full overflow-hidden rounded-full bg-[rgba(241,243,232,0.028)]"
        data-progress-shell
      >
        <div
          className="h-full bg-[rgba(214,235,59,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* add row */}
      <div className="flex min-h-[30px] items-center gap-1 rounded-[10px] bg-black/5 px-1.5 py-1">
        <div className="flex overflow-hidden rounded-full border border-[rgba(214,235,59,0.04)] bg-black/25">
          <button
            onClick={() => setMode("win")}
            className={`px-2 py-0.5 text-[0.56rem] ${
              mode === "win"
                ? "bg-[rgba(214,235,59,0.65)] text-black"
                : "text-white/50"
            }`}
          >
            Win
          </button>
          <button
            onClick={() => setMode("goal")}
            className={`px-2 py-0.5 text-[0.56rem] ${
              mode === "goal"
                ? "bg-[rgba(214,235,59,0.65)] text-black"
                : "text-white/50"
            }`}
          >
            Goal
          </button>
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="Capture something for this cycle…"
          className="flex-1 bg-transparent text-[0.58rem] text-white outline-none placeholder:text-white/25"
        />
        <button
          onClick={handleAdd}
          className="rounded-full border border-[rgba(214,235,59,0.4)] bg-[rgba(214,235,59,0.25)] px-2.5 py-1 text-[0.55rem] text-black"
        >
          Add
        </button>
      </div>

      {(currentShow === "both" || currentShow === "wins") && (
        <>
          <div className="flex items-center justify-between gap-2 text-[0.6rem] font-semibold text-white/90">
            <span>Wins</span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[0.5rem] text-white/70">
              {wins.length}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {wins.length ? (
              wins.map((w, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between gap-2 rounded-md border border-[rgba(214,235,59,0.01)] bg-black/10 px-1.5 py-1 text-[0.6rem]"
                >
                  <div className="flex-1">{w.title}</div>
                  <div className="hidden gap-1 group-hover:flex">
                    <button
                      onClick={() => handleEdit("brag", idx)}
                      className="rounded border border-white/10 px-1 text-[0.5rem] text-white/80 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete("brag", idx)}
                      className="rounded border border-white/10 px-1 text-[0.5rem] text-white/80 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-[0.55rem] text-white/35">
                No wins captured.
              </div>
            )}
          </div>
        </>
      )}

      {(currentShow === "both" || currentShow === "goals") && (
        <>
          <div className="mt-1 flex items-center justify-between gap-2 text-[0.6rem] font-semibold text-white/90">
            <span>Goals</span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[0.5rem] text-white/70">
              {goals.length}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {goals.length ? (
              goals.map((g, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between gap-2 rounded-md border border-[rgba(214,235,59,0.01)] bg-black/10 px-1.5 py-1 text-[0.6rem]"
                >
                  <div className="flex-1">{g.title}</div>
                  <div className="hidden gap-1 group-hover:flex">
                    <button
                      onClick={() => handleEdit("goals", idx)}
                      className="rounded border border-white/10 px-1 text-[0.5rem] text-white/80 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete("goals", idx)}
                      className="rounded border border-white/10 px-1 text-[0.5rem] text-white/80 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-[0.55rem] text-white/35">No goals set.</div>
            )}
          </div>
        </>
      )}
    </article>
  );
}

/* =========================
   FEED SHELL
   ========================= */
function FeedShell({ bumpVersion }) {
  const [today] = useState(() => new Date());
  const [currentSort, setCurrentSort] = useState("asc"); // 'asc' | 'desc'
  const [currentGroup, setCurrentGroup] = useState("cycle"); // 'cycle' | 'year'
  const [currentShow, setCurrentShow] = useState("both"); // 'both' | 'wins' | 'goals'
  const [lsVersion, setLsVersion] = useState(0);

  // helper to trigger re-render when localStorage changes in this section
  const bump = () => {
    setLsVersion((v) => v + 1);
    bumpVersion(); // also tell parent so overview sees it
  };

  const dataset = useMemo(() => {
    // rebuild base cycles
    const month = today.getMonth();
    const year = today.getFullYear();
    const qIndex = Math.floor(month / 3);
    const baseQStart = qIndex * 3;
    const offsets = [-2, -1, 0, 1, 2, 3];
    const baseCycles = offsets.map((off) => {
      const { start, end, title } = calcCycleFromOffset(today, off);
      return {
        id:
          off === -2
            ? "p2"
            : off === -1
            ? "prev"
            : off === 0
            ? "current"
            : off === 1
            ? "next"
            : `f${off}`,
        label: "Cycle " + (qIndex + 1 + off),
        range: title,
        start,
        end,
        current: off === 0,
      };
    });

    // bring in any localStorage-only cycles
    if (typeof window !== "undefined") {
      const ids = new Set();
      for (const key in window.localStorage) {
        if (!Object.prototype.hasOwnProperty.call(window.localStorage, key))
          continue;
        if (key.startsWith("12w_goals_") || key.startsWith("12w_brag_")) {
          const id = key.split("_")[2];
          if (id) ids.add(id);
        }
      }
      ids.forEach((id) => {
        if (!baseCycles.find((c) => c.id === id)) {
          const fakeStart = new Date(year, 0, 1);
          const fakeEnd = new Date(year, 2, 31);
          baseCycles.push({
            id,
            label: "Cycle " + id,
            range: `Jan - Mar ${year}`,
            start: fakeStart,
            end: fakeEnd,
            current: false,
          });
        }
      });
    }
    return baseCycles;
  }, [today, lsVersion]);

  const feedContent = useMemo(() => {
    if (currentGroup === "year") {
      // group by year
      const map = {};
      dataset.forEach((c) => {
        const y = c.start ? c.start.getFullYear() : today.getFullYear();
        if (!map[y]) map[y] = { year: y, wins: [], goals: [], cards: [] };
        const wins = loadList("brag", c.id);
        const goals = loadList("goals", c.id);
        map[y].wins = map[y].wins.concat(
          wins.map((w) => ({ ...w, _cycle: c.id }))
        );
        map[y].goals = map[y].goals.concat(
          goals.map((g) => ({ ...g, _cycle: c.id }))
        );
        map[y].cards.push(c);
      });
      const arr = Object.values(map).sort((a, b) =>
        currentSort === "desc" ? b.year - a.year : a.year - b.year
      );
      return { mode: "year", data: arr };
    }
    // cycle view
    const arr = dataset
      .map((c) => ({
        ...c,
        wins: loadList("brag", c.id),
        goals: loadList("goals", c.id),
      }))
      .sort((a, b) => {
        if (currentSort === "desc") {
          return b.start ? b.start - a.start : 0;
        }
        return a.start ? a.start - b.start : 0;
      });
    return { mode: "cycle", data: arr };
  }, [dataset, currentGroup, currentSort, lsVersion, today]);

  return (
    <div className="feed-shell pb-3">
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4 text-[0.66rem] tracking-[0.04em] text-[rgba(241,243,232,0.55)]">
        <div className="text-[0.7rem] font-medium text-[#d6eb3b]">
          DESA12 .FEED
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-full border border-[rgba(214,235,59,0.01)] bg-black/25 px-3 py-1">
          {/* Sort */}
          <div className="flex items-center gap-1">
            <small className="text-[0.58rem] opacity-65">Sort</small>
            <button
              onClick={() => setCurrentSort("desc")}
              className={`rounded-full border px-1.5 py-0.5 text-[0.58rem] ${
                currentSort === "desc"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              ↑
            </button>
            <button
              onClick={() => setCurrentSort("asc")}
              className={`rounded-full border px-1.5 py-0.5 text-[0.58rem] ${
                currentSort === "asc"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              ↓
            </button>
          </div>
          <div className="h-[14px] w-[1px] bg-white/5" />
          {/* Group */}
          <div className="flex items-center gap-1">
            <small className="text-[0.58rem] opacity-65">Group</small>
            <button
              onClick={() => setCurrentGroup("cycle")}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                currentGroup === "cycle"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              Cycle
            </button>
            <button
              onClick={() => setCurrentGroup("year")}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                currentGroup === "year"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              Year
            </button>
          </div>
          <div className="h-[14px] w-[1px] bg-white/5" />
          {/* Show */}
          <div className="flex items-center gap-1">
            <small className="text-[0.58rem] opacity-65">Show</small>
            <button
              onClick={() => setCurrentShow("both")}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                currentShow === "both"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setCurrentShow("wins")}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                currentShow === "wins"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              Wins
            </button>
            <button
              onClick={() => setCurrentShow("goals")}
              className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                currentShow === "goals"
                  ? "border-[rgba(214,235,59,0.3)] bg-[rgba(214,235,59,0.18)] text-white"
                  : "border-[rgba(214,235,59,0.05)] text-white/60"
              }`}
            >
              Goals
            </button>
          </div>
        </div>
      </header>
      <section className="feed-main px-5 pt-3">
        <div className="mb-1 flex items-center justify-between text-[0.57rem] text-white/30">
          <span>
            Add above, stays same height. Edit/delete are inline. Year view
            aggregates.
          </span>
          <span className="text-white/50">
            {feedContent.mode === "year"
              ? `${feedContent.data.length} year blocks`
              : `${feedContent.data.length} cycles shown`}
          </span>
        </div>
        <div
          className="cycle-rail flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          {feedContent.mode === "year"
            ? feedContent.data.map((blk) => {
                const yStart = new Date(blk.year, 0, 1);
                const yEnd = new Date(blk.year, 11, 31);
                const pct = progressForRange(today, yStart, yEnd);
                const isFuture = yStart > today;
                return (
                  <article
                    key={blk.year}
                    className={[
                      "flex min-w-[300px] max-w-[360px] flex-col gap-2.5 rounded-[26px] p-4 shadow-[0_22px_50px_rgba(0,0,0,0.25)]",
                      isFuture &&
                        "bg-[rgba(10,11,11,0.28)] border border-[rgba(214,235,59,0.01)]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, rgba(214,235,59,0.045), rgba(16,17,17,0)), #101111",
                      border: "1px solid rgba(214,235,59,0.035)",
                    }}
                    data-year={blk.year}
                  >
                    <div>
                      <div className="text-[0.62rem] text-white/45">
                        Year {blk.year}
                      </div>
                      <h2 className="text-[1.02rem] font-semibold tracking-[0.03em] text-[#f1f3e8]">
                        {blk.year}
                      </h2>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-[rgba(241,243,232,0.028)]">
                      <div
                        className="h-full bg-[rgba(214,235,59,1)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {(currentShow === "both" || currentShow === "wins") && (
                      <>
                        <div className="flex items-center justify-between text-[0.6rem] text-white/80">
                          <span>Wins</span>
                          <span className="rounded-full bg-black/20 px-2 py-0.5 text-[0.5rem] text-white/70">
                            {blk.wins.length}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {blk.wins.length ? (
                            blk.wins.map((w, i) => (
                              <div
                                key={i}
                                className="rounded-md bg-black/10 px-1.5 py-1 text-[0.6rem]"
                              >
                                {w.title}
                              </div>
                            ))
                          ) : (
                            <div className="text-[0.55rem] text-white/35">
                              No wins recorded.
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {(currentShow === "both" || currentShow === "goals") && (
                      <>
                        <div className="flex items-center justify-between text-[0.6rem] text-white/80">
                          <span>Goals</span>
                          <span className="rounded-full bg-black/20 px-2 py-0.5 text-[0.5rem] text-white/70">
                            {blk.goals.length}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {blk.goals.length ? (
                            blk.goals.map((g, i) => (
                              <div
                                key={i}
                                className="rounded-md bg-black/10 px-1.5 py-1 text-[0.6rem]"
                              >
                                {g.title}
                              </div>
                            ))
                          ) : (
                            <div className="text-[0.55rem] text-white/35">
                              No goals recorded.
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </article>
                );
              })
            : feedContent.data.map((c) => (
                <FeedCycleCard
                  key={c.id}
                  cycle={c}
                  today={today}
                  currentShow={currentShow}
                  bump={bump}
                />
              ))}
        </div>
      </section>
    </div>
  );
}

/* =========================
   CYCLES OVERVIEW (2ND APP)
   ========================= */
function CyclesOverview({ globalBump }) {
  const [today] = useState(() => new Date());
  const [activeCycleId, setActiveCycleId] = useState("current");
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    range: "",
    extra: "",
  });
  const [lsVersion, setLsVersion] = useState(0);

  // build three cycles: prev, current, next (just like original)
  const baseCycles = useMemo(() => {
    const month = today.getMonth();
    const year = today.getFullYear();
    const quarterIndex = Math.floor(month / 3);
    const qStartMonth = quarterIndex * 3;
    function buildCycle(offset) {
      const startMonth = qStartMonth + offset * 3;
      const start = new Date(year, startMonth, 1);
      const end = new Date(year, startMonth + 3, 0);
      return {
        id: offset === -1 ? "prev" : offset === 0 ? "current" : "next",
        start,
        end,
        label: `Cycle ${quarterIndex + 1 + offset} • ${start.getFullYear()}`,
        range: `${start.toLocaleString("en-US", {
          month: "short",
        })} ${start.getFullYear()} – ${end.toLocaleString("en-US", {
          month: "short",
        })} ${end.getFullYear()}`,
      };
    }
    return [buildCycle(-1), buildCycle(0), buildCycle(1)];
  }, [today]);

  const activeCycle =
    baseCycles.find((c) => c.id === activeCycleId) || baseCycles[1];

  const TOTAL_WEEKS = 12;
  const DAYS_PER_WEEK = 7;

  const handleGoalEnter = (val) => {
    if (!val.trim()) return;
    const arr = loadList("goals", activeCycleId);
    arr.unshift({
      title: val.trim(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
    saveList("goals", activeCycleId, arr);
    setLsVersion((v) => v + 1);
    globalBump();
  };

  const handleBragEnter = (val) => {
    if (!val.trim()) return;
    const arr = loadList("brag", activeCycleId);
    arr.unshift({
      title: val.trim(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
    saveList("brag", activeCycleId, arr);
    setLsVersion((v) => v + 1);
    globalBump();
  };

  const goals = loadList("goals", activeCycleId);
  const brags = loadList("brag", activeCycleId);

  const totalDaysCal =
    Math.floor((activeCycle.end - activeCycle.start) / MS_DAY) + 1;
  const daysPassedCal = Math.floor((today - activeCycle.start) / MS_DAY) + 1;
  const daysLeftCal = Math.max(totalDaysCal - daysPassedCal, 0);

  // computed for dot grid
  const completedDots = (() => {
    if (today > activeCycle.end) return TOTAL_WEEKS * DAYS_PER_WEEK;
    if (today < activeCycle.start) return 0;
    const daysSinceStart = Math.floor((today - activeCycle.start) / MS_DAY);
    const currentDot = Math.min(
      TOTAL_WEEKS * DAYS_PER_WEEK,
      daysSinceStart + 1
    );
    return currentDot;
  })();
  const pctExec =
    today > activeCycle.end
      ? 100
      : Math.round((completedDots / (TOTAL_WEEKS * DAYS_PER_WEEK)) * 1000) / 10;

  const historyList = baseCycles.map((c) => {
    const br = loadList("brag", c.id);
    return {
      ...c,
      winCount: br.length,
    };
  });

  const openCycle = (id) => {
    setActiveCycleId(id);
    setTooltip((t) => ({ ...t, visible: false }));
  };

  const gotoPrev = () => {
    const idx = baseCycles.findIndex((c) => c.id === activeCycleId);
    const prev = idx > 0 ? baseCycles[idx - 1] : baseCycles[0];
    openCycle(prev.id);
  };
  const gotoNext = () => {
    const idx = baseCycles.findIndex((c) => c.id === activeCycleId);
    const next =
      idx < baseCycles.length - 1
        ? baseCycles[idx + 1]
        : baseCycles[baseCycles.length - 1];
    openCycle(next.id);
  };

  return (
    <section
      className="cycles-overview mx-auto flex max-w-[1200px] flex-col gap-3 border-t border-[rgba(214,235,59,0.045)] px-5 pb-6 pt-3"
      aria-label="cycle monitor"
    >
      <header className="flex items-center justify-between gap-3 pb-1 text-[0.72rem] tracking-[0.04em] text-white/50">
        <div className="font-medium text-[#d6eb3b]">12 WEEK YEAR</div>
        <div>
          Cycle:{" "}
          {activeCycle
            ? `${activeCycle.start.toLocaleString("en-US", {
                month: "short",
              })} ${activeCycle.start.getFullYear()} – ${activeCycle.end.toLocaleString(
                "en-US",
                { month: "short" }
              )} ${activeCycle.end.getFullYear()}`
            : "—"}
        </div>
      </header>
      <div className="intro-band grid grid-cols-1 gap-4 pt-1 pb-3 text-[0.62rem] text-white/45 md:grid-cols-[1.2fr_1fr_0.9fr]">
        <div>
          <h2 className="mb-1 text-[0.7rem] text-white">12-week year pace</h2>
          <p>
            The cycle compresses annual goals into 12 weeks. Each column below =
            1 execution week.
          </p>
        </div>
        <div>
          <h2 className="mb-1 text-[0.7rem] text-white">Interact</h2>
          <p>Hover a day-dot to see the exact date + cycle range.</p>
        </div>
        <div>
          <h2 className="mb-1 text-[0.7rem] text-white">Cycle source</h2>
          <p>
            <a href="#" className="text-[#f1f3e8] underline">
              Local: 12W Plan
            </a>
            <br />
            Auto-updates daily.
          </p>
        </div>
      </div>
      <main className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_300px]">
        {/* LEFT PANEL */}
        <section
          className="panel left-shell flex flex-col gap-3 rounded-[24px] border border-[rgba(214,235,59,0.05)] bg-[#101111] p-4 shadow-[0_26px_60px_rgba(0,0,0,0.32)]"
          aria-label="12 week progress"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, rgba(214,235,59,0.05), rgba(17,18,18,0)), #101111",
          }}
        >
          <div className="flex items-center justify-end gap-2 text-[0.6rem] text-white/50">
            <div className="flex gap-1">
              <button
                onClick={() => openCycle("current")}
                className={`hidden rounded-full border px-3 py-1 text-[0.58rem] md:inline-flex ${
                  activeCycleId === "current"
                    ? "border-[rgba(214,235,59,0.45)] bg-[rgba(214,235,59,0.16)] text-white"
                    : "border-white/10 bg-white/5 text-white/80"
                }`}
              >
                Go to current cycle
              </button>
              <button
                onClick={gotoPrev}
                className="rounded-full border border-[rgba(214,235,59,0.08)] bg-white/5 px-3 py-1 text-[0.58rem] text-white"
              >
                ◀
              </button>
              <button
                onClick={gotoNext}
                className="rounded-full border border-[rgba(214,235,59,0.08)] bg-white/5 px-3 py-1 text-[0.58rem] text-white"
              >
                ▶
              </button>
            </div>
          </div>

          {/* CHART / DOT GRID */}
          <div
            className="chart-shell flex min-h-[260px] flex-col gap-4 rounded-[18px] border border-[rgba(214,235,59,0.06)] bg-black/10 p-4"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(214,235,59,0.02), rgba(12,13,13,0)), rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <small className="text-[0.6rem] text-white/50">
                  {activeCycle
                    ? `${activeCycle.start.toLocaleString("en-US", {
                        month: "short",
                      })} ${activeCycle.start.getFullYear()} → ${activeCycle.end.toLocaleString(
                        "en-US",
                        {
                          month: "short",
                        }
                      )} ${activeCycle.end.getFullYear()}`
                    : "—"}
                </small>
                <h3 className="mt-1 text-[0.78rem] font-medium tracking-[0.03em]">
                  {activeCycle ? activeCycle.label : "Q cycle"}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[0.56rem]">
                <strong className="text-[0.7rem] text-[#d6eb3b]">
                  {daysLeftCal}d
                </strong>{" "}
                left in cycle
              </div>
            </div>

            {/* dot grid */}
            <div className="dot-grid grid flex-1 grid-cols-12 gap-[clamp(4px,0.55vw,8px)] pb-1">
              {Array.from({ length: 12 }).map((_, weekIdx) => (
                <div
                  key={weekIdx}
                  className="week-column grid grid-rows-[repeat(7,12px)_auto] place-items-center gap-[4.5px]"
                >
                  {Array.from({ length: 7 }).map((__, dayIdx) => {
                    const globalIndex = weekIdx * 7 + dayIdx;
                    // figure out date for this dot
                    const dayDate = new Date(
                      activeCycle.start.getTime() + globalIndex * MS_DAY
                    );
                    let isActive;
                    const isPastCycle = today > activeCycle.end;
                    if (isPastCycle) {
                      isActive = true;
                    } else {
                      const daysSinceStart = Math.floor(
                        (today - activeCycle.start) / MS_DAY
                      );
                      const currentWeek = Math.min(
                        12,
                        Math.max(1, Math.floor(daysSinceStart / 7) + 1)
                      );
                      const currentDayInWeek = Math.min(
                        7,
                        Math.max(1, (daysSinceStart % 7) + 1)
                      );
                      const isPastWeek = weekIdx + 1 < currentWeek;
                      const isCurrentWeek = weekIdx + 1 === currentWeek;
                      if (
                        isPastWeek ||
                        (isCurrentWeek &&
                          dayIdx + 1 <= currentDayInWeek &&
                          dayDate <= today)
                      ) {
                        isActive = true;
                      } else {
                        isActive = false;
                      }
                    }
                    return (
                      <div
                        key={dayIdx}
                        onMouseMove={(e) => {
                          const cycleRange = `${activeCycle.start.toLocaleString(
                            "en-US",
                            {
                              month: "long",
                            }
                          )} ${activeCycle.start.getFullYear()} → ${activeCycle.end.toLocaleString(
                            "en-US",
                            { month: "long" }
                          )} ${activeCycle.end.getFullYear()}`;
                          const percent = ((globalIndex + 1) / (12 * 7)) * 100;
                          setTooltip({
                            visible: true,
                            x: e.pageX + 12,
                            y: e.pageY - 6,
                            title: dayDate.toLocaleString("en-US", {
                              month: "long",
                              day: "numeric",
                            }),
                            range: cycleRange,
                            extra: `Week ${weekIdx + 1} ⋅ ${percent.toFixed(
                              1
                            )}% of cycle`,
                          });
                        }}
                        onMouseLeave={() =>
                          setTooltip((t) => ({ ...t, visible: false }))
                        }
                        className={`h-[12px] w-[12px] rounded-full transition ${
                          isActive
                            ? "bg-[#d6eb3b] shadow-[0_0_7px_rgba(214,235,59,0.35)]"
                            : "bg-[rgba(241,243,232,0.08)]"
                        }`}
                      />
                    );
                  })}
                  <div className="week-label mt-1 text-[0.58rem] text-white/25">
                    W{weekIdx + 1}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 text-[0.6rem] text-white/35">
              <div className="flex items-center gap-2">
                <span>{pctExec}% execution</span>
                <div className="h-[6px] w-[180px] overflow-hidden rounded-full border border-[rgba(214,235,59,0.06)] bg-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#d6eb3b] to-[rgba(214,235,59,0.2)]"
                    style={{ width: `${pctExec}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-white/50">
                  <span className="h-[9px] w-[9px] rounded-full bg-[#d6eb3b]" />
                  done
                </div>
                <div className="flex items-center gap-1 text-white/50">
                  <span className="h-[9px] w-[9px] rounded-full bg-[rgba(208,214,180,0.35)]" />
                  upcoming
                </div>
              </div>
            </div>
          </div>

          {/* below-row: goals + wins */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="sub-box rounded-[12px] border border-[rgba(214,235,59,0.035)] bg-[rgba(4,4,4,0.2)] p-2.5">
              <div className="mb-1">
                <h4 className="text-[0.65rem] text-white">Quarter goals</h4>
              </div>
              <p className="mb-2 text-[0.55rem] text-white/30">
                Clarify the 3–5 outcomes this quarter is for — not just tasks.
              </p>
              <input
                type="text"
                placeholder="Launch X, 30 workouts, revenue target..."
                className="mb-2 w-full rounded-[7px] border border-[rgba(214,235,59,0.03)] bg-[rgba(2,2,2,0.25)] px-2 py-1 text-[0.6rem] text-white outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGoalEnter(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <div className="list-compact flex max-h-[130px] flex-col gap-1 overflow-y-auto">
                {goals.length ? (
                  goals.map((g, i) => (
                    <div
                      key={i}
                      className="entry-row group flex items-center justify-between gap-2 rounded-md bg-white/5 px-2 py-1"
                    >
                      <div className="entry-main flex flex-col gap-[2px]">
                        <div className="entry-title text-[0.6rem]">
                          {g.title}
                        </div>
                        <div className="entry-date text-[0.54rem] text-white/40">
                          {g.date}
                        </div>
                      </div>
                      <div className="entry-actions hidden gap-1 group-hover:flex">
                        <button
                          onClick={() => {
                            const arr = loadList("goals", activeCycleId);
                            const current = arr[i];
                            const nextTitle = window.prompt(
                              "Edit goal",
                              current?.title || ""
                            );
                            const nextDate = window.prompt(
                              "Edit date (e.g. Nov 11)",
                              current?.date || ""
                            );
                            if (nextTitle !== null && nextTitle.trim()) {
                              arr[i].title = nextTitle.trim();
                              if (nextDate && nextDate.trim()) {
                                arr[i].date = nextDate.trim();
                              }
                              saveList("goals", activeCycleId, arr);
                              setLsVersion((v) => v + 1);
                              globalBump();
                            }
                          }}
                          className="rounded border border-white/10 px-1 text-[0.5rem] text-white/70 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => {
                            const arr = loadList("goals", activeCycleId);
                            arr.splice(i, 1);
                            saveList("goals", activeCycleId, arr);
                            setLsVersion((v) => v + 1);
                            globalBump();
                          }}
                          className="rounded border border-white/10 px-1 text-[0.5rem] text-white/70 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[0.55rem] text-white/40">
                    No goals yet
                  </div>
                )}
              </div>
            </div>
            <div className="sub-box rounded-[12px] border border-[rgba(214,235,59,0.035)] bg-[rgba(4,4,4,0.2)] p-2.5">
              <div className="mb-1">
                <h4 className="text-[0.65rem] text-white">Cycle wins</h4>
              </div>
              <p className="mb-2 text-[0.55rem] text-white/30">
                Capture moments worth remembering so the cycle tells a story.
              </p>
              <input
                type="text"
                placeholder="Shipped onboarding v2, got 1k views..."
                className="mb-2 w-full rounded-[7px] border border-[rgba(214,235,59,0.03)] bg-[rgba(2,2,2,0.25)] px-2 py-1 text-[0.6rem] text-white outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleBragEnter(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <div className="list-compact flex max-h-[130px] flex-col gap-1 overflow-y-auto">
                {brags.length ? (
                  brags.map((b, i) => (
                    <div
                      key={i}
                      className="entry-row group flex items-center justify-between gap-2 rounded-md bg-white/5 px-2 py-1"
                    >
                      <div className="entry-main flex flex-col gap-[2px]">
                        <div className="entry-title text-[0.6rem]">
                          {b.title}
                        </div>
                        <div className="entry-date text-[0.54rem] text-white/40">
                          {b.date}
                        </div>
                      </div>
                      <div className="entry-actions hidden gap-1 group-hover:flex">
                        <button
                          onClick={() => {
                            const arr = loadList("brag", activeCycleId);
                            const current = arr[i];
                            const nextTitle = window.prompt(
                              "Edit win",
                              current?.title || ""
                            );
                            const nextDate = window.prompt(
                              "Edit date (e.g. Nov 11)",
                              current?.date || ""
                            );
                            if (nextTitle !== null && nextTitle.trim()) {
                              arr[i].title = nextTitle.trim();
                              if (nextDate && nextDate.trim()) {
                                arr[i].date = nextDate.trim();
                              }
                              saveList("brag", activeCycleId, arr);
                              setLsVersion((v) => v + 1);
                              globalBump();
                            }
                          }}
                          className="rounded border border-white/10 px-1 text-[0.5rem] text-white/70 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => {
                            const arr = loadList("brag", activeCycleId);
                            arr.splice(i, 1);
                            saveList("brag", activeCycleId, arr);
                            setLsVersion((v) => v + 1);
                            globalBump();
                          }}
                          className="rounded border border-white/10 px-1 text-[0.5rem] text-white/70 hover:bg-[rgba(214,235,59,0.12)] hover:text-black"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[0.55rem] text-white/40">
                    Log a win — even tiny.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT HISTORY PANEL */}
        <aside
          className="history-panel flex flex-col gap-2 rounded-[16px] border border-[rgba(214,235,59,0.06)] bg-[rgba(3,3,3,0.25)] p-3"
          aria-label="cycle history"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(214,235,59,0.045), rgba(17,18,18,0)), rgba(3,3,3,0.25)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[0.7rem] text-white">Cycles</h3>
            <small className="text-[0.55rem] text-white/40">tap to open</small>
          </div>
          <div className="cycles-stack flex flex-col gap-1.5">
            {historyList.map((h) => (
              <div
                key={h.id}
                onClick={() => openCycle(h.id)}
                className={[
                  "flex cursor-pointer items-center justify-between gap-2 rounded-[10px] bg-black/10 px-2 py-1.5 transition",
                  activeCycleId === h.id
                    ? "bg-[rgba(214,235,59,0.17)] border-l-2 border-l-[rgba(214,235,59,0.8)]"
                    : "hover:bg-[rgba(214,235,59,0.06)] hover:border-l-[rgba(214,235,59,0.25)]",
                  h.id === "current" &&
                    "shadow-inner shadow-[rgba(214,235,59,0.25)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="cycle-meta text-[0.58rem] leading-[1.25]">
                  <strong className="block text-[0.67rem]">{h.label}</strong>
                  <span className="text-[0.55rem] text-white/30">
                    {h.range}
                  </span>
                </div>
                <div className="cycle-pill-sm min-w-[58px] rounded-[12px] border border-[rgba(214,235,59,0.25)] bg-[rgba(214,235,59,0.1)] px-2 py-0.5 text-center text-[0.55rem]">
                  {h.winCount} {h.winCount === 1 ? "win" : "wins"}
                </div>
              </div>
            ))}
          </div>
          <div className="cycle-detail mt-1 rounded-[10px] border border-[rgba(214,235,59,0.04)] bg-black/35 p-2 text-[0.6rem] leading-[1.35] text-white/80">
            <div className="mb-1 flex items-center justify-between gap-2">
              <strong>{activeCycle.label}</strong>
              <span className="text-[0.55rem] text-white/50">
                {activeCycle.range}
              </span>
            </div>
            <div className="mb-1">
              Wins logged:{" "}
              <strong>{loadList("brag", activeCycleId).length}</strong>
            </div>
            <div className="text-white/75">
              {loadList("brag", activeCycleId).length
                ? `Recent: ${loadList("brag", activeCycleId)[0].title}`
                : "No wins logged for this cycle yet."}
            </div>
          </div>
        </aside>
      </main>

      {/* tooltip */}
      {tooltip.visible && (
        <div
          className="pointer-events-none fixed z-[999] rounded-[12px] border border-[rgba(214,235,59,0.35)] bg-[rgba(6,6,6,0.92)] px-3 py-2 text-[0.6rem] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <h4 className="mb-1 text-[0.65rem] text-[#d6eb3b]">
            {tooltip.title}
          </h4>
          <p className="text-white/70">{tooltip.range}</p>
          <p className="mt-1 text-white/60">{tooltip.extra}</p>
        </div>
      )}
    </section>
  );
}

/* =========================
   PAGE
   ========================= */
export default function TwelveWPage() {
  // this version bump is shared between feed + overview so edits in one show in the other
  const [globalVersion, setGlobalVersion] = useState(0);
  const bumpGlobal = () => setGlobalVersion((v) => v + 1);

  return (
    <div
      className="min-h-screen space-y-4 bg-[#050505] pb-10"
      style={{ background: BG_STYLE, color: COLORS.ink }}
    >
      {/* second app */}
      <CyclesOverview globalBump={bumpGlobal} key={globalVersion} />
      {/* first app */}
      <FeedShell bumpVersion={bumpGlobal} />
    </div>
  );
}
