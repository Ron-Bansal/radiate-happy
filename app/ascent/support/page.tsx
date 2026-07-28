import Link from "next/link";
import styles from "../ascent.module.css";

export const metadata = {
  title: "Support — Ascent",
  description: "Help with Ascent, the daily rep tracker for iPhone.",
};

const mailto = "mailto:hello@raunaqbansal.com?subject=Ascent%20Support";

export default function AscentSupportPage() {
  return (
    <main className={styles.doc}>
      <nav className={styles.docNav} aria-label="Ascent support">
        <Link className={styles.docMark} href="/ascent">
          Ascent
        </Link>
        <Link className={styles.docBack} href="/ascent">
          Back
        </Link>
      </nav>

      <article className={styles.policy}>
        <header className={styles.policyHeader}>
          <p className={styles.overline}>Support</p>
          <h1>Need a hand?</h1>
          <p>
            Ascent is made by one person. Email me and you get me, usually within a
            day or two.
          </p>
        </header>

        <Section title="Why I built it">
          <p>
            I work from home, sit for too long, and had been stuck at 12 pull-ups for
            ages. I didn&rsquo;t need another programme — I needed a reason to use the
            bar in my doorway, and a way to see whether those small sets could get me
            to 15 or 20. So I built Ascent.
          </p>
        </Section>

        <Section title="Do I need an account?">
          <p>
            No. Ascent has no sign-up and no login. Your training history lives on
            your iPhone. See the <Link href="/ascent/privacy">privacy policy</Link>{" "}
            for the detail.
          </p>
        </Section>

        <Section title="How do I move my data to a new phone?">
          <p>
            Ascent stores data in an app group container, so an encrypted iPhone
            backup or a direct device-to-device transfer carries it across. There is
            no cloud sync yet, so restoring from an unencrypted backup will not bring
            your history with it.
          </p>
        </Section>

        <Section title="How do I delete my data?">
          <p>
            Profile → Support &amp; Data → Data has an erase option. Deleting the app
            also removes its local data. If you opted into analytics and want those
            events removed, use Privacy Questions in the app before you erase — the
            generated email carries the identifier needed to find them.
          </p>
        </Section>

        <Section title="Something is broken, or missing">
          <p>
            Tell me what you were doing, what you expected, and what happened
            instead. Your iOS version and app version help. Feature requests are
            welcome too — the bar for adding anything is high, but I read all of it.
          </p>
        </Section>

        <section className={styles.contact}>
          <h2>Get in touch</h2>
          <p>
            Email <a href={mailto}>hello@raunaqbansal.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.policySection}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
