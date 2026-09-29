import Link from "next/link";
import { FaTwitter } from "react-icons/fa";

// Mirrors the Header's current nav — same routes, same idea of a
// colored "key" per section, so there's a second way to get around
// the site from the bottom of any page.
const KEYS = [
  { label: "Ratings", href: "/ratings", color: "bg-pink-400" },
  { label: "Schedule", href: "/schedule", color: "bg-yellow-400" },
  { label: "Search", href: "/search", color: "bg-cyan-400" },
  { label: "Must Havs", href: "/must-havs", color: "bg-green-400" },
  { label: "Top Shows", href: "/topshows", color: "bg-purple-400" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f3f1ea] px-5 py-10 text-gray-600 lg:px-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-295 flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-y-4">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-wide"
          >
            POPLOCK TV
          </Link>
          <div className="flex flex-col gap-y-1 text-sm">
            <span>© Poplock in collab with dadaman industries.</span>
            <span className="font-semibold text-[#c9c8c0]">
              All rights reserved. Made with love.
            </span>
          </div>
          <div className="text-lg text-blue-500">
            <Link
              href={"www.twitter.com/rashadbirmingh1"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
          </div>
        </div>

        <nav>
          <div className="mb-3 font-mono text-xs uppercase tracking-wide text-[#c9c8c0]">
            Get around
          </div>
          <ul className="flex flex-wrap gap-2">
            {KEYS.map((key) => (
              <li key={key.href}>
                <Link
                  href={key.href}
                  className={`inline-block px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 ${key.color}`}
                >
                  {key.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
