"use client";
import { useState, useEffect } from "react";

export default function QuickCaptureIllustration() {
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaptured(true);
      setTimeout(() => setCaptured(false), 2500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative">
      <div className="flex h-full">
        {/* Web page side */}
        <div className="flex-1 p-3 md:p-4 flex flex-col">
          {/* Fake URL bar */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
            </div>
            <div className="bg-white/[0.04] rounded h-3 flex-1 max-w-[100px] flex items-center px-1.5">
              <span className="text-[5px] text-white/20 font-mono">article.dev/post</span>
            </div>
          </div>

          {/* Article content */}
          <div className="space-y-[5px]">
            <div className="h-[4px] bg-white/[0.06] rounded w-2/3" />
            <div className="h-2" />
            <div className="h-[3px] bg-white/[0.05] rounded w-full" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[90%]" />
            {/* Highlighted text */}
            <div className="relative py-0.5">
              <div className={`h-[3px] rounded w-[85%] transition-colors duration-300 ${captured ? "bg-[#4DAD75]/30" : "bg-[#4DAD75]/20"}`} />
            </div>
            <div className="relative py-0.5">
              <div className={`h-[3px] rounded w-[70%] transition-colors duration-300 ${captured ? "bg-[#4DAD75]/30" : "bg-[#4DAD75]/20"}`} />
            </div>
            <div className="h-[3px] bg-white/[0.05] rounded w-[80%]" />
            <div className="h-[3px] bg-white/[0.05] rounded w-full" />
            <div className="h-[3px] bg-white/[0.05] rounded w-3/4" />
          </div>
        </div>

        {/* Arrow / connection line */}
        <div className="flex items-center">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="shrink-0">
            <path
              d="M4 10 H20"
              stroke="#4DAD75"
              strokeWidth="1"
              strokeOpacity={captured ? 0.5 : 0.15}
              strokeDasharray="2 2"
              className="transition-all duration-300"
            />
            <path
              d="M18 6 L22 10 L18 14"
              stroke="#4DAD75"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={captured ? 0.5 : 0.15}
              className="transition-all duration-300"
              fill="none"
            />
          </svg>
        </div>

        {/* Side panel */}
        <div className="w-[38%] bg-[#F5F6F7] border-l border-white/[0.06] flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
            </div>
            <span className="text-[5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          </div>
          <div className="flex-1 mx-1.5 mb-1.5 bg-white rounded p-2 space-y-1">
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-4/5" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/5" />
            <div className="h-1.5" />
            {/* Captured text appears */}
            <div
              className={`transition-all duration-500 overflow-hidden ${captured ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="border-l-[2px] border-[#4DAD75]/40 pl-1.5 py-0.5 space-y-[3px]">
                <div className="h-[3px] bg-[#4DAD75]/15 rounded w-full" />
                <div className="h-[3px] bg-[#4DAD75]/15 rounded w-4/5" />
              </div>
              <div className="mt-0.5">
                <span className="text-[4px] text-[#4DAD75]/50">article.dev/post</span>
              </div>
            </div>
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
