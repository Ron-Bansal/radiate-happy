"use client";

export default function LocalPrivateIllustration() {
  return (
    <div className="aspect-[4/3] rounded-lg bg-[#f0f0ee] overflow-hidden relative flex items-center justify-center">
      <div className="relative">
        <div className="w-[140px] h-[90px] bg-white rounded-lg border border-[#1a1a1a]/[0.08] shadow-sm overflow-hidden">
          <div className="p-2.5 space-y-1.5">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-2.5 h-2.5 rounded bg-[#4DAD75]/15 flex items-center justify-center">
                <span className="text-[3.5px] font-bold text-[#4DAD75]">N</span>
              </div>
              <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-12" />
            </div>
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-full" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-4/5" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-5/6" />
            <div className="h-1.5" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-3/4" />
            <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-2/3" />
          </div>
        </div>
        <div className="w-[160px] h-[6px] bg-[#e8e8e6] rounded-b-lg mx-auto -mt-px border-t border-[#1a1a1a]/[0.04]" />

        {/* Shield */}
        <div className="absolute -top-2 -right-3 w-8 h-9">
          <svg viewBox="0 0 32 36" fill="none" className="w-full h-full">
            <path d="M16 2 L28 8 V18 C28 26 22 32 16 34 C10 32 4 26 4 18 V8 L16 2Z" fill="#4DAD75" fillOpacity="0.12" stroke="#4DAD75" strokeWidth="1.2" strokeOpacity="0.4" />
            <rect x="12" y="13" width="8" height="6" rx="1" fill="none" stroke="#4DAD75" strokeWidth="1.2" strokeOpacity="0.5" />
            <path d="M13.5 13 V11 C13.5 9.5 14.5 8.5 16 8.5 C17.5 8.5 18.5 9.5 18.5 11 V13" fill="none" stroke="#4DAD75" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
            <circle cx="16" cy="16.5" r="1" fill="#4DAD75" fillOpacity="0.5" />
          </svg>
        </div>

        {/* No cloud */}
        <div className="absolute -bottom-1 -left-4 w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
            <path d="M8 22 C4 22 2 19.5 2 17 C2 14.5 4 12.5 6.5 12 C6.5 8 9.5 5 13 5 C15.5 5 17.5 6.5 18.5 8.5 C19 8.2 19.5 8 20.5 8 C23 8 25 10 25 12.5 C27 13 28.5 15 28.5 17.5 C28.5 20 26.5 22 24 22" stroke="#1a1a1a" strokeWidth="1.2" strokeOpacity="0.12" strokeLinecap="round" />
            <line x1="5" y1="5" x2="27" y2="27" stroke="#e74c3c" strokeWidth="1.5" strokeOpacity="0.35" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
