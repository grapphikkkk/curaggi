type CareerEntry = {
  period: string;
  organization: string;
  description: string;
};

const careers: CareerEntry[] = [
  {
    period: "2013 — 2018",
    organization: "早稲田大学",
    description:
      "東進ハイスクールやイトマンスイミングスクールのWEB制作（デザイン・コーディング）やディレクションを経験し、デジタル業界へ興味をもつ。",
  },
  {
    period: "2018 — 2023",
    organization: "大手デジタルマーケティング代理店",
    description:
      "様々な業界・業種の大手企業向けにUXデザインに必要なプロセス（定性・定量調査、アイディエーションワークショップ、ユーザー検証設計・実査・モデレーション、企画）のプロジェクト推進・デザインシステム構築・CMS設計などの要件定義に従事。",
  },
  {
    period: "2023 — 2026",
    organization: "大手総合コンサルティングファーム",
    description:
      "主に社内システム等toB向けのUX・サービスデザイナーとして、生成AIを活用した業務プロダクトの体験設計、Figma Makeを活用した高速プロトタイピングによる意思決定の推進、関係者との調整・コミュニケーション、エンジニア開発Tと密に連携した要件定義を実施。",
  },
  {
    period: "2026.04 —",
    organization: "株式会社Curaggi",
    description:
      "代表取締役として、UX設計力とAI活用力を活かしたバイブコーディングで自社プロダクトを企画から実装まで一人でローンチし運用中。",
  },
];

export function ProfileSection() {
  return (
    <section
      style={{
        background: "#0A0A0B",
        color: "#ffffff",
        paddingTop: "var(--space-24)",
        paddingBottom: "var(--space-24)",
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
            opacity: 0.7,
          }}
        >
          — Profile
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            marginBottom: "var(--space-4)",
          }}
        >
          Yuta Nishi
        </h2>
        <p
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            fontWeight: 500,
            color: "#ffffff",
            opacity: 0.7,
            marginBottom: "var(--space-16)",
            letterSpacing: "-0.01em",
          }}
        >
          西 湧太 — 株式会社Curaggi 代表 / UXデザイナー・サービスデザイナー / Claude AI活用講師
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
            gap: "var(--space-12)",
            alignItems: "start",
          }}
          className="profile-grid"
        >
          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "var(--text-base)",
              color: "#ffffff",
              opacity: 0.85,
              lineHeight: 1.9,
            }}
          >
            UX/UIデザイン・体験設計の専門家。大手デジタルマーケティング代理店にて約6年間、金融・通信・製薬・小売・自動車・流通・電力・官公庁等の大手企業向けにUXリサーチ・体験設計・デザインシステム構築・CMS設計を推進。大手総合コンサルティングファームではサービスデザイナーとして、生成AI導入に伴う従業員体験向上や基幹システム刷新に伴うコールセンター業務のUX設計を担当。2026年4月に株式会社Curaggiを創業。
          </p>

          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                marginBottom: "var(--space-8)",
                opacity: 0.6,
              }}
            >
              — Career
            </div>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {careers.map((c, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: "var(--space-6)",
                    padding: "var(--space-6) 0",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    borderBottom:
                      i === careers.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                  }}
                  className="career-row"
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      opacity: 0.7,
                      paddingTop: "0.2em",
                    }}
                  >
                    {c.period}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display), var(--font-jp)",
                        fontSize: "var(--text-lg)",
                        fontWeight: 600,
                        marginBottom: "var(--space-2)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.organization}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body), var(--font-jp)",
                        fontSize: "var(--text-sm)",
                        color: "#ffffff",
                        opacity: 0.75,
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {c.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          .career-row {
            grid-template-columns: 1fr !important;
            gap: var(--space-2) !important;
          }
        }
      `}</style>
    </section>
  );
}
