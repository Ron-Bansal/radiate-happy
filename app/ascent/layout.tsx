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
  title: "Ascent — Strength Adds Up",
  description:
    "A focused iPhone rep tracker for building strength through small sets, high frequency, and steady progress.",
};

export default function AscentLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${manrope.variable} ${cinzel.variable}`}>{children}</div>;
}
