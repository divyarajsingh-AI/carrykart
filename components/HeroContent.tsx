
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const entrance = {
  hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10"
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.16, delayChildren: 0.2 },
        },
      }}
    >
      {/* Announcement */}
      <motion.div
        variants={entrance}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-4 py-2"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.5)]"
          animate={reduceMotion ? {} : { opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-200">
          A new way to move things
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        variants={entrance}
        className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
      >
        Distance is just
        <span className="block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
          a detail.
        </span>
        <span className="mt-2 block text-white/90">
          We connect the rest.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={entrance}
        className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg"
      >
        CarryKart brings people, travellers and everyday delivery needs
        closer together. A smarter way to connect journeys and move what
        matters.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={entrance}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        <Link
          href="/request"
          className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-violet-300 px-7 py-4 text-sm font-semibold text-[#160D26] shadow-[0_8px_40px_rgba(167,139,250,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-violet-200 hover:shadow-[0_12px_45px_rgba(167,139,250,0.32)]"
        >
          <motion.span
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-25deg] bg-white/40 blur-md"
            animate={reduceMotion ? {} : { left: ["-50%", "150%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <span className="relative">I need something</span>
          <span className="relative"><ArrowIcon /></span>
        </Link>

        <Link
          href="/travel"
          className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-medium text-white/80 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-400/[0.08]"
        >
          I'm travelling <ArrowIcon />
        </Link>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div
        variants={entrance}
        className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7"
      >
        <div>
          <p className="text-sm font-semibold text-white">People first</p>
          <p className="mt-1 text-xs text-white/35">Built around connection</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Journey driven</p>
          <p className="mt-1 text-xs text-white/35">Travel meets delivery</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Future focused</p>
          <p className="mt-1 text-xs text-white/35">A smarter concept</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
