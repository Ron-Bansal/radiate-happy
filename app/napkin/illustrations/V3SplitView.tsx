"use client";

export default function V3SplitView() {
  const panels = [
    { heading: "This week", lines: [[80,7],[35,5],[62,6],[90,4],[48,7],[71,5],[55,6],[83,4],[40,7],[67,5]] },
    { heading: "Project ideas", lines: [[55,6],[88,4],[42,7],[73,5],[60,6],[37,4],[85,7],[50,5],[78,6],[44,4]] },
    { heading: "Reading list", lines: [[70,5],[45,7],[92,4],[58,6],[33,5],[80,7],[65,4],[47,6],[75,5],[52,7]] },
  ];

  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-hidden flex items-start justify-center p-2 backdrop-blur-sm">
      <div className="w-full bg-white rounded-lg overflow-hidden shadow-sm border border-[#1a1a1a]/[0.06]">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F0F0F0] border-b border-[#1a1a1a]/[0.06]">
          <div className="flex gap-[3px]">
            <div className="w-[5px] h-[5px] rounded-full bg-[#FF5F57]" />
            <div className="w-[5px] h-[5px] rounded-full bg-[#FEBC2E]" />
            <div className="w-[5px] h-[5px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-0.5 ml-1">
            <div className="inline-flex items-center bg-white rounded-[3px] h-[8px] shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]">
              <span className="text-[3.5px] leading-none font-medium px-1 text-[#1a1a1a]/70">Napkin Notes</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 bg-[#FAFAFA] border-b border-[#1a1a1a]/[0.04]">
          <div className="bg-[#F0F0F0] rounded-full px-2 py-[2px] flex items-center">
            <span className="text-[4px] text-[#1a1a1a]/40">chrome-extension://napkin-notes/fullpage</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-[#1a1a1a]/[0.04] bg-[#F5F6F7]">
          <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
            <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
          </div>
          <span className="text-[5.5px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          <div className="flex-1" />
          <div className="flex gap-0.5">
            {[1,2,3].map(n => (
              <div key={n} className="w-[3px] h-[8px] rounded-sm bg-[#4DAD75]/20" />
            ))}
          </div>
        </div>
        <div className="flex gap-px bg-[#e5e5e3] p-1">
          {/* Panel 1 */}
          <div className="flex-1 bg-white rounded p-2 space-y-[3px]" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.2)" }}>
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">This week</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[80%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[35%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[62%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[90%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[48%]" />
            <div className="h-px bg-[#1a1a1a]/[0.04] my-1" />
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Done</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[71%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[55%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[83%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[40%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[67%]" />
          </div>
          {/* Panel 2 */}
          <div className="flex-1 bg-white rounded p-2 space-y-[3px]">
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Project ideas</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[55%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[88%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[42%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[73%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[60%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[37%]" />
            <div className="h-px bg-[#1a1a1a]/[0.04] my-1" />
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Research</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[85%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[50%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[78%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[44%]" />
          </div>
          {/* Panel 3 */}
          <div className="flex-1 bg-white rounded p-2 space-y-[3px]">
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Reading list</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[70%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[45%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[92%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[58%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[33%]" />
            <div className="h-px bg-[#1a1a1a]/[0.04] my-1" />
            <div className="text-[4px] font-semibold text-[#1a1a1a]/50">Highlights</div>
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[80%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.04] rounded w-[65%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.06] rounded w-[47%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.05] rounded w-[75%]" />
            <div className="h-[2px] bg-[#1a1a1a]/[0.07] rounded w-[52%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
