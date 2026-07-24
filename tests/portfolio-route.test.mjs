import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("portfolio route uses the shared content and accessible GSAP carousel", async () => {
  const [page, content, carousel, experiments, styles] = await Promise.all([
    readSource("app/portfolio/page.tsx"),
    readSource("app/portfolio/PortfolioPage.tsx"),
    readSource("app/portfolio/PortfolioCarousel.tsx"),
    readSource("app/portfolio/ExperimentsGrid.tsx"),
    readSource("app/portfolio/portfolio.module.css"),
  ]);

  assert.match(page, /PortfolioPage/);
  assert.match(content, /from ["']\.\.\/green\/portfolio-content["']/);
  assert.match(content, /projects\.map/);
  assert.match(content, /experimentVisuals/);
  assert.match(experiments, /items\.map/);
  assert.match(carousel, /gsap/);
  assert.match(carousel, /aria-hidden/);
  assert.match(carousel, /tabIndex=\{duplicate \? -1 : undefined\}/);
  assert.match(carousel, /prefers-reduced-motion/);
  assert.doesNotMatch(content, /Drag to explore/);
  assert.doesNotMatch(content, /ongoing curiosities/);
  assert.match(content, /projects\.length/);
  assert.match(content, /experimentVisuals\.length/);
  assert.match(content, /linkedin\.com\/in\/ron-bansal/);
  assert.match(content, /github\.com\/Ron-Bansal/);
  assert.match(content, /x\.com\/raunvq/);
  assert.match(content, /mailto:/);
  assert.doesNotMatch(carousel, /projectShade/);
  assert.match(carousel, /projectVisual/);
  assert.doesNotMatch(styles, /border-radius:\s*(14|22)px/);
  assert.match(styles, /\.introCopy\s*\{[^}]*font-size:\s*14px/s);
});
