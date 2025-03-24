// export default function Footer() {
//     return (
//       <section className="py-10 pt-12 px-6 bg-[#F3F5F6] bg-opacity-50 backdrop-blur-md text-black">
//         <div className="max-w-screen-2xl mx-auto">
  
//           <div className="mt-1">
//             {" "}
//             <div className="max-w-screen-lg border-b-[0.4px] border-sky-900"></div>
//             <h5 className="mt-3 ml-2">
//             <span className="inline-block h-2 w-2 bg-black mr-2 mb-[2px]"></span>
//             Have a cool project in mind or just want to say hello? Get in touch :)
//           </h5>
//           <div className="flex gap-12 mt-6 px-4">
//             <div className="flex-col max-w-[230px]">
//               <p className="font-semibold leading-snug">email ~</p>
//               <p className="leading-[123%] text-sm">
//                 i&apos;ll add this later!
//               </p>
//               <p className="leading-[123%] text-sm">
//                 carrier pigeon
//               </p>
//             </div>

//             <div className="flex-col max-w-[230px]">
//               <p className="font-semibold leading-snug">socials ~</p>
//               <p className="leading-[123%] text-sm">
//                 linkedin
//               </p>
//               <p className="leading-[123%] text-sm">
//                 medium
//               </p>
//               <p className="leading-[123%] text-sm">
//                 github
//               </p>
//             </div>

//             {/* <div className="flex-col max-w-[230px]">
//               <p className="font-semibold leading-snug">even more socials ~</p>
//               <p className="leading-[123%] text-sm">
//                 intentional social media; meaningful relationships; culural
//                 appreciation
//               </p>
//             </div> */}
//           </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
  

// export default function Footer() {
//     return (
//       <footer className="relative py-16 px-6 bg-[#F3F5F6] bg-opacity-50 backdrop-blur-md text-black">
//         <div className="max-w-screen-xl mx-auto">
//           {/* Contact Section */}
//           <div className="mb-16">
//             <h3 className="text-2xl font-bold mb-8 flex items-center">
//               <span className="inline-block h-3 w-3 bg-black mr-3"></span>
//               Let's Connect
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               {/* Email Section */}
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg border-b border-gray-300 pb-2">Email</h4>
//                 <p className="text-sm hover:text-gray-600 transition-colors">
//                   i&apos;ll add this later!
//                 </p>
//                 <p className="text-sm italic text-gray-500">
//                   (or carrier pigeon)
//                 </p>
//               </div>
              
//               {/* Socials Section */}
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg border-b border-gray-300 pb-2">Socials</h4>
//                 <div className="flex flex-col space-y-2">
//                   <a href="#" className="text-sm hover:text-gray-600 transition-colors">LinkedIn</a>
//                   <a href="#" className="text-sm hover:text-gray-600 transition-colors">Medium</a>
//                   <a href="#" className="text-sm hover:text-gray-600 transition-colors">GitHub</a>
//                 </div>
//               </div>
              
//               {/* About Section */}
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-lg border-b border-gray-300 pb-2">About</h4>
//                 <p className="text-sm text-gray-700">
//                   Building meaningful digital experiences with a focus on clean design and 
//                   thoughtful functionality.
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Copyright Line */}
//           <div className="text-sm text-center text-gray-500">
//             © {new Date().getFullYear()} • All rights reserved
//           </div>
//         </div>
        
//         {/* Full Width Name */}
//         <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
//           <h1 className="font-accent text-[15vw] leading-none text-black opacity-5 tracking-tighter text-center">
//             RAUNAQ
//           </h1>
//         </div>
//       </footer>
//     );
//   }

// DESIGN 1: Minimalist with Gradient Name
// A clean, minimalist design with a subtle gradient effect on the name
export function MinimalistFooter() {
    return (
      <footer className="relative min-h-[50vh] py-12 px-6 bg-white text-black overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-10">
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-4">Contact</h4>
              <p className="text-sm">i&apos;ll add this later!</p>
              <p className="text-sm text-gray-500">carrier pigeon</p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-4">Socials</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-sm hover:underline">LinkedIn</a>
                <a href="#" className="text-sm hover:underline">Medium</a>
                <a href="#" className="text-sm hover:underline">GitHub</a>
              </div>
            </div>
            
            <div className="text-right text-xs text-gray-400">
              &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
        
        {/* The RAUNAQ text with gradient */}
        <div className="absolute bottom-0 right-10 w-fit flex items-end overflow-hidden">
          <h1 className="w-full font-accent text-[12vw] leading-none tracking-tighter bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
            RADIATE  HAPPY
          </h1>
        </div>
      </footer>
    );
  }
  
  // DESIGN 2: Split Design
  // A modern split design with a dark section and light section
  export function SplitFooter() {
    return (
      <footer className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - dark */}
          <div className="bg-black text-white p-10">
            <h3 className="text-xl font-bold mb-6">Let's Connect</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p>i&apos;ll add this later!</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Alternative</p>
                <p>carrier pigeon</p>
              </div>
            </div>
          </div>
          
          {/* Right side - light */}
          <div className="bg-gray-100 p-10">
            <h3 className="text-xl font-bold mb-6">Follow Along</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-black hover:text-gray-600 transition-colors">LinkedIn</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">Medium</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">GitHub</a>
            </div>
            <div className="mt-8 text-xs text-gray-500">
              &copy; {new Date().getFullYear()} • All rights reserved
            </div>
          </div>
        </div>
        
        {/* The RAUNAQ text */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative h-16">
            <h1 className="absolute w-full text-center font-black text-[12vw] leading-none text-white mix-blend-difference">
              RAUNAQ
            </h1>
          </div>
        </div>
      </footer>
    );
  }
  
  // DESIGN 3: Boxed Modern
  // A modern design with boxed sections and clean typography
  export function BoxedModernFooter() {
    return (
      <footer className="relative py-16 px-6 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Contact</h4>
              <p className="text-gray-600">i&apos;ll add this later!</p>
              <p className="text-gray-400 italic">carrier pigeon</p>
            </div>
            
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Socials</h4>
              <div className="grid grid-cols-3 gap-2">
                <a href="#" className="text-center py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors">LinkedIn</a>
                <a href="#" className="text-center py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors">Medium</a>
                <a href="#" className="text-center py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors">GitHub</a>
              </div>
            </div>
            
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h4 className="font-medium text-lg mb-4 pb-2 border-b">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-4">Subscribe for updates on new projects and articles.</p>
              <div className="flex">
                <input type="email" placeholder="your@email.com" className="flex-grow px-3 py-2 border rounded-l text-sm" />
                <button className="bg-black text-white px-4 py-2 rounded-r text-sm">Join</button>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} • All designs and content by Raunaq
          </div>
        </div>
        
        {/* The RAUNAQ text with outline effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-fit overflow-hidden">
          <h1 className="font-accent text-[20vw] leading-none text-transparent opacity-20" style={{ WebkitTextStroke: '1px #000' }}>
            RAUNAQ
            {/* RADIATE HAPPY */}
          </h1>
        </div>
      </footer>
    );
  }
  
  // DESIGN 4: Elegant Dark Mode
  // A sophisticated dark mode design with accent colors
  export function ElegantDarkFooter() {
    return (
      <footer className="relative py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-6 border-l-4 border-indigo-500 pl-4">Get in Touch</h3>
              <p className="text-gray-400 max-w-md">
                Have a project in mind or just want to chat about design and technology? 
                I'd love to hear from you.
              </p>
              <p className="mt-4 text-indigo-300">i&apos;ll add this later!</p>
              <p className="text-gray-500 italic">(or carrier pigeon)</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-light mb-6 border-l-4 border-indigo-500 pl-4">Follow Me</h3>
              <div className="grid grid-cols-3 gap-4">
                <a href="#" className="group">
                  <span className="block text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                  <span className="block h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="group">
                  <span className="block text-gray-400 group-hover:text-white transition-colors">Medium</span>
                  <span className="block h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="group">
                  <span className="block text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                  <span className="block h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-gray-500 text-sm flex justify-between items-center">
            <div>&copy; {new Date().getFullYear()} • All rights reserved</div>
            <div>Designed and built with ♥</div>
          </div>
        </div>
        
        {/* The RAUNAQ text with glow effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <h1 className="font-black text-[25vw] leading-none text-transparent opacity-5" 
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            RAUNAQ
          </h1>
        </div>
      </footer>
    );
  }
  
  // DESIGN 5: EXTRA CRAZY Design
  // An over-the-top, attention-grabbing footer with animation and bold elements
  export function CrazyFooter() {
    return (
      <footer className="relative py-20 px-6 bg-black text-white overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-purple-600 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-blue-600 animate-pulse" 
               style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-pink-600 animate-pulse"
               style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          {/* Glitch Effect Header */}
          <div className="mb-12 relative">
            <h2 className="text-3xl md:text-5xl font-black mb-4 glitch-text relative">
              LET'S CREATE SOMETHING
              <span className="absolute top-0 left-0 -ml-1 -mt-1 text-pink-500 opacity-70">LET'S CREATE SOMETHING</span>
              <span className="absolute top-0 left-0 ml-1 mt-1 text-cyan-500 opacity-70">LET'S CREATE SOMETHING</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Box */}
            <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105 border border-purple-900">
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                CONTACT ME
              </h3>
              <p className="text-white">i&apos;ll add this later!</p>
              <p className="text-gray-400">carrier pigeon</p>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-all">
                  SEND MESSAGE
                </button>
              </div>
            </div>
            
            {/* Social Box */}
            <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105 border border-blue-900">
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600">
                FOLLOW ME
              </h3>
              
              <div className="space-y-3">
                <a href="#" className="flex items-center p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full mr-3">Li</span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mr-3">Me</span>
                  <span>Medium</span>
                </a>
                <a href="#" className="flex items-center p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full mr-3">Gh</span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
            
            {/* Newsletter Box */}
            <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105 border border-pink-900">
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-600">
                NEWSLETTER
              </h3>
              <p className="text-gray-300 mb-4">Join my coding adventure! Get updates on new projects, articles, and tech insights.</p>
              
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="YOUR@EMAIL.COM" 
                  className="w-full bg-black border border-gray-800 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-r-md text-white font-bold">
                  JOIN
                </button>
              </div>
            </div>
          </div>
          
          {/* Cyberpunk-ish bottom bar */}
          <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 flex items-center mb-4 md:mb-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span>ONLINE • READY FOR NEW PROJECTS</span>
            </div>
            <div className="text-gray-500">
              &copy; {new Date().getFullYear()} • SYSTEM VERSION 3.7.2
            </div>
          </div>
        </div>
        
        {/* The RAUNAQ text with extremely dramatic effect */}
        <div className="absolute -bottom-10 left-0 w-full">
          <h1 className="font-black text-[30vw] leading-none text-transparent" 
              style={{ 
                WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                textShadow: '0 0 15px rgba(255,0,255,0.5), 0 0 30px rgba(0,255,255,0.3)'
              }}>
            RAUNAQ
          </h1>
        </div>
      </footer>
    );
  }
  
  // Example usage:
  export default function Footer() {
    // Uncomment the design you want to use
    return <MinimalistFooter />;
    // return <SplitFooter />;
    // return <BoxedModernFooter />;
    // return <ElegantDarkFooter />;
    // return <CrazyFooter />;
  }