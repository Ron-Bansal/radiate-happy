"use client";
import { useState, useEffect } from "react";

export default function QuickCaptureIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 800);
      setTimeout(() => setStep(2), 2200);
      setTimeout(() => setStep(3), 3200);
      setTimeout(() => setStep(0), 5000);
    };
    run();
    const interval = setInterval(run, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative">
      <div className="flex h-full">
        {/* Web page */}
        <div className="flex-1 p-3 md:p-4 flex flex-col relative">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex gap-0.5">
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
              <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
            </div>
            <div className="bg-white/[0.04] rounded h-3 flex-1 max-w-[90px] flex items-center px-1.5">
              <span className="text-[5px] text-white/20 font-mono">article.dev/post</span>
            </div>
          </div>

          <div className="space-y-[4px]">
            <div className="h-[3.5px] bg-white/[0.06] rounded w-[55%]" />
            <div className="h-1.5" />
            <div className="h-[3px] bg-white/[0.05] rounded w-full" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[90%]" />
            <div className="h-[3px] bg-white/[0.05] rounded w-[80%]" />
            <div className="h-1" />
            {/* Selected text + context menu wrapper */}
            <div className="relative">
              <div className={`h-[3px] rounded w-[85%] transition-all duration-300 ${step >= 1 ? "bg-[#4DAD75]/25" : "bg-white/[0.05]"}`} />
              <div className={`h-[3px] rounded w-[70%] mt-[4px] transition-all duration-300 ${step >= 1 ? "bg-[#4DAD75]/25" : "bg-white/[0.05]"}`} />
              {/* Context menu — anchored directly below highlighted text */}
              <div
                className={`absolute left-0 mt-[3px] z-10 transition-all duration-200 origin-top-left ${
                  step === 1 || step === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-[#2a2a2a] rounded-md border border-white/[0.1] shadow-xl py-0.5 w-[80px]">
                  <div className="px-2 py-[3px] text-[5px] text-white/40">Copy</div>
                  <div className="px-2 py-[3px] text-[5px] text-white/40">Paste</div>
                  <div className="h-px bg-white/[0.06] mx-1" />
                  <div className={`px-2 py-[3px] text-[5px] flex items-center gap-1 rounded-sm mx-0.5 transition-colors duration-300 ${
                    step === 2 ? "bg-[#4DAD75]/15 text-[#4DAD75]" : "text-[#4DAD75]/70"
                  }`}>
                    <span className="text-[4px] font-bold">N</span>
                    Save to Napkin Notes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center px-1">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M2 8 H14" stroke="#4DAD75" strokeWidth="0.8" strokeOpacity={step >= 3 ? 0.4 : 0.1} strokeDasharray="2 2" className="transition-all duration-300" />
            <path d="M12 4 L16 8 L12 12" stroke="#4DAD75" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={step >= 3 ? 0.4 : 0.1} fill="none" className="transition-all duration-300" />
          </svg>
        </div>

        {/* Side panel */}
        <div className="w-[36%] bg-[#F5F6F7] border-l border-white/[0.06] flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1">
            <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[3.5px] font-bold text-[#4DAD75]">N</span>
            </div>
            <span className="text-[5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          </div>
          <div className="flex-1 mx-1.5 mb-1.5 bg-white rounded p-1.5" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
            {/* Existing note content */}
            <div className="space-y-[3px]">
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-4/5" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-3/5" />
              <div className="h-1" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded w-1/2" />
            </div>
            {/* Captured block — appears right after existing text */}
            <div className={`transition-all duration-500 overflow-hidden ${step >= 3 ? "max-h-16 opacity-100 mt-[5px]" : "max-h-0 opacity-0"}`}>
              <div className="border-l-[1.5px] border-[#4DAD75]/40 pl-1 py-0.5 space-y-[2px]">
                <div className="h-[2.5px] bg-[#4DAD75]/15 rounded w-full" />
                <div className="h-[2.5px] bg-[#4DAD75]/15 rounded w-4/5" />
              </div>
              <div className="mt-[2px]">
                <span className="text-[3.5px] text-[#4DAD75]/50">article.dev/post</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
