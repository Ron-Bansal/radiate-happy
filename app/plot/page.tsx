"use client";
import { useState, useMemo, useRef, useEffect } from "react";
// import { Project } from './plot-projects';

const plotStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

:root {
  --beige-50: #faf7f4;
  --beige-100: #f2ebe3;
  --beige-200: #e8ddd0;
  --beige-300: #d4c4b0;
  --beige-400: #b8a890;
  --sage-100: #e8ebe6;
  --sage-200: #d4dace;
  --sage-300: #b8c4b0;
  --sage-400: #98a890;
  --cognac: #b8875a;
  --saddle: #8b6642;
  --flax: #6b7264;
  --oyster: #9b9188;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.plot-root {
  font-family: 'Space Mono', 'Courier New', monospace;
}

.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.gradient-canvas {
  background: linear-gradient(
    135deg,
    #f5f0ea 0%,
    #ede6dc 20%,
    #e5ddd1 35%,
    #ddd4c6 50%,
    #d8d5ca 65%,
    #d5d8d0 80%,
    #d2dbd4 100%
  );
}

.dot {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dot:hover {
  transform: scale(1.6);
}

.panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--beige-300) transparent;
}

.panel-scroll::-webkit-scrollbar {
  width: 4px;
}

.panel-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.panel-scroll::-webkit-scrollbar-thumb {
  background: var(--beige-300);
  border-radius: 0;
}

.filter-btn {
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.filter-btn:hover {
  border-color: var(--beige-300);
}

.filter-btn.active {
  background: var(--beige-200);
  border-color: var(--beige-300);
}

.project-card {
  transition: all 0.2s ease;
  border: 1px solid var(--beige-200);
}

.project-card:hover {
  border-color: var(--beige-300);
  background: var(--beige-50);
}

.tag {
  color: var(--flax);
  font-size: 9px;
  text-transform: lowercase;
  letter-spacing: 0.3px;
  padding: 2px 6px;
  font-weight: 400;
  border: 1px solid var(--beige-300);
  background: transparent;
}

.status-badge {
  font-size: 11px;
  padding: 3px 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--flax);
}

.status-dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
}

.legend-filter {
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.legend-filter:hover {
  transform: translateY(-2px);
}

.legend-filter.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: currentColor;
}

.chart-outline {
  border: 1px solid rgba(107, 114, 100, 0.15);
}

.plot-root ::selection {
  background: var(--beige-300);
  color: var(--flax);
}

@media (max-width: 1024px) {
  .responsive-layout {
    flex-direction: column;
  }

  .responsive-panel {
    width: 100%;
    max-height: 50vh;
    border-left: none !important;
    border-top: 1px solid var(--beige-200);
  }
}
`;

type Project = {
  id: string;
  name: string;
  description: string;
  learning: string;
  state: "WIP" | "Complete" | "Active" | "Paused" | "Prototype" | "Concept";
  axes: { personal_shared: number; play_purpose: number };
  categories: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "draftline",
    name: "Draftline",
    description: "Writing studio designed for messy thinking and progessively iterating. Organize your unstructured thoughts and chisel your ideas to clarity. Trying to make writing feel less scary",
    learning:
      "This project taught me how fragmented my thinking actually is, and how interface design can remove mental blockers rather than add structure",
    state: "WIP",
    axes: { personal_shared: 40, play_purpose: 85 },
    categories: ["writing", "productivity", "tools"],
    tags: ["iteration", "clarity", "thinking"],
  },
  {
    id: "patina",
    name: "Patina",
    description: "Draw using only the colours from your webcam background on a nostalgic canvas",
    learning:
      "I realised I’m most creatively free when there’s no pressure for usefulness, only curiosity and play. Started with 'I wonder how I can make my webcam feel more fun'",
    state: "Complete",
    axes: { personal_shared: 15, play_purpose: 20 },
    categories: ["design", "visualisation"],
    tags: ["texture", "expression", "play"],
  },
  {
    id: "wander",
    name: "Wander",
    description: "A non-linear interface that encourages curious drifting through tangential topics.",
    learning:
      "Designing for exploration showed me how overwhelming information becomes without progressive disclosure",
    state: "WIP",
    axes: { personal_shared: 30, play_purpose: 70 },
    categories: ["productivity", "design", "tools"],
    tags: ["curiosity", "connections", "nonlinear"],
  },
  {
    id: "atrophy",
    name: "Atrophy",
    description: "Turns gym attendance into an honest cost-per-session mirror. Don't be the reason your gym makes money",
    learning:
      "Reframing effort as cost and waste changed how I think about motivation more than tracking ever did",
    state: "Prototype",
    axes: { personal_shared: 30, play_purpose: 80 },
    categories: ["fitness", "visualisation", "tools"],
    tags: ["reframing", "honesty", "feedback"],
  },
  {
    id: "story-content",
    name: "STORY framework partner for content",
    description: "Prompts rough ideas into clearer narratives and angles.",
    learning:
      "I learned that AI is better used to generate momentum through questions than drafting a full script",
    state: "Active",
    axes: { personal_shared: 45, play_purpose: 75 },
    categories: ["writing", "productivity"],
    tags: ["storytelling", "structure", "prompts"],
  },
  {
    id: "ripple",
    name: "Ripple",
    description: "An exploration of credit, influence, and idea lineage.",
    learning:
      "Trying to model attribution mechanically made me more aware of what ideas actually stick and quietly shape future thinking.",
    state: "Concept",
    axes: { personal_shared: 70, play_purpose: 80 },
    categories: ["productivity", "tools"],
    tags: ["attribution", "memory", "influence"],
  },
  {
    id: "tendril",
    name: "Tendril",
    description: "App to combat skill decay in junior doctors disguised as a Worldle-esque daily puzzle",
    learning:
      "This pushed me to think about how to make puzzles feel fun yet challenging",
    state: "Concept",
    axes: { personal_shared: 75, play_purpose: 85 },
    categories: ["education", "productivity"],
    tags: ["microlearning", "practice", "retention"],
  },
  {
    id: "receipt-workbench",
    name: "Receipt Workbench",
    description: "A receipt-style way to query personal finance - ask your money anything about your spending",
    learning:
      "People often don't care about dashboards - they just want easy answers to meaningful questions",
    state: "WIP",
    axes: { personal_shared: 35, play_purpose: 80 },
    categories: ["finance", "visualisation", "tools"],
    tags: ["metaphor", "clarity", "interface"],
  },
  {
    id: "covered",
    name: "Covered",
    description: "Fetches posters and cover art to track media",
    learning:
      "Even the most niche tools have a market. Valuable tools remove tiny repeated friction rather than adding power features",
    state: "Complete",
    axes: { personal_shared: 65, play_purpose: 75 },
    categories: ["tools", "productivity"],
    tags: ["automation", "flow", "metadata"],
  },
  {
    id: "headcount",
    name: "Headcount",
    description: "Visualise your metrics. Uses real crowds to make large numbers feel human.",
    learning:
      "People intuitively understand scale through imagery long before numbers",
    state: "Prototype",
    axes: { personal_shared: 45, play_purpose: 30 },
    categories: ["visualisation", "design"],
    tags: ["scale", "perception", "people"],
  },
  {
    id: "gracious",
    name: "Gracious",
    description: "Designed and developed a custom Shopify ecommerce store",
    learning:
      "Shopify Liquid is funky and using any platform has niche quirks and limitations",
    state: "Complete",
    axes: { personal_shared: 70, play_purpose: 75 },
    categories: ["ecommerce", "design"],
    tags: ["layout", "brand", "presentation"],
  },
  {
    id: "ai-chef",
    name: "AI Chef Assistant",
    description: "3 Hour hackathon project by ElevenLabs. A helper for meal ideas during decision fatigue.",
    learning:
      "Multi-modal capabilities are not easy and system prompt design requires a lot of care. But it's insane how much you can ship in just 3 hours with AI",
    state: "Prototype",
    axes: { personal_shared: 65, play_purpose: 60 },
    categories: ["ai", "tools"],
    tags: ["decision-fatigue", "prompts", "ux"],
  },
  {
    id: "c3",
    name: "C3",
    description: "Weekly curiosity-led classes for young students. Learning rooted in play",
    learning:
      "Teaching showed me that young students are naturally curious and thrive in environments that let explore their natural interests",
    state: "Active",
    axes: { personal_shared: 85, play_purpose: 90 },
    categories: ["education"],
    tags: ["curiosity", "collaboration", "learning"],
  },
  {
    id: "c3-curated",
    name: "C3 Curated",
    description: "A curated information diet for families.",
    learning:
      "I learned how difficult — and important — taste and constraint are in shaping learning environments.",
    state: "WIP",
    axes: { personal_shared: 80, play_purpose: 85 },
    categories: ["education", "tools"],
    tags: ["curation", "families", "signals"],
  },
  {
    id: "c3-sizzle",
    name: "C3 Sizzle",
    description: "A library of engaging warmups for classes. (the most anticipated + eager part of the classes)",
    learning:
      "Warmups aren’t filler - they set emotional tone and prime attention.",
    state: "WIP",
    axes: { personal_shared: 70, play_purpose: 65 },
    categories: ["education", "design"],
    tags: ["engagement", "attention", "warmups"],
  },
  {
    id: "moonstone",
    name: "Moonstone",
    description: "Playlist insights for faster trust and discovery.",
    learning:
      "This taught me full-stack development, the instability of APIs, and how much storytelling through design shapes understanding.",
    state: "Paused",
    axes: { personal_shared: 80, play_purpose: 85 },
    categories: ["music", "visualisation", "tools"],
    tags: ["taste", "signal", "distribution"],
  },
  {
    id: "tactictoe",
    name: "Tactictoe",
    description: "Tactical twist to a classic game - my first solo web dev project",
    learning:
      "Need a deep level of understanding before implementing a solution",
    state: "Complete",
    axes: { personal_shared: 40, play_purpose: 25 },
    categories: ["games"],
    tags: ["logic", "fun", "play"],
  },
  {
    id: "napkin",
    name: "Napkin",
    description: "A fast canvas for fleeting ideas.",
    learning:
      "Not a feature-rich project but most active users because it solves a simple problem, simply",
    state: "Complete",
    axes: { personal_shared: 25, play_purpose: 65 },
    categories: ["writing", "productivity"],
    tags: ["notes", "messy", "capture"],
  },
  {
    id: "colour-guesser",
    name: "Colour Guesser",
    description: "A perception game built around intuition.",
    learning:
      "Playful uncertainty is often more engaging than being correct.",
    state: "Complete",
    axes: { personal_shared: 50, play_purpose: 30 },
    categories: ["games", "design"],
    tags: ["colour", "perception", "intuition"],
  },
  {
    id: "speedround",
    name: "Speedround",
    description: "Timeboxed workouts with visual momentum.",
    learning:
      "Constraints turned motivation from a negotiation into a decision.",
    state: "Prototype",
    axes: { personal_shared: 30, play_purpose: 75 },
    categories: ["fitness", "productivity"],
    tags: ["timebox", "momentum", "focus"],
  },
  {
    id: "reel",
    name: "Reel",
    description: "Interactive 3D display of your recent movies and TV shows",
    learning:
      "WebGL even with AI is a pain to implement/tweak",
    state: "Complete",
    axes: { personal_shared: 20, play_purpose: 20 },
    categories: ["design", "visualisation"],
    tags: ["motion", "loops", "feel"],
  },
  {
    id: "order-builder-3d",
    name: "3D Order Builder",
    description: "A 3D interface for visualising shipping price logic.",
    learning:
      "Translating abstract pricing rules into spatial visuals dramatically improved comprehension - even when powered by the same underlying APIs.",
    state: "Complete",
    axes: { personal_shared: 85, play_purpose: 90 },
    categories: ["visualisation", "tools"],
    tags: ["pricing", "constraints", "3d"],
  },
  {
    id: "asterisk",
    name: "Asterisk",
    description: "Source-tracking for Figma elements.",
    learning:
      "Attribution only works when it’s captured at creation, not reconstructed later.",
    state: "Complete",
    axes: { personal_shared: 70, play_purpose: 85 },
    categories: ["design", "tools"],
    tags: ["metadata", "credit", "workflow"],
  },
  {
    id: "little-tap",
    name: "Little Tap",
    description: "Introducing experiences that convert in e-commerce to brick and motar stores. Turn customers into brand champions",
    learning:
      "I'm still so afraid of sales.",
    state: "WIP",
    axes: { personal_shared: 90, play_purpose: 90 },
    categories: ["tools", "productivity"],
    tags: ["nfc", "offline-to-online", "behaviour"],
  },
  {
    id: "excelnt",
    name: "Exceln’t",
    description: "Figma x Excel are my favourite tools - what if we combined them?",
    learning:
      "Reducing cognitive load can matter more than adding analytical power.",
    state: "Concept",
    axes: { personal_shared: 40, play_purpose: 70 },
    categories: ["finance", "tools", "visualisation"],
    tags: ["tables", "mental-load", "clarity"],
  },
  {
    id: "ember",
    name: "Ember",
    description: "Randomly discover saved bookmarks",
    learning:
      "Rediscovery is just as important as capture in knowledge systems",
    state: "Complete",
    axes: { personal_shared: 20, play_purpose: 35 },
    categories: ["tools", "productivity"],
    tags: ["memory", "serendipity", "links"],
  },
  {
    id: "twelve-week-year",
    name: "12 Week Year",
    description: "A cyclical personal planning system.",
    learning:
      "Short cycles created urgency without requiring a complete life reset.",
    state: "Active",
    axes: { personal_shared: 25, play_purpose: 85 },
    categories: ["productivity"],
    tags: ["planning", "reflection", "rhythm"],
  },
  {
    id: "trademe-lock",
    name: "TradeMe Lock",
    description: "A safety layer to prevent accidental actions.",
    learning:
      "Preventing a single mistake can build more trust than adding features.",
    state: "Prototype",
    axes: { personal_shared: 55, play_purpose: 70 },
    categories: ["tools"],
    tags: ["guardrails", "safety", "ux"],
  },
  {
    id: "ascent-lateral-raise-counter",
    name: "Ascent",
    description: "A rep counter for strength training.",
    learning:
      "Making effort visible in real time made consistency feel achievable.",
    state: "Prototype",
    axes: { personal_shared: 25, play_purpose: 60 },
    categories: ["fitness", "tools"],
    tags: ["feedback", "motivation", "tracking"],
  },
];

const lenses = [
  { id: "all", label: "All Projects" },

  { id: "education", label: "Education" },
  { id: "fitness", label: "Fitness" },
  { id: "ai", label: "AI" },
  { id: "music", label: "Music" },
  { id: "writing", label: "Writing" },
  { id: "finance", label: "Finance" },
  { id: "design", label: "Design" },
  { id: "productivity", label: "Productivity" },
  { id: "visualisation", label: "Visualisation" },
  { id: "tools", label: "Tools" },
  { id: "social", label: "Social" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "games", label: "Games" },
];

const statusFilters = [
  { id: "all", label: "All" },
  { id: "Complete", label: "Complete" },
  { id: "WIP", label: "In Progress" },
  { id: "Paused", label: "Paused" },
];

const getStatusLabel = (state: string) => {
  switch (state) {
    case "WIP":
      return "In Progress";
    case "Complete":
      return "Complete";
    case "Paused":
      return "Paused";
    default:
      return state;
  }
};

const getDotColor = (state: string) => {
  switch (state) {
    case "Complete":
      return "#8b6642";
    case "WIP":
      return "#b8875a";
    case "Paused":
      return "#9b9188";
    default:
      return "#6b7264";
  }
};

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLens, setActiveLens] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const cardRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesLens =
        activeLens === "all" || project.categories.includes(activeLens);
      const matchesStatus =
        activeStatus === "all" || project.state === activeStatus;
      return matchesLens && matchesStatus;
    });
  }, [activeLens, activeStatus]);

  const isProjectHighlighted = (project: Project) => {
    return filteredProjects.some((p) => p.name === project.name);
  };

  const getcategoriesCount = (categoriesId: string) => {
    if (categoriesId === "all") return projects.length;
    return projects.filter((p) => p.categories.includes(categoriesId)).length;
  };

  const getStatusCount = (statusId: string) => {
    if (statusId === "all") return projects.length;
    return projects.filter((p) => p.state === statusId).length;
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);

    setTimeout(() => {
      const cardElement = cardRefs.current[project.name];
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (selectedProject) {
      const cardElement = cardRefs.current[selectedProject.name];
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedProject]);

  return (
    <div className="plot-root gradient-canvas min-h-screen h-screen w-full flex responsive-layout relative overflow-hidden">
      <style jsx global>
        {plotStyles}
      </style>
      <div className="grain-overlay" />
      <div className="flex-1 flex flex-col p-4 lg:p-6 relative overflow-hidden">
        <header className="mb-8">
          <h1
            className="font-sans text-xl lg:text-2xl mb-1 font-medium"
            style={{ color: "var(--flax)" }}
          >
            Project Landscape
          </h1>
          <p
            className="text-xs tracking-wider uppercase"
            style={{ color: "var(--oyster)" }}
          >
            Mapping curiosity across play and purpose
          </p>
        </header>

        <div className="mb-6">
          <div>
            <h3
              className="text-[10px] tracking-[0.15em] uppercase font-bold mb-2"
              style={{ color: "var(--flax)" }}
            >
              Filter by category
            </h3>
            <div className="flex flex-wrap gap-2">
              {lenses.map((lens) => {
                const count = getcategoriesCount(lens.id);
                const isActive = activeLens === lens.id;
                return (
                  <button
                    key={lens.id}
                    onClick={() => setActiveLens(lens.id)}
                    className={`filter-btn text-[11px] px-3 py-1.5 ${isActive ? "active" : ""}`}
                    style={{
                      color: isActive ? "var(--saddle)" : "var(--flax)",
                      backgroundColor: isActive
                        ? "var(--beige-200)"
                        : "transparent",
                    }}
                  >
                    {lens.label}{" "}
                    <span style={{ color: "var(--oyster)" }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative chart-outline p-12"
              style={{ width: "60vmin", height: "60vmin" }}
            >
              {projects.map((project) => {
                const x = (project.axes.personal_shared / 100) * 100;
                const y = 100 - (project.axes.play_purpose / 100) * 100;
                const highlighted = isProjectHighlighted(project);
                const isSelected = selectedProject?.name === project.name;

                return (
                  <button
                    key={project.name}
                    className="dot absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: isSelected ? "12px" : "8px",
                      height: isSelected ? "12px" : "8px",
                      backgroundColor: getDotColor(project.state),
                      opacity: highlighted ? 1 : 0.2,
                      border: isSelected ? "2px solid var(--beige-50)" : "none",
                      boxShadow: isSelected
                        ? "0 0 0 1px var(--saddle)"
                        : "none",
                    }}
                    onClick={() => handleProjectClick(project)}
                  />
                );
              })}

              <div
                className="absolute text-[12px] tracking-[0.12em] uppercase font-bold"
                style={{
                  color: "var(--flax)",
                  left: "-90px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Personal
              </div>

              <div
                className="absolute text-[12px] tracking-[0.12em] uppercase font-bold"
                style={{
                  color: "var(--flax)",
                  right: "-70px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                Shared
              </div>

              <div
                className="absolute text-[12px] tracking-[0.12em] uppercase font-bold"
                style={{
                  color: "var(--flax)",
                  bottom: "-28px",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                }}
              >
                Play
              </div>

              <div
                className="absolute text-[12px] tracking-[0.12em] uppercase font-bold"
                style={{
                  color: "var(--flax)",
                  top: "-28px",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                }}
              >
                Purpose
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center gap-8 text-[9px] tracking-wider uppercase font-bold flex-wrap">
          {statusFilters.map((status) => {
            const count = getStatusCount(status.id);
            const isActive = activeStatus === status.id;
            const color =
              status.id === "all" ? "var(--flax)" : getDotColor(status.id);

            return (
              <button
                key={status.id}
                onClick={() => setActiveStatus(status.id)}
                className={`legend-filter ${isActive ? "active" : ""}`}
                style={{ color }}
              >
                <div className="flex items-center gap-2">
                  {status.id !== "all" && (
                    <div
                      className="w-2 h-2"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span>
                    {status.label}{" "}
                    <span style={{ color: "var(--oyster)" }}>({count})</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <aside
        className="w-full lg:w-[420px] flex flex-col max-h-screen responsive-panel"
        style={{
          backgroundColor: "var(--beige-50)",
          borderLeft: "1px solid var(--beige-200)",
        }}
      >
        <div className="flex-1 overflow-y-auto panel-scroll p-6 lg:p-8 space-y-4">
          {filteredProjects.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--oyster)" }}>
              No projects match current filters
            </p>
          ) : (
            filteredProjects.map((project) => {
              const isSelected = selectedProject?.name === project.name;
              return (
                <button
                  key={project.name}
                  ref={(el) => (cardRefs.current[project.name] = el)}
                  onClick={() => setSelectedProject(project)}
                  className="project-card w-full text-left p-6 block"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--beige-100)"
                      : "transparent",
                    borderColor: isSelected
                      ? "var(--beige-300)"
                      : "var(--beige-200)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="font-sans text-lg font-medium"
                      style={{ color: "var(--saddle)" }}
                    >
                      {project.name}
                    </h3>
                    <span className="status-badge shrink-0">
                      <div
                        className="status-dot"
                        style={{ backgroundColor: getDotColor(project.state) }}
                      />
                      {getStatusLabel(project.state)}
                    </span>
                  </div>

                  <p
                    className="text-[13px] leading-[1.6] mb-5"
                    style={{ color: "var(--flax)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;
