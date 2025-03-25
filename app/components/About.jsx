export default function About() {
  return (
    <section className="min-h-screen py-20 px-6 bg-[#F3F5F6] text-black">
      <div className="max-w-screen-2xl mx-auto z-20 relative">
        {/* <div className="absolute right-0 top-1/3 transform -translate-y-1/2">
          <img src="/assets/ven.png" alt="Venn Diagram" />
        </div> */}
        <h2 className="font-accent text-4xl md:text-6xl leading-[111%] tracking-[0.62px] mt-6">
          I enjoy creating products <br className="hidden md:block" /> that
          spark{" "}
          <span className="striked line-through  decoration-[3px]">joy</span>{" "}
          <span className="underline decoration-red-500 underline-offset-[4px] decoration-wavy decoration-[3px] mr-2">
            raunaq
          </span>
          ☀️
        </h2>
        <p className="max-w-sm leading-[120%] tracking-[0.17px] mt-12">
          {/* Here’s a few sentences about me and how I can deliver value to others,
          in particular, the intersection of design, technology, business, and
          people.  */}
          I have a deep passion for designing and developing beautiful digital
          experiences that solve meaningful problems and are a delight to use.
          <br />
          <br />
          A strong advocate for using technology as a tool to empower
          individuals and nurture community.
        </p>

        <div className="mt-60">
          {" "}
          <div className="max-w-screen-lg border-b-[0.4px] border-sky-900"></div>
          <h5 className="mt-3 ml-2">
            <span className="inline-block h-2 w-2 bg-black mr-2 mb-[2px]"></span>
            Particularly passionate about these spaces
          </h5>
          <div className="flex flex-col gap-4 md:flex-row md:gap-12 mt-6 px-4">
            <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">education ~</p>
              <p className="leading-[123%] text-sm">
                nuturing curiosity ; design thinking; knowledge retention
              </p>
            </div>

            <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">wellness ~</p>
              <p className="leading-[123%] text-sm">
                healthcare; physical & mental fitness; sustainable growth
              </p>
            </div>

            <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">community ~</p>
              <p className="leading-[123%] text-sm">
                intentional social media; meaningful relationships; culural
                appreciation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
