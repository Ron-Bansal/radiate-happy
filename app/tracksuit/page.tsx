"use client";

import React, { useEffect, useRef, useState } from "react";
import { Quicksand } from "next/font/google";
import { gsap } from "gsap";
import { Mail, FileText, Linkedin, Github } from "lucide-react";
import posthog from "posthog-js";

// Page-only font
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Subtle reveal (never hides elements pre-hydration)
function useRevealAnimation(selector = ".reveal", opts = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll(selector));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(e.target, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              ...opts,
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      gsap.set(el, { y: 24 });
      io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, [selector]);
}

export default function TracksuitPage() {
  const track = (event, props) => () => posthog.capture(event, props);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const heroRef = useRef(null);

  // Keep hero visible by default — animate only motion
  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.from(heroRef.current.querySelectorAll(".hero-seq"), {
      y: 12,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06,
      clearProps: "transform",
    });
    return () => {
      tl.kill();
    };
  }, []);

  useRevealAnimation(".reveal");

  return (
    <main
      className={`${quicksand.className} bg-[#FBF7F0] text-[#3D3D3D] relative min-h-screen overflow-x-hidden px-2`}
    >
      {/* Top Fixed Logo */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
        <a
          href="https://gotracksuit.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={track("clicked_badge", {
            badge: "tracksuit_logo",
            href: "https://gotracksuit.com",
          })}
        >
          <img
            className="h-7 rounded"
            src="/assets/tracksuit/tracksuit-logo.jpeg"
            alt="Tracksuit logo"
          />
        </a>

        <a
          href="https://en.wikipedia.org/wiki/Marathon"
          target="_blank"
          rel="noopener noreferrer"
          onClick={track("clicked_badge", {
            badge: "handshake_emoji",
            href: "https://en.wikipedia.org/wiki/Marathon",
          })}
        >
          <span className="text-lg font-semibold">🤝</span>
        </a>

        <a
          href="https://raunaqbansal.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={track("clicked_badge", {
            badge: "wave_emoji",
            href: "https://raunaqbansal.com",
          })}
        >
          <img
            className="h-9 rounded"
            src="/assets/tracksuit/wave-emoji.png"
            alt="Ron wave"
          />
        </a>
      </div>

      {/* Floating CTA */}
      <a
        href="mailto:raunaqbansal@outlook.com"
        className="fixed right-6 top-6 z-50 inline-flex items-center gap-1 rounded-full bg-[#8980C8] px-5 py-2.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        Say hello! <span>😊</span>
      </a>

      {/* HERO */}
      <section
        ref={heroRef}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 pb-24 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="flex flex-col self-start md:mt-24 gap-4">
          <h1 className="hero-seq text-5xl text-[#473A63] leading-tight tracking-tight pb-12">
            I’d love to join the Tracksuit team
          </h1>
          <p className="hero-seq max-w-xl text-pretty text-base text-[#3D3D3D]">
            Hi! I&apos;m Ron – and I&apos;m deeply inspired by Tracksuit’s mission,
            culture, and approach to product.
          </p>
          <p className="hero-seq max-w-xl text-pretty text-base text-[#3D3D3D]">
            I&apos;ve built this site as an expression of interest to share what
            excites me, how I think, and where I hope to contribute.
          </p>
        </div>
        <div className="hero-seq flex justify-center">
          <img
            src="assets/tracksuit/warmup.png"
            alt="Ron with Lucy (placeholder)"
            className="w-[90%] max-w-md rounded xshadow-2xl"
          />
        </div>
      </section>

      {/* WHY TRACKSUIT */}
      <section className="reveal mx-auto max-w-7xl rounded-3xl bg-[#8E81CC] text-[#FBF7F0] p-10 shadow-lg md:grid md:grid-cols-[360px_1fr] md:gap-10">
        <div>
          <img
            src="assets/tracksuit/screenshot.png"
            alt="Event placeholder"
            className="w-full -mt-24 max-w-[350px] rounded-2xl border-4 border-[#FBF7F0]"
          />
        </div>
        <div className="mt-8 md:mt-0">
          <h2 className="mb-8 text-3xl">Why Tracksuit?</h2>
          <div className="space-y-4 leading-normal text-pretty xmax-w-prose">
            <p>
              <strong className="">A lasting first impression.</strong> I first
              came across Tracksuit at an Icehouse Ventures panel event in 2024.
              The talks were packed with valuable insights but what stood out to
              me was how the first row was full of Tracksuiters attending at an
              after-hours event to cheer on Laura like game day.
            </p>
            <p>
              Since then, every Tracksuiter I’ve met or followed has been the
              same - sharp, generous with their thinking, and genuinely kind.
              That combination is rare, and it’s stuck with me.
            </p>
          </div>
          <ul className="mt-12 space-y-1">
            {[
              {
                icon: "/assets/tracksuit/fire.png",
                title: "Ambitious team",
                desc: "The energy of the team is contagious. It’s so clear when speaking to someone from Tracksuit that they’re extremely passionate about their work and drive towards excellence - exactly the kind of environment I’d love to be a part of!",
              },
              {
                icon: "/assets/tracksuit/heart.png",
                title: "Unmatched culture",
                desc: "From collecting awards in tracksuits to breaking LinkedIn with celebration posts, you can feel the pride, care, and fun in how people show up for each other.",
              },
              {
                icon: "/assets/tracksuit/rocketship.png",
                title: "Human-Centered Product",
                desc: "As someone obsessed with crafting delightful user experiences, I love how Tracksuit’s playful, intuitive design stands out from other analytics platforms.",
              },
            ].map(({ icon, title, desc }) => (
              <li
                key={title}
                className="flex items-start gap-2.5 rounded-2xl p-4"
              >
                {/* <span className="text-2xl">{icon}</span> */}
                <img className="h-12" src={icon} alt="icon"/>
                <div>
                  <h3 className="text-lg font-semibold pb-0.5">{title}</h3>
                  <p className="xtext-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT I’VE BEEN WORKING ON */}
      <div className="bg-[#E5DCF8] my-20">
        <section className="mx-auto max-w-7xl space-y-16 px-6 py-20">
          <h2 className="text-center text-4xl">What I’ve Been Working On</h2>
          <div className="space-y-4 text-pretty">
            {/* <p className="mx-auto max-w-2xl text-center leading-relaxed text-[#63636b]">
              I genuinely enjoy designing and building things.
            </p> */}
            <p className="mx-auto max-w-2xl text-center leading-relaxed text-[#63636b]">
              <strong className="font-semibold">
                I genuinely enjoy designing and building things.
              </strong>{" "}
              So I’m constantly working on projects to improve my understanding,
              solve problems, or scratch a creative itch.
            </p>
            <p className="mx-auto max-w-2xl text-center leading-relaxed text-[#63636b]">
              Here are a few projects I’ve particularly loved creating:
            </p>
          </div>

          {/* Moonstone */}
          <article className="reveal grid items-start gap-8 rounded-2xl bg-[#8E81CC] text-[#FBF7F0] p-12 shadow-md md:grid-cols-[1fr_520px]">
            <div>
              <h3 className="mb-3 text-2xl font">
                <a
                  href="https://moonstone-music.vercel.app/playlist/5BYeEBnlFqlPjjYAxQGJC8"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("clicked_project", {
                      badge: "moonstone",
                      href: "https://moonstone.raunaqbansal.com",
                    })
                  }
                  className="underline decoration-wavy underline-offset-4 decoration-[2px] hover:text-[#3d3d3d] transition-all"
                >
                  Moonstone
                </a>{" "}
                - Revealing the stories behind playlists
              </h3>
              <p className="mb-8 text-base leading-relaxed ">
                Built and launched a full-stack app that analyses Spotify
                playlists. Surfacing insights like artist repetition, release
                decades, and patterns of activity overs time.
              </p>
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <strong>Challenge:</strong> Designing a cohesive analytics
                  experience keeping it fast and visually engaging while
                  wrangling API changes.
                </li>
                <li>
                  <strong>Learning:</strong> Storytelling with data is as much
                  design as it is code. Making insights digestible relies on
                  design.
                </li>
                <li>
                  <strong>Impact:</strong> Sparked genuine engagement across
                  playlist curators - analysed 300k+ songs. Gave me a hands-on
                  crash course in product thinking and development (and how
                  scary launching something is).
                </li>
              </ul>
            </div>
            <img
              src="/assets/moonstone-golden2.png"
              alt="Moonstone UI"
              className="w-full rounded-xl shadow-lg"
            />
          </article>

          {/* Rapid prototyping */}
          <article className="reveal grid rounded-2xl bg-[#54AF64] text-[#FBF7F0] p-12 shadow-md md:grid-cols-[1fr_440px]">
            <div className="max-w-prose">
              <h3 className="mb-3 text-2xl font">
                Rapid-prototyping at work - Building with AI to solve problems
              </h3>
              <p className="mb-6 text-base leading-relaxed">
                At work, I’ve developed a habit of spotting friction points and
                rapidly building fixes. This mindset has helped unblock teams,
                create leverage for customers, and turn ideas into working tools
                in days, not weeks.
              </p>
              {/* <p className="mb-3 font-semibold">Some examples:</p> */}
              <ul className="list-disc space-y-6 pl-5">
                <li>
                  <strong>Custom Device integration.</strong> For one of our
                  largest customers, I independently built a bespoke desktop app
                  that connects their dimensioner machine into our shipping
                  platform before peak sales.
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Why it mattered:</strong> Their team was manually
                      entering package dimensions for thousands of orders,
                      incurring hefty penalties for incorrect entries.
                    </li>
                    <li>
                      <strong>Impact:</strong> Automated a key process, saved
                      hours daily, and strengthened partnership with a
                      high-value customer.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>3D Order Builder.</strong> An interactive 3D tool to
                  visualise how packaging dimensions affect shipping cost and
                  checkout rates.
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Learning:</strong> Visual tools can drive faster
                      understanding across teams and customers than
                      documentation alone.
                    </li>
                    <li>
                      <strong>Impact:</strong> Helped sales and product teams
                      communicate value propositions more clearly to prospects.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Unified KPI Dashboard.</strong> Built an internal
                  dashboard aggregating data from Linear, Canny, and Zendesk.
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Why it mattered:</strong> Teams were lacking
                      visibility of key metrics and had to constantly switch
                      between systems to gauge progress.
                    </li>
                    <li>
                      <strong>Impact:</strong> Created a single source of truth
                      for tracking goals and aligning priorities.
                    </li>
                  </ul>
                </li>
              </ul>
              <p className="mt-6 text">
                Across all of these, AI acts as my co-pilot, helping me explore
                unfamiliar technologies and rapidly prototype new ideas.
              </p>
            </div>
            {/* <img
              src="/assets/tracksuit/cropped-rapid-proto.png"
              alt="Rapid prototyping visual"
              className="w-full rounded-xl shadow-lg"
            /> */}
            <div className="vid">
              {mounted ? (
                <video
                  src="/assets/garden/order-builder.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full rounded-xl shadow-lg"
                ></video>
              ) : null}
            </div>
          </article>

          {/* C3 */}
          <article className="reveal grid items-start gap-8 rounded-2xl bg-[#F8F6EE] p-12 shadow-md md:grid-cols-[1fr_440px]">
            <div>
              <h3 className="mb-3 text-2xl font">
                Curious & Creative Club - Education Rooted in Play
              </h3>
              <p className="mb-4 text-base leading-relaxed">
                I run weekly classes where young students learn science and
                coding. But instead of following a rigid curriculum or
                memorising theories, we focus on the skills that will always
                matter: curiosity, creativity, and confidence.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Approach:</strong> We build games, run weird
                  experiments, and lean into whatever each student finds fun.
                  It’s part project-based learning, part Montessori, and
                  entirely about nurturing the habit of creative
                  problem-solving.
                </li>
                <li>
                  <strong>Impact:</strong> Students learn to ask better
                  questions, flex their creativity muscles, and see learning as
                  something enjoyable.
                </li>
              </ul>
            </div>
            <img
              src="/assets/garden/c3-blue.png"
              alt="Curious & Creative Club illustration"
              className="w-full rounded-xl shadow-lg"
            />
          </article>

          {/* Learning (single tall image on right) */}
          <article className="reveal grid items-start gap-8 rounded-2xl bg-[#E1477F] text-[#FBF7F0] p-12 pb-0 md:py-0 shadow-md md:grid-cols-[1fr_500px]">
            <div className="py-4">
              <h3 className="mb-3 text-2xl font">
                Continuously learning + building
              </h3>
              <p className="leading-relaxed mb-4">
                I’m love exploring new things to learn, connect dots, and am
                always building something.
              </p>

              <p className="leading-relaxed mb-4">
                <strong>Learning loops:</strong> Lenny&apos;s podcast, PM frameworks,
                cohort-based learning, webinars, and books on systems thinking
                and creativity.
              </p>

              <div className="mb-4">
                <strong>More mini-projects:</strong>
                <ul className="list-disc space-y-2 pl-5 mt-2">
                  <li>
                    <a
                      href="https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={track("clicked_project", {
                        badge: "napkin-notes",
                        href: "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
                      })}
                      className="underline decoration-wavy underline-offset-4 decoration-[2px] hover:text-[#3d3d3d] transition-all"
                    >
                      Napkin Notes
                    </a>{" "}
                    (230 users) - a side panel Chrome extension solving a real
                    team pain point of capturing notes without friction.
                  </li>
                  <li>
                    <a
                      href="https://www.figma.com/community/plugin/1488498485297162626/asterisk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={track("clicked_project", {
                        badge: "asterisk",
                        href: "https://www.figma.com/community/plugin/1488498485297162626/asterisk",
                      })}
                      className="underline decoration-wavy underline-offset-4 decoration-[2px] hover:text-[#3d3d3d] transition-all"
                    >
                      Asterisk
                    </a>{" "}
                    (30 users) - a Figma plugin for anotating and organising
                    design inspiration.
                  </li>
                  <li>
                    Draftline - a personal tool built with the intention of
                    improving my writing skills by reviewing each round of
                    iterations
                  </li>
                  <li>
                    Others include Trademe filter lock, NFC automations, movie
                    showcase reel.
                  </li>
                </ul>
              </div>

              {/* <p className="leading-relaxed">
                <strong>Impact:</strong> Each experiment compounds my
                understanding of product intuition — how ideas evolve through
                iteration, and how small improvements create meaningful user
                value.
              </p> */}
            </div>
            <img
              src="/assets/tracksuit/cropped-learning-grid.png"
              alt="Learning visual"
              className="h-full w-full object-cover"
            />
          </article>
        </section>
      </div>

      {/* WHERE I HOPE TO FIT */}
      <section
        id="where-i-hope-to-fit"
        className="mx-auto max-w-7xl px-6 pb-28 pt-0"
        aria-labelledby="where-i-hope-to-fit-heading"
      >
        <h2
          id="where-i-hope-to-fit-heading"
          className="text-center text-4xl tracking-tight text-[#473B64]"
        >
          Where I Hope to Fit
        </h2>

        <div className="mt-10 grid items-start gap-10 md:mt-12 md:grid-cols-[1.1fr_.9fr]">
          <div className="flex">
            <img
              src="/assets/garden/studio.png"
              alt="Ron in studio"
              className="mx-auto w-[80%] rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>

          <div className="leading-relaxed max-w-prose text-[#3d3d3d]">
            <p className="mb-4">
              I love digging into how products feel, function, and grow. Whether
              it&apos;s uncovering friction points, designing small experiments, or
              reframing insights into opportunities. I naturally gravitate
              toward connecting data and design with human behaviour.
            </p>

            <p className="mb-4">
              I&apos;m{" "}
              <strong className="font-semibold text-[#473B64]">
                particularly drawn to Product
              </strong>{" "}
              as it builds on everything I’ve learned so far - computer science,
              finance, data, design, consulting, and customer success.
            </p>

            <p className="mb-3">
              Though as the roles in the tech industry rapidly evolve, this is
              the work I find most fulfilling:
            </p>

            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Identifying problems and new opportunities</li>
              <li>Collaboratively brainstorming solutions with empathy</li>
              <li>Navigating trade-offs to maximise real business value</li>
              <li>
                Leveraging AI tools to bring ideas and concepts to life quickly
              </li>
            </ul>

            <p className="mb-4">
              If you’re after someone who is{" "}
              <strong className="font-semibold text-[#473B64]">
                always eager to learn and loves to build
              </strong>
              , I’d love to be part of the team!
            </p>

            <p className="mb-8 text-sm text-[#63636b]">
              And if there isn’t a fit right now, I’d genuinely appreciate any
              feedback on how I could become a stronger candidate for sometime
              down the *track*
            </p>

            <a
              href="mailto:raunaqbansal@outlook.com"
              //   className="inline-block rounded-full bg-[#8880C8] px-8 py-3 font-semibold text-white shadow-md transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8880C8]/40"
              className="inline-block rounded-full bg-[#C9C0F0] px-8 py-3 text-[#403861] border-[0.7px] border-[#403861] text-xl font-normal tracking-wide transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C9C0F0]/50"
            >
              Let’s Chat!
            </a>
          </div>
        </div>

        {/* Curiosity questions */}
        <div className="mt-24 text-left max-w-prose text-[#3d3d3d]">
          <p className="text-sm font-medium tracking-wide text-[#8880C8]">
            Two questions I’m curious about:
          </p>

          <div className="mx-auto mt-6 max-w-3xl space-y-5 text-left">
            <div className="border-l-2 border-[#8880C8]/30 pl-4">
              <p className="text-base leading-relaxed">
                What helps first-time customers understand what “healthy” looks
                like when it comes to their brand metrics?
              </p>
            </div>

            <div className="border-l-2 border-[#8880C8]/30 pl-4">
              <p className="text-base leading-relaxed">
                Do most teams review their metrics at quarterly or annual
                check-ins, or are insights integrated more naturally into their
                daily tools?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (new layout, same bg hue) */}
      <footer className="border-t border-white/10 bg-[#403860] text-[#efeef9]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <a
                href="https://gotracksuit.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("clicked_badge", {
                  badge: "tracksuit_logo",
                  href: "https://gotracksuit.com",
                })}
              >
                <img
                  className="h-7 rounded"
                  src="/assets/tracksuit/tracksuit-logo.jpeg"
                  alt="Tracksuit logo"
                />
              </a>

              <a
                href="https://en.wikipedia.org/wiki/Marathon"
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("clicked_badge", {
                  badge: "handshake_emoji",
                  href: "https://en.wikipedia.org/wiki/Marathon",
                })}
              >
                <span className="text-lg font-semibold">🤝</span>
              </a>

              <a
                href="https://raunaqbansal.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("clicked_badge", {
                  badge: "wave_emoji",
                  href: "https://raunaqbansal.com",
                })}
              >
                <img
                  className="h-9 rounded"
                  src="/assets/tracksuit/wave-emoji.png"
                  alt="Ron wave"
                />
              </a>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#d6d3f7]">
              The grass is greener where you water it 🌱
            </p>
          </div>

          {/* Middle Nav */}
          {/* <div className="flex flex-col items-start gap-3 md:items-center">
            <h4 className="text-sm uppercase tracking-widest text-[#cfcbee]">
              Explore
            </h4>
            <nav className="flex flex-col gap-2 text-[#d6d3f7]">
              <a href="#" className="transition hover:text-white">
                About
              </a>
              <a href="#" className="transition hover:text-white">
                Work
              </a>
              <a
                href="mailto:ronbansal.work@gmail.com"
                className="transition hover:text-white"
              >
                Contact
              </a>
            </nav>
          </div> */}

          {/* Right */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            {/* <h4 className="text-sm uppercase tracking-widest text-[#cfcbee]">
              Connect
            </h4> */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/ron-bansal/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("clicked_badge", {
                  badge: "linkedin",
                  href: "https://www.linkedin.com/in/ron-bansal/",
                })}
                className="flex items-center gap-2 rounded-full bg-[#8880c8] px-4 py-2  text-sm text-white transition hover:bg-[#a8a0d0]"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href="https://github.com/Ron-Bansal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("clicked_badge", {
                  badge: "github",
                  href: "https://github.com/Ron-Bansal",
                })}
                className="flex items-center gap-2 rounded-full bg-[#8880c8] px-4 py-2  text-sm text-white transition hover:bg-[#a8a0d0]"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="mailto:raunaqbansal@outlook.com"
                className="flex items-center gap-2 rounded-full bg-[#8880c8] px-4 py-2 text-sm text-white transition hover:bg-[#a8a0d0]"
              >
                <Mail size={18} />
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-[#cfcbee]">
          {/* © {new Date().getFullYear()} Ron Bansal. Made in New Zealand. */}
          Designed and built with admiration by{" "}
          <a
            href="https://raunaqbansal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline leading-loose decoration-wavy underline-offset-4 decoration-[1px] hover:text-[#a8a0d0] transition-all"
            onClick={track("clicked_badge", {
              badge: "footer_name",
              href: "https://raunaqbansal.com",
            })}
          >
            Raunaq
          </a>{" "}
          (Ron) Bansal, from Auckland, New Zealand.
        </div>
      </footer>
    </main>
  );
}
