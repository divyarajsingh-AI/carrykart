
import Link from "next/link";
import CinematicBackground from "@/components/CinematicBackground";
import HeroContent from "@/components/HeroContent";
import HowItWorks from "@/components/HowItWorks";
import FeatureStrip from "@/components/FeatureStrip";
import SplineShowcase from "@/components/SplineShowcase";
import TwoJourneys from "@/components/TwoJourneys";
import MobileMenu from "@/components/MobileMenu";


const steps = [
  {
    number: "01",
    title: "Share your request",
    description:
      "Tell us what you need and where it needs to go. Your journey starts with a simple request.",
  },
  {
    number: "02",
    title: "Connect with a traveller",
    description:
      "Find a traveller heading in the right direction and coordinate your delivery.",
  },
  {
    number: "03",
    title: "Make it happen",
    description:
      "Coordinate the handover and bring people, places and possibilities closer.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[510px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-violet-600/10 blur-[85px]" />

      <div className="absolute inset-[5%] rounded-full border border-violet-300/10" />
      <div className="absolute inset-[15%] rounded-full border border-violet-300/10" />
      <div className="absolute inset-[25%] rounded-full border border-violet-300/15" />

      {/* ROTATING ORBIT 1 */}
<div className="orbit-ring absolute inset-[5%] rounded-full border border-dashed border-violet-400/40">
  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200 shadow-[0_0_20px_6px_rgba(167,139,250,0.8)]" />
</div>

{/* ROTATING ORBIT 2 */}
<div className="orbit-ring-reverse absolute inset-[15%] rounded-full border border-violet-300/25">
  <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-fuchsia-200 shadow-[0_0_20px_6px_rgba(192,132,252,0.8)]" />
</div>

      <div className="absolute left-[15%] top-[24%] h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_25px_8px_rgba(167,139,250,0.5)]" />
      <div className="absolute bottom-[20%] right-[16%] h-2.5 w-2.5 rounded-full bg-fuchsia-200 shadow-[0_0_25px_8px_rgba(192,132,252,0.45)]" />
      <div className="absolute right-[18%] top-[19%] h-2 w-2 rounded-full bg-violet-200 shadow-[0_0_20px_6px_rgba(167,139,250,0.5)]" />

      <div className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-full border border-violet-300/25 bg-[#171025]/90 shadow-[0_0_90px_rgba(124,58,237,0.25)] backdrop-blur-xl sm:h-52 sm:w-52">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-violet-200">
            <path
              d="M12 3 4 8v8l8 5 8-5V8l-8-5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="m4.5 8.5 7.5 4.7 7.5-4.7M12 13.2V21"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="text-xl font-semibold tracking-[0.2em] text-white">
          CARRY
        </span>
        <span className="text-[10px] font-medium tracking-[0.48em] text-violet-300">
          KART
        </span>
        <span className="mt-3 text-[9px] uppercase tracking-[0.25em] text-violet-200/50">
          Beyond distance
        </span>
      </div>

      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-violet-300/15 bg-[#171025]/80 px-4 py-2 text-[10px] tracking-[0.2em] text-violet-200/80 backdrop-blur-xl">
        CONNECTING DESTINATIONS
      </div>{/* FLOATING DESTINATION CARDS */}

<div className="destination-float absolute left-0 top-[18%] z-20 rounded-2xl border border-violet-300/20 bg-[#171025]/90 p-4 shadow-[0_10px_40px_rgba(124,58,237,0.2)] backdrop-blur-xl">
  <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/60">
    Departure
  </p>
  <p className="mt-1 text-sm font-semibold text-white">
    New Delhi
  </p>
  <p className="mt-1 text-[10px] text-white/40">
    Your journey begins
  </p>
</div>

<div className="destination-float-reverse absolute bottom-[20%] right-0 z-20 rounded-2xl border border-violet-300/20 bg-[#171025]/90 p-4 shadow-[0_10px_40px_rgba(124,58,237,0.2)] backdrop-blur-xl">
  <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/60">
    Destination
  </p>
  <p className="mt-1 text-sm font-semibold text-white">
    Mumbai
  </p>
  <p className="mt-1 text-[10px] text-white/40">
    Possibilities connect
  </p>
</div>
    </div>
  );
}

export default function Home() {
 
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0714] text-white">
     
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0714]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
          {/* LOGO */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-lg font-bold text-violet-200 shadow-[0_0_25px_rgba(139,92,246,0.12)]">
              C
            </div>
            <span className="text-base font-semibold tracking-[0.15em] sm:text-lg">
              CARRY<span className="text-violet-300">KART</span>
            </span>
          </Link>

          {/* MAIN NAVIGATION */}
        <nav className="hidden items-center gap-5 text-sm text-white/55 lg:flex">
  <Link href="#how-it-works" className="transition hover:text-violet-200">
    How it works
  </Link>

  <Link href="/find-traveller" className="transition hover:text-violet-200">
    Find Traveller
  </Link>

  <Link href="/browse-requests" className="transition hover:text-violet-200">
    Browse Requests
  </Link>

  <Link href="/dashboard" className="transition hover:text-violet-200">
    Dashboard
  </Link>

  <Link href="/chat" className="transition hover:text-violet-200">
    Chats
  </Link>

  <Link href="#why-carrykart" className="transition hover:text-violet-200">
    Why CarryKart
  </Link>
</nav>

<MobileMenu />

          {/* ACCOUNT ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-xs font-semibold text-white/75 transition hover:text-violet-200 sm:px-4 sm:text-sm"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-500/15 px-4 py-2.5 text-xs font-semibold text-violet-100 transition hover:border-violet-200 hover:bg-violet-500/25 sm:px-5 sm:text-sm"
            >
              Sign Up <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="flex gap-5 overflow-x-auto border-t border-white/[0.05] px-5 py-3 text-xs text-white/55 lg:hidden">
          <Link href="/find-traveller" className="shrink-0 hover:text-violet-200">
            Find Traveller
          </Link>
          <Link href="/browse-requests" className="shrink-0 hover:text-violet-200">
            Browse Requests
          </Link>
          <Link href="#how-it-works" className="shrink-0 hover:text-violet-200">
            How it works
          </Link>
          <Link href="#about" className="shrink-0 hover:text-violet-200">
            Our Vision
          </Link>
        </div>
      </header>


      {/* HERO */}
      <section className="relative">
        <CinematicBackground />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-violet-700/[0.09] blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">

         <HeroContent />


            

          <div className="relative mx-auto w-full max-w-xl">
            <OrbitVisual />
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
      </div>

{/* PREMIUM FEATURE STRIP — CINEMATIC */}
<FeatureStrip />
     


      {/* HOW IT WORKS — CINEMATIC */}
<HowItWorks />

{/* INTERACTIVE 3D EXPERIENCE */}
<SplineShowcase />

{/* TWO JOURNEYS — CINEMATIC */}
<TwoJourneys />

       

      {/* WHY CARRYKART */}
      <section id="why-carrykart" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
              Why CarryKart
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              More than movement.
              <span className="block text-violet-300">It's connection.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/45">
              We imagine a world where journeys can create opportunities.
              CarryKart is being built around a simple idea: connect people
              who need something with people who are already on the move.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["01", "Human connection", "Bringing people and journeys closer."],
              ["02", "Simple experience", "A straightforward way to share needs and routes."],
              ["03", "Journey focused", "Making better use of journeys already happening."],
              ["04", "Built for tomorrow", "A fresh concept for a connected world."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-violet-300/30 hover:bg-violet-400/[0.04]"
              >
                <span className="text-xs tracking-[0.2em] text-violet-300/60">{number}</span>
                <h3 className="mt-6 text-base font-semibold">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/40">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="about" className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-violet-300/15 bg-gradient-to-br from-[#25173D] via-[#171025] to-[#100B1B] px-7 py-16 text-center sm:px-14 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">
              The CarryKart vision
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              The world is closer
              <span className="block text-violet-300">than you think.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50">
              Every journey has a destination. Every connection has a
              possibility. Let's explore what's next.
            </p>
            <Link
              href="/request"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-violet-300 px-7 py-4 text-sm font-semibold text-[#160D26] shadow-[0_8px_40px_rgba(167,139,250,0.2)] transition hover:-translate-y-1 hover:bg-violet-200"
            >
              Explore CarryKart <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07] bg-[#080510]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 md:flex-row md:items-center lg:px-10">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-[0.18em]">
              CARRY<span className="text-violet-300">KART</span>
            </Link>
            <p className="mt-3 text-xs text-white/35">
              Bringing journeys and people closer.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-white/45">
            <Link href="/request" className="transition hover:text-violet-200">Request</Link>
            <Link href="/travel" className="transition hover:text-violet-200">Travel</Link>
            <Link href="#about" className="transition hover:text-violet-200">About</Link>
          </div>

          <div className="text-xs leading-6 text-white/30 md:text-right">
            <p>© 2026 CarryKart. An early-stage concept.</p>
            <p>Made with purpose by Divyaraj Singh Bhadauria.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
