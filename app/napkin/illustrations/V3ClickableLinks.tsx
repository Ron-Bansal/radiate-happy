"use client";
import { useState, useEffect } from "react";

export default function V3ClickableLinks() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHovered(p => !p), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="w-full bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-visible relative">
        <div className="px-4 py-4 space-y-[6px]">
          <div className="h-[5px] bg-[#1a1a1a]/[0.1] rounded w-[40%] mb-2" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[85%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.05] rounded w-[52%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[73%]" />
          <div className="h-2" />
          {/* Link with real URL */}
          <div className="relative">
            <div className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ${hovered ? "opacity-100" : "opacity-80"}`}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4DAD75" strokeWidth="2.5" className="shrink-0 opacity-50">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
              </svg>
              <span className={`text-[8px] underline transition-colors duration-300 ${hovered ? "text-[#4DAD75]" : "text-[#4DAD75]/60"}`}>
                docs.google.com/d/1xR4kQ
              </span>
            </div>
            {/* Cursor pointer */}
            <div className={`absolute top-[-2px] left-[55%] transition-all duration-500 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              <svg width="12" height="15" viewBox="0 0 12 16" fill="none" className="drop-shadow-sm">
                <path d="M1 1v11l3.5-3.5L7 14l2-1-2.5-5.5H11L1 1z" fill="#1a1a1a" stroke="white" strokeWidth="1" />
              </svg>
            </div>
            {/* Preview tooltip */}
            <div className={`absolute -top-10 left-0 z-10 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>
              <div className="bg-[#2a2a2a] rounded px-2.5 py-2 shadow-lg border border-white/[0.1]">
                <div className="text-[7px] text-white/70 font-medium">Q4 Planning Doc</div>
                <div className="text-[5.5px] text-white/30 mt-0.5">docs.google.com/d/1xR4kQ...</div>
              </div>
            </div>
          </div>
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[68%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.05] rounded w-[44%]" />
          <div className="h-2" />
          {/* Another link */}
          <div className="flex items-center gap-1 cursor-pointer">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4DAD75" strokeWidth="2.5" className="shrink-0 opacity-30">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
            </svg>
            <span className="text-[8px] text-[#4DAD75]/40 underline">github.com/ron/napkin-notes</span>
          </div>
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[57%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.04] rounded w-[80%]" />
        </div>
      </div>
    </div>
  );
}
