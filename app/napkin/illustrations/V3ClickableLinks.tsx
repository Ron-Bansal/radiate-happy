"use client";
import { useState, useEffect } from "react";

export default function V3ClickableLinks() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHovered(p => !p), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-5 backdrop-blur-sm">
      <div className="w-full max-w-[200px] bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-visible relative">
        <div className="px-3 py-3 space-y-[5px]">
          <div className="h-[4px] bg-[#1a1a1a]/[0.1] rounded w-[40%] mb-1" />
          <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[80%]" />
          <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[65%]" />
          <div className="h-1" />
          {/* Link */}
          <div className="relative">
            <div className={`h-[3px] rounded w-[55%] transition-all duration-300 ${hovered ? "bg-[#4DAD75]/40" : "bg-[#4DAD75]/20"}`} />
            {/* Preview tooltip */}
            <div className={`absolute -top-6 left-0 z-10 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>
              <div className="bg-[#2a2a2a] rounded px-1.5 py-1 shadow-lg border border-white/[0.1]">
                <div className="text-[4px] text-white/60 font-mono">docs.google.com/d/1x...</div>
                <div className="text-[3.5px] text-white/30 mt-0.5">Google Docs — Q4 Plan</div>
              </div>
            </div>
          </div>
          <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[70%]" />
          <div className="h-1" />
          {/* Another link */}
          <div className="h-[3px] bg-[#4DAD75]/20 rounded w-[48%]" />
          <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[60%]" />
        </div>
      </div>
    </div>
  );
}
