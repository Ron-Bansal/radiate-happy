import { Github, Linkedin, Mail, Music } from "lucide-react";

export default function FolioProfile() {
  return (
    // <div className="max-w-full p-4 md:pl-8 text-[#3d3d3d] tracking-tight">
    //   <div className="h-32 w-32 mb-5">
    //     <img
    //       src="/assets/ron-profile.jpg"
    //       alt=""
    //       className="rounded-full shadow-lg"
    //     />
    //   </div>
    //   <h1 className="font-accent leading-none mb-1 text-2xl font-[725]">
    //     Ron Bansal
    //   </h1>
    //   <h3 className="text-pretty leading-snug mb-1">
    //     Product Designer and Creative Developer
    //   </h3>
    //   <p className="text-pretty leading-snug mb-5">📍 Auckland, New Zeland</p>
    //   <p className="text-pretty leading-snug">
    //     Tech 🤝🏽 Business 🤝🏽 Design <br />
    //     Always tinkering and working on something driven by curiosity
    //   </p>

    //   <div className="flex gap-4 mt-8 text-gray-700">
    //     <div className="">
    //       <Linkedin />
    //     </div>
    //     <div className="">
    //       <Github />
    //     </div>
    //     <div className="">
    //       <Mail />
    //     </div>
    //   </div>

    //   <div className="mt-3 mb-8 py-2 px-2 bg-slate-500 rounded">Get in touch</div>

    //   <div className="">
    //     <div className="flex items-center text-sm gap-2 mb-2 italic">
    //       <span>
    //         <Music className="h-4 w-4 rotate-12" />
    //       </span>
    //       <p className=""> Here's some music while you browse :)</p>
    //     </div>
    //     <iframe
    //       //   style="border-radius:12px"
    //       src="https://open.spotify.com/embed/playlist/3oshIGQeFw3tg8C8g01J6Z?utm_source=generator"
    //       width="100%"
    //       height="352"
    //       frameBorder="0"
    //       allowfullscreen=""
    //       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    //       loading="lazy"
    //     ></iframe>
    //   </div>
    // </div>
    <div className="text-center md:text-left p-3 md:pl-6 text-[#3d3d3d] tracking-tight">
      <div className="h-32 w-32 mb-4 mt-4 md:mt-0 mx-auto md:mx-0">
        <img
          src="/assets/ron-profile.jpg"
          alt="Ron Bansal"
          className="rounded-full shadow-xl"
        />
      </div>
      <h1 className="font-accent leading-none mb-2 text-3xl font-semibold">
        Ron Bansal
      </h1>
      <h3 className="text-pretty leading-tight mb-1 text-lg">
        Product Designer and Creative Developer
      </h3>
      <p className="text-pretty leading-snug mb-5">📍 Auckland, New Zealand</p>
      <div className="text-pretty leading-[1.3rem]">
        <p className="mb-2">Tech 🤝 Business 🤝 Design 🤝 People</p>
        <p>
          Fueled by curiosity and a relentless drive to build products that
          spark joy
        </p>
      </div>

      <div className="flex gap-6 mt-6 text-slate-600 mx-auto justify-center md:justify-start">
        <a
          href="https://www.linkedin.com/in/ron-bansal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="hover:text-indigo-500 transition-all duration-200" />
        </a>
        <a
          href="https://github.com/ron-bansal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="hover:text-indigo-500 transition-all duration-200" />
        </a>
        <a
          href="mailto:raunaqbansal@outlook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="hover:text-indigo-500 transition-all duration-200" />
        </a>
      </div>

      <a
        href="mailto:raunaqbansal@outlook.com"
        target="_blank"
        rel="noopener
        noreferrer"
        className="inline-block w-full mt-4 mb-8 py-2 px-4 bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-all duration-300"
      >
        Get in touch
      </a>

      <div className="mt-10">
        {/* <iframe
          src="https://open.spotify.com/embed/playlist/3oshIGQeFw3tg8C8g01J6Z?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg shadow-xl"
        ></iframe> */}
        <iframe
          //   style={"border-radius:12px"}
          src="https://open.spotify.com/embed/playlist/3oshIGQeFw3tg8C8g01J6Z?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <div className="flex items-center text-sm gap-2 mt-2 italic text-gray-600">
          <span>
            <Music className="h-4 w-4 rotate-12 text-indigo-500" />
          </span>
          <p className="">Here&apos;s some music while you look around :)</p>
        </div>
      </div>
    </div>
  );
}
