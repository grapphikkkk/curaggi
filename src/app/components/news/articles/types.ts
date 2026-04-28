import type { ReactNode } from "react";

/**
 * 記事データの型定義
 *
 * 各記事ファイルはこの型に準拠した `article` オブジェクトをエクスポートしてください。
 *
 * ファイル命名規則: YYYY-MM-DD_slug-name.tsx
 *   例: 2026-03-01_new-service-announcement.tsx
 */
export interface Article {
  /** 記事タイトル */
  title: string;
  /** 公開日 (YYYY-MM-DD形式) */
  date: string;
  /** カテゴリ。"Note" を指定すると外部リンクカードとして扱われ、
   *  クリック時に externalUrl に新規タブで遷移します。 */
  category: "News" | "Insight" | "Note";
  /** タグ一覧 */
  tags: string[];
  /** 一覧に表示される要約文 */
  summary: string;
  /** URLスラッグ（ファイル名のスラッグ部分と一致させる） */
  slug: string;
  /** 記事本文（JSX）。externalUrl が指定されている場合は不要。 */
  content?: () => ReactNode;
  /** 外部リンク先URL（指定すると一覧カードがこの URL に遷移）。 */
  externalUrl?: string;
}
