"use client";
import { useState, useEffect } from "react";

export default function RichTextIllustration() {
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

  const btns = ["B", "I", "H", "link", "list", "quote"];

  return (
    <div className="aspect-[4/3] rounded-lg bg-[#f0f0ee] overflow-hidden relative flex items-center justify-center p-5 md:p-7">
      {/* Back page */}
      <div className="absolute w-[72%] h-[75%] bg-white/60 rounded-lg border border-[#1a1a1a]/[0.04] translate-x-1.5 translate-y-1.5" />

      {/* Main note */}
      <div className="relative w-[72%] bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-visible">
        {/* Floating toolbar */}
        <div
          className={`absolute -top-5 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${
            showToolbar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <div className="flex items-center gap-0 bg-white rounded-md border border-[#1a1a1a]/[0.1] shadow-lg px-0.5 py-0.5">
            {btns.map((b, i) => (
              <div
                key={b}
                className={`w-[18px] h-[16px] rounded flex items-center justify-center transition-colors duration-200 ${
                  activeBtn === i ? "bg-[#4DAD75]/15" : ""
                }`}
              >
                {b === "link" ? (
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={activeBtn === i ? "text-[#4DAD75]" : "text-[#1a1a1a]/30"}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
                  </svg>
                ) : b === "list" ? (
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1a1a1a]/30">
                    <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
                    <circle cx="5" cy="6" r="0.5" fill="currentColor" /><circle cx="5" cy="12" r="0.5" fill="currentColor" /><circle cx="5" cy="18" r="0.5" fill="currentColor" />
                  </svg>
                ) : b === "quote" ? (
                  <span className="text-[8px] font-serif text-[#1a1a1a]/30 leading-none">&ldquo;</span>
                ) : (
                  <span className={`text-[6.5px] ${b === "I" ? "italic" : "font-semibold"} ${activeBtn === i ? "text-[#4DAD75]" : "text-[#1a1a1a]/30"}`}>
                    {b}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="w-1.5 h-1.5 bg-white border-r border-b border-[#1a1a1a]/[0.1] rotate-45 mx-auto -mt-[3px] relative z-[-1]" />
        </div>

        {/* Note content */}
        <div className="px-3 py-3 space-y-[5px]">
          {/* Heading */}
          <div className="h-[5px] bg-[#1a1a1a]/[0.12] rounded w-[45%] mb-1" />
          {/* Bold line */}
          <div className={`h-[3.5px] rounded w-[70%] transition-colors duration-300 ${activeBtn === 0 ? "bg-[#1a1a1a]/[0.15]" : "bg-[#1a1a1a]/[0.08]"}`} />
          {/* Regular */}
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[80%]" />
          <div className="h-1.5" />
          {/* Checklist items */}
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[60%]" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.08] rounded w-[50%]" />
          </div>
          <div className="h-1.5" />
          {/* Link line */}
          <div className="h-[3.5px] bg-[#4DAD75]/15 rounded w-[55%]" />
          {/* More text */}
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[65%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[40%]" />
        </div>
      </div>
    </div>
  );
}
