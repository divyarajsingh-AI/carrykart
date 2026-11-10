
"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WonderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin || reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".wonder-glow",
          { scale: 0.7, opacity: 0.3 },
          { scale: 1.5, opacity: 1, ease: "none" },
          0
        )
        .fromTo(
          ".wonder-grid",
          { opacity: 0.04 },
          { opacity: 0.2, ease: "none" },
          0
        )
        .fromTo(
          ".wonder-eyebrow",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "none" },
          0
        )
        .fromTo(
          ".wonder-title",
          {
            scale: 0.55,
            y: 140,
            opacity: 0.35,
            rotationX: 18,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            rotationX: 0,
            ease: "none",
          },
          0
        )
        .fromTo(
          ".wonder-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, ease: "none" },
          0.35
        )
        .fromTo(
          ".wonder-caption",
          { opacity: 0, y: 65 },
          { opacity: 1, y: 0, ease: "none" },
          0.3
        )
        .to(
          ".wonder-title",
          {
            scale: 1.12,
            y: -75,
            opacity: 0.5,
            ease: "none",
          },
          0.78
        )
        .to(
          ".wonder-caption",
          {
            opacity: 0,
            y: -35,
            ease: "none",
          },
          0.82
        );
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[210svh] bg-[#17101E]"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden px-5 text-[#F1E9DF] sm:px-10"
      >
        {/* Cinematic background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="wonder-glow absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A77DBB]/10 blur-[150px]" />

          <div className="wonder-grid absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(241,233,223,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(241,233,223,0.12)_1px,transparent_1px)] [background-size:100px_100px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1500px]">

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="wonder-eyebrow text-center text-[10px] uppercase tracking-[0.5em] text-[#C9A9DC]/70"
          >
            Beyond the expected
          </motion.p>

          <div className="relative my-12 [perspective:1000px]">
            <h2
              className="wonder-title select-none text-center text-[clamp(4rem,17vw,16rem)] font-semibold leading-[0.8] tracking-[-0.095em] will-change-transform"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #FFF9F0 0%, #D8C8D9 27%, #A88DAF 48%, #F1E9DF 62%, #8E7895 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.3))",
              }}
            >
              WONDER
            </h2>

            <div className="wonder-line pointer-events-none absolute inset-x-0 top-1/2 h-px origin-center -translate-y-1/2 scale-x-0 bg-gradient-to-r from-transparent via-[#F1E9DF]/35 to-transparent" />
          </div>

          <div className="wonder-caption mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row sm:text-left">

            <p className="max-w-sm text-center text-sm leading-8 text-[#F1E9DF]/55 sm:text-left">
              Every journey holds a possibility.
              Every connection brings something closer.
              Discover a world that moves together.
            </p>

            <span className="font-serif text-2xl italic text-[#C9A9DC]">
              Stay curious.
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}
