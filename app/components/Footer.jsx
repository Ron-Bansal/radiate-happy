export default function Footer() {
    return (
      <section className="py-20 pt-12 px-6 bg-[#F3F5F6] bg-opacity-50 backdrop-blur-md text-black">
        <div className="max-w-screen-2xl mx-auto">
  
          <div className="mt-1">
            {" "}
            <div className="max-w-screen-lg border-b-[0.4px] border-sky-900"></div>
            <h5 className="mt-3 ml-2">
            <span className="inline-block h-2 w-2 bg-black mr-2 mb-[2px]"></span>
            Have a cool project in mind or just want to say hello? Get in touch :)
          </h5>
          <div className="flex gap-12 mt-6 px-4">
            <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">email ~</p>
              <p className="leading-[123%] text-sm">
                i'll add this later!
              </p>
              <p className="leading-[123%] text-sm">
                carrier pigeon
              </p>
            </div>

            <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">socials ~</p>
              <p className="leading-[123%] text-sm">
                linkedin
              </p>
              <p className="leading-[123%] text-sm">
                medium
              </p>
              <p className="leading-[123%] text-sm">
                github
              </p>
            </div>

            {/* <div className="flex-col max-w-[230px]">
              <p className="font-semibold leading-snug">even more socials ~</p>
              <p className="leading-[123%] text-sm">
                intentional social media; meaningful relationships; culural
                appreciation
              </p>
            </div> */}
          </div>
          </div>
        </div>
      </section>
    );
  }
  