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
    title: "Moonstone - Beautiful Playlist Insights",
    description:
      "Explore your favourite playlists through a new lens through beautiful playlist insights that uncover trends and stories behind the journey.",
    type: "WebApp | Design, Development, Marketing",
    thumbnail:
      "https://images.unsplash.com/photo-1587731556938-38755b4803a6?q=80&w=1756&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accentColor: "red-900", // Tailwind color class (e.g., indigo, blue, green, etc.)
    caseStudyLink: "/case-study/moonstone",
    liveSiteLink: "https://moonstone.com",
  },
];

export default function Projects() {
  return (
    <section className="py-4 px-2 relative min-h-screen text-[#3d3d3d]">
      <div className="w-screen object-cover absolute top-0 left-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1542349314-e669385af82f?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <h3 className="max-w-5xl leading-tight text-5xl font-bold text-center mt-20 mb-24 mx-auto font-accent">
        Crafting memorable digital experiences that spark joy
      </h3>
      <h3 className="text-2xl font-semibold text-center mb-12 uppercase">
        Featured Projects
      </h3>

      <div className="grid justify-center gap-8 z-10 mx-auto px-12 md:px-24">
        {projects.map((project, index) => {
          // Define the accent color classes statically
          const accentColorClasses = {
            indigo: {
              glow: "from-indigo-500/10 to-indigo-500/5",
              button: "bg-indigo-500 hover:bg-indigo-600",
              border:
                "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
            },
            blue: {
              glow: "from-blue-500/10 to-blue-500/5",
              button: "bg-blue-500 hover:bg-blue-600",
              border:
                "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
            },
            green: {
              glow: "from-green-500/10 to-green-500/5",
              button: "bg-green-500 hover:bg-green-600",
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
              className={`relative w-full max-w-screen-2xl mx-auto overflow-hidden rounded-lg px-5 py-4 bg-white/20 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10 group`}
              style={{
                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`,
              }}
            >
              {/* Project Type */}
              <p className="text-sm mb-0">{project.type}</p>

              {/* Project Title */}
              <h3 className="font-accent text-xl font-[725] mb-2">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-sm  mb-4">{project.description}</p>

              {/* Buttons */}
              <div className="flex space-x-4">
                <a
                  href={project.caseStudyLink}
                  className={`flex-1 text-center py-2 px-4 ${button}  rounded-lg transition-colors duration-300`}
                >
                  Case Study
                </a>
                <a
                  href={project.liveSiteLink}
                  className={`flex-1 text-center py-2 px-4 bg-transparent border ${border} rounded-lg transition-colors duration-300`}
                >
                  Live Site
                </a>
              </div>

              {/* Thumbnail Image */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${glow} pointer-events-none`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* <div className="grid gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <p className="text-sm text-gray-500 mt-1">{project.tools}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Visit Project →
            </a>
          </div>
        ))}
      </div> */}
    </section>
  );
}
