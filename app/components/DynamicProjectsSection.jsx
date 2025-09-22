"use client";
import React, { useEffect } from "react";
import DynamicProjectCard from "./DynamicProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Projects data from your original component
const projects = [
  {
    title: "Moonstone",
    tagline: "Insightful way to connect with music",
    description:
      "Explore your favourite playlists through a new lens through beautiful playlist insights that uncover trends and human stories behind the collection of music.",
    type: "Web App",
    tags: "Design, Development, Marketing",
    metrics: {
      metric1_value: "1.2k+",
      metric1_name: "playlists analysed",
      metric2_value: "193k+",
      metric2_name: "songs processed",
    },
    thumbnailTall: "/assets/moonstone-tall.png",
    thumbnailGolden: "/assets/moonstone-golden.png",
    thumbnailSquare: "/assets/moonstone-square.png",
    accentColor: "#945BA5",
    backgroundColor: "#ECE6F1",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://moonstone-music.vercel.app/?utm_source=raunvq-portfolio",
  },
  {
    title: "Napkin Notes",
    tagline: "Quickest canvas for thought",
    description:
      "Capture fleeting ideas and notes in seconds with a single click without leaving your tab.",
    type: "Chrome Extension",
    tags: "Design, Development, Marketing",
    metrics: {
      metric1_value: "200+",
      metric1_name: "active users",
      metric2_value: "41",
      metric2_name: "countries",
    },
    thumbnailTall: "/assets/napkin-notes-tall.webp",
    thumbnailGolden: "/assets/napkin-notes-golden.png",
    thumbnailSquare: "/assets/napkin-notes-square.webp",
    accentColor: "#6BC18F",
    backgroundColor: "#DFEEE5",
    caseStudyLink: "/work/napkin-notes",
    liveSiteLink:
      "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki?utm_source=raunvq-portfolio",
  },
  {
    title: "Freight Calculator tool",
    tagline: "Compare shipping rates nationwide",
    description:
      "E-commerce businesses struggle with calculating accurate shipping rates due to varying couriers, zones, and package types. This tool automates real-time rate comparisons to simplify shipping decisions.",
    type: "Web Tool",
    tags: "User Research, Design, Development",
    metrics: {
      metric1_value: "30+",
      metric1_name: "mundane hours saved",
    },
    thumbnailTall: "/assets/freight-calc-tall.png",
    thumbnailGolden: "/assets/freight-calc-golden.png",
    thumbnailSquare: "/assets/freight-calc-square.png",
    accentColor: "#7FA9C6",
    backgroundColor: "#D8E6F0",
    caseStudyLink: "/work/moonstone",
    liveSiteLink:
      "https://starshipit-plan-calculator.netlify.app/?utm_source=raunvq-portfolio",
  },
  {
    title: "Asterisk",
    tagline: "Connect the dots behind design elements",
    description:
      "Add meaningful annotations to Figma elements and navigate effortlessly with contextual search",
    type: "Figma Plugin",
    tags: "Design, Development",
    metrics: {
      metric1_value: "",
      metric1_name: "",
    },
    thumbnailTall: "/assets/3asterisk-tall.png",
    thumbnailGolden: "/assets/3asterisk-golden.png",
    thumbnailSquare: "/assets/3asterisk-square.png",
    accentColor: "#c6ae8b",
    // backgroundColor: "#E1D4BF",
    backgroundColor: "#f2eadc",
    caseStudyLink: "/work/asterisk",
    liveSiteLink:
      "https://www.figma.com/community/plugin/1488498485297162626/asterisk",
  },
];

export default function DynamicProjectsSection() {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Set up a subtle progress indicator
      gsap.to(".scroll-progress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // Add a small delay to ensure DOM is fully loaded
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <section className="relative">
      {/* Subtle progress indicator */}
      <div className="scroll-progress fixed top-0 left-0 h-0.5 bg-white/30 z-50 w-0"></div>

      {/* Projects with spacing between them */}
      <div className="flex flex-col">
        {projects.map((project) => (
          <DynamicProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
