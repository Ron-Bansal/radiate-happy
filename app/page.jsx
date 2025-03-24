import React from "react";
import FolioProjectsSection from "./components/FolioProjectsSection";
import FolioProfile from "./components/FolioProfile";
import LandingPage from "./components/LandingPage";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import PortfolioMockup from "./components/PortfolioMockup";
import About from "./components/About";
import Footer from "./components/Footer";

const Folio = () => {
  return (
    <div className="max-w-screen overfow-hidden font-plain">
      <div className="w-screen h-screen object-cover fixed top-0 left-0 -z-20 x-translate-y-52">
        <img
          src="/assets/sky1.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <Hero />
      <About />
      <section className="min-h-screen py-16 xpx-6 text-white">
        <h2 className="font-accent text-5xl md:text-6xl leading-[110%] tracking-[0.62px] mt-6 text-center">
          Good things happen <br />
          when you&apos;re having fun.
        </h2>
        <p className="text-center text-white opacity-85 font-normal text-xl mt-5 mb-10 md:mb-16 tracking-[116%] leading-[-0.13px]">
          Here are some projects I&apos;ve had fun building :)
        </p>
        <FolioProjectsSection />
      </section>
      <Footer />
    </div>
  );
};

export default Folio;
