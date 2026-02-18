import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/service", label: "Service" },
    { path: "/news", label: "News / Insight" },
    { path: "/company", label: "Company" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--neutral-200)" : "1px solid transparent",
        transition: "all var(--duration-normal) var(--ease-out)",
      }}
    >
      <div className="container">
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 800,
              color: "var(--neutral-900)",
              textDecoration: "none",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Curaggi
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "none",
              gap: "var(--space-1)",
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-sm)",
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  color: location.pathname === item.path ? "var(--neutral-900)" : "var(--neutral-600)",
                  textDecoration: "none",
                  padding: "var(--space-2) var(--space-4)",
                  borderRadius: "var(--radius-full)",
                  background: location.pathname === item.path ? "var(--neutral-100)" : "transparent",
                  transition: "all var(--duration-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    (e.target as HTMLElement).style.background = "var(--neutral-50)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--neutral-900)",
            }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className="mobile-nav"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "var(--space-2)",
              paddingBottom: "var(--space-6)",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-base)",
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  color: location.pathname === item.path ? "var(--neutral-900)" : "var(--neutral-600)",
                  textDecoration: "none",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  background: location.pathname === item.path ? "var(--neutral-100)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
