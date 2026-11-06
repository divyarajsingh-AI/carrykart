
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type BuyerRequest = {
  id: string;
  item_name: string;
  item_url: string | null;
  pickup_city: string;
  delivery_city: string;
  budget: number | null;
  details: string | null;
};

export default function BrowseRequestsPage() {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function loadRequests(event?: FormEvent) {
    event?.preventDefault();

    setLoading(true);
    setError("");
    setSearched(true);

    const { data, error: fetchError } = await supabase
      .from("buyer_requests")
      .select(
        "id, item_name, item_url, pickup_city, delivery_city, budget, details"
      )
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setRequests([]);
    } else {
      setRequests(data ?? []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-sm text-violet-300 transition hover:text-white"
        >
          ← Back to Home
        </Link>

        <section className="py-16 text-center">
          <div className="mb-6 inline-flex rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-5 py-2 text-xs font-medium tracking-[0.2em] text-violet-300">
            CARRYKART MARKETPLACE
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Discover{" "}
            <span className="bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">
              Requests.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Explore what people need across India. Find requests that match
            your journey and help deliver something meaningful.
          </p>

          <button
            onClick={() => loadRequests()}
            disabled={loading}
            className="mt-9 rounded-full bg-violet-400 px-8 py-4 text-sm font-semibold text-[#0B0714] shadow-[0_0_35px_rgba(167,139,250,0.25)] transition hover:bg-violet-300 disabled:opacity-50"
          >
            {loading ? "Loading Requests..." : "Explore All Requests →"}
          </button>
        </section>

        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h2 className="text-xl font-semibold">Available Requests</h2>
            <p className="mt-1 text-sm text-white/40">
              Discover requests posted by buyers
            </p>
          </div>

          {searched && (
            <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-300">
              {requests.length} Requests
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300">
            Could not load requests: {error}
          </div>
        )}

        {!searched && !loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-4xl">✦</div>
            <h3 className="mt-5 text-xl font-medium">
              Your next journey starts here.
            </h3>
            <p className="mt-3 text-sm text-white/40">
              Click Explore All Requests to discover available deliveries.
            </p>
          </div>
        )}

        {searched && !loading && !error && requests.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-4xl">✦</div>
            <h3 className="mt-5 text-xl font-medium">
              No requests available yet.
            </h3>
            <p className="mt-3 text-sm text-white/40">
              New buyer requests will appear here.
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <article
              key={request.id}
              className="group rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#1D1430] to-[#100B1B] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_15px_50px_rgba(139,92,246,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-300">
                  Buyer Request
                </span>

                <span className="text-xl text-violet-300">✧</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {request.item_name}
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Pickup
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {request.pickup_city}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-violet-400/20" />
                  <span className="text-violet-300">↓</span>
                  <div className="h-px flex-1 bg-violet-400/20" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Delivery
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {request.delivery_city}
                  </p>
                </div>
              </div>

              {request.budget !== null && (
                <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-400/[0.06] p-4">
                  <p className="text-xs text-white/40">Buyer's Budget</p>
                  <p className="mt-1 text-xl font-semibold text-violet-200">
                    ₹{Number(request.budget).toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              {request.details && (
                <p className="mt-5 text-sm leading-6 text-white/50">
                  {request.details}
                </p>
              )}

              {request.item_url && (
                <a
                  href={request.item_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm font-medium text-violet-300 transition hover:text-white"
                >
                  View Product ↗
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/35">
            CarryKart — Every journey connects possibilities.
          </p>
        </div>

      </div>
    </main>
  );
}
