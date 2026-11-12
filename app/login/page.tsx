
"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (window.location.search.includes("recovery=1")) {
      setRecoveryMode(true);
    }
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (recoveryMode) {
        if (newPassword.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }

        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          setError(error.message);
          return;
        }

        setRecoveryMode(false);
        setNewPassword("");
        setMessage("Password updated successfully. You can now sign in.");
        window.history.replaceState({}, "", "/login");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
    } catch {
      setError("Google sign-in could not be started.");
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setResetLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/login?recovery=1`,
        }
      );

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset link sent! Check your email.");
      }
    } catch {
      setError("Unable to send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  }

  function handleTilt(event: React.PointerEvent<HTMLDivElement>) {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.transform =
      `rotateY(${x * 8}deg) rotateX(${-y * 7}deg)`;
  }

  function resetTilt(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.transform = "";
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0712] px-4 py-12 text-[#F3EBE0]">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[25%] h-[400px] w-[400px] rounded-full bg-violet-700/15 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-180px] right-[-100px] h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[140px]" />

      {/* Back navigation */}
      <Link
        href="/"
        className="absolute left-6 top-7 z-20 text-sm font-medium text-[#A39AAF] transition hover:text-white"
      >
        ← Back to CarryKart
      </Link>

      {/* Login scene */}
      <div
        className="relative z-10 w-full max-w-[390px]"
        style={{ perspective: "1000px" }}
      >
        <div
          onPointerMove={handleTilt}
          onPointerLeave={resetTilt}
          className="rounded-[26px] border border-[#CDA9E6]/20 bg-gradient-to-b from-[#241A32]/95 to-[#100A19]/95 p-7 shadow-[0_40px_100px_-30px_rgba(150,90,200,0.35),inset_0_1px_0_rgba(227,201,242,0.2)] backdrop-blur-2xl transition-transform duration-200 ease-out sm:p-8"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* Official logo */}
          <div className="mb-3 flex justify-center">
            <Link href="/" aria-label="CarryKart homepage">
              <Image
                src="/carrykart-logo-new.png"
                alt="CarryKart Next Gen"
                width={560}
                height={247}
                priority
                className="h-auto w-[230px] object-contain drop-shadow-[0_6px_22px_rgba(205,169,230,0.2)]"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#CDA9E6]">
              {recoveryMode ? "ACCOUNT SECURITY" : "Welcome back" }
            </p>

            <h1 className="mt-3 text-[27px] font-bold tracking-tight text-[#F3EBE0]">
              {recoveryMode ? "Reset password" : "Welcome back"}
            </h1>

            <p className="mt-2 text-sm text-[#A39AAF]">
              {recoveryMode
                ? "Choose a new password for your account."
                : "Sign in to continue your CarryKart journey."}
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4">

            {!recoveryMode && (
              <>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#D7CCDF]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#A39AAF]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#CDA9E6]/20 bg-white/[0.045] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#8A8197] focus:border-[#CDA9E6] focus:bg-white/[0.09]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#D7CCDF]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#A39AAF]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-[#CDA9E6]/20 bg-white/[0.045] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-[#8A8197] focus:border-[#CDA9E6] focus:bg-white/[0.09]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#A39AAF] transition hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="text-xs text-[#BDA5D2] transition hover:text-white disabled:opacity-50"
                  >
                    {resetLoading ? "Sending..." : "Forgot password?"}
                  </button>
                </div>
              </>
            )}

            {/* New password recovery */}
            {recoveryMode && (
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-[#D7CCDF]"
                >
                  New password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full rounded-xl border border-[#CDA9E6]/20 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#8A8197] focus:border-[#CDA9E6]"
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-[#FF8FA3]/25 bg-[#FF8FA3]/10 p-3 text-sm text-[#FF9BAD]"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div
                role="status"
                className="rounded-xl border border-[#7BE0B0]/20 bg-[#7BE0B0]/10 p-3 text-sm text-[#7BE0B0]"
              >
                {message}
              </div>
            )}

            {/* Main button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E3C9F2] via-[#CDA9E6] to-[#B58AD6] py-3.5 text-sm font-bold text-[#1A1022] shadow-[0_0_30px_rgba(167,139,250,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(167,139,250,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : recoveryMode
                  ? "Update password"
                  : "Sign in"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Google login */}
          {!recoveryMode && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#CDA9E6]/15" />
                <span className="text-[11px] uppercase tracking-widest text-[#A39AAF]">
                  or
                </span>
                <div className="h-px flex-1 bg-[#CDA9E6]/15" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#CDA9E6]/20 bg-white/[0.045] py-3.5 text-sm font-semibold text-[#F3EBE0] transition hover:border-[#CDA9E6]/50 hover:bg-white/[0.09] disabled:opacity-50"
              >
                <svg width="19" height="19" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
                  <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
                  <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" />
                  <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z" />
                </svg>

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>
            </>
          )}

          {/* Signup */}
          <div className="mt-7 border-t border-[#CDA9E6]/15 pt-6 text-center">
            {recoveryMode ? (
              <button
                type="button"
                onClick={() => {
                  setRecoveryMode(false);
                  setError("");
                  setMessage("");
                  window.history.replaceState({}, "", "/login");
                }}
                className="text-sm font-semibold text-[#CDA9E6] transition hover:text-white"
              >
                ← Back to sign in
              </button>
            ) : (
              <p className="text-sm text-[#A39AAF]">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#E3C9F2] transition hover:text-white"
                >
                  Create account
                </Link>
              </p>
            )}
          </div>

        </div>

        {/* Bottom branding */}
        <p className="mt-7 text-center text-[11px] tracking-wide text-[#A39AAF]/60">
          CarryKart — Every journey connects possibilities.
        </p>
      </div>

      {/* Reduced motion support */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
