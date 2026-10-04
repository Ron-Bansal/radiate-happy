"use client";
import { useState, useEffect } from "react";

export default function ToggleBlocksIllustration() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen1(p => !p);
      setTimeout(() => setOpen2(p => !p), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative flex items-center justify-center p-3 md:p-5">
      {/* Side panel */}
      <div className="w-full max-w-[260px] bg-[#F5F6F7] rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5">
          <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[6px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
        </div>
        {/* Tabs */}
        <div className="px-1.5 pb-0.5">
          <div className="inline-flex items-center bg-[#ECEEF0] rounded-[3px] h-[8px]">
            <div className="bg-white rounded-[3px] h-full flex items-center px-1 shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]">
              <span className="text-[3.5px] leading-none font-medium text-[#1a1a1a]/70"><span className="text-[#4DAD75] font-semibold">5</span> Research</span>
            </div>
            <div className="h-full flex items-center px-1">
              <span className="text-[3.5px] leading-none text-[#1a1a1a]/25">6 Work</span>
            </div>
          </div>
        </div>

        {/* Note content with toggles */}
        <div className="mx-1.5 mb-1.5 bg-white rounded p-2 space-y-1.5" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
          <div className="text-[5px] font-semibold text-[#1a1a1a]/50">Literature review</div>
          <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-[85%]" />
          <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-3/5" />

          {/* Toggle 1 */}
          <div className="pt-0.5">
            <button onClick={() => setOpen1(p => !p)} className="flex items-center gap-1 w-full text-left">
              <svg width="5" height="5" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-300 shrink-0 ${open1 ? "rotate-90" : ""}`}>
                <path d="M3.5 2 L7 5 L3.5 8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" />
              </svg>
              <span className="text-[5px] font-medium text-[#1a1a1a]/45">Meeting notes (Oct 2)</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open1 ? "max-h-16" : "max-h-0"}`}>
              <div className="pl-3 pt-1 space-y-[3px]">
                <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[90%]" />
                <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-3/4" />
                <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[80%]" />
              </div>
            </div>
          </div>

          {/* Toggle 2 */}
          <div>
            <button onClick={() => setOpen2(p => !p)} className="flex items-center gap-1 w-full text-left">
              <svg width="5" height="5" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-300 shrink-0 ${open2 ? "rotate-90" : ""}`}>
                <path d="M3.5 2 L7 5 L3.5 8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" />
              </svg>
              <span className="text-[5px] font-medium text-[#1a1a1a]/45">References &amp; links</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open2 ? "max-h-16" : "max-h-0"}`}>
              <div className="pl-3 pt-1 space-y-[3px]">
                <div className="h-[2.5px] bg-[#4DAD75]/15 rounded w-[65%]" />
                <div className="h-[2.5px] bg-[#4DAD75]/15 rounded w-[55%]" />
                <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[75%]" />
              </div>
            </div>
          </div>

          <div className="pt-0.5 space-y-[3px]">
            <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
            <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
