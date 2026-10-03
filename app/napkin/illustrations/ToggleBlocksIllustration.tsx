"use client";
import { useState, useEffect } from "react";

export default function ToggleBlocksIllustration() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen1(p => !p);
      setTimeout(() => setOpen2(p => !p), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative flex items-center justify-center p-4 md:p-6">
      {/* Note card */}
      <div className="w-full max-w-[280px] bg-[#F5F6F7] rounded-lg border border-[#1a1a1a]/[0.04] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#1a1a1a]/[0.04]">
          <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[7px] font-semibold text-[#1a1a1a]/60">Research Project</span>
        </div>

        <div className="p-3 space-y-2">
          {/* Regular content */}
          <div className="space-y-1">
            <div className="h-[3px] bg-[#1a1a1a]/[0.07] rounded w-3/4" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.07] rounded w-1/2" />
          </div>

          {/* Toggle block 1 */}
          <div className="rounded-md border border-[#1a1a1a]/[0.06] bg-white overflow-hidden">
            <button
              onClick={() => setOpen1(p => !p)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#1a1a1a]/[0.02] transition-colors"
            >
              <svg
                width="7"
                height="7"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-300 ${open1 ? "rotate-90" : ""}`}
              >
                <path d="M3.5 2 L7 5 L3.5 8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" />
              </svg>
              <span className="text-[6px] font-medium text-[#1a1a1a]/50">Meeting notes (Oct 2)</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open1 ? "max-h-24" : "max-h-0"}`}>
              <div className="px-2 pb-2 pt-0 pl-5 space-y-1 border-t border-[#1a1a1a]/[0.04]">
                <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[90%] mt-1.5" />
                <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-3/4" />
                <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[85%]" />
              </div>
            </div>
          </div>

          {/* Toggle block 2 */}
          <div className="rounded-md border border-[#1a1a1a]/[0.06] bg-white overflow-hidden">
            <button
              onClick={() => setOpen2(p => !p)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#1a1a1a]/[0.02] transition-colors"
            >
              <svg
                width="7"
                height="7"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-300 ${open2 ? "rotate-90" : ""}`}
              >
                <path d="M3.5 2 L7 5 L3.5 8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" />
              </svg>
              <span className="text-[6px] font-medium text-[#1a1a1a]/50">References & links</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open2 ? "max-h-24" : "max-h-0"}`}>
              <div className="px-2 pb-2 pt-0 pl-5 space-y-1 border-t border-[#1a1a1a]/[0.04]">
                <div className="h-[3px] bg-[#4DAD75]/15 rounded w-[70%] mt-1.5" />
                <div className="h-[3px] bg-[#4DAD75]/15 rounded w-[60%]" />
                <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[80%]" />
              </div>
            </div>
          </div>

          {/* More content below */}
          <div className="space-y-1 pt-0.5">
            <div className="h-[3px] bg-[#1a1a1a]/[0.07] rounded w-2/3" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.07] rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
