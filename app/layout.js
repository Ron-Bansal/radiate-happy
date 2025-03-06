import localFont from "next/font/local";
// import "./globals.css";
import "../app/styles/globals.css";
// import { Roboto, Syne } from "next/font/google";
import { Figtree, Instrument_Serif } from "next/font/google";

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
  weight: "variable"

});

const syne = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-syne",
  // weight: "variable"
  weight: "400"
});

export const metadata = {
  // title: "Raunaq • Product Designer and Developer",
  title: "Radiate Happy",
  description:
    "Raunaq is a Product Designer and Creative Developer passionate about empowering others with technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  );
}
