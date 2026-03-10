import { useRef, useEffect } from "react";

const HOLD_DURATION = 4000;
const TRANSITION_DURATION = 2000;
const DESKTOP_COUNT = 1000;
const MOBILE_COUNT = 500;
const MOBILE_BREAKPOINT = 768;
const DRIFT_SPEED = 0.3;
const DRIFT_RADIUS = 8;

interface Particle {
  x: number; y: number;
  targetX: number; targetY: number;
  originX: number; originY: number;
  color: string; baseRadius: number; radius: number; radiusScale: number; targetRadiusScale: number; opacity: number; speed: number;
  driftAngle: number; driftSpeed: number; driftRadius: number;
}

interface AnimState {
  currentFormation: number;
  transitionProgress: number;
  phase: "hold" | "transition";
  holdTimer: number;
  transitionTimer: number;
  globalTime: number;
}

type Formation = (i: number, total: number, w: number, h: number) => { x: number; y: number; rScale?: number };

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRandom(index: number): number {
  return mulberry32(index + 12345)();
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
// Formations

const formationScatter: Formation = (i, _total, w, h) => ({
  x: seededRandom(i * 2) * w,
  y: seededRandom(i * 2 + 1) * h,
});

const formationCircle: Formation = (i, total, w, h) => {
  const mainR = Math.min(w, h) * 0.38;
  const minR = mainR * 0.12;
  const outerR = Math.max(w, h) * 0.55;
  const angle = seededRandom(i * 2 + 500) * Math.PI * 2;
  // 80% in main circle (hollow center, dense outside), 20% outer scatter
  const isOuter = seededRandom(i * 2 + 999) < 0.2;
  let dist: number;
  if (isOuter) {
    // Sparse particles beyond main circle, out to ~800px from center
    dist = mainR + seededRandom(i * 2 + 501) * (outerR - mainR);
  } else {
    // Main circle: hollow center, dense outside
    const rawDist = seededRandom(i * 2 + 501);
    dist = minR + Math.pow(rawDist, 0.3) * (mainR - minR);
  }
  return { x: w / 2 + Math.cos(angle) * dist, y: h / 2 + Math.sin(angle) * dist };
};

const formationGrid: Formation = (i, total, w, h) => {
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const col = i % cols;
  const row = Math.floor(i / cols);
  const gridW = w * 0.85;
  const gridH = h * 0.75;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const offsetX = (w - gridW) / 2;
  const offsetY = (h - gridH) / 2;
  const jitterX = (seededRandom(i * 17) - 0.5) * cellW * 0.8;
  const jitterY = (seededRandom(i * 19) - 0.5) * cellH * 0.8;
  return { x: offsetX + col * cellW + cellW / 2 + jitterX, y: offsetY + row * cellH + cellH / 2 + jitterY };
};

const formationWave: Formation = (i, total, w, h) => {
  const waves = 3;
  const waveIndex = i % waves;
  const particleInWave = Math.floor(i / waves);
  const particlesPerWave = Math.ceil(total / waves);
  const xProgress = particleInWave / particlesPerWave;
  const amplitude = h * 0.18;
  const frequency = 2.5;
  const phaseOffset = (waveIndex / waves) * Math.PI * 2;
  const yCenter = h / 2 + (waveIndex - 1) * amplitude * 0.7;
  const spreadX = (seededRandom(i * 31) - 0.5) * (w / particlesPerWave) * 1.5;
  const spreadY = (seededRandom(i * 37) - 0.5) * amplitude * 0.6;
  return {
    x: xProgress * w + spreadX,
    y: yCenter + Math.sin(xProgress * Math.PI * 2 * frequency + phaseOffset) * amplitude + spreadY,
  };
};

const formations: Formation[] = [formationScatter, formationCircle, formationGrid, formationWave];
// Color Resolution

function resolveColors(): string[] {
  const style = getComputedStyle(document.documentElement);
  const r = (v: string) => style.getPropertyValue(v).trim();
  return [
    r("--neutral-300"), r("--neutral-300"),
    r("--neutral-400"), r("--neutral-400"), r("--neutral-400"),
    r("--neutral-500"), r("--neutral-500"),
    r("--neutral-600"), r("--neutral-600"), r("--neutral-700"),
    r("--curaggi-coral"), r("--curaggi-amber"),
    r("--curaggi-teal"), r("--curaggi-violet"),
    r("--curaggi-lime"), r("--curaggi-blue"),
  ];
}

// Particle Factory

function createParticles(count: number, w: number, h: number, colors: string[]): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const pos = formationScatter(i, count, w, h);
    const colorIndex = Math.floor(seededRandom(i * 7 + 3) * colors.length);
    const isNeutral = colorIndex < 10;
    particles.push({
      x: pos.x, y: pos.y, targetX: pos.x, targetY: pos.y, originX: pos.x, originY: pos.y,
      color: colors[colorIndex] || "#7C7C8A",
      baseRadius: 1.5 + seededRandom(i * 5) * 1.0,
      radius: 1.5 + seededRandom(i * 5) * 1.0,
      radiusScale: 1.0,
      targetRadiusScale: 1.0,
      opacity: isNeutral ? 0.15 + seededRandom(i * 11) * 0.35 : 0.2 + seededRandom(i * 11) * 0.4,
      speed: 0.85 + seededRandom(i * 13) * 0.3,
      driftAngle: seededRandom(i * 41) * Math.PI * 2,
      driftSpeed: DRIFT_SPEED + seededRandom(i * 43) * DRIFT_SPEED,
      driftRadius: DRIFT_RADIUS * (0.5 + seededRandom(i * 47) * 1.0),
    });
  }
  return particles;
}

// Draw

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const byColor = new Map<string, Particle[]>();
  for (const p of particles) {
    if (!byColor.has(p.color)) byColor.set(p.color, []);
    byColor.get(p.color)!.push(p);
  }
  for (const [color, group] of byColor) {
    ctx.fillStyle = color;
    for (const p of group) {
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseRadius * p.radiusScale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}
// Component

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animStateRef = useRef<AnimState>({
    currentFormation: 0, transitionProgress: 0, phase: "hold", holdTimer: 0, transitionTimer: 0, globalTime: 0,
  });
  const rafIdRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensionsRef.current = { w, h };
      return { w, h };
    }

    const { w, h } = resizeCanvas();
    const colors = resolveColors();
    const count = w < MOBILE_BREAKPOINT ? MOBILE_COUNT : DESKTOP_COUNT;
    particlesRef.current = createParticles(count, w, h, colors);
    drawParticles(ctx, particlesRef.current, w, h);

    // Reduced motion
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        cancelAnimationFrame(rafIdRef.current);
        drawParticles(ctx, particlesRef.current, dimensionsRef.current.w, dimensionsRef.current.h);
      } else {
        lastTimestampRef.current = 0;
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };
    mql.addEventListener("change", handleMotionChange);

    // Resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const { w: nw, h: nh } = resizeCanvas();
        const newCount = nw < MOBILE_BREAKPOINT ? MOBILE_COUNT : DESKTOP_COUNT;
        const particles = particlesRef.current;
        const state = animStateRef.current;
        if (newCount !== particles.length) {
          particlesRef.current = createParticles(newCount, nw, nh, colors);
        } else {
          const formation = formations[state.currentFormation];
          for (let i = 0; i < particles.length; i++) {
            const pos = formation(i, particles.length, nw, nh);
            particles[i].x = pos.x; particles[i].y = pos.y;
            particles[i].targetX = pos.x; particles[i].targetY = pos.y;
            particles[i].originX = pos.x; particles[i].originY = pos.y;
          }
        }
        state.phase = "hold"; state.holdTimer = 0; state.transitionProgress = 0;
        drawParticles(ctx, particlesRef.current, nw, nh);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    // Animation loop
    function animate(timestamp: number) {
      if (reducedMotionRef.current) return;
      if (lastTimestampRef.current === 0) lastTimestampRef.current = timestamp;
      const dt = Math.min(timestamp - lastTimestampRef.current, 100);
      lastTimestampRef.current = timestamp;
      const state = animStateRef.current;
      const particles = particlesRef.current;
      const { w: cw, h: ch } = dimensionsRef.current;

      state.globalTime += dt * 0.001;

      if (state.phase === "hold") {
        state.holdTimer += dt;
        // Drift: gentle floating during hold
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const t = state.globalTime * p.driftSpeed + p.driftAngle;
          p.x = p.targetX + Math.cos(t) * p.driftRadius;
          p.y = p.targetY + Math.sin(t * 0.7 + i) * p.driftRadius;
        }
        if (state.holdTimer >= HOLD_DURATION) {
          state.phase = "transition";
          state.transitionTimer = 0;
          state.transitionProgress = 0;
          const nextIdx = (state.currentFormation + 1) % formations.length;
          for (let i = 0; i < particles.length; i++) {
            particles[i].originX = particles[i].x;
            particles[i].originY = particles[i].y;
            const target = formations[nextIdx](i, particles.length, cw, ch);
            particles[i].targetX = target.x;
            particles[i].targetY = target.y;
            particles[i].targetRadiusScale = target.rScale ?? 1.0;
          }
          state.currentFormation = nextIdx;
        }
      } else {
        state.transitionTimer += dt;
        state.transitionProgress = Math.min(1, state.transitionTimer / TRANSITION_DURATION);
        if (state.transitionProgress >= 1) {
          state.phase = "hold";
          state.holdTimer = 0;
          for (const p of particles) {
            p.originX = p.targetX; p.originY = p.targetY;
            p.radiusScale = p.targetRadiusScale;
          }
        } else {
          for (const p of particles) {
            const individualT = Math.min(1, Math.max(0, state.transitionProgress * p.speed));
            const easedT = easeInOutCubic(individualT);
            p.x = p.originX + (p.targetX - p.originX) * easedT;
            p.y = p.originY + (p.targetY - p.originY) * easedT;
            p.radiusScale = 1.0 + (p.targetRadiusScale - 1.0) * easedT;
          }
        }
      }

      drawParticles(ctx, particles, cw, ch);
      rafIdRef.current = requestAnimationFrame(animate);
    }

    if (!reducedMotionRef.current) {
      rafIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      mql.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
