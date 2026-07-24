# Minimal Portfolio Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive `/portfolio` route with a GSAP-powered infinite desktop project carousel and a responsive experiment masonry grid.

**Architecture:** The route imports the existing project and experiment data directly from `app/green/portfolio-content.ts`. A client carousel component owns GSAP lifecycle and pointer/wheel interaction, while route-scoped CSS controls the editorial layout, hover/focus reveals, masonry, responsive stacking, and reduced-motion fallback.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, CSS Modules, GSAP, Node test runner.

## Global Constraints

- Keep `app/green/portfolio-content.ts` as the single content source.
- Add no runtime dependencies.
- Use the existing Figtree font.
- Do not add experience, theme switching, or changes to existing routes.
- Desktop project movement uses GSAP; mobile projects are stacked.
- Essential copy must remain visible without hover on touch layouts.

---

### Task 1: Route Contract Test

**Files:**
- Create: `tests/portfolio-route.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: repository source files
- Produces: `npm test` coverage for route presence, shared content imports, GSAP usage, mobile content, and accessible duplicate handling

- [ ] **Step 1: Write the failing test**

Create a Node test that reads the expected route files and asserts:

```js
assert.match(page, /PortfolioPage/);
assert.match(content, /from ["']\.\.\/green\/portfolio-content["']/);
assert.match(carousel, /gsap/);
assert.match(carousel, /aria-hidden/);
assert.match(content, /projects\.map/);
assert.match(content, /experimentVisuals\.map/);
```

Add `"test": "node --test tests/*.test.mjs"` to `package.json`.

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because `app/portfolio` does not exist.

- [ ] **Step 3: Keep the failing test for the implementation tasks**

No production files are created in this task.

---

### Task 2: Portfolio Route and Responsive Content

**Files:**
- Create: `app/portfolio/page.tsx`
- Create: `app/portfolio/PortfolioPage.tsx`
- Create: `app/portfolio/ExperimentsGrid.tsx`
- Create: `app/portfolio/portfolio.module.css`

**Interfaces:**
- Consumes: `projects`, `experimentVisuals`, `Project`, and `ExperimentVisual` from `app/green/portfolio-content.ts`
- Produces: `PortfolioPage` and `ExperimentsGrid`

- [ ] **Step 1: Build the route shell**

`page.tsx` exports route metadata and renders `PortfolioPage`.

- [ ] **Step 2: Build the page layout**

`PortfolioPage.tsx` renders the compact introduction, selected-work section, mobile project list, experiment section, and footer.

- [ ] **Step 3: Build experiment masonry**

`ExperimentsGrid.tsx` renders image and video media, semantic anchors for linked entries, and optional captions.

- [ ] **Step 4: Add responsive route-scoped styling**

Use CSS columns for experiments, hide the desktop rail below `768px`, show stacked projects on mobile, expose captions on touch layouts, and add reduced-motion overrides.

- [ ] **Step 5: Run the focused test**

Run: `npm test`

Expected: still FAIL because the GSAP carousel contract is not implemented.

---

### Task 3: GSAP Infinite Carousel

**Files:**
- Create: `app/portfolio/PortfolioCarousel.tsx`
- Modify: `app/portfolio/PortfolioPage.tsx`
- Modify: `app/portfolio/portfolio.module.css`

**Interfaces:**
- Consumes: `Project[]`
- Produces: `PortfolioCarousel({ projects }: { projects: Project[] })`

- [ ] **Step 1: Render the accessible rail**

Render one primary project set and one `aria-hidden` duplicate. Duplicate anchors receive `tabIndex={-1}`.

- [ ] **Step 2: Add the seamless GSAP loop**

Measure the primary set, animate the track from `0` to one set width, repeat indefinitely with linear easing, and rebuild cleanly after resize.

- [ ] **Step 3: Add interaction controls**

Pause on hover/focus, map pointer dragging and wheel input to timeline progress, stop while the tab is hidden, and resume gently after interaction.

- [ ] **Step 4: Add reduced-motion fallback**

Skip GSAP animation when `prefers-reduced-motion: reduce` is active and expose the primary set as a native horizontal scroller.

- [ ] **Step 5: Run the contract test**

Run: `npm test`

Expected: PASS.

---

### Task 4: Verification and Visual QA

**Files:**
- Modify only files found defective during verification

**Interfaces:**
- Consumes: completed `/portfolio` route
- Produces: buildable and visually verified feature

- [ ] **Step 1: Run automated verification**

Run:

```bash
npm test
npm run build
```

Expected: both commands exit `0`.

- [ ] **Step 2: Run the local app**

Run: `npm run dev`

Expected: the app serves `/portfolio` without runtime errors.

- [ ] **Step 3: Inspect desktop**

Verify the seamless loop, hover/focus copy, linked cards, drag/wheel interaction, full-bleed rail, and three-column masonry.

- [ ] **Step 4: Inspect mobile**

Verify stacked projects, always-visible copy, one/two-column experiments, and no carousel animation.

- [ ] **Step 5: Inspect reduced motion**

Verify automatic motion and scaling are disabled while content remains manually accessible.

