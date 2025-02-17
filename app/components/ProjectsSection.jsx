import ProjectCard from "./ProjectCard";

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
    description:
      "E-commerce businesses face the challenge of calculating fair and accurate shipping rates for their checkout page, with costs varying by courier, delivery zone, and package type. This tool automates the process by offering real-time rate comparisons across couriers and zones to simplify shipping decisions.",
    type: "Chrome Extension",
    tags: "User Research, Design, Development",
    thumbnailTall: "/assets/freight-calc-tall.png",
    thumbnailGolden: "/assets/freight-calc-golden.png",
    thumbnailSquare: "/assets/freight-calc-square.png",
    accentColor: "#7FA9C6",
    backgroundColor: "#D8E6F0",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://freight-calculator-v2.netlify.app/",
  },
];

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
