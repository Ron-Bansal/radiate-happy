"use client";
import React from "react";
import ObjectRibbonMarquee from "./ribbon-path";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "500","600", "700", "800"] });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

// NOTE: Replace this with your real logo asset if you have one.
function LogoMark() {
  return (
    <div className="h-12 w-12 overflow-hidden rounded-xl xbg-[#EDE6DA]">
            <img src="/assets/round-things/c3-logo.webp" alt="logo" />
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

          <nav className="flex items-center gap-1 lg:gap-1.5 font-semibold">
            {[
              { label: "About" },
              { label: "Format" },
              { label: "Showcase" },
            ].map((x, idx) => (
              <button
                key={`${x.label}-${idx}`}
                type="button"
                className="rounded-full border border-black/25 bg-transparent px-3 py-1.5 text-[13px] font-medium text-black/70 transition-colors bg-white hover:bg-black/5"
              >
                {x.label}
              </button>
            ))}

            <button
              type="button"
              className="rounded-full bg-black px-4 py-1.5 text-[13px] text-white transition-colors hover:bg-black/90"
            >
              Apply to Enrol
            </button>
          </nav>
        </header>

        {/* Hero body */}
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-2 pt-10 sm:px-8 sm:pt-14">
          <div className="mx-auto max-w-[900px] text-center">
            <h1
              className="text-balance text-4xl font-[500] leading-snug tracking-[-0.04em] text-[#1b1b1b] lg:text-6xl lg:leading-snug"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Where Curious Kids Learn
              <br className="hidden md:block"/>
              <span> </span>
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
                className="group inline-flex items-center gap-2 rounded-full border border-black/35 bg-white px-5 py-2 text-[14px] font-medium text-black/80 transition-colors"
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
                { src: "/assets/round-things/img4.webp", alt: "Shiny CD" },
                { src: "/assets/round-things/img1.webp", alt: "Blueberry" },
                { src: "/assets/round-things/img15.webp", alt: "Jupiter planet" },
                { src: "/assets/round-things/img13.webp", alt: "Chocolate chip cookie" },
            
                { src: "/assets/round-things/img3.webp", alt: "Blue button" },
                { src: "/assets/round-things/img9.webp", alt: "Orange slice" },
                { src: "/assets/round-things/img8.webp", alt: "Pearl" },
                { src: "/assets/round-things/img12.webp", alt: "Camera lens" },
                { src: "/assets/round-things/img17.webp", alt: "Egg yolk" },
                { src: "/assets/round-things/img18.webp", alt: "Green wax seal" },
                { src: "/assets/round-things/img16.webp", alt: "Road with balloon" },
            
                { src: "/assets/round-things/img11.webp", alt: "Tennis ball" },
                { src: "/assets/round-things/img2.webp", alt: "Latte art" },
                { src: "/assets/round-things/img10.webp", alt: "Moon" },
                { src: "/assets/round-things/img20.webp", alt: "Color wheel" },
                { src: "/assets/round-things/img6.webp", alt: "Disco ball" },
            
                { src: "/assets/round-things/img7.webp", alt: "Blue evil eye bead" },
                { src: "/assets/round-things/img19.webp", alt: "Golden sun coin" },
                { src: "/assets/round-things/img14.webp", alt: "Fish bowl" },
                { src: "/assets/round-things/img5.webp", alt: "Pink 8-ball" },
                ]}
          />
        </div>

        {/* Bottom labels */}
        <footer className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-6 sm:px-8 sm:pb-12">
          <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center gap-3">
            <p className="text-[14px] text-black/60">
              We combine concepts <span className="font-semibold text-black/80">across subjects</span>
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
