"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const DynamicProjectCard = ({ project }) => {
  const {
    title,
    tagline,
    description,
    type,
    tags,
    metrics,
    thumbnailTall,
    thumbnailGolden,
    thumbnailSquare,
    accentColor,
    backgroundColor,
    caseStudyLink,
    liveSiteLink,
  } = project;

  const cardRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const goldenImageRef = useRef(null);
  const tallImageRef = useRef(null);
  const squareImageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Create the sticky effect for the left column
      const mm = gsap.matchMedia();
      
      // Only apply sticky effect on desktop
      mm.add("(min-width: 1024px)", () => {
        // Pin the left section
        const leftStickyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top+=80",
            end: "bottom-=300 bottom",
            pin: leftSectionRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          }
        });

        // Animation for the golden image and title
        gsap.fromTo(
          [goldenImageRef.current, titleRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Stagger the right column entry - only starts after left column is fixed
        const rightSectionAnim = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top+=100", // Start after the left column pins
            toggleActions: "play none none reverse",
          }
        });
        
        rightSectionAnim
          .fromTo(
            descriptionRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            0
          )
          .fromTo(
            tallImageRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            0.2
          )
          .fromTo(
            statsRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            0.3
          )
          .fromTo(
            squareImageRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            0.4
          );

        // Parallax effect for the right column images while scrolling
        gsap.to(tallImageRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: rightSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });

        gsap.to(squareImageRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: rightSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
          }
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="w-full min-h-screen mb-24"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto text-[#3d3d3d]  grid grid-cols-1 lg:grid-cols-16 gap-6 lg:gap-10 py-16 lg:py-24 px-4 lg:px-0">
        {/* Left Column - 10/16 cols - Sticky on desktop */}
        <div 
          ref={leftSectionRef} 
          className="lg:col-span-10 flex flex-col lg:xh-screen lg:max-h-[80vh]"
        >
          {/* Project title and metadata */}
          <div ref={titleRef} className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="py-1 px-3 text-sm text-[#3d3d3d] rounded-full inline-block"
                style={{ backgroundColor: accentColor }}
              >
                {type}
              </span>
              <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
                {tags}
              </span>
            </div>
            <h2 className="text-3xl lg:text-3xl font-thin mb-2 font-accent">{title} ⋅ {tagline}</h2>
            {/* <p className="text-xl lg:text-2xl opacity-85">{tagline}</p> */}
          </div>
          
          {/* Golden image container - full width within 10 cols */}
          <div 
            ref={goldenImageRef} 
            className="xflex-grow relative overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={thumbnailGolden} 
              alt={`${title} main view`} 
              className="w-full h-full object-contain"
            />
            
            {/* Live site link button */}
            <div className="absolute bottom-6 right-6">
              <a
                href={liveSiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 w-12 rounded-full text-white text-2xl hover:scale-110 transition-transform shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                ↗
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - 6/16 cols - Scrollable */}
        <div 
          ref={rightSectionRef} 
          className="lg:col-span-6 flex flex-col gap-12 lg:min-h-[120vh] lg:pt-16"
        >
          {/* Description at the top of right column */}
          <div ref={descriptionRef} className="mt-8 lg:mt-0">
            <p className="text-base lg:text-lg opacity-85 leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Tall image - 5 cols wide */}
          <div 
            ref={tallImageRef} 
            className="w-full lg:w-5/6 overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={thumbnailTall} 
              alt={`${title} tall view`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Stats section before square image */}
          <div ref={statsRef} className="flex gap-10 mt-8">
            <div>
              <p className="text-2xl font-semibold">
                {metrics.metric1_value}
              </p>
              <p className="text-sm opacity-85">{metrics.metric1_name}</p>
            </div>
            {metrics.metric2_value && (
              <div>
                <p className="text-2xl font-semibold">
                  {metrics.metric2_value}
                </p>
                <p className="text-sm opacity-85">{metrics.metric2_name}</p>
              </div>
            )}
          </div>
          
          {/* Square image - 4 cols wide */}
          <div 
            ref={squareImageRef} 
            className="w-full lg:w-4/6 ml-auto overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={thumbnailSquare} 
              alt={`${title} square view`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Space at bottom to ensure enough scrolling for animations */}
          <div className="h-32 lg:h-64"></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProjectCard;