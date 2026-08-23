import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import Link from "next/link";
import AccountMenu from "./AccountMenu";

const NAV = [
  { num: "120", label: "Ratings", href: "/ratings" },
  { num: "150", label: "For You", href: "/foryou" },
  { num: "180", label: "Schedule", href: "/schedule" },
  { num: "199", label: "Search", href: "/search" },
];

export default function Header() {
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-green-600 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex items-center gap-2.5 font-display font-bold tracking-wide">
          {/* <span className="bg-cyan text-ink px-2 py-[3px] text-[13px] font-bold">
            100
          </span> */}
          <span className="text-lg">POPLOCK TV</span>
        </div>
        <nav className="hidden sm:flex flex-wrap gap-1.5 font-mono text-[13px]">
          {NAV.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group border border-line px-2.5 py-1.25 text-dim transition-colors hover:border-paper hover:text-paper"
            >
              {/* <span className="mr-1.5 text-yellow group-hover:text-cyan">
                {item.num}
              </span> */}
              {item.label}
            </Link>
          ))}
          {token ? (
            // <button
            //   onClick={logout}
            //   className="border border-line px-2.5 py-1.25 text-dim transition-colors hover:border-paper cursor-pointer hover:text-paper"
            // >
            //   Logout
            // </button>
            <AccountMenu />
          ) : (
            <Link
              href={"/login"}
              className="border border-line px-2.5 py-1.25 text-dim transition-colors hover:border-paper cursor-pointer hover:text-paper"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
