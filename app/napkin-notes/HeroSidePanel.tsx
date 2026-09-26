"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroSidePanel() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { name: "Personal", color: "#4DAD75" },
    { name: "Work", color: "#4DAD75" },
    { name: "3", color: undefined },
  ];

  const placeholders = [
    "Start typing your thoughts...",
    "Meeting notes, action items...",
    "Quick scratch pad...",
  ];

  return (
    <div className="relative w-full h-[480px] md:h-[520px] rounded-xl overflow-hidden border border-[#2a2a2a]/20">
      {/* Left side - fake browser content with grid */}
      <div className="absolute inset-0 bg-[#1e1e1e]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Fake browser chrome */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-white/[0.06] rounded-md h-7 max-w-xs mx-auto flex items-center px-3">
              <span className="text-[11px] text-white/25 font-mono">
                your-workflow.app
              </span>
            </div>
          </div>
        </div>
        {/* Fake page content */}
        <div className="relative z-10 p-8 space-y-4 max-w-[55%]">
          <div className="h-3 bg-white/[0.04] rounded w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded w-1/2" />
          <div className="h-3 bg-white/[0.04] rounded w-5/6" />
          <div className="mt-8 h-3 bg-white/[0.04] rounded w-2/3" />
          <div className="h-3 bg-white/[0.04] rounded w-3/5" />
        </div>
      </div>

      {/* Side panel - slides in */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[55%] md:w-[45%] bg-white border-l border-[#e5e5e3] z-20 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Panel header */}
        <div className="px-4 py-3 border-b border-[#f0f0ee]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#4DAD75]">N</span>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-[#1a1a1a] leading-tight">
                Napkin Notes
              </div>
              <div className="text-[9px] text-[#1a1a1a]/35 leading-tight">
                quickest canvas for thought
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 px-3 py-2 border-b border-[#f0f0ee]">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1 text-[11px] rounded-md transition-all ${
                activeTab === i
                  ? "bg-[#4DAD75]/10 text-[#4DAD75] font-medium"
                  : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Editor area */}
        <div className="flex-1 p-4 overflow-hidden">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="w-full h-full text-[13px] text-[#1a1a1a]/80 leading-relaxed outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a]/25"
            data-placeholder={placeholders[activeTab]}
            spellCheck={false}
          />
        </div>

        {/* Status bar */}
        <div className="px-4 py-2 border-t border-[#f0f0ee] flex items-center justify-end">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4DAD75]" />
            <span className="text-[9px] text-[#1a1a1a]/30">Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
