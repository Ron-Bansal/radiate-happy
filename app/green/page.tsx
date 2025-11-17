"use client";

import { useEffect, useState } from "react";

type Tab = "projects" | "playground" | "writing";

type Project = {
  id: string;
  name: string;
  tagline: string;
  role?: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: "moonstone",
    name: "Moonstone",
    tagline: "Insightful way to connect with music.",
    role: "Product · Design · Code",
    images: [
        "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "glowstick",
    name: "Glowstick",
    tagline: "Tap-to-share playlists & reviews with NFC.",
    role: "Concept · Product",
    images: [
      "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "napkin-notes",
    name: "Napkin Notes",
    tagline: "Side-panel canvas for quick thinking.",
    role: "Product · Design",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "asterisk",
    name: "Asterisk",
    tagline: "Tiny experiments that explore music & taste.",
    role: "Playground",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [phase, setPhase] = useState<"entering" | "leaving">("entering");
  const [timeNZ, setTimeNZ] = useState<string>("");

  // Local NZ time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-NZ", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Pacific/Auckland",
      });
      setTimeNZ(formatted);
    };
    updateTime();
    const id = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // initial enter
  useEffect(() => {
    setPhase("entering");
  }, []);

  const handleTabClick = (next: Tab) => {
    if (next === activeTab) return;
    setPhase("leaving");
    setTimeout(() => {
      setActiveTab(next);
      setPhase("entering");
    }, 340); // matches transition
  };

  const sheetTransformClass =
    phase === "leaving"
      ? "translate-x-full opacity-0"
      : "translate-x-0 opacity-100";

  // build 2 masonry columns while preserving left→right order
  const columns = 2;
  const columnProjects: Project[][] = Array.from({ length: columns }, () => []);
  projects.forEach((project, index) => {
    columnProjects[index % columns].push(project);
  });

  return (
    <>
      {/* Apply Epilogue globally without extra files */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700&display=swap");
        html,
        body {
          font-family: "Epilogue", system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }
      `}</style>

      <main className="min-h-screen xbg-[#FBEDC6] text-[#1C180C] bg-cover bg-center bg-no-repeat bg-[url('/assets/garden/hilly-gradient2.png')]"> 
        <div className="mx-auto flex max-w-[2100px] flex-col gap-10 px-6 py-8 lg:flex-row lg:px-10 lg:py-2">
          {/* LEFT COLUMN */}
          <aside className="flex w-full flex-col gap-10 lg:w-[33%] lg:justify-between">
            <div className="space-y-6">
              <div>
                <h1 className="mt-2 text-4xl xfont-medium leading-tight text-[#424D08] mt-8">
                  Hi, I&apos;m Raunaq :)
                </h1>
                <p className="mt-4 max-w-sm text-[14px] xleading-tight text-[#3d3d3d]">
                  Deeply inspired by mission, culture, and approach to product.
                  This site is an expression of what excites me, how I think,
                  and where I hope to contribute.
                </p>
              </div>

              {/* NAV – sticky on mobile only */}
              <nav className="sticky top-0 z-20 -mx-6 border-b border-black/5 bg-[#FBEDC6]/95 px-6 py-3 lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:py-0">
                <div className="flex gap-6 text-[12px] font-medium">
                  <TabLink
                    label="Projects"
                    isActive={activeTab === "projects"}
                    onClick={() => handleTabClick("projects")}
                  />
                  <TabLink
                    label="Playground"
                    isActive={activeTab === "playground"}
                    onClick={() => handleTabClick("playground")}
                  />
                  <TabLink
                    label="Writing"
                    isActive={activeTab === "writing"}
                    onClick={() => handleTabClick("writing")}
                  />
                </div>
              </nav>
            </div>

            <div className="space-y-2 text-[12px] text-neutral-800">
              <p>
                {timeNZ && (
                  <>
                    Local time: <span className="font-medium">{timeNZ}</span>
                    {" · "}
                  </>
                )}
                Auckland, New Zealand
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="mailto:hello@raunaqbansal.com"
                  className="border border-[#424D08] bg-[#FBEDC6] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#424D08] transition-transform duration-150 hover:-translate-y-[1px]"
                >
                  Get in touch
                </a>
                <a
                  href="https://www.linkedin.com"
                  className="text-[12px] underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com"
                  className="text-[12px] underline-offset-4 hover:underline"
                >
                  X
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT SHEET */}
          <section className="w-full lg:w-[67%]">
            <div
              className={`border border-white/45 bg-white/40 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transform-gpu transition-all duration-500 ease-[cubic-bezier(0.19,0.9,0.22,1)] ${sheetTransformClass}`}
            >
              {/* sheet header */}
              <header className="flex items-center justify-between border-b border-white/55 px-8 py-2 text-[12px] text-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-[#424D08]" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] uppercase tracking-[0.26em]">
                      {activeTab}
                    </span>
                  </div>
                </div>
              </header>

              {/* sheet content – independent scroll area */}
              <div className="max-h-[80vh] overflow-y-auto px-8 pb-10 pt-6">
                {activeTab === "projects" && (
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {columnProjects.map((column, colIndex) => (
                      <div key={colIndex} className="grid gap-10">
                        {column.map((project) => (
                          <ProjectBlock key={project.id} project={project} />
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "playground" && (
                  <PlaceholderPanel label="Playground" />
                )}
                {activeTab === "writing" && (
                  <PlaceholderPanel label="Writing" />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* ---------- components ---------- */

function TabLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 pb-1 uppercase tracking-[0.18em] transition-colors ${
        isActive
          ? "border-[#424D08] text-[#424D08]"
          : "border-transparent text-neutral-700 hover:border-neutral-500"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const total = project.images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <article className="space-y-4">
      {/* image frame + carousel */}
      <div className="relative w-full bg-black/5 xshadow-[0_18px_60px_rgba(0,0,0,0.32)]">
        <div className="flex h-full min-h-[220px] max-h-[420px] w-full items-center justify-center">
          <img
            src={project.images[index]}
            alt={project.name}
            className="block h-auto xmax-h-[420px] w-full object-contain"
          />
        </div>

        {total > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[12px] text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                prev();
              }}
              className="flex h-7 w-7 items-center justify-center bg-black/65 text-[11px]"
            >
              ←
            </button>
            <div className="flex items-center gap-[3px] bg-black/55 px-2 py-[3px]">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-[7px] w-[7px] ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                next();
              }}
              className="flex h-7 w-7 items-center justify-center bg-black/65 text-[11px]"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* text stack – 4pt scale */}
      <div className="space-y-1 text-neutral-900">
        <h2 className="text-[18px] font-semibold tracking-tight">
          {project.name}
        </h2>
        <p className="text-[14px] leading-snug text-neutral-700">
          {project.tagline}
        </p>
        {project.role && (
          <p className="mt-[1px] text-[12px] text-neutral-500">
            {project.role}
          </p>
        )}
      </div>
    </article>
  );
}

function PlaceholderPanel({ label }: { label: string }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center text-center text-[14px] text-neutral-700">
      <div>
        <p className="text-[12px] uppercase tracking-[0.26em] text-neutral-500">
          Coming soon
        </p>
        <p className="mt-2">
          {label} will open in this same sheet layout, with its own grid of
          entries.
        </p>
      </div>
    </div>
  );
}