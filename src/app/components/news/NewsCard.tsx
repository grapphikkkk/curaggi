import { Link } from "react-router";
import { isNewArticle } from "./articles";

interface NewsCardProps {
  title: string;
  date: string;
  category: "News" | "Insight" | "Note";
  summary: string;
  slug: string;
  /** When set, the card is rendered as an external link card. */
  externalUrl?: string;
}

const tagClassFor = (category: NewsCardProps["category"]): string => {
  if (category === "News") return "tag--news";
  if (category === "Note") return "tag--note";
  return "tag--insight";
};

export function NewsCard({
  title,
  date,
  category,
  summary,
  slug,
  externalUrl,
}: NewsCardProps) {
  const isNew = isNewArticle(date);
  const isExternal = !!externalUrl;

  const linkLabel = isExternal ? "Note で読む" : "続きを読む";
  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    marginTop: "var(--space-4)",
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "#0A0A0B",
    textDecoration: "none",
    transition: "gap var(--duration-fast) var(--ease-out)",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.gap = "var(--space-3)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.gap = "var(--space-2)";
  };

  return (
    <article className="card">
      <div className="card__body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-3)",
            flexWrap: "wrap",
          }}
        >
          <span className={`tag ${tagClassFor(category)}`}>{category}</span>
          {isNew && (
            <span className="tag tag--new" style={{ fontWeight: 700 }}>
              NEW
            </span>
          )}
          <time
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--neutral-500)",
            }}
            dateTime={date}
          >
            {date}
          </time>
        </div>

        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{summary}</p>

        {isExternal ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {linkLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 11l6-6M6 5h5v5" />
            </svg>
          </a>
        ) : (
          <Link
            to={`/news/${slug}`}
            style={linkStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {linkLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 12l4-4-4-4" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
