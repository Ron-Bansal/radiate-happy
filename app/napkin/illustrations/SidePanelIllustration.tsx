"use client";

export default function SidePanelIllustration() {
  return (
    <div className="aspect-[4/3] rounded-lg bg-[#f0f0ee] overflow-hidden relative group">
      {/* Browser window */}
      <div className="absolute inset-3 md:inset-4 rounded-md bg-[#1e1e1e] shadow-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1e1e1e] border-b border-white/[0.06]">
          <div className="flex gap-1">
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
            <div className="w-[6px] h-[6px] rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white/[0.06] rounded h-4 max-w-[120px] mx-auto" />
          </div>
          {/* Napkin icon in toolbar */}
          <div className="w-4 h-4 rounded bg-[#4DAD75]/20 flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#4DAD75]">N</span>
          </div>
        </div>

        <div className="flex h-[calc(100%-28px)]">
          {/* Page content */}
          <div className="flex-1 p-3 space-y-2">
            <div className="h-[5px] bg-white/[0.05] rounded w-3/4" />
            <div className="h-[5px] bg-white/[0.05] rounded w-1/2" />
            <div className="h-[5px] bg-white/[0.05] rounded w-5/6" />
            <div className="h-3" />
            <div className="h-[5px] bg-white/[0.05] rounded w-2/3" />
            <div className="h-[5px] bg-white/[0.05] rounded w-3/5" />
            <div className="h-[5px] bg-white/[0.05] rounded w-4/5" />
            <div className="h-3" />
            <div className="h-[5px] bg-white/[0.05] rounded w-1/2" />
            <div className="h-[5px] bg-white/[0.05] rounded w-3/4" />
          </div>

          {/* Side panel - slides in on hover */}
          <div className="w-[42%] bg-[#F5F6F7] border-l border-black/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-x-0 group-hover:translate-x-0 flex flex-col">
            {/* Panel header */}
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
                <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
              </div>
              <span className="text-[6px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
            </div>
            {/* Tabs */}
            <div className="px-1.5 pb-1">
              <div className="flex gap-0.5 bg-[#ECEEF0] rounded-full px-0.5 py-0.5">
                <div className="bg-white rounded-full px-1.5 py-0.5 shadow-sm">
                  <span className="text-[5px] font-medium text-[#1a1a1a]/70">1 Personal</span>
                </div>
                <div className="px-1.5 py-0.5">
                  <span className="text-[5px] text-[#1a1a1a]/30">2 Work</span>
                </div>
              </div>
            </div>
            {/* Note content */}
            <div className="flex-1 mx-1.5 mb-1.5 bg-white rounded p-2 space-y-1.5" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.25)" }}>
              <div className="text-[5px] font-semibold text-[#1a1a1a]/60">This week</div>
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10 flex items-center justify-center">
                  <span className="text-[3px] text-[#4DAD75]">✓</span>
                </div>
                <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-sm border border-[#1a1a1a]/10" />
                <div className="h-[3px] bg-[#1a1a1a]/[0.08] rounded w-2/3" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-sm border border-[#1a1a1a]/10" />
                <div className="h-[3px] bg-[#1a1a1a]/[0.08] rounded w-4/5" />
              </div>
              <div className="h-1" />
              <div className="text-[5px] font-semibold text-[#1a1a1a]/60">Ideas</div>
              <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-5/6" />
              <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
