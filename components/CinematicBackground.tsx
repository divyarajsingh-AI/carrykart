
"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { left: "8%", top: "20%", delay: 0 },
  { left: "22%", top: "72%", delay: 1 },
  { left: "38%", top: "35%", delay: 2 },
  { left: "56%", top: "82%", delay: 0.5 },
  { left: "72%", top: "18%", delay: 1.5 },
  { left: "88%", top: "60%", delay: 2.5 },
  { left: "95%", top: "30%", delay: 0.8 },
];

export default function CinematicBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">

      {/* MAIN VIOLET ATMOSPHERE */}
      <motion.div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 100, 30, 0],
                y: [0, 60, 120, 0],
                scale: [1, 1.3, 0.9, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SECOND MOVING LIGHT */}
      <motion.div
        className="absolute -right-32 top-1/4 h-[380px] w-[380px] rounded-full bg-purple-500/15 blur-[130px]"
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -100, -30, 0],
                y: [0, 80, -40, 0],
                scale: [1, 0.85, 1.2, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* FLOATING PARTICLES */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-1 rounded-full bg-violet-200 shadow-[0_0_12px_3px_rgba(167,139,250,0.6)]"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -35, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.5, 0.8],
                }
          }
          transition={{
            duration: 4 + index * 0.4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* SUBTLE LIGHT BEAM */}
      <motion.div
        className="absolute -left-1/2 top-1/2 h-px w-[200%] bg-gradient-to-r from-transparent via-violet-300/20 to-transparent"
        animate={
          reduceMotion
            ? {}
            : {
                x: ["-10%", "10%", "-10%"],
                opacity: [0.2, 0.8, 0.2],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}
