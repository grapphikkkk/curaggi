import type { Article } from "./types";

// ─────────────────────────────────────────────
//  Article: 幹事がいないコミュニティ事業
//           偶然を設計し、リアルのつながりを取りもどす
// ─────────────────────────────────────────────

const PURPLE = "var(--visione-purple)";
const TEAL = "var(--fiducia-teal)";
const YELLOW = "var(--scintilla-yellow)";
const PINK = "var(--curaggi-pink)";
const INK = "#0A0A0B";

// ── User experience flow (5 steps) ──
const USER_STEPS: { label: string; desc: string }[] = [
  { label: "WEB で登録", desc: "メールアドレスとプロフィールでサクッと登録。" },
  { label: "性格診断", desc: "価値観や趣味の傾向をかんたんな診断で把握。" },
  { label: "日程選択・予約", desc: "都合のよい日程を選び、参加するだけ。" },
  { label: "当日レストランへ", desc: "幹事も準備も不要。お店に行けばグループが揃っている。" },
  { label: "フィードバック", desc: "次回のグループ設計に反映するため、感想をシェア。" },
];

// ── Operations flow (3 steps) ──
const OPS_STEPS: { label: string; desc: string }[] = [
  {
    label: "レストラン予約・テーブル設定",
    desc: "性格診断の結果に基づいて、相性の良いメンバーでテーブルを設計します。",
  },
  {
    label: "当日対応",
    desc: "参加者がスムーズに会食を始められるよう、当日の運営をサポート。",
  },
  {
    label: "評価分析・サービス改善",
    desc: "フィードバックをもとに、次のグループ設計とサービス全体を継続的に改善。",
  },
];

// ── Modern issues (3) ──
const ISSUES: { num: string; title: string; body: string }[] = [
  {
    num: "❶",
    title: "リアルで出会う場が、デジタルに偏る",
    body: "オンラインで完結する時代になり、誰かと「実際に会って話す」機会は確実に減っています。リアルの場を能動的に作り出す人にしか、新しい出会いは訪れません。",
  },
  {
    num: "❷",
    title: "既存のアプリは「消費」の出会いに偏りやすい",
    body: "1対1のマッチングサービスは、写真やプロフィールといった「見た目」の情報を基準とした、刹那的な出会いに偏りがちです。長期的に続く関係性が育ちにくい構造があります。",
  },
  {
    num: "❸",
    title: "偶然の出会いの場が、限られている",
    body: "学生時代や職場のような偶発的なつながりは、社会人になるほど作りにくくなります。長期的な友達や仲間ができるかどうかが「運」に左右されています。",
  },
];

// ── Stats grid (4 big numbers) ──
const STATS: { value: string; unit: string; label: string }[] = [
  { value: "90", unit: "人", label: "登録会員数" },
  { value: "100", unit: "人突破", label: "Instagram フォロワー" },
  { value: "4", unit: "回", label: "4月イベント開催" },
  { value: "22", unit: "人", label: "4月イベント参加者総数" },
];

function TableOfContents() {
  const items = [
    { href: "#section-1", label: "1. 事業概要" },
    { href: "#section-2", label: "2. なぜこの事業をやるのか" },
    {
      href: "#section-3",
      label: "3. ローンチ1か月で登録者数90人突破",
    },
  ];
  return (
    <nav
      aria-label="目次"
      style={{
        margin: "var(--space-8) 0",
        padding: "var(--space-6)",
        background: "#ffffff",
        border: `2px solid ${INK}`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: INK,
          marginBottom: "var(--space-3)",
        }}
      >
        目次 / Contents
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {items.map((it) => (
          <li key={it.href} style={{ listStyleType: "none", margin: 0 }}>
            <a
              href={it.href}
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "16px",
                fontWeight: 700,
                color: INK,
                textDecoration: "none",
              }}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FlowSteps({
  title,
  steps,
  color,
}: {
  title: string;
  steps: { label: string; desc: string }[];
  color: string;
}) {
  return (
    <div
      style={{
        margin: "var(--space-8) 0",
        padding: "var(--space-6)",
        background: "#ffffff",
        border: `2px solid ${INK}`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: INK,
          marginBottom: "var(--space-5)",
        }}
      >
        {title}
      </div>
      <ol
        style={{
          padding: 0,
          margin: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {steps.map((s, i) => (
          <li
            key={i}
            style={{
              listStyleType: "none",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: color,
                color: INK,
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "14px",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-display), var(--font-jp)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "16px",
                  color: INK,
                  lineHeight: 1.7,
                  marginTop: "2px",
                }}
              >
                {s.desc}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function IssueBlock({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div style={{ margin: "var(--space-6) 0" }}>
      <div
        style={{
          fontFamily: "var(--font-display), var(--font-jp)",
          fontSize: "22px",
          fontWeight: 800,
          color: INK,
          lineHeight: 1.4,
          marginBottom: "8px",
        }}
      >
        <span style={{ color: PINK, marginRight: "8px" }}>{num}</span>
        {title}
      </div>
      <p
        style={{
          fontFamily: "var(--font-body), var(--font-jp)",
          fontSize: "16px",
          color: INK,
          lineHeight: 1.85,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function StatsGrid() {
  return (
    <div
      style={{
        margin: "var(--space-8) 0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "var(--space-6)",
            background: PURPLE,
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "160px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginTop: "var(--space-4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "56px",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {s.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export const article: Article = {
  title:
    "幹事がいないコミュニティ事業 - 偶然を設計し、リアルのつながりを取りもどす",
  date: "2026-04-27",
  category: "Insight",
  tags: ["コミュニティ事業", "サービス設計", "リアルなつながり"],
  summary:
    "3〜5人の少人数グループで食事をして友達をつくる、新しいコミュニティ事業をご紹介します。「偶然を設計する」というコンセプトと、ローンチ1か月の実績についてまとめました。",
  slug: "host-free-community",

  content: () => (
    <>
      <p style={{ fontSize: "16px", color: INK }}>
        Curaggi が自社開発・運営するのは、
        <strong>幹事がいないコミュニティ事業</strong>
        です。3〜5人の少人数グループで食事をするだけで、新しい友達ができる。そんな
        <strong>「偶然を設計する」</strong>
        サービスを、企画から実装・運用まで一貫して自社で手がけています。
      </p>
      <p style={{ fontSize: "16px", color: INK }}>
        本記事では、事業の概要・なぜこの事業をやるのか・ローンチ1か月の実績の3つをご紹介します。
      </p>

      <TableOfContents />

      {/* ────────────────────────────── */}
      <h2 id="section-1" style={{ color: INK }}>
        1. 事業概要
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        本サービスは、
        <strong>3〜5人の少人数グループでレストランで食事をすることで、友達をつくる</strong>
        新しいコミュニティ事業です。「幹事を立てる」「事前にメンバーを集める」といった面倒は一切不要。当日お店に行くだけで、価値観や趣味の傾向に基づいて設計されたグループが揃っています。
      </p>

      <h3 style={{ color: INK }}>2つの差別化ポイント</h3>

      <IssueBlock
        num="①"
        title="メッセージ・プロフィール公開はなし"
        body="マッチングアプリのような「事前にやり取りをして消耗する」体験は不要です。プロフィールの作り込みや初対面のメッセージのやりとりに時間を使う必要がありません。"
      />
      <IssueBlock
        num="②"
        title="リアルで会って話す、を最大重視"
        body="サービスのゴールは「会って話して友達になる」こと。オンラインで関係を完結させるのではなく、お店という場でゆっくり対話できる時間そのものをデザインしています。"
      />

      <h3 style={{ color: INK }}>ユーザー体験の流れ</h3>

      <FlowSteps
        title="User Flow — 参加者の流れ"
        steps={USER_STEPS}
        color={YELLOW}
      />

      <h3 style={{ color: INK }}>運営の流れ</h3>

      <p style={{ fontSize: "16px", color: INK }}>
        裏側では、性格診断の結果をもとに
        <strong>「価値観や性格に基づいたテーブル設計」</strong>
        を行っています。単にランダムで人を集めるのではなく、最初の会話が自然と弾むようにグループの組み合わせを設計しているのが、本サービスの中核です。
      </p>

      <FlowSteps
        title="Operations Flow — 運営の流れ"
        steps={OPS_STEPS}
        color={TEAL}
      />

      {/* ────────────────────────────── */}
      <h2 id="section-2" style={{ color: INK }}>
        2. なぜこの事業をやるのか
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        現代社会で「長期的な友達や仲間をつくる」ことには、いくつかの構造的な難しさがあります。
      </p>

      {ISSUES.map((it) => (
        <IssueBlock key={it.num} num={it.num} title={it.title} body={it.body} />
      ))}

      <p style={{ fontSize: "16px", color: INK }}>
        一方で、友達や仲間といった
        <strong>ソーシャルな関係を持つことは、心の安心の核</strong>
        にあるものです。長期的に支え合える関係性は、誰にとっても人生の土台になります。
      </p>

      <blockquote
        style={{
          color: INK,
          background: "transparent",
          borderLeft: `4px solid ${PINK}`,
          fontStyle: "normal",
        }}
      >
        偶然を設計し、
        <br />
        長期的な友達や仲間とのつながりを
        <br />
        あきらめない機会を、増やしたい。
      </blockquote>

      <p style={{ fontSize: "16px", color: INK }}>
        Curaggi のビジョンは
        <strong>「あきらめなくていい世界をつくる」</strong>
        こと。本コミュニティ事業はその第一歩として、
        <strong>「リアルの偶然を再設計する」</strong>
        ことに取り組んでいます。
      </p>

      {/* ────────────────────────────── */}
      <h2 id="section-3" style={{ color: INK }}>
        3. ローンチ1か月で登録者数90人突破
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        <strong>2026年4月1日にβ版をローンチ</strong>
        し、約1か月で多くの方々にご登録・ご参加いただきました。
      </p>

      <h3 style={{ color: INK }}>β版の機能</h3>

      <ul style={{ fontSize: "16px", color: INK }}>
        <li style={{ color: INK }}>アカウント登録</li>
        <li style={{ color: INK }}>イベント一覧</li>
        <li style={{ color: INK }}>イベント予約</li>
        <li style={{ color: INK }}>公式 Instagram でのコンテンツ発信</li>
      </ul>

      <h3 style={{ color: INK }}>4月の実績</h3>

      <StatsGrid />

      <p style={{ fontSize: "16px", color: INK }}>
        企画・UI 設計・実装・運用・SNS 発信まで、すべてを自社で一貫して手がけています。
        Figma Make / Claude Code / Next.js / Supabase / Stripe といったモダンスタックを駆使し、
        <strong>少人数でも高速にサービスを立ち上げ・改善し続けられる</strong>
        体制を実現しています。
      </p>

      <hr />

      <h2 style={{ color: INK }}>おわりに</h2>

      <p style={{ fontSize: "16px", color: INK }}>
        オンラインで完結する時代だからこそ、
        <strong>偶然をきっかけに、リアルで会って話す</strong>
        という当たり前を、もう一度デザインし直したい。
      </p>
      <p style={{ fontSize: "16px", color: INK }}>
        本コミュニティ事業は、Curaggi が掲げる
        <strong>「あきらめなくていい世界をつくる」</strong>
        というビジョンを、自社プロダクトという形で実証する取り組みです。
      </p>
      <p style={{ fontSize: "16px", color: INK }}>
        サービスへの参加・取材・パートナーシップなど、お気軽にお問い合わせください。
      </p>

      <p style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: INK,
            color: "#ffffff",
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          お問い合わせ →
        </a>
      </p>
    </>
  ),
};
