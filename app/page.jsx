import React from "react";
// import Hero from "./components/Hero";
import Hero from "./components/HeroSection";
import About from "./components/About";
import Footer from "./components/Footer";
import ServicesSection from "./components/Services";
import DynamicProjectsSection from "./components/DynamicProjectsSection";

const Folio = () => {
  return (
    <div className="max-w-screen overflow-hidden font-plain">
      <div className="w-screen h-screen object-cover fixed top-0 left-0 -z-20 -translate-y-52">
        <img
          src="/assets/sky1.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <Hero />
      <About />
      <section className="min-h-screen py-16 px-6 text-white bg-slate-800">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-accent text-5xl md:text-6xl leading-[110%] tracking-[0.62px] mt-6">
            Good things happen <br />
            when you&apos;re having fun.
          </h2>
          <p className="text-white opacity-85 font-light text-xl mt-5 mb-10 md:mb-16 tracking-[.01em] leading-relaxed">
            Here are some projects I&apos;ve had fun building :)
          </p>
        </div>
        <DynamicProjectsSection />
      </section>

      <div className="min-h-screen w-full bg-slate-950 bg-[#232323] py-10 z-50">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Folio;
