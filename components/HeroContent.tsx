
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

function ArrowIcon() {
  return (
    <motion.svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25 }}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </motion.svg>
  );
}

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10 mx-auto w-full max-w-3xl"
      initial={reduceMotion ? false : { opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      {/* EYEBROW */}
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px w-10 bg-[#C9A9DC]/60" />
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#D6BCE8]/70">
          A different way to move
        </p>
        <span className="h-px w-10 bg-[#C9A9DC]/20" />
      </div>

      {/* MAIN HEADING */}
      <h1 className="text-[clamp(3.2rem,5.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.075em] text-[#F1E9DF]">
        THE WORLD
        <span className="block">IS CLOSER</span>
        <span className="mt-3 block font-serif font-normal italic tracking-[-0.055em] text-[#C9A9DC]">
          than ever.
        </span>
      </h1>

      {/* DESCRIPTION */}
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="mt-9 max-w-md text-sm leading-8 text-[#F1E9DF]/60 sm:text-base"
      >
        A journey is more than getting somewhere.
        It is an opportunity to connect people,
        places and the things that matter.
      </motion.p>

      {/* ACTION BUTTONS */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <Link
          href="/request"
          className="group inline-flex items-center gap-5 rounded-full bg-[#F1E9DF] px-7 py-4 text-xs font-semibold tracking-wide text-[#211629] transition duration-300 hover:-translate-y-1 hover:bg-[#C9A9DC]"
        >
          FIND WHAT YOU NEED
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>

        <Link
          href="/travel"
          className="group inline-flex items-center gap-3 rounded-full border border-[#F1E9DF]/25 px-7 py-4 text-xs font-medium tracking-wide text-[#F1E9DF] transition duration-300 hover:-translate-y-1 hover:border-[#C9A9DC] hover:text-[#C9A9DC]"
        >
          I'M TRAVELLING
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </motion.div>

      {/* BOTTOM EDITORIAL DETAIL */}
      <div className="mt-14 flex flex-wrap items-center gap-4">
        <span className="h-px w-12 bg-[#C9A9DC]/60" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#F1E9DF]/40">
          People · Places · Possibilities
        </span>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="mt-12 flex items-center gap-4">
        <div className="relative h-10 w-px overflow-hidden bg-[#F1E9DF]/15">
          <motion.div
            className="absolute left-0 top-0 h-1/2 w-full bg-[#C9A9DC]"
            animate={reduceMotion ? {} : { y: ["-100%", "200%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.35em] text-[#F1E9DF]/35">
          Scroll to explore
        </span>
      </div>
    </motion.div>
  );
}
