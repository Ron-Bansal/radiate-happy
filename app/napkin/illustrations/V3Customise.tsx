"use client";
import { useState, useEffect } from "react";

export default function V3Customise() {
  const [isDark, setIsDark] = useState(false);
  const [fontIdx, setFontIdx] = useState(0);

  const fonts = ["Sans", "Serif", "Mono"];

  useEffect(() => {
    const loop = () => {
      setIsDark(false);
      setFontIdx(0);
      setTimeout(() => setFontIdx(1), 1200);
      setTimeout(() => setFontIdx(2), 2400);
      setTimeout(() => setIsDark(true), 3600);
      setTimeout(() => setFontIdx(0), 4800);
    };
    loop();
    const interval = setInterval(loop, 6500);
    return () => clearInterval(interval);
  }, []);

  const bg = isDark ? "#1e1e1e" : "#ffffff";
  const textMain = isDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.7)";
  const textFaint = isDark ? "rgba(255,255,255,0.15)" : "rgba(26,26,26,0.06)";
  const textHeading = isDark ? "rgba(255,255,255,0.4)" : "rgba(26,26,26,0.12)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.06)";
  const panelBg = isDark ? "#252525" : "#F5F6F7";

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="w-full">
        {/* Settings bar */}
        <div className="flex items-center gap-2 mb-3">
          {/* Dark/light toggle */}
          <div
            className="flex items-center rounded-full border px-0.5 py-0.5 transition-colors duration-500"
            style={{ borderColor: border, backgroundColor: panelBg }}
          >
            <div
              className="w-[14px] h-[14px] rounded-full flex items-center justify-center transition-colors duration-500"
              style={{ backgroundColor: !isDark ? "#4DAD75" : "transparent" }}
            >
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={!isDark ? "white" : textMain} strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            </div>
            <div
              className="w-[14px] h-[14px] rounded-full flex items-center justify-center transition-colors duration-500"
              style={{ backgroundColor: isDark ? "#4DAD75" : "transparent" }}
            >
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={isDark ? "white" : textMain} strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </div>

          {/* Font selector */}
          <div
            className="flex items-center rounded-full border px-1 py-0.5 gap-0.5 transition-colors duration-500"
            style={{ borderColor: border, backgroundColor: panelBg }}
          >
            {fonts.map((f, i) => (
              <div
                key={f}
                className="px-1.5 py-0.5 rounded-full transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: fontIdx === i ? "#4DAD75" : "transparent" }}
              >
                <span
                  className="transition-colors duration-300 leading-none"
                  style={{
                    fontSize: "5px",
                    fontFamily: i === 0 ? "sans-serif" : i === 1 ? "serif" : "monospace",
                    color: fontIdx === i ? "white" : textMain,
                    fontWeight: fontIdx === i ? 600 : 400,
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note preview */}
        <div
          className="rounded-lg border overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: bg, borderColor: border }}
        >
          <div className="px-3 py-3 space-y-[5px]">
            <div className="h-[5px] rounded w-[45%] transition-colors duration-500" style={{ backgroundColor: textHeading }} />
            <div className="h-[3.5px] rounded w-[75%] transition-colors duration-500" style={{ backgroundColor: textFaint }} />
            <div className="h-[3.5px] rounded w-[60%] transition-colors duration-500" style={{ backgroundColor: textFaint }} />
            <div className="h-1.5" />
            <div className="h-[3.5px] rounded w-[80%] transition-colors duration-500" style={{ backgroundColor: textFaint }} />
            <div className="h-[3.5px] rounded w-[50%] transition-colors duration-500" style={{ backgroundColor: textFaint }} />
            <div className="h-[3.5px] rounded w-[65%] transition-colors duration-500" style={{ backgroundColor: textFaint }} />
          </div>
        </div>
      </div>
    </div>
  );
}
