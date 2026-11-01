
const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share the item you want, where it is available, and where it needs to go.",
  },
  {
    number: "02",
    title: "Match with a traveller",
    description:
      "Find a traveller already heading your way and review the delivery offer.",
  },
  {
    number: "03",
    title: "Coordinate your delivery",
    description:
      "Agree on the details and arrange a convenient handover.",
  },
];

const routes = [
  { from: "Jaipur", to: "Delhi", tag: "POPULAR ROUTE", color: "bg-orange-500" },
  { from: "Mumbai", to: "Pune", tag: "WEEKEND TRIPS", color: "bg-orange-400" },
  { from: "Bengaluru", to: "Hyderabad", tag: "CITY CONNECTIONS", color: "bg-orange-300" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090b] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6a00] text-2xl font-black text-black shadow-[0_0_25px_rgba(255,106,0,0.3)] transition duration-300 group-hover:rotate-6 group-hover:scale-105">
              C
            </span>
            <span className="text-xl font-black tracking-tight sm:text-2xl">
              Carry<span className="text-[#ff6a00]">Kart</span>
              <span className="ml-2 hidden text-[9px] font-bold tracking-[0.25em] text-zinc-500 sm:inline">
                NEXT GEN
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a className="transition hover:text-[#ff6a00]" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-[#ff6a00]" href="/travel">
              Explore routes
            </a>
            <a className="transition hover:text-[#ff6a00]" href="#about">
              Our vision
            </a>
          </div>

          <a
            href="#get-started"
            className="rounded-full bg-[#ff6a00] px-4 py-2.5 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[0_0_28px_rgba(255,106,0,0.35)] sm:px-5"
          >
            Get started <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-32"
      >
        <div className="pointer-events-none absolute -left-48 top-0 h-[450px] w-[450px] rounded-full bg-orange-600/[0.12] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-orange-500/[0.06] blur-[100px]" />

        <div className="relative z-10 animate-cinematic-in">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-orange-500/25 bg-orange-500/[0.07] px-4 py-2.5 text-xs font-bold tracking-wide text-orange-300 sm:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff6a00]" />
            </span>
            A SMARTER WAY TO MOVE THINGS
          </div>

          <h1 className="max-w-3xl text-5xl leading-[1.05] font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            Your next delivery might be{" "}
            <span className="neon-text">on someone&apos;s way.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            A new way to connect people who need items with travellers already
            heading in the right direction. Turn everyday journeys into
            meaningful connections.
          </p>

          <div id="get-started" className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/request"
              className="neon-glow group inline-flex items-center justify-center gap-3 rounded-xl bg-[#ff6a00] px-7 py-4 font-extrabold text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(255,106,0,0.4)]"
            >
              I need an item
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href="/travel"
              className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-orange-500/[0.06]"
            >
              I&apos;m travelling
              <span className="text-orange-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-zinc-500 sm:text-sm">
            <span>✦ Community-powered concept</span>
            <span>✦ Built around shared journeys</span>
          </div>
        </div>

        {/* Futuristic journey card */}
        <div className="relative mx-auto w-full max-w-lg animate-cinematic-in [animation-delay:180ms]">
          <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/[0.12] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111114]/95 p-5 shadow-2xl sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] via-transparent to-transparent" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-orange-400">
                  THE CARRYKART CONCEPT
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Journeys connect us.
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  A different way to think about delivery.
                </p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-3xl">
                ✈
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#09090b] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold tracking-[0.18em] text-zinc-400">
                  EXAMPLE JOURNEY
                </span>
                <span className="rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-3 py-1.5 text-[10px] font-bold tracking-wider text-orange-300">
                  SAMPLE ONLY
                </span>
              </div>

              <div className="mt-8 flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#ff6a00] shadow-[0_0_14px_rgba(255,106,0,0.5)]" />
                  <span className="my-2 min-h-16 flex-1 border-l border-dashed border-orange-500/40" />
                  <span className="h-3.5 w-3.5 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(255,106,0,0.45)]" />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-8">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.22em] text-zinc-500">
                      FROM
                    </p>
                    <p className="mt-1.5 text-lg font-extrabold">Jaipur, Rajasthan</p>
                    <p className="mt-1 text-xs text-zinc-600">Starting point</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.22em] text-zinc-500">
                      TO
                    </p>
                    <p className="mt-1.5 text-lg font-extrabold">Delhi</p>
                    <p className="mt-1 text-xs text-zinc-600">Destination</p>
                  </div>
                </div>

                <span className="self-center text-2xl text-orange-400">↗</span>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-2xl">
                  📦
                </div>
                <div>
                  <p className="font-bold">An item finds a way</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Imagine a request connecting with a trip.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs leading-5 text-zinc-500">
              <span className="text-orange-400">ⓘ</span>
              Concept preview — no real bookings or deliveries are available yet.
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative border-y border-white/[0.08] bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.3em] text-orange-400">
              THE PROCESS
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
              From a request to a{" "}
              <span className="neon-text">shared journey.</span>
            </h2>
            <p className="mt-5 leading-7 text-zinc-400">
              Here&apos;s how the proposed CarryKart experience could work.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111114] p-7 transition duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_15px_45px_rgba(255,106,0,0.07)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/[0.06] blur-2xl transition group-hover:bg-orange-500/[0.15]" />
                <span className="text-4xl font-black tracking-tighter text-orange-500/80 transition group-hover:text-orange-400">
                  {step.number}
                </span>
                <div className="mt-7 h-px w-12 bg-orange-500/60 transition-all group-hover:w-20" />
                <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Example routes */}
      <section id="routes" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.3em] text-orange-400">
              CONNECTED BY POSSIBILITY
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
              Every trip could connect two people.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-500">
            Illustrative routes for the concept, not live traveller listings or
            confirmed delivery services.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {routes.map((route) => (
            <article
              key={route.from}
              className="group rounded-2xl border border-white/[0.09] bg-[#111114] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/35 hover:bg-[#151518]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-zinc-500">
                  {route.tag}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full ${route.color} shadow-[0_0_12px_rgba(255,106,0,0.35)]`} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-lg font-extrabold sm:text-xl">
                <span>{route.from}</span>
                <span className="text-orange-500 transition-transform group-hover:translate-x-1">
                  →
                </span>
                <span>{route.to}</span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="text-xs text-zinc-500">Example connection</span>
                <span className="text-lg text-orange-400">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section id="about" className="px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#111114] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-extrabold tracking-[0.3em] text-orange-400">
              OUR VISION
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
              Make everyday journeys more useful, connected, and accessible.
            </h2>
            <p className="mt-6 max-w-2xl leading-7 text-zinc-400">
              We&apos;re starting with an idea and building toward a trustworthy
              platform — with clear expectations, responsible delivery
              practices, and safety at the centre.
            </p>
            <a
              href="#home"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ff6a00] px-6 py-3.5 font-extrabold text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_25px_rgba(255,106,0,0.3)]"
            >
              Back to top <span>↑</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#070708]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a href="#home" className="text-lg font-black tracking-tight">
            Carry<span className="text-orange-500">Kart</span>
          </a>
          <p className="text-xs text-zinc-600">
            © 2026 CarryKart. An early-stage concept.
          </p>
          <p className="text-xs text-zinc-600">By Divyaraj Singh Bhadauriya.</p>
        </div>
      </footer>
    </main>
  );
}
