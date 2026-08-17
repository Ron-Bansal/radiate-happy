import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("portfolio route uses the shared content and accessible GSAP carousel", async () => {
  const [page, content, portfolioData, homePortfolio, blockReveal, carousel, experiments, aucklandStatus, styles] = await Promise.all([
    readSource("app/portfolio/page.tsx"),
    readSource("app/portfolio/PortfolioPage.tsx"),
    readSource("app/green/portfolio-content.ts"),
    readSource("app/green/PortfolioPage.tsx"),
    readSource("app/components/BlockRevealCopy.jsx"),
    readSource("app/portfolio/PortfolioCarousel.tsx"),
    readSource("app/portfolio/ExperimentsGrid.tsx"),
    readSource("app/portfolio/AucklandStatus.tsx"),
    readSource("app/portfolio/portfolio.module.css"),
  ]);

  assert.match(page, /PortfolioPage/);
  assert.match(content, /from ["']\.\.\/green\/portfolio-content["']/);
  assert.match(portfolioData, /thumbnailLandscape\?: string/);
  assert.match(carousel, /project\.thumbnailLandscape\s*\?\?\s*project\.images\?\.\[0\]/);
  assert.match(carousel, /export function ProjectMedia/);
  assert.match(carousel, /<video[\s\S]*autoPlay[\s\S]*loop[\s\S]*muted[\s\S]*playsInline/);
  assert.match(content, /ProjectMedia/);
  assert.match(content, /Featured projects/);
  assert.doesNotMatch(content, /Selected work/);
  assert.match(content, /projects\.map/);
  assert.match(content, /experimentVisuals/);
  assert.match(experiments, /items\.map/);
  assert.match(carousel, /gsap/);
  assert.match(carousel, /aria-hidden/);
  assert.match(carousel, /tabIndex=\{duplicate \? -1 : undefined\}/);
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /const isHorizontal/);
  assert.match(carousel, /if \(!isHorizontal\) return/);
  assert.match(carousel, /event\.shiftKey \? event\.deltaY : event\.deltaX/);
  assert.match(carousel, /projectMeta/);
  assert.match(carousel, /projectArrow/);
  assert.match(content, /projectMeta/);
  assert.match(content, /projectArrow/);
  assert.match(carousel, /ArrowUpRight/);
  assert.match(content, /ArrowUpRight/);
  assert.doesNotMatch(carousel, /↗/);
  assert.doesNotMatch(content, /↗/);
  assert.match(content, /AucklandStatus/);
  assert.match(
    content,
    /I design and build playful and practical products at the[\s\S]*intersection of[\s\S]*technology, art, and human experience/,
  );
  assert.match(
    homePortfolio,
    /I design and build playful and practical products at the[\s\S]*intersection of[\s\S]*technology, art, and human experience/,
  );
  assert.match(
    content,
    /Particularly curious about tools that help people learn,[\s\S]*connect, and make things/,
  );
  assert.match(
    homePortfolio,
    /Particularly curious about tools that help people learn,[\s\S]*connect, and make things/,
  );
  assert.match(homePortfolio, /preserveLineHeight/);
  assert.match(homePortfolio, /elementGap=\{8\}/);
  assert.doesNotMatch(homePortfolio, /max-w-sm space-y-/);
  assert.match(blockReveal, /preserveLineHeight = false/);
  assert.match(blockReveal, /elementGap = 0/);
  assert.match(blockReveal, /wrapper\.style\.marginTop/);
  assert.match(aucklandStatus, /Pacific\/Auckland/);
  assert.match(aucklandStatus, /api\.open-meteo\.com/);
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
  assert.match(styles, /--content-column:\s*590px/);
  assert.match(
    styles,
    /\.intro,\s*\.sectionHeader\s*\{[^}]*var\(--content-column\)/s,
  );
  assert.match(
    styles,
    /\.projectVisual\s*\{[^}]*aspect-ratio:\s*1\.618\s*\/\s*1/s,
  );
  assert.match(
    styles,
    /\.projectItem\s*\{[^}]*width:\s*clamp\(360px,\s*36vw,\s*540px\)/s,
  );
  assert.match(
    styles,
    /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*\.projectItem:hover\s*\{[^}]*width:\s*clamp\(390px,\s*40vw,\s*590px\)/s,
  );
  assert.match(
    styles,
    /\.projectSet\s*\{[^}]*min-height:\s*clamp\(373px,\s*calc\(24\.72vw \+ 132px\),\s*497px\)/s,
  );
  assert.match(styles, /text-wrap:\s*pretty/);
  assert.match(
    styles,
    /\.mobileProject \.projectMeta\s*\{[^}]*text-align:\s*right/s,
  );
  assert.match(styles, /\.workSection\s*\{[^}]*padding-bottom:\s*72px/s);
  assert.match(
    styles,
    /@media \(max-width: 767px\)[\s\S]*\.workSection\s*\{[^}]*padding-bottom:\s*64px/s,
  );
});
