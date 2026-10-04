"use client";

import { useState, useEffect } from "react";

export default function V3Overlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShow(p => !p), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden relative backdrop-blur-sm" style={{ minHeight: "320px" }}>
      <div className="absolute inset-2 rounded-md bg-[#1e1e1e] overflow-hidden shadow-lg">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/[0.06]">
          <div className="flex gap-0.5">
            <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
            <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
            <div className="w-[5px] h-[5px] rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-white/[0.06] rounded h-3 max-w-[100px] mx-auto flex items-center px-1.5">
              <span className="text-[5px] text-white/20 font-mono">arc.browser/page</span>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-[4px]">
          <div className="h-[3.5px] bg-white/[0.06] rounded w-[50%]" />
          <div className="h-1" />
          <div className="h-[3px] bg-white/[0.04] rounded w-full" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[85%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[42%]" />
          <div className="h-1" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[90%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[60%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[75%]" />
          <div className="h-1" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[55%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[92%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[38%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[70%]" />
          <div className="h-1" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[80%]" />
          <div className="h-[3px] bg-white/[0.04] rounded w-[45%]" />
        </div>
        <div className={`absolute top-6 right-2 bottom-4 w-[45%] transition-all duration-500 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
          <div className="bg-[#F5F6F7] rounded-lg shadow-xl border border-[#1a1a1a]/[0.08] overflow-hidden h-full flex flex-col">
            <div className="flex items-center gap-1 px-1.5 py-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
                <span className="text-[3.5px] font-bold text-[#4DAD75]">N</span>
              </div>
              <span className="text-[4.5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
            </div>
            <div className="mx-1 mb-1 bg-white rounded p-1.5 space-y-[3px] flex-1" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
              <div className="text-[3.5px] font-semibold text-[#1a1a1a]/40">Quick notes</div>
              <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[78%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[45%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[62%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[88%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[33%]" />
              <div className="h-0.5" />
              <div className="text-[3.5px] font-semibold text-[#1a1a1a]/40">Links</div>
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[52%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[71%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[38%]" />
              <div className="h-px bg-[#1a1a1a]/[0.05] my-1" />
              <div className="text-[3.5px] font-semibold text-[#1a1a1a]/40">Ideas</div>
              <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[65%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[42%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[80%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[55%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[73%]" />
              <div className="h-0.5" />
              <div className="text-[3.5px] font-semibold text-[#1a1a1a]/40">Reading</div>
              <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[48%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[82%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[36%]" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[60%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
