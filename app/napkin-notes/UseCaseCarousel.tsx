"use client";
import { useState, useRef, useEffect } from "react";

const useCases = [
  {
    title: "Meeting notes",
    desc: "Jot down action items while you're on a call. No tab switching.",
    screenshot: null,
  },
  {
    title: "Research",
    desc: "Collect snippets and links as you browse. Everything stays right there.",
    screenshot: null,
  },
  {
    title: "Quick drafts",
    desc: "Start an email reply, sketch out a message, outline a doc before committing.",
    screenshot: null,
  },
  {
    title: "Study notes",
    desc: "Take notes alongside lectures, docs, or textbooks without losing your place.",
    screenshot: null,
  },
];

export default function UseCaseCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    setActive(i);
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement;
    if (child) {
      el.scrollTo({
        left: child.offsetLeft - 24,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const scrollLeft = el.scrollLeft + 24;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {useCases.map((uc, i) => (
          <div
            key={uc.title}
            className="snap-start shrink-0 w-[300px] md:w-[380px]"
          >
            {/* Screenshot placeholder */}
            <div className="aspect-[16/10] rounded-xl bg-[#1e1e1e] mb-4 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-white/20">{uc.title}</span>
              </div>
            </div>
            <h3 className="font-semibold text-[15px] mb-1">{uc.title}</h3>
            <p className="text-[13px] text-[#1a1a1a]/45 leading-relaxed">
              {uc.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {useCases.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              active === i
                ? "bg-[#1a1a1a]/40 w-4"
                : "bg-[#1a1a1a]/10 hover:bg-[#1a1a1a]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
