import FolioProjectCard from "./FolioProjectCardNewLayout";
// import FolioProjectCard from "./FolioProjectCard";
import ProjectCard from "./ProjectCard";

// page.jsx or similar
const projects = [
  {
    title: "Moonstone",
    tagline: "Insightful way to connect with music",
    description:
      "Explore your favourite playlists through a new lens through beautiful playlist insights that uncover trends and human stories behind the collection of music.",
    type: "Web App",
    tags: "Design, Development, Marketing",
    metrics: {
      metric1_value: "900+",
      metric1_name: "playlists analysed",
      metric2_value: "15k",
      metric2_name: "unique songs",
    },
    thumbnailTall: "/assets/moonstone-tall.png",
    thumbnailGolden: "/assets/moonstone-golden.png",
    thumbnailSquare: "/assets/moonstone-square.png",
    accentColor: "#945BA5",
    backgroundColor: "#ECE6F1",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(148, 91, 165, 0.25), transparent 250%)",
      "radial-gradient(circle at 50% 40%, rgba(234, 219, 246, 0.80), transparent 260%)",
    caseStudyLink: "/work/moonstone",
    liveSiteLink: "https://moonstone-music.vercel.app/?utm_source=raunvq-portfolio",
  },
  {
    title: "Napkin Notes",
    tagline: "Quickest canvas for thought",
    description:
      "Capture fleeting ideas and notes in seconds with a single click without leaving your tab.",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    metrics: {
      metric1_value: "135+",
      metric1_name: "active users",
      metric2_value: "28",
      metric2_name: "countries",
    },
    thumbnailTall: "/assets/napkin-notes-tall.webp",
    thumbnailGolden: "/assets/napkin-notes-golden.png",
    thumbnailSquare: "/assets/napkin-notes-square.webp",
    accentColor: "#6BC18F",
    backgroundColor: "#DFEEE5",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(107, 193, 143, 0.25), transparent 260%)",
      "radial-gradient(circle at 50% 40%, rgba(230, 255, 223, 0.8), transparent 260%)",
    caseStudyLink: "/work/napkin-notes",
    liveSiteLink:
      // "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
      "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki?utm_source=raunvq-portfolio",
  },
  // {
  //   title: "Project Ascent",
  //   tagline: "AI powered rep counter",
  //   description:
  //     "Ember searches the depths of your bookmarks folders to dig up forgotten sources of inspiration.",
  //   type: "Web App",
  //   tags: "Development",
  //   thumbnailTall: "/assets/ember.webp",
  //   thumbnailGolden: "/assets/ember.webp",
  //   thumbnailSquare: "/assets/ember.webp",
  //   accentColor: "#A91012",
  //   backgroundColor: "#F6E2E1",
  //   glassBg:
  //     // "radial-gradient(circle at 50% 40%, rgba(225, 108, 102, 0.25), transparent 160%)",
  //     "radial-gradient(circle at 50% 40%, rgba(246, 226, 225, 0.80), transparent 260%)",
  //   caseStudyLink: "/work/project-ascent",
  //   liveSiteLink:
  //     "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
  // },

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
    tagline: "Compare shipping rates nationwide",
    description:
      // "E-commerce businesses face the challenge of calculating fair and accurate shipping rates for their checkout page, with costs varying by courier, delivery zone, and package type. This tool automates the process by offering real-time rate comparisons across couriers and zones to simplify shipping decisions.",
      "E-commerce businesses struggle with calculating accurate shipping rates due to varying couriers, zones, and package types. This tool automates real-time rate comparisons to simplify shipping decisions.",
    type: "Web Tool",
    tags: "User Research, Design, Development",
    metrics: {
      metric1_value: "30+",
      metric1_name: "mundane hours saved",
      // metric2_value: "30+",
      // metric2_name: "hours saved",
    },
    thumbnailTall: "/assets/freight-calc-tall.png",
    thumbnailGolden: "/assets/freight-calc-golden.png",
    thumbnailSquare: "/assets/freight-calc-square.png",
    accentColor: "#7FA9C6",
    backgroundColor: "#D8E6F0",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(225, 108, 102, 0.7), transparent 160%)",
      "radial-gradient(circle at 50% 40%, rgba(216, 230, 240, 0.80), transparent 260%)",
    caseStudyLink: "/work/moonstone",
    // liveSiteLink: "https://freight-calculator-v2.netlify.app/?utm_source=raunvq-portfolio",
    liveSiteLink: "https://starshipit-plan-calculator.netlify.app/?utm_source=raunvq-portfolio",
  },
  {
    title: "Asterisk",
    tagline: "Connect the dots behind design elements",
    description:"Add meaningful annotations to Figma elements and navigate effortlessly with contextual search",
    type: "Figma Plugin",
    tags: "Design, Development",
    metrics: {
      // metric1_value: "30+",
      // metric1_name: "mundane hours saved",
      // metric2_value: "30+",
      // metric2_name: "hours saved",
    },
    thumbnailTall: "/assets/2asterisk-tall.png",
    thumbnailGolden: "/assets/2asterisk-golden.png",
    thumbnailSquare: "/assets/2asterisk-square.png",
    accentColor: "#718b7b",
    backgroundColor: "#F3F6F2",
    glassBg:
      // "radial-gradient(circle at 50% 40%, rgba(225, 108, 102, 0.7), transparent 160%)",
      "radial-gradient(circle at 50% 40%, rgba(203, 243, 222, 0.8), transparent 260%)",
    caseStudyLink: "/work/asterisk",
    liveSiteLink: "https://www.figma.com/community/design-tools?resource_type=plugins",
  },
];

export default function ProjectsSection() {
  return (
    <>
      <div className="flex flex-col gap-24 pt-6 pb-20 px-2 md:px-4">
        {projects.map((project, index) => (
          <FolioProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
