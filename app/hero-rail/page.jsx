// app/page.jsx (or any component)
import RandomDragRail from "../components/RandomDragTrail";
import ScrollFlattenImage from "../components/CigaretteBurnTransition";
import CigaretteBurnTransition from "../components/CigaretteBurnTransition";
import StretchBurnTransition from "../components/StretchBurnTransition";

const gallery = [
//   { src: "/assets/moonstone-square.png", alt: "Moonstone" },
//   { src: "/assets/3asterisk-square.png", alt: "Asterisk" },
//   { src: "/assets/napkin-notes-square.webp", alt: "Napkin" },
//   { src: "/assets/garden/gradientbg2.webp", alt: "green" },
//   { src: "/assets/logo-grey-rise.png", alt: "logo " },


{ src: "/assets/garden/asterisk.png", alt: "asterisk" },
{ src: "/assets/garden/studio.png", alt: "studio" },
{ src: "/assets/garden/3dreel.mp4", alt: "reel" },
{ src: "/assets/garden/butterfly.png", alt: "art" },
{ src: "/assets/garden/moonstone-heatmap.png", alt: "moonstone" },
{ src: "/assets/garden/napkin.png", alt: "napkin" },
  { src: "/assets/garden/c3-blue.png", alt: "c3 academy" },
  { src: "/assets/garden/ember.png", alt: "ember" },
  { src: "/assets/garden/dashboard.png", alt: "dashboard" },
  { src: "/assets/garden/tictactoe.png", alt: "tactictoe" },
//   { src: "https://picsum.photos/seed/1/800/800", alt: "Card 1" },
//   { src: "https://picsum.photos/seed/2/800/800", alt: "Card 2" },
//   { src: "https://picsum.photos/seed/3/800/800", alt: "Card 3" },
//   { src: "https://picsum.photos/seed/4/800/800", alt: "Card 4" },
//   { src: "https://picsum.photos/seed/5/800/800", alt: "Card 5" },
//   { src: "https://picsum.photos/seed/6/800/800", alt: "Card 6" },
//   { src: "https://picsum.photos/seed/7/800/800", alt: "Card 7" },
//   { src: "https://picsum.photos/seed/8/800/800", alt: "Card 8" },
//   { src: "https://picsum.photos/seed/9/800/800", alt: "Card 9" },
//   { src: "https://picsum.photos/seed/10/800/800", alt: "Card 10" },
];

export default function Page() {
  return (
    <div className="flex flex-col">
      <section className="min-h-screen grid md:grid-cols-[1fr_42%] gap-8 xp-6 items-stretch bg-[url('/assets/garden/plaingradientbg.png')] bg-cover bg-center">
        <div className="self-center p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi Im Raunaq :)
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
          tiltRange={[2, 3]}
          neighborsOppose
          mobileSize={200}
          desktopMax={350}
          tint="#7b8d5a"
          tintOpacity={0.2}
          ringOpacity={0.35}
          shadowOpacity={0.5}
          showGrain
          tiltSeed={20250926}
        />
      </section>
      {/* <div style={{ minHeight: "120vh" }} />  */}
      {/* <ScrollFlattenImage
        src="/assets/garden/diapixel2.png"
        alt="Cigarette-burn scroll"
        peak={3} // 1–5: more = taller stretch
        maxBlur={10} // px at peak
        sectionHeight="300vh"
        stickyTop={0}
        vignette={0.45}
        showPanel={false} // set true to tweak live
      /> */}
      {/* <CigaretteBurnTransition /> */}

      <section className="min-h-screen p-6 bg-[#FFFDEB] border-1 border-black">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Yo what is up here
          </h2>
          <p className="text-white/70 mb-10">
            This is an example of how you might use the StretchBurnTransition
            component in a project showcase or portfolio site.
          </p>
        </div>
      </section>

      {/* <StretchBurnTransition
        // beforeColor="#212220"
        // afterColor="#212B66"
        // beforeColor="#FFFDEB"
        // afterColor="#424D10"
        beforeColor="#FFFFF6"
        afterColor="#002207"
        // imageSrc="/assets/garden/diapixel.svg" // ← your PNG here
        imageSrc="/assets/garden/diapixel3.png" // ← your PNG here
        imageAlt="Cigarette-burn strip"
        objectFit="cover" // or "contain", "fill", etc.
        minVh={6} // bottom/start flatness (vh)
        maxVh={130} // peak stretch (vh)
        minVhTop={10}
        className="border-red-700 border-2"
      /> */}
            <StretchBurnTransition
        beforeColor="#FFFFF6"
        afterColor="#002207"
        imageSrc="/assets/garden/diapixel3.png"
        imageAlt="Cigarette-burn strip"
        objectFit="cover"
        objectPosition="bottom"
        minVh={6}
        maxVh={130}
        minVhTop={10}
        sectionHeightVh={220}  // long scroll room (no layout height)
        marginPx={50}          // <= visible space above/below
        // zIndex={20}         // bump if needed over other layers
        // className="border-red-700 border-2" // remove while debugging; borders can look like gaps
      />
      <section className="min-h-screen p-6 bg-blue-100">
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
    </div>
  );
}
