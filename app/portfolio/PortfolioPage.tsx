import { experimentVisuals, projects } from "../green/portfolio-content";
import ExperimentsGrid from "./ExperimentsGrid";
import PortfolioCarousel from "./PortfolioCarousel";
import styles from "./portfolio.module.css";

const projectImage = (project: (typeof projects)[number]) =>
  project.images?.[0] ?? null;

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
            I design and build playful, useful products at the intersection of
            technology, creativity, and human behaviour.
          </p>
          <p>
            I&apos;m especially interested in tools that help people learn,
            connect, make things, and feel a little more capable.
          </p>
        </div>
      </header>

      <section className={styles.workSection} aria-labelledby="selected-work">
        <div className={styles.sectionHeader}>
          <h1 id="selected-work">Selected work</h1>
          <span aria-hidden="true">Drag to explore</span>
        </div>

        <div className={styles.desktopProjects}>
          <PortfolioCarousel projects={projects} />
        </div>

        <div className={styles.mobileProjects}>
          {projects.map((project) => {
            const image = projectImage(project);
            const body = (
              <>
                <div className={styles.mobileProjectVisual}>
                  {image ? (
                    <img src={image} alt="" />
                  ) : (
                    <span className={styles.projectFallback} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.mobileProjectCopy}>
                  <h2>{project.name}</h2>
                  <p>{project.tagline}</p>
                  {project.details ? <span>{project.details}</span> : null}
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
          <h2 id="experiments">Experiments</h2>
          <span>{experimentVisuals.length} ongoing curiosities</span>
        </div>
        <ExperimentsGrid items={experimentVisuals} />
      </section>

      <footer className={styles.footer}>
        <span>Raunaq Bansal · Auckland, New Zealand</span>
        <a href="/">Back home</a>
      </footer>
    </main>
  );
}
