// page.tsx (or PortfolioPage.tsx)
"use client";

import { useEffect, useState } from "react";
import type { Tab, Project } from "./portfolio-content";
import {
  projects,
  experimentVisuals,
  writingEntries,
} from "./portfolio-content";
import {
  TabLink,
  ProjectBlock,
  ExperimentVisualBlock,
  WritingBlock,
} from "./portfolio-components";
import Copy from "../components/BlockRevealCopy";

const tabOrder: Tab[] = ["projects", "experiments", "writing"];

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

  // Temperature
  useEffect(() => {
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
        // fail silently
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
    }, 420);
  };

  const sheetTransformClass =
    phase === "leaving"
      ? "translate-x-full opacity-0 scale-90"
      : "translate-x-0 opacity-100 scale-100";

  // build 2 masonry columns while preserving left→right order
  const columns = 2;
  const columnProjects: Project[][] = Array.from({ length: columns }, () => []);
  projects.forEach((project, index) => {
    columnProjects[index % columns].push(project);
  });

  const goToPrevTab = () => {
    const index = tabOrder.indexOf(activeTab);
    if (index > 0) handleTabClick(tabOrder[index - 1]);
  };

  const goToNextTab = () => {
    const index = tabOrder.indexOf(activeTab);
    if (index < tabOrder.length - 1) handleTabClick(tabOrder[index + 1]);
  };

  return (
    <>
      {/* Epilogue font */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700&display=swap");
        html,
        body {
          font-family: "Epilogue", system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }
      `}</style>

      <main className="min-h-screen bg-fixed xbg-[#FBEDC6] text-[#1C180C] bg-[length:auto_120%] lg:bg-cover bg-[position:50%_65%] lg:bg-center bg-no-repeat xbg-[url('')] bg-[url('/assets/garden/hilly-gradient2.png')]">
        <div className="mx-auto min-h-screen flex max-w-[2100px] flex-col gap-10 px-2 xpy-8 lg:flex-row lg:px-0 lg:pl-10 lg:py-4">
          {/* LEFT COLUMN */}
          <aside className="flex w-full flex-col gap-10 lg:w-[33%] lg:justify-between">
            <div className="space-y-6 px-4 lg:px-0">
              <Copy
                blockColor="#8BAA52"
                delay={0.42}
                stagger={0.18}
                duration={0.9}
              >
                <div>
                  <p className="mt-8 text-xs tracking-wide text-[#424D08]/80">
                    Product Designer & Creative Developer
                  </p>
                  <h1 className="mt-1.5 mb-4 text-5xl xfont-medium leading-tight text-[#424D08]">
                    Hi, I&apos;m Raunaq :)
                  </h1>

                  <p className="xmt-4  max-w-sm text-sm leading-[1.45] text-[#3d3d3d]">
                    I love exploring creative itches and building things – small
                    experiments, tools that spark delight, and ideas that grow
                    by accident.
                  </p>
                </div>
              </Copy>

              {/* NAV – sticky on mobile only */}
              <nav className="sticky top-0 z-20 -mx-6 border-b border-black/5 bg-[#FBEDC6]/95 px-6 py-3 lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:mt-8">
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
                <p>Auckland, New Zealand</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-[#424D08] lg:text-[#FBEDC6]">
                <a
                  href="mailto:raunvq@gmail.com"
                  className="border border-[#424D08] bg-[#FBEDC6] px-4 py-1.5 text-sm text-[#424D08] transition-transform duration-150 hover:-translate-y-[1px]"
                >
                  Get in touch
                </a>
                <a
                  href="https://www.linkedin.com/in/ron-bansal/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[12px] underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/raunvq"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[12px] underline-offset-4 hover:underline"
                >
                  X
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT SHEET */}
          <section className="w-full lg:w-[67%] lg:h-full ">
            <div
              className={`flex flex-col pb-4 lg:pb-0 lg:min-h-[calc(100vh-32px)] border border-white/45 bg-white/40 bg-[#fdedc91a] hover:bg-[#fdedc960] xshadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm hover:backdrop-blur-2xl transform-gpu transition-all duration-700 ease-[cubic-bezier(0.19,0.9,0.22,1)] ${sheetTransformClass}`}
            >
              <header className="flex items-center justify-between border-b border-white/55 px-8 py-1 text-[12px] text-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-[#424D08]" />
                  <span className="pt-1 text-[13px] uppercase tracking-[0.08em]">
                    {activeTab}
                  </span>
                </div>

                {/* subtle left/right arrows */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={goToPrevTab}
                    disabled={activeTab === tabOrder[0]}
                    aria-label="Previous section"
                    className={`
        h-6 w-6 flex items-center justify-center
        transition-colors duration-150
        ${
          activeTab === tabOrder[0]
            ? "text-neutral-400 cursor-default"
            : "text-neutral-700 hover:text-[#424D08]"
        }
      `}
                  >
                    ←
                  </button>

                  <button
                    onClick={goToNextTab}
                    disabled={activeTab === tabOrder[tabOrder.length - 1]}
                    aria-label="Next section"
                    className={`
        h-6 w-6 flex items-center justify-center
        transition-colors duration-150
        ${
          activeTab === tabOrder[tabOrder.length - 1]
            ? "text-neutral-400 cursor-default"
            : "text-neutral-700 hover:text-[#424D08]"
        }
      `}
                  >
                    →
                  </button>
                </div>
              </header>

              {/* sheet content */}
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
                  <div className="flex flex-wrap gap-6">
                    {experimentVisuals.map((item) => {
                      // width control
                      let sizeClass = "basis-full";

                      if (item.size === 25) {
                        sizeClass = "basis-3/4 sm:basis-1/2 lg:basis-1/3";
                      } else if (item.size === 50) {
                        sizeClass = "basis-3/4 sm:basis-2/3 lg:basis-1/2";
                      } else if (item.size === 75) {
                        sizeClass = "basis-full sm:basis-4/5 lg:basis-3/4";
                      } else if (item.size === 100) {
                        sizeClass = "basis-full";
                      }

                      // alignment control
                      let alignClass = "";
                      if (item.align === "center") alignClass = "mx-auto";
                      else if (item.align === "right") alignClass = "ml-auto";

                      return (
                        <div
                          key={item.id}
                          className={`${sizeClass} ${alignClass}`}
                        >
                          <ExperimentVisualBlock item={item} />
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === "writing" && (
                  <div className="space-y-6">
                    {writingEntries.map((entry) => (
                      <WritingBlock key={entry.id} entry={entry} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
