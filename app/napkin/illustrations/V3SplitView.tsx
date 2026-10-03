"use client";

export default function V3SplitView() {
  const panels = [
    { heading: "This week", lines: [80, 60, 75, 50] },
    { heading: "Project ideas", lines: [65, 85, 55, 70] },
    { heading: "Reading list", lines: [70, 50, 90, 60] },
  ];

  return (
    <div className="aspect-[4/3] rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full bg-[#F5F6F7] rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-[#1a1a1a]/[0.04]">
          <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[5.5px] font-semibold text-[#1a1a1a]/70">Napkin Notes — Full page</span>
          <div className="flex-1" />
          <div className="flex gap-0.5">
            {[1,2,3].map(n => (
              <div key={n} className="w-[3px] h-[8px] rounded-sm bg-[#4DAD75]/20" />
            ))}
          </div>
        </div>
        <div className="flex gap-px bg-[#e5e5e3] p-0.5">
          {panels.map((panel, i) => (
            <div key={i} className="flex-1 bg-white rounded p-2 space-y-[3px]" style={{ boxShadow: i === 0 ? "0 0 0 1px rgba(77,173,117,0.2)" : "none" }}>
              <div className="text-[4px] font-semibold text-[#1a1a1a]/50">{panel.heading}</div>
              {panel.lines.map((w, j) => (
                <div key={j} className="h-[2px] bg-[#1a1a1a]/[0.06] rounded" style={{ width: `${w}%` }} />
              ))}
              <div className="h-0.5" />
              <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-3/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
