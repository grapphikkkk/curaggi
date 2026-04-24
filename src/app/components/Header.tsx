import { Link, useLocation } from "react-router";
import { useState } from "react";

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
  const [hoverPath, setHoverPath] = useState<string | null>(null);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setHoverPath(null);
  };
  const toggle = () => (isOpen ? close() : open());

  const width = isOpen ? 300 : 150;
  const height = isOpen ? 300 : 80;

  // Different transition choreography: width first on open, height first on close.
  const transition = isOpen
    ? "width 0.28s cubic-bezier(0.65,0,0.35,1) 0s, height 0.3s cubic-bezier(0.65,0,0.35,1) 0.22s"
    : "height 0.28s cubic-bezier(0.65,0,0.35,1) 0s, width 0.3s cubic-bezier(0.65,0,0.35,1) 0.22s";

  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 100,
      }}
      aria-label="Global navigation"
    >
      <div
        onMouseEnter={open}
        onMouseLeave={close}
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
            width: "150px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? "none" : "auto",
            transition: "opacity 0.18s ease",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: "7px",
              width: "28px",
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
            transition: `opacity 0.2s ease ${isOpen ? "0.4s" : "0s"}`,
          }}
        >
          {navItems.map((item) => {
            const isCurrent = location.pathname === item.path;
            const isHover = hoverPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={close}
                onMouseEnter={() => setHoverPath(item.path)}
                onMouseLeave={() => setHoverPath(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  color: isHover ? "#0A0A0B" : "#ffffff",
                  background: isHover ? "var(--scintilla-yellow)" : "transparent",
                  transition:
                    "background 0.15s ease, color 0.15s ease",
                  paddingLeft: "26px",
                }}
              >
                <span
                  aria-hidden="true"
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
                  }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
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
