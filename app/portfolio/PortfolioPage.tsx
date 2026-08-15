import { experimentVisuals, projects } from "../green/portfolio-content";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import AucklandStatus from "./AucklandStatus";
import ExperimentsGrid from "./ExperimentsGrid";
import PortfolioCarousel, { ProjectMedia } from "./PortfolioCarousel";
import styles from "./portfolio.module.css";

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
    >
      <path
        d="M5 4 19 20M19 4 5 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.identity}>
          <span className={styles.mark} aria-hidden="true" />
          <span>Raunaq Bansal</span>
        </div>
        <div className={styles.introCopy}>
          <p>
            I design and build playful and practical products at the intersection of
            technology, art, and human experience.
          </p>
          <p>
            Particularly curious about tools that help people learn,
            connect, and make things.
          </p>
        </div>
      </header>

      <section className={styles.workSection} aria-labelledby="featured-projects">
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle} id="featured-projects">
            Featured projects
            <sup className={styles.sectionCount}>[{projects.length}]</sup>
          </h1>
        </div>

        <div className={styles.desktopProjects}>
          <PortfolioCarousel projects={projects} />
        </div>

        <div className={styles.mobileProjects}>
          {projects.map((project) => {
            const body = (
              <>
                <div className={styles.projectMeta}>
                  {project.details ?? null}
                </div>
                <div className={styles.mobileProjectVisual}>
                  <ProjectMedia project={project} alt="" />
                </div>
                <div className={styles.mobileProjectCopy}>
                  <h2>
                    {project.name}
                    {project.link ? (
                      <span className={styles.projectArrow} aria-hidden="true">
                        <ArrowUpRight size={14} strokeWidth={1.7} />
                      </span>
                    ) : null}
                  </h2>
                  <p>{project.tagline}</p>
                </div>
              </>
            );

            return project.link ? (
              <a
                className={styles.mobileProject}
                href={project.link}
                key={project.id}
                target="_blank"
                rel="noreferrer"
              >
                {body}
              </a>
            ) : (
              <article className={styles.mobileProject} key={project.id}>
                {body}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.experimentsSection} aria-labelledby="experiments">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id="experiments">
            Experiments
            <sup className={styles.sectionCount}>[{experimentVisuals.length}]</sup>
          </h2>
        </div>
        <ExperimentsGrid items={experimentVisuals} />
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerMeta}>
          <AucklandStatus />
        </span>
        <div className={styles.footerActions}>
          <nav className={styles.socialLinks} aria-label="Social links">
            <a
              aria-label="Email Raunaq"
              className={styles.socialLink}
              href="mailto:raunaqbansal@outlook.com"
            >
              <Mail aria-hidden="true" size={15} strokeWidth={1.7} />
            </a>
            <a
              aria-label="Raunaq on LinkedIn"
              className={styles.socialLink}
              href="https://www.linkedin.com/in/ron-bansal/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden="true" size={15} strokeWidth={1.7} />
            </a>
            <a
              aria-label="Raunaq on GitHub"
              className={styles.socialLink}
              href="https://github.com/Ron-Bansal"
              target="_blank"
              rel="noreferrer"
            >
              <Github aria-hidden="true" size={15} strokeWidth={1.7} />
            </a>
            <a
              aria-label="Raunaq on X"
              className={styles.socialLink}
              href="https://x.com/raunvq"
              target="_blank"
              rel="noreferrer"
            >
              <XIcon />
            </a>
          </nav>
          <a className={styles.homeLink} href="/">
            Back home
          </a>
        </div>
      </footer>
    </main>
  );
}
