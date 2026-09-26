"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Where are my notes stored?",
    a: "Locally in your browser, using Chrome's built-in storage. Nothing is sent to any server. There is no backend.",
  },
  {
    q: "Is Napkin Notes free?",
    a: "Yes. The free version includes two notes, rich text editing, split view, and works on Chrome, Arc, and other Chromium browsers. Pro adds more notes and power-user features for a one-time $9.99.",
  },
  {
    q: "Does it work on Arc, Edge, or Brave?",
    a: "Yes. Chrome and Edge support the native side panel. For Arc and other browsers, Napkin Notes uses an overlay mode that works the same way — no setup needed.",
  },
  {
    q: "Can I export my notes?",
    a: "Not yet, it's on the roadmap. For now you can copy and paste from the full-page view.",
  },
  {
    q: "What happens if I uninstall the extension?",
    a: "Your notes are stored locally and removed with the extension. If you reinstall, you start fresh.",
  },
  {
    q: "Does it work on Firefox or Safari?",
    a: "Not currently. Napkin Notes is built on Chrome extension APIs and works with Chromium-based browsers only.",
  },
  {
    q: "Can I sync notes between devices?",
    a: "Not right now. Notes are local to each browser profile. Cross-device sync is something we're considering for the future.",
  },
  {
    q: "How is this different from Google Keep or Notion?",
    a: "Napkin Notes isn't a note-taking app, it's a scratch pad. No accounts, no folders, no databases. It opens in your browser's side panel so you never leave the page you're on. Built for speed, not organisation.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-[#e5e5e3]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="font-medium text-[15px] text-[#1a1a1a] pr-8 group-hover:text-[#1a1a1a]/80 transition-colors">
              {faq.q}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`shrink-0 text-[#1a1a1a]/25 transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-40 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed pr-12">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
