import Link from "next/link";
import styles from "../ascent.module.css";

export const metadata = {
  title: "Privacy Policy — Ascent",
  description: "How Ascent handles training data and optional product analytics.",
};

export default function AscentPrivacyPage() {
  return (
    <main className={styles.doc}>
      <nav className={styles.docNav} aria-label="Ascent privacy">
        <Link className={styles.docMark} href="/ascent">
          Ascent
        </Link>
        <Link className={styles.docBack} href="/ascent">
          Back
        </Link>
      </nav>

      <article className={styles.policy}>
        <header className={styles.policyHeader}>
          <p className={styles.overline}>EFFECTIVE 19 JULY 2026</p>
          <h1>Privacy policy</h1>
          <p>
            Ascent works without an account. Your training history stays on your
            iPhone unless you choose to share anonymous usage analytics.
          </p>
        </header>

        <PolicySection title="Data stored on your device">
          <p>
            Your exercises, goals, rep sets, profile name, preferences, progress
            history, and earned milestones are stored locally on your device. Ascent
            uses an Apple App Group container so its widgets and shortcuts can access
            the same training data. Ascent does not currently maintain a cloud copy.
          </p>
        </PolicySection>

        <PolicySection title="Optional usage analytics">
          <p>
            Analytics are off by default. If you opt in, Ascent sends limited product
            events including onboarding completion, sets logged, goals completed,
            feature use, and logging source. These events may contain coarse fitness
            data such as rep and goal ranges and a broad exercise category, plus app
            version, build version, iOS version, and a random installation identifier.
          </p>
          <p>
            Ascent does not send your name, email address, custom exercise names,
            exact rep history, notes, location, or advertising identifier.
          </p>
        </PolicySection>

        <PolicySection title="How analytics are used">
          <p>
            Optional analytics are processed by PostHog in the United States solely
            to understand feature adoption, reliability, and retention. Ascent
            disables IP-based location, person profiles, automatic interaction
            capture, and session recording. Analytics are not sold, used for
            advertising, or combined with data from other apps or companies.
          </p>
        </PolicySection>

        <PolicySection title="Your choices">
          <p>
            You can enable or disable Share Usage Analytics at any time in Ascent
            under Profile → Support &amp; Data → Data. Declining analytics does not
            restrict any feature.
          </p>
        </PolicySection>

        <PolicySection title="Support messages">
          <p>
            If you contact support, the information you choose to include is used
            only to respond to your request. Email is handled by your email provider
            and the recipient’s email provider.
          </p>
        </PolicySection>

        <PolicySection title="Retention and deletion">
          <p>
            Local training data remains on your device through normal app updates.
            You can erase it from Profile → Support &amp; Data → Data. Deleting Ascent
            also removes its local app data.
          </p>
          <p>
            Previously transmitted pseudonymous analytics are retained only as long
            as reasonably necessary to improve Ascent. To request deletion of those
            events, use Privacy Questions inside the app before deleting local data;
            the generated email includes the random analytics identifier needed to
            locate the events.
          </p>
        </PolicySection>

        <PolicySection title="Website analytics">
          <p>
            The Ascent webpages on raunaqbansal.com use the site’s Google Analytics,
            Vercel Analytics, and PostHog configuration to understand visits and site
            performance. Website analytics are separate from the optional analytics
            setting inside the Ascent iOS app.
          </p>
        </PolicySection>

        <PolicySection title="Changes to this policy">
          <p>
            This policy will be updated before Ascent adds accounts, cloud sync,
            advertising, or materially changes its data practices. The effective date
            above will change when the policy is revised.
          </p>
        </PolicySection>

        <section className={styles.contact}>
          <h2>Questions?</h2>
          <p>
            Email <a href="mailto:hello@raunaqbansal.com?subject=Ascent%20Privacy%20Question">hello@raunaqbansal.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.policySection}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
