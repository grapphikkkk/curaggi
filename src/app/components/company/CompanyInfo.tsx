export function CompanyInfo() {
  const info: { label: string; value: React.ReactNode }[] = [
    {
      label: "会社名",
      value: "株式会社Curaggi — クラッヂ",
    },
    {
      label: "事業内容",
      value: (
        <ul
          style={{
            paddingLeft: "var(--space-5)",
            margin: 0,
            lineHeight: 1.9,
            listStyleType: "disc",
            listStylePosition: "outside",
          }}
        >
          <li style={{ listStyleType: "disc" }}>
            インターネット等の通信ネットワーク及び電子技術を利用した各種情報提供サービス及び情報収集サービス
          </li>
          <li style={{ listStyleType: "disc" }}>
            ＥＣ（電子商取引）サイト、アプリ、その他各種ウェブサイトの企画、デザイン、制作、販売、配信、運営及び管理
          </li>
          <li style={{ listStyleType: "disc" }}>
            UI(ユーザーインターフェース)・UX(ユーザーエクスペリエンス)デザイン・サービスデザイン・デザインスプリント領域におけるコンサルティング業務
          </li>
          <li style={{ listStyleType: "disc" }}>
            研修、セミナー、講演会、講習会等の各種催事の企画、立案、実施、運営及びそれらに関するコンサルティング業務
          </li>
          <li style={{ listStyleType: "disc" }}>性別・性的指向・人種問題に関する啓発活動</li>
          <li style={{ listStyleType: "disc" }}>各種イベントの企画、運営の請負及び飲食店の予約代行業務</li>
          <li style={{ listStyleType: "disc" }}>前各号に附帯関連する一切の事業</li>
        </ul>
      ),
    },
    {
      label: "設立",
      value: "2026年4月",
    },
    {
      label: "所在地",
      value: (
        <>
          〒160-0023
          <br />
          東京都新宿区西新宿3丁目3番13号 西新宿水間ビル2F
        </>
      ),
    },
  ];

  return (
    <section
      style={{
        paddingTop: "var(--space-20)",
        paddingBottom: "var(--space-20)",
        borderTop: "1px solid #E2E2E8",
        background: "#ffffff",
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
            color: "#0A0A0B",
          }}
        >
          — Information
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), var(--font-jp)",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#0A0A0B",
            marginBottom: "var(--space-16)",
          }}
        >
          会社概要
        </h2>

        <dl style={{ margin: 0 }} className="company-info">
          {info.map((item, index) => (
            <div
              key={index}
              className="company-info__row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 200px) 1fr",
                gap: "var(--space-8)",
                padding: "var(--space-6) 0",
                borderTop: "1px solid #E2E2E8",
                borderBottom: index === info.length - 1 ? "1px solid #E2E2E8" : "none",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  letterSpacing: "var(--tracking-wider)",
                  textTransform: "uppercase",
                  color: "#5E5E6B",
                  paddingTop: "0.2em",
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-base)",
                  color: "#0A0A0B",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .company-info__row {
            grid-template-columns: 1fr !important;
            gap: var(--space-2) !important;
          }
        }
      `}</style>
    </section>
  );
}
