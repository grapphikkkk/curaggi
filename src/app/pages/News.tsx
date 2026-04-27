import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { NewsCard } from "../components/news/NewsCard";
import { articles } from "../components/news/articles";

export function News() {
  return (
    <div>
      <Seo
        title="News / Insight"
        description="Curaggi のお知らせと、UXデザイン・AI活用・プロトタイピングに関するインサイト記事をお届けします。"
        path="/news"
      />
      <Header />
      <main style={{ paddingTop: "80px", background: "#ffffff", color: "#0A0A0B" }}>
        <section
          style={{
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-16)",
          }}
        >
          <div className="container">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
              }}
            >
              — News / Insight
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "clamp(3rem, 14vw, 12rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                marginBottom: "var(--space-8)",
              }}
            >
              News
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body), var(--font-jp)",
                fontSize: "var(--text-lg)",
                color: "#44444F",
                lineHeight: 1.9,
                maxWidth: "720px",
              }}
            >
              お知らせ・インサイト記事をお届けします。
            </p>
          </div>
        </section>

        <section
          style={{
            paddingTop: "var(--space-8)",
            paddingBottom: "var(--space-24)",
            borderTop: "1px solid #E2E2E8",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "var(--space-8)",
                paddingTop: "var(--space-12)",
              }}
            >
              {articles.map((item) => (
                <NewsCard
                  key={item.slug}
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  summary={item.summary}
                  slug={item.slug}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
