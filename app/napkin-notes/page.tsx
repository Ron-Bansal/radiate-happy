import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSidePanel from "./HeroSidePanel";
import V3Showcase from "./V3Showcase";
import UseCaseCarousel from "./UseCaseCarousel";

export const metadata: Metadata = {
  title: "Napkin Notes — Side-panel notes for your browser",
  description:
    "The fastest way to jot something down without leaving your browser. Rich text, multiple notes, autosaved. No accounts, no setup.",
  openGraph: {
    title: "Napkin Notes — Side-panel notes for your browser",
    description:
      "The fastest way to jot something down without leaving your browser.",
    images: ["/assets/napkin-notes-golden.webp"],
  },
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki";

const proNotes = [
  { name: "Research", site: "scholar.google.com", rotation: -6 },
  { name: "Design", site: "figma.com", rotation: -3 },
  { name: "Work", site: "linear.app", rotation: 0 },
  { name: "Coursework", site: "canvas.edu", rotation: 3 },
  { name: "Side Project", site: "github.com", rotation: 5 },
];

const proNotesBottom = [
  { name: "Reading List", site: null, rotation: -4 },
  { name: "Recipes", site: null, rotation: -1 },
  { name: "Travel", site: null, rotation: 2 },
  { name: "Add note", site: null, rotation: 4, empty: true },
  { name: "Add note", site: null, rotation: 6, empty: true },
];

const faqs = [
  {
    q: "Where are my notes stored?",
    a: "Locally in your browser, using Chrome's built-in storage. Nothing is sent anywhere.",
  },
  {
    q: "Can I export my notes?",
    a: "Not yet — it's on the roadmap. For now you can copy and paste from the full-page view.",
  },
  {
    q: "Does it work on Firefox or Safari?",
    a: "Not currently. Napkin Notes is built for Chrome and Chromium browsers — Edge, Arc, Brave, and others.",
  },
  {
    q: "Is my data safe?",
    a: "Your notes never leave your machine. There's no backend, no cloud sync, and no accounts. See our privacy page for details.",
  },
  {
    q: "What happens if I uninstall?",
    a: "Your notes are removed with the extension. If you reinstall, you start fresh.",
  },
  {
    q: "Can I use it on multiple devices?",
    a: "Notes are local to each browser profile. There's no sync between devices right now.",
  },
];

function NoteCard({
  name,
  site,
  rotation,
  empty,
}: {
  name: string;
  site: string | null;
  rotation: number;
  empty?: boolean;
}) {
  return (
    <div
      className={`relative w-[130px] h-[82px] rounded-lg border flex flex-col justify-between p-3 shrink-0 transition-transform hover:scale-105 hover:z-10 ${
        empty
          ? "border-dashed border-[#d5d5d3] bg-[#fafaf9]"
          : "border-[#e5e5e3] bg-white shadow-sm"
      }`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        className={`text-[11px] font-medium leading-tight ${
          empty ? "text-[#1a1a1a]/25" : "text-[#1a1a1a]/80"
        }`}
      >
        {name}
      </span>
      {site && (
        <span className="text-[9px] text-[#4DAD75]/70 truncate">{site}</span>
      )}
      {empty && <span className="text-[9px] text-[#1a1a1a]/20">+</span>}
      {!empty && !site && (
        <div className="space-y-1">
          <div className="h-[3px] bg-[#1a1a1a]/[0.04] rounded w-4/5" />
          <div className="h-[3px] bg-[#1a1a1a]/[0.04] rounded w-3/5" />
        </div>
      )}
    </div>
  );
}

export default function NapkinNotesPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-[var(--font-figtree)]">
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

      {/* What you get — simple inline list, not cards */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[#1a1a1a]/40 mb-10">
          What you get
        </h2>
        <div className="grid md:grid-cols-3 gap-x-16 gap-y-6">
          <div>
            <h3 className="font-semibold text-[15px]">Side panel, always there</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Opens alongside whatever you&apos;re reading. No new tab, no context switch.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Rich text that just works</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Bold, lists, links, images — use markdown shortcuts or the toolbar.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Two scratch pads</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Keep things tidy without adding complexity. Rename them however you like.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Works on Arc too</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Iframe overlay mode for browsers that don&apos;t support native side panels.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Full-page &amp; split view</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Open your notes in a new tab. See them side by side when you need the big picture.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">No accounts, no cloud</h3>
            <p className="mt-1 text-sm text-[#1a1a1a]/50 leading-relaxed">
              Your notes stay in your browser. Nothing leaves your machine.
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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          For anyone who thinks faster than they can context-switch.
        </h2>
        <p className="text-[#1a1a1a]/40 text-base mb-10 max-w-lg">
          Napkin Notes is not a second brain, a knowledge base, or a project
          manager. It&apos;s a scratch pad.
        </p>
        <UseCaseCarousel />
      </section>

      {/* Pro */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <div className="md:flex md:items-start md:justify-between md:gap-16 mb-14">
          <div className="md:max-w-md mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Napkin Pro
            </h2>
            <p className="text-[#1a1a1a]/50 text-base mb-5">
              Free is perfect for most people. Pro is for power users who need more
              space — or anyone who wants to support development.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">$9.99</span>
              <span className="text-sm text-[#1a1a1a]/40">
                USD &middot; one-time, not a subscription
              </span>
            </div>
          </div>
          {/* Pro features as a clean list */}
          <div className="md:flex-1 space-y-5">
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-[#4DAD75]/30 shrink-0" />
              <div>
                <h3 className="font-semibold text-[14px]">Up to 10 extra notes</h3>
                <p className="text-[13px] text-[#1a1a1a]/45 mt-0.5">
                  Dedicated spaces for work, research, side projects, coursework.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-[#4DAD75]/30 shrink-0" />
              <div>
                <h3 className="font-semibold text-[14px]">Link websites to notes</h3>
                <p className="text-[13px] text-[#1a1a1a]/45 mt-0.5">
                  Open Napkin on Linear and it jumps to your Work note. Automatic context.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-[#4DAD75]/30 shrink-0" />
              <div>
                <h3 className="font-semibold text-[14px]">Quick capture</h3>
                <p className="text-[13px] text-[#1a1a1a]/45 mt-0.5">
                  Select any text on a page and append it to your note — with the source saved.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-[#4DAD75]/30 shrink-0" />
              <div>
                <h3 className="font-semibold text-[14px]">All Notes view + search</h3>
                <p className="text-[13px] text-[#1a1a1a]/45 mt-0.5">
                  See everything at a glance. Find that snippet from three weeks ago.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overlayed note cards */}
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="flex items-end -space-x-3">
            {proNotes.map((note) => (
              <NoteCard key={note.name} {...note} />
            ))}
          </div>
          <div className="flex items-start -space-x-3">
            {proNotesBottom.map((note, i) => (
              <NoteCard key={note.name + i} {...note} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3]">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
          Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-[15px] mb-1.5">{faq.q}</h3>
              <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-sm text-[#1a1a1a]/40">
          Something else?{" "}
          <a
            href="mailto:raunaqbansal@outlook.com"
            className="underline underline-offset-2 hover:text-[#1a1a1a] transition-colors"
          >
            raunaqbansal@outlook.com
          </a>
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
