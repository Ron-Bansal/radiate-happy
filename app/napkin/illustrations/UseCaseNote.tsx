"use client";

function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/[0.04] flex items-center justify-center ${className}`}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a]/[0.06]">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function NoteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-[#F5F6F7] rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1 px-2.5 py-1.5">
        <div className="w-3 h-3 rounded bg-[#4DAD75]/15 flex items-center justify-center">
          <span className="text-[4px] font-bold text-[#4DAD75]">N</span>
        </div>
        <span className="text-[6px] font-semibold text-[#1a1a1a]/70">Napkin Notes</span>
      </div>
      <div className="flex-1 mx-1.5 mb-1.5 bg-white rounded p-2.5 overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(77,173,117,0.15)" }}>
        {children}
      </div>
    </div>
  );
}

export function CaptureIdeasNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">💡 Ideas</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p>App that shows you one random saved bookmark a day</p>
        <p className="text-[#1a1a1a]/30">Newsletter but it&apos;s just links to local events</p>
        <ImageSkeleton className="w-[70%] h-[18px] my-1" />
        <p>Chrome ext that dims tabs you haven&apos;t looked at in 30min</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-4/5" />
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-3/5" />
      </div>
    </NoteShell>
  );
}

export function MeetingNotesNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">Standup — Oct 4</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p className="font-medium text-[#1a1a1a]/40">Action items</p>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10 shrink-0" />
          <span>Send revised timeline to Sarah</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10 shrink-0" />
          <span>Review PR #342 before EOD</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10 shrink-0" />
          <span>Book room for Wed retro</span>
        </div>
        <div className="h-1" />
        <p className="font-medium text-[#1a1a1a]/40">Decisions</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[85%]" />
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-3/5" />
      </div>
    </NoteShell>
  );
}

export function ResearchNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">🔬 Transformer architectures</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p>&quot;Attention mechanism lets the model weigh relevance of each token&quot;</p>
        <p className="text-[#4DAD75]/60 underline">arxiv.org/abs/1706.03762</p>
        <ImageSkeleton className="w-[80%] h-[22px] my-1" />
        <p>Key difference: self-attention vs cross-attention</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[70%]" />
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[55%]" />
      </div>
    </NoteShell>
  );
}

export function QuickDraftsNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">Reply to James</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p>Hey James,</p>
        <p>Thanks for sending that over. A few thoughts:</p>
        <div className="pl-1.5 border-l border-[#1a1a1a]/[0.08] space-y-[3px]">
          <p>• Scope looks right but timeline feels tight</p>
          <p>• Can we push the design review to week 3?</p>
          <p>• Budget needs sign-off from finance first</p>
        </div>
        <div className="h-1" />
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-2/3" />
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-1/2" />
      </div>
    </NoteShell>
  );
}

export function StudyNotesNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">📖 Econ 201 — Ch. 7</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p className="font-medium text-[#1a1a1a]/40">Elasticity of demand</p>
        <p>% change in quantity / % change in price</p>
        <p className="text-[#1a1a1a]/30">Elastic &gt; 1, Inelastic &lt; 1, Unit elastic = 1</p>
        <div className="h-1" />
        <p className="font-medium text-[#1a1a1a]/40">Key factors</p>
        <p>• Availability of substitutes</p>
        <p>• Necessity vs luxury</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[65%]" />
      </div>
    </NoteShell>
  );
}

export function DailyTasksNote() {
  return (
    <NoteShell>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">📋 Today</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p className="font-semibold text-[#1a1a1a]/35 text-[4.5px] uppercase tracking-wide">Urgent + important</p>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#4DAD75]/40 bg-[#4DAD75]/10 shrink-0" />
          <span>Submit Q4 budget proposal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10 shrink-0" />
          <span>Fix auth bug (blocks release)</span>
        </div>
        <div className="h-0.5" />
        <p className="font-semibold text-[#1a1a1a]/35 text-[4.5px] uppercase tracking-wide">Important, not urgent</p>
        <div className="flex items-center gap-1">
          <div className="w-[4px] h-[4px] rounded-sm border border-[#1a1a1a]/10 shrink-0" />
          <span>Plan onboarding for new hire</span>
        </div>
        <div className="h-0.5" />
        <p className="font-semibold text-[#1a1a1a]/35 text-[4.5px] uppercase tracking-wide">Urgent, not important</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[70%]" />
        <div className="h-0.5" />
        <p className="font-semibold text-[#1a1a1a]/35 text-[4.5px] uppercase tracking-wide">Neither</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[55%]" />
      </div>
    </NoteShell>
  );
}
