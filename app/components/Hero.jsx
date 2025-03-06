import { MapPin, Volume2 } from "lucide-react";

export default function Hero() {
  return (
    // <section className="h-screen py-20 px-6 text-center bg-indigo-100">
    //   <h3 className="text-5xl font-light">Hi, I&apos;m Raunaq</h3>
    //   <h4 className="text-2xl text-gray-400 mt-2">Product Designer & Developer</h4>
    //   <p className="max-w-xl mx-auto mt-4 text-gray-300">
    //     Passionate about crafting experiences that empower individuals and create strong, connected communities.
    //   </p>
    // </section>
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="">
          <h3 className="font-accent text-3xl leading-[119%] tracking-[0.62px] mt-6">
            Hi! Welcome to my digital garden :)
          </h3>
          <h1 className="font-accent text-8xl leading-[101%] tracking-[0.29px] mt-2">
            I'm Raunaq
          </h1>
          <p className="leading-[121%] tracking-[0.06px] mt-8">
            Product Designer and Creative Developer
          </p>
          <p className="text-sm leading-[110%] tracking-[-0.14px] mt-[2px]">
            Auckland, New Zealand
          </p>
        </div>

        <div className="bg-[#F3F5F6] text-gray-950 w-2/4 py-4 px-5 rounded shadow-xl float-right relative">
          <video className="absolute h-52 right-12 top-[-136px]" autoPlay muted>
            <source src="/assets/seline-wave.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <h4 className="text-sky-700 font-medium text-xl leading-snug">
            RAUNAQ
          </h4>
          <div className="flex gap-2 items-center">
            <p>/raʊnək/</p>
            <Volume2 className="h-5 cursor-pointer" />
          </div>
          <p className="text-gray-500 italic text-sm leading-none mb-2">
            noun.
          </p>
          <div className="">
            <ol className="list-decimal list-inside leading-[1.7]">
              <li className="mb-2">
                In Hindi poetry,{" "}
                <span className="font-accent text-xl text-sky-950">
                  ‘Raunaq’
                </span>{" "}
                is often used to describe someone or something that{" "}
                <span className="font-semibold inline-flex gap-2 items-baseline text-sky-900">
                  <img
                    // src="/assets/sky1.png"
                    src="https://images.unsplash.com/photo-1669780080341-4ed61f405142?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="h-5 w-5 object-cover translate-y-1 rounded-full"
                  />
                  brings joy
                </span>
                , vibrance, and excitement into a space.
              </li>
              <li className="mb-2">
                Refers to the vibe or emotion someone{" "}
                <span className="font-semibold inline-flex gap-2 items-baseline text-sky-900">
                  radiates, like happiness{" "}
                  <img
                    src="https://images.unsplash.com/photo-1669780080341-4ed61f405142?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="h-5 w-10 object-cover rounded-full mr-2 translate-y-1"
                  />
                </span>
                or a lively energy.
              </li>
              <li>
                Someone{" "}
                <span className="font-medium bg-sky-200 text-sky-900 px-[2px] mx-1">
                  obsessed with crafting beautiful digital experiences{" "}
                </span>
                that solve human problems.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
