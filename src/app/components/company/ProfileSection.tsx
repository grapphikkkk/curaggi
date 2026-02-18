export function ProfileSection() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.875rem, 5vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--neutral-900)",
            letterSpacing: "var(--tracking-tight)",
            marginBottom: "var(--space-12)",
          }}
        >
          代表プロフィール
        </h2>

        <div
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-10)",
            border: "1px solid var(--neutral-200)",
          }}
        >
          {/* Introduction */}
          <div
            style={{
              marginBottom: "var(--space-8)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body), var(--font-jp)",
                fontSize: "var(--text-lg)",
                color: "var(--neutral-700)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              デザインを軸に社会構造と向き合い、当事者視点の体験設計を行う。
            </p>
          </div>

          {/* Career */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                color: "var(--neutral-900)",
                marginBottom: "var(--space-4)",
              }}
            >
              経歴
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--curaggi-coral)",
                    marginTop: "var(--space-2)",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--neutral-900)",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    2018年 電通デジタル入社
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body), var(--font-jp)",
                      fontSize: "var(--text-sm)",
                      color: "var(--neutral-600)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    大手クライアントのUX / サービスデザイン支援に従事
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--curaggi-teal)",
                    marginTop: "var(--space-2)",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--neutral-900)",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    2023年 Accenture Song入社
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body), var(--font-jp)",
                      fontSize: "var(--text-sm)",
                      color: "var(--neutral-600)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    企業変革・CX戦略・体験設計プロジェクトを担当
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
