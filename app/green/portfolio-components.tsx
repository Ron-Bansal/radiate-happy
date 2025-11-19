// portfolio-components.tsx
"use client";

import { useState, type CSSProperties } from "react";
import type {
  Project,
  ExperimentVisual,
  WritingEntry,
} from "./portfolio-content";

/* ---------- helpers ---------- */

function isVideoSource(src: string): boolean {
  const clean = src.split("?")[0]; // strip query params
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(clean);
}

function MediaContent({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (isVideoSource(src)) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

/* ---------- small components ---------- */

export function TabLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 pb-0.5 transition-colors ${
        isActive
          ? "border-[#424D08] text-[#424D08]"
          : "border-transparent text-neutral-700 hover:border-neutral-500"
      }`}
    >
      {label}
    </button>
  );
}

export function ProjectBlock({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const total = project.images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const currentSrc = project.images[index];

  return (
    <article className="space-y-4">
      {/* media frame + carousel */}
      <div className="relative w-full bg-black/5 group">
        <div className="flex h-full w-full items-center justify-center">
          <MediaContent
            src={currentSrc}
            alt={project.name}
            className="block h-auto w-full object-contain"
          />
        </div>

        {total > 1 && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[12px] text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                prev();
              }}
              aria-label="Previous media"
              className="flex h-7 w-7 items-center justify-center bg-black/65 text-[11px] opacity-40 transition-opacity duration-200 md:group-hover:opacity-100"
            >
              ←
            </button>

            <div className="flex items-center gap-[3px] bg-black/55 px-2 py-[3px] opacity-40 transition-opacity duration-200 md:group-hover:opacity-100">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-[7px] w-[7px] ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                next();
              }}
              aria-label="Next media"
              className="flex h-7 w-7 items-center justify-center bg-black/65 text-[11px] opacity-40 transition-opacity duration-200 md:group-hover:opacity-100"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* text stack – 4pt scale */}
      <div className="flex flex-col space-y-1 text-[#3d3d3d]">
        <h2 className="text-[18px] font-medium tracking-tight">
          {project.name}
        </h2>
        <p className="text-[14px] leading-snug text-neutral-800">
          {project.tagline}
        </p>
        {project.details && (
          <p className="mt-[1px] text-[12px] text-neutral-600">
            {project.details}
          </p>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-700 underline-offset-4 hover:underline ml-auto"
          >
            View project <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function ExperimentVisualBlock({ item }: { item: ExperimentVisual }) {
  const containerStyle: CSSProperties = {};

  if (item.minHeight !== undefined) {
    containerStyle.minHeight = item.minHeight;
  }
  if (item.maxHeight !== undefined) {
    containerStyle.maxHeight = item.maxHeight;
  }

  const inner = (
    <article className="space-y-2">
      {/* media box – height controlled by min/max, media is contain */}
      <div
        className="flex w-full items-center justify-center overflow-hidden bg-black/5"
        style={containerStyle}
      >
        <MediaContent
          src={item.image}
          alt={item.title ?? "Experiment visual"}
          className="h-auto w-auto max-h-full max-w-full object-contain"
        />
      </div>

      {/* caption */}
      <div className="space-y-1">
        {item.title && (
          <h2 className="text-base font-medium tracking-tight text-[#3d3d3d]">
            {item.title}
          </h2>
        )}
        {item.caption && (
          <p className="text-sm leading-snug text-neutral-700">
            {item.caption}
          </p>
        )}
      </div>
    </article>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer noopener"
        className="block transition-transform duration-150 hover:-translate-y-[1px]"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export function WritingBlock({ entry }: { entry: WritingEntry }) {
  const inner = (
    <article className="space-y-2 border-b border-black/5 pb-5 last:border-none last:pb-0">
      <h2 className="mt-[2px] text-[16px] font-medium tracking-tight text-[#3d3d3d]">
        {entry.title}
      </h2>

      <p className="text-[13px] leading-snug text-neutral-800">
        {entry.description}
      </p>
      <p className="text-[11px] font-mono text-neutral-500">{entry.date}</p>

      {entry.link && (
        <span className="inline-flex items-center gap-1 text-[12px] text-neutral-700 underline-offset-4 hover:underline">
          Read the full piece ↗
        </span>
      )}
    </article>
  );

  return entry.link ? (
    <a
      href={entry.link}
      target="_blank"
      rel="noreferrer noopener"
      className="block transition-transform duration-150 hover:-translate-y-[1px]"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}