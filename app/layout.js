import localFont from "next/font/local";
// import "./globals.css";
import "../app/styles/globals.css";
// import { Roboto, Syne } from "next/font/google";
// import { Figtree, Instrument_Serif } from "next/font/google";
import { Figtree, Playfair_Display } from "next/font/google";
import LoaderWrapper from "./components/LoaderWrapper";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { PostHogProvider } from "./components/PostHogProvider";

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
  title: "Raunaq (Ron) Bansal • Creative Technologist",
  description:
    "Raunaq is a product designer and creativer developer passionate about helping people do more with technology.",
  icons: {
    icon: "/greensquare-logo-grey-rise.png", // or "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  const isTestingLoader = true; // Change to false for production

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-91EFKKQGNJ"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-91EFKKQGNJ');
            `,
          }}
        />
      </head>
      <body className={`${roboto.variable} ${syne.variable}`}>        
        <PostHogProvider>
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
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}