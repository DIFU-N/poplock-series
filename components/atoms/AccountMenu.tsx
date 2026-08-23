"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";

const MENU_ITEMS = [
  { num: "160", label: "My Account", href: "/myaccount" },
  //   { num: "140", label: "My Lists", href: "/lists" },
  //   { num: "210", label: "Settings", href: "/settings" },
];

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const initial = (user?.username ?? "U").trim().charAt(0).toUpperCase();

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 border border-line bg-ink/40 px-2.5 py-1.25 font-mono text-[13px] text-paper transition-colors hover:border-paper cursor-pointer"
      >
        <span className="flex h-5 w-5 border rounded-full items-center justify-center bg-ink text-[11px] font-bold text-paper">
          {initial}
        </span>
        <span className="max-w-27.5 truncate">
          {user?.username ?? "Account"}
        </span>
        <span className="text-[10px] text-dim">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] w-52 border border-line bg-black font-mono text-[13px] shadow-lg"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center border-b border-line px-3.5 py-2.5 text-dim transition-colors last:border-b-0 hover:bg-ink-2 hover:text-paper"
            >
              {/* <span className="mr-2 text-yellow">{item.num}</span> */}
              {item.label}
            </Link>
          ))}
          <button
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="block w-full border-t border-line px-3.5 py-2.5 text-left text-magenta transition-colors hover:bg-ink-2 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
