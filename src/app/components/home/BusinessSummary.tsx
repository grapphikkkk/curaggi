export function BusinessSummary() {
  const areas = [
    {
      title: "Design",
      description: "体験・情報・意思決定の設計",
      color: "coral",
    },
    {
      title: "Society",
      description: "制度や構造の中で起きる摩擦の再設計",
      color: "teal",
    },
    {
      title: "People（当事者）",
      description: "声になりにくいニーズを中心に置く",
      color: "violet",
    },
  ];

  return (
    <section 
      className="section" 
      style={{ 
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        position: "relative",
        zIndex: 2,
      }}
    >
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
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--neutral-900)",
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-3)",
            }}
          >
            事業領域サマリー
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {areas.map((area, index) => (
            <div
              key={index}
              className="card"
              style={{
                padding: "var(--space-8)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-lg)",
                  background:
                    area.color === "coral"
                      ? "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,171,64,0.15))"
                      : area.color === "teal"
                      ? "linear-gradient(135deg, rgba(38,198,218,0.15), rgba(66,165,245,0.15))"
                      : "linear-gradient(135deg, rgba(171,71,188,0.15), rgba(255,107,107,0.15))",
                  margin: "0 auto var(--space-5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-2xl)",
                }}
                aria-hidden="true"
              >
                {area.color === "coral" ? "🎨" : area.color === "teal" ? "🌏" : "👥"}
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
                {area.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body), var(--font-jp)",
                  fontSize: "var(--text-sm)",
                  color: "var(--neutral-600)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
