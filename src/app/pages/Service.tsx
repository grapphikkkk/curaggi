import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ServiceCard } from "../components/service/ServiceCard";
import { DesignThinkingApproach } from "../components/service/DesignThinkingApproach";

export function Service() {
  const services = [
    {
      title: "サービスデザイン",
      description: "リサーチ・コンセプト設計・トーン＆マナーの定義など、実装の前段階となる設計フェーズの支援をします。",
      color: "violet" as const,
    },
    {
      title: "爆速プロトタイピング",
      description: "スピード感を重視したプロトタイピングで、アイデアの可視化・検証を早期に実現します。",
      color: "coral" as const,
    },
    {
      title: "UXUI改善支援",
      description: "ただ見た目が良いWEBやAppではなく全体の構造・導線設計から改善の支援をします",
      color: "teal" as const,
    },  
    {
      title: "デザイン思考セミナー",
      description: "デザイン思考のアプローチを実戦形式で学び、デザイン組織強化に貢献します。",
      color: "amber" as const,
    },
    {
      title: "自社開発プロダクト",
      description: "Curaggi独自のプロダクト・サービスを開発します。",
      color: "blue" as const,
    },
    {
      title: "社会課題解決デザイン",
      description: "社会課題に対し、デザインの力で新しい選択肢を生み出します。",
      color: "coral" as const,
    },
  ];

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--neutral-900)",
                  letterSpacing: "var(--tracking-tight)",
                  marginBottom: "var(--space-4)",
                }}
              >
                Service
              </h1>
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
                事業領域のご案内
              </p>
            </div>

            {/* Service Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "var(--space-6)",
              }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Design Thinking Approach */}
        <DesignThinkingApproach />
      </main>
      <Footer />
    </div>
  );
}
