
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function TravelPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState("");

  const [form, setForm] = useState({
    name: "",
    from: "",
    to: "",
    date: "",
    space: "Small bag",
    details: "",
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setToday(`${year}-${month}-${day}`);
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

      const { error } = await supabase.from("traveller_routes").insert({
        user_id: user.id,
        origin_city: form.from.trim(),
        destination_city: form.to.trim(),
        travel_date: form.date,
        available_space: form.space,
        details: [
          `Traveller name: ${form.name.trim()}`,
          form.details.trim(),
        ]
          .filter(Boolean)
          .join("\n"),
      });

      if (error) {
        console.error("Supabase insert error:", error.message);
        setMessage(`Could not save travel details: ${error.message}`);
        return;
      }

      setMessage("Success! Your travel route has been shared with CarryKart.");

      setForm({
        name: "",
        from: "",
        to: "",
        date: "",
        space: "Small bag",
        details: "",
      });
    } catch (error) {
      console.error("Travel submission failed:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-400";

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="text-sm font-semibold text-violet-300 hover:text-white"
        >
          ← Back to CarryKart
        </a>

        <div className="mt-8 rounded-3xl border border-violet-400/15 bg-[#171026] p-6 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
            Travel with CarryKart
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Share your journey.
          </h1>

          <p className="mt-3 leading-7 text-white/60">
            Tell us where you are travelling and how much extra space you
            have. Your route will be saved to CarryKart&apos;s shared
            database. This does not automatically arrange a delivery.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter your name"
                required
                maxLength={100}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="from" className="mb-2 block text-sm font-medium">
                  Travelling from
                </label>
                <input
                  id="from"
                  name="from"
                  value={form.from}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Departure city"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="to" className="mb-2 block text-sm font-medium">
                  Travelling to
                </label>
                <input
                  id="to"
                  name="to"
                  value={form.to}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Destination city"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="mb-2 block text-sm font-medium">
                Travel date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                min={today || undefined}
                value={form.date}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="space" className="mb-2 block text-sm font-medium">
                Available space
              </label>
              <select
                id="space"
                name="space"
                value={form.space}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Small bag</option>
                <option>Medium bag</option>
                <option>Large bag</option>
                <option>Extra luggage space</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="details"
                className="mb-2 block text-sm font-medium"
              >
                Additional details (optional)
              </label>
              <textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                className={inputClass}
                placeholder="Preferred delivery arrangements..."
                rows={4}
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-violet-400 px-6 py-4 font-bold text-[#0B0714] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving travel details..." : "Share travel route →"}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`break-words rounded-xl border p-4 ${
                  message.startsWith("Success!")
                    ? "border-green-400/30 bg-green-400/10 text-green-300"
                    : "border-red-400/30 bg-red-400/10 text-red-300"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-xs leading-5 text-white/40">
            Demo marketplace. Submitted routes may be visible to other users.
            Do not enter sensitive personal information. This form does not
            arrange or confirm any delivery.
          </p>
        </div>
      </div>
    </main>
  );
}
