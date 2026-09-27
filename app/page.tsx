"use client";
import Footer from "@/app/components/atoms/Footer";
import Header from "@/app/components/atoms/Header";
import BestWeekly from "@/app/components/molecules/home/BestWeekly";
import HotShows from "@/app/components/molecules/home/HotShows";
import MustHavs from "@/app/components/molecules/home/MustHav";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="bg-white text-gray-900">
        <section className="bg-yellow-300 px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
            <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
              Rate. Rank. Repeat.
            </span>
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Find your next
              <br />
              <span className="text-pink-500">obsession</span> tonight.
            </h1>
            <p className="max-w-140 text-lg text-gray-800">
              Real rankings from real viewers, must-watch lists from the people
              who trust their own taste, and the best TV performances of the
              week — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/topshows"
                className="rounded-full bg-gray-900 px-6 py-3 font-mono text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                See Top Shows
              </Link>
              <Link
                href="/must-havs"
                className="rounded-full border-2 border-gray-900 bg-white px-6 py-3 font-mono text-sm font-bold text-gray-900 transition-transform hover:-translate-y-0.5"
              >
                Browse Must Havs
              </Link>
            </div>
          </div>
        </section>

        {/* TOP SHOWS */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-295">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-black">
                Top Recommendations this week
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <HotShows />
            </div>
          </div>
        </section>

        {/* MUST HAVS */}
        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-295">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-black">
                Must Havs
              </h2>
              <Link
                href="/must-havs"
                className="font-mono text-sm font-bold text-pink-500 hover:underline"
              >
                See all lists →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <MustHavs />
              {/* {mustHavs.map((list) => (
                <div
                  key={list.title}
                  className={`rounded-2xl bg-gradient-to-br p-6 text-white shadow-md transition-transform hover:-translate-y-1 ${list.gradient}`}
                >
                  <div className="mb-6 font-mono text-xs font-bold uppercase tracking-wide opacity-80">
                    {list.curator}
                  </div>
                  <div className="mb-1 font-display text-xl font-bold">
                    {list.title}
                  </div>
                  <div className="font-mono text-xs opacity-80">
                    {list.count} shows
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </section>

        {/* BEST WEEKLY */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-295">
            <h2 className="font-display text-3xl font-black">
              Best performances this week
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <BestWeekly curatorHandle="tvline" />
              {/* {bestWeekly.map((pick) => (
                <div
                  key={pick.realName}
                  className="rounded-2xl bg-gray-50 p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 h-28 w-full rounded-xl bg-gray-200" />
                  <span
                    className={`mb-2 inline-block rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-gray-900 ${pick.chip}`}
                  >
                    {pick.realName}
                  </span>
                  <div className="text-sm text-gray-600">
                    as {pick.character}
                  </div>
                  <div className="font-display text-base font-bold">
                    in {pick.showName}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </section>

        {/* LATEST RATINGS */}
        {/* <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-295">
            <h2 className="mb-8 font-display text-3xl font-black">
              Latest ratings from viewers
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {latestRatings.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="text-sm">
                    <span className="font-bold text-gray-900">
                      @{entry.username}
                    </span>{" "}
                    <span className="text-gray-500">rated</span>{" "}
                    <span className="font-bold text-gray-900">
                      {entry.showName}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${entry.color}`}
                  >
                    {entry.rating}/5
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* SEARCH CTA */}
        <section className="bg-pink-400 px-6 py-16 text-center">
          <div className="mx-auto max-w-140">
            <h2 className="mb-3 font-display text-3xl font-black text-white">
              Not sure what to watch?
            </h2>
            {/* <p className="mb-6 text-white/90">
              Search any title, actor, or mood and we'll point you the right
              way.
            </p> */}
            <Link
              href="/search"
              className="inline-block rounded-full bg-white px-8 py-3 font-mono text-sm font-bold text-pink-500 transition-transform hover:-translate-y-0.5"
            >
              Search now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
