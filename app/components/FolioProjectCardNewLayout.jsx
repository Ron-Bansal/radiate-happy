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
  const centerImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftImage = leftImageRef.current;
    const centerImage = centerImageRef.current;
    const rightImage = rightImageRef.current;
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
        opacity: 0.8,
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
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(centerImage, {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(rightImage, {
      y: -120,
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
      className={`w-full max-w-screen-2xl mx-auto mb-12 text-[#3d3d3d] overflow-hidden rounded-lg px-2 py-1 md:px-2 md:py-4 bg-white/20 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10 group`}
      style={{
        boxShadow: `0 4px 6px rgba(206, 110, 110, 0.1), 0 1px 3px rgba(229, 75, 75, 0.08)`,
        background: glassBg,
      }}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-2 py-5 md:px-4 md:py-4">
        {/* Header */}
        <div className="mb-24 text-center">
          <div className="text-sm opacity-85 mb-2">
            {/* <span className="font-bold">{type}</span> - {tags} */}
            <span
              className="font py-1 px-3 text-white rounded-full mb-2 mr-2 shadow"
              style={{ backgroundColor: accentColor }}
            >
              {type}
            </span> {"   "} {tags}
            {/* <p className="mt-1 mb-2">{tags}</p> */}
          </div>
          <h3 className="font-accent leading-none mt-4 mb-4 text-2xl font-[725]">
            {title}
            <span className="font-accent leading-none text-xl font-semibold">
              {" "}
              • {tagline}
            </span>
          </h3>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:block">
          <div className="flex flex-row">

            {/* Left Side - Images */}
            <div className="w-1/4 pr-4 -mt-10">
              <div
                ref={leftImageRef}
                className="rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={thumbnailTall}
                  alt={`${title} dashboard`}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Center - Main Images */}
            <div className="w-1/2 px-2">
              <div ref={centerImageRef} className="flex flex-col space-y-4">
                {/* Top Section - Circular Graph, Mobile, Stats */}
                <div className="flex justify-between items-start">
                  {/* Main App Images */}
                  <div className="w-full">
                    <div className="relative rounded-lg overflow-hidden shadow-md">
                      <img
                        src={thumbnailGolden}
                        alt={`${title} main view`}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  ref={contentRef}
                  className="flex items-end justify-between px-4"
                >
                  <div className="max-w-[320px]">
                    <p className="text-base text-pretty leading-5 tracking">
                      {description}
                    </p>
                  </div>
                  <div className="flex self-start -translate-y-6">
                    <a
                      href={liveSiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-center bg-transparent transition-colors duration-300"
                    >
                      <div
                        className="cursor-pointer text-[#f9f9f9] inline-flex items-center justify-center text-center z-40 h-12 md:h-14 aspect-square rounded-full text-2xl md:text-3xl pb-0 hover:scale-110 transition ease-linear shadow hover:shadow-lg"
                        style={{ backgroundColor: accentColor }}
                      >
                        ↗
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Stats & Features */}
            <div className="w-1/4 pl-4 flex flex-col justify-between">
              <div>
                {/* Stats */}
                <div className="flex gap-10 mt-10 mb-6 ml-4">
                  <div className="mb-2">
                    <p className="font-accent leading-tight text-2xl font-semibold">
                      1,420+
                    </p>
                    <p className="text-sm">Users</p>
                  </div>
                  <div>
                    <p className="font-accent leading-tight text-2xl font-semibold">
                      12,200+
                    </p>
                    <p className="text-sm">Playlists Analysed</p>
                  </div>
                </div>

                {/* Heat Map Visualization */}
                <div
                  className="rounded-lg overflow-hidden shadow-md"
                  ref={rightImageRef}
                >
                  <img
                    src={thumbnailSquare}
                    alt={`${title} visualization`}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout (md-lg) */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-12 gap-4">
            {/* Top Section */}
            <div className="col-span-12 flex flex-col md:flex-row gap-4">
              {/* Left - Main Images */}
              <div className="md:w-7/12">
                <div
                  ref={centerImageRef}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={thumbnailGolden}
                    alt={`${title} main view`}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Right - Content */}
              <div
                ref={contentRef}
                className="md:w-5/12 flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm leading-snug mb-4">{description}</p>
                  <a
                    href={liveSiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-700 text-white"
                  >
                    <span className="text-xl">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="col-span-12 grid grid-cols-12 gap-4">
              {/* Left - Dashboard Image */}
              <div className="col-span-6">
                <div
                  ref={leftImageRef}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={thumbnailTall}
                    alt={`${title} dashboard`}
                    className="w-full object-cover"
                  />
                </div>

                {/* Stats */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="text-xl font-bold">1,420+</p>
                    <p className="text-sm">Users</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">12,200+</p>
                    <p className="text-sm">Playlists Analysed</p>
                  </div>
                </div>
              </div>

              {/* Right - Feature Box & Heat Map */}
              <div
                ref={rightImageRef}
                className="col-span-6 flex flex-col justify-between"
              >
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={thumbnailSquare}
                    alt={`${title} visualization`}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (sm and down) */}
        <div className="md:hidden">
          <div className="flex flex-col space-y-4">
            {/* Main Image Section */}
            <div
              ref={centerImageRef}
              className="w-full rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={thumbnailGolden}
                alt={`${title} main view`}
                className="w-full object-cover"
              />
            </div>

            {/* Content & CTA */}
            <div ref={contentRef}>
              <p className="text-sm leading-snug mb-4">{description}</p>
              <a
                href={liveSiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-700 text-white"
              >
                <span className="text-xl">↗</span>
              </a>
            </div>

            {/* Dashboard Image */}
            <div
              ref={leftImageRef}
              className="w-full rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={thumbnailTall}
                alt={`${title} dashboard`}
                className="w-full object-cover"
              />
            </div>

            {/* Stats */}
            <div className="flex justify-between">
              <div>
                <p className="text-xl font-bold">1,420+</p>
                <p className="text-sm">Users</p>
              </div>
              <div>
                <p className="text-xl font-bold">12,200+</p>
                <p className="text-sm">Playlists Analysed</p>
              </div>
            </div>

            {/* Heat Map */}
            <div className="w-full rounded-lg overflow-hidden shadow-md">
              <img
                src={thumbnailSquare}
                alt={`${title} visualization`}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolioProjectCard;
