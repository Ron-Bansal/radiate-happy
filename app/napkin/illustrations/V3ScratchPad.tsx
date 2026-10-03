"use client";
import { useState, useEffect } from "react";

export default function V3ScratchPad() {
  const [activeTab, setActiveTab] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(p => (p + 1) % 2);
        setTransitioning(false);
      }, 250);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const notes = [
    { label: "Personal", lines: [70, 85, 55, 65, 80], heading: "This week" },
    { label: "Work", lines: [90, 60, 75, 50, 70], heading: "Standup notes" },
  ];
  const note = notes[activeTab];

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-5 backdrop-blur-sm">
      <div className="w-full max-w-[200px] bg-[#F5F6F7] rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-1 px-2 py-1.5">
          <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[5.5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
        </div>
        {/* Tabs */}
        <div className="px-1.5 pb-0.5">
          <div className="inline-flex items-center bg-[#ECEEF0] rounded-[3px] h-[8px]">
            {notes.map((n, i) => (
              <button key={i} onClick={() => { setActiveTab(i); }} className={`rounded-[3px] h-full flex items-center px-1 transition-all duration-200 ${activeTab === i ? "bg-white shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]" : ""}`}>
                <span className={`text-[3.5px] leading-none font-medium whitespace-nowrap ${activeTab === i ? "text-[#1a1a1a]/70" : "text-[#1a1a1a]/25"}`}>
                  <span className={activeTab === i ? "text-[#4DAD75] font-semibold" : ""}>{i + 1}</span> {n.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Note */}
        <div className={`mx-1.5 mb-1.5 bg-white rounded p-2 space-y-[4px] transition-opacity duration-200 ${transitioning ? "opacity-0" : "opacity-100"}`} style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
          <div className="text-[4.5px] font-semibold text-[#1a1a1a]/50">{note.heading}</div>
          {note.lines.map((w, i) => (
            <div key={i} className="h-[2.5px] bg-[#1a1a1a]/[0.06] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
