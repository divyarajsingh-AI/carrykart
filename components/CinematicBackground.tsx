
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

      {/* BASE ATMOSPHERE */}
      <div className="absolute inset-0 bg-[#211629]" />

      {/* MAIN AMBIENT GLOW */}
      <motion.div
        className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#A88DAF]/20 blur-[150px] will-change-transform"
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 90, 30, 0],
                y: [0, 70, 120, 0],
                scale: [1, 1.2, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SECOND AMBIENT GLOW */}
      <motion.div
        className="absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-[#C9A9DC]/15 blur-[150px] will-change-transform"
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -90, -30, 0],
                y: [0, 70, -40, 0],
                scale: [1, 0.9, 1.15, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SUBTLE WARM LIGHT */}
      <motion.div
        className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#B99A6A]/10 blur-[140px]"
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.35, 0.7, 0.35],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ATMOSPHERIC GRID */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(241,233,223,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(241,233,223,0.35) 1px, transparent 1px)",
          backgroundSize: "110px 110px",
          maskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 75%)",
        }}
      />

      {/* FLOATING PARTICLES */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-1 rounded-full bg-[#E5D1F0] shadow-[0_0_14px_3px_rgba(201,169,220,0.55)]"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -35, 0],
                  opacity: [0.15, 0.8, 0.15],
                  scale: [0.8, 1.5, 0.8],
                }
          }
          transition={{
            duration: 5 + index * 0.4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CINEMATIC LIGHT BEAM */}
      <motion.div
        className="absolute -left-1/2 top-[48%] h-px w-[200%] bg-gradient-to-r from-transparent via-[#D8C3DF]/25 to-transparent"
        animate={
          reduceMotion
            ? {}
            : {
                x: ["-8%", "8%", "-8%"],
                opacity: [0.15, 0.65, 0.15],
              }
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SUBTLE CINEMATIC VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(15,9,20,0.38)_100%)]" />

    </div>
  );
}
