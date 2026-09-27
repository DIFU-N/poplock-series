"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import AccountMenu from "./AccountMenu";

const NAV = [
  { num: "120", label: "Ratings", href: "/ratings",color: "bg-pink-400" },
  { num: "180", label: "Schedule", href: "/schedule", color: "bg-yellow-400" },
  { num: "199", label: "Search", href: "/search", color: "bg-cyan-400" },
  { num: "192", label: "Must Havs", href: "/must-havs", color: "bg-green-400" },
  { num: "178", label: "Top Shows", href: "/topshows", color: "bg-purple-400" },
];

export default function Header() {
  const token = useAuthStore((state) => state.token);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close on an outside click / Escape, same behavior as AccountMenu.
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  // Don't leave the mobile panel stuck open if the window is resized (or
  // rotated) past the breakpoint where the desktop nav takes over.
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-[#f3f1ea] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-bold tracking-wide"
        >
          <span className="text-base sm:text-lg">POPLOCK TV</span>
        </Link>

        {/* Desktop nav — five links plus login/account comfortably fit
            from lg up; below that it collapses into the toggle below. */}
        <nav className="hidden items-center gap-1.5 font-mono text-[13px] lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className={`inline-block px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 ${item.color}`}
            >
              {item.label}
            </Link>
          ))}
          {token ? (
            <AccountMenu />
          ) : (
            <Link
              href="/login"
              className="border border-line px-2.5 py-1.25 text-dim transition-colors hover:border-paper hover:text-paper"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile / tablet toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-paper lg:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile / tablet panel */}
      {menuOpen && (
        <nav className="border-t border-line bg-[#f3f1ea] px-4 py-4 font-mono text-[13px] lg:hidden">
          <ul className="flex flex-col gap-1.5">
            {NAV.map((item) => (
              <li key={item.num}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border border-line px-3 py-2.5 text-dim transition-colors hover:border-paper hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {token ? (
                <AccountMenu />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block border border-line px-3 py-2.5 text-dim transition-colors hover:border-paper hover:text-paper"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}