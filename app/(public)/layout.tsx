"use client";

import Footer from "@/components/atoms/Footer";
import Header from "@/components/atoms/Header";

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
