import type { ExperimentVisual } from "../green/portfolio-content";
import styles from "./portfolio.module.css";

type ExperimentsGridProps = {
  items: ExperimentVisual[];
};

const readableTitle = (item: ExperimentVisual) =>
  item.title ??
  item.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function ExperimentMedia({ item }: { item: ExperimentVisual }) {
  const title = readableTitle(item);

  if (item.image.endsWith(".mp4")) {
    return (
      <video
        aria-label={title}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={item.image} type="video/mp4" />
      </video>
    );
  }

  return <img src={item.image} alt={title} loading="lazy" />;
}

export default function ExperimentsGrid({ items }: ExperimentsGridProps) {
  return (
    <div className={styles.experimentsGrid}>
      {items.map((item) => {
        const content = (
          <>
            <ExperimentMedia item={item} />
            {item.caption ? (
              <div className={styles.experimentCaption}>
                <span>{readableTitle(item)}</span>
                <p>{item.caption}</p>
              </div>
            ) : null}
          </>
        );

        return item.link ? (
          <a
            className={styles.experimentTile}
            href={item.link}
            key={item.id}
            target="_blank"
            rel="noreferrer"
          >
            {content}
          </a>
        ) : (
          <article className={styles.experimentTile} key={item.id}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
