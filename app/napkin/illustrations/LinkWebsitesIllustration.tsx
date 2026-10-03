"use client";
import { useState, useEffect } from "react";

const sites = [
  { url: "linear.app", note: "Work", num: 2 },
  { url: "github.com", note: "Side Project", num: 4 },
  { url: "britannica.com", note: "Biology Notes", num: 5 },
];

export default function LinkWebsitesIllustration() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(p => (p + 1) % sites.length), 2500);
    return () => clearInterval(interval);
  }, []);

  const site = sites[active];

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative">
      <div className="flex h-full">
        {/* Browser side */}
        <div className="flex-1 p-3 md:p-4 flex flex-col">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
            </div>
            <div className="bg-white/[0.04] rounded h-3.5 flex-1 max-w-[120px] flex items-center px-1.5">
              <span className="text-[6px] text-white/25 font-mono transition-all duration-300" key={active}>
                {site.url}
              </span>
            </div>
          </div>
          <div className="space-y-[5px] flex-1">
            <div className="h-[4px] bg-white/[0.06] rounded w-1/2" />
            <div className="h-2" />
            <div className="h-[3px] bg-white/[0.05] rounded w-full" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[85%]" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[90%]" />
            <div className="h-[3px] bg-white/[0.05] rounded w-3/4" />
            <div className="h-2" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[80%]" />
            <div className="h-[3px] bg-white/[0.05] rounded w-2/3" />
          </div>
        </div>

        {/* Side panel */}
        <div className="w-[40%] bg-[#F5F6F7] border-l border-white/[0.06] flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
            </div>
            <span className="text-[5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          </div>
          {/* Tab bar showing active note */}
          <div className="px-1.5 pb-1">
            <div className="flex gap-0.5 bg-[#ECEEF0] rounded-full px-0.5 py-0.5 overflow-hidden">
              <div className="bg-white rounded-full px-1.5 py-0.5 shadow-sm shrink-0">
                <span className="text-[5px] font-medium text-[#4DAD75] transition-all duration-300" key={active}>
                  {site.num} {site.note}
                </span>
              </div>
            </div>
          </div>
          {/* Note content */}
          <div className="flex-1 mx-1.5 mb-1 bg-white rounded p-2 space-y-1" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.25)" }}>
            <div className="text-[5px] font-semibold text-[#1a1a1a]/50" key={`h-${active}`}>{site.note} notes</div>
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-4/5" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/5" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-full" />
            <div className="h-1" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
          </div>
          {/* Linked badge at bottom */}
          <div className="px-2 py-1 flex items-center gap-1">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#4DAD75]/50">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
            </svg>
            <span className="text-[5px] text-[#1a1a1a]/30 transition-all duration-300" key={`link-${active}`}>
              Linked &middot; {site.url}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
