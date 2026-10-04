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
    { label: "Personal", heading: "This week", heading2: "Ideas", heading3: "Later", heading4: "Links" },
    { label: "Work", heading: "Standup notes", heading2: "Action items", heading3: "Blockers", heading4: "Follow-ups" },
  ];
  const note = notes[activeTab];

  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-start justify-center p-2 backdrop-blur-sm">
      <div className="w-full max-w-[220px] bg-[#F5F6F7] rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-1.5 px-3 py-2">
          <div className="w-4 h-4 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[7px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
        </div>
        <div className="px-2 pb-1">
          <div className="inline-flex items-center bg-[#ECEEF0] rounded-[4px] h-[12px]">
            {notes.map((n, i) => (
              <button key={i} onClick={() => { setActiveTab(i); }} className={`rounded-[4px] h-full flex items-center px-1.5 transition-all duration-200 ${activeTab === i ? "bg-white shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]" : ""}`}>
                <span className={`text-[5px] leading-none font-medium whitespace-nowrap ${activeTab === i ? "text-[#1a1a1a]/70" : "text-[#1a1a1a]/25"}`}>
                  <span className={activeTab === i ? "text-[#4DAD75] font-semibold" : ""}>{i + 1}</span> {n.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={`mx-2 mb-2 bg-white rounded-md p-3 space-y-[5px] transition-opacity duration-200 ${transitioning ? "opacity-0" : "opacity-100"}`} style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
          <div className="text-[6px] font-semibold text-[#1a1a1a]/50 mb-1">{note.heading}</div>
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.07] rounded w-[82%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[45%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[68%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.04] rounded w-[91%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.07] rounded w-[37%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[73%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[56%]" />
          <div className="h-2" />
          <div className="text-[6px] font-semibold text-[#1a1a1a]/50 mb-1">{note.heading2}</div>
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[58%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.04] rounded w-[85%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.07] rounded w-[42%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[76%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[51%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.04] rounded w-[89%]" />
          <div className="h-px bg-[#1a1a1a]/[0.06] my-2" />
          <div className="text-[6px] font-semibold text-[#1a1a1a]/50 mb-1">{note.heading3}</div>
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[64%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.07] rounded w-[39%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.04] rounded w-[88%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[55%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[72%]" />
          <div className="h-2" />
          <div className="text-[6px] font-semibold text-[#1a1a1a]/50 mb-1">{note.heading4}</div>
          <div className="h-[3.5px] bg-[#4DAD75]/[0.15] rounded w-[60%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[48%]" />
          <div className="h-[3.5px] bg-[#4DAD75]/[0.15] rounded w-[74%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.06] rounded w-[41%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.04] rounded w-[83%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.07] rounded w-[35%]" />
          <div className="h-[3.5px] bg-[#1a1a1a]/[0.05] rounded w-[66%]" />
        </div>
      </div>
    </div>
  );
}
