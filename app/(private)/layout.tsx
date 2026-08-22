"use client";

import Footer from "@/components/atoms/Footer";
import Header from "@/components/atoms/Header";
import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {token} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/")      
    }
  }, [router, token])


  return (
    <>
      <Header />
      <div className="bg-black">{children}</div>
      <Footer />
    </>
  );
}
