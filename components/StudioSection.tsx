
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StudioVisual() {
  return (
    <div className="studio-visual relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center sm:h-[520px]">

      {/* Outer orbit */}

      <div className="studio-ring-one absolute h-[310px] w-[310px] rounded-full border border-[#C9A9DC]/20 sm:h-[410px] sm:w-[410px]" />

      {/* Crossing orbital rings */}

      <div className="studio-ring-two absolute h-[250px] w-[350px] rounded-[50%] border border-[#D8C3DF]/45 sm:h-[310px] sm:w-[470px]" />

      <div className="studio-ring-three absolute h-[250px] w-[350px] rounded-[50%] border border-[#B99A6A]/55 sm:h-[310px] sm:w-[470px]" />

      {/* Rotating orbit */}

      <div className="studio-ring-four absolute h-[280px] w-[280px] rounded-full border border-[#C9A9DC]/30 sm:h-[360px] sm:w-[360px]" />

      {/* Central sculpture */}

      <div className="studio-core relative flex h-36 w-36 items-center justify-center rounded-full border border-[#F1E9DF]/30 bg-gradient-to-br from-[#D9C5DF] via-[#A88DAF] to-[#55415F] shadow-[0_0_90px_rgba(201,169,220,0.22)] sm:h-48 sm:w-48">
        <div className="studio-core-inner h-20 w-20 rounded-full border border-white/40 bg-gradient-to-br from-[#F1E9DF]/80 to-[#8E7895]/70 shadow-inner sm:h-28 sm:w-28" />
      </div>

      {/* Orbiting objects */}

      <div className="studio-orb-one absolute right-[13%] top-[20%] h-4 w-4 rounded-full bg-[#D9C5DF] shadow-[0_0_25px_#C9A9DC]" />

      <div className="studio-orb-two absolute bottom-[18%] left-[15%] h-3 w-3 rounded-full bg-[#B99A6A] shadow-[0_0_22px_#B99A6A]" />
    </div>
  );
}

export default function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });

      timeline
        .fromTo(
          ".studio-copy",
          { opacity: 0, y: 90 },
          { opacity: 1, y: 0, ease: "none" },
          0
        )
        .fromTo(
          ".studio-visual",
          { opacity: 0, scale: 0.72, y: 100 },
          { opacity: 1, scale: 1, y: 0, ease: "none" },
          0
        )
        .fromTo(
          ".studio-ring-one",
          { rotation: -25, scale: 0.8 },
          { rotation: 15, scale: 1.1, ease: "none" },
          0
        )
        .fromTo(
          ".studio-ring-two",
          { rotation: -50 },
          { rotation: -20, ease: "none" },
          0
        )
        .fromTo(
          ".studio-ring-three",
          { rotation: 50 },
          { rotation: 20, ease: "none" },
          0
        )
        .fromTo(
          ".studio-ring-four",
          { rotation: 0 },
          { rotation: 150, ease: "none" },
          0
        )
        .fromTo(
          ".studio-core",
          { scale: 0.8 },
          { scale: 1.08, ease: "none" },
          0
        )
        .fromTo(
          ".studio-core-inner",
          { scale: 0.75 },
          { scale: 1.1, ease: "none" },
          0
        )
        .fromTo(
          ".studio-orb-one",
          { x: -35, y: 35 },
          { x: 35, y: -35, ease: "none" },
          0
        )
        .fromTo(
          ".studio-orb-two",
          { x: 35, y: -25 },
          { x: -35, y: 25, ease: "none" },
          0
        );
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#211629] px-6 py-28 text-[#F1E9DF] sm:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Editorial content */}

        <div className="studio-copy">

          <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-[#C9A9DC]/70">
            The CarryKart philosophy
          </p>

          <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.075em]">
            THE

            <span className="block font-serif font-normal italic text-[#C9A9DC]">
              journey
            </span>

            MATTERS.
          </h2>

          <p className="mt-9 max-w-md text-sm leading-8 text-[#F1E9DF]/60 sm:text-base">
            We believe distance should not stand between people
            and the things they need. CarryKart connects everyday
            journeys with meaningful possibilities.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-12 bg-[#C9A9DC]/60" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#F1E9DF]/45">
              Made to move together
            </span>
          </div>
        </div>

        {/* Animated visual */}

        <StudioVisual />

      </div>
    </section>
  );
}
