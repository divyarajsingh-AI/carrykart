
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MatterSection() {
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
          end: "+=140%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".matter-background",
          { scale: 1 },
          { scale: 1.3, ease: "none" },
          0
        )
        .fromTo(
          ".matter-orbit-one",
          { rotation: -15 },
          { rotation: 40, ease: "none" },
          0
        )
        .fromTo(
          ".matter-orbit-two",
          { rotation: 20 },
          { rotation: -35, ease: "none" },
          0
        )
        .fromTo(
          ".matter-eyebrow",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: "none" },
          0
        )
        .fromTo(
          ".matter-heading",
          {
            opacity: 0.35,
            scale: 0.78,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "none",
          },
          0
        )
        .fromTo(
          ".matter-content",
          {
            opacity: 0,
            y: 75,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0.2
        )
        .to(
          ".matter-heading",
          {
            scale: 1.12,
            y: -65,
            opacity: 0.45,
            ease: "none",
          },
          0.72
        )
        .to(
          ".matter-content",
          {
            opacity: 0,
            y: -55,
            ease: "none",
          },
          0.78
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220svh] bg-[#211629]"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden px-6 text-[#F1E9DF] sm:px-10"
      >
        {/* Cinematic background */}

        <div className="matter-background pointer-events-none absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-[#211629]" />

          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A77DBB]/15 blur-[140px]" />

          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#C9A9DC]/10 blur-[120px]" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#8D6A9D]/15 blur-[130px]" />
        </div>

        {/* Orbital rings */}

        <div className="matter-orbit-one pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A9DC]/15 will-change-transform sm:h-[650px] sm:w-[650px]" />

        <div className="matter-orbit-two pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A9DC]/10 will-change-transform sm:h-[520px] sm:w-[520px]" />

        {/* Main editorial content */}

        <div className="relative z-10 mx-auto w-full max-w-7xl">

          <p className="matter-eyebrow mb-10 text-center text-[10px] uppercase tracking-[0.45em] text-[#D6BCE8]/65">
            A new way of connecting
          </p>

          <h2 className="matter-heading origin-center text-center text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.075em] will-change-transform">
            LET'S MAKE

            <span className="mt-3 block font-serif font-normal italic text-[#C9A9DC]">
              something
            </span>

            MATTER.
          </h2>

          <div className="matter-content mx-auto mt-12 grid max-w-4xl gap-8 will-change-transform md:grid-cols-2 md:items-end">

            <p className="max-w-md text-sm leading-8 text-[#F1E9DF]/65 sm:text-base">
              Sometimes the things we need are already travelling
              towards us. CarryKart brings people, journeys and
              possibilities together.
            </p>

            <div className="md:text-right">
              <p className="text-[9px] uppercase tracking-[0.35em] text-[#D6BCE8]/55">
                The idea behind CarryKart
              </p>

              <p className="mt-3 font-serif text-2xl italic text-[#C9A9DC] sm:text-3xl">
                Distance brings us closer.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
