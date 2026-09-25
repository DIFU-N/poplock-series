"use client";

import Footer from "@/app/components/atoms/Footer";
import Header from "@/app/components/atoms/Header";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
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
      router.push("/login")      
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
