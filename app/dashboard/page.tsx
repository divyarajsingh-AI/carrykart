
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function DashboardPage() {
  const router = useRouter();

  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Traveller");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      const { data: { session }, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !session) {
        router.replace("/login");
        return;
      }

      const name = session.user.user_metadata?.full_name;
      setUserName(
        typeof name === "string" && name.trim()
          ? name.trim()
          : session.user.email?.split("@")[0] || "Traveller"
      );

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

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
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
        Checking your account...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-violet-300 hover:text-white"
          >
            ← Back to Home
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-full border border-red-400/30 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout ↗"}
          </button>
        </div>

        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-violet-400/15 bg-gradient-to-br from-[#25163D] via-[#171026] to-[#100B1B] p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />

          <div className="relative z-10">
            <span className="text-xs tracking-[0.25em] text-violet-300">
              CARRYKART CONTROL CENTRE
            </span>

            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">
                {userName}.
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

        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Marketplace Overview
            </h2>
            <p className="mt-2 text-sm text-white/40">
              Latest public marketplace activity
            </p>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300">
              {error}
            </div>
          ) : (
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
          )}
        </section>

        {!error && (
          <>
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
          </>
        )}

        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/35">
            CarryKart — Every journey connects possibilities.
          </p>
        </footer>

      </div>
    </main>
  );
}
