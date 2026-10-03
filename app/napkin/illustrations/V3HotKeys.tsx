"use client";

import { useState, useEffect } from "react";

const shortcuts = [
  { keys: ["Alt", "X"], label: "Open Napkin Notes" },
  { keys: ["Alt", "←"], label: "Previous note" },
  { keys: ["Alt", "→"], label: "Next note" },
  { keys: ["[", "]"], label: "Insert checkbox" },
  { keys: ["*", "space"], label: "Bullet list" },
];

export default function V3HotKeys() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(p => (p + 1) % shortcuts.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-5 backdrop-blur-sm">
      <div className="w-full max-w-[220px] space-y-1">
        {shortcuts.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-2.5 py-[5px] rounded-md transition-all duration-300 ${
              active === i ? "bg-white/[0.08]" : ""
            }`}
          >
            <div className="flex items-center gap-0.5 shrink-0">
              {s.keys.map((k, j) => (
                <span key={j}>
                  <span className={`inline-block px-1 py-[1px] rounded text-[5px] font-mono border transition-all duration-300 ${
                    active === i
                      ? "bg-white/[0.12] border-white/[0.15] text-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                      : "bg-white/[0.04] border-white/[0.06] text-white/25"
                  }`}>
                    {k}
                  </span>
                  {j < s.keys.length - 1 && <span className="text-[4px] text-white/15 mx-[1px]">+</span>}
                </span>
              ))}
            </div>
            <span className={`text-[5px] transition-colors duration-300 ${active === i ? "text-white/60" : "text-white/20"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
