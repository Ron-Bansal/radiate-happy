"use client";

import React, { useEffect, useRef } from "react";
import { Quicksand } from "next/font/google";
import { gsap } from "gsap";
import { Mail, FileText, Linkedin } from "lucide-react";
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
        href="#contact"
        className="fixed right-6 top-6 z-50 inline-flex items-center gap-1 rounded-full bg-[#8BAA52] px-5 py-2.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
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
            Hi! I’m Ron – deeply inspired by Tracksuit’s mission, culture, and
            approach to product.
          </p>
          <p className="hero-seq max-w-xl text-pretty text-base text-[#3D3D3D]">
            I’ve built this site as an expression of interest to share what
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
      <section className="reveal mx-auto max-w-7xl rounded-3xl bg-[#e0d8f0]/60 bg-[#8E81CC] text-[#FBF7F0] p-10 shadow-lg md:grid md:grid-cols-[360px_1fr] md:gap-10">
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
              Lasting first impression. I first came across Tracksuit at an
              Icehouse Ventures panel event in 2024. The event itself was jam
              packed with valuable insights but what stood out to me was how the
              first row was full of Tracksuiters at an after-hours event
              attending to support and cheer on Laura.
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
                desc: "Sharp, passionate, generous with ideas—and exactly the environment I want to grow in.",
              },
              {
                icon: "/assets/tracksuit/heart.png",
                title: "Unmatched culture",
                desc: "From awards to LinkedIn posts, culture here looks carefully shaped in a meaningful way.",
              },
              {
                icon: "/assets/tracksuit/rocketship.png",
                title: "Human-Centered Product",
                desc: "As someone obsessed with crafting delightful user experiences, I love how Tracksuit’s visual, intuitive, almost playful design stands out.",
              },
            ].map(({ icon, title, desc }) => (
              <li
                key={title}
                className="flex items-start gap-2.5 rounded-2xl p-4"
              >
                {/* <span className="text-2xl">{icon}</span> */}
                <img className="h-12" src={icon} />
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
      <div className="bg-[#E5DCF8] my-16">
        <section className="mx-auto max-w-7xl space-y-14 px-6 py-16">
          <h2 className="text-center text-4xl">What I’ve Been Working On</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-lg leading-relaxed text-[#63636b]">
            My favourite way to learn is to see a problem worth solving—or to
            understand how something works—so I build it. Here are a few things
            I’ve made.
          </p>

          {/* Moonstone */}
          <article className="reveal grid items-center gap-8 rounded-2xl bg-[#8E81CC] text-[#FBF7F0] p-12 shadow-md md:grid-cols-[1fr_520px]">
            <div>
              <h3 className="mb-3 text-2xl font">
                Moonstone - Revealing the stories behind playlists
              </h3>
              <p className="mb-10 text-base leading-relaxed ">
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
            <div>
              <h3 className="mb-3 text-2xl font">
                Rapid-prototyping at work — Building with AI to solve problems
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  A cross-functional internal dashboard collating KPIs across
                  tools.
                </li>
                <li>A nationwide freight quote comparison tool.</li>
                <li>
                  A pricing calculator to help Sales & Onboarding practice new
                  pricing.
                </li>
                <li>Auto-manifest tool for customers to avoid courier fees.</li>
              </ul>
              <p className="mt-3 text-sm ">
                Not perfect, but they solved real problems and gave me space to
                learn by doing.
              </p>
            </div>
            <img
              src="/assets/tracksuit/cropped-rapid-proto.png"
              alt="Rapid prototyping visual"
              className="w-full rounded-xl shadow-lg"
            />
          </article>

          {/* C3 */}
          <article className="reveal grid items-center gap-8 rounded-2xl bg-[#F8F6EE] p-12 shadow-md md:grid-cols-[1fr_440px]">
            <div>
              <h3 className="mb-3 text-2xl font">
                Curious & Creative Club — weekly class for young students
              </h3>
              <p className="mb-4 text-base leading-relaxed ">
                I run a small online class teaching science and coding to kids
                with a Montessori-style approach.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Learning:</strong> Teaching curiosity is harder (and
                  more rewarding) than teaching facts.
                </li>
                <li>
                  <strong>Impact:</strong> Kids ask “what else can I build?”
                  instead of “what’s on the test?”.
                </li>
              </ul>
            </div>
            <img
              src="/assets/garden/c3-blue.png"
              alt="C3 illustration"
              className="w-full rounded-xl shadow-lg"
            />
          </article>

          {/* Learning (single tall image on right) */}
          <article className="reveal grid items-center gap-8 rounded-2xl bg-[#E1477F] text-[#FBF7F0] p-12 pb-0 md:py-0 shadow-md md:grid-cols-[1fr_500px]">
            <div>
              <h3 className="mb-3 text-2xl font">
                Continuously learning + building
              </h3>
              <p className="leading-relaxed">
                Every Tuesday I host a creative coding session for kids. It
                reminds me how powerful curiosity is—and I bring that to product
                work too.
              </p>
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
      <section className="reveal mx-auto max-w-7xl space-y-10 px-6 pb-28">
        <h2 className="text-center text-4xl font pb-4 text-[#473B64]">
          Where I Hope to Fit
        </h2>
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_.9fr]">
          <img
            src="/assets/garden/studio.png"
            alt="Many hats"
            className="w-[80%] mx-auto rounded-xl shadow-lg"
          />
          <div className="space-y-4 text pt-4 leading-relaxed text-[#3d3d3d]">
            <p>
              I’m{" "}
              <strong className="font-semibold text-[#473B64]">
                particularly interested in Product
              </strong>
              , but my background spans computer science, data, design,
              consulting, and customer success.
            </p>
            <p>
              I feel most fulfilled at the intersection,
              <strong className="font-semibold text-[#473B64]">
                {" "}
                creatively solving challenging problems
              </strong>{" "}
              and exploring curiosities around new opportunities.
            </p>
            <p className="pb-8">
              I learn fast, prototype often, and bring energy to the details. If
              that sounds useful, I’d love to be in the mix.
            </p>
            <a
              id="contact"
              href="mailto:raunaqbansal@outlook.com"
              className="inline-block rounded-full bg-[#8880C8] px-7 py-3 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              Let’s Chat!
            </a>
          </div>
        </div>
        <div className="text-center text-[#63636b] mt-24">
          <p className="text-sm">Two questions I’m curious about:</p>
          <ol className="mx-auto text-left mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-base">
            <li>
              Do brands see substantial differences after looking at results—how
              actionable are the metrics?
            </li>
            <li>
              How do first-time customers understand what “healthy” looks like
              for brand metrics?
            </li>
          </ol>
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
              Built with care, curiosity, and a sprinkle of chaos. Let’s make
              cool things together.
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
          <div className="flex flex-col items-start gap-3 md:items-end">
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
                className="flex items-center gap-2 rounded-full bg-[#8880c8] px-4 py-2 text-white transition hover:bg-[#a8a0d0]"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href="mailto:raunaqbansal@outlook.com"
                className="flex items-center gap-2 rounded-full bg-[#8880c8] px-4 py-2 text-white transition hover:bg-[#a8a0d0]"
              >
                <Mail size={18} />
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-[#cfcbee]">
          © {new Date().getFullYear()} Ron Bansal. Made in New Zealand.
        </div>
      </footer>
    </main>
  );
}
