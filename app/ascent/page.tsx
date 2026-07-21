import Link from "next/link";
import styles from "./ascent.module.css";

const testFlightHref = "mailto:hello@raunaqbansal.com?subject=Ascent%20TestFlight";

export default function AscentPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Ascent">
        <Link className={styles.wordmark} href="/ascent">
          <span className={styles.appIcon} aria-hidden="true">A</span>
          <span>Ascent</span>
        </Link>
        <div className={styles.navActions}>
          <Link className={styles.navLink} href="/ascent/privacy">Privacy</Link>
          <a className={styles.navCta} href={testFlightHref}>Join the beta</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <p className={styles.overline}>A PULL-UP PRACTICE FOR IPHONE</p>
        <h1>Do more pull‑ups<br />without adding a workout.</h1>
        <p className={styles.intro}>
          Do a few reps when you pass the bar. Log the set, get on with your day,
          and watch the small efforts add up.
        </p>
        <a className={styles.primaryAction} href={testFlightHref}>Join the first beta</a>
        <p className={styles.betaNote}>Free during beta · No account needed</p>
      </section>

      <section className={styles.heroProduct} aria-label="Example daily pull-up progress in Ascent">
        <div className={styles.phoneTopbar}><span>9:41</span><span>TODAY</span><span>•••</span></div>
        <div className={styles.exerciseHeading}>
          <div><p>PRIMARY EXERCISE</p><h2>Pull-ups</h2></div>
          <span className={styles.exerciseSwatch} aria-hidden="true" />
        </div>
        <div className={styles.heroCount}>
          <span className={styles.repCount}>24</span>
          <span className={styles.repGoal}>of 40</span>
        </div>
        <div className={styles.progressTrack} aria-hidden="true"><span /></div>
        <div className={styles.quickLog}><span>−</span><strong>6 reps</strong><span>＋</span></div>
        <div className={styles.setStrip}>
          {[6, 6, 5, 7].map((reps, index) => <span key={index}>{reps}</span>)}
          <span className={styles.emptySet}>+</span>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyCopy}>
          <p className={styles.stepNumber}>01 · THROUGHOUT THE DAY</p>
          <h2>A few reps.<br />Get on with your day.</h2>
          <p>
            You do not need to find another hour. Do a manageable set after a
            meeting, before lunch, or whenever you pass the bar.
          </p>
        </div>
        <div className={styles.dayCard}>
          <div className={styles.dayHeader}><span>TODAY</span><span>24 PULL-UPS</span></div>
          <div className={styles.dayTimeline}>
            <TimelineSet time="7:18" reps="6" width="44%" />
            <TimelineSet time="10:42" reps="6" width="44%" />
            <TimelineSet time="13:06" reps="5" width="36%" />
            <TimelineSet time="16:31" reps="7" width="54%" />
          </div>
        </div>
      </section>

      <section className={`${styles.storySection} ${styles.storyReverse}`}>
        <div className={styles.weekCard}>
          <div className={styles.dayHeader}><span>THIS WEEK</span><span>138 REPS</span></div>
          <div className={styles.weekBars} aria-label="Example weekly pull-up volume">
            {[24, 32, 18, 27, 37, 0, 0].map((reps, index) => (
              <div key={index}>
                <span style={{ height: `${Math.max(reps * 2.5, 3)}px` }} />
                <b>{["M", "T", "W", "T", "F", "S", "S"][index]}</b>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.stepNumber}>02 · ACCUMULATED VOLUME</p>
          <h2>Strength adds up.</h2>
          <p>
            Six reps may not feel like much. Four sets later, you have done 24.
            Ascent makes the work visible—today, this week, and over time.
          </p>
        </div>
      </section>

      <section className={styles.methodSection}>
        <div>
          <p className={styles.overline}>THE METHOD</p>
          <h2>Stay fresh.<br />Practise often.</h2>
        </div>
        <div className={styles.methodCopy}>
          <p>
            Ascent is inspired by grease-the-groove training: manageable sets spread
            across the day instead of one exhausting session.
          </p>
          <p>
            Stop while you still feel fresh. Return to the bar later. The goal is to
            practise often, accumulate volume, and gradually raise what you can do.
          </p>
        </div>
      </section>

      <section className={styles.restraintSection}>
        <p className={styles.overline}>WHAT MAKES ASCENT DIFFERENT</p>
        <h2>Daily reps,<br />not workout sessions.</h2>
        <div className={styles.restraintList}>
          <span>No programmes</span>
          <span>No timers</span>
          <span>No coaching feed</span>
          <span>No streak to break</span>
          <strong>Just reps.</strong>
        </div>
      </section>

      <section className={styles.modelSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.overline}>THE PLAN AFTER BETA</p>
          <h2>Pull-ups stay free.<br />Log 30 days to unlock the rest.</h2>
          <p>
            Pull-up tracking, personal targets, and full stats will stay free. Log on
            any 30 days and every additional exercise unlocks for life. The days do not
            need to be consecutive.
          </p>
        </div>
        <div className={styles.unlockGrid}>
          <article>
            <span className={styles.unlockValue}>30</span>
            <h3>days of practice</h3>
            <p>Log on any 30 days. Keep every exercise, free for life.</p>
          </article>
          <article>
            <span className={styles.unlockValue}>$19.99</span>
            <h3>to unlock now</h3>
            <p>One payment. No subscription.</p>
          </article>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderLabel}><span aria-hidden="true">A</span><p>WHY I BUILT IT</p></div>
        <div className={styles.founderCopy}>
          <h2>I kept walking past my pull-up bar.</h2>
          <p>
            I work from home, sit for too long, and had been stuck at 12 pull-ups for
            ages. I did not need another programme. I needed a reason to use the bar in
            my doorway—and a way to see whether those small sets could get me to 15 or
            20. So I built Ascent.
          </p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalIcon} aria-hidden="true">A</div>
        <h2>More pull-ups.<br />No extra workout.</h2>
        <p>I’m inviting a small group of founding users to try Ascent on TestFlight and tell me what needs work.</p>
        <a className={styles.primaryAction} href={testFlightHref}>Join the first beta</a>
      </section>

      <footer className={styles.footer}>
        <span>Ascent for iPhone</span>
        <Link href="/ascent/privacy">Privacy</Link>
        <span>Built in New Zealand</span>
      </footer>
    </main>
  );
}

function TimelineSet({ time, reps, width }: { time: string; reps: string; width: string }) {
  return <div className={styles.timelineSet}><span>{time}</span><i style={{ width }} /><strong>+{reps}</strong></div>;
}
