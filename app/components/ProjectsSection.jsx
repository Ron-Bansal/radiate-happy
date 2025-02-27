// import ProjectCard from "./ProjectCard";
import FolioProjectCard from "./FolioProjectCardNewLayout";


// page.jsx or similar
const projects = [
  {
    title: "Moonstone",
    tagline: "beautiful playlist insights",
    description:
      "Explore your favourite playlists through a new lens through beautiful playlist insights that uncover trends and stories behind the journey.",
    type: "WebApp",
    tags: "Design, Development, Marketing",
    thumbnailTall: "/assets/moonstone-tall.png",
    thumbnailGolden: "/assets/moonstone-golden.png",
    thumbnailSquare: "/assets/moonstone-square.png",
    accentColor: "#945BA5",
    backgroundColor: "#ECE6F1",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(148, 91, 165, 0.25), transparent 250%)",
      "radial-gradient(circle at 50% 40%, rgba(234, 219, 246, 0.80), transparent 260%)",
    caseStudyLink: "/work/moonstone",
    liveSiteLink: "https://moonstone-music.vercel.app/",
  },
  {
    title: "Napkin Notes",
    tagline: "quickest canvas for thought",
    description:
      "Capture fleeting ideas and notes in seconds with a single click right within your browser tab.",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    thumbnailTall: "/assets/napkin-notes-tall.webp",
    thumbnailGolden: "/assets/napkin-notes-golden.png",
    thumbnailSquare: "/assets/napkin-notes-square.webp",
    accentColor: "#6BC18F",
    backgroundColor: "#DFEEE5",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(107, 193, 143, 0.25), transparent 260%)",
      "radial-gradient(circle at 50% 40%, rgba(223, 238, 229, 0.80), transparent 260%)",
    caseStudyLink: "/work/napkin-notes",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
  },
  {
    title: "Project Ascent",
    tagline: "AI powered rep counter",
    description:
      "Ember searches the depths of your bookmarks folders to dig up forgotten sources of inspiration.",
    type: "Web App",
    tags: "Development",
    thumbnailTall: "/assets/ember.webp",
    thumbnailGolden: "/assets/ember.webp",
    thumbnailSquare: "/assets/ember.webp",
    accentColor: "#A91012",
    backgroundColor: "#F6E2E1",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(225, 108, 102, 0.25), transparent 160%)",
      "radial-gradient(circle at 50% 40%, rgba(246, 226, 225, 0.80), transparent 260%)",
    caseStudyLink: "/work/project-ascent",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
  },
  // {
  //   title: "Ember",
  //   tagline: "rediscover forgotten bookmarks",
  //   description:
  //     "Ember searches the depths of your bookmarks folders to dig up forgotten sources of inspiration.",
  //   type: "Chrome Extension",
  //   tags: "Design, Development, Marketing",
  //   thumbnailTall: "/assets/ember.webp",
  //   thumbnailGolden: "/assets/ember.webp",
  //   thumbnailSquare: "/assets/ember.webp",
  //   accentColor: "#A91012",
  //   backgroundColor: "#F6E2E1",
  //   caseStudyLink: "/work/moonstone",
  //   liveSiteLink:
  //     "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
  // },
  {
    title: "Freight Calculator tool",
    tagline: "compare shipping rates nationwide",
    description:"E-commerce businesses struggle with calculating accurate shipping rates due to varying couriers, zones, and package types. This tool automates real-time rate comparisons to simplify shipping decisions.",
    type: "Chrome Extension",
    tags: "User Research, Design, Development",
    thumbnailTall: "/assets/freight-calc-tall.png",
    thumbnailGolden: "/assets/freight-calc-golden.png",
    thumbnailSquare: "/assets/freight-calc-square.png",
    accentColor: "#7FA9C6",
    backgroundColor: "#D8E6F0",
    glassBg: 
    // "radial-gradient(circle at 50% 40%, rgba(225, 108, 102, 0.7), transparent 160%)",
    "radial-gradient(circle at 50% 40%, rgba(216, 230, 240, 0.80), transparent 260%)",
    caseStudyLink: "/work/moonstone",
    liveSiteLink: "https://freight-calculator-v2.netlify.app/",
  },
];

export default function ProjectsSection() {
  return (
    <>
      <div className="w-screen h-screen object-cover fixed top-0 left-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1542349314-e669385af82f?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // src="https://images.unsplash.com/photo-1619840875399-bf7fd46f0728?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // src="https://images.unsplash.com/photo-1677441087904-240d51642828?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="pt-20 text-center text-[#3d3d3d] text-3xl tracking-tight font-accent font-[725]">Selected Work</h1>
      <h3 className="text-[#3d3d3d] text-center text-pretty leading-snug mb-12 opacity-80 mt-2">A collection of my latest projects and and experiments</h3>
      <div className="flex flex-col gap-36 pt-10 pb-20 px-3">
        {projects.map((project, index) => (
          <FolioProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
