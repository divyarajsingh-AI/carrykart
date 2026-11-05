
const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share the item you want, where it is available, and where it needs to go.",
  },
  {
    number: "02",
    title: "Connect with a traveller",
    description:
      "Find a traveller already heading towards your destination who can carry your item.",
  },
  {
    number: "03",
    title: "Get your item delivered",
    description:
      "Coordinate the handoff, confirm the details, and receive your item.",
  },
];

const routes = [
  {
    from: "Delhi",
    to: "Jaipur",
    tag: "POPULAR ROUTE",
    color: "bg-orange-400",
  },
  {
    from: "Mumbai",
    to: "Pune",
    tag: "SHORT DISTANCE",
    color: "bg-emerald-400",
  },
  {
    from: "Bengaluru",
    to: "Chennai",
    tag: "CITY CONNECT",
    color: "bg-sky-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-black tracking-tight">
            Carry<span className="text-orange-400">Kart</span>
            <span className="text-orange-400">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-400 md:flex">
            <a href="#how-it-works" className="transition hover:text-orange-400">
              How it works
            </a>
            <a href="#routes" className="transition hover:text-orange-400">
              Explore routes
            </a>
            <a href="#about" className="transition hover:text-orange-400">
              About us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/travel"
              className="hidden rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:border-orange-400 hover:text-orange-400 sm:block"
            >
              Become a traveller
            </a>
            <a
              href="/request"
              className="rounded-full bg-orange-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-orange-300"
            >
              Get started <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-10 -z-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative z-10 grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs font-bold tracking-widest text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              A SMARTER WAY TO DELIVER
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your journey.
              <br />
              Their delivery.
              <br />
              <span className="text-orange-400">One connection.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
              Need something from another city? CarryKart connects people who
              need items delivered with travellers already heading that way.
              Simple, smart, and community-powered.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/request"
                className="rounded-full bg-orange-400 px-7 py-4 font-bold text-black transition hover:-translate-y-1 hover:bg-orange-300"
              >
                I need something <span aria-hidden="true">→</span>
              </a>
              <a
                href="/travel"
                className="rounded-full border border-white/20 px-7 py-4 font-bold transition hover:-translate-y-1 hover:border-orange-400 hover:text-orange-400"
              >
                I am travelling
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-black text-white">01</p>
                <p className="mt-1 text-xs text-gray-500">One community</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">02</p>
                <p className="mt-1 text-xs text-gray-500">Simple connections</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">∞</p>
                <p className="mt-1 text-xs text-gray-500">Possibilities</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-orange-400/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-[#141414] p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-300">
                  CARRYKART CONNECT
                </span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                  ● LIVE CONCEPT
                </span>
              </div>

              <div className="my-10 rounded-2xl border border-white/10 bg-[#0c0c0c] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">PICKUP</p>
                    <p className="mt-2 text-2xl font-black">Delhi</p>
                  </div>

                  <div className="flex flex-1 items-center justify-center px-3">
                    <div className="h-px flex-1 bg-orange-400/60" />
                    <span className="px-2 text-xl text-orange-400">✈</span>
                    <div className="h-px flex-1 bg-orange-400/60" />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">DELIVERY</p>
                    <p className="mt-2 text-2xl font-black">Jaipur</p>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400/15 text-xl">
                      📦
                    </div>
                    <div>
                      <p className="font-bold">Your requested item</p>
                      <p className="text-xs text-gray-500">
                        Waiting for a traveller connection
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  A connection starts here.
                </span>
                <span className="font-bold text-orange-400">CarryKart ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-[#101010] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.25em] text-orange-400">
              THE PROCESS
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              How it <span className="text-orange-400">works.</span>
            </h2>
            <p className="mt-5 leading-7 text-gray-400">
              Three simple steps to bring people, journeys, and deliveries
              together.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-white/10 bg-[#151515] p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-400/50"
              >
                <p className="text-5xl font-black text-orange-400/30 transition group-hover:text-orange-400">
                  {step.number}
                </p>
                <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                <p className="mt-4 leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-orange-400">
              DISCOVER CONNECTIONS
            </p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Explore <span className="text-orange-400">routes.</span>
            </h2>
            <p className="mt-5 text-gray-400">
              Every journey can create a new connection.
            </p>
          </div>

          <a
            href="/travel"
            className="font-bold text-orange-400 transition hover:text-orange-300"
          >
            Travel with us <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {routes.map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="rounded-2xl border border-white/10 bg-[#141414] p-7 transition hover:border-orange-400/50"
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-black ${route.color}`}
              >
                {route.tag}
              </span>

              <div className="mt-8 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">FROM</p>
                  <h3 className="mt-2 text-2xl font-black">{route.from}</h3>
                </div>

                <span className="text-2xl text-orange-400">→</span>

                <div className="text-right">
                  <p className="text-xs text-gray-500">TO</p>
                  <h3 className="mt-2 text-2xl font-black">{route.to}</h3>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <a
                  href="/travel"
                  className="text-sm font-bold text-orange-400 hover:text-orange-300"
                >
                  Explore this journey ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Vision */}
      <section id="about" className="bg-[#101010] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-orange-400">
              OUR VISION
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              The world is connected.
              <br />
              <span className="text-orange-400">Delivery should be too.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-gray-400">
              CarryKart is an early-stage concept built around a simple idea:
              connect people who need something delivered with people who are
              already travelling. We want to make everyday connections easier
              and create a community where journeys can do more.
            </p>

            <a
              href="/request"
              className="mt-8 inline-flex rounded-full bg-orange-400 px-7 py-4 font-bold text-black transition hover:bg-orange-300"
            >
              Start with CarryKart →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-orange-400/20 bg-[#17120e] px-7 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/10 blur-[90px]" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.25em] text-orange-400">
              YOUR NEXT CONNECTION
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black sm:text-6xl">
              Make every journey
              <span className="text-orange-400"> count.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-gray-400">
              Need something delivered or already travelling somewhere?
              Start your CarryKart journey today.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="/request"
                className="rounded-full bg-orange-400 px-7 py-4 font-bold text-black transition hover:bg-orange-300"
              >
                Request an item →
              </a>

              <a
                href="/travel"
                className="rounded-full border border-white/20 px-7 py-4 font-bold transition hover:border-orange-400 hover:text-orange-400"
              >
                Become a traveller
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 sm:flex-row sm:items-center">
          <div>
            <a href="/" className="text-2xl font-black">
              Carry<span className="text-orange-400">Kart</span>.
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Connecting journeys. Creating possibilities.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="/request" className="transition hover:text-orange-400">
              Request an item
            </a>
            <a href="/travel" className="transition hover:text-orange-400">
              Become a traveller
            </a>
            <a href="#about" className="transition hover:text-orange-400">
              About
            </a>
          </div>

          <div className="text-xs text-gray-600">
            <p>© 2026 CarryKart. An early-stage concept.</p>
            <p className="mt-2">By Divyaraj Singh Bhadauriya.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
