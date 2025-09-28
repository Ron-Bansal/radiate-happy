// "use client";

// import React, { useEffect, useRef } from "react";

// /**
//  * Cigarette‑burn style stretch/unstretch scroll transition (pure JSX, Tailwind only).
//  *
//  * Fixes:
//  * - Resolved build error (return outside function) by ensuring balanced braces and removing problematic commented block.
//  * - Simplified DOM and added PNG support + top flatness control.
//  */
// export default function StretchBurnTransition({
//   beforeColor = "#212220",
//   afterColor = "#2B1F4B",
//   minVh = 6,           // bottom/start flatness height (vh)
//   maxVh = 130,         // peak stretch height (vh)
//   minVhTop = null,     // top/end flatness (vh). If null, falls back to minVh
//   sectionHeightVh = 240, // total scroll distance for the transition section
//   peakAt = 0.5,        // when the max stretch occurs (0..1)

//   // Image options
//   imageSrc,            // PNG/JPG/WebP path; overrides `visual` if provided
//   imageAlt = "",
//   objectFit = "cover", // cover|contain|fill
//   objectPosition = "bottom", // bottom|center|top|"50% 100%" etc.
//   visual,              // React node (e.g. <Image/>) if you want custom rendering

//   className = "",
//   beforeSlot = null,
//   afterSlot = null,
//   id = "stretch-burn-section",
// }) {
//   const secRef = useRef(null);
//   const wrapRef = useRef(null);
//   const stageRef = useRef(null);

//   // Compute scale & translateY for a given normalized progress p ∈ [0,1]
//   function computeState(p, minVhArg, maxVhArg, viewportH, peak, minVhTopArg) {
//     const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
//     const t = clamp(p, 0, 1);

//     // Remap t so the peak occurs at `peak` (0..1): map [0..peak]→[0..0.5], [peak..1]→[0.5..1]
//     const remap = (tt, pkRaw) => {
//       const pk = clamp(pkRaw, 0.1, 0.9);
//       if (tt <= pk) return 0.5 * (tt / pk);
//       return 0.5 + 0.5 * ((tt - pk) / (1 - pk));
//     };

//     const u = remap(t, peak);

//     const minScaleBottom = minVhArg / maxVhArg;
//     const minScaleTop = (minVhTopArg != null ? minVhTopArg : minVhArg) / maxVhArg;

//     let s;
//     if (u <= 0.5) {
//       // bottom pinned rise to 1
//       s = minScaleBottom + (1 - minScaleBottom) * Math.sin(Math.PI * u);
//     } else {
//       // fall from 1 toward top flatness
//       const u2 = 1 - u; // 0.5..0 -> 0..0.5
//       s = minScaleTop + (1 - minScaleTop) * Math.sin(Math.PI * u2);
//     }

//     const maxHpx = (maxVhArg / 100) * viewportH;
//     const ty = u <= 0.5 ? 0 : -maxHpx * (1 - s); // keep top visually pinned while flattening

//     return { s, ty };
//   }

//   useEffect(() => {
//     const sec = secRef.current;
//     const wrap = wrapRef.current;
//     if (!sec || !wrap) return;

//     let ticking = false;
//     const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

//     const update = () => {
//       if (!sec || !wrap) return;
//       const rect = sec.getBoundingClientRect();
//       const total = sec.offsetHeight - window.innerHeight; // scrollable distance through section
//       const p = clamp(-rect.top / (total || 1));
//       const { s, ty } = computeState(p, minVh, maxVh, window.innerHeight, peakAt, minVhTop);

//       // Drive the image wrapper
//       wrap.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scaleY(${s.toFixed(5)})`;
//       wrap.style.transformOrigin = p <= 0.5 ? "bottom center" : "top center";

//       // Dynamically blend the stage background so there is NO apparent gap:
//       // Phase A (bottom‑pin): the empty area ABOVE the image should look like the BEFORE section.
//       // Phase B (top‑pin): the empty area BELOW the image should look like the AFTER section.
//       // We switch near the midpoint with a tiny crossfade band for smoothness.
//       const cross = 0.06; // 6% band
//       const t = Math.max(0, Math.min(1, (p - (0.5 - cross)) / (2 * cross)));
//       // t≈0 → beforeColor, t≈1 → afterColor
//       const stage = stageRef.current;
//       if (stage) {
//         if (t <= 0) {
//           stage.style.background = beforeColor;
//         } else if (t >= 1) {
//           stage.style.background = afterColor;
//         } else {
//           stage.style.background = `linear-gradient(to bottom, ${beforeColor} ${(1 - t) * 100}%, ${afterColor} ${(1 - t) * 100}%)`;
//         }
//       }
//     };

//     const onScroll = () => {
//       if (ticking) return;
//       ticking = true;
//       requestAnimationFrame(() => {
//         ticking = false;
//         update();
//       });
//     };

//     const onResize = () => update();

//     update();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onResize);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//     };
//   }, [minVh, maxVh, peakAt, minVhTop]);

//   // Default fallback if neither imageSrc nor visual is provided
//   const DefaultSVG = (
//     <svg className="w-full h-full" viewBox="0 0 1271 599" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="1271" height="599" fill={afterColor} />
//     </svg>
//   );

//   const sectionStyle = { height: `${sectionHeightVh}vh` };
//   const beforeStyle = { background: beforeColor };
//   const afterStyle = { background: afterColor };
//   const maxHStyle = { height: `${maxVh}vh` };

//   // Choose renderer: PNG <img> (with object-fit/position) or custom visual or fallback SVG
//   const VisualNode = imageSrc ? (
//     <img
//       src={imageSrc}
//       alt={imageAlt}
//       className="w-full h-full"
//       style={{ objectFit, objectPosition }}
//       draggable={false}
//     />
//   ) : (visual || DefaultSVG);

//   return (
//     <div className={className}>
//       {/* Before section */}
//       {/* <section className="min-h-[120vh] grid place-items-center px-6 py-24" style={beforeStyle}>
//         {beforeSlot || (
//           <div className="max-w-prose text-center text-white/80">
//             <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Section Before</h2>
//             <p>Scroll to see the cigarette‑burn stretch transition.</p>
//           </div>
//         )}
//       </section> */}

//       {/* Transition section */}
//       <section id={id} ref={secRef} className="relative" style={sectionStyle}>
//         <div className="sticky top-0 h-screen overflow-hidden isolate">
//           {/* Stage background to avoid any perceived gap; matches before */}
//           <div className="absolute inset-0" ref={stageRef} />

//           {/* Image wrapper anchored to bottom; scales to maxVh and translates for top pin */}
//           <div className="absolute inset-0">
//             <div
//               ref={wrapRef}
//               className="absolute left-0 right-0 bottom-0 will-change-transform"
//               style={maxHStyle}
//             >
//               <div className="w-full h-full">
//                 {VisualNode}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* After section */}
//       {/* <section className="min-h-[120vh] grid place-items-center px-6 py-24" style={afterStyle}>
//         {afterSlot || (
//           <div className="max-w-prose text-center text-white/80">
//             <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Section After</h2>
//             <p>The background here should match the bottom of your visual for a seamless hand‑off.</p>
//           </div>
//         )}
//       </section> */}
//     </div>
//   );
// }
"use client";

import React, { useEffect, useRef } from "react";

/**
 * Cigarette‑burn style stretch/unstretch scroll transition (pure JSX, Tailwind only).
 *
 * Fixes:
 * - Resolved build error (return outside function) by ensuring balanced braces and removing problematic commented block.
 * - Simplified DOM and added PNG support + top flatness control.
 */
export default function StretchBurnTransition({
  beforeColor = "#212220",
  afterColor = "#2B1F4B",
  minVh = 6,
  maxVh = 130,
  minVhTop = null,
  sectionHeightVh = 240,
  peakAt = 0.5,

  imageSrc,
  imageAlt = "",
  objectFit = "cover",
  objectPosition = "bottom",
  visual,

  className = "",
  id = "stretch-burn-section",
  // NEW: overlay mode so the component doesn't create big layout gaps
  overlay = true,
  marginPx = 50,
}) {
  const secRef = useRef(null);
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  // Compute scale & translateY for a given normalized progress p ∈ [0,1]
  function computeState(p, minVhArg, maxVhArg, viewportH, peak, minVhTopArg) {
    const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const t = clamp(p, 0, 1);

    // Remap t so the peak occurs at `peak` (0..1): map [0..peak]→[0..0.5], [peak..1]→[0.5..1]
    const remap = (tt, pkRaw) => {
      const pk = clamp(pkRaw, 0.1, 0.9);
      if (tt <= pk) return 0.5 * (tt / pk);
      return 0.5 + 0.5 * ((tt - pk) / (1 - pk));
    };

    const u = remap(t, peak);

    const minScaleBottom = minVhArg / maxVhArg;
    const minScaleTop = (minVhTopArg != null ? minVhTopArg : minVhArg) / maxVhArg;

    let s;
    if (u <= 0.5) {
      // bottom pinned rise to 1
      s = minScaleBottom + (1 - minScaleBottom) * Math.sin(Math.PI * u);
    } else {
      // fall from 1 toward top flatness
      const u2 = 1 - u; // 0.5..0 -> 0..0.5
      s = minScaleTop + (1 - minScaleTop) * Math.sin(Math.PI * u2);
    }

    const maxHpx = (maxVhArg / 100) * viewportH;
    const ty = u <= 0.5 ? 0 : -maxHpx * (1 - s); // keep top visually pinned while flattening

    return { s, ty };
  }

  useEffect(() => {
    const sec = secRef.current;
    const wrap = wrapRef.current;
    if (!sec || !wrap) return;

    let ticking = false;
    const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

    const update = () => {
      if (!sec || !wrap) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight; // scrollable distance through section
      const p = clamp(-rect.top / (total || 1));
      const { s, ty } = computeState(p, minVh, maxVh, window.innerHeight, peakAt, minVhTop);

      // Drive the image wrapper
      wrap.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scaleY(${s.toFixed(5)})`;
      wrap.style.transformOrigin = p <= 0.5 ? "bottom center" : "top center";

      // Dynamically blend the stage background so there is NO apparent gap:
      // Phase A (bottom‑pin): the empty area ABOVE the image should look like the BEFORE section.
      // Phase B (top‑pin): the empty area BELOW the image should look like the AFTER section.
      // We switch near the midpoint with a tiny crossfade band for smoothness.
      const cross = 0.06; // 6% band
      const t = Math.max(0, Math.min(1, (p - (0.5 - cross)) / (2 * cross)));
      // t≈0 → beforeColor, t≈1 → afterColor
      const stage = stageRef.current;
      if (stage) {
        if (t <= 0) {
          stage.style.background = beforeColor;
        } else if (t >= 1) {
          stage.style.background = afterColor;
        } else {
          stage.style.background = `linear-gradient(to bottom, ${beforeColor} ${(1 - t) * 100}%, ${afterColor} ${(1 - t) * 100}%)`;
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    const onResize = () => update();

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [minVh, maxVh, peakAt, minVhTop]);

  // Default fallback if neither imageSrc nor visual is provided
  const DefaultSVG = (
    <svg className="w-full h-full" viewBox="0 0 1271 599" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1271" height="599" fill={afterColor} />
    </svg>
  );

  const sectionStyle = { height: `${sectionHeightVh}vh` };
  const beforeStyle = { background: beforeColor };
  const afterStyle = { background: afterColor };
  const maxHStyle = { height: `${maxVh}vh` };

  // Choose renderer: PNG <img> (with object-fit/position) or custom visual or fallback SVG
  const VisualNode = imageSrc ? (
    <img
      src={imageSrc}
      alt={imageAlt}
      className="w-full h-full"
      style={{ objectFit, objectPosition }}
      draggable={false}
    />
  ) : (visual || DefaultSVG);

  return (
    <div className={className}>
      {overlay ? (
        // Overlay mode: wrapper has zero height (only margins). The scroll driver is absolutely positioned
        <div className="relative" style={{ height: 0, marginTop: marginPx, marginBottom: marginPx }}>
          <section
            id={id}
            ref={secRef}
            className="absolute left-0 right-0"
            style={{ top: 0, height: `${sectionHeightVh}vh`, pointerEvents: "none", zIndex: 0 }}
          >
            <div className="sticky top-0 h-screen overflow-hidden isolate">
              <div className="absolute inset-0" ref={stageRef} />
              <div className="absolute inset-0">
                <div
                  ref={wrapRef}
                  className="absolute left-0 right-0 bottom-0 will-change-transform"
                  style={{ height: `${maxVh}vh` }}
                >
                  <div className="w-full h-full select-none">
                    {imageSrc ? (
                      <img src={imageSrc} alt={imageAlt} className="w-full h-full" style={{ objectFit, objectPosition }} draggable={false} />
                    ) : (visual || (
                      <svg className="w-full h-full" viewBox="0 0 1271 599" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1271" height="599" fill={afterColor} />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // Non-overlay mode: keeps previous behavior and occupies layout height
        <section id={id} ref={secRef} className="relative" style={{ height: `${sectionHeightVh}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden isolate">
            <div className="absolute inset-0" ref={stageRef} />
            <div className="absolute inset-0">
              <div ref={wrapRef} className="absolute left-0 right-0 bottom-0 will-change-transform" style={{ height: `${maxVh}vh` }}>
                <div className="w-full h-full select-none">
                  {imageSrc ? (
                    <img src={imageSrc} alt={imageAlt} className="w-full h-full" style={{ objectFit, objectPosition }} draggable={false} />
                  ) : (visual || (
                    <svg className="w-full h-full" viewBox="0 0 1271 599" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="1271" height="599" fill={afterColor} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
