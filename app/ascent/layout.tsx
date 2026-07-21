import type { Metadata } from "next";
import localFont from "next/font/local";

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-ascent-sans",
  display: "swap",
});

const cinzel = localFont({
  src: "./fonts/Cinzel-VariableFont_wght.ttf",
  variable: "--font-ascent-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascent — More Pull-ups, No Extra Workout",
  description:
    "Do more pull-ups by spreading manageable sets throughout your day. Track every rep, follow your weekly volume, and build strength without adding another workout.",
};

export default function AscentLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${manrope.variable} ${cinzel.variable}`}>{children}</div>;
}
