"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { carusoProjects } from "./caruso-projects-content";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Auckland live clock
   ───────────────────────────────────────────── */
const AucklandClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-NZ", {
          timeZone: "Pacific/Auckland",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hidden md:flex items-center gap-2">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[12px] font-normal tracking-[0.04em] text-white">
        {time.toUpperCase()} ⋅ Auckland
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Why Caruso card icons
   ───────────────────────────────────────────── */
const ChallengeIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    <circle
      cx="60"
      cy="60"
      r="44"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      opacity="0.2"
    />
    <circle
      cx="60"
      cy="60"
      r="28"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      opacity="0.35"
    />
    <circle cx="60" cy="60" r="12" fill="#7F6DF1" opacity="0.15" />
    <path
      d="M60 16V60L84 84"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const OutcomeIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    <rect
      x="20"
      y="70"
      width="16"
      height="30"
      rx="2"
      fill="#7F6DF1"
      opacity="0.12"
    />
    <rect
      x="44"
      y="50"
      width="16"
      height="50"
      rx="2"
      fill="#7F6DF1"
      opacity="0.2"
    />
    <rect
      x="68"
      y="30"
      width="16"
      height="70"
      rx="2"
      fill="#7F6DF1"
      opacity="0.3"
    />
    <path
      d="M28 65L52 45L76 25L100 15"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="100" cy="15" r="4" fill="#7F6DF1" opacity="0.5" />
  </svg>
);

const RangeIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    <circle
      cx="40"
      cy="45"
      r="18"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      opacity="0.25"
    />
    <circle
      cx="80"
      cy="45"
      r="18"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      opacity="0.25"
    />
    <circle
      cx="60"
      cy="78"
      r="18"
      stroke="#7F6DF1"
      strokeWidth="1.5"
      opacity="0.25"
    />
    <circle cx="60" cy="55" r="6" fill="#7F6DF1" opacity="0.18" />
  </svg>
);

/* ─────────────────────────────────────────────
   Icons for footer links
   ───────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GlobeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   Main page
   ───────────────────────────────────────────── */
const CarusoPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const root = pageRef.current;
    const nav = navRef.current;
    if (!root || !nav) return;

    // ── Lenis smooth scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      smoothWheel: true,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── Nav show/hide on scroll direction ──
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 80) {
        nav.style.transform = "translateY(0)";
      } else if (current > lastScroll + 5) {
        nav.style.transform = "translateY(-100%)";
      } else if (current < lastScroll - 5) {
        nav.style.transform = "translateY(0)";
      }
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── GSAP context (scoped to root) ──
    const ctx = gsap.context(() => {
      // ════════════════════════════════════
      // HERO: staggered fade-up on load
      // ════════════════════════════════════
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
      gsap.set(heroEls, { visibility: "visible", opacity: 0, y: 30 });
      gsap.to(heroEls, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });

      // ════════════════════════════════════
      // SCROLL REVEALS: generic [data-reveal]
      // ════════════════════════════════════
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.set(el, { visibility: "visible", opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            });
          },
        });
      });

      // ════════════════════════════════════
      // PROJECT CARDS: individual scroll reveals
      // ════════════════════════════════════
      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        gsap.set(card, { visibility: "visible", opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
          },
        });
      });

      // ════════════════════════════════════
      // WHY CARUSO CARDS: staggered reveal
      // ════════════════════════════════════
      const whyCards = gsap.utils.toArray<HTMLElement>("[data-why-card]");
      gsap.set(whyCards, { visibility: "visible", opacity: 0, y: 44 });
      const whySection = root.querySelector("[data-why-section]");
      if (whySection) {
        ScrollTrigger.create({
          trigger: whySection,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(whyCards, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.1,
            });
          },
        });
      }

      // ════════════════════════════════════
      // 888 COUNTER
      // ════════════════════════════════════
      const statsEl = root.querySelector("[data-stat-888]");
      if (statsEl) {
        const counter = { val: 0 };
        ScrollTrigger.create({
          trigger: statsEl,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: 888,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                statsEl.textContent = Math.round(counter.val).toString();
              },
            });
          },
        });
      }

      // ════════════════════════════════════
      // Refresh ScrollTrigger after layout settles
      // ════════════════════════════════════
      ScrollTrigger.refresh();
    }, root);

    // ── Cleanup ──
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#132C38] font-['Open_Sans',sans-serif] text-[#515150]"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap');
        body { margin: 0; background: #132C38; }
        ::selection { background: #7F6DF1; color: white; }
      `,
        }}
      />

      {/* Noise */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ═══════════════════════════════════════
          NAV BAR (hides on scroll down, shows on scroll up)
         ═══════════════════════════════════════ */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 bg-[#132C38]/90 backdrop-blur-md border-b border-white/[0.06] transition-transform duration-300 ease-out"
      >
        <div className="mx-auto flex w-[min(1280px,calc(100%-48px))] items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <img
              src="/assets/caruso/caruso.png"
              alt="Caruso"
              className="h-9 opacity-80 rounded"
            />
            <span className="text-[24px] leading-none">🤝</span>
            <img
              src="/assets/tracksuit/wave-emoji.png"
              alt="Ron"
              className="h-8 opacity-80"
            />
            <h5 className="text-white tracking-[0.01em] font-medium text-xl">
              Ron Bansal
            </h5>
          </div>
          <div className="flex items-center gap-5">
            <AucklandClock />
            <a
              href="mailto:raunaqbansal@outlook.com"
              className="rounded bg-[#7F6DF1] px-5 py-3 text-[12px] font-medium tracking-[0.06em] text-white transition-all duration-300 hover:bg-[#9D8DFF] hover:shadow-[0_4px_20px_rgba(127,109,241,0.3)]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════ */}
      <header className="relative min-h-screen bg-[#132C38] overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-[8%] w-px bg-white/[0.04]" />
          <div className="absolute inset-y-0 left-[50%] w-px bg-white/[0.04]" />
          <div className="absolute inset-y-0 right-[8%] w-px bg-white/[0.04]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] w-[min(1280px,calc(100%-48px))] items-center gap-12 py-20 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h1
              className="mb-2 font-['EB_Garamond',serif] text-[clamp(2.8rem,5.8vw,3.5rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[hsl(60_3%_95%)]"
              data-hero-fade
            >
              Caruso has the right idea.
            </h1>
            <div className="mb-12" data-hero-fade>
              <h1 className="inline font-['EB_Garamond',serif] text-[clamp(2.8rem,5.8vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.015em] text-[hsl(60_3%_95%)]">
                PMs should be{" "}
                <span className="relative inline-block">
                  creating
                  <span
                    className="absolute bottom-0.5 left-[-3px] right-[-5px] h-[10px] rounded-[2px] bg-[#806EF1]"
                    style={{ zIndex: -1 }}
                  />
                </span>{" "}
                solutions.
              </h1>
            </div>

            {/* <div className="mb-8 h-px w-16 bg-white/20" data-hero-fade /> */}

            <p
              className="mb-6 max-w-[500px] text-pretty text-[clamp(0.95rem,1.2vw,1.02rem)] font-light leading-[1.65] text-[hsl(60_3%_95%)] text-opacity-90"
              data-hero-fade
            >
              Hi, I'm Ron - I wanted to apply for the PM role at Caruso in a way
              that actually reflects the role.
            </p>
            <p
              className="mb-6 max-w-[500px] text-pretty  text-[clamp(0.95rem,1.2vw,1.02rem)] font-light leading-[1.65] text-[hsl(60_3%_95%)] text-opacity-90"
              data-hero-fade
            >
              I've built this site to share what excites me, how I think, and
              where I hope to contribute.
            </p>

            {/* <div className="flex flex-wrap gap-2" data-hero-fade>
              <span className="border xborder-[hsl(60_3%_95%/.15)] border-[#7F6DF1] rounded-[4px] px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white xtext-[hsl(60_3%_95%/.5)] text-[#7F6DF1]">
                Technical Product Analyst at Starshipit
              </span>
              <span className="border xborder-[hsl(60_3%_95%/.15)] border-[#7F6DF1] rounded-[4px] px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white xtext-[hsl(60_3%_95%/.5)] text-[#7F6DF1]">
                Degree in CompSci, Finance &amp; Business Analytics
              </span>
              <span className="border border-[hsl(60_3%_95%/.15)] rounded-[4px] px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-[hsl(60_3%_95%/.5)]">
                Enjoy Design, building &amp; hard problems
              </span>
            </div> */}
          </div>

          {/* Hero image */}
          <div
            className="relative flex items-center justify-center"
            data-hero-fade
          >
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-xl bg-[#1a3a48] xoverflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#132C38]/60 z-10" />
              <img
                src="/assets/garden/studio.png"
                alt="Ron"
                className="h-full w-full object-cover object-center rounded-xl"
              />
              <div className="absolute top-6 -left-4 z-20 flex flex-col gap-2">
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Product Builder
                </span>
              </div>
              <div className="absolute top-16 -left-8 z-20 flex flex-col gap-2">
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Studied CompSci, Finance &amp; Business Analytics
                </span>
              </div>
              <div className="absolute top-24 -right-4 z-20 flex flex-col gap-2 items-end">
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Passionate about UX
                </span>
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Teach kids science + coding
                </span>
              </div>
              <div className="absolute bottom-4 -left-4 z-20 flex gap-2">
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Huge dog person
                </span>
                <span className="inline-block rounded-full bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium tracking-[0.05em] text-black/75">
                  Built this site to apply
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          data-hero-fade
        >
          {/* <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/25">
            Scroll
          </span> */}
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </header>

      {/* ═══════════════════════════════════════
          SHOW DON'T TELL
         ═══════════════════════════════════════ */}
      <section className="bg-[hsl(60_3%_95%)] py-24 lg:py-32">
        <div className="mx-auto w-[min(1280px,calc(100%-48px))]">
          <div className="text-center mb-14" data-reveal>
            {/* <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7F6DF1]">
              Building with AI
            </p> */}
            <h2 className="font-['EB_Garamond',serif] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#132C38]">
              Show, don't tell.
            </h2>
            <p className="mt-4">
              I'm a PM who naturally gravitates towards exploring new, strategic
              ideas and building solutions.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.75fr] lg:gap-16 items-center min-h-[400px]">
            <div
              className="overflow-hidden rounded-tl-xl rounded-tr-xl shadow hover:shadow-md"
              data-reveal
            >
              <img
                src="/assets/caruso/v0-888.png"
                alt="v0 activity heatmap showing 888 prompts over 12 months"
                className="w-full object-cover shadow-3xl border-1"
              />
            </div>
            <div data-reveal>
              <p className="mb-1 font-['EB_Garamond',serif] text-[clamp(3rem,5vw,4.2rem)] font-normal leading-[1] tracking-[-0.02em] text-[#132C38]">
                <span data-stat-888>0</span>+
              </p>
              <p className="mb-8 text-[15px] font-medium tracking-[0.04em] text-[#152E39]">
                v0 prompts in 12 months
              </p>
              <div className="space-y-4 text-pretty">
                <p className="text-[15px] leading-[1.7] text-[#515150]">
                  Over 25 prototypes, experiments, and solutions shipped. Always
                  tinkering with new technology.
                </p>
                <p className="text-[15px] leading-[1.7] text-[#515150]">
                  New product offerings. Internal tools. Customer-facing
                  features.
                </p>
                {/* <p className="text-[15px] leading-[1.7] text-[#515150]">
                  Some became daily essentials for entire teams. Some shipped to
                  enterprise customers before peak season. Some are just things
                  I built for myself because I couldn't find a tool that worked
                  the way I needed it to.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS
         ═══════════════════════════════════════ */}
      <section className="bg-[#132C38] py-20 lg:py-28">
        <div className="mx-auto w-[min(1280px,calc(100%-48px))]">
          <div className="mb-14 text-center" data-reveal>
            {/* <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#7F6DF1]">
              Selected Work
            </p> */}
            <h2 className="font-['EB_Garamond',serif] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[hsl(60_3%_95%)]">
              Recent work
            </h2>
            <p className="mt-4 text-[#f3f3f2d1]">
              A few projects across domains I'm particularly proud of
            </p>
          </div>

          <div className="grid gap-6">
            {carusoProjects.map((project, index) => {
              const reverse = index % 2 !== 0;
              return (
                <article
                  key={project.id}
                  className="opacity-0 rounded-md bg-[hsl(60_3%_95%)] p-[clamp(22px,3vw,58px)] text-[#132C38]"
                  data-project-card
                >
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7F6DF1]">
                    {project.category}
                  </p>
                  <h3 className="mb-4 font-['EB_Garamond',serif] text-[clamp(1.7rem,3vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.01em]">
                    {project.title}
                  </h3>

                  <div className="mb-12 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#7f6df180] rounded-[3px] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7F6DF1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
                    <div className={reverse ? "lg:order-2" : ""}>
                      <div className="overflow-hidden rounded shadow hover:shadow-md">
                        <img
                          src={project.images[0]}
                          alt={`${project.title} primary`}
                          className="block aspect-[16/10] shadow w-full object-cover object-left-top transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [filter:grayscale(10%)_contrast(1.02)] hover:scale-[1.03] hover:[filter:grayscale(0%)_contrast(1.05)]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div
                      className={`border-l-2 border-[#938ED7] pl-4 ${reverse ? "lg:order-1" : ""}`}
                    >
                      <p className="font-['EB_Garamond',serif] font-normal text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.25]">
                        {project.hook}
                      </p>
                    </div>
                  </div>

                  <div className="mt-[34px] grid items-start gap-6 lg:mt-7 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
                    <div className={reverse ? "lg:order-2" : ""}>
                      <p className="mb-[22px] text-[14.5px] leading-[1.7] text-[#515150]">
                        {project.body[0]}
                      </p>
                      {project.body[1] && (
                        <p className="mb-[18px] text-[14.5px] leading-[1.7] text-[#515150]">
                          {project.body[1]}
                        </p>
                      )}
                    </div>
                    <div className={reverse ? "lg:order-1" : ""}>
                      <div className="overflow-hidden rounded shadow hover:shadow-md">
                        <img
                          src={project.images[1]}
                          alt={`${project.title} secondary`}
                          className="block aspect-[4/3] w-full object-cover object-left-top transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [filter:grayscale(10%)_contrast(1.02)] hover:scale-[1.03] hover:[filter:grayscale(0%)_contrast(1.05)]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div>
                      {project.body.slice(2).map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mb-[18px] text-pretty max-w-[350px] text-[14px] leading-[1.8] text-[#515150]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CARUSO
         ═══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32" data-why-section>
        <div className="mx-auto w-[min(1280px,calc(100%-48px))]">
          <div className="mb-20 text-center" data-reveal>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7F6DF1]">
              Why Caruso
            </p>
            <h2 className="font-['EB_Garamond',serif] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#132C38]">
              Three reasons I'm drawn to this role
            </h2>
          </div>

          <div className="grid gap-4 mx-auto lg:grid-cols-3">
            {[
              {
                icon: <ChallengeIcon />,
                title: "Challenging problem. Ambitious team",
                body: "Two years in, $50B+ in assets, 4x growth. That trajectory means the problems are real and the stakes are high. I've been looking for an environment alongside a highly ambitious, low-ego team. That's where I do my best work.",
              },
              {
                icon: <OutcomeIcon />,
                title: "Outcome over output. AI as leverage",
                body: "Many companies have yet to fully realise the shift in PM roles in the age of AI. The vision Caruso has for this position excites a lot me as it describes how I naturally operate.",
              },
              {
                icon: <RangeIcon />,
                title: "A role that rewards range",
                body: "I studied Computer Science, Finance, and Business Analytics at uni. Care deeply for design. Fluency with code. Enjoy speaking to customers and cross-collaborating. And love learning new things. Many PM roles ask you to pick a lane. This one seems to value someone who doesn't want to.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="opacity-0 group max-w-[400px] relative flex flex-col rounded-xl bg-[#F3F3F2] border border-white hover:border-[#273e481f] py-9 px-8 transition-all duration-500 hover:xshadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-lg"
                data-why-card
              >
                <div className="flex h-[120px] w-[120px] scale-125 group-hover:scale-150 mt-10 items-center justify-center self-center opacity-75 transition-all duration-300 group-hover:opacity-100">
                  {card.icon}
                </div>
                <div className="mt-12">
                  <h3 className="mb-3 font-['EB_Garamond',serif] text-[1.4rem] font-normal leading-[1.25] text-[#132C38]">
                    {card.title}
                  </h3>
                  <p className="text-[14px] mt-4 leading-[1.8] text-[#51514F]">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUESTIONS + FOOTER
         ═══════════════════════════════════════ */}
      <footer className="relative bg-[#132C38] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-[8%] w-px bg-white/[0.04]" />
          <div className="absolute inset-y-0 right-[8%] w-px bg-white/[0.04]" />
        </div>

        <div className="relative z-10 mx-auto w-[min(1280px,calc(100%-48px))] pt-24 pb-14 lg:pt-32 lg:pb-16">
          {/* Questions */}
          <div className="mb-24 text-center" data-reveal>
            {/* <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#7F6DF1]">
              Looking forward
            </p> */}
            <h2 className="mb-12 font-['EB_Garamond',serif] text-[clamp(1.8rem,3.5vw,2.4rem)] font-normal leading-[1.1] text-[hsl(60_3%_95%)]">
              Two things I'm curious about:
            </h2>

            <div className="mx-auto max-w-[920px] grid gap-6 lg:grid-cols-2">
              {/* Question card 1 */}
              <div className="group relative overflow-hidden rounded-lg bg-[#F2F3F2] px-8 py-6 text-left transition-all duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <span className="pointer-events-none absolute -top-8 -right-2.5 font-['EB_Garamond',serif] text-[7rem] font-normal leading-none text-[#7F6DF1]/[0.10] transition-colors duration-500 group-hover:text-[#7F6DF1]/[0.2]">
                  01
                </span>
                <p className="relative font-['EB_Garamond',serif] text-[1.25rem] font-normal leading-[1.5] text-[#132C38]/80">
                  Do fund managers in the US have different needs and behaviours
                  to those from ANZ?
                </p>
              </div>
              {/* Question card 2 */}
              <div className="group relative overflow-hidden rounded-lg bg-[#F2F3F2] p-8 py-6 text-left transition-all duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <span className="pointer-events-none absolute -top-8 -right-2.5 font-['EB_Garamond',serif] text-[7rem] font-normal leading-none text-[#7F6DF1]/[0.10] transition-colors duration-500 group-hover:text-[#7F6DF1]/[0.2]">
                  02
                </span>
                <p className="relative font-['EB_Garamond',serif] text-[1.25rem] font-normal leading-[1.5] text-[#132C38]/80">
                  Is there a space that borders fund administration where Caruso
                  is deliberately choosing <strong>not</strong> to play?
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="border-t border-white/[0.08] pt-7">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <p className="text-[14px] tracking-[0.01em] text-[hsl(60_3%_95%/.85)]">
                Based in Auckland with NZ working rights
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/in/ron-bansal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-[14px] font-medium tracking-[0.03em] text-[hsl(60_3%_95%/.74)] transition-colors duration-300 hover:text-[#7F6DF1]"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <span className="h-3 w-px bg-white/[0.08]" />
                <a
                  href="https://raunaqbansal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-[14px] font-medium tracking-[0.03em] text-[hsl(60_3%_95%/.74)] transition-colors duration-300 hover:text-[#7F6DF1]"
                >
                  <GlobeIcon />
                  Portfolio
                </a>
                <span className="h-3 w-px bg-white/[0.08]" />
                <a
                  href="mailto:raunaqbansal@outlook.com"
                  className="group flex items-center gap-1.5 text-[14px] font-medium tracking-[0.03em] text-[hsl(60_3%_95%/.74)] transition-colors duration-300 hover:text-[#7F6DF1]"
                >
                  <MailIcon />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarusoPage;
