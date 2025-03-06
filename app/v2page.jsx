import React from "react";
import FolioProjectsSection from "./components/FolioProjectsSection";
import FolioProfile from "./components/FolioProfile";
import LandingPage from "./components/LandingPage";
import About from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import PortfolioMockup from "./components/PortfolioMockup";

const Folio = () => {
  return (
    <>
      <div className="max-w-screen overfow-hidden">
        {/* <LandingPage /> */}
      </div>
      <>
        <div className="w-screen h-screen object-cover fixed top-0 left-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1542349314-e669385af82f?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-3">
            <div className="sticky top-2 max-w-full mx-auto">
              <FolioProfile />
            </div>
          </div>
          <div className="col-span-9 px-4">
            {/* <h1 className="pt-20 text-center text-[#3d3d3d] text-2xl tracking-tight font-accent font-[725]">Selected Work</h1>
        <h3 className="text-[#3d3d3d] text-center text-pretty leading-snug mb-2 opacity-80 mt-2">A collection of my latest projects and and experiments</h3> */}
            {/* <div className="flex gap-4 mt-4">
            <h3>Software</h3>
            <h3>Service</h3>
            <h3>Awards</h3>
            <h3>Experiment</h3>
          </div> */}
            {/* <FolioProjectsSection /> */}
            <PortfolioMockup/>

          </div>
        </div>
        <PortfolioMockup/>
      </>
    </>
  );
};

export default Folio;
