// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const goldenImageRef = useRef(null);
//   const tallImageRef = useRef(null);
//   const squareImageRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);

//       // Create the sticky effect for the left column
//       const mm = gsap.matchMedia();
      
//       // Only apply sticky effect on desktop
//       mm.add("(min-width: 1024px)", () => {
//         // Pin the left section
//         const leftStickyTimeline = gsap.timeline({
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top+=80",
//             end: "bottom-=300 bottom",
//             pin: leftSectionRef.current,
//             pinSpacing: false,
//             anticipatePin: 1,
//           }
//         });

//         // Animation for the golden image and title
//         gsap.fromTo(
//           [goldenImageRef.current, titleRef.current],
//           { y: 30, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.2,
//             duration: 0.8,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: cardRef.current,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // Stagger the right column entry - only starts after left column is fixed
//         const rightSectionAnim = gsap.timeline({
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top+=100", // Start after the left column pins
//             toggleActions: "play none none reverse",
//           }
//         });
        
//         rightSectionAnim
//           .fromTo(
//             descriptionRef.current,
//             { y: 40, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
//             0
//           )
//           .fromTo(
//             tallImageRef.current,
//             { y: 60, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
//             0.2
//           )
//           .fromTo(
//             statsRef.current,
//             { y: 40, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
//             0.3
//           )
//           .fromTo(
//             squareImageRef.current,
//             { y: 60, opacity: 0 },
//             { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
//             0.4
//           );

//         // Parallax effect for the right column images while scrolling
//         gsap.to(tallImageRef.current, {
//           y: -60,
//           ease: "none",
//           scrollTrigger: {
//             trigger: rightSectionRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1.5,
//           }
//         });

//         gsap.to(squareImageRef.current, {
//           y: -80,
//           ease: "none",
//           scrollTrigger: {
//             trigger: rightSectionRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1.3,
//           }
//         });
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div 
//       ref={cardRef} 
//       className="w-full min-h-screen mb-24"
//       style={{ backgroundColor }}
//     >
//       <div className="max-w-6xl mx-auto text-[#3d3d3d]  grid grid-cols-1 lg:grid-cols-16 gap-6 lg:gap-10 py-16 lg:py-24 px-4 lg:px-0">
//         {/* Left Column - 10/16 cols - Sticky on desktop */}
//         <div 
//           ref={leftSectionRef} 
//           className="lg:col-span-10 flex flex-col lg:xh-screen lg:max-h-[80vh]"
//         >
//           {/* Project title and metadata */}
//           <div ref={titleRef} className="mb-6">
//             <div className="flex flex-wrap gap-2 mb-3">
//               <span
//                 className="py-1 px-3 text-sm text-[#3d3d3d] rounded-full inline-block"
//                 style={{ backgroundColor: accentColor }}
//               >
//                 {type}
//               </span>
//               <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                 {tags}
//               </span>
//             </div>
//             <h2 className="text-3xl lg:text-3xl font-thin mb-2 font-accent">{title} ⋅ {tagline}</h2>
//             {/* <p className="text-xl lg:text-2xl opacity-85">{tagline}</p> */}
//           </div>
          
//           {/* Golden image container - full width within 10 cols */}
//           <div 
//             ref={goldenImageRef} 
//             className="xflex-grow relative overflow-hidden rounded-sm shadow-lg"
//           >
//             <img 
//               src={thumbnailGolden} 
//               alt={`${title} main view`} 
//               className="w-full h-full object-contain"
//             />
            
//             {/* Live site link button */}
//             <div className="absolute bottom-6 right-6">
//               <a
//                 href={liveSiteLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center h-12 w-12 rounded-full text-white text-2xl hover:scale-110 transition-transform shadow-lg"
//                 style={{ backgroundColor: accentColor }}
//               >
//                 ↗
//               </a>
//             </div>
//           </div>
//         </div>
        
//         {/* Right Column - 6/16 cols - Scrollable */}
//         <div 
//           ref={rightSectionRef} 
//           className="lg:col-span-6 flex flex-col gap-12 lg:min-h-[120vh] lg:pt-16"
//         >
//           {/* Description at the top of right column */}
//           <div ref={descriptionRef} className="mt-8 lg:mt-0">
//             <p className="text-base lg:text-lg opacity-85 leading-relaxed">
//               {description}
//             </p>
//           </div>
          
//           {/* Tall image - 5 cols wide */}
//           <div 
//             ref={tallImageRef} 
//             className="w-full lg:w-5/6 overflow-hidden rounded-xl shadow-lg"
//           >
//             <img 
//               src={thumbnailTall} 
//               alt={`${title} tall view`} 
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//           {/* Stats section before square image */}
//           <div ref={statsRef} className="flex gap-10 mt-8">
//             <div>
//               <p className="text-2xl font-semibold">
//                 {metrics.metric1_value}
//               </p>
//               <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//             </div>
//             {metrics.metric2_value && (
//               <div>
//                 <p className="text-2xl font-semibold">
//                   {metrics.metric2_value}
//                 </p>
//                 <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//               </div>
//             )}
//           </div>
          
//           {/* Square image - 4 cols wide */}
//           <div 
//             ref={squareImageRef} 
//             className="w-full lg:w-4/6 ml-auto overflow-hidden rounded-xl shadow-lg"
//           >
//             <img 
//               src={thumbnailSquare} 
//               alt={`${title} square view`} 
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//           {/* Space at bottom to ensure enough scrolling for animations */}
//           <div className="h-32 lg:h-64"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicProjectCard;


// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const squareImageRef = useRef(null);
//   const titleRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const goldenImageRef = useRef(null);
//   const tallImageRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
      
//       // Only apply animations on desktop
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 1024px)", () => {
//         // Create main timeline
//         const mainTimeline = gsap.timeline({
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top", 
//             end: "bottom bottom",
//             scrub: true, // Smooth scrubbing effect
//           }
//         });

//         // Pin the left column until the square image catches up
//         ScrollTrigger.create({
//           trigger: cardRef.current,
//           start: "top top", 
//           endTrigger: squareImageRef.current,
//           end: "bottom bottom-=200",
//           pin: leftSectionRef.current,
//           pinSpacing: false,
//           anticipatePin: 1,
//         });

//         // Create a slowdown effect for the left column
//         gsap.to(leftSectionRef.current, {
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top",
//             end: "center center",
//             scrub: 0.5,
//             onUpdate: (self) => {
//               // Progressively slow down the left column scroll
//               const slowFactor = gsap.utils.interpolate(1, 0.5, self.progress);
//               gsap.set(leftSectionRef.current, { 
//                 attr: { "data-scroll-speed": slowFactor }
//               });
//             }
//           }
//         });
        
//         // Entrance animations for left column elements with staggered timing
//         gsap.fromTo(
//           [titleRef.current, descriptionRef.current, goldenImageRef.current],
//           { y: 40, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.2, // Increased stagger for more pronounced effect
//             duration: 0.8,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: cardRef.current,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // Enhanced animation for right column elements
//         const rightElements = [statsRef.current, tallImageRef.current, squareImageRef.current];
        
//         // Add delay to right column elements to ensure they enter after left column
//         gsap.set(rightSectionRef.current, { opacity: 0 });
//         gsap.to(rightSectionRef.current, {
//           opacity: 1,
//           duration: 0.5,
//           delay: 0.3, // Delay the start of right column animations
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top center-=100",
//           }
//         });
        
//         // Animate each right element as it enters the viewport with staggered timing
//         rightElements.forEach((el, index) => {
//           gsap.fromTo(
//             el,
//             { 
//               y: 100, 
//               opacity: 0,
//               scale: 0.95,
//               rotationZ: index % 2 === 0 ? 1.5 : -1.5 // Slightly more rotation
//             },
//             { 
//               y: 0, 
//               opacity: 1, 
//               scale: 1,
//               rotationZ: 0,
//               duration: 1.2, // Slightly longer duration
//               ease: "power3.out",
//               delay: index * 0.2, // Staggered delay between elements
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top bottom-=100",
//                 toggleActions: "play none none reverse",
//               }
//             }
//           );
//         });

//         // Parallax effects for both columns while scrolling
//         // Subtle parallax for tall image
//         gsap.to(tallImageRef.current, {
//           y: "-70px", 
//           ease: "none",
//           scrollTrigger: {
//             trigger: tallImageRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 0.8,
//           }
//         });
        
//         // More pronounced parallax for square image to help it catch up
//         gsap.to(squareImageRef.current, {
//           y: "-100px", 
//           ease: "none",
//           scrollTrigger: {
//             trigger: squareImageRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 0.6, // Faster scrub to accelerate catch-up
//           }
//         });

//         // Synchronization point - when square image catches up with golden image,
//         // create a unified scrolling effect for both columns
//         const syncPoint = ScrollTrigger.create({
//           trigger: squareImageRef.current,
//           start: "bottom bottom-=200",
//           onEnter: () => {
//             // Once synchronized, allow both columns to scroll normally together
//             gsap.to([leftSectionRef.current, rightSectionRef.current], {
//               duration: 0.5,
//               ease: "power1.inOut",
//               onComplete: () => {
//                 // Optional: add any final synchronization adjustments here
//               }
//             });
//           }
//         });
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div 
//       ref={cardRef} 
//       className="w-full"
//       style={{ backgroundColor }}
//     >
//       <div className="max-w-7xl mx-auto text-[#3d3d3d] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-16 lg:py-24 px-4 lg:px-0">
//         {/* Left Column - Pinned until catch-up point */}
//         <div 
//           ref={leftSectionRef} 
//           className="lg:col-span-7 lg:relative" 
//         >
//           {/* Project title and metadata */}
//           <div ref={titleRef} className="mb-6">
//             <div className="flex flex-wrap gap-2 mb-3">
//               <span
//                 className="py-1 px-3 text-sm text-[#3d3d3d] rounded-full inline-block"
//                 style={{ backgroundColor: accentColor }}
//               >
//                 {type}
//               </span>
//               <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                 {tags}
//               </span>
//             </div>
//             <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//             <p className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//           </div>
          
//           {/* Description section in the left column */}
//           <div ref={descriptionRef} className="mb-8">
//             <p className="text-base lg:text-lg opacity-85 leading-relaxed">
//               {description}
//             </p>
//           </div>
          
//           {/* Golden image container */}
//           <div 
//             ref={goldenImageRef} 
//             className="relative overflow-hidden rounded-lg shadow-lg"
//           >
//             <img 
//               src={thumbnailGolden} 
//               alt={`${title} main view`} 
//               className="w-full h-full object-cover"
//             />
            
//             {/* Live site link button */}
//             <div className="absolute bottom-6 right-6">
//               <a
//                 href={liveSiteLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center h-12 w-12 rounded-full text-white text-2xl hover:scale-110 transition-transform shadow-lg"
//                 style={{ backgroundColor: accentColor }}
//               >
//                 ↗
//               </a>
//             </div>
//           </div>
//         </div>
        
//         {/* Right Column - Normal scroll to catch up with left */}
//         <div 
//           ref={rightSectionRef} 
//           className="lg:col-span-5 flex flex-col gap-24 lg:mt-48 lg:pl-6"
//         >
//           {/* Stats section */}
//           <div ref={statsRef} className="flex gap-10">
//             <div>
//               <p className="text-2xl lg:text-3xl font-semibold">
//                 {metrics.metric1_value}
//               </p>
//               <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//             </div>
//             {metrics.metric2_value && (
//               <div>
//                 <p className="text-2xl lg:text-3xl font-semibold">
//                   {metrics.metric2_value}
//                 </p>
//                 <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//               </div>
//             )}
//           </div>
          
//           {/* Tall image - 5 cols wide */}
//           <div 
//             ref={tallImageRef} 
//             className="w-full lg:w-5/6 overflow-hidden rounded-xl shadow-lg"
//           >
//             <img 
//               src={thumbnailTall} 
//               alt={`${title} tall view`} 
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//           {/* Square image - 4 cols wide */}
//           <div 
//             ref={squareImageRef} 
//             className="w-full lg:w-4/6 ml-auto overflow-hidden rounded-xl shadow-lg"
//           >
//             <img 
//               src={thumbnailSquare} 
//               alt={`${title} square view`} 
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicProjectCard;


// gemini output - no anim but layout/text size looked nice
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const goldenImageRef = useRef(null); // Need this for pin end calculation
//   const squareImageRef = useRef(null);
//   const titleRef = useRef(null);
//   const taglineRef = useRef(null); // Added ref for tagline if needed for animation
//   const descriptionRef = useRef(null);
//   const visitButtonRef = useRef(null); // Added ref for button if needed
//   const tallImageRef = useRef(null);
//   const statsRef = useRef(null);


//   useEffect(() => {
//     // Ensure GSAP and ScrollTrigger are available
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);

//       // Use matchMedia for responsive animations (desktop-only)
//       const mm = gsap.matchMedia();

//       mm.add("(min-width: 1024px)", () => { // Only apply complex animations on large screens
//         // --- Entrance Animation: Left Column ---
//         // Animate elements into view as the card enters
//         gsap.fromTo(
//           [titleRef.current, taglineRef.current, descriptionRef.current, goldenImageRef.current, visitButtonRef.current], // Added refs
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.1, // Slightly faster stagger
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: leftSectionRef.current, // Trigger based on the left section itself
//               start: "top bottom-=100", // Start when the top is 100px from the bottom
//               toggleActions: "play none none reverse", // Play on enter, reverse on leave
//             }
//           }
//         );

//         // --- Entrance Animation: Right Column ---
//         // Animate elements slightly later, creating the staggered effect
//         const rightElements = [statsRef.current, tallImageRef.current, squareImageRef.current];
//         gsap.fromTo(
//           rightElements,
//           {
//             y: 80,
//             opacity: 0,
//             scale: 0.98,
//             // rotationZ: (i) => (i % 2 === 0 ? 1 : -1) // Keep rotation if desired
//           },
//           {
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             // rotationZ: 0,
//             stagger: 0.2, // Stagger the entrance of right column items
//             duration: 1.2,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: rightSectionRef.current, // Trigger based on the right section
//               start: "top bottom-=150", // Start slightly later than left column
//               // once: true, // Optional: Animate only once
//                toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // --- Core Logic: Pin Left Column until Alignment ---
//         ScrollTrigger.create({
//           trigger: cardRef.current, // The whole card triggers the pin
//           pin: leftSectionRef.current, // Pin the left column
//           start: "top top", // Start pinning when the top of the card hits the top of the viewport
//           // Dynamically calculate the end point:
//           // End when the bottom of the square image reaches the *pinned* bottom position of the golden image.
//           endTrigger: squareImageRef.current, // Monitor the square image
//           end: () => {
//             // Calculate the distance from the top of the viewport to the bottom of the (pinned) golden image.
//             const goldenImageBottom = goldenImageRef.current.getBoundingClientRect().bottom;
//             // Calculate the bottom position of the square image relative to the viewport top.
//             const squareImageBottom = squareImageRef.current.getBoundingClientRect().bottom;
//             // The trigger should end when the *bottom* of the square image scrolls to the *same vertical position* as the golden image's bottom.
//             // We return a string like "bottom 500px" where 500px is the target position.
//             return `bottom ${goldenImageBottom}px`;
//           },
//           pinSpacing: false, // Important: Prevents extra space after pin, allowing smooth transition
//           // markers: true, // uncomment for debugging pin start/end
//           invalidateOnRefresh: true // Recalculate end point on resize/refresh
//         });


//          // Optional: Subtle Parallax for Right Images (before alignment)
//          // Be cautious if this interferes with the alignment calculation. Test thoroughly.
//          /*
//          gsap.to([tallImageRef.current, squareImageRef.current], {
//            yPercent: -5, // Move images up slightly as they scroll
//            ease: "none",
//            scrollTrigger: {
//              trigger: rightSectionRef.current,
//              start: "top bottom", // Start parallax when section enters
//              end: "bottom top", // End parallax when section leaves
//              scrub: 1 // Smooth scrubbing effect
//              // We might need to ensure this parallax doesn't affect the pin 'end' calculation significantly
//              // Or limit its 'end' condition so it stops *before* the main pin ends.
//            }
//          });
//          */

//       }); // End matchMedia

//       // --- Cleanup ---
//       return () => {
//         mm.revert(); // Revert matchMedia setup
//         // Kill all ScrollTriggers associated with this component to prevent memory leaks
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, [project]); // Dependency array includes project data in case it changes

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden" // Added overflow-hidden to contain animations if needed
//       style={{ backgroundColor }}
//     >
//       {/* Use a container for padding and max-width */}
//       <div className="max-w-7xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
//         {/* Grid layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-12">

//           {/* Left Column (Pinned) */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-7" // No relative needed here as pin handles positioning
//           >
//             <div className="flex flex-col space-y-8"> {/* Vertical spacing */}
//               {/* Type and Tags */}
//                <div ref={titleRef} className="mb-0"> {/* Reduced margin-bottom */}
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-[#3d3d3d] rounded-full inline-block font-medium" // Added font-medium
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                  {/* Title and Tagline */}
//                 <h2 ref={taglineRef} className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//                </div>

//               {/* Description */}
//               <div ref={descriptionRef}>
//                 <p className="text-base lg:text-lg opacity-85 leading-relaxed">
//                   {description}
//                 </p>
//               </div>

//               {/* Golden Image */}
//               <div
//                 ref={goldenImageRef}
//                 className="relative overflow-hidden rounded-lg shadow-lg aspect-[16/10]" // Maintain aspect ratio
//               >
//                 <img
//                   src={thumbnailGolden}
//                   alt={`${title} main view`}
//                   className="w-full h-full object-cover"
//                   // Add loading="lazy" for performance
//                   loading="lazy"
//                 />
//                 {/* Visit Project Button (Positioned relative to image) */}
//                  <div ref={visitButtonRef} className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
//                    <a
//                      href={liveSiteLink || caseStudyLink} // Fallback to case study if no live site
//                      target="_blank"
//                      rel="noopener noreferrer"
//                      className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }} // Added focus styles
//                      aria-label={`Visit project ${title}`} // Accessibility
//                    >
//                      {liveSiteLink ? '↗' : '📄'} {/* Different icon for case study */}
//                    </a>
//                  </div>
//               </div>
//             </div> {/* End left column inner flex */}
//           </div> {/* End Left Column */}

//           {/* Right Column (Scrolling) */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-5" // Let grid handle positioning
//           >
//             {/* Use flex/grid for internal layout if needed, add spacing */}
//             <div className="flex flex-col space-y-12 lg:space-y-24 lg:pt-32"> {/* Added top padding to push content down initially */}

//               {/* Stats */}
//               <div ref={statsRef} className="flex gap-8 lg:gap-10">
//                 <div>
//                   <p className="text-2xl lg:text-3xl font-semibold">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85 uppercase tracking-wider">{metrics.metric1_name}</p> {/* Uppercase style */}
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="text-2xl lg:text-3xl font-semibold">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85 uppercase tracking-wider">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Tall Image */}
//               <div
//                 ref={tallImageRef}
//                 className="w-full lg:w-5/6 overflow-hidden rounded-xl shadow-lg" // Width relative to parent column
//               >
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block" // Ensure block display, height auto
//                    loading="lazy"
//                 />
//               </div>

//               {/* Square Image */}
//               <div
//                 ref={squareImageRef}
//                 className="w-full lg:w-4/6 ml-auto overflow-hidden rounded-xl shadow-lg" // Margin-left auto to push right
//               >
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block" // Ensure block display, force aspect ratio
//                    loading="lazy"
//                 />
//               </div>
//             </div> {/* End right column inner flex */}
//           </div> {/* End Right Column */}

//         </div> {/* End Grid */}
//       </div> {/* End Container */}
//     </div> /* End Card */
//   );
// };

// export default DynamicProjectCard;


// I like this below one, no animation tho
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const goldenImageRef = useRef(null);
//   const squareImageRef = useRef(null);
//   const titleRef = useRef(null);
//   const taglineRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const visitButtonRef = useRef(null);
//   const tallImageRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
      
//       // Only apply animations on desktop
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 1024px)", () => {
//         // --- Entrance Animation: Left Column ---
//         gsap.fromTo(
//           [titleRef.current, taglineRef.current, descriptionRef.current, goldenImageRef.current, visitButtonRef.current],
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.1,
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: leftSectionRef.current,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // --- Entrance Animation: Right Column ---
//         const rightElements = [statsRef.current, tallImageRef.current, squareImageRef.current];
        
//         rightElements.forEach((el, index) => {
//           gsap.fromTo(
//             el,
//             { 
//               y: 80, 
//               opacity: 0,
//               scale: 0.98
//             },
//             { 
//               y: 0, 
//               opacity: 1, 
//               scale: 1,
//               duration: 1.2, 
//               ease: "power3.out",
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top bottom-=150",
//                 toggleActions: "play none none reverse",
//               }
//             }
//           );
//         });
        
//         // Create the pin for left column - using simplified approach
//         ScrollTrigger.create({
//           trigger: cardRef.current,
//           start: "top top",
//           end: () => {
//             // Get the total height of the right column
//             const rightHeight = rightSectionRef.current.offsetHeight;
//             // Get the height of the left column
//             const leftHeight = leftSectionRef.current.offsetHeight;
//             // Calculate how much extra scrolling is needed before unpinning
//             const extraScroll = rightHeight - leftHeight + 200; // Add buffer
            
//             return `+=${extraScroll}px`; // End pin after scrolling the extra distance
//           },
//           pin: leftSectionRef.current,
//           pinSpacing: false,
//           anticipatePin: 1
//         });
        
//         // Debug marker
//         /*
//         ScrollTrigger.create({
//           trigger: cardRef.current,
//           start: "top top",
//           end: () => {
//             const rightHeight = rightSectionRef.current.offsetHeight;
//             const leftHeight = leftSectionRef.current.offsetHeight;
//             const extraScroll = rightHeight - leftHeight + 200;
//             return `+=${extraScroll}px`;
//           },
//           markers: true
//         });
//         */
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden"
//       style={{ backgroundColor }}
//     >
//       {/* Use a container for padding and max-width */}
//       <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//         {/* Grid layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

//           {/* Left Column (Pinned) */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-8"
//           >
//             <div className="flex flex-col space-y-8"> {/* Removed pin-content-wrapper class */}
//               {/* Type and Tags */}
//               <div ref={titleRef} className="mb-0">
//                 <div className="flex flex-wrap gap-0.5 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-white rounded-full inline-block"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                 {/* Title and Tagline */}
//                 <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p ref={taglineRef} className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//               </div>

//               {/* Description */}
//               <div ref={descriptionRef} className="max-w-[500px]">
//                 <p className="text-sm lg:text-md opacity-85 leading-snug text-pretty">
//                   {description}
//                 </p>
//               </div>

//               {/* Golden Image */}
//               <div
//                 ref={goldenImageRef}
//                 className="relative xoverflow-hidden rounded shadow-lg aspect-[16/10]"
//               >
//                 <img
//                   src={thumbnailGolden}
//                   alt={`${title} main view`}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />
//                 {/* Visit Project Button (Positioned relative to image) */}
//                 <div ref={visitButtonRef} className="absolute -top-8 right-4 xlg:bottom-6 xlg:right-6">
//                   <a
//                     href={liveSiteLink || caseStudyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
//                     aria-label={`Visit project ${title}`}
//                   >
//                     {liveSiteLink ? '↗' : '📄'}
//                   </a>
//                 </div>
//               </div>
//             </div> {/* End left column inner flex */}
//           </div> {/* End Left Column */}

//           {/* Right Column (Normal Scrolling) - Reduced width and gap */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-4 will-change-transform"
//           >
//             {/* Reduced vertical spacing between elements */}
//             <div className="flex flex-col space-y-6 lg:space-y-6 lg:pt-16">

//               {/* Stats */}
//               <div ref={statsRef} className="flex gap-6 lg:gap-8">
//                 <div>
//                   <p className="font-accent text-2xl lg:text-3xl font-thin">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="font-accent text-2xl lg:text-3xl font-thin">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Tall Image */}
//               <div
//                 ref={tallImageRef}
//                 className="w-full lg:w-5/6 overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block"
//                   loading="lazy"
//                 />
//               </div>

//               {/* Square Image */}
//               <div
//                 ref={squareImageRef}
//                 className="w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block"
//                   loading="lazy"
//                 />
//               </div>
//             </div> {/* End right column inner flex */}
//           </div> {/* End Right Column */}

//         </div> {/* End Grid */}
//       </div> {/* End Container */}
//     </div> /* End Card */
//   );
// };

// export default DynamicProjectCard;



// Not quite what i was originally after but very clean card pin animation i like it!
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const goldenImageRef = useRef(null);
//   const squareImageRef = useRef(null);
//   const titleRef = useRef(null);
//   const taglineRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const visitButtonRef = useRef(null);
//   const tallImageRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
      
//       // Only apply animations on desktop
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 1024px)", () => {
//         // --- Entrance Animation: Left Column ---
//         gsap.fromTo(
//           [titleRef.current, taglineRef.current, descriptionRef.current, goldenImageRef.current, visitButtonRef.current],
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.1,
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: leftSectionRef.current,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // --- Entrance Animation: Right Column with slight delay ---
//         const rightElements = [statsRef.current, tallImageRef.current, squareImageRef.current];
        
//         rightElements.forEach((el, index) => {
//           gsap.fromTo(
//             el,
//             { 
//               y: 80, 
//               opacity: 0,
//               scale: 0.98
//             },
//             { 
//               y: 0, 
//               opacity: 1, 
//               scale: 1,
//               duration: 1.2, 
//               ease: "power3.out",
//               delay: 0.2, // Small delay to let left column start first
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top bottom-=150",
//                 toggleActions: "play none none reverse",
//               }
//             }
//           );
//         });
        
//         // Create the smooth scrolling effect for the left column
//         const leftColumnTimeline = gsap.timeline({
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top",
//             end: () => {
//               // Calculate the distance the right column needs to scroll
//               const rightHeight = rightSectionRef.current.offsetHeight;
//               const leftHeight = leftSectionRef.current.offsetHeight;
//               const viewportHeight = window.innerHeight;
//               // We want to adjust the end point so that both columns exit together
//               return `+=${rightHeight - leftHeight + viewportHeight}px`;
//             },
//             pin: true,
//             anticipatePin: 1,
//             scrub: 0.5, // Smooth scrubbing effect
//             invalidateOnRefresh: true, // Recalculate on window resize
//           }
//         });

//         // Parallax effect - move the left column at a slower pace
//         leftColumnTimeline.fromTo(
//           leftSectionRef.current,
//           {
//             y: 0,
//           },
//           {
//             y: () => {
//               // Calculate how much the left section should move
//               // This makes the left section exit the viewport at the same time as the right
//               const rightHeight = rightSectionRef.current.offsetHeight;
//               const leftHeight = leftSectionRef.current.offsetHeight;
//               return -(rightHeight - leftHeight);
//             },
//             ease: "none",
//           }
//         );

//         // Add subtle scaling effect to the right column elements while they scroll
//         rightElements.forEach((el) => {
//           gsap.fromTo(
//             el,
//             { scale: 1 },
//             {
//               scale: 0.95,
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top center",
//                 end: "bottom top",
//                 scrub: true,
//               }
//             }
//           );
//         });
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden"
//       style={{ backgroundColor }}
//     >
//       {/* Use a container for padding and max-width */}
//       <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//         {/* Grid layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

//           {/* Left Column (with parallax effect) */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-8 will-change-transform"
//           >
//             <div className="flex flex-col space-y-8">
//               {/* Type and Tags */}
//               <div ref={titleRef} className="mb-0">
//                 <div className="flex flex-wrap gap-0.5 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-white rounded-full inline-block"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                 {/* Title and Tagline */}
//                 <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p ref={taglineRef} className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//               </div>

//               {/* Description */}
//               <div ref={descriptionRef} className="max-w-[500px]">
//                 <p className="text-sm lg:text-md opacity-85 leading-snug text-pretty">
//                   {description}
//                 </p>
//               </div>

//               {/* Golden Image */}
//               <div
//                 ref={goldenImageRef}
//                 className="relative xoverflow-hidden rounded shadow-lg aspect-[16/10]"
//               >
//                 <img
//                   src={thumbnailGolden}
//                   alt={`${title} main view`}
//                   className="w-full h-full object-cover rounded shadow-lg"
//                   loading="lazy"
//                 />
//                 {/* Visit Project Button (Positioned relative to image) */}
//                 <div ref={visitButtonRef} className="absolute -top-8 right-4">
//                   <a
//                     href={liveSiteLink || caseStudyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
//                     aria-label={`Visit project ${title}`}
//                   >
//                     {liveSiteLink ? '↗' : '📄'}
//                   </a>
//                 </div>
//               </div>
//             </div> {/* End left column inner flex */}
//           </div> {/* End Left Column */}

//           {/* Right Column (Normal Scrolling) */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-4 will-change-transform"
//           >
//             {/* Reduced vertical spacing between elements */}
//             <div className="flex flex-col space-y-6 lg:space-y-8 lg:pt-16">

//               {/* Stats */}
//               <div ref={statsRef} className="flex gap-6 lg:gap-8">
//                 <div>
//                   <p className="font-accent text-2xl lg:text-3xl font-thin">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="font-accent text-2xl lg:text-3xl font-thin">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Tall Image */}
//               <div
//                 ref={tallImageRef}
//                 className="w-full lg:w-5/6 overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block"
//                   loading="lazy"
//                 />
//               </div>

//               {/* Square Image */}
//               <div
//                 ref={squareImageRef}
//                 className="w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block"
//                   loading="lazy"
//                 />
//               </div>
//             </div> {/* End right column inner flex */}
//           </div> {/* End Right Column */}

//         </div> {/* End Grid */}
//       </div> {/* End Container */}
//     </div> /* End Card */
//   );
// };

// export default DynamicProjectCard;


// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);
//   const goldenImageRef = useRef(null);
//   const squareImageRef = useRef(null);
//   const titleRef = useRef(null);
//   const taglineRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const visitButtonRef = useRef(null);
//   const tallImageRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
      
//       // Only apply animations on desktop
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 1024px)", () => {
//         // --- Entrance Animation: Left Column ---
//         gsap.fromTo(
//           [titleRef.current, taglineRef.current, descriptionRef.current, goldenImageRef.current, visitButtonRef.current],
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.1,
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: leftSectionRef.current,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse",
//             }
//           }
//         );

//         // --- Entrance Animation: Right Column with slight delay ---
//         const rightElements = [statsRef.current, tallImageRef.current, squareImageRef.current];
        
//         rightElements.forEach((el, index) => {
//           gsap.fromTo(
//             el,
//             { 
//               y: 80, 
//               opacity: 0,
//               scale: 0.98
//             },
//             { 
//               y: 0, 
//               opacity: 1, 
//               scale: 1,
//               duration: 1.2, 
//               ease: "power3.out",
//               delay: 0.2, // Small delay to let left column start first
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top bottom-=150",
//                 toggleActions: "play none none reverse",
//               }
//             }
//           );
//         });
        
//         // Create the smooth scrolling effect for the left column
//         const leftColumnTimeline = gsap.timeline({
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top",
//             end: () => {
//               // Calculate the distance the right column needs to scroll
//               const rightHeight = rightSectionRef.current.offsetHeight;
//               const leftHeight = leftSectionRef.current.offsetHeight;
//               const viewportHeight = window.innerHeight;
//               // We want to adjust the end point so that both columns exit together
//               return `+=${rightHeight - leftHeight + viewportHeight}px`;
//             },
//             pin: true,
//             anticipatePin: 1,
//             scrub: 0.5, // Smooth scrubbing effect
//             invalidateOnRefresh: true, // Recalculate on window resize
//           }
//         });

//         // Parallax effect - move the left column at a slower pace
//         leftColumnTimeline.fromTo(
//           leftSectionRef.current,
//           {
//             y: 0,
//           },
//           {
//             y: () => {
//               // Calculate how much the left section should move
//               // This makes the left section exit the viewport at the same time as the right
//               const rightHeight = rightSectionRef.current.offsetHeight;
//               const leftHeight = leftSectionRef.current.offsetHeight;
//               return -(rightHeight - leftHeight);
//             },
//             ease: "none",
//           }
//         );

//         // Add subtle scaling effect to the right column elements while they scroll
//         rightElements.forEach((el) => {
//           gsap.fromTo(
//             el,
//             { scale: 1 },
//             {
//               scale: 0.95,
//               scrollTrigger: {
//                 trigger: el,
//                 start: "top center",
//                 end: "bottom top",
//                 scrub: true,
//               }
//             }
//           );
//         });
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden"
//       style={{ backgroundColor }}
//     >
//       {/* Use a container for padding and max-width */}
//       <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//         {/* Grid layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

//           {/* Left Column (with parallax effect) */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-8 will-change-transform"
//           >
//             <div className="flex flex-col space-y-8">
//               {/* Type and Tags */}
//               <div ref={titleRef} className="mb-0">
//                 <div className="flex flex-wrap gap-0.5 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-white rounded-full inline-block"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                 {/* Title and Tagline */}
//                 <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p ref={taglineRef} className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//               </div>

//               {/* Description */}
//               <div ref={descriptionRef} className="max-w-[500px]">
//                 <p className="text-sm lg:text-md opacity-85 leading-snug text-pretty">
//                   {description}
//                 </p>
//               </div>

//               {/* Golden Image */}
//               <div
//                 ref={goldenImageRef}
//                 className="relative xoverflow-hidden rounded shadow-lg aspect-[16/10]"
//               >
//                 <img
//                   src={thumbnailGolden}
//                   alt={`${title} main view`}
//                   className="w-full h-full object-cover rounded shadow-lg"
//                   loading="lazy"
//                 />
//                 {/* Visit Project Button (Positioned relative to image) */}
//                 <div ref={visitButtonRef} className="absolute -top-8 right-4">
//                   <a
//                     href={liveSiteLink || caseStudyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
//                     aria-label={`Visit project ${title}`}
//                   >
//                     {liveSiteLink ? '↗' : '📄'}
//                   </a>
//                 </div>
//               </div>
//             </div> {/* End left column inner flex */}
//           </div> {/* End Left Column */}

//           {/* Right Column (Normal Scrolling) */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-4 will-change-transform"
//           >
//             {/* Reduced vertical spacing between elements */}
//             <div className="flex flex-col space-y-6 lg:space-y-8 lg:pt-16">

//               {/* Stats */}
//               <div ref={statsRef} className="flex gap-6 lg:gap-8">
//                 <div>
//                   <p className="font-accent text-2xl lg:text-3xl font-thin">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="font-accent text-2xl lg:text-3xl font-thin">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Tall Image */}
//               <div
//                 ref={tallImageRef}
//                 className="w-full lg:w-5/6 overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block"
//                   loading="lazy"
//                 />
//               </div>

//               {/* Square Image */}
//               <div
//                 ref={squareImageRef}
//                 className="w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg"
//               >
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block"
//                   loading="lazy"
//                 />
//               </div>
//             </div> {/* End right column inner flex */}
//           </div> {/* End Right Column */}

//         </div> {/* End Grid */}
//       </div> {/* End Container */}
//     </div> /* End Card */
//   );
// };

// export default DynamicProjectCard;



// honestly 95% perfect
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);

//   // Refs for elements animated individually
//   const titleGroupRef = useRef(null);
//   const descriptionGroupRef = useRef(null);
//   const goldenImageGroupRef = useRef(null);
//   const statsGroupRef = useRef(null);
//   const tallImageGroupRef = useRef(null);
//   const squareImageGroupRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);

//       const mm = gsap.matchMedia();
      
//       mm.add("(min-width: 1024px)", () => {
//         // Left column animations
//         const leftElements = [titleGroupRef.current, descriptionGroupRef.current, goldenImageGroupRef.current];
//         gsap.from(leftElements, {
//           y: 50,
//           opacity: 0,
//           stagger: 0.15,
//           duration: 0.9,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: leftSectionRef.current,
//             start: "top bottom-=100",
//             toggleActions: "play none none reverse",
//           }
//         });

//         // Right column animations with delay
//         const rightElements = [statsGroupRef.current, tallImageGroupRef.current, squareImageGroupRef.current];
//         gsap.from(rightElements, {
//           y: 70,
//           opacity: 0,
//           scale: 0.98,
//           stagger: 0.2,
//           duration: 1.1,
//           ease: "power3.out",
//           delay: 0.6, // Increased delay for right column
//           scrollTrigger: {
//             trigger: rightSectionRef.current,
//             start: "top bottom-=120",
//             toggleActions: "play none none reverse",
//           }
//         });

//         // Basic pin setup
//         ScrollTrigger.create({
//           trigger: cardRef.current,
//           start: "top top+=5", // Small offset to prevent jumps
//           end: "bottom bottom",
//           pin: leftSectionRef.current,
//           pinSpacing: false,
//         });

//         // Simple parallax effect
//         gsap.to(leftSectionRef.current, {
//           y: () => {
//             if (!leftSectionRef.current || !rightSectionRef.current) return 0;
            
//             const leftHeight = leftSectionRef.current.offsetHeight;
//             const rightHeight = rightSectionRef.current.offsetHeight;
            
//             // Only move if right column is taller
//             if (rightHeight <= leftHeight) return 0;
            
//             // Return a value slightly less than the full difference to prevent overscrolling
//             return -(rightHeight - leftHeight) * 0.95;
//           },
//           ease: "none",
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: "top top",
//             end: "bottom bottom",
//             scrub: 0.5, // Reduced scrub value for more responsive scrolling
//           }
//         });
//       });

//       return () => {
//         mm.revert();
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden relative z-10"
//       style={{ backgroundColor }}
//     >
//       <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

//           {/* Left Column (Pinned & Parallax) */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-8"
//           >
//             <div className="flex flex-col space-y-8">
//               <div ref={titleGroupRef}>
//                 <div className="flex flex-wrap gap-0.5 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-white rounded-full inline-block"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                 <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//               </div>

//               <div ref={descriptionGroupRef} className="max-w-[500px]">
//                 <p className="text-sm lg:text-md opacity-85 leading-snug text-pretty">
//                   {description}
//                 </p>
//               </div>

//               <div ref={goldenImageGroupRef} className="relative aspect-[16/10]">
//                 <div className="overflow-hidden rounded shadow-lg">
//                   <img
//                     src={thumbnailGolden}
//                     alt={`${title} main view`}
//                     className="w-full h-full object-cover rounded shadow-lg block"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="absolute -top-8 right-4">
//                   <a
//                     href={liveSiteLink || caseStudyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
//                     aria-label={`Visit project ${title}`}
//                   >
//                     {liveSiteLink ? '↗' : '📄'}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column (Normal Scrolling) */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-4"
//           >
//             <div className="flex flex-col space-y-6 lg:space-y-8 lg:pt-16">
//               <div ref={statsGroupRef} className="flex gap-6 lg:gap-8">
//                 <div>
//                   <p className="font-accent text-2xl lg:text-3xl font-thin">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="font-accent text-2xl lg:text-3xl font-thin">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               <div ref={tallImageGroupRef} className="w-full lg:w-5/6 overflow-hidden rounded shadow-lg">
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block"
//                   loading="lazy"
//                 />
//               </div>

//               <div ref={squareImageGroupRef} className="w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg">
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicProjectCard;

// 99% perfect
// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// const DynamicProjectCard = ({ project }) => {
//   const {
//     title,
//     tagline,
//     description,
//     type,
//     tags,
//     metrics,
//     thumbnailTall,
//     thumbnailGolden,
//     thumbnailSquare,
//     accentColor,
//     backgroundColor,
//     caseStudyLink,
//     liveSiteLink,
//   } = project;

//   const cardRef = useRef(null);
//   const leftSectionRef = useRef(null);
//   const rightSectionRef = useRef(null);

//   // Refs for elements animated individually
//   const titleGroupRef = useRef(null);
//   const descriptionGroupRef = useRef(null);
//   const goldenImageGroupRef = useRef(null);
//   const statsGroupRef = useRef(null);
//   const tallImageGroupRef = useRef(null);
//   const squareImageGroupRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
      
//       // Create a GSAP context scoped to this component
//       // This prevents conflicts with other card instances
//       const ctx = gsap.context(() => {
//         const mm = gsap.matchMedia();
        
//         mm.add("(min-width: 1024px)", () => {
//           // Master timeline for sequencing
//           const masterTl = gsap.timeline({
//             scrollTrigger: {
//               trigger: cardRef.current,
//               start: "top bottom-=100",
//               end: "center center",
//               scrub: 1
//             }
//           });
          
//           // Left column elements animation
//           masterTl.from(titleGroupRef.current, {
//             y: 40,
//             opacity: 0,
//             duration: 0.2
//           })
//           .from(descriptionGroupRef.current, {
//             y: 40,
//             opacity: 0,
//             duration: 0.2
//           }, "-=0.15")
//           .from(goldenImageGroupRef.current, {
//             y: 40,
//             opacity: 0,
//             duration: 0.2
//           }, "-=0.15")
          
//           // Right column animations (delayed in the timeline sequence)
//           // This ensures left column animates before right column
//           .from(statsGroupRef.current, {
//             y: 60,
//             opacity: 0,
//             duration: 0.2
//           }, "+=0.1") // Delay before starting right column
//           .from(tallImageGroupRef.current, {
//             y: 60,
//             opacity: 0,
//             scale: 0.95,
//             duration: 0.2
//           }, "-=0.15")
//           .from(squareImageGroupRef.current, {
//             y: 60,
//             opacity: 0,
//             scale: 0.95,
//             duration: 0.2
//           }, "-=0.15");
          
//           // Custom scroll speed for right column (moves faster)
//           gsap.to(rightSectionRef.current, {
//             y: "-15%", // Move faster than natural scroll
//             ease: "none",
//             scrollTrigger: {
//               trigger: rightSectionRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 0.5
//             }
//           });
          
//           // Custom scroll speed for left column (moves slightly slower)
//           gsap.to(leftSectionRef.current, {
//             y: "10%", // Move slower than natural scroll
//             ease: "none",
//             scrollTrigger: {
//               trigger: leftSectionRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 0.7 // Smoother scrub for left column
//             }
//           });
//         });
//       }, cardRef); // Scope the context to this card
      
//       // Return a cleanup function that only clears this component's animations
//       return () => ctx.revert();
//     }
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="w-full overflow-hidden relative z-10"
//       style={{ backgroundColor }}
//     >
//       <div className="xmax-w-7xl max-w-screen-2xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

//           {/* Left Column */}
//           <div
//             ref={leftSectionRef}
//             className="lg:col-span-8"
//           >
//             <div className="flex flex-col space-y-8">
//               <div ref={titleGroupRef}>
//                 <div className="flex flex-wrap gap-0.5 mb-3">
//                   <span
//                     className="py-1 px-3 text-sm text-white rounded-full inline-block"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {type}
//                   </span>
//                   <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
//                     {tags}
//                   </span>
//                 </div>
//                 <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
//                 <p className="text-xl lg:text-2xl opacity-85">{tagline}</p>
//               </div>

//               <div ref={descriptionGroupRef} className="max-w-[500px]">
//                 <p className="text-sm lg:text-md opacity-85 leading-snug text-pretty">
//                   {description}
//                 </p>
//               </div>

//               <div ref={goldenImageGroupRef} className="relative aspect-[16/10]">
//                 <div className="overflow-hidden rounded shadow-lg">
//                   <img
//                     src={thumbnailGolden}
//                     alt={`${title} main view`}
//                     className="w-full h-full object-cover rounded shadow-lg block"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="absolute -top-8 right-4">
//                   <a
//                     href={liveSiteLink || caseStudyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
//                     style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
//                     aria-label={`Visit project ${title}`}
//                   >
//                     {liveSiteLink ? '↗' : '📄'}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div
//             ref={rightSectionRef}
//             className="lg:col-span-4"
//           >
//             <div className="flex flex-col space-y-6 lg:space-y-8 lg:pt-16">
//               <div ref={statsGroupRef} className="flex gap-6 lg:gap-8">
//                 <div>
//                   <p className="font-accent text-2xl lg:text-3xl font-thin">
//                     {metrics.metric1_value}
//                   </p>
//                   <p className="text-sm opacity-85">{metrics.metric1_name}</p>
//                 </div>
//                 {metrics.metric2_value && (
//                   <div>
//                     <p className="font-accent text-2xl lg:text-3xl font-thin">
//                       {metrics.metric2_value}
//                     </p>
//                     <p className="text-sm opacity-85">{metrics.metric2_name}</p>
//                   </div>
//                 )}
//               </div>

//               <div ref={tallImageGroupRef} className="w-full lg:w-5/6 overflow-hidden rounded shadow-lg">
//                 <img
//                   src={thumbnailTall}
//                   alt={`${title} tall view`}
//                   className="w-full h-auto object-cover block"
//                   loading="lazy"
//                 />
//               </div>

//               <div ref={squareImageGroupRef} className="w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg">
//                 <img
//                   src={thumbnailSquare}
//                   alt={`${title} square view`}
//                   className="w-full h-auto object-cover aspect-square block"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicProjectCard;


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

  // Refs for elements animated individually
  const titleGroupRef = useRef(null);
  const descriptionGroupRef = useRef(null);
  const goldenImageGroupRef = useRef(null);
  const statsGroupRef = useRef(null);
  const tallImageGroupRef = useRef(null);
  const squareImageGroupRef = useRef(null);
  
  // Mobile specific refs
  const mobileStatsRef = useRef(null);
  const mobileTallImageRef = useRef(null);
  const mobileSquareImageRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Create a GSAP context scoped to this component
      const ctx = gsap.context(() => {
        // Desktop animations (min-width: 1024px)
        const desktopMM = gsap.matchMedia();
        desktopMM.add("(min-width: 1024px)", () => {
          // Master timeline for sequencing
          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom-=100",
              end: "center center",
              scrub: 1
            }
          });
          
          // Left column elements animation
          masterTl.from(titleGroupRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.2
          })
          .from(descriptionGroupRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.2
          }, "-=0.15")
          .from(goldenImageGroupRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.2
          }, "-=0.15")
          
          // Right column animations (delayed in the timeline sequence)
          .from(statsGroupRef.current, {
            y: 60,
            opacity: 0,
            duration: 0.2
          }, "+=0.1") // Delay before starting right column
          .from(tallImageGroupRef.current, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.2
          }, "-=0.15")
          .from(squareImageGroupRef.current, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.2
          }, "-=0.15");
          
          // Custom scroll speed for right column (moves faster)
          gsap.to(rightSectionRef.current, {
            y: "-15%", // Move faster than natural scroll
            ease: "none",
            scrollTrigger: {
              trigger: rightSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5
            }
          });
          
          // Custom scroll speed for left column (moves slightly slower)
          gsap.to(leftSectionRef.current, {
            y: "10%", // Move slower than natural scroll
            ease: "none",
            scrollTrigger: {
              trigger: leftSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7 // Smoother scrub for left column
            }
          });
        });
        
        // Mobile animations (max-width: 1023px)
        const mobileMM = gsap.matchMedia();
        mobileMM.add("(max-width: 1023px)", () => {
          // Subtle fade-in animations for mobile
          gsap.from(titleGroupRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleGroupRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
          
          gsap.from(descriptionGroupRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descriptionGroupRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
          
          gsap.from(goldenImageGroupRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: goldenImageGroupRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
          
          // Mobile stats animations
          gsap.from(mobileStatsRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileStatsRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
          
          // Mobile tall image animation
          gsap.from(mobileTallImageRef.current, {
            x: -15, // Slight horizontal movement
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileTallImageRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
          
          // Mobile square image animation
          gsap.from(mobileSquareImageRef.current, {
            x: 15, // Slight horizontal movement (opposite direction)
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileSquareImageRef.current,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.5
            }
          });
        });
      }, cardRef); // Scope the context to this card
      
      // Return a cleanup function that only clears this component's animations
      return () => ctx.revert();
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full overflow-hidden relative z-10"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-8 text-[#3d3d3d]">

          {/* Left Column */}
          <div
            ref={leftSectionRef}
            className="lg:col-span-8"
          >
            <div className="flex flex-col space-y-8">
              <div ref={titleGroupRef}>
                <div className="flex flex-wrap gap-0.5 mb-3">
                  <span
                    className="py-1 px-3 text-sm text-white rounded-full inline-block"
                    style={{ backgroundColor: accentColor }}
                  >
                    {type}
                  </span>
                  <span className="py-1 px-3 text-sm opacity-85 rounded-full inline-block">
                    {tags}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin mb-2 font-accent">{title}</h2>
                <p className="text-xl lg:text-2xl opacity-85">{tagline}</p>
              </div>

              <div ref={descriptionGroupRef} className="max-w-[600px]">
                <p className="xtext-sm lg:text-md opacity-85 leading-snug text-pretty">
                  {description}
                </p>
              </div>

              <div ref={goldenImageGroupRef} className="relative aspect-[16/10]">
                <div className="overflow-hidden rounded shadow-lg">
                  <img
                    src={thumbnailGolden}
                    alt={`${title} main view`}
                    className="w-full h-full object-cover rounded shadow-lg block"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-8 right-4">
                  <a
                    href={liveSiteLink || caseStudyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full text-white text-xl lg:text-2xl transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ backgroundColor: accentColor, ringOffsetColor: backgroundColor, ringColor: accentColor }}
                    aria-label={`Visit project ${title}`}
                  >
                    {liveSiteLink ? '↗' : '📄'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightSectionRef}
            className="lg:col-span-4"
          >
            <div className="flex flex-col space-y-6 lg:space-y-8 lg:pt-16">
              {/* Stats section with different refs for desktop vs mobile */}
              <div ref={statsGroupRef} className="hidden lg:flex gap-6 lg:gap-8">
                <div>
                  <p className="font-accent text-2xl lg:text-3xl font-thin">
                    {metrics.metric1_value}
                  </p>
                  <p className="text-sm opacity-85">{metrics.metric1_name}</p>
                </div>
                {metrics.metric2_value && (
                  <div>
                    <p className="font-accent text-2xl lg:text-3xl font-thin">
                      {metrics.metric2_value}
                    </p>
                    <p className="text-sm opacity-85">{metrics.metric2_name}</p>
                  </div>
                )}
              </div>
              
              {/* Mobile stats section */}
              <div ref={mobileStatsRef} className="flex lg:hidden gap-6">
                <div>
                  <p className="font-accent text-2xl font-thin">
                    {metrics.metric1_value}
                  </p>
                  <p className="text-sm opacity-85">{metrics.metric1_name}</p>
                </div>
                {metrics.metric2_value && (
                  <div>
                    <p className="font-accent text-2xl font-thin">
                      {metrics.metric2_value}
                    </p>
                    <p className="text-sm opacity-85">{metrics.metric2_name}</p>
                  </div>
                )}
              </div>

              {/* Desktop tall image */}
              <div ref={tallImageGroupRef} className="hidden lg:block w-full lg:w-5/6 overflow-hidden rounded shadow-lg">
                <img
                  src={thumbnailTall}
                  alt={`${title} tall view`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>

              {/* Mobile tall image - left aligned at 85% width */}
              <div 
                ref={mobileTallImageRef} 
                className="block lg:hidden w-[85%] mr-auto overflow-hidden rounded shadow-lg"
              >
                <img
                  src={thumbnailTall}
                  alt={`${title} tall view`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>

              {/* Desktop square image */}
              <div ref={squareImageGroupRef} className="hidden lg:block w-full lg:w-4/6 ml-auto overflow-hidden rounded shadow-lg">
                <img
                  src={thumbnailSquare}
                  alt={`${title} square view`}
                  className="w-full h-auto object-cover aspect-square block"
                  loading="lazy"
                />
              </div>

              {/* Mobile square image - right aligned at 65% width */}
              <div 
                ref={mobileSquareImageRef} 
                className="block lg:hidden w-[65%] ml-auto overflow-hidden rounded shadow-lg"
              >
                <img
                  src={thumbnailSquare}
                  alt={`${title} square view`}
                  className="w-full h-auto object-cover aspect-square block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DynamicProjectCard;