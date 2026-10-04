"use client";

import { useState, useEffect } from "react";

const shortcuts = [
  { keys: ["Alt", "X"], label: "Open / close Napkin Notes" },
  { keys: ["Alt", "→"], label: "Next note" },
  { keys: ["Alt", "←"], label: "Previous note" },
  { keys: ["Ctrl", "B"], label: "Bold text" },
];

export default function V3HotKeys() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(p => (p + 1) % shortcuts.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="w-full bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b border-[#1a1a1a]/[0.04]">
          <div className="text-[5px] font-semibold text-[#1a1a1a]/50">Keyboard shortcuts</div>
        </div>
        <div className="px-2 py-1.5 space-y-0">
          {shortcuts.map((s, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-1.5 py-[5px] rounded-md transition-all duration-300 ${
                active === i ? "bg-[#4DAD75]/[0.06]" : ""
              }`}
            >
              <span className={`text-[5.5px] transition-colors duration-300 ${active === i ? "text-[#1a1a1a]/70" : "text-[#1a1a1a]/35"}`}>
                {s.label}
              </span>
              <div className="flex items-center gap-[2px] shrink-0 ml-2">
                {s.keys.map((k, j) => (
                  <span key={j}>
                    <span className={`inline-block px-[4px] py-[2px] rounded text-[5px] font-mono border transition-all duration-300 ${
                      active === i
                        ? "bg-white border-[#4DAD75]/30 text-[#4DAD75] shadow-[0_1px_2px_rgba(77,173,117,0.15)]"
                        : "bg-[#f5f5f5] border-[#1a1a1a]/[0.08] text-[#1a1a1a]/30"
                    }`}>
                      {k}
                    </span>
                    {j < s.keys.length - 1 && <span className="text-[4px] text-[#1a1a1a]/20 mx-[1px]">+</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
