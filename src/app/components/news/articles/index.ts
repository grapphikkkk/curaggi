import type { Article } from "./types";

/**
 * articles フォルダ内の全記事を自動収集する
 * - _template.tsx は除外
 * - types.ts は除外
 * - 日付の新しい順にソート
 */

// Vite の import.meta.glob で同フォルダの .tsx ファイルを一括取得（Eager モード）
const modules = import.meta.glob<{ article: Article }>("./*.tsx", {
  eager: true,
});

/** 全記事のリスト（公開日の新しい順） */
export const articles: Article[] = Object.entries(modules)
  .filter(([path]) => !path.includes("_template"))
  .map(([, mod]) => mod.article)
  .filter(Boolean)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** slug から記事を取得 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** 記事が NEW かどうか（公開日から7日以内） */
export function isNewArticle(dateStr: string): boolean {
  const now = new Date();
  const pubDate = new Date(dateStr);
  const diffMs = now.getTime() - pubDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}
