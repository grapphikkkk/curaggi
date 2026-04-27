import type { Article } from "./types";

// ─────────────────────────────────────────────
//  Article: 机上の空論に早くおさらば。
//           早く形にし、意思決定・カイゼンを高速化する
// ─────────────────────────────────────────────
//
//  Brand colors are referenced via CSS variables only:
//    --visione-purple / --fiducia-teal / --scintilla-yellow
//  No raw hex / gray values are used in this article.

const PURPLE = "var(--visione-purple)";
const TEAL = "var(--fiducia-teal)";
const INK = "#0A0A0B"; // single allowed body color (black)

const PROCESS_STEPS: { label: string; desc: string }[] = [
  {
    label: "企画・構想 / 市場調査",
    desc: "事業ゴールと市場機会を整理し、解くべき課題を定義します。",
  },
  {
    label: "ターゲット明確化",
    desc: "想定ユーザーの属性・課題・利用文脈を具体化します。",
  },
  {
    label: "コンセプト",
    desc: "提供価値とサービスの骨子を言語化します。",
  },
  {
    label: "画面の試作（プロトタイピング）",
    desc: "触って動くモックを作り、構想を可視化します。",
  },
  {
    label: "ユーザー検証・改善",
    desc: "実ユーザーで試し、フィードバックを反映します。",
  },
  {
    label: "画面デザイン",
    desc: "UI の色・レイアウト・トンマナを整えます。",
  },
  {
    label: "開発要件定義",
    desc: "開発のための仕様を整理し、ベンダーへ伝えます。",
  },
  {
    label: "開発・運用",
    desc: "実装・リリース後の運用と継続改善を行います。",
  },
];

function ProcessFlow() {
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
        Process — プロダクトが形になるまで
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
        {PROCESS_STEPS.map((s, i) => (
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
                background: INK,
                color: "#ffffff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
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

function TimelineCompare() {
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
        Speed — 構想からプロトタイプまでの期間
      </div>

      <div style={{ marginBottom: "var(--space-5)" }}>
        <div
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "14px",
            fontWeight: 700,
            color: INK,
            marginBottom: "6px",
          }}
        >
          一般的な進め方
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              flex: 1,
              height: "20px",
              background: INK,
              opacity: 0.18,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 700,
              color: INK,
              whiteSpace: "nowrap",
            }}
          >
            2〜3ヶ月
          </span>
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "14px",
            fontWeight: 700,
            color: INK,
            marginBottom: "6px",
          }}
        >
          Curaggi
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "22%",
              height: "20px",
              background: TEAL,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 700,
              color: INK,
              whiteSpace: "nowrap",
            }}
          >
            最短2週間
          </span>
        </div>
      </div>
    </div>
  );
}

function DomainMap() {
  const cols = [
    {
      title: "戦略・要件定義領域",
      sub: "UX デザイン",
      desc: "見える部分の背景となる、企画構想〜要件定義の領域。",
      isOurs: true,
    },
    {
      title: "UI デザイン領域",
      sub: "Visual / Interaction",
      desc: "画面の色・画像・ボタン配置など、見える部分をつくる領域。",
      isOurs: false,
    },
    {
      title: "エンジニア領域",
      sub: "Implementation",
      desc: "設計に基づいて実装・運用する領域。",
      isOurs: false,
    },
  ];
  return (
    <div
      style={{
        margin: "var(--space-8) 0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
      }}
    >
      {cols.map((c, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            padding: "var(--space-5)",
            border: `2px solid ${INK}`,
            background: c.isOurs ? TEAL : "#ffffff",
          }}
        >
          {c.isOurs && (
            <span
              style={{
                position: "absolute",
                top: -10,
                left: 12,
                background: INK,
                color: "#ffffff",
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "2px 8px",
              }}
            >
              OUR FOCUS
            </span>
          )}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: INK,
              marginBottom: "8px",
            }}
          >
            {c.sub}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "18px",
              fontWeight: 800,
              color: INK,
              marginBottom: "8px",
            }}
          >
            {c.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "16px",
              color: INK,
              lineHeight: 1.7,
            }}
          >
            {c.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

function StrengthCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        padding: "var(--space-6) 0",
        borderTop: `2px solid ${TEAL}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            fontWeight: 800,
            color: TEAL,
            lineHeight: 1,
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "22px",
            fontWeight: 800,
            color: INK,
            lineHeight: 1.4,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-body), var(--font-jp)",
          fontSize: "16px",
          color: INK,
          lineHeight: 1.85,
        }}
      >
        {body}
      </div>
    </div>
  );
}

function PainPoint({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        margin: "var(--space-6) 0",
        paddingLeft: "var(--space-5)",
        borderLeft: `4px solid ${INK}`,
      }}
    >
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

function TableOfContents() {
  const items = [
    { href: "#section-1", label: "1. 議論が進まない場面ありませんか？" },
    { href: "#section-2", label: "2. 弊社の強み：意思決定・改善を高速化" },
    { href: "#section-3", label: "3. 事業領域ご紹介" },
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

export const article: Article = {
  title:
    "机上の空論に早くおさらば。 - 早く形にし、意思決定・カイゼンを高速化する",
  date: "2026-04-27",
  category: "Insight",
  tags: ["プロトタイピング", "UXデザイン", "AI活用", "事業領域"],
  summary:
    "資料ベースの議論では合意形成が進まない…。動くプロトタイプを最短2週間で形にし、意思決定と改善を高速化する Curaggi の支援アプローチをご紹介します。",
  slug: "rapid-prototyping",

  content: () => (
    <>
      <p style={{ fontSize: "16px", color: INK }}>
        パワーポイントの資料だけで議論を進めても、新規事業や新機能の合意形成はなかなか進みません。
        意思決定の手前で時間を溶かしてしまったり、実装後に「思っていたものと違う」という手戻りが発生してしまうことも少なくないのではないでしょうか。
      </p>
      <p style={{ fontSize: "16px", color: INK }}>
        本記事では、Curaggi が提供する
        <strong>爆速プロトタイピング支援</strong>
        について、3つのトピックでご紹介します。
      </p>

      <TableOfContents />

      {/* ────────────────────────────── */}
      <h2 id="section-1" style={{ color: INK }}>
        1. 議論が進まない場面ありませんか？
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        新規事業や新機能の検討を進める中で、こんな場面に心当たりはありませんか？
      </p>

      <ul style={{ fontSize: "16px", color: INK }}>
        <li style={{ color: INK }}>
          新規事業・新機能のアイデアが、資料ベースの議論では経営層や関連部署の合意を得にくい
        </li>
        <li style={{ color: INK }}>
          ユーザーテストやヒアリングを、机上の仮説ではなく実際に動くプロトタイプで実施したい
        </li>
        <li style={{ color: INK }}>
          ベンダー選定時の RFP/RFI 作成段階で、発注側の要件イメージが固まりきらず、提案の質にばらつきが出てしまう
        </li>
        <li style={{ color: INK }}>
          実装後に「思っていたものと違う」という手戻りが発生し、開発コストが膨らんでしまう
        </li>
      </ul>

      <h3 style={{ color: INK }}>なぜ、こうした事態が起きるのか</h3>

      <p style={{ fontSize: "16px", color: INK }}>
        プロダクトが形になるまでには、企画・構想から開発・運用まで多くのフェーズがあります。一般的な進め方では、それぞれの領域を別々の担当者・会社が担うことが多く、初期フェーズで十分な共通認識が築けないまま下流工程に進んでしまうケースが頻発します。
      </p>

      <ProcessFlow />

      <p style={{ fontSize: "16px", color: INK }}>
        そこで起きる代表的な「詰まり」は、次の3つです。
      </p>

      <PainPoint
        title="❶ 初期プロセスの机上空論が長引く"
        body="構想段階で「動かないモノ」しか提示できず、ステークホルダーの認識合わせに時間がかかります。期間とコストを掛けた割にアウトプットが低品質になってしまうケースが多く見られます。"
      />
      <PainPoint
        title="❷ 領域別に担当が分断され、橋渡し人材が不足"
        body="クライアントと各領域担当の間で言語が異なり、要件の解像度が落ちたまま下流に流れていきます。結果、後続フェーズで認識のズレが顕在化して炎上する事態が起きやすくなります。"
      />
      <PainPoint
        title="❸ 設計力なき AI 活用"
        body="AI を使ってもインプットの設計が雑だと、生成物は使い物になりません。AI で「速く作れる」ことと「価値あるものを作れる」ことは別物です。"
      />

      <blockquote style={{ color: INK }}>
        共通する原因は、ひとつ。<br />
        構想段階に「動くもの」がないこと。
      </blockquote>

      {/* ────────────────────────────── */}
      <h2 id="section-2" style={{ color: INK }}>
        2. 弊社の強み：意思決定・改善を高速化
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        Curaggi では、UX デザインの現場経験と AI 活用ノウハウを掛け合わせ、
        <strong>構想からプロトタイプまでを最短2週間</strong>
        で実現します。早期に「触れる・動く」プロトタイプがあることで、ステークホルダーの合意形成、ユーザー検証、ベンダー選定までのスピードと精度が段違いに変わります。
      </p>

      <TimelineCompare />

      <h3 style={{ color: INK }}>3つの強み</h3>

      <div style={{ borderBottom: `2px solid ${TEAL}` }}>
        <StrengthCard
          num="01"
          title="AI 活用で、高速かつ高品質"
          body="単に AI で「安く・早く」作るのではなく、UX デザイナーとしての設計思考に裏打ちされた AI 活用により、早期から高品質なアウトプットを形にします。"
        />
        <StrengthCard
          num="02"
          title="企画構想〜開発要件定義まで一貫支援"
          body="リサーチ・要件定義から、プロトタイピング、UI 設計、改善指示書まで一気通貫でご支援します。フェーズや領域をまたぐ「翻訳工数」を削減し、認識のズレを未然に防ぎます。"
        />
        <StrengthCard
          num="03"
          title="他領域との橋渡し"
          body="大手総合コンサルティングファーム・大手デジタルマーケティング代理店で現場を知り尽くした経験を活かし、コンサル・エンジニア・事業部門など他領域との橋渡しを担います。要件と実装、その間にある「認識のグレーゾーン」を埋める役割を果たします。"
        />
      </div>

      {/* ────────────────────────────── */}
      <h2 id="section-3" style={{ color: INK }}>
        3. 事業領域ご紹介
      </h2>

      <p style={{ fontSize: "16px", color: INK }}>
        Curaggi が支援するのは、プロダクト（アプリ / ウェブサイト / 社内システムなど）が形になるまでのプロセスのうち、
        <strong>UX（ユーザー体験）デザイン領域</strong>
        を中心とした上流〜中流工程です。
      </p>

      <DomainMap />

      <h3 style={{ color: INK }}>具体的な支援メニュー</h3>

      <ul style={{ fontSize: "16px", color: INK }}>
        <li style={{ color: INK }}>企画・構想 / 市場調査・ユーザーリサーチ</li>
        <li style={{ color: INK }}>ターゲット明確化 / ペルソナ・カスタマージャーニー設計</li>
        <li style={{ color: INK }}>コンセプト設計 / サービスブループリント</li>
        <li style={{ color: INK }}>画面の試作（プロトタイピング） / 動くモックの作成</li>
        <li style={{ color: INK }}>ユーザー検証・改善 / PoC・ユーザーテスト</li>
        <li style={{ color: INK }}>UI 設計 / デザインシステム構築 / CMS 設計</li>
        <li style={{ color: INK }}>開発要件定義 / RFP・RFI 作成支援</li>
        <li style={{ color: INK }}>AI / デザイン活用に関するセミナー・社内研修</li>
      </ul>

      <h3 style={{ color: INK }}>こんな企業様におすすめ</h3>

      <ul style={{ fontSize: "16px", color: INK }}>
        <li style={{ color: INK }}>
          新規事業・新機能の構想を、早期にステークホルダーと擦り合わせたい事業会社
        </li>
        <li style={{ color: INK }}>
          RFP/RFI 段階で要件イメージを固め、ベンダーへの伝達精度を上げたい発注企業
        </li>
        <li style={{ color: INK }}>
          AI を活用しつつも、安易な丸投げではなく価値ある成果物を作りたい組織
        </li>
        <li style={{ color: INK }}>
          UX デザイン / AI 活用について、社内のリテラシー向上を図りたい企業・スクール
        </li>
      </ul>

      <hr />

      <h2 style={{ color: INK }}>おわりに</h2>

      <p style={{ fontSize: "16px", color: INK }}>
        「机上の空論」を、できるだけ早く「動くプロトタイプ」に変える。
        それだけで、プロジェクト全体の質とスピードは大きく変わります。
      </p>
      <p style={{ fontSize: "16px", color: INK }}>
        プロジェクトの初期構想段階からのご相談、AI を活用した社内研修のご依頼など、
        お気軽にお問い合わせください。
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
