"use client";
import { useState, useEffect } from "react";

const sites = [
  {
    url: "linear.app/team/sprint",
    note: "Work",
    num: 2,
    heading: "Sprint standup",
    pageBg: "#1e1e1e",
    pageHeading: "Sprint 14 — Active",
    noteLines: [80, 55, 70],
    hasImg: false,
  },
  {
    url: "github.com/repo/pulls",
    note: "Side Project",
    num: 4,
    heading: "Auth flow TODO",
    pageBg: "#161b22",
    pageHeading: "Pull requests (3)",
    noteLines: [65, 90, 50],
    hasImg: true,
  },
  {
    url: "scholar.google.com",
    note: "Research",
    num: 5,
    heading: "Literature review",
    pageBg: "#f8f9fa",
    pageHeading: "Results for: neural...",
    noteLines: [75, 60, 85],
    hasImg: false,
  },
];

export default function LinkWebsitesIllustration() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActive(p => (p + 1) % sites.length);
        setTransitioning(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const site = sites[active];
  const lightPage = site.pageBg === "#f8f9fa";

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative">
      <div className="flex h-full">
        {/* Browser */}
        <div className="flex-1 flex flex-col transition-colors duration-400" style={{ backgroundColor: site.pageBg }}>
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b" style={{ borderColor: lightPage ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}>
            <div className="flex gap-0.5">
              <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }} />
              <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }} />
              <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }} />
            </div>
            <div className="rounded h-3 flex-1 max-w-[110px] flex items-center px-1.5 overflow-hidden" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)" }}>
              <span className={`text-[5px] font-mono whitespace-nowrap transition-all duration-400 ${transitioning ? "opacity-0 -translate-y-1" : "opacity-100"}`} style={{ color: lightPage ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.25)" }}>
                {site.url}
              </span>
            </div>
          </div>
          {/* Page content */}
          <div className={`flex-1 p-3 transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
            {/* Page heading */}
            <div className="h-[4px] rounded w-[50%] mb-2" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)" }} />
            <div className="space-y-[4px]">
              {site.noteLines.map((w, i) => (
                <div key={i} className="h-[3px] rounded" style={{ width: `${w + i * 5}%`, backgroundColor: lightPage ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)" }} />
              ))}
              {site.hasImg && (
                <div className="w-[60%] h-5 rounded mt-1" style={{ backgroundColor: lightPage ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)" }} />
              )}
              <div className="h-1" />
              {site.noteLines.slice(0, 2).map((w, i) => (
                <div key={`b${i}`} className="h-[3px] rounded" style={{ width: `${90 - w + 30}%`, backgroundColor: lightPage ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-[40%] bg-[#F5F6F7] border-l border-white/[0.06] flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1">
            <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[3.5px] font-bold text-[#4DAD75]">N</span>
            </div>
            <span className="text-[5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          </div>
          {/* Tab */}
          <div className="px-1.5 pb-0.5">
            <div className="inline-flex items-center bg-[#ECEEF0] rounded-[3px] h-[8px] overflow-hidden">
              <div className={`bg-white rounded-[3px] h-full flex items-center px-1 shadow-[0_0.5px_1px_rgba(0,0,0,0.06)] transition-all duration-400 ${transitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
                <span className="text-[3.5px] leading-none font-medium text-[#1a1a1a]/70 whitespace-nowrap">
                  <span className="text-[#4DAD75] font-semibold">{site.num}</span> {site.note}
                </span>
              </div>
            </div>
          </div>
          {/* Note */}
          <div className={`flex-1 mx-1.5 mb-1 bg-white rounded p-1.5 space-y-[3px] transition-all duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`} style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.25)" }}>
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">{site.heading}</div>
            {site.noteLines.map((w, i) => (
              <div key={i} className="h-[2px] bg-[#1a1a1a]/[0.06] rounded" style={{ width: `${w}%` }} />
            ))}
            <div className="h-0.5" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-3/5" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
          </div>
          {/* Linked badge */}
          <div className="px-1.5 py-1 flex items-center gap-1">
            <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#4DAD75]/50 shrink-0">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
            </svg>
            <span className={`text-[4px] text-[#1a1a1a]/30 whitespace-nowrap transition-all duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
              Linked &middot; {site.url.split("/")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
