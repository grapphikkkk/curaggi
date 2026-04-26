import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Service = {
  number: string;
  label: string;
  title: string;
  titleEn: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
};

const services: Service[] = [
  {
    number: "01",
    label: "Rapid Prototyping",
    title: "高速プロトタイピング支援",
    titleEn: "From slides to working prototypes.",
    summary:
      "企画構想からプロトタイピングまで、通常2〜3か月を要するプロセスをAI活用により最短2週間・標準1か月へ短縮。パワーポイントでは伝わりにくい新規サービスや機能のアイデアを、早期に「触れる・動く」プロトタイプとして可視化し、社内外の合意形成と検証精度を同時に高めます。",
    points: [
      "UXデザイナーがリサーチ・要件定義から一貫設計。「速いだけの雑なプロトタイプ」にならない",
      "構想〜プロトタイプを最短2週間で形にし、意思決定サイクルを高速化",
      "動くモノによるユーザーテスト・PoCで、実装後の手戻りを最小化",
      "RFP/RFI段階のUIモックで、ベンダーへの要件伝達精度を向上",
    ],
    image: "/images/service-prototype.jpg",
    imageAlt: "Sticky notes and prototyping workshop",
  },
  {
    number: "02",
    label: "UX Design",
    title: "UXデザイン支援",
    titleEn: "End-to-end experience design.",
    summary:
      "AsIs現状調査・ユーザーリサーチ・デザインスプリントといった要件定義フェーズから、サービスブループリント設計・UI設計・改善指示書作成まで、UXデザインの全領域にわたる支援を提供。ステークホルダー調整や合意形成資料の作成など、プロジェクト推進に必要なコミュニケーション設計も得意としています。",
    points: [
      "大手デジタルマーケティング代理店・大手総合コンサルティングファームでの現場経験",
      "金融・通信・製薬・小売・自動車・流通・電力・官公庁等の幅広い業界実績",
      "デザインシステム構築・CMS設計・サービスブループリント作成",
      "上流の企画構想から開発要件定義まで一気通貫で支援",
    ],
    image: "/images/service-ux.jpg",
    imageAlt: "Designer working at computer",
  },
  {
    number: "03",
    label: "Seminar",
    title: "AI活用セミナー講師",
    titleEn: "Design × AI, taught from the field.",
    summary:
      "「AIを使いこなすための『設計力』— ただ作るだけでは終わらせない」をテーマに、企業向け研修・Udemy等のオンライン学習プラットフォームでセミナー講師として活動。AIに丸投げして作らせるのではなく、ユーザー起点の設計思考とAIを掛け合わせることで、本当に価値あるアウトプットを生み出す方法論を伝えています。",
    points: [
      "Claude・Figma Make・Gemini等の実戦活用ノウハウ",
      "単なるツール紹介ではなく、デザインプロセスに裏打ちされたAI活用",
      "企業研修・カンファレンス登壇・オンライン講座など柔軟な提供形態",
    ],
    image: "/images/service-seminar.jpg",
    imageAlt: "Presenter at a seminar",
  },
  {
    number: "04",
    label: "Community",
    title: "自社サービス開発・コミュニティ事業",
    titleEn: "Building what we believe in.",
    summary:
      "LGBT（ゲイ・バイセクシュアル）男性向けの少人数グループディナーコミュニティをはじめ、Claude CodeとFigma Makeを駆使して自社サービスを企画・実装・運用。リアルで会って話すことで友達をつくる、という当事者の課題に応える新しいコミュニティを自ら立ち上げ、グロースさせています。",
    points: [
      "3〜5人の少人数グループで食事をしながら友達をつくるリアル型コミュニティ",
      "Figma Make / Claude Code / Next.js / Supabase / Stripe を駆使したゼロイチ開発",
      "β版ローンチ2週間で会員60人超・予約20件を達成",
      "SNS運用・リアルコミュニティへのアプローチも自社で一気通貫",
    ],
    image: "/images/service-community.jpg",
    imageAlt: "Small group dining together",
  },
];

export function Service() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px", background: "#ffffff", color: "#0A0A0B" }}>
        {/* HERO */}
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
              — Service
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
              事業領域
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
              UXデザイン × AI活用で、構想から実装まで一気通貫。
              <br />
              Curaggiが提供する4つの事業領域をご紹介します。
            </p>
          </div>
        </section>

        {/* SERVICES LIST */}
        {services.map((service, idx) => (
          <ServiceBlock key={service.number} service={service} reverse={idx % 2 === 1} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

function ServiceBlock({ service, reverse }: { service: Service; reverse: boolean }) {
  return (
    <section
      style={{
        borderTop: "1px solid #E2E2E8",
        paddingTop: "var(--space-20)",
        paddingBottom: "var(--space-20)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "var(--space-16)",
            alignItems: "center",
          }}
          className="service-grid"
        >
          <div style={{ order: reverse ? 2 : 1 }} className="service-text">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "var(--space-4)",
                marginBottom: "var(--space-6)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#0A0A0B",
                }}
              >
                {service.number}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  letterSpacing: "var(--tracking-wider)",
                  textTransform: "uppercase",
                  color: "#5E5E6B",
                }}
              >
                {service.label}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "var(--space-4)",
              }}
            >
              {service.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "#5E5E6B",
                marginBottom: "var(--space-8)",
              }}
            >
              {service.titleEn}
            </p>

            <p
              style={{
                fontFamily: "var(--font-body), var(--font-jp)",
                fontSize: "var(--text-base)",
                color: "#44444F",
                lineHeight: 1.9,
                marginBottom: "var(--space-8)",
              }}
            >
              {service.summary}
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {service.points.map((p, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body), var(--font-jp)",
                    fontSize: "var(--text-sm)",
                    color: "#2D2D35",
                    lineHeight: 1.7,
                    paddingLeft: "var(--space-6)",
                    position: "relative",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.6em",
                      width: "12px",
                      height: "1px",
                      background: "#0A0A0B",
                    }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ order: reverse ? 1 : 2 }} className="service-image">
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                background: "#F0F0F4",
              }}
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%) contrast(1.05)",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .service-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-10) !important;
          }
          .service-text {
            order: 1 !important;
          }
          .service-image {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
