
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Traveller = {
  id: string;
  user_id: string | null;
  origin_city: string;
  destination_city: string;
  travel_date: string;
  available_space: string | null;
  details: string | null;
};

type BuyerRequest = {
  id: string;
  user_id: string | null;
  item_name: string;
  pickup_city: string;
  delivery_city: string;
  budget: number | null;
  details: string | null;
};

type Match = {
  traveller: Traveller;
  request: BuyerRequest;
};

export default function MatchesPage() {
  const router = useRouter();

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatError, setChatError] = useState("");
  const [startingChat, setStartingChat] = useState("");

  useEffect(() => {
    async function findMatches() {
      setLoading(true);
      setError("");

      const [travellerResult, requestResult] = await Promise.all([
        supabase
          .from("traveller_routes")
          .select(
            "id, user_id, origin_city, destination_city, travel_date, available_space, details"
          )
          .gte("travel_date", new Date().toLocaleDateString("en-CA")),

        supabase
          .from("buyer_requests")
          .select(
            "id, user_id, item_name, pickup_city, delivery_city, budget, details"
          ),
      ]);

      if (travellerResult.error || requestResult.error) {
        setError(
          travellerResult.error?.message ||
            requestResult.error?.message ||
            "Could not load marketplace data."
        );
        setLoading(false);
        return;
      }

      const travellers = (travellerResult.data ?? []) as Traveller[];
      const requests = (requestResult.data ?? []) as BuyerRequest[];

      const matchedResults: Match[] = [];

      travellers.forEach((traveller) => {
        requests.forEach((request) => {
          const sameOrigin =
            traveller.origin_city.trim().toLowerCase() ===
            request.pickup_city.trim().toLowerCase();

          const sameDestination =
            traveller.destination_city.trim().toLowerCase() ===
            request.delivery_city.trim().toLowerCase();

          if (sameOrigin && sameDestination) {
            matchedResults.push({ traveller, request });
          }
        });
      });

      setMatches(matchedResults);
      setLoading(false);
    }

    findMatches();
  }, []);

  async function startChat(match: Match) {
    const matchKey = `${match.traveller.id}-${match.request.id}`;

    setStartingChat(matchKey);
    setChatError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/login");
        return;
      }

      const requesterId = match.request.user_id;
      const travellerId = match.traveller.user_id;

      if (!requesterId || !travellerId) {
        setChatError(
          "This match cannot start a chat because one listing has no registered owner."
        );
        return;
      }

      if (requesterId === travellerId) {
        setChatError(
          "You cannot start a conversation with yourself."
        );
        return;
      }

      if (user.id !== requesterId && user.id !== travellerId) {
        setChatError(
          "Only the requester or traveller who owns this match can start the conversation."
        );
        return;
      }

      const { data: existingChat, error: lookupError } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("request_id", match.request.id)
        .eq("route_id", match.traveller.id)
        .maybeSingle();

      if (lookupError) {
        throw lookupError;
      }

      if (existingChat) {
        router.push(`/chat/${existingChat.id}`);
        return;
      }

      const { data: newChat, error: createError } = await supabase
        .from("chat_conversations")
        .insert({
          requester_id: requesterId,
          traveller_id: travellerId,
          request_id: match.request.id,
          route_id: match.traveller.id,
        })
        .select("id")
        .single();

      if (createError) {
        throw createError;
      }

      router.push(`/chat/${newChat.id}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not start chat.";

      setChatError(message);
    } finally {
      setStartingChat("");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-violet-300 hover:text-white"
        >
          ← Back to Home
        </Link>

        <section className="py-16 text-center">
          <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-5 py-2 text-xs tracking-[0.2em] text-violet-300">
            INTELLIGENT MATCHMAKING
          </span>

          <h1 className="mt-8 text-4xl font-semibold sm:text-6xl">
            Smart Route{" "}
            <span className="bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">
              Matching.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            We connect traveller journeys with buyer requests
            travelling along the same route.
          </p>
        </section>

        {loading && (
          <div className="py-16 text-center text-violet-300">
            Finding matching journeys...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300">
            {error}
          </div>
        )}

        {chatError && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300">
            {chatError}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <h2 className="text-xl font-semibold">
                Matched Journeys
              </h2>

              <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-300">
                {matches.length} Matches
              </span>
            </div>

            {matches.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
                <div className="text-4xl">✧</div>
                <h3 className="mt-5 text-xl font-medium">
                  No matching journeys yet.
                </h3>
                <p className="mt-3 text-sm text-white/40">
                  When a traveller and buyer share the same route,
                  their match will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {matches.map((match, index) => {
                  const matchKey = `${match.traveller.id}-${match.request.id}`;

                  return (
                    <article
                      key={matchKey}
                      className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#1D1430] to-[#100B1B] p-7 shadow-[0_10px_40px_rgba(139,92,246,0.08)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-300">
                          Route Match #{index + 1}
                        </span>
                        <span className="text-sm text-violet-300">✧</span>
                      </div>

                      <h3 className="mt-6 text-xl font-semibold">
                        {match.request.item_name}
                      </h3>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-xs text-white/40">
                          MATCHED ROUTE
                        </p>
                        <p className="mt-3 text-lg font-medium">
                          {match.traveller.origin_city}
                        </p>
                        <p className="my-2 text-violet-300">↓</p>
                        <p className="text-lg font-medium">
                          {match.traveller.destination_city}
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-white/40">
                            Travel Date
                          </p>
                          <p className="mt-1 text-sm">
                            {new Date(
                              match.traveller.travel_date + "T00:00:00"
                            ).toLocaleDateString("en-IN")}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-white/40">
                            Available Space
                          </p>
                          <p className="mt-1 text-sm">
                            {match.traveller.available_space ||
                              "Not specified"}
                          </p>
                        </div>
                      </div>

                      {match.request.budget !== null && (
                        <div className="mt-5">
                          <p className="text-xs text-white/40">
                            Buyer's Budget
                          </p>
                          <p className="mt-1 text-xl font-semibold text-violet-200">
                            ₹
                            {Number(match.request.budget).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      )}

                      {match.traveller.details && (
                        <p className="mt-4 text-sm leading-6 text-white/50">
                          Traveller: {match.traveller.details}
                        </p>
                      )}

                      {match.request.details && (
                        <p className="mt-2 text-sm leading-6 text-white/50">
                          Request: {match.request.details}
                        </p>
                      )}

                      <button
                        onClick={() => startChat(match)}
                        disabled={startingChat === matchKey}
                        className="mt-7 w-full rounded-full bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {startingChat === matchKey
                          ? "Opening Chat..."
                          : "Start Chat →"}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/35">
            CarryKart — Every journey connects possibilities.
          </p>
        </div>
      </div>
    </main>
  );
}
