
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestPage() {
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const request = {
      id: crypto.randomUUID(),
      itemName,
      itemUrl,
      pickupCity,
      deliveryCity,
      budget,
      details,
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(
      localStorage.getItem("carrykart-requests") || "[]"
    );

    localStorage.setItem(
      "carrykart-requests",
      JSON.stringify([...saved, request])
    );

    setMessage("Your demo request was saved in this browser!");
    setItemName("");
    setItemUrl("");
    setPickupCity("");
    setDeliveryCity("");
    setBudget("");
    setDetails("");
  }

  return (
    <main className="min-h-screen bg-[#080d18] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-orange-400 hover:text-orange-300"
        >
          ← Back to CarryKart
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Buyer request · Demo
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            What would you like delivered?
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            Tell us what you need and where it should go. This prototype
            saves your request only in this browser; it does not contact a
            traveller or arrange a delivery.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="itemName" className="mb-2 block text-sm">
                Item name *
              </label>
              <input
                id="itemName"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. A book or a pair of shoes"
                className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label htmlFor="itemUrl" className="mb-2 block text-sm">
                Product link (optional)
              </label>
              <input
                id="itemUrl"
                type="url"
                value={itemUrl}
                onChange={(e) => setItemUrl(e.target.value)}
                placeholder="https://example.com/product"
                className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="pickupCity" className="mb-2 block text-sm">
                  Where is the item? *
                </label>
                <input
                  id="pickupCity"
                  required
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  placeholder="e.g. Jaipur"
                  className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label htmlFor="deliveryCity" className="mb-2 block text-sm">
                  Deliver to city *
                </label>
                <input
                  id="deliveryCity"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="e.g. Delhi"
                  className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="budget" className="mb-2 block text-sm">
                Estimated item budget (₹) *
              </label>
              <input
                id="budget"
                required
                type="number"
                min="1"
                step="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label htmlFor="details" className="mb-2 block text-sm">
                Additional details (optional)
              </label>
              <textarea
                id="details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the item or any special requirements."
                className="w-full resize-y rounded-xl border border-white/10 bg-[#101827] px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              Save demo request
            </button>

            {message && (
              <p role="status" className="rounded-xl bg-emerald-500/10 p-4 text-emerald-300">
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-xs leading-5 text-slate-500">
            Demo only. Do not enter sensitive personal information. Requests
            are stored locally in this browser and are not shared with other
            users.
          </p>
        </div>
      </div>
    </main>
  );
}
