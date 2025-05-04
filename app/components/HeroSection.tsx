"use client";
import { MapPin, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const definitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    if (definitionRef.current) {
      const tl = gsap.timeline({
        delay: 3.5,
        defaults: { ease: "expo.out", duration: 1.4 },
      });

      tl.fromTo(
        definitionRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-20 h-full w-full bg-[#FAFAFA] text-[#1B352F] overflow-hidden">
      {/* Background grid */}
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Top-right CTA */}
      <div className="absolute top-6 right-6 z-20">
        <a
          href="mailto:raunaqbansal11@gmail.com?subject=Let's%20Get%20In%20Touch&body=Hello%2C%20I'd%20like%20to%20connect."
          className="bg-[#355E3B] text-white px-4 py-2 text-xs rounded transition-all duration-300 ease-in-out xhover:text-black "
        >
          Get in touch
        </a>
      </div>

      {/* Bottom-left plant */}
      <div className="absolute bottom-0 left-0 z-0">
        <img
          src="/assets/plant1.png"
          alt="Plant"
          className="w-full h-full max-h-[60vh] object-contain"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-start justify-start mt-12 gap-24">
        {/* Text block */}
        <div className="max-w-xl text-left">
          <h3 className="font-accent text-lg md:text-2xl mb-1.5 text-[#1B352F] opacity-85">
            Hi! Welcome to my digital garden :)
          </h3>
          <h1 className="font-accent text-6xl md:text-7xl font-thin text-[#355E3B] mb-14">
            I&apos;m Raunaq
          </h1>
          <p className="text-base md:text-lg font-medium text-[#1B352F] opacity-85 mb-1">
            Product Designer & Creative Developer
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Auckland, New Zealand
          </p>
        </div>

        {/* Definition box – lower right */}
        {/* <div className="self-end w-full md:w-[550px] relative bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"> */}
        <div
          ref={definitionRef}
          className="self-end w-full md:w-[550px] relative bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }} // initial state for non-JS fallback
        >
          {/* Gradient Banner */}
          <div className="relative h-7 w-full">
            <Image
              src="/assets/grad-banner.png"
              alt="Gradient Banner"
              fill
              className="object-cover pointer-events-none"
            />
            {/* Traffic Light Buttons */}
            <div className="absolute top-2 left-3 flex gap-2 z-10">
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></span>
              <span className="h-2.5 w-2.5 bg-[#26C940] rounded-full"></span>
            </div>
          </div>

          {/* Definition content */}
          <div className="p-6 pt-4">
            <h4 className="text-lg font-semibold text-green-900">RAUNAQ</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <span>/raʊnək/</span>
              <Volume2 className="h-4 w-4 cursor-pointer" />
            </div>
            <p className="italic text-sm text-gray-500">noun.</p>
            <ol className="list-decimal list-inside mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
              <li>
                In Hindi poetry,{" "}
                <span className="font-accent font-medium text-lg text-[#297252]">
                  ‘Raunaq’
                </span>{" "}
                refers to someone or something that{" "}
                <strong className="text-[#297252]">brings joy</strong>,
                vibrance, and excitement into a space.
              </li>
              <li>
                Refers to the vibe or emotion someone{" "}
                <strong className="text-[#297252]">
                  radiates, like happiness
                </strong>{" "}
                or a lively energy.
              </li>
              <li>
                Someone{" "}
                <span className="bg-green-100 text-green-800 px-1 rounded font-accent">
                  obsessed with crafting beautiful digital experiences
                </span>{" "}
                that solve human problems.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
