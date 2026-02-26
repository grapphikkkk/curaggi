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
              marginBottom: "var(--space-8)",
            }}
          >
            社名"Curaggi"の由来
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "16px",
              color: "var(--neutral-700)",
              lineHeight: "var(--leading-relaxed)",
              textAlign: "left",
            }}
          >
            代表のアナザースカイであるマルタ語 Kuraġġ、そしてイタリア語 coraggio。
            どちらも"勇気"を意味し、その響きと想いを重ねた言葉です。
          </p>
        </div>
      </div>
    </section>
  );
}
