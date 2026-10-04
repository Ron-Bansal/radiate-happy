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

function BrowserChrome({ children, url, tabs }: { children: React.ReactNode; url: string; tabs?: { label: string; active?: boolean }[] }) {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col border border-[#1a1a1a]/[0.06]" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F0F0F0] border-b border-[#1a1a1a]/[0.06]">
        <div className="flex gap-[3px]">
          <div className="w-[5px] h-[5px] rounded-full bg-[#FF5F57]" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#28C840]" />
        </div>
        {tabs && (
          <div className="flex items-center gap-0.5 ml-1">
            {tabs.map((t) => (
              <div key={t.label} className={`inline-flex items-center rounded-[3px] h-[8px] ${t.active ? "bg-white shadow-[0_0.5px_1px_rgba(0,0,0,0.06)]" : "bg-transparent"}`}>
                <span className={`text-[3.5px] leading-none px-1 ${t.active ? "font-medium text-[#1a1a1a]/70" : "text-[#1a1a1a]/30"}`}>{t.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* URL bar */}
      <div className="px-2 py-1 bg-[#FAFAFA] border-b border-[#1a1a1a]/[0.04]">
        <div className="bg-[#F0F0F0] rounded-full px-2 py-[2px] flex items-center">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1a1a1a]/20 mr-1 shrink-0">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[4px] text-[#1a1a1a]/40 truncate">{url}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function BrowserWithSidePanel({ browserContent, browserUrl, browserTabs, noteContent }: {
  browserContent: React.ReactNode;
  browserUrl: string;
  browserTabs?: { label: string; active?: boolean }[];
  noteContent: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex gap-1.5">
      <div className="flex-1 min-w-0">
        <BrowserChrome url={browserUrl} tabs={browserTabs}>
          {browserContent}
        </BrowserChrome>
      </div>
      <div className="w-[42%] shrink-0">
        <NoteShell>{noteContent}</NoteShell>
      </div>
    </div>
  );
}

// ── Browser page content components ──

function TeamsCallPage() {
  return (
    <div className="p-2 h-full bg-[#292929]">
      <div className="grid grid-cols-2 gap-1 mb-1.5">
        {["AK", "JS", "MR", "TW"].map((initials) => (
          <div key={initials} className="aspect-video rounded bg-[#3a3a3a] flex items-center justify-center">
            <div className="w-[14px] h-[14px] rounded-full bg-[#4A78D0]/30 flex items-center justify-center">
              <span className="text-[4px] font-semibold text-[#7BA3E8]">{initials}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-1">
        <div className="w-[12px] h-[12px] rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-[4px] h-[3px] rounded-sm bg-white/40" />
        </div>
        <div className="w-[12px] h-[12px] rounded-full bg-[#D13438] flex items-center justify-center">
          <div className="w-[5px] h-[1.5px] bg-white rounded" />
        </div>
      </div>
    </div>
  );
}

function ArxivPage() {
  return (
    <div className="p-3 h-full bg-white">
      <div className="border-b border-[#1a1a1a]/[0.08] pb-1.5 mb-2">
        <div className="text-[5px] font-bold text-[#8B0000] mb-0.5">arXiv.org</div>
      </div>
      <div className="h-[4px] bg-[#1a1a1a]/[0.12] rounded w-[85%] mb-1" />
      <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[65%] mb-0.5" />
      <div className="h-[3px] bg-[#1a1a1a]/[0.06] rounded w-[70%] mb-2" />
      <div className="text-[4px] text-[#1a1a1a]/30 mb-1">Abstract</div>
      <div className="space-y-[3px]">
        <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-full" />
        <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[90%]" />
        <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[95%]" />
        <div className="h-[2.5px] bg-[#1a1a1a]/[0.05] rounded w-[70%]" />
      </div>
    </div>
  );
}

function GmailPage() {
  return (
    <div className="h-full bg-white flex">
      <div className="w-[18%] bg-[#F6F8FC] p-1.5 border-r border-[#1a1a1a]/[0.04]">
        <div className="w-full h-[8px] rounded-full bg-[#1A73E8]/15 mb-1 flex items-center justify-center">
          <span className="text-[3px] font-semibold text-[#1A73E8]">Compose</span>
        </div>
        <div className="space-y-[4px]">
          {["Inbox", "Sent", "Drafts"].map((l) => (
            <div key={l} className="h-[3px] rounded bg-[#1a1a1a]/[0.04] w-[80%]" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-2">
        <div className="space-y-[3px]">
          {[0.9, 0.85, 0.7].map((w, i) => (
            <div key={i} className="flex items-center gap-1 py-[2px] border-b border-[#1a1a1a]/[0.03]">
              <div className="w-[4px] h-[4px] rounded-full bg-[#1a1a1a]/[0.06]" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.08] rounded" style={{ width: `${w * 30}%` }} />
              <div className="flex-1" />
              <div className="h-[2.5px] bg-[#1a1a1a]/[0.04] rounded w-[15%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function YoutubePage() {
  return (
    <div className="h-full bg-[#0f0f0f]">
      <div className="w-full aspect-video bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-[16px] h-[12px] rounded bg-[#FF0000]/80 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[5px] border-l-white border-y-[3px] border-y-transparent ml-0.5" />
        </div>
      </div>
      <div className="p-2">
        <div className="h-[3px] bg-white/[0.12] rounded w-[80%] mb-1" />
        <div className="h-[2.5px] bg-white/[0.06] rounded w-[50%]" />
      </div>
    </div>
  );
}

// ── Exported use case components ──

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
  const noteContent = (
    <>
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
    </>
  );

  return (
    <BrowserWithSidePanel
      browserUrl="teams.microsoft.com/meeting"
      browserTabs={[{ label: "Teams", active: true }, { label: "Calendar" }]}
      browserContent={<TeamsCallPage />}
      noteContent={noteContent}
    />
  );
}

export function ResearchNote() {
  const noteContent = (
    <>
      <div className="text-[6px] font-semibold text-[#1a1a1a]/60 mb-1.5">🔬 Transformer architectures</div>
      <div className="space-y-[5px] text-[5px] text-[#1a1a1a]/50 leading-relaxed">
        <p>&quot;Attention mechanism lets the model weigh relevance of each token&quot;</p>
        <p className="text-[#4DAD75]/60 underline">arxiv.org/abs/1706.03762</p>
        <ImageSkeleton className="w-[80%] h-[22px] my-1" />
        <p>Key difference: self-attention vs cross-attention</p>
        <div className="h-[3px] bg-[#1a1a1a]/[0.05] rounded w-[70%]" />
      </div>
    </>
  );

  return (
    <BrowserWithSidePanel
      browserUrl="arxiv.org/abs/1706.03762"
      browserContent={<ArxivPage />}
      noteContent={noteContent}
    />
  );
}

export function QuickDraftsNote() {
  const noteContent = (
    <>
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
      </div>
    </>
  );

  return (
    <BrowserWithSidePanel
      browserUrl="mail.google.com/mail/u/0/#inbox"
      browserTabs={[{ label: "Gmail", active: true }, { label: "Calendar" }]}
      browserContent={<GmailPage />}
      noteContent={noteContent}
    />
  );
}

export function StudyNotesNote() {
  const noteContent = (
    <>
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
    </>
  );

  return (
    <BrowserWithSidePanel
      browserUrl="youtube.com/watch?v=econ201-lecture7"
      browserTabs={[{ label: "YouTube", active: true }, { label: "Slides" }]}
      browserContent={<YoutubePage />}
      noteContent={noteContent}
    />
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
