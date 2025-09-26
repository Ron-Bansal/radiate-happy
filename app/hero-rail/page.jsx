// app/page.jsx (or any component)
import RandomDragRail from "../components/RandomDragTrail";

const gallery = [
  { src: "https://picsum.photos/seed/1/800/800", alt: "Card 1" },
  { src: "https://picsum.photos/seed/2/800/800", alt: "Card 2" },
  { src: "https://picsum.photos/seed/3/800/800", alt: "Card 3" },
  { src: "https://picsum.photos/seed/4/800/800", alt: "Card 4" },
  { src: "https://picsum.photos/seed/5/800/800", alt: "Card 5" },
  { src: "https://picsum.photos/seed/6/800/800", alt: "Card 6" },
  { src: "https://picsum.photos/seed/7/800/800", alt: "Card 7" },
  { src: "https://picsum.photos/seed/8/800/800", alt: "Card 8" },
  { src: "https://picsum.photos/seed/9/800/800", alt: "Card 9" },
  { src: "https://picsum.photos/seed/10/800/800", alt: "Card 10" },
];

export default function Page() {
  return (
    <>
      <section className="min-h-screen grid md:grid-cols-[1fr_42%] gap-8 p-6 items-stretch bg-[url('/assets/garden/gradientbg2.webp')] bg-cover bg-center">
        <div className="self-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi I'm Raunaq :)
          </h1>
          <p className="text-white/70 mt-3 max-w-prose">
            Creative technologist based in Auckland
          </p>
        </div>

        {/* Color mode (defaults) */}
        {/* <RandomDragRail
          baseFlow={0.47}
          velDecay={0.968}
          kick={0.3}
          tiltRange={[4, 12]}
          neighborsOppose
          mobileSize={150}
          desktopMax={400}
        /> */}

        {/* Image mode */}
        <RandomDragRail
          items={gallery}
        //   baseFlow={0.47}
          baseFlow={0.69}
          velDecay={0.968}
          kick={0.3}
          tiltRange={[2, 6]}
          neighborsOppose
          mobileSize={250}
          desktopMax={350}
          tint="#7b8d5a"
          tintOpacity={0.32}
          ringOpacity={0.35}
          shadowOpacity={0.5}
          showGrain
          tiltSeed={20250926}
        />
      </section>
      <section className="min-h-screen p-6">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Example usage
          </h2>
          <p className="text-white/70 mb-10">
            This is an example of how you might use the RandomDragRail component
            in a project showcase or portfolio site.
          </p>
        </div>
      </section>
    </>
  );
}
