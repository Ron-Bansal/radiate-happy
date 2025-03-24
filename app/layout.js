import localFont from "next/font/local";
// import "./globals.css";
import "../app/styles/globals.css";
// import { Roboto, Syne } from "next/font/google";
// import { Figtree, Instrument_Serif } from "next/font/google";
import { Figtree, Playfair_Display } from "next/font/google";
import LoaderWrapper from "./components/LoaderWrapper";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Figtree({
  subsets: ["latin"],
  variable: "--font-roboto",
  // weight: ["300", "400", "500"],
  weight: "variable",
});

// const syne = Instrument_Serif({
//   subsets: ["latin"],
//   variable: "--font-syne",
//   // weight: "variable"
//   weight: "400"
// });

const syne = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: "variable",
  // weight: "400"
});

export const metadata = {
  // title: "Raunaq • Product Designer and Developer",
  title: "Radiate Happy • Creative Technologist",
  description:
    "Raunaq is a Creative Technologist passionate about empowering people with technology.",
};

export default function RootLayout({ children }) {
  const isTestingLoader = true; // Change to false for production

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${syne.variable}`}>
        <LoaderWrapper forceShow={isTestingLoader} />
        {/* Fluid background animation */}
        {/* <FluidBackground /> */}

        {/* Grain overlay */}
        <div
          id="grain-overlay"
          className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-30 animate-noise"
          style={{
            backgroundImage: `url('/noise.webp')`,
            backgroundSize: "cover",
          }}
        />
        {children}
      </body>
    </html>
  );
}
