export function DesignThinkingApproach() {
  const phases = [
    {
      title: "Discover",
      description: "状況と声をひらく",
      color: "coral",
    },
    {
      title: "Define",
      description: "課題とゴールを整理する",
      color: "teal",
    },
    {
      title: "Design",
      description: "体験と選択肢を設計する",
      color: "violet",
    },
    {
      title: "Deliver",
      description: "形にして、届く状態へ",
      color: "amber",
    },
  ];

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--space-16)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.875rem, 5vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--neutral-900)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-4)",
            }}
          >
            Design Thinking Approach
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), var(--font-jp)",
              fontSize: "var(--text-lg)",
              color: "var(--neutral-600)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Curaggiはデザインシンキングのアプローチを基盤に、
            <br />
            すべてのプロジェクトを推進します。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {phases.map((phase, index) => {
            const tagClass = `tag--${phase.color}`;

            return (
              <div
                key={index}
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-8)",
                  border: "1px solid var(--neutral-200)",
                  textAlign: "center",
                  transition: "all var(--duration-normal) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--elevation-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--neutral-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 700,
                    color: "var(--neutral-600)",
                    margin: "0 auto var(--space-4)",
                  }}
                >
                  {index + 1}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 600,
                    color: "var(--neutral-900)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {phase.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body), var(--font-jp)",
                    fontSize: "var(--text-sm)",
                    color: "var(--neutral-600)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
