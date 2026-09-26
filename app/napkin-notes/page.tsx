import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSidePanel from "./HeroSidePanel";
import V3Showcase from "./V3Showcase";
import UseCaseCarousel from "./UseCaseCarousel";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Napkin Notes — Side-panel notes for your browser",
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
    title: "Napkin Notes — Side-panel notes for your browser",
    description:
      "A scratch pad that lives in your browser's side panel. Click the icon, start typing. Free, no accounts.",
    images: ["/assets/napkin-notes-golden.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Napkin Notes — Side-panel notes for your browser",
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
              Add to Chrome — Free
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
            <div className="text-[28px] mb-3 text-[#1a1a1a]/15">01</div>
            <h3 className="font-semibold text-[17px] mb-2">Always beside your page</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Opens in the browser&apos;s side panel — right alongside whatever
              you&apos;re reading. No new tab, no window juggling.
            </p>
          </div>
          <div>
            <div className="text-[28px] mb-3 text-[#1a1a1a]/15">02</div>
            <h3 className="font-semibold text-[17px] mb-2">Rich text, zero setup</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Bold, lists, links, images. Use markdown shortcuts or select and
              format. No accounts, no configuration — install and start writing.
            </p>
          </div>
          <div>
            <div className="text-[28px] mb-3 text-[#1a1a1a]/15">03</div>
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
          Everything from before is still here. You don&apos;t lose a thing — you
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

      {/* Pro — redesigned */}
      <section className="relative px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <div className="md:flex md:gap-20">
          {/* Left — pitch and price */}
          <div className="md:w-[380px] shrink-0 mb-12 md:mb-0">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1a1a1a]/5 text-[#1a1a1a]/50 mb-4">
              Pro
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              More space when you need it.
            </h2>
            <p className="text-[#1a1a1a]/50 text-[15px] leading-relaxed mb-8">
              Free covers most people. Pro is for power users who need dedicated
              notes for every context — or anyone who wants to support an indie
              developer keeping this alive.
            </p>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-semibold">$9.99</span>
              <div className="text-sm text-[#1a1a1a]/35 leading-tight">
                <div>one-time</div>
                <div>not a subscription</div>
              </div>
            </div>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Get Pro
            </a>
          </div>

          {/* Right — visual feature showcase */}
          <div className="flex-1">
            {/* Notes fan */}
            <div className="relative h-[220px] mb-10">
              <div className="absolute inset-0 flex items-center justify-center">
                {[
                  { name: "Research", site: "scholar.google.com", x: -120, y: -20, r: -8 },
                  { name: "Design", site: "figma.com", x: -55, y: -35, r: -3 },
                  { name: "Work", site: "linear.app", x: 0, y: -40, r: 0 },
                  { name: "Coursework", site: "canvas.edu", x: 55, y: -35, r: 3 },
                  { name: "Side Project", site: "github.com", x: 120, y: -20, r: 7 },
                  { name: "Reading List", x: -90, y: 35, r: -5, site: null },
                  { name: "Recipes", x: -25, y: 40, r: -1, site: null },
                  { name: "Travel", x: 40, y: 38, r: 2, site: null },
                  { name: "Add note", x: 100, y: 30, r: 5, empty: true, site: null },
                  { name: "Add note", x: 155, y: 20, r: 8, empty: true, site: null },
                ].map((note, i) => (
                  <div
                    key={i}
                    className={`absolute w-[110px] h-[68px] rounded-lg border flex flex-col justify-between p-2.5 transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-md ${
                      note.empty
                        ? "border-dashed border-[#d5d5d3] bg-[#fafaf9]/80"
                        : "border-[#e5e5e3] bg-white shadow-sm"
                    }`}
                    style={{
                      transform: `translate(${note.x}px, ${note.y}px) rotate(${note.r}deg)`,
                    }}
                  >
                    <span
                      className={`text-[10px] font-medium leading-tight ${
                        note.empty ? "text-[#1a1a1a]/20" : "text-[#1a1a1a]/75"
                      }`}
                    >
                      {note.name}
                    </span>
                    {note.site && (
                      <span className="text-[8px] text-[#4DAD75]/60 truncate">{note.site}</span>
                    )}
                    {note.empty && (
                      <span className="text-[8px] text-[#1a1a1a]/15">+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature descriptions */}
            <div className="space-y-6 border-t border-[#e5e5e3] pt-8">
              {[
                {
                  title: "10 extra notes",
                  desc: "Dedicated spaces for work, research, side projects, coursework — named and organised your way.",
                },
                {
                  title: "Link websites to notes",
                  desc: "Open Napkin on linear.app and it jumps to your Work note. On github.com, Side Project. Automatic.",
                },
                {
                  title: "Quick capture",
                  desc: "Select text on any page, right-click, append to your note. Source URL saved automatically.",
                },
                {
                  title: "All Notes + search",
                  desc: "See everything at a glance. Search across all notes to surface that thing you saved weeks ago.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4DAD75]/40 mt-2 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[14px]">{f.title}</h3>
                    <p className="text-[13px] text-[#1a1a1a]/45 mt-0.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
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

      {/* Bottom CTA */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3] text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Try it out
        </h2>
        <p className="text-[#1a1a1a]/50 text-base mb-8 max-w-md mx-auto">
          Free to use, takes two seconds to install, and your notes never leave
          your browser.
        </p>
        <a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Add to Chrome — Free
        </a>
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
