
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RequestPage() {
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("buyer_requests").insert({
        user_id: user.id,
        item_name: itemName.trim(),
        item_url: itemUrl.trim() || null,
        pickup_city: pickupCity.trim(),
        delivery_city: deliveryCity.trim(),
        budget: Number(budget),
        details: details.trim() || null,
      });

      if (error) {
        console.error("Supabase insert error:", error.message);
        setMessage(`Could not save request: ${error.message}`);
        return;
      }

      setMessage("Success! Your request has been shared with CarryKart.");
      setItemName("");
      setItemUrl("");
      setPickupCity("");
      setDeliveryCity("");
      setBudget("");
      setDetails("");
    } catch (error) {
      console.error("Request submission failed:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-violet-400/15 bg-[#171026] px-4 py-3 text-white outline-none focus:border-violet-400";

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-violet-300 hover:text-white"
        >
          ← Back to CarryKart
        </Link>

        <div className="mt-8 rounded-3xl border border-violet-400/15 bg-[#171026] p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Buyer request
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            What would you like delivered?
          </h1>

          <p className="mt-3 leading-7 text-white/60">
            Tell us what you need and where it should go. Your request will
            be saved to CarryKart&apos;s shared database. This does not
            automatically arrange a delivery.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="itemName" className="mb-2 block text-sm">
                Item name *
              </label>
              <input
                id="itemName"
                required
                maxLength={150}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. A book or a pair of shoes"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="itemUrl" className="mb-2 block text-sm">
                Product link (optional)
              </label>
              <input
                id="itemUrl"
                type="url"
                maxLength={2000}
                value={itemUrl}
                onChange={(e) => setItemUrl(e.target.value)}
                placeholder="https://example.com/product"
                className={inputClass}
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
                  maxLength={100}
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  placeholder="e.g. Jaipur"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="deliveryCity" className="mb-2 block text-sm">
                  Deliver to city *
                </label>
                <input
                  id="deliveryCity"
                  required
                  maxLength={100}
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="e.g. Delhi"
                  className={inputClass}
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
                max="1000000000"
                step="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 1500"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="details" className="mb-2 block text-sm">
                Additional details (optional)
              </label>
              <textarea
                id="details"
                rows={4}
                maxLength={2000}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the item or any special requirements."
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-violet-400 px-5 py-3.5 font-semibold text-[#0B0714] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving request..." : "Submit request"}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`break-words rounded-xl p-4 ${
                  message.startsWith("Success!")
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-red-500/10 text-red-300"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-xs leading-5 text-white/40">
            Demo marketplace. Submitted listings may be visible to other
            users. Do not enter sensitive personal information. Submitting
            a request does not guarantee delivery.
          </p>
        </div>
      </div>
    </main>
  );
}
