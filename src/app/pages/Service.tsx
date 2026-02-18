import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ServiceCard } from "../components/service/ServiceCard";
import { DesignThinkingApproach } from "../components/service/DesignThinkingApproach";

export function Service() {
  const services = [
    {
      title: "UXデザイン",
      description: "ユーザー中心の体験設計により、使いやすく価値あるサービスを実現します。",
      color: "coral" as const,
    },
    {
      title: "デザインリサーチ",
      description: "当事者の声を深く聴き、真のニーズを発見するリサーチを実施します。",
      color: "teal" as const,
    },
    {
      title: "デザインプロセス設計",
      description: "組織に適したデザインプロセスを構築し、持続可能な体制を支援します。",
      color: "violet" as const,
    },
    {
      title: "デザインシンキング研修 / セミナー",
      description: "デザイン思考の実践的な研修で、チームの創造力を引き出します。",
      color: "amber" as const,
    },
    {
      title: "コミュニティ設計",
      description: "人と人がつながり、支え合えるコミュニティの仕組みをデザインします。",
      color: "lime" as const,
    },
    {
      title: "自社開発プロダクト",
      description: "社会課題解決に向けた独自のプロダクト・サービスを開発します。",
      color: "blue" as const,
    },
    {
      title: "社会課題解決デザイン",
      description: "制度や構造の課題に対し、デザインの力で新しい選択肢を生み出します。",
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
                デザインの力で、選択肢と勇気を増やす
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
