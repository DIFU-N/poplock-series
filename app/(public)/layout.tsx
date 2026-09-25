"use client";

import Footer from "@/app/components/atoms/Footer";
import Header from "@/app/components/atoms/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="bg-black">{children}</div>
      <Footer />
    </>
  );
}
