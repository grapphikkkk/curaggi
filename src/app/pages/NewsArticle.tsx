import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NewsCard } from "../components/news/NewsCard";
import { getArticleBySlug, articles, isNewArticle } from "../components/news/articles";

export function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // ── いいねボタン（localStorage 永続化） ──
  const likeKey = `curaggi-like-${slug}`;
  const countKey = `curaggi-like-count-${slug}`;

  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(likeKey) === "true";
  });
  const [likeCount, setLikeCount] = useState(() => {
    const stored = localStorage.getItem(countKey);
    return stored ? parseInt(stored, 10) : 0;
  });

  const handleLike = () => {
    if (liked) {
      const newCount = Math.max(0, likeCount - 1);
      setLiked(false);
      setLikeCount(newCount);
      localStorage.setItem(likeKey, "false");
      localStorage.setItem(countKey, String(newCount));
    } else {
      const newCount = likeCount + 1;
      setLiked(true);
      setLikeCount(newCount);
      localStorage.setItem(likeKey, "true");
      localStorage.setItem(countKey, String(newCount));
    }
  };

  // ── シェアボタン ──
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `Curaggi｜${article?.title ?? ""}\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // ── 関連記事（同カテゴリ、自分以外、最大3件） ──
  const relatedArticles = article
    ? articles
        .filter((a) => a.category === article.category && a.slug !== article.slug)
        .slice(0, 3)
    : [];

  // ── 記事が見つからない場合 ──
  if (!article) {
    return (
      <div>
        <Header />
        <main style={{ paddingTop: "80px" }}>
          <div className="article">
            <Link to="/news" className="article__back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 12l-4-4 4-4" />
              </svg>
              記事一覧に戻る
            </Link>
            <div style={{ textAlign: "center", padding: "var(--space-16) 0" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display), var(--font-jp)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 700,
                  color: "var(--neutral-900)",
                  marginBottom: "var(--space-4)",
                }}
              >
                記事が見つかりません
              </h1>
              <p style={{ color: "var(--neutral-600)" }}>
                指定された記事は存在しないか、削除された可能性があります。
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Content = article.content;

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <div className="article">
          {/* 戻るリンク */}
          <Link to="/news" className="article__back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12l-4-4 4-4" />
            </svg>
            記事一覧に戻る
          </Link>

          {/* ヘッダー */}
          <header className="article__header">
            <div className="article__meta">
              <span
                className={`tag ${article.category === "News" ? "tag--coral" : "tag--teal"}`}
              >
                {article.category}
              </span>
              {isNewArticle(article.date) && (
                <span className="tag tag--coral" style={{ fontWeight: 700 }}>
                  NEW
                </span>
              )}
              <time className="article__date" dateTime={article.date}>
                {article.date}
              </time>
            </div>
            <h1 className="article__title">{article.title}</h1>
          </header>

          {/* 本文 */}
          <div className="article__body">
            <Content />
          </div>

          {/* タグ */}
          {article.tags.length > 0 && (
            <div className="article__tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag tag--neutral">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* いいね & シェア */}
          <div className="article__actions">
            <button
              className={`article__like-btn ${liked ? "article__like-btn--active" : ""}`}
              onClick={handleLike}
              aria-label={liked ? "いいねを取り消す" : "いいね"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {likeCount > 0 ? likeCount : "いいね"}
            </button>

            <button
              className={`article__share-btn ${copied ? "article__share-btn--copied" : ""}`}
              onClick={handleShare}
              aria-label="記事をシェア"
            >
              {copied ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  コピーしました
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  シェア
                </>
              )}
            </button>
          </div>

          {/* 関連記事 */}
          {relatedArticles.length > 0 && (
            <section className="article__related">
              <h2 className="article__related-title">関連記事</h2>
              <div className="article__related-grid">
                {relatedArticles.map((related) => (
                  <NewsCard
                    key={related.slug}
                    title={related.title}
                    date={related.date}
                    category={related.category}
                    summary={related.summary}
                    slug={related.slug}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
