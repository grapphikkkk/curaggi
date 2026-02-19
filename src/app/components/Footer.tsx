import { Link } from "react-router";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--neutral-200)",
        marginTop: "var(--space-32)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-12)",
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-20)",
          }}
          className="footer-grid"
        >
          {/* Logo & Vision */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 800,
                color: "var(--neutral-900)",
                marginBottom: "var(--space-3)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Curaggi
            </div>
            <p
              style={{
                fontFamily: "var(--font-display), var(--font-jp)",
                fontSize: "var(--text-lg)",
                color: "var(--neutral-600)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              選択肢と勇気をデザインする
            </p>
          </div>

          {/* Navigation Links */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--neutral-900)",
                  marginBottom: "var(--space-4)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                }}
              >
                Site
              </h3>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
              >
                {[
                  { path: "/", label: "Home" },
                  { path: "/service", label: "Service" },
                  { path: "/news", label: "News / Insight" },
                  { path: "/company", label: "Company" },
                  { path: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--neutral-600)",
                      textDecoration: "none",
                      transition: "color var(--duration-fast) var(--ease-out)",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "var(--neutral-900)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--neutral-600)";
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--neutral-900)",
                  marginBottom: "var(--space-4)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                }}
              >
                Vision
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--neutral-600)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                あきらめなくていい<br />世界をつくる
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--neutral-200)",
            paddingTop: "var(--space-6)",
            paddingBottom: "var(--space-6)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--neutral-400)",
            }}
          >
            &copy; 2026 Curaggi Inc. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 2fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
