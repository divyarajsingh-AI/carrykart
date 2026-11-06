
"use client";

import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    number: "01",
    icon: "📦",
    title: "For Requesters",
    description:
      "Get the items you need through travellers already moving towards your destination.",
    tag: "REQUEST WITH EASE",
  },
  {
    number: "02",
    icon: "✈️",
    title: "For Travellers",
    description:
      "Turn your available travel space into an opportunity to connect and earn.",
    tag: "MAKE YOUR JOURNEY COUNT",
  },
  {
    number: "03",
    icon: "🌐",
    title: "One Connected Journey",
    description:
      "Bringing people, places and possibilities closer through smarter connections.",
    tag: "CONNECTED BY CARRY KART",
  },
];

export default function FeatureStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300">
              The CarryKart advantage
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              More than just a delivery.
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-white/40">
            A smarter way to bring people, journeys and everyday needs together.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 40, filter: "blur(8px)" }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : index * 0.15,
              }}
              whileHover={reduceMotion ? {} : { y: -8 }}
              className="group relative overflow-hidden rounded-[28px] border border-violet-200/[0.10] bg-gradient-to-br from-[#1D1430]/90 to-[#0F0A19]/95 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:border-violet-300/40 hover:shadow-[0_20px_70px_rgba(139,92,246,0.12)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/0 blur-[65px] transition duration-700 group-hover:bg-violet-500/20" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/[0.09] text-2xl shadow-[0_0_30px_rgba(167,139,250,0.08)] transition duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(167,139,250,0.2)]">
                  {feature.icon}
                </div>

                <span className="font-mono text-xs tracking-widest text-violet-300/40">
                  {feature.number}
                </span>
              </div>

              <div className="relative z-10 mt-9">
                <p className="text-[9px] font-semibold tracking-[0.2em] text-violet-300/60">
                  {feature.tag}
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  {feature.description}
                </p>
              </div>

              <div className="relative z-10 mt-8 h-px w-full bg-gradient-to-r from-violet-300/30 via-violet-300/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
