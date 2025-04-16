// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const ServiceCard = ({ demographic, title, description, iconSrc }) => {
//   return (
//     <div className="relative border border-[#696969] m-2 mb-4 p-3 aspect-square rounded-md overflow-hidden bg-gradient-radial from-[rgba(40,37,53,0.9)] to-[rgba(42,42,42,0.3)]">
//       <p className="uppercase text-sm font-normal tracking-wider text-secondary mb-3">
//         {demographic}
//       </p>
//       <h5 className="font-['Fraunces'] font-extralight text-2xl leading-snug">
//         {title}
//       </h5>
//       <div className="font-['Urbanist'] font-extralight tracking-wide text-lg text-primary mt-10 max-w-[80%]">
//         {description}
//       </div>
//       <Image
//         src={iconSrc}
//         alt={`${title} icon`}
//         width={150}
//         height={150}
//         className="absolute right-0 bottom-0 h-[55%] translate-x-[10%] translate-y-[10%] opacity-90 mix-blend-difference pointer-events-none"
//       />
//     </div>
//   );
// };

// const ServicesSection = () => {
//   return (
//     <section className="mt-40 grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-12 max-w-[1500px] p-4 mx-auto">
//       <div className="text-left">
//         <h2 className="text-5xl font-extralight text-primary mb-4 font-['Fraunces']">
//           How can I help?
//         </h2>
//         <p className="text-xl tracking-wide font-light mb-18">
//           With constant advancements in technology, it's easy to feel left
//           behind. I provide a range of bespoke solutions to promote growth and
//           innovation.
//         </p>
//         <div className="flex gap-3 mt-10">
//           <Link
//             href="/services"
//             className="text-lg text-primary border border-[#696969] py-2 px-10 rounded-md transition-all duration-300 hover:bg-secondary hover:text-[#2a2a2a]"
//           >
//             Find out more
//           </Link>
//           <Link
//             href="/contact"
//             className="text-lg text-[#2a2a2a] bg-secondary py-2 px-6 rounded-md flex items-center gap-2 transition-all duration-300 hover:gap-4"
//           >
//             Get in touch
//             <span className="material-symbols-outlined">east</span>
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2">
//         <div className="-mt-4">
//           <ServiceCard
//             demographic="For individuals or small businesses"
//             title="Web design and development"
//             description="Craft compelling digital experiences that resonate with your audience."
//             iconSrc="/assets/service-icon-web-dev.svg"
//           />
//           <ServiceCard
//             demographic="For individuals or small businesses"
//             title="AI consulting and implementation"
//             description="Embrace AI for growth. Streamline processes, save time, and stay competitive."
//             iconSrc="/assets/service-icon-ai-consulting.svg"
//           />
//         </div>
//         <div className="-mt-12">
//           <ServiceCard
//             demographic="For individuals"
//             title="Coding and design thinking classes"
//             description="Build transferable creative & critical thinking skills with project-based learning."
//             iconSrc="/assets/service-icon-coding-classes.svg"
//           />
//           <ServiceCard
//             demographic="For individuals"
//             title="Sustainable productivity & wellness workshop"
//             description="Discuss tools and personalised strategies for sustainable growth and well-being."
//             iconSrc="/assets/service-icon-wellness-workshops.svg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ demographic, title, description, iconSrc }) => {
  return (
    <div className="relative border border-[#696969] m-2 mb-4 p-3 aspect-square rounded-md overflow-hidden bg-gradient-radial from-[rgba(40,37,53,0.9)] to-[rgba(42,42,42,0.3)]">
      <p className="uppercase text-sm font-normal tracking-wider text-secondary mb-1 opacity-80">
        {demographic}
      </p>
      <h5 className="font-accent font-light text-3xl leading-snug">{title}</h5>
      <div className="font-extralight leading-snug text-lg text-primary mt-8 max-w-[80%] opacity-85">
        {description}
      </div>
      <Image
        src={iconSrc}
        alt={`${title} icon`}
        width={220}
        height={220}
        className="absolute right-0 bottom-0 h-[55%] translate-x-[15%] translate-y-[10%] opacity-70 mix-blend-difference pointer-events-none"
      />
    </div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    // Import GSAP dynamically
    const loadGSAP = async () => {
      const { gsap, ScrollTrigger } = await import("gsap/all");
      gsap.registerPlugin(ScrollTrigger);

      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));

      // Simple fade-in and slight scale-up for cards as they come into view
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
            delay: index * 0.1, // Stagger the animations
          }
        );
      });
    };

    loadGSAP();

    return () => {
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
        });
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-40 mx-auto grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-12 max-w-[1500px] p-4 text-[#f9f9f9] z-50"
    >
      <div className="text-left">
        <h2 className="text-5xl font-extralight text-primary mb-4 font-accent">
          How can I help?
        </h2>
        <p className="text-xl tracking-wide font-light mb-18">
          With constant advancements in technology, it&apos;s easy to feel left
          behind. I provide a range of bespoke solutions to promote growth and
          innovation.
        </p>
        <div className="flex gap-3 mt-10">
          {/* <Link 
            href="/services" 
            className="text-lg text-primary border border-[#696969] py-2 px-10 rounded-full transition-all duration-300 hover:bg-secondary hover:text-[#2a2a2a]"
          >
            Find out more
          </Link>
          <Link 
            href="/contact" 
            className="text-lg text-[#2a2a2a] bg-white bg-secondary py-2 px-6 rounded-full flex items-center gap-2 transition-all duration-300 hover:gap-4"
          >
            Get in touch
            <ArrowRight/>
          </Link> */}
          <a
            href="mailto:raunaqbansal11@gmail.com?subject=Let's%20Get%20In%20Touch&body=Hello%2C%20I'd%20like%20to%20connect."
            className="text-lg text-[#2a2a2a] bg-gray-200 bg-secondary py-2 px-6 rounded-full flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-black hover:bg-white hover:gap-3"
          >
            Get in touch
            <ArrowRight />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="-mt-4">
          <div ref={(el) => (cardsRef.current[0] = el)}>
            <ServiceCard
              demographic="For individuals or small businesses"
              title="Web design and development"
              description="Craft compelling digital experiences that resonate with your audience."
              iconSrc="/assets/service-icon-web-dev.svg"
            />
          </div>
          <div ref={(el) => (cardsRef.current[1] = el)}>
            <ServiceCard
              demographic="For individuals or small businesses"
              title="AI consulting and implementation"
              description="Embrace AI for growth. Streamline processes, save time, and stay competitive."
              iconSrc="/assets/service-icon-ai-consulting.svg"
            />
          </div>
        </div>
        <div className="-mt-2 md:-mt-12">
          <div ref={(el) => (cardsRef.current[2] = el)}>
            <ServiceCard
              demographic="For individuals"
              title="Coding and design thinking classes"
              description="Build transferable creative & critical thinking skills with project-based learning."
              iconSrc="/assets/service-icon-coding-classes.svg"
            />
          </div>
          <div ref={(el) => (cardsRef.current[3] = el)}>
            <ServiceCard
              demographic="For individuals"
              title="Sustainable productivity & wellness workshop"
              description="Discuss tools and personalised strategies for sustainable growth and well-being."
              iconSrc="/assets/service-icon-wellness-workshops.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
