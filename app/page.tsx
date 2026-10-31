
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
  {
    from: "Jaipur",
    to: "Delhi",
    tag: "Popular route",
    detail: "A sample route for the pilot",
    color: "bg-orange-400",
  },
  {
    from: "Mumbai",
    to: "Pune",
    tag: "Weekend trips",
    detail: "A sample route for the pilot",
    color: "bg-sky-400",
  },
  {
    from: "Bengaluru",
    to: "Hyderabad",
    tag: "City connections",
    detail: "A sample route for the pilot",
    color: "bg-violet-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080d18] text-white">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400 text-xl font-black text-slate-950">
              C
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Carry<span className="text-orange-400">Kart</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-orange-300" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-orange-300" href="#routes">
              Explore routes
            </a>
            <a className="transition hover:text-orange-300" href="#about">
              Our vision
            </a>
          </div>

          <a
            href="#get-started"
            className="rounded-full bg-orange-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-300"
          >
            Get started <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2"
      >
        <div className="pointer-events-none absolute -left-48 top-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-2 text-sm text-orange-200">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            A smarter way to move things
          </div>

          <h1 className="max-w-2xl text-5xl leading-[1.08] font-black tracking-tight sm:text-6xl lg:text-7xl">
            Your next delivery might be{" "}
            <span className="text-orange-400">on someone&apos;s way.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            CarryKart is building a community-powered marketplace that connects
            people who need items with travellers already heading in the right
            direction.
          </p>

          <div
            id="get-started"
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#how-it-works"
              className="rounded-xl bg-orange-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-300"
            >
              I need an item <span aria-hidden="true">→</span>
            </a>
            <a
              href="#routes"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold transition hover:border-white/30 hover:bg-white/10"
            >
              I&apos;m travelling <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <span>✦ Built around shared journeys</span>
            <span>✦ Designed for local connections</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-orange-400/20 via-sky-400/10 to-violet-400/20 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-[#101827] p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">The CarryKart idea</p>
                <h2 className="mt-1 text-xl font-bold">Journeys connect us.</h2>
              </div>
              <span className="rounded-xl bg-white/5 p-3 text-2xl">✈</span>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#0b1220] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Example journey</span>
                <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
                  Sample only
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="h-3 w-3 rounded-full border-2 border-orange-400" />
                  <span className="h-14 border-l border-dashed border-slate-600" />
                  <span className="h-3 w-3 rounded-full bg-sky-400" />
                </div>
                <div className="flex flex-1 flex-col gap-7">
                  <div>
                    <p className="text-xs text-slate-500">FROM</p>
                    <p className="mt-1 text-lg font-bold">Jaipur, Rajasthan</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">TO</p>
                    <p className="mt-1 text-lg font-bold">Delhi</p>
                  </div>
                </div>
                <span className="text-2xl text-slate-400">↗</span>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400/15 text-xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">An item finds a way</p>
                    <p className="mt-1 text-sm text-slate-400">
                      A concept for connecting a request to a trip
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Concept preview — no real bookings or deliveries are available
              yet.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.2em] text-orange-400 uppercase">
              Simple by design
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From a request to a shared journey.
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Here&apos;s how the proposed CarryKart experience could work.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-white/10 bg-[#101827] p-7 transition hover:-translate-y-1 hover:border-orange-400/40"
              >
                <span className="text-sm font-extrabold tracking-widest text-orange-400">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-orange-400 uppercase">
              Imagine the possibilities
            </p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Every trip could connect two people.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            These are illustrative routes, not live traveller listings or
            confirmed delivery services.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {routes.map((route) => (
            <article
              key={route.from}
              className="rounded-2xl border border-white/10 bg-[#101827] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{route.tag}</span>
                <span className={`h-2.5 w-2.5 rounded-full ${route.color}`} />
              </div>
              <div className="mt-7 flex items-center gap-3 text-lg font-bold">
                <span>{route.from}</span>
                <span className="text-orange-400">→</span>
                <span>{route.to}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{route.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-orange-300/15 bg-gradient-to-br from-orange-400/10 to-sky-400/5 px-6 py-12 sm:px-12 sm:py-16">
          <p className="text-sm font-bold tracking-[0.2em] text-orange-400 uppercase">
            Our vision
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-extrabold sm:text-5xl">
            Make everyday journeys more useful, connected, and accessible.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            We&apos;re starting with an idea and building toward a trustworthy
            platform — with clear expectations, responsible delivery practices,
            and safety at the centre.
          </p>
          <a
            href="#home"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-orange-100"
          >
            Back to top ↑
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © 2026 CarryKart. An early-stage concept.
          </p>
          <p>Built step by step. Designed for better connections.</p>
        </div>
      </footer>
    </main>
  );
}
