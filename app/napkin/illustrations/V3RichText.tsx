"use client";
import { useState, useEffect } from "react";

export default function V3RichText() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [activeBtn, setActiveBtn] = useState(-1);

  useEffect(() => {
    const loop = () => {
      setShowToolbar(true);
      setTimeout(() => setActiveBtn(0), 400);
      setTimeout(() => setActiveBtn(2), 1200);
      setTimeout(() => setActiveBtn(-1), 2000);
      setTimeout(() => setShowToolbar(false), 3200);
    };
    loop();
    const interval = setInterval(loop, 5000);
    return () => clearInterval(interval);
  }, []);

  const btns = ["B", "I", "H", "link", "list"];

  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="relative w-full bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-visible">
        {/* Toolbar */}
        <div className={`absolute -top-7 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${showToolbar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
          <div className="flex items-center bg-white rounded-md border border-[#1a1a1a]/[0.1] shadow-lg px-1 py-1 gap-0.5">
            {btns.map((b, i) => (
              <div key={b} className={`w-[22px] h-[18px] rounded flex items-center justify-center transition-colors duration-200 ${activeBtn === i ? "bg-[#4DAD75]/15" : ""}`}>
                {b === "link" ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={activeBtn === i ? "text-[#4DAD75]" : "text-[#1a1a1a]/30"}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
                  </svg>
                ) : b === "list" ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1a1a1a]/30">
                    <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
                  </svg>
                ) : (
                  <span className={`text-[9px] ${b === "I" ? "italic" : "font-semibold"} ${activeBtn === i ? "text-[#4DAD75]" : "text-[#1a1a1a]/30"}`}>{b}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 space-y-[5px]">
          <div className="h-[5px] bg-[#1a1a1a]/[0.1] rounded w-[40%] mb-2" />
          <div className={`h-[4px] rounded w-[74%] transition-colors duration-300 ${activeBtn === 0 ? "bg-[#1a1a1a]/[0.15]" : "bg-[#1a1a1a]/[0.06]"}`} />
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[85%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.05] rounded w-[48%]" />
          <div className="h-1.5" />
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10" />
            <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[55%]" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10" />
            <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[42%]" />
          </div>
          <div className="h-1.5" />
          <div className="h-[4px] bg-[#4DAD75]/15 rounded w-[50%]" />
          <div className="w-[60%] h-[18px] rounded bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/[0.04] mt-1 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a]/[0.08]">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="h-[4px] bg-[#1a1a1a]/[0.06] rounded w-[63%] mt-1" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.05] rounded w-[78%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.04] rounded w-[35%]" />
        </div>
      </div>
    </div>
  );
}
