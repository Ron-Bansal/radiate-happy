import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy | Napkin Notes",
  description: "How Napkin Notes handles your data. Short version: it doesn't leave your browser.",
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] font-[var(--font-figtree)]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-3xl mx-auto">
        <Link href="/napkin-notes" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/napkin-notes-square.webp"
            alt="Napkin Notes icon"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-base font-semibold tracking-tight">Napkin Notes</span>
        </Link>
      </nav>

      <article className="px-6 md:px-12 pt-12 pb-24 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Privacy</h1>
        <p className="text-sm text-[#1a1a1a]/40 mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-[15px] text-[#1a1a1a]/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">The short version</h2>
            <p>
              Napkin Notes does not collect, transmit, or store your data outside of your browser. Your notes live
              in <code className="text-xs bg-[#f0f0ee] px-1.5 py-0.5 rounded">chrome.storage.local</code> and
              never leave your machine.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Data storage</h2>
            <p>
              All note content, settings, and preferences are stored locally using Chrome&apos;s built-in storage
              API. This data stays on your device and is tied to your browser profile. Uninstalling the extension
              removes all stored data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Network requests</h2>
            <p>
              The extension does not make network requests to any server we operate. It has no backend. The only
              external communication is with ExtensionPay for processing Pro tier purchases, which is handled
              entirely by their service and does not involve your note content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Analytics</h2>
            <p>
              Anonymous, privacy-respecting analytics (page views only) may be used to understand general usage
              patterns. No personal data, note content, or browsing history is involved.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Permissions</h2>
            <p>
              Napkin Notes requests only the permissions necessary for its functionality: access to the side panel
              API, storage for saving your notes, and (for overlay mode) the ability to inject an iframe on the
              current page. It does not read or modify page content unless you use the Quick Capture feature, which
              only acts on text you explicitly select.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Contact</h2>
            <p>
              Questions about privacy? Reach out at{" "}
              <a
                href="mailto:hello@raunaqbansal.com"
                className="underline underline-offset-2 text-[#1a1a1a] hover:text-[#4DAD75] transition-colors"
              >
                hello@raunaqbansal.com
              </a>
            </p>
          </section>
        </div>
      </article>

      <footer className="px-6 md:px-12 py-8 max-w-3xl mx-auto border-t border-[#e5e5e3] flex flex-wrap items-center justify-between gap-4 text-xs text-[#1a1a1a]/35">
        <Link href="/napkin-notes" className="underline underline-offset-2 hover:text-[#1a1a1a]/60 transition-colors">
          &larr; Back to Napkin Notes
        </Link>
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a]/60 transition-colors">
          Chrome Web Store
        </a>
      </footer>
    </main>
  );
}
