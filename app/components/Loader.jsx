// components/Loader.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isReadyToExit, setIsReadyToExit] = useState(false);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);

  // Shorter minimum display time
  useEffect(() => {
    const minDisplayTimer = setTimeout(() => {
      setIsReadyToExit(true);
    }, 1500); // Reduced to 2.5 seconds

    return () => clearTimeout(minDisplayTimer);
  }, []);

  // Handle the progress animation with GSAP
  useEffect(() => {
    // Create a smoother progress animation using GSAP
    const progressTween = gsap.to({}, {
      duration: 2, // Shorter duration
      onUpdate: function() {
        // Calculate progress based on timeline position
        const newProgress = Math.min(100, this.progress() * 100);
        setProgress(newProgress);
      },
      ease: "power1.inOut", // Smoother easing
    });

    return () => {
      progressTween.kill();
    };
  }, []);

  // Animation when progress reaches 100% AND minimum time has passed
  useEffect(() => {
    if (progress >= 99 && isReadyToExit) {
      // Create exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) {
            onComplete();
          }
        }
      });

      // Complete the progress bar
      tl.to(progressBarRef.current, {
        width: "100%",
        duration: 0.15,
        ease: "power2.out"
      });
      
      // Brief pause
      tl.to({}, { duration: 0.3 });
      
      // Scale and fade out the logo
      tl.to(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Slide up the entire overlay
      tl.to(overlayRef.current, {
        y: "-100%",
        duration: 0.7,
        ease: "power3.inOut",
      }, "-=0.3");

      // Finally hide the container
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });
    }
  }, [progress, isReadyToExit, onComplete]);

  // Initial animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Simple fade-in for logo
    tl.from(logoRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });
    
    // Fade in the progress bar
    tl.from(progressBarRef.current.parentNode, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4");
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[100000] bg-transparent"
      style={{ pointerEvents: "all" }}
    >
      {/* Simple dark overlay background */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 w-full h-full bg-[#232323] z-10"
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 w-full h-full z-20 opacity-20 pointer-events-none bg-[url('/noise.png')] bg-repeat hidden" />

      {/* Centered content */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div ref={logoRef} className="mb-8">
            <img
              src="/assets/logo-grey-rise.png" 
              alt="Raunaq" 
              className="h-16 opacity-90"
            />
          </div>
          
          {/* Minimal progress bar */}
          <div className="w-48 h-[2px] bg-gray-700 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full transition-all duration-100 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#fcfcfc'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}




// was using the first loader on this page before btw
// // components/Loader.jsx
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// export default function Loader({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [isReadyToExit, setIsReadyToExit] = useState(false);
//   const containerRef = useRef(null);
//   const overlayRef = useRef(null);
//   const logoRef = useRef(null);

//   // Very short display time
//   useEffect(() => {
//     const minDisplayTimer = setTimeout(() => {
//       setIsReadyToExit(true);
//     }, 2000); // Just 2 seconds

//     return () => clearTimeout(minDisplayTimer);
//   }, []);

//   // Handle the progress animation with GSAP
//   useEffect(() => {
//     // Create a smoother progress animation using GSAP
//     const progressTween = gsap.to({}, {
//       duration: 1.6, // Even faster
//       onUpdate: function() {
//         // Calculate progress based on timeline position
//         const newProgress = Math.min(100, this.progress() * 100);
//         setProgress(newProgress);
//       },
//       ease: "power1.out",
//     });

//     return () => {
//       progressTween.kill();
//     };
//   }, []);

//   // Animation when progress reaches 100% AND minimum time has passed
//   useEffect(() => {
//     if (progress >= 99 && isReadyToExit) {
//       // Create exit animation
//       const tl = gsap.timeline({
//         onComplete: () => {
//           if (onComplete) {
//             onComplete();
//           }
//         }
//       });
      
//       // Fade out the logo with a slight scale up
//       tl.to(logoRef.current, {
//         scale: 1.05,
//         opacity: 0,
//         duration: 0.5,
//         ease: "power2.inOut"
//       });

//       // Slide up the entire overlay
//       tl.to(overlayRef.current, {
//         y: "-100%",
//         duration: 0.6,
//         ease: "power2.inOut",
//       }, "-=0.3");

//       // Finally hide the container
//       tl.to(containerRef.current, {
//         opacity: 0,
//         duration: 0.1,
//         onComplete: () => {
//           if (containerRef.current) {
//             containerRef.current.style.display = "none";
//           }
//         }
//       });
//     }
//   }, [progress, isReadyToExit, onComplete]);

//   // Initial animation on mount
//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     // Simple fade in for logo
//     tl.from(logoRef.current, {
//       scale: 0.95,
//       opacity: 0,
//       duration: 0.7,
//       ease: "power2.out"
//     });
//   }, []);

//   return (
//     <div 
//       ref={containerRef}
//       className="fixed top-0 left-0 w-full h-full z-[100000]"
//       style={{ pointerEvents: "all" }}
//     >
//       {/* Simple dark background */}
//       <div 
//         ref={overlayRef}
//         className="absolute inset-0 w-full h-full bg-[#171717] z-10"
//       />

//       {/* Centered content */}
//       <div className="relative z-30 w-full h-full flex items-center justify-center">
//         {/* Logo with subtle pulse animation */}
//         <div 
//           ref={logoRef} 
//           className="transform"
//           style={{
//             animation: progress < 99 ? 'subtle-pulse 2s infinite alternate' : 'none'
//           }}
//         >
//           <style jsx>{`
//             @keyframes subtle-pulse {
//               0% { opacity: 0.9; transform: scale(1); }
//               100% { opacity: 1; transform: scale(1.02); }
//             }
//           `}</style>
//           <img
//             src="/assets/logo-grey-rise.png" 
//             alt="Raunaq" 
//             className="h-20 md:h-24"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }