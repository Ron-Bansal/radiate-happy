import type { CSSProperties, ReactNode } from "react";
import s from "./phones.module.css";

/* Swap any CSS mockup for a real screenshot by pointing its slot at an image
   in /public/assets/ascent/. Layout, size and rotation stay identical. */
const SHOTS: Record<"guide" | "counter" | "stats" | "week", string | null> = {
  guide: null,
  counter: null,
  stats: null,
  week: null,
};

type PhoneProps = {
  slot: keyof typeof SHOTS;
  alt: string;
  x: number;
  y: number;
  m?: number;
  z?: number;
  screenClass?: string;
  children: ReactNode;
};

function Phone({ slot, alt, x, y, m = 1, z = 1, screenClass, children }: PhoneProps) {
  const src = SHOTS[slot];
  return (
    <div
      className={s.phone}
      style={
        {
          "--m": m,
          left: `calc(${x}px * var(--S))`,
          top: `calc(${y}px * var(--S))`,
          zIndex: z,
        } as CSSProperties
      }
    >
      <div className={`${s.viewport} ${screenClass ?? ""}`}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={s.shot} src={src} alt={alt} />
        ) : (
          <div className={s.screen} role="img" aria-label={alt}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className={s.statusBar}>
      <span>{time}</span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function PhoneCollage() {
  return (
    <div className={s.collage} aria-hidden="false">
      {/* 1 — the method, stated plainly */}
      <Phone
        slot="guide"
        alt="Ascent onboarding screen explaining that strength adds up from small sets"
        x={250}
        y={-190}
        m={1.04}
        z={1}
        screenClass={s.guideScreen}
      >
        <StatusBar time="8:41" />
        <p className={`${s.mono} ${s.guideRule}`}>One day at a time</p>
        <h2 className={s.guideTitle}>
          Strength
          <br />
          adds up
        </h2>
        <p className={s.guideBody}>
          Log small sets of pull-ups throughout your day.
        </p>
        <div className={s.guideNotes}>
          <p className={s.guideNote}>
            <span>01</span>Use proper form.
          </p>
          <p className={s.guideNote}>
            <span>02</span>Don&rsquo;t go to failure.
          </p>
          <p className={s.guideNote}>
            <span>03</span>Be consistent.
          </p>
        </div>
        <div className={s.guideBar} />
        <span className={s.watermark} aria-hidden="true">
          A
        </span>
      </Phone>

      {/* 2 — the hero: today's count */}
      <Phone
        slot="counter"
        alt="Ascent home screen showing 72 of 100 pull-ups logged today across 5 sets"
        x={575}
        y={270}
        m={1}
        z={3}
        screenClass={s.counterScreen}
      >
        <StatusBar time="8:59" />
        <div className={s.tabs}>
          {[
            ["Pull-ups", "72", true],
            ["Push-ups", "45", false],
            ["Dips", "18", false],
            ["Squats", "0", false],
          ].map(([name, count, active]) => (
            <div key={name as string} className={`${s.tab} ${active ? s.tabActive : ""}`}>
              <div className={s.tabInner}>
                <span className={s.tabRule} />
                <span>{name}</span>
              </div>
              <b>{count}</b>
            </div>
          ))}
        </div>

        <div className={s.bigCard}>
          <span className={s.watermark} aria-hidden="true">
            A
          </span>
          <p className={s.bigLabel}>Pull-ups</p>
          <div className={s.bigCount}>
            <strong>72</strong>
            <span>/100</span>
          </div>
          <div>
            <div className={s.bigTrack}>
              <i />
            </div>
            <div className={s.bigMeta}>
              <span>5 sets</span>
              <span>28 to go</span>
            </div>
          </div>
        </div>

        <div className={s.quickGrid}>
          <span>+3</span>
          <span>+5</span>
          <span>+8</span>
          <span className={s.quickCustom}>Custom</span>
        </div>
        <p className={`${s.mono} ${s.quickLabel}`}>Log set · custom amount</p>

        <p className={`${s.mono} ${s.setsHead}`}>Today&rsquo;s sets</p>
        {[
          ["7:13 PM", "+11"],
          ["4:12 PM", "+18"],
          ["1:11 PM", "+19"],
        ].map(([time, reps]) => (
          <div key={time} className={s.setRow}>
            <em>{time}</em>
            <b>{reps}</b>
          </div>
        ))}
      </Phone>

      {/* 3 — stats, dark */}
      <Phone
        slot="stats"
        alt="Ascent statistics screen with daily pull-up totals on a dark background"
        x={975}
        y={-320}
        m={0.96}
        z={2}
        screenClass={s.statsScreen}
      >
        <StatusBar time="9:04" />
        <p className={`${s.mono} ${s.statsHead}`}>Last 6 days</p>
        <div className={s.statsBars}>
          {[
            [100, 90],
            [84, 111],
            [72, 96],
            [66, 94],
            [58, 98],
            [4, 0],
          ].map(([w, v], i) => (
            <div className={s.statsBar} key={i}>
              <i style={{ width: `${w}%` }} />
              <b>{v}</b>
            </div>
          ))}
        </div>
        <div className={s.statsSpark}>
          {[18, 34, 12, 62, 40, 28, 74, 22, 48, 30, 66, 16, 52, 38, 24, 58, 20, 44].map(
            (h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ),
          )}
        </div>
        <div className={s.dock}>
          <span>Track</span>
          <span className={s.dockActive}>Stats</span>
          <span>Profile</span>
        </div>
      </Phone>

      {/* 4 — weekly volume, green */}
      <Phone
        slot="week"
        alt="Ascent weekly volume screen showing 330 dips this week and daily history"
        x={1000}
        y={575}
        m={0.96}
        z={2}
        screenClass={s.weekScreen}
      >
        <StatusBar time="8:36" />
        <div className={s.weekCount}>
          <strong>330</strong>
          <span>
            dips
            <br />
            this week
          </span>
        </div>

        <div className={s.weekCard}>
          <div className={s.weekCardHead}>
            <span>Weekly volume</span>
            <span className={s.weekChip}>Dips</span>
          </div>
          <div className={s.weekBars}>
            {[38, 72, 54, 88, 46, 30, 62].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <p className={`${s.mono} ${s.historyHead}`}>Daily history</p>
        {[
          ["Today", 62, "55"],
          ["Sat, Jul 25", 40, "36"],
          ["Fri, Jul 24", 86, "72"],
          ["Thu, Jul 23", 54, "48"],
          ["Wed, Jul 22", 30, "26"],
        ].map(([label, w, v]) => (
          <div className={s.historyRow} key={label as string}>
            <span>{label}</span>
            <i style={{ width: `${w}%` }} />
            <b>{v}</b>
          </div>
        ))}
      </Phone>
    </div>
  );
}
