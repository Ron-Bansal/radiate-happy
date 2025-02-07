"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectCard = ({ project }) => {
  const {
    title,
    tagline,
    description,
    type,
    tags,
    thumbnailTall,
    thumbnailGolden,
    thumbnailSquare,
    accentColor,
    backgroundColor,
    caseStudyLink,
    liveSiteLink,
  } = project;

  const cardRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightTopImageRef = useRef(null);
  const rightBottomImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftImage = leftImageRef.current;
    const rightTopImage = rightTopImageRef.current;
    const rightBottomImage = rightBottomImageRef.current;

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
      className="w-[95vw] max-w-screen-2xl mx-auto rounded text-[#3d3d3d]"
      style={{ backgroundColor }}
    >
      <div className="relative w-full max-w-screen-2xl px-4 pt-4 md:px-8 md:mt-6">
        <div className="absolute md:max-w-[45%] text-pretty top-8 md:top-2 left-8 mb-8 z-20">
          <div className="text opacity-85 mb-1">
            <span className="font-bold">{type}</span> - {tags}
          </div>

          <h3 className="font-accent leading-none mb-4 text-2xl font-[725]">
            {title}
            <span className="font-accent leading-none text-xl font-semibold">
              {" "}
              • {tagline}
            </span>
          </h3>

          <p className="text-pretty leading-snug mb-12 opacity-80">
            {description}
          </p>

          <div className="flex">
            <a
              href={liveSiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text text-center bg-transparent transition-colors duration-300"
            >
              <div
                className="cursor-pointer text-[#f9f9f9] inline-flex items-center justify-center text-center h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl pb-2 hover:scale-110 transition border-[0.3px] border-white/30"
                style={{ backgroundColor: accentColor }}
              >
                ↗
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col mt-8 md:flex-row gap-2 md:gap-6 justify-end">
          <div className="w-3/4 md:w-1/4 md:my-auto mt-[25vh] md:0">
            <div
              ref={leftImageRef}
              className="relative aspect-[3.25/4] overflow-hidden rounded"
            >
              <img
                src={thumbnailTall}
                alt={`${title} - tall view`}
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-end gap-6">
            <div
              ref={rightTopImageRef}
              className="relative aspect-[989/612] overflow-hidden rounded"
            >
              <img
                src={thumbnailGolden}
                alt={`${title} - wide view`}
                className="absolute w-full h-full object-cover"
              />
            </div>

            <div
              ref={rightBottomImageRef}
              className="relative aspect-square w-3/5 ml-auto mt-3 overflow-hidden rounded"
            >
              <img
                src={thumbnailSquare}
                alt={`${title} - square view`}
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;