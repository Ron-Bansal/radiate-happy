"use client";
import { useEffect, useRef, useState } from "react";

const personalNotes = [
  { type: "heading", text: "This week" },
  { type: "task", text: "Reply to Alex about timeline", done: true },
  { type: "task", text: "Review onboarding copy", done: true },
  { type: "task", text: "Send invoice to Stripe", done: false },
  { type: "task", text: "Book dentist", done: false },
  { type: "blank" },
  { type: "heading", text: "Ideas" },
  { type: "text", text: "Blog post about side projects" },
  { type: "text", text: "Try that ramen place on King St" },
  { type: "text", text: "Gift for Sam's birthday" },
  { type: "blank" },
  { type: "heading", text: "Links" },
  { type: "link", text: "tiptap.dev/docs" },
  { type: "link", text: "developer.chrome.com/docs/extensions" },
];

export default function HeroSidePanel() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPanelOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!panelOpen || activeTab !== 0 || animDone) return;
    setTypedCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > personalNotes.length) {
        clearInterval(interval);
        setAnimDone(true);
        return;
      }
      setTypedCount(count);
    }, 300);
    return () => clearInterval(interval);
  }, [panelOpen, activeTab, animDone]);

  const tabs = [
    { num: 1, name: "Personal" },
    { num: 2, name: "Work" },
    { num: 3, name: null },
  ];

  const renderLine = (item: (typeof personalNotes)[number], i: number) => {
    if (item.type === "blank") return <div key={i} className="h-3" />;
    if (item.type === "heading")
      return (
        <div key={i} className="font-semibold text-[#1a1a1a]/85 text-[12px] mt-1 mb-0.5">
          {item.text}
        </div>
      );
    if (item.type === "task")
      return (
        <div key={i} className="flex items-start gap-2 text-[11.5px]">
          <span className="mt-[1px] text-[10px]">{item.done ? "☑" : "☐"}</span>
          <span className={item.done ? "line-through text-[#1a1a1a]/25" : "text-[#1a1a1a]/70"}>
            {item.text}
          </span>
        </div>
      );
    if (item.type === "link")
      return (
        <div key={i} className="text-[11.5px] text-[#4DAD75]/80 underline underline-offset-2">
          {item.text}
        </div>
      );
    return (
      <div key={i} className="text-[11.5px] text-[#1a1a1a]/65">
        {item.text}
      </div>
    );
  };

  return (
    <div className="relative w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden border border-[#2a2a2a]/20">
      {/* Browser bg */}
      <div className="absolute inset-0 bg-[#1e1e1e]">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Browser toolbar - solid bg */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 bg-[#1E1E1E] border-b border-white/[0.06]">
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
          {/* Extension icon - always visible */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 border border-white/[0.08] hover:bg-white/15 transition-all"
          >
            <div className="w-4 h-4 rounded bg-[#4DAD75]/20 flex items-center justify-center">
              <span className="text-[7px] font-bold text-[#4DAD75]">N</span>
            </div>
          </button>
        </div>
        {/* Fake page content */}
        <div className="relative z-10 p-8 max-w-[50%]">
          <div className="space-y-4 mb-10">
            <div className="h-3 bg-white/[0.04] rounded w-3/4" />
            <div className="h-3 bg-white/[0.04] rounded w-1/2" />
            <div className="h-3 bg-white/[0.04] rounded w-5/6" />
          </div>
          <div className="space-y-4 mt-10">
            <div className="h-3 bg-white/[0.04] rounded w-2/3" />
            <div className="h-3 bg-white/[0.04] rounded w-3/5" />
          </div>
        </div>

        {/* "Always one click away" - bottom right, below panel, with arrow to toolbar icon */}
        <div
          className="absolute z-10 right-6 flex flex-col items-end gap-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            bottom: "16px",
            opacity: panelOpen ? 0 : 1,
            transform: panelOpen ? "translateY(10px)" : "translateY(0)",
          }}
        >
          {/* Arrow pointing up-right toward toolbar icon */}
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none" className="mr-4 mb-[-4px]">
            <path d="M20 48 C20 30 30 15 35 5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" opacity="0.25" />
            <path d="M32 3 L36 5 L33 9" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" fill="none" />
          </svg>
          <p className="text-white text-[13px] leading-snug font-medium text-right">
            Always one click away<br /><span className="text-white/60">(literally)</span>
          </p>
        </div>

        {/* Shortcut hint - bottom left */}
        {!panelOpen && (
          <button
            onClick={() => setPanelOpen(true)}
            className="absolute bottom-5 left-5 z-30 flex items-center gap-2 animate-[fadeIn_0.5s_ease-out]"
          >
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#4DAD75]/15 border border-[#4DAD75]/20 hover:bg-[#4DAD75]/25 transition-all">
              <span className="text-[10px] text-[#4DAD75] font-medium">⌥X</span>
            </div>
            <span className="text-[10px] text-white/30">to open Napkin Notes</span>
          </button>
        )}
        {panelOpen && (
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.06]">
              <span className="text-[10px] text-white/25 font-medium">⌥X</span>
            </div>
            <span className="text-[10px] text-white/20">to toggle panel</span>
          </div>
        )}
      </div>

      {/* Close tab on left edge of panel - slides in with panel */}
      <div
        className="absolute z-30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
        style={{
          top: "52px",
          right: panelOpen ? "38%" : "-20px",
          opacity: panelOpen ? 1 : 0,
        }}
      >
        <button
          onClick={() => setPanelOpen(false)}
          className="pointer-events-auto hidden md:flex w-[16px] h-[60px] bg-[#F5F6F7] hover:bg-[#e8e9eb] rounded-l-md items-center justify-center transition-colors cursor-pointer border-l border-y border-black/[0.08]"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-[#1a1a1a]/30">
            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Side panel - sits below the toolbar */}
      <div
        className="absolute right-0 bottom-0 w-[50%] md:w-[38%] bg-[#F5F6F7] z-20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          top: "46px",
          transform: panelOpen ? "translateX(0)" : "translateX(calc(100% + 20px))",
          opacity: panelOpen ? 1 : 0,
          borderLeft: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Header - no divider, sleek */}
        <div className="flex items-center justify-between px-3.5 py-2">
          <div className="flex items-center gap-2.5">
            <div className="w-[22px] h-[22px] rounded-md bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#4DAD75]">N</span>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-[#1a1a1a] leading-tight">Napkin Notes</div>
              <div className="text-[8px] text-[#1a1a1a]/30 leading-tight">quickest canvas for thought</div>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1a1a1a]/25 hover:bg-[#1a1a1a]/5 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </div>
        </div>

        {/* Tab row - single pill bg behind all tabs */}
        <div className="px-3 py-1.5">
          <div className="flex items-center bg-[#ECEEF0] rounded-full px-1 py-1 gap-0.5">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`transition-all text-[11px] leading-none rounded-full px-2.5 py-1.5 flex items-center gap-1 ${
                  activeTab === i
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/40"
                }`}
              >
                <span className={activeTab === i ? "font-semibold text-[#4DAD75]" : "text-[#1a1a1a]/40"}>
                  {tab.num}
                </span>
                {tab.name && (
                  <span className={activeTab === i ? "font-medium text-[#1a1a1a]/80" : "text-[#1a1a1a]/35"}>
                    {tab.name}
                  </span>
                )}
              </button>
            ))}
            <button className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-[11px] text-[#4DAD75] ml-0.5 hover:bg-white/90 transition-colors">
              +
            </button>
            <div className="ml-auto flex items-center gap-0.5 pr-1">
              <button className="w-5 h-5 flex items-center justify-center text-[#1a1a1a]/30 hover:text-[#1a1a1a]/50 transition-colors text-[12px]">
                &lsaquo;
              </button>
              <button className="w-5 h-5 flex items-center justify-center text-[#1a1a1a]/30 hover:text-[#1a1a1a]/50 transition-colors text-[12px]">
                &rsaquo;
              </button>
            </div>
          </div>
        </div>

        {/* Editor - increased height */}
        <div className="flex-1 px-3 pb-1.5 pt-1 overflow-hidden">
          <div
            className="w-full h-full bg-white rounded-lg overflow-hidden"
            style={{ boxShadow: "0 0 0 2px rgba(77,173,117,0.3)" }}
          >
            {activeTab === 0 ? (
              <div
                ref={editorRef}
                contentEditable={animDone}
                suppressContentEditableWarning
                className="w-full h-full p-3.5 outline-none font-[var(--font-figtree)] leading-[1.7] overflow-y-auto"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {personalNotes.slice(0, animDone ? personalNotes.length : typedCount).map((item, i) =>
                  renderLine(item, i)
                )}
                {!animDone && typedCount > 0 && (
                  <span className="inline-block w-[2px] h-[12px] bg-[#4DAD75]/50 animate-pulse ml-0.5 align-text-bottom" />
                )}
              </div>
            ) : (
              <div
                contentEditable
                suppressContentEditableWarning
                className="w-full h-full p-3.5 text-[12px] text-[#1a1a1a]/75 leading-[1.7] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a]/20"
                data-placeholder={activeTab === 1 ? "Sprint planning notes..." : "Quick scratch pad..."}
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Footer - sleek, no divider */}
        <div className="px-3.5 py-1.5 flex items-center justify-end gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-[5px] h-[5px] rounded-full bg-[#4DAD75]" />
            <span className="text-[9px] text-[#1a1a1a]/30">Autosaved</span>
          </div>
          <span className="text-[9px] text-[#1a1a1a]/20">
            {activeTab === 0 ? `${personalNotes.filter(l => l.type !== "blank").length * 4} words` : "0 words"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
