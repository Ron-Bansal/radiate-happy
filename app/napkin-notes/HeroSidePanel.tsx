"use client";
import { useEffect, useRef, useState } from "react";

const personalNotes = [
  "Dinner ideas this week:",
  "• Try that ramen place on King St",
  "• Make pasta from scratch (finally)",
  "",
  "Book recs from Sam:",
  "• Designing Your Life — Burnett",
  "• The Creative Act — Rick Rubin",
];

export default function HeroSidePanel() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [typedLines, setTypedLines] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || activeTab !== 0) return;
    setTypedLines(0);
    let line = 0;
    const interval = setInterval(() => {
      line++;
      if (line > personalNotes.length) {
        clearInterval(interval);
        return;
      }
      setTypedLines(line);
    }, 400);
    return () => clearInterval(interval);
  }, [visible, activeTab]);

  const tabs = [
    { name: "Personal" },
    { name: "Work" },
    { name: "3" },
  ];

  const placeholders = [
    "",
    "Sprint planning notes...",
    "Quick scratch pad...",
  ];

  if (closed) {
    return (
      <div className="relative w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden border border-[#2a2a2a]/20">
        <div className="absolute inset-0 bg-[#1e1e1e]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 mx-8">
              <div className="bg-white/[0.06] rounded-md h-7 max-w-sm mx-auto flex items-center px-3">
                <span className="text-[11px] text-white/25 font-mono">your-workflow.app</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 p-8 space-y-4">
            <div className="h-3 bg-white/[0.04] rounded w-3/4" />
            <div className="h-3 bg-white/[0.04] rounded w-1/2" />
            <div className="h-3 bg-white/[0.04] rounded w-5/6" />
            <div className="mt-8 h-3 bg-white/[0.04] rounded w-2/3" />
            <div className="h-3 bg-white/[0.04] rounded w-3/5" />
          </div>
        </div>
        {/* Reopen button */}
        <button
          onClick={() => setClosed(false)}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-30 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 text-sm hover:bg-white/15 hover:text-white/80 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Open Napkin
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden border border-[#2a2a2a]/20">
      {/* Left side - fake browser content with grid */}
      <div className="absolute inset-0 bg-[#1e1e1e]">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-white/[0.06] rounded-md h-7 max-w-sm mx-auto flex items-center px-3">
              <span className="text-[11px] text-white/25 font-mono">your-workflow.app</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 p-8 space-y-4 max-w-[50%]">
          <div className="h-3 bg-white/[0.04] rounded w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded w-1/2" />
          <div className="h-3 bg-white/[0.04] rounded w-5/6" />
          <div className="mt-8 h-3 bg-white/[0.04] rounded w-2/3" />
          <div className="h-3 bg-white/[0.04] rounded w-3/5" />
        </div>
      </div>

      {/* Side panel */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[58%] md:w-[46%] bg-[#f5f5f4] border-l border-[#d5d5d3] z-20 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header — matches real extension */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-b border-[#e8e8e6]">
          <div className="flex items-center gap-2.5">
            {/* Close button */}
            <button
              onClick={() => setClosed(true)}
              className="w-6 h-6 rounded flex items-center justify-center text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60 hover:bg-[#1a1a1a]/5 transition-all active:scale-90"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] rounded-md bg-[#4DAD75]/15 flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#4DAD75]">N</span>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#1a1a1a] leading-tight">
                  Napkin Notes
                </div>
                <div className="text-[8px] text-[#1a1a1a]/30 leading-tight">
                  quickest canvas for thought
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Open in tab icon */}
            <div className="w-6 h-6 rounded flex items-center justify-center text-[#1a1a1a]/25">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </div>
            {/* Three dot menu */}
            <div className="w-6 h-6 rounded flex items-center justify-center text-[#1a1a1a]/25">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs — numbered with arrows like the real extension */}
        <div className="flex items-center px-2 py-1.5 bg-white border-b border-[#e8e8e6] gap-0">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`relative px-2.5 py-1 text-[11px] rounded-md transition-all ${
                activeTab === i
                  ? "bg-[#4DAD75]/8 text-[#4DAD75] font-medium"
                  : "text-[#1a1a1a]/35 hover:text-[#1a1a1a]/55"
              }`}
            >
              {activeTab === i && i < 2 ? tab.name : (i < 2 ? tab.name : tab.name)}
              {activeTab === i && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[6px] text-[#1a1a1a]/25 bg-[#f0f0ee] leading-none">
                  x
                </span>
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-0.5 text-[#1a1a1a]/20">
            <button className="w-5 h-5 rounded flex items-center justify-center hover:text-[#1a1a1a]/40 transition-colors text-[10px]">&lsaquo;</button>
            <button className="w-5 h-5 rounded flex items-center justify-center hover:text-[#1a1a1a]/40 transition-colors text-[10px]">&rsaquo;</button>
          </div>
        </div>

        {/* Editor area — inset grey bg with green-bordered editor */}
        <div className="flex-1 p-3 bg-[#f0efed] overflow-hidden">
          <div
            className={`w-full h-full bg-white rounded-lg p-3 transition-shadow duration-300 ${
              activeTab === 0 ? "shadow-[0_0_0_1.5px_rgba(77,173,117,0.35)]" : "shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
            }`}
          >
            {activeTab === 0 ? (
              <div className="text-[12px] text-[#1a1a1a]/75 leading-[1.7] font-[var(--font-figtree)]">
                {personalNotes.slice(0, typedLines).map((line, i) => (
                  <div
                    key={i}
                    className="animate-[fadeIn_0.3s_ease-out]"
                    style={{ minHeight: line === "" ? "0.8em" : undefined }}
                  >
                    {line}
                  </div>
                ))}
                {typedLines < personalNotes.length && typedLines > 0 && (
                  <span className="inline-block w-[2px] h-[14px] bg-[#4DAD75]/60 animate-pulse ml-0.5 align-text-bottom" />
                )}
              </div>
            ) : (
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="w-full h-full text-[12px] text-[#1a1a1a]/75 leading-[1.7] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a]/20"
                data-placeholder={placeholders[activeTab]}
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="px-3 py-1.5 bg-[#f0efed] border-t border-[#e5e5e3] flex items-center justify-end gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-[5px] h-[5px] rounded-full bg-[#4DAD75]" />
            <span className="text-[9px] text-[#1a1a1a]/30">Saved</span>
          </div>
          <span className="text-[9px] text-[#1a1a1a]/20">
            {activeTab === 0 ? `${personalNotes.filter(l => l).join(' ').split(' ').length} words` : "0 words"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
