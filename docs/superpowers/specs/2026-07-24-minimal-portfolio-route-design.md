# Minimal Portfolio Route Design

## Goal

Create a new `/portfolio` route that presents Raunaq Bansal's existing projects and experiments in a highly minimal, editorial layout inspired by the supplied references.

## Scope

- Add a new route at `/portfolio`.
- Use the existing Figtree font already configured in the root layout.
- Use the project and experiment records exported by `app/green/portfolio-content.ts` as the single content source.
- Do not add an experience section.
- Do not add light/dark mode.
- Do not change the existing `/` or `/green` routes.
- Do not add new runtime dependencies; GSAP is already installed.

## Visual Direction

The page uses a warm off-white background, charcoal primary text, muted grey supporting text, thin rules, generous whitespace, and compact typography. Content sits in a restrained centered column except for the selected-work carousel, which runs edge to edge across the viewport.

The hierarchy is:

1. Compact introduction
2. Full-width selected-work carousel
3. Experiments masonry grid
4. Minimal footer

Decorative effects are deliberately limited. Images and spacing provide most of the visual character.

## Page Introduction

The introduction is a narrow centered block with:

- Raunaq's name and a small visual mark
- A concise description of his design and creative technology practice
- A short second paragraph describing his interest in playful, useful products

The copy will be derived from language already present in the project rather than introducing claims or employment history that are not in the content source.

## Selected Work

### Desktop

Projects from `projects` in `app/green/portfolio-content.ts` appear as large landscape cards in a full-bleed horizontal rail.

The rail:

- loops continuously at a slow, calm speed using GSAP;
- duplicates the rendered project sequence to create a seamless loop;
- pauses while a card or the rail is hovered or keyboard-focused;
- supports pointer dragging and trackpad/wheel interaction;
- resumes gently after interaction ends;
- preserves keyboard access to linked cards;
- stops automatic animation when the operating system requests reduced motion.

Each card uses the first available project image. The image is visible by default with a subtle rounded corner. Hovering or focusing the card reveals a compact overlay containing the project name, tagline, and details. The image receives only a restrained darkening or scale treatment so the page remains minimal. The full card is clickable when the project has a link; unlinked projects remain non-interactive.

The duplicate rail copy is hidden from assistive technology and its links are removed from the keyboard tab order so each project is announced once.

### Mobile

Below the desktop breakpoint, the carousel is removed entirely. Projects render once as a normal vertical stack. Each card shows its image followed by its name, tagline, and details; no information depends on hover. Linked projects remain full-card links.

## Experiments

Experiments from `experimentVisuals` in `app/green/portfolio-content.ts` render in a masonry-style thumbnail grid.

- Desktop uses three columns with varied visual heights derived from each item's existing `size`, `minHeight`, and `maxHeight` metadata where available.
- Standard mobile uses two columns.
- Very narrow screens use one column to preserve legibility and usable tap targets.
- Images and videos both use the source media already declared in the content.
- Videos are muted, looped, inline, and lazy-loaded where browser support permits.
- Desktop captions appear as quiet hover/focus overlays.
- Touch layouts show captions beneath the media so they never depend on hover.
- Linked experiments are keyboard-accessible and use the full tile as the interactive target.

CSS multi-column layout is preferred for masonry because visual order is non-critical, the data is small, and it avoids adding a layout library.

## Footer

The footer is a compact closing row with Raunaq's name, Auckland location, and a link back to the existing home page. No new social or contact information will be invented.

## Architecture

The route will be composed from focused local files:

- `app/portfolio/page.tsx`: route metadata and page assembly
- `app/portfolio/PortfolioPage.tsx`: client-side page layout and GSAP lifecycle
- `app/portfolio/PortfolioCarousel.tsx`: desktop animation, interaction, and accessible duplicated rail
- `app/portfolio/PortfolioProjectCard.tsx`: shared project presentation for desktop and mobile
- `app/portfolio/ExperimentsGrid.tsx`: responsive experiment masonry
- `app/portfolio/portfolio.module.css`: route-scoped presentation and responsive behavior

The page imports `projects`, `experimentVisuals`, and their types directly from `app/green/portfolio-content.ts`. No data is copied into a second portfolio-specific content file.

## Animation and Interaction

GSAP owns carousel translation and drag state. The animation is created only after the rail is measured in the browser and is cleaned up on unmount. Resize handling recalculates the loop distance without accumulating timelines or event listeners.

Wheel input over the rail is translated into horizontal progress while the pointer is over the carousel. Normal vertical page scrolling remains available outside the rail and on mobile. Pointer dragging uses pointer events and GSAP updates rather than adding another carousel library.

The carousel does not autoplay while the browser tab is hidden and resumes from its current position when visible again.

## Accessibility

- All meaningful images use project or experiment titles as alternative text.
- Decorative duplicate images use empty alternative text.
- Interactive cards use semantic anchors.
- Hover-revealed content is also revealed on keyboard focus.
- Mobile and touch layouts never hide essential copy.
- Focus styles remain clearly visible.
- Reduced-motion mode disables automatic movement and animated image scaling.
- Duplicate carousel content is `aria-hidden` and non-focusable.

## Failure and Edge Cases

- A project without images renders a neutral text card instead of a broken image.
- A project or experiment without a link renders as non-interactive content.
- A missing caption does not reserve empty overlay space.
- A video that cannot autoplay still exposes its poster frame or first frame without blocking the rest of the grid.
- JavaScript failure leaves the primary project sequence visible in a horizontally scrollable rail.

## Verification

Implementation will be verified with:

- a focused automated test for route rendering, content-source reuse, semantic links, and duplicate accessibility behavior;
- an automated build to catch Next.js, TypeScript, and route-generation errors;
- desktop visual checks for seamless looping, hover/focus reveal, dragging, wheel behavior, and masonry layout;
- mobile visual checks for stacked projects, visible copy, one/two-column experiment layout, and the absence of carousel motion;
- a reduced-motion check confirming autoplay is disabled.

