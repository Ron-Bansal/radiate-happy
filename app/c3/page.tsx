"use client";
import React from "react";
import ObjectRibbonMarquee from "./ribbon-path";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700", "800"] });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

// NOTE: Replace this with your real logo asset if you have one.
function LogoMark() {
  return (
    <div className="h-12 w-12 overflow-hidden rounded-xl bg-[#EDE6DA] ring-1 ring-black/10">
      <div className="grid h-full w-full place-items-center text-[22px]">🦋</div>
    </div>
  );
}

export default function Page() {
  return (
    <main className={`${sora.variable} ${plusJakarta.variable} min-h-screen bg-[#0E0E0E] p-3`}>
      {/* Outer frame: max 12px padding */}
      <section className="min-h-[calc(100vh-24px)] w-full overflow-hidden rounded-[28px] bg-[#F6F2E9] ring-1 ring-white/10">
        {/*
          Header is constrained for alignment, but the cream panel fills the viewport.
          This matches the screenshot where the inner area grows on large screens.
        */}
        <header className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
          <div className="flex items-center gap-3">
            <LogoMark />
          </div>

          {/* Center title (true centered) */}
          <div className="pointer-events-none absolute left-1/2 top-11 -translate-x-1/2 sm:top-7">
            <div
              className="text-[14px] font-medium tracking-tight text-black/70"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Curious &amp; Creative Club
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            {[
              { label: "About" },
              { label: "Format" },
              { label: "Format" },
            ].map((x, idx) => (
              <button
                key={`${x.label}-${idx}`}
                type="button"
                className="rounded-full border border-black/25 bg-transparent px-3 py-1.5 text-[13px] font-medium text-black/70 transition-colors hover:bg-black/5"
              >
                {x.label}
              </button>
            ))}

            <button
              type="button"
              className="rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition-colors hover:bg-black/90"
            >
              Apply to Enrol
            </button>
          </nav>
        </header>

        {/* Hero body */}
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-2 pt-10 sm:px-8 sm:pt-14">
          <div className="mx-auto max-w-[900px] text-center">
            <h1
              className="text-balance text-4xl font-[550] leading-[1.2] tracking-[-0.04em] text-[#1b1b1b] lg:text-6xl"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Where Curious Kids Learn
              <br />
              by Building Cool Things
            </h1>

            <p className="mx-auto mt-6 max-w-[560px] text-pretty text-[16px] leading-6 text-black/70 sm:text-[18px] sm:leading-7">
              Interactive online classes for 12+ year olds who love
              <br className="hidden sm:block" />
              asking questions and making things
            </p>

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full border border-black/35 bg-white px-5 py-2 text-[14px] font-medium text-black/80 shadow-[0_2px_0_rgba(0,0,0,0.06)] transition-colors xhover:bg-black/5"
              >
                Apply to enrol
                <span className="grid h-6 w-6 place-items-center rounded-full bg-black/80 text-white transition-transform group-hover:rotate-45 duration-500-">
                  ↗
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Ribbon: NO horizontal padding/margin from the page layout */}
        <div className="relative mt-4">
          <ObjectRibbonMarquee
            items={[
              { src: "./assets/round-things/img1.png", alt: "Round object" },
              { src: "./assets/round-things/img2.png", alt: "Round object" },
              { src: "./assets/round-things/img3.png", alt: "Round object" },
              { src: "./assets/round-things/img4.png", alt: "Round object" },
              { src: "./assets/round-things/img5.png", alt: "Round object" },
              { src: "./assets/round-things/img6.png", alt: "Round object" },
              { src: "./assets/round-things/img7.png", alt: "Round object" },
              { src: "./assets/round-things/img8.png", alt: "Round object" },
              { src: "./assets/round-things/img9.png", alt: "Round object" },
              { src: "./assets/round-things/img10.png", alt: "Round object" },
              { src: "./assets/round-things/img12.png", alt: "Round object" },
              { src: "./assets/round-things/img13.png", alt: "Round object" },
              { src: "./assets/round-things/img14.png", alt: "Round object" },
              { src: "./assets/round-things/img15.png", alt: "Round object" },
              { src: "./assets/round-things/img16.png", alt: "Round object" },
              { src: "./assets/round-things/img17.png", alt: "Round object" },
              { src: "./assets/round-things/img18.png", alt: "Round object" },
              { src: "./assets/round-things/img19.png", alt: "Round object" },
              { src: "./assets/round-things/img20.png", alt: "Round object" },
            ]}
          />
        </div>

        {/* Bottom labels */}
        <footer className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-6 sm:px-8 sm:pb-12">
          <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center gap-3">
            <p className="text-[14px] text-black/60">
              We combine concepts <span className="font-semibold text-black/80">across</span> subjects
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {["Science", "Coding", "Maths", "Design", "Storytelling"].map((t) => (
                <span
                  key={t}
                  className="rounded-[3px] border border-black/30 bg-transparent px-3 py-1 text-[13px] text-black/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
