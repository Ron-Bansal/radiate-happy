"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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

const ProjectsSectionCols = ({ title, description, category, images }) => {
  const cardRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightTopImageRef = useRef(null);
  const rightBottomImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftImage = leftImageRef.current;
    const rightTopImage = rightTopImageRef.current;
    const rightBottomImage = rightBottomImageRef.current;

    // Create different speed scroll animations
    gsap.to(leftImage, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    gsap.to(rightTopImage, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(rightBottomImage, {
      y: -75,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-[95vw] max-w-screen-2xl bg-[#ECE6F1] text-[#3d3d3d] mt-8 mx-auto rounded-sm"
    >
      <div className="relative w-full max-w-screen-2xl px-4 pt-4 md:px-8 md:mt-8">
        {/* Category and Title Section */}
        <div className="absolute md:max-w-[1/2] top-8 left-8 mb-8">
          {/* <div className="text-sm text-gray-600">{category}</div>
          <h2 className="text-4xl md:text-5xl font-display mb-4">{title}</h2>
          <p className="text-gray-700 max-w-xl">{description}</p> */}
          <div className="text opacity-85 mb-1">
            <span className="font-bold">
              {/* {project.type} */}
              WebApp
            </span>{" "}
            {/* - {project.tags} */}- Design, Development, Marketing
          </div>

          {/* Project Title */}
          <h3 className="font-accent leading-none mb-4 text-2xl font-[725]">
            {/* {project.title} */}
            Moonstone
            <span className="font-accent leading-none text-xl font-semibold">
              {" "}
              {/*•  {project.tagline} */}• beautiful playlist insights
            </span>
          </h3>

          <p className="max-w-xl text-pretty leading-snug mb-12 opacity-80">
            {/* {project.description} */}
            Explore your favourite playlists through a new lens through
            beautiful playlist insights that uncover trends and stories behind
            the journey.
          </p>

          {/* Buttons */}
          <div className="flex">
            <a
              target="_blank"
              rel="noopener noreferrer"
            //   href={project.liveSiteLink}
              className={`text text-center bg-transparent transition-colors duration-300`}
            >
              {/* View Project */}

              <div
                // className={`inline-flex items-center justify-center text-center h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl ${button} ml-3 pb-2 hover:scale-110 transition border-[0.3px] border-white/30`}
                className={`cursor-pointer text-[#f9f9f9] inline-flex items-center justify-center text-center h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl bg-[#CBB6DB] pb-2 hover:scale-110 transition border-[0.3px] border-white/30`}
              >
                ↗
              </div>
            </a>
          </div>
        </div>

        {/* Images Grid */}
        <div className="flex flex-col mt-8 md:flex-row gap-6 justify-end">
          {/* Left Column - Tall Image */}
          <div className="w-full md:w-1/4 md:my-auto">
            <div
              ref={leftImageRef}
              className="relative aspect-[3.25/4] overflow-hidden rounded-sm"
            >
              <img
                // src={images.left}
                src="/assets/pulsifyplaceholder.png"
                alt="Project view 1"
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-end gap-6">
            {/* Top Wide Image */}
            <div
              ref={rightTopImageRef}
            //   className="relative aspect-[989/612] overflow-hidden rounded-sm"
              className="relative aspect-[989/612] overflow-hidden rounded-lg"

            >
              <img
                // src={images.rightTop}
                src="/assets/pulsifyplaceholder.png"
                alt="Project view 2"
                className="absolute w-full h-full object-cover"
              />
            </div>

            {/* Bottom Square Image */}
            <div
              ref={rightBottomImageRef}
              className="relative aspect-square md:w-1/2 ml-auto mt-3 overflow-hidden rounded-sm"
            >
              <img
                // src={images.rightBottom}
                src="/assets/pulsifyplaceholder.png"
                alt="Project view 3"
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSectionCols;
