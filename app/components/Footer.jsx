// export default function Footer() {
//     return (
//       <section className="py-10 pt-12 px-6 bg-[#F3F5F6] bg-opacity-50 backdrop-blur-md text-black">
//         <div className="max-w-screen-2xl mx-auto">

import { Mail } from "lucide-react";

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
            {/* <p className="text-sm">i&apos;ll add this later!</p> */}
            {/* <p className="text-sm text-gray-500">carrier pigeon</p> */}
            <a
              href="mailto:raunaqbansal11@gmail.com?subject=Let's%20Get%20In%20Touch&body=Hello%2C%20I'd%20like%20to%20connect."
              className="max-w-52 -ml-5 text-sm text-[#2a2a2a] bg-gray-200 bg-secondary py-1 px-5 rounded-full flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-black hover:bg-white hover:gap-3"
            >
              Get in touch
              <Mail className="h-4 w-4 text-[#2a2a2a]"/>
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4">Socials</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/ron-bansal/"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {/* <a
                href="https://medium.com"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a> */}
              <a
                href="github.com/ron-bansal"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {/* <a
                href="https://medium.com"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a> */}
              <a
                href="https://open.spotify.com/user/not.ron"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
            </div>
          </div>

          <div className="text-right text-xs text-gray-400">
            Raunaq Bansal &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* The RAUNAQ text with gradient */}
      <div className="absolute bottom-0 right-10 w-fit flex items-end overflow-hidden">
        <h1 className="w-full font-accent text-[12vw] leading-none tracking-tighter bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
          RADIATE HAPPY
        </h1>
      </div>
    </footer>
  );
}

export default function Footer() {
  return <MinimalistFooter />;
}
