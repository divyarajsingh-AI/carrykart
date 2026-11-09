"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Find Traveller", href: "/find-traveller" },
    { name: "Browse Requests", href: "/browse-requests" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chats", href: "/chat" },
    { name: "Why CarryKart", href: "#why-carrykart" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/25 bg-violet-500/10 text-violet-100 transition hover:bg-violet-500/20"
      >
        <span className="text-2xl">{isOpen ? "×" : "☰"}</span>
      </button>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-violet-300/15 bg-[#0B0714]/95 backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-violet-500/15 hover:text-violet-200"
            >
              {link.name}
            </Link>
          ))}

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm text-white"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-violet-500/20 px-4 py-3 text-center text-sm font-semibold text-violet-100 ring-1 ring-violet-300/30"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}