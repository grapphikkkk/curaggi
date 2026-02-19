import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";

interface Shape {
  id: number;
  color: string;
  size: number;
  startX: number;
  startY: number;
  duration: number;
  opacity: number;
  type: "blob" | "circle" | "polygon" | "triangle" | "hexagon" | "line" | "gradient-mesh";
  rotation?: number;
  randomOffset: number;
  strokeWidth?: number;
  hasPattern?: "gradient" | "mesh" | "dots" | "stripes" | "none";
}

function generateRandomShapes(): Shape[] {
  const colors = [
    "var(--curaggi-coral)",
    "var(--curaggi-coral-light)",
    "var(--curaggi-coral-dark)",
    "var(--curaggi-amber)",
    "var(--curaggi-amber-light)",
    "var(--curaggi-amber-dark)",
    "var(--curaggi-teal)",
    "var(--curaggi-teal-light)",
    "var(--curaggi-teal-dark)",
    "var(--curaggi-violet)",
    "var(--curaggi-violet-light)",
    "var(--curaggi-violet-dark)",
    "var(--curaggi-lime)",
    "var(--curaggi-lime-light)",
    "var(--curaggi-lime-dark)",
    "var(--curaggi-blue)",
    "var(--curaggi-blue-light)",
    "var(--curaggi-blue-dark)",
  ];

  const shapes: Shape[] = [];
  const shapeCount = 32;

  for (let i = 0; i < shapeCount; i++) {
    const sizeVariations = [40, 60, 90, 120, 160, 200, 250, 300, 350, 420];
    const typeOptions: Array<"blob" | "circle" | "polygon" | "triangle" | "hexagon" | "line" | "gradient-mesh"> = [
      "blob",
      "circle",
      "polygon",
      "triangle",
      "hexagon",
      "line",
      "gradient-mesh",
    ];
    const patternOptions: Array<"gradient" | "mesh" | "dots" | "stripes" | "none"> = [
      "gradient",
      "mesh",
      "dots",
      "stripes",
      "none",
    ];
    const randomOffset = Math.random();

    // 透過度をより濃い範囲でバラバラにする（0.3～1.0）
    const opacityOptions = [0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0];
    const opacity = opacityOptions[Math.floor(Math.random() * opacityOptions.length)];

    shapes.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizeVariations[Math.floor(Math.random() * sizeVariations.length)],
      startX: Math.random() * 140 - 40,
      startY: Math.random() * 200 - 40,
      duration: 7 + Math.random() * 16,
      opacity,
      type: typeOptions[Math.floor(Math.random() * typeOptions.length)],
      rotation: Math.random() * 360,
      randomOffset,
      strokeWidth: 1 + Math.random() * 4,
      hasPattern: patternOptions[Math.floor(Math.random() * patternOptions.length)],
    });
  }

  return shapes;
}

function GeometricShape({
  shape,
  scrollY,
}: {
  shape: Shape;
  scrollY: any;
}) {
  // ShortContext セクション到達時のしきい値
  const TRIGGER_SCROLL = 500;

  // スクロール値をベースに各図形が異なるタイミングで動きます
  const y = useTransform(
    scrollY,
    [0, 1200],
    [0, 400 + shape.randomOffset * 200]
  );
  
  // 最初は拡大なし（scale=1）、TRIGGER_SCROLL (500px) 以後に 0.1 に段階的に縮小
  const scale = useTransform(
    scrollY,
    [0, 500, 550, 600, 650, 700, 750, 800, 850, 900],
    [1, 1, 0.95, 0.85, 0.75, 0.6, 0.4, 0.25, 0.15, 0.1]
  );
  
  const rotate = useTransform(scrollY, [0, 800], [shape.rotation || 0, (shape.rotation || 0) + 360]);
  
  // TRIGGER_SCROLL 以後、段階的に左右に強く分散
  const x = useTransform(
    scrollY,
    [0, 500, 550, 600, 650, 700, 750, 800, 850, 900],
    [
      0,
      0,
      (shape.randomOffset - 0.5) * 200,
      (shape.randomOffset - 0.5) * 400,
      (shape.randomOffset - 0.5) * 600,
      (shape.randomOffset - 0.5) * 900,
      (shape.randomOffset - 0.5) * 1200,
      (shape.randomOffset - 0.5) * 1500,
      (shape.randomOffset - 0.5) * 1800,
      (shape.randomOffset - 0.5) * 2000
    ]
  );

  const getPatternId = () => `pattern-${shape.id}`;

  const getShapeStyle = () => {
    const baseStyle: any = {
      position: "absolute",
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      opacity: shape.opacity,
      left: `${shape.startX}%`,
      top: `${shape.startY}%`,
    };

    // パターン適用
    if (shape.hasPattern !== "none") {
      if (shape.hasPattern === "gradient") {
        baseStyle.background = `linear-gradient(
          ${shape.rotation || 45}deg,
          ${shape.color} 0%,
          rgba(255,255,255,0.3) 50%,
          ${shape.color} 100%
        )`;
      } else if (shape.hasPattern === "mesh") {
        baseStyle.background = `
          repeating-linear-gradient(
            0deg,
            ${shape.color},
            ${shape.color} 2px,
            transparent 2px,
            transparent 4px
          ),
          repeating-linear-gradient(
            90deg,
            ${shape.color},
            ${shape.color} 2px,
            transparent 2px,
            transparent 4px
          )
        `;
        baseStyle.backgroundSize = "8px 8px";
      } else if (shape.hasPattern === "dots") {
        baseStyle.background = `
          radial-gradient(
            circle,
            ${shape.color} 1px,
            transparent 1px
          )
        `;
        baseStyle.backgroundSize = "6px 6px";
      } else if (shape.hasPattern === "stripes") {
        baseStyle.background = `repeating-linear-gradient(
          45deg,
          ${shape.color},
          ${shape.color} 4px,
          transparent 4px,
          transparent 8px
        )`;
      }
    } else {
      baseStyle.background = shape.color;
    }

    switch (shape.type) {
      case "circle":
        return {
          ...baseStyle,
          borderRadius: "50%",
        };
      case "line":
        return {
          ...baseStyle,
          width: `${shape.size * 2}px`,
          height: shape.strokeWidth,
          borderRadius: `${shape.strokeWidth / 2}px`,
          background: shape.color,
        };
      case "triangle":
        return {
          ...baseStyle,
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        };
      case "hexagon":
        return {
          ...baseStyle,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        };
      case "polygon":
        const polygonTypes = [
          "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond
          "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)", // Square
          "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // Pentagon
          "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)", // Trapezoid
        ];
        return {
          ...baseStyle,
          clipPath:
            polygonTypes[shape.id % polygonTypes.length],
        };
      case "gradient-mesh":
        return {
          ...baseStyle,
          background: `
            linear-gradient(45deg, ${shape.color} 0%, rgba(255,255,255,0.1) 50%, ${shape.color} 100%),
            linear-gradient(135deg, rgba(255,255,255,0.2) 0%, ${shape.color} 50%, rgba(255,255,255,0.1) 100%)
          `,
          borderRadius: "50%",
        };
      case "blob":
      default:
        const blobShapes = [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "40% 60% 50% 50% / 60% 40% 60% 40%",
          "75% 25% 35% 55% / 55% 45% 55% 35%",
          "35% 75% 55% 45% / 70% 35% 55% 45%",
        ];
        return {
          ...baseStyle,
          borderRadius:
            blobShapes[shape.id % blobShapes.length],
        };
    }
  };

  // 各図形の独立した動きパターン
  const pathX = Math.sin(shape.id * 0.5) * 50;
  const pathY = Math.cos(shape.id * 0.3) * 50;

  return (
    <motion.div
      style={{
        ...getShapeStyle(),
        y,
        x,
        scale,
        rotate,
      }}
      animate={{
        x: [0, pathX, -pathX, 0],
        y: [0, pathY, -pathY, 0],
      }}
      transition={{
        x: {
          duration: shape.duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: shape.duration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: shape.randomOffset * 2,
        },
      }}
    />
  );
}

export function BackgroundShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const shapes = useMemo(() => generateRandomShapes(), []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <GeometricShape key={shape.id} shape={shape} scrollY={scrollY} />
      ))}
    </div>
  );
}