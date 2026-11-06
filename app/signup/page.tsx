
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setSuccess(
        "Account created! Please check your email and click the confirmation link to activate your account."
      );
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0714] px-5 py-12 text-white">

      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-500/15 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        <Link
          href="/"
          className="mb-8 inline-block text-sm text-violet-300 transition hover:text-white"
        >
          ← Back to CarryKart
        </Link>

        <div className="rounded-[2rem] border border-violet-400/15 bg-[#171026]/90 p-7 shadow-[0_20px_100px_rgba(139,92,246,0.12)] backdrop-blur-xl sm:p-10">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-2xl text-violet-300">
              ✦
            </div>

            <p className="mt-6 text-xs tracking-[0.25em] text-violet-300">
              JOIN THE JOURNEY
            </p>

            <h1 className="mt-3 text-3xl font-semibold">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-white/45">
              Start connecting journeys and possibilities.
            </p>
          </div>

          <form onSubmit={handleSignup} className="mt-9 space-y-5">

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Full Name
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-400/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-400/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-400/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Confirm Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-400/60"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm leading-6 text-violet-200">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-400 py-4 text-sm font-semibold text-[#0B0714] shadow-[0_0_30px_rgba(167,139,250,0.2)] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/45">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-violet-300 hover:text-white"
              >
                Log in
              </Link>
            </p>
          </div>

        </div>

        <p className="mt-7 text-center text-xs text-white/30">
          CarryKart — Every journey connects possibilities.
        </p>

      </div>
    </main>
  );
}
