"use client";
import { useRef, useState } from "react";

type Item = { h?: string; lines?: number; divider?: boolean; img?: [number, number]; imgs?: [number, number][] };

const notes: { num: number; name: string; linked: string | null; offset: number; items: Item[] }[] = [
  { num: 1, name: "Personal", linked: null, offset: 0, items: [
    { h: "This week" }, { lines: 2 },
    { lines: 1 }, { h: "Ideas" }, { lines: 3 },
    { divider: true }, { lines: 2 },
    { h: "Links" }, { lines: 1 }, { lines: 2 },
    { divider: true }, { h: "Later" }, { lines: 4 },
  ] },
  { num: 2, name: "COMP3901 Capstone", linked: null, offset: 12, items: [
    { h: "Week 9 deliverables (due Oct 4)" }, { lines: 3 },
    { img: [60, 36] },
    { divider: true }, { h: "Supervisor feedback" }, { lines: 4 },
    { h: "References" }, { lines: 2 }, { lines: 1 },
    { divider: true }, { h: "Outline draft" }, { lines: 5 },
  ] },
  { num: 3, name: "Work stuff", linked: "Linked to linear.app", offset: 4, items: [
    { h: "Sprint 14 standup" }, { lines: 2 },
    { lines: 3 }, { divider: true },
    { h: "Retro notes" }, { lines: 2 },
    { h: "Action items" }, { lines: 3 }, { lines: 2 },
    { divider: true }, { h: "Blockers" }, { lines: 3 },
  ] },
  { num: 4, name: "Japan Trip", linked: null, offset: 16, items: [
    { h: "Tokyo sources" }, { lines: 1 },
    { imgs: [[50, 34], [50, 34]] },
    { h: "Accommodation" }, { lines: 2 },
    { divider: true }, { h: "Itinerary" }, { lines: 5 },
    { divider: true }, { h: "Budget" }, { lines: 2 },
    { img: [70, 28] },
  ] },
  { num: 5, name: "Research Project", linked: "Linked to scholar.google.com", offset: 6, items: [
    { h: "Literature review" }, { lines: 3 },
    { img: [80, 30] },
    { divider: true }, { h: "Methodology notes" }, { lines: 4 },
    { h: "Key findings" }, { lines: 2 },
    { divider: true }, { lines: 3 },
    { h: "Next steps" }, { lines: 2 },
  ] },
  { num: 6, name: "Brand Moodboard", linked: "+2 linked sites", offset: 20, items: [
    { h: "Visual direction" },
    { imgs: [[42, 42], [42, 42], [42, 42]] },
    { divider: true }, { h: "Colour palette" },
    { imgs: [[22, 16], [22, 16], [22, 16], [22, 16]] },
    { h: "Typography" }, { lines: 2 },
    { divider: true }, { h: "Layout refs" },
    { imgs: [[60, 38], [60, 38]] },
  ] },
  { num: 7, name: "Q4 Goals", linked: null, offset: 2, items: [
    { h: "Revenue targets" }, { lines: 4 },
    { lines: 2 }, { divider: true },
    { h: "Hiring" }, { lines: 3 },
    { h: "Timeline" }, { lines: 3 }, { lines: 2 },
    { divider: true }, { h: "Risks" }, { lines: 4 },
    { lines: 2 },
  ] },
  { num: 8, name: "Side Project", linked: "Linked to github.com", offset: 14, items: [
    { h: "Auth flow TODO" }, { lines: 2 },
    { lines: 2 }, { divider: true },
    { h: "DB schema" }, { img: [90, 32] },
    { lines: 2 }, { h: "Deploy checklist" }, { lines: 4 },
    { divider: true }, { h: "Bugs" }, { lines: 3 },
  ] },
  { num: 9, name: "Reading List", linked: null, offset: 8, items: [
    { h: "Currently reading" }, { lines: 2 },
    { img: [50, 30] }, { lines: 1 },
    { divider: true }, { h: "Finished" }, { lines: 4 },
    { h: "Up next" }, { lines: 3 }, { lines: 2 },
    { divider: true }, { h: "Highlights" }, { lines: 4 },
    { lines: 2 },
  ] },
  { num: 10, name: "Inspo / UI Patterns", linked: "+2 linked sites", offset: 10, items: [
    { h: "Components" },
    { imgs: [[38, 38], [38, 38], [38, 38]] },
    { divider: true }, { h: "Animations" }, { lines: 2 },
    { img: [70, 40] },
    { h: "Layouts" }, { lines: 2 },
    { divider: true }, { h: "Micro-interactions" },
    { imgs: [[50, 30], [50, 30]] },
  ] },
];

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

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#222] border border-white/[0.06]" style={{ height: "300px" }}>
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="flex items-start px-5 pt-12 gap-0 overflow-x-auto overflow-y-hidden select-none h-full"
        style={{ cursor: isDragging ? "grabbing" : "grab", scrollbarWidth: "none" }}
      >
        {notes.map((note, i) => (
          <div
            key={i}
            className="shrink-0 relative"
            style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: hovered === i ? 20 : i, paddingTop: `${note.offset}px` }}
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

                {note.items.map((item, si) => {
                  if (item.divider) return <div key={si} className="h-px bg-white/[0.06] my-2" />;
                  if (item.h) return (
                    <div key={si} className="text-[8px] font-semibold text-white/25 mb-1 truncate">{item.h}</div>
                  );
                  if (item.img) return (
                    <div key={si} className="mb-2 mt-1">
                      <div className="rounded bg-white/[0.04]" style={{ width: `${item.img[0]}%`, height: `${item.img[1]}px` }} />
                    </div>
                  );
                  if (item.imgs) return (
                    <div key={si} className="flex gap-1.5 flex-wrap mb-2 mt-1">
                      {item.imgs.map((sz, j) => (
                        <div key={j} className="rounded bg-white/[0.04]" style={{ width: `${sz[0]}px`, height: `${sz[1]}px` }} />
                      ))}
                    </div>
                  );
                  if (item.lines) return (
                    <div key={si} className="space-y-[5px] mb-1.5">
                      {Array.from({ length: item.lines }).map((_, j) => (
                        <div key={j} className="h-[3px] bg-white/[0.06] rounded" style={{ width: `${25 + ((j * 23 + i * 11 + si * 13) % 65)}%` }} />
                      ))}
                    </div>
                  );
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-5" />
      </div>
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
