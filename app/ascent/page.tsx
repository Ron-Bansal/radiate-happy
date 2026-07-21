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
            meeting, before lunch, or whenever you walk past the bar.
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
            Each set is easy to dismiss on its own. Together, they become meaningful
            training volume—and a clear picture of the work you actually did.
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
            across the day instead of repeatedly training to failure.
          </p>
          <p>
            The aim is not to exhaust yourself in one session. It is to return to the
            bar, accumulate good reps, and gradually become stronger.
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
          <p className={styles.overline}>FREE, AND EARNED THROUGH PRACTICE</p>
          <h2>Show up for the app.<br />The app opens up for you.</h2>
          <p>
            Pull-up tracking, personal targets, and full stats stay free. Additional
            exercises unlock after 30 days of logging—non-consecutive, no streak pressure.
          </p>
        </div>
        <div className={styles.unlockGrid}>
          <article>
            <span className={styles.unlockValue}>30</span>
            <h3>days of practice</h3>
            <p>Unlock every exercise free for life by using the app as intended.</p>
          </article>
          <article>
            <span className={styles.unlockValue}>$19.99</span>
            <h3>once, if you prefer</h3>
            <p>Skip the wait with one payment. No subscription.</p>
          </article>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderLabel}><span aria-hidden="true">A</span><p>WHY I BUILT IT</p></div>
        <div className={styles.founderCopy}>
          <h2>I kept walking past my pull-up bar.</h2>
          <p>
            I work from home, sit for too long, and had been stuck at 12 pull-ups for
            ages. I did not need another workout plan. I needed a reason to do a few
            reps throughout the day—and a way to see whether they were getting me closer
            to 15 or 20. So I built Ascent.
          </p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalIcon} aria-hidden="true">A</div>
        <h2>More pull-ups.<br />No extra workout.</h2>
        <p>I’m inviting a small first group to TestFlight. It’s free during beta; honest feedback is the whole deal.</p>
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
