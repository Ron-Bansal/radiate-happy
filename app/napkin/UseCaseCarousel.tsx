"use client";
import { useState, useRef, useEffect, type ComponentType } from "react";
import {
  CaptureIdeasNote,
  MeetingNotesNote,
  ResearchNote,
  QuickDraftsNote,
  StudyNotesNote,
  DailyTasksNote,
} from "./illustrations/UseCaseNote";

const useCases: { title: string; desc: string; component: ComponentType }[] = [
  {
    title: "Quick drafts",
    desc: "Sketch out a reply, outline a doc, draft a message before committing to it",
    component: QuickDraftsNote,
  },
  {
    title: "Meeting notes",
    desc: "Action items, decisions, follow-ups while you're still on the call",
    component: MeetingNotesNote,
  },
  {
    title: "Study notes",
    desc: "Take notes alongside lectures, docs, or textbooks without losing your place",
    component: StudyNotesNote,
  },
  {
    title: "Capture ideas",
    desc: "Jot down thoughts the moment they come to you",
    component: CaptureIdeasNote,
  },
  {
    title: "Research",
    desc: "Collect snippets and links as you browse, right beside the page",
    component: ResearchNote,
  },
  {
    title: "Manage daily tasks",
    desc: "Structure your day with priorities. A simple list beats a complex system",
    component: DailyTasksNote,
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
        {useCases.map((uc) => {
          const Comp = uc.component;
          return (
            <div
              key={uc.title}
              className="snap-start shrink-0 w-[280px] md:w-[340px]"
            >
              <div className="aspect-[16/10] rounded-xl bg-[#f0f0ee] mb-4 relative overflow-hidden p-3 md:p-4">
                <Comp />
              </div>
              <h3 className="font-semibold text-[18px] mb-1">{uc.title}</h3>
              <p className="text-[15px] text-[#1a1a1a]/45 leading-relaxed">
                {uc.desc}
              </p>
            </div>
          );
        })}
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
