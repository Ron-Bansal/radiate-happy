"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const FolioProjectCard = ({ project }) => {
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
    glassBg,
    caseStudyLink,
    liveSiteLink,
  } = project;

  const cardRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightTopImageRef = useRef(null);
  const rightBottomImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftImage = leftImageRef.current;
    const rightTopImage = rightTopImageRef.current;
    const rightBottomImage = rightBottomImageRef.current;
    const content = contentRef.current;
    const card = cardRef.current;

    // Create a timeline for the fade in animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top center+=200",
        end: "bottom center-=200",
        toggleActions: "play reverse play reverse",
      },
    });

    // Add animations to the timeline
    tl.fromTo(
      card,
      {
        opacity: 0.6,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    ).fromTo(
      content,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4" // Start slightly before the previous animation ends
    );

    // Scroll-based parallax for images
    gsap.to(leftImage, {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(rightTopImage, {
      y: -100,
      // rotation: -2,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(rightBottomImage, {
      y: -150,
      // rotation: 2,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.7,
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`w-full mx-auto mb-2 text-[#3d3d3d] overflow-hidden rounded-lg px-5 py-4 bg-white/20 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10 group`}
      style={{
        boxShadow: `0 4px 6px rgba(206, 110, 110, 0.1), 0 1px 3px rgba(229, 75, 75, 0.08)`,
        background: glassBg
      }}
      // style={{ backgroundColor }}
    >
      <div className="relative w-full max-w-screen-2xl px-4 pt-4 md:px-8 md:mt-6">
        <div
          // ref={contentRef}
          className="absolute max-w-[90%] md:max-w-[45%] text-pretty top-8 md:top-2 md:left-8 mb-8 z-20"
        >
          <div className="text opacity-85 mb-1">
            <span className="text-sm md:text-base font-bold">{type}</span> - {tags}
          </div>

          <h3 className="font-accent leading-none mb-4 text-2xl font-[725]">
            {title}
            <span className="font-accent leading-none text-xl font-semibold">
              {" "}
              • {tagline}
            </span>
          </h3>

          <p className="text-pretty leading-snug mb-12 opacity-80 md:max-w-[75%]">
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
                className="cursor-pointer text-[#f9f9f9] inline-flex items-center justify-center text-center h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl pb-0 hover:scale-110 transition ease-linear shadow hover:shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                ↗
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col mt-8 -mb-14 md:-mb-8 md:flex-row gap-2 md:gap-6 justify-end">
          <div className="w-3/4 md:w-1/4 md:my-auto mt-[45vh] md:mt-[35vh]">
            <div
              ref={leftImageRef}
              className="relative aspect-[3.25/4] overflow-hidden rounded shadow"
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
              className="relative aspect-[989/612] overflow-hidden rounded shadow"
            >
              <img
                src={thumbnailGolden}
                alt={`${title} - wide view`}
                className="absolute w-full h-full object-cover"
              />
            </div>

            <div
              ref={rightBottomImageRef}
              className="relative aspect-square w-3/5 ml-auto mt-10 md:mt-4 overflow-hidden rounded shadow"
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

export default FolioProjectCard;
