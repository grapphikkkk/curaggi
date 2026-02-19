export function ShortContext() {
  return (
    <section className="section" style={{ position: "relative", zIndex: 2 }}>
      <div className="container">
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(1.875rem, 5vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--neutral-900)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-12)",
            }}
          >
            「選べない」を、当たり前にしない。
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
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
              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-700)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                知らないことが、選択肢を狭めることがある
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
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
              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-700)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                周囲の前提が、勇気を奪うことがある
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-4)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--curaggi-amber)",
                  marginTop: "var(--space-2)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-700)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                だからこそ「見える化」と「設計」が効く
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
