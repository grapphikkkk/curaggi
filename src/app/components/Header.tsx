import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "TOP" },
  { path: "/service", label: "Services" },
  { path: "/news", label: "Insight" },
  { path: "/company", label: "Company" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => (isOpen ? close() : open());

  const closedW = isMobile ? 100 : 150;
  const closedH = isMobile ? 50 : 80;
  const width = isOpen ? 300 : closedW;
  const height = isOpen ? 300 : closedH;

  // Faster choreography: width first on open, height first on close.
  const transition = isOpen
    ? "width 0.18s cubic-bezier(0.65,0,0.35,1) 0s, height 0.2s cubic-bezier(0.65,0,0.35,1) 0.14s"
    : "height 0.18s cubic-bezier(0.65,0,0.35,1) 0s, width 0.2s cubic-bezier(0.65,0,0.35,1) 0.14s";

  return (
    <header style={{ pointerEvents: "none" }} aria-label="Global navigation">
      {/* Glass top bar — fades in once the page is scrolled. Houses the
          left-side Curaggi logo; the menu floats on the right of the
          same band. */}
      <div
        aria-hidden={!isScrolled}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? "translateY(0)" : "translateY(-100%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 90,
          pointerEvents: isScrolled ? "auto" : "none",
        }}
      >
        <Link
          to="/"
          aria-label="Curaggi top"
          style={{
            position: "absolute",
            top: "50%",
            left: 24,
            transform: "translateY(-50%)",
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/logos/logo.svg"
            alt="Curaggi"
            style={{ height: "26px", width: "auto", display: "block" }}
          />
        </Link>
      </div>

      {/* Floating hamburger / panel */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 100,
          pointerEvents: "auto",
        }}
      >
        <div
          onMouseEnter={isMobile ? undefined : open}
          onMouseLeave={isMobile ? undefined : close}
          style={{
            position: "relative",
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: "calc(100vw - 40px)",
            background: "#000000",
            borderRadius: "5px",
            transition,
            overflow: "hidden",
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
          }}
        >
          {/* Hamburger button (closed state) */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: `${closedW}px`,
              height: `${closedH}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: isOpen ? 0 : 1,
              pointerEvents: isOpen ? "none" : "auto",
              transition: "opacity 0.14s ease",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: isMobile ? "5px" : "7px",
                width: isMobile ? "22px" : "28px",
              }}
            >
              <span style={lineStyle} />
              <span style={lineStyle} />
              <span style={lineStyle} />
            </span>
          </button>

          {/* Menu (open state) */}
          <nav
            aria-hidden={!isOpen}
            style={{
              position: "absolute",
              inset: 0,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              transition: `opacity 0.18s ease ${isOpen ? "0.22s" : "0s"}`,
            }}
          >
            {navItems.map((item) => {
              const isCurrent = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={close}
                  className="nav-link"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "6px 12px",
                    paddingLeft: "26px",
                    borderRadius: "4px",
                    fontFamily: "var(--font-display)",
                    fontSize: "24px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                    color: "#ffffff",
                    background: "transparent",
                    transition: "background 0.15s ease, color 0.15s ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="nav-dot"
                    style={{
                      position: "absolute",
                      left: 4,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      opacity: isCurrent ? 1 : 0,
                      transition: "background 0.15s ease",
                    }}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <style>{`
        /* Hover state via real pointer hover only — touch devices won't
           fake-fire mouseenter and accidentally highlight the wrong row. */
        @media (hover: hover) {
          .nav-link:hover {
            background: var(--scintilla-yellow) !important;
            color: #0A0A0B !important;
          }
          .nav-link:hover .nav-dot {
            background: #0A0A0B !important;
          }
        }
      `}</style>
    </header>
  );
}

const lineStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "2px",
  background: "#ffffff",
  borderRadius: "1px",
};
