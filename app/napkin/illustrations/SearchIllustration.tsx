"use client";
import { useState, useEffect } from "react";

const notes = [
  { name: "Biology Notes", preview: "flash cards (heart facts) Location: Between the two lungs an...", words: 266, match: true },
  { name: "Projects", preview: "Prime Video https://www.primevideo.com David Chang is the creative...", words: 941, match: false },
  { name: "Main", preview: "The Mind of a Chef 2012 Documentary 5 seasons YouTube PBS Food...", words: 894, match: true },
];

export default function SearchIllustration() {
  const [query, setQuery] = useState("");
  const target = "heart";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= target.length) {
        setQuery(target.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setQuery(""), 3000);
        setTimeout(() => {
          i = 0;
        }, 3500);
      }
    }, 200);
    const loop = setInterval(() => {
      let j = 0;
      const t = setInterval(() => {
        if (j <= target.length) {
          setQuery(target.slice(0, j));
          j++;
        } else {
          clearInterval(t);
          setTimeout(() => setQuery(""), 3000);
        }
      }, 200);
    }, 6000);
    return () => { clearInterval(timer); clearInterval(loop); };
  }, []);

  return (
    <div className="aspect-[16/9] rounded-lg bg-[#222] border border-white/[0.06] overflow-hidden relative">
      {/* Side panel mockup */}
      <div className="h-full bg-[#F5F6F7] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
              <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
            </div>
            <span className="text-[6px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6px] text-[#1a1a1a]/30">All notes</span>
            <span className="text-[6px] text-[#1a1a1a]/25">{notes.length} notes</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-3 pb-2">
          <div className="bg-white border border-[#1a1a1a]/[0.08] rounded-md flex items-center px-2 py-1 gap-1">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1a1a1a]/20 shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[7px] text-[#1a1a1a]/70 font-mono">
              {query}
              {query.length < target.length && <span className="inline-block w-px h-2 bg-[#4DAD75]/50 animate-pulse ml-px align-text-bottom" />}
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 px-3 space-y-1.5 overflow-hidden">
          {notes.map((note, i) => (
            <div
              key={i}
              className={`bg-white rounded-md p-2 border transition-all duration-300 ${
                query.length >= 3 && note.match
                  ? "border-[#4DAD75]/20 shadow-sm"
                  : query.length >= 3 && !note.match
                  ? "border-transparent opacity-40"
                  : "border-[#1a1a1a]/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[6px] font-semibold text-[#1a1a1a]/70">{note.name}</span>
                <span className="text-[5px] text-[#1a1a1a]/25">{note.words} words</span>
              </div>
              <div className="text-[5px] text-[#1a1a1a]/35 leading-relaxed line-clamp-2">
                {query.length >= 3 && note.match ? (
                  <span>
                    ...{note.preview.slice(0, 20)}
                    <span className="bg-[#4DAD75]/15 text-[#1a1a1a]/50 font-medium">{query}</span>
                    {note.preview.slice(20 + query.length)}
                  </span>
                ) : (
                  note.preview
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
