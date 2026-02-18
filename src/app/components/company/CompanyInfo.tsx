export function CompanyInfo() {
  const info = [
    { label: "会社名", value: "Curaggi" },
    { label: "事業内容", value: "デザインを通じた社会・当事者支援" },
    { label: "設立", value: "—" },
    { label: "所在地", value: "—" },
  ];

  return (
    <section className="section">
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
          会社概要
        </h2>

        <div
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--neutral-200)",
            overflow: "hidden",
          }}
        >
          {info.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: "var(--space-6)",
                padding: "var(--space-6)",
                borderBottom: index < info.length - 1 ? "1px solid var(--neutral-100)" : "none",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--neutral-600)",
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-base)",
                  color: "var(--neutral-900)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
