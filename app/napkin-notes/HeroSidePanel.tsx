"use client";
import { useEffect, useRef, useState } from "react";

const taskNotes = [
  { text: "Reply to Alex about the timeline", done: true },
  { text: "Review PR #47 — auth refactor", done: true },
  { text: "Draft copy for onboarding flow", done: false },
  { text: "Book dentist appointment", done: false },
  { text: "Read through Q3 retro notes", done: false },
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
    if (!panelOpen || activeTab !== 0) return;
    if (animDone) return;
    setTypedCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > taskNotes.length) {
        clearInterval(interval);
        setAnimDone(true);
        return;
      }
      setTypedCount(count);
    }, 500);
    return () => clearInterval(interval);
  }, [panelOpen, activeTab, animDone]);

  const tabs = [
    { num: 1, name: "Personal" },
    { num: 2, name: "Work" },
    { num: 3, name: null },
  ];

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
        {/* Browser chrome */}
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
          {/* Extension icon area — top right */}
          {!panelOpen && (
            <div className="flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
              <button
                onClick={() => setPanelOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 border border-white/[0.08] hover:bg-white/15 transition-all group"
              >
                <div className="w-4 h-4 rounded bg-[#4DAD75]/20 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-[#4DAD75]">N</span>
                </div>
              </button>
              <button
                onClick={() => setPanelOpen(true)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-[#4DAD75]/10 border border-[#4DAD75]/15 hover:bg-[#4DAD75]/20 transition-all text-[10px] text-[#4DAD75]/80 font-medium"
              >
                <span>⌥</span>
                <span>X</span>
              </button>
            </div>
          )}
        </div>
        {/* Fake page content */}
        <div className="relative z-10 p-8 space-y-4 max-w-[50%]">
          <div className="h-3 bg-white/[0.04] rounded w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded w-1/2" />
          <div className="h-3 bg-white/[0.04] rounded w-5/6" />
          <div className="mt-8 h-3 bg-white/[0.04] rounded w-2/3" />
          <div className="h-3 bg-white/[0.04] rounded w-3/5" />
        </div>
      </div>

      {/* Close tab — vertical tab on the left edge of the panel */}
      {panelOpen && (
        <button
          onClick={() => setPanelOpen(false)}
          className="absolute z-30 top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            right: panelOpen ? "calc(58% - 14px)" : "-28px",
          }}
        >
          <div className="w-[14px] h-[72px] md:w-[14px] md:h-[80px] bg-[#e8e8e6] hover:bg-[#ddd] rounded-l-md flex items-center justify-center transition-colors cursor-pointer border-r-0 border border-[#d5d5d3]">
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              className="text-[#1a1a1a]/30"
            >
              <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      )}

      {/* Side panel */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[58%] md:w-[46%] bg-[#f5f5f4] border-l border-[#d5d5d3] z-20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: panelOpen ? "translateX(0)" : "translateX(calc(100% + 14px))",
          opacity: panelOpen ? 1 : 0,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-white border-b border-[#e8e8e6]">
          <div className="flex items-center gap-2.5">
            <div className="w-[24px] h-[24px] rounded-md bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#4DAD75]">N</span>
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
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1a1a1a]/25 hover:bg-[#f0f0ee] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1a1a1a]/25 hover:bg-[#f0f0ee] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pill tabs — matching real extension UI */}
        <div className="flex items-center px-3 py-2 bg-white border-b border-[#e8e8e6] gap-1">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`transition-all text-[12px] leading-none ${
                activeTab === i
                  ? "bg-[#f0f0ee] rounded-full px-3 py-1.5 flex items-center gap-1.5"
                  : "px-2 py-1.5 text-[#1a1a1a]/35 hover:text-[#1a1a1a]/55"
              }`}
            >
              <span
                className={
                  activeTab === i
                    ? "font-semibold text-[#4DAD75]"
                    : ""
                }
              >
                {tab.num}
              </span>
              {activeTab === i && tab.name && (
                <span className="font-medium text-[#1a1a1a]/80">
                  {tab.name}
                </span>
              )}
              {activeTab !== i && tab.name && (
                <span className="sr-only">{tab.name}</span>
              )}
            </button>
          ))}
          <button className="px-2 py-1.5 text-[12px] text-[#4DAD75]/60 hover:text-[#4DAD75] transition-colors">
            +
          </button>
          <div className="ml-auto flex items-center gap-0 text-[#1a1a1a]/20">
            <button className="w-5 h-5 flex items-center justify-center hover:text-[#1a1a1a]/40 transition-colors text-[11px]">
              &lsaquo;
            </button>
            <button className="w-5 h-5 flex items-center justify-center hover:text-[#1a1a1a]/40 transition-colors text-[11px]">
              &rsaquo;
            </button>
          </div>
        </div>

        {/* Editor area — grey inset, white editor with green outline */}
        <div className="flex-1 p-3 bg-[#eeede9] overflow-hidden">
          <div className="w-full h-full bg-white rounded-lg shadow-[0_0_0_1.5px_rgba(77,173,117,0.3)] overflow-hidden">
            {activeTab === 0 ? (
              <div
                ref={editorRef}
                contentEditable={animDone}
                suppressContentEditableWarning
                className="w-full h-full p-3.5 text-[12px] text-[#1a1a1a]/80 leading-[1.8] outline-none font-[var(--font-figtree)]"
              >
                <div className="font-medium text-[#1a1a1a]/90 mb-1">Daily tasks</div>
                {taskNotes.slice(0, animDone ? taskNotes.length : typedCount).map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 animate-[fadeSlide_0.3s_ease-out]"
                  >
                    <span className="mt-[2px] text-[10px]">
                      {task.done ? "☑" : "☐"}
                    </span>
                    <span className={task.done ? "line-through text-[#1a1a1a]/30" : ""}>
                      {task.text}
                    </span>
                  </div>
                ))}
                {!animDone && typedCount > 0 && (
                  <span className="inline-block w-[2px] h-[13px] bg-[#4DAD75]/50 animate-pulse ml-0.5 align-text-bottom" />
                )}
              </div>
            ) : (
              <div
                contentEditable
                suppressContentEditableWarning
                className="w-full h-full p-3.5 text-[12px] text-[#1a1a1a]/80 leading-[1.8] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a]/20"
                data-placeholder={activeTab === 1 ? "Sprint planning notes..." : "Quick scratch pad..."}
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="px-3.5 py-1.5 bg-[#eeede9] border-t border-[#e0dfdb] flex items-center justify-end gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-[5px] h-[5px] rounded-full bg-[#4DAD75]" />
            <span className="text-[9px] text-[#1a1a1a]/30">Saved</span>
          </div>
          <span className="text-[9px] text-[#1a1a1a]/20">
            {activeTab === 0
              ? `${taskNotes.map((t) => t.text).join(" ").split(" ").length} words`
              : "0 words"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
