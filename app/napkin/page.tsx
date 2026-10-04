import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSidePanel from "./HeroSidePanel";
import V3Showcase from "./V3Showcase";
import UseCaseCarousel from "./UseCaseCarousel";
import FAQAccordion from "./FAQAccordion";
import ProNoteCards from "./ProNoteCards";
import SidePanelIllustration from "./illustrations/SidePanelIllustration";
import RichTextIllustration from "./illustrations/RichTextIllustration";
import LocalPrivateIllustration from "./illustrations/LocalPrivateIllustration";
import QuickCaptureIllustration from "./illustrations/QuickCaptureIllustration";
import SearchIllustration from "./illustrations/SearchIllustration";
import LinkWebsitesIllustration from "./illustrations/LinkWebsitesIllustration";
import ToggleBlocksIllustration from "./illustrations/ToggleBlocksIllustration";

export const metadata: Metadata = {
  title: "Napkin Notes | Side-panel notes for your browser",
  description:
    "The fastest way to jot something down without leaving your browser. A Chrome side-panel notepad with rich text, multiple notes, autosave. Free, no accounts, no cloud. Works on Chrome, Arc, Edge, Brave, and Dia.",
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
    canonical: "https://raunaqbansal.com/napkin",
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
    operatingSystem: "Chrome, Edge, Arc, Brave, Dia",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A Chrome side-panel notepad for quick notes without leaving your browser. Rich text, multiple notes, autosave.",
    url: "https://raunaqbansal.com/napkin",
    author: {
      "@type": "Person",
      name: "Ron Bansal",
    },
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-[var(--font-figtree)] scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/napkin-logo.png"
            alt="Napkin Notes icon"
            width={32}
            height={32}
            className=""
          />
          <span className="text-lg font-semibold tracking-tight">
            Napkin Notes
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-[#1a1a1a]/45">
          <a href="#features" className="hover:text-[#1a1a1a]/80 transition-colors">Features</a>
          <a href="#use-cases" className="hover:text-[#1a1a1a]/80 transition-colors">Use cases</a>
          <a href="#pro" className="hover:text-[#1a1a1a]/80 transition-colors">Pro</a>
          <a href="#faq" className="hover:text-[#1a1a1a]/80 transition-colors">FAQs</a>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-md bg-[#1a1a1a] text-white text-[13px] font-medium hover:bg-[#333] transition-colors"
          >
            Download
          </a>
        </div>
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
          <div className="mt-7">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.819 7.533l-3.954 6.848A12.012 12.012 0 0 0 24 12c0-1.56-.3-3.05-.847-4.417zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
              Add to Chrome, Free
            </a>
            <p className="text-xs text-[#1a1a1a]/30 mt-2.5">
              Works on Chrome, Edge, Arc, Brave, Dia, Opera, and more
            </p>
          </div>
        </div>
        <HeroSidePanel />
      </section>

      {/* Core value — 3 essential points */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">
          Never lose a fleeting idea again.
        </h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <div className="mb-5">
              <SidePanelIllustration />
            </div>
            <h3 className="font-semibold text-[17px] mb-2">Always beside your page</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Opens in the browser&apos;s side panel, right alongside whatever
              you&apos;re reading. No new tab, no window juggling.
            </p>
          </div>
          <div>
            <div className="mb-5">
              <RichTextIllustration />
            </div>
            <h3 className="font-semibold text-[17px] mb-2">Rich text, zero setup</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Bold, lists, links, images. Use markdown shortcuts or select and
              format. No accounts, no configuration. Install and start writing.
            </p>
          </div>
          <div>
            <div className="mb-5">
              <LocalPrivateIllustration />
            </div>
            <h3 className="font-semibold text-[17px] mb-2">Local and private</h3>
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed">
              Your notes stay on your machine. No cloud, no server, no tracking.
              Autosaved to Chrome&apos;s built-in storage.
            </p>
          </div>
        </div>
      </section>

      {/* v3 — tabbed showcase */}
      <section id="features" className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3] scroll-mt-16">
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
          just get a lot more. Free forever.
        </p>
        <V3Showcase />
      </section>

      {/* Who it's for — carousel */}
      <section id="use-cases" className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3] scroll-mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
          For anyone who thinks faster than they can context-switch.
        </h2>
        <p className="text-[#1a1a1a]/40 text-base mb-10 max-w-lg">
          Not a second brain, not a knowledge base. A note pad that&apos;s always a click away.
        </p>
        <UseCaseCarousel />
      </section>

      {/* Pro - entire section dark grid bg */}
      <section id="pro" className="border-t border-[#e5e5e3] bg-[#1a1a1a] relative overflow-hidden scroll-mt-16">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "160px 160px",
          }}
        />
        <div className="relative z-10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
          {/* Header + CTA */}
          <div className="max-w-lg mb-16">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#4DAD75]/15 text-[#4DAD75] mb-5">
              Pro
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.15] mb-4">
              Unlock advanced features
              <br />
              for power users.
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-8">
              Free is perfect for most people. Pro adds extra notes, smart
              linking, quick capture, and tools to keep longer notes tidy.
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

          {/* Main benefit: More notes than you need - full width */}
          <div className="mb-14">
            <ProNoteCards />
            <h3 className="font-semibold text-[18px] mb-2 text-white mt-6">More notes than you need</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-lg">
              Napkin Notes intentionally limits how many notes you can create so
              they don&apos;t turn into clutter. Pro users can create up to 10 notes
              to organise ideas across every context. You can&apos;t reorder them,
              because the point is to stay fast, not to manage a system.
            </p>
          </div>

          {/* 4 additional Pro features */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
            <div>
              <div className="mb-4">
                <QuickCaptureIllustration />
              </div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Quick capture</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Select any text on a page and send it to your note in one click.
                The source URL is saved with it so you can always find where it came from.
              </p>
            </div>
            <div>
              <div className="mb-4">
                <SearchIllustration />
              </div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Search across all notes</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                See every note at a glance. Search across all of them to surface
                that snippet you saved three weeks ago.
              </p>
            </div>
            <div>
              <div className="mb-4">
                <LinkWebsitesIllustration />
              </div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Link websites to notes</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Open Napkin on linear.app and it jumps straight to your Work note.
                On github.com, Side Project. The right context, automatically.
              </p>
            </div>
            <div>
              <div className="mb-4">
                <ToggleBlocksIllustration />
              </div>
              <h3 className="font-semibold text-[16px] mb-2 text-white">Collapsible toggle blocks</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Tuck away content you don&apos;t need right now. Toggle blocks keep
                long notes tidy without losing anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-20 max-w-6xl mx-auto border-t border-[#e5e5e3] scroll-mt-16">
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

      {/* Bottom CTA + Footer - shared dark green grid */}
      <footer className="border-t border-[#e5e5e3] relative overflow-hidden bg-[#1a3a28]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(77,173,117,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(77,173,117,0.07) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(77,173,117,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(77,173,117,0.14) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
        <div className="relative z-10 px-6 md:px-12 pt-20 pb-10 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-white">
              Get the new Napkin Notes today
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
              Free to use, takes two seconds to start taking notes. Always have a place for your fleeting ideas
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#1a1a1a] text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.819 7.533l-3.954 6.848A12.012 12.012 0 0 0 24 12c0-1.56-.3-3.05-.847-4.417zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
              Add to Chrome, Free
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/napkin-logo.png"
                alt="Napkin Notes icon"
                width={24}
                height={24}
                className=""
              />
              <span className="text-xs text-white/50">
                Made by{" "}
                <Link
                  href="/"
                  className="underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  Raunaq B
                </Link>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <Link
                href="/napkin/privacy"
                className="hover:text-white/80 transition-colors"
              >
                Privacy
              </Link>
              <a
                href="mailto:hello@raunaqbansal.com"
                className="hover:text-white/80 transition-colors"
              >
                Contact
              </a>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                Chrome Web Store
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
