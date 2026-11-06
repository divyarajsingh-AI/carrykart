
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type TravellerRoute = {
  id: string;
  origin_city: string;
  destination_city: string;
  travel_date: string;
  available_space: string | null;
  details: string | null;
};

export default function FindTravellerPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travellers, setTravellers] = useState<TravellerRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!from.trim() || !to.trim()) {
      setError("Please enter both departure and destination cities.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setTravellers([]);

    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const { data, error: searchError } = await supabase
      .from("traveller_routes")
      .select(
        "id, origin_city, destination_city, travel_date, available_space, details"
      )
      .ilike("origin_city", from.trim())
      .ilike("destination_city", to.trim())
      .gte("travel_date", localToday)
      .order("travel_date", { ascending: true });

    if (searchError) {
      setError(searchError.message);
    } else {
      setTravellers(data ?? []);
    }

    setLoading(false);
  }

  function formatDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0714] px-6 py-20 text-white lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-700/[0.10] blur-[150px]" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm text-violet-300 transition hover:text-white"
        >
          ← Back to Home
        </Link>

        <div className="mb-12 mt-12 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-300">
            Find your connection
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            Find a Traveller.
            <span className="mt-2 block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Find your way.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            Search journeys and discover travellers heading towards your
            destination.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="rounded-[28px] border border-violet-300/15 bg-[#1D1430]/60 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-violet-200">
                FROM CITY
              </label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Jaipur"
                className="w-full rounded-xl border border-violet-300/15 bg-[#0B0714]/80 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-300/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-violet-200">
                DESTINATION CITY
              </label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Delhi"
                className="w-full rounded-xl border border-violet-300/15 bg-[#0B0714]/80 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-300/60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-violet-300 px-7 py-4 text-sm font-semibold text-[#160D26] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching journeys..." : "Find Travellers  ↗"}
          </button>
        </form>

        <div className="mt-12">
          {loading && (
            <p className="text-center text-sm text-violet-200">
              Finding matching journeys...
            </p>
          )}

          {error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-5 text-center text-sm text-red-300">
              {error}
            </div>
          )}

          {!loading && searched && !error && travellers.length === 0 && (
            <div className="rounded-2xl border border-violet-300/10 bg-white/[0.03] p-10 text-center">
              <p className="text-xl font-semibold text-white">
                No journeys found yet.
              </p>
              <p className="mt-3 text-sm text-white/45">
                Try another route or check back later.
              </p>
            </div>
          )}

          {!loading && travellers.length > 0 && (
            <>
              <p className="mb-6 text-sm text-violet-200">
                {travellers.length} matching journey
                {travellers.length > 1 ? "s" : ""} found
              </p>

              <div className="grid gap-5">
                {travellers.map((traveller) => (
                  <div
                    key={traveller.id}
                    className="rounded-2xl border border-violet-300/15 bg-gradient-to-br from-[#1D1430]/80 to-[#100B1B] p-6 transition hover:border-violet-300/35 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-violet-200">
                        Traveller journey
                      </span>

                      <span className="text-xs text-white/45">
                        {formatDate(traveller.travel_date)}
                      </span>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-xs text-white/40">FROM</p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                          {traveller.origin_city}
                        </p>
                      </div>

                      <span className="text-2xl text-violet-300">→</span>

                      <div>
                        <p className="text-xs text-white/40">TO</p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                          {traveller.destination_city}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/[0.08] pt-5">
                      <p className="text-xs uppercase tracking-wider text-violet-200">
                        Available space
                      </p>
                      <p className="mt-2 text-sm text-white/75">
                        {traveller.available_space || "Not specified"}
                      </p>

                      {traveller.details && (
                        <p className="mt-4 text-sm leading-6 text-white/45">
                          {traveller.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
