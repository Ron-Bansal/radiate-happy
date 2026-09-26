import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSidePanel from "./HeroSidePanel";
import V3Showcase from "./V3Showcase";
import UseCaseCarousel from "./UseCaseCarousel";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Napkin Notes | Side-panel notes for your browser",
  description:
    "The fastest way to jot something down without leaving your browser. A Chrome side-panel notepad with rich text, multiple notes, autosave. Free, no accounts, no cloud. Works on Chrome, Arc, Edge, and Brave.",
  keywords: [
    "chrome extension notepad",
    "browser side panel notes",
    "quick notes chrome extension",
    "side panel notepad",
    "browser notepad",
    "chrome notes extension",
    "arc browser notes",
    "napkin notes",
    "scratch pad extension",
    "note taking chrome extension",
  ],
  openGraph: {
    title: "Napkin Notes | Side-panel notes for your browser",
    description:
      "A scratch pad that lives in your browser's side panel. Click the icon, start typing. Free, no accounts.",
    images: ["/assets/napkin-notes-golden.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Napkin Notes | Side-panel notes for your browser",
    description:
      "A scratch pad that lives in your browser's side panel. Click the icon, start typing. Free, no accounts.",
    images: ["/assets/napkin-notes-golden.webp"],
  },
  alternates: {
    canonical: "https://raunaqbansal.com/napkin-notes",
  },
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki";

export default function NapkinNotesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Napkin Notes",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome, Edge, Arc, Brave",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A Chrome side-panel notepad for quick notes without leaving your browser. Rich text, multiple notes, autosave.",
    url: "https://raunaqbansal.com/napkin-notes",
    author: {
      "@type": "Person",
      name: "Ron Bansal",
    },
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-[var(--font-figtree)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/napkin-notes-square.webp"
            alt="Napkin Notes icon"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold tracking-tight">
            Napkin Notes
          </span>
        </div>
        <a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
        >
          Chrome Web Store &rarr;
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-12 pb-6 max-w-6xl mx-auto">
        <div className="mb-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12]">
            Your quickest canvas
            <br />
            for thought.
          </h1>
          <p className="mt-5 text-lg text-[#1a1a1a]/55 leading-relaxed">
            A notepad that lives in your browser&apos;s side panel. Click the
            icon, start typing. Everything autosaves.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Add to Chrome, Free
            </a>
            <span className="text-xs text-[#1a1a1a]/30">
              Works on Chrome, Edge, Arc, Brave
            </span>
          </div>
        </div>
        <HeroSidePanel />
      </section>

      {/* Core value — 3 essential points */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">
          Notes without the context switch.
        </h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3 className="font-semibold text-[17px] mb-2">Always beside your page</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Opens in the browser&apos;s side panel, right alongside whatever
              you&apos;re reading. No new tab, no window juggling.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] mb-2">Rich text, zero setup</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Bold, lists, links, images. Use markdown shortcuts or select and
              format. No accounts, no configuration. Install and start writing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] mb-2">Local and private</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Your notes stay on your machine. No cloud, no server, no tracking.
              Autosaved to Chrome&apos;s built-in storage.
            </p>
          </div>
        </div>
      </section>

      {/* v3 — tabbed showcase */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#4DAD75]/10 text-[#4DAD75]">
            v3
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            The biggest update yet
          </h2>
        </div>
        <p className="text-[#1a1a1a]/50 text-base mb-10 max-w-lg">
          Everything from before is still here. You don&apos;t lose a thing, you
          just get a lot more.
        </p>
        <V3Showcase />
      </section>

      {/* Who it's for — carousel */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
          For anyone who thinks faster than they can context-switch.
        </h2>
        <p className="text-[#1a1a1a]/40 text-base mb-10 max-w-lg">
          Not a second brain, not a knowledge base. A scratch pad.
        </p>
        <UseCaseCarousel />
      </section>

      {/* Pro - entire section dark grid bg */}
      <section className="border-t border-[#e5e5e3] bg-[#1a1a1a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
          {/* Header + CTA */}
          <div className="max-w-lg mb-16">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#4DAD75]/15 text-[#4DAD75] mb-5">
              Pro
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.15] mb-4">
              More notes.
              <br />
              More context.
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-8">
              Free is perfect for most people. Pro unlocks 10 extra notes, smart
              linking, and quick capture. For power users or anyone who wants to
              support an indie developer.
            </p>
            <div>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-[#1a1a1a] text-[13px] font-medium hover:bg-white/90 transition-colors"
              >
                Get Pro &ndash; $9.99 USD
              </a>
              <p className="text-[11px] text-white/30 mt-2">One-time payment. No subscription</p>
            </div>
          </div>

          {/* Visual: stacked note cards showing 10 Pro notes */}
          <div className="relative h-[280px] md:h-[320px] mb-16">
            {[
              { num: 1, name: "Personal", heading: "This week", lines: 4 },
              { num: 2, name: "COMP3901 Capstone", heading: "Week 9 deliverables (due Oct 4)", lines: 3 },
              { num: 3, name: "Japan Trip", heading: "Tokyo sources", lines: 5 },
              { num: 4, name: "Work / Linear", heading: "Sprint 14 standup", lines: 3 },
              { num: 5, name: "Research Project", heading: "Literature review notes", lines: 4 },
              { num: 6, name: "Brand Moodboard", heading: "Visual direction", lines: 2 },
              { num: 7, name: "Q4 Goals", heading: "Revenue targets", lines: 3 },
              { num: 8, name: "Side Project", heading: "Auth flow TODO", lines: 4 },
              { num: 9, name: "Reading List", heading: null, lines: 3 },
              { num: 10, name: "Inspo / UI Patterns", heading: null, lines: 2 },
            ].map((note, i) => (
              <div
                key={i}
                className="absolute rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm overflow-hidden"
                style={{
                  width: `${180 + (i % 3) * 10}px`,
                  height: `${160 + (i % 2) * 20}px`,
                  left: `${(i % 5) * 19}%`,
                  top: `${i < 5 ? 0 : 45}%`,
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)`,
                  zIndex: 10 - i,
                }}
              >
                <div className="px-3 pt-2.5 pb-1.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold text-[#4DAD75]">{note.num}</span>
                    <span className="text-[10px] font-medium text-white/60 truncate">{note.name}</span>
                  </div>
                  {note.heading && (
                    <div className="text-[9px] font-semibold text-white/40 mb-1.5 truncate">{note.heading}</div>
                  )}
                  <div className="space-y-1.5">
                    {Array.from({ length: note.lines }).map((_, j) => (
                      <div
                        key={j}
                        className="h-[4px] bg-white/[0.04] rounded"
                        style={{ width: `${50 + ((j * 17 + i * 13) % 40)}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder image */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] aspect-[21/9] mb-16 flex items-center justify-center">
            <span className="text-sm text-white/15">Screenshot</span>
          </div>

          {/* Pro features grid */}
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
            <div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">10 extra notes</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Dedicated spaces for every context: work, research, side projects,
                coursework. Name them, reorder them, use as many or as few as you need.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Quick capture</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Select any text on a page and send it to your note in one click.
                The source URL is saved with it so you can always find where it came from.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Search across all notes</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                See every note at a glance. Search across all of them to surface
                that snippet you saved three weeks ago.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Link websites to notes</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Open Napkin on linear.app and it jumps straight to your Work note.
                On github.com, Side Project. The right context, automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <div className="md:flex md:gap-20">
          <div className="md:w-[280px] shrink-0 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              FAQs
            </h2>
            <p className="mt-3 text-sm text-[#1a1a1a]/40">
              Something not covered here?
              <br />
              <a
                href="mailto:hello@raunaqbansal.com"
                className="underline underline-offset-2 hover:text-[#1a1a1a] transition-colors"
              >
                hello@raunaqbansal.com
              </a>
            </p>
          </div>
          <div className="flex-1">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Bottom CTA - dark green grid */}
      <section className="border-t border-[#e5e5e3] relative overflow-hidden bg-[#1a3a28]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(77,173,117,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(77,173,117,0.12) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(77,173,117,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(77,173,117,0.22) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-white">
            Try it out
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
            Free to use, takes two seconds to install, and your notes never leave
            your browser
          </p>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-[#1a1a1a] text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Add to Chrome, Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 max-w-6xl mx-auto border-t border-[#e5e5e3] flex flex-wrap items-center justify-between gap-4 text-xs text-[#1a1a1a]/35">
        <span>
          Made by{" "}
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-[#1a1a1a]/60 transition-colors"
          >
            Ron
          </Link>
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/napkin-notes/privacy"
            className="hover:text-[#1a1a1a]/60 transition-colors"
          >
            Privacy
          </Link>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1a1a]/60 transition-colors"
          >
            Chrome Web Store
          </a>
        </div>
      </footer>
    </main>
  );
}
