"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../green/portfolio-content";
import styles from "./portfolio.module.css";

type PortfolioCarouselProps = {
  projects: Project[];
};

type ProjectCardProps = {
  project: Project;
  duplicate?: boolean;
};

function ProjectCard({ project, duplicate = false }: ProjectCardProps) {
  const image = project.images?.[0] ?? null;
  const content = (
    <>
      <div className={styles.projectMeta}>{project.details ?? null}</div>
      <div className={styles.projectVisual}>
        {image ? (
          <img src={image} alt={duplicate ? "" : project.name} />
        ) : (
          <span className={styles.projectFallback} aria-hidden="true" />
        )}
      </div>
      <div className={styles.projectCopy}>
        <h2>
          {project.name}
          {project.link ? (
            <span className={styles.projectArrow} aria-hidden="true">
              <ArrowUpRight size={13} strokeWidth={1.7} />
            </span>
          ) : null}
        </h2>
        <p>{project.tagline}</p>
      </div>
    </>
  );

  return project.link ? (
    <a
      className={styles.projectItem}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      tabIndex={duplicate ? -1 : undefined}
    >
      {content}
    </a>
  ) : (
    <article className={styles.projectItem}>{content}</article>
  );
}

export default function PortfolioCarousel({
  projects,
}: PortfolioCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const primarySetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const primarySet = primarySetRef.current;

    if (!viewport || !track || !primarySet) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const wrapProgress = gsap.utils.wrap(0, 1);
    let loop: gsap.core.Tween | null = null;
    let loopDistance = 1;
    let resumeTimer = 0;
    let resizeTimer = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartProgress = 0;

    const pause = () => loop?.pause();
    const resume = () => {
      window.clearTimeout(resumeTimer);
      const isStillEngaged =
        viewport.matches(":hover") || viewport.contains(document.activeElement);

      if (
        !reducedMotion.matches &&
        !isStillEngaged &&
        document.visibilityState === "visible"
      ) {
        loop?.play();
      }
    };
    const resumeSoon = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(resume, 700);
    };

    const buildLoop = () => {
      const previousProgress = loop?.progress() ?? 0;
      loop?.kill();
      loop = null;
      gsap.set(track, { x: 0 });

      if (reducedMotion.matches) return;

      const trackStyle = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
      loopDistance = primarySet.offsetWidth + gap;

      if (loopDistance <= 1) return;

      loop = gsap.to(track, {
        x: -loopDistance,
        duration: Math.max(loopDistance / 38, 26),
        ease: "none",
        repeat: -1,
      });
      loop.progress(previousProgress);

      if (
        viewport.matches(":hover") ||
        viewport.contains(document.activeElement)
      ) {
        loop.pause();
      }
    };

    const scheduleBuildLoop = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(buildLoop, 90);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!loop || event.button !== 0) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartProgress = loop.progress();
      pause();
      viewport.classList.add(styles.isDragging);
      viewport.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!loop || !isDragging) return;
      const delta = event.clientX - dragStartX;
      loop.progress(wrapProgress(dragStartProgress - delta / loopDistance));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove(styles.isDragging);
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      resumeSoon();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!loop) return;

      const isHorizontal =
        event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!isHorizontal) return;

      event.preventDefault();
      pause();
      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      loop.progress(wrapProgress(loop.progress() + delta / loopDistance));
      resumeSoon();
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!viewport.contains(event.relatedTarget as Node | null)) resume();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") pause();
      else resume();
    };

    const resizeObserver = new ResizeObserver(scheduleBuildLoop);
    resizeObserver.observe(primarySet);
    reducedMotion.addEventListener("change", buildLoop);
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resumeSoon);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", handleFocusOut);
    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("pointercancel", handlePointerUp);
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("visibilitychange", handleVisibility);
    buildLoop();

    return () => {
      window.clearTimeout(resumeTimer);
      window.clearTimeout(resizeTimer);
      loop?.kill();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", buildLoop);
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", resumeSoon);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", handleFocusOut);
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("pointercancel", handlePointerUp);
      viewport.removeEventListener("wheel", handleWheel);
      document.removeEventListener("visibilitychange", handleVisibility);
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  return (
    <div
      className={styles.carouselViewport}
      ref={viewportRef}
      aria-label="Selected projects carousel"
      tabIndex={0}
    >
      <div className={styles.carouselTrack} ref={trackRef}>
        <div className={styles.projectSet} ref={primarySetRef}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
        <div
          className={`${styles.projectSet} ${styles.duplicateSet}`}
          aria-hidden="true"
        >
          {projects.map((project) => (
            <ProjectCard
              duplicate
              project={project}
              key={`duplicate-${project.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
