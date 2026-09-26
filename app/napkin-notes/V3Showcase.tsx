"use client";
import { useState, useEffect, useCallback } from "react";

const features = [
  {
    label: "Rich text editor",
    desc: "TipTap-powered formatting with markdown shortcuts. Bold, italic, lists, links, images — all inline.",
    screenshot: null,
  },
  {
    label: "Clickable web links",
    desc: "URLs you paste or type are now live links. Click to open, hover to preview.",
    screenshot: null,
  },
  {
    label: "Overlay mode",
    desc: "Works on Arc, Brave, and any browser without native side panel support.",
    screenshot: null,
  },
  {
    label: "Full-page review",
    desc: "Open your notes in a dedicated tab. Split view shows up to three notes at once.",
    screenshot: null,
  },
  {
    label: "Second scratch pad",
    desc: "Every user gets two notes now. Enough to stay organised without the clutter.",
    screenshot: null,
  },
  {
    label: "Fresh design",
    desc: "Cleaner look, better spacing, smoother interactions. Everything you had, nothing lost.",
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
      <div className="md:w-[340px] shrink-0 bg-[#fafaf9] p-6 md:p-8 space-y-1">
        {features.map((f, i) => (
          <button
            key={f.label}
            onClick={() => handleClick(i)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group ${
              active === i
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-1 h-8 rounded-full transition-all duration-300 ${
                  active === i ? "bg-[#4DAD75]" : "bg-transparent"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[14px] font-medium transition-colors ${
                    active === i
                      ? "text-[#1a1a1a]"
                      : "text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/60"
                  }`}
                >
                  {f.label}
                </div>
                <div
                  className={`text-[12px] leading-relaxed mt-0.5 transition-all duration-300 overflow-hidden ${
                    active === i
                      ? "text-[#1a1a1a]/50 max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {f.desc}
                </div>
              </div>
            </div>
            {/* Progress bar for active item */}
            {active === i && (
              <div className="mt-2 ml-4 h-[2px] bg-[#e5e5e3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4DAD75]/40 rounded-full transition-[width] duration-[50ms] linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Screenshot area - right side with dark grid */}
      <div className="flex-1 bg-[#1e1e1e] relative min-h-[360px] md:min-h-[480px]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Screenshot placeholder */}
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
