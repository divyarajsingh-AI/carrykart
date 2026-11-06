
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type TravellerRoute = {
  id: string;
  origin_city: string;
  destination_city: string;
  travel_date: string;
  available_space: string | null;
  details: string | null;
};

type BuyerRequest = {
  id: string;
  item_name: string;
  pickup_city: string;
  delivery_city: string;
  budget: number | null;
  details: string | null;
};

export default function MyListingsPage() {
  const router = useRouter();

  const [routes, setRoutes] = useState<TravellerRoute[]>([]);
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadListings() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      const [routesResult, requestsResult] = await Promise.all([
        supabase
          .from("traveller_routes")
          .select(
            "id, origin_city, destination_city, travel_date, available_space, details"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),

        supabase
          .from("buyer_requests")
          .select(
            "id, item_name, pickup_city, delivery_city, budget, details"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (routesResult.error || requestsResult.error) {
        setMessage("Could not load your listings. Please refresh the page.");
      } else {
        setRoutes(routesResult.data || []);
        setRequests(requestsResult.data || []);
      }

      setLoading(false);
    }

    loadListings();
  }, [router]);

  async function deleteRoute(id: string) {
    if (!window.confirm("Are you sure you want to delete this journey?")) {
      return;
    }

    setDeleting(id);
    setMessage("");

    const { error } = await supabase
      .from("traveller_routes")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setRoutes((current) => current.filter((item) => item.id !== id));
      setMessage("Journey deleted successfully.");
    }

    setDeleting(null);
  }

  async function deleteRequest(id: string) {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    setDeleting(id);
    setMessage("");

    const { error } = await supabase
      .from("buyer_requests")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setRequests((current) => current.filter((item) => item.id !== id));
      setMessage("Request deleted successfully.");
    }

    setDeleting(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0714] text-[#E0B7FF]">
        Loading your listings...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="text-sm text-[#A78BFA] transition hover:text-white"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-12 mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#A78BFA]">
            Your CarryKart Activity
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            My <span className="text-[#C4A5FF]">Listings.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
            Manage your journeys and item requests from one place.
          </p>
        </div>

        {message && (
          <div className="mb-8 rounded-xl border border-[#A78BFA]/20 bg-[#1D1430] px-5 py-4 text-sm text-[#E0B7FF]">
            {message}
          </div>
        )}

        {/* TRAVELLER JOURNEYS */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              My Journeys
            </h2>
            <span className="rounded-full border border-[#A78BFA]/20 bg-[#1D1430] px-4 py-2 text-xs text-[#E0B7FF]">
              {routes.length} listed
            </span>
          </div>

          {routes.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-white/50">You haven't posted any journeys yet.</p>
              <Link
                href="/travel"
                className="mt-5 inline-block rounded-full bg-[#A78BFA] px-6 py-3 text-sm font-semibold text-[#0B0714] transition hover:bg-[#E0B7FF]"
              >
                Post a Journey
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {routes.map((route) => (
                <article
                  key={route.id}
                  className="rounded-3xl border border-[#A78BFA]/15 bg-gradient-to-br from-[#1D1430] to-[#100B1B] p-6 transition hover:border-[#A78BFA]/40"
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A78BFA]">
                    Traveller Journey
                  </p>

                  <h3 className="text-xl font-semibold">
                    {route.origin_city}
                    <span className="mx-2 text-[#A78BFA]">→</span>
                    {route.destination_city}
                  </h3>

                  <p className="mt-3 text-sm text-white/60">
                    Travel date: {route.travel_date}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    Available space: {route.available_space || "Not specified"}
                  </p>

                  {route.details && (
                    <p className="mt-3 whitespace-pre-line text-sm text-white/40">
                      {route.details}
                    </p>
                  )}

                  <button
                    onClick={() => deleteRoute(route.id)}
                    disabled={deleting === route.id}
                    className="mt-6 rounded-full border border-red-400/30 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {deleting === route.id ? "Deleting..." : "Delete Journey"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* BUYER REQUESTS */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              My Item Requests
            </h2>
            <span className="rounded-full border border-[#A78BFA]/20 bg-[#1D1430] px-4 py-2 text-xs text-[#E0B7FF]">
              {requests.length} listed
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-white/50">You haven't posted any item requests yet.</p>
              <Link
                href="/request"
                className="mt-5 inline-block rounded-full bg-[#A78BFA] px-6 py-3 text-sm font-semibold text-[#0B0714] transition hover:bg-[#E0B7FF]"
              >
                Request an Item
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-3xl border border-[#A78BFA]/15 bg-gradient-to-br from-[#1D1430] to-[#100B1B] p-6 transition hover:border-[#A78BFA]/40"
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A78BFA]">
                    Item Request
                  </p>

                  <h3 className="text-xl font-semibold">
                    {request.item_name}
                  </h3>

                  <p className="mt-3 text-sm text-white/60">
                    {request.pickup_city}
                    <span className="mx-2 text-[#A78BFA]">→</span>
                    {request.delivery_city}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    Budget:{" "}
                    {request.budget !== null
                      ? `₹${request.budget}`
                      : "Not specified"}
                  </p>

                  {request.details && (
                    <p className="mt-3 whitespace-pre-line text-sm text-white/40">
                      {request.details}
                    </p>
                  )}

                  <button
                    onClick={() => deleteRequest(request.id)}
                    disabled={deleting === request.id}
                    className="mt-6 rounded-full border border-red-400/30 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {deleting === request.id ? "Deleting..." : "Delete Request"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
