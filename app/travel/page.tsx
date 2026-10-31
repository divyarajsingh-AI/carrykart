
"use client";

import { useEffect, useState } from "react";

export default function TravelPage() {
  const [message, setMessage] = useState("");
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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const saved = localStorage.getItem("carrykart-travelers");
    const travelers = saved ? JSON.parse(saved) : [];

    travelers.push({
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("carrykart-travelers", JSON.stringify(travelers));

    setMessage("Your travel details have been saved successfully!");
    setForm({
      name: "",
      from: "",
      to: "",
      date: "",
      space: "Small bag",
      details: "",
    });
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-white outline-none focus:border-orange-400";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="text-sm font-semibold text-orange-400 hover:text-orange-300"
        >
          ← Back to CarryKart
        </a>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
            Travel with CarryKart
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Share your journey.
          </h1>

          <p className="mt-3 leading-7 text-slate-300">
            Tell us where you are travelling and how much extra space you
            have. Help connect people with items they need.
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
              className="w-full rounded-xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
            >
              Save travel details →
            </button>

            {message && (
              <p
                role="status"
                className="rounded-xl border border-green-400/30 bg-green-400/10 p-4 text-green-300"
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Demo only: details are stored in this browser, not shared with
            other users. Do not enter sensitive personal information. This
            form does not arrange or confirm any delivery.
          </p>
        </div>
      </div>
    </main>
  );
}