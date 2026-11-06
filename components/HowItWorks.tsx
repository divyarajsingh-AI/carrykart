
"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Request an item",
    description:
      "Tell us what you need, where you need it, and when you need it.",
    tag: "For requesters",
    icon: "✦",
  },
  {
    number: "02",
    title: "Match with a traveller",
    description:
      "Connect with someone already travelling along your required route.",
    tag: "Smart connection",
    icon: "◎",
  },
  {
    number: "03",
    title: "Receive your delivery",
    description:
      "Coordinate the handover and bring your requested item closer to home.",
    tag: "Journey complete",
    icon: "↗",
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
  id="how-it-works"
  className="relative overflow-hidden py-28 sm:py-36"
>
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/[0.07] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.5)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-200">
              Simple by design
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Three steps.
            <span className="block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              One smarter journey.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/45">
            From discovering a need to connecting a journey, CarryKart makes
            the process feel simple.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px origin-left bg-gradient-to-r from-violet-300/10 via-violet-300/60 to-violet-300/10 md:block"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 55, filter: "blur(10px)" }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : index * 0.2,
                ease: "easeOut",
              }}
              whileHover={reduceMotion ? {} : { y: -10 }}
              className="group relative rounded-[28px] border border-violet-200/[0.10] bg-[#130D20]/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-500 hover:border-violet-300/40 hover:bg-[#1D1430]/90"
            >
              {/* Top row */}
              <div className="relative z-10 mb-12 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/[0.10] text-xl text-violet-200 shadow-[0_0_30px_rgba(167,139,250,0.12)] transition duration-500 group-hover:shadow-[0_0_35px_rgba(167,139,250,0.3)]">
                  {step.icon}
                </div>

                <span className="font-mono text-sm tracking-widest text-violet-300/50">
                  {step.number}
                </span>
              </div>

              {/* Card content */}
              <div className="relative z-10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/70">
                  {step.tag}
                </span>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/45">
                  {step.description}
                </p>
              </div>

              {/* Bottom glow */}
              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/0 blur-[70px] transition duration-700 group-hover:bg-violet-500/20" />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center text-xs tracking-wide text-white/30"
        >
          A simpler way to connect people, needs and journeys.
        </motion.p>
      </div>
    </section>
  );
}
