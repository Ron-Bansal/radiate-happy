"use client";
import { useState, useEffect, useCallback } from "react";

const features = [
  {
    label: "Modern redesign",
    desc: "Cleaner look, smoother interactions, and more customisation. Font selection, text sizing, and theme options",
    screenshot: null,
  },
  {
    label: "A second scratch pad",
    desc: "Every user gets two notes now. Keep things tidy without adding complexity",
    screenshot: null,
  },
  {
    label: "Full-page split view",
    desc: "Open your notes in a dedicated tab. Split view shows up to three notes side by side",
    screenshot: null,
  },
  {
    label: "Clickable web links",
    desc: "URLs are now live links. Click to open, hover to preview. No more copy-pasting",
    screenshot: null,
  },
  {
    label: "Rich text editing",
    desc: "Bold, italic, lists, links, images. All inline with markdown shortcuts or the floating toolbar",
    screenshot: null,
  },
  {
    label: "Overlay mode",
    desc: "Napkin Notes now works on Arc, Brave, and other browsers that don't support native side panels",
    screenshot: null,
  },
];

const INTERVAL = 5000;

export default function V3Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % features.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    const tick = 50;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          advance();
          return 0;
        }
        return prev + (tick / INTERVAL) * 100;
      });
    }, tick);
    return () => clearInterval(interval);
  }, [paused, advance]);

  const handleClick = (i: number) => {
    setActive(i);
    setProgress(0);
    setPaused(true);
    setTimeout(() => setPaused(false), INTERVAL);
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 rounded-xl overflow-hidden border border-[#2a2a2a]/20">
      {/* Feature list - left side */}
      <div className="md:w-[340px] shrink-0 bg-[#fafaf9] p-5 md:p-6 space-y-0.5">
        {features.map((f, i) => (
          <button
            key={f.label}
            onClick={() => handleClick(i)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group ${
              active === i
                ? "bg-white border border-[#4DAD75]/20 shadow-sm"
                : "border border-transparent hover:bg-white/60"
            }`}
          >
            <div
              className={`text-[14px] font-medium transition-colors flex items-baseline gap-2.5 ${
                active === i
                  ? "text-[#1a1a1a]"
                  : "text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/60"
              }`}
            >
              <span className={`text-[11px] tabular-nums ${active === i ? "text-[#1a1a1a]/20" : "text-[#1a1a1a]/15"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {f.label}
            </div>
            <div
              className={`text-[12px] leading-relaxed mt-1 transition-all duration-300 overflow-hidden ${
                active === i
                  ? "text-[#1a1a1a]/50 max-h-20 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {f.desc}
            </div>
            {active === i && (
              <div className="mt-2 h-[2px] bg-[#e5e5e3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4DAD75]/40 rounded-full transition-[width] duration-[50ms] linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Screenshot area - right side with dark 5x5 grid */}
      <div className="flex-1 bg-[#1e1e1e] relative min-h-[360px] md:min-h-[480px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center backdrop-blur-sm">
              <span className="text-sm text-white/20">
                {features[active].label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
