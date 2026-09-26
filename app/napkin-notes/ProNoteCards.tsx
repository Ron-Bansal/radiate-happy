"use client";
import { useRef, useState } from "react";

const notes = [
  { num: 1, name: "Personal", linked: null, sections: [
    { heading: "This week" }, { lines: 4 }, { divider: true },
    { heading: "Ideas" }, { lines: 3 }, { divider: true },
    { heading: "Links" }, { lines: 2 }, { divider: true },
    { heading: "Later" }, { lines: 3 },
  ] },
  { num: 2, name: "COMP3901 Capstone", linked: null, sections: [
    { heading: "Week 9 deliverables (due Oct 4)" }, { lines: 4 }, { divider: true },
    { heading: "Supervisor feedback" }, { lines: 3 }, { divider: true },
    { heading: "References" }, { lines: 3 }, { divider: true },
    { heading: "Outline draft" }, { lines: 4 },
  ] },
  { num: 3, name: "Japan Trip", linked: null, shapes: true, sections: [
    { heading: "Tokyo sources" }, { lines: 2 },
    { heading: "Accommodation" }, { lines: 3 }, { divider: true },
    { heading: "Itinerary" }, { lines: 4 }, { divider: true },
    { heading: "Budget" }, { lines: 2 },
  ] },
  { num: 4, name: "Work / Linear", linked: "Linked to linear.app", sections: [
    { heading: "Sprint 14 standup" }, { lines: 3 }, { divider: true },
    { heading: "Retro notes" }, { lines: 3 },
    { heading: "Action items" }, { lines: 4 }, { divider: true },
    { heading: "Blockers" }, { lines: 2 },
  ] },
  { num: 5, name: "Research Project", linked: "Linked to scholar.google.com", sections: [
    { heading: "Literature review" }, { lines: 4 }, { divider: true },
    { heading: "Methodology notes" }, { lines: 3 },
    { heading: "Key findings" }, { lines: 3 }, { divider: true },
    { heading: "Next steps" }, { lines: 2 },
  ] },
  { num: 6, name: "Brand Moodboard", linked: "+2 linked sites", shapes: true, sections: [
    { heading: "Visual direction" }, { lines: 2 }, { divider: true },
    { heading: "Colour palette" }, { lines: 2 }, { divider: true },
    { heading: "Typography" }, { lines: 3 },
    { heading: "Layout refs" }, { lines: 2 },
  ] },
  { num: 7, name: "Q4 Goals", linked: null, sections: [
    { heading: "Revenue targets" }, { lines: 3 }, { divider: true },
    { heading: "Hiring" }, { lines: 2 },
    { heading: "Timeline" }, { lines: 4 }, { divider: true },
    { heading: "Risks" }, { lines: 3 },
  ] },
  { num: 8, name: "Side Project", linked: "Linked to github.com", sections: [
    { heading: "Auth flow TODO" }, { lines: 3 }, { divider: true },
    { heading: "DB schema" }, { lines: 3 },
    { heading: "Deploy checklist" }, { lines: 3 }, { divider: true },
    { heading: "Bugs" }, { lines: 2 },
  ] },
  { num: 9, name: "Reading List", linked: null, sections: [
    { heading: "Currently reading" }, { lines: 3 }, { divider: true },
    { heading: "Finished" }, { lines: 3 },
    { heading: "Up next" }, { lines: 4 }, { divider: true },
    { heading: "Highlights" }, { lines: 3 },
  ] },
  { num: 10, name: "Inspo / UI Patterns", linked: "+2 linked sites", shapes: true, sections: [
    { heading: "Components" }, { lines: 2 }, { divider: true },
    { heading: "Animations" }, { lines: 2 },
    { heading: "Layouts" }, { lines: 3 }, { divider: true },
    { heading: "Micro-interactions" }, { lines: 2 },
  ] },
];

type Section = { heading?: string; lines?: number; divider?: boolean };
type Note = typeof notes[number];

export default function ProNoteCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.x);
  };

  const onPointerUp = () => setIsDragging(false);

  const renderCard = (note: Note, i: number) => (
    <div
      key={i}
      className="shrink-0 relative"
      style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: hovered === i ? 20 : i }}
    >
      <div
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        className="rounded-t-lg border border-b-0 transition-all duration-300"
        style={{
          width: "185px",
          backgroundColor: hovered === i ? "#2c2c2c" : "#252525",
          borderColor: hovered === i ? "rgba(77,173,117,0.3)" : "rgba(255,255,255,0.08)",
          transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        <div className="px-3 pt-3">
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold text-[#4DAD75]">{note.num}</span>
            <span className="text-[10px] font-medium text-white/50 truncate">{note.name}</span>
          </div>
          {note.linked && (
            <div className="mb-2">
              <span className="text-[8px] text-[#4DAD75]/60 bg-[#4DAD75]/[0.08] px-1.5 py-0.5 rounded-full">
                {note.linked}
              </span>
            </div>
          )}
          {!note.linked && <div className="h-1.5" />}

          {/* Content — dense, meant to overflow and get clipped */}
          {(note.sections as Section[]).map((s, si) => {
            if (s.divider) return <div key={si} className="h-px bg-white/[0.06] my-2" />;
            if (s.heading) return (
              <div key={si} className="text-[8px] font-semibold text-white/25 mb-1 truncate">{s.heading}</div>
            );
            if (s.lines) return (
              <div key={si} className="space-y-[5px] mb-1.5">
                {Array.from({ length: s.lines }).map((_, j) => (
                  <div key={j} className="h-[3px] bg-white/[0.06] rounded" style={{ width: `${30 + ((j * 19 + i * 11 + si * 7) % 60)}%` }} />
                ))}
              </div>
            );
            return null;
          })}
          {note.shapes && (
            <div className="flex gap-2 mt-2">
              <div className="w-[42px] h-[30px] rounded bg-white/[0.04]" />
              <div className="w-[30px] h-[30px] rounded bg-white/[0.04]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#222] border border-white/[0.06]" style={{ height: "260px" }}>
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="flex items-start px-5 pt-8 overflow-x-auto overflow-y-hidden select-none h-full"
        style={{ cursor: isDragging ? "grabbing" : "grab", scrollbarWidth: "none" }}
      >
        {notes.map(renderCard)}
        <div className="shrink-0 w-5" />
      </div>
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
