import type { Article } from "./types";

// External-link card for a Note article. The card on /news links
// directly to the Note URL; there is no on-site page to render.

export const article: Article = {
  title: "チャッピー語ってありますよね",
  date: "2026-02-26",
  category: "Note",
  tags: ["AI", "ChatGPT", "ライティング"],
  summary:
    "ChatGPT 特有の文章スタイルを「チャッピー語」と名づけ、引用符の多用・改行による構造化・大義名分への着地という3つの癖を具体例で読み解きます。AI時代に求められる「AI らしい文章」と「人間らしい文章」の読み分けについて。",
  slug: "chappy-language",
  externalUrl:
    "https://note.com/rich_oxalis5409/n/n4bdb5f5676ae?sub_rt=share_pw",
};
