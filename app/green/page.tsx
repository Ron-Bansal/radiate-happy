"use client";

import { useEffect, useState } from "react";

type Tab = "projects" | "experiments" | "writing";

type Project = {
  id: string;
  name: string;
  tagline: string;
  details?: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: "moonstone",
    name: "Moonstone",
    tagline: "Insightful way to connect with music.",
    details: "Web app ⋅ Over 42,000 playlists analysed",
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
    details: "SaaS business idea",
    images: [
      "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "napkin-notes",
    name: "Napkin Notes",
    tagline: "Side-panel canvas for quick thinking.",
    details: "Chrome extension · 300+ active users",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "asterisk",
    name: "Asterisk",
    tagline: "Tiny experiments that explore music & taste.",
    details: "Figma plugin ⋅ 35 users",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "headcount",
    name: "Headcount",
    tagline: "Visualise human impact",
    details: "Web app",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "c3",
    name: "Curious & Creative Club",
    tagline: "Learn by building",
    details: "Weekly classes",
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
  const [temperature, setTemperature] = useState<string | null>(null);

  // Local NZ time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-NZ", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Pacific/Auckland",
      });
      setTimeNZ(formatted);
    };
    updateTime();
    const id = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Auckland coords
    const latitude = -36.8485;
    const longitude = 174.7633;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=Pacific%2FAuckland`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.current?.temperature_2m !== undefined) {
          setTemperature(`${Math.round(data.current.temperature_2m)}°C`);
        }
      })
      .catch(() => {
        // fail silently – just don't show temp
      });
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

      <main className="min-h-screen xbg-[#FBEDC6] text-[#1C180C] bg-cover xbg-[position:50%_65%] lg:bg-center bg-no-repeat bg-[url('/assets/garden/hilly-gradient2.png')]">
        {" "}
        <div className="mx-auto min-h-screen flex max-w-[2100px] flex-col gap-10 px-2 xpy-8 lg:flex-row lg:px-0 lg:pl-10 lg:py-4">
          {/* LEFT COLUMN */}
          <aside className="flex w-full flex-col gap-10 lg:w-[33%] lg:justify-between">
            <div className="space-y-6 px-4 lg:px-0">
              <div>
                <h1 className="mt-8 text-4xl xfont-medium leading-tight text-[#424D08]">
                  Hi, I&apos;m Raunaq :)
                </h1>
                <p className="mt-4 max-w-sm text-sm xleading-tight text-[#3d3d3d]">
                  Deeply inspired by mission, culture, and approach to product.
                  This site is an expression of what excites me, how I think,
                  and where I hope to contribute.
                </p>
              </div>

              {/* NAV – sticky on mobile only */}
              <nav className="sticky top-0 z-20 -mx-6 border-b border-black/5 bg-[#FBEDC6]/95 px-6 py-3 lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:py-0">
                <div className="flex gap-6 text-xs">
                  <TabLink
                    label="Projects"
                    isActive={activeTab === "projects"}
                    onClick={() => handleTabClick("projects")}
                  />
                  <TabLink
                    label="Experiments"
                    isActive={activeTab === "experiments"}
                    onClick={() => handleTabClick("experiments")}
                  />
                  <TabLink
                    label="Writing"
                    isActive={activeTab === "writing"}
                    onClick={() => handleTabClick("writing")}
                  />
                </div>
              </nav>
            </div>

            <div className="flex flex-col xspace-y-2 text-sm text-[#FCEDC9] ztracking-tight mb-4 px-4 lg:px-0">
              <div className="hidden flex flex-row gap-3 text-[#424D08] pb-2 lg:block lg:pb-8 lg:text-[#FCEDC9] text-xs">
                <p className="pb-1 flex gap-2 items-center">
                  {timeNZ && <span className="xfont-medium">{timeNZ}</span>}
                  {temperature && <span>· {temperature}</span>}
                </p>
                <p className=""> Auckland, New Zealand</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-[#424D08] lg:text-[#FBEDC6]">
                <a
                  href="mailto:hello@raunaqbansal.com"
                  className="border border-[#424D08] bg-[#FBEDC6] px-4 py-1.5 text-sm text-[#424D08] transition-transform duration-150 hover:-translate-y-[1px]"
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
          <section className="w-full lg:w-[67%] lg:h-full">
            <div
              className={`flex flex-col lg:min-h-[calc(100vh-32px)] border border-white/45 bg-white/40 xshadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transform-gpu transition-all duration-500 ease-[cubic-bezier(0.19,0.9,0.22,1)] ${sheetTransformClass}`}
            >
              {/* sheet header */}
              <header className="flex items-center justify-between border-b border-white/55 px-8 py-1 text-[12px] text-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-[#424D08]" />
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[13px] uppercase tracking-[0.08em]">
                      {activeTab}
                    </span>
                  </div>
                </div>
              </header>

              {/* sheet content – page scroll on mobile, independent scroll on lg */}
              <div className="px-8 pb-0 pt-6 lg:flex-1 lg:max-h-[90vh] lg:overflow-y-auto">
                {activeTab === "projects" && (
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {columnProjects.map((column, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-10">
                        {column.map((project) => (
                          <ProjectBlock key={project.id} project={project} />
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "experiments" && (
                  <PlaceholderPanel label="Experiments" />
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
      className={`border-b-2 pb-0.5 transition-colors ${
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
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={project.images[index]}
            alt={project.name}
            className="block h-auto w-full object-contain"
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
      <div className="space-y-1 text-[#3d3d3d]">
        <h2 className="text-[18px] font-medium tracking-tight">
          {project.name}
        </h2>
        <p className="text-[14px] leading-snug text-[#3d3d3d]">
          {project.tagline}
        </p>
        {project.details && (
          <p className="mt-[1px] text-[12px] text-neutral-500">
            {project.details}
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
