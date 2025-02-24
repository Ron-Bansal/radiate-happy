// import Hero from "@/components/Hero";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectsSectionCols from "./components/ProjectCard";
import ProjectsSection from "./components/ProjectsSection";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <div className="max-w-screen overflow-hidden relative">
      {/* <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-10 bg-cover"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(180, 183, 175, 0.1) 5%, rgba(197, 200, 193, 0.1)), url('https://grainy-gradients.vercel.app/noise.svg')`,
        }}
      ></div>{" "}
      <Hero />
      <About />
      <Projects /> */}


      {/* "LandingPage is the image page loader animation effect" */}
      {/* <LandingPage /> */}
      <Hero />
      <About />
      <ProjectsSection/>

    </div>
  );
}
