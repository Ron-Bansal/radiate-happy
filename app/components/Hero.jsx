export default function Hero() {
  return (
    // <section className="flex flex-col items-center justify-center h-screen text-center px-4">
    //   <h2 className="text-4xl md:text-6xl font-light">
    //     Designing with empathy for the human experience.
    //   </h2>
    //   <h3 className="text-lg md:text-2xl text-gray-400 mt-4">
    //     (I like solving meaningful problems with pretty solutions)
    //   </h3>
    // </section>
    <section
      // className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-black/20 backdrop-blur-sm m-4 rounded-lg"
      className="h-screen flex flex-col items-center justify-center text-center px-4 text-[#3d3d3d] text-white overflow-clip"
      style={{
        boxShadow: `0 4px 6px rgba(206, 110, 110, 0.1), 0 1px 3px rgba(229, 75, 75, 0.08)`,
      }}
    >
      <div className="w-screen h-screen object-cover absolute top-0 left-0 z-10">
        <img
          src="https://images.unsplash.com/photo-1669780080341-4ed61f405142?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-accent font-[725] tracking-tight">
          Hey! I'm Raunaq
        </h1>
        <h3 className="text md:text-2xl font-light tracking-tight mt-6">
          Product Designer and Creative Developer driven by curiosity
        </h3>
        {/* <h3 className="text-lg md:text-2xl text-gray-400 mt-4">
        Code + Design + Business + People
      </h3> */}
        <h3 className="text-lg md:text opacity-75 font-light mt-1">
          I like solving human problems with delightful digital solutions
        </h3>
      </div>
    </section>
  );
}
