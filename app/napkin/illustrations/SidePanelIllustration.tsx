"use client";
import { useState, useEffect } from "react";

const pages = [
  { url: "notion.so/project", heading: "Project roadmap", bg: "#1e1e1e", lines: [75, 50, 85, 65, 55, 80] },
  { url: "docs.google.com/d/1x", heading: "Q4 Planning doc", bg: "#1a2a3a", lines: [60, 90, 70, 40, 80, 55] },
  { url: "github.com/repo/issues", heading: "Open issues (14)", bg: "#161b22", lines: [80, 45, 70, 90, 55, 60] },
];

export default function SidePanelIllustration() {
  const [page, setPage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setPage(p => (p + 1) % pages.length);
        setTransitioning(false);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const p = pages[page];

  return (
    <div className="aspect-[4/3] rounded-lg bg-[#f0f0ee] overflow-hidden relative">
      <div className="absolute inset-3 md:inset-4 rounded-md shadow-lg overflow-hidden transition-colors duration-300" style={{ backgroundColor: p.bg }}>
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/[0.06]" style={{ backgroundColor: p.bg }}>
          <div className="flex gap-1">
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white/[0.06] rounded h-3.5 max-w-[110px] mx-auto flex items-center px-1.5 overflow-hidden">
              <span className={`text-[5px] text-white/20 font-mono whitespace-nowrap transition-all duration-300 ${transitioning ? "opacity-0 -translate-y-1" : "opacity-100"}`}>{p.url}</span>
            </div>
          </div>
          <div className="w-3.5 h-3.5 rounded bg-[#4DAD75]/20 flex items-center justify-center">
            <span className="text-[4.5px] font-bold text-[#4DAD75]">N</span>
          </div>
        </div>

        <div className="flex h-[calc(100%-24px)]">
          {/* Page content — changes with heading + different layout */}
          <div className={`flex-1 p-2.5 transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
            <div className="h-[4px] bg-white/[0.08] rounded w-[55%] mb-1.5" />
            <div className="space-y-[5px]">
              {p.lines.map((w, i) => (
                <div key={i} className="h-[3px] bg-white/[0.04] rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>

          {/* Side panel — stays pinned */}
          <div className="w-[42%] bg-[#F5F6F7] border-l border-black/[0.06] flex flex-col">
            <div className="flex items-center gap-1 px-1.5 py-1">
              <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
                <span className="text-[3.5px] font-bold text-[#4DAD75]">N</span>
              </div>
              <span className="text-[5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
            </div>
            {/* Tabs */}
            <div className="px-1 pb-0.5">
              <div className="inline-flex items-center bg-[#ECEEF0] rounded-[3px] h-[8px]">
                <div className="bg-white rounded-[3px] h-full flex items-center px-1 shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]">
                  <span className="text-[3.5px] leading-none font-medium text-[#1a1a1a]/70"><span className="text-[#4DAD75] font-semibold">1</span> Personal</span>
                </div>
                <div className="h-full flex items-center px-1">
                  <span className="text-[3.5px] leading-none text-[#1a1a1a]/25">2 Work</span>
                </div>
              </div>
            </div>
            {/* Note */}
            <div className="flex-1 mx-1 mb-1 bg-white rounded p-1.5 space-y-[3px]" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.25)" }}>
              <div className="text-[4px] font-semibold text-[#1a1a1a]/50">This week</div>
              <div className="flex items-center gap-0.5">
                <div className="w-[3px] h-[3px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10" />
                <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-[3px] h-[3px] rounded-sm border border-[#1a1a1a]/10" />
                <div className="h-[2px] bg-[#1a1a1a]/[0.08] rounded w-2/3" />
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-[3px] h-[3px] rounded-sm border border-[#1a1a1a]/10" />
                <div className="h-[2px] bg-[#1a1a1a]/[0.08] rounded w-4/5" />
              </div>
              <div className="h-0.5" />
              <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Ideas</div>
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-5/6" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
