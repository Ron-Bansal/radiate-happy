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
    thumbnailTall: "/assets/pulsifyplaceholder.png",
    thumbnailGolden: "/assets/pulsifyplaceholder.png",
    thumbnailSquare: "/assets/pulsifyplaceholder.png",
    accentColor: "#CBB6DB",
    backgroundColor: "#ECE6F1",
    caseStudyLink: "/work/moonstone",
    liveSiteLink: "https://moonstone-music.vercel.app/",
  },
  {
    title: "Napkin Notes",
    tagline: "quickest canvas for thought",
    description:
      "Capture ideas and notes in seconds straight from the browser side panel!",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    thumbnailTall: "/assets/napkin-project-thumbnail.png",
    thumbnailGolden: "/assets/napkin-project-thumbnail.png",
    thumbnailSquare: "/assets/napkin-project-thumbnail.png",
    accentColor: "#83C39D",
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
  {
    title: "Ember",
    tagline: "rediscover forgotten bookmarks",
    description:
      "Ember searches the depths of your bookmarks folders to dig up forgotten sources of inspiration.",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    thumbnailTall: "/assets/ember.webp",
    thumbnailGolden: "/assets/ember.webp",
    thumbnailSquare: "/assets/ember.webp",
    accentColor: "#A91012",
    backgroundColor: "#F6E2E1",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
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
