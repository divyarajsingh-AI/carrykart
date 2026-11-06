
"use client";

import SplineScene from "@/components/SplineScene";


export default function SplineShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-10">
      {/* Royal Violet ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/[0.10] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300">
            Explore a new dimension
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            A smarter journey.
            <span className="mt-2 block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              A whole new experience.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50">
            Discover a more connected way to bring people, destinations and
            everyday needs together.
          </p>
        </div>

        {/* 3D scene container */}
        <div className="group relative overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#0B0714] shadow-[0_0_80px_rgba(139,92,246,0.10)] sm:rounded-[36px]">
          {/* Spotlight effect */}
          <div className="pointer-events-none absolute -left-20 -top-32 z-10 h-80 w-80 rounded-full bg-violet-400/[0.12] blur-[100px] transition duration-700 group-hover:bg-violet-400/[0.20]" />

          <div className="relative grid min-h-[540px] md:grid-cols-2">
            {/* Left content */}
            <div className="relative z-10 flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-200">
                  The future moves together
                </span>
              </div>

              <h3 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Every journey can create
                <span className="text-violet-300"> a connection.</span>
              </h3>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                Need an item? Already travelling? CarryKart brings both sides
                together to make everyday deliveries more connected.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/request"
                  className="inline-flex items-center justify-center rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-[#160D26] transition hover:bg-violet-200"
                >
                  Request an item <span className="ml-2">↗</span>
                </a>

                <a
                  href="/travel"
                  className="inline-flex items-center justify-center rounded-full border border-violet-200/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-violet-100 transition hover:border-violet-300/40 hover:bg-violet-300/[0.08]"
                >
                  Share your journey
                </a>
              </div>
            </div>

            {/* Right: interactive Spline 3D scene */}
            <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] md:min-h-[540px]">
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#0B0714]/40 via-transparent to-transparent md:from-[#0B0714]/60" />

             <SplineScene
  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
  className="h-full w-full"
/>
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-full border border-violet-200/10 bg-[#0B0714]/70 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white/40 backdrop-blur-md">
                Interactive 3D experience
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[10px] tracking-wide text-white/30">
          Move your cursor over the 3D scene to explore it.
        </p>
      </div>
    </section>
  );
}
