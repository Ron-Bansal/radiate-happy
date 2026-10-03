"use client";

export default function RichTextIllustration() {
  return (
    <div className="aspect-[4/3] rounded-lg bg-[#f0f0ee] overflow-hidden relative flex items-center justify-center p-6 md:p-8">
      {/* Stacked note pages behind */}
      <div className="absolute w-[75%] h-[78%] bg-white/60 rounded-lg border border-[#1a1a1a]/[0.04] translate-x-2 translate-y-2" />

      {/* Main note card */}
      <div className="relative w-[75%] bg-white rounded-lg border border-[#1a1a1a]/[0.06] shadow-sm overflow-hidden">
        {/* Floating toolbar */}
        <div className="mx-auto w-fit -mt-1 relative z-10">
          <div className="flex items-center gap-0 bg-white rounded-lg border border-[#1a1a1a]/[0.08] shadow-md px-1 py-1 -translate-y-1">
            <div className="w-5 h-5 rounded bg-[#4DAD75]/10 flex items-center justify-center">
              <span className="text-[7px] font-bold text-[#4DAD75]">B</span>
            </div>
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-[7px] italic text-[#1a1a1a]/35">I</span>
            </div>
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-[7px] font-semibold text-[#1a1a1a]/35">H</span>
            </div>
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1a1a1a]/35">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-px h-3 bg-[#1a1a1a]/[0.06] mx-0.5" />
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1a1a1a]/35">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-[9px] font-serif text-[#1a1a1a]/35">&ldquo;</span>
            </div>
          </div>
          {/* Triangle pointer */}
          <div className="w-2 h-2 bg-white border-r border-b border-[#1a1a1a]/[0.08] rotate-45 mx-auto -mt-1.5 relative z-[-1]" />
        </div>

        {/* Note content with highlighted selection */}
        <div className="px-4 pb-4 pt-1 space-y-[6px]">
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[60%]" />
          <div className="h-[4px] bg-[#4DAD75]/20 rounded w-[80%]" />
          <div className="h-[4px] bg-[#4DAD75]/20 rounded w-[70%]" />
          <div className="h-2" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[75%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[55%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[85%]" />
          <div className="h-2" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[65%]" />
          <div className="h-[4px] bg-[#1a1a1a]/[0.07] rounded w-[45%]" />
        </div>
      </div>
    </div>
  );
}
