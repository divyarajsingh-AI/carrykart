
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Journey = {
  id: string;
  origin_city: string;
  destination_city: string;
  travel_date: string;
};

type Request = {
  id: string;
  item_name: string;
  pickup_city: string;
  delivery_city: string;
  budget: number | null;
};

type UserProfile = {
  name: string;
  email: string;
  avatar: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Traveller",
    email: "",
    avatar: null,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!active) return;

        if (sessionError || !session) {
          router.replace("/login");
          return;
        }

        const user = session.user;
        const metadata = user.user_metadata ?? {};

        const fullName =
          metadata.full_name ||
          metadata.name ||
          user.email?.split("@")[0] ||
          "Traveller";

        const avatar =
          metadata.avatar_url ||
          metadata.picture ||
          null;

        setProfile({
          name: String(fullName),
          email: user.email ?? "",
          avatar: typeof avatar === "string" ? avatar : null,
        });

        const [journeyResult, requestResult] = await Promise.all([
          supabase
            .from("traveller_routes")
            .select("id, origin_city, destination_city, travel_date")
            .order("created_at", { ascending: false })
            .limit(5),

          supabase
            .from("buyer_requests")
            .select("id, item_name, pickup_city, delivery_city, budget")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        if (!active) return;

        if (journeyResult.error || requestResult.error) {
          setError(
            journeyResult.error?.message ||
              requestResult.error?.message ||
              "Could not load dashboard."
          );
        } else {
          setJourneys(journeyResult.data ?? []);
          setRequests(requestResult.data ?? []);
        }
      } catch {
        if (active) {
          setError("Something went wrong while loading your dashboard.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        setError(logoutError.message);
        setLoggingOut(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  const stats = [
    {
      label: "Traveller Journeys",
      value: journeys.length,
      icon: "✈",
      href: "/find-traveller",
    },
    {
      label: "Buyer Requests",
      value: requests.length,
      icon: "◇",
      href: "/browse-requests",
    },
  ];

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0714] text-violet-300">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
          <p className="text-sm">Preparing your CarryKart experience...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-8 text-white sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* TOP NAVIGATION */}
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-6">

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/carrykart-logo-new.png"
              alt="CarryKart"
              width={160}
              height={70}
              className="h-auto w-[125px] object-contain"
            />
          </Link>

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Open profile menu"
              className="flex items-center gap-3 rounded-full border border-violet-300/20 bg-white/[0.04] p-1.5 pr-3 transition hover:border-violet-300/50 hover:bg-white/[0.08]"
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full border border-violet-300/30 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/20 font-semibold text-violet-200">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}

              <span className="hidden max-w-[130px] truncate text-sm font-medium sm:block">
                {profile.name}
              </span>

              <span className="text-xs text-violet-300">
                {menuOpen ? "▲" : "▼"}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-violet-300/20 bg-[#171026] shadow-[0_20px_70px_rgba(0,0,0,0.5)]">

                <div className="border-b border-white/[0.07] p-5">
                  <div className="flex items-center gap-3">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full border border-violet-300/30 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 text-lg font-semibold text-violet-200">
                        {profile.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {profile.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-white/40">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-400/15 bg-green-400/[0.07] px-3 py-1.5 text-[10px] font-medium text-green-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Signed in
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/my-listings"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-violet-400/10 hover:text-white"
                  >
                    My Listings →
                  </Link>

                  <Link
                    href="/chat"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-violet-400/10 hover:text-white"
                  >
                    My Chats →
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="mt-1 w-full rounded-xl px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {loggingOut ? "Signing out..." : "Sign out ↗"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* WELCOME HERO */}
        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-violet-400/15 bg-gradient-to-br from-[#25163D] via-[#171026] to-[#100B1B] p-8 sm:p-12">

          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />

          <div className="relative z-10">
            <span className="text-xs tracking-[0.25em] text-violet-300">
              CARRYKART CONTROL CENTRE
            </span>

            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">
                {profile.name}.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Explore marketplace activity, discover journeys
              and find opportunities across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/travel"
                className="rounded-full bg-violet-400 px-6 py-3 text-sm font-semibold text-[#0B0714] transition hover:bg-violet-300"
              >
                Add a Journey →
              </Link>

              <Link
                href="/request"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-violet-300/50"
              >
                Post a Request
              </Link>
            </div>
          </div>
        </section>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {/* MARKETPLACE OVERVIEW */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Marketplace Overview
            </h2>
            <p className="mt-2 text-sm text-white/40">
              Latest public marketplace activity
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-400/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">
                    {stat.label}
                  </span>
                  <span className="text-2xl text-violet-300">
                    {stat.icon}
                  </span>
                </div>

                <p className="mt-5 text-4xl font-semibold">
                  {stat.value}
                </p>

                <p className="mt-3 text-xs text-violet-300">
                  Explore details →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* RECENT JOURNEYS */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Traveller Journeys
            </h2>
            <Link
              href="/find-traveller"
              className="text-xs text-violet-300 hover:text-white"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {journeys.length === 0 ? (
              <p className="text-sm text-white/40">
                No journeys available yet.
              </p>
            ) : (
              journeys.map((journey) => (
                <div
                  key={journey.id}
                  className="rounded-2xl border border-white/10 bg-[#171026] p-5"
                >
                  <p className="font-medium">
                    {journey.origin_city} → {journey.destination_city}
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    Travel date:{" "}
                    {new Date(
                      journey.travel_date + "T00:00:00"
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* RECENT REQUESTS */}
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Buyer Requests
            </h2>
            <Link
              href="/browse-requests"
              className="text-xs text-violet-300 hover:text-white"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {requests.length === 0 ? (
              <p className="text-sm text-white/40">
                No buyer requests available yet.
              </p>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-white/10 bg-[#171026] p-5"
                >
                  <p className="font-medium">
                    {request.item_name}
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    {request.pickup_city} → {request.delivery_city}
                  </p>

                  {request.budget !== null && (
                    <p className="mt-2 text-sm text-violet-300">
                      Budget: ₹
                      {Number(request.budget).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/35">
            CarryKart — Every journey connects possibilities.
          </p>
        </footer>

      </div>
    </main>
  );
}
