"use client";
import { useState, useMemo, useRef, useEffect } from "react";
// import { Project } from './plot-projects';

const plotStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

:root {
  --beige-50: #F7F2EB;
  --beige-100: #FAF8F5;
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
  state: "Concept" | "Exploring" | "Active" | "Complete";
  axes: { personal_shared: number; play_purpose: number };
  categories: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    id: "draftline",
    name: "Draftline",
    description:
      "Writing studio designed for messy thinking and progressively iterating. Organize unstructured thoughts and chisel ideas toward clarity.",
    learning:
      "This project taught me how fragmented my thinking actually is, and how interface design can remove mental blockers rather than add structure.",
    state: "Active",
    axes: { personal_shared: 60, play_purpose: 85 },
    categories: ["writing", "tools", "productivity", "venture"],
    tags: ["messy thinking", "iteration", "finding clarity"],
  },
  {
    id: "patina",
    name: "Patina",
    description:
      "Draw using only the colours from your webcam background on a nostalgic canvas.",
    learning:
      "I realised I’m most creatively free when there’s no pressure for usefulness, only curiosity and play.",
    state: "Exploring",
    axes: { personal_shared: 10, play_purpose: 20 },
    categories: ["design", "visual"],
    tags: ["play", "expression", "texture"],
  },
  {
    id: "wander",
    name: "Wander",
    description:
      "A non-linear interface that encourages curious drifting through tangential topics.",
    learning:
      "Designing for exploration showed me how overwhelming information becomes without progressive disclosure.",
    state: "Active",
    axes: { personal_shared: 35, play_purpose: 75 },
    categories: ["tools", "productivity", "design", "education", "ai"],
    tags: ["curiosity", "exploration", "connections"],
  },
  {
    id: "atrophy",
    name: "Atrophy",
    description: "Turns gym attendance into an honest cost-per-session mirror.",
    learning:
      "Reframing effort as cost and waste changed how I think about motivation more than tracking ever did.",
    state: "Active",
    axes: { personal_shared: 30, play_purpose: 55 },
    categories: ["health", "visual", "finance", "tools"],
    tags: ["motivation", "honesty", "behaviour"],
  },
  {
    id: "story-content",
    name: "STORY framework partner",
    description:
      "Prompts rough content ideas into clearer narratives and angles.",
    learning:
      "I learned that AI is better used to generate momentum through questions than drafting full scripts.",
    state: "Active",
    axes: { personal_shared: 55, play_purpose: 75 },
    categories: ["writing", "productivity", "ai", "tools"],
    tags: ["storytelling", "structure", "momentum"],
  },
  {
    id: "ripple",
    name: "Ripple",
    description: "An exploration of credit, influence, and idea lineage.",
    learning:
      "Trying to model attribution mechanically made me more aware of how ideas quietly shape future thinking.",
    state: "Concept",
    axes: { personal_shared: 45, play_purpose: 60 },
    categories: ["tools", "productivity"],
    tags: ["credit", "influence", "memory"],
  },
  {
    id: "tendril",
    name: "Tendril",
    description: "A daily puzzle app to combat skill decay in junior doctors.",
    learning:
      "This pushed me to think deeply about balancing challenge with approachability.",
    state: "Active",
    axes: { personal_shared: 85, play_purpose: 85 },
    categories: ["education", "venture", "health"],
    tags: ["practice", "retention", "challenge"],
  },
  {
    id: "receipt-workbench",
    name: "Receipt Workbench",
    description:
      "A receipt-style way to query personal finance and ask meaningful questions about spending.",
    learning: "People don’t want dashboards — they want answers.",
    state: "Complete",
    axes: { personal_shared: 10, play_purpose: 85 },
    categories: ["finance", "tools", "visual", "productivity", "ai"],
    tags: ["money awareness", "questions", "understanding"],
  },
  {
    id: "abundantly",
    name: "Abundantly",
    description:
      "Personal finance tool that *encourages* spending, conciously, and with gratitude.",
    learning:
      "Cultural impacts on how receptive people are to tools and their behaviour",
    state: "Complete",
    axes: { personal_shared: 15, play_purpose: 80 },
    categories: ["finance", "tools", "gratitude"],
    tags: ["money awareness", "abundance", "gratitude"],
  },
  {
    id: "covered",
    name: "Covered",
    description: "Fetches posters and cover art to help track media.",
    learning:
      "Valuable tools often remove tiny repeated friction rather than adding power features.",
    state: "Complete",
    axes: { personal_shared: 25, play_purpose: 80 },
    categories: ["tools", "productivity"],
    tags: ["organisation", "flow", "small frictions"],
  },
  {
    id: "headcount",
    name: "Headcount",
    description:
      "Visualises large numbers using crowds to make scale feel human.",
    learning: "People understand magnitude emotionally before numerically.",
    state: "Exploring",
    axes: { personal_shared: 75, play_purpose: 70 },
    categories: ["visual", "design"],
    tags: ["scale", "perspective", "people"],
  },
  {
    id: "gracious",
    name: "Gracious",
    description:
      "Designed and developed a custom Shopify store for a womenswear label launching online.",
    learning:
      "For brand-led commerce, clarity and presentation do most of the heavy lifting.",
    state: "Complete",
    axes: { personal_shared: 95, play_purpose: 90 },
    categories: ["venture", "design"],
    tags: ["shopify", "ecommerce", "brand"],
  },
  {
    id: "ai-chef",
    name: "AI Chef Assistant",
    description:
      "A hackathon project exploring meal suggestions during decision fatigue.",
    learning:
      "Prompt design and multimodal systems require care, even when moving fast.",
    state: "Complete",
    axes: { personal_shared: 35, play_purpose: 30 },
    categories: ["ai", "tools", "design"],
    tags: ["decision fatigue", "helpfulness", "everyday AI"],
  },
  {
    id: "c3",
    name: "Curious & Creative Club",
    description:
      "Weekly online curiosity-led classes for young students, rooted in play",
    learning:
      "Children thrive when learning environments follow their natural interests.",
    state: "Active",
    axes: { personal_shared: 90, play_purpose: 90 },
    categories: ["education", "venture"],
    tags: ["curiosity", "learning through play", "community"],
  },
  {
    id: "c3-curated",
    name: "C3 Curated",
    description:
      "A curated newsletter of varried educational & entertaining content to deliver a rich information diet for families.",
    learning: "Taste and constraint matter more than abundance.",
    state: "Exploring",
    axes: { personal_shared: 85, play_purpose: 80 },
    categories: ["education", "venture", "productivity"],
    tags: ["signal over noise", "taste", "families"],
  },
  {
    id: "c3-sizzle",
    name: "C3 Sizzle",
    description:
      "A growing library of engaging warmups for learning environments.",
    learning: "Warmups set emotional tone and prime attention.",
    state: "Concept",
    axes: { personal_shared: 80, play_purpose: 75 },
    categories: ["education", "design", "tools"],
    tags: ["energy", "attention", "engagement"],
  },
  {
    id: "moonstone",
    name: "Moonstone",
    description:
      "Playlist insights that help people assess trust and taste faster.",
    learning: "Design and storytelling shape how people interpret data.",
    state: "Complete",
    axes: { personal_shared: 75, play_purpose: 80 },
    categories: ["music", "visual", "tools", "design", "social"],
    tags: ["taste", "discovery", "trust"],
  },
  {
    id: "tactictoe",
    name: "Tactictoe",
    description: "A tactical twist on the classic game of tic-tac-toe.",
    learning: "You need a deep understanding before implementing solutions.",
    state: "Complete",
    axes: { personal_shared: 10, play_purpose: 15 },
    categories: ["games", "design"],
    tags: ["logic", "strategy", "fun"],
  },
  {
    id: "napkin",
    name: "Napkin",
    description: "A fast canvas for fleeting ideas.",
    learning: "Simple tools often see the most consistent use.",
    state: "Complete",
    axes: { personal_shared: 65, play_purpose: 95 },
    categories: ["writing", "tools", "productivity"],
    tags: ["quick thoughts", "messy ideas", "capture"],
  },
  {
    id: "colour-guesser",
    name: "Colour Guesser",
    description: "A perception game built around intuition.",
    learning: "Uncertainty can be more engaging than correctness.",
    state: "Complete",
    axes: { personal_shared: 5, play_purpose: 10 },
    categories: ["games", "design"],
    tags: ["intuition", "uncertainty", "perception"],
  },
  {
    id: "speedround",
    name: "Speedround",
    description: "Timeboxed workouts supported by visual momentum.",
    learning: "Constraints remove negotiation and create commitment.",
    state: "Exploring",
    axes: { personal_shared: 30, play_purpose: 70 },
    categories: ["health", "productivity", "tools", "visual"],
    tags: ["momentum", "commitment", "focus"],
  },
  {
    id: "reel",
    name: "Reel",
    description: "An interactive 3D display of recent movies and TV shows.",
    learning: "Even with AI, WebGL remains complex and fragile.",
    state: "Exploring",
    axes: { personal_shared: 20, play_purpose: 20 },
    categories: ["visual", "design"],
    tags: ["motion", "presence", "delight"],
  },
  {
    id: "order-builder-3d",
    name: "3D Order Builder",
    description: "A spatial interface for understanding shipping price logic.",
    learning: "Spatial metaphors dramatically improve comprehension.",
    state: "Complete",
    axes: { personal_shared: 85, play_purpose: 55 },
    categories: ["tools", "visual"],
    tags: ["understanding", "constraints", "pricing"],
  },
  {
    id: "asterisk",
    name: "Asterisk",
    description: "Figma plugin to add notes, links, and tags to Figma elements",
    learning: "Attribution only works when captured at creation.",
    state: "Complete",
    axes: { personal_shared: 70, play_purpose: 85 },
    categories: ["design", "tools", "productivity"],
    tags: ["credit", "ownership", "workflow"],
  },
  {
    id: "little-tap",
    name: "Little Tap",
    description:
      "Physical NFC touchpoints that bridge offline experiences to online actions.",
    learning: "I’m still learning to become comfortable with sales.",
    state: "Concept",
    axes: { personal_shared: 93, play_purpose: 87 },
    categories: ["venture", "tools"],
    tags: ["real-world touchpoints", "connection", "conversion"],
  },
  {
    id: "excelnt",
    name: "Exceln’t",
    description: "A playful crossover between spreadsheets and design tools.",
    learning: "Reducing mental load matters more than adding analytical power.",
    state: "Exploring",
    axes: { personal_shared: 10, play_purpose: 30 },
    categories: ["finance", "tools", "visual", "design"],
    tags: ["mental load", "simplicity", "numbers"],
  },
  {
    id: "ember",
    name: "Ember",
    description: "A tool to rediscover saved links and forgotten inspiration.",
    learning: "Rediscovery is as important as capture in knowledge systems.",
    state: "Complete",
    axes: { personal_shared: 75, play_purpose: 65 },
    categories: ["tools", "productivity"],
    tags: ["rediscovery", "inspiration", "memory"],
  },
  {
    id: "twelve-week-year",
    name: "12 Week Year",
    description: "A cyclical planning system for short-term focus.",
    learning: "Short cycles create urgency without requiring full resets.",
    state: "Complete",
    axes: { personal_shared: 65, play_purpose: 85 },
    categories: ["productivity", "tools"],
    tags: ["reflection", "rhythm", "progress"],
  },
  {
    id: "trademe-lock",
    name: "TradeMe Filter Lock",
    description: "A small UI safeguard to prevent accidental search resets.",
    learning: "Even unshared projects deserve care and polish.",
    state: "Complete",
    axes: { personal_shared: 5, play_purpose: 80 },
    categories: ["tools", "design"],
    tags: ["safety", "confidence", "small wins"],
  },
  {
    id: "ascent",
    name: "Ascent",
    description: "Webcam-based rep counter for lateral raises.",
    learning: "I enjoy building visual feedback loops.",
    state: "Complete",
    axes: { personal_shared: 15, play_purpose: 75 },
    categories: ["health", "tools", "visual"],
    tags: ["webcam", "motivation", "maths"],
  },
  {
    id: "inink",
    name: "In Ink",
    description:
      "Silly playful text interface to get over writer's block. Disappearing ink, shrinking text, disabled backspace.",
    learning: "Adding some pressure can help create momentum",
    state: "Complete",
    axes: { personal_shared: 25, play_purpose: 35 },
    categories: ["writing", "tools"],
    tags: ["writing", "imperfect action"],
  },
  {
    id: "candid",
    name: "Candid",
    description:
      "Social app where candid photos are swapped like trading cards to encourage everyone to take more quality photos of their friends",
    learning: "There's so much wrong with this idea hahaha",
    state: "Concept",
    axes: { personal_shared: 75, play_purpose: 35 },
    categories: ["social", "photos"],
    tags: ["photography", "ritual", "social platform"],
  },
  {
    id: "buzzing",
    name: "Buzzing",
    description:
      "Anonymous rating app for group chats for friends to show how keen they are to go out and their energy levels - is the group feeling a chill evening in or buzzing for eventful night",
    learning: "There's so much wrong with this idea hahaha",
    state: "Concept",
    axes: { personal_shared: 65, play_purpose: 45 },
    categories: ["social", "tool"],
    tags: ["social", "connection"],
  },
];

const xlenses = [
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

const lenses = [
  { id: "all", label: "All Projects" },

  { id: "venture", label: "Venture" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health & Fitness" },
  { id: "finance", label: "Finance" },
  { id: "social", label: "Social" },
  { id: "music", label: "Music" },

  { id: "writing", label: "Writing" },
  { id: "ai", label: "AI" },

  { id: "tools", label: "Tools" },
  { id: "productivity", label: "Productivity" },

  { id: "visual", label: "Visual" },
  { id: "design", label: "Design" },

  { id: "games", label: "Games" },
];

const statusFilters = [
  { id: "all", label: "All" },
  { id: "Concept", label: "Concept" },
  { id: "Exploring", label: "Exploring" },
  { id: "Active", label: "Active" },
  { id: "Complete", label: "Complete" },
];

const getStatusLabel = (state: string) => {
  switch (state) {
    case "Concept":
      return "Concept";
    case "Exploring":
      return "Exploring";
    case "Active":
      return "Active";
    case "Complete":
      return "Complete";
    default:
      return state;
  }
};

const getDotColor = (state: string) => {
  switch (state) {
    // Concept — cool stone / pencil graphite
    case "Concept":
      return "#BF6E53";

    // Exploring — desaturated moss green (curiosity, growth)
    case "Exploring":
      return "#E2BC3C";

    // Active — warm amber / energy without screaming
    case "Active":
      return "#7DB393";

    // Complete — deep umber / grounded finish
    case "Complete":
      return "#A18BB6";

    default:
      return "#6B7264";
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
              className="relative chart-outline p-12 rounded bg-yellow-50/10"
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
                      border: isSelected
                        ? "2px solid var(--beige-100)"
                        : "none",
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
        <div className="flex-1 overflow-y-auto panel-scroll p-4 lg:p-4 space-y-4">
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
                  ref={(el: HTMLButtonElement | null): void => {
                    cardRefs.current[project.name] = el;
                  }}
                  onClick={() => setSelectedProject(project)}
                  className="project-card w-full text-left px-6 py-4 block"
                  style={{
                    backgroundColor: isSelected ? "#faf8f5ef" : "#F7F2EB",
                    //   : "transparent",
                    borderColor: isSelected
                      ? "var(--beige-400)"
                      : "var(--beige-200)",
                    boxShadow: isSelected
                      ? "0 1px 0 rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)"
                      : "none",
                    transform: isSelected ? "translateZ(0)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="font-sans text-lg font-medium"
                      style={{ color: "var(--saddle)" }}
                    >
                      {project.name}
                    </h3>
                    <span className="status-badge shrink-0 -mr-3">
                      <div
                        className="status-dot"
                        style={{ backgroundColor: getDotColor(project.state) }}
                      />
                      {getStatusLabel(project.state)}
                    </span>
                  </div>

                  <p
                    className="text-[13px] leading-[1.5] mb-5"
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
