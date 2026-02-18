import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NewsCard } from "../components/news/NewsCard";

export function News() {
  const newsItems = [
    {
      title: "Curaggi設立のお知らせ",
      date: "2026-02-15",
      category: "News" as const,
      summary: "デザインの力で選択肢と勇気を増やす。Curaggiが本日設立されました。社会課題解決に向けた新しい挑戦が始まります。",
      slug: "curaggi-launch",
    },
    {
      title: "デザインシンキングで社会課題にアプローチする方法",
      date: "2026-02-10",
      category: "Insight" as const,
      summary: "デザインシンキングのプロセスを社会課題解決に適用する際のポイントと、当事者視点を中心に置く重要性について解説します。",
      slug: "design-thinking-social-issues",
    },
    {
      title: "当事者中心のUXデザインとは何か",
      date: "2026-02-05",
      category: "Insight" as const,
      summary: "真のユーザー中心設計を実現するために、当事者の声をどう聴き、どう設計に反映させるか。実践的なアプローチを紹介します。",
      slug: "user-centered-ux-design",
    },
  ];

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--neutral-900)",
                  letterSpacing: "var(--tracking-tight)",
                  marginBottom: "var(--space-4)",
                }}
              >
                News / Insight
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-600)",
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "640px",
                  margin: "0 auto",
                }}
              >
                お知らせと、デザインに関する考察
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "var(--space-6)",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              {newsItems.map((item, index) => (
                <NewsCard
                  key={index}
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
