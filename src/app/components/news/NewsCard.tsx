import { Link } from "react-router";

interface NewsCardProps {
  title: string;
  date: string;
  category: "News" | "Insight";
  summary: string;
  slug: string;
}

export function NewsCard({ title, date, category, summary, slug }: NewsCardProps) {
  return (
    <article className="card">
      <div className="card__body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-3)",
          }}
        >
          <span className={`tag ${category === "News" ? "tag--coral" : "tag--teal"}`}>
            {category}
          </span>
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

        <Link
          to={`/news/${slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginTop: "var(--space-4)",
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--a11y-teal)",
            textDecoration: "none",
            transition: "gap var(--duration-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "var(--space-3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "var(--space-2)";
          }}
        >
          続きを読む
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12l4-4-4-4" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
