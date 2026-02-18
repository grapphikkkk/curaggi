interface ServiceCardProps {
  title: string;
  description: string;
  color: "coral" | "teal" | "violet" | "amber" | "lime" | "blue";
}

export function ServiceCard({ title, description, color }: ServiceCardProps) {
  const colorMap = {
    coral: {
      tag: "tag--coral",
      gradient: "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,171,64,0.15))",
    },
    teal: {
      tag: "tag--teal",
      gradient: "linear-gradient(135deg, rgba(38,198,218,0.15), rgba(66,165,245,0.15))",
    },
    violet: {
      tag: "tag--violet",
      gradient: "linear-gradient(135deg, rgba(171,71,188,0.15), rgba(255,107,107,0.15))",
    },
    amber: {
      tag: "tag--amber",
      gradient: "linear-gradient(135deg, rgba(255,171,64,0.15), rgba(156,204,101,0.15))",
    },
    lime: {
      tag: "tag--lime",
      gradient: "linear-gradient(135deg, rgba(156,204,101,0.15), rgba(38,198,218,0.15))",
    },
    blue: {
      tag: "tag--blue",
      gradient: "linear-gradient(135deg, rgba(66,165,245,0.15), rgba(171,71,188,0.15))",
    },
  };

  return (
    <div className="card">
      <div
        style={{
          height: "160px",
          background: colorMap[color].gradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            top: "-20px",
            right: "-20px",
          }}
          aria-hidden="true"
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__desc">{description}</p>
      </div>
    </div>
  );
}
