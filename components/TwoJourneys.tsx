
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const journeys = [
  {
    number: "01",
    label: "FOR REQUESTERS",
    title: "Need something?",
    highlight: "Get it moving.",
    description:
      "Find someone already travelling your way and get the item you need delivered to your doorstep.",
    features: ["Post your request", "Find a matching traveller", "Get it delivered"],
    button: "Request an item",
    href: "/request",
    symbol: "↗",
  },
  {
    number: "02",
    label: "FOR TRAVELLERS",
    title: "Going somewhere?",
    highlight: "Make it count.",
    description:
      "Turn your available luggage space into an opportunity by carrying requested items along your journey.",
    features: ["Share your journey", "Connect with requests", "Earn for carrying"],
    button: "Share your journey",
    href: "/travel",
    symbol: "✦",
  },
];

export default function TwoJourneys() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-violet-300/[0.08] bg-[#0B0714] px-6 py-24 sm:py-28 lg:px-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/[0.09] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-300">
            Two journeys. One connection.
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            One platform.
            <span className="mt-2 block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Two possibilities.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
            Whether you need something or are already on your way,
            CarryKart connects both sides of the journey.
          </p>
        </motion.div>

        {/* Journey cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {journeys.map((journey, index) => (
            <motion.div
              key={journey.number}
              initial={reduceMotion ? false : { opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : index * 0.15,
              }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-[30px] border border-violet-300/[0.13] bg-gradient-to-br from-[#1D1430]/90 via-[#120C20]/95 to-[#0B0714] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition-colors duration-500 hover:border-violet-300/35 sm:p-10 lg:p-12"
            >
              {/* Card glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/[0.09] blur-[90px] transition duration-700 group-hover:bg-violet-400/[0.18]" />

              {/* Decorative number */}
              <div className="pointer-events-none absolute right-8 top-6 text-7xl font-semibold tracking-tighter text-white/[0.035] sm:right-10 sm:text-8xl">
                {journey.number}
              </div>

              <div className="relative z-10">
                {/* Label */}
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.06] px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                  <span className="text-[9px] font-semibold tracking-[0.22em] text-violet-200">
                    {journey.label}
                  </span>
                </div>

                {/* Icon */}
                <div className="my-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.07] text-3xl text-violet-200 shadow-[0_0_35px_rgba(139,92,246,0.12)] transition duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {journey.symbol}
                </div>

                {/* Content */}
                <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {journey.title}
                </h3>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-violet-300 sm:text-4xl">
                  {journey.highlight}
                </p>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
                  {journey.description}
                </p>

                {/* Features */}
                <div className="mt-8 space-y-3">
                  {journey.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/65"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-300/25 bg-violet-300/[0.08] text-[10px] text-violet-200">
                        ✓
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={journey.href}
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-violet-300 px-7 py-3.5 text-sm font-semibold text-[#160D26] shadow-[0_0_30px_rgba(167,139,250,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-violet-200 hover:shadow-[0_0_40px_rgba(167,139,250,0.25)]"
                >
                  {journey.button}
                  <span className="text-base">↗</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
