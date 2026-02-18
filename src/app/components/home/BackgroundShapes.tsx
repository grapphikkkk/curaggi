import { motion } from "motion/react";

export function BackgroundShapes() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Coral Blob - Top Left */}
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "var(--curaggi-coral)",
          opacity: 0.2,
          top: "8%",
          left: "-12%",
        }}
      />

      {/* Teal Blob - Top Right */}
      <motion.div
        animate={{
          borderRadius: [
            "50% 50% 50% 50%",
            "40% 60% 60% 40% / 60% 40% 60% 40%",
            "50% 50% 50% 50%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "var(--curaggi-teal)",
          opacity: 0.22,
          top: "3%",
          right: "-10%",
        }}
      />

      {/* Amber Blob - Middle Left */}
      <motion.div
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          background: "var(--curaggi-amber)",
          opacity: 0.18,
          top: "45%",
          left: "-8%",
        }}
      />

      {/* Violet Blob - Middle Right */}
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 50% 50% / 60% 40% 60% 40%",
            "60% 40% 60% 40% / 40% 60% 40% 60%",
            "40% 60% 50% 50% / 60% 40% 60% 40%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "var(--curaggi-violet)",
          opacity: 0.16,
          top: "55%",
          right: "-7%",
        }}
      />

      {/* Lime Circle - Bottom Left */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          scale: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          background: "var(--curaggi-lime)",
          opacity: 0.15,
          bottom: "5%",
          left: "-5%",
          borderRadius: "50%",
        }}
      />

      {/* Blue Blob - Bottom Right */}
      <motion.div
        animate={{
          borderRadius: [
            "55% 45% 60% 40% / 50% 50% 50% 50%",
            "45% 55% 40% 60% / 60% 40% 60% 40%",
            "55% 45% 60% 40% / 50% 50% 50% 50%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          background: "var(--curaggi-blue)",
          opacity: 0.2,
          bottom: "10%",
          right: "-8%",
        }}
      />

      {/* Coral Light - Top Center-Right */}
      <motion.div
        animate={{
          borderRadius: [
            "65% 35% 45% 55% / 55% 65% 35% 45%",
            "35% 65% 55% 45% / 45% 35% 65% 55%",
            "65% 35% 45% 55% / 55% 65% 35% 45%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "var(--curaggi-coral-light)",
          opacity: 0.14,
          top: "20%",
          right: "15%",
        }}
      />

      {/* Teal Dark - Bottom Center-Left */}
      <motion.div
        animate={{
          borderRadius: [
            "42% 58% 50% 50% / 58% 42% 58% 42%",
            "58% 42% 62% 38% / 42% 58% 42% 58%",
            "42% 58% 50% 50% / 58% 42% 58% 42%",
          ],
        }}
        transition={{
          borderRadius: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "var(--curaggi-teal-dark)",
          opacity: 0.12,
          bottom: "25%",
          left: "12%",
        }}
      />

      {/* Lime Light Circle - Middle Top */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          background: "var(--curaggi-lime-light)",
          opacity: 0.13,
          top: "32%",
          left: "18%",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}