"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneCollage from "./phones";
import styles from "./ascent.module.css";

// TODO: replace with the real App Store listing once Ascent is approved.
const APP_STORE_URL = "https://apps.apple.com/app/ascent";

type PanelId = "guide" | "safety" | "pricing" | "challenge";

const PANELS: { id: PanelId; label: string }[] = [
  { id: "guide", label: "Guide" },
  { id: "safety", label: "Safety" },
  { id: "pricing", label: "Pricing" },
  { id: "challenge", label: "Challenge" },
];

export default function AscentPage() {
  const [panel, setPanel] = useState<PanelId>("guide");

  return (
    <main className={styles.shell}>
      <div className={styles.panel}>
        <header className={styles.masthead}>
          <h1 className={styles.wordmark}>Ascent</h1>
          <p className={styles.tagline}>Daily Rep Tracker</p>
        </header>

        <div className={styles.body}>
          {/* keyed so each panel replays the entrance animation */}
          <div className={styles.panelInner} key={panel}>
            {panel === "guide" && <GuidePanel onSafety={() => setPanel("safety")} />}
            {panel === "safety" && <SafetyPanel />}
            {panel === "pricing" && <PricingPanel />}
            {panel === "challenge" && <ChallengePanel />}
            <AppStoreCta panel={panel} />
          </div>
        </div>

        <nav className={styles.nav} aria-label="Ascent">
          <div className={styles.navGroup}>
            {PANELS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.navItem} ${panel === id ? styles.navActive : ""}`}
                aria-current={panel === id ? "true" : undefined}
                onClick={() => setPanel(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={`${styles.navGroup} ${styles.navRight}`}>
            <Link className={styles.navItem} href="/ascent/privacy">
              Privacy
            </Link>
            <Link className={styles.navItem} href="/ascent/support">
              Support
            </Link>
          </div>
        </nav>
      </div>

      <div className={styles.stage} aria-label="Ascent on iPhone">
        <PhoneCollage />
      </div>
    </main>
  );
}

/* ---------------------------------- panels --------------------------------- */

function GuidePanel({ onSafety }: { onSafety: () => void }) {
  return (
    <>
      <div className={styles.card}>
        <p className={styles.cardLead}>Stupid simple guide to getting strong:</p>
        <ol className={styles.steps}>
          <li>Get a pull-up bar for your doorframe</li>
          <li>
            Do a few pull-ups every time you pass the door
            <ol>
              <li>Small sets. Fatigue is not the goal here.</li>
              <li>
                Learn safe technique —{" "}
                <button type="button" className={styles.cardLink} onClick={onSafety}>
                  grease the groove
                </button>
              </li>
            </ol>
          </li>
          <li>
            Log sets on
            <span className={styles.inlineMark}>
              <i aria-hidden="true">A</i>
              <span>Ascent</span>
            </span>
            to track volume
            <ol>
              <li>Optional, but it helps to stay accountable.</li>
            </ol>
          </li>
        </ol>
      </div>
      <p className={styles.claim}>100 pull-ups per day. Without adding another workout.</p>
    </>
  );
}

function SafetyPanel() {
  return (
    <div className={styles.prose}>
      <p>
        <strong>Grease the groove.</strong> Instead of one exhausting session, you
        spread manageable sets across the day. Frequent practice at a comfortable
        effort teaches the movement faster than grinding to failure.
      </p>
      <p>
        Stop while you still feel fresh — roughly half of what you could do. If a set
        feels heavy, do fewer reps or take the rest of the day off. The point is to
        come back to the bar again in an hour, not to be wrecked by lunchtime.
      </p>
      <p>
        Full range, controlled descent, no kipping or swinging. If you can&rsquo;t do
        a pull-up yet, use a band or start with slow negatives and log those instead.
      </p>
      <p>
        This is general information, not medical or coaching advice. If something
        hurts, stop and talk to a professional.
      </p>
    </div>
  );
}

function PricingPanel() {
  return (
    <>
      <div className={styles.prose}>
        <p>
          Everything else — push-ups, dips, squats and custom exercises — unlocks by
          showing up, or by paying once. Never a subscription.
        </p>
      </div>

      <div className={styles.pricingPanel}>
        <article className={styles.freePlan}>
          <p className={styles.planLabel}>PULL-UP PRACTICE</p>
          <div className={styles.planPrice}>
            <span>$0</span>
            <b>FOREVER</b>
          </div>
          <ul>
            <li>Personal daily targets</li>
            <li>Full progress and weekly stats</li>
            <li>Widgets and shortcuts</li>
          </ul>
        </article>

        <div className={styles.unlockLabel}>
          <span>UNLOCK EVERY EXERCISE</span>
          <span>CHOOSE ONE</span>
        </div>

        <div className={styles.unlockGrid}>
          <article>
            <p className={styles.planLabel}>EARN IT</p>
            <span className={styles.unlockValue}>30</span>
            <h3>days of practice</h3>
            <p>Log on any 30 days. They do not need to be consecutive.</p>
            <strong>FREE FOR LIFE</strong>
          </article>
          <article>
            <p className={styles.planLabel}>OWN IT</p>
            <span className={styles.unlockValue}>$19.99</span>
            <h3>one time</h3>
            <p>Unlock every exercise immediately.</p>
            <strong>NO SUBSCRIPTION</strong>
          </article>
        </div>
      </div>
    </>
  );
}

function ChallengePanel() {
  return (
    <div className={styles.prose}>
      <p className={styles.soon}>Coming soon</p>
      <p>
        <strong>The impact of spamming one very effective exercise.</strong> The plan
        is simple: post your progress — a screenshot, a photo, a number you
        couldn&rsquo;t hit last month — with the hashtag, and it shows up here.
      </p>
      <p className={styles.hashtag}>#AscentChallenge</p>
      <p>
        Not live yet. If you want in when it is, say so and I&rsquo;ll let you know
        when the wall goes up.
      </p>
    </div>
  );
}

/* ----------------------------------- cta ----------------------------------- */

function AppStoreCta({ panel }: { panel: PanelId }) {
  const note =
    panel === "pricing"
      ? "Free to download. The 30-day unlock starts the day you do."
      : "Free to use. No sign up required. Intentionally simple.";

  return (
    <div className={styles.cta}>
      <a className={styles.badge} href={APP_STORE_URL} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <span className={styles.badgeText}>
          <small>Download on the</small>
          <strong>App Store</strong>
        </span>
      </a>
      <p className={styles.ctaNote}>{note}</p>
    </div>
  );
}
