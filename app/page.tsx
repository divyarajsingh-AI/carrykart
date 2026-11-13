
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CinematicBackground from "@/components/CinematicBackground";
import HeroContent from "@/components/HeroContent";
import HowItWorks from "@/components/HowItWorks";
import FeatureStrip from "@/components/FeatureStrip";
import SplineShowcase from "@/components/SplineShowcase";

import MobileMenu from "@/components/MobileMenu";
import CarryKartSculpture from "@/components/CarryKartSculpture";



import MegaFooter from "@/components/MegaFooter";
import CarryKartMotionSections from "@/components/CarryKartMotionSections";


gsap.registerPlugin(ScrollTrigger);

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

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          ".hero-copy",
          {
            y: -90,
            opacity: 0,
            scale: 0.94,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-visual",
          {
            y: 120,
            opacity: 0,
            scale: 0.78,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-background-glow",
          {
            opacity: 0,
            scale: 1.4,
            ease: "none",
          },
          0
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0714] text-white">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0714]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">

          {/* LOGO */}
          
<Link href="/" className="group flex shrink-0 items-center">
  <Image
    src="/carrykart-logo-new.png"
    alt="CarryKart - Next Gen"
    width={180}
    height={101}
    priority
    className="h-auto w-[125px] object-contain transition duration-300 group-hover:scale-[1.03] sm:w-[155px] lg:w-[175px]"
  />
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
      <section
        id="hero-section"
        ref={heroRef}
        className="hero-section relative"
      >
        <CinematicBackground />

        <div className="hero-background-glow pointer-events-none absolute left-1/2 top-0 h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-violet-700/[0.09] blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-2 px-3 py-14 sm:gap-5 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-28">

          {/* HERO TEXT */}
          <div className="hero-copy min-w-0 will-change-transform">
            <HeroContent />
          </div>

          {/* 3D SCULPTURE */}
          <div className="hero-visual relative min-w-0 w-full will-change-transform">
            <CarryKartSculpture />
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
      </div>

      {/* PREMIUM FEATURE STRIP */}
      <FeatureStrip />

     

      

    

      {/* HOW IT WORKS */}
      <HowItWorks />

      <CarryKartMotionSections />

      {/* INTERACTIVE 3D EXPERIENCE */}
      <SplineShowcase />

      
      

       
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
      <MegaFooter />
    </main>
  );
}
