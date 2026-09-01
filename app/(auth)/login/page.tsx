"use client";
import Footer from "@/components/atoms/Footer";
import Header from "@/components/atoms/Header";
import LoginForm from "@/components/organisms/auth/LoginForm";
import SignUpForm from "@/components/organisms/auth/SignUpForm";
import React, { useState } from "react";

enum Page {
  Login = 0,
  Signup = 1,
}

const AuthPage = () => {
  const [page, setPage] = useState(Page.Login);
  return (
    <main>
      <Header />

      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-yellow shadow-[0_0_0_3px_rgba(242,201,76,0.15)]" />
            AWAITING ACCESS CODE
          </div>

          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Sign in to POPLOCK
          </h1>
          <p className="mb-12 max-w-130 text-[17px] text-[#c9c8c0]">
            Your saved reviews, watchlist, and &quot;for you&quot; picks are
            tuned to your account. Enter your details to pick up where you left
            off.
          </p>

          <div className="grid grid-cols-1 border border-line lg:grid-cols-[auto_1fr]">
            <div className="whitespace-nowrap bg-yellow px-4 py-2 font-display text-[13px] font-bold tracking-[0.08em] text-ink lg:px-2.5 lg:py-4 lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]">
              ACCESS
            </div>
            <div className="px-7 py-8 sm:px-9 sm:py-10">
              {page === Page.Login && (
                <LoginForm onAuthViewChange={() => setPage(Page.Signup)} />
              )}
              {page === Page.Signup && (
                <SignUpForm onAuthViewChange={() => setPage(Page.Login)} />
              )}
              {/* <LoginForm /> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AuthPage;
