// OLD projects component (glass effect)
const xprojects = [
  {
    title: "Pulsify",
    description: "Visualize Spotify playlist insights.",
    tools: "Figma, HTML, CSS, JavaScript, Spotify API",
    link: "https://pulsify.netlify.app",
  },
  {
    title: "Ember",
    description: "Rediscover forgotten bookmarks.",
    tools: "Figma, HTML, CSS, Google Bookmarks API",
    link: "https://chromewebstore.google.com/u/1/detail/ember...",
  },
];

const projects = [
  {
    title: "Moonstone",
    tagline: "beautiful playlist insights",
    description:
      "Explore your favourite playlists through a new lens through beautiful playlist insights that uncover trends and stories behind the journey.",
    type: "WebApp",
    tags: "Design, Development, Marketing",
    thumbnail: "/assets/pulsifyplaceholder.png",
    accentColor: "purple",
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
    thumbnail: "/assets/napkin-project-thumbnail.png",
    accentColor: "green",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
  },
  {
    title: "Ember",
    tagline: "rediscover forgotten bookmarks",
    description:
      "Ember searches the depths of your bookmarks folders to dig up forgotten sources of inspiration.",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    thumbnail: "/assets/ember.webp",
    accentColor: "orange",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
  },
];

export default function Projects() {
  return (
    <section className="py-4 px-2 relative min-h-screen text-[#3d3d3d]">
      <div className="w-screen object-cover fixed top-0 left-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1542349314-e669385af82f?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <h3 className="max-w-5xl leading-tight text-5xl font-bold text-center mt-20 mb-24 mx-auto font-accent">
        Crafting memorable digital experiences that spark joy
      </h3>
      <h3 className="text-2xl font-semibold text-center mb-12 uppercase">
        Featured Work
      </h3>

      <div className="grid justify-center gap-16 z-10 mx-auto px-12 md:px-24">
        {projects.map((project, index) => {
          // Define the accent color classes statically
          const accentColorClasses = {
            purple: {
              glow: "radial-gradient(circle at 50% 40%, rgba(155, 111, 200, 0.25), transparent 160%)", // Indigo glow
              button: "bg-[#CBB6DB]",
              border:
                "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
            },
            blue: {
              glow: "radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.2), transparent 160%)", // Blue glow
              button: "bg-blue-500",
              border:
                "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
            },
            green: {
              glow: "radial-gradient(circle at 50% 40%, rgba(106, 215, 119, 0.1), transparent 160%)", // Green glow
              button: "bg-[#a2d2b6]",
              border:
                "border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
            },
            orange: {
              glow: "radial-gradient(circle at 50% 40%, rgba(195, 128, 2, 0.2), transparent 160%)", // Green glow
              button: "bg-[#e3ac5e]",
              border:
                "border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
            },
            // Add more colors as needed
          };

          // Get the classes for the current project's accent color
          const { glow, button, border } =
            accentColorClasses[project.accentColor] ||
            accentColorClasses.indigo;

          return (
            <div
              key={index}
              className={`relative w-screen max-w-[1200px] mx-4 overflow-hidden rounded-lg px-5 py-4 bg-white/20 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10 group`}
              style={{
                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`,
              }}
            >
              <div className="flex justify-between">
                <div className="">
                  {/* Project Type */}
                  <p className="text-sm mt-1 mb-2 opacity-85">
                    <span className="font-bold">{project.type}</span> -{" "}
                    {project.tags}
                  </p>

                  {/* Project Title */}
                  <div className="mb-6">
                    <h3 className="font-accent leading-none mb-1 text-2xl font-[725]">
                      {project.title}
                      <span className="font-accent leading-none text-xl font-semibold">
                        {" "}
                        • {project.tagline}
                      </span>
                    </h3>
                  </div>

                  {/* Project Description */}
                  <p className="max-w-xl text-pretty leading-tight mb-12 opacity-90">
                    {project.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.liveSiteLink}
                    className={`text text-center bg-transparent transition-colors duration-300`}
                  >
                    {/* View Project */}

                    <div
                      className={`inline-flex items-center justify-center text-center h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl ${button} ml-3 pb-2 hover:scale-110 transition border-[0.3px] border-white/30`}
                    >
                      ↗
                    </div>
                  </a>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="w-fit mx-auto mt-6 -mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  // className="w-full max-h-[600px] rounded object-contain transform -mb-6 hover:scale-95 transition-transform duration-300"
                  className="w-full max-h-[600px] rounded object-contain"
                />
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none -z-10`}
                style={{
                  background: glow, // Apply the radial gradient
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
