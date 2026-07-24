import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio • Raunaq Bansal",
  description:
    "Selected products, playful experiments, and creative technology by Raunaq Bansal.",
};

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
