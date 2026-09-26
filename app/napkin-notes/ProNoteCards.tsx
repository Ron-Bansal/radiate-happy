"use client";
import { useState } from "react";

const notes = [
  { num: 1, name: "Personal", headings: ["This week", "Ideas"], lines: [3, 2], shapes: false, linked: null },
  { num: 2, name: "COMP3901 Capstone", headings: ["Week 9 deliverables (due Oct 4)"], lines: [4], shapes: false, linked: null },
  { num: 3, name: "Japan Trip", headings: ["Tokyo sources", "Accommodation"], lines: [2, 2], shapes: true, linked: null },
  { num: 4, name: "Work / Linear", headings: ["Sprint 14 standup"], lines: [3], shapes: false, linked: "linear.app" },
  { num: 5, name: "Research Project", headings: ["Literature review", "Methodology notes"], lines: [3, 2], shapes: false, linked: "scholar.google.com" },
  { num: 6, name: "Brand Moodboard", headings: ["Visual direction"], lines: [1], shapes: true, linked: "figma.com" },
  { num: 7, name: "Q4 Goals", headings: ["Revenue targets", "Hiring"], lines: [2, 2], shapes: false, linked: null },
  { num: 8, name: "Side Project", headings: ["Auth flow TODO"], lines: [3], shapes: false, linked: "github.com" },
  { num: 9, name: "Reading List", headings: null, lines: [3], shapes: false, linked: null },
  { num: 10, name: "Inspo / UI Patterns", headings: null, lines: [1], shapes: true, linked: null },
];

export default function ProNoteCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
      <div className="flex gap-2 p-4 pb-0 overflow-hidden" style={{ height: "280px" }}>
        {notes.map((note, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="shrink-0 rounded-lg border overflow-hidden transition-all duration-300 cursor-default"
            style={{
              width: "130px",
              height: "240px",
              marginLeft: i > 0 ? "-14px" : "0",
              transform: hovered === i ? "scale(1.04) rotate(0deg) translateY(-4px)" : `rotate(${(i % 2 === 0 ? -0.5 : 0.5) * (1 + (i % 3) * 0.3)}deg)`,
              backgroundColor: hovered === i ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
              borderColor: hovered === i ? "rgba(77,173,117,0.25)" : "rgba(255,255,255,0.08)",
              zIndex: hovered === i ? 20 : 10 - Math.abs(i - 5),
              position: "relative",
            }}
          >
            <div className="px-2.5 pt-2 pb-2">
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-[9px] font-semibold text-[#4DAD75]">{note.num}</span>
                <span className="text-[9px] font-medium text-white/50 truncate">{note.name}</span>
              </div>
              {note.headings?.map((h, hi) => (
                <div key={hi} className="mb-1.5">
                  <div className="text-[8px] font-semibold text-white/30 mb-1 truncate">{h}</div>
                  <div className="space-y-1">
                    {Array.from({ length: note.lines[hi] || 2 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-[3px] bg-white/[0.06] rounded"
                        style={{ width: `${40 + ((j * 17 + i * 13) % 50)}%` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {!note.headings && (
                <div className="space-y-1">
                  {Array.from({ length: note.lines[0] }).map((_, j) => (
                    <div
                      key={j}
                      className="h-[3px] bg-white/[0.06] rounded"
                      style={{ width: `${40 + ((j * 17 + i * 13) % 50)}%` }}
                    />
                  ))}
                </div>
              )}
              {note.shapes && (
                <div className="flex gap-1.5 mt-2">
                  <div className="w-[38px] h-[28px] rounded bg-white/[0.04]" />
                  <div className="w-[28px] h-[28px] rounded bg-white/[0.04]" />
                </div>
              )}
              {/* Linked site revealed on hover */}
              {note.linked && (
                <div
                  className="mt-2 transition-all duration-200"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "translateY(0)" : "translateY(4px)",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-[4px] h-[4px] rounded-full bg-[#4DAD75]/40" />
                    <span className="text-[7px] text-[#4DAD75]/50">{note.linked}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
