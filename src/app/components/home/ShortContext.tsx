export function ShortContext() {
  return (
    <section
      className="section"
      style={{
        position: "relative",
        zIndex: 2,
        background: "#0A0A0B",
        color: "#ffffff",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              marginBottom: "var(--space-6)",
              color: "#ffffff",
              opacity: 0.7,
            }}
          >
            — About the name
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display), var(--font-jp)",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "var(--space-10)",
              color: "#ffffff",
            }}
          >
            Curaggi
            <span
              style={{
                display: "block",
                fontSize: "0.3em",
                fontWeight: 400,
                letterSpacing: "0.05em",
                marginTop: "var(--space-4)",
                opacity: 0.6,
              }}
            >
              /kuˈrad.dʒi/ — クラッヂ
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "var(--text-lg)",
              color: "#ffffff",
              opacity: 0.85,
              lineHeight: 1.9,
              maxWidth: "680px",
            }}
          >
            代表のアナザースカイであるマルタ語 <em>Kuraġġ</em>、そしてイタリア語 <em>coraggio</em>。どちらも&quot;勇気&quot;を意味し、その響きと想いを重ねた言葉です。
          </p>
        </div>
      </div>
    </section>
  );
}
